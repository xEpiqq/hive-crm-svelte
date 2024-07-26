<script>
    import { currentUser, pb } from '../lib/pocketbase'
    let username
    let password

    async function login() {
        const authData = await pb.collection('users').authWithPassword(username, password)
        console.log(authData)
    }

    async function signup() {

        const data = {
            "username": "test_usernameaaaab",
            "email": "jaydencrowtheraasa@example.com",
            "emailVisibility": true,
            "password": "12345678",
            "passwordConfirm": "12345678",
            "name": "test"
        };

        const createdUser = await pb.collection('users').create(data)
        console.log(data.password)
        const authData = await pb.collection('users').authWithPassword(data.username, data.password)
        console.log(authData)
    }

    async function logout() {
        await pb.authStore.clear()
    }

</script>

{#if $currentUser}
    <p>Logged in as {$currentUser.username}</p>
    <img src={`http://127.0.0.1:8090/api/files/_pb_users_auth_/uf487qamnd6yj7v/${$currentUser.avatar}?token=`} alt="avatar" />
    <button on:click={logout}>Logout</button>
{:else}
    <div class="flex items-center justify-center w-screen h-screen">
        <form class="flex flex-col justify-start gap-2">
            <input class="" placeholder="Username" type="text" bind:value={username}/>
            <input placeholder="Password" type="password" bind:value={password}/>
            <button class="bg-blue-300 rounded-md text-white" on:click={signup}>Sign Up</button>
            <button class="bg-blue-300 rounded-md text-white" on:click={login}>Login</button>
        </form>
    </div>
{/if}