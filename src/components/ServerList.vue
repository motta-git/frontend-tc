<script setup>
import { useServerStore } from '@/stores/serverStore';
import ServerItem from './ServerItem.vue';

const store = useServerStore();
const emit = defineEmits(['edit-server']);

function onEdit(serverId) {
  emit('edit-server', serverId);
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
      <tbody>
        <ServerItem v-for="server in store.servers" :key="server.id" :server="server" @edit-server="onEdit" />
      </tbody>
    </table>
  </div>
  <div v-else>
    <p>No hay servidores para mostrar. ¡Agrega uno nuevo!</p>
  </div>
</template>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
  /* Para responsividad en pantallas pequeñas */
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