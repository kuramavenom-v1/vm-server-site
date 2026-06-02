console.log("SCRIPT LOADED");

/* =========================
   REGISTER
========================= */
async function createIdentity() {

  try {

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const city = document.getElementById("city").value;
    const psn = document.getElementById("psn").value;
    const imageInput = document.getElementById("image");

    let image_base64 = "";

    if (imageInput && imageInput.files.length > 0) {
      image_base64 = await toBase64(imageInput.files[0]);
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        age,
        city,
        psn,
        image_url: image_base64
      })
    });

    const data = await res.json();

    console.log("REGISTER:", data);

    if (!data.success) {
      alert("فشل إنشاء الهوية");
      return;
    }

    const user = data.user;

    localStorage.setItem("vm_user_id", user.id);

    location.href = "/dashboard.html?id=" + user.id;

  } catch (err) {
    console.error(err);
    alert("فشل الاتصال");
  }
}


/* =========================
   LOGIN
========================= */
async function login() {

  try {

    const id = document.getElementById("loginId").value;

    const res = await fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    const data = await res.json();

    if (!data.success) {
      alert("الهوية غير موجودة");
      return;
    }

    localStorage.setItem("vm_user_id", id);

    location.href = "/dashboard.html?id=" + id;

  } catch (err) {
    console.error(err);
    alert("فشل تسجيل الدخول");
  }
}


/* =========================
   DASHBOARD LOAD
========================= */
window.onload = async () => {

  const path = window.location.pathname;

  if (!path.includes("dashboard")) return;

  const id =
    new URLSearchParams(window.location.search).get("id") ||
    localStorage.getItem("vm_user_id");

  if (!id) return;

  try {

    const res = await fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    const data = await res.json();

    if (!data.success) return;

    const user = data.user;

    document.getElementById("cardName").innerText = user.name;
    document.getElementById("cardId").innerText = user.id;
    document.getElementById("cardAge").innerText = user.age;
    document.getElementById("cardCity").innerText = user.city;
    document.getElementById("cardPSN").innerText = user.psn;
    document.getElementById("cardImage").src = user.image_url;

  } catch (err) {
    console.error(err);
  }
};


/* =========================
   BASE64
========================= */
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}