<template>
  <section>
    <h2>Crie a sua Conta</h2>
    <ErroNotificacao :erros="erros" />
    <transition mode="out-in">
      <button v-if="!criar" class="btn" @click="criar = true">Criar Conta</button>
      <UsuarioForm v-else>
        <button @click.prevent="criarUsuario" class="btn btn-form">Criar Usuário</button>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue"
export default {
  components: {
    UsuarioForm,
  },
  data() {
    return {
      criar: false,
      erros: [],
    }
  },
  methods: {
    async criarUsuario(event) {
      this.erros = []
      const botao = event.currentTarget
      botao.value = "Criando..."
      botao.setAttribute("disabled", "")
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario)
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario)
        await this.$store.dispatch("getUsuario")
        this.$router.push({ name: "usuario" })
      } catch (error) {
        this.erros.push(error.response.data.message)
        botao.value = "Criar usuário"
        botao.setAttribute("disabled", "")
      }
    },
  },
}
</script>


<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
