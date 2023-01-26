<script>
import KanbanCard from '@/components/KanbanCard.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDone from '@/components/icons/IconDone.vue';
import IconClose from '@/components/icons/IconClose.vue';
import { Container, Draggable } from "vue3-smooth-dnd";
import {useBoard} from '@/stores/board';
import {useUser} from '@/stores/user';
import {ref} from 'vue';

export default {
  name: 'KanbanColumn',
  components: {
    KanbanCard,
    Container,
    Draggable,
    IconEdit,
    IconDone,
    IconClose,
  },
  props: {
    columnId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const board = useBoard();
    let column = board.columnsGet.find(item => item.id === props.columnId);
    const isEditColumnTitle = ref(false);
    const isCreateNewCard = ref(false);
    const newCardTitle = ref(null);
    const user = useUser();
    
    function onDrop(dropResult) {
      column.cards = applyDrag(column.cards, dropResult);
    }

    function applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = arr
      let itemToAdd = payload;
      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    }

    function getChildPayload(index) {
      return column.cards[index];
    }

    function addNewCard() {
      if (!newCardTitle.value) return;
      board.addNewCard(newCardTitle.value, props.columnId, user.userName);
      isCreateNewCard.value = false;
      newCardTitle.value = null;
    }

    return {
      onDrop,
      getChildPayload,
      column,
      isEditColumnTitle,
      isCreateNewCard,
      addNewCard,
      newCardTitle,
    };
  },
};
</script>

<template>
  <div class="kanban-column">
    <div class="kanban-column__title" :class="{'kanban-column__title--edit': isEditColumnTitle}">
      <input type="text" v-model="column.title" :disabled="!isEditColumnTitle" @keydown.enter="isEditColumnTitle = false">
      <icon-edit @click="isEditColumnTitle = true" v-show="!isEditColumnTitle"/>
      <icon-done @click="isEditColumnTitle = false" v-show="isEditColumnTitle"/>
    </div>
    <Container
        class="column-container"
        orientation="vertical"
        @drop="onDrop"
        group-name="column"
        :get-child-payload="getChildPayload"
    >
      <Draggable v-for="card in column.cards" :key="card.id">
        <kanban-card :card-id="card.id" :column-id="columnId"/>
      </Draggable>
    </Container>
    <textarea
        class="new-card-title"
        placeholder="Заголовок для новой карточки"
        rows="3"
        v-if="isCreateNewCard"
        v-model="newCardTitle"
    ></textarea>
    <button class="add-card" v-show="!isCreateNewCard" @click="isCreateNewCard = true">Добавить карточку</button>
    <div class="new-card-buttons" v-show="isCreateNewCard">
      <button @click="addNewCard">Добавить</button>
      <icon-close @click="isCreateNewCard = false; newCardTitle = null"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.kanban-column {
  width: 200px;
  padding: 0 10px 10px;
  background-color: #EBECF0;
  color: #52617B;
  overflow-y: auto;
  max-height: 85vh;
  border-radius: 5px;

  &__title {
    font-weight: 500;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      width: 80%;
      font-weight: 500;
    }
    .icon-edit {
      cursor: pointer;
    }
    .icon-done {
      cursor: pointer;
    }
    &--edit {
      input {
        border: 1px solid #0066A0;
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }

  .column-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .add-card {
    padding: 8px;
    margin-top: 10px;
    width: 100%;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      background-color: lightgrey;
    }
  }
  .new-card-title {
    width: 100%;
    background-color: white;
    margin-top: 10px;
    font-weight: 300;
    resize : none;
    overflow : auto;
    padding: 5px;
    border-radius: 5px;
  }
  .new-card-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
    button {
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: lightgrey;
      }
    }
    .icon-close {
      cursor: pointer;
      &:hover {
        fill: red;
      }
    }
  }
}
</style>