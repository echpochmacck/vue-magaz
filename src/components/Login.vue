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
                <div class="col-lg-7 invalid-feedback" v-if="errors">
                  {{ errors }}
                </div>
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
      errors: null,
    };
  },
  methods: {
    formIsValid() {
      let formIsValid = true;
      // Проверка логина
      if (this.login.length < 0) {
        formIsValid = false;
        alert("поля не могут быть пустыми");
      }
      if (this.password.length < 0) {
        formIsValid = false;
        alert("поля не могут быть пустыми");
      }
      return formIsValid;
    },
    async submitHandler() {
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
          };
          const result = await fetch(
            "http://spa-magaz/api/user/login",
            requestOptions
          );
          if (result.status == 201) {
            const res = await result.json();
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("isAdmin", res.data.isAdmin);
            this.$token.value = res.data.token;
            router.push("/main");
          } else {
            const errorData = await result.json();
            this.errors = errorData.errors;
          }
        } catch (error) {
          alert(error);
        }
      } else {
        console.log("ошибка");
      }
    },
  },
};
</script>

<style></style>
