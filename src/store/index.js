import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
    state () {
        return {
            user: null,
        }
    },

    mutations: {
        user: (state, user) => {
            state.user = user
        },
    },
    getters: {
        user: state => state.user,

        userPicture: () => null,
    },
    actions: {
        async login ({ commit }) {
            try {
                const user = await $fetch('user')
                commit('user', user)

                if (user) {
                    // Redirect to the wanted route if any or else to home
                    router.replace(router.currentRoute.params.wantedRoute || 
                        { name: 'home' })
                }
            } catch (e) {
                console.warn(e)
            }
        },

        logout ({ commit }) {
            commit('user', null)

            $fetch('logout')

            // If the route is private
            // We go to the login screen
            if (router.currentRoute.matched.some(r => r.meta.private)) {
                router.replace({ name: 'login', params: {
                    wantedRoute: router.currentRoute.fullPath,
                }})
            }
        },
    },
})

export default store