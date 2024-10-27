<template>
  <main id="main" class="flex-shrink-0" role="main">
    <div class="container">
      <div class="site-login">
        <h1>Авторизация</h1>
        <div class="row">
          <div class="col-lg-5">
            <form id="login-form" action="#" method="post">
              <input
                type="hidden"
                name="_csrf"
                value="NfxF1rV4UiU0RYXrOTIZxcL3IIx_qPvnSk2JQFoFUfhjyQed9wkaR3Ef6INxSF2CkLVn5yDCsoQsF9AnNGAHlg=="
              />
              <div class="mb-3 field-loginform-login required">
                <label
                  class="col-lg-1 col-form-label mr-lg-3"
                  for="loginform-login"
                  >Login</label
                >
                <input
                  type="text"
                  id="loginform-login"
                  class="col-lg-3 form-control is-invalid"
                  name="LoginForm[login]"
                  autofocus=""
                  aria-required="true"
                  aria-invalid="true"
                  v-model="login"
                />
                <div class="col-lg-7 invalid-feedback"></div>
              </div>
              <div class="mb-3 field-loginform-password required">
                <label
                  class="col-lg-1 col-form-label mr-lg-3"
                  for="loginform-password"
                  >Password</label
                >
                <input
                  type="password"
                  id="loginform-password"
                  class="col-lg-3 form-control"
                  name="LoginForm[password]"
                  value=""
                  aria-required="true"
                  v-model="password"
                />
                <div class="col-lg-7 invalid-feedback"></div>
              </div>

              <div class="form-group">
                <div>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    name="login-button"
                    @click.prevent="submitHandler"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      login: "",
      // token: null,
      errors: {},
    };
  },
  methods: {
    formIsValid() {
      let formIsValid = true;
      // Проверка логина
      if (this.login.length > 0) {
        this.errors.login = "";
      } else {
        this.errors.login = "Пустой логин";
        formIsValid = false;
      }
      // Пароль
      if (this.password.length > 0) {
        this.errors.password = "";
      } else {
        this.errors.password = "Пустой пароль";
        formIsValid = false;
      }
      return formIsValid;
    },
    submitHandler() {
      // alert(this.name)
      if (this.formIsValid()) {
        const router = this.$router;
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
              login: this.login,
              password: this.password,
            }),
            // redirect: "follow",
          };
          fetch("http://spa-magaz/api/user/login", requestOptions)
            .then(function (response) {
              return response.json();
            })
            .then((result) => {
              if (!result.errors) {
                this.$token.value = result.data.token;
                localStorage.setItem("token", result.data.token);
                // alert(typeof(result.data.isAdmin))
                localStorage.setItem("isAdmin", result.data.isAdmin);

                // Теперь `this` ссылается на компонент
                // alert(this.$token.value);
                router.push("/main");
              }
            })
            .catch((error) => console.error(error));
        } catch (error) {
          alert("ошибка какая-то");
        }
      } else {
        console.log("ошибка");
      }
    },
    // setToken(token) {
    //   this.$token = token;
    //   return true;
    // },
  },
  // computed: {
  //   token() {
  //     return this.$token;
  //   },
  // },
};
</script>

<style></style>
