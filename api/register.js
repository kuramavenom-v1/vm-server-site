import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const { name, age, city, psn, image_url } = req.body;

  // 🔥 إنشاء session عشوائي
  const session_id = crypto.randomUUID();

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
    .select();

  if (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

  return res.status(200).json({
    success: true,
    user: data[0]
  });
}