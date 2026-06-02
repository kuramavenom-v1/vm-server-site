console.log("SYSTEM READY");

// --------------------
// إنشاء هوية
// --------------------
async function createIdentity() {

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const psn = document.getElementById("psn").value;
  const imageInput = document.getElementById("image");

  let image_base64 = "";

  if (imageInput.files.length > 0) {
    image_base64 = await toBase64(imageInput.files[0]);
  }

  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      age,
      city,
      psn,
      image_url: image_base64
    })
  });

  const data = await res.json();

  if (!data.success) {
    alert("فشل إنشاء الهوية");
    return;
  }

  alert("تم إنشاء الهوية بنجاح\nID: " + data.user.id);

  showUser(data.user);
}

// --------------------
// تسجيل الدخول
// --------------------
async function login() {

  const name = document.getElementById("loginName").value;
  const id = document.getElementById("loginId").value;

  const res = await fetch("/api/getUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name })
  });

  const data = await res.json();

  if (!data.success) {
    alert("بيانات غير صحيحة");
    return;
  }

  showUser(data.user);
}

// --------------------
// عرض الهوية
// --------------------
function showUser(user) {

  document.getElementById("cardName").innerText = user.name;
  document.getElementById("cardId").innerText = "ID: " + user.id;
  document.getElementById("cardCity").innerText = user.city;
  document.getElementById("cardPSN").innerText = user.psn;
  document.getElementById("cardImage").src = user.image_url;

  document.getElementById("idCard").classList.remove("hidden");
}

// --------------------
// تحويل صورة
// --------------------
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}