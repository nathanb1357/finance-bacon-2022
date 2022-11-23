var currentUser;
var incomeSum = 0;
var userCurrency;
var xValues = [];
var yValues = [];
var barColors = [];

function checkLogin(){
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            username = user.displayName;
            userCurrency = db.collection("currency").doc(currentUser.data().currency);
            document.getElementById("name-goes-here").innerText = username;
            getIncomeSum();
            addExpected();
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

function addExpected(){
    currentUser.collection("categories").get().then(allCategories => {
        allCategories.forEach(doc => {
            xValues.push(doc.data().name);
            let y = doc.data().percentage * incomeSum;
            let userCurrency;
        })
    })
    new Chart("myChart", {
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
}