import {defineStore} from 'pinia';

export const useUser = defineStore('User', {
  state: () => {
    return {
      userName: null,
    };
  },
  getters: {
    userNameGet() {
      return this.userName;
    },
  },
  actions: {
    saveUser(userName) {
      this.userName = userName;
      localStorage.setItem('userName', userName);
    },
    checkUser() {
      this.userName = localStorage.getItem('userName');
    },
    removeUser() {
      this.userName = null;
      localStorage.removeItem('userName');
    },
  },
});