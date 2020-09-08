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
