<script lang="ts">
    export let placeholder: string;
    export let value: string;
</script>

<input
    {placeholder}
    bind:value
    minlength="6"
    type="password"
    required
    class="input input-bordered w-full responsive-text-base"
/>
