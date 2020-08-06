<template>
    <div class="location-info" v-if="currentPost">
        <!-- Place -->
        <googlemaps-place-details
            v-if="currentPost.placeId"
            :request="{
                placeId: currentPost.placeId
                }">
            <PlaceDetails
                slot-scope="props"
                v-if="props.results"
                :name="props.results[1].PlaceDetails.name"
                :address="props.results[0].formatted_address"/>
        </googlemaps-place-details>
    </div>
    <div v-else></div>
</template>

<script>
import PlaceDetails from './PlaceDetails'
import { createNamespacedHelpers } from 'vuex'

// posts module
const {
    mapGetters: postsGetters,
} = createNamespacedHelpers('posts')

export default {
    component: {
        PlaceDetails,
    },

    computed: postsGetters([
        'currentPost',
    ]),
}
</script>