<template>
  <section>
    <h1>👍 Compre ou Venda 👎</h1>
    <ProdutosBuscar />
    <ProdutosLista />
  </section>
</template>

<script>
import ProdutosBuscar from "@/components/Produtos/ProdutosBuscar.vue"
import ProdutosLista from "@/components/Produtos/ProdutosLista.vue"
export default {
  components: {
    ProdutosBuscar,
    ProdutosLista,
  },
}
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #87f;
  margin-top: 40px;
  text-align: center;
}
</style>
