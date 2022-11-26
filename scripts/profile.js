var currentUser;

function addProfile() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            getCurrency();
        } else {
            window.location.assign("index.html");
        }
    });
}
addProfile();

function getCurrency() {
    let currencyTemplate = document.getElementById("currency-template");
    let currencyGroup = document.getElementById("currency-group");
    db.collection("currency").get()
    .then(allCurrencies => {
        x = 1;
        allCurrencies.forEach(doc => {
            var acronym = doc.data().moneyAcronym;
            var symbol = doc.data().moneySymbol;
            let currencyRow = currencyTemplate.content.cloneNode(true);
            currencyRow.querySelector(".option-template").innerHTML = "<option id=\"" + acronym + "\" value=\"" + x + "\">" + symbol + " (" + acronym + ")</option>"
            x = x + 1;
            currencyGroup.appendChild(currencyRow);
        })
    })
}

function submitCurrency() {
    currInput = document.getElementById("currency-group").value;
    currInput = currInput.replace(/[^A-Za-z]/g, "")
    currentUser.set({
        userCurrency: currInput
    }, {merge: true})
}