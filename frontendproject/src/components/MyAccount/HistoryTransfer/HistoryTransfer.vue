<template>
    <div>
        <p class="txtTitle">LỊCH SỬ GIAO DỊCH</p>
        <div class="divfilter">
            <FilterItem />
        </div>
        <b-container>
            <b-row>
                <b-col>
                    <Transfer />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import FilterItem from './Filter'
import Transfer from './Transfer'
export default {
    components: { FilterItem, Transfer },
}
</script>

<style scoped>

.txtTitle{
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-top: 25px;
    margin-bottom: 15px;
}
.divfilter{
    width: 100%;
    display: flex;    
    justify-content: flex-end;
    margin-bottom: 25px;
}
</style>