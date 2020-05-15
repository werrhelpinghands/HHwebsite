async function getJobs() {
  await axios({
    url: "https://helpinghands-server.herokuapp.com/api/jobs",
    method: "GET",
  }).then((res) => {
    console.log(res.data);
    let body = "";
    res.data.forEach((post) => {
      body = `${body} 
            <a href="job-page.html?id=${post._id}" class="listing full-time">
							<div class="listing-logo">
								<img src=${post.logo} alt="">
							</div>
							<div class="listing-title">
								<h6 style="font-weight: bold;">${post.title}</h6>
								<h6>${post.company}</h6>
								<h6><span class="listing-type">APPLY</span></h6>
								<h6>${post.location}</h6>
								<h6>${post.pay}</h6>
								<h6>TYPE : ${post.type}</h6>
							</div>
						</a>`;
    });
    document.getElementById('jobs-container').innerHTML = body
  });
}