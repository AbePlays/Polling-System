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

  const email: String = registerForm.email.value;
  const password: String = registerForm.password.value;
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

// login user
loginForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const email: String = loginForm.email.value;
  const password: String = loginForm.password.value;
  // @ts-ignore
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log("User logged in", user);
      registerForm.reset();
    })
    .catch((e) => {
      loginForm.querySelector(".error").textContent = e.message;
    });
});
