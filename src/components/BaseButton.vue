<template>
  <button @click="handleClick"><slot></slot></button>
</template>
<script setup>
  const emit = defineEmits(['onClick']);

  const handleClick = () => {
    emit('onClick', undefined);
  };
</script>
