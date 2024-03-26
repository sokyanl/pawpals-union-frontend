<script>
  import "../app.css";
  import Navigation from '../component/Nav.svelte';
  import Footer from '../component/Footer.svelte';
</script>

<Navigation />
<div>
  <slot />
</div>
<Footer />
