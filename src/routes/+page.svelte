<script>

</script>


<!-- Hero Banner -->
<div class="hero min-h-screen" style="background-image: url('HP-1.png'); background-position: bottom;">
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-2xl mx-auto px-4 py-20 sm:px-6 lg:px-8"> <!-- Adjust the max-width and padding classes as needed -->
      <h1 class="mb-5 text-5xl text-purple-800 font-bold">Hey there!</h1>
      <p class="mb-10 text-purple-700 text-xl">Lost your furry friend and feeling worried? Don't fret! You've landed in the perfect spot. Welcome to <span class="font-bold text-xl">Paw Pals Union</span>, where we're all about helping owners like you connect and search for your beloved pets right here in Malaysia. Let's work together to bring your furry family member back home where they belong!</p>
      
      <!-- Avatars Section -->
      <div class="flex flex-col md:flex-row justify-center items-center gap-10">

        <!-- Avatar For Lost -->
        <a href="/lostGallery" class="relative group">
          <div class="avatar">
            <div class="w-64 rounded-full overflow-hidden">
              <img src="Lost&Found-1.png" class="transition-opacity duration-200 group-hover:opacity-20" alt="lost portal"/>
            </div>
          </div>
          <div class="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span class="text-purple-800 text-lg font-semibold">Search Lost Pet Gallery</span>
          </div>
        </a>

        <!-- Avatar For Found -->
        <a href="/foundGallery" class="relative group">
          <div class="avatar">
            <div class="w-64 rounded-full overflow-hidden">
              <img src="Lost&Found-2.png" class="transition-opacity duration-200 group-hover:opacity-20" alt="found portal"/>
            </div>
          </div>
          <div class="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span class="text-purple-800 text-lg font-semibold">Search Found Pet Gallery</span>
          </div>
        </a>
        
      </div>
    </div>
  </div>
</div>




  <!-- Hero Banner -->
<div class="hero min-h-screen" style="background-image: url('/HP-2.png'); background-position: bottom;">
  <div class="hero-content text-center text-neutral-content"></div>

  <!-- Cards Section -->
  <div>
    <h1 class="mb-5 text-4xl text-purple-800 font-bold text-center">Our step-by-step guide</h1>
   <div class="cards-container flex justify-center mt-10">
    <!-- Card 1 -->
    <div class="card card-compact w-96 bg-base-100 shadow-xl">
      <figure><img src="HowItWorks-1.png" alt="TakeAPhoto" /></figure>
      <div class="card-body">
        <h2 class="card-title">Share the Love</h2>
        <p>Take a moment to create a post filled with love! Share a recent photo of your beloved pet along with some fun details like their name, age, and where they were last seen. Don't forget to include your contact information so that fellow pet lovers can connect with you.</p>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="card card-compact w-96 bg-base-100 shadow-xl">
      <figure><img src="HowItWorks-2.png" alt="GetNotified" /></figure>
      <div class="card-body">
        <h2 class="card-title">Keep an Eye Out</h2>
        <p> Stay hopeful and keep an eye out for notifications. Make sure to provide a way for others to reach you, because in this wonderful community, we're all here to help reunite furry friends with their families. Remember, communication is the key to bringing our pets back home safely!</p>
      </div>
    </div>

    <!-- Card 3 -->
    <div class="card card-compact w-96 bg-base-100 shadow-xl">
      <figure><img src="HowItWorks-3.png" alt="Reunited" /></figure>
      <div class="card-body">
        <h2 class="card-title">Heartwarming Reunion</h2>
        <p> Once your pet is found, get ready for a heartwarming reunion! Embrace the joy of being reunited with your furry companion and relish in the happiness of being a family once again. After all, there's nothing quite like the love shared between a pet and their human!</p>
        <a href="/reunitedGallery" class="btn btn-primary mt-3">Read Success Stories</a>
      </div>
    </div>
  </div>
</div>
</div>


<!-- Hero Banner -->
<div class="hero min-h-screen flex flex-col" style="background-image: url('HP-3.png'); background-position: bottom;">
  <div class="hero-content place-items-center text-neutral-content">
    
    <!-- Text Section -->
    <h1 class="mb-5 text-4xl text-purple-800 font-bold text-center w-1/2">Tips on What to Do When You Are Looking for a Lost Pet</h1>
    <div class="cards-container flex justify-center mt-10">
    
    <!-- Image Section -->
    <div class="w-full flex justify-center">

    <div class="w-96 carousel rounded-box">
      <div id="item1" class="carousel-item w-full">
        <img src="Tips1.png" class="w-full" alt="Tailwind CSS Carousel component" />
      </div> 
      <div id="item2" class="carousel-item w-full">
        <img src="Tips2.png" class="w-full" alt="Tailwind CSS Carousel component" />
      </div> 
      <div id="item3" class="carousel-item w-full">
        <img src="Tips3.png" class="w-full" alt="Tailwind CSS Carousel component" />
      </div> 
      <div id="item4" class="carousel-item w-full">
        <img src="Tips4.png" class="w-full" alt="Tailwind CSS Carousel component" />
      </div>
      <div id="item5" class="carousel-item w-full">
        <img src="Tips5.png" class="w-full" alt="Tailwind CSS Carousel component" />
      </div>
      <div id="item6" class="carousel-item w-full">
        <img src="Tips6.png" class="w-full" alt="Tailwind CSS Carousel component" />
      </div>
    </div> 
  </div>
    <div class="flex justify-center w-full text-primary gap-1"> 
      <a href="#item1" class="btn btn-primary btn-xs">1</a> 
      <a href="#item2" class="btn btn-primary btn-xs">2</a> 
      <a href="#item3" class="btn btn-primary btn-xs">3</a> 
      <a href="#item4" class="btn btn-primary btn-xs">4</a>
      <a href="#item5" class="btn btn-primary btn-xs">5</a>
      <a href="#item6" class="btn btn-primary btn-xs">6</a>
      
    </div>


  </div>
</div>
</div>


<style>
  /* Grid layout */
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px; /* Adjust gap between cards as needed */
  }

  /* Card styles */
  .card {
    width: 100%;
    max-width: 350px; /* Adjust max-width of cards as needed */
    background-color: #9d0486; /* Change background color as needed */
    color: #fff; /* Change text color as needed */
  }
</style>