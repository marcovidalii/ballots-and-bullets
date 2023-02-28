<script lang="ts">
    import Toast from "$lib/Toast.svelte";
    import { enhance } from "$app/forms";
    import type { ActionData, PageServerData } from "./$types";
    import { supabase } from "$lib/supabase";
    import { invalidateAll } from "$app/navigation";

    export let data: PageServerData;
    export let form: ActionData;
    let loading = false;

    // subscribing for update events
    supabase
        .channel("custom-all-channel")
        .on(
            "postgres_changes",
            { event: "UPDATE", schema: "public", table: "profiles" },
            async () => {
                await invalidateAll();
            }
        )
        .on(
            "postgres_changes",
            { event: "UPDATE", schema: "public", table: "games" },
            async () => {
                await invalidateAll();
            }
        )
        .subscribe();
</script>

<!-- toast -->
<Toast {form} />

<!-- form -->
<input type="checkbox" id="start-game-modal" class="modal-toggle" />
<div class="modal">
    <div class="modal-box">
        <!-- title -->
        <h3 class="font-bold text-primary responsive-text-lg">Start game</h3>

        <!-- content -->
        <p class="py-4 responsive-text-base">
            Are you sure to start the game? Other players will no longer be able
            to join it.
        </p>

        <!-- close -->
        <label
            for="start-game-modal"
            class="btn btn-primary btn-sm btn-circle absolute right-2 top-2 responsive-text-base"
            >✕</label
        >

        <!-- form -->
        <form
            class="modal-action"
            method="post"
            use:enhance={() => {
                form = null;
                loading = true;
                return async ({ update }) => {
                    await update();
                    loading = false;
                };
            }}
        >
            <!-- submit -->
            <button type="submit">
                <label
                    for="start-game-modal"
                    class="btn btn-primary responsive-text-sm">Yes</label
                >
            </button>
        </form>
    </div>
</div>

<!-- container -->
<div class="h-full flex items-center justify-center">
    <div class="card lg:card-side bg-base-100 shadow-xl responsive-w">
        <!-- body -->
        <div class="card-body flex gap-4">
            <!-- title -->
            <article class="prose">
                <h1 class="text-primary responsive-text-4xl">Game lobby</h1>
            </article>

            <!-- players -->
            <hr />
            {#each data.players as player}
                <p class="responsive-text-base">{player.name}</p>
                <hr />
            {/each}

            <!-- modal toggle -->
            <label
                for="start-game-modal"
                class="btn btn-primary responsive-text-sm {loading &&
                    'loading'}">{loading ? "" : "Start game"}</label
            >
        </div>

        <!-- image -->
        <figure
            class="bg-primary bg-top w-1/2 bg-[url('/join-or-create/parliament.png')] bg-cover"
        />
    </div>
</div>
