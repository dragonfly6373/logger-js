(()=>{"use strict";var e={492:function(e,i,t){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(i,"__esModule",{value:!0});const r=t(81),l=o(t(17)),n=o(t(357)),s=o(t(245));class f{constructor(e){this._prefix="Logger",this._prefix=e}static config(e){f._configs=e}error(...e){let i=f._configs.timeIncluded?(new Date).toTimeString():"",t=n.default.red(`[ERROR][${this._prefix}]`);console.log.apply(null,[[i,t].join(" "),...e]),f._configs.isWriteToFile&&this._writefile(i,t,e)}warn(...e){if(f._configs.level<f.Levels.WARN)return;let i=f._configs.timeIncluded?(new Date).toTimeString():"",t=n.default.yellow(`[WARN][${this._prefix}]`);console.log.apply(null,[[i,t].join(" "),...e]),f._configs.isWriteToFile&&this._writefile(i,t,e)}info(...e){if(f._configs.level<f.Levels.INFO)return;let i=f._configs.timeIncluded?(new Date).toTimeString():"",t=n.default.green(`[INFO][${this._prefix}]`);console.log.apply(null,[[i,t].join(" "),...e]),f._configs.isWriteToFile&&this._writefile(i,t,e)}debug(...e){if(f._configs.level<f.Levels.DEBUG)return;let i=f._configs.timeIncluded?(new Date).toTimeString():"",t=n.default.blue(`[DEBUG][${this._prefix}]`);console.log.apply(null,[[i,t].join(" "),...e])}_writefile(e,i,t){if(!f._configs.isWriteToFile)return;const o=`${l.default.join(f._configs.logDir,"media-server_"+(0,s.default)().format("yyyyMMDD")+".log")}`;let n=`${e} ${i} - ${t.map((e=>JSON.stringify(e))).join(", ")}`;(0,r.exec)(`echo "${n.replace(/[\\$'"]/g,"\\$&")}" >> ${o}`,((e,i,t)=>{e&&console.log("Write log error:",e.message,t)}))}}f.Levels={ERROR:1,WARN:2,INFO:3,DEBUG:4},f._configs={level:4,isWriteToFile:!1,logDir:"",timeIncluded:!0},i.default=f},357:e=>{e.exports=require("colors")},245:e=>{e.exports=require("moment")},81:e=>{e.exports=require("child_process")},17:e=>{e.exports=require("path")}},i={};!function t(o){var r=i[o];if(void 0!==r)return r.exports;var l=i[o]={exports:{}};return e[o].call(l.exports,l,l.exports,t),l.exports}(492)})();