<template>
    <section class="section">
        <div class="container">
            <div class="content">
                <div class="box">
                    <vue-cropper
                        ref="cropper"
                        :src="image.base64"
                        alt="Source Image"
                        :ready="cropperReady">
                    </vue-cropper>
                </div>
            
                <div class="buttons">
                    <b-button @click="$refs.cropper.rotate(90)" icon-left="phone-rotate-landscape" />
                    <b-button @click="$refs.cropper.rotate(-90)" icon-left="phone-rotate-portrait" />
                    <b-button @click="crop" icon-left="crop">Taglia</b-button>                    
                    <b-button @click="doneEditing" icon-left="check" type="is-success">Fatto</b-button>
                </div>
            </div>            
        </div>
    </section>
</template>

<script>
import VueCropper from 'vue-cropperjs';

export default {
    name: "Edit",
    components: {
        VueCropper,
    },
    props: ["image",],

    computed: {
        imageData: function() {
            let canvas = this.$refs.cropper.getCroppedCanvas();
            let b64data = canvas.toDataURL();
            return b64data;
        },
    },

    methods: {
        cropperReady() {
            let imageData = this.$refs.cropper.getImageData();
            this.$refs.cropper.setData({
                x: 0,
                y: 0,
                width: imageData.naturalWidth,
                height: imageData.naturalHeight
            });
        },

        crop() {
            this.$refs.cropper.replace(this.imageData);
        },

        doneEditing: function() {
            this.$store.dispatch('REPLACE_IMAGE_BASE64', {image: this.image, newBase64: this.imageData});
            this.$router.push({name: 'app'});
        },
    },
}
</script>

<style scoped>
.buttons {
    padding: 1em;
}
</style>
