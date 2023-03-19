<script lang="ts">
    import Toast from "$lib/Toast.svelte";
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    export let form: ActionData;
    let loading = false;
</script>

<!-- toast -->
<Toast {form} />

<!-- container -->
<div class="h-full flex items-center justify-center">
    <div class="card lg:card-side bg-base-100 shadow-xl responsive-w">
        <!-- body -->
        <div class="card-body flex gap-6">
            <!-- title -->
            <article class="prose">
                <h1 class="text-primary responsive-text-4xl">
                    Sign in to your account
                </h1>
            </article>

            <!-- form -->
            <form
                class="flex flex-col gap-2"
                method="post"
                use:enhance={() => {
                    form = null;
                    loading = true;
                    return async ({ update }) => {
                        await update({ reset: false });
                        loading = false;
                    };
                }}
            >
                <!-- inputs -->
                <input
                    placeholder="Type your email..."
                    type="email"
                    class="input input-bordered responsive-text-base"
                    required
                    name="email"
                />
                <input
                    placeholder="Write your password..."
                    type="password"
                    class="input input-bordered responsive-text-base"
                    required
                    minlength="6"
                    name="password"
                />

                <!-- submit -->
                <button
                    type="submit"
                    class="btn btn-primary responsive-text-sm {loading &&
                        'loading'}">{loading ? "" : "Sign in"}</button
                >
            </form>

            <!-- sign up navigation -->
            <p class="text-center responsive-text-lg">
                Don't have an account? <a
                    href="/sign-up"
                    class="font-bold text-primary">Sign up</a
                >
            </p>
        </div>

        <!-- image -->
        <figure
            class="bg-primary bg-top w-1/2 bg-[url('/images/middle-aged-politician.png')] bg-cover"
        />
    </div>
</div>
