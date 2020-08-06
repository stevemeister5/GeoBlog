import Vue from 'vue'
import Vuex from 'vuex'

import maps from './maps'
import posts from './posts'


Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
    state () {
        return {
            user: null,
        }
    },

    modules: {
        maps,
        posts,
    },

    mutations: {
        user: (state, user) => {
            state.user = user
        },
    },
    getters: {
        user: state => state.user,

        userPicture: (state, getters) => {
            const user = getters.user
            if (user) {
                const photos = user.profile.photos
                if (photos.length !== 0) {
                    return photos[0].value
                }
            }
        },
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
                    this.dispatch('logged-in')
                }
            } catch (e) {
                console.warn(e)
            }
        },

        async init ({ dispatch }) {
            await dispatch('login')
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