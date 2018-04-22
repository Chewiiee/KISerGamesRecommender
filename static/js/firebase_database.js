function saveLikeToDatabase(foodUrl){
    UserId = firebase.auth().currentUser.uid;
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