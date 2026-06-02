import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

  try {

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    const { name, age, city, psn, image_url } = req.body;

    if (!name || !age || !city) {
      return res.status(400).json({
        success: false,
        error: "Missing fields"
      });
    }

    // session id عشوائي
    const session_id = crypto.randomUUID();

    const { data, error } = await supabase
      .from("players")
      .insert([{
        name,
        age,
        city,
        psn,
        image_url,
        session_id
      }])
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

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}