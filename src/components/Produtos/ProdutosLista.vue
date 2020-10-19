<template>
  <section class="produtos-container">
    <div v-for="produto in produtos" :key="produto.id">
      <img
        v-if="produto.fotos.length > 0"
        :src="produto.fotos[0].src"
        :alt="produto.fotos[0].titulo"
      />
      <p class="preco">{{ produto.preco }}</p>
      <h2 class="titulo">{{ produto.nome }}</h2>
      <p class="descricao">{{ produto.descricao }}</p>
    </div>
  </section>
</template>

<script>
import { api } from "@/services/services.js"
export default {
  data() {
    return {
      produtos: [],
    }
  },
  created() {
    this.getProdutos()
  },
  methods: {
    getProdutos() {
      api.get("/produto").then((r) => {
        this.produtos = r.data
      })
    },
  },
}
</script>

<style>
</style>