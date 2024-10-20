<template>
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
    rel="stylesheet"
  />
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <nav class="col-auto sidebar">
        <div class="sidebar-sticky">
          <div class="logo-container">
            <div class="logo">
              <img
                :src="'/logodegb.png'"
                alt="DigeMaps Logo"
                class="img-fluid"
              />
              <h1 class="fs-5">
                <span class="dige">Dige</span><span class="maps">Maps</span>
              </h1>
            </div>
          </div>
          <p class="menu-label fs-7">Menu</p>
          <ul class="nav flex-column">
            <li class="nav-item nav-link">
              <router-link to="/dashboard">
                <img
                  :src="'/dashboard.svg'"
                  alt="dashboard Logo"
                  class="img-fluid icon"
                />
                <i button type="button" class="fas fa"></i> Dashboard
              </router-link>
            </li>
            <li class="nav-item nav-link">
              <router-link :to="{ name: 'listaUsuarios' }">
                <img
                  :src="'/lista.svg'"
                  alt="list Logo"
                  class="img-fluid icon"
                />
                <i button type="button" class="fas fa"></i> Lista usuarios
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'evaluacion' }">
                <img
                  :src="'/cotejo.svg'"
                  alt="cotejo Logo"
                  class="img-fluid icon"
                />
                <i button type="button" class="fas fa"></i> Asignación
                Evaluación
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'inspeccion' }">
                <img
                  :src="'/lupa.svg'"
                  alt="lupa Logo"
                  class="img-fluid icon"
                />
                <i button type="button" class="fas fa"></i> Asignación
                Inspección
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Main content -->
      <main class="col-auto main-content">
        <!-- Navbar -->
        <nav class="navbar navbar-expand fixed-top custom-navbar">
          <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      :src="'/profile.svg'"
                      alt="profile Logo"
                      class="img-fluid me-2 profile-logo"
                    />
                    <span class="">Administrador</span>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <router-link to="/personal">
                      <li><a class="dropdown-item btn">Personal</a></li>
                    </router-link>
                    <router-link to="/login"><li><a class="dropdown-item" href="#">Cerrar sesión</a>
                    </li></router-link>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </main>
    </div>
  </div>
</template>

<script>
import router from "../../router/router";
</script>

<style scoped>
.fs-7 {
  font-size: 14px;
}

.sidebar {
  min-height: 100vh; /* Ajuste para que no llegue hasta la parte inferior si no es necesario */
  background-color: #d9e9f8;
  position: fixed;
  left: 0;
  top: 0;
  width: 200px; /* Ajuste del ancho del sidebar */
}

.logo h1 span:last-child {
  color: #81aa5d;
}

.nav-link:hover {
  background-color: #c4d9f9;
}

.main-content {
  margin-left: 200px; /* Ajuste del margen izquierdo para alinear con el sidebar */
  flex: 1;
}

.menu-label {
  color: #2470dc;
  text-align: left;
}

.nav-item {
  font-size: 0.75rem;
  padding: 0.0625rem;
  text-align: left;
  margin-bottom: 0.9375rem;
}

/* Navbar styling */
.custom-navbar {
  background-color: white;
  position: fixed;
  top: 0;
  left: 200px; /* Alineación del navbar con el sidebar */
  padding: 0.0625rem; /* Usar unidades relativas */
  border-bottom: 1px solid #ddd;
  width: calc(100% - 200px);
}

.navbar-nav {
  padding-right: 0.9375rem; /* Usar unidades relativas */ /* Añade un poco de padding a la derecha para el contenido del navbar */
  margin-top: 1px; /* Usar unidades relativas */
}

@media (max-width: 768px) {
  .custom-navbar {
    left: 0;
    width: 100%; /* En pantallas pequeñas, ocupa todo el ancho */
  }
}

.content {
  margin-top: 6.25rem; /* Usar unidades relativas */
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

.profile-container {
  align-items: center;
}
</style>
