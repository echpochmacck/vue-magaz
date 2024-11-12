<template>
  <div class="modal" tabindex="-1" role="dialog" v-if="order">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Заказ номер {{ order.id }}</h5>
          <h5 class="modal-title">Статус Заказа: {{ products[0].status_title}}</h5>
        </div>
        <div class="modal-body">
          <div id="product-list" class="grid-view">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>название</th>
                  <th>Фотография</th>
                  <th>Цена за штуку</th>
                  <th>Количество</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" :key="product.id">
                  <td>{{ product.title }}</td>
                  <td>
                    <img
                      :src="
                        product.file_name
                          ? `${this.$url}/src/${product.file_name}`
                          : require('@/img/12452-0197-PE-shinshilla-seraya.jpg')
                      "
                      class="card-img-top"
                      alt="Изображение продукта"
                      width="200px"
                      height="100px"
                      :onerror="
                        'this.src=`' +
                        require('@/img/12452-0197-PE-shinshilla-seraya.jpg') +
                        '`'
                      "
                    />
                  </td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.quantity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Сумма заказа::{{ order.sum }}</h3>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="$emit('closeModal')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["orderId"],
  emits: ["closeModal"],
  data() {
    return {
      order: null,
      products: null,
    };
  },
  async mounted() {
    this.getOrder();
  },
  // alert(this.orderId)
  methods: {
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
          `${this.$url}/api/orders/${this.orderId}`,
          requestOptions
        );

        if (response.status == 200) {
          const res = await response.json();
          this.order = res.data.order;
          this.products = res.data.products;

          console.log(res.data.order);
        } else if (response.status == 404) {
          this.$router.push("/NotFound");
        }
      } catch (error) {
        alert(error);
      }
    },
  },
  //   computed: {
  //     orderId() {
  //       return this.$route.params.id;
  //     },
  //   },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  width: 100%;
  height: 100%;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>
