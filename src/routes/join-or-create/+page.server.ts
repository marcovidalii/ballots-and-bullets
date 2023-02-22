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

        // redirecting to index
        throw redirect(303, "/");
    },
};
