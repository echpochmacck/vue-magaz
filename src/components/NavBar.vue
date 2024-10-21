<template>
  <header id="header">
    <nav id="w1" class="navbar-expand-md navbar-dark bg-dark fixed-top navbar">
      <div class="container">
        <a class="navbar-brand" href="/">Магазин</a>
        <button
          type="button"
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#w1-collapse"
          aria-controls="w1-collapse"
          aria-expanded="false"
          aria-label="Переключить навигацию"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="w1-collapse" class="collapse navbar-collapse" >
          <ul id="w2" class="navbar-nav nav">
            <!-- <li class="nav-item">
              <a class="nav-link active" href="/site/register">вход</a>
            </li> -->
            <router-link to="/login" custom v-slot="{ navigate }" v-if=" !token"  >
              <li class="nav-item">
                <a href="#" class="nav-link" @click="navigate">Вход</a>
              </li>
            </router-link>

            <router-link to="/basket" custom v-slot="{ navigate }" v-if="token" >
              <li class="nav-item">
                <a href="#" class="nav-link" @click="navigate">просмотреть корзину</a>
              </li>
            </router-link>
            <!-- <li class="nav-item">
              <a class="nav-link" href="/site/login">Login</a>
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
computed: {
  token() {
    return localStorage.getItem('token');
  }
}
};
</script>

<style></style>
