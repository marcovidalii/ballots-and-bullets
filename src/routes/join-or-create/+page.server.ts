import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    join: async ({ request, locals }) => {
        // getting form data
        const body = Object.fromEntries(await request.formData());

        // checking if game exists
        const { data, error: checkError } = await locals.sb
            .from("games")
            .select("*")
            .eq("id", body.code);

        // managing error
        if (checkError) {
            return {
                type: "error",
                message: checkError.message,
            };
        }

        // managing no game
        if (data!.length === 0) {
            return {
                type: "error",
                message: "Game doesn't exist",
            };
        }

        // joining game
        const { error: joinError } = await locals.sb
            .from("profiles")
            .update({ game: body.code })
            .eq("id", (await locals.sb.auth.getUser()).data.user!.id);

        // managing error
        if (joinError) {
            return {
                type: "error",
                message: joinError.message,
            };
        }

        // redirecting to index
        throw redirect(303, "/");
    },

    create: async ({ request, locals }) => {
        // creating game
        const { data, error } = await locals.sb
            .from("games")
            .insert([{}])
            .select();

        // managing error
        if (error) {
            return {
                type: "error",
                message: error.message,
            };
        }

        // joining game
        const { error: joinError } = await locals.sb
            .from("profiles")
            .update({ game: (data[0] as Game).id })
            .eq("id", (await locals.sb.auth.getUser()).data.user!.id);

        // managing error
        if (joinError) {
            return {
                type: "error",
                message: joinError.message,
            };
        }

        // redirecting to index
        throw redirect(303, "/");
    },
};
