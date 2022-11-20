var currentUser;

function checkLogin(){
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            getCategories();
        } else {
            window.location.assign("index.html");
        }
    })
}
checkLogin();



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

function addCategory() {
    let budgetTemplate = document.getElementById("edit-template");
    let budgetGroup = document.getElementById("budget-group");
    let budgetRow = budgetTemplate.content.cloneNode(true);
    budgetRow.querySelector('.category-name').innerHTML = "<input type=\"text\" pattern=\"[A-Za-z]{1,20}\" placeholder=\"Name\" required>";
    budgetRow.querySelector('.category-percent').innerHTML = "<input type=\"number\" pattern=\"[1-9]{1,3}\" placeholder=\"%\" required>";  
    budgetGroup.appendChild(budgetRow);
}


function editCategory(clicked) {
    var selected = clicked.parentNode;
    let documentName = selected.querySelector('.category-name').innerHTML;
    let documentPercent = selected.querySelector('.category-percent').innerHTML;
    let budgetTemplate = document.getElementById("edit-template");
    currentUser.collection("categories").doc(documentName).get().then( () => {
        let budgetRow = budgetTemplate.content.cloneNode(true);
        budgetRow.querySelector('.category-name').innerHTML = "<input type=\"text\" pattern=\"[A-Za-z]{1,20}\" value=\"" + documentName + "\" required>";  
        budgetRow.querySelector('.category-percent').innerHTML = "<input type=\"number\" pattern=\"[1-9]{1,3}\" value=\"" + documentPercent + "\" required>";  
        selected.parentNode.replaceChild(budgetRow, selected);
    });
}

function submitCategory(clicked) {
    var selected = clicked.parentNode;
    let budgetTemplate = document.getElementById("budget-template");
    let documentName = selected.querySelector('.category-name').querySelector('input').value;
    let documentPercent = selected.querySelector('.category-percent').querySelector('input').value;
    currentUser.collection("categories").doc(documentName).set({
        name: documentName,
        percentage: documentPercent / 100
    }, {merge: true})
    let budgetRow = budgetTemplate.content.cloneNode(true);
    budgetRow.querySelector('.category-name').innerHTML = documentName;
    budgetRow.querySelector('.category-percent').innerHTML = documentPercent + "%";
    selected.parentNode.replaceChild(budgetRow, selected);
}