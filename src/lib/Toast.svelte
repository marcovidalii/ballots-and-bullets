<script lang="ts">
    import type { ActionData } from "../routes/sign-up/$types";

    export let form: ActionData;
</script>

<div class="toast toast-top toast-center w-max responsive-text-base">
    {#if form?.type === "error"}
        <div class="alert alert-error">
            <span>{form?.message}</span>
        </div>
    {/if}
</div>
