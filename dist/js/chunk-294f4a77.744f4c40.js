(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-294f4a77"],{"1da1":function(e,a,t){"use strict";function n(e,a,t,n,r,s,i){try{var o=e[s](i),l=o.value}catch(d){return void t(d)}o.done?a(l):Promise.resolve(l).then(n,r)}function r(e){return function(){var a=this,t=arguments;return new Promise((function(r,s){var i=e.apply(a,t);function o(e){n(i,r,s,o,l,"next",e)}function l(e){n(i,r,s,o,l,"throw",e)}o(void 0)}))}}t.d(a,"a",(function(){return r}))},"95f2":function(e,a,t){"use strict";var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),t("el-breadcrumb-item",[e._v("版本控制")])],1),t("div",{staticClass:"app-container"},[t("el-card",{staticClass:"filter-container",attrs:{shadow:"never"}},[t("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFormRules,"label-width":"70px"}},[t("el-form-item",{staticStyle:{width:"100%"},attrs:{label:"版本号：","label-width":"100px",prop:"versionNo"}},[t("el-input",{attrs:{type:"text",disabled:e.isEdit,placeholder:"版本号"},model:{value:e.addForm.versionNo,callback:function(a){e.$set(e.addForm,"versionNo",a)},expression:"addForm.versionNo"}})],1),t("el-form-item",{attrs:{label:"项目：","label-width":"100px",prop:"projectName"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{disabled:e.isEdit,filterable:!0,clearable:""},on:{change:function(a){return e.choosePorject(a)}},model:{value:e.addForm.projectName,callback:function(a){e.$set(e.addForm,"projectName",a)},expression:"addForm.projectName"}},e._l(e.projectlist,(function(e){return t("el-option",{key:e.projectName,attrs:{label:e.projectName,value:e.id}})})),1)],1),t("el-form-item",{staticStyle:{width:"300px"},attrs:{label:"版本大小：","label-width":"100px",prop:"versionSize"}},[t("el-input",{model:{value:e.addForm.versionSize,callback:function(a){e.$set(e.addForm,"versionSize",a)},expression:"addForm.versionSize"}})],1),t("el-form-item",{staticStyle:{width:"300px"},attrs:{label:"发布日期：","label-width":"100px",prop:"releaseTime"}},[t("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date"},model:{value:e.addForm.releaseTime,callback:function(a){e.$set(e.addForm,"releaseTime",a)},expression:"addForm.releaseTime"}})],1),t("div",{staticStyle:{"margin-bottom":"20px"}},[t("el-button",{attrs:{size:"small"},on:{click:function(a){return e.addLanguages(e.languages)}}},[e._v(" 选择语言 ")])],1),t("el-tabs",{attrs:{type:"card",closable:e.editableTabs.length>1},on:{"tab-remove":e.removeTab},model:{value:e.editableTabsValue,callback:function(a){e.editableTabsValue=a},expression:"editableTabsValue"}},e._l(e.editableTabs,(function(a,n){return t("el-tab-pane",{key:a.name,attrs:{label:a.title,name:a.name}},[t("div",[t("el-form-item",{attrs:{label:"升级描述：","label-width":"100px",prop:"dsc"}},[t("el-input",{attrs:{type:"textarea",autosize:{minRows:10,maxRows:80}},model:{value:a.dsc,callback:function(t){e.$set(a,"dsc",t)},expression:"item.dsc"}})],1)],1)])})),1)],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.addOrUpdateVersion("addFormRef")}}},[e._v("提交")])],1)],1),t("el-dialog",{attrs:{title:"选择语言",visible:e.addDialogVisible,width:"50%"},on:{"update:visible":function(a){e.addDialogVisible=a}}},[t("el-checkbox-group",{attrs:{min:1},model:{value:e.checkList,callback:function(a){e.checkList=a},expression:"checkList"}},e._l(e.languages,(function(e){return t("el-checkbox",{key:e.languageCode,attrs:{label:e.languageName}})})),1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(a){e.addDialogVisible=!1}}},[e._v("取消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.handleCheckedLanguagesChange}},[e._v("确定")])],1)],1)],1)},r=[],s=(t("7f7f"),t("ac6a"),t("96cf"),t("1da1")),i=t("ba87"),o=t("e2fe"),l=t("b9b9"),d=t.n(l),u={versionId:null,versionNo:null,releaseTime:new Date,versionSize:"MB",languages:[{languageCode:"zh-cn",languageName:null,versionNo:null,releaseTime:null,versionSize:"MB",dsc:null,id:null}]},c={inject:["reload"],props:{isEdit:{type:Boolean,default:!1}},data:function(){return{versionId:null,addDialogVisible:!1,queryInfo:{projectName:"",pageNo:1,pageSize:20},projectlist:[],addForm:{versionId:null,versionNo:null,releaseTime:null,projectId:null,versionSize:null,languages:[{languageCode:null,languageName:null,versionNo:null,releaseTime:null,versionSize:null,dsc:null,id:null}]},checkList:["中文(中国)"],languages:[{id:"",languageName:"",languageCode:"",versionSizeTitle:"",versionNoTitle:"",releaseTimeTitle:"",defaultDsc:""}],addFormRules:{versionNo:[{required:!0,message:"请输入版本号",trigger:"blur"}],versionSize:[{required:!0,message:"请输入版本大小",trigger:"blur"}],releaseTime:[{required:!0,message:"请输入发布日期",trigger:"blur"}],projectName:[{required:!0,message:"请输选择项目",trigger:"blur"}]},editableTabsValue:"zh-cn",editableTabs:[{title:"中文(中国)",name:"zh-cn",dsc:"1.优化系统\r\n2.修复错误选择【立即安装】，设备将重启并进入升级模式，整个过程需花费几分钟时间，请您在此期间不要做任何操作，以免造成升级失败。",languageCode:"zh-cn"}]}},created:function(){this.chooseLanguages,this.isEdit?this.getParam():(this.addForm=Object.assign({},u),this.getProjectList())},watch:{$route:"getParam"},methods:{getParam:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var a,t,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=this.$route.query,this.versionId=a.versionId,this.editableTabs=[],null!=this.versionId){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,Object(o["b"])(this.versionId);case 7:if(t=e.sent,n=t.data,"success"==n.msg){e.next=11;break}return e.abrupt("return",this.$message.error("获取版本失败",n.msg));case 11:for(this.addForm=n.data,this.checkList=[],r=0;r<this.addForm.languages.length;r++)this.editableTabs.push({title:this.addForm.languages[r].languageName,name:this.addForm.languages[r].languageCode+"",dsc:this.addForm.languages[r].dsc,id:this.addForm.languages[r].id,languageName:this.addForm.languages[r].languageName,languageCode:this.addForm.languages[r].languageCode}),this.checkList.push(this.addForm.languages[r].languageName);this.editableTabsValue=n.data.languages[0].languageCode;case 15:case"end":return e.stop()}}),e,this)})));function a(){return e.apply(this,arguments)}return a}(),choosePorject:function(e){this.addForm.projectId=e},addOrUpdateVersion:function(e){var a=this;this.$refs.addFormRef.validate(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var n,r,s,i,o,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,a.$confirm("是否提交数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((function(e){return console.log("提交版本失败",e),e}));case 4:if(n=e.sent,"confirm"===n){e.next=7;break}return e.abrupt("return",a.$message.info("已经取消提交！"));case 7:for(a.addForm.languages=[],a.addForm.releaseTime=d()(a.addForm.releaseTime,"yyyy-mm-dd HH:MM:ss"),r=0;r<a.editableTabs.length;r++)s=a.editableTabs[r],a.addForm.languages.push({dsc:s.dsc,languageCode:s.languageCode,languageName:s.languageName,id:s.id,versionSize:a.addForm.versionSize,versionNo:a.addForm.versionNo,releaseTime:a.addForm.releaseTime});if(!a.isEdit){e.next=18;break}return e.next=13,a.$http.post("/version/update",a.addForm);case 13:i=e.sent,o=i.data,0!==o.code?a.$message.error("添加版本失败！"+JSON.stringify(o.msg)):(a.$message.success("修改成功"),a.reload()),e.next=23;break;case 18:return e.next=20,a.$http.post("/version/create",a.addForm);case 20:l=e.sent,u=l.data,0!==u.code?a.$message.error("添加版本失败！"+JSON.stringify(u.msg)):(a.$refs.addFormRef.resetFields(),a.$message.success("添加版本成功"),a.reload());case 23:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}())},chooseLanguages:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var a,t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["a"])();case 2:a=e.sent,t=a.data,console.log("返回语言列表",t),0!=t.code&&this.$message.error("选择语言失败:"+t.msg),this.languages=t.data;case 7:case"end":return e.stop()}}),e,this)})));function a(){return e.apply(this,arguments)}return a}(),addLanguages:function(e){this.addDialogVisible=!0,this.chooseLanguages()},removeTab:function(e){var a=this.editableTabs,t=this.editableTabsValue;t===e&&a.forEach((function(n,r){if(n.name===e){var s=a[r+1]||a[r-1];s&&(t=s.name)}})),this.editableTabsValue=t,this.editableTabs=a.filter((function(a){return a.name!==e}))},getProjectList:function(){var e=this;this.$http.get("/project/queryPage",{params:this.queryInfo}).then((function(a){if(a=a.data,0!==a.code)return e.$message.error("获取项目列表失败！");e.projectlist=[];for(var t=a.data.list,n=0;n<t.length;n++)e.projectlist.push({projectName:t[n].projectName,id:t[n].id})}))},versionInfoFun:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(a){var t,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.editableTabs=[],null!=a){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,Object(o["b"])(a);case 5:if(t=e.sent,n=t.data,0==n.code){e.next=9;break}return e.abrupt("return",this.$message.error("获取版本失败",n.msg));case 9:for(this.addForm=n.data,r=0;r<n.data.languages.length;r++)this.editableTabs.push({title:n.data.languages[r].languageName,name:n.data.languages[r].languageCode+"",dsc:n.data.languages[r].dsc,id:n.data.languages[r].id,languageCode:n.data.languages[r].languageCode,languageName:n.data.languages[r].languageName});case 11:case"end":return e.stop()}}),e,this)})));function a(a){return e.apply(this,arguments)}return a}(),handleCheckedLanguagesChange:function(e){this.addDialogVisible=!1,this.editableTabs=[];for(var a=0;a<this.checkList.length;a++){for(var t=this.checkList[a],n=0;n<this.languages.length;n++){var r=this.languages[n];if(r.languageName===t){for(var s=!1,i=0;i<this.addForm.languages.length;i++){var o=this.addForm.languages[i];o.languageName===t&&(this.editableTabs.push({title:o.languageName,name:o.languageCode,dsc:o.dsc,id:o.id,languageName:o.languageName,languageCode:o.languageCode}),s=!0)}s||this.editableTabs.push({title:r.languageName,name:r.languageCode,dsc:r.defaultDsc,id:null,languageCode:r.languageCode,languageName:r.languageName})}}this.editableTabsValue=this.editableTabs[this.editableTabs.length-1].name}},init:function(){this.editableTabsValue="zh-cn"}}},m=c,g=t("2877"),h=Object(g["a"])(m,n,r,!1,null,"49894756",null);a["a"]=h.exports},b775:function(e,a){},b9b9:function(e,a,t){var n;(function(r){"use strict";var s=function(){var e=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g,a=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,t=/[^-+\dA-Z]/g;return function(n,r,u,c){if(1!==arguments.length||"string"!==d(n)||/\d/.test(n)||(r=n,n=void 0),n=n||new Date,n instanceof Date||(n=new Date(n)),isNaN(n))throw TypeError("Invalid date");r=String(s.masks[r]||r||s.masks["default"]);var m=r.slice(0,4);"UTC:"!==m&&"GMT:"!==m||(r=r.slice(4),u=!0,"GMT:"===m&&(c=!0));var g=u?"getUTC":"get",h=n[g+"Date"](),b=n[g+"Day"](),f=n[g+"Month"](),p=n[g+"FullYear"](),v=n[g+"Hours"](),y=n[g+"Minutes"](),T=n[g+"Seconds"](),N=n[g+"Milliseconds"](),F=u?0:n.getTimezoneOffset(),M=o(n),w=l(n),k={d:h,dd:i(h),ddd:s.i18n.dayNames[b],dddd:s.i18n.dayNames[b+7],m:f+1,mm:i(f+1),mmm:s.i18n.monthNames[f],mmmm:s.i18n.monthNames[f+12],yy:String(p).slice(2),yyyy:p,h:v%12||12,hh:i(v%12||12),H:v,HH:i(v),M:y,MM:i(y),s:T,ss:i(T),l:i(N,3),L:i(Math.round(N/10)),t:v<12?s.i18n.timeNames[0]:s.i18n.timeNames[1],tt:v<12?s.i18n.timeNames[2]:s.i18n.timeNames[3],T:v<12?s.i18n.timeNames[4]:s.i18n.timeNames[5],TT:v<12?s.i18n.timeNames[6]:s.i18n.timeNames[7],Z:c?"GMT":u?"UTC":(String(n).match(a)||[""]).pop().replace(t,""),o:(F>0?"-":"+")+i(100*Math.floor(Math.abs(F)/60)+Math.abs(F)%60,4),S:["th","st","nd","rd"][h%10>3?0:(h%100-h%10!=10)*h%10],W:M,N:w};return r.replace(e,(function(e){return e in k?k[e]:e.slice(1,e.length-1)}))}}();function i(e,a){e=String(e),a=a||2;while(e.length<a)e="0"+e;return e}function o(e){var a=new Date(e.getFullYear(),e.getMonth(),e.getDate());a.setDate(a.getDate()-(a.getDay()+6)%7+3);var t=new Date(a.getFullYear(),0,4);t.setDate(t.getDate()-(t.getDay()+6)%7+3);var n=a.getTimezoneOffset()-t.getTimezoneOffset();a.setHours(a.getHours()-n);var r=(a-t)/6048e5;return 1+Math.floor(r)}function l(e){var a=e.getDay();return 0===a&&(a=7),a}function d(e){return null===e?"null":void 0===e?"undefined":"object"!==typeof e?typeof e:Array.isArray(e)?"array":{}.toString.call(e).slice(8,-1).toLowerCase()}s.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"},s.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],timeNames:["a","p","am","pm","A","P","AM","PM"]},n=function(){return s}.call(a,t,a,e),void 0===n||(e.exports=n)})()},ba87:function(e,a,t){"use strict";t.d(a,"c",(function(){return s})),t.d(a,"b",(function(){return i})),t.d(a,"a",(function(){return o}));t("b775");var n=t("bc3a"),r=t.n(n);function s(e){return r.a.post("/version/updateVersionDetailStatus",e)}function i(e){return r.a.post("/version//updateVersionDetail",e)}function o(){return r.a.get("/version/queryLanguageAll")}},e2fe:function(e,a,t){"use strict";t.d(a,"b",(function(){return s})),t.d(a,"a",(function(){return i}));t("b775");var n=t("bc3a"),r=t.n(n);function s(e){return r.a.get("/version/queryVersion/"+e)}function i(e){return r.a.post("/version/delete?id="+e)}}}]);
//# sourceMappingURL=chunk-294f4a77.744f4c40.js.map