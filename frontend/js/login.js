const { response } = require("express");

function submitLoginInformation(event) {
  event.preventDefault(); // テスト送信のために入れたが、後で消す。ページ遷移をアカウントごと

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // メールアドレスの確認
  if(!email.match(/.+@.+\..+/)) {
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
  fetch('http://localhost:8080/submit-logininformation',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // ログイン成功時、指定したページに移動
      window.location.href = '/map'; //ログイン情報に沿った遷移に変更必要
    }else {
      alert('ログイン情報が正しくありません');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('エラーが発生しました');
  });
}
