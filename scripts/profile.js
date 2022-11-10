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
            currencyRow.getElementById("template-option").innerHTML = "<option id=\"" + acronym + "\" value=\"" + x + "\">" + symbol + " (" + acronym + ")</option>"
            x = x + 1;
            currencyGroup.appendChild(currencyRow);
        })
    })
}
getCurrency();