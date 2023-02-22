import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request, locals }) => {
        // getting form data
        const body = Object.fromEntries(await request.formData());

        // signin in
        let { error: signUpError } = await locals.sb.auth.signInWithPassword({
            email: body.email as string,
            password: body.password as string,
        });

        // managing error
        if (signUpError) {
            return {
                type: "error",
                message: signUpError.message,
            };
        }

        // navigating to index
        throw redirect(303, "/");
    },
};
