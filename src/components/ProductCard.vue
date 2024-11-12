<template>
  <!-- <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">
        {{ product.description }}
      </p>
      <a href="#" class="card-link" @click.prevent="$emit('addProduct')"
        >добавить в корзину</a
      >
    </div>
  </div> -->
  <div class="card" style="width: 18rem">
    <img
      :src="
        product.file_name
          ? `${this.$url}/src/${product.file_name}`
          : require('@/img/12452-0197-PE-shinshilla-seraya.jpg')
      "
      class="card-img-top"
      alt="Изображение продукта"
      width="50%"
      height="50%"
      :onerror="
        'this.src=`' +
        require('@/img/12452-0197-PE-shinshilla-seraya.jpg') +
        '`'
      "
    />
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">{{ product.description }}</p>
      <a href="" class="btn btn-primary" @click.prevent="$emit('addProduct')"
        >Добавить в корзину</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object, // Указываем тип пропса
      required: true, // Указываем, что пропс обязательный
    },
  },

  emits: ["addProduct"],
};
</script>

<style></style>
