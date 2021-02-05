<template>
	<view class="index-content">
		<view class="index-nav" :style="{background:themeColor.color}">
			<view class="date" @tap="chooseDate">2020-12</view>
			<view class="info">
				<view class="item">
					<view class="txt">200</view>
					<view class="txt">收入</view>
				</view>
				<view class="item">
					<view class="txt">700</view>
					<view class="txt">支出</view>
				</view>
			</view>
		</view>
		<u-select v-model="show" mode="mutil-column" :list="list" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	import {callCloudFunction,getUserOpenid} from "../../../utils/public_util.js"
	export default {
		data() {
			return {
				show: false,
				date:"",
				list: [
					[{
							value: '2021',
							label: '2021'
						},
						{
							value: '2022',
							label: '2022'
						},
						{
							value: '2023',
							label: '2023'
						}
					],
					[],
				],
			};
		},
		created() {
			let obj
			for(let i=0;i<12;i++){
				if(i<9){
					obj = {
						value: '0'+(i+1),
						label: '0'+(i+1)
					}
				}else{
					obj = {
						value: String(i+1),
						label: String(i+1)
					}
				}	
				this.list[1].push(obj)
			}
		},
		mounted() {		
			var myDate = new Date();
			var year = myDate.getFullYear();
			var month = myDate.getMonth();
			var m = month + 1;
			if (m.toString().length == 1) {
				m = "0" + m;
			}
			this.date = year + '-' + m;
			
			this.getData()
		},
		methods: {
			chooseDate(){
				this.show = true
			},
			getData(){
				let yms = this.date.split('-');
				console.log(yms)
				let startDay = 1; //本月第一日
				let endDay = new Date(yms[0], yms[1], 0).getDate(); // 本月最后一天
				callCloudFunction('money_query', {
					openid: getUserOpenid(),
					startDate: new Date(yms[0], new Number(yms[1])-1, startDay, 0, 0, 0),
					endDate: new Date(yms[0], new Number(yms[1])-1, endDay, 23, 59, 59)
				}, (res) => {
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index-content {
		width: 100%;
		height: 100%;
		color: #FFFFFF;
		font-weight: 700;

		.index-nav {
			width: 100%;
			display: flex;
			padding: 20upx;

			.date {
				width: 30%;
				display: flex;
				align-items: center;
			}

			.info {
				flex: 1;
				display: flex;

				.item {
					display: flex;
					flex-direction: column;
					width: 50%;
					height: 100%;

					.txt {
						text-align: center;
					}
				}
			}
		}
	}
</style>
