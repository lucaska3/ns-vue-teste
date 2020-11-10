<template lang="pug">
  StackLayout.form
    FlexboxLayout(action="/" method="post" @submit.prevent="submit")
      slot
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
// Componente Global: USO
// Form(@submit="a" @validation="b")
// b = inputsInvalidos
export default class Form extends Vue {
  inputsInvalidos: Set<string> = new Set();

  created() {
    this.$on("invalido", (inputTitle: string) => {
      this.inputsInvalidos.add(inputTitle);
      this.$emit("validation", this.inputsInvalidos);
    });
    this.$on("valido", (inputTitle: string) => {
      this.inputsInvalidos.delete(inputTitle);
      this.$emit("validation", this.inputsInvalidos);
    });
  }

  submit() {
    this.$emit("submit");
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  form {
    display: flex;
    flex-flow: column nowrap;
    .row {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .field {
        &.l40 {
          width: 55%;
        }
        &.l30 {
          width: 65%;
        }
        &.r40 {
          width: 40%;
        }
        &.r30 {
          width: 30%;
        }
      }
    }
  }
}
</style>
