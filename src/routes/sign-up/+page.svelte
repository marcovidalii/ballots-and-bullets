<script lang="ts">
    import PasswordInput from "$lib/sign-up-and-sign-in/PasswordInput.svelte";
    import {
        name,
        email,
        password,
        confirmPassword,
        loading,
    } from "$lib/sign-up/stores";
    import { _signUp } from "./+page";
    import Toast from "$lib/Toast.svelte";
</script>

<!-- toast -->
<Toast />
<!-- container -->
<div class="h-full flex items-center justify-center">
    <div class="card lg:card-side bg-base-100 shadow-xl responsive-w">
        <!-- body -->
        <div class="card-body flex gap-6">
            <!-- title -->
            <article class="prose">
                <h1 class="text-primary responsive-text-4xl">
                    Sign up for an account
                </h1>
            </article>

            <!-- form -->
            <form class="flex flex-col gap-2" on:submit={_signUp}>
                <!-- inputs -->
                <input
                    placeholder="Enter your name..."
                    type="text"
                    class="input input-bordered responsive-text-base"
                    required
                    bind:value={$name}
                />
                <input
                    placeholder="Type your email..."
                    type="email"
                    class="input input-bordered responsive-text-base"
                    required
                    bind:value={$email}
                />
                <PasswordInput
                    placeholder="Write your password..."
                    bind:value={$password}
                />
                <PasswordInput
                    placeholder="Confirm the password..."
                    bind:value={$confirmPassword}
                />

                <!-- submit -->
                <button
                    type="submit"
                    class="btn btn-primary responsive-text-sm {$loading &&
                        'loading'}">{$loading ? "" : "Sign up"}</button
                >
            </form>

            <!-- sign in navigation -->
            <p class="text-center responsive-text-lg">
                Already have an account? <a
                    href="/sign-in"
                    class="font-bold text-primary">Sign in</a
                >
            </p>
        </div>

        <!-- image -->
        <figure
            class="bg-primary bg-top w-1/2 bg-[url('/sign-up/old-politician.png')] bg-cover"
        />
    </div>
</div>
