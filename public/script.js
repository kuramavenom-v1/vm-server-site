console.log("SCRIPT LOADED");

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);

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

    console.log("SENDING REQUEST");

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

    console.log("STATUS:", res.status);

    const data = await res.json();

    console.log("REGISTER RESPONSE:", data);

    if (!data.success) {
      alert("حدث خطأ أثناء التسجيل");
      return;
    }

    const user =
      data.user ||
      (data.data && data.data[0]) ||
      data.data;

    if (!user) {
      console.log("USER DATA NOT FOUND", data);
      alert("لم يتم العثور على بيانات المستخدم");
      return;
    }

    // حفظ الهوية محلياً
    if (user.identity_number) {
      localStorage.setItem(
        "vm_user_id",
        user.identity_number
      );
    }

    showUser(user);

  } catch (err) {

    console.error("CREATE ERROR:", err);

    alert("فشل الاتصال بالـ API");
  }
}

window.onload = async () => {

  console.log("WINDOW LOADED");

  const id = localStorage.getItem("vm_user_id");

  console.log("STORED ID:", id);

  if (!id) {
    return;
  }

  try {

    const res = await fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        identity_number: id
      })
    });

    console.log("GET USER STATUS:", res.status);

    const data = await res.json();

    console.log("GET USER RESPONSE:", data);

    if (!data.success) {
      return;
    }

    const user = data.data || data.user;

    if (!user) {
      return;
    }

    showUser(user);

  } catch (err) {

    console.error("GET USER ERROR:", err);
  }
};

function showUser(user) {

  console.log("SHOW USER:", user);

  document.getElementById("cardName").innerText =
    user.name || "";

  document.getElementById("cardId").innerText =
    "ID: " + (user.identity_number || "");

  document.getElementById("cardCity").innerText =
    user.city || "";

  document.getElementById("cardPSN").innerText =
    user.psn || "";

  document.getElementById("cardImage").src =
    user.image_url || "";

  document.getElementById("idCard").classList.remove("hidden");
}