<template>
  <main id="main" class="flex-shrink-0" role="main">
    <div class="container">
      <div class="orders-view" v-if="order">
        <!-- <h1>14</h1> -->
        <table id="w0" class="table table-striped table-bordered detail-view">
          <tbody>
            <!-- <tr>
              <th>User ID</th>
              <td>1</td>
            </tr> -->
            <tr>
              <th>Статус</th>
              <td>{{ order.status }}</td>
            </tr>
            <tr>
              <th>Дата Оформления</th>
              <td>{{ order.order_date }}</td>
            </tr>
            <tr>
              <th>Сумма</th>
              <td>{{ order.sum }}</td>
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
      order: null,
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

      fetch(`http://spa-magaz/api/orders/${this.orderId}`, requestOptions)
        .then((response) => {
          if (response.status == 200) {
            // response = response.json();
            return response.json();
          }
        })
        .then((result) => this.order = result.data.order)
        .catch((error) => console.error(error));
    } catch (error) {
      alert("ошибка какая-то");
    }
    // alert(this.orderId)
  },
  computed: {
    orderId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style>
main {
  margin-top: 5em;
}
</style>
