const requestModal = document.querySelector(".new-request");
const requestLink = document.querySelector(".add-request");
const requestForm = document.querySelector(
  ".new-request form"
) as HTMLFormElement;

// open request modal
requestLink.addEventListener("click", () => {
  requestModal.classList.add("open");
});

// close request modal
requestModal.addEventListener("click", (e: Event) => {
  if ((<HTMLElement>e.target).classList.contains("new-request")) {
    requestModal.classList.remove("open");
  }
});

// add new poll
requestForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const request: String = requestForm.request.value;
  //@ts-ignore
  const addPoll = firebase.functions().httpsCallable("addPoll");
  addPoll({ text: request })
    .then(() => {
      requestForm.reset();
      requestModal.classList.remove("open");
      requestForm.querySelector(".error").textContent = "";
    })
    .catch((e) => {
      requestForm.querySelector(".error").textContent = e.message;
    });
});
