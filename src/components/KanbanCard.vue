<script>
import IconClose from '@/components/icons/IconClose.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDone from '@/components/icons/IconDone.vue';
import {useBoard} from '@/stores/board';
import {useCardModal} from '@/stores/cardModal';
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
    const cardModal = useCardModal();

    function removeCard() {
      board.removeCard(props.cardId, props.columnId);
    }

    function openCardModal() {
      if (isEditCardTitle.value === true) return;
      cardModal.updateShowCardModal(true, props.columnId, props.cardId);
    }

    return {
      card,
      isEditCardTitle,
      removeCard,
      openCardModal,
    };
  },
};
</script>

<template>
  <div class="kanban-card" @click="openCardModal">
    <div class="kanban-card__edit-buttons">
      <icon-edit v-show="!isEditCardTitle" @click.stop="isEditCardTitle = true"/>
      <icon-done v-show="isEditCardTitle" @click.stop="isEditCardTitle = false"/>
      <icon-close @click.stop="removeCard"/>
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