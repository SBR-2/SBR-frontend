import { defineStore } from "pinia";
import { ref } from "vue";
import apolloClient from "../apolloClient";
import gql from "graphql-tag";

interface Respuesta {
  preguntaId: number;
  respuesta: string;
  observacion: string;
}

export const useBpmStore = defineStore("bpm", () => {
  const currentStep = ref(1);
  const detallesEstablecimiento = ref<any>({});
  const respuestas = ref<Respuesta[]>([]);
  const form = ref<any>();

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
      return;
    }
    currentStep.value -= 1;
    fetchGroups();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function nextStep() {
    console.log("Paso:", currentStep.value);
    if (currentStep.value === 7) {
      const todasRespondidas = respuestas.value.every(
        (respuesta: Respuesta) => respuesta.respuesta !== ""
      );
      console.log("Todas respondidas:", todasRespondidas);
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

  return {
    currentStep,
    detallesEstablecimiento,
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
