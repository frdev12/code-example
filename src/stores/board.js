import {defineStore} from 'pinia';

export const useBoard = defineStore('Board', {
  state: () => {
    return {
      columns: [],
    };
  },
  getters: {
    columnsGet(state) {
      return state.columns;
    },
  },
  actions: {
    addNewColumn(title) {
      const ids = this.columns.map(item => item.id);
      let maxId;
      if (ids.length === 0) {
        maxId = 1;
      } else {
        maxId = Math.max(...ids);
      }
      this.columns.push({
        id: maxId + 1,
        title: title,
        cards: [],
      });
    },
    addNewCard(cardTitle, columnId) {
      const ids = this.columns.map(item => item.cards.map(elem => elem.id)).flat();
      let maxId;
      if (ids.length === 0) {
        maxId = 1;
      } else {
        maxId = Math.max(...ids);
      }
      const column = this.columns.find(item => item.id === columnId);
      column.cards.push({
        id: maxId + 1,
        cardTitle: cardTitle,
      });
    },
    removeCard(cardId, columnId) {
      const column = this.columns.find(item => item.id === columnId);
      const index = column.cards.findIndex(item => item.id === cardId);
      column.cards.splice(index, 1);
    },
    getBoard() {
      if (localStorage.getItem('board')) {
        const board = JSON.parse(localStorage.getItem('board'));
        this.columns = board.columns;
      }
    },
  },
});