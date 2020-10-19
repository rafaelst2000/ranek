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
    {{ url }}
  </section>
</template>

<script>
import { api } from "@/services/services.js"
import { serialize } from "@/utils.js"
export default {
  data() {
    return {
      produtos: [],
      produtosPorPagina: 9,
    }
  },
  created() {
    this.getProdutos()
  },
  computed: {
    url() {
      const query = serialize(this.$route.query)
      return `/produto?_limit=${this.produtosPorPagina}"${query}`
    },
  },
  methods: {
    getProdutos() {
      api.get(this.url).then((r) => {
        this.produtos = r.data
      })
    },
  },
  watch: {
    url() {
      this.getProdutos()
    },
  },
}
</script>

<style>
</style>