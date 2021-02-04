import Vue from 'vue'
import App from './App'
import store from './store/index.js'
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'
import uView from "uview-ui";
Vue.use(uView);
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
