console.log("SCRIPT LOADED");

// =====================
// تحويل الصورة
// =====================
async function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// =====================
// إنشاء الهوية
// =====================
async function createIdentity() {

  const name = document.getElementById("name")?.value;
  const age = document.getElementById("age")?.value;
  const city = document.getElementById("city")?.value;
  const psn = document.getElementById("psn")?.value;
  const imageFile = document.getElementById("image")?.files[0];

  if (!name || !age || !city || !psn) {
    alert("اكمل جميع الحقول");
    return;
  }

  let image_url = "";

  if (imageFile) {
    image_url = await toBase64(imageFile);
  }

  try {

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        age,
        city,
        psn,
        image_url
      })
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.error || "فشل التسجيل");
      return;
    }

    localStorage.setItem("session_id", data.user.session_id);

    window.location.href = "/dashboard.html";

  } catch (err) {
    console.error(err);
    alert("API error register");
  }
}

// =====================
// تسجيل الدخول
// =====================
async function loginUser() {

  const id = document.getElementById("login_id")?.value;

  if (!id) {
    alert("ادخل رقم الهوية");
    return;
  }

  try {

    const res = await fetch("/api/getUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: id })
    });

    const data = await res.json();

    if (!data.success) {
      alert("رقم الهوية غير موجود");
      return;
    }

    localStorage.setItem("session_id", id);

    window.location.href = "/dashboard.html";

  } catch (err) {
    console.error(err);
    alert("API error login");
  }
}

// =====================
// تحميل الداشبورد (أقوى من onload)
// =====================
document.addEventListener("DOMContentLoaded", async () => {

  const id = localStorage.getItem("session_id");

  if (!id) return;

  try {

    const res = await fetch("/api/getUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: id })
    });

    const data = await res.json();

    if (!data.success) return;

    showUser(data.user);

  } catch (err) {
    console.error(err);
  }
});

// =====================
// عرض الهوية (معدل + آمن)
// =====================
function showUser(user) {

  const cardName = document.getElementById("cardName");
  const cardId = document.getElementById("cardId");
  const cardCity = document.getElementById("cardCity");
  const cardPSN = document.getElementById("cardPSN");
  const cardAge = document.getElementById("cardAge");
  const cardImage = document.getElementById("cardImage");

  if (!cardName) return;

  cardName.innerText = user.name || "";
  cardId.innerText = user.session_id || "";
  cardCity.innerText = user.city || "—";
  cardPSN.innerText = user.psn || "—";
  cardAge.innerText = user.age || "—";

  //  الصورة (إصلاح نهائي)
  if (cardImage) {
    if (user.image_url && user.image_url !== "") {
      cardImage.src = user.image_url;
    } else {
      cardImage.src = "/default.png"; // لو تبي صورة افتراضية
    }
  }
}

// =====================
// تسجيل خروج
// =====================
function logout() {
  localStorage.removeItem("session_id");
  window.location.href = "/index.html";
}