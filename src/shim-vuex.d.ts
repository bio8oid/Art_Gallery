import { ComponentCustomProperties } from 'vue'
import { Store } from './store/index'
import { StateTypes } from './store/types'


declare module '@vue/runtime-core' {

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<StateTypes>
    }
}
