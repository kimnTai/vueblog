import {createStore} from 'vuex'


export default createStore({
    state: {
        token: '',
        userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
    },
    mutations: {
        // set
        SET_TOKEN(state, token) {
            state.token = token
            localStorage.setItem("token", token)
        },
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
        },
        // delete
        REMOVE_INFO(state) {
            // console.log(state)
            state.token = ''
            state.userInfo = {}
            localStorage.setItem("token", "")
            sessionStorage.setItem("userInfo", JSON.stringify(""))
        },
    },
    getters: {
        // get
        getUser: state => {
            return state.userInfo
        }
    },
    actions: {},
    modules: {}
})
