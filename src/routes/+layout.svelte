<script>
    import "../app.css";
    import { invalidateAll } from "$app/navigation";
    import { supabase } from "$lib/supabase";
    import { onMount } from "svelte";

    // supabase auth subscription
    onMount(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
            invalidateAll();
        });
        return () => {
            subscription.unsubscribe();
        };
    });
</script>

<div class="h-full w-full lg:flex lg:flex-col">
    <div class="p-12 w-full h-full">
        <slot />
    </div>
    <!-- footer -->
    <footer class="footer footer-center p-4 bg-primary text-primary-content">
        <div>
            <p>Copyright © 2023 - All right reserved by Marco Vidali & Co.</p>
        </div>
    </footer>
</div>
