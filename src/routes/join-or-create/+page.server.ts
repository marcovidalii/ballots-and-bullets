import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    join: async ({ request, locals }) => {
        // getting form data
        const body = Object.fromEntries(await request.formData());

        // checking if game exists
        const { data, error: checkError } = await locals.sb
            .from("games")
            .select("*")
            .eq("id", body.code)
            .limit(1);

        // managing error
        if (checkError) {
            return {
                type: "error",
                message: checkError.message,
            };
        }

        // managing no game
        if (data.length === 0) {
            return {
                type: "error",
                message: "Game doesn't exist",
            };
        }

        // joining game
        const { error: joinError } = await locals.sb
            .from("games")
            .update({
                users: [
                    ...data[0].users,
                    (await locals.sb.auth.getUser()).data.user!.id,
                ],
            })
            .eq("id", body.code);

        // managing error
        if (joinError) {
            return {
                type: "error",
                message: joinError.message,
            };
        }

        // setting is in game
        const { data: dataa, error: isInGameError } = await locals.sb
            .from("profiles")
            .update({ is_in_game: true })
            .eq("id", (await locals.sb.auth.getUser()).data.user!.id);

        // managing error
        if (isInGameError) {
            return {
                type: "error",
                message: isInGameError.message,
            };
        }

        // redirecting to index
        throw redirect(303, "/");
    },

    create: async ({ request, locals }) => {
        // getting form data
        const body = Object.fromEntries(await request.formData());

        // creating game
        const { error } = await locals.sb
            .from("games")
            .insert([
                { users: [(await locals.sb.auth.getUser()).data.user!.id] },
            ]);

        // managing error
        if (error) {
            return {
                type: "error",
                message: error.message,
            };
        }

        // setting is in game
        const { error: isInGameError } = await locals.sb
            .from("profiles")
            .update({ is_in_game: true })
            .eq("id", (await locals.sb.auth.getUser()).data.user!.id);

        // managing error
        if (isInGameError) {
            return {
                type: "error",
                message: isInGameError.message,
            };
        }

        // redirecting to index
        throw redirect(303, "/");
    },
};
