var requestModal = document.querySelector(".new-request");
var requestLink = document.querySelector(".add-request");
var requestForm = document.querySelector(".new-request form");
// Error notification
var notifs = document.querySelector(".notification");
var showNotifs = function (message) {
    notifs.textContent = message;
    notifs.classList.add("active");
    setTimeout(function () {
        notifs.classList.remove("active");
        notifs.textContent = "";
    }, 4000);
};
// open request modal
requestLink.addEventListener("click", function () {
    requestModal.classList.add("open");
});
// close request modal
requestModal.addEventListener("click", function (e) {
    if (e.target.classList.contains("new-request")) {
        requestModal.classList.remove("open");
    }
});
// add new poll
requestForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var request = requestForm.request.value;
    //@ts-ignore
    var addPoll = firebase.functions().httpsCallable("addPoll");
    addPoll({ text: request })
        .then(function () {
        requestForm.reset();
        requestModal.classList.remove("open");
        requestForm.querySelector(".error").textContent = "";
    })["catch"](function (e) {
        requestForm.querySelector(".error").textContent = e.message;
    });
});
