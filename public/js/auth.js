var authSwitchLinks = document.querySelectorAll(".switch");
var authModals = document.querySelectorAll(".auth .modal");
var authWrapper = document.querySelector(".auth");
// toggle auth modals
authSwitchLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        authModals.forEach(function (modal) { return modal.classList.toggle("active"); });
    });
});
