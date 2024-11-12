<template>
  <main id="main" class="flex-shrink-0" role="main">
    <div class="container">
      <div class="orders-index">
        <h1>Заказы</h1>

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
                  <!-- <td>
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
                  </td> -->
                  <td @click="OpenModal(order.id)" >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                      />
                      <path
                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                      />
                    </svg>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>

  <Modal :orderId="selectedOrder" v-if="orders && isModalOpen" @closeModal="closeModal"></Modal>
</template>

<script>
import Modal from "./Modal.vue";
export default {
  data() {
    return {
      orders: null,
      isModalOpen: null,
      selectedOrder:null,
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

        const response = await fetch(`${this.$url}/api/orders`, requestOptions);
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
          `${this.$url}/api/orders/${id}`,
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
    OpenModal(orderId) {
      this.selectedOrder = orderId;
      this.isModalOpen = true;
    },

    closeModal() {
      this.selectedOrder = null;
      this.isModalOpen = false;
    },
  },
  components: {
    Modal,
  },
};
</script>

<style></style>
