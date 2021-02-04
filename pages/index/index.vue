<template>
	<view class="content">
		<view class="solid-bottom nav" :style="{background:themeColor.color}">
				泰会记
		</view>
		<index v-if="urlpage=='0'"></index>
		<chart v-if="urlpage=='1'"></chart>
		<sq v-if="urlpage=='2'"></sq>
		<mine @loginout="loginout" v-if="urlpage=='3'"></mine>
		<tabbar :color="themeColor.color" @tabbarChange="tabbarChange"></tabbar>
	</view>
</template>

<script>
	import tabbar from "../../components/tabbar.vue";
	import index from "./pages/index.vue";
	import mine from "./pages/mine.vue";
	import sq from "./pages/sq.vue";
	import chart from "./pages/chart.vue";
	export default {
		data() {
			return {
				urlpage:0
			}
		},
		components:{tabbar,index,mine,sq,chart},
		onLoad() {
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: this.themeColor.color,
			    animation: {
				duration: 400,
				timingFunc: 'easeIn'
			    }
			})
			let userInfo = uni.getStorageSync('userInfo');
			if (userInfo == null || userInfo == '' || userInfo.openid == null) {
				//没登录情况
				uni.navigateTo({
					url: '/pages/login/login'
				});
				return;
			}
		},
		methods: {
			tabbarChange(i){
				if(i==4){
					uni.navigateTo({
						url:"../booking/booking",
						animationType: "slide-in-bottom",
						animationDuration: 2000
					})
				}else{
					this.urlpage=i
				}
			},
			loginout(e){
				uni.reLaunch({
					url: '../login/login'
				});
			}
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		.nav{
			padding-top:var(--status-bar-height);
			width: 100%;
			color: #FFFFFF;
			font-size: 16px;
			text-align: center;
		}
	}
</style>
