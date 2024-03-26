<script>
	import SvelteMarkdown from 'svelte-markdown';
	import { getUserId, getTokenFromLocalStorage } from '../../../utils/func';
	import { PUBLIC_BACKEND_BASE_URL, PUBLIC_MAPTILER_API_KEY } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { readable } from 'svelte/store'; // Store to hold the API key
	import * as maptilersdk from '@maptiler/sdk';
	import '@maptiler/sdk/dist/maptiler-sdk.css';
	import { loggedIn } from '../../../utils/func';
    import Time from "svelte-time";

	//this export let data is link to src/+page.js
	export let data;
	let clicked = false;
	let formErrors = {};

	// function to show map based on pet location
	async function initializeMap() {
		maptilersdk.config.apiKey = PUBLIC_MAPTILER_API_KEY;
		const map = new maptilersdk.Map({
			container: 'map',
			style: maptilersdk.MapStyle.STREETS,
			center: [data.pet.longitude, data.pet.latitude],
			zoom: 15 // Initial zoom level
		});
		const marker = new maptilersdk.Marker()
			.setLngLat([data.pet.longitude, data.pet.latitude])
			.addTo(map);
	}

	onMount(async () => {
		const apiKey = await initializeMap();
		// console.log(apiKey)
	});

	// edit post brings to pet post page with specific user id edit page
	function editPost() {
		goto(`/form/${data.pet.id}/edit`);
	}
	//to check is data and getuserId tally or not
	console.log('data.pet.userId:', data.pet.userId);
	console.log('getUserId():', getUserId());
	function deletedPost() {
		goto('/');
	}

	async function deleteUserPetPost() {
    const getToken = getTokenFromLocalStorage();
    clicked = true;

    // Fetch all comments associated with the pet
    const commentsResponse = await fetch(PUBLIC_BACKEND_BASE_URL + `/comment/${data.pet.id}`);
    const comments = await commentsResponse.json();

    // Delete each comment associated with the pet
    for (const comment of comments) {
        await deleteComment(data.pet.id, comment.id);
    }

    // Once all comments are deleted, delete the pet
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/pet/${data.pet.id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken}`
        }
    });

    if (resp.status == 200) {
        deletedPost();
    } else {
        const res = await resp.json();
        console.log(res);
        // formErrors = res.message;
        clicked = false;
    }
}


	let newComment = '';

	async function postComment() {
		const getToken = getTokenFromLocalStorage();

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/comment/${data.pet.id}`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getToken}`
			},
			body: JSON.stringify({ content: newComment })
		});

		if (resp.status == 200) {
			// Fetch the updated list of comments for the pet
			const updatedCommentsResponse = await fetch(
				PUBLIC_BACKEND_BASE_URL + `/comment/${data.pet.id}`
			);
			const updatedComments = await updatedCommentsResponse.json();

			// Update the local state with the new comments
			data.pet.Comment = updatedComments;

			// Clear the comment input field
			newComment = '';
		} else {
			const res = await resp.json();
			formErrors = res.error;
		}
	}

	async function deleteComment(petId, commentId) {
		const getToken = getTokenFromLocalStorage();

		const resp = await fetch(
			PUBLIC_BACKEND_BASE_URL + `/pet/${petId}/comment?commentId=${commentId}`,
			{
				method: 'DELETE',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getToken}`
				}
			}
		);

		if (resp.status == 200) {
			// Remove the comment from the UI
			// Assuming commentId is the ID of the comment I just deleted
			data.pet.Comment = data.pet.Comment.filter((comment) => comment.id !== commentId);
		} else {
			console.error('Failed to delete comment');
		}
	}
</script>

<svelte:head>
	<script src="https://cdn.maptiler.com/maptiler-sdk-js/v1.2.0/maptiler-sdk.umd.js"></script>
	<link href="https://cdn.maptiler.com/maptiler-sdk-js/v1.2.0/maptiler-sdk.css" rel="stylesheet" />
</svelte:head>

<div
	class="hero min-h-screen bg-base-200"
	style="background-image: url('/BG7.png'); background-position: bottom;"
>
	<div class="hero-content flex-col lg:flex-row w-full mt-24">
	<div class="hero-content flex-col w-full">
		<img src={data.pet.pet_image_url} alt="Pet" class="rounded-lg shadow-2xl mr-10 mb-5"/>
		</div>
		<div class="w-full">
			<div class="text-2xl font-bold badge badge-outline p-5 w-full mb-3">Posted by: {data.pet.user.name}</div>
			<div>
				<h1 class="text-1xl font mb-2 badge badge-primary w-32 mr-3 p-4">Pet Status</h1> {data.pet.pet_status}
			</div><div>
				<h1 class="text-1xl font mb-2 badge badge-primary w-32 mr-3 p-4">Post Date</h1> <Time timestamp="{data.pet.creation_date}" format="MMMM D, YYYY - h:mm A" />
			</div><div>
				<h1 class="text-1xl font mb-2 badge badge-primary w-32 mr-3 p-4">Pet Type</h1> {data.pet.pet_type}
			</div><div>
				<h1 class="text-1xl font mb-2 badge badge-primary w-32 mr-3 p-4">Pet Breed</h1> {data.pet.pet_breed}
			</div><div>
				<h1 class="text-1xl font mb-2 badge badge-primary w-32 mr-3 p-4">Pet Colour</h1> {data.pet.pet_colour}
			</div><div>
				<h1 class="text-1xl font mb-2 badge badge-primary w-32 mr-3 p-4">Pet Gender</h1> {data.pet.pet_gender}
			</div><div>
				<h1 class="text-1xl font mb-2 badge badge-primary w-32 mr-3 p-4">Pet Age</h1> {data.pet.pet_age}
			</div><div>
				<h1 class="text-1xl font mb-2 badge badge-primary w-32 mr-3 p-4">Location</h1> {data.pet.pet_location}
			</div>            <div>
                <h1 class="text-1xl font mb-2 badge badge-primary w-32 mr-3 p-4">Description</h1><strong>{data.pet.pet_description}</strong>
            </div>

			<div role="tablist" class="tabs tabs-lifted w-full mt-10">
				<input type="radio" name="my_tabs_2" role="tab" class="tab font-bold" aria-label="Comment Section" />
				<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">

				<div class="flex flex-col justify-start">
					{#if data.pet.Comment.length > 0}
						{#each data.pet.Comment as comment}
							<div class="{comment.userId === getUserId() ? 'chat chat-end' : 'chat chat-start'} relative">
								<!-- Make the chat container relative -->
								<div class="chat-header mb-1">
									{comment.user.name}
									<time class="text-xs opacity-50 pl-2"><Time timestamp="{comment.createdAt}" format="MMMM D, YYYY - h:mm A" /></time>
								</div>
								<div class="chat-bubble flex items-center justify-between">
									<!-- Adjusted to justify-between -->
									{comment.content}
									{#if comment.userId == getUserId()}
										<button
											class="btn btn-xs mt-0.5 ml-3"
											on:click={() => deleteComment(data.pet.id, comment.id)}
										>
											<!-- Position the button absolutely -->
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												class="bi bi-trash"
												viewBox="0 0 16 16"
											>
												<path
													d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
												/>
												<path
													d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
												/>
											</svg>
										</button>
									{/if}
								</div>
							</div>
						{/each}
					{:else}
						<p>No comments yet.</p>
					{/if}
				</div>
				

		{#if $loggedIn}
			<form on:submit|preventDefault={() => postComment()}>
				<input
					type="text"
					name="content"
					bind:value={newComment}
					placeholder="Write a comment..."
					class="w-full p-2 my-4 border rounded-lg focus:outline-none focus:border-blue-800 "
				/>
				<button
					type="submit"
					class="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-900"
					>Post Comment</button
				>
			</form>
			{#if 'content' in formErrors}
                <label class="label" for="comment">
                    <span class="label-text-alt text-red-500">{formErrors.content}</span>
                    </label>
            {/if}
		{/if}

			</div>
		  
			<input type="radio" name="my_tabs_2" role="tab" class="tab font-bold w-48" aria-label="Last Seen Location Map" checked />
			<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 mb-3">
		
				<div id="map"></div> <!-- Location Map here -->
			</div>
		  </div>
<!-- Buttons -->

		{#if data.pet.userId == getUserId()}
			<button on:click={editPost} class="btn btn-primary mt-5">EDIT POST</button>
		{/if}
		<!-- to make only user who create the post can see delete button -->
		{#if data.pet.userId == getUserId()}
		<button on:click={deleteUserPetPost} class="btn btn-primary mt-5">DELETE POST</button>
	{/if}
	</div>
</div>
	</div>




<style>

.tabs {
    width: auto; /* Adjust width dynamically based on content */
}

.tab-content {
    width: 100%; /* Occupy full width of the parent container */
    overflow-x: auto; /* Allow horizontal overflow */
}


#map {
    position: relative;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 350px;
}

</style>