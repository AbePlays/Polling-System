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
      registerForm.reset();
    })
    .catch((e) => {
      loginForm.querySelector(".error").textContent = e.message;
    });
});

// signout user
signOut.addEventListener("click", () => {
  //@ts-ignore
  firebase
    .auth()
    .signOut()
    .then(() => console.log("Signed Out"));
});

// listening to auth state changes
//@ts-ignore
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User exist", user);
    authWrapper.classList.remove("open");
    authModals.forEach((modal) => modal.classList.remove("active"));
  } else {
    console.log("No user present");
    authWrapper.classList.add("open");
    authModals[0].classList.add("active");
  }
});
