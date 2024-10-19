import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import apolloClient from "../../src/apolloClient"; // Asegúrate de ajustar la ruta
import gql from "graphql-tag";
import { mapeoValores } from "./claves";

const GET_PRODUCTS = gql`
  query us($usuarioId: Int!) {
    usuarios(where: { usuarioId: { eq: $usuarioId } }) {
      items {
        estado
        rolId
        productos {
          estado
          marca
          nombre
          productoId
          riesgoSubcategoria {
            riesgo {
              riesgo1
            }
          }
          solicituds {
            riesgoTotal
            solicitudId
            estado
          }
        }
        usuarioId
      }
    }
  }
`;

const CREATE_BPM = gql`
  mutation ficha($input: Int!) {
    addFicha(input: { solicitudId: $input }) {
      ficha {
        fichaId
      }
    }
  }
`;

const ADD_FACTORES = gql`
  mutation addFactores($input: AsignarOpcionesASolicitudInput!) {
    asignarOpcionesASolicitud(solicitudInput: $input) {
      solicitud {
        solicitudId
      }
    }
  }
`;

const CREATE_REQUEST = gql`
  mutation muts($input: AddSolicitudInput!) {
    addSolicitud(solicitudInput: $input) {
      solicitud {
        fechaCreacion
        solicitudId
      }
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation producto($input: AddProductoInput!) {
    addProducto(input: $input) {
      producto {
        productoId
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
    certificadoVentas: null,
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
    muestra1: null,
    muestra2: null,
    muestra3: null,
  });
   // Lista para almacenar los archivos adjuntos
  const products = ref([]);

  const factores = reactive({
    haccp: "",
    poblacion: "",
    produccion: "",
    rechazos: "",
    muestras: "",
  });

  const estadoFisicos = ref([]); // Lista para almacenar los valores de estado físico

  async function uploadFile(archivo: any, tipo: number, solicitudId: number) {
    console.log("Subiendo archivo:", archivo);
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPLOAD_FILE,
        variables: {
          archivo: {
            archivo: archivo,
            solicitudId: solicitudId,
            tipoDocumentoId: tipo,
            comentarioDocumentos: [1, 2],
          },
        },
      });

      console.log("Archivo subido:", data);
    } catch (err) {
      console.error("Error al subir archivo:", err);
    }
  }

  async function getUserIdByToken() {
    const token = localStorage.getItem("accessToken") || "null";

    const tokenWithNoQuotes = token.replace(/['"]+/g, "");
    console.log("Token sin comillas:", tokenWithNoQuotes);

    const { data } = await apolloClient.mutate({
      mutation: GET_USER,
      variables: {
        input: tokenWithNoQuotes,
      },
    });
    return data.userIdByToken.getUserIdResponse.userId;
  }

  async function createRequest(productoId: number) {
    const request = {
      productoId: productoId,
      estado: "en proceso",
    };

    const { data } = await apolloClient.mutate({
      mutation: CREATE_REQUEST,
      variables: {
        input: request,
      },
    });

    console.log("Solicitud creada:", data.addSolicitud.solicitud.solicitudId);
    return data.addSolicitud.solicitud.solicitudId;
  }

  async function createFicha(solicitudId: number) {
    const fichaInput = solicitudId;

    const { data } = await apolloClient.mutate({
      mutation: CREATE_BPM,
      variables: {
        input: fichaInput,
      },
    });

    console.log("Ficha creada:", data);
  }

  async function createFactores(solicitudId: number) {
    const factoresInput = {
      solicitudId: solicitudId,
      opcionIds: [
        factores.poblacion,
        factores.produccion,
        factores.rechazos,
        factores.muestras,
      ],
    };

    const { data } = await apolloClient.mutate({
      mutation: ADD_FACTORES,
      variables: {
        input: factoresInput,
      },
    });

    console.log("Factores asignados:", data);
  }

  async function createProductEntidad(entidad: any) {
    const enti = {
      cedula: entidad.cedula,
      correo: entidad.email,
      direccion: entidad.direccion,
      nombre: entidad.nombre,
      rnc: entidad.rnc,
      telefono: entidad.telefono,
    };

    const { data } = await apolloClient.mutate({
      mutation: CREATE_PRODUCT_ENTIDAD,
      variables: {
        input: enti,
      },
    });

    console.log("Entidad creada:", data);
    return data.addEntidad.entidad.entidadId;
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

  async function initProductos() {
    products.value = await getUserProducts();
    console.log("Productos del usuario:", products.value);
  }

  async function initFactores() {
    factoresHACCP.value = await fetchFactores(1);
    factoresPoblacion.value = await fetchFactores(3);
    factoresProduccion.value = await fetchFactores(4);
    factoresRechazos.value = await fetchFactores(5);
    factoresMuestras.value = await fetchFactores(6);
  }

  async function createProduct(formData: any, entidades: any, userId: number) {
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
      usuarioId: userId,
      productoEntidades: [
        {
          entidadId: entidades.titular.entidadId,
          productoId: 3,
          relacionId: entidades.titular.relacionId,
        },
        {
          entidadId: entidades.almacenador.entidadId,
          productoId: 3,
          relacionId: entidades.almacenador.relacionId,
        },
        {
          entidadId: entidades.fabricante.entidadId,
          productoId: 3,
          relacionId: entidades.fabricante.relacionId,
        },
        {
          entidadId: entidades.acondicionador.entidadId,
          productoId: 3,
          relacionId: entidades.acondicionador.relacionId,
        },
        {
          entidadId: entidades.personaContacto.entidadId,
          productoId: 3,
          relacionId: entidades.personaContacto.relacionId,
        },
        {
          entidadId: entidades.representanteLegal.entidadId,
          productoId: 3,
          relacionId: entidades.representanteLegal.relacionId,
        },
      ],
    };

    const pr = {
      envasePrimario: "Botella",
      estado: "Activo",
      estadoFisicoId: 1,
      marca: "Coca Cola",
      materialEmpaque: "Plástico",
      nacional: true,
      nombre: "otramas",
      origen: "Nacional",
      presentaciones: "latas",
      riesgoSubcategoriaId: 1,
      unIngrediente: true,
      usuarioId: 33,
      productoEntidades: [
        { entidadId: 1, productoId: 3, relacionId: 2 },
        { entidadId: 2, productoId: 3, relacionId: 2 },
        { entidadId: 3, productoId: 3, relacionId: 2 },
        { entidadId: 4, productoId: 3, relacionId: 2 },
      ],
    };

    console.log("Datos del producto:", productInputForm);

    const { data } = await apolloClient.mutate({
      mutation: CREATE_PRODUCT,
      variables: {
        input: productInputForm,
      },
    });

    console.log("Producto creado:", data);
    return data.addProducto.producto.usuarioId;
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

  async function crearSolicitudCompleta() {
    try {
      const userId = await getUserIdByToken();
      console.log("Usuario obtenido:", userId);

      const titular = await createProductEntidad(formData.titular);
      const almacenador = await createProductEntidad(formData.almacenador);
      const fabricante = await createProductEntidad(formData.fabricante);
      const acondicionador = await createProductEntidad(
        formData.acondicionador
      );
      const personaContacto = await createProductEntidad(
        formData.personaContacto
      );
      const representanteLegal = await createProductEntidad(
        formData.representanteLegal
      );

      const entidades = {
        titular: {
          entidadId: titular,
          relacionId: 3,
        },
        almacenador: {
          entidadId: almacenador,
          relacionId: 4,
        },
        fabricante: {
          entidadId: fabricante,
          relacionId: 6,
        },
        acondicionador: {
          entidadId: acondicionador,
          relacionId: 5,
        },
        personaContacto: {
          entidadId: personaContacto,
          relacionId: 4,
        },
        representanteLegal: {
          entidadId: representanteLegal,
          relacionId: 2,
        },
      };

      const producto = await createProduct(
        formData,
        entidades,
        parseInt(userId)
      );
      const solicitud = await createRequest(parseInt(producto));

      const parse = parseInt(solicitud);

      for (const key in archivos) {
        if (archivos[key]) {
          // Obtener el valor entero desde el objeto de mapeo
          const valorEntero = mapeoValores[key as keyof typeof mapeoValores] || 1; // Valor por defecto en caso de que la clave no esté en el mapeo
      
          await uploadFile(archivos[key], valorEntero, parse);
        }
      }

      await createFactores(parse);
      await createFicha(parse);
      toast.success("Solicitud enviada correctamente.");
      router.push("/user/dashboard");
    } catch (err) {
      console.error("Error al crear solicitud:", err);
      toast.error("Error al enviar la solicitud.");
    }
  }

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

  async function getUserProducts() {
    const userId = await getUserIdByToken();
    try {
      const { data } = await apolloClient.query({
        query: GET_PRODUCTS,
        variables: {
          usuarioId: parseInt(userId),
        },
      });

      const productosFiltrados = data.usuarios.items[0].productos.map((producto:any) => {
        return {
          ...producto,
          solicituds: producto.solicituds.filter((solicitud: any) => solicitud.estado !== "rechazada")
        };
      });
      
      console.log("Productos del usuario:", productosFiltrados);
      return productosFiltrados;
    } catch (err) {
      console.error("GraphQL Error:", err);
    }
  }

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
    console.log("Paso actual:", currentStep.value);
    console.log("Datos del formulario:", formData);
    console.log("Archivos adjuntos:", archivos);
    console.log("Factores de riesgo:", factores);

    if (currentForm.value.checkValidity()) {
      if (currentStep.value < 4) {
        currentStep.value++;
      } else if (currentStep.value === 4) {
        crearSolicitudCompleta();
        console.log("Solicitud completada.");
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
    products,
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
    getUserIdByToken,
    getUserProducts,
    uploadFile,
    initFactores,
    fetchCategorias,
    debug,
    calcularRiesgo,
    goBack,
    initProductos,
    submitForm,
  };
});
