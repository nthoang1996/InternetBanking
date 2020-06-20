export default {
    created: function () {

    },
    methods: {
        setAuth: function (data) {
            localStorage.internetbanking_accesstoken = data.access_token;
            const timestamp = (new Date()).getTime();
            localStorage.internetbanking_timeaccesstokenexpire = timestamp.toString();
            return true;
        },
        clearDataSending: function () {
            this.$store.dispatch("updateDataSendingUserID", "");
            this.$store.dispatch("updateDataSendingAccountName", "");
            this.$store.dispatch("updateDataSendingValue", "");
            this.$store.dispatch("updateDataSendingBankID", "TttwVLKHvXRujyllDq");
            this.$store.dispatch("updateDataSendingMyMessage", "");
        },
        handleBeforeCallServer: async function () {
            const timeExpired = parseInt(localStorage.internetbanking_timeaccesstokenexpire) + 540000;
            const localTimestamp = (new Date()).getTime();
            if (localTimestamp > timeExpired) {
                const body = JSON.stringify({
                    accessToken: localStorage.internetbanking_accesstoken,
                    refreshToken: localStorage.internetbanking_refreshtoken
                })
                await fetch("http://localhost:3000/account/refresh", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: body
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message === "Success") {
                            console.log("Call refresh", data);
                            return this.setAuth(data);
                        } else {
                            console.log("Error");
                            return data.error;
                        }
                    });
            }

        }
    }
}