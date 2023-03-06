import { createStore } from 'vuex'
import user from './user'
import site from './site'

export const store = createStore({
    modules: { user, site },
})
