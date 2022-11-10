var currentUser;

function addBudget(){
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("budget").doc("housing").set({
                name: "Housing",
                percentage: 0.35
            }, {merge: true})    
            currentUser.collection("budget").doc("transportation").set({
                name: "Transportation",
                percentage: 0.15
            }, {merge: true})
            currentUser.collection("budget").doc("food").set({
                name: "Food",
                percentage: 0.10
            }, {merge: true})
            currentUser.collection("budget").doc("utilities").set({
                name: "Utilities",
                percentage: 0.10
            }, {merge: true})
            .then(() => {
                console.log("Document succesfully written!");
                getCategories();
            });
        }
    })
}
addBudget();



function getCategories() {
    let budgetTemplate = document.getElementById("budget-template");
    let budgetGroup = document.getElementById("budget-group");
    currentUser.collection("budget").get()
        .then(allCategories => {
            allCategories.forEach(doc => {
                var categoryName = doc.data().name; //gets the name field
                var categoryPercentage = doc.data().percentage * 100 + "%"; //gets the percentage field
                let budgetRow = budgetTemplate.content.cloneNode(true);
                budgetRow.querySelector('.category-name').innerHTML = categoryName;   //equiv getElementByClassName
                budgetRow.querySelector('.category-percent').innerHTML = categoryPercentage;  //equiv getElementByClassName
                budgetGroup.appendChild(budgetRow);
            });
        });
}


function editCategory() {
    let budgetTemplate = document.getElementById("budget-template");
    let budgetGroup = document.getElementById("budget-group");
    currentUser.collection("budget").get()
        .then(allCategories => {
            allCategories.forEach(doc => {
                var categoryName = doc.data().name; //gets the name field
                var categoryPercentage = doc.data().percentage * 100 + "%"; //gets the percentage field
                let budgetRow = budgetTemplate.content.cloneNode(true);
                budgetRow.querySelector('.category-name').innerHTML = "<input type=\"text\" placeholder=\"" + categoryName + "\">";   //equiv getElementByClassName
                budgetRow.querySelector('.category-percent').innerHTML = categoryPercentage;  //equiv getElementByClassName
                budgetGroup.appendChild(budgetRow);
            });
        });
}