var currentUser;
var incRef;
var incName;
var incCurrency;
var incType;
var incCategory;
var incAmount;
var incConvert

function addIncomeHome() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            getCurrency();
            getType();
            getSource();
        } else {
            window.location.assign("index.html");    // No user is signed in.
        }
    });
}
addIncomeHome(); //run the function

function getCurrency() {
    let currencyTemplate = document.getElementById("currency-template");
    let currencyGroup = document.getElementById("currency");
    db.collection("currency").get()
    .then(allCurrencies => {
        allCurrencies.forEach(doc => {
            var acronym = doc.data().moneyAcronym;
            var symbol = doc.data().moneySymbol;
            let currencyRow = currencyTemplate.content.cloneNode(true);
            currencyRow.querySelector(".option-template").innerHTML = "<option id=\"" + acronym + "\" value=\"" + acronym + "\">" + symbol + " (" + acronym + ")</option>"
            currencyGroup.appendChild(currencyRow);
        })
    })
}

function getType() {
    let typeTemplate = document.getElementById("type-template");
    let typeGroup = document.getElementById("type");
    db.collection("types").get()
    .then(allTypes => {
        allTypes.forEach(doc => {
            var name = doc.data().name;
            var name2 = name.replace(" ", "-")
            let typeRow = typeTemplate.content.cloneNode(true);
            typeRow.querySelector(".option-template-2").innerHTML = "<option id=\"" + name2 + "\" value=\"" + name2 + "\">" + name + "</option>"
            typeGroup.appendChild(typeRow);
        })
    })
}

function getSource() {
    let sourceTemplate = document.getElementById("source-template");
    let sourceGroup = document.getElementById("source");
    currentUser.collection("sources").get()
    .then(allTypes => {
        allTypes.forEach(doc => {
            var name = doc.data().name;
            var name2 = name.replace(" ", "-")
            let sourceRow = sourceTemplate.content.cloneNode(true);
            sourceRow.querySelector(".option-template-3").innerHTML = "<option id=\"" + name2 + "\" value=\"" + name2 + "\">" + name + "</option>"
            sourceGroup.appendChild(sourceRow);
        })
    })  
}

function addIncome() {
    incRef = currentUser.collection("income").doc();
    incName = document.getElementById("incomeName").value;
    incCurrency = document.getElementById("currency").value;
    incCurrency = incCurrency.replace(/[^A-Za-z]/g, "")
    incType = document.getElementById("type").value;
    incCategory = document.getElementById("source").value;
    incAmount = parseFloat(document.getElementById("incomeAmount").value);

    // Empty input not allowed
    if (incAmount != null && incAmount > 0) {
        var currDB = db.collection("currency").doc(incCurrency);
        currDB.get().then(doc => {
            incConvert = doc.data().conversionPercent;
            incRef.set({
                name: incName,
                dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
                currencyType: incCurrency,
                convPerc: incConvert,
                incomeType: incType,
                incomeCategory: incCategory,
                income: incAmount / incConvert
            });
        })
        document.getElementById("incomeName").value = "";
        document.getElementById("income-form").reset();
        alert("Income Added!");
    } else {
        alert("Invalid Entry!");
    }
}

function cancelForm() {
    document.getElementById("income-form").reset();
    document.getElementById("incomeName").value = "";
}