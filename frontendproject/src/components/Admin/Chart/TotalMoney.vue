<template>
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Tên Ngân hàng</th>
                    <th scope="col">Tổng số tiền nhận</th>
                    <th scope="col">Tổng số tiền chuyển</th>
                    <th scope="col">Tổng số tiền giao dịch</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item.id">
                    <td><p>{{item.name}}</p></td>
                    <td><p class="txtMoneyNhan">{{item.valueNhan}}</p></td>
                    <td><p class="txtMoneyChuyen">{{item.valueChuyen}}</p> </td>
                    <td><p class="txtMoneyTotal">{{item.value}}</p></td>
                </tr>  
            </tbody>
        </table>
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
table{
    color: #000;
}
p{
    padding: 0;
    margin: 0;
    font-size: 14px;
}
.txtMoneyNhan{
    color: green;
}
.txtMoneyChuyen{
    color: red;
}
.txtMoneyTotal{
    color: blue;
    font-size: 15px;
    font-weight: bold;
}
</style>