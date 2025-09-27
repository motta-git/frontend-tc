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
  <tr>
    <td><img :src="server.image_url" :alt="server.host" class="table-image"></td>
    <td>{{ server.host }}</td>
    <td>{{ server.ip }}</td>
    <td class="description-cell">{{ server.description }}</td>
    <td>
      <div class="actions">
        <button @click="handleEdit">Editar</button>
        <button @click="handleDelete" class="delete-btn">Eliminar</button>
      </div>
    </td>
  </tr>
</template>

<style scoped>
.table-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.description-cell {
  max-width: 300px;
  white-space: pre-wrap;
  word-break: break-word;
}

.actions {
  display: flex;
  gap: 5px;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
}

td {
  padding: 8px 12px;
  vertical-align: middle;
  border-bottom: 1px solid #ddd;
}
</style>