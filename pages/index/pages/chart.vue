<template>
	<view class="content">
		<scroll-view id="tab" scroll-x class="nav text-center" :style="{background:themeColor.color}">
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
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaLineA = null;
	var canvaPie = null;
	export default {
		data() {
			return {
				tab: ['折线图', '饼状图'],
				TabCur: 0,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				isshow:true,
				chartData: {
					categories: [],
					series: [{
						name: '11',
						data: [40, 35.5, 45, 50, 6, 99, 40, 39, 12, 18.9, 2.8, 55]
					}]
				},
				chartData1: {
				  "series": [{
					"name": "一班",
					"data": 50
				  }, {
					"name": "二班",
					"data": 30
				  }, {
					"name": "三班",
					"data": 20
				  }, {
					"name": "四班",
					"data": 18
				  }, {
					"name": "五班",
					"data": 8
				  }]
				}

			}
		},
		mounted() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getMonthDay(2021, 1)
			// this.getServerData();
			this.showLineA("canvasLineA", this.chartData);
			this.showPie("canvasPie",this.chartData1)

		},
		methods: {
			// getServerData(){
			// 	uni.request({
			// 		url: 'https://www.ucharts.cn/data.json',
			// 		data:{
			// 		},
			// 		success: function(res) {
			// 			console.log(res.data.data)
			// 			let LineA={categories:[],series:[]};
			// 			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			// 			LineA.categories=res.data.data.LineA.categories;
			// 			LineA.series=res.data.data.LineA.series;
			// 			_self.showLineA("canvasLineA",LineA);
			// 		},
			// 		fail: () => {
			// 			_self.tips="网络错误，小程序端请检查合法域名";
			// 		},
			// 	});
			// },
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.isshow = !this.isshow
			},
			getMonthDay(year, month) {
				let days = new Date(year, month + 1, 0).getDate()
				for (let i = 0; i < days; i++) {
					this.chartData.categories.push(i + 1)
				}
				console.log(this.chartData.categories)
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
						max: 120,
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
					text: '02-01:59元   动车票',
					color: '#2fc25b'
				}, {
					text: '自定义2：值2',
					color: '#facc14'
				}, {
					text: '自定义3：值3',
					color: '#f04864'
				}];
				canvaLineA.showToolTip(e, {
					textList: textList
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
						return item.name + ':' + item.data
					}
				});
			},
		}
	}
</script>

<style>
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
</style>
