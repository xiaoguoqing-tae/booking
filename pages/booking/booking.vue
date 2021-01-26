<template>
	<view class="content">
		<view id="nav" class="cu-bar bg-white solid-bottom" style="width: 100%;">
			<view class="action">
				<text></text>
			</view>
		</view>
		<scroll-view id="tab" scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index==TabCur?'cur':''" :style="{color:index==TabCur?themeColor.color:''}" v-for="(item,index) in tab" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
			<view class="cu-item" style="float: right;" @tap="cancel">取消</view>
		</scroll-view>
		<scroll-view class="scrollY" scroll-y="true" enable-flex="true" :style="{height:winHeight}">
			<view class="item-box" v-for="(item,index) in iconlist" :key="index" :id="'K'+index">
				<view class="item" @tap=callkeyboard(index) :style="{background:iconcolor[index]?themeColor.color:''}">
					<span :class="'iconfont'+' '+item.icon"></span>
				</view>
				<span>{{item.name}}</span>
			</view>
		</scroll-view>
		<keyboard id="keyboard" style="width: 100%" :style="{bottom:-keyHeight+'px'}"></keyboard>
	</view>
</template>

<script>
	import keyboard from "../../components/keyboard.vue"
	import {
		ColorList
	} from '../index/theme.js'
	export default {
		data() {
			return {
				tab:['支出','收入'],
				TabCur:0,
				iconlist:[
					{'icon':'icon-canyin','name':'餐饮'},{'icon':'icon-yundong','name':'运动'},{'icon':'icon-fushi','name':'服饰'},{'icon':'icon-lvxing','name':'旅行'},{'icon':'icon-shejiao','name':'社交'},{'icon':'icon-zhufang','name':'住房'},{'icon':'icon-lingshi','name':'零食'},{'icon':'icon-yule','name':'娱乐'},{'icon':'icon-xuexi','name':'学习'},{'icon':'icon-traffic','name':'交通'},{'icon':'icon-riyongpin','name':'日用品'},{'icon':'icon-yanjiu','name':'烟酒'},{'icon':'icon-tongxun','name':'通讯'},{'icon':'icon-changbei','name':'长辈'},{'icon':'icon-icon-test','name':'礼物'},{'icon':'icon-yiliao','name':'医疗'},{'icon':'icon-shuiguo','name':'水果'},{'icon':'icon-child','name':'孩子'},{'icon':'icon-chongwu','name':'宠物'},{'icon':'icon-gouwu','name':'购物'}
				],
				iconcolor:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
				winHeight:0,
				keyHeight:0,
				navHeight:0,
				tabHeight:0
			};
		},
		components:{keyboard},
		onLoad() {
			this.getScreenHeight()
			this.getHeight()	
			this.getNavHeight()
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getNavHeight(){
				var view0 = uni.createSelectorQuery().select("#nav")
				var view1 = uni.createSelectorQuery().select("#tab")
				view0.boundingClientRect((data)=>{
					this.navHeight = data.height
					console.log(data.height)
				}).exec()
				view1.boundingClientRect((data)=>{
					this.tabHeight = data.height
					console.log(data.height)
				}).exec()
			},
			getHeight(){
				var view = uni.createSelectorQuery().select("#keyboard")
				view.boundingClientRect((data)=>{
					this.keyHeight = data.height
					console.log(data.height)
				}).exec()
			},
			getScreenHeight(){
				uni.getSystemInfo({
				    success: (res)=> {
						this.winHeight = res.windowHeight
				    }
				});
			},
			callkeyboard(i){
				for(var j=0;j<this.iconcolor.length;j++){
					this.$set(this.iconcolor,j,false)
				}
				this.$set(this.iconcolor,i,true)
				if(this.keyHeight!=0){
					this.winHeight = (this.winHeight - this.keyHeight - this.navHeight - this.tabHeight)+'px'
					this.keyHeight = 0
				}	
			},
			change(){
				
			},
			cancel(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
.content,scroll-view{
	display: flex;
	flex-wrap: wrap;
	height: 100%;
	.item-box{
		width: 25%;
		padding: 10px;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.item{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: #DDDDDD;
		}
	}
}
.content{
	overflow-y: hidden;
}
#keyboard{
	position: fixed;
}
</style>
