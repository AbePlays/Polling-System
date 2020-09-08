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
        registerForm.reset();
    })["catch"](function (e) {
        registerForm.querySelector(".error").textContent = e.message;
    });
});
// login user
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = loginForm.email.value;
    var password = loginForm.password.value;
    // @ts-ignore
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (user) {
        registerForm.reset();
    })["catch"](function (e) {
        loginForm.querySelector(".error").textContent = e.message;
    });
});
// signout user
signOut.addEventListener("click", function () {
    //@ts-ignore
    firebase
        .auth()
        .signOut()
        .then(function () { return console.log("Signed Out"); });
});
// listening to auth state changes
//@ts-ignore
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("User exist", user);
        authWrapper.classList.remove("open");
        authModals.forEach(function (modal) { return modal.classList.remove("active"); });
    }
    else {
        console.log("No user present");
        authWrapper.classList.add("open");
        authModals[0].classList.add("active");
    }
});
