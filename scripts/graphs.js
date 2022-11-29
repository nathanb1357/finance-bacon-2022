var currentUser;
var userCurrency;
var currencyPercent;
var moneySymbol;
var xValues = [];
var yValues = [];
var expenseSum = 0;
var incomeSum = 0;
var y;
var x;
var barColors = ["red", "yellow", "blue", "green", "orange", "purple", "grey", "red", "yellow", "blue", "green", "orange", "purple", "grey"];

function checkLogin(){
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            username = user.displayName;
            currentUser.get().then(doc => {
                userCurrency = doc.data().userCurrency;
                ref = db.collection("currency").doc(userCurrency);
                ref.get().then(currency => {
                    currencyPercent = currency.data().conversionPercent;
                    moneySymbol = currency.data().moneySymbol;
                    document.getElementById("name-goes-here").innerText = username;
                    const promise = new Promise(function(resolve, reject){
                        setTimeout(function(){resolve(expenseSum);}, 200);
                        getExpenseSum();
                        getIncomeSum();
                    })
                    promise.then(expenseSum => {
                        if (incomeSum < expenseSum){
                            console.log($('#noData').load('./text/expense-error.html'));
                            console.log($('#graphs').html(''));
                        } else if (incomeSum == 0 || expenseSum == 0){
                            console.log($('#noData').load('./text/no-data.html'));
                            console.log($('#graphs').html(''));
                        } else {
                            addExpected();
                        }
                    })
                });
            })
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
        })
    })
}

function getExpenseSum(){
    currentUser.collection("expenses").get().then(allExpenses => {
        allExpenses.forEach(doc => {
            expenseSum = expenseSum + doc.data().expense;
        })
    })
}

function addExpected(){
    const expectedExpenses = document.getElementById("expectedExpenses");
    let ySum = 0;
    currentUser.collection("categories").get().then(allCategories => {
        allCategories.forEach(doc => {
            xValues.push(doc.data().name);
            y = doc.data().percentage * incomeSum * currencyPercent;
            ySum += y;
            yValues.push(y.toFixed(2));
        })
        xValues.push("Unspent Income");
        yValues.push(((incomeSum * currencyPercent) - ySum).toFixed(2))
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
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return moneySymbol + data.datasets[0].data[tooltipItem.index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                }
            }
            }
        });
        addActual();
    })
}


function addActual(){
    const actualExpenses = document.getElementById("actualExpenses");
    let ySum = 0;
    xValues = [];
    y = 0;
    yValues = [];
    currentUser.collection("categories").get().then(allCategories => {
        allCategories.forEach(doc => {
            xValues.push(doc.data().name);
        })

        var promise1 = new Promise(function(resolve, reject) {
            y = xValues.map((x) => {
                setTimeout(function(){resolve(yValues);}, 300);
                let yAdd = 0;
                currentUser.collection("expenses").get().then(allExpenses => {
                    allExpenses.forEach(doc => {   
                        if (doc.data().paymentCategory == x){
                            yAdd = yAdd + doc.data().expense;
                        }
                    })
                    yValues.push((yAdd * currencyPercent).toFixed(2));
                    ySum += yAdd * currencyPercent;
                })
            });
        });

        promise1.then((yValues) => {
            xValues.push("Unspent Income");
            yValues.push(((incomeSum * currencyPercent) - ySum).toFixed(2))
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
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return moneySymbol + data.datasets[0].data[tooltipItem.index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                        }
                    }
                }
            })
            addCategories();
        })
    })
}

function addCategories(){
    const categoriesGraph = document.getElementById("categoriesGraph");
    yValues = [];
    y = 0;
    xValues = [];
    currentUser.collection("categories").get().then(allCategories => {
        allCategories.forEach(doc => {
            xValues.push(doc.data().name);
        })

        var promise2 = new Promise(function(resolve, reject) {
            y = xValues.map((x) => {
                setTimeout(function(){ resolve(yValues); }, 300);
                let yAdd = 0;
                currentUser.collection("expenses").get().then(allExpenses => {
                    allExpenses.forEach(doc => {   
                        if (doc.data().paymentCategory == x){
                            yAdd = yAdd + doc.data().expense;
                        }
                    })
                    yValues.push((yAdd * currencyPercent).toFixed(2));
                })
            });
        });
            
        promise2.then((yValues) => {
            new Chart(categoriesGraph, {
                type: "bar",
                data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
                },
                options: {
                    legend: {display: false},
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function(value, index, values) {
                                    if(parseInt(value) >= 1000){
                                        return moneySymbol + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    } else {
                                        return moneySymbol + value;
                                    }
                                }
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return moneySymbol + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                        }
                    }
                }
            })
            addSources();
        })
    })
}

function addSources(){
    const sourcesGraph = document.getElementById("sourcesGraph");
    xValues = [];
    y = 0;
    yValues = [];
    currentUser.collection("sources").get().then(allSources => {
        allSources.forEach(doc => {
            xValues.push(doc.data().name);
        })

        var promise2 = new Promise(function(resolve, reject) {
            y = xValues.map((x) => {
                setTimeout(function(){ resolve(yValues); }, 300);
                let yAdd = 0;
                currentUser.collection("income").get().then(allIncome => {
                    allIncome.forEach(doc => {   
                        if (doc.data().incomeCategory == x){
                            yAdd = yAdd + doc.data().income;
                        }
                    })
                    yValues.push((yAdd * currencyPercent).toFixed(2));
                })
            });
        });
            
        promise2.then((yValues) => {
            new Chart(sourcesGraph, {
                type: "bar",
                data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
                },
                options: {
                    legend: {display: false},
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function(value, index, values) {
                                    if(parseInt(value) >= 1000){
                                        return moneySymbol + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    } else {
                                        return moneySymbol + value;
                                    }
                                }
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return moneySymbol + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                        }
                    }
                }
            })
        })
    })
}