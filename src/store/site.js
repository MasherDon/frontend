import { ip } from "@/assets/settings website";

export default {
    namespaced: true,
    state: {
        settings: {
            ip: ip,
        }
    },
    getters: {
        getSettings(state) {
            return state.settings
        }
    },
}
