var currentUser;
var incomeSum = 0;
var userCurrency;
var xValues = [];
var yValues = [];
var y;
var x;
var barColors = ["red", "green", "blue", "orange", "grey"];

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
                addActual();
                addCategories();
            }
        })
    })
}

function addExpected(){
    const expectedExpenses = document.getElementById("expectedExpenses");
    let currencyPercent = userCurrency.conversionPercent;
    let ySum = 0;
    currentUser.collection("categories").get().then(allCategories => {
        allCategories.forEach(doc => {
            xValues.push(doc.data().name);
            y = doc.data().percentage * incomeSum;
            ySum += y;
            yValues.push(y);
        })
        xValues.push("Unspent Income");
        yValues.push(incomeSum - ySum)
        new Chart(expectedExpenses, {
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
                text: "Expected Expenses"
            }
            }
        });
        xValues = [];
        y = 0;
        yValues = [];
    })
}

// NEEDS TO BE REWORKED
function addActual(){
    const actualExpenses = document.getElementById("actualExpenses");
    let currencyPercent = userCurrency.conversionPercent;
    let ySum = 0;
    currentUser.collection("categories").get().then(allCategories => {
        allCategories.forEach(doc => {
            xValues.push(doc.data().name);
        })
    });
    currentUser.collection("categories").get().then(allCategories => {
        allCategories.forEach(doc => {
            currentUser.collection("expenses").get().then(allExpenses => {
                allExpenses.forEach(expense => {
                    if (expense.data().paymentCategory == doc.data().name){
                        y = y + expense.data().expense;
                        console.log(y);
                        ySum += y;
                    } 
                })
            })
            console.log(y);
            yValues.push(y);
            y = 0;
        })
        xValues.push("Unspent Income");
        yValues.push(incomeSum - ySum)
        console.log(y);
        new Chart(actualExpenses, {
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
                text: "Actual Expenses"
            }
            }
        })
    })
}

function addCategories(){
    const categoriesGraph = document.getElementById("categoriesGraph");
    let currencyPercent = userCurrency.conversionPercent;

    new Chart(actualExpenses, {
        type: "bar",
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
            text: "Actual Expenses"
        }
        }
    })
}

function addSources(){

}