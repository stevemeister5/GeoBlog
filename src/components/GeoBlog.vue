
<script>
import AppMenu from './AppMenu'
import BlogMap from './BlogMap'
import BlogContent from './content/BlogContent'

export default {
    render (h) {
        return <div class="geo-blog">
            <AppMenu />
            <div class="panes">
                <BlogMap />
                <BlogContent />
            </div>
        </div>
    }
}
</script>