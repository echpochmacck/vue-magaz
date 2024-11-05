<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">
        {{ product.description }}
      </p>
      <a href="#" class="card-link" @click.prevent="$emit('addProduct')"
        >добавить в корзину</a
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
