<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<div class="flex h-full gap-12">
    <div class="h-full flex-1 flex items-center justify-center">
        <div class="card lg:card-side bg-base-100 shadow-xl w-full h-full">
            <!-- body -->
            <div class="card-body flex gap-4">
                <!-- title -->
                <article class="prose">
                    <h1 class="text-primary responsive-text-4xl">
                        Lorem Ipsum
                    </h1>
                </article>
            </div>
        </div>
    </div>

    <div class="flex flex-col flex-1 gap-12">
        <!-- your party -->
        <div class="card lg:card-side bg-base-100 h-full shadow-xl w-full">
            <!-- body -->
            <div class="card-body flex gap-4">
                <!-- title -->
                <article class="prose">
                    <h1 class="text-primary responsive-text-4xl">Your party</h1>
                </article>
            </div>
        </div>

        <!-- players -->
        <div class="card lg:card-side bg-base-100 shadow-xl w-full">
            <!-- body -->
            <div class="card-body flex gap-4">
                <!-- title -->
                <article class="prose">
                    <h1 class="text-primary responsive-text-4xl">Players</h1>
                </article>

                <!-- players -->
                <hr />
                {#each data.players as player}
                    <p class="responsive-text-base">{player.name}</p>
                    <hr />
                {/each}
            </div>
        </div>
    </div>
</div>
