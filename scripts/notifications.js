var currentUser;
var overspendWarn;
var notifPush;
var notifEmail;

// Checks firestore to see user options and displays on page
function notificationSettings() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(notifications => {
                overspendWarn = notifications.data().overspendWarning;
                if (overspendWarn == true) {
                    document.getElementById("overspendingWarning").checked = true;
                    document.getElementById("overspendingOptions").disabled = false;
                } else {
                    document.getElementById("overspendingWarning").checked = false;
                }
                notifPush = notifications.data().notificationPush;
                if (notifPush == true) {
                    document.getElementById("pushNotifications").checked = true;
                } else {
                    document.getElementById("pushNotifications").checked = false;
                }
                notifEmail = notifications.data().notificationEmail;
                if (notifEmail == true) {
                    document.getElementById("emailNotifications").checked = true;
                } else {
                    document.getElementById("emailNotifications").checked = false;
                }
            })
        } else {
            window.location.assign("index.html");    // No user is signed in.
        }
    });
}
notificationSettings(); //run the function

// Toggles the overspending warning on the page and on Firestore
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

// Toggles the push notifications on the page and on Firestore.
function pushToggle() {
    if (notifPush == true) {
        notifPush = false;
        // In case something weird happens and checks go out of sync
        document.getElementById("pushNotifications").checked = false;
        currentUser.update({
            notificationPush: false
        })
    } else if (notifPush == false) {
        notifPush = true;
        document.getElementById("pushNotifications").checked = true;
        currentUser.update({
            notificationPush: true
        })
    }
}

// Toggles the email notifications on the page and on Firestore.
function emailToggle() {
    if (notifEmail == true) {
        notifEmail = false;
        // In case something weird happens and checks go out of sync
        document.getElementById("emailNotifications").checked = false;
        currentUser.update({
            notificationEmail: false
        })
    } else if (notifEmail == false) {
        notifEmail = true;
        document.getElementById("emailNotifications").checked = true;
        currentUser.update({
            notificationEmail: true
        })
    }
}