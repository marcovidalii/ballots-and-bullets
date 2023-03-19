import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request, locals }) => {
        // getting form data
        const body = Object.fromEntries(await request.formData());

        // no image
        if ((body.image as File).size === 0) {
            return {
                type: "error",
                message: "Please choose the party's image",
            };
        }

        // creating new party
        const { error: createError } = await locals.sb.from("parties").insert([
            {
                id: (await locals.sb.auth.getUser()).data.user?.id,
                name: body.name,
                slogan: body.slogan,
            },
        ]);

        // managing error
        if (createError) {
            return {
                type: "error",
                message: createError.message,
            };
        }

        // uploading party image
        const { error: imageError } = await locals.sb.storage
            .from("images")
            .upload(
                `public/${(await locals.sb.auth.getUser()).data.user?.id}`,
                body.image
            );

        // managing error
        if (imageError) {
            return {
                type: "error",
                message: imageError.message,
            };
        }

        // navigating to index
        throw redirect(303, "/");
    },
};
