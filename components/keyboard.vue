<template>
	<view class="content" >
		<view class="detail">
			<view class="mark">
				<label class="label">备注:</label>
				<input class="input" v-model="mark" placeholder="点击填写备注"/>
			</view>
			<input v-model="equation" class="money" maxlength="10" disabled/>
		</view>
		<view class="keyboard">
			<view class="item" @tap="touch_key(7)">7</view>
			<view class="item" @tap="touch_key(8)">8</view>
			<view class="item" @tap="touch_key(9)">9</view>
			<view class="item" @tap="selectDate()">
				<span style="font-size: 20px;" class="iconfont icon-icon"></span>
				<span>{{day}}</span>
			</view>
			<view class="item" @tap="touch_key(4)">4</view>
			<view class="item" @tap="touch_key(5)">5</view>
			<view class="item" @tap="touch_key(6)">6</view>
			<view class="item" @tap="touch_key('+')">+</view>
			<view class="item" @tap="touch_key(1)">1</view>
			<view class="item" @tap="touch_key(2)">2</view>
			<view class="item" @tap="touch_key(3)">3</view>
			<view class="item" @tap="touch_key('-')">-</view>
			<view class="item" @tap="touch_key('.')">.</view>
			<view class="item" @tap="touch_key(0)">0</view>
			<view class="item" @tap="del()">
				<span class="iconfont icon-backspace"></span>
			</view>
			<view v-if="iscal" class="item" @tap="cal()" :style="{background:themeColor.color}" style="color: #FFFFFF;">=</view>
			<view v-if="!iscal" class="item" @tap="save">完成</view>
		</view>
		<view>
		   <uni-calendar 
		       ref="calendar"
		       :insert="false"
		       @confirm="confirm">
			</uni-calendar>
		</view>
	</view>
</template>

<script>
	import uniCalendar from './uni-calendar/uni-calendar.vue'
	import {
		ColorList
	} from '../pages/index/theme.js'
	var rpn = require("../utils/eval.js")
	export default {
		props:['TabCur'],
		data() {
			return {
				iscal:false,
				equation:'0',
				isDecimalAdded: false,
				isOperatorAdded: false,
				isStarted: false,
				mark:"",
				day:"今天"
			};
		},
		components:{uniCalendar},
		mounted() {
			
		},
		methods:{
			isOperator(character) {
			  return ['+', '-'].indexOf(character) > -1
			},
			touch_key(character){
				if (this.equation === '0' && !this.isOperator(character)) {
				  if (character === '.') {
				    this.equation += '' + character
				    this.isDecimalAdded = true
				  } else {
				    this.equation = '' + character
				  }
				  
				  this.isStarted = true
				  return
				}
				
				// If Number
				if (!this.isOperator(character)) {
				  if (character === '.' && this.isDecimalAdded) {
				    return
				  }
				  
				  if (character === '.') {
				    this.isDecimalAdded = true
				    this.isOperatorAdded = true
				  } else {
				    this.isOperatorAdded = false
				  }
				  
				  this.equation += '' + character
				}
				
				// Added Operator
				if (this.isOperator(character) && !this.isOperatorAdded) {
				  this.equation += '' + character
				  this.isDecimalAdded = false
				  this.isOperatorAdded = true
				  this.iscal = true
				}
			},
			cal(){				
				this.equation = parseFloat(rpn.calCommonExp(this.equation).toFixed(2)).toString()
				this.isDecimalAdded = false
				this.isOperatorAdded = false
				this.iscal=false
			},
			confirm(e){
				console.log(e)
				this.day = e.fulldate
			},
			save(){
				console.log("完成")
				let moneyNumber = new Number(this.equation);
				if (moneyNumber <= 0) {
					uni.showToast({
						icon: "none",
						title: '请输入大于0的金额'
					});
				}else{
					let date = ""
					if(this.day == "今天"){
						date = new Date().toISOString();
					}else{
						let date1  = this.day.split("-")
						date = new Date(date1[0],date1[1]-1,date1[2]).toISOString();
					}
					let obj = {
						'moneyNumber':moneyNumber,
						'mark':this.mark,
						'date':date
					}
					this.$emit("moneyNumber",obj)
					this.equation="0"
					this.mark = ""
				}	
			},
			del(){
				var l = String(this.equation).length
				this.equation = String(this.equation).substr(0,l-1)
				if(this.equation==""){
					this.equation='0'
				}
			},
			selectDate(){
				this.$refs.calendar.open();
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	width: 100%;
	height: 35%;
	display: flex;
	// position: fixed;
	// bottom: 0;
	.detail{
		width: 100%;
		display: flex;
		padding: 5px;
		background: #FFFFFF;
		.mark{
			width: 60%;
			.label{
				width: 30%;
				float: left;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.input{
				display: flex;
			}
			.input::-webkit-input-placeholder {
			   display: flex;
			   align-items: center;
			}
		}
		.money{
			flex:1;
			font-size: 16px;
			text-align: center;
		}
	}
	.keyboard{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		background: #FFFFFF;
		.item{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 25%;
			height: 50px;
			border: 0.5px solid #DDDDDD;
			font-size: 15px;
		}
	}
}
</style>
