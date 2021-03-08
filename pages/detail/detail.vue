<template>
	<view>
		<view class="navbar" :style="{background:themeColor.color}">
			<view class="nav-item" @tap="back">
				<image src="../../static/left_arrow.png"></image>
			</view>
			<view class="nav-item">
				<span :class="'iconfont'+' '+infodata.url" style="background: #FFFFFF;border-radius: 50%;padding: 10rpx;"></span>
				<span style="color: #FFFFFF;font-weight: bold;">{{infodata.type}}</span>
			</view>
			<view class="nav-item">
				<span>分享</span>
			</view>
		</view>
		<view class="content">
			<u-cell-group>
				<u-cell-item title="类别" :value="infodata.mark=='income'?'收入':'支出'" :arrow="false"></u-cell-item>
				<u-cell-item title="金额" :value="infodata.money>0?infodata.money:-(infodata.money)" :arrow="false"></u-cell-item>
				<u-cell-item title="日期" :value="infodata.date" :arrow="false"></u-cell-item>
				<u-cell-item title="备注" :value="infodata.text" :arrow="false"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="btn">
			<view @tap="edit">编辑</view>
			<view @tap="del">删除</view>
		</view>
		<u-modal v-model="show" :content="content" show-cancel-button=true @confirm="deletedata"></u-modal>
	</view>
</template>

<script>
	import {callCloudFunction,getUserOpenid,change} from "../../utils/public_util.js"
	export default {
		data() {
			return {
				infodata:{},
				show:false,
				content:"删除后数据将不可恢复"
			};
		},
		onLoad() {
			 const value = uni.getStorageSync('infodata');
			 this.infodata = JSON.parse(value)
			 console.log(this.infodata)
		},
		methods:{
			back(){
				uni.navigateBack()
				const value = uni.getStorageSync('detailinfo');
				if (value) {
					uni.removeStorageSync('detailinfo');
				}
			},
			del(){
				this.show = true
			},
			deletedata(){
				callCloudFunction('money_del', this.infodata, (res) => {
					uni.showToast({
						icon: "none",
						title: '操作成功',
						duration: 2000
					});
					uni.removeStorageSync('detailinfo');
					var pages = getCurrentPages();//当前页
					var beforePage = pages[pages.length - 2];//上个页面
					beforePage.$vm.getData()
					uni.navigateBack()
				});
			},
			edit(){
				uni.setStorageSync('detailinfo', JSON.stringify(this.infodata));
				uni.navigateTo({
					url:"../booking/booking"
				})
			}
		}
	}
</script>

<style lang="scss">
.navbar{
	width: 100%;
	height: 250rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:var(--status-bar-height) 20rpx 10rpx 20rpx;
	.nav-item{
		width: 20%;
		height: 150rpx;
		padding-top: 10rpx;
		image{
			width: 50rpx;
			height: 40rpx;
		}
	}
	.nav-item:nth-child(2){
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.nav-item:nth-child(3){
		display: flex;
		flex-direction: row-reverse;
	}
}
.btn{
	width: 100%;
	height: 120rpx;
	position: fixed;
	bottom: 0;
	background: #FFFFFF;
	display: flex;
	justify-content: center;
	align-items: center;
	view{
		width: 45%;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
	}
	view:nth-child(1){
		border-right: 2px solid #C8C9CC;
	}
}
</style>
