<template>
    <div class="blog-map">
        <googlemaps-map
            ref="map"
            :center="center"
            :zoom="zoom"
            :options="mapOptions"
            @update:center="setCenter"
            @update:zoom="setZoom"
            @click="onMapClick"
            @idle="onIdle"
        >
            <!-- User Position -->
            <googlemaps-user-position
                @update:position="setUserPosition"
                />
            <!-- New post marker -->
            <googlemaps-marker
                v-for="post of posts"
                :key="post._id"
                :label="{
                    color: post === currentPost ? 'white' : 'black',
                    fontFamily: 'Material Icons',
                    fontSize: '20px',
                    text: 'face',
                }"
                :position="post.position"
                :z-index="5"
                    @click="selectPost(post._id)"
                >
            </googlemaps-marker>
        </googlemaps-map>
    </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'

// Vuex mappers
// maps module
const {
    mapGetters: mapsGetters,
    mapActions: mapsActions,
} = createNamespacedHelpers('maps')

// posts module
const {
    mapGetters: postsGetters,
    mapActions: postsActions,
} = createNamespacedHelpers('posts')

function mapOptions() {
    return {
        fullscreenControl: false,
    }
}

export default {
    data () {
        return {
            center: {
                lat: 48.8538302,
                lng: 2.2982161,
            },
            zoom: 15,
        }
    },

    
    computed: {

        ...mapsGetters([
            'center',
            'zoom',
        ]),
        ...postsGetters([
            'draft'
        ]),

        mapOptions () {
            return {
                fullscreenControl: false,
            }
        },
    },

    methods: {
        ...mapsActions([
            'setCenter',
            'setUserPosition',
            'setZoom',
        ]),

        ...postsActions([
            'setDraftLocation',
        ]),

        onMapClick (event) {
            this.setDraftLocation({
                position: event.latLng,
                placeId: event.placeId,
            })
        },
        onIdle () {
            this.setBounds(this.$refs.map.getBounds())
        },
    },

}
</script>