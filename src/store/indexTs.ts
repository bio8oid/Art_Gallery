// import Vue from 'vue';
// import Vuex from 'vuex';
// import state from './state';
// import actions from './actions';
// import mutations from './mutations';

// export default new Vuex.Store({
//    state,
//    mutations,
//    actions,
// });



/// ============ /// =========== ///



// store.ts
import Vue from "vue";
import Vuex from "vuex";
import { createDirectStore } from "direct-vuex";

// import module from "./module"

import combo from './combo';
// import state from './state';
// import actions from './actionsJs';
// import mutations from './mutationsJs';

Vue.use(Vuex)

const { store, moduleMutationContext, moduleActionContext } = createDirectStore({
   modules: {
      // state,
      // actions,
      // mutations
      combo
   }
})// Export the direct-store instead of the classic Vuex store.
export default store// The following exports will be used to enable types in the
// implementation of actions.
export { moduleMutationContext, moduleActionContext } // The following lines enable types in the injected store '$store'.
export type AppStore = typeof store
declare module "vuex" {
   interface Store<S> {
      direct: AppStore
   }
}