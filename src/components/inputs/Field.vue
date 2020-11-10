<template lang="pug">
  StackLayout.field
    TextField(
      :text="value"
      :maxlength="maxlength"
      :data-error="$v.text.$error ? dataError : null"
      :isEnabled="!disabled"
      v-money="isMoney ? money : null"
      v-mask="mask"
      @textChange="handleInput"
      @blur="$emit('blur')"
      :required="isRequired"
      )
    Label(
      :title="title"
      :data-title="dataTitle"
      :data-error="$v.text.$error ? dataError : null"
      )
</template>

<script lang="ts">
import { VMoney } from "v-money";
import { mask } from "ke-the-mask";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Validate } from "vuelidate-property-decorators";

@Component({
  directives: {
    mask,
    money: VMoney,
  },
})
export default class Field extends Vue {
  @Prop() value!: string;

  // PROPRIEDADES OBRIGATÓRIAS
  @Prop() name!: string;

  @Prop() title!: string;

  @Prop() dataTitle!: string;

  @Prop() dataError!: string;

  @Prop() validation!: object;

  // PROPRIEDADES DE USO ESPECIFICO

  @Prop({ default: 50 }) maxlength?: number;

  @Prop({ default: "" }) default!: string;

  @Prop({ default: false }) disabled?: boolean;

  @Prop({ default: true }) required?: boolean;

  // PROPRIEDADES QUE MUDAM O FUNCIONAMENTO
  @Prop({ default: false }) isMoney?: boolean; // true -> formatação monetária aplicada

  @Prop({ default: null }) mask?: string; // string n -> vue-the-mask directive n aplicado

  @Validate(function callback(this: Field) {
    return this.validation;
  })
  text = this.default;

  money = {
    decimal: ",",
    thousands: ".",
    prefix: "R$ ",
    precision: 2,
  };

  get isRequired(): true | null {
    return this.required ? true : null;
  }

  handleInput(e: Event) {
    const { value } = e.target as HTMLInputElement;
    this.text = value;
    this.$v.text.$touch();
    this.$emit("input", value);
    this.$parent.$emit(
      this.$v.$invalid ? "invalido" : "valido",
      this.dataTitle
    );
  }

  mounted() {
    if (this.required) this.$parent.$emit("invalido", this.dataTitle);
  }
}
</script>

<style lang="scss" scoped>
.field {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  margin: 0.5rem 0;
  TextField {
    background-color: #cecece;
    border: none;
    border-radius: 10px;
    // padding: 0.5rem;
  }
}

.label-before {
  line-height: 20px;
  font-size: 12px;
  top: 2px;
  background: rgba($color: #fff, $alpha: 0);
  padding: 0 6px;
  left: 9px;
  transform: translateY(0);
}

.field {
  position: relative;
  margin-bottom: 1rem;

  TextField {
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    border-radius: 5.5px;
    margin-right: 1rem;
    transition: padding 300ms;

    &:valid {
      padding-top: 1.3rem;
      padding-bottom: 0.7rem;

      + Label::before {
        @extend .label-before;
        content: attr(data-title);
      }
    }

    &:focus {
      padding-top: 1.3rem;
      padding-bottom: 0.7rem;

      + Label::before {
        @extend .label-before;
        color: blue;
      }
    }

    &[data-error] {
      padding-top: 1.2rem;
      padding-bottom: 1.2rem;
      + Label {
        &::before {
          color: red;
          @extend .label-before;
        }

        &::after {
          opacity: 1;
        }
      }
    }
  }

  Label::before {
    content: attr(title);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    line-height: 40px;
    color: #777;
    transition: 300ms all;
    font-size: 18px;
    font-weight: 400;
  }
  Label::after {
    content: attr(data-error);
    opacity: 0;
    line-height: 20px;
    font-size: 12px;
    bottom: 2px;
    background: rgba($color: #fff, $alpha: 0);
    padding: 0 6px;
    left: 9px;
    position: absolute;
    color: red;
    transition: 300ms all;
  }
}
</style>
