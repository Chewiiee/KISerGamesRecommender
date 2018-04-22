function toggleSignIn(){
    console.log("Hallo aus toggle Sign in!")
	if (firebase.auth().currentUser) {
		// [START signout]
		firebase.auth().signOut();
		// [END signout]
	} else {
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
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
		// [END authwithemail]
	}
}
/**
 * Handles the sign up button press.
 */

function saveLikedFoodToDatabase(food_url){
    console.log("Daten Speichern!");
    var user = firebase.auth().currentUser;
    var userId;
    userId = user.uid;
    var database = firebase.database().ref("food-recommender-b73fb/" + userId);
    database.push({
        recipe_href = food_url
    });
}
