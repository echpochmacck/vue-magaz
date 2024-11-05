<template>
  <main id="main" class="flex-shrink-0" role="main">
    <div class="container pt-3">
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
  async mounted() {
    this.getOrder()
  },
  // alert(this.orderId)
  methods:{
   async getOrder() {
       try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.$token.value);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `http://spa-magaz/api/orders/${this.orderId}`,
        requestOptions
      );

      if (response.status == 200) {
        const res = await response.json();
        this.order = res.data.order
        console.log(res.data.order)
      } else if (response.status == 404) {
        this.$router.push("/NotFound");
      }
    } catch (error) {
      alert(error);
    }
    }
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
