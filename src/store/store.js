import Vuex from 'vuex'
import Vue from 'vue'
import ModelImage from '@/model/ModelImage'
import Sheet from '@/model/SheetBuilder'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        images: [],
        sheet: new Sheet(35, 10, 10),
        generatedFiles: [],
    },
    
    getters: {
    },
    
    mutations: {
        ADD_IMAGE(state, modelImage) {
            state.images.push(modelImage);
        },

        REMOVE_IMAGE(state, modelImage) {
            state.images = state.images.filter((img) => img.id !== modelImage.id);
        },

        UPDATE_IMAGE(state, newModelImage) {
            let image = state.images.find((img) => img.id === newModelImage.id);
            let idx = state.images.indexOf(image);
            state.images[idx] = newModelImage;
        },

        SET_SHEET_SIZE(state, val) {
            state.sheet.itemSize = val;
        },

        SET_HORIZONTAL_SPACE(state, val) {
            state.sheet.horizontalSpace = val;
        },

        SET_VERTICAL_SPACE(state, val) {
            state.sheet.verticalSpace = val;
        },

        SET_GENERATED_FILES(state, files) {
            state.generatedFiles = files;
        }
    },
  
    actions: {
        UPLOAD_IMAGE(context, file) {
            let mi = new ModelImage();
            mi.file = file;
            let fr = new FileReader();
            fr.onloadend = function () {
                let i = new Image();
                i.onload = function () {
                    mi.base64 = i.src;
                    context.commit("ADD_IMAGE", mi);
                }
                i.src = fr.result;
            }

            fr.readAsDataURL(file);
        },

        REMOVE_IMAGE(context, modelImage) {
            context.commit('REMOVE_IMAGE', modelImage);
        },

        REPLACE_IMAGE_BASE64(context, options) {
            let image = options.image;
            image.base64 = options.newBase64;
            context.commit('UPDATE_IMAGE', image);
        },

        SET_SHEET_SIZE(context, val) {
            context.commit('SET_SHEET_SIZE', val);
        },

        SET_HORIZONTAL_SPACE(context, val) {
            context.commit('SET_HORIZONTAL_SPACE', val);
        },

        SET_VERTICAL_SPACE(context, val) {
            context.commit('SET_VERTICAL_SPACE', val);
        },

        SET_GENERATED_FILES(context, files) {
            context.commit('SET_GENERATED_FILES', files);
        }
    }
});