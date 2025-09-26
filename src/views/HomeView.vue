<script setup>
import { onMounted, ref } from 'vue';
import { useServerStore } from '@/stores/serverStore';
import ServerList from '@/components/ServerList.vue';
import ServerForm from '@/components/ServerForm.vue';

const serverStore = useServerStore();
const serverIdToEdit = ref(null);

// Cuando el componente se monte en la página, busca los servidores en la API
onMounted(() => {
  serverStore.fetchServers();
});

function handleEdit(serverId) {
  serverIdToEdit.value = serverId;
  // Hacemos scroll hasta el formulario
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function onFormClose() {
  serverIdToEdit.value = null;
}
</script>

<template>
  <main>
    <h1>Administrador de Servidores</h1>
    
    <ServerForm :server-id-to-edit="serverIdToEdit" @form-close="onFormClose" />

    <hr />
    
    <h2>Total de Servidores: {{ serverStore.serverCount }}</h2>
    
    <ServerList @edit-server="handleEdit" />
  </main>
</template>

<style>
main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
hr {
  margin: 40px 0;
}
</style>