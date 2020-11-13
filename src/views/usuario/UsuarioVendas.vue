<template>
  <section>
    <div v-if="vendas">
      <h2>Vendas</h2>
      <div class="produtos-wrapper" v-for="(venda, index) in vendas" :key="index">
        <ProdutoItem v-if="venda.produto" :produto="venda.produto">
          <p class="vendedor"><span>Comprador: </span> {{ venda.comprador_id }}</p>
        </ProdutoItem>
        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </div>
      </div>
    </div>
    <PaginaCarregando v-else />
  </section>
</template>

<script>
import { api } from "@/services/services.js"
import ProdutoItem from "@/components/Produtos/ProdutoItem.vue"
import { mapState } from "vuex"
export default {
  data() {
    return {
      vendas: null,
    }
  },
  components: {
    ProdutoItem,
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getVendas() {
      api.get(`/transacao?tipo=vendedor_id`).then((res) => {
        this.vendas = res.data
      })
    },
  },
  created() {
    if (this.login) this.getVendas()
  },
  watch: {
    login() {
      this.getVendas()
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

.entrega {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  margin: 0px;
  justify-self: end;
}

@media screen and (max-width: 500px) {
  .entrega {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
  h3 {
    justify-self: start;
  }
}
</style>
