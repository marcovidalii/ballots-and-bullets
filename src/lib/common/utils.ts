import { currentUser, supabase } from "./supabase";

export const updateCurrentUser = async () => {
    currentUser.set(await supabase.auth.getUser());
};
