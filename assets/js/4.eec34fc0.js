(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{440:function(t,e,n){"use strict";n.d(e,"d",(function(){return u})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return d})),n.d(e,"b",(function(){return f}));var r=n(437),i=n(423),a=n(46),l=n(47),o=n(424),s=(n(9),n(133),n(95),n(426),n(98),["defaultValue","type","span","rules","key","label","name","size","nextRowFirst","currentRowLast","hidden","props"]),u=new(function(){function t(){Object(a.a)(this,t),Object(o.a)(this,"handler",{})}return Object(l.a)(t,[{key:"register",value:function(t,e){this.handler[t]=e}},{key:"format",value:function(t,e){t in this.handler&&this.handler[t](e)}}]),t}()),c=function(t){var e=[[]];return t?(t.forEach((function(t){if(t.nextRowFirst)e.push([t]);else{var n=e[e.length-1];n.reduce((function(t,e){return t+e.span}),0)+t.span>24?e.push([t]):n.push(t),t.currentRowLast&&e.push([])}})),e):e},d=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=e.borderForm;return t.map((function(t){return t.class?t.class=Object(i.a)(Object(i.a)({},t.class),{},{"block-item":r}):t.class={"block-item":r},t.id||(t.id=t.label),Array.isArray(t.children)?t.children=f(t.children,e,n):t.children=[],t}))},f=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=e.allDisabled,l=e.textModel,o=e.formItemCol,c=e.formItemSize;return t.map((function(t){var e=Object(i.a)({defaultValue:"",type:"normal-input",span:Number(o),disabled:!!a,textModel:!!l,size:c},t);u.format(e.type,e),n[e.key]&&(e=Object(i.a)(Object(i.a)({},e),n[e.key]));var d=e,f=d.defaultValue,p=d.type,h=d.span,m=d.rules,b=d.key,v=d.label,y=d.name,g=d.size,_=d.nextRowFirst,k=d.currentRowLast,x=d.hidden,O=d.props,j=Object(r.a)(d,s);return{props:Object(i.a)(Object(i.a)(Object(i.a)({},j),O),{},{style:{width:g}}),defaultValue:f,type:p,span:h,rules:m,key:b,name:y,nextRowFirst:_,currentRowLast:k,hidden:x,label:v}}))}},460:function(t,e,n){},461:function(t,e,n){},462:function(t,e,n){},463:function(t,e,n){},469:function(t,e,n){"use strict";n.r(e);var r={name:"render-item",functional:!0,props:{scope:Object,render:[String,Function]},render:function(t,e){return console.log(e.props.scope),"string"==typeof e.props.render?t("template",[e.props.render]):e.props.render(t,e.props.scope)}},i=n(37),a=Object(i.a)(r,void 0,void 0,!1,null,"885bb350",null);e.default=a.exports},488:function(t,e,n){"use strict";n(460)},491:function(t,e,n){"use strict";n(461)},492:function(t,e,n){"use strict";n(462)},498:function(t,e,n){"use strict";n(463)},503:function(t,e,n){"use strict";n.r(e),n.d(e,"registerFormatter",(function(){return c}));var r=n(56),i=n(423),a=(n(9),n(19),n(23),n(426),n(61),n(98),n(136),n(95),n(38),n(31),n(489),n(133),n(134),n(223),{}),l=["type","index","column-key","label","prop","width","min-width","fixed","render-header","sortable","sort-method","sort-by","sort-orders","resizable","show-overflow-tooltip","align","header-align","class-name","label-class-name","selectable","reserve-selection","filters","filter-placement","filter-multiple","filter-method","filtered-value"],o={name:"render-table",components:{RenderForm:function(){return Promise.resolve().then(n.bind(null,504))},TableItem:function(){return Promise.resolve().then(n.bind(null,469))}},props:{searchOption:{type:Object,default:function(){return{}}},searchField:{type:Array,default:function(){return[]}},visibleToolbar:{type:Boolean,default:!1},columns:Array,fetchData:{type:[Function,Array],required:!0},setStyle:Function,selection:{type:Boolean,default:!1},defaultRows:{type:Number,default:10},defaultLayout:{type:String,default:"total, sizes, prev, pager, next, jumper"}},data:function(){return{list:[],total:0,rows:this.defaultRows,sortFields:"cdate desc",page:1,filter:{}}},watch:{fetchData:function(t){Array.isArray(t)&&(this.list=this.fetchData.slice((this.page-1)*this.rows,this.page*this.rows),this.total=this.fetchData.length)}},computed:{options:function(){return Object(i.a)({borderForm:!1,labelPosition:"left",labelWidth:"80px",formItemCol:8},this.searchOption)},fields:function(){return this.searchField&&0!==this.searchField.length?this.searchField.some((function(t){return"submit"===t.name}))?[{label:"",children:Object(r.a)(this.searchField)}]:[{label:"",children:[].concat(Object(r.a)(this.searchField),[{name:"submit",type:"slot"}])}]:null},fieldSlotNames:function(){var t=this.$scopedSlots;return this.searchField.filter((function(e){return"slot"===e.type&&t[e.name]})).map((function(t){return t.name}))},isSlotExpand:function(){return!!this.$slots.expand||!!this.$scopedSlots.expand},isSlotOperations:function(){return!!this.$slots.operations||!!this.$scopedSlots.operations}},methods:{updateFilterProp:function(t,e){this.filter[t]=e},onClickReset:function(){this.$refs.search.initFormData(),this.filter=Object(i.a)(Object(i.a)({},this.filter),this.$refs.search.getData()),this.search(1)},onClickSearch:function(){this.filter=Object(i.a)(Object(i.a)({},this.filter),this.$refs.search.getData()),this.search(1)},getColumnAttr:function(t){var e={};return t.key&&!t.prop&&(t.prop=t.key),Object.keys(t).forEach((function(n){if(l.includes(n)&&(e[n]=t[n]),"formatter"===n)if("string"==typeof t[n]){var r=t.prop,i=t[n];e[n]=function(t){return a[i](t[r],t)}}else e[n]=t[n]})),e},onSelectionChange:function(t){this.$emit("selection-change",t)},onExpandChange:function(t,e){this.$emit("expand-change",t,e)},sortChange:function(t){this.sortFields="".concat(t.prop," ").concat({descending:"desc",ascending:"asc"}[t.order]),this.search()},handleSizeChange:function(t){this.rows=t,this.search(1)},search:function(t){var e=this;return t&&(this.page=t),Array.isArray(this.fetchData)?(this.list=this.fetchData.slice((t-1)*this.rows,t*this.rows),this.total=this.fetchData.length,Promise.resolve({total:this.total,list:this.list})):this.fetchData(Object(i.a)(Object(i.a)({},this.filter),{},{sortFields:this.sortFields,page:this.page,rows:this.rows})).then((function(t){return e.list=t.list,e.total=t.total,t}))}},beforeMount:function(){this.search(1)}},s=(n(491),n(492),n(37)),u=Object(s.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"render-table"},[t.fields?n("div",{staticClass:"searchbar"},[n("RenderForm",t._b({ref:"search",attrs:{fields:t.fields},scopedSlots:t._u([{key:"submit",fn:function(){return[n("el-button",{attrs:{type:"primary"},on:{click:t.onClickSearch}},[t._v("搜索")]),t._v(" "),n("el-button",{on:{click:t.onClickReset}},[t._v("重置")])]},proxy:!0},t._l(t.fieldSlotNames,(function(e){return{key:e,fn:function(){return[t._t(e)]},proxy:!0}}))],null,!0)},"RenderForm",t.options,!1))],1):t._e(),t._v(" "),t.visibleToolbar?n("div",{staticClass:"table-toolbar"},[n("div",{staticClass:"tabs"}),t._v(" "),n("div",{staticClass:"toolbar"},[n("el-tooltip",{attrs:{effect:"dark",content:"搜索"}},[n("i",{staticClass:"el-icon el-icon-refresh-right",on:{click:function(e){return t.search(t.page)}}})])],1)]):t._e(),t._v(" "),n("el-table",{ref:"table",attrs:{data:t.list,"cell-style":t.setStyle},on:{"sort-change":t.sortChange,"selection-change":t.onSelectionChange,"expand-change":t.onExpandChange,"row-click":function(e){return t.$emit("row-click",e)}}},[t.selection?n("el-table-column",{attrs:{type:"selection",width:"55"}}):t._e(),t._v(" "),t.isSlotExpand?n("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._t("expand",null,null,e)]}}],null,!0)}):t._e(),t._v(" "),t._l(t.columns,(function(e){return n("el-table-column",t._b({key:e.id,scopedSlots:t._u([e.render||e.slotName?{key:"default",fn:function(r){return[e.render?n("TableItem",{attrs:{scope:r,render:e.render}}):t._t(e.slotName,null,null,{row:r.row,column:r.column,$index:r.$index})]}}:null],null,!0)},"el-table-column",t.getColumnAttr(e),!1))}))],2),t._v(" "),n("div",{staticClass:"footBtn"},[t._t("operationBtn")],2),t._v(" "),n("div",{staticClass:"pagination"},[n("el-pagination",{attrs:{"current-page":t.page,"page-sizes":[5,10,20,50,100],"page-size":t.rows,layout:t.defaultLayout,total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.search}})],1)],1)}),[],!1,null,"1aef7b78",null).exports,c=(e.default=u,function(t,e){a[t]=e})},504:function(t,e,n){"use strict";n.r(e),n.d(e,"registerHandler",(function(){return c}));var r=n(423),i=(n(426),n(95),n(38),n(9),n(133),n(134),n(429),n(457),n(458),n(459)),a=n.n(i),l=n(440),o={name:"render-form",props:{watcher:{type:Object,default:function(){return{}}},scanType:{type:String,default:"normal"},showFoldBtn:{type:Boolean,default:!1},allDisabled:{type:Boolean,default:!1},borderForm:{type:Boolean,default:!0},textModel:{type:Boolean,default:!1},formItemCol:{type:[Number,String],default:12},formItemSize:{type:String,default:"80%"},labelPosition:{type:String,default:"top"},labelWidth:{type:String,default:"160px"},fields:{type:Array,default:function(){return[]}},data:{type:Object,default:function(){return{}}}},data:function(){return{foldBlockList:[],singleScanBlock:"",updateField:{},formData:{}}},watch:{scanType:{handler:function(t){"single"===t?(this.foldBlockList=[],this.singleScanBlock=this.allFields[0].id):this.singleScanBlock=""},immediate:!0}},computed:{globalOptions:function(){return{borderForm:this.borderForm,allDisabled:this.allDisabled,textModel:this.textModel,formItemCol:this.formItemCol,formItemSize:this.formItemSize}},allFields:function(){return Object(l.a)(a()(this.fields),this.globalOptions,this.updateField)},curFields:function(){return this.allFields.map((function(t){var e=t.children.filter((function(t){return!t.hidden}));return Object(r.a)(Object(r.a)({},t),{},{children:Object(l.c)(e)})}))}},methods:{initFormData:function(){var t=this;this.$set(this,"formData",{}),this.allFields.forEach((function(e){e.children&&Array.isArray(e.children)&&e.children.forEach((function(e){e.key&&(e.key in t.data?t.$set(t.formData,e.key,t.data[e.key]):t.$set(t.formData,e.key,e.defaultValue))}))}))},updateFormData:function(t){var e=this;Object.keys(t).forEach((function(n){n in e.formData&&e.updateValue(n,t[n])}))},updateValue:function(t,e){var n=this;"string"==typeof e&&(e=e.trim()),this.$set(this.formData,t,e),this.$nextTick((function(){n.watcher[t]&&n.watcher[t](e,n.formData,(function(t,e){n.$set(n.updateField,t,e)}))}))},updateFieldProp:function(t,e){this.$set(this.updateField,t,e)},foldBlock:function(t){var e=this.foldBlockList.findIndex((function(e){return e===t.id}));e>-1?this.foldBlockList.splice(e,1):this.foldBlockList.push(t.id)},foldAllBlock:function(){0===this.foldBlockList.length?this.foldBlockList=this.allFields.map((function(t){return t.id})):this.foldBlockList=[]},changeScanType:function(){"normal"===this.scanType?this.$emit("update:scanType","single"):this.$emit("update:scanType","normal")},getData:function(){return a()(this.formData)},validate:function(){return this.$refs.form.validate()}},created:function(){var t=this;this.initFormData(),this.$watch("fields",(function(){t.initFormData()})),this.$watch("data",(function(){t.initFormData()}))}},s=(n(488),n(37)),u=Object(s.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"render-form",class:{"border-form":t.borderForm}},["single"===t.scanType?n("div",{staticClass:"scan-type"},[n("div",{staticClass:"block-btn-list"},[t._l(t.curFields,(function(e){return[e.label?n("div",{key:e.id,staticClass:"block-btn",class:{focus:t.singleScanBlock===e.id},on:{click:function(){return t.singleScanBlock=e.id}}},[t._v("\n          "+t._s(e.label)+"\n        ")]):t._e()]}))],2)]):t._e(),t._v(" "),n("el-form",{ref:"form",attrs:{model:t.formData,"hide-required-asterisk":t.textModel,"label-width":t.labelWidth,"label-position":t.labelPosition}},t._l(t.allFields,(function(e){return n("div",{key:e.label},["normal"===t.scanType||"single"===t.scanType&&t.singleScanBlock===e.id?n("div",{class:e.class,style:e.style},[e.label?n("div",{staticClass:"block-title"},[n("div",{staticClass:"block-line"}),t._v(" "),n("span",{staticClass:"block-text",attrs:{id:e.id}},[t._v(t._s(e.label))]),t._v(" "),t.showFoldBtn&&!t.textModel&&"normal"===t.scanType?[-1===t.foldBlockList.indexOf(e.id)?n("span",{staticClass:"block-fold-btn",on:{click:function(n){return t.foldBlock(e)}}},[t._v("\n              收起\n              "),n("i",{staticClass:"el-icon-arrow-up"})]):n("span",{staticClass:"block-fold-btn",on:{click:function(n){return t.foldBlock(e)}}},[t._v("\n              展开\n              "),n("i",{staticClass:"el-icon-arrow-down"})])]:t._e()],2):t._e(),t._v(" "),n("div",{staticClass:"flex-box"},t._l(e.children,(function(e){return n("el-col",{key:e.key,style:e.style||{},attrs:{span:e.span}},["slot-single"===e.type?n("div",[t._t(e.name)],2):n("el-form-item",{class:e.class,style:e.style,attrs:{rules:e.rules,label:e.label?e.label+":":" ",prop:e.key}},["slot"===e.type?n("div",[t._t(e.name,null,null,e)],2):n(e.type,t._b({key:e.key,tag:"component",staticStyle:{width:"100%"},attrs:{value:t.formData[e.key]},on:{input:function(n){return t.updateValue(e.key,n)}}},"component",e.props,!1))],1)],1)})),1)]):t._e()])})),0)],1)}),[],!1,null,"61643392",null).exports,c=(e.default=u,l.d.register.bind(l.d))},505:function(t,e,n){"use strict";n.r(e);var r=n(423),i=(n(426),{name:"number-input",components:{RenderItem:n(469).default},inheritAttrs:!1,props:{value:{type:[String,Number]},prefix:[String,Function],suffix:[String,Function]},computed:{attrs:function(){return Object(r.a)({},this.$attrs)},listeners:function(){return Object(r.a)(Object(r.a)({},this.$listeners),{},{input:this.onInput})}},methods:{onInput:function(t){this.$emit("input",t)}}}),a=n(37),l=Object(a.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-input",t._g(t._b({attrs:{value:t.value}},"el-input",t.attrs,!1),t.listeners),[t.prefix?n("RenderItem",{attrs:{slot:"prepend",render:t.prefix},slot:"prepend"}):t._e(),t._v(" "),t.suffix?n("RenderItem",{attrs:{slot:"append",render:t.suffix},slot:"append"}):t._e()],1)}),[],!1,null,"230a492e",null).exports;e.default={functional:!0,inheritAttrs:!1,props:{textModel:Boolean},render:function(t,e){return e.props.textModel?t("div",{attrs:{className:"text-model"}},[e.data.attrs.value||"-"]):t(l,e.data,e.children)}}},506:function(t,e,n){"use strict";n.r(e);n(432),n(9);var r=n(437),i=n(423),a=(n(426),["value","label"]),l={name:"normal-select",inheritAttrs:!1,props:{value:[String,Number],options:{type:Array,default:function(){return[]}}},data:function(){return{}},computed:{attrs:function(){return Object(i.a)({},this.$attrs)},listeners:function(){return Object(i.a)(Object(i.a)({},this.$listeners),{},{input:this.onInput})}},methods:{getProps:function(t){t.value,t.label;return Object(r.a)(t,a)},onInput:function(t){this.$emit("input",t)}}},o=n(37),s=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-select",t._g(t._b({attrs:{value:t.value}},"el-select",t.attrs,!1),t.listeners),t._l(t.options,(function(e){return n("el-option",t._b({key:e.value,attrs:{label:e.label,value:e.value}},"el-option",t.getProps(e),!1))})),1)}),[],!1,null,"09f25d72",null).exports;e.default={functional:!0,props:{textModel:Boolean},render:function(t,e){if(e.props.textModel){var n=e.data.attrs,r=n.value,i=n.options.find((function(t){return t.value===r}));return t("div",{attrs:{className:"text-model"}},[i?i.label:"-"])}return t(s,e.data,e.children)}}},508:function(t,e,n){"use strict";n.r(e);n(9),n(133),n(134);var r=n(456),i=n.n(r),a=n(504),l=n(503),o=n(505),s=n(423),u=(n(426),n(493),n(494),n(433),n(434),n(31),n(435),n(431),n(135),n(223),n(469)),c=(n(96),n(229),n(495),n(61),function(t){return""===t?"":String(t).toString().replace(/\d+/,(function(t){return t.replace(/(\d)(?=(\d{3})+$)/g,(function(t){return t+","}))}))}),d=function(t,e){if(!e||e<=0)return t;var n=t,r=String(n).split(".");if(1===r.length)0===r[0].length?n="":n+="."+"0".padEnd(e,"0");else{var i=r[1].length;i<e&&(n=r[0]+"."+r[1].padEnd(e,"0")),i>e&&(n=String(r[0])+"."+r[1].slice(0,e))}return n},f={name:"number-input",components:{RenderItem:u.default},inheritAttrs:!1,props:{value:{type:[String,Number]},zeroPadding:Number,decimal:{type:Number,default:2},max:{type:[String,Number],default:Number.MAX_SAFE_INTEGER},min:{type:[String,Number],default:Number.MIN_SAFE_INTEGER},prefix:[String,Function],suffix:[String,Function]},data:function(){return{isFocus:!1}},computed:{showValue:function(){return this.isFocus?this.value:c(d(this.value,this.zeroPadding))},attrs:function(){return Object(s.a)({},this.$attrs)},listeners:function(){return Object(s.a)(Object(s.a)({},this.$listeners),{},{input:this.onInput,blur:this.onBlur,focus:this.onFocus})}},methods:{onBlur:function(){this.isFocus=!1},onFocus:function(){this.isFocus=!0},onKeyDown:function(t){this.min>=0&&("-"===t.key||"Minus"===t.key)?t.preventDefault():0===this.decimal&&("."!==t.key&&"Period"!==t.code||t.preventDefault())},onInput:function(t){(new RegExp("^-?(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,".concat(this.decimal,"})?$")).test(t)&&Number(this.max)>=Number(t)&&Number(t)>=Number(this.min)||["","-"].includes(t))&&this.$emit("input",t)}}},p=n(37),h=Object(p.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-input",t._g(t._b({attrs:{value:t.showValue},nativeOn:{keydown:function(e){return t.onKeyDown.apply(null,arguments)}}},"el-input",t.attrs,!1),t.listeners),[t.prefix?n("RenderItem",{attrs:{slot:"prepend",render:t.prefix},slot:"prepend"}):t._e(),t._v(" "),t.suffix?n("RenderItem",{attrs:{slot:"append",render:t.suffix},slot:"append"}):t._e()],1)}),[],!1,null,"7af2731e",null).exports,m={functional:!0,props:{textModel:Boolean},render:function(t,e){var n=this;return e.props.textModel?t("div",{attrs:{className:"text-model"}},[function(){var t=e.data.model.value;return t?c(d(t,n.zeroPadding)):"-"}]):t(h,e.data,e.children)}},b=n(506),v=(n(432),n(437)),y=["value","label"],g={name:"radio-group",inheritAttrs:!1,props:{value:[String,Number,Boolean],options:{type:Array,default:function(){return[]}}},data:function(){return{}},computed:{attrs:function(){return Object(s.a)(Object(s.a)({},this.$attrs),{},{value:this.value})},listeners:function(){return Object(s.a)(Object(s.a)({},this.$listeners),{},{input:this.onInput})}},methods:{getProps:function(t){t.value,t.label;return Object(v.a)(t,y)},onInput:function(t){this.$emit("input",t)}}},_=Object(p.a)(g,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-radio-group",t._g(t._b({},"el-radio-group",t.attrs,!1),t.listeners),t._l(t.options,(function(e){return n("el-radio",t._b({key:e.key,attrs:{label:e.value}},"el-radio",t.getProps(e),!1),[t._v("\n    "+t._s(e.label)+"\n  ")])})),1)}),[],!1,null,"26b31c74",null).exports,k={functional:!0,props:{textModel:Boolean},render:function(t,e){if(e.props.textModel){var n=e.data.attrs,r=n.value,i=n.options.find((function(t){return t.value===r}));return t("div",{attrs:{className:"text-model"}},[i?i.label:"-"])}return t(_,e.data,e.children)}},x=(n(38),n(227),n(228),n(95),["value","label"]),O={name:"checkbox-group",inheritAttrs:!1,props:{value:Array,options:{type:Array,default:function(){return[]}}},data:function(){return{}},computed:{attrs:function(){return Object(s.a)(Object(s.a)({},this.$attrs),{},{value:this.value})},listeners:function(){return Object(s.a)(Object(s.a)({},this.$listeners),{},{input:this.onInput})}},methods:{getProps:function(t){t.value,t.label;return Object(v.a)(t,x)},onInput:function(t){this.$emit("input",t)}}},j=Object(p.a)(O,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-checkbox-group",t._g(t._b({},"el-checkbox-group",t.attrs,!1),t.listeners),t._l(t.options,(function(e){return n("el-checkbox",t._b({key:e.key,attrs:{label:e.value}},"el-checkbox",t.getProps(e),!1),[t._v("\n    "+t._s(e.label)+"\n  ")])})),1)}),[],!1,null,"f1a04106",null).exports,F={functional:!0,props:{textModel:Boolean},render:function(t,e){if(e.props.textModel){var n=e.data.attrs,r=n.value,i=n.options.filter((function(t){return r.includes(t.value)})),a="-";return i.length>0&&(a=i.map((function(t){return t.label})).join("/")),t("div",{attrs:{className:"text-model"}},[a])}return t(j,e.data,e.children)}},w={name:"switch",inheritAttrs:!1,props:{value:[Boolean,Number,String]},data:function(){return{}},computed:{attrs:function(){return Object(s.a)(Object(s.a)({},this.$attrs),{},{value:this.value})},listeners:function(){return Object(s.a)(Object(s.a)({},this.$listeners),{},{input:this.onInput})}},methods:{onInput:function(t){this.$emit("input",t)}}},$=Object(p.a)(w,(function(){var t=this.$createElement;return(this._self._c||t)("el-switch",this._g(this._b({},"el-switch",this.attrs,!1),this.listeners))}),[],!1,null,"46dfcbe3",null).exports,S={functional:!0,props:{textModel:Boolean},render:function(t,e){if(e.props.textModel){var n=e.data.attrs.value;return t("div",{attrs:{className:"text-model"}},[n="boolean"==typeof n?n?"是":"否":"-"])}return t($,e.data,e.children)}},C={name:"date-picker",inheritAttrs:!1,props:{value:[Array,Date,String]},data:function(){return{}},computed:{attrs:function(){return Object(s.a)(Object(s.a)({},this.$attrs),{},{value:this.value})},listeners:function(){return Object(s.a)(Object(s.a)({},this.$listeners),{},{input:this.onInput})}},methods:{onInput:function(t){this.$emit("input",t)}}},I=Object(p.a)(C,(function(){var t=this.$createElement;return(this._self._c||t)("el-date-picker",this._g(this._b({},"el-date-picker",this.attrs,!1),this.listeners))}),[],!1,null,"3a73fa68",null).exports,D={functional:!0,props:{textModel:Boolean},render:function(t,e){if(e.props.textModel){var n=e.data.attrs,r=n.value,a=n.type,l=void 0===a?"date":a;if(r){var o="YYYY-MM-DD";l.indexOf("datetime")>-1&&(o="YYYY-MM-DD HH:mm:ss"),r=l.indexOf("range")>1?(r[0]?i()(r[0]).format(o):"")+(r[1]?i()(r[1]).format(o):""):i()(r).format(o)}return t("div",{attrs:{className:"text-model"}},[r||"-"])}return t(I,e.data,e.children)}},B=(n(19),n(23),n(92)),M=n(46),N=n(47),A=n(424),E=(n(233),function(){function t(e){Object(M.a)(this,t),Object(A.a)(this,"storage",null),this.storage=e}return Object(N.a)(t,[{key:"setItem",value:function(t,e,n){var r={type:Object(B.a)(e),data:e};n&&(r.expire=Date.now()+1e3*n),this.storage.setItem(t,JSON.stringify(r))}},{key:"getItem",value:function(t){var e=this.storage.getItem(t);if(!e)return e;try{var n=JSON.parse(e);return!n.expire||n.expire&&n.expire>=Date.now()?n.data:(n.expire&&n.expire<Date.now()&&console.log("".concat(t,"已过期")),null)}catch(t){return console.log("error",t),e}}},{key:"removeItem",value:function(t){this.storage.removeItem(t)}},{key:"clear",value:function(){this.storage.clear()}}]),t}()),T=new E(window.localStorage),R=new E(window.sessionStorage),P=function(t,e,n){if(t){var r=function(t){return T.getItem(t)||R.getItem(t)}("dictCache-"+t);if(r)return Promise.resolve(r)}return e().then((function(e){return e.length&&t&&n&&function(t,e,n){("session"===n.type?R:T).setItem(t,e,n.expire)}("dictCache-"+t,e,n),e}))},V={name:"dict-select",inheritAttrs:!1,components:{NormalSelect:function(){return Promise.resolve().then(n.bind(null,506))}},props:{value:[String,Number],dict:{type:Function,default:function(){return function(){return Promise.resolve([])}}},dictName:String,cache:{type:Object}},data:function(){return{options:[]}},computed:{attrs:function(){return Object(s.a)(Object(s.a)({},this.$attrs),{},{options:this.options})},listeners:function(){return Object(s.a)(Object(s.a)({},this.$listeners),{},{input:this.onInput})}},methods:{onInput:function(t){this.$emit("input",t)}},created:function(){var t=this;P(this.dictName,this.dict,this.cache).then((function(e){t.options=e}))}},L=Object(p.a)(V,(function(){var t=this.$createElement;return(this._self._c||t)("NormalSelect",this._g(this._b({attrs:{value:this.value}},"NormalSelect",this.attrs,!1),this.listeners))}),[],!1,null,"9234851a",null).exports,z=(n(136),n(429),{name:"search-select",inheritAttrs:!1,props:{textModel:{type:Boolean,default:!1},value:[String,Number],canEmpty:{type:Boolean,default:!1},searchFn:{type:Function,required:!0},getOption:Function},data:function(){return{loading:!1,options:[]}},watch:{value:{handler:function(t){var e=this;t&&!this.options.some((function(e){return e.value===t}))&&this.getOption&&this.getOption(t).then((function(t){e.options=e.options.concat(t)}))},immediate:!0}},computed:{attrs:function(){return Object(s.a)(Object(s.a)({},this.$attrs),{},{filterable:!0,remote:!0,loading:this.loading,"remote-method":this.remoteMethod})},listeners:function(){return Object(s.a)(Object(s.a)({},this.$listeners),{},{input:this.onInput,focus:this.onFocus})},showValue:function(){var t=this,e=this.options.find((function(e){return e.value===t.value}));return e?e.label:"-"}},methods:{onInput:function(t){this.$emit("input",t)},onFocus:function(){this.canEmpty&&""===this.value&&this.remoteMethod("")},remoteMethod:function(t){var e=this;t=t.trim(),(this.canEmpty||""!==t)&&(this.loading=!0,this.searchFn(t).then((function(t){e.options=t})).finally((function(){e.loading=!1})))}}}),H=Object(p.a)(z,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.textModel?n("div",{staticClass:"text-model"},[t._v(t._s(t.showValue))]):n("el-select",t._g(t._b({attrs:{value:t.value}},"el-select",t.attrs,!1),t.listeners),t._l(t.options,(function(t){return n("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1)}),[],!1,null,"03b88943",null).exports,Y=n(459),q=n.n(Y),W=n(440),J={name:"ChildForm",components:{NormalInput:function(){return Promise.resolve().then(n.bind(null,505))}},props:{disabled:{type:Boolean,default:!1},labelWidth:{type:String,default:"130px"},labelPosition:{type:String,default:"top"},textModel:{type:Boolean,default:!1},addBtnLabel:{type:String,default:"新增"},headerLabel:String,value:{type:Array,default:function(){return[]}},fields:{type:Array,default:function(){return[]}}},computed:{allFields:function(){return Object(W.b)(q()(this.fields),{allDisabled:this.disabled,textModel:this.textModel})},curFields:function(){var t=this.allFields.filter((function(t){return!t.hidden}));return Object(W.c)(t)}},watch:{value:{handler:function(t){if(!t||0===t.length){var e={};this.allFields.forEach((function(t){e[t.key]=t.defaultValue})),this.$emit("input",[e])}},immediate:!0}},methods:{updateValue:function(t,e,n){console.log(e),"string"==typeof n&&(n=n.trim()),this.$emit("input",this.value.map((function(r,i){return i===t&&(r[e]=n),r})))},addChildForm:function(){var t={};this.allFields.forEach((function(e){t[e.key]=e.defaultValue})),this.$emit("input",this.value.concat(t))}}},G=(n(498),Object(p.a)(J,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"child-form-container"},[t._l(t.value,(function(e,r){return n("div",{key:r,staticClass:"child-form"},[n("div",{staticClass:"child-form-head"},[t._v(t._s(t.headerLabel)+t._s(r+1))]),t._v(" "),n("div",{staticClass:"child-form-body"},[n("el-form",{ref:"form",refInFor:!0,attrs:{model:t.value[r],"label-width":t.labelWidth,"label-position":t.labelPosition}},[t._l(t.curFields,(function(i,a){return[n("el-row",{key:a,staticClass:"block-content",attrs:{gutter:20}},[t._l(i,(function(i){return[n("div",{key:i.key},[n("el-col",{key:i.key,style:i.style||{},attrs:{span:i.span}},["child-form"!==i.type?n("el-form-item",{class:i.class,style:i.style,attrs:{rules:i.rules,label:i.label,prop:i.key}},[n(i.type,t._b({key:i.key,tag:"component",attrs:{value:e[i.key]},on:{input:function(e){return t.updateValue(r,i.key,e)}}},"component",i.props,!1))],1):t._e()],1)],1)]}))],2)]}))],2)],1)])})),t._v(" "),n("div",{staticClass:"child-form-add-btn",on:{click:t.addChildForm}},[t._v("\n    "+t._s(t.addBtnLabel)+"\n  ")])],2)}),[],!1,null,"30a30449",null).exports),K={name:"table-select",components:{RenderTable:function(){return Promise.resolve().then(n.bind(null,503))},TableDialog:function(){return n.e(18).then(n.bind(null,521))}},props:{value:{required:!0},title:String,fetchData:Function,getItems:Function,searchField:Array,elementType:{type:String,default:function(){return"unique"}},columns:{type:Array,required:!0},textModel:{type:Boolean,default:!1}},watch:{value:function(t){var e=this;"unique"===this.elementType?this.getItems(t).then((function(t){e.list=t})):this.list=t}},data:function(){return{list:[]}},computed:{showTableColumns:function(){return this.textModel?this.columns:this.columns.concat({label:"操作",slotName:"handle"})}},methods:{onConfirm:function(t){"unique"===this.elementType?this.$emit("input",t.map((function(t){return t.id}))):this.$emit("input",t)},openTable:function(){this.$refs.dialog.show(this.list)},delItem:function(t){"unique"===this.elementType?this.$emit("input",this.value.filter((function(e){return e!==t.id}))):this.$emit("input",this.value.filter((function(e){return e.id!==t.id})))}}},X=Object(p.a)(K,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"table-select-wrapper"},[t.textModel?t._e():n("el-button",{attrs:{type:"text",size:"default"},on:{click:t.openTable}},[t._v(t._s(t.title))]),t._v(" "),n("RenderTable",{ref:"table",attrs:{fetchData:t.list,defaultRows:5,defaultLayout:"total, prev, pager, next",columns:t.showTableColumns},scopedSlots:t._u([{key:"handle",fn:function(e){var r=e.row;return[t.textModel?t._e():n("el-link",{attrs:{type:"danger",underline:!1},on:{click:function(e){return t.delItem(r)}}},[t._v("移除")])]}}])}),t._v(" "),n("TableDialog",{ref:"dialog",attrs:{title:t.title,fetchData:t.fetchData,columns:t.columns,searchField:t.searchField},on:{onConfirm:t.onConfirm}})],1)}),[],!1,null,"69ebde2b",null).exports;e.default={install:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.component("RenderForm",a.default),t.component("RenderTable",l.default),Object(l.registerFormatter)("formatDateTime",(function(t){return i()(t).format("YYYY-MM-DD HH:mm:ss")})),t.component("normal-input",o.default),t.component("number-input",m),t.component("normal-select",b.default),t.component("radio-group",k),t.component("checkbox-group",F),t.component("normal-switch",S),t.component("date-picker",D),Object(a.registerHandler)("input",(function(t){t.type="normal-input"})),Object(a.registerHandler)("checkbox",(function(t){t.type="checkbox-group",""===t.defaultValue&&(t.defaultValue=[])})),Object(a.registerHandler)("radio",(function(t){t.type="radio-group"})),Object(a.registerHandler)("select",(function(t){t.type="normal-select"})),Object(a.registerHandler)("switch",(function(t){t.type="normal-switch",""===t.defaultValue&&(t.defaultValue=!1)})),Object(a.registerHandler)("date",(function(t){t.type="date-picker"})),t.component("dict-select",L),Object(a.registerHandler)("dict",(function(t){t.type="dict-select"})),t.component("search-select",H),Object(a.registerHandler)("search",(function(t){t.type="search-select"})),t.component("child-form",G),Object(a.registerHandler)("form",(function(t){t.type="child-form",t.span=24,""===t.defaultValue&&(t.defaultValue=[])})),Object(a.registerHandler)("slot-single",(function(t){t.span=24})),t.component("table-select",X),Object(a.registerHandler)("table",(function(t){t.type="table-select",t.span=24,""===t.defaultValue&&(t.defaultValue=[])})),Object.keys(e).forEach((function(n){var r=e[n];t.component(n,r.component),Object(a.registerHandler)(n,r.handler||function(){})}))}}}}]);