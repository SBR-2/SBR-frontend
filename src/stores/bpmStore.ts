import { defineStore } from "pinia";
import { ref } from "vue";
import apolloClient from "../apolloClient";
import gql from "graphql-tag";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { useMutation } from "@vue/apollo-composable";

interface Respuesta {
  preguntaId: number;
  respuesta: string;
  observacion: string;
}

const ADD_ESTABLECIMIENTO = gql`
mutation fgfg($input: AddEstablecimientoInput!) {
  addEstablecimiento(input: $input) {
    establecimiento {
      calUltimaInspeccion
      comercializacion
      establecimientoId
      inicioOperaciones
      mercadoObjetivoId
      municipioId
      nombre
      nombreDigemaps
      nombreDps
      noSanitario
      numEmpleados
      numero
      numProductosElaborados
      produccionAnual
      rnc
      telefono
      ultimaInspeccion
      vencimientoSanitario
    }
  }
}
`

const ADD_RESPUESTA = gql`mutation registrarRespuesta($respuesta: AddRespuestaInput!) {
  addRespuesta(input: $respuesta) {
    respuestum {
      descripcion
      estado
      fichaId
      observacion
      preguntaId
      respuestaId
      valorId
    }
  }
}`;

export const useBpmStore = defineStore("bpm", () => {
  const bpmId = ref(0);
  const currentStep = ref(1);
  const detallesEstablecimiento = ref<any>({});
  const respuestas = ref<Respuesta[]>([]);
  const form = ref<any>();

  const router = useRouter();

  const establecimientoForm = reactive<any>({
    nombre: '',
    calle: '',
    numero: '',
    rnc: '',
    provincia: '',
    municipio: '',
    telefono: '',
    fechaInicioOperaciones: '',
    fechaVencimientoPermisoSanitario: '',
    numeroProductosElaborados: 0,
    produccionAnual: 0,
    numeroEmpleados: 0,
    tipoComercializacion: '',
    mercadoObjetivo: '',
    fechaUltimaInspeccion: '',
    fechaProximaInspeccion: '',
    nombreOficialDPS: '',
    nombreTecnicoDigemaps: '',
    calificacionUltimaInspeccion: 0,
  });

  const errors = ref<any>({});

  fetchGroups();


  async function fetchGroups() {
    try {
      const { data } = await apolloClient.query({
        query: gql`
          query bpm($grupoId: Int!) {
            grupos(where: { grupoId: { eq: $grupoId } }) {
              items {
                nombre
                grupoId
                bpmCategoria {
                  bpmCategoriaId
                  nombre
                  bpmSubcategoria {
                    bpmSubcategoriaId
                    nombre
                    pregunta {
                      nombre
                      preguntaId
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          grupoId: currentStep.value, // Se pasa el grupoId como variable
        },
      });

      const bpmItems = data.grupos.items[0];
      detallesEstablecimiento.value = bpmItems;
    } catch (err) {
      console.error("GraphQL Error:", err);
    }
  }

  function prevStep() {
    if (currentStep.value === 1) {
      router.push("/ins/establecimiento");
    }
    currentStep.value -= 1;
    fetchGroups();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function nextStep() {
    console.log("Paso:", currentStep.value);
    console.log(respuestas);

    if (currentStep.value === 7) {

      const respuestasd = respuestas.value.map((respuesta) => {
        let valorPoint = 0;
        switch (respuesta.respuesta) {
          case "CC":
            valorPoint = 1;
            break;
          case "CP":
            valorPoint = 2;
            break;
          case "IT":
            valorPoint = 3;
            break;
          case "NA":
            valorPoint = 4;
            break;
          default:
            console.warn(`Unexpected response value: ${respuesta.respuesta}`);
        }
        return {
          descripcion: respuesta.observacion,
          estado: true,
          fichaId: 1,
          preguntaId: respuesta.preguntaId,
          valorId: valorPoint,
        };
      });
  
      console.log(establecimientoForm);
  
      await apolloClient.mutate({
        mutation: ADD_ESTABLECIMIENTO,
        variables: {
          input: {
            calUltimaInspeccion: establecimientoForm.calificacionUltimaInspeccion,
            comercializacion: establecimientoForm.tipoComercializacion,
            inicioOperaciones: establecimientoForm.fechaInicioOperaciones,
            mercadoObjetivo_id: parseInt(establecimientoForm.mercadoObjetivo),
            municipioId: parseInt(establecimientoForm.municipio),
            nombre: establecimientoForm.nombre,
            nombreDigemaps: establecimientoForm.nombreTecnicoDigemaps,
            nombreDps: establecimientoForm.nombreOficialDPS,
            noSanitario: "true",
            numEmpleados: establecimientoForm.numeroEmpleados,
            numero: establecimientoForm.numero,
            numProductosElaborados: establecimientoForm.numeroProductosElaborados,
            produccionAnual: establecimientoForm.produccionAnual,
            rnc: establecimientoForm.rnc,
            telefono: establecimientoForm.telefono,
            ultimaInspeccion: establecimientoForm.fechaUltimaInspeccion,
            vencimientoSanitario: establecimientoForm.fechaVencimientoPermisoSanitario,
          }
        }
      });
  
      respuestasd.forEach(async (respuesta) => {
        await apolloClient.mutate({
          mutation: ADD_RESPUESTA,
          variables: {
            respuesta
          }
        });
      });

      
      const todasRespondidas = respuestas.value.every(
        (respuesta: Respuesta) => respuesta.respuesta !== ""
      );
      console.log("Todas respondidas:", todasRespondidas);
      console.log("Promedio:", calcularPromedio.value * 100);
      if (!todasRespondidas) {
        console.log("No todas las preguntas han sido respondidas.");
      }

      return;
    }
    currentStep.value += 1;
    fetchGroups();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function guardarRespuesta(preguntaId: number, respuesta: string) {
    const index = respuestas.value.findIndex(
      (r) => r.preguntaId === preguntaId
    );
    if (index !== -1) {
      respuestas.value[index].respuesta = respuesta;
    } else {
      respuestas.value.push({ preguntaId, respuesta, observacion: "" });
    }
  }

  function getRespuesta(preguntaId: number): string {
    const respuesta = respuestas.value.find((r) => r.preguntaId === preguntaId);
    return respuesta ? respuesta.respuesta : "";
  }

  function guardarObservacion(preguntaId: number, observacion: string) {
    const index = respuestas.value.findIndex(
      (r) => r.preguntaId === preguntaId
    );
    if (index !== -1) {
      respuestas.value[index].observacion = observacion;
    } else {
      respuestas.value.push({ preguntaId, respuesta: "", observacion });
    }
  }

  function getObservacion(preguntaId: number): string {
    const respuesta = respuestas.value.find((r) => r.preguntaId === preguntaId);
    return respuesta ? respuesta.observacion : "";
  }

  const calcularPromedio = computed(() => {
    let total = 0;
    let count = 0;

    respuestas.value.forEach((respuesta) => {
      switch (respuesta.respuesta) {
        case "CC":
          total += 1;
          count++;
          break;
        case "CP":
          total += 0.5;
          count++;
          break;
        case "IT":
          total += 0;
          count++;
          break;
        case "NA":
          // Do not count NA responses
          break;
        default:
          console.warn(`Unexpected response value: ${respuesta.respuesta}`);
      }
    });
    return count > 0 ? total / count : 0;
  });


  return {
    currentStep,
    detallesEstablecimiento,
    establecimientoForm,
    form,
    fetchGroups,
    nextStep,
    prevStep,
    guardarRespuesta,
    getRespuesta,
    guardarObservacion,
    getObservacion,
  };
});
