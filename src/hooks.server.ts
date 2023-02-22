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
        // user isn't signed in
        if (!(await event.locals.sb.auth.getUser()).data.user) {
            throw redirect(303, "/sign-up");
        }

        // user is signed in and isn't in game
        let { data } = await event.locals.sb
            .from("profiles")
            .select("*")
            .eq("id", (await event.locals.sb.auth.getUser()).data.user!.id);
        if (!data![0].is_in_game) {
            throw redirect(303, "/join-or-create");
        }
    }

    if (event.url.pathname === "/join-or-create") {
        // user is already in a game
        let { data } = await event.locals.sb
            .from("profiles")
            .select("*")
            .eq("id", (await event.locals.sb.auth.getUser()).data.user!.id);
        if (data![0].is_in_game) {
            throw redirect(303, "/");
        }
    }

    // resolving event
    return resolve(event);
};
