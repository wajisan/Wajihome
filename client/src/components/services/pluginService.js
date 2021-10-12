// Définition d'un nouveau composant appelé `button-counter`
//import axios from "axios";
import Customs from "./customService.js";
//import swal from "sweetalert";


export default {
    name: 'Plugins',

    data: () => ({
        userId: "",
        traffics: {},
        meteo: {},
        transports: {},
        sport: {},
        maps: {}
    }),

    methods: {
        async getTraffic() {
            try {
                this.$http
                .post("/plugin/traffic/", {})
                .then(response => {
                    this.traffics = response.data.traffics;
                });
                return null;
            }
            catch(err) {
                /*let error = err.response;
                if (error.status == 500) {
                swal("Error", error.data.message, "error");
                } else {
                swal("Error", error.data.err.message, "error");
                }*/
                console.log(err);
            }
        },
        async getMeteo() {
            try {
                this.$http
                .post("/plugin/meteo/", {})
                .then(response => {
                    this.meteo = response.data.meteo;
                });
                return null;
            }
            catch(err) {
                console.log(err);
            }
        },
        async getTransport() {
            try {
                this.$http
                .post("/plugin/transport/", {})
                .then(response => {
                    this.transports = response.data.transports;
                });
                return null;
            }
            catch(err) {
                console.log(err);
            }
        },
        async getSport() {
            try {
                this.$http
                .post("/plugin/sport/", {})
                .then(response => {
                    this.sport = response.data.sport;
                });
                return null;
            }
            catch(err) {
                console.log(err);
            }
        },
        async getMaps() {
            try {
                this.$http
                .post("/plugin/maps/", {})
                .then(response => {
                    this.maps = response.data.maps;
                });
                return null;
            }
            catch(err) {
                console.log(err);
            }
        },
    },

    created() {
        let user = Customs.getUserDetails();
        this.userId = user._id;
        this.getTraffic();
        this.getMeteo();
        this.getTransport();
        this.getSport();
        this.getMaps();
    },

    updated() {
    },

    mounted() {

    }
};