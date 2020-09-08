var requestModal = document.querySelector(".new-request");
var requestLink = document.querySelector(".add-request");
var requestForm = document.querySelector(".new-request form");
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
