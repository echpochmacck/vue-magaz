<template>
  <main id="main" class="flex-shrink-0 my-5" role="main">
    <div class="container pt-3">
      <h1 v-if="errors.email">saddsd</h1>
      <div class="site-register mt-5">
        <form id="w0" action="" method="" @submit.prevent="submitHandler">
          <div class="mb-3 field-user-name required">
            <label class="form-label" for="user-name">Имя</label>
            <input
              type="text"
              id="user-name"
              class="form-control is-invalid"
              name="User[name]"
              autofocus=""
              aria-required="true"
              aria-invalid="true"
              v-model="name"
            />
          </div>
          <div class="mb-3 field-user-surname required">
            <label class="form-label" for="user-surname">фамилия</label>
            <input
              type="text"
              id="user-surname"
              class="form-control"
              name="User[surname]"
              aria-required="true"
              v-model="surname"
            />

            <div class="invalid-feedback" v-if="errors.name">
              {{ errors.name[0] }}
            </div>
          </div>
          <div class="mb-3 field-user-login required">
            <label class="form-label" for="user-login">Логин</label>
            <input
              type="text"
              id="user-login"
              class="form-control"
              name="User[login]"
              aria-required="true"
              v-model="login"
            />

            <div class="invalid-feedback" v-if="errors.surname">
              {{ errors.surname[0] }}
            </div>
          </div>
          <div class="mb-3 field-user-email required">
            <label class="form-label" for="user-email">Email</label>
            <input
              type="text"
              id="user-email"
              class="form-control"
              name="User[email]"
              aria-required="true"
              v-model="email"
            />

            <div class="invalid-feedback" v-if="errors">
              {{ errors.email[0] }}
            </div>
          </div>
          <div class="mb-3 field-user-patronymic">
            <label class="form-label" for="user-patronymic">Отчество</label>
            <input
              type="text"
              id="user-patronymic"
              class="form-control"
              name="User[patronymic]"
              v-model="patronimyc"
            />

            <div class="invalid-feedback"></div>
          </div>
          <div class="password-block">
            <div class="mb-3 field-registerform-password required">
              <label class="form-label" for="registerform-password"
                >Пароль</label
              >
              <input
                type="text"
                id="registerform-password"
                class="form-control"
                name="User[password]"
                aria-required="true"
                v-model="password"
              />

              <div class="invalid-feedback" v-if="errors.password">
                {{ errors.password[0] }}
              </div>
            </div>
            <div class="password-info"></div>
          </div>
          <div class="mb-3 field-user-password_repeat required">
            <label class="form-label" for="user-password_repeat"
              >Password Repeat</label
            >
            <input
              type="password"
              id="user-password_repeat"
              class="form-control"
              name="User[password_repeat]"
              aria-required="true"
              v-model="password_repeat"
            />

            <div
              class="invalid-feedback"
              v-if="errors.password_repeat"
            >
              {{ errors.password_repeat[0] }}
            </div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
      <!-- site-register -->
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      surname: "",
      password: "",
      password_repeat: "",
      patronimyc: "",
      login: "",
      email: null,
      
        errors: {
          name: ["Имя не может быть пустым"],
          email: ["Email не может быть пустым"],
        },
    };
  },
  methods: {
    formIsValid() {
      // let formIsValid = true;

      // // Проверка имени
      // if (this.name.length > 0) {
      //   this.errors.name = "";
      // } else {
      //   this.errors.name = "Пустое имя";
      //   formIsValid = false;
      // }

      // // Проверка фамилии
      // if (this.surname.length > 0) {
      //   this.errors.surname = "";
      // } else {
      //   this.errors.surname = "Пустая фамилия";
      //   formIsValid = false;
      // }

      // // Проверка логина
      // if (this.login.length > 0) {
      //   this.errors.login = "";
      // } else {
      //   this.errors.login = "Пустой логин";
      //   formIsValid = false;
      // }

      // // Проверка email
      // if (this.email.length > 0) {
      //   this.errors.email = "";
      // } else {
      //   this.errors.email = "Пустой email";
      //   formIsValid = false;
      // }

      // // Пароль
      // if (this.password.length > 0) {
      //   this.errors.password = "";
      // } else {
      //   this.errors.password = "Пустой пароль";
      //   formIsValid = false;
      // }

      // // Повтор пароля
      // if (this.password_repeat.length > 0) {
      //   this.errors.password_repeat = "";
      // } else {
      //   this.errors.password_repeat = "Повтор пароля обязателен";
      //   formIsValid = false;
      // }

      return true;
    },
    async submitHandler() {
      if (this.formIsValid()) {
        try {
          const myHeaders = new Headers();
          myHeaders.append("content-type", "application/json");
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
              name: this.name,
              surname: this.surname,
              login: this.login,
              email: this.email,
              password: this.password,
              password_repeat: this.password_repeat, // Изменено с camelCase на snake_case
              patronymic: this.patronymic, // Отчество добавлено, если нужно передавать, даже если оно необязательное
            }),
            redirect: "follow",
          };
          const result = await fetch(
            "http://spa-magaz/api/user/register",
            requestOptions
          );
          const res = await result.json();
          if (result.status == 200) {
            this.$token.value = result.data.token;
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("isAdmin", result.data.isAdmin);
            this.$router.push("/main");
          } else {
            this.errors = res.errors;
            // alert(this.errors.password_repeat[0])
            // console.log(this.errors)
          }
        } catch (error) {
          alert(error);
        }
      } else {
        console.log("ошибка");
      }
    },
    setToken(token) {
      this.$token = token;
    },
  },
  computed: {
    token() {
      return this.$token;
    },
  },
};
</script>

<style></style>
