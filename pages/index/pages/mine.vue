<template>
	<view class="content">
		<!-- <button class="bg-blue btn cu-btn" @tap="changeLang">切换语言</button>
		<button class="btn cu-btn"  :class="['bg-' + themeColor.name]" @tap="changebg" data-target="RadioModal">切换主题</button> -->
		<view class="logo bg-gradual-green nav text-center" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" :src="login ? userInfo.avatarUrl :avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">你好，{{login ? userInfo.nickName : '您未登录'}}</text>
			</view>
		</view>
		
		<view class="center-list">
			<navigator url="about" hover-class="navigator-hover">
				<view class="center-list-item">
					<text class="list-icon">&#xe614;</text>
					<text class="list-text">关于应用</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</navigator>
			<view class="center-list-item" @tap="changeLang">
				<text class="list-icon">&#xe60f;</text>
				<text class="list-text">切换语言</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item" @tap="changebg"  data-target="RadioModal">
				<text class="list-icon">&#xe60f;</text>
				<text class="list-text">切换主题</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item" @tap="logOff()">
				<text class="list-icon">&#xe60f;</text>
				<text class="list-text">注销</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in themeList" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub flex">      
									<view>{{item.title}}</view>       
									<view :style="{backgroundColor: item.color}" style='height: 50rpx;width: 100rpx;margin-left: 30rpx;'></view>      
								</view>     
								 <radio class="round" :class="radio=='radio' + index?'checked':''" :checked="radio=='radio' + index?true:false" :value="item.name"></radio>  
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ColorList
	} from '../theme.js'
	let _self
	export default {
		data() {
			return {
				themeList: [],
				modalName: null,
				login: false,
				avatarUrl: "../../../static/avatar.png",
				userInfo: {}
			}
		},
		mounted() {
			_self = this;
			console.log(1111)
			let userinfo = uni.getStorageSync('userInfo');
			if (userinfo) {
				_self.login = true;
				_self.userInfo = userinfo;
			}
			console.log(_self.userInfo)
		},
		methods: {
			goLogin() {
				if (!_self.login) {
					uni.reLaunch({
						url: '../../login/login'
					});
				} else {
					_self.logOff();
				}
			},
			/**
			 * 注销
			 */
			logOff() {
				uni.showModal({
					title: '确认操作',
					content: '是否退出登录?',
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							uni.setStorageSync('userInfo', null);
							_self.login = false;
							_self.uerInfo = null;
							uni.reLaunch({
								url: '../../login/login'
							});
						} else if (res.cancel) {
			
						}
					}
				});
			},
			gourl(url) {
				if (this.login) {
					uni.navigateTo({
						url: url
					});
				} else {
					uni.navigateTo({
						url: 'login'
					});
				}
			},
			changeLang() {
				this.$store.commit('changeLang')
			},
			changebg(e) {
				this.themeList = []
				for (let i = 0; i < ColorList.length; i++) {
					let random = Math.floor(Math.random() * ColorList.length)
					let item = ColorList[random]
					this.themeList.indexOf(item) === -1 && this.themeList.push(item)
					if (this.themeList.length > 5) break
				}
				this.modalName = e.currentTarget.dataset.target
			},
			RadioChange(e) {
				let name = e.detail.value
				let obj = this.themeList.filter(item => {
					return item.name === name
				})
				console.log(obj)
				this.$store.commit('setThemeColor', obj[0])
				this.modalName = null
				uni.setNavigationBarColor({
				    frontColor: '#ffffff',
				    backgroundColor: this.themeColor.color,
				    animation: {
					duration: 400,
					timingFunc: 'easeIn'
				    }
				})
			},
		}
	}
</script>

<style scoped>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	page {
		background-color: #f4f5f6;
	}
	
	.center {
		flex-direction: column;
	}
	
	.logo {
		width: 750upx;
		height: 300upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #2fc25b;
		flex-direction: row;
		align-items: center;
	}
	
	.logo-hover {
		opacity: 0.8;
	}
	
	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}
	
	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}
	
	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
	}
	
	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
	}
	
	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}
	
	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}
	
	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		padding: 0upx 20upx;
	}
	
	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}
	
	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #2fc25b;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}
	
	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}
	
	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		float: right;
		font-family: texticons;
	}
</style>

