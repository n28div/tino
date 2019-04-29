<template>
    <div>
        <b-field>
            <b-button type="is-dark" @click="showSettingsModal=true" rounded icon-left="settings">
                <span class="hide-on-mobile">Impostazioni</span>
            </b-button>
        </b-field>

        <b-modal :active.sync="showSettingsModal">
            <section class="section">
                <div class="card">
                    <div class="card-content">
                        <div class="content">
                            <b-field label="Larghezza bigliettino (mm)">
                                <b-input type="number" v-model="sheetItemWidth"></b-input>
                            </b-field>
                            <b-field label="Margine orizzontale (mm)">
                                <b-input type="number" v-model="sheetHorizontalSpace"></b-input>
                            </b-field>
                            <b-field label="Margine verticale (mm)">
                                <b-input type="number" v-model="sheetVerticalSpace"></b-input>
                            </b-field>
                        </div>
                    </div>
                </div>    
            </section>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'Settings',
    data() {
        return {
           showSettingsModal: false, 
        }
    },
    computed: {
        sheetItemWidth: {
            get: function() { return this.$store.state.sheet.itemSizeMm },
            set: function (value) {
                try {
                    this.$store.dispatch('SET_SHEET_SIZE', value);
                } catch (e) {
                    this.$toast.open({
                        duration: 3000,
                        message: e.message,
                        position: 'is-bottom',
                        type: 'is-danger'
                    });
                }
            }
        },
        sheetHorizontalSpace: {
            get: function() { return this.$store.state.sheet.horizontalSpaceMm },
            set: function (value) {
                try {
                    this.$store.dispatch('SET_HORIZONTAL_SIZE', value);
                } catch (e) {
                    this.$toast.open({
                        duration: 3000,
                        message: e.message,
                        position: 'is-bottom',
                        type: 'is-danger'
                    });
                }
            }
        },
        sheetVerticalSpace: {
            get: function() { return this.$store.state.sheet.verticalSpaceMm },
            set: function (value) {
                try {
                    this.$store.dispatch('SET_VERTICAL_SIZE', value);
                } catch (e) {
                    this.$toast.open({
                        duration: 3000,
                        message: e.message,
                        position: 'is-bottom',
                        type: 'is-danger'
                    });
                }
            }
        },
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
