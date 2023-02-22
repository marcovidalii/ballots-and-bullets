import "$lib/supabase";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    // setting locals
    const { session, supabaseClient } = await getSupabase(event);

    event.locals.sb = supabaseClient;
    event.locals.session = session;

    // routing traffic
    if (event.url.pathname === "/") {
        throw redirect(303, "/sign-up");
    }

    // resolving event
    return resolve(event);
};
