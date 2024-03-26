<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { loggedIn, authLogin } from '../../../utils/func';
	import { goto } from '$app/navigation';

  let formErrors = {};
  let clicked 

  async function login(email, password) {

    const userData = {
      email: email,
      password: password
    };
    console.log(userData); //Prints in console if login is successful
    // If not logged in, perform login operation
    const resp = await authLogin(userData.email, userData.password);
    if (resp.success) {
      loggedIn.set(true)
      goto('/form/upload')
    } else {
      formErrors = resp.res.error;
    }
  }

	async function createUser(evt) {
		evt.preventDefault();

		if (evt.target['password'].value != evt.target['password-confirmation'].value) {
			formErrors['password'] =  'Password confirmation does not match' ;
			clicked = false;
			//console.log(clicked);
			return;
		}

		const userData = {
			name: evt.target['name'].value,
			email: evt.target['email'].value,
			password: evt.target['password'].value
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/users', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		});

		const res = await resp.json();

		if (resp.status === 200) {
			const resp2 = login(userData.email, userData.password)
		} else if (resp.status === 400) {
			formErrors = res.error;
		} else {
		}
		console.log(resp.status);
    console.log(res)
    console.log(res.error)
		return formErrors;
	}
</script>

<div class="hero min-h-screen">
	<img src="/BG1.png" alt="Description" class="absolute inset-0 w-full h-full object-cover" />
	<div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-20">
		<form class="card-body" on:submit={createUser}>
			<!-- Name -->
			<div class="form-control mt-1">
				<label class="label" for="name">
					<span class="label-text">Name</span>
				</label>
				<input type="text" placeholder="name" class="input input-bordered" name="name" />
			</div>
			{#if 'name' in formErrors}
				<label class="label" for="name">
					<span class="label-text-alt text-red-500">{formErrors.name}</span>
				</label>
			{/if}

			<!-- Email -->
			<div class="form-control mt-1">
				<label class="label" for="email">
					<span class="label-text">Email</span>
				</label>
				<input
					type="email"
					placeholder="email"
					class="input input-bordered"
					name="email"
				/>
			</div>
      {#if 'email' in formErrors}
				<label class="label" for="email">
					<span class="label-text-alt text-red-500">{formErrors['email']}</span>
				</label>
			{/if}

			<!-- Password -->
			<div class="form-control mt-1">
				<label class="label" for="password">
					<span class="label-text">Password</span>
				</label>
				<input
					type="password"
					placeholder="password"
					class="input input-bordered"
					name="password"
				/>
        {#if 'password' in formErrors}
				<label class="label" for="password">
					<span class="label-text-alt text-red-500">{formErrors.password}</span>
				</label>
			{/if}

				<!-- Password -->
				<div class="form-control mt-1">
					<label class="label" for="password-confirmation">
						<span class="label-text">Confirm Password</span>
					</label>
					<input
						type="password"
						placeholder="password"
						class="input input-bordered"
						name="password-confirmation"
					/>
				</div>

				<div class="form-control mt-6">
					<button class="btn btn-primary">Register</button>
				</div>

				<div class="mt-6 w-full">
					<span class="label-text text-base font-bold mb-5 align-center"
						>Already have an account?</span
					>
					<a href="/users/login" class="btn btn-primary w-full">Login</a>
				</div>
			</div>
		</form>
	</div>
</div>
