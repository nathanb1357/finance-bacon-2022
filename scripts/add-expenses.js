var currentUser;
var currDB;
var currConv;
var expRef;
var expName;
var expAmount;
var currInput;
var payType;
var payCat;

function addExpensesHome() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            getCurrency();
            getType();
            getCategory();
        } else {
            window.location.assign("index.html");    // No user is signed in.
        }
    });
}
addExpensesHome(); //run the function

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

function getCategory() {
    let sourceTemplate = document.getElementById("category-template");
    let sourceGroup = document.getElementById("category");
    currentUser.collection("categories").get()
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

function addExpense() {
    expRef = currentUser.collection("expenses").doc();
    expName = document.getElementById("expenseName").value;
    currInput = document.getElementById("currency").value;
    currInput = currInput.replace(/[^A-Za-z]/g, "")
    payType = document.getElementById("type").value;
    payCat = document.getElementById("category").value;
    expAmount = parseInt(document.getElementById("expenseAmount").value);

    // Empty input not allowed
    if (expAmount != null && expAmount > 0) {
        currDB = db.collection("currency").doc(currInput);
        currDB.get().then(conversion => {
            currConv = parseFloat(conversion.data().conversionPercent);
            expRef.set({
                name: expName,
                dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
                currencyType: currInput,
                convPerc: currConv,
                paymentType: payType,
                paymentCategory: payCat,
                expense: expAmount / currConv
            });
        })
        document.getElementById("expenseName").value = "";
        document.getElementById("expense-form").reset();
        alert("Expense Added!");
    } else {
        alert("Invalid Entry!");
    }
}

function cancelForm() {
    document.getElementById("expense-form").reset();
    document.getElementById("expenseName").value = "";
}