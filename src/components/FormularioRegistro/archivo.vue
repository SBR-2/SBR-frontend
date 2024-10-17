<template>
    <h5 class="mt-2">Información General</h5>
    <!-- Input de Archivo -->
    <div class="mb-3">
        <label for="file" class="form-label">Archivo</label>
        <input
            type="file"
            id="file"
            @change="handleFileChange"
            class="form-control"
            accept="application/pdf"
            required
        />
    </div>

    <!-- Boton -->
    <button class="btn btn-primary mb-4" @click="form.uploadFile" type="submit" >Enviar</button>


</template>

<script>
import { useProductFormStore } from '../../stores/productFormLogic';

export default {
    setup() {
        const form = useProductFormStore();

        const handleFileChange = (event) => {
            form.archivos.certificado = event.target.files[0];

        };

        return {
            form,
            handleFileChange,
        };
    },
};


</script>