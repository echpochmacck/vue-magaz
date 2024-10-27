<template>
  <main id="main" class="flex-shrink-0 my-5" role="main">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol id="w3" class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Главная</a></li>
          <li class="breadcrumb-item active" aria-current="page">dsdsad</li>
        </ol>
      </nav>
      <div class="user-view" v-if="info">
        <!-- <p>
                    </p> -->

        <table id="w0" class="table table-striped table-bordered detail-view">
          <tbody>
            <tr>
              <th>Имя</th>
              <td>{{ info.name }}</td>
            </tr>
            <tr>
              <th>фамилия</th>
              <td>{{ info.surname }}</td>
            </tr>
            <tr>
              <th>Отчество</th>
              <td>{{ info.patronymic }}</td>
            </tr>
            <tr>
              <th>Логин</th>
              <td>{{ info.login }}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                <a href="mailto:sddsdss@ds.com">{{ info.email }}</a>
              </td>
            </tr>
            <tr>
              <th>Баланс</th>
              <td>{{ info.cash }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      info: null,
      //   cash: null,
    };
  },
  mounted() {
    try {
      const myHeaders =  new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + this.$token.value
      );

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://spa-magaz/api/user/info", requestOptions)
        .then((response) => {
          if (response.status == 200) {
            console.log(response)
            return response.json();
          }
        })
        .then((result) => (this.info = result.data))
        .catch((error) => console.error(error));
    } catch (error) {
      alert("ошибка какая-то");
    }
  },
};
</script>

<style></style>
