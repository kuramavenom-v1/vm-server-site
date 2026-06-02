function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

async function createIdentity() {

  console.log("بدأ التنفيذ");

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const psn = document.getElementById("psn").value;
  const file = document.getElementById("image").files[0];

  let image_base64 = "";

  if (file) {
    image_base64 = await toBase64(file);
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
        psn,
        image_url: image_base64
      })
    });

    const data = await res.json();

    if (data.success) {

      const user = data.data[0];

      // 🟢 حفظ الهوية في الجهاز (NEW)
      localStorage.setItem("vm_user_id", user.identity_number);

      // تعبئة البطاقة
      document.getElementById("cardName").innerText = user.name;
      document.getElementById("cardId").innerText = "ID: " + user.identity_number;
      document.getElementById("cardCity").innerText = user.city;
      document.getElementById("cardPSN").innerText = user.psn;
      document.getElementById("cardImage").src = user.image_url;

      // إظهار البطاقة
      const card = document.getElementById("idCard");
      const inner = document.querySelector(".card-inner");

      card.classList.remove("hidden");

      inner.style.transform = "rotateY(180deg)";

      setTimeout(() => {
        inner.style.transform = "rotateY(0deg)";
      }, 300);

    } else {
      alert("حدث خطأ ❌");
    }

  } catch (err) {
    console.log(err);
    alert("فشل الاتصال بالـ API");
  }
}


/* 🟢 تسجيل دخول تلقائي عند فتح الموقع (NEW) */
window.onload = async () => {

  const id = localStorage.getItem("vm_user_id");

  if (!id) return;

  try {

    const res = await fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ identity_number: id })
    });

    const data = await res.json();

    if (data.success) {

      const user = data.data;

      document.getElementById("cardName").innerText = user.name;
      document.getElementById("cardId").innerText = "ID: " + user.identity_number;
      document.getElementById("cardCity").innerText = user.city;
      document.getElementById("cardPSN").innerText = user.psn;
      document.getElementById("cardImage").src = user.image_url;

      document.getElementById("idCard").classList.remove("hidden");
    }

  } catch (err) {
    console.log(err);
  }
};