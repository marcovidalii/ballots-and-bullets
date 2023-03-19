<script lang="ts">
    import Toast from "$lib/Toast.svelte";
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    export let form: ActionData;
    let loading = false;
    let image: FileList;
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
                    Create your party
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
                    placeholder="Enter the party's name..."
                    type="text"
                    class="input input-bordered responsive-text-base"
                    required
                    name="name"
                />
                <input
                    placeholder="Type the party's slogan..."
                    type="text"
                    class="input input-bordered responsive-text-base"
                    required
                    name="slogan"
                />

                <div class="flex items-center justify-center w-full">
                    <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center w-full h-64 border-2 border-base-300 border-dashed rounded-lg cursor-pointer"
                    >
                        <div class="flex flex-col items-center justify-center">
                            <svg
                                aria-hidden="true"
                                class="w-10 h-10 mb-3 text-base-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                /></svg
                            >
                            <p
                                class="mb-2 text-sm text-base-300 responsive-text-base"
                            >
                                {#if image}
                                    {image[0].name}
                                {:else}
                                    Upload the party's image
                                {/if}
                            </p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            class="hidden"
                            name="image"
                            accept="image/*"
                            bind:files={image}
                        />
                    </label>
                </div>

                <!-- submit -->
                <button
                    type="submit"
                    class="btn btn-primary responsive-text-sm {loading &&
                        'loading'}">{loading ? "" : "Create"}</button
                >
            </form>
        </div>

        <!-- image -->
        <figure
            class="bg-primary bg-top w-1/2 bg-[url('/images/parliament.png')] bg-cover"
        />
    </div>
</div>
