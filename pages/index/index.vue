<template>
	<view class="content">
		<index v-if="urlpage=='0'"></index>
		<chart v-if="urlpage=='1'"></chart>
		<booking v-if="urlpage=='2'"></booking>
		<sq v-if="urlpage=='3'"></sq>
		<mine v-if="urlpage=='4'"></mine>
		<tabbar :color="themeColor.color" @tabbarChange="tabbarChange"></tabbar>
	</view>
</template>

<script>
	import tabbar from "../../components/tabbar.vue";
	import index from "./pages/index.vue";
	import mine from "./pages/mine.vue";
	import sq from "./pages/sq.vue";
	import booking from "./pages/booking.vue";
	import chart from "./pages/chart.vue";
	export default {
		data() {
			return {
				urlpage:""
			}
		},
		components:{tabbar,index,mine,sq,booking,chart},
		onLoad() {
			
		},
		methods: {
			tabbarChange(i){
				this.urlpage=i
			}
		}
	}
</script>

<style>
	
</style>
