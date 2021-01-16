import Vue from 'vue';
import Vuex from 'vuex';
import state from './stateJs';
import actions from './actionsJs';
import mutations from './mutationsJs';

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
});