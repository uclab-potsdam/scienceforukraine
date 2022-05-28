<template>
  <div class="text">
    <input type="text" :value="modelValue" :placeholder="placeholder" @keyup="$emit('update:modelValue', $event.target.value)">
    <div v-if="modelValue" class="clear" @click="$emit('update:modelValue', '')">×</div>
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
    height: 25px;
    border-radius: var(--spacing-s);
    border: 1px solid var(--accent-1);
    padding: 0 var(--spacing-s);
    font-size: var(--font-size-s);
  }
  .clear {
    position: absolute;
    // margin-right: var(--spacing-s);
    background: var(--accent-1);
    color: var(--background);
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 var(--spacing-s) var(--spacing-s) 0;
    cursor: pointer;

  }
}
</style>
