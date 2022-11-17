// function showExpenses(){

var expenseContainer = document.getElementById("displayExpenses");


firebase.auth().onAuthStateChanged(user => {
    // Check if a user is signed in:
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        // console.log(currentUser);
        currentUser.collection("expenses").get()
        .then(allExpenses => {
            allExpenses.forEach(doc => {
                console.log(allExpenses);
                var currencyType = doc.data().currencyType;
                var expense = doc.data().expense;
                var category = doc.data().paymentCategory;
                var type = doc.data().paymentType;
                var dateAdded = doc.data().dateAdded;

                let eachExpenseCurrency = document.createElement("input");
                let eachExpenseExpense = document.createElement("input");
                let eachExpenseCategory = document.createElement("input");
                let eachExpenseType = document.createElement("input");
                let eachExpenseDate = document.createElement("input");

                eachExpenseCurrency.setAttribute("type", "text");
                
                // if(currencyType == null){
                //     eachExpenseCurrency.setAttribute("value", "-");
                // }else{
                    eachExpenseCurrency.setAttribute("value", currencyType);

                // }
                expenseContainer.appendChild(eachExpenseCurrency);

                eachExpenseExpense.setAttribute("type", "text");
                eachExpenseExpense.setAttribute("value", expense);
                expenseContainer.appendChild(eachExpenseExpense);


                eachExpenseCategory.setAttribute("value", category);
                eachExpenseCategory.setAttribute("text", "type");
                expenseContainer.appendChild(eachExpenseCategory);

                eachExpenseType.setAttribute("value", type);
                eachExpenseType.setAttribute("text","type");
                expenseContainer.appendChild(eachExpenseType);

                // eachExpenseDate.setAttribute("value", dateAdded);
                // expenseContainer.appendChild(eachExpenseDate);

                
            })
        })
    }
})


// }