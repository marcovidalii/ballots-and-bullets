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

<div class="h-full lg:flex lg:flex-col">
    <slot />
    <!-- footer -->
    <footer class="footer footer-center p-4 bg-primary text-primary-content">
        <div>
            <p>Copyright © 2023 - All right reserved by Marco Vidali & Co.</p>
        </div>
    </footer>
</div>
