<template>
  <main id="main" class="flex-shrink-0" role="main">
    <div class="container">
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
                  <th><a href="/orders/index?sort=id" data-sort="id">ID</a></th>
                  <th>
                    <a href="/orders/index?sort=status" data-sort="status"
                      >Статус</a
                    >
                  </th>
                  <th>
                    <a
                      class="asc"
                      href="/orders/index?sort=-order_date"
                      data-sort="-order_date"
                      >Дата Оформления</a
                    >
                  </th>
                  <th>
                    <a href="/orders/index?sort=sum" data-sort="sum">Сумма</a>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-if="orders">
                <tr data-key="13" v-for="order in orders" :key="order.id">
                  <td>{{ order.id }}</td>
                  <td>{{ order.status_title }}</td>
                  <td>{{ order.order_date }}</td>
                  <td>{{ order.sum }}</td>
                  <!-- fifiашп -->
                  <td>
                    <div class="pr-3">
                      <router-link
                        :to="{ name: 'Order', params: { id: order.id } }"
                        custom
                        v-slot="{ navigate }"
                        v-if="!token"
                      >
                        <a href="#" class="btn btn-success" @click="navigate"
                          >Посмотреть</a
                        >
                      </router-link>
                    </div>
                    <button
                      class="btn btn-danger mt-3"
                      v-if="order.status == 'Новый'"
                      @click="deleteOrder(order.id)"
                    >
                      Отменить
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
      orders: null,
      //   cash: null,
    };
  },
  mounted() {
    this.getOrders();

  },
  methods: {
    async getOrders() {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.$token.value);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          `${this.$url}/api/orders`,
          requestOptions
        );
        if (response.status == 200) {
          console.log(response);
          const res = await response.json();
          this.orders = res.data;
        } else if (response.status == 404) {
          // alert('dsd')
          this.$router.push("/NotFound");
        }
      } catch (error) {
        alert("ошибка какая-то");
      }
    },

    
    async deleteOrder(id) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.$token.value);

        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          `http://spa-magaz/api/orders/${id}`,
          requestOptions
        );

        if (response.status == 204) {
          // this.$router.push("/Main");
          this.getOrders();
        } else if (response.status == 404) {
          this.$router.push("/NotFound");
        }
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style></style>
