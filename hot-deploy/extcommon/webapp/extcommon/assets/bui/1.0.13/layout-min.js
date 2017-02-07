define("bui/layout",["bui/common","jquery"],function(t,e,n){var i=t("bui/common"),o=i.namespace("Layout");i.mix(o,{Abstract:t("bui/layout/abstract"),Anchor:t("bui/layout/anchor"),Flow:t("bui/layout/flow"),Absolute:t("bui/layout/absolute"),Columns:t("bui/layout/columns"),Table:t("bui/layout/table"),Border:t("bui/layout/border"),Accordion:t("bui/layout/accordion"),Viewport:t("bui/layout/viewport")}),n.exports=o}),define("bui/layout/abstract",["jquery","bui/common"],function(t,e,n){var i=t("jquery"),o=t("bui/common"),r=t("bui/layout/item/base"),a=function(t){a.superclass.constructor.call(this,t)};o.extend(a,o.Base),a.ATTRS={itemConstructor:{value:r},control:{},layoutEvents:{value:["afterWidthChange","afterHeightChange"]},items:{},elCls:{},defaultCfg:{value:{}},wraperCls:{},container:{},tpl:{},itemTpl:{value:"<div></div>"}},o.augment(a,{initializer:function(t){var e=this;e.set("control",t)},renderUI:function(){this._initWraper(),this.initItems()},bindUI:function(){var t=this,e=t.get("control"),n=t.get("layoutEvents").join(" ");e.on("afterAddChild",function(e){var n=e.child;t.addItem(n)}),e.on("afterRemoveChild",function(e){t.removeItem(e.child)}),e.on(n,function(){t.resetLayout()}),t.appendEvent(e)},appendEvent:function(){},_initWraper:function(){var t,e=this,n=e.get("control"),o=n.get("view").get("contentEl"),r=e.get("elCls"),a=e.get("tpl");t=a?i(a).appendTo(o):o,r&&t.addClass(r),e.set("container",t),e.afterWraper()},afterWraper:function(){},getItemByElement:function(t){return this.getItemBy(function(e){return i.contains(e.get("el")[0],t[0])})},getItemContainer:function(){return this.get("container")},initItems:function(){var t=this,e=t.get("control"),n=[],i=e.get("children");t.set("items",n);for(var o=0;o<i.length;o++)t.addItem(i[o]);t.afterInitItems()},afterInitItems:function(){},getNextItem:function(t){var e=this,n=e.getItemIndex(t),i=e.getCount(),o=(n+1)%i;return e.getItemAt(o)},getItemCfg:function(t){var e=this,n=e.get("defaultCfg"),i=o.mix({},n,{control:t,tpl:e.get("itemTpl"),layout:e,wraperCls:e.get("wraperCls")},t.get("layout"));return i.container=e.getItemContainer(i),i},initItem:function(t){var e=this,n=e.get("itemConstructor"),i=e.getItemCfg(t);return new n(i)},addItem:function(t){var e=this,n=e.getItems(),i=e.initItem(t);return n.push(i),i},removeItem:function(t){var e=this,n=e.getItems(),i=e.getItem(t);i&&(i.destroy(),o.Array.remove(n,i))},getItemBy:function(t){var e=this,n=e.getItems(),i=null;return o.each(n,function(e){return t(e)?(i=e,!1):void 0}),i},getItemsBy:function(t){var e=this,n=e.getItems(),i=[];return o.each(n,function(e){t(e)&&i.push(e)}),i},getItem:function(t){return this.getItemBy(function(e){return e.get("control")==t})},getCount:function(){return this.getItems().length},getItemAt:function(t){return this.getItems()[t]},getItemIndex:function(t){var e=this.getItems();return o.Array.indexOf(t,e)},getItems:function(){return this.get("items")},resetLayout:function(){var t=this,e=t.getItems();o.each(e,function(t){t.syncItem()})},clearLayout:function(){var t=this,e=t.getItems();o.each(e,function(t){t.destroy()})},reset:function(){this.resetLayout()},destroy:function(){var t=this;t.clearLayout(),t.off(),t.clearAttrVals()}}),n.exports=a}),define("bui/layout/item/base",["jquery","bui/common"],function(t,e,n){function i(t,e){return r.isString(e)?(-1!=e.indexOf("{")&&(e=r.substitute(e,t),e=r.JSON.looseParse(e)),e):e}var o=t("jquery"),r=t("bui/common"),a=function(t){a.superclass.constructor.call(this,t),this.init()};a.ATTRS={fit:{value:"none"},layout:{},control:{},wraperCls:{},container:{},srcNode:{},cssProperties:{value:["width","height"]},attrProperties:{},statusProperties:{},tplProperties:{},el:{},elCls:{},tpl:{}},r.extend(a,r.Base),r.augment(a,{init:function(){var t=this,e=t._wrapControl();t.set("el",e),t.syncItem()},getElement:function(){return this.get("el")},_wrapControl:function(){var t,e=this,n=e.get("control"),i=n.get("el"),a=e.get("elCls"),s=e._getContainer(i),l=r.substitute(e.get("tpl"),e.getLayoutAttrs()),u=o(l).appendTo(s);return a&&u.addClass(a),t=e.getControlContainer(u),i.appendTo(t),e.set("bodyEl",t),u},getControlContainer:function(t){var e=this,n=e.get("wraperCls");return n?t.find("."+n):t},syncItem:function(t){t=t||this.getLayoutAttrs();var e=this,n=e.get("el"),i=e._getSyncCss(t),o=e._getSyncAttr(t);n.css(i),n.attr(o),e.syncStatus(n,t),e.syncElements(n,t),e.syncFit()},syncElements:function(t,e){var n=this,i=n.get("tplProperties");i&&r.each(i,function(i){n.synTpl(t,i,e)})},synTpl:function(t,e,n){var i,a,s=this,l=e.name,u="_"+l+"El",c=s.get(u);n[l]?c||(i=s.get(e.value),i=r.substitute(i,n),a=e.prev?"prependTo":"appendTo",c=o(i)[a](t),s.set(u,c)):c&&c.remove()},syncStatus:function(t,e){t=t||this.get("el"),e=e||this.getLayoutAttrs();var n=this,i=n.get("statusProperties");i&&r.each(i,function(e){var i=n.get(e);if(null!=i){var o=i?"addClass":"removeClass",r="x-"+e;t[o](r)}})},syncFit:function(){var t=this,e=t.get("control"),n=t.get("fit");if("none"!==n)return"width"===n?void t._syncControlWidth(e):"height"===n?void t._syncControlHeight(e):void("both"===n&&(t._syncControlWidth(e),t._syncControlHeight(e)))},_syncControlWidth:function(t){var e=this,n=e.get("width")||e.get("el").width(),i=t.getAppendWidth();t.set("width",n-i)},_syncControlHeight:function(t){var e=this,n=e.getFitHeight(),i=t.getAppendHeight();t.set("height",n-i)},getFitHeight:function(){var t,e=this,n=e.get("el"),i=e.get("bodyEl"),a=e.get("height")||n.height(),s=a;return i[0]==n[0]?a:(t=i.siblings(),r.each(t,function(t){var e=o(t);"absolute"!==e.css("position")&&(s-=e.outerHeight())}),s)},getLayoutAttrs:function(){return this.getAttrVals()},_getSyncCss:function(t){var e=this,n=e.get("cssProperties"),o=e._getDynacAttrs(),a={};return r.each(n,function(e){a[e]=i(o,t[e])}),a},_getDynacAttrs:function(){var t=this,e=t.get("container");return{width:e.width(),height:e.height()}},_getSyncAttr:function(t){var e=this,n=e.get("attrProperties"),i={};return r.each(n,function(e){i[e]=t[e]}),i},_getContainer:function(t){var e=this,n=e.get("container");return n?n:t.parent()},destroy:function(){var t=this;t.get("el").remove(),t.off(),t.clearAttrVals()}}),n.exports=a}),define("bui/layout/anchor",["bui/common","jquery"],function(t,e,n){var i=t("bui/common"),o=t("bui/layout/abstract"),r=t("bui/layout/item/anchor"),a=function(t){a.superclass.constructor.call(this,t)};a.ATTRS={itemConstructor:{value:r},itemTpl:{value:'<div class="x-layout-item"></div>'}},i.extend(a,o),n.exports=a}),define("bui/layout/item/anchor",["bui/common","jquery"],function(t,e,n){function i(t,e){return o.isNumber(t)?t>0?t:"{"+e+"}"+t:o.isString(t)&&0==t.indexOf("-")?"{"+e+"}"+t:t}var o=t("bui/common"),r=t("bui/layout/item/base"),a=function(t){a.superclass.constructor.call(this,t)};a.ATTRS={anchor:{value:["100%"]}},o.extend(a,r),o.augment(a,{getLayoutAttrs:function(){var t=this,e=t.get("anchor"),n=o.mix({},t.getAttrVals()),r=e[0],a=e[1];return n.width=i(r,"width"),n.height=i(a,"height"),n}}),n.exports=a}),define("bui/layout/flow",["bui/common","jquery"],function(t,e,n){var i=t("bui/common"),o=t("bui/layout/abstract"),r=t("bui/layout/item/base"),a=function(t){a.superclass.constructor.call(this,t)};a.ATTRS={itemConstructor:{value:r},itemTpl:{value:'<div class="x-layout-item-flow pull-left"></div>'}},i.extend(a,o),n.exports=a}),define("bui/layout/absolute",["bui/common","jquery"],function(t,e,n){var i="x-layout-relative",o=t("bui/common"),r=t("bui/layout/abstract"),a=t("bui/layout/item/absolute"),s=function(t){s.superclass.constructor.call(this,t)};s.ATTRS={itemConstructor:{value:a},elCls:{value:i},tpl:{},itemTpl:{value:'<div class="x-layout-item-absolute"></div>'}},o.extend(s,r),n.exports=s}),define("bui/layout/item/absolute",["bui/common","jquery"],function(t,e,n){var i=t("bui/common"),o=t("bui/layout/item/base"),r=function(t){r.superclass.constructor.call(this,t)};i.extend(r,o),r.ATTRS={cssProperties:{value:["top","left","bottom","right"]}},i.augment(r,{}),n.exports=r}),define("bui/layout/columns",["jquery","bui/common"],function(t,e,n){var i=t("jquery"),o=t("bui/common"),r=t("bui/layout/abstract"),a=function(t){a.superclass.constructor.call(this,t)};a.ATTRS={columns:{value:1},columnTpl:{value:'<div class="x-layout-column"></div>'},tpl:{value:'<div class="x-layout-columns"></div>'},itemTpl:{value:'<div class="x-layout-item-column"></div>'}},o.extend(a,r),o.augment(a,{resetLayout:function(){var t=this;t._setColumnsWidth(),a.superclass.resetLayout.call(t)},moveItem:function(t,e){var n,i=this;e>=i.get("columns")||0>e||(t.set("col",e),n=i.getItemContainer({col:e}),t.set("container",n),t.get("el").appendTo(n))},afterWraper:function(){for(var t=this,e=t.get("columns"),n=t.get("container"),i=[],o=0;e>o;o++)i.push(t.get("columnTpl"));n.html(i.join("")),t._setColumnsWidth()},_setColumnsWidth:function(){var t=this,e=t.get("container"),n=e.children(),r=e.width(),a=parseInt(r/n.length,10);o.each(n,function(t){var e=i(t),n=e.outerWidth()-e.width();e.width(a-n)})},getItemContainer:function(t){var e=this,n=e.get("items"),o=e.get("columns"),r=this.get("container");return void 0===t.col&&(t.col=n.length%o),i(r.find(".x-layout-column")[t.col])}}),n.exports=a}),define("bui/layout/table",["jquery","bui/common"],function(t,e,n){var i=t("jquery"),o=t("bui/common"),r=t("bui/layout/abstract"),a=t("bui/layout/item/cell"),s=function(t){s.superclass.constructor.call(this,t)};s.ATTRS={itemConstructor:{value:a},lastRow:{value:0},tpl:{value:'<table class="x-layout-table"><tbody></tbody></table>'},defaultCfg:{value:{fit:"both"}},columns:{},rows:{},itemTpl:{value:'<td class="x-layout-item-cell"></td>'}},o.extend(s,r),o.augment(s,{afterWraper:function(){for(var t=this,e=t.get("rows"),n=t.get("container"),i=[],o=0;e>o;o++)i.push("<tr></tr>");n.find("tbody").html(i.join(""))},getItemContainer:function(t){var e=this.get("container");return i(e.find("tr")[t.row])},_getItemAppend:function(){var t=this,e=t.get("appendHeight");if(null==e){var n,i=t.getItemAt(0);i&&(e={},n=i.get("el"),e.width=n.outerHeight()-n.height(),e.height=n.outerWidth()-n.width(),t.set("append",e))}return e||{width:0,height:0}},_getCellAvg:function(){var t=this,e=t.get("control"),n=t.get("rows"),i=t.get("columns"),o=e.get("height"),r=e.get("width"),a=t._getItemAppend(),s=(o-a.height*n)/n,l=(r-a.width*i)/i;return{append:a,avgHeight:s,avgWidth:l}},_getItemDime:function(t,e){var n=this,i=n._getCellAvg();return t=t||1,e=e||1,{height:i.avgHeight*t+(t-1)*i.append.height,width:i.avgWidth*e+(e-1)*i.append.width}},resetLayout:function(){var t=this,e=t.getItems();o.each(e,function(e){var n=t._getItemDime(e.get("rowspan"),e.get("colspan"));e.set(n)}),s.superclass.resetLayout.call(this)},afterInitItems:function(){this.resetLayout()}}),n.exports=s}),define("bui/layout/item/cell",["bui/common","jquery"],function(t,e,n){var i=t("bui/common"),o=t("bui/layout/item/base"),r=function(t){r.superclass.constructor.call(this,t)};r.ATTRS={row:{},rowspan:{value:1},colspan:{value:1},attrProperties:{value:["rowspan","colspan"]},cells:{getter:function(){return this.get("rowspan")*this.get("colspan")}}},i.extend(r,o),i.augment(r,{}),n.exports=r}),define("bui/layout/border",["bui/common","jquery"],function(t,e,n){var i=t("bui/common"),o=t("bui/layout/abstract"),r=t("bui/layout/item/border"),a=t("bui/layout/collapsable"),s="x-border-top",l="x-border-middle",u="x-border-bottom",c=r.REGINS,d=function(t){d.superclass.constructor.call(this,t)};d.ATTRS={layoutEvents:{value:["afterAddChild","afterRemoveChild"]},itemConstructor:{value:r},wraperCls:{value:"x-border-body"},duration:{value:200},triggerCls:{value:"x-collapsed-btn"},tpl:{value:'<div class="x-layout-border">				<div class="'+s+'"></div>				<div class="'+l+'"></div>				<div class="'+u+'"></div>			</div>'},itemTpl:{value:'<div class="x-border-{region} x-layout-item-border"><div class="x-border-body"></div></div>'}},i.extend(d,o),i.mixin(d,[a]),i.augment(d,{appendEvent:function(){this.bindCollapseEvent()},afterWraper:function(){var t=this,e=t.get("container"),n=e.find("."+s),i=e.find("."+l),o=e.find("."+u);t.set("topEl",n),t.set("middleEl",i),t.set("bottomEl",o)},afterInitItems:function(){this._setMiddleDimension()},_setMiddleDimension:function(){var t=this,e=t.get("middleEl"),n=t._getMiddleHeight(),i=t._getMiddleLeft(),o=t._getMiddleRight(),r=(t.get("items"),t.getItemsByRegion("center")[0]);if(e.height(n),r){var a=r.get("el");a.css({marginLeft:i,marginRight:o})}t._fitMiddleControl()},_fitMiddleControl:function(){var t=this,e=t.getItems();i.each(e,function(t){var e=t.get("region");(e==c.EAST||e==c.WEST||e==c.CENTER)&&t.syncFit()})},_getMiddleHeight:function(){var t,e,n=this,i=n.get("container"),o=i.height(),r=n.get("middleEl"),a=n.get("topEl");return e=a.children().length?o-a.outerHeight()-n.get("bottomEl").outerHeight():o-n.get("bottomEl").outerHeight(),t=r.outerHeight()-r.height(),e-t},getItemsByRegion:function(t){return this.getItemsBy(function(e){return e.get("region")===t})},_getMiddleLeft:function(){var t=this,e=t.getItemsByRegion("west"),n=0;return i.each(e,function(t){n+=t.get("el").outerWidth()}),n},_getMiddleRight:function(){var t=this,e=t.getItemsByRegion("east"),n=0;return i.each(e,function(t){n+=t.get("el").outerWidth()}),n},getItemContainer:function(t){var e,n=this;switch(t.region){case c.NORTH:e=n.get("topEl");break;case c.SOUTH:e=n.get("bottomEl");break;default:e=n.get("middleEl")}return e},beforeExpanded:function(t,e){this.beforeCollapsedChange(t,e,!1)},beforeCollapsedChange:function(t,e,n){var i=this,o=t.getCollapseProperty(),r=n?1:-1,a=i.get("duration");"height"==o?i._setMiddleHeight(e*r,a):i._setCenterWidth(t.get("region"),e*r*-1,a)},_setMiddleHeight:function(t,e){var n=this,i=n.get("middleEl"),o=i.height(),r=o+t;i.animate({height:r},e)},_setCenterWidth:function(t,e,n){var i,o,r=this,a=r.getItemsByRegion("center")[0],s=t==c.EAST?"marginRight":"marginLeft",l={};a&&(i=a.get("el")),o=parseFloat(i.css(s)),l[s]=e+o,i.animate(l,n)},getCollapsedRange:function(t){return t.getCollapsedRange()},beforeCollapsed:function(t,e){this.beforeCollapsedChange(t,e,!0)},afterExpanded:function(){6!=i.UA.ie&&this._fitMiddleControl()},afterCollapsed:function(){6!=i.UA.ie&&this._fitMiddleControl()},resetLayout:function(){var t=this;d.superclass.resetLayout.call(t),t._setMiddleDimension()}}),n.exports=d}),define("bui/layout/item/border",["bui/common","jquery"],function(t,e,n){var i=t("bui/common"),o=t("bui/layout/item/base"),r="x-collapsed",a={NORTH:"north",EAST:"east",SOUTH:"south",WEST:"west",CENTER:"center"},s=function(t){s.superclass.constructor.call(this,t)};s.ATTRS={region:{},titleTpl:{value:'<div class="x-border-title x-border-title-{region}">{title}</div>'},collapseTpl:{value:'<s class="x-collapsed-btn x-collapsed-{region}"></s>'},collapsable:{value:!1},collapsed:{value:!1},leftRange:{value:28},tplProperties:{value:[{name:"title",value:"titleTpl",prev:!0},{name:"collapsable",value:"collapseTpl",prev:!0}]},statusProperties:{value:["collapsed"]}},s.REGINS=a,i.extend(s,o),i.augment(s,{syncElements:function(t,e){s.superclass.syncElements.call(this,t,e);var n=this,t=n.get("el"),i=n.getCollapseProperty();n.get("collapsed")&&n.get(i)==t[i]()&&n.collapse(0)},expand:function(t,e,n){var i=this,o=i.getCollapseProperty(),a=i.get("el"),s=i.get(o),l={};l[o]=s,a.animate(l,e,function(){i.set("collapsed",!1),a.removeClass(r),n&&n()})},getCollapseProperty:function(){var t=this,e=t.get("region");return e==a.SOUTH||e==a.NORTH?"height":"width"},_getLeftRange:function(){var t=this,e=(t.get("el"),t.get("leftRange"));return e},getCollapsedRange:function(){var t=this,e=t.getCollapseProperty(),n=(t.get("el"),t.get(e));if(i.isString(n)){var o=t._getDynacAttrs();-1!=n.indexOf("{")?(n=i.substitute(n,o),n=i.JSON.looseParse(n)):n=-1!=n.indexOf("%")?.01*parseInt(n,10)*o[e]:parseInt(n,10)}return n-t._getLeftRange(e)},collapse:function(t,e){var n=this,i=n.getCollapseProperty(),o=n.get("el"),a=n._getLeftRange(i),s={};s[i]=a,o.animate(s,t,function(){n.set("collapsed",!0),o.addClass(r),e&&e()})}}),n.exports=s}),define("bui/layout/collapsable",["jquery","bui/common"],function(t,e,n){var i=t("jquery"),o=t("bui/common"),r=function(){};r.ATTRS={triggerCls:{},duration:{value:400},accordion:{value:!1}},o.augment(r,{bindCollapseEvent:function(){var t=this,e=t.get("triggerCls"),n=t.get("container");n.delegate("."+e,"click",function(e){var n=i(e.currentTarget),o=t.getItemByElement(n);t.toggleCollapse(o)})},getExpandedItem:function(){return this.getItemBy(function(t){return!t.get("collapsed")})},expandItem:function(t){var e,n=this,i=n.get("duration"),o=n.getCollapsedRange(t);t.get("collapsed")&&(n.get("accordion")&&(e=n.getExpandedItem(),e&&(n.beforeCollapsed(e,o),e.collapse(i,function(){n.afterCollapsed(e)}))),n.beforeExpanded(t,o),t.expand(o,i,function(){n.afterExpanded(t)}))},afterExpanded:function(){},beforeExpanded:function(){},collapseItem:function(t){var e,n=this,i=n.get("duration"),o=n.getCollapsedRange(t);t.get("collapsed")||(n.get("accordion")&&(e=n.getNextItem(t),n.beforeExpanded(e,o),e.expand(o,i,function(){n.afterExpanded(e)})),n.beforeCollapsed(t,o),t.collapse(i,function(){n.afterCollapsed(t)}))},beforeCollapsed:function(){},afterCollapsed:function(){},getCollapsedRange:function(){},toggleCollapse:function(t){var e=this;t.get("collapsed")?e.expandItem(t):e.collapseItem(t)}}),n.exports=r}),define("bui/layout/accordion",["jquery","bui/common"],function(t,e,n){var i=t("jquery"),o="x-layout-item-accordion",r=t("bui/common"),a=t("bui/layout/abstract"),s=t("bui/layout/item/tab"),l=t("bui/layout/collapsable"),u=function(t){u.superclass.constructor.call(this,t)};u.ATTRS={itemConstructor:{value:s},wraperCls:{value:"x-accordion-body"},titleCls:{value:"x-accordion-title"},triggerCls:{value:"x-accordion-title"},layoutEvents:{value:["afterAddChild","afterRemoveChild"]},duration:{value:400},accordion:{value:!0},itemTpl:{value:'<div class="'+o+'"><div class="x-accordion-title">{title}<s class="x-expand-button"></s></div><div class="x-accordion-body"></div></div>'}},r.extend(u,a),r.mixin(u,[l]),r.augment(u,{appendEvent:function(){this.bindCollapseEvent()},getActivedItem:function(){return this.getExpandedItem()},afterInitItems:function(){this._resetActiveItem()},_resetActiveItem:function(){var t=this,e=t.getActivedItem()||t.getItems()[0];e.expand(t.getCollapsedRange(),0)},resetLayout:function(){var t=this;u.superclass.resetLayout.call(t),t._resetActiveItem()},getCollapsedRange:function(){var t=this,e=t.get("container"),n=e.height(),o=e.find("."+t.get("titleCls")),a=n;return r.each(o,function(t){a-=i(t).outerHeight()}),a}}),n.exports=u}),define("bui/layout/item/tab",["bui/common","jquery"],function(t,e,n){var i=t("bui/common"),o="x-collapsed",r=t("bui/layout/item/base"),a=function(t){a.superclass.constructor.call(this,t)};a.ATTRS={collapsed:{value:!0},statusProperties:{value:["collapsed"]}},i.extend(a,r),i.augment(a,{expand:function(t,e){var n=this,i=n.get("el"),r=n.get("bodyEl");r.animate({height:t},e,function(){i.removeClass(o),n.syncFit()}),n.set("collapsed",!1)},collapse:function(t){var e=this,n=e.get("el"),i=e.get("bodyEl");i.animate({height:0},t,function(){n.addClass(o)}),e.set("collapsed",!0)}}),n.exports=a}),define("bui/layout/viewport",["jquery","bui/common"],function(t,e,n){var i=t("jquery"),o=t("bui/common"),r="x-viewport-container",a=(o.UA,window),s=o.Component.Controller.extend({renderUI:function(){this.reset();var t=this,e=t.get("render");i(e).addClass(r)},bindUI:function(){var t=this;i(a).on("resize",o.wrapBehavior(t,"onResize"))},onResize:function(){this.reset()},reset:function(){var t=this,e=(t.get("el"),o.viewportHeight()),n=o.viewportWidth(),i=t.getAppendWidth(),r=t.getAppendHeight();t.set("width",n-i),t.set("height",e-r),t.fire("resize")},destructor:function(){i(a).off("resize",o.getWrapBehavior(this,"onResize"))}},{ATTRS:{render:{value:"body"}}},{xclass:"view-port"});n.exports=s});