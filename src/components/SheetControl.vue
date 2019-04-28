<template>
    <div>
    </div>
</template>

<script>
import Sheet from '@/model/SheetBuilder'
import {mapState} from 'vuex'

export default {
    name: 'SheetControl',
    data() {
        return {
            dataSheets: null,
            showSettingsModal: false,
        }
    },

    computed: {
        ...mapState(['images']),
    },

    methods: {
        async generate() {
            let sheet = new Sheet(this.sheetItemWidth, this.sheetItemVerticalSpace, this.sheetItemHorizontalSpace);
            const loadingComponent = this.$loading.open();
            this.dataSheets = await sheet.build(this.images);
            this.$store.dispatch('GENERATED_SHEETS', this.dataSheets);
            loadingComponent.close();
        }            
    }
}
</script>

<style scoped>
#buildButton {
    position: fixed;
    bottom: 1em;
    right: 1em;
}
</style>
