console.log("SCRIPT LOADED");

async function createIdentity() {

  const name = document.getElementById("name")?.value;
  const age = document.getElementById("age")?.value;
  const city = document.getElementById("city")?.value;
  const psn = document.getElementById("psn")?.value;

  if (!name || !age || !city || !psn) {
    alert("اكمل جميع الحقول");
    return;
  }

  try {

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        age,
        city,
        psn
      })
    });

    const data = await res.json();

    console.log(data);

    if (!data.success) {
      alert(data.error || "فشل التسجيل");
      return;
    }

    localStorage.setItem(
      "session_id",
      data.user.session_id
    );

    alert(
      "تم إنشاء الهوية بنجاح\nID: " +
      data.user.session_id
    );

    window.location.href = "/dashboard.html";

  } catch (err) {

    console.error(err);
    alert("API error register");
  }
}

async function loginUser() {

  const id =
    document.getElementById("login_id")?.value;

  if (!id) {
    alert("ادخل رقم الهوية");
    return;
  }

  try {

    const res = await fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        session_id: id
      })
    });

    const data = await res.json();

    console.log(data);

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

window.onload = async () => {

  const cardName =
    document.getElementById("cardName");

  if (!cardName) return;

  const id =
    localStorage.getItem("session_id");

  if (!id) return;

  try {

    const res = await fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        session_id: id
      })
    });

    const data = await res.json();

    if (!data.success) return;

    showUser(data.user);

  } catch (err) {

    console.error(err);
  }
};

function showUser(user) {

  const cardName =
    document.getElementById("cardName");

  const cardId =
    document.getElementById("cardId");

  const cardCity =
    document.getElementById("cardCity");

  const cardPSN =
    document.getElementById("cardPSN");

  const cardAge =
    document.getElementById("cardAge");

  if (!cardName) return;

  cardName.innerText =
    user.name || "";

  if (cardId)
    cardId.innerText =
      user.session_id || "";

  if (cardCity)
    cardCity.innerText =
      user.city || "";

  if (cardPSN)
    cardPSN.innerText =
      user.psn || "";

  if (cardAge)
    cardAge.innerText =
      user.age || "";
}

function logout() {

  localStorage.removeItem("session_id");

  window.location.href = "/index.html";
}