var authSwitchLinks = document.querySelectorAll(".switch");
var authModals = document.querySelectorAll(".auth .modal");
var authWrapper = document.querySelector(".auth");
var registerForm = document.querySelector(".register");
var loginForm = document.querySelector(".login");
var signOut = document.querySelector(".sign-out");
// toggle auth modals
authSwitchLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        authModals.forEach(function (modal) { return modal.classList.toggle("active"); });
    });
});
// register user
registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = registerForm.email.value;
    var password = registerForm.password.value;
    // @ts-ignore
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function (user) {
        console.log("User registered", user);
        registerForm.reset();
    })["catch"](function (e) {
        console.log(e);
        registerForm.querySelector(".error").textContent = e.message;
    });
});
