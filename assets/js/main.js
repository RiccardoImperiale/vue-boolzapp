import { contacts } from './contacts.js'
const { createApp } = Vue

createApp({
    data() {
        return {
            constacts: contacts
        }
    },
    methods: {

    },
    created() {
        console.log(contacts);
    }
}).mount('#app')