import { defineStore } from 'pinia';
import axios from 'axios';
import { useToast } from 'vue-toastification'; // 1. Import useToast
const toast = useToast(); // 2. Initialize toast
// Creamos una instancia de Axios para no repetir la URL base
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const useServerStore = defineStore('servers', {
  state: () => ({
    servers: [],
  }),
  getters: {
    serverCount: (state) => state.servers.length,
    // Un getter para obtener un servidor por ID, útil para el formulario de edición
    getServerById: (state) => (id) => {
      return state.servers.find(server => server.id === id);
    }
  },
  actions: {
    async fetchServers() {
      try {
        const response = await apiClient.get('/servers');
        this.servers = response.data;
      } catch (error) {
        console.error('Error fetching servers:', error);
      }
    },

    async addServer(formData) {
      try {
        const response = await apiClient.post('/servers', formData);
        this.servers.push(response.data);
        toast.success('¡Servidor agregado exitosamente!'); // SUCCESS notification
      } catch (error) {
        if (error.response && error.response.data.message) {
            // This will show specific validation errors from Laravel
            toast.error(error.response.data.message);
        } else {
            toast.error('Ocurrió un error al agregar el servidor.'); // Generic ERROR notification
        }
      }
    },
    
    async updateServer(serverId, formData) {
      try {
        // Para actualizar, usamos POST y agregamos _method: 'PUT'
        formData.append('_method', 'PUT');
        const response = await apiClient.post(`/servers/${serverId}`, formData);
        
        // Buscamos el índice del servidor actualizado y lo reemplazamos
        const index = this.servers.findIndex(s => s.id === serverId);
        if (index !== -1) {
          this.servers[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating server:', error);
      }
    },

    async deleteServer(serverId) {
      if (!confirm('¿Estás seguro de que quieres eliminar este servidor?')) return;
      
      try {
        await apiClient.delete(`/servers/${serverId}`);
        this.servers = this.servers.filter(s => s.id !== serverId);
        toast.success('Servidor eliminado.'); // SUCCESS notification
      } catch (error) {
        toast.error('Ocurrió un error al eliminar el servidor.'); // ERROR notification
      }
    },
  },
});