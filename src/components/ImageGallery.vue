<template>
    <div class="tile is-ancestor">
        <ImageElement v-for="image in images" :key="images.indexOf(image)" :image="image" />
    </div>
</template>

<script>
import {mapState} from 'vuex'
import ImageElement from './ImageElement'

export default {
    name: "ImageGallery",
    components: {
        ImageElement,
    },
    
    computed: {
        ...mapState(['images']),
    },
}
</script>

<style scoped>
.is-ancestor {
  flex-wrap: wrap;
}

.tile {
  margin: 0.3em;
}
</style>
