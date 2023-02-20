import { createClient } from "@supabase/supabase-js";
import { writable } from "svelte/store";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
export const currentUser = writable(await supabase.auth.getUser());
