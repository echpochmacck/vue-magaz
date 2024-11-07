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
  <div class="card" style="width: 18rem;">
    
  <img src="..\img\12452-0197-PE-shinshilla-seraya.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{ product.title }}</h5>
    <p class="card-text">{{ product.description }}</p>
    <a href="" class="btn btn-primary" @click.prevent="$emit('addProduct')">Добавить в корзину</a>
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
