<template>
	<view class="content">
		<button class="bg-blue btn cu-btn" @tap="changeLang">切换语言</button>
		<button class="btn cu-btn"  :class="['bg-' + themeColor.name]" @tap="changebg" data-target="RadioModal">切换主题</button>

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
	} from './theme.js'
	export default {
		data() {
			return {
				themeList: [],
				modalName: null
			}
		},
		onLoad() {
			
		},
		methods: {
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

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
