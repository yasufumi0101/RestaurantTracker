document.addEventListener('DOMContentLoaded', registerRestaurant);

const starColor = document.getElementById('star_color');

function setStarRating(rating) {
  const roundRating = Math.floor(rating * 2) / 2;
  starColor.style.width = (roundRating / 5) * 100 + '%';
}

function registerRestaurant() {
  const starElements = document.querySelectorAll('.star');
  starElements.forEach(starElement => {
    starElement.addEventListener('click', function (event) {
      const rect = starElement.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const totalWidth = rect.width;
      const selectedRating = Math.round((clickX / totalWidth) * 10) / 2; // 0.5刻みにする

      setStarRating(selectedRating);
    });
  });
}