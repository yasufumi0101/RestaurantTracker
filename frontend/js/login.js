// 通常のログイン画面の処理を行う
// DOMContentLoadedとは、HTMLとCSSが読み込まれた後に実行される関数
document.addEventListener('DOMContentLoaded', initializeLogin);

function initializeLogin() {

  const token = localStorage.getItem('token');
  if (token) {
    fetch('http://localhost:8080/auth/validate', {
      method: "GET",
      mode: 'cors',
      credentials: "include",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.valid) {
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = '/map'; // 認証成功時に遷移する
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('エラーが発生しました');
      });
  }

  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', submitLoginInformation);
}


function submitLoginInformation(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // メールアドレスの確認
  if (!email.match(/.+@.+\..+/)) {
    window.alert('メールアドレスを確認してください');
    return;
  }

  // パスワードの確認。
  // 文字数が8~16字以内. 半角数字、半角英字がそれぞれ一文字以上使用されている
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  if (!password.match(passwordRegex)) {
    window.alert('パスワードが正しいか確認してください');
    return;
  }

  // サーバーへログイン情報を送信
  fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password })
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        // ログイン情報を保存
        localStorage.setItem('token', data.token);

        fetch('http://localhost:8080/auth/validate', {
          method: "GET",
          mode: 'cors',
          credentials: "include",
          headers: {
            'Authorization': `Bearer ${data.token}`
          }
        })
          .then(response => response.json())
          .then(data => {
            if (data.valid) {
              localStorage.setItem("user", JSON.stringify(data.user));
              window.location.href = '/map';
            }
          })
      } else {
        alert('ログイン情報が正しくありません');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('エラーが発生しました');
    });
}
