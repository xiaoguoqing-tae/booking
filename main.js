import Vue from 'vue'
import App from './App'
import store from './store/index.js'
require('./utils/plugins.js')
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'

Vue.mixin({
	computed:{
		lang(){
			return this.$store.state.lang
		},
		themeColor(){
			return this.$store.state.themeColor
		}
	}
})
const app = new Vue({
	store,
    ...App
})
app.$mount()
