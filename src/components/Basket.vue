<template>
  <main id="main" class="flex-shrink-0" role="main">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol id="w3" class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Главная</a></li>
          <li class="breadcrumb-item active" aria-current="page">Orders</li>
        </ol>
      </nav>
      <div class="orders-index">
        <h1>Orders</h1>

        <div
          id="p0"
          data-pjax-container=""
          data-pjax-push-state=""
          data-pjax-timeout="1000"
        >
          <div id="w0" class="grid-view">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Количество</th>
                  <th>Название</th>
                  <th>Добавить в корзину</th>
                  <th>Удалить из корзины</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!basket || !basket.length">
                  <td colspan="5">
                    <div class="empty">Ничего не найдено.</div>
                  </td>
                </tr>
                <tr v-else v-for="(product, index) in basket" :key="product.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ product.quantity }}</td>
                  <td>{{ product.title }}</td>
                  <td>
                    <button
                      class="btn btn-success"
                      @click="addToBasket(product.id)"
                    >
                      Добавить
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      @click="removeFromBasket(product.id)"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="sum" v-if="basket">
        <h3>Сумма заказа</h3>
        {{ totalSum }}
      </div>
      <button class="btn btn-primary" @click="makeOreder">заказать</button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      cash: null,
      basket: null,
    };
  },

  mounted() {
    this.getBasket();
  },

  methods: {
    getBasket() {
      try {
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " +  this.$token.value
        );
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
        fetch("http://spa-magaz/api/order/getBasket", requestOptions)
          .then((response) => response.json())
          .then((result) => (this.basket = result.data.products))
          .catch((error) => console.error(error));
      } catch (error) {
        alert("ошибка какая-то");
      }
    },
    addToBasket(index) {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + this.$token.value
      );
      const formdata = new FormData();
      formdata.append("product_id", index);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      fetch("http://spa-magaz/api/order/basket", requestOptions)
        .then((response) => response.json())
        .then((result) => (this.basket = result.data.products))
        .catch((error) => console.error(error));
    },
    removeFromBasket(index) {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " +  this.$token.value
      );
      const formdata = new FormData();
      formdata.append("product_id", index);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      fetch("http://spa-magaz/api/order/basket/remove", requestOptions)
        .then((response) => response.json())
        .then((result) => (this.basket = result.data.products))
        .catch((error) => console.error(error));
    },

    makeOreder() {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + this.$token.value
      );
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://spa-magaz/api/order/make", requestOptions)
        .then((response) => response.json())

        // cпросить
        .then((result) => {
          if (!result.errors) {
            this.$router.push("/");
          } else {
            alert(result.errors);
          }
        })
        .catch((error) => alert(error));
    },
  },
  computed: {
    totalSum() {
      return this.basket.reduce((sum, product) => {
        return sum + product.quantity * product.price;
      }, 0);
    },
  },
};
</script>

<style></style>
