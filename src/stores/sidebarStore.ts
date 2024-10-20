import { defineStore } from 'pinia'

interface SidebarState {
    collapsed: boolean;
    SIDEBAR_WIDTH: number;
    SIDEBAR_WIDTH_COLLAPSED: number;
}

export const useSidebarStore = defineStore('sidebar', {
    state: (): SidebarState => ({
        collapsed: JSON.parse(localStorage.getItem('sidebarCollapsed') || 'false'),
        SIDEBAR_WIDTH: 220,
        SIDEBAR_WIDTH_COLLAPSED: 100,
    }),
    actions: {
        toggleSidebar() {
            localStorage.setItem('sidebarCollapsed', JSON.stringify(!this.collapsed));
            this.collapsed = !this.collapsed;
        }
    },
    getters: {
        sidebarWidthPx(): string {
            return `${this.collapsed ? this.SIDEBAR_WIDTH_COLLAPSED : this.SIDEBAR_WIDTH}px`;
        }
    }
});
