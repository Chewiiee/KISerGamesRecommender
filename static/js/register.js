function openRegisterModal(){
    console.log("Hallo aus Register.js - openRegisterModal")
  showRegisterForm();
  setTimeout(function(){
    $('#loginModal').modal('show');
  }, 230);
}