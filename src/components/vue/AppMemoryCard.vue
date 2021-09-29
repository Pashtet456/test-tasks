<template>
  <div class="memory-card">
    <input type="checkbox"
           v-model="model"
           class="memory-card__input"
           :id="cardData.id"
           :value="cardData"
           :disabled="disableActions">

    <label :for="cardData.id"
           class="memory-card__label">
      {{ cardData.value }}
    </label>
  </div>
</template>

<script>
export default {
  name: "AppCard",
  props: {
    value: {
      type: Array,
      required: true,
    },
    cardData: {
      type: Object,
      default: () => {},
    },
    disableActions: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
}
</script>

