<template>
	<view class="content">
		<index v-if="urlpage=='0'"></index>
		<chart v-if="urlpage=='1'"></chart>
		<sq v-if="urlpage=='2'"></sq>
		<mine v-if="urlpage=='3'"></mine>
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
				urlpage:""
			}
		},
		components:{tabbar,index,mine,sq,chart},
		onLoad() {
			
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
			}
		}
	}
</script>

<style>
	
</style>
