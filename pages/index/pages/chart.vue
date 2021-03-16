<template>
	<view class="content">
		<view class="solid-bottom nav" id="nav" :style="{background:themeColor.color}">
				泰会记
		</view>
		<scroll-view id="tab" scroll-x class="nav text-center" :style="{background:themeColor.color}">
			<view class="date" @tap="chooseDate">{{dateselect}}</view>
			<view class="cu-item" :class="index==TabCur?'cur':''" :style="{color:index==TabCur?'#FFFFFF':''}" style="color:#000000"
			 v-for="(item,index) in tab" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<view v-show="isshow" class="qiun-columns">
			<view class="qiun-charts">
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
			</view>
		</view>
		<view v-show="!isshow" class="qiun-columns">
			<view class="qiun-charts">
				<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
			</view>
		</view>
		<view class="detailinfo" :style="{height:useheight+'px'}">
			<h3>各项排行榜</h3>
			<view v-for="(item,index) in phlist" :key="index" class="info-box">
				<view v-if="item.total>0">支出——</view>
				<view v-if="item.total<0">收入——</view>
				<view></view>
				<view>
					<span :class="'iconfont'+' '+item.data[0].url"></span>
				</view>
				<view>
					{{item.type}}:
				</view>
				<view v-if="item.total>0" style="{font-weight: 500;font-size: 18px}">{{item.total}}</view>
				<view v-if="item.total<0" style="{font-weight: 500;font-size: 18px}">{{-item.total}}</view>
			</view>
		</view>
		<u-select v-model="show" mode="mutil-column" :list="list" @confirm="confirm"></u-select>
		<tabbar :color="themeColor.color" :colorlist="2" @tabbarChange="tabbarChange"></tabbar>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import {callCloudFunction,getUserOpenid,change,change1} from "../../../utils/public_util.js"
	import tabbar from "../../../components/tabbar.vue";
	var _self;
	var canvaLineA = null;
	var canvaPie = null;
	var chartData = {
					'categories': [],
					'info':["111"],
					'series': [{
						'name': '11',
						'data': []
					}]
				}
	export default {
		data() {
			return {
				useheight:"",
				phlist:[],
				show:false,
				tab: ['折线图', '饼状图'],
				TabCur: 0,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				isshow:true,
				dateselect:"",
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
				chartData1: {
				  "series": []
				},
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
			//日期
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
			
			//初始化
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getMonthDay()
			let yms = this.date.split('-');
			this.getServerData(yms[0],yms[1]);
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
			},
			getServerData(y,m){
				let startDay = 1; //本月第一日
				let endDay = new Date(y, m, 0).getDate(); // 本月最后一天
				callCloudFunction('money_query', {
					openid: getUserOpenid(),
					startDate: new Date(y, new Number(m)-1, startDay, 0, 0, 0),
					endDate: new Date(y, new Number(m)-1, endDay, 23, 59, 59)
				}, (res) => {
					let data = res.data
					for(let i=0;i<data.length;i++){
						data[i].date1 = this.$u.timeFormat(data[i].date, 'yyyy-mm-dd');
					}
					chartData.series[0].data = []
					for(let i=0;i<chartData.categories.length;i++){
						chartData.series[0].data.push(0)
					}
					this.datalist = change(data)
					this.datalist1 = change1(data)
					for(let i=0;i<this.datalist.length;i++){
						let total = 0
						for(let j=0;j<this.datalist[i].data.length;j++){
							total+=(-this.datalist[i].data[j].money)
						}
						this.datalist[i].total = total
						let index = this.datalist[i].date.split("-")[2]-1
						chartData.series[0].data[index] = total
					}
					this.chartData1.series = []
					let allmoney = 0
					for(let i=0;i<this.datalist1.length;i++){
						let total = 0
						for(let j=0;j<this.datalist1[i].data.length;j++){
							total+=(-this.datalist1[i].data[j].money)
							allmoney+= (-this.datalist1[i].data[j].money)
						}
						this.datalist1[i].total = total
					}
					for(let i=0;i<this.datalist1.length;i++){
						if(this.datalist1[i].total>0){
							let data = parseFloat(this.datalist1[i].total/allmoney)
							let obj = {
								'name':this.datalist1[i].type,
								'data':data,
								'money':this.datalist1[i].total
							}
							this.chartData1.series.push(obj)
						}		
					}
					this.showLineA("canvasLineA", chartData);
					this.showPie("canvasPie",this.chartData1)
					console.log(this.datalist1)
					this.phlist = this.datalist1.sort((a,b)=>{return b.total - a.total})
					this.getheight()
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				if(this.TabCur==0){
					this.isshow = true
				}else{
					this.isshow = false
				}
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				
			},
			getMonthDay() {
				let days = new Date().getDate()
				console.log(days)
				for (let i = 0; i < days; i++) {
					chartData.categories.push(i + 1)
				}
				console.log(chartData.categories)
			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: {
						show: false
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8,
						labelCount: 10
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 10,
						max: 200,
						format: (val) => {
							return val.toFixed(0) + '元'
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});

			},
			touchLineA(e) {
				let textList = [{
					text: '02-01: 动车票  59元 ',
					color: '#2fc25b'
				}, {
					text: '自定义2：值2',
					color: '#facc14'
				}, {
					text: '自定义3：值3',
					color: '#f04864'
				}];
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						console.log(item,category)
						return _self.date.split('-')[1] + '-' +category + ':' + item.data +'元'
					}
				});
			},
			showPie(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							lableWidth: 15
						}
					},
				});
			},
			touchPie(e) {
				canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.money+'元'
					}
				});
			},
			chooseDate(){
				this.show = true
			},
			confirm(e){
				this.dateselect = e[0].value+'-'+e[1].value
				this.getServerData(e[0].value,e[1].value)
			},
			//获取高度
			getheight(){
				const res = uni.getSystemInfoSync();
				let wheight = res.windowHeight
				var navheight
				var tabheight
				var chartheight
				console.log(wheight)
				var view1 = uni.createSelectorQuery().select("#nav")
				view1.boundingClientRect((data)=>{
					navheight = data.height
					console.log(navheight)
				}).exec()
				var view2 = uni.createSelectorQuery().select("#tab")
				view2.boundingClientRect((data)=>{
					tabheight = data.height
					console.log(tabheight)
				}).exec()
				var view3 = uni.createSelectorQuery().select("#canvasLineA")
				view3.boundingClientRect((data)=>{
					chartheight = data.height
					console.log(chartheight)
				}).exec()
				setTimeout(()=>{
					this.useheight = wheight - navheight - tabheight - chartheight - 60
					console.log(this.useheight)
				},500)		
			}
		}
	}
</script>

<style scoped lang="scss">
	.nav{
		padding-top:var(--status-bar-height);
		width: 100%;
		color: #FFFFFF;
		font-size: 16px;
		text-align: center;
	}
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.detailinfo{
		width: 100%;
		// height: 450rpx;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		.info-box{
			padding-left: 80rpx;
			background-color: #FFFFFF;
			margin-bottom: 10rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
	}
</style>
