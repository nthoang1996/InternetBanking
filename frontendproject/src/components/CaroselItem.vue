<template>
        <img :src="srcImage" class="d-block w-100" :alt="srcImage" />
</template>

<script>
    export default {
        props: ["srcImage"]
    }
</script>

<style scoped>

</style>