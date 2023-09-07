<script setup>
  import BaseModal from '../common/BaseModal.vue';

  defineProps({
    deleteItem: String,
  });
  const emit = defineEmits(['deleteTODO', 'exitDeleteModal']);
</script>

<template>
  <BaseModal
    submit-text="Delete"
    cancel-text="Cancel"
    @handleSubmit="emit('deleteTODO')"
    @handleCancel="emit('exitDeleteModal')"
  >
    <template v-slot:body>
      <div>
        <div>
          <div class="question">Really delete {{ deleteItem.title }}?</div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
