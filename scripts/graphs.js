var currentUser;
var incomeSum = 0;
var userCurrency;
var xValues = [];
var yValues = [];
var barColors = ["red", "green","blue","orange"];

function checkLogin(){
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            username = user.displayName;
            userCurrency = db.collection("currency").doc(currentUser.currency);
            document.getElementById("name-goes-here").innerText = username;
            getIncomeSum();
        } else {
            window.location.assign("index.html");
        }
    })
}
checkLogin();

function getIncomeSum(){
    currentUser.collection("income").get().then(allIncome => {
        allIncome.forEach(doc => {
            incomeSum = incomeSum + doc.data().income;
            if (incomeSum == NaN) {
                displayIncomeLink();
            } else {
                addExpected();
            }
        })
    })
}

function addExpected(){
    let currencyPercent = userCurrency.conversionPercent;
    currentUser.collection("categories").get().then(allCategories => {
        allCategories.forEach(doc => {
            xValues.push(doc.data().name);
            var y = doc.data().percentage * incomeSum
            yValues.push(y);
        })
        var expectedExpenses = new Chart("myChart", {
            type: "pie",
            data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
            },
            options: {
            title: {
                display: true,
                text: "World Wide Wine Production"
            }
            }
        });
    })
}