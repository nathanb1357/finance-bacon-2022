function addBudget(){
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("budget").doc("housing").set({
                name: "Housing",
                percentage: 0.35
            }, {merge: true})    
            .then(() => {
                console.log("Document succesfully written!");
            });
        }
    })
}
addBudget();



function getCategories() {
    let budgetTemplate = document.getElementById("budget-template");
    let budgetGroup = document.getElementById("budget-group");
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser.collection("budget").get()
                .then(allCategories => {
                    allCategories.forEach(doc => {
                        var categoryName = doc.data().name; //gets the name field

                        var categoryPercentage = doc.data().percentage; //gets the length field
                        let budgetRow = budgetTemplate.content.cloneNode(true);
                        budgetRow.querySelector('.category-name').innerHTML = categoryName;   //equiv getElementByClassName
                        budgetRow.querySelector('.category-percent').innerHTML = categoryPercentage;  //equiv getElementByClassName
                        budgetGroup.appendChild(budgetRow);
                    });
                });
            };
    });
}
getCategories();