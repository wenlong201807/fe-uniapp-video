import Vue from 'vue'
import Vuex from 'vuex'
import ApplyTranscribe from './modules/ApplyTranscribe'
import User from './modules/User'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        ApplyTranscribe,
        User,
    },
})
export default store
