var currentUser;

// Creates premade income sources for the new user.
function addBudget(){
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("sources").limit(1).get().then(sub => {
                if (sub.docs.length == 0) {
                    currentUser.collection("sources").doc("Salary").set({
                        name: "Salary",
                    }, {merge: true})    
                    currentUser.collection("sources").doc("Investments").set({
                        name: "Investments",
                    }, {merge: true})
                    currentUser.collection("sources").doc("Sales").set({
                        name: "Sales",
                    }, {merge: true})
                    .then(() => {
                        console.log("Document succesfully written!");
                    })
                }
                getSources();
            });
        } else {
            window.location.assign("index.html");
        }
    })
}
addBudget();

// Gets the sources from Firestore and displays them on the page.
function getSources() {
    let budgetTemplate = document.getElementById("budget-template");
    let budgetGroup = document.getElementById("budget-group");
    currentUser.collection("sources").get()
        .then(allCategories => {
            allCategories.forEach(doc => {
                var categoryName = doc.data().name; //gets the name field
                let budgetRow = budgetTemplate.content.cloneNode(true);
                budgetRow.querySelector('.category-name').innerHTML = categoryName;   //equiv getElementByClassName
                budgetGroup.appendChild(budgetRow);
            });
        });
}

// Deletes the selected source from Firestore and from the page.
function deleteSource(clicked) {
    var selected = clicked.parentNode;
    let documentName = selected.querySelector('.category-name').innerHTML;
    currentUser.collection("sources").doc(documentName).delete().then(() => {
        console.log("Document deleted!")
    })
    selected.remove();
}

// Adds a new, editable source to the page.
function addSource() {
    let budgetTemplate = document.getElementById("edit-template");
    let budgetGroup = document.getElementById("budget-group");
    let budgetRow = budgetTemplate.content.cloneNode(true);
    budgetRow.querySelector('.category-name').innerHTML = "<input type=\"text\" pattern=\"[A-Za-z]{1,20}\" placeholder=\"Name\" required>";
    budgetGroup.appendChild(budgetRow);
}

// Turns the static table row into an form to be edited.
function editSource(clicked) {
    var selected = clicked.parentNode;
    let documentName = selected.querySelector('.category-name').innerHTML;
    let budgetTemplate = document.getElementById("edit-template");
    currentUser.collection("sources").doc(documentName).get().then( () => {
        let budgetRow = budgetTemplate.content.cloneNode(true);
        budgetRow.querySelector('.category-name').innerHTML = "<input type=\"text\" pattern=\"[A-Za-z]{1,20}\" value=\"" + documentName + "\" required>";  
        selected.parentNode.replaceChild(budgetRow, selected);
    });
}

// Submits the selected source to Firestore and changes its display to static.
function submitSource(clicked) {
    var selected = clicked.parentNode;
    let budgetTemplate = document.getElementById("budget-template");
    let documentName = selected.querySelector('.category-name').querySelector('input').value;
    currentUser.collection("sources").doc(documentName).set({
        name: documentName,
    }, {merge: true})
    let budgetRow = budgetTemplate.content.cloneNode(true);
    budgetRow.querySelector('.category-name').innerHTML = documentName;
    selected.parentNode.replaceChild(budgetRow, selected);
}