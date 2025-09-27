<script setup>
import { useServerStore } from '@/stores/serverStore';
import ServerItem from './ServerItem.vue';
import draggable from 'vuedraggable'; // Import draggable

const store = useServerStore();
const emit = defineEmits(['edit-server']);

function onEdit(serverId) {
  emit('edit-server', serverId);
}

// This function is called when the user finishes dragging
function onDragEnd() {
  store.saveOrder();
}
</script>

<template>
  <div class="table-container" v-if="store.serverCount > 0">
    <table>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Host</th>
          <th>IP</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <draggable v-model="store.servers" tag="tbody" item-key="id" @end="onDragEnd">
        <template #item="{ element: server }">
          <ServerItem :server="server" @edit-server="onEdit" />
        </template>
      </draggable>
    </table>
  </div>
  <div v-else>
    <p>No hay servidores para mostrar. ¡Agrega uno nuevo!</p>
  </div>
</template>

<style scoped>
/* Styles remain the same */
.table-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th {
  background-color: #f4f4f4;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
}
</style>