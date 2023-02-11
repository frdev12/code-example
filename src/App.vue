<script>
import UserButton from '@/components/UserButton.vue';
import UserMenu from '@/components/UserMenu.vue';
import KanbanBoard from '@/components/KanbanBoard.vue';
import AuthorizationModal from '@/components/AuthorizationModal.vue';
import OpenedCardModal from '@/components/OpenedCardModal.vue';
import {ref, onMounted} from 'vue';
import {useBoard} from '@/stores/board';
import {useUser} from '@/stores/user';
import {useCardModal} from '@/stores/cardModal';

export default {
  name: 'App',
  components: {
    UserButton,
    UserMenu,
    KanbanBoard,
    AuthorizationModal,
    OpenedCardModal,
  },
  setup() {
    const isShowMenu = ref(false);
    const userMenu = ref(null);
    const userButton = ref(null);
    const isShowAuthModal = ref(false);
    const board = useBoard();
    const user = useUser();
    const cardModal = useCardModal();

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

    function removeData() {
      board.$reset();
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
      cardModal,
      removeData,
    };
  },
};
</script>

<template>
  <header class="header" v-if="user.userNameGet">
    <div class="logo">Code Example</div>
    <UserButton :user-name="user.userNameGet" @click="isShowMenu =!isShowMenu" ref="userButton"/>
    <UserMenu
        :user-name="user.userNameGet"
        v-show="isShowMenu"
        ref="userMenu"
        @logout="logout"
        @remove-data="removeData"
    />
  </header>

  <main class="main">
    <KanbanBoard/>
  </main>

  <AuthorizationModal @login="login" v-if="isShowAuthModal"/>
  <OpenedCardModal v-if="cardModal.isShowCardModalGet"/>
</template>

<style lang="scss" scoped>
.header {
  padding: 10px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0066A0;

  .logo {
    font-size: 18px;
    font-weight: 500;
    color: white;
  }
}

.main {
  padding: 10px 50px;
  overflow-x: auto;
  overflow-y: hidden;
  height: 90vh;

}
</style>
