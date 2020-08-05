import 'babel-polyfill'
import Vue from 'vue'
import VueFetch, { $fetch } from './plugins/fetch'
import App from './components/App.vue'
import router from './router'
import * as filters from './filters'
import store from './store'
import { sync } from 'vuex-router-sync'

import VueGoogleMaps from 'vue-googlemaps'

Vue.use(VueGoogleMaps, {
    load: {
        apiKey: 'AIzaSyCBWhbgwkPMo_tSShEkSWiN0tM2tW1x76U',
        libraries: ['places']
    },
})


sync(store, router)

// Filters 
for (const key in filters) {
    Vue.filter(key, filters[key])
}

Vue.use(VueFetch, {
    baseUrl: 'http://localhost:3000',
})

async function main () {

    await store.dispatch('init')

    new Vue({
        el: '#app',
        render: function (h) {
            return h(App);
        },
        router,
        // Injected store
        store,
    })
}

main()