console.log("SCRIPT LOADED");

async function createIdentity() {
  console.log("REGISTER CLICKED");

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const psn = document.getElementById("psn").value;

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, city, psn })
    });

    const data = await res.json();
    console.log("REGISTER RESPONSE:", data);

    if (!data.success) {
      alert("فشل التسجيل");
      return;
    }

    // حفظ ID الصح
    localStorage.setItem("session_id", data.user.session_id);

    window.location.href = "dashboard.html";

  } catch (err) {
    console.log(err);
    alert("API error register");
  }
}

async function loginUser() {
  console.log("LOGIN CLICKED");

  const id = document.getElementById("login_id").value;

  try {
    const res = await fetch("/api/getUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: id })
    });

    const data = await res.json();

    if (!data.success) {
      alert("ID غير صحيح");
      return;
    }

    localStorage.setItem("session_id", id);
    window.location.href = "dashboard.html";

  } catch (err) {
    alert("API error login");
  }
}

window.onload = async () => {
  const id = localStorage.getItem("session_id");
  if (!id) return;

  const res = await fetch("/api/getUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: id })
  });

  const data = await res.json();

  if (data.success) {
    showUser(data.user);
  }
};

function showUser(user) {
  document.getElementById("cardName").innerText = user.name;
  document.getElementById("cardId").innerText = user.session_id;
  document.getElementById("cardCity").innerText = user.city;
  document.getElementById("cardPSN").innerText = user.psn;
}