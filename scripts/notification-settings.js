var currentUser;
var overspendWarn;
var notif = document.getElementById("overspendingWarning").checked;

//var overspendWarning = false;

function notificationSettings() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(ovSpend => {
                overspendWarn = ovSpend.data().overspendWarning
                if (overspendWarn == true) {
                    document.getElementById("overspendingWarning").checked = true;
                    document.getElementById("overspendingOptions").disabled = false;
                } else {
                    document.getElementById("overspendingWarning").checked = false;
                }
            })
        } else {
            window.location.assign("index.html");    // No user is signed in.
        }
    });
}
notificationSettings(); //run the function

function overSpendToggle() {
    if (overspendWarn == true) {
        overspendWarn = false;
        // In case something weird happens and checks go out of sync
        document.getElementById("overspendingWarning").checked = false;
        // Ghost options when disabled notifications
        document.getElementById("overspendingOptions").disabled = true;
        currentUser.update({
            overspendWarning: false
        })
    } else if (overspendWarn == false) {
        overspendWarn = true;
        document.getElementById("overspendingWarning").checked = true;
        document.getElementById("overspendingOptions").disabled = false;
        currentUser.update({
            overspendWarning: true
        })
    }
}