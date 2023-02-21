import { goto } from "$app/navigation";
import { email, loading, password } from "$lib/sign-in/stores";
import { get } from "svelte/store";
import { currentUser, supabase } from "$lib/supabase";
import { message } from "$lib/stores";

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

    // updating the user
    currentUser.set(await supabase.auth.getUser());

    // managing error
    if (signInError) {
        message.set({
            type: "error",
            content: signInError.message,
        });
        loading.set(false);
        return;
    }

    // navigating to index
    goto("/");
};
