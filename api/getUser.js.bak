import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

  try {

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    const { session_id } = req.body;

    if (!session_id) {
      return res.status(400).json({
        success: false,
        error: "No session_id"
      });
    }

    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("session_id", session_id)
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        error: "User not found"
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