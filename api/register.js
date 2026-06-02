import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

function generateID() {
  return "388" + Math.floor(10000 + Math.random() * 90000);
}

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { name, age, city, psn, image_url } = req.body;

  const identity_number = generateID();

  const { data, error } = await supabase
    .from("players")
    .insert([
      {
        name,
        age,
        city,
        psn,
        image_url,
        identity_number
      }
    ])
    .select();

  if (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }

  return res.status(200).json({
    success: true,
    data
  });
}