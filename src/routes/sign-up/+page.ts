import { goto } from "$app/navigation";
import {
    confirmPassword,
    email,
    loading,
    name,
    password,
} from "$lib/sign-up/stores";
import { get } from "svelte/store";
import { currentUser, supabase } from "$lib/common/supabase";
import { updateCurrentUser } from "$lib/common/utils";
import { message } from "$lib/common/stores";

export const _signUp = async () => {
    // checking passwords
    if (get(password) !== get(confirmPassword)) {
        message.set({
            type: "error",
            content: "Passwords do not match",
        });
        return;
    }

    // emptying message
    message.set({
        type: "",
        content: "",
    });

    // enabling loading
    loading.set(true);

    // signin up
    let { error: signUpError } = await supabase.auth.signUp({
        email: get(email) as string,
        password: get(password) as string,
    });

    // managing error
    if (signUpError) {
        message.set({
            type: "error",
            content: signUpError.message,
        });
        loading.set(false);
        return;
    }

    // updating current user
    await updateCurrentUser();

    // creating profile
    const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ id: get(currentUser).data.user!.id, name: get(name) }]);

    // managing error
    if (profileError) {
        message.set({
            type: "error",
            content: profileError.message,
        });
        loading.set(false);
        return;
    }

    // navigating to index
    goto("/");
};
