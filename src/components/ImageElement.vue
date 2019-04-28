<template>
    <div class="card">
        <div class="card-image">
            <figure class="image">
                <img :src="image.base64">
            </figure>
        </div>
        <div class="buttons">
            <b-button type="is-info is-rounded" @click="editImage">
                <b-icon icon="pencil" size="is-small"></b-icon>
            </b-button>
            <b-button type="is-danger is-rounded" @click="removeImage">
                <b-icon icon="delete" size="is-small"></b-icon>
            </b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ImageElement",
    props: ["image",],

    methods: {
        removeImage: function () {
            this.$store.dispatch("REMOVE_IMAGE", this.image);
        },

        editImage: function() {
            let image = this.image;
            this.$router.push({
                name:'edit', 
                params: {
                    image
                }
            });
        }
    },
}

document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});
</script>

<style scoped>
div {
    position: relative;
    margin: 0.5em;
}

.buttons {
    position: absolute;
    top: 0.4em;
    right: 0.4em;
}

img {
    max-height: 15em;
}
</style>
