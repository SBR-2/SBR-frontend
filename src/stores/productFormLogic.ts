import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import apolloClient from "../apolloClient"; // Asegúrate de ajustar la ruta
import gql from "graphql-tag";

export const useProductFormStore = defineStore("productForm", () => {
  const toast = useToast();
  const router = useRouter();
  const currentStep = ref(1);
  const formData = reactive({
    marca: "",
    nombreProducto: "",
    categoria: "",
    subcategoria: "",
    estadoFisico: "",
    unIngrediente: true,
    envasePrimario: "",
    materialEmpaque: "",
    presentacion: "",
    origen: "",
    representanteLegal: {
      nombre: "",
      direccion: "",
      telefono: "",
      email: "",
      cedula: "",
      rnc: "",
      requeireTitular: true,
    },
    personaContacto: {
      nombre: "",
      telefono: "",
      email: "",
    },
    titular: {
      nombre: "",
      direccion: "",
      telefono: "",
      email: "",
    },
    almacenador: {
      nombre: "",
      direccion: "",
    },
    fabricante: {
      nombre: "",
      direccion: "",
      pais: "",
      esTitular: true,
      esExportador: false,
    },
    acondicionador: {
      nombre: "",
      direccion: "",
      pais: "",
      esFabricante: true,
    },
  });

  const estadoFisicos = ref([]); // Lista para almacenar los valores de estado físico

  // Función para obtener los estados físicos
  async function fetchEstadoFisicos() {
    try {
      const { data } = await apolloClient.query({
        query: gql`
          query categorias {
            estadoFisicos {
              items {
                estadoFisico1
                estadoFisicoId
              }
            }
          }
        `,
      });
      estadoFisicos.value = data.estadoFisicos.items;
    } catch (err) {
      console.error("GraphQL Error:", err);
    }
  }
  
  const categorias = ref([]); // Lista para almacenar las categorías
  const subcategorias = ref([]); // Lista para almacenar las subcategorías

  async function fetchCategorias() {
    try {
      const { data } = await apolloClient.query({
        query: gql`
          query categorias {
            riesgoCategoria {
              items {
                estado
                riesgoCategoria
                riesgoCategoriaId
              }
            }
          }
        `,
      });
      categorias.value = data.riesgoCategoria.items;
    } catch (err) {
      console.error("GraphQL Error:", err);
    }
  }

  async function fetchSubcategorias() {
    try {
      const { data } = await apolloClient.query({
        query: gql`
          query getRiesgoCategoria($categoriaId: Int!) {
            riesgoCategoria(
              where: { riesgoCategoriaId: { eq: $categoriaId } }
            ) {
              items {
                riesgoSubcategoria {
                  estado
                  riesgoSubcategoria
                  riesgoSubcategoriaId
                  riesgo {
                    estado
                    riesgo1
                    riesgoId
                  }
                }
              }
            }
          }
        `,
        variables: {
          categoriaId: formData.categoria,
        },
      });
      const subcat = data.riesgoCategoria.items[0].riesgoSubcategoria;
      console.log("Subcategorías obtenidas:", subcat);

      if (subcategorias) {
        subcategorias.value = subcat.map((item: any) => ({
          subcategoria: item.riesgoSubcategoria,
          subcategoriaId: item.riesgoSubcategoriaId,
          estado: item.estado,
          riesgo: item.riesgo,
        }));
      }
    } catch (err) {
      console.error("GraphQL Error:", err);
    }
  }

  interface Riesgo {
    estado: string;
    riesgo1: string;
    riesgoId: number;
  }

  const riesgoData = ref<Riesgo | null>(null);

  async function fetchRiesgo(subcategoriaId: number) {
    try {
      const { data } = await apolloClient.query({
        query: gql`
          query riesgos($subcategoriaId: Int!) {
            riesgoSubcategoria(
              where: { riesgoSubcategoriaId: { eq: $subcategoriaId } }
            ) {
              items {
                riesgo {
                  estado
                  riesgo1
                  riesgoId
                }
              }
            }
          }
        `,
        variables: {
          subcategoriaId,
        },
      });

      // Verificar si se obtuvo un riesgo válido
      if (
        data &&
        data.riesgoSubcategoria &&
        data.riesgoSubcategoria.items.length > 0
      ) {
        // Extraer el riesgo del primer elemento
        riesgoData.value = data.riesgoSubcategoria.items[0].riesgo;
        console.log("Riesgo obtenido:", riesgoData.value);

        if (!riesgoData.value) {
          console.error("No se encontró riesgo para esta subcategoría.");
          return;
        }
        switch (riesgoData.value.riesgo1) {
          case "MEDIO":
            riesgo.value = 2;
            break;
          case "ALTO":
            riesgo.value = 3;
            break;
          case "BAJO":
            riesgo.value = 1;
            break;
          default:
            riesgo.value = 0;
        }
      } else {
        console.error("No se encontró riesgo para esta subcategoría.");
        riesgoData.value = null; // Limpiar el valor si no hay riesgo
      }
    } catch (err) {
      console.error("GraphQL Error:", err);
    }
  }

  const changeSubcategoria = computed(() => {
    if (formData.categoria) {
      fetchSubcategorias();
    }
  });

  const riesgo = ref(0);

  const progress = computed(() => {
    return (currentStep.value / 4) * 100;
  });

  const riesgoText = computed(() => {
    switch (riesgo.value) {
      case 0:
        return "Sin evaluar";
      case 1:
        return "Bajo";
      case 2:
        return "Medio";
      case 3:
        return "Alto";
      default:
        return "Desconocido";
    }
  });

  const riesgoClass = computed(() => {
    switch (riesgo.value) {
      case 1:
        return "bg-success";
      case 2:
        return "bg-warning";
      case 3:
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  });

  function calcularRiesgo() {
    fetchRiesgo(parseInt(formData.subcategoria));
  }

  function debug() {
    console.log(formData);
  }

  function goBack() {
    if (currentStep.value > 1) {
      currentStep.value--;
    }else if (currentStep.value === 1) {
      router.push('/user/dashboard');
    }
  }

  const currentForm = ref<any>(null);

  function submitForm() {
    console.log("Formulario enviado:", currentForm.value.checkValidity());


    if (currentForm.value.checkValidity()) {
      if (currentStep.value < 4) {
        currentStep.value++;
      }
      // Enviar formulario
    } else {
      toast.error("Por favor, completa los campos requeridos.");
      currentForm.value.classList.add('was-validated');
      console.error("Formulario inválido.");
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return {
    currentStep,
    formData,
    riesgo,
    progress,
    riesgoText,
    riesgoClass,
    estadoFisicos,
    categorias,
    subcategorias,
    currentForm,
    fetchEstadoFisicos,
    changeSubcategoria,
    fetchCategorias,
    debug,
    calcularRiesgo,
    goBack,
    submitForm,
  };
});
