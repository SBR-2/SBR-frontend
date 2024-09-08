<template>
    <div>
        <h1>¡Hola Mundo!</h1>
        
        <ul>
            <li v-for="item in ['1', '2', '3']" :key="item">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'VistaDeEjemplo'
}
</script>

<style scoped>
h1 {
    color: blue;
}
</style>