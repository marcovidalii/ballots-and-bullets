import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    // getting current game
    const currentGame = (
        await locals.sb
            .from("profiles")
            .select("game")
            .eq("id", (await locals.sb.auth.getUser()).data.user!.id)
    ).data![0].game;

    // getting players
    const players = Object.values(
        (
            await locals.sb
                .from("profiles")
                .select("name")
                .eq("game", currentGame)
        ).data!
    );

    return {
        players: players,
    };
};

export const actions: Actions = {
    default: async ({ locals }) => {
        // getting current game
        const currentGame = (
            await locals.sb
                .from("profiles")
                .select("game")
                .eq("id", (await locals.sb.auth.getUser()).data.user!.id)
        ).data![0].game;

        // updating is started
        let { error } = await locals.sb
            .from("games")
            .update({
                is_started: true,
            })
            .eq("id", currentGame);

        // managing error
        if (error) {
            return {
                type: "error",
                message: error.message,
            };
        }

        // navigating to index
        throw redirect(303, "/");
    },
};
