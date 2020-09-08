//@ts-ignore
const ref = firebase
  .firestore()
  .collection("requests")
  .orderBy("upvotes", "desc");

ref.onSnapshot((snapshot) => {
  let requests = [];
  snapshot.forEach((doc) => {
    requests.push({ ...doc.data(), id: doc.id });
  });

  let html = ``;
  requests.forEach((request) => {
    html += `
        <li>
            <span class="text">${request.text}</span>
            <div>
                <span class="votes">${request.upvotes}</span>
            <i class="material-icons upvote" onClick="upvoteText('${request.id}')">arrow_upward</i>
            </div>
        </li>
    `;
  });

  document.querySelector("ul").innerHTML = html;
});

const upvoteText = (id) => {
  //@ts-ignore
  const upvote = firebase.functions().httpsCallable("upvote");
  upvote({ id: id }).catch((e) => {
    console.log(e.message);
    //@ts-ignore
    showNotifs(e.message);
  });
};
