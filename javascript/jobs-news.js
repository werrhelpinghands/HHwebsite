function logout() {
  localStorage.removeItem("admin");
  localStorage.removeItem("token");
  window.location.replace("/index_job_common.html");
}
