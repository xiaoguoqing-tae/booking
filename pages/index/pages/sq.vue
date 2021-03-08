<template>
	<view class="content">
		<view class="solid-bottom nav" :style="{background:themeColor.color}">
				泰会记
		</view>
		<tabbar :color="themeColor.color" :colorlist="3" @tabbarChange="tabbarChange"></tabbar>
	</view>
</template>

<script>
	import {
		ColorList
	} from '../theme.js'
	import tabbar from "../../../components/tabbar.vue";
	let _self
	export default {
		data() {
			return {
				tablist:[{
					"pagePath": "./index",
					"text": "明细"
				}, {
					"pagePath": "./chart",
					"text": "图表"
				},
				{
					"pagePath": "./sq",
					"text": "社区"
				}, {
					"pagePath": "./mine",
					"text": "我的"
				}, {
					"pagePath": "../../booking/booking",
					"text": "记账"
				}]
			}
		},
		components:{tabbar},
		mounted() {
			
		},
		methods: {
			tabbarChange(i){
				console.log(i)
				if(i==4){
					uni.navigateTo({
						url:this.tablist[i].pagePath,
						animationType: "slide-in-bottom",
						animationDuration: 2000
					})
				}else{
					uni.switchTab({
						url:this.tablist[i].pagePath,
						animationType: "slide-in-bottom",
						animationDuration: 2000
					})
				}
			}
		}
	}
</script>

<style scoped>
	.nav{
		padding-top:var(--status-bar-height);
		width: 100%;
		color: #FFFFFF;
		font-size: 16px;
		text-align: center;
	}
</style>

