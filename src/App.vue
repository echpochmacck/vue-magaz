<template>
  <nav-bar> </nav-bar>

  <div class="container">
    <router-view></router-view>
  </div>
  <!-- <login> </login> -->
</template>

<script>
import NavBar from "./components/NavBar";
// import Register from "./components/Register";
// import Login from "./components/Login";


export default {
  components: {
    NavBar,
    // Register,
    // Login,
  },
};
</script>

<style></style>
