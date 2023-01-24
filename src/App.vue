<script>
import UserButton from '@/components/UserButton.vue';
import UserMenu from '@/components/UserMenu.vue';
import CardsColumn from '@/components/CardsColumn.vue';
import {ref, onMounted} from 'vue';

export default {
  components: {
    UserButton,
    UserMenu,
    CardsColumn,
  },
  setup() {
    const isShowMenu = ref(false);
    const userMenu = ref(null);
    const userButton = ref(null);

    onMounted(() => {
      document.addEventListener('click', onClickOutsideMenu);
    });

    function onClickOutsideMenu(event) {
      if (userMenu.value.$el.contains(event.target) || userButton.value.$el.contains(event.target)) {
        return;
      }
      isShowMenu.value = false;
    }

    return {
      isShowMenu,
      userMenu,
      userButton,
    };
  },
};
</script>

<template>
  <header class="header">
    <div class="logo">Code Example</div>
    <user-button user-name="Sergey" @click="isShowMenu =!isShowMenu" ref="userButton"/>
    <user-menu user-name="Sergey" v-show="isShowMenu" ref="userMenu"/>
  </header>
  <main class="main">
    <cards-column/>
  </main>
</template>

<style lang="scss" scoped>
.header {
  padding: 10px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0066A0;
  position: relative;

  .logo {
    font-size: 18px;
    font-weight: 500;
    color: white;
  }
}
.main {
  background-color: #005C91;
  padding: 10px 50px;
  height: 500px;
  display: flex;
  gap: 8px;
}
</style>
