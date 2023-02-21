import { writable } from "svelte/store";

export const name = writable();
export const email = writable();
export const password = writable("");
export const confirmPassword = writable("");
export const loading = writable();
