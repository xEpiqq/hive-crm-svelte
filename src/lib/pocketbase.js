import PocketBase from 'pocketbase'
import { writable } from 'svelte/store'

export const pb = new PocketBase('https://pocketbase-production-2587.up.railway.app')
export const currentUser = writable(pb.authStore.model)

pb.authStore.onChange(() => {
    currentUser.set(pb.authStore.model)
})