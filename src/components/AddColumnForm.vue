<script>
import IconClose from '@/components/icons/IconClose.vue';
import {ref} from 'vue';

export default {
  name: 'AddColumnForm',
  components: {
    IconClose,
  },
  emits: ['closeAddColumnForm', 'addNewColumn'],
  setup() {
    const newColumnTitle = ref(null);

    return {
      newColumnTitle,
    };
  },
};
</script>

<template>
  <div class="add-column-form">
    <input
        type="text"
        placeholder="Название списка"
        v-model="newColumnTitle"
        @keypress.enter="$emit('addNewColumn', newColumnTitle)"
    >
    <div class="add-column-form__actions">
      <button @click="$emit('addNewColumn', newColumnTitle)">Добавить</button>
      <icon-close @click="$emit('closeAddColumnForm')"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-column-form {
  background-color: white;
  height: fit-content;
  padding: 5px;
  border-radius: 5px;
  width: 250px;

  input {
    border: 2px solid #0066A0;
    border-radius: 5px;
    margin-bottom: 5px;
    width: 100%;
    padding: 5px;
  }

  &__actions {
    display: flex;
    align-items: center;
    button {
      background-color: #0066A0;
      padding: 5px 20px;
      border-radius: 5px;
      color: white;
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        background-color: #3D87B2;
      }
    }
    .icon-close {
      cursor: pointer;
      &:hover {
        fill: red;
      }
    }
  }
}
</style>