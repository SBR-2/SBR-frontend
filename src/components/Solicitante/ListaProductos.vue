<template>
    <SolicitanteSidebarLayout>
        <template v-slot:contents>
                <div class="user-list-container">
                    <h4 class="titulo d-flex">Listado de Productos</h4>
                    <div style="display: flex; margin-bottom: 25px;">
                        <router-link to="/solicitante/agregar-producto">
                            <button class="btn btn-primary">Agregar Producto</button>
                        </router-link>
                    </div>
                    <!-- Barra de búsqueda -->
                    <input type="text" v-model="searchTerm" placeholder="Buscar" class="search-bar" />
                </div>
                <!-- Manejo de estados de carga y error para productos -->
                <div v-if="loadingProductos">
                    <p>Cargando productos...</p>
                </div>
                <div v-else>
                    <table>
                        <thead>
                            <tr style="color: white">
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Marca</th>
                                <th>Origen</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="filteredProductos.length === 0">
                                <td colspan="6" class="text-center">No hay productos que mostrar</td>
                            </tr>
                            <tr v-else v-for="producto in filteredProductos" :key="producto.productoId">
                                <td>{{ producto.productoId }}</td>
                                <td>{{ producto.nombre }}</td>
                                <td>{{ producto.marca }}</td>
                                <td>{{ producto.origen || 'Desconocido' }}</td>
                                <td>{{ producto.estado }}</td>
                                <td class="acciones-cell">
                                    <button @click="deleteProduct(producto.productoId)" class="btn btn-delete">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </template>
    </SolicitanteSidebarLayout>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_PRODUCTOS } from '../../controllers/graphql/queries/solicitanteQueries';
import { DELETE_PRODUCTO } from '../../controllers/graphql/mutations/solicitante/solicitanteMutations';
import { useToast } from 'vue-toastification';
import SolicitanteSidebarLayout from '../ui/layouts/SolicitanteSidebarLayout.vue';

export default {
    components: {
        SolicitanteSidebarLayout,
    },
    setup() {
        const searchTerm = ref('');
        const toast = useToast();

        // Fetch los productos
        const { result: productosResult, loading: loadingProductos, refetch: refetchProductos } = useQuery(GET_PRODUCTOS, {
            skip: 0,
            take: 50,
            where: {},
            order: []
        });

        const productos = ref([]);

        watch(
            () => productosResult.value,
            (newValue) => {
                if (newValue && newValue.productos && newValue.productos.items) {
                    productos.value = newValue.productos.items;
                }
            },
            { immediate: true }
        );

        const filteredProductos = computed(() => {
            return productos.value.filter((producto) =>
                producto.nombre.toLowerCase().includes(searchTerm.value.toLowerCase())
            );
        });

        // Mutation to delete a product
        const { mutate: deleteProductoMutation } = useMutation(DELETE_PRODUCTO);

        const deleteProduct = async (productoId) => {
            if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                try {
                    const response = await deleteProductoMutation({
                        input: { productoId }
                    });
                    if (response.data.deleteProducto.boolean) {
                        toast.success('Producto eliminado exitosamente');
                        refetchProductos();  // Refetch the products after deletion
                    } else {
                        toast.error('Error al eliminar el producto');
                    }
                } catch (error) {
                    toast.error('Error al eliminar el producto');
                    console.error('Error deleting product:', error);
                }
            }
        };

        return {
            searchTerm,
            productos,
            filteredProductos,
            loadingProductos,
            refetchProductos,
            deleteProduct,
        };
    },
};
</script>

<style scoped>
.container {
    margin-left: 8%;
    margin-top: 10%;
}

.titulo {
    margin-bottom: 20px;
}

.search-bar {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #d9e9f8;
    font-size: 16px;
    color: black;
}

table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
}

thead {
    background-color: #0069d9;
}

th,
td {
    padding: 12px;
    border: 1px solid #ddd;
}

tbody tr:hover {
    background-color: #f1f1f1;
    cursor: pointer; 
}

.acciones-cell {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.btn {
    padding: 6px 12px;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
}

.btn-edit {
    background-color: #007bff;
}

.btn-delete {
    background-color: #dc3545;
}

.page-content {
    margin-top: 5px;
    padding: 1em;
    transition: 0.3s ease;
}

.search-container {
    display: flex;
    justify-content: space-between;
    gap: 25px;
}

.action-list {
    margin-left: 2%;
    margin-right: 2%;
}
</style>
