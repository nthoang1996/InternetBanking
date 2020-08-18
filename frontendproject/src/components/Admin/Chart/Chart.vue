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
            <b-col>
                <b-card
                    header="DANH SÁCH GIAO DỊCH VỚI NGÂN HÀNG KHÁC"
                    header-text-variant="white"
                    header-tag="header"
                    header-bg-variant="dark"

                >
                    <div v-if="getListTotalTransaction.count === 0">
                        Không có giao dịch
                    </div>
                    <div v-else>
                        <ViewChart :data="getListTotalTransaction.resultListTransaction" />

                    </div> 
                </b-card>
            </b-col>
        </b-row>
        <b-row class="mb-4">
            <b-col>
                <b-card
                    header="THỐNG KÊ TỔNG SỐ TIỀN GIAO DỊCH"
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
            { value: 1, text: 'Một ngày trước' },
            { value: 2, text: 'Tuần này' },
            { value: 3, text: 'Tháng này' },
            { value: 4, text: 'Năm này'}
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
    mounted(){
        const data = {
            bank: 'all',
            time: 0
        }
        this.$store.dispatch("setTotalTransferBank", data);
        this.$store.dispatch("updateListTransaction", {});
        this.clearDataSending();
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