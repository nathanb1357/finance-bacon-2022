function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid);
            console.log(user.displayName);
            username = user.displayName;
            document.getElementById("name-goes-here").innerText = username;
        } else {
            window.location.assign("index.html");    // No user is signed in.
        }
    });
}
insertName(); //run the function


// Checks if user has a budget collection and if they don't display a budget link
function budgetLink(){
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            currentUser.collection("categories").limit(1).get().then(sub => {
                // User does not have budget
                if (sub.docs.length == 0) {
                    console.log($('#budgetLinkPlaceholder').load('./text/budget-link.html'));
                    console.log($('#footerPlaceholder').html(''));
                }
            })
            currentUser.collection("sources").limit(1).get().then(sub => {
                // User does not have budget
                if (sub.docs.length == 0) {
                    console.log($('#budgetLinkPlaceholder').load('./text/budget-link.html'));
                    console.log($('#footerPlaceholder').html(''));
                // User had a budget
                } else {
                    console.log($('#photoPlaceholder').load('./text/homepage.html'));
                }
            })
        } else {
            window.location.assign("index.html");    // No user is signed in.
        }
    });
}
budgetLink();