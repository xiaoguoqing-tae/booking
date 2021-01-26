<template>
	<view class="cu-bar tabbar bg-black" style="position: fixed;bottom: 0;left: 0;width:100%;">
		<view class="action text-gray" :style="{'color':colorlist[0]?color:''}" @tap="tabicon(0)">
			<view class="cuIcon-homefill"></view> 明细
		</view>
		<view class="action text-gray" :style="{'color':colorlist[1]?color:''}" @tap="tabicon(1)">
			<view class="cuIcon-similar"></view> 图表
		</view>
		<view class="action text-gray add-action" @tap="tabicon(4)">
			<button class="cu-btn cuIcon-add shadow" :style="{'background':color}"></button>
			记账
		</view>
		<view class="action text-gray" :style="{'color':colorlist[2]?color:''}" @tap="tabicon(2)">
			<view class="cuIcon-cart">
				<view class="cu-tag badge">99</view>
			</view>
			社区
		</view>
		<view class="action text-gray" :style="{'color':colorlist[3]?color:''}" @tap="tabicon(3)">
			<view class="cuIcon-my">
				<view class="cu-tag badge"></view>
			</view>
			我的
		</view>
	</view>
</template>

<script>
	export default {
		props:['color'],
		data() {
			return {
				colorlist:[true,false,false,false],
			};
		},
		mounted() {
			console.log(this.color)
		},
		methods:{
			tabicon(i){
				if(i!=4){
					for(let j=0;j<this.colorlist.length;j++){
						this.$set(this.colorlist,j,false)
					}
					this.$set(this.colorlist,i,true)
				}
				this.$emit("tabbarChange",i)
			}
		}
	}
</script>

<style lang="scss">

</style>
