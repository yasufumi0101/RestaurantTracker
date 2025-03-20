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
      console.log("バックエンドからのデータ:", data);
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
  if (restaurantName) {
    restaurantName.textContent = name;
    searchResult.style.display = 'block';
  } else {
    searchResult.style.display = 'none';
  }
}