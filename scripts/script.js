function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid);
            console.log(user.displayName);
            user_Name = user.displayName;
            document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
        } else {
            // No user is signed in.
        }
    });
}

insertName(); //run the function