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
    isShowCardModalGet() {
      return this.isShowCardModal;
    },
    columnIdGet() {
      return this.columnId;
    },
    cardIdGet() {
      return this.cardId;
    }
  },
  actions: {
    updateShowCardModal(isShow, columnId, cardId) {
      this.isShowCardModal = isShow;
      this.columnId = columnId;
      this.cardId = cardId;
    }
  },
});