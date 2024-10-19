<template>
  <nav class="menu-container  d-flex flex-column p-3">
    <!-- Logo del menú -->
    <img 
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e10bd70-533a-49a8-bfc4-a363d3d8b50e?placeholderIfAbsent=true&apiKey=729dc09cd15c473da7916659c4854519" 
      alt="Menu logo" 
      class="menu-logo img-fluid mx-auto mb-4" 
    />
    
    <!-- Lista de navegación -->
    <ul class="nav flex-column">
      <li v-for="item in menuItems" :key="item.text" class="nav-item mb-3">
        <a
          :href="item.href"
          class="nav-link d-flex align-items-center p-2 rounded-2"
          :class="{ active: item.isActive }"
          @click="setActiveItem(item)"
        >
          <img :src="item.iconSrc" :alt="item.text" class="menu-icon me-2" />
          <span class="fw-bold">{{ item.text }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface MenuItem {
  href: string;
  iconSrc: string;
  text: string;
  isActive: boolean;
}

export default defineComponent({
  name: 'MenuComponent',
  setup() {
    const menuItems = ref<MenuItem[]>([
      {
        href: '/dashboard',
        iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/244c2ef8403b2f058bbd6eff2428ff5230c54208dacd7f54f15a2267501bf0f2?placeholderIfAbsent=true&apiKey=729dc09cd15c473da7916659c4854519',
        text: 'DashBoard',
        isActive: true,
    
      },
      {
        href: '/lista-productos',
        iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bbd24d71c40c01c1a9229d29d6731c2504eeb997ed996908b0d54380637c985b?placeholderIfAbsent=true&apiKey=729dc09cd15c473da7916659c4854519',
        text: 'Lista Productos',
        isActive: false,
      },
      {
        href: '/lista-registros-sanitarios',
        iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b515d85894191eb4ac2895e8c63ed8183845da7f1d65a05f207b42a3cb231de0?placeholderIfAbsent=true&apiKey=729dc09cd15c473da7916659c4854519',
        text: 'Lista de Registros Sanitarios',
        isActive: false,
      },
    ]);

    const setActiveItem = (clickedItem: MenuItem) => {
      menuItems.value.forEach(item => {
        item.isActive = item === clickedItem;
      });
    };

    return {
      menuItems,
      setActiveItem,
    };
  },
});
</script>

<style scoped>
.menu-container {
  max-width: 222px;
  background-color: #d9e9f8;
  padding: 21px 11px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
}

.menu-logo {
  width: 113px;
  object-fit: contain;
}

.menu-icon {
  width: 20px;
  height: 20px;
}

.nav-link {
  color: #2470dc;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link.active {
  background-color: #a3c6f9;
}

.nav-link:hover {
  background-color: #c4d9f9;
}

.nav-item {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .menu-container {
    position: static;
    width: 100%;
    max-width: none;
  }
}
</style>
