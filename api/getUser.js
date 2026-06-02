import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

  try {

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    const { identity_number } = req.body || {};

    console.log("GET USER ID:", identity_number);

    if (!identity_number) {
      return res.status(400).json({
        success: false,
        error: "Missing identity_number"
      });
    }

    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("identity_number", identity_number);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: data[0]
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}