<template>
    <nav class="navbar is-fixed-bottom is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="navbar-item">
                <Settings />
            </div>

            <div class="navbar-item">
                <UploadImage />
            </div>

            <div class="navbar-item" v-if="$store.state.images.length > 0">
                <b-button type="is-success" icon-left="wrench" rounded
                          @click="$emit('build-sheet')">
                    <span class="hide-on-mobile">Genera</span>
                </b-button>
            </div>
        </div>
    </nav>
</template>

<script>
import UploadImage from '@/components/UploadImage.vue'
import Settings from '@/components/Settings.vue'

export default {
    name: 'ControlHeader',
    components: {
        UploadImage,
        Settings,
    },
}
</script>

<style scoped>
@media only screen and (max-width: 360px) {
    .hide-on-mobile {
        display: none;
    }
}
</style>
