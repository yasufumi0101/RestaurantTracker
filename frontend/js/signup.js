document.addEventListener('DOMContentLoaded', () => {
  const signupBtn = document.getElementById('signup-btn');
  signupBtn.addEventListener('click', () => {
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
      window.alert('文字数が8~16字以内。 半角数字、半角英字がそれぞれ一文字以上使用されているか確認してください');
      return;
    }

    fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("登録が完了しました");
          window.location.href = "/";
        } else {
          alert("すでに登録済みのメールアドレスです");
          console.error("登録エラー:", data.error);
        }
      })
      .catch(error => {
        alert("登録に失敗しました");
        console.error("登録エラー:", error);
      });
  })
});