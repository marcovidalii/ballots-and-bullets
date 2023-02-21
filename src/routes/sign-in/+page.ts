import { goto } from "$app/navigation";
import { email, loading, password } from "$lib/sign-in/stores";
import { get } from "svelte/store";
import { supabase } from "$lib/common/supabase";
import { updateCurrentUser } from "$lib/common/utils";
import { message } from "$lib/common/stores";

export const _signIn = async () => {
    // emptying message
    message.set({
        type: "",
        content: "",
    });

    // enabling loading
    loading.set(true);

    // signin up
    let { error: signInError } = await supabase.auth.signInWithPassword({
        email: get(email) as string,
        password: get(password) as string,
    });

    // managing error
    if (signInError) {
        message.set({
            type: "error",
            content: signInError.message,
        });
        loading.set(false);
        return;
    }

    // updating current user
    await updateCurrentUser();

    // navigating to index
    goto("/");
};
