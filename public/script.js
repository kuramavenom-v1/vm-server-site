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

  let image = "";
  if (file) image = await toBase64(file);

  const user = {
    name,
    age,
    city,
    psn,
    image,
    id: "388" + Math.floor(Math.random() * 99999)
  };

  localStorage.setItem("vm_user", JSON.stringify(user));

  window.location.href = "dashboard.html";
}