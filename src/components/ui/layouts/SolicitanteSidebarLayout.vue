<template>
    <div class="page">
        <BaseSideBar :links="sidebarLinks" />
        <div class="page-content">
            <slot name="contents"></slot>
        </div>
        <!-- Main content -->
        <main class="col-auto main-content">
            <!-- Navbar -->
            <nav class="navbar navbar-expand fixed-top custom-navbar">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle d-flex align-items-center" href="#"
                                    id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <img :src="'/profile.svg'" alt="profile Logo"
                                        class="img-fluid me-2 profile-logo" />
                                    <span class="">Solicitante</span>
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <router-link to="/personal">
                                        <li><a class="dropdown-item btn">Personal</a></li>
                                    </router-link>
                                    <span class="logout-icon" @click="showModal = true">
                                        <transition name="fade">
                                            <span class="dropdown-item btn">
                                                Cerrar Sesión
                                            </span>
                                        </transition>
                                    </span>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </main>
        
        <!-- PopUpModal Component -->
        <PopUpModal :show="showModal">
            <template v-slot:header>
                <div style="display: flex; justify-content: space-between; gap: 90%; align-items: flex-start">
                    <h3 style="font-weight: bold; color: #3B5EAB;">¡Alerta!</h3>
                    <span class="scale" @click="showModal = false">
                        <i class="fas fa-times" style="cursor: pointer; color: crimson;"></i>
                    </span>
                </div>
            </template>

            <template v-slot:body>
                <p style="font-size: large; color: black">¿De verdad quieres cerrar la sesión?</p>
            </template>

            <template v-slot:footer>
                <div style="display: flex; justify-content: center; gap: 10px; width: 100%">
                    <button class="btn btn-danger" style="width: 45%" @click="showModal = false">Cancelar</button>
                    <button class="btn btn-primary" style="width: 45%" @click="logout">Cerrar</button>
                </div>
            </template>
        </PopUpModal>
    </div>
</template>



<script>
import BaseSideBar from '../sidebar/BaseSideBar.vue';
import { useSidebarStore } from '@/stores/sidebarStore';
import { computed } from 'vue';
import PopUpModal from '../PopUpModal.vue';
import { useAuthStore } from '../../../stores/authStore';
import { useToast } from 'vue-toastification';
import router from '../../../router/router';

export default {
    name: 'SolicitanteSidebarLayout',
    components: {
        BaseSideBar,
        PopUpModal
    },
    data() {
        return {
            authStore: useAuthStore(),
            toast: useToast(),
            sidebarLinks: [
                { to: '/solicitante/lista-productos', icon: 'fas fa-columns', label: 'Lista de Productos' },
            ],
            showModal: false
        };
    },
    setup() {
        const sidebarStore = useSidebarStore();
        const sidebarWidthPx = computed(() => sidebarStore.sidebarWidthPx);

        return {
            sidebarWidthPx,
        };
    },
    methods: {
        logout() {
            this.authStore.logout();
            this.toast.warning('Has cerrado sesión...');
            router.push('/login');
        }
    }
}
</script>

<style scoped>
.page-content {
    padding: 1em;
    transition: 0.3s ease;
}

.page {
    height: 100%;
    
}
</style>