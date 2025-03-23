document.addEventListener('DOMContentLoaded', toggleSidebar);

function toggleSidebar() {
  const registerBtn = document.getElementById('register-btn');
  const backBtn = document.getElementById('back-btn');
  const homeSection = document.getElementById('home-section');
  const registerSection = document.getElementById('register-section');
  const signoutBtn = document.getElementById('signout-btn');

  signoutBtn.addEventListener("click", () => {
    localStorage.removeItem('token');
    window.location.href = "/login";
  });

  registerBtn.addEventListener('click', function () {
    homeSection.style.display = 'none';
    registerSection.style.display = 'block';
    backBtn.style.display = 'block';
    signoutBtn.style.display = 'none';
  });

  backBtn.addEventListener('click', function () {
    registerSection.style.display = 'none';
    homeSection.style.display = 'block';
    backBtn.style.display = 'none';
    signoutBtn.style.display = 'block';
  });
}