async function createIdentity() {
  console.log("بدأ التنفيذ");

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "test",
        age: "20",
        city: "test",
        psn: "test",
        image_url: ""
      })
    });

    console.log("STATUS:", res.status);

    const data = await res.json();
    console.log("DATA:", data);

    alert("تم الإرسال بنجاح");

  } catch (err) {
    console.log("ERROR:", err);
    alert("فشل الاتصال بالـ API");
  }
}