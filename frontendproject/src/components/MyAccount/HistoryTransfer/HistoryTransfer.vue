<template>
    <div>
        <p class="txtTitle">LỊCH SỬ GIAO DỊCH</p>
        <b-container>
            <b-row>
                <b-col class="inBank">
                    <p class="txtTitleSmall">GIAO DỊCH CÙNG NGÂN HÀNG</p>
                    <div class="divfilter">
                        <FilterItem />
                    </div>
                    <div>
                        <Transfer />
                        <Transfer />
                    </div>
                </b-col>
                <b-col class="outBank">
                    <p class="txtTitleSmall">GIAO DỊCH LIÊN NGÂN HÀNG</p>
                    <div class="divfilter">
                        <FilterItem />
                    </div>
                     <div>
                        <Transfer />
                        <Transfer />
                    </div>
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

.inBank{
    margin-right: 15px;
}

.outBank{
    margin-left: 15px;
}

.txtTitleSmall{
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: #777;
}

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