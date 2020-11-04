<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div class="produtos-wrapper" v-for="(compra, index) in compras" :key="index">
        <ProdutoItem v-if="compra.produto" :produto="compra.produto">
          <p class="vendedor"><span>Vendedor: </span> {{ compra.vendedor_id }}</p>
        </ProdutoItem>
      </div>
    </div>
  </section>
</template>

<script>
import { api } from "@/services/services.js"
import ProdutoItem from "@/components/Produtos/ProdutoItem.vue"
import { mapState } from "vuex"
export default {
  data() {
    return {
      compras: null,
    }
  },
  components: {
    ProdutoItem,
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getCompras() {
      api.get(`/transacao?comprador_id=${this.usuario.id}`).then((res) => {
        this.compras = res.data
      })
    },
  },
  created() {
    if (this.login) this.getCompras()
  },
  watch: {
    login() {
      this.getCompras()
    },
  },
}
</script>

<style scoped>
.produto-wrapper {
  margin-bottom: 40px;
}
.vendedor span {
  color: #e80;
}
h2 {
  margin-bottom: 20px;
}
</style>