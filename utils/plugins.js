import Vue from 'vue'
import store from '../store';
// uni中的store不需要注册到main.js的 new Vue 中
Vue.prototype.$store = store;

//toast封装
Vue.prototype.$toast = (title,duration = 1500)=>uni.showToast({
	icon:'none',
	title,
	duration
})

//封装路由跳转
Vue.prototype.$router = (url)=> uni.navigateTo({
	url:'/pages'+url,
	animationType:"slide-in-left",
	animationDuration:800
})
Vue.prototype.$switchTab = (url) =>uni.switchTab({
	url:'pages'+url
})
Vue.prototype.$relaunch = (url) => uni.reLaunch({
	url:'pages'+url
})

//封装云函数
Vue.prototype.$uniCloud = async (name,data) => {
	uni.showLoading()
		try{
			let res = await uniCloud.callFunction({
				name,
				data
			})
			return res
		} catch(e){
			return e
		}finally{
			uni.hideLoading()
		}
}
