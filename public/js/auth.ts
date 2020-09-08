const authSwitchLinks = document.querySelectorAll(".switch");
const authModals = document.querySelectorAll(".auth .modal");
const authWrapper = document.querySelector(".auth");
const registerForm = document.querySelector(".register") as HTMLFormElement;
const loginForm = document.querySelector(".login") as HTMLFormElement;
const signOut = document.querySelector(".sign-out");

// toggle auth modals
authSwitchLinks.forEach((link) => {
  link.addEventListener("click", () => {
    authModals.forEach((modal) => modal.classList.toggle("active"));
  });
});

// register user
registerForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const email = registerForm.email.value;
  const password = registerForm.password.value;
  // @ts-ignore
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log("User registered", user);
      registerForm.reset();
    })
    .catch((e) => {
      registerForm.querySelector(".error").textContent = e.message;
    });
});
