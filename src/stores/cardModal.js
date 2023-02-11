import {defineStore} from 'pinia';

export const useCardModal = defineStore('cardModal', {
  state: () => {
    return {
      isShowCardModal: false,
      columnId: null,
      cardId: null,
    };
  },
  getters: {
    isShowCardModalGet(state) {
      return state.isShowCardModal;
    },
    columnIdGet(state) {
      return state.columnId;
    },
    cardIdGet() {
      return this.cardId;
    },
  },
  actions: {
    updateShowCardModal(isShow, columnId, cardId) {
      this.isShowCardModal = isShow;
      this.columnId = columnId;
      this.cardId = cardId;
    },
  },
});