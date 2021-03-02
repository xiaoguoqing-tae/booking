<template>
	<view class="index-content">
		<view class="index-nav" :style="{background:themeColor.color}">
			<view class="date" @tap="chooseDate">{{dateselect}}</view>
			<view class="info">
				<view class="item">
					<view class="txt">{{inmoney}}</view>
					<view class="txt">收入</view>
				</view>
				<view class="item">
					<view class="txt">{{outmoney}}</view>
					<view class="txt">支出</view>
				</view>
			</view>
		</view>
		<view class="index-main">
			<view class="main-item" v-for="(item,index) in datalist" :key="index">
				<view class="item-time">{{item.date}}——支出:{{item.total}}</view>
				<view class="item-event" v-for="(i,idx) in item.data" :key="idx">
					<view class="event-info">
						<span :class="'iconfont'+' '+i.url+' '+'icon'"></span>		
						<span>{{i.text}}</span>
					</view>
					<view v-if="i.mark=='expenditure'">{{i.money}}</view>
					<view v-if="i.mark=='income'">+{{i.money}}</view>
				</view>
			</view>
		</view>
		<u-select v-model="show" mode="mutil-column" :list="list" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	import {callCloudFunction,getUserOpenid,change} from "../../../utils/public_util.js"
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
				datalist:[],
				dateselect:"",
				outmoney:0,
				inmoney:0
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
			let ny = this.date.split('-');
			this.dateselect = ny[0]+'-'+ny[1]
			
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
					let data = res.data
					for(let i=0;i<data.length;i++){
						if(data[i].mark == "expenditure"){
							this.outmoney+= (-data[i].money)
						}else{
							this.inmoney+= (data[i].money)
						}
						data[i].date1 = this.$u.timeFormat(data[i].date, 'yyyy-mm-dd');
					}
					this.datalist = change(data)
					for(let i=0;i<this.datalist.length;i++){
						let total = 0
						for(let j=0;j<this.datalist[i].data.length;j++){
							total+=(-this.datalist[i].data[j].money)
						}
						this.datalist[i].total = total
					}
					console.log(this.datalist)
				})
			},
			confirm(e){
				this.dateselect = e[0].value+'-'+e[1].value
				let yms = this.date.split('-');
				console.log(yms)
				let startDay = 1; //本月第一日
				let endDay = new Date(e[0].value,e[1].value, 0).getDate(); // 本月最后一天
				callCloudFunction('money_query', {
					openid: getUserOpenid(),
					startDate: new Date(yms[0], (e[1].value)-1, startDay, 0, 0, 0),
					endDate: new Date(yms[0], (e[1].value)-1, endDay, 23, 59, 59)
				}, (res) => {
					let data = res.data
					for(let i=0;i<data.length;i++){
						data[i].date1 = this.$u.timeFormat(data[i].date, 'yyyy-mm-dd');
					}
					this.datalist = change(data)
					for(let i=0;i<this.datalist.length;i++){
						let total = 0
						for(let j=0;j<this.datalist[i].data.length;j++){
							total+=(-this.datalist[i].data[j].money)
						}
						this.datalist[i].total = total
					}
					console.log(this.datalist)
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
		.index-main{
			width: 100%;
			color: #000000;
			display: flex;
			flex-direction: column;
			.main-item{
				width: 100%;
				padding: 20rpx;
				background: #FFFFFF;
				margin-bottom: 10rpx;
				display: flex;
				flex-direction: column;
				.item-time{
					padding: 15rpx;
					border-bottom: 1px solid #C8C9CC;
				}
				.item-event{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx;
					.event-info{
						display: flex;
						align-items: center;
						.icon{
							font-size: 20px;
						}
					}
				}
			}
		}
	}
</style>
