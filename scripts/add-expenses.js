var currentUser;
var expRef;
var expAmount;
var expenseDate;
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
    console.log("monkey");
    
    expRef = currentUser.collection("expenses").doc();
    currInput = document.getElementById("dropdownCurrency").value;
    payType = document.getElementById("dropdownType").value;
    payCat = document.getElementById("dropdownCategory").value;
    expAmount = document.getElementById("expenseAmount").value;
    expRef.set({
            dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
            currencyType: currInput,
            paymentType: payType,
            paymentCategory: payCat,
            expense: expAmount,
    });
}