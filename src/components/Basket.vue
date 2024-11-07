<template>
  <main id="main" class="flex-shrink-0" role="main">
    <div class="container">
      <div class="orders-index">
        <h1>Orders</h1>

        <div>
          <h3>Ваш бааланс {{ cash }}</h3>
        </div>

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
                  <th>Количество в наличии</th>

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

                  <td>{{ product.base_quantity }}</td>

                  <td>{{ product.title }}</td>
                  <td>
                    <button
                      class="btn btn-success"
                      @click="addToBasket(index, product.id)"
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      @click="removeFromBasket(index, product.id)"
                    >
                      -
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
      <button class="btn btn-primary" @click="makeOreder" v-if="basket">
        заказать
      </button>
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
    async getBasket() {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.$token.value);
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
        const response = await fetch(
          "http://spa-magaz/api/order/getBasket",
          requestOptions
        );
        const res = await response.json();
        if (response.status == 200) {
          this.basket = res.data.products;
        }
        this.cash = res.cash;
        // alert(this.cash);
      } catch (error) {
        alert(error);
      }
    },
    async addToBasket(id, index) {
      let product = this.basket[id];
      if (product.base_quantity < 1 + product.quantity) {
        alert("Нельзя заказать больше чем есть на складе");
      } else {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.$token.value);
        const formdata = new FormData();
        formdata.append("product_id", index);
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };
        const response = await fetch(
          "http://spa-magaz/api/order/basket",
          requestOptions
        );
        if (response.status == 200) {
          const data = await response.json();
          this.basket = data.data.products;
        } else if (response.status == 404) {
          this.$router.push("/NotFound");
        }
      }
      // .then((result) => (this.basket = result.data.products))
    },
    removeFromBasket(id, index) {
      const product = this.basket[id];
      console.log(product);
      if (product.quantity > 1) {
        this.fetchToRemove(index);
        console.log(index)
      } else if (product.quantity == 1) {
        const conf = confirm(
          "вы уверены что хотите удалить последний товар из корзины"
        );
        if (conf) {
          this.fetchToRemove(index);
        }
      }
    },
    async fetchToRemove(index) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.$token.value);
      const formdata = new FormData();
      formdata.append("product_id", index);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      const response = await fetch(
        "http://spa-magaz/api/order/basket/remove",
        requestOptions
      );
      if (response.status == 200) {
        const data = await response.json();
        this.basket = data.data.products;
      } else if (response.status == 404) {
        this.$router.push("/NotFound");
      }
    },

    async makeOreder() {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.$token.value);
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        "http://spa-magaz/api/order/make",
        requestOptions
      );
      const result = await response.json();
      if (response.status == 200) {
        this.$router.push("/");
      } else {
        alert(result.errors);
      }
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
