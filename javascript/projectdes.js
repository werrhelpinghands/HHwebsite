async function loadProject() {
  console.log("loading");

  let _id = window.location.search.split("=")[1];
  await axios({
    url: `https://helpinghands-server.herokuapp.com/api/projects/${_id}`,
    method: "GET",
  })
    .then((res) => {
      let data = res.data;
      let html = `${data.ppt}
    <div class="contitledes">

    <button id="deleteBtn" onclick="deleteProject()" style="color: white; background-color: red; border: none; padding: 5px; border-radius: 5px; margin-bottom: 20px;"> Delete Project <button>

      <h3>${data.title}</h3>
      <p>
        ${data.description}
      </p>
    </div>
    <div class="publish">
      <div><span class="pub-d">Published by : </span><span class="pub-da">${data.contactName}</span></div>
      <div><span class="pub-d">Contact : </span><span class="pub-da">${data.contactEmail}</span></div>
    </div>
    <div class="social-lin">
 
       <div class="linkssocial">
        <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwerrhelpinghands.github.io%2Fprojectdes.html%3Fid%3D${_id}"><img class="linksocialicons" src="./images/facebook.png" alt="social share links "></a>
        <a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fwerrhelpinghands.github.io%2Fprojectdes.html%3Fid%3D${_id}&title=Helping%20Hands%20-%20Project"><img class="linksocialicons" src="./images/linkedin.png" alt="social share links "></a>
        <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwerrhelpinghands.github.io%2Fprojectdes.html%3Fid%3D${_id}&text=Helping%20Hands%20-%20Project"><img class="linksocialicons" src="./images/twitter.png" alt="social share links "></a>
      </div> 

      <div class="tsurvey">
        <a href="${data.survey}"><button class="bt-ppts">TAKE SURVEY</button></a>
      </div>
    </div>
    <div class="commentsecmain">
      <button class="maincommentbtn btnn2" onclick="addLike()"><i class="fas fa-thumbs-up"></i></button> 
      <p style="margin-top: 13px;" id="likes">${data.likes} upvotes</p>
    </div>
    <div id="newComment" class="commentssec">
      <div class="formclass">
        <form>
          <input id="formtextbox" placeholder="Share your thoughts...." type="text"> <input id="formtextbutton"
            type="button" onclick="addComment()" value="ADD COMMENT">
        </form>
      </div>
    </div>
    <div class="commentsfromform">`;

      data.comments.reverse();
      data.comments.forEach((comment) => {
        html =
          html +
          `<div class="commentform">
      <h4>${comment.user}</h4>
      <h5>${comment.comment}</h5>
    </div>`;
      });
      html = html + `</div></div>`;
      document.getElementById("projectContainer").innerHTML = html;
      document.getElementById("newComment").hidden = localStorage.getItem(
        "token"
      )
        ? false
        : true;
      document.getElementById('deleteBtn').hidden = localStorage.getItem('admin') === "true" ? false : true
    })
    .catch((err) => {
      console.log("error", err);
    });
}

async function addComment(e) {
  if (document.getElementById("formtextbox").value.length > 1) {
    let _id = window.location.search.split("=")[1];
    let body = {
      comment: document.getElementById("formtextbox").value,
    };
    await axios({
      url: `https://helpinghands-server.herokuapp.com/api/projects/addComment/${_id}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: body,
    })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

async function addLike() {
  let _id = window.location.search.split("=")[1];
  await axios({
    url: `https://helpinghands-server.herokuapp.com/api/projects/addLike/${_id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(() => {
    let upvote = document.getElementById("likes").innerHTML;
    let newCount = parseInt(upvote.split(" ")[0]) + 1;
    document.getElementById("likes").innerHTML = `${newCount} upvotes`;
  });
}

async function deleteProject() {
  let _id = window.location.search.split("=")[1];
  await axios({
    url: `https://helpinghands-server.herokuapp.com/api/projects/deleteProject/${_id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    window.location.assign(`/projects.html`);
  }).catch(err=>{
    console.log(err);
  })
}

function logout() {
  localStorage.removeItem("admin");
  localStorage.removeItem("token");
  window.location.replace("/projects.html");
}
