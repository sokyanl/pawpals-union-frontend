<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { uploadMedia } from '../../../../utils/s3-uploader.js';
	import { getTokenFromLocalStorage } from '../../../../utils/func';
	import { onMount } from 'svelte';

	export let data;

	let formErrors = {};
	let fileName, fileUrl;
	let clicked = false;

	let fileSelected = false;

	async function uploadImage(evt) {
		evt.preventDefault();
		// clicked = true;
		const newImage = evt.target['image'].files[0];

		if(!newImage) {
			console.error("No image selected. Please select an image to upload.");
			return;
		}

		clicked = true;
		try {
			[fileName, fileUrl] = await uploadMedia(newImage);
		} catch (error) {
			clicked = false;
			console.error("Upload failed:", error);
		}

		// [fileName, fileUrl] = await uploadMedia(evt.target['image'].files[0]);
	
		const accessToken = getTokenFromLocalStorage();

		const userData = {
			pet_type: evt.target['type'].value,
			pet_breed: evt.target['breed'].value,
			pet_colour: evt.target['color'].value,
			pet_gender: evt.target['gender'].value,
			pet_age: evt.target['age'].value,
			pet_description: evt.target['description'].value,
			pet_location: evt.target['location'].value,
			pet_status: evt.target['status'].value,
			pet_image_url: fileUrl
		};

		console.log(userData);

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/pet/${data.pet.id}`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify(userData)
		});

		const res = await resp.json();
		// console.log(res);

		if (resp.status === 200) {
			goto(`/form/${data.pet.id}`);
			clicked = false;
		} else if (resp.status === 400) {
			// const res = await resp.json();
			clicked = false;
			console.log(res);
			formErrors = res.error;
		}
	}

	// Function to handle file input change
	function handleFileChange(event) {
		fileSelected = event.target.files.length > 0;
	}

	onMount(() => {
		// Check initial state
		const fileInput = document.getElementById('imageInput');
		fileSelected = fileInput.files.length > 0;
	});
</script>

<svelte:head>
	<script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<div
	class="hero min-h-screen bg-base-200"
	style="background-image: url('/BG6.png'); background-position: bottom;"
>
	<div class="hero-content flex-col lg:flex-row-reverse mt-28">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold ml-10">Update Your Pet's Story</h1>
			<p class="py-6 ml-10">
				Update the story of your beloved pet with us. Whether there are new developments or details
				you want to share, we're here to support you and ensure that our community remains informed,
				standing together in our efforts to reunite you with your furry friend.
			</p>
		</div>
		<div class="card w-full max-w-2xl shadow-2xl bg-base-100">
			<form class="card-body" on:submit={uploadImage}>
				<div class="form-control">
					<!-- Pet Type Section -->
					<label class="label" for="type">
						<span class="label-text font-medium text-base mt-3">Pet Type</span>
					</label>
					<select class="select select-bordered w-full" name="type" value={data.pet.pet_type}>
						<option disabled selected>Select one</option>
						<option>Cat</option>
						<option>Dog</option>
					</select>
					{#if 'pet_type' in formErrors}
						<label class="label" for="type">
							<span class="label-text-alt text-red-500">{formErrors.pet_type}</span>
						</label>
					{/if}

					<!-- Pet Breed Section -->
					<label class="label" for="breed">
						<span class="label-text font-medium text-base mt-3">Pet Breed</span>
					</label>
					<input
						type="text"
						placeholder="example: tabby if it's a cat, corgi if it's a dog"
						class="input input-bordered"
						name="breed"
						value={data.pet.pet_breed}
					/>

					{#if 'pet_breed' in formErrors}
						<label class="label" for="breed">
							<span class="label-text-alt text-red-500">{formErrors.pet_breed}</span>
						</label>
					{/if}

					<!-- Pet Colour Section -->
					<label class="label" for="color">
						<span class="label-text font-medium text-base mt-3">Pet Colour</span>
					</label>
					<input
						name="color"
						value={data.pet.pet_colour}
						type="text"
						placeholder="example: Corgi"
						class="input input-bordered"
					/>
					{#if 'pet_colour' in formErrors}
						<label class="label" for="color">
							<span class="label-text-alt text-red-500">{formErrors.pet_colour}</span>
						</label>
					{/if}

					<!-- Pet Gender Section -->
					<label class="label" for="gender">
						<span class="label-text font-medium text-base mt-3">Pet Gender</span>
					</label>
					<select class="select select-bordered w-full" name="gender" value={data.pet.pet_gender}>
						<option disabled selected>Select one</option>
						<option>Female</option>
						<option>Male</option>
						<option>I'm not sure...</option>
					</select>
					{#if 'pet_gender' in formErrors}
						<label class="label" for="gender">
							<span class="label-text-alt text-red-500">{formErrors.pet_gender}</span>
						</label>
					{/if}

					<!-- Pet Age Section -->
					<label class="label" for="age">
						<span class="label-text font-medium text-base mt-3">Pet Age</span>
					</label>
					<input
						name="age"
						value={data.pet.pet_age}
						type="text"
						placeholder="example: 1 years old"
						class="input input-bordered"
					/>
					<span class="label-text-secondary text-sm text-purple-400 mt-2 mb-2"
						>Leave blank if unknown</span
					>

					<!-- Pet Description Section -->
					<label class="label" for="description">
						<span class="label-text font-medium text-base mt-3">Pet Description</span>
					</label>
					<textarea
						name="description"
						class="textarea textarea-primary"
						value={data.pet.pet_description}
						placeholder="Include your contact details here and further pet descriptions, example: Pet name, their behaviour, any unique physical traits like a white spot under their chin, etc..."
					></textarea>
					{#if 'pet_description' in formErrors}
						<label class="label" for="description">
							<span class="label-text-alt text-red-500">{formErrors.pet_description}</span>
						</label>
					{/if}

					<!-- Pet Location Section -->
					<label class="label" for="location">
						<span class="label-text font-medium text-base mt-3">Last Seen Location</span>
					</label>
					<input
						type="text"
						name="location"
						value={data.pet.pet_location}
						placeholder="example: Subang, Kota Damansara, Puchong, etc..."
						class="input input-bordered"
					/>
					{#if 'pet_location' in formErrors}
						<label class="label" for="location">
							<span class="label-text-alt text-red-500">{formErrors.pet_location}</span>
						</label>
					{/if}

					<!-- Pet Image Section -->
					<label class="label" for="image">
						<span class="label-text font-medium text-base mt-3">Pet Image</span>
					</label>
					<input
						type="file"
						class="file:btn file:btn-primary"
						name="image"
						id="imageInput"
						on:change={handleFileChange}
					/>
					<span
						class="label-text-secondary text-sm text-red-500 mt-2 mb-2"
						id="uploadMessage"
						style="display: {fileSelected ? 'none' : 'block'};"
					>
						Please reupload image before submitting
					</span>

					<!-- Pet Status Section -->
					<label class="label" for="status">
						<span class="label-text font-medium text-base mt-3">Pet Status</span>
					</label>
					<select class="select select-bordered w-full" name="status" value={data.pet.pet_status}>
						<option disabled selected>Select one</option>
						<option>Lost</option>
						<option>Found</option>
						<option>Reunited</option>
					</select>
					{#if 'pet_status' in formErrors}
						<label class="label" for="location">
							<span class="label-text-alt text-red-500">{formErrors.pet_status}</span>
						</label>
					{/if}

					<div class="form-control mt-6">
						{#if clicked}
							<button class="btn btn-active btn-primary">
								<span class="loading loading-spinner hover:btn-accent"></span>
								Submit
							</button>
						{:else}
							<button class="btn btn-primary hover:btn-accent">Submit</button>
						{/if}
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
