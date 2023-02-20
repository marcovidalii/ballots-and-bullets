import { writable } from "svelte/store";

export const name = writable();
export const email = writable();
export const password = writable("");
export const confirmPassword = writable("");
export const message = writable({ type: "", content: "" });
export const loading = writable();
