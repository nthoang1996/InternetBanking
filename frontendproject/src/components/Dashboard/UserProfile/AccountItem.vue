<template>
    <b-list-group-item>
        <div>
            <span class="badge badge-primary">Số tài khoản:</span>
            <span >&nbsp;<i>{{data.username}}</i></span>
        </div>
        <div class="my-item pb-3">
            <span class="badge badge-info">Số dư:</span>
            <span>&nbsp;<i>{{data.bank_balance}}</i></span>
        </div>
    </b-list-group-item>
</template>

<script>
    export default {
        props: ['data'],
    }
</script>

<style scoped>
.my-item{
    border-bottom: 1px dotted black;
}
</style>