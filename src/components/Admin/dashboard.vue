<template>
    <div>
        <div class="container mt-1">
    <h5 class="m-5 d-flex dashboard-title">DashBoard</h5>

    <!-- Sección de Usuario y Asignaciones -->
    <div class="row mb-4">
        <!-- Columna izquierda para información de Usuario -->
        <div class="col-md-6 border-end">
            <h6 class="mb-5 d-flex fw-bolder">Usuario</h6>
            <div class="row g-3">
                <!-- Tarjeta Activos -->
                <div class="col-6">
                    <div class="card small-card text-bg-success">
                        <div class="card-body h-100 d-flex align-items-center">
                            <img :src="('/activo.svg')" alt="Activo Logo" class="me-5" style="width: 50px; height: 50px;" />
                            <div>
                                <span class="status-number fs-2 ">12</span>
                                <span class="d-block">Activos</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Tarjeta Pendiente -->
                <div class="col-6">
                    <div class="card small-card text-bg-secondary">
                        <div class="card-body h-100 d-flex align-items-center">
                            <img :src="('/espera.svg')" alt="Espera Logo" class="me-5" style="width: 50px; height: 50px;" />
                            <div>
                                <span class="status-number fs-2">4</span>
                                <span class="d-block">Pendiente</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Tarjeta Rechazada -->
                <div class="col-6">
                    <div class="card small-card text-bg-danger">
                        <div class="card-body h-100 d-flex align-items-center">
                            <img :src="('/rechaza.svg')" alt="Rechaza Logo" class="me-5" style="width: 50px; height: 50px;" />
                            <div>
                                <span class="status-number fs-2">3</span>
                                <span class="d-block">Rechazada</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Tarjeta Inactivo -->
                <div class="col-6">
                    <div class="card small-card text-bg-primary">
                        <div class="card-body h-100 d-flex align-items-center">
                            <img :src="('/inactivo.svg')" alt="Inactivo Logo" class="me-5" style="width: 50px; height: 50px;" />
                            <div>
                                <span class="status-number fs-2">4</span>
                                <span class="d-block">Inactivo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Columna derecha para Asignaciones -->
        <div class="col-md-6">
            <h6 class="mb-3 d-flex fw-bold">Asignaciones</h6>
            <div class="row g-3">
                <!-- Tarjeta Evaluación -->
                <div class="col-6">
                    <div class="mt-2 fs-6 d-flex">Evaluación</div>
                    <div class="card small-card text-bg-secondary">
                        <div class="card-body h-100 d-flex align-items-center">
                            <img :src="('/espera.svg')" alt="Espera Logo" class="me-5" style="width: 50px; height: 50px;" />
                            <div>
                                <span class="status-number fs-2">5</span>
                                <span class="d-block">Pendiente</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Tarjeta Inspección -->
                <div class="col-6">
                    <div class="mt-2 fs-6 d-flex">Inspección</div>
                    <div class="card small-card text-bg-secondary">
                        <div class="card-body h-100 d-flex align-items-center">
                            <img :src="('/espera.svg')" alt="Espera Logo" class="me-5" style="width: 50px; height: 50px;" />
                            <div>
                                <span class="status-number fs-2">3</span>
                                <span class="d-block">Pendiente</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Línea de separación entre Asignaciones y Notificaciones -->
    <hr class="my-5">

    <!-- Sección de Notificaciones -->
    <div class="row">
        <!-- Notificaciones -->
        <div class="col-md-4">
            <div class="card border-0 shadow-sm rounded">
                <div class="card-header  bg-transparent">
                    <h3 class="card-title h6">Notificaciones</h3>
                    <small class="text-muted">5 Solicitudes en Espera</small>
                </div>
                <div class="card-body p-3">
                    <ul class="list-unstyled">
                        <li class="d-flex justify-content-between mb-2">
                            <span>keven jih</span>
                            <small class="text-muted">hace 5 minutos</small>
                        </li>
                        <li class="d-flex justify-content-between mb-2">
                            <span>Erick Luis</span>
                            <small class="text-muted">hace 1 hora</small>
                        </li>
                        <li class="d-flex justify-content-between mb-2">
                            <span>Daniel Brito</span>
                            <small class="text-muted">hace 3 horas</small>
                        </li>
                        <li class="d-flex justify-content-between">
                            <span>Luis Cruz</span>
                            <small class="text-muted">hace 1 día</small>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Asignaciones por Evaluar -->
        <div class="col-md-4">
            <div class="card border-0 shadow-sm rounded">
                <div class="card-header bg-transparent">
                    <h3 class="card-title h6">Asignaciones por Evaluar</h3>
                    <small class="text-muted">5 Solicitudes</small>
                </div>
                <div class="card-body p-3">
                    <ul class="list-unstyled">
                        <li class="d-flex justify-content-between mb-2">
                            <span>keven jih</span>
                            <small class="text-muted">hace 5 minutos</small>
                        </li>
                        <li class="d-flex justify-content-between mb-2">
                            <span>Erick Luis</span>
                            <small class="text-muted">hace 1 hora</small>
                        </li>
                        <li class="d-flex justify-content-between mb-2">
                            <span>Daniel Brito</span>
                            <small class="text-muted">hace 3 horas</small>
                        </li>
                        <li class="d-flex justify-content-between">
                            <span>Luis Cruz</span>
                            <small class="text-muted">hace 1 día</small>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Asignaciones por Inspeccionar -->
        <div class="col-md-4">
            <div class="card border-0 shadow-sm rounded">
                <div class="card-header  bg-transparent">
                    <h3 class="card-title h6">Asignaciones por Inspeccionar</h3>
                    <small class="text-muted">3 Solicitudes</small>
                </div>
                <div class="card-body p-3">
                    <ul class="list-unstyled">
                        <li class="d-flex justify-content-between mb-2">
                            <span>keven jih</span>
                            <small class="text-muted">hace 5 minutos</small>
                        </li>
                        <li class="d-flex justify-content-between mb-2">
                            <span>Erick Luis</span>
                            <small class="text-muted">hace 1 hora</small>
                        </li>
                        <li class="d-flex justify-content-between">
                            <span>Daniel Brito</span>
                            <small class="text-muted">hace 3 horas</small>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>

    <PanelPrincipal />
</template>

<script>
import PanelPrincipal from './panel-principal.vue';

export default {
    components: {
        PanelPrincipal
    }
}
</script>

<style scoped>
.container-fluid {
    padding-left: 1px;
}


.dashboard-title {
    font-size: 1.75rem;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.status-number {
    font-size: 2rem; /* Reducido el tamaño del número */
    font-weight: bold;
}

.card-body {
    padding: 10px; /* Reducido el padding para que las tarjetas sean más compactas */
}

.small-card {
    height: 120px; /* Ajusta el alto de las tarjetas */
    width: 100%; /* Se ajusta automáticamente con el contenedor */
}

.list-unstyled li {
    padding-bottom: 8px;
    border-bottom: 1px solid #eaeaea;
}

.card-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
}




</style>
