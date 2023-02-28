import "$lib/supabase";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    // setting locals
    const { session, supabaseClient } = await getSupabase(event);

    event.locals.sb = supabaseClient;
    event.locals.session = session;

    // user isn't signed in
    if (!(await event.locals.sb.auth.getUser()).data.user) {
        throw redirect(303, "/sign-up");
    }

    if (event.url.pathname === "/") {
        // user isn't in game
        let isInGame = (
            await event.locals.sb
                .from("profiles")
                .select("game")
                .eq("id", (await event.locals.sb.auth.getUser()).data.user!.id)
        ).data![0].game;
        if (!isInGame) {
            throw redirect(303, "/join-or-create");
        }

        // user game isn't started
        const currentGame = (
            await event.locals.sb
                .from("profiles")
                .select("game")
                .eq("id", (await event.locals.sb.auth.getUser()).data.user!.id)
        ).data![0].game;
        const isGameStarted = (
            await event.locals.sb
                .from("games")
                .select("is_started")
                .eq("id", currentGame)
        ).data![0].is_started;
        if (!isGameStarted) {
            throw redirect(303, "/lobby");
        }
    }

    if (event.url.pathname === "/join-or-create") {
        // user is in game
        let isInGame = (
            await event.locals.sb
                .from("profiles")
                .select("game")
                .eq("id", (await event.locals.sb.auth.getUser()).data.user!.id)
        ).data![0].game;
        if (isInGame) {
            throw redirect(303, "/");
        }
    }

    if (event.url.pathname === "/lobby") {
        // user isn't in game
        let isInGame = (
            await event.locals.sb
                .from("profiles")
                .select("game")
                .eq("id", (await event.locals.sb.auth.getUser()).data.user!.id)
        ).data![0].game;
        if (!isInGame) {
            throw redirect(303, "/");
        }

        // user game is started
        const currentGame = (
            await event.locals.sb
                .from("profiles")
                .select("game")
                .eq("id", (await event.locals.sb.auth.getUser()).data.user!.id)
        ).data![0].game;
        const isGameStarted = (
            await event.locals.sb
                .from("games")
                .select("is_started")
                .eq("id", currentGame)
        ).data![0].is_started;
        if (isGameStarted) {
            throw redirect(303, "/");
        }
    }

    // resolving event
    return resolve(event);
};
