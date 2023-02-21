<script lang="ts">
    import { message } from "$lib/stores";
</script>

<div class="toast toast-top toast-center w-max responsive-text-base">
    {#if $message.type === "error"}
        <div class="alert alert-error">
            <span>{$message.content}</span>
        </div>
    {/if}
</div>
