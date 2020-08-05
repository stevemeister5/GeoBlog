export default {
    namespaced: true,

    state () {
        return {
            // New post being created
            draft: null,
            // Bounds of the last fetching
            // to prevent refetching
            mapBounds: null,
            // Posts fetched in those map bounds
            posts: [],
            // ID of the selected post
            selectedPostId: null,
        }
    },

    getters: {
        draft: state => state.draft,
        posts: state => state.posts,
        // The id field on posts is '_id' (MongoDB style)
        selectedPost: state => state.posts.find(p => p._id === state.selectedPostId),
        // The draft has more priority than the selected postt
        currentPost: (state, getters) => state.draft || getters.selectedPost,
    },

    mutations: {
        addPost (state, value) {
            state.posts.push(value)
        },

        draft (state, value) {
            state.draft = value
        },

        posts (state, { posts, mapBounds }) {
            state.posts = posts
            state.mapBounds = mapBounds
        },

        selectedPostId (state, value) {
            state.selectedPostId = value
        },

        updateDraft (state, value) {
            Object.assign(state.draft.value)
        },
    },

    actions: {
        clearDraft ({ commit }) {
            commit('draft', null)
        },
        createDraft ({ commit }) {
            // Default values
            commit('draft', {
                title: '',
                content: '',
                positions: null,
                placeId: null,
            })
        },

        setDraftLocation ({ dispatch, getters }, { position, placeId }) {
            if (!getters.draft) {
                dispatch('createDraft')
            }
            dispatch('updateDraft', {
                position,
                placeId,
            })
        },

        updateDraft ({ dispatch, commit, getters }, draft) {
            commit('updateDraft', draft)
        },

        async createPost ({ commit, dispatch }, draft) {
            const data = {
                ...draft,
                // We need to get the objects form
                position: draft.position.toJSON(),
            }

            // REquest
            const result = await $fetch('posts/new', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            dispatch('clearDraft')

            // Update the posts list 
            commit('addPost', result)
            dispatch('selecPost', result._id)
        },

        async selectPost ({ commit }, id) {
            commit('selectedPostId', id)
            // TODO fetch the post details (comments, etc)
        },
    },
}