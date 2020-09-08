const requestModal = document.querySelector(".new-request");
const requestLink = document.querySelector(".add-request");

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

// say hello
const button = document.querySelector(".call") as HTMLButtonElement;
button.addEventListener("click", () => {
  // @ts-ignore
  const sayHello = firebase.functions().httpsCallable("sayHello");
  sayHello({ name: "Abe" }).then((res) => console.log(res.data));
});
