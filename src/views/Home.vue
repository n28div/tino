<template>
  <section class="hero is-fullheight is-light">
    
    <div class="hero-head" v-if="generatedFiles.length > 0">
      <header class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <div class="navbar-item" v-for="gf in generatedFiles" :key="generatedFiles.indexOf(gf)">
              <b-button @click="downloadSheet(gf)" icon-left="download" type="is-primary" rounded>
                Bigliettino {{ generatedFiles.indexOf(gf) + 1 }}
              </b-button>
            </div>
          </div>
        </div>
      </header>
    </div>
  
    <div class="hero-body">
        <b-message :active.sync="mobileAlert" aria-close-label="Close message" class="hide-on-desktop" title="Attenzione" type="is-warning">
          Su uno smartphone tino potrebbe risultare lento, considerane l'utilizzo su un dispositivo diverso per performance migliori!
        </b-message>
      <ImageGallery />
    </div>

    <div class="hero-foot">
      <ControlHeader @build-sheet="buildSheet" />
    </div>
  </section>
</template>

<script>
import ImageGallery from '@/components/ImageGallery.vue'
import ControlHeader from '@/components/ControlHeader.vue'
import { mapState } from 'vuex';
import { saveAs } from 'file-saver';

export default {
  name: 'Home',
  components: {
    ControlHeader,
    ImageGallery,
  },
  data() {
    return {
      mobileAlert: true,
    }
  },
  computed: {
    ...mapState(['images', 'generatedFiles', 'sheet']),
  },
  methods: {
    buildSheet: async function() {
      let loading = this.$loading.open();
      let s = this.sheet;
      s.setImages(this.images);
      let files = await s.build();
      this.$store.dispatch('SET_GENERATED_FILES', files);
      loading.close();
    },
    downloadSheet: function(gf) {
      saveAs(gf, `bigliettino_${this.generatedFiles.indexOf(gf) + 1}.png`);
    } 
  },
}
</script>

<style scoped>
@media only screen and (min-width: 480px) {
    .hide-on-desktop {
        display: none;
    }
}
</style>

