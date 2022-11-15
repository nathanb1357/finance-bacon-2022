var currentUser;
var expRef;
var expAmount;
var expenseDate;
var currency;
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
    expAmount = document.getElementById("expenseAmount").value;
    expRef.set({
            expense: expAmount,
            date_added: firebase.firestore.FieldValue.serverTimestamp(),
        })
}