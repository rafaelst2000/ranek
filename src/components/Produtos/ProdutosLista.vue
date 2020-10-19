<template>
  <section class="produtos-container">
    <div v-if="produtos && produtos.length" class="produtos">
      <div class="produto" v-for="produto in produtos" :key="produto.id">
        <router-link to="/">
          <img
            v-if="produto.fotos.length > 0"
            :src="produto.fotos[0].src"
            :alt="produto.fotos[0].titulo"
          />
          <p class="preco">{{ produto.preco }}</p>
          <h2 class="titulo">{{ produto.nome }}</h2>
          <p class="descricao">{{ produto.descricao }}</p>
        </router-link>
      </div>
    </div>
    <div v-else-if="produtos && produtos.length === 0">
      <p class="sem-resultados">
        Busca sem resultados. Tente buscar outro termo
      </p>
    </div>
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

<style scoped>
.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}
.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.produto {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: white;
  border-radius: 4px;
  transition: all 0.2s;
}

.produto:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.produto img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  font-weight: bold;
  color: #e80;
}

.sem-resultados {
  text-align: center;
}
</style>