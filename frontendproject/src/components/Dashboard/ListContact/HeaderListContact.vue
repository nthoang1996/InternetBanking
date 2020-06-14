<template>
    <div class="row">
        <div class="col-sm-9">
             <FilterItem />
        </div>
        <div class="col-sm-3">
            <b-button variant="primary" class="float-right mr-3 mt-3"> <i class="fa fa-plus-square"></i> &nbsp;Thêm mới</b-button>
        </div>
    </div>
</template>

<script>
import FilterItem from './FilterItem'
    export default {
        components: { FilterItem }
    }
</script>

<style scoped>
</style>