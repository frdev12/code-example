<script>
import IconClose from '@/components/icons/IconClose.vue';
import {useCardModal} from '@/stores/cardModal';
import {useBoard} from '@/stores/board';

export default {
  name: 'OpenedCardModal',
  components: {
    IconClose,
  },
  setup() {
    const cardModal = useCardModal();
    const board = useBoard();
    const column = board.columnsGet.find(item => item.id === cardModal.columnId);
    const card = column.cards.find(item => item.id === cardModal.cardId);

    function closeModal() {
      cardModal.updateShowCardModal(false, null, null);
    }

    function removeCard() {
      board.removeCard(cardModal.cardId, cardModal.columnId);
      closeModal();
    }

    return {
      closeModal,
      cardModal,
      column,
      card,
      removeCard,
    };
  },
};
</script>

<template>
  <div class="overlay" @click="closeModal"></div>
  <div class="container">
    <div class="card-modal">
      <icon-close @click="closeModal"/>
      <div class="title">
        <input type="text" v-model="card.cardTitle">
      </div>
      <div class="column">Клонка {{ column.title }}</div>
      <div class="date">
        <input type="date" v-model="card.date">
      </div>
      <div class="creator">
        <div>Создатель:</div>
        <input type="text" v-model="card.creator">
      </div>
      <div class="text">
        <div>Текст</div>
        <textarea rows="5" v-model="card.text"></textarea>
      </div>
      <div class="delete">
        <button @click="removeCard">Удалить</button>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.card-modal {
  width: 350px;
  max-height: 85vh;
  background-color: white;
  padding: 30px;
  border-radius: 5px;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #263959;

  .icon-close {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    &:hover {
      fill: red;
    }
  }

  .title {
    font-size: 18px;
    font-weight: 500;
    input {
      width: 100%;
      padding: 5px;
      border-radius: 5px;
      font-weight: 500;
      &:focus {
        border: 1px solid #0066A0;
      }
    }
  }
  .column {
    font-weight: 400;
  }
  .creator {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    input {
      width: 100%;
      padding: 5px;
      border-radius: 5px;
      font-weight: 500;
      &:focus {
        border: 1px solid #0066A0;
      }
    }
  }
  .text {
    textarea {
      width: 100%;
      resize : none;
      border: 1px solid #0066A0;
      border-radius: 5px;
      padding: 5px;
    }
  }
  .delete {
    button {
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 5px;
      &:hover {
        background-color: lightgrey;
      }
    }
  }
}
</style>