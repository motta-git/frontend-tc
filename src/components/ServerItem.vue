<script setup>
import { useServerStore } from '@/stores/serverStore';

const props = defineProps({
  server: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['edit-server']);

const store = useServerStore();

function handleDelete() {
  store.deleteServer(props.server.id);
}

function handleEdit() {
  emit('edit-server', props.server.id);
}
</script>

<template>
  <div class="server-card">
    <img :src="server.image_url" :alt="server.host" class="server-image">
    <div class="server-info">
      <h3>{{ server.host }}</h3>
      <p><strong>IP:</strong> {{ server.ip }}</p>
      <p class="description">{{ server.description }}</p>
    </div>
    <div class="server-actions">
      <button @click="handleEdit">Editar</button>
      <button @click="handleDelete" class="delete-btn">Eliminar</button>
    </div>
  </div>
</template>

<style scoped>
.server-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.server-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.server-info {
  padding: 15px;
  flex-grow: 1;
}
.description {
  font-size: 0.9em;
  color: #666;
}
.server-actions {
  padding: 0 15px 15px;
  display: flex;
  gap: 10px;
}
.delete-btn {
  background-color: #e74c3c;
  color: white;
}
</style>