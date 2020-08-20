<template>
  <div class="ml-3">
    <b-card-group deck>
      <b-card :title="data.displayName" header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h6 :class="data.myClass">{{data.nameType}}</h6>
        </template>
        <b-card-text>{{data.accountId}}</b-card-text>
        <b-card-text>
          <em>Ngân hàng: {{data.bank_name}}</em>
        </b-card-text>
        <b-card-text>
          <b>Số tiền: {{data.bank_balance}}</b>
        </b-card-text>
        <b-card-text>
          <b>Thời gian: {{data.date_display}}</b>
        </b-card-text>
        <b-card-text>
          <b>{{data.type_pay}}</b>
        </b-card-text>
        <b-card-text>
          <i>Tin nhắn:</i><br> {{data.message}}
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import mixin from "../../../Mixin";
export default {
  mixins: [mixin],
  props: ["data"],
  methods: {}
};
</script>

<style scoped>
.my-card {
  width: 100%;
}

.my-type-send{
  color: rgb(14, 82, 209);
}

.my-type-receive{
  color: rgb(123, 201, 155);
}

.my-type-get-debit{
  color: #DD2BF5 ;
}

.my-type-pay-debit{
  color: #F66B7E  ;
}
</style>