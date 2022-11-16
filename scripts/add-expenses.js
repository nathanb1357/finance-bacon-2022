var currentUser;
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
    expRef = currentUser.collection("expenses");
    expName = document.getElementById("expenseName").value;
    currInput = document.getElementById("dropdownCurrency").value;
    payType = document.getElementById("dropdownType").value;
    payCat = document.getElementById("dropdownCategory").value;
    expAmount = parseInt(document.getElementById("expenseAmount").value);

    // Empty input not allowed
    if (expAmount != null && expAmount > 0) {
        if (expName.length > 0) {
            expRef.doc(expName).set({
                dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
                currencyType: currInput,
                paymentType: payType,
                paymentCategory: payCat,
                expense: expAmount,
            });
            document.getElementById("expenseName").value = "";
        } else {
            // Auto-generate ID if field is empty
            expRef.doc().set({
                dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
                currencyType: currInput,
                paymentType: payType,
                paymentCategory: payCat,
                expense: expAmount,
            });
        }
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