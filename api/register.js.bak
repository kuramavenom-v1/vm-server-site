import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

  try {

    console.log("REGISTER API HIT");

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;

    console.log("ENV CHECK:", !!url, !!key);

    if (!url || !key) {
      return res.status(500).json({
        success: false,
        error: "Missing ENV variables"
      });
    }

    const supabase = createClient(url, key);

    if (req.method !== "POST") {
      return res.status(405).json({ success: false });
    }

    const { name, age, city, psn, image_url } = req.body || {};

    const { data, error } = await supabase
      .from("players")
      .insert([{ name, age, city, psn, image_url }])
      .select();

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
    console.log("FATAL ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}