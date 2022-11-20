var currentUser;

function checkLogin(){
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            getSources();
        } else {
            window.location.assign("index.html");
        }
    })
}
checkLogin();



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

function deleteSource(clicked) {
    var selected = clicked.parentNode;
    let documentName = selected.querySelector('.category-name').innerHTML;
    currentUser.collection("sources").doc(documentName).delete().then(() => {
        console.log("Document deleted!")
    })
    selected.remove();
}

function addSource() {
    let budgetTemplate = document.getElementById("edit-template");
    let budgetGroup = document.getElementById("budget-group");
    let budgetRow = budgetTemplate.content.cloneNode(true);
    budgetRow.querySelector('.category-name').innerHTML = "<input type=\"text\" pattern=\"[A-Za-z]{1,20}\" placeholder=\"Name\" required>";
    budgetGroup.appendChild(budgetRow);
}


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