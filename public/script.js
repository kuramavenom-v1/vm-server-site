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

  let image_base64 = "";

  if (file) {
    image_base64 = await toBase64(file);
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

  if (data.success) {
    alert("تم إنشاء الهوية 🎉 رقمك: " + data.data[0].identity_number);
  } else {
    alert("حدث خطأ ❌");
  }
}