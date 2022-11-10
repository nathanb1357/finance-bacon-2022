var currentUser;

function addBudget(){
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("categories").limit(1).get().then(sub => {
                if (sub.docs.length == 0) {
                    currentUser.collection("categories").doc("Housing").set({
                        name: "Housing",
                        percentage: 0.35
                    }, {merge: true})    
                    currentUser.collection("categories").doc("Transportation").set({
                        name: "Transportation",
                        percentage: 0.15
                    }, {merge: true})
                    currentUser.collection("categories").doc("Food").set({
                        name: "Food",
                        percentage: 0.10
                    }, {merge: true})
                    currentUser.collection("categories").doc("Utilities").set({
                        name: "Utilities",
                        percentage: 0.10
                    }, {merge: true})
                    .then(() => {
                        console.log("Document succesfully written!");
                        getCategories();
                    })
                }
                getCategories();
            });
        } else {
            window.location.assign("index.html");
        }
    })
}
addBudget();



function getCategories() {
    let budgetTemplate = document.getElementById("budget-template");
    let budgetGroup = document.getElementById("budget-group");
    currentUser.collection("categories").get()
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

function deleteCategory(clicked) {
    var selected = clicked.parentNode;
    let documentName = selected.querySelector('.category-name').innerHTML;
    currentUser.collection("categories").doc(documentName).delete().then(() => {
        console.log("Document deleted!")
    })
    selected.remove();
}






function editCategory() {
    let budgetTemplate = document.getElementById("budget-template");
    let budgetGroup = document.getElementById("budget-group");
    currentUser.collection("categories").get()
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