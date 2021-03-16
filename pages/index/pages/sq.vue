<template>
	<view class="content">
		<view class="solid-bottom nav" id="nav" :style="{background:themeColor.color}">
				泰会记
		</view>
		<view class="u-content">
			<u-parse :html="content" :tag-style="style"></u-parse>
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
				}],
				// height:"",
				// navheight:"",
				content:`
					<h1>致富之道</h1>
					<p>适合普通人，特别是小白理财的渠道实际上不是很多，如果是正规渠道可以看到的，大概常见的只有银行理财、股票、基金、债券、黄金等。</p>
					<p>首先需要明确，理财不是投资，理财是理生活，怎么花钱，花什么钱，怎样规划才能实现自己的财务小目标，这些都是理财的一部分。而学习理财的基础是构建理财思维，就像建房子一样，你得先把结构图画出来，才能确切地知道应该从哪里开始入手。但这是重点，也是难点。微微曾经也是小白，对于小白刚刚入门时，因为不得要领、频频踩坑的痛苦，可以说是感受颇深。</p>
					<img src="../../../static/1.jpg"/>
					<h3>终极干货</h3>
					<div>1.将三个月生活费买入货币基金，日常消费用信用卡。</div>
					<div>2.开始为自己购买意外与重疾险，并逐步调整至最优保障。</div>
					<div>3.增量资金：拿出工资的20%-30%去做基金定投，可以关注且慢管家买入低估值的指数基金，也可关注银行螺丝钉（公众号：定投十年赚十倍），进行指数基金定投。更重要的是通过学习，一步步弄懂投资理财的本质。也建议大家通过学习（艾财学堂小白理财训练营），一步步弄懂投资理财的本质。</div>
					<div>4.存量资金可以选择小比例购买优质纯债基。</div>
					<img src="../../../static/3.jpg"/>
					<p>如何挑选基金？如何判断基金的潜力？ </p>
					<h4>最后，给大家推荐几本理财书籍，打开你的财富思维：</h4>
					<p>财商入门：
							《小狗钱钱》《管道的故事》《管道的故事》《穷爸爸富爸爸》《邻家的百万富翁》

						财富思维：
							《财富自由之路》《有钱人和你想的不一样》《财务自由之路》

						理财实操：
							《力哥说理财系列》《指数基金投资指南》</p>
				`,
				style:{
					h1:'text-align:center',
					p:'text-indent: 2em;'
				}
			}
		},
		components:{tabbar},
		onLoad() {
			// const res = uni.getSystemInfoSync();
			// console.log(res.windowHeight)
			// this.height = 300
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
		position: sticky;
		top: 0;
	}
	.u-content {
			margin-bottom: 150rpx;
			color: $u-content-color;
			font-size: 30rpx;
			/* line-height: 1.8; */
	}
</style>

