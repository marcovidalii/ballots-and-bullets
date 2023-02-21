<script lang="ts">
    import { message } from "$lib/common/stores";
</script>

<div class="toast toast-top toast-center w-max responsive-text-base">
    {#if $message}
        {#if $message.type === "error"}
            <div class="alert alert-error">
                <div>
                    <span>{$message.content}</span>
                </div>
            </div>
        {/if}
    {/if}
</div>
