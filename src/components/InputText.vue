<template>
  <div class="text">
    <input type="text" :value="modelValue" :placeholder="placeholder" @keyup="$emit('update:modelValue', $event.target.value)">
    <div v-if="modelValue" class="clear" @click="$emit('update:modelValue', '')">✕</div>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: ['placeholder', 'modelValue']
}
</script>

<style scoped lang="scss">
.text {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  input {
    width: 100%;
    font: inherit;
    height: 32px;
    border-radius: 16px;
    border: 1px solid var(--accent-1);
    padding: 0 var(--spacing);
  }
  .clear {
    position: absolute;
    margin-right: var(--spacing-s);
    background: var(--accent-1);
    color: var(--background);
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;

  }
}
</style>
