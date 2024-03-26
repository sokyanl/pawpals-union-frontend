<script>
  export let data;
</script>

<!-- User Account Details -->
<div class="flex flex-row items-start mt-20">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="form-control w-full max-w-52 mr-5 ml-5 mt-5">
    <div class="avatar">
      <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 content-center">
        <!-- Generic Profile Picture -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src="UserProfile.png" />
      </div>
    </div>

    <!-- Display user name and email -->
    <div class="user-details">
      <p class="mt-2 text-sm font-bold mt-12">Profile Name:</p>
      <h2 class="card-title text-purple-700">{data.pet[0].user.name}</h2>
      <p class="mt-2 text-sm font-bold mt-5">Profile Email:</p>
      <h2 class="card-title text-purple-700">{data.pet[0].user.email}</h2>
    </div>
  </label>
  
  <!-- Divider -->
  <div class="divider divider-horizontal"></div>

 <!-- Cards -->
<div class="overflow-x-auto w-full mr-5 basis-3/4" style="padding: 50px">
  <div class="flex flex-wrap justify-center gap-10">
    {#each data.pet as pet}
    <div class="flex justify-center">
      <!-- Wrap the entire card body with an anchor tag -->
      <a href="/form/{pet.id}" class="card w-80 bg-base-100 shadow-2xl">
        <figure><img src="{pet.pet_image_url}" alt="PetImage" style="height: 350px; width: 400px;"/></figure>
        <div class="card-body">
          <div class="badge badge-primary text-base p-3"> Current Pet Status: <strong><span style="margin-left: 8px;">{pet.pet_status}</span></strong></div>     
          <div class="card-actions justify-start">
            <div class="badge badge-success text-white">{pet.pet_type}</div>
            <div class="badge badge-accent">{pet.pet_breed}</div>
            <div class="badge badge-accent">{pet.pet_colour}</div>
            <div class="badge badge-accent">{pet.pet_gender}</div>
          </div>
          <p class="mt-5">{pet.pet_description.slice(0,35)}</p>
          <div class="card-actions justify-center mt-5">
            <a class="btn btn-primary" href="/form/{pet.id}">Learn More</a>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
</div>

<style>
  /* Grid layout for user details */
  .flex.flex-row.items-start .user-details {
    display: grid;
    grid-template-columns: auto; /* Adjust as needed */
    grid-row-gap: 10px; /* Adjust gap between user details */
  }
</style>
