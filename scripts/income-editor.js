var currentUser;

function checkLogin(){
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            let cardTemplate = document.getElementById("incomeCardTemplate");

            currentUser.collection("income")
                .orderBy("dateAdded", "desc")
                .get()
                .then(snap => {
                    snap.forEach(doc => { //iterate thru each doc
                        uDocID = doc.id;
                        uTitle = doc.data().name;
                        uCurrencyType = doc.data().currencyType;
                        uCurrConv = doc.data().convPerc;
                        uIncome = parseFloat(doc.data().income);
                        uCategory = doc.data().incomeCategory;
                        uIncType = doc.data().incomeType;
                        let newcard = cardTemplate.content.cloneNode(true);
        
                        newcard.querySelector('.card-doc-ID').innerHTML = uDocID;
                        newcard.querySelector('.card-title').innerHTML = uTitle;
                        newcard.querySelector('.card-currency').innerHTML = uCurrencyType;
                        newcard.querySelector('.card-currency-conv').innerHTML = uCurrConv;
                        newcard.querySelector('.card-inc').innerHTML = (uIncome * uCurrConv).toFixed(2);
                        newcard.querySelector('.card-inc-type').innerHTML = uIncType;
                        newcard.querySelector('.card-inc-category').innerHTML = uCategory;
                        document.getElementById("cards-go-here").appendChild(newcard);
                    });
                });
            
        } else {
            window.location.assign("index.html");
        }
    })
}
checkLogin();

function getCurrency() {
    db.collection("currency").get()
    .then(allCurrencies => {
        allCurrencies.forEach(doc => {
            var acronym = doc.data().moneyAcronym;
            var symbol = doc.data().moneySymbol;
            let currencyTemplate = document.getElementById("currency-template");
            let currencyGroup = document.getElementById("currency");
            let currencyRow = currencyTemplate.content.cloneNode(true);
            currencyRow.querySelector(".option-template").innerHTML = "<option id=\"" + acronym + "\" value=\"" + acronym + "\">" + symbol + " (" + acronym + ")</option>"
            currencyGroup.appendChild(currencyRow);
        })
    })
}

function getType() {
    db.collection("types").get()
    .then(allTypes => {
        allTypes.forEach(doc => {
            var name = doc.data().name;
            var name2 = name.replace(" ", "-")
            let typeTemplate = document.getElementById("type-template");
            let typeGroup = document.getElementById("type");
            let typeRow = typeTemplate.content.cloneNode(true);
            typeRow.querySelector(".option-template-2").innerHTML = "<option id=\"" + name2 + "\" value=\"" + name2 + "\">" + name + "</option>"
            typeGroup.appendChild(typeRow);
        })
    })
}

function getSource() {
    currentUser.collection("sources").get()
    .then(allTypes => {
        allTypes.forEach(doc => {
            var name = doc.data().name;
            var name2 = name.replace(" ", "-")
            let sourceTemplate = document.getElementById("source-template");
            let sourceGroup = document.getElementById("source");
            let sourceRow = sourceTemplate.content.cloneNode(true);
            sourceRow.querySelector(".option-template-3").innerHTML = "<option id=\"" + name2 + "\" value=\"" + name2 + "\">" + name + "</option>"
            sourceGroup.appendChild(sourceRow);
        })
    })  
}

function editIncome(clicked) {
    var selected = clicked.parentNode;
    let docID = selected.querySelector('.card-doc-ID').innerHTML;
    let documentName = selected.querySelector('.card-title').innerHTML;
    let documentInc = selected.querySelector('.card-inc').innerHTML;
    let incomeTemplate = document.getElementById("incomeCardTemplate-edit");
    currentUser.collection("income").doc(docID).get().then( () => {
        getCurrency();
        getType();
        getSource();
        let incomeRow = incomeTemplate.content.cloneNode(true);
        incomeRow.querySelector('.card-doc-ID').innerHTML = docID;
        incomeRow.querySelector('.card-title').innerHTML = "<input type=\"text\" pattern=\"[A-Za-z]{1,20}\" value=\"" + documentName + "\" required>";  
        incomeRow.querySelector('.card-inc').innerHTML = "<input type=\"number\" pattern=\"[1-9]{1,3}\" value=\"" + documentInc + "\" required>";  
        selected.parentNode.replaceWith(incomeRow);
    });
}

function submitIncome(clicked) {
    var selected = clicked.parentNode;
    let docID = selected.querySelector('.card-doc-ID').innerHTML;
    let incomeTemplate = document.getElementById("incomeCardTemplate");
    let documentName = selected.querySelector('.card-title').querySelector('input').value;
    let documentInc = selected.querySelector('.card-inc').querySelector('input').value;
    let documentCurrency = document.getElementById("currency").value;
    documentCurrency = documentCurrency.replace(/[^A-Za-z]/g, "")
    let documentIncType = document.getElementById("type").value;
    let documentIncCategory = document.getElementById("source").value;
    
    //Grab conversion percentage
    let currDB = db.collection("currency").doc(documentCurrency);
    currDB.get().then(conversion => {
        currConv = conversion.data().conversionPercent;
        currentUser.collection("income").doc(docID).set({
            name: documentName,
            currencyType: documentCurrency,
            convPerc: currConv,
            income: documentInc / currConv,
            incomeCategory: documentIncCategory,
            incomeType: documentIncType
        }, {merge: true});

        //Populate card with updated information
        let incomeRow = incomeTemplate.content.cloneNode(true);
        currentUser.collection("income").doc(docID).get()
        .then(doc => {
            uInc = parseFloat(doc.data().income);
            currConv = doc.data().convPerc;

            //Format date to YY/MM/DD
            incomeRow = incomeTemplate.content.cloneNode(true);
            incomeRow.querySelector('.card-doc-ID').innerHTML = docID;
            incomeRow.querySelector('.card-title').innerHTML = documentName;

            //Display base value multiplied by currency's multiplier
            incomeRow.querySelector('.card-inc').innerHTML = (uInc * currConv).toFixed(2);
            incomeRow.querySelector('.card-currency').innerHTML = documentCurrency;
            incomeRow.querySelector('.card-currency-conv').innerHTML = currConv;
            incomeRow.querySelector('.card-inc-type').innerHTML = documentIncType;
            incomeRow.querySelector('.card-inc-category').innerHTML = documentIncCategory;
            selected.parentNode.replaceWith(incomeRow);
        });
    });
}

function deleteIncome(clicked) {
    var selected = clicked.parentNode;

    let docID = selected.querySelector('.card-doc-ID').innerHTML;
    currentUser.collection("income").doc(docID).delete();

    selected.parentNode.remove();
}