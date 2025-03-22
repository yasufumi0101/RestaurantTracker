document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

  fetch('http://localhost:8080/restaurants/recent', {
    method: "GET",
    mode: 'cors',
    credentials: "include",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('recent-restaurant');

      data.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'card';
        // ISO文字列をDate型に変換して、年月日形式にフォーマット
        const visitedDate = new Date(restaurant.visited_at);
        const formattedDate = visitedDate.toISOString().split('T')[0];
        card.innerHTML = `
          <div class="card-header">
            <div class="restaurant-name">${restaurant.name}</div>
            <div class="restaurant-rating">評価: ${restaurant.rating}</div>
          </div>
          <div class="card-detail">
            <div class="restaurant-date">訪問日: ${formattedDate}</div>
            <div class="restaurant-memo">メモ: ${restaurant.memo || 'なし'}</div>
          </div>
          `;

        // プルダウン機能追加
        const header = card.querySelector('.card-header');
        const detail = card.querySelector('.card-detail');

        header.addEventListener('click', () => {
          if (detail.style.display == "block") {
            detail.style.display = "none";
          } else {
            detail.style.display = "block";
          }
        });

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('最近のレストラン取得失敗:', error);
    });
});