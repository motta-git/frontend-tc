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
  <div class="server-grid" v-if="store.serverCount > 0">
    <ServerItem 
      v-for="server in store.servers" 
      :key="server.id"
      :server="server"
      @edit-server="onEdit"
    />
  </div>
  <div v-else>
    <p>No hay servidores para mostrar. ¡Agrega uno nuevo!</p>
  </div>
</template>

<style scoped>
.server-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>