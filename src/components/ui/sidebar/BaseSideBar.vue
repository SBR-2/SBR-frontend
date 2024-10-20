<template>
    <div class="sidebar" :style="{ width: sidebarWidthPx }"
        style="box-shadow: rgb(0 0 0 / 9%) 0px 19px 38px, rgb(0 0 0 / 17%) 0px 15px 12px">
        <div class="logo-container">
            <div class="logo">
                <img :src="'/logodegb.png'" alt="DigeMaps Logo" class="img-fluid" />
                <h1 class="fs-5">
                    <span class="dige" style="color: #003875">Dige</span><span class="maps">Maps</span>
                </h1>
            </div>
        </div>

        <SideBarLink v-for="link in links" :key="link.to" :to="link.to" :icon="link.icon">
            {{ link.label }}
        </SideBarLink>

        <!-- Collapse icon -->
        <span class="collapse-icon" @click="toggleSidebar" :class="{ 'rotate-180': collapsed }" style="color: white">
            <i class="fas fa-angle-double-left" />
        </span>
    </div>
</template>

<script>
import { useSidebarStore } from '@/stores/sidebarStore';
import { computed } from 'vue';
import SideBarLink from './SideBarLink.vue';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from "vue-toastification";

export default {
    name: 'SideBar',
    components: {
        SideBarLink,
    },
    props: {
        links: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            toast: useToast(),
        };
    },
    setup() {
        const sidebarStore = useSidebarStore();
        const sidebarWidthPx = computed(() => sidebarStore.sidebarWidthPx);
        const collapsed = computed(() => sidebarStore.collapsed);

        return {
            toggleSidebar: sidebarStore.toggleSidebar,
            sidebarWidthPx,
            collapsed,
        };
    },
    methods: {
        logout() {
            const authStore = useAuthStore();
            authStore.logout();


            this.toast.warning('You have been logged out.', {
                timeout: 2500
            });
            this.$router.push('/login');
        }
    }
};
</script>

<style>
:root {
    --sidebar-bg-color: #D9E9F8;
    --sidebar-item-hover: #C4D9F9;
    --sidebar-item-active: #b5ccff;
}
</style>

<style scoped>
.sidebar {
    color: #2470DC !important;
    background-color: var(--sidebar-bg-color);

    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;
    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
}

.sidebar h1 {
    height: 2.5em;
}

.collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.75em;
    color: #2470DC !important;;
    transition: 0.2s ease;
}

.collapse-icon:hover {
    transform: scale(1.65);
}

.rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
}

.logout-icon {
    padding: 0.75em;
    color: #2470DC;
    transition: 0.2s ease;
    text-align-last: left;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    font-weight: 400;
    font-size: 15px;
    user-select: none;
    gap: 25px;
    margin: 0.1em 0;
    padding: 0.4em;
    border-radius: 0.25em;
    color: #2470DC !important;;
    height: 50px;
    text-decoration: none;
    transition: 0.3s ease;
}

.scale {
    transition: 0.3s ease;
}

.scale:hover {
    transform: scale(1.8);
}

.logout-icon:hover {
    background-color: var(--sidebar-item-hover);
    color: crimson;
    transform: scale(1.05);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
}

.logo {
    text-align: center;
    width: 100px;
    height: 100px;
}

.logo img {
    max-width: 100%;
    height: auto;
    margin-bottom: 0.5rem;
}

.logo h1 {
    font-size: 1.25rem;
    margin: 0;
}

.icon {
    width: 20px;
    height: 20px;
}

.logo h1 span:last-child {
    color: #81aa5d;
}
</style>