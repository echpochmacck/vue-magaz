<template>
  <main id="main" class="flex-shrink-0" role="main">
    <div class="container">
      <div class="orders-index">
        <h1>Заказы пользователей</h1>
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
                  <th>
                    <a
                      href="/admin/orders/index?sort=user_id"
                      data-sort="user_id"
                      >ID Заказа</a
                    >
                  </th>
                  <th>
                    <a
                      href="/admin/orders/index?sort=user_id"
                      data-sort="user_id"
                      >ID Пользователя</a
                    >
                  </th>
                  <th>
                    <a href="/admin/orders/index?sort=status" data-sort="status"
                      >Статус</a
                    >
                  </th>
                  <th>
                    <a
                      href="/admin/orders/index?sort=order_date"
                      data-sort="order_date"
                      >Дата Оформления</a
                    >
                  </th>
                  <th>
                    <a href="/admin/orders/index?sort=sum" data-sort="sum"
                      >Сумма</a
                    >
                  </th>
                  <th>Изменить статус</th>
                </tr>
              </thead>
              <tbody v-if="orders">
                <tr data-key="13" v-for="order in orders" :key="order.id">
                  <td>{{ order.id }}</td>
                  <td>{{ order.user_id }}</td>
                  <td>{{ order.status }}</td>
                  <td>{{ order.order_date }}</td>
                  <td>{{ order.sum }}</td>
                  <!-- fifiашп -->
                  <td>
                    <router-link
                      :to="{ name: 'OrderForm', params: { id: order.id } }"
                      custom
                      v-slot="{ navigate }"
                      v-if="!token"
                    >
                      <a href="#" class="nav-link" @click="navigate"
                        >Посмотреть</a
                      >
                    </router-link>
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
//    alert(this.$token.value)
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.$token.value);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://spa-magaz/api/admin/orders", requestOptions)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((result) => (this.orders = result.data))
        .catch((error) => console.error(error));
    } catch (error) {
      alert("ошибка какая-то");
    }
  },
};
</script>

<style></style>
