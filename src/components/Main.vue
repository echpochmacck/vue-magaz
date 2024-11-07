<template>
  <main id="main" class="flex-shrink-0" role="main">
    <div class="container">
      <div class="products-index">
        <h1>Витрина</h1>
        <div class="user-cash">
          <!-- <h3>Ваш баланс: <br />{{ cash }}</h3> -->
        </div>

        <div
          id="p0"
          data-pjax-container=""
          data-pjax-push-state=""
          data-pjax-timeout="1000"
        >
          <div id="product-list" class="grid-view" v-if="goods">
            <product-card
              v-for="(item, index) in goods"
              :key="index"
              :product="item"
              @addProduct="addProduct(item.id)"
            ></product-card>
            <nav id="w0"></nav>
          </div>
        </div>
      </div>
      <!-- < a class="btn btn-primary" href="/orders/make-order">Заказать</> -->
    </div>
  </main>
</template>

<script>
import ProductCard from "./ProductCard.vue";
export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      goods: null,
      cash: null,
    };
  },
  mounted() {
    // alert(this.$foo)
    this.fetchProducts()
  },

  methods: {
    async fetchProducts() {
      try {
        // alert("sda");
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.$token.value);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          `${this.$url}/api/products`,
          requestOptions
        );
        if (response.status == 200) {
          const data = await response.json();
          this.goods = data.data;
        } else if (response.status == 404) {
          this.$router.push("/NotFound");
        }
      } catch (error) {
        alert("ошибка какая-то");
      }
    },
    addProduct(index) {
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
      fetch("http://spa-magaz/api/order/basket", requestOptions);
      // .catch((error) => console.error(error));
    },
  },
};
</script>

<style>
.grid-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

<table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>
                    <a href="/site/index?sort=title" data-sort="title"
                      >название</a
                    >
                  </th>
                  <th>
                    <a
                      href="/site/index?sort=description"
                      data-sort="description"
                      >Описание</a
                    >
                  </th>
                  <th>
                    <a href="/site/index?sort=price" data-sort="price">цена</a>
                  </th>
                  <th>Добавить в корзину</th>
                </tr>
              </thead>
              <tbody>
                <tr data-key="7" v-for="(item, index) in goods" :key="index">
                  <td>{{ item.title }}</td>
                  <td>{{ item.descrition }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <!-- <a
                      class="btn btn-primary product-order"
                      href="/site/index?product_id=7"
                      >добавить</a
                    > -->
                    <button
                      class="btn btn-primary"
                      @click="addProduct(item.id)"
                    >
                      добавить
                    </button>
                  </td>
                </tr>
                <!-- <tr data-key="7">
                  <td>1</td>
                  <td>3232</td>
                  <td>вывы</td>
                  <td>132</td>
                  <td>
                    <a
                      class="btn btn-primary product-order"
                      href="/site/index?product_id=7"
                      >добавить</a
                    >
                  </td>
                </tr> -->
              </tbody>
            </table>
