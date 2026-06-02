async function createIdentity() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;
  const psn = document.getElementById("psn").value;
  const image_url = document.getElementById("image").value;

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
  alert("تم إنشاء الهوية: " + data.data[0].identity_number);
}