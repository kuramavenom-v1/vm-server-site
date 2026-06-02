async function createIdentity() {

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const psn = document.getElementById("psn").value;
  const imageInput = document.getElementById("image");

  let image_base64 = "";

  if (imageInput.files.length > 0) {
    const file = imageInput.files[0];
    image_base64 = await toBase64(file);
  }

  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, city, psn, image_url: image_base64 })
  });

  const data = await res.json();

  if (!data.success) {
    alert("فشل إنشاء الهوية");
    return;
  }

  // نروح للداشبورد مع ID
  location.href = `dashboard.html?id=${data.user.id}`;
}

async function login() {

  const id = document.getElementById("loginId").value;

  const res = await fetch("/api/getUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });

  const data = await res.json();

  if (!data.success) {
    alert("الهوية غير موجودة");
    return;
  }

  location.href = `dashboard.html?id=${id}`;
}

window.onload = async () => {

  if (!window.location.pathname.includes("dashboard")) return;

  const id = new URLSearchParams(window.location.search).get("id");

  if (!id) return;

  const res = await fetch("/api/getUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });

  const data = await res.json();

  if (!data.success) return;

  const user = data.user;

  document.getElementById("cardName").innerText = user.name;
  document.getElementById("cardId").innerText = "ID: " + user.id;
  document.getElementById("cardCity").innerText = user.city;
  document.getElementById("cardPSN").innerText = user.psn;
  document.getElementById("cardImage").src = user.image_url;
};

function toBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}