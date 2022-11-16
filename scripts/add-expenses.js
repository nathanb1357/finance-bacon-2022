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
        } else {
            window.location.assign("index.html");    // No user is signed in.
        }
    });
}
addExpensesHome(); //run the function

function addExpense() {
    expRef = currentUser.collection("expenses").doc();
    expName = document.getElementById("expenseName").value;
    currInput = document.getElementById("dropdownCurrency").value;
    payType = document.getElementById("dropdownType").value;
    payCat = document.getElementById("dropdownCategory").value;
    expAmount = parseInt(document.getElementById("expenseAmount").value);

    // Empty input not allowed
    if (expAmount != null && expAmount > 0) {
        currDB = db.collection("currency").doc(currInput);
        currDB.get().then(conversion => {
            currConv = conversion.data().conversionPercent;
            if (currConv > 1) {
                expRef.set({
                    name: expName,
                    dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
                    currencyType: currInput,
                    paymentType: payType,
                    paymentCategory: payCat,
                    expense: expAmount / currConv,
                });
            } else if (currConv < 1) {
                expRef.set({
                    name: expName,
                    dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
                    currencyType: currInput,
                    paymentType: payType,
                    paymentCategory: payCat,
                    expense: expAmount * currConv,
                });
            }
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