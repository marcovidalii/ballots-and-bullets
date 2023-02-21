<script lang="ts">
    import PasswordInput from "$lib/common/PasswordInput.svelte";
    import { email, password, loading } from "$lib/sign-in/stores";
    import { _signIn } from "./+page";
    import Toast from "$lib/common/Toast.svelte";
</script>

<!-- toast -->
<Toast />

<!-- container -->
<div class="h-full flex items-center justify-center">
    <div class="card lg:card-side bg-base-100 shadow-xl text-lg responsive-w">
        <!-- body -->
        <div class="card-body flex justify-between gap-6 w-1/2">
            <!-- title -->
            <article class="prose">
                <h1 class="text-primary responsive-text-4xl">
                    Sign in to your account
                </h1>
            </article>

            <!-- form -->
            <form class="flex flex-col gap-2" on:submit={_signIn}>
                <!-- inputs -->
                <input
                    placeholder="Type your email..."
                    type="email"
                    class="input input-bordered w-full responsive-text-base"
                    required
                    bind:value={$email}
                />
                <PasswordInput
                    placeholder="Write your password..."
                    bind:value={$password}
                />

                <!-- submit -->
                <button
                    type="submit"
                    class="btn btn-primary responsive-text-sm {$loading &&
                        'loading'}">{$loading ? "" : "Sign in"}</button
                >
            </form>

            <!-- sign in navigation -->
            <p class="text-center responsive-text-lg">
                Don't have an account? <a
                    href="/sign-up"
                    class="font-bold text-primary">Sign up</a
                >
            </p>
        </div>

        <!-- image -->
        <figure
            class="bg-primary after:h-full w-1/2 bg-[url('/sign-in/middle-aged-politician.png')] bg-cover"
        />
    </div>
</div>
