import { createClient } from "@supabase/supabase-js";

function generateId() {
  const random5 = Math.floor(10000 + Math.random() * 90000);
  return `388${random5}`;
}

export default async function handler(req, res) {

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const { name, age, city, psn, image_url } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      error: "Missing data"
    });
  }

  const userId = generateId();

  const { data, error } = await supabase
    .from("players")
    .insert([
      {
        id: userId,
        name,
        age,
        city,
        psn,
        image_url
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