import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const { name, age, city, psn, image_url } = req.body || {};

  if (!name || !age || !city || !psn) {
    return res.status(400).json({
      success: false,
      error: "Missing fields"
    });
  }

  // ID ثابت 388 + 5 أرقام
  const session_id =
    "388" + Math.floor(10000 + Math.random() * 90000);

  const { data, error } = await supabase
    .from("players")
    .insert([
      {
        name,
        age,
        city,
        psn,
        image_url,
        session_id
      }
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }

  return res.status(200).json({
    success: true,
    user: data
  });
}