<template>
    <div>
        <div v-for="item in data" :key="item.id">
            <p>{{item.name}}</p>
        </div>
    </div>
</template>

<script>
import mixin from "../../../Mixin";
export default {
    mixins: [mixin],
    props: ["data"]
}
</script>

<style scoped>

</style>