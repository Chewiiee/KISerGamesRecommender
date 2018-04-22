
function firebaseLoginInit(){
        console.log("Firebase init Login Listener!");
        firebase.auth().onAuthStateChanged(user => {
			if (user) {
			    console.log("User automatisch eingeloggt!");
			    console.log(firebase.auth().currentUser.uid);
				window.location = 'login'; //After successful login, user will be redirected to home.html
			}else{
			    console.log("User nicht eingeloggt!");
			    //window.location = '/'; //After successful login, user will be redirected to home.html
			}
		});
}

function firebaseLogoutInit(){
    console.log("Firebase init Logout Listener!")
    firebase.auth().onAuthStateChanged(user => {
			if (user) {

			}else{
			    console.log("User nicht eingeloggt!");
			    window.location = '/'; //After successful logout, user will be redirected to home.html
			}
		});
}

function logout(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }, function(error) {
         // An error happened.
    });
}


function toggleSignIn() {
	if (firebase.auth().currentUser) {
		// [START signout]
		console.log("Current User Logout!");
		firebase.auth().signOut();
		// [END signout]
	} else {
		var email = document.getElementById('email_login').value;
		var password = document.getElementById('password_login').value;
		console.log(email);
		console.log(password);
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

function saveLikeToDatabase(foodUrl){
    console.log(firebase.auth().currentUser.uid);
    userId = firebase.auth().currentUser.uid;
    database = firebase.database().ref("food-recommender-b73fb/" + userId)
    database.push({
        recipe_href : foodUrl,
    });
}

function getMyLikedFood(){
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref("food-recommender-b73fb/" + userId).once('value').then(function(snapshot) {
         console.log(snapshot.val());
    // ...
    });
}
