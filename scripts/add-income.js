var currentUser;
var currDB;
var currConv;
var incRef;
var incName;
var incCurrInput;
var incType;
var incCat;
var incAmount;

function addIncomeHome() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
        } else {
            window.location.assign("index.html");    // No user is signed in.
        }
    });
}
addIncomeHome(); //run the function

function addIncome() {
    incRef = currentUser.collection("income").doc();
    incName = document.getElementById("incomeName").value;
    incCurrInput = document.getElementById("dropdownCurrency").value;
    incType = document.getElementById("dropdownType").value;
    incCat = document.getElementById("dropdownCategory").value;
    incAmount = parseInt(document.getElementById("incomeAmount").value);

    // Empty input not allowed
    if (incAmount != null && incAmount > 0) {
        currDB = db.collection("currency").doc(incCurrInput);
        currDB.get().then(conversion => {
            currConv = conversion.data().conversionPercent;
            if (currConv > 1) {
                incRef.set({
                    name: incName,
                    currencyType: incCurrInput,
                    incomeType: incType,
                    incomeCategory: incCat,
                    income: incAmount / currConv,
                });
            } else if (currConv < 1) {
                incRef.set({
                    name: incName,
                    currencyType: incCurrInput,
                    incomeType: incType,
                    incomeCategory: incCat,
                    income: incAmount * currConv,
                });
            }
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