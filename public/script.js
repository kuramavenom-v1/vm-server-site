function toBase64(file) {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.readAsDataURL(file);
  });
}

async function createIdentity() {

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const psn = document.getElementById("psn").value;
  const file = document.getElementById("image").files[0];

  let image_url = "";
  if (file) image_url = await toBase64(file);

  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      age,
      city,
      psn,
      image_url
    })
  });

  const data = await res.json();

  if (!data.success) {
    alert(data.error);
    return;
  }

  localStorage.setItem("vm_user", JSON.stringify(data.data[0]));

  window.location.href = "dashboard.html";
}