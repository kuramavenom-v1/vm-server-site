import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({
      success: false,
      error: "Missing id or name"
    });
  }

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("id", id)
    .eq("name", name)
    .single();

  if (error) {
    return res.status(404).json({
      success: false,
      error: "User not found"
    });
  }

  return res.status(200).json({
    success: true,
    user: data
  });
}