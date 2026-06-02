import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// توليد رقم هوية يبدأ بـ 388
function generateID() {
  let base = "388";
  let random;

  do {
    random = Math.floor(10000 + Math.random() * 90000).toString();
  } while (["12345","23456","34567","45678","56789"].includes(random));

  return base + random;
}

export default async function handler(req, res) {
  
  if (req.method !== "POST") {
    return res.status(405).json({ 
      success: false,
      error: "Method not allowed" 
    });
  }

  try {
    
    const { name, age, city, psn, image_url } = req.body;

    // مهم جدًا للتأكد
    if (!name || !age || !city || !psn) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    const identity_number = generateID();

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          age,
          city,
          psn,
          identity_number,
          image_url
        }
      ])
      .select();

    // 👇 أهم جزء (إظهار الخطأ الحقيقي)
    if (error) {
      console.log("SUPABASE ERROR:", error);

      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    return res.status(200).json({
      success: true,
      data
    });

  } catch (err) {

    console.log("SERVER ERROR:", err);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
}