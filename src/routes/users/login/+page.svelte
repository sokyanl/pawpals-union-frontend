<script>
  import { goto } from '$app/navigation';
  import { authLogin, loggedIn } from '../../../utils/func';

  let formErrors = {};
  let clicked = false;

  function postLoggedIn() {
    goto('/');
  }

  async function login(evt) {
    evt.preventDefault();
    clicked = true;

    const userData = {
      email: evt.target['email'].value,
      password: evt.target['password'].value
    };
    // console.log(userData); //Prints in console if login is successful
    // If not logged in, perform login operation
    const resp = await authLogin(userData.email, userData.password);
    if (resp.success) {
      postLoggedIn();
      loggedIn.set(true)
    } else {
      formErrors = resp.res.error;
      clicked = false;
    }
  }
</script>

<div class="hero min-h-screen">
<img src="/BG2.png" alt="Description" class="absolute inset-0 w-full h-full object-cover" />
  <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <form class="card-body" on:submit={login}>
      <div class="form-control">
        <label class="label" for="email">
          <span class="label-text">Email</span>
        </label>
        <input type="email" placeholder="email" class="input input-bordered" name="email" />
      </div>
      {#if 'email' in formErrors}
				<label class="label" for="email">
					<span class="label-text-alt text-red-500">{formErrors['email']}</span>
				</label>
			{/if}
      <div class="form-control">
        <label class="label" for="password">
          <span class="label-text">Password</span>
        </label>
        <input type="password" placeholder="password" class="input input-bordered" name="password" />
      </div>
      {#if 'password' in formErrors}
				<label class="label" for="password">
					<span class="label-text-alt text-red-500">{formErrors['password']}</span>
				</label>
			{/if}
      <div class="form-control mt-2">
        <button class="btn btn-primary">Login</button>
      </div>
      <div class="mt-6 w-full">
        <span class="label-text text-base font-bold mb-5">Don't have an account?</span>
        <a href="/users/create" class="btn btn-primary w-full">Register</a>
      </div>
    </form>
  </div>
</div>