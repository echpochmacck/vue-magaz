<template>
  <main id="main" class="flex-shrink-0" role="main">
    <div class="container">
      <div class="orders-update">
        <h1>Update Orders: 13</h1>

        <div class="orders-form">
          <form id="w0" action="/admin/orders/update?id=13" method="post">
            <input
              type="hidden"
              name="_csrf"
              value="4yJcnqzLv-dvFeoPd-AXZKxsWrusARwnICpyH4eV6RCbZC3Gya_ujgNb3GAfuSch2gkulsFoehNaW0Bq8MWhIQ=="
            />
            <div class="form-group field-orders-status required">
              <label class="control-label" for="orders-status">Статус</label>
              <input
                type="text"
                id="orders-status"
                class="form-control"
                name="Orders[status]"
                value="dasd"
                maxlength="255"
                aria-required="true"
                v-model="status"
              />

              <div class="help-block"></div>
            </div>
            <div class="form-group">
              <button
                type="submit"
                class="btn btn-success my-3"
                @click.prevent="changeStatus"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      status: null,
    };
  },
  methods: {
    async changeStatus() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", "Bearer " + this.$token.value);

      const urlencoded = new URLSearchParams();
      urlencoded.append("status", this.status);

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      const response = await fetch(
        "http://spa-magaz/api/admin/order?order_id=15",
        requestOptions
      )
      
          if (response.status == 200) {
            this.$router.push("/admin/");
          } else {
            alert("ошибка");
          }
        // .then((result) => console.log(result))
    },
  },
};
</script>

<style></style>
