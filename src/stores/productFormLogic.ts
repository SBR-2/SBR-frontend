import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import apolloClient from "../../src/apolloClient"; // Asegúrate de ajustar la ruta
import gql from "graphql-tag";

const CREATE_PRODUCT = gql`
  mutation producto($input: AddProductoInput!) {
    addProducto(input: $input) {
      producto {
        usuarioId
      }
    }
  }
`;

const CREATE_PRODUCT_ENTIDAD = gql`
  mutation productoEntidad($input: AddEntidadInput!) {
    addEntidad(input: $input) {
      entidad {
        entidadId
      }
    }
  }
`;

const GET_USER = gql`
mutation tokenMutation($input: String!) {
  userIdByToken(input: { token: $input }) {
    getUserIdResponse {
      userId
    }
  }
}
`;

const UPLOAD_FILE = gql`
mutation upload($archivo: AddDocumentoInput!) {
  addDocumento(documentoInput: $archivo) {
    documento {
      documentoId
      estado
      ruta
      solicitudId
      tipoDocumentoId
    }
  }
}`;

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
      direccion: "",
      telefono: "",
      email: "",
      cedula: "",
      rnc: "",
    },
    titular: {
      nombre: "",
      direccion: "",
      telefono: "",
      email: "",
      cedula: "",
      rnc: "",
    },
    almacenador: {
      nombre: "",
      direccion: "",
      telefono: "",
      email: "",
      cedula: "",
      rnc: "",
    },
    fabricante: {
      nombre: "",
      direccion: "",
      telefono: "",
      email: "",
      cedula: "",
      rnc: "",
      esTitular: true,
      esExportador: false,
    },
    acondicionador: {
      nombre: "",
      direccion: "",
      telefono: "",
      email: "",
      cedula: "",
      rnc: "",
      esFabricante: true,
    },
  });

  const archivos = reactive<any>({
    onapi: null,
    certificadoVentas : null,
    listaIngredientes: null,
    descripcionElaboracion: null,
    arteEtiqueta: null,
    especificacionesEnvase: null,
    permisoSanitario: null,
    certificadoBuenasPracticas: null,
    certificadoExportacion: null,
    contratoFabricante: null,
    poderRepresentante: null,
    certificadoRegistroMercantil: null,
    contratoAcondicionador: null,
    muestras:[{}]
  }); // Lista para almacenar los archivos adjuntos

  const factores = reactive({
    haccp: "",
    poblacion: "",
    produccion: "",
    rechazos: "",
    muestras: "",
  });

  const estadoFisicos = ref([]); // Lista para almacenar los valores de estado físico

  async function uploadFile() {
    console.log("Subiendo archivo:", archivos.certificado);
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPLOAD_FILE,
        variables: {
          archivo : {
            archivo: archivos.certificado,
            solicitudId: 2,
            tipoDocumentoId: 13,
            comentarioDocumentos: [1,2]
            }
        },
      });

      console.log("Archivo subido:", data);
    } catch (err) {
      console.error("Error al subir archivo:", err);
    }
  }

  async function getUserIdByToken() {
    const token = localStorage.getItem("accessToken") || "null";

    const tokenWithNoQuotes = token.replace(/['"]+/g, '');
    console.log("Token sin comillas:", tokenWithNoQuotes);

    const { data } = await apolloClient.mutate({
      mutation: GET_USER,
      variables: {
        input:tokenWithNoQuotes,
      },
    });
    return data.userIdByToken.getUserIdResponse.userId;
  }

  
  async function createProductEntidad() {
    const enti = {
      cedula: "3434",
      correo: null,
      direccion: null,
      nombre: "hola",
      rnc: null,
      telefono: null,
    };

    const { data } = await apolloClient.mutate({
      mutation: CREATE_PRODUCT_ENTIDAD,
      variables: {
        input: enti,
      },
    });

    console.log("Entidad creada:", data);
  }
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

  async function createProduct(formData: any) {
    const productInputForm = {
      envasePrimario: formData.envasePrimario,
      estado: "Activo",
      estadoFisicoId: formData.estadoFisico,
      marca: formData.marca,
      materialEmpaque: formData.materialEmpaque,
      nacional: formData.origen === "nacional",
      nombre: formData.nombreProducto,
      origen: formData.origen === "nacional" ? "Nacional" : "Importado",
      presentaciones: formData.presentacion,
      riesgoSubcategoriaId: formData.subcategoria,
      unIngrediente: formData.unIngrediente === "true",
      usuarioId: 35,
      productoEntidades: [{ entidadId: 1, productoId: 3, relacionId: 1 }],
    };

    const { data } = await apolloClient.mutate({
      mutation: CREATE_PRODUCT,
      variables: {
        input: productInputForm,
      },
    });

    console.log("Producto creado:", data);
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
    archivos,
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
    uploadFile,
    initFactores,
    fetchCategorias,
    debug,
    calcularRiesgo,
    goBack,
    submitForm,
  };
});
