console.log("SCRIPT LOADED");

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

async function createIdentity() {

  console.log("BUTTON CLICKED");

  try {

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

    console.log("REGISTER RESPONSE:", data);

    if (!data.success) {
      alert("حدث خطأ أثناء التسجيل");
      return;
    }

    const user = data.user;

    // ✅ نحفظ session_id لأنه الموجود فعليًا
    localStorage.setItem(
      "session_id",
      user.session_id
    );

    showUser(user);

  } catch (err) {

    console.error(err);
    alert("فشل الاتصال بالـ API");
  }
}

window.onload = async () => {

  const session_id =
    localStorage.getItem("session_id");

  console.log("SESSION:", session_id);

  if (!session_id) {
    return;
  }

  try {

    const res = await fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        session_id
      })
    });

    const data = await res.json();

    console.log("GET USER:", data);

    if (!data.success) {
      return;
    }

    showUser(data.user);

  } catch (err) {

    console.error(err);
  }
};

function showUser(user) {

  document.getElementById("cardName").innerText =
    user.name || "";

  document.getElementById("cardId").innerText =
    "SESSION: " + (user.session_id || "");

  document.getElementById("cardCity").innerText =
    user.city || "";

  document.getElementById("cardPSN").innerText =
    user.psn || "";

  document.getElementById("cardImage").src =
    user.image_url || "";

  document.getElementById("idCard").classList.remove("hidden");
}