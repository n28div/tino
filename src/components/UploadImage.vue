<template>
    <b-field class="file is-block">
        <b-upload @input="uploadImage">
            <a class="button is-primary is-rounded">
                <b-icon icon="upload" />
                <span>Carica</span>
            </a>
        </b-upload>
    </b-field>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "UploadImage",
    methods: {
        ...mapActions(['addImageFile']),

        uploadImage: function(f) {
            this.$store.dispatch("UPLOAD_IMAGE", f);
        },
    }
}
</script>
