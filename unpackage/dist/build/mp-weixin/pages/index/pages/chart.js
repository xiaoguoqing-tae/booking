(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/pages/chart"],{"3a44":function(t,e,a){"use strict";a.r(e);var i=a("f6db"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},4280:function(t,e,a){"use strict";a.r(e);var i=a("a012"),n=a("3a44");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("e2ea");var s,l=a("f0c5"),r=Object(l["a"])(n["default"],i["b"],i["c"],!1,null,"83c67a00",null,!1,i["a"],s);e["default"]=r.exports},a012:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var i={uSelect:function(){return a.e("uview-ui/components/u-select/u-select").then(a.bind(null,"55fe"))}},n=function(){var t=this,e=t.$createElement;t._self._c},o=[]},dd1f:function(t,e,a){"use strict";(function(t){a("52b5");i(a("66fd"));var e=i(a("4280"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},e2ea:function(t,e,a){"use strict";var i=a("ed82"),n=a.n(i);n.a},ed82:function(t,e,a){},f6db:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(a("a59b")),n=a("71f5");function o(t){return t&&t.__esModule?t:{default:t}}var s,l=function(){a.e("components/tabbar").then(function(){return resolve(a("c8b1"))}.bind(null,a)).catch(a.oe)},r=null,c=null,u={categories:[],info:["111"],series:[{name:"11",data:[]}]},d={data:function(){return{useheight:"",phlist:[],show:!1,tab:["折线图","饼状图"],TabCur:0,cWidth:"",cHeight:"",pixelRatio:1,isshow:!0,dateselect:"",list:[[{value:"2021",label:"2021"},{value:"2022",label:"2022"},{value:"2023",label:"2023"}],[]],chartData1:{series:[]},tablist:[{pagePath:"./index",text:"明细"},{pagePath:"./chart",text:"图表"},{pagePath:"./sq",text:"社区"},{pagePath:"./mine",text:"我的"},{pagePath:"../../booking/booking",text:"记账"}]}},components:{tabbar:l},created:function(){for(var t,e=0;e<12;e++)t=e<9?{value:"0"+(e+1),label:"0"+(e+1)}:{value:String(e+1),label:String(e+1)},this.list[1].push(t)},mounted:function(){var e=new Date,a=e.getFullYear(),i=e.getMonth(),n=i+1;1==n.toString().length&&(n="0"+n),this.date=a+"-"+n;var o=this.date.split("-");this.dateselect=o[0]+"-"+o[1],s=this,this.cWidth=t.upx2px(750),this.cHeight=t.upx2px(500),this.getMonthDay();var l=this.date.split("-");this.getServerData(l[0],l[1])},methods:{tabbarChange:function(e){console.log(e),4==e?t.navigateTo({url:this.tablist[e].pagePath,animationType:"slide-in-bottom",animationDuration:2e3}):t.switchTab({url:this.tablist[e].pagePath,animationType:"slide-in-bottom",animationDuration:2e3})},getServerData:function(t,e){var a=this,i=1,o=new Date(t,e,0).getDate();(0,n.callCloudFunction)("money_query",{openid:(0,n.getUserOpenid)(),startDate:new Date(t,new Number(e)-1,i,0,0,0),endDate:new Date(t,new Number(e)-1,o,23,59,59)},(function(t){for(var e=t.data,i=0;i<e.length;i++)e[i].date1=a.$u.timeFormat(e[i].date,"yyyy-mm-dd");u.series[0].data=[];for(var o=0;o<u.categories.length;o++)u.series[0].data.push(0);a.datalist=(0,n.change)(e),a.datalist1=(0,n.change1)(e);for(var s=0;s<a.datalist.length;s++){for(var l=0,r=0;r<a.datalist[s].data.length;r++)l+=-a.datalist[s].data[r].money;a.datalist[s].total=l;var c=a.datalist[s].date.split("-")[2]-1;u.series[0].data[c]=l}a.chartData1.series=[];for(var d=0,h=0;h<a.datalist1.length;h++){for(var g=0,f=0;f<a.datalist1[h].data.length;f++)g+=-a.datalist1[h].data[f].money,d+=-a.datalist1[h].data[f].money;a.datalist1[h].total=g}for(var p=0;p<a.datalist1.length;p++)if(a.datalist1[p].total>0){var v=parseFloat(a.datalist1[p].total/d),b={name:a.datalist1[p].type,data:v,money:a.datalist1[p].total};a.chartData1.series.push(b)}a.showLineA("canvasLineA",u),a.showPie("canvasPie",a.chartData1),console.log(a.datalist1),a.phlist=a.datalist1.sort((function(t,e){return e.total-t.total})),a.getheight()}))},tabSelect:function(t){this.TabCur=t.currentTarget.dataset.id,0==this.TabCur?this.isshow=!0:this.isshow=!1,this.scrollLeft=60*(t.currentTarget.dataset.id-1)},getMonthDay:function(){var t=(new Date).getDate();console.log(t);for(var e=0;e<t;e++)u.categories.push(e+1);console.log(u.categories)},showLineA:function(t,e){r=new i.default({$this:s,canvasId:t,type:"line",fontSize:11,legend:{show:!1},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:s.pixelRatio,categories:e.categories,series:e.series,animation:!0,xAxis:{type:"grid",gridColor:"#CCCCCC",gridType:"dash",dashLength:8,labelCount:10},yAxis:{gridType:"dash",gridColor:"#CCCCCC",dashLength:8,splitNumber:5,min:10,max:200,format:function(t){return t.toFixed(0)+"元"}},width:s.cWidth*s.pixelRatio,height:s.cHeight*s.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA:function(t){r.showToolTip(t,{format:function(t,e){return console.log(t,e),s.date.split("-")[1]+"-"+e+":"+t.data+"元"}})},showPie:function(t,e){c=new i.default({$this:s,canvasId:t,type:"pie",fontSize:11,legend:{show:!0},background:"#FFFFFF",pixelRatio:s.pixelRatio,series:e.series,animation:!0,width:s.cWidth*s.pixelRatio,height:s.cHeight*s.pixelRatio,dataLabel:!0,extra:{pie:{lableWidth:15}}})},touchPie:function(t){c.showToolTip(t,{format:function(t){return t.name+":"+t.money+"元"}})},chooseDate:function(){this.show=!0},confirm:function(t){this.dateselect=t[0].value+"-"+t[1].value,this.getServerData(t[0].value,t[1].value)},getheight:function(){var e,a,i,n=this,o=t.getSystemInfoSync(),s=o.windowHeight;console.log(s);var l=t.createSelectorQuery().select("#nav");l.boundingClientRect((function(t){e=t.height,console.log(e)})).exec();var r=t.createSelectorQuery().select("#tab");r.boundingClientRect((function(t){a=t.height,console.log(a)})).exec();var c=t.createSelectorQuery().select("#canvasLineA");c.boundingClientRect((function(t){i=t.height,console.log(i)})).exec(),setTimeout((function(){n.useheight=s-e-a-i-60,console.log(n.useheight)}),500)}}};e.default=d}).call(this,a("543d")["default"])}},[["dd1f","common/runtime","common/vendor"]]]);