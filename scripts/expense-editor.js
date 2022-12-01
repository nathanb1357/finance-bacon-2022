// function showExpenses(){
var currentUser;
var currDB;
var uDocID;
var uTitle;

var uCurrencyType;
var currConv;
var symbol;
var uExpense;
var uCategory;
var uPayType;
var uDateAdded;
var expenseContainer = document.getElementById("displayExpenses");

// Check if a user is signed in:
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        displayCards();
    } else {
        window.location.assign("index.html");
    }
})

// Displays each submitted expense form from Firestore to the page.
function displayCards() {
    let cardTemplate = document.getElementById("expenseCardTemplate");
    currentUser.collection("expenses")
        .orderBy("dateAdded", "desc")
        .get()
        .then(snap => {
            // var i = 1;  //if you want to use commented out section
            snap.forEach(doc => {
                uDocID = doc.id;
                uTitle = doc.data().name;
                uCurrencyType = doc.data().currencyType;
                uCurrConv = doc.data().convPerc;
                uExpense = parseFloat(doc.data().expense);
                uCategory = doc.data().paymentCategory;
                uPayType = doc.data().paymentType;
                uYear = doc.data().dateAdded.toDate().getFullYear();
                uMonth = doc.data().dateAdded.toDate().getMonth();
                uDay = doc.data().dateAdded.toDate().getDate();
                let tStamp = uYear + "/" + uMonth + "/" + uDay;
                let newcard = cardTemplate.content.cloneNode(true);

                // code for grabbing conversion value, but is not working properly within this loop
                // might use if can find solution --dont delete pls

                // let currDB = db.collection("currency").doc(uCurrencyType);
                // currDB.get().then(conversion => {
                //     var currConv = conversion.data().conversionPercent;
                //     var currDisplay = uExpense * currConv;
                //     let newcard = cardTemplate.content.cloneNode(true);
                //     newcard.querySelector('#card-doc-ID').innerHTML = uDocID;
                //     newcard.querySelector('.card-title').innerHTML = uTitle;
                //     newcard.querySelector('#card-pay').innerHTML = currDisplay;
                //     newcard.querySelector('.card-currency').innerHTML = uCurrencyType;
                //     newcard.querySelector('.card-pay-type').innerHTML = uPayType;
                //     newcard.querySelector('.card-pay-category').innerHTML = uCategory;
                //     newcard.querySelector('#card-timestamp').innerHTML = tStamp;
                //     document.getElementById("cards-go-here").appendChild(newcard);
                // });

                newcard.querySelector('.card-doc-ID').innerHTML = uDocID;
                newcard.querySelector('.card-title').innerHTML = uTitle;
                newcard.querySelector('.card-currency').innerHTML = uCurrencyType;
                newcard.querySelector('.card-currency-conv').innerHTML = uCurrConv;
                newcard.querySelector('.card-pay').innerHTML = (uExpense * uCurrConv).toFixed(2);
                newcard.querySelector('.card-pay-type').innerHTML = uPayType;
                newcard.querySelector('.card-pay-category').innerHTML = uCategory;
                newcard.querySelector('.card-timestamp').innerHTML = tStamp;
                document.getElementById("cards-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
            });
        });
}

// Displays each possible currency option when editing the expense.
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

function getCategory() {
    currentUser.collection("categories").get()
    .then(allTypes => {
        allTypes.forEach(doc => {
            var name = doc.data().name;
            var name2 = name.replace(" ", "-")
            let sourceTemplate = document.getElementById("category-template");
            let sourceGroup = document.getElementById("category");
            let sourceRow = sourceTemplate.content.cloneNode(true);
            sourceRow.querySelector(".option-template-3").innerHTML = "<option id=\"" + name2 + "\" value=\"" + name2 + "\">" + name + "</option>"
            sourceGroup.appendChild(sourceRow);
        })
    })  
}

function editExpense(clicked) {
    var selected = clicked.parentNode;
    let docID = selected.querySelector('.card-doc-ID').innerHTML;
    let documentName = selected.querySelector('.card-title').innerHTML;
    let documentPay = selected.querySelector('.card-pay').innerHTML;
    let expenseTemplate = document.getElementById("expenseCardTemplate-edit");
    currentUser.collection("expenses").doc(docID).get().then( () => {
        getCurrency();
        getType();
        getCategory();
        let expenseRow = expenseTemplate.content.cloneNode(true);
        expenseRow.querySelector('.card-doc-ID').innerHTML = docID;
        expenseRow.querySelector('.card-title').innerHTML = "<input type=\"text\" pattern=\"[A-Za-z]{1,20}\" value=\"" + documentName + "\" required>";  
        expenseRow.querySelector('.card-pay').innerHTML = "<input type=\"number\" pattern=\"[1-9]{1,3}\" value=\"" + documentPay + "\" required>";  
        selected.parentNode.replaceWith(expenseRow);
    });
}

function deleteExpense(clicked) {
    var selected = clicked.parentNode;

    let docID = selected.querySelector('.card-doc-ID').innerHTML;
    currentUser.collection("expenses").doc(docID).delete();

    selected.parentNode.remove();
}

function submitExpense(clicked) {
    var selected = clicked.parentNode;
    let docID = selected.querySelector('.card-doc-ID').innerHTML;
    let expenseTemplate = document.getElementById("expenseCardTemplate");
    let documentName = selected.querySelector('.card-title').querySelector('input').value;
    let documentPay = selected.querySelector('.card-pay').querySelector('input').value;
    let documentCurrency = document.getElementById("currency").value;
    documentCurrency = documentCurrency.replace(/[^A-Za-z]/g, "")
    let documentPayType = document.getElementById("type").value;
    let documentPayCategory = document.getElementById("category").value;
    //Grab conversion percentage
    let currDB = db.collection("currency").doc(documentCurrency);
    currDB.get().then(conversion => {
        currConv = conversion.data().conversionPercent;
        currentUser.collection("expenses").doc(docID).set({
            name: documentName,
            currencyType: documentCurrency,
            convPerc: currConv,
            expense: documentPay / currConv,
            paymentCategory: documentPayCategory,
            paymentType: documentPayType
        }, {merge: true});

        //Populate card with updated information
        let expenseRow = expenseTemplate.content.cloneNode(true);
        currentUser.collection("expenses").doc(docID).get()
        .then(doc => {
            uDateAdded = doc.data().dateAdded.toDate().getDate();
            uYear = doc.data().dateAdded.toDate().getFullYear();
            uMonth = doc.data().dateAdded.toDate().getMonth();
            uDay = doc.data().dateAdded.toDate().getDate();
            uPay = parseFloat(doc.data().expense);
            currConv = doc.data().convPerc;
            //Format date to YY/MM/DD
            let tStamp = uYear + "/" + uMonth + "/" + uDay;
            expenseRow = expenseTemplate.content.cloneNode(true);
            expenseRow.querySelector('.card-timestamp').innerHTML = tStamp;
            expenseRow.querySelector('.card-doc-ID').innerHTML = docID;
            expenseRow.querySelector('.card-title').innerHTML = documentName;
            //Display base value multiplied by currency's multiplier
            expenseRow.querySelector('.card-pay').innerHTML = (uPay * currConv).toFixed(2);
            expenseRow.querySelector('.card-currency').innerHTML = documentCurrency;
            expenseRow.querySelector('.card-currency-conv').innerHTML = currConv;
            expenseRow.querySelector('.card-pay-type').innerHTML = documentPayType;
            expenseRow.querySelector('.card-pay-category').innerHTML = documentPayCategory;
            selected.parentNode.replaceWith(expenseRow);
        });
    });
}