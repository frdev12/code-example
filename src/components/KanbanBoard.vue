<script>
import KanbanColumn from '@/components/KanbanColumn.vue';
import AddColumnButton from '@/components/AddColumnButton.vue';
import AddColumnForm from '@/components/AddColumnForm.vue';
import {Container, Draggable} from 'vue3-smooth-dnd';
import {useBoard} from '@/stores/board';
import {ref} from 'vue';

export default {
  name: 'KanbanBoard',
  components: {
    Container,
    Draggable,
    KanbanColumn,
    AddColumnButton,
    AddColumnForm,
  },
  setup() {
    const board = useBoard();
    const isShowAddButton = ref(true);

    function onDrop(dropResult) {
      const columns = applyDrag(board.columnsGet, dropResult);
      board.setBoard(columns);
    }

    function applyDrag(arr, dragResult) {
      const {removedIndex, addedIndex, payload} = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = arr;
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    }

    function addNewColumn(title) {
      if (!title) return;
      board.addNewColumn(title);
      isShowAddButton.value = true;
    }

    return {
      onDrop,
      isShowAddButton,
      addNewColumn,
      board,
    };
  },
};
</script>

<template>
  <div class="kanban-board">
    <Container class="kanban-board-container" orientation="horizontal" @drop="onDrop">
      <Draggable v-for="column in board.columnsGet" :key="column.id">
        <div>
          <KanbanColumn :column-id="column.id"/>
        </div>
      </Draggable>
      <div>
        <AddColumnButton v-if="isShowAddButton" @click="isShowAddButton = false"/>
        <AddColumnForm v-else @closeAddColumnForm="isShowAddButton = true" @addNewColumn="addNewColumn"/>
      </div>
    </Container>

  </div>
</template>

<style lang="scss" scoped>
.kanban-board {
  display: flex;
  gap: 8px;

  .kanban-board-container {
    display: flex;
    gap: 8px;
  }
}
</style>