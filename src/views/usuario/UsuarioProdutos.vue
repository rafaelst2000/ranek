<template>
  <section>
    <h2>Adicionar produto</h2>
    <ProdutoAdicionar />
    <h2>Seus produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <ProdutoItem :produto="produto">{{ produto.descricao }}</ProdutoItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProdutoAdicionar from "@/components/Produtos/ProdutoAdicionar.vue"
import ProdutoItem from "@/components/Produtos/ProdutoItem.vue"
import { mapState, mapActions } from "vuex"
export default {
  components: {
    ProdutoAdicionar,
    ProdutoItem,
  },
  computed: {
    ...mapState(["login", "usuario", "usuario_produtos"]),
  },
  methods: {
    ...mapActions(["getUsuarioProdutos"]),
  },
  watch: {
    login() {
      this.getUsuarioProdutos()
    },
  },
  created() {
    if (this.login) {
      this.getUsuarioProdutos()
    }
  },
}
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>