// Initialize the FirebaseUI Widget using Firebase.
let ui = new firebaseui.auth.AuthUI(firebase.auth());

let uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        var user = authResult.user;                            // get the user object from the Firebase authentication database
        if (authResult.additionalUserInfo.isNewUser) {         //if new user
            db.collection("users").doc(user.uid).set({         //write to firestore. We are using the UID for the ID in users collection
                    name: user.displayName,                  
                    email: user.email,
                    overspendWarning: false,
                    notificationPush: false,
                    notificationEmail: false,
                    userCurrency: "CAD"
                }).then(function () {
                    console.log("New user added to firestore");
                    window.location.assign("home.html"); 
                })
                .catch(function (error) {
                    console.log("Error adding new user: " + error);
                });
        } else {
            return true;
        }
        return false;
    },
      // Hide the loader.
      uiShown: function() {
        document.getElementById('loader').style.display = 'none';
      }
    },
    signInFlow: 'popup',
    signInSuccessUrl: "home.html",
    signInOptions: [
      //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start('#firebaseui-auth-container', uiConfig);
  