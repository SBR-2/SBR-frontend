import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';

export const useProductFormStore = defineStore('productForm', () => {
  const currentStep = ref(1);
  const formData = reactive({
    marca: '',
    nombreProducto: '',
    categoria: '',
    subcategoria: '',
    estadoFisico: '',
    unIngrediente: true,
    envasePrimario: '',
    materialEmpaque: '',
    presentacion: '',	
    origen: '',
    representanteLegal: {
        nombre: '',
        direccion: '',
        telefono: '',
        email: '',
        cedula: '',
        rnc : '',
        requeireTitular: true,
    },
    personaContacto: {
        nombre: '',
        telefono: '',
        email: '',
    },
    titular:{
        nombre: '',
        direccion: '',
        telefono: '',
        email: '',
    },
    almacenador: {
        nombre: '',
        direccion: ''
    },
    fabricante: {
      nombre: '',
      direccion: '',
      pais: '',
      esTitular: true,
      esExportador: false,
    },
    acondicionador: {
      nombre: '',
      direccion: '',
      pais: '',
      esFabricante: true
    },
  });

  const riesgo = ref(0);

  const progress = computed(() => {
    return (currentStep.value / 4) * 100;
  });

  const riesgoText = computed(() => {
    switch (riesgo.value) {
      case 0:
        return 'Sin evaluar';
      case 1:
        return 'Bajo';
      case 2:
        return 'Medio';
      case 3:
        return 'Alto';
      default:
        return 'Desconocido';
    }
  });

  const riesgoClass = computed(() => {
    switch (riesgo.value) {
      case 0:
        return 'bg-secondary';
      case 1:
        return 'bg-success';
      case 2:
        return 'bg-warning';
      case 3:
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  });

  function calcularRiesgo() {
    // Aquí puedes implementar la lógica real para calcular el riesgo
    switch (formData.subcategoria) {
      case 'papas':
        riesgo.value = 2;
        break;
      case 'gaseosas':
        riesgo.value = 3;
        break;
      case 'yogurt':
        riesgo.value = 1;
        break;
      default:
        riesgo.value = 0;
    }
  }

  function debug() {
    console.log(formData);
  }

  function goBack() {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  }

  function submitForm() {
    console.log('Formulario enviado:', formData);
    if (currentStep.value < 4) {
      currentStep.value++;
    }
  }

  return {
    currentStep,
    formData,
    riesgo,
    progress,
    riesgoText,
    riesgoClass,
    debug,
    calcularRiesgo,
    goBack,
    submitForm
  };
});