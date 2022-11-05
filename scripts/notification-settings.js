function notificationSettings() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            let currentUser = db.collection("users").doc(user.uid);
            let check1 = document.getElementById("overspendingWarning").checked;
            document.getElementById("overspendingWarning").addEventListener("click", (event) =>{
                if (event.target.checked){
                    check1 = true;
                } else {
                    check1 = false;
                }
            })
            let check2 = document.getElementById("pushNotifications").checked;
            let check3 = document.getElementById("emailNotifications").checked;
            currentUser.onSnapshot((doc) => {
                console.log("Current data: ", doc.data());
                currentUser.set({
                    overspendWarning: check1,
                    notificationsPush: check2,
                    notificationsEmail: check3
                }, { merge: true })
            })
        } else {
            window.location.assign("index.html");    // No user is signed in.
        }
    });
}
notificationSettings(); //run the function