var currentUser;
var incRef;
var incName;
var incCurrency;
var incType;
var incCategory;
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
    incCurrency = document.getElementById("dropdownCurrency").value;
    incType = document.getElementById("dropdownType").value;
    incCategory = document.getElementById("dropdownCategory").value;
    incAmount = parseFloat(document.getElementById("incomeAmount").value);

    // Empty input not allowed
    if (incAmount != null && incAmount > 0) {
        var currDB = db.collection("currency").doc(incCurrency);
        currDB.get().then(conversion => {
            var incConvert = conversion.data().conversionPercent;
            incRef.set({
                name: incName,
                dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
                currencyType: incCurrency,
                incomeType: incType,
                incomeCategory: incCategory,
                income: incAmount / incConvert,
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