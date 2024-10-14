<template>
    <!-- Tabla Grupo 1 -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th colspan="6" class="text-start">
            {{ detallesEstablecimiento.nombre }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="categoria in detallesEstablecimiento.bpmCategoria"
          :key="categoria.bpmCategoriaId"
        >
          <tr>
            <th colspan="6" class="text-start">
              {{ categoria.nombre }}
            </th>
          </tr>
          <template
            v-for="subcategoria in categoria.bpmSubcategoria"
            :key="categoria.bpmCategoriaId"
          >
            <tr>
              <th class="text-start">{{ subcategoria.nombre }}</th>
              <td colspan="1" class="text-start">CC</td>
              <td colspan="1" class="text-start">CP</td>
              <td colspan="1" class="text-start">IT</td>
              <td colspan="1" class="text-start">N/A</td>
              <td colspan="2" class="text-start">Observaciones</td>
            </tr>
            <tr
              v-for="pregunt in subcategoria.pregunta"
              :key="pregunt.preguntaId"
            >
              <td class="text-start">{{ pregunt.nombre }}</td>
              <td colspan="1">
                <input @change="form.guardarRespuesta(pregunt.preguntaId, $event.target.value)"
                :checked="form.getRespuesta(pregunt.preguntaId) === '1'" class="form-check-input" type="radio" :name="'option-' + pregunt.preguntaId" value="1" 
                required />
              </td>
              <td colspan="1">
                <input required @change="form.guardarRespuesta(pregunt.preguntaId, $event.target.value)"
                :checked="form.getRespuesta(pregunt.preguntaId) === '0.5'" class="form-check-input" type="radio" :name="'option-' + pregunt.preguntaId" value="0.5" />
              </td>
              <td colspan="1" >
                <input required @change="form.guardarRespuesta(pregunt.preguntaId, $event.target.value)"
                :checked="form.getRespuesta(pregunt.preguntaId) === '0'"class="form-check-input" type="radio" :name="'option-' + pregunt.preguntaId" value="0" />
              </td>
              <td colspan="1">
                <input required @change="form.guardarRespuesta(pregunt.preguntaId, $event.target.value)"
                :checked="form.getRespuesta(pregunt.preguntaId) === 'NA'" class="form-check-input" type="radio" :name="'option-' + pregunt.preguntaId" value="NA" />
              </td>
              <!-- Textarea for Observations -->
              <td colspan="2">
                <textarea @input="form.guardarObservacion(pregunt.preguntaId, $event.target.value)"
                :value="form.getObservacion(pregunt.preguntaId)" :name="'observacion-' + pregunt.preguntaId" class="form-control" rows="2" cols="20"></textarea>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </template>
  
  <script>
  import { useBpmStore } from "../../stores/bpmStore";

  export default {
    name: "BpmTabla",
    props: {
    detallesEstablecimiento: {
      type: Object,
      required: true,
    }
    },
    setup() {
      const form = useBpmStore();
      return { form };
    },
  };
  </script>
  