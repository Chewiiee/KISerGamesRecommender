var config = {
	apiKey: 'AIzaSyBB-CQmtUci6JZ_dj_DYE3YZrWQWx1_Tzc',
	authDomain: 'food-recommender-b73fb.firebaseapp.com',
	databaseURL: 'https://food-recommender-b73fb.firebaseio.com',
	projectId: 'food-recommender-b73fb',
	storageBucket: 'food-recommender-b73fb.appspot.com',
	messagingSenderId: '215165995772'
};
firebase.initializeApp(config);

function FirebaseLoginInit(){
        console.log("Firebase init Listener!");
        firebase.auth().onAuthStateChanged(user => {
			if (user) {
			    console.log("User automatisch eingeloggt!");
				//window.location = 'login'; //After successful login, user will be redirected to home.html
			}
		});
}

function toggleSignIn() {
	if (firebase.auth().currentUser) {
		// [START signout]
		firebase.auth().signOut();
		// [END signout]
	} else {
		var email = document.getElementById('email_login').value;
		var password = document.getElementById('password_login').value;
		if (email.length < 4) {
			alert('Please enter an email address.');
			return;
		}
		if (password.length < 4) {
			alert('Please enter a password.');
			return;
		}
		// Sign in with email and pass.
		// [START authwithemail]
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// [START_EXCLUDE]
				if (errorCode === 'auth/wrong-password') {
					alert('Wrong password.');
				} else {
					alert(errorMessage);
				}
				console.log(error);
				// [END_EXCLUDE]
			});
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				window.location = 'login'; //After successful login, user will be redirected to home.html
			}
		});
		// [END authwithemail]
	}
}
/**
 * Handles the sign up button press.
 */
function handleSignUp() {
	var email = document.getElementById('email_register').value;
	var password = document.getElementById('password_register').value;
	if (email.length < 4) {
		alert('Please enter an email address.');
		return;
	}
	if (password.length < 4) {
		alert('Please enter a password.');
		return;
	}
	// Sign in with email and pass.
	// [START createwithemail]
	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// [START_EXCLUDE]
			if (errorCode == 'auth/weak-password') {
				alert('The password is too weak.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
			// [END_EXCLUDE]
		});
	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			window.location = 'login'; //After successful login, user will be redirected to home.html
		}
	});
	// [END createwithemail]
}
