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
