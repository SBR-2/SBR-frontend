import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import apolloClient from "../../src/apolloClient"; // Asegúrate de ajustar la ruta
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      loginResponse {
        token
      }
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation producto($input: AddProductoInput!) {
    addProducto(input: $input) {
      producto {
        usuarioId
      }
    }
  }
`;

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
    origen: "nacional",
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

  const factores = reactive({
    haccp: "",
    poblacion: "",
    produccion: "",
    rechazos: "",
    muestras: "",
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

  const factoresHACCP = ref([]); // Lista para almacenar los factores HAACP
  const factoresPoblacion = ref([]); // Lista para almacenar los factores de población
  const factoresProduccion = ref([]); // Lista para almacenar los factores de producción
  const factoresRechazos = ref([]); // Lista para almacenar los factores de rechazos
  const factoresMuestras = ref([]); // Lista para almacenar los factores de muestras

  async function initFactores() {
    factoresHACCP.value = await fetchFactores(1);
    factoresPoblacion.value = await fetchFactores(3);
    factoresProduccion.value = await fetchFactores(4);
    factoresRechazos.value = await fetchFactores(5);
    factoresMuestras.value = await fetchFactores(6);
  }

  createProduct();

  async function createProduct() {
    const productInputForm = {
      envasePrimario: formData.envasePrimario,
      estado: "Activo",
      estadoFisicoId: formData.estadoFisico,
      marca: formData.marca,
      materialEmpaque: formData.materialEmpaque,
      nacional: formData.origen,
      presentacion: formData.presentacion,
      nombre: formData.nombreProducto,
      presentaciones: formData.presentacion,
      subcategoriaId: formData.subcategoria,
      unIngrediente: formData.unIngrediente,
      productoEntidades: [
        {
          cedula: formData.representanteLegal.cedula,
          direccion: formData.representanteLegal.direccion,
          nombre: formData.representanteLegal.nombre,
          rnc: formData.representanteLegal.rnc,
          telefono: formData.representanteLegal.telefono,
          email: formData.representanteLegal.email,
          relacion: {
            relacionId: 2,
          },
        },
        {
          nombre: formData.personaContacto.nombre,
          telefono: formData.personaContacto.telefono,
          email: formData.personaContacto.email,
          relacion: {
            relacionId: 4,
          },
        },
        {
          nombre: formData.titular.nombre,
          telefono: formData.titular.telefono,
          email: formData.titular.email,
          direccion: formData.titular.direccion,
          relacion: {
            relacionId: 3,
          },
        },
        {
          nombre: formData.almacenador.nombre,
          direccion: formData.almacenador.direccion,
        },
        {
          nombre: formData.fabricante.nombre,
          direccion: formData.fabricante.direccion,
          relacion: {
            relacionId: 6,
          },
        },
        {
          nombre: formData.acondicionador.nombre,
          direccion: formData.acondicionador.direccion,
          relacion: {
            relacionId: 5,
          },
        },
      ],
    };

    const productInput = {
      usuarioId: 35, // ID de usuario
      envasePrimario: "Botella de plástico",
      estado: "Activo",
      estadoFisicoId: 1, // Por ejemplo, 1 para sólido
      marca: "MarcaPrueba",
      materialEmpaque: "Plástico",
      nacional: "true", // true para nacional, false para importado
      presentacion: "500 ml",
      nombre: "Producto de Prueba",
      presentaciones: "500 ml",
      subcategoriaId: 10, // Un valor de ejemplo para subcategoría
      unIngrediente: "false", // false si tiene más de un ingrediente
      productoEntidades: [
        {
          cedula: "12345678901",
          direccion: "Calle Falsa 123, Ciudad de Prueba",
          nombre: "Representante Legal Prueba",
          rnc: "123456789",
          telefono: "8091234567",
          email: "representante@prueba.com",
          relacion: {
            relacionId: 2,
          },
        },
        {
          nombre: "Contacto Prueba",
          telefono: "8099876543",
          email: "contacto@prueba.com",
          relacion: {
            relacionId: 4,
          },
        },
        {
          nombre: "Titular Prueba",
          telefono: "8091112233",
          email: "titular@prueba.com",
          direccion: "Avenida Prueba 45, Ciudad Ejemplo",
          relacion: {
            relacionId: 3,
          },
        },
        {
          nombre: "Almacenador Prueba",
          direccion: "Parque Industrial 123, Ciudad de Prueba",
        },
        {
          nombre: "Fabricante Prueba",
          direccion: "Calle Industria 987, Ciudad de Prueba",
          relacion: {
            relacionId: 6,
          },
        },
        {
          nombre: "Acondicionador Prueba",
          direccion: "Zona Industrial 456, Ciudad de Prueba",
          relacion: {
            relacionId: 5,
          },
        },
      ],
    };

    const {mutate: addProduct, error} = useMutation(CREATE_PRODUCT, {
      variables: {
        input: productInputForm,
      },
    });

    try {
      const response = await addProduct();
      console.log("Producto creado:", response);
    } catch (error) {
      console.error("Producto a crear:", error);
    }
    console.log("Producto:", error);
  }

  async function fetchFactores(factorId: number) {
    try {
      const { data } = await apolloClient.query({
        query: gql`
          query getFactores($factorId: Int!) {
            opcions(where: { factorId: { eq: $factorId } }) {
              items {
                detalle
                estado
                factorId
                opcionId
                valor
              }
            }
          }
        `,
        variables: {
          factorId,
        },
      });
      if (data.opcions.items) {
        return data.opcions.items;
      }
      console.log("Factores obtenidos:", data.opcions.items);
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
    } else if (currentStep.value === 1) {
      router.push("/user/dashboard");
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
      currentForm.value.classList.add("was-validated");
      console.error("Formulario inválido.");
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return {
    factoresHACCP,
    factoresPoblacion,
    factoresProduccion,
    factoresRechazos,
    factoresMuestras,
    factores,
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
    initFactores,
    fetchCategorias,
    debug,
    calcularRiesgo,
    goBack,
    submitForm,
  };
});
