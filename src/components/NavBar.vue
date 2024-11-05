<template>
  <header id="header">
    <nav id="w1" class="navbar-expand-md navbar-dark bg-dark fixed-top navbar">
      <div class="container">
        <router-link
              to="/"
              custom
              v-slot="{ navigate }"
            >
              <li class="nav-item">
                <a href="#" class="nav-link" @click="navigate">Главная</a>
              </li>
            </router-link>
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
        <div id="w1-collapse" class="collapse navbar-collapse">
          <ul id="w2" class="navbar-nav nav">
            <!-- <li class="nav-item">
              <a class="nav-link active" href="/site/register">вход</a>
            </li> -->
            <router-link
              to="/login"
              custom
              v-slot="{ navigate }"
              v-if="!$token.value"
            >
              <li class="nav-item">
                <a href="#" class="nav-link" @click="navigate">Вход</a>
              </li>
            </router-link>
            <div v-if="$token.value" class="isUser">
              <router-link to="/basket" custom v-slot="{ navigate }">
                <li class="nav-item">
                  <a href="#" class="nav-link" @click="navigate"
                    >просмотреть корзину</a
                  >
                </li>
              </router-link>

              <router-link to="/user" custom v-slot="{ navigate }">
                <li class="nav-item">
                  <a href="#" class="nav-link" @click="navigate"
                    >Личнаый кабинет</a
                  >
                </li>
              </router-link>
              <router-link to="/orders" custom v-slot="{ navigate }">
                <li class="nav-item">
                  <a href="#" class="nav-link" @click="navigate"
                    >Посмотреть заказы</a
                  >
                </li>
              </router-link>
              <!-- {{console.log($isAdmin.value)}} -->
              <li class="isAdmin" v-if="$isAdmin.value == 'true'">
                <router-link to="/admin" custom v-slot="{ navigate }">
                  <a href="#" class="nav-link" @click="navigate"
                    >Управление заказами</a
                  >
                </router-link>
              </li>

              <li class="isAdmin" v-if="$token.value">
                <a href="#" class="nav-link" @click.prevent="logout">Выход</a>
              </li>
            </div>

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
  mounted(){
    // alert(typeof(this.$isAdmin.value))
  },
  computed: {
    token() {
      return localStorage.getItem("token");
    },
  },
  methods: {
    logout() {
      // alert('dsd')
      localStorage.clear()
      this.$token.value = null;
      

      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer "+ this.$token.value
      );

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://spa-magaz/api/user/logout", requestOptions)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => console.error(error));
    },
  },
  // mounted() {
  //   alert(this.$isAdmin.value)
  // }
};
</script>

<style>
.isUser {
  display: flex;
  justify-content: space-between;
}
</style>
