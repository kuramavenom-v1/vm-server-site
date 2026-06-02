console.log("VM SCRIPT LOADED");

// تحويل صورة
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

// إنشاء حساب
async function createIdentity() {

  try {

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const city = document.getElementById("city").value;
    const psn = document.getElementById("psn").value;
    const file = document.getElementById("image").files[0];

    let image_url = "";
    if (file) image_url = await toBase64(file);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, city, psn, image_url })
    });

    const data = await res.json();

    if (!data.success) return alert("فشل التسجيل");

    localStorage.setItem("session_id", data.user.session_id);

    showUser(data.user);

  } catch (err) {
    console.error(err);
    alert("API Error");
  }
}

// تحميل المستخدم عند الدخول
window.onload = async () => {

  const session_id = localStorage.getItem("session_id");

  if (!session_id) return;

  try {

    const res = await fetch("/api/getUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id })
    });

    const data = await res.json();

    if (data.success) {
      showUser(data.user);
    }

  } catch (err) {
    console.error(err);
  }

  loadPlayersCount();
};

// عدد اللاعبين الحقيقي
async function loadPlayersCount() {

  try {

    const res = await fetch("/api/users");
    const data = await res.json();

    if (data.success) {
      document.getElementById("playerCount").innerText = data.count;
    }

  } catch (err) {
    console.error(err);
  }
}

// عرض الهوية
function showUser(user) {

  document.getElementById("cardName").innerText = user.name;
  document.getElementById("cardId").innerText = "ID: " + user.session_id;
  document.getElementById("cardCity").innerText = user.city;
  document.getElementById("cardPSN").innerText = user.psn;
  document.getElementById("cardImage").src = user.image_url;

  document.getElementById("idCard").classList.remove("hidden");
}

// تسجيل خروج
function logout() {
  localStorage.removeItem("session_id");
  location.reload();
}