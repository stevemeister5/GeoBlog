<script>
import { createNamespacedHelpers } from 'vuex'

import LocationInfo from './LocationInfo'
import CreatePost from './CreatePost'
import NoContent from './NoContent'
import PostContent from './PostContent'

// posts module
const {
    mapGetters: postsGetters,
    mapActions: postsActions
} = createNamespacedHelpers('posts')

export default {
    computed: {
        ...postsGetters([
            'draft',
            'currentPost',
        ]),

        cssClass () {
            return [
                'blog-content',
                {
                    'has-content': this.currentPost,
                },
            ]
        },
    },

    render (h) {
        let Content
        if (!this.currentPost) {
            Content = NoContent
        } else if (this.draft) {
            Content = CreatePost
        } else {
            Content = PostContent
        }

        return <div class={this.cssClass}>
                <LocationInfo />
                <Content />
            </div>
    },

}

</script>