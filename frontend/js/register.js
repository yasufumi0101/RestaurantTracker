document.addEventListener('DOMContentLoaded', registerRestaurant);

const starColor = document.getElementById('star_color');
let selectedLocation = null;
let selectedRating = 0;

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
      selectedRating = Math.round((clickX / totalWidth) * 10) / 2; // 0.5刻みにする

      setStarRating(selectedRating);
    });
  });

  // 登録ボタンをクリックしたときの処理
  const registerButton = document.getElementById('register-button');
  registerButton.addEventListener('click', function () {
    const name = document.getElementById('restaurant-name').textContent.trim();
    const date = document.getElementById('date-input').value;
    const memo = document.getElementById('memo').value;

    if (!date) {
      alert("日付が入力されていません");
      return;
    } else if (!selectedRating) {
      alert("評価が入力されていません");
      return;
    } else if (!name || !selectedLocation) {
      alert("レストランが選択されていません");
      return;
    }

    const data = {
      name: name,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      rating: selectedRating,
      memo: memo,
      visited_at: date
    }

    fetch('http://localhost:8080/registrations/restaurant', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('登録が完了しました');
          // 入力値のリセット
          document.getElementById('restaurant-name').textContent = '';
          document.getElementById('date-input').value = '';
          document.getElementById('memo').value = '';
          setStarRating(0);
          selectedLocation = null;

          // ページのリロード
          location.reload();
        } else {
          alert('登録に失敗しました');
          console.error('登録エラー:', data.error);
        }
      })
      .catch(error => {
        alert('登録に失敗しました');
        console.error('登録エラー:', error);
      });
  })
}

function setSelectedLocation(location) {
  selectedLocation = location;
}

window.setSelectedLocation = setSelectedLocation;