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
            <div class="summary">Показаны записи <b>1-2</b> из <b>2</b>.</div>
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
                  <td>{{ order.status }}</td>
                  <td>{{ order.order_date }}</td>
                  <td>{{ order.sum }}</td>
                  <!-- fifiашп -->
                  <td>
                    <router-link
                      :to="{ name: 'Order', params: { id: order.id} }"
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
    try {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " +  this.$token.value
      );

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://spa-magaz/api/orders", requestOptions)
        .then((response) => {
          if (response.status == 200) {
            console.log(response);
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
