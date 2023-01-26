<script>
import IconPlus from '@/components/icons/IconPlus.vue';

export default {
  name: 'AddColumnButton',
  components: {
    IconPlus,
  },
};
</script>

<template>
  <button class="add-column-button">
    <icon-plus/>
    Добавить колонку
  </button>
</template>

<style lang="scss" scoped>
.add-column-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 5px 10px;
  background-color: #3D87B2;
  color: white;
  border-radius: 5px;
  width: 200px;
  &:hover {
    cursor: pointer;
    background-color: #55A9DC;
  }
}
</style>