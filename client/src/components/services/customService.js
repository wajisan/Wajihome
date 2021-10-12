import VueJwtDecode from "vue-jwt-decode";

export default {
    getUserDetails() {
        let token = localStorage.getItem("jwt");
        if (token == null) {
            this.$router.push("/");
        }
        let decoded = VueJwtDecode.decode(token);
        return decoded;
    },
    testing() {
        console.log('ho testo');
    }
}