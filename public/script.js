function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

async function createIdentity() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const psn = document.getElementById("psn").value;

  const file = document.getElementById("image").files[0];
  const image_url = file ? await toBase64(file) : "";

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
      image_url
    })
  });

  const data = await res.json();

  if (data.success) {
    showPopup("تم إنشاء الهوية 🎉 رقمك: " + data.data[0].identity_number);
  } else {
    showPopup("حدث خطأ ❌");
  }
}

function showPopup(text) {
  const div = document.createElement("div");

  div.innerText = text;
  div.style.position = "fixed";
  div.style.bottom = "20px";
  div.style.left = "50%";
  div.style.transform = "translateX(-50%)";
  div.style.background = "black";
  div.style.color = "white";
  div.style.padding = "10px 15px";
  div.style.borderRadius = "8px";
  div.style.fontSize = "14px";

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 3000);
}