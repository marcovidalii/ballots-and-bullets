<script lang="ts">
    import Toast from "$lib/Toast.svelte";
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    export let form: ActionData;

    let joinLoading = false;
    let createLoading = false;
</script>

<!-- toast -->
<Toast {form} />

<!-- container -->
<div class="h-full flex items-center justify-center">
    <div class="card lg:card-side bg-base-100 shadow-xl responsive-w">
        <!-- body -->
        <div class="card-body flex gap-6">
            <!-- join title -->
            <article class="prose">
                <h1 class="text-primary responsive-text-4xl">Join a game</h1>
            </article>

            <!-- join form -->
            <form
                class="flex flex-col gap-2"
                method="post"
                action="?/join"
                use:enhance={() => {
                    form = null;
                    joinLoading = true;
                    return async ({ update }) => {
                        await update({ reset: false });
                        joinLoading = false;
                    };
                }}
            >
                <!-- inputs -->
                <input
                    placeholder="Type the game code..."
                    type="text"
                    class="input input-bordered responsive-text-base"
                    required
                    name="code"
                />

                <!-- submit -->
                <button
                    type="submit"
                    class="btn btn-primary responsive-text-sm {joinLoading &&
                        'loading'}">{joinLoading ? "" : "Join"}</button
                >
            </form>

            <!-- separator -->
            <hr class="h-px" />

            <!-- join title -->
            <article class="prose">
                <h1 class="text-primary responsive-text-4xl">Create a game</h1>
            </article>

            <!-- create form -->
            <form
                class="flex flex-col gap-2"
                method="post"
                action="?/create"
                use:enhance={() => {
                    form = null;
                    createLoading = true;
                    return async ({ update }) => {
                        await update({ reset: false });
                        createLoading = false;
                    };
                }}
            >
                <!-- submit -->
                <button
                    type="submit"
                    class="btn btn-primary responsive-text-sm {createLoading &&
                        'loading'}">{createLoading ? "" : "Create"}</button
                >
            </form>
        </div>

        <!-- image -->
        <figure
            class="bg-primary bg-top w-1/2 bg-[url('/images/parliament.png')] bg-cover"
        />
    </div>
</div>
