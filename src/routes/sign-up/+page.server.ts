import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request, locals }) => {
        // getting form data
        const body = Object.fromEntries(await request.formData());

        // checking passwords
        if (body.password !== body.confirmPassword) {
            return {
                type: "error",
                message: "Passwords do not match",
            };
        }

        // signin up
        let { error: signUpError } = await locals.sb.auth.signUp({
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

        // creating profile
        const { error: profileError } = await locals.sb
            .from("profiles")
            .insert([
                {
                    user_id: (await locals.sb.auth.getUser()).data.user?.id,
                    name: body.name,
                },
            ]);

        // managing error
        if (profileError) {
            return {
                type: "error",
                message: profileError.message,
            };
        }

        // navigating to index
        throw redirect(303, "/");
    },
};
