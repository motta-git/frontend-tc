<script setup>
import { ref, watch, computed } from 'vue';
import { useServerStore } from '@/stores/serverStore';

const props = defineProps({
    // Recibimos un ID para saber si estamos editando
    serverIdToEdit: {
        type: [Number, null],
        default: null
    }
});

const emit = defineEmits(['form-close']);

const store = useServerStore();

// Estado local para los campos del formulario
const host = ref('');
const ip = ref('');
const description = ref('');
const imageFile = ref(null);

// Determinamos si estamos en modo edición
const isEditing = computed(() => props.serverIdToEdit !== null);

// Observamos si cambia el ID para editar. Si es así, cargamos los datos.
watch(() => props.serverIdToEdit, (newId) => {
    if (newId) {
        const server = store.getServerById(newId);
        if (server) {
            host.value = server.host;
            ip.value = server.ip;
            description.value = server.description;
        }
    } else {
        resetForm();
    }
});

function handleFileChange(event) {
    imageFile.value = event.target.files[0];
}

async function handleSubmit() {
    const formData = new FormData();
    formData.append('host', host.value);
    formData.append('ip', ip.value);
    formData.append('description', description.value);
    if (imageFile.value) {
        formData.append('image', imageFile.value);
    }

    if (isEditing.value) {
        await store.updateServer(props.serverIdToEdit, formData);
    } else {
        await store.addServer(formData);
    }

    // Limpiamos y cerramos el formulario
    resetForm();
    emit('form-close');
}

function resetForm() {
    host.value = '';
    ip.value = '';
    description.value = '';
    imageFile.value = null;
    // Reseteamos el input de archivo
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
}

function cancelEdit() {
    resetForm();
    emit('form-close');
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="server-form">
        <h3>{{ isEditing ? 'Editar Servidor' : 'Agregar Nuevo Servidor' }}</h3>
        <div class="form-group">
            <label for="host">Host:</label>
            <input type="text" id="host" v-model="host" required>
        </div>
        <div class="form-group">
            <label for="ip">IP:</label>
            <input type="text" id="ip" v-model="ip" required
                pattern="^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                title="Por favor ingrese una direccion IPv4 valida (e.g., 192.168.1.1)">
        </div>
        <div class="form-group">
            <label for="description">Descripción:</label>
            <textarea id="description" v-model="description" maxlength="200" required></textarea>
        </div>
        <div class="form-group">
            <label for="image">Imagen:</label>
            <input type="file" id="image" @change="handleFileChange" :required="!isEditing">
        </div>
        <div class="form-actions">
            <button type="submit">{{ isEditing ? 'Actualizar' : 'Agregar' }}</button>
            <button type="button" v-if="isEditing" @click="cancelEdit">Cancelar</button>
        </div>
    </form>
</template>

<style scoped>
.server-form {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
textarea,
input[type="file"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.form-actions {
    display: flex;
    gap: 10px;
}
</style>