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
		<scroll-view v-if="!isshow" class="scrollY" scroll-y="true" enable-flex="true" :style="{height:winHeight}">
			<view class="item-box" v-for="(item,index) in iconlist" :key="index" :id="'K'+index">
				<view class="item" @tap=callkeyboard(0,index) :style="{background:iconcolor[index]?themeColor.color:''}">
					<span :class="'iconfont'+' '+item.icon"></span>
				</view>
				<span>{{item.name}}</span>
			</view>
		</scroll-view>
		<scroll-view v-if="isshow" class="scrollY" scroll-y="true" enable-flex="true" >
			<view class="item-box" v-for="(item,index) in iconlist1" :key="index">
				<view class="item" @tap=callkeyboard(1,index) :style="{background:iconcolor1[index]?themeColor.color:''}">
					<span :class="'iconfont'+' '+item.icon"></span>
				</view>
				<span>{{item.name}}</span>
			</view>
		</scroll-view>
		<!-- <keyboard v-if="isedit" id="keyboard" @moneyNumber=save style="width: 100%" :style="{bottom:-keyHeight+'px'}"></keyboard> -->
		<keyboard id="keyboard" @moneyNumber=save style="width: 100%" :style="{bottom:-keyHeight+'px'}" ></keyboard>
	</view>
</template>

<script>
	import keyboard from "../../components/keyboard.vue"
	import {
		ColorList
	} from '../index/theme.js'
	import {
		callCloudFunction,getUserInfo
	} from '../../utils/public_util.js';
	export default {
		data() {
			return {
				tab:['支出','收入'],
				TabCur:0,
				iconlist:[
					{'icon':'icon-canyin','name':'餐饮'},{'icon':'icon-yundong','name':'运动'},{'icon':'icon-fushi','name':'服饰'},{'icon':'icon-lvxing','name':'旅行'},{'icon':'icon-shejiao','name':'社交'},{'icon':'icon-zhufang','name':'住房'},{'icon':'icon-lingshi','name':'零食'},{'icon':'icon-yule','name':'娱乐'},{'icon':'icon-xuexi','name':'学习'},{'icon':'icon-traffic','name':'交通'},{'icon':'icon-riyongpin','name':'日用品'},{'icon':'icon-yanjiu','name':'烟酒'},{'icon':'icon-tongxun','name':'通讯'},{'icon':'icon-changbei','name':'长辈'},{'icon':'icon-icon-test','name':'礼物'},{'icon':'icon-yiliao','name':'医疗'},{'icon':'icon-shuiguo','name':'水果'},{'icon':'icon-child','name':'孩子'},{'icon':'icon-chongwu','name':'宠物'},{'icon':'icon-gouwu','name':'购物'}
				],
				iconlist1:[
					{'icon':'icon-gongzi','name':'工资'},{'icon':'icon-jianzhi','name':'兼职'},{'icon':'icon-licai','name':'理财'},{'icon':'icon-lijin','name':'礼金'},{'icon':'icon-qianbao','name':'其他'}
				],
				isshow:false,
				iconcolor:[false,false,false,false,false],
				iconcolor1:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
				winHeight:0,
				keyHeight:0,
				navHeight:0,
				tabHeight:0,
				id:null,
				clickInfo:{},
				isedit:true,
				editdata:""
			};
		},
		components:{keyboard},
		onLoad() {
	
		},
		mounted() {
			this.getScreenHeight()
			this.getNavHeight()
			this.getHeight()	
		},
		methods:{
			// getdetailinfo(){
			// 	let infodata = JSON.parse(uni.getStorageSync('detailinfo'));
			// 	this.editdata = infodata
			// 	this.id = infodata._id
			// 	let mark = infodata.mark
			// 	let icon = infodata.url
			// 	if(mark=='income'){
			// 		this.TabCur = 1
			// 		this.isshow = true
			// 		for(var j=0;j<this.iconlist1.length;j++){
			// 			if(this.iconlist1[j].icon == icon){
			// 				this.iconcolor1[j]=true
			// 				this.clickInfo = {
			// 					'text':this.iconlist1[j].name,
			// 					'url':this.iconlist1[j].icon
			// 				}
			// 				if(this.keyHeight!=0){
			// 					this.winHeight = (this.winHeight - this.keyHeight - this.navHeight - this.tabHeight)+'px'
			// 					this.keyHeight = 0
			// 				}
			// 			}
			// 		}
			// 	}else{
			// 		this.TabCur = 0
			// 		this.isshow = false
			// 		for(var j=0;j<this.iconlist.length;j++){
			// 			if(this.iconlist[j].icon == icon){
			// 				this.iconcolor[j]=true
			// 				this.clickInfo = {
			// 					'text':this.iconlist[j].name,
			// 					'url':this.iconlist[j].icon
			// 				}
			// 				if(this.keyHeight!=0){
			// 					this.winHeight = (this.winHeight - this.keyHeight - this.navHeight - this.tabHeight)+'px'
			// 					this.keyHeight = 0
			// 				}
			// 			}
			// 		}
			// 	}
			// },
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				for(var j=0;j<this.iconcolor.length;j++){
					this.$set(this.iconcolor,j,false)
				}
				for(var j=0;j<this.iconcolor1.length;j++){
					this.$set(this.iconcolor1,j,false)
				}
				this.isshow=!this.isshow
			},
			getNavHeight(){
				var view0 = uni.createSelectorQuery().select("#nav")
				var view1 = uni.createSelectorQuery().select("#tab")
				view0.boundingClientRect((data)=>{
					this.navHeight = data.height
					// console.log(data.height)
				}).exec()
				view1.boundingClientRect((data)=>{
					this.tabHeight = data.height
					// console.log(data.height)
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
			callkeyboard(n,i){
				this.clickInfo={}
				if(n==0){
					for(var j=0;j<this.iconcolor.length;j++){
						this.$set(this.iconcolor,j,false)
					}
					this.$set(this.iconcolor,i,true)
					this.clickInfo = {
						'text':this.iconlist[i].name,
						'url':this.iconlist[i].icon
					}
				}else{
					for(var j=0;j<this.iconcolor1.length;j++){
						this.$set(this.iconcolor1,j,false)
					}
					this.$set(this.iconcolor1,i,true)
					this.clickInfo = {
						'text':this.iconlist1[i].name,
						'url':this.iconlist1[i].icon
					}
				}
				if(this.keyHeight!=0){
					this.winHeight = (this.winHeight - this.keyHeight - this.navHeight - this.tabHeight)+'px'
					this.keyHeight = 0
				}	
			},
			save(e){
				let userInfo = getUserInfo();
				callCloudFunction('money_add', {
					id: this.id == null ? '' : this.id,
					openid: userInfo.openid,
					nickName: userInfo.nickName,
					money: this.TabCur == 1?e.moneyNumber:-e.moneyNumber,
					type: this.clickInfo.text,
					url: this.clickInfo.url,
					text:e.mark,
					mark: this.TabCur == 1? 'income' : 'expenditure',
					date:e.date
				}, (res) => {
					if (this.id == null || this.id == '') {
						uni.showToast({
							icon: "none",
							title: '记录成功',
							duration: 2000
						});
						// var pages = getCurrentPages();//当前页
						// var beforePage = pages[pages.length - 2];//上个页面
						// beforePage.$vm.getData()
						uni.switchTab({
							url:"../index/pages/index",
							success: () => {
								var page = getCurrentPages()[0]
								if(page==undefined || page==null)return;
								page.$vm.getData()
							}
						})
					} else {
						uni.showToast({
							icon: "none",
							title: '修改成功',
							duration: 2000
						});
						this.id = null;
						uni.removeStorageSync('detailinfo');
						var pages = getCurrentPages();//当前页
						var beforePage = pages[pages.length - 3];//上个页面
						beforePage.$vm.getData()
						uni.switchTab({
							url:"../index/pages/index"
						})
					}	
				}, (fail) => {
					uni.showToast({
						icon: "none",
						title: '记录失败:' + JSON.stringify(fail),
						duration: 4000
					});
				});
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
