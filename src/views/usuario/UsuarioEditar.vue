<template>
  <section>
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar Usuario</button>
    </UsuarioForm>
    <ErroNotificacao :erros="erros" />
  </section>
</template>

<script>
import { api } from "@/services/services.js"
import UsuarioForm from "@/components/UsuarioForm.vue"
export default {
  components: {
    UsuarioForm,
  },
  data() {
    return {
      erros: [],
    }
  },
  created() {
    document.title = "Usuário | Editar"
  },
  methods: {
    atualizarUsuario() {
      this.erros = []
      api
        .put("/usuario", this.$store.state.usuario)
        .then(() => {
          this.$store.dispatch("getUsuario")
          this.$router.push({ name: "usuario" })
        })
        .catch((error) => {
          this.erros.push(error.response.data.message)
        })
    },
  },
}
</script>

<style>
</style>