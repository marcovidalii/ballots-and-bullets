<script lang="ts">
    export let placeholder: string;
    export let name: string;
</script>

<input
    {placeholder}
    {name}
    minlength="6"
    type="password"
    required
    class="input input-bordered responsive-text-base"
/>
