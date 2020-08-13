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
                                    size="sm"
                                    ></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group class="txtTitleForm" label="Thời gian giao dịch:">
                                    <b-form-select
                                    v-model="selectedTime"
                                    size="sm"
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
        <b-row>
            <b-col>
                <b-card
                    header="Card Header"
                    header-text-variant="white"
                    header-tag="header"
                    header-bg-variant="dark"
                >
                    <b-card-text>Header and footers variants.</b-card-text>
                </b-card>
            </b-col>
            <b-col>
                <b-card
                    header="Card Header"
                    header-text-variant="white"
                    header-tag="header"
                    header-bg-variant="dark"
                >
                    <b-card-text>Header and footers variants.</b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
    
</template>

<script>
import mixin from '../../../Mixin';

export default {
    mixins: [mixin],
    data() {
      return {
        selectedBank: 'a',
        optionsBank: [
          { value: 'a', text: 'Ngân hàng A' },
          { value: 'b', text: 'Ngân hàng B' },
          { value: 'c', text: 'Ngân hàng của Đạt' },
          { value: 'd', text: 'Ngân hàng C'}
        ],
        selectedTime: 1,
        optionsTime: [
          { value: 1, text: '1 ngày trước' },
          { value: 2, text: '1 tuần trước' },
          { value: 3, text: '1 tháng trước' },
          { value: 4, text: '1 năm trước'}
        ]
      }
    },
    methods: {
        /*handleChange(){
            this.$forceUpdate();
            const data = {
                bank: this.selectedBank,
                time:  this.selectedTime
            }
            alert(JSON.stringify(data));
        },*/
        onSubmit(){
            const data = {
                bank: this.selectedBank,
                time:  this.selectedTime
            }
            this.$store.dispatch("setTotalTransferBank", data);

            //alert(JSON.stringify(data));
        }
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