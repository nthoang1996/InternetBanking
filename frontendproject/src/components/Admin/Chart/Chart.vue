<template>
    <b-container>
        <p class="txtTitle">THỐNG KÊ GIAO DỊCH</p>
        <b-row class="mb-3">
            <b-col cols="9">
                <b-card class="mt-3">
                    <b-form @submit.prevent="onSubmit">
                        <b-row>
                            <b-col>
                                <b-form-group class="txtTitleForm" label="Ngân hàng giao dịch:">
                                    <b-form-select
                                    v-model="selectedBank"
                                    :options="optionsBank"
                                    ></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group class="txtTitleForm" label="Thời gian giao dịch:">
                                    <b-form-select
                                    v-model="selectedTime"
                                    :options="optionsTime"
                                    ></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <div>
                            <b-button type="submit" variant="primary">
                                Xem thống kê
                            </b-button>
                        </div>
                    </b-form>
                </b-card>
            </b-col>
            <b-col cols="3">
            </b-col>
        </b-row>
        <b-row class="mb-4">
            <b-col cols="8">
                <b-card
                    header="Biểu đồ biểu diễn"
                    header-text-variant="white"
                    header-tag="header"
                    header-bg-variant="dark"

                >
                    <ViewChart :data="getListTotalTransaction" />
                </b-card>
            </b-col>
            <b-col cols="4">
                <b-card
                    header="Thống kê số tiền giao dịch"
                    header-text-variant="white"
                    header-tag="header"
                    header-bg-variant="dark"
                >
                    <TotalMoney :data="getListTotalTransaction.valueTransaction" />
                </b-card>
            </b-col>
        </b-row>
    </b-container>
    
</template>

<script>
import ViewChart from './ViewChart'
import TotalMoney from './TotalMoney'
import mixin from '../../../Mixin';
import { mapGetters } from "vuex";
export default {
    mixins: [mixin],
    data() {
      return {
        selectedBank: 'all',
        optionsBank: [
            { value: 'all', text: '--- Tất cả ---' },
            { value: 'a', text: 'Ngân hàng A' },
            { value: 'b', text: 'Ngân hàng B' },
            { value: 'c', text: 'Ngân hàng C' },
            { value: 'd', text: 'Ngân hàng của Đạt'}
        ],
        selectedTime: 0,
        optionsTime: [
            { value: 0, text: '--- Tất cả ---' },
            { value: 1, text: '1 ngày trước' },
            { value: 2, text: '1 tuần trước' },
            { value: 3, text: '1 tháng trước' },
            { value: 4, text: '1 năm trước'}
        ]
      }
    },
    methods: {
        onSubmit(){
            const data = {
                bank: this.selectedBank,
                time:  this.selectedTime
            }
            this.$store.dispatch("setTotalTransferBank", data);
        }
    }, 
    components: {ViewChart, TotalMoney},
    computed:{
        ...mapGetters(["getListTotalTransaction"])
    } 
}
</script>

<style scoped>
.txtTitle{
    margin-top: 25px;
    font-weight: bold;
    text-align: center;
    font-size: 30px;
}

.txtTitleForm{
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>