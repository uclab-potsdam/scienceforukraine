<template>
  <div class="label" v-if="!hideLabel">{{name}}</div>
  <div class="radio" :class="{ segmented, primary, yellow }">
    <label v-for="(o, i) in options" :key="i">
      <input type="radio" :name="name"
        :value="o.value !== undefined ? o.value : o" :checked="(o.value !== undefined ? o.value : o) === modelValue"
        @change="$emit('update:modelValue', o.value !== undefined ? o.value : o)">
      <span>{{o.label || o}}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'InputRadio',
  props: ['name', 'options', 'modelValue', 'segmented', 'yellow', 'primary', 'hideLabel']
}
</script>

<style scoped lang="scss">
.label {
  color: var(--gray);
  font-size: var(--font-size-s);
  margin-bottom: var(--spacing-s);
  text-transform: uppercase;
}
.radio {
  display: flex;
  gap: var(--spacing-s);
  flex-wrap: wrap;

  --tint: var(--accent-1);
  --active-text: var(--background);
  &.yellow, &.primary {
    --tint: var(--accent-2);
    --active-text: var(--text);
  }

  label {
    display: block;
    input {
      appearance: none;
      outline: none;
      + span {
        min-width: 40px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-s) var(--spacing-s);
        background: var(--background);
        border: 1px solid var(--tint);
        height: 25px;
        border-radius: var(--spacing-s);
        font-size: var(--font-size-s);
        transition: background var(--transition);
        cursor: pointer;
        // text-transform: capitalize;

        &:hover {
          background: var(--pale-gray);
        }
      }

      &:checked + span {
        background: var(--tint);
        color: var(--active-text);
        // border: 1px solid var(--tint)
      }
    }
  }

  &.segmented {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 0;
    label {
      input {
        + span {
          border-radius: 0;
          width: 100%;
        }
      }
      &:first-child {
        input {
          + span {
            border-radius: var(--spacing-s) 0 0 var(--spacing-s);
          }
        }
      }
      &:last-child {
        input {
          + span {
            border-radius: 0 var(--spacing-s) var(--spacing-s) 0;
          }
        }
      }
    }
  }
}
</style>
