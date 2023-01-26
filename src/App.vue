<script>
import UserButton from '@/components/UserButton.vue';
import UserMenu from '@/components/UserMenu.vue';
import KanbanBoard from '@/components/KanbanBoard.vue';
import AuthorizationModal from '@/components/AuthorizationModal.vue';
import {ref, onMounted} from 'vue';
import {useBoard} from '@/stores/board';
import {useUser} from '@/stores/user';

export default {
  components: {
    UserButton,
    UserMenu,
    KanbanBoard,
    AuthorizationModal,
  },
  setup() {
    const isShowMenu = ref(false);
    const userMenu = ref(null);
    const userButton = ref(null);
    const isShowAuthModal = ref(false);
    const board = useBoard();
    const user = useUser();

    board.$subscribe((mutation, state) => {
      localStorage.setItem('board', JSON.stringify(state));
    });

    onMounted(async () => {
      await board.getBoard();
      await user.checkUser();
      if (!user.userNameGet) {
        isShowAuthModal.value = true;
      }

      document.addEventListener('click', onClickOutsideMenu);
    });

    function onClickOutsideMenu(event) {
      if (isShowAuthModal.value === false) {
        if (userMenu.value.$el.contains(event.target) || (userButton.value.$el.contains(event.target))) {
          return;
        }
      }
      isShowMenu.value = false;
    }

    function login(userName) {
      user.saveUser(userName);
      isShowAuthModal.value = false;
    }

    function logout() {
      user.removeUser();
      isShowAuthModal.value = true;
    }

    return {
      isShowMenu,
      userMenu,
      userButton,
      board,
      isShowAuthModal,
      user,
      logout,
      login,
    };
  },
};
</script>

<template>
  <header class="header" v-if="user.userNameGet">
    <div class="logo">Code Example</div>
    <user-button :user-name="user.userNameGet" @click="isShowMenu =!isShowMenu" ref="userButton"/>
    <user-menu
        :user-name="user.userNameGet"
        v-show="isShowMenu"
        ref="userMenu"
        @logout="logout"
    />
  </header>

  <main class="main">
    <kanban-board/>
  </main>

  <AuthorizationModal @login="login" v-if="isShowAuthModal"/>
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
  padding: 10px 50px;
  //display: flex;
  //gap: 8px;

}
</style>
