<template>
  <button class="user-button" :class="{'user-button--in-menu': isInMenu}">
    {{ userName.charAt(0).toUpperCase() }}
  </button>
</template>

<script>
export default {
  name: 'UserButton',
  props: {
    userName: {
      type: String,
      required: true,
    },
    isInMenu: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.user-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #5243AA;
  font-size: 18px;
  font-weight: 500;
  color: white;
  &:hover {
    outline: 3px solid #55A9DC;
    cursor: pointer;
  }
  &--in-menu {
    width: 40px;
    height: 40px;
    &:hover {
      outline: none;
      cursor: auto;
    }
  }
}
</style>