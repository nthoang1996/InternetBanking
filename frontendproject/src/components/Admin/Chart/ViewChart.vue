<template>
    <div>
        <div v-if="data.bank === 'all' && data.time === '0'">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Ngân hàng A</th>
                        <th scope="col">Ngân hàng B</th>
                        <th scope="col">Ngân hàng C</th>
                        <th scope="col">Ngân hàng của Đạt</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Hôm nay</th>
                        <td>{{data.totalA[0]}}</td>
                        <td>{{data.totalB[0]}}</td>
                        <td>{{data.totalC[0]}}</td>
                        <td>{{data.totalDat[0]}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Tuần này</th>
                        <td>{{data.totalA[1]}}</td>
                        <td>{{data.totalB[1]}}</td>
                        <td>{{data.totalC[1]}}</td>
                        <td>{{data.totalDat[1]}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Tháng này</th>
                        <td>{{data.totalA[2]}}</td>
                        <td>{{data.totalB[2]}}</td>
                        <td>{{data.totalC[2]}}</td>
                        <td>{{data.totalDat[2]}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Năm này</th>
                        <td>{{data.totalA[3]}}</td>
                        <td>{{data.totalB[3]}}</td>
                        <td>{{data.totalC[3]}}</td>
                        <td>{{data.totalDat[3]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else-if="data.bank === 'a' && data.time === '0'">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Hôm nay</th>
                        <th scope="col">Tuần này</th>
                        <th scope="col">Tháng này</th>
                        <th scope="col">Năm này</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Ngân hàng A</th>
                        <td>{{data.totalA[0]}}</td>
                        <td>{{data.totalA[1]}}</td>
                        <td>{{data.totalA[2]}}</td>
                        <td>{{data.totalA[3]}}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
        <div v-else-if="data.bank === 'b' && data.time === '0'">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Hôm nay</th>
                        <th scope="col">Tuần này</th>
                        <th scope="col">Tháng này</th>
                        <th scope="col">Năm này</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Ngân hàng B</th>
                        <td>{{data.totalB[0]}}</td>
                        <td>{{data.totalB[1]}}</td>
                        <td>{{data.totalB[2]}}</td>
                        <td>{{data.totalB[3]}}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
        <div v-else-if="data.bank === 'c' && data.time === '0'">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Hôm nay</th>
                        <th scope="col">Tuần này</th>
                        <th scope="col">Tháng này</th>
                        <th scope="col">Năm này</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Ngân hàng C</th>
                        <td>{{data.totalC[0]}}</td>
                        <td>{{data.totalC[1]}}</td>
                        <td>{{data.totalC[2]}}</td>
                        <td>{{data.totalC[3]}}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
        <div v-else-if="data.bank === 'd' && data.time === '0'">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Hôm nay</th>
                        <th scope="col">Tuần này</th>
                        <th scope="col">Tháng này</th>
                        <th scope="col">Năm này</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Ngân hàng của Đạt</th>
                        <td>{{data.totalDat[0]}}</td>
                        <td>{{data.totalDat[1]}}</td>
                        <td>{{data.totalDat[2]}}</td>
                        <td>{{data.totalDat[3]}}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
        <div v-else-if="data.bank === 'a' && data.time === '1'">
            <p>Số tiền giao dịch: <span>{{data.totalA[0]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'b' && data.time === '1'">
            <p>Số tiền giao dịch: <span>{{data.totalB[0]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'c' && data.time === '1'">
            <p>Số tiền giao dịch: <span>{{data.totalC[0]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'd' && data.time === '1'">
            <p>Số tiền giao dịch: <span>{{data.totalDat[0]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'a' && data.time === '2'">
            <p>Số tiền giao dịch: <span>{{data.totalA[1]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'b' && data.time === '2'">
            <p>Số tiền giao dịch: <span>{{data.totalB[1]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'c' && data.time === '2'">
            <p>Số tiền giao dịch: <span>{{data.totalC[1]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'd' && data.time === '2'">
            <p>Số tiền giao dịch: <span>{{data.totalDat[1]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'a' && data.time === '3'">
            <p>Số tiền giao dịch: <span>{{data.totalA[2]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'b' && data.time === '3'">
            <p>Số tiền giao dịch: <span>{{data.totalB[2]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'c' && data.time === '3'">
            <p>Số tiền giao dịch: <span>{{data.totalC[2]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'd' && data.time === '3'">
            <p>Số tiền giao dịch: <span>{{data.totalDat[2]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'a' && data.time === '4'">
            <p>Số tiền giao dịch: <span>{{data.totalA[3]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'b' && data.time === '4'">
            <p>Số tiền giao dịch: <span>{{data.totalB[3]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'c' && data.time === '4'">
            <p>Số tiền giao dịch: <span>{{data.totalC[3]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'd' && data.time === '4'">
            <p>Số tiền giao dịch: <span>{{data.totalDat[3]}}</span></p>
        </div>
        <div v-else-if="data.bank === 'all' && data.time === '1'">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Ngân hàng A</th>
                        <th scope="col">Ngân hàng B</th>
                        <th scope="col">Ngân hàng C</th>
                        <th scope="col">Ngân hàng của Đạt</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Hôm nay</th>
                        <td>{{data.totalA[0]}}</td>
                        <td>{{data.totalB[0]}}</td>
                        <td>{{data.totalC[0]}}</td>
                        <td>{{data.totalDat[0]}}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
        <div v-else-if="data.bank === 'all' && data.time === '2'">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Ngân hàng A</th>
                        <th scope="col">Ngân hàng B</th>
                        <th scope="col">Ngân hàng C</th>
                        <th scope="col">Ngân hàng của Đạt</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Tuần này</th>
                        <td>{{data.totalA[1]}}</td>
                        <td>{{data.totalB[1]}}</td>
                        <td>{{data.totalC[1]}}</td>
                        <td>{{data.totalDat[1]}}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
        <div v-else-if="data.bank === 'all' && data.time === '3'">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Ngân hàng A</th>
                        <th scope="col">Ngân hàng B</th>
                        <th scope="col">Ngân hàng C</th>
                        <th scope="col">Ngân hàng của Đạt</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Tháng này</th>
                        <td>{{data.totalA[2]}}</td>
                        <td>{{data.totalB[2]}}</td>
                        <td>{{data.totalC[2]}}</td>
                        <td>{{data.totalDat[2]}}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
        <div v-else-if="data.bank === 'all' && data.time === '4'">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Ngân hàng A</th>
                        <th scope="col">Ngân hàng B</th>
                        <th scope="col">Ngân hàng C</th>
                        <th scope="col">Ngân hàng của Đạt</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Năm này</th>
                        <td>{{data.totalA[3]}}</td>
                        <td>{{data.totalB[3]}}</td>
                        <td>{{data.totalC[3]}}</td>
                        <td>{{data.totalDat[3]}}</td>
                    </tr>
                    
                </tbody>
            </table>
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
table{
    color: black;
}
</style>