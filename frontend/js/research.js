document.addEventListener('DOMContentLoaded', searchRestaurants);

function searchRestaurants() {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');

  if (!searchForm || !searchInput) {
    return;
  }

  searchForm.addEventListener("submit", handleSearch);
}

function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById('search-input');
  const searchValue = searchInput.value;
  const query = searchValue.trim(); // 両端の空白を削除

  if (!query) {
    alert("検索ワードを入力してください");
    return;
  }

  fetch('http://localhost:8080/search', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, language: 'ja', region: 'jp' })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success && data.Location) {
        updateMap(data.Location, data.name);
        displayRestaurantName(data.name);
      } else {
        alert('検索結果が見つかりませんでした');
      }
    })
    .catch(error => { console.error('検索エラー:', error); });
}

function updateMap(location, name) {
  if (!map) {
    console.error('mapが定義されていません');
    return;
  }

  map.setCenter(location);

  new google.maps.Marker({
    position: location,
    map: map,
    title: name
  });
}

function displayRestaurantName(name) {
  const restaurantName = document.getElementById('restaurant-name');
  const searchResult = document.getElementById('search-result');
  const registerBtn = document.getElementById('register-button');
  const star = document.getElementById('star');
  const title = document.getElementById('rating-title');
  const memoTitle = document.getElementById('memo-title');
  const memo = document.getElementById('memo');

  if (restaurantName) {
    restaurantName.textContent = name;
    searchResult.style.display = 'block';
    registerBtn.style.display = 'block';
    star.style.display = 'block';
    title.style.display = 'block';
    memoTitle.style.display = 'block';
    memo.style.display = 'block';
  } else {
    searchResult.style.display = 'none';
    registerBtn.style.display = 'none';
    star.style.display = 'none';
    title.style.display = 'none';
    memoTitle.style.display = 'none';
    memo.style.display = 'none';
  }
}