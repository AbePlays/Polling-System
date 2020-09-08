var requestModal = document.querySelector(".new-request");
var requestLink = document.querySelector(".add-request");
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
// say hello
var button = document.querySelector(".call");
button.addEventListener("click", function () {
    // @ts-ignore
    var sayHello = firebase.functions().httpsCallable("sayHello");
    sayHello({ name: "Abe" }).then(function (res) { return console.log(res.data); });
});
