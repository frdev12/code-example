<script>
import IconClose from '@/components/icons/IconClose.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDone from '@/components/icons/IconDone.vue';
import {useBoard} from '@/stores/board';
import {ref} from 'vue';

export default {
  name: 'KanbanCard',
  props: {
    cardId: {
      type: Number,
      required: true,
    },
    columnId: {
      type: Number,
      required: true,
    },
  },
  components: {
    IconClose,
    IconEdit,
    IconDone,
  },
  setup(props) {
    const board = useBoard();
    const column = board.columnsGet.find(item => item.id === props.columnId);
    const card = column.cards.find(item => item.id === props.cardId);
    const isEditCardTitle = ref(false);

    function removeCard() {
      board.removeCard(props.cardId, props.columnId);
    }

    return {
      card,
      isEditCardTitle,
      removeCard,
    };
  },
};
</script>

<template>
  <div class="kanban-card">
    <div class="kanban-card__edit-buttons">
      <icon-edit v-show="!isEditCardTitle" @click="isEditCardTitle = true"/>
      <icon-done v-show="isEditCardTitle" @click="isEditCardTitle = false"/>
      <icon-close @click="removeCard"/>
    </div>
    <textarea class="kanban-card__title" rows="5" v-model="card.cardTitle" v-if="isEditCardTitle"></textarea>
    <div v-else>{{ card.cardTitle }}</div>
  </div>
</template>

<style lang="scss" scoped>
.kanban-card {
  background-color: white;
  padding: 5px 10px;
  border-radius: 5px;
  word-wrap: break-word;
  &:hover {
    cursor: pointer;
  }
  &__title {
    resize : none;
  }
  &__edit-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icon-close {
    &:hover {
      fill: red;
    }
  }
}
</style>