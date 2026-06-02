async function createIdentity() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const psn = document.getElementById("psn").value;
  const image_url = document.getElementById("image").value;

  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, city, psn, image_url })
  });

  const data = await res.json();

  if (data.success) {
    showPopup("تم إنشاء الهوية بنجاح 🎉 رقمك: " + data.data[0].identity_number);
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
  div.style.background = "#00c853";
  div.style.padding = "15px";
  div.style.borderRadius = "10px";
  div.style.color = "black";

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 3000);
}