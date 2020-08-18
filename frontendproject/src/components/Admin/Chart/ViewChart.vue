<template>
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Khách Hàng</th>
                    <th scope="col">KH Ngân Hàng Khác</th>
                    <th scope="col">Ngày Giao Dịch</th>
                    <th scope="col">Số Tiền Giao Dịch</th>
                    <th scope="col">Ngân Hàng Giao Dịch</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item.id">
                    <td class="tdTrasaction">
                        <p>{{item.source_name}}</p>
                        <span>{{item.source_username}}</span>   
                    </td>

                    <td class="tdTrasaction">
                        <p>{{item.des_name}}</p>
                        <span>{{item.des_username}}</span> 
                    </td>

                    <td><p class="txtDate">{{item.time}}</p></td>

                    <td v-if="item.type === 1"  >
                        <p class="txtMoneyGiam">{{item.value}}</p>
                    </td>
                    <td v-else >
                        <p class="txtMoneyTang">{{item.value}}</p>
                    </td>

                    <td v-if="item.bank_company_id==='TnyjhGBTwMthNgYZkq'"><p class="txtBank">NGÂN HÀNG A</p> </td>
                    <td v-else-if="item.bank_company_id==='jpS38Zwq37hIQf0jkO'"><p class="txtBank" >NGÂN HÀNG B</p></td>
                    <td v-else-if="item.bank_company_id==='hFKsgwJyJXUpNxNwZM'"><p class="txtBank">NGÂN HÀNG C</p></td>
                    <td v-else><p class="txtBank">NGÂN HÀNG CỦA ĐẠT</p></td>
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
    color: black;
}

p{
    margin: 0;
    padding: 0;
    font-size: 14px;
    color: #555;
    font-weight: bold;
}

span{
    font-size: 13px;
    color: #555;
    font-style: italic;
}

.txtMoneyGiam{
    color: red;
    font-weight: 500;
}

.txtMoneyTang{
    color: green;
    font-weight: 500;
}

.txtBank{
    font-weight: 500;
    color: #000;
}

.txtDate{
    font-weight: 500;
}

.tdTrasaction{
    padding: 0;
    padding-left: 0.75rem;
    margin-top: auto;
    margin-bottom: auto;
}
td{
    padding: 0.75rem;
}
</style>