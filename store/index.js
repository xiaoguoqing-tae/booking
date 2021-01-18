import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制
let userlang = uni.getStorageSync('userlang');
var lang = ""
if(!userlang){
	const sys = uni.getSystemInfoSync()
	console.log(sys)
	userlang = sys.language;
}
if(userlang.substring(0,2)=='zh'){
	lang = require('../language/zh.js')
}else{
	lang = require('../language/en.js')
}

const store = new Vuex.Store({
	state:{
		lang:lang,
		themeColor: {
		  title: '嫣红',
		  name: 'red',
		  color: '#e54d42'
		}
	},
	mutations:{
		changeLang:function(state){
			uni.showActionSheet({
				itemList:['简体中文','English'],
				success(e) {
					if(e.tapIndex==0){
						lang = require("../language/zh.js")
					}else{
						lang = require("../language/en.js")
					}
					uni.setStorageSync('userlang',lang.langType)
					state.lang = lang
				}
			})
		},
		setThemeColor(state,val){
			state.themeColor = val
		}
	}
})
export default store