<script>
    import { currentUser, pb } from '../lib/pocketbase';
    
    let username;
    let password;
    let confirmPassword;
    let email;
    let fullName;
    let isSignup = false;

    async function login() {
        const authData = await pb.collection('users').authWithPassword(username, password);
        console.log(authData);
    }

    async function signup() {
        const data = {
            "username": username,
            "email": email,
            "emailVisibility": true,
            "password": password,
            "passwordConfirm": confirmPassword,
            "name": fullName
        };

        const createdUser = await pb.collection('users').create(data);
        console.log(data.password);
        const authData = await pb.collection('users').authWithPassword(data.username, data.password);
        console.log(authData);
    }

    async function logout() {
        await pb.authStore.clear();
    }

    function toggleAuthMode() {
        isSignup = !isSignup;
    }
</script>

{#if $currentUser}
    <div class="flex items-center justify-center h-screen bg-gray-900 text-gray-100">
        <div class="text-center">
            <p>Logged in as {$currentUser.username}</p>
            <img src={`https://pocketbase-production-2587.up.railway.app/api/files/_pb_users_auth_/uf487qamnd6yj7v/${$currentUser.avatar}?token=`} alt="avatar" class="rounded-full w-24 h-24 mx-auto mb-4" />
            <button class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded" on:click={logout}>Logout</button>
        </div>
    </div>
{:else}
    <div class="flex items-center justify-center h-screen bg-gray-900">
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <form class="flex flex-col gap-4">
                <input class="bg-gray-700 text-gray-100 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-emerald-500" placeholder="Username" type="text" bind:value={username} />
                {#if isSignup}
                    <input class="bg-gray-700 text-gray-100 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-emerald-500" placeholder="Email" type="text" bind:value={email} />
                    <input class="bg-gray-700 text-gray-100 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-emerald-500" placeholder="Full Name" type="text" bind:value={fullName} />
                    <input class="bg-gray-700 text-gray-100 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-emerald-500" placeholder="Password" type="password" bind:value={password} />
                    <input class="bg-gray-700 text-gray-100 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-emerald-500" placeholder="Confirm password" type="password" bind:value={confirmPassword} />
                    <button type="button" class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded" on:click={signup}>Sign Up</button>
                {:else}
                    <input class="bg-gray-700 text-gray-100 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:border-emerald-500" placeholder="Password" type="password" bind:value={password} />
                    <button type="button" class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded" on:click={login}>Login</button>
                {/if}
            </form>
            <p class="text-center text-gray-400 mt-4">
                {#if isSignup}
                    Already have an account? <a href="#" class="text-emerald-500" on:click|preventDefault={toggleAuthMode}>Login</a>
                {:else}
                    Don't have an account? <a href="#" class="text-emerald-500" on:click|preventDefault={toggleAuthMode}>Sign Up</a>
                {/if}
            </p>
        </div>
    </div>
{/if}
