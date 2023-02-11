<script>
import UserButton from '@/components/UserButton.vue';

export default {
  name: 'UserMenu',
  components: {
    UserButton,
  },
  props: {
    userName: {
      type: String,
      required: true,
    },
  },
  emits: ['logout', 'removeData'],
};
</script>

<template>
  <div class="user-menu">
    <div class="user-menu__title">Учетная запись</div>
    <div class="user-menu__info">
      <user-button :user-name="userName" :is-in-menu="true"/>
      <div>{{ userName }}</div>
    </div>
    <button class="user-menu__button" @click="$emit('removeData')">Удалить данные</button>
    <button class="user-menu__button" @click="$emit('logout')">Выйти</button>
  </div>
</template>

<style lang="scss" scoped>
.user-menu {
  position: absolute;
  top: 55px;
  right: 50px;
  border-radius: 5px;
  background-color: white;
  padding: 20px 15px;
  box-shadow: 0 0 5px 1px grey;
  z-index: 10;

  &__title {
    text-transform: uppercase;
    color: grey;
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }

  &__button {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }
}
</style>