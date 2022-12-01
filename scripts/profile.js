var currentUser;
var userCurrency;

// Checks the selected display currency and displays it as already selected.
function addProfile() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(doc => {
                userCurrency = doc.data().userCurrency;
                document.getElementById("placeholder").innerHTML = userCurrency;
                getCurrency();
            })
        } else {
            window.location.assign("index.html");
        }
    });
}
addProfile();

// Displays each currency on the dropdown menu.
function getCurrency() {
    let currencyTemplate = document.getElementById("currency-template");
    let currencyGroup = document.getElementById("currency-group");
    db.collection("currency").get()
    .then(allCurrencies => {
        let x = 1;
        allCurrencies.forEach(doc => {
            var acronym = doc.data().moneyAcronym;
            var symbol = doc.data().moneySymbol;
            let currencyRow = currencyTemplate.content.cloneNode(true);
            currencyRow.querySelector(".option-template").innerHTML = "<option id=\"" + acronym + "\" value=\"" + x + "\" selected>" + symbol + " (" + acronym + ")</option>"
            x = x + 1;
            currencyGroup.appendChild(currencyRow);
        })
    })
}

// Submits the user selected display currency.
function submitCurrency() {
    currInput = document.getElementById("currency-group").value;
    currInput = currInput.replace(/[^A-Za-z]/g, "")
    currentUser.set({
        userCurrency: currInput
    }, {merge: true})
    alert("Currency Changed!");
}