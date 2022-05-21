<template>
  <div class="checkbox">
    <label>
      {{ name }}
      <input type="checkbox"
        :value="null" :checked="null === modelValue"
        @change="$emit('update:modelValue', $event.target.checked)">
      <span class="toggle"/>
    </label>
  </div>
</template>

<script>
export default {
  name: 'InputToggle',
  props: ['name', 'modelValue']
}
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  gap: var(--spacing-s);
  flex-wrap: wrap;
  label {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: var(--font-size-s);
    text-transform: uppercase;
    color: var(--gray);

    input {
      display: none;

      + .toggle {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        // width: 54px;
        // height: 30px;
        width: 48px;
        height: 25px;
        // background: green;
        user-select: none;
        border: 1px solid var(--accent-1);
        background: var(--light-gray);
        border-radius: 15px;
        // border-radius: var(--spacing-s);
        transition: background .2s .05s;
        overflow: hidden;

        &::after {
          content: "";
          display: block;
          // height: 28px;
          // width: 28px;
          height: 23px;
          width: 23px;
          background: var(--background);
          box-shadow: 0 0 4px 0 var(--gray);
          transition: transform .2s;
          transform: translateX(0px);
          border-radius: 50%;
          // border-radius: var(--spacing-s)
        }
      }

      &:checked + .toggle {
        // justify-content: flex-end;
        background: var(--accent-1);
        transition: background .2s;

        &::after {
          transform: translateX(24px);
          box-shadow: 0 0 4px 0 var(--dark-gray);
        }
      }
    }
    // input {
    //   appearance: none;
    //   outline: none;
    //   + span {
    //     min-width: 40px;
    //     display: inline-flex;
    //     justify-content: center;
    //     padding: var(--spacing-s) var(--spacing);
    //     // background: var(--dimmed);
    //     border: 1px solid var(--accent-2);
    //     height: 32px;
    //     border-radius: 16px;
    //     // font-size: var(--font-size-s);
    //   }

    //   &:checked + span {
    //     background: var(--accent-1);
    //     color: var(--background);
    //     border: 1px solid var(--accent-1)
    //   }
    // }
  }
}
</style>
