<template>
    <SolicitanteSidebarLayout>
        <template v-slot:contents>
            <!-- Back button -->
            <div class="container" style="display: flex; justify-content: lef;">
                <router-link to="/solicitante/lista-productos" class="btn btn-secondary">Volver</router-link>
            </div>
            <div class="row justify-content-center mt-5">
                <div class="col-md-6">
                    <h2 class="text-center">Agregar Producto</h2>
    
                    <!-- Form to add the product -->
                    <form @submit.prevent="submitForm">
                        <!-- Nombre Input -->
                        <div class="mb-3">
                            <label for="nombre" class="form-label d-flex">Nombre</label>
                            <input type="text" class="form-control" id="nombre" v-model="formData.nombre" required />
                        </div>
    
                        <!-- Marca Input -->
                        <div class="mb-3">
                            <label for="marca" class="form-label d-flex">Marca</label>
                            <input type="text" class="form-control" id="marca" v-model="formData.marca" required />
                        </div>
    
                        <!-- Origen Input -->
                        <div class="mb-3">
                            <label for="origen" class="form-label d-flex">Origen</label>
                            <input type="text" class="form-control" id="origen" v-model="formData.origen" required />
                        </div>
    
                        <!-- Envase Primario Input -->
                        <div class="mb-3">
                            <label for="envasePrimario" class="form-label d-flex">Envase Primario</label>
                            <input type="text" class="form-control" id="envasePrimario" v-model="formData.envasePrimario" required />
                        </div>
    
                        <!-- Material Envase Input -->
                        <div class="mb-3">
                            <label for="materialEmpaque" class="form-label d-flex">Material de Empaque</label>
                            <input type="text" class="form-control" id="materialEmpaque" v-model="formData.materialEmpaque" required />
                        </div>
    
                        <!-- Estado Selection -->
                        <div class="mb-3">
                            <label for="estado" class="form-label d-flex">Estado</label>
                            <v-select
                                :options="estadoOptions"
                                v-model="formData.estado"
                                label="label"
                                :reduce="estado => estado.value"
                                placeholder="Seleccione un estado"
                            ></v-select>
                        </div>

                        <!-- Riesgo Subcategoria Selection -->
                        <div class="mb-3">
                            <label for="riesgoSubCategoriaId" class="form-label d-flex">Riesgo Subcategoría</label>
                            <v-select
                                :options="subcategorias"
                                v-model="formData.riesgoSubCategoriaId"
                                label="nombre"
                                :reduce="subcategoria => subcategoria.bpmSubcategoriaId"
                                placeholder="Seleccione una subcategoría"
                            ></v-select>
                        </div>

                        <!-- Estado Físico Selection -->
                        <div class="mb-3">
                            <label for="estadoFisicoId" class="form-label d-flex">Estado Físico</label>
                            <v-select
                                :options="estadosFisicos"
                                v-model="formData.estadoFisicoId"
                                label="estadoFisico1"
                                :reduce="estadoFisico => estadoFisico.estadoFisicoId"
                                placeholder="Seleccione un estado físico"
                            ></v-select>
                        </div>
    
                        <!-- Nacional checkbox -->
                        <div class="mb-3 form-check" style="display: flex; justify-content: left; gap: 10px">
                            <input type="checkbox" class="form-check-input" id="nacional" v-model="formData.nacional" />
                            <label class="form-check-label" for="nacional">Nacional</label>
                        </div>
    
                        <!-- Un ingrediente checkbox -->
                        <div class="mb-3 form-check" style="display: flex; justify-content: left; gap: 10px">
                            <input type="checkbox" class="form-check-input" id="unIngrediente" v-model="formData.unIngrediente" />
                            <label class="form-check-label" for="unIngrediente">Un Ingrediente</label>
                        </div>
    
                        <!-- Submit Button -->
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary w-50">Agregar Producto</button>
                        </div>
                    </form>
                </div>
            </div>
        </template>
    </SolicitanteSidebarLayout>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_SUBCATEGORIAS } from '../../controllers/graphql/queries/solicitanteQueries';
import { GET_ESTADOS_FISICOS } from '../../controllers/graphql/queries/userQueries';
import { ADD_PRODUCTO } from '../../controllers/graphql/mutations/solicitante/solicitanteMutations';
import { useToast } from 'vue-toastification';
import SolicitanteSidebarLayout from '../ui/layouts/SolicitanteSidebarLayout.vue';
import router from '../../router/router';
import { useAuthStore } from '../../stores/authStore';

export default {
    components: {
        SolicitanteSidebarLayout,
    },
    setup() {
        const authStore = useAuthStore();
        const formData = ref({
            nombre: '',
            marca: '',
            origen: '',
            estado: 'Activo',
            envasePrimario: '',
            materialEmpaque: '',
            riesgoSubCategoriaId: null,
            nacional: false,
            usuarioId: null,
            estadoFisicoId: null,
            presentaciones: "",
            unIngrediente: false,
            productoEntidades: [],
        });

        const estadoOptions = [
            { label: 'Activo', value: 'Activo' },
            { label: 'Inactivo', value: 'Inactivo' }
        ];

        onMounted(() => {
            formData.value.usuarioId = authStore.userId;
        });

        const toast = useToast();
        const subcategorias = ref([]);
        const categorias = ref([]);
        const estadosFisicos = ref([]);

        // Fetch risk subcategories
        const { result: subcategoriasResult, loading: loadingSubcategorias } = useQuery(GET_SUBCATEGORIAS, {
            skip: 0,
            take: 50,
        });
        watch(
            () => subcategoriasResult.value,
            (newValue) => {
                if (newValue && newValue.bpmSubcategoria && newValue.bpmSubcategoria.items) {
                    subcategorias.value = newValue.bpmSubcategoria.items;
                }
            },
            { immediate: true }
        );

        // TODO: Query estados fisicos
        const { result: estadosFisicosResult, loading: loadingEstadosFisicos } = useQuery(GET_ESTADOS_FISICOS, {
            skip: 0,
            take: 50,
        });
        watch(
            () => estadosFisicosResult.value,
            (newValue) => {
                if (newValue && newValue.estadoFisicos && newValue.estadoFisicos.items) {
                    estadosFisicos.value = newValue.estadoFisicos.items;
                }
            },
            { immediate: true }
        );

        // Mutation to add a product
        const { mutate: addProductoMutation, client } = useMutation(ADD_PRODUCTO);
        const submitForm = async () => {
        try {
            console.log('formData.value:', formData.value);
            const response = await addProductoMutation({
            input: { ...formData.value },
            });
            if (response.data.addProducto.producto) {
                toast.success('Producto agregado exitosamente');
                router.push('/solicitante/lista-productos');
            } else {
                toast.error('Error al agregar el producto');
            }
        } catch (error) {
            toast.error('Error al agregar el producto');
            console.error('Error adding product:', error);
        }
        };


        return {
            formData,
            submitForm,
            subcategorias,
            estadosFisicos,
            loadingSubcategorias,
            estadoOptions,
        };
    },
};
</script>

<style scoped>
.container {
    margin-top: 50px;
}

h2 {
    margin-bottom: 20px;
}

.form-label {
    font-weight: bold;
}

.text-center {
    margin-top: 20px;
}

.btn {
    padding: 10px 20px;
    font-size: 16px;
}
</style>
