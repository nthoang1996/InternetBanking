<template>
    <div class="mb-3">
        <div class="card">
            <div class="card-header title">
                Chuyển khoản
            </div>
            <div class="card-content">
                <p class="txtName">Nguyễn Văn A</p>
                <p class="txtAccount">19035423515</p>
                <p class="txtCoin">
                    <span>Số tiền: </span>
                    <span class="txtMoney">25,000,000</span>
                </p>
                <p class="txtDate">
                    <span>Thời gian: </span>
                    <span>Thứ 5 ngày 15 tháng 6 năm 2020</span>
                </p>
                <p class="txtMessage">Tin nhắn: tiền cá độ đá bóng</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.title{
    font-size: 16px;
    font-weight: bold;
    background-color: #295490;
    color: white;
}
.card-content{
    padding: 0.75rem 1.25rem;
}

.card-content p{
    margin: 9px 0;
}

.txtName{
    font-size: 20px;
    font-weight: bold;
    color: dimgrey;
}
.txtAccount{
    font-size: 14px;
}
.txtCoin{
    font-size: 14px;
    font-weight: bold;
}
.txtDate{
    font-size: 15px;
    font-weight: bold;
}
.txtMessage{
    font-size: 15px;
    font-style: italic;
}
.txtMoney{
    padding: 2px 5px;
    border-radius: 5px;
    color: #fff;
    background-color: dodgerblue;
    font-size: 18px;
}
</style>