(this["webpackJsonppiano-tuning"]=this["webpackJsonppiano-tuning"]||[]).push([[0],{19:function(e,n,t){},20:function(e,n,t){},23:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(11),i=t.n(o),c=(t(19),t(3)),u=t(2),l=t(4),s=(t(20),t(0)),h=function(e){var n=Object(r.useRef)(),t=Object(r.useRef)(),a=e||{},o=a.width,i=a.height,c=a.domain;o||(o=1024),i||(i=300),c||(c={x1:0,y1:0,x2:o,y2:i});var u=function(e){if(!c||!o)throw new Error;return(e-c.x1)/(c.x2-c.x1)*o},l=function(e){if(!c||!i)throw new Error;return(e-c.y1)/(c.y2-c.y1)*i},s=function(){return!t.current&&n.current&&(t.current=n.current.getContext("2d")),t.current};return{canvasRef:n,width:o,height:i,getCanvasContext:s,setDomain:function(e){c=e},clear:function(){var e=s();e&&o&&i&&e.clearRect(0,0,o,i)},line:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"gray",t=s();t&&(t.strokeStyle=n,t.beginPath(),t.moveTo(u(e.x1),l(e.y1)),t.lineTo(u(e.x2),l(e.y2)),t.stroke())},rect:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"gray",t=s();t&&(t.fillStyle=n,t.fillRect(u(e.x1),l(e.y1),u(e.x2)-u(e.x1),l(e.y2)-l(e.y1)))},circle:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"gray",r=s();r&&(r.strokeStyle=t,r.beginPath(),r.arc(u(e.x),l(e.y),n,0,2*Math.PI),r.stroke())},text:function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"gray",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"8px Arial",a=s();a&&(a.fillStyle=t,a.font=r,a.fillText(n,u(e.x),l(e.y)))}}},d=function(e){var n=e.width,t=e.height,r=e.canvasRef;return Object(s.jsx)("canvas",{ref:r,width:n,height:t,style:{border:"1px dashed gray"}})},v=[{pos:1,key:"A",octave:0,idx:0,sharp:!1,hz:27.5,name:"A0 Double Pedal A"},{pos:2,key:"A",octave:0,idx:0,sharp:!0,hz:29.1352,name:"A\u266f0/B\u266d0"},{pos:3,key:"B",octave:0,idx:1,sharp:!1,hz:30.8677,name:"B0"},{pos:4,key:"C",octave:1,idx:2,sharp:!1,hz:32.7032,name:"C1 Pedal C"},{pos:5,key:"C",octave:1,idx:2,sharp:!0,hz:34.6478,name:"C\u266f1/D\u266d1"},{pos:6,key:"D",octave:1,idx:3,sharp:!1,hz:36.7081,name:"D1"},{pos:7,key:"D",octave:1,idx:3,sharp:!0,hz:38.8909,name:"D\u266f1/E\u266d1"},{pos:8,key:"E",octave:1,idx:4,sharp:!1,hz:41.2034,name:"E1"},{pos:9,key:"F",octave:1,idx:5,sharp:!1,hz:43.6535,name:"F1"},{pos:10,key:"F",octave:1,idx:5,sharp:!0,hz:46.2493,name:"F\u266f1/G\u266d1"},{pos:11,key:"G",octave:1,idx:6,sharp:!1,hz:48.9994,name:"G1"},{pos:12,key:"G",octave:1,idx:6,sharp:!0,hz:51.9131,name:"G\u266f1/A\u266d1"},{pos:13,key:"A",octave:1,idx:7,sharp:!1,hz:55,name:"A1"},{pos:14,key:"A",octave:1,idx:7,sharp:!0,hz:58.2705,name:"A\u266f1/B\u266d1"},{pos:15,key:"B",octave:1,idx:8,sharp:!1,hz:61.7354,name:"B1"},{pos:16,key:"C",octave:2,idx:9,sharp:!1,hz:65.4064,name:"C2 Deep C"},{pos:17,key:"C",octave:2,idx:9,sharp:!0,hz:69.2957,name:"C\u266f2/D\u266d2"},{pos:18,key:"D",octave:2,idx:10,sharp:!1,hz:73.4162,name:"D2"},{pos:19,key:"D",octave:2,idx:10,sharp:!0,hz:77.7817,name:"D\u266f2/E\u266d2"},{pos:20,key:"E",octave:2,idx:11,sharp:!1,hz:82.4069,name:"E2"},{pos:21,key:"F",octave:2,idx:12,sharp:!1,hz:87.3071,name:"F2"},{pos:22,key:"F",octave:2,idx:12,sharp:!0,hz:92.4986,name:"F\u266f2/G\u266d2"},{pos:23,key:"G",octave:2,idx:13,sharp:!1,hz:97.9989,name:"G2"},{pos:24,key:"G",octave:2,idx:13,sharp:!0,hz:103.826,name:"G\u266f2/A\u266d2"},{pos:25,key:"A",octave:2,idx:14,sharp:!1,hz:110,name:"A2"},{pos:26,key:"A",octave:2,idx:14,sharp:!0,hz:116.541,name:"A\u266f2/B\u266d2"},{pos:27,key:"B",octave:2,idx:15,sharp:!1,hz:123.471,name:"B2"},{pos:28,key:"C",octave:3,idx:16,sharp:!1,hz:130.813,name:"C3"},{pos:29,key:"C",octave:3,idx:16,sharp:!0,hz:138.591,name:"C\u266f3/D\u266d3"},{pos:30,key:"D",octave:3,idx:17,sharp:!1,hz:146.832,name:"D3"},{pos:31,key:"D",octave:3,idx:17,sharp:!0,hz:155.563,name:"D\u266f3/E\u266d3"},{pos:32,key:"E",octave:3,idx:18,sharp:!1,hz:164.814,name:"E3"},{pos:33,key:"F",octave:3,idx:19,sharp:!1,hz:174.614,name:"F3"},{pos:34,key:"F",octave:3,idx:19,sharp:!0,hz:184.997,name:"F\u266f3/G\u266d3"},{pos:35,key:"G",octave:3,idx:20,sharp:!1,hz:195.998,name:"G3"},{pos:36,key:"G",octave:3,idx:20,sharp:!0,hz:207.652,name:"G\u266f3/A\u266d3"},{pos:37,key:"A",octave:3,idx:21,sharp:!1,hz:220,name:"A3"},{pos:38,key:"A",octave:3,idx:21,sharp:!0,hz:233.082,name:"A\u266f3/B\u266d3"},{pos:39,key:"B",octave:3,idx:22,sharp:!1,hz:246.942,name:"B3"},{pos:40,key:"C",octave:4,idx:23,sharp:!1,hz:261.626,name:"C4 Middle C"},{pos:41,key:"C",octave:4,idx:23,sharp:!0,hz:277.183,name:"C\u266f4/D\u266d4"},{pos:42,key:"D",octave:4,idx:24,sharp:!1,hz:293.665,name:"D4"},{pos:43,key:"D",octave:4,idx:24,sharp:!0,hz:311.127,name:"D\u266f4/E\u266d4"},{pos:44,key:"E",octave:4,idx:25,sharp:!1,hz:329.628,name:"E4"},{pos:45,key:"F",octave:4,idx:26,sharp:!1,hz:349.228,name:"F4"},{pos:46,key:"F",octave:4,idx:26,sharp:!0,hz:369.994,name:"F\u266f4/G\u266d4"},{pos:47,key:"G",octave:4,idx:27,sharp:!1,hz:391.995,name:"G4"},{pos:48,key:"G",octave:4,idx:27,sharp:!0,hz:415.305,name:"G\u266f4/A\u266d4"},{pos:49,key:"A",octave:4,idx:28,sharp:!1,hz:440,name:"A4 A440"},{pos:50,key:"A",octave:4,idx:28,sharp:!0,hz:466.164,name:"A\u266f4/B\u266d4"},{pos:51,key:"B",octave:4,idx:29,sharp:!1,hz:493.883,name:"B4"},{pos:52,key:"C",octave:5,idx:30,sharp:!1,hz:523.251,name:"C5 Tenor C"},{pos:53,key:"C",octave:5,idx:30,sharp:!0,hz:554.365,name:"C\u266f5/D\u266d5"},{pos:54,key:"D",octave:5,idx:31,sharp:!1,hz:587.33,name:"D5"},{pos:55,key:"D",octave:5,idx:31,sharp:!0,hz:622.254,name:"D\u266f5/E\u266d5"},{pos:56,key:"E",octave:5,idx:32,sharp:!1,hz:659.255,name:"E5"},{pos:57,key:"F",octave:5,idx:33,sharp:!1,hz:698.456,name:"F5"},{pos:58,key:"F",octave:5,idx:33,sharp:!0,hz:739.989,name:"F\u266f5/G\u266d5"},{pos:59,key:"G",octave:5,idx:34,sharp:!1,hz:783.991,name:"G5"},{pos:60,key:"G",octave:5,idx:34,sharp:!0,hz:830.609,name:"G\u266f5/A\u266d5"},{pos:61,key:"A",octave:5,idx:35,sharp:!1,hz:880,name:"A5"},{pos:62,key:"A",octave:5,idx:35,sharp:!0,hz:932.328,name:"A\u266f5/B\u266d5"},{pos:63,key:"B",octave:5,idx:36,sharp:!1,hz:987.767,name:"B5"},{pos:64,key:"C",octave:6,idx:37,sharp:!1,hz:1046.5,name:"C6 Soprano C(High C)"},{pos:65,key:"C",octave:6,idx:37,sharp:!0,hz:1108.73,name:"C\u266f6/D\u266d6"},{pos:66,key:"D",octave:6,idx:38,sharp:!1,hz:1174.66,name:"D6"},{pos:67,key:"D",octave:6,idx:38,sharp:!0,hz:1244.51,name:"D\u266f6/E\u266d6"},{pos:68,key:"E",octave:6,idx:39,sharp:!1,hz:1318.51,name:"E6"},{pos:69,key:"F",octave:6,idx:40,sharp:!1,hz:1396.91,name:"F6"},{pos:70,key:"F",octave:6,idx:40,sharp:!0,hz:1479.98,name:"F\u266f6/G\u266d6"},{pos:71,key:"G",octave:6,idx:41,sharp:!1,hz:1567.98,name:"G6"},{pos:72,key:"G",octave:6,idx:41,sharp:!0,hz:1661.22,name:"G\u266f6/A\u266d6"},{pos:73,key:"A",octave:6,idx:42,sharp:!1,hz:1760,name:"A6"},{pos:74,key:"A",octave:6,idx:42,sharp:!0,hz:1864.66,name:"A\u266f6/B\u266d6"},{pos:75,key:"B",octave:6,idx:43,sharp:!1,hz:1975.53,name:"B6"},{pos:76,key:"C",octave:7,idx:44,sharp:!1,hz:2093,name:"C7 Double high C"},{pos:77,key:"C",octave:7,idx:44,sharp:!0,hz:2217.46,name:"C\u266f7/D\u266d7"},{pos:78,key:"D",octave:7,idx:45,sharp:!1,hz:2349.32,name:"D7"},{pos:79,key:"D",octave:7,idx:45,sharp:!0,hz:2489.02,name:"D\u266f7/E\u266d7"},{pos:80,key:"E",octave:7,idx:46,sharp:!1,hz:2637.02,name:"E7"},{pos:81,key:"F",octave:7,idx:47,sharp:!1,hz:2793.83,name:"F7"},{pos:82,key:"F",octave:7,idx:47,sharp:!0,hz:2959.96,name:"F\u266f7/G\u266d7"},{pos:83,key:"G",octave:7,idx:48,sharp:!1,hz:3135.96,name:"G7"},{pos:84,key:"G",octave:7,idx:48,sharp:!0,hz:3322.44,name:"G\u266f7/A\u266d7"},{pos:85,key:"A",octave:7,idx:49,sharp:!1,hz:3520,name:"A7"},{pos:86,key:"A",octave:7,idx:49,sharp:!0,hz:3729.31,name:"A\u266f7/B\u266d7"},{pos:87,key:"B",octave:7,idx:50,sharp:!1,hz:3951.07,name:"B7"},{pos:88,key:"C",octave:8,idx:51,sharp:!1,hz:4186.01,name:"C8 Eighth octave"}];v.forEach((function(e){return e.hz=27.5*Math.pow(Math.pow(2,1/12),e.pos-1)}));var f=t(6),p=t.n(f),m="ebony",x="ivory",y="LEFT",g="MIDDLE",j="RIGHT";var b=function(e){var n=30,t=[],r=[],a=[],o=e.notes||[];return v.forEach((function(i){var c,u=function(e){var n,t,r=e%12;return 2===r||7===r?(n=j,t=m):5===r||10===r?(n=y,t=m):0===r?(n=g,t=m):(n=null,t=x),{shift:n,color:t}}(i.pos),l=n,h=125,d=22;u.color===m?(h-=45,d=11,u.shift===y?l=n-7:u.shift===g?l=n-5:u.shift===j?l=n-3:console.warn("SHIFT was not set")):(n+=22,a.push(Object(s.jsx)("text",{x:l+d/2,y:10,textAnchor:"middle",children:i.pos},i.pos+"number")),a.push(Object(s.jsx)("text",{style:{pointerEvents:"none"},x:l+d/2,y:120,textAnchor:"middle",children:i.key},i.pos+"key")));var v=!!o.find((function(e){return e.pos===i.pos})),f=Object(s.jsx)("rect",{rx:2,x:l,y:14,width:d,height:h,onClick:function(){var n;return null===(n=e.onClick)||void 0===n?void 0:n.call(e,i.pos-1)},style:null===(c=e.keyStyles)||void 0===c?void 0:c[i.pos],className:[p.a.key,u.color===m?p.a.ebony:p.a.ivory,v?p.a.lit:""].filter(Boolean).join(" ")},i.pos);u.color===m?r.push(f):t.push(f)})),Object(s.jsxs)("svg",{"data-ref":"piano",width:"1200",height:"200",children:[t,a,r]})},k={local:{sampleRate:44100,fftSize:32768,minDecibels:-90,maxDecibels:-10}},O="local";var z=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:O;return k[n][e]},C=t(12),F=t(13),A=function(){function e(n){var t=this;Object(C.a)(this,e),this.audioContext=void 0,this.analyser=void 0,this.sampleRate=void 0,this.fftSize=void 0,this.freqDataArray=void 0,this.timeDataArray=void 0,this.stepSize=void 0,this.creatContextAndAnalyser(n),navigator.getUserMedia({audio:!0},(function(e){t.audioContext.createMediaStreamSource(e).connect(t.analyser)}),(function(e){e&&console.error(e)}))}return Object(F.a)(e,[{key:"creatContextAndAnalyser",value:function(e){this.audioContext=new AudioContext,this.analyser=this.audioContext.createAnalyser(),this.analyser.fftSize=(null===e||void 0===e?void 0:e.fftSize)||32768,this.analyser.minDecibels=(null===e||void 0===e?void 0:e.minDecibels)||-90,this.analyser.maxDecibels=(null===e||void 0===e?void 0:e.maxDecibels)||-10,this.sampleRate=this.audioContext.sampleRate,this.fftSize=this.analyser.fftSize,this.stepSize=this.sampleRate/this.fftSize;var n=this.fftSize/2;this.freqDataArray=new Uint8Array(n),this.timeDataArray=new Uint8Array(n)}},{key:"getFrequencyData",value:function(){return this.analyser.getByteFrequencyData(this.freqDataArray),this.freqDataArray}},{key:"getTimeData",value:function(){return this.analyser.getByteTimeDomainData(this.timeDataArray),this.timeDataArray}}]),e}(),D=Math.pow(2,1/12),w=(D-1)/2+1,E=(D-1)/100+1,S=function(e){if((e=Object(c.a)(e||[])).filter(Boolean).length/e.length<.3)return e;var n=function n(t){var r,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=(null===(r=e[t])||void 0===r?void 0:r.center)||null;if(o)return o;if(3===a)return null;var i=5;if(e[t-1])if(e[t+1]){var c=n(t+1,a+1),u=n(t-1,a+1);o=null===c||null===u?null:(c+u)/2}else{var l=n(t-1,a+1),s=n(t-1-i,a+1);if(null===l||null===s)o=null;else{var h=(l-s)/i;o=l+h}}else{var d=n(t+1,a+1),v=n(t+1+i,a+1);if(null===d||null===v)o=null;else{var f=(v-d)/i;o=d-f}}return null!==o&&(e[t]={center:o,amplitude:0}),o};return e.forEach((function(e,t){return n(t)})),e};function M(e,n){for(var t=[],r=1;r<e.length-1;r++){var a="number"===typeof n?n:n[r],o=e[r-1],i=e[r],c=e[r+1];if(i>a&&i>=o&&i>=c){var u=r+.5*(o-c)/(o-2*i+c),l=i-.25*(u-r)*(o-c);t.push({center:u,amplitude:l})}}return t}var T=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:55e-5,r=e*(n+1)*Math.sqrt(1+t*n*n);return r},N=function(e,n){for(var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:55e-5,r=[],a=0;a<=n;a++)r.push({amplitude:255-10*a,center:T(e,a,t)});return r},q=function(e,n){var t,r=null,a=0,o=w;if(e.forEach((function(e){var i=Math.abs(n-e.center);(null===r||i<r/o||i<r*o&&a<=e.amplitude)&&(r=i,a=e.amplitude,t=e)})),!t)throw new Error;return t},G=function(e){var n=e.lowFq,t=e.highFq,r=e.stepSize,a=e.peaks,o=e.targetHarmonics;try{for(var i=[],c=function(e){var n,t=e/((null===(n=o[0])||void 0===n?void 0:n.center)||e);i.push(o.map((function(e){return Object(u.a)(Object(u.a)({},e),{},{center:((null===e||void 0===e?void 0:e.center)||0)*t})})))},l=n;l<t;l+=r)c(l);var s=function(e,n){var t=255,r=[];n.forEach((function(n){var a=0;n.forEach((function(r,o){var i=q(e,r.center),c=Math.abs(i.center-r.center)/r.center,u=-.5;c<w&&(u=i.amplitude/t/c),a+=u/n.length})),r.push(a)}));var a=[];e.forEach((function(r,o){n.forEach((function(n,o){var i=q(n,r.center);a[o]=a[o]||0;var c=Math.abs(i.center-r.center)/i.center,u=r.amplitude/t*-.5;c<w&&(u=r.amplitude/t/c),a[o]+=u/e.length}))}));for(var o=[],i=0,c=0;c<r.length;c++)o[c]=r[c]+.33*a[c],o[c]>i&&(i=o[c]);for(var u=0;u<o.length;u++)o[u]=o[u]/i;return o}(a,i),h=M(s,.2),d=h.length?h.reduce((function(e,n){return e.amplitude>n.amplitude?e:n})):null;return{prediction:s,maxPeak:d,peakCenterFq:n+((null===d||void 0===d?void 0:d.center)||0)*r}}catch(v){return{prediction:[],maxPeak:null,peakCenterFq:0}}};var R=[],B=function(e){var n=(e&&e.target).tagName.toLocaleLowerCase();["input","textfield","textarea"].indexOf(n)>-1||({metaKey:e.metaKey,altKey:e.altKey,shiftKey:e.shiftKey,ctrlKey:e.ctrlKey},R.forEach((function(n){return n(e)})))};document.addEventListener("keydown",B,!1),document.addEventListener("keyup",B,!1),document.addEventListener("keypress",B,!1);var P=function(e,n,t){Object(r.useEffect)((function(){var r=function(e,n,t){if(!e.length)return n;var r=t.pressType||["keydown"],a=new Set(("string"===typeof e?[e]:e).map((function(e){var n=e.toLowerCase().replace("++","+plus").replace("+ +","+plus").replace(/^\+/,"plus").split("+").map((function(e){return e.trim()})).map((function(e){return"plus"===e?"+":""===e?" ":e})),t=!1,r=!1,a=!1,o=!1,i=n[n.length-1];return n.forEach((function(e){"meta"===e||"command"===e||"cmd"===e?t=!0:"option"===e||"alt"===e?r=!0:"shift"===e?a=!0:"control"===e||"ctrl"===e?o=!0:i=e})),"".concat(t,"+").concat(r,"+").concat(a,"+").concat(o,"+").concat(i)})));return function(t){var o="".concat(t.metaKey,"+").concat(t.altKey,"+").concat(t.shiftKey,"+").concat(t.ctrlKey,"+").concat(t.key).toLowerCase();e.length&&!a.has(o)||-1!==r.indexOf(t.type)&&n(t)}}(e,n,{pressType:null===t||void 0===t?void 0:t.pressType});return R.push(r),function(){R=R.filter((function(e){return e!==r}))}}),[e,n,null===t||void 0===t?void 0:t.pressType])},I=t(8);function J(e){return void 0===e?e:JSON.parse(JSON.stringify(e))}var L=function(e){return Math.floor(Math.random()*e)},H=function(e){for(var n=[],t=[],r=function(e){for(var n=1,t=1,r=0;;){if(r++>1e3)throw new Error("not a fraction");if(n/t<e&&(n++,t=1),n/t>e&&t++,n/t===e)break}return[n,t]}(e),a=Object(l.a)(r,2),o=a[0],i=a[1],c=0,u=0,s=0;s<20;s++)c+=o,u+=i,n.push(c-1),t.push(u-1);return[n,t]},K={4:1.25,7:1.5,12:2,24:4},_=function(e,n){if(!e||!n)return null;var t=[];if(n.key<e.key){var r=e;e=n,n=r}var a=e.harmonics[0];e.harmonics.length<=2&&!e.harmonics[1]&&a&&((e=Object(u.a)(Object(u.a)({},e),{},{harmonics:Object(c.a)(e.harmonics)})).harmonics[1]={amplitude:a.amplitude,center:2.01*a.center});var o=K[n.key-e.key];if(!o)return null;for(var i=H(o),s=Object(l.a)(i,2),h=s[0],d=s[1],v=0;v<h.length;v++){var f,p,m,x;if(h[v]>=e.harmonics.length)break;if(d[v]>=n.harmonics.length)break;var y=(null===(f=e.harmonics[h[v]])||void 0===f?void 0:f.amplitude)||0,g=(null===(p=n.harmonics[d[v]])||void 0===p?void 0:p.amplitude)||0;if(y<20)break;if(g<20)break;var j=(null===(m=e.harmonics[h[v]])||void 0===m?void 0:m.center)||0,b=(null===(x=n.harmonics[d[v]])||void 0===x?void 0:x.center)||0,k=Math.abs((j-b)/j)*(y/255)*(g/255);t.push(k)}return t.length?t.reduce((function(e,n){return e+n}))/t.length/(E-1):null},W=function(e,n){return Object(u.a)(Object(u.a)({},e),{},{fundamentalFq:e.fundamentalFq*n,fundamentalFqTWM:e.fundamentalFqTWM*n,fundamentalFqAutocorr:e.fundamentalFqAutocorr*n,harmonics:e.harmonics.map((function(e){return e?Object(u.a)(Object(u.a)({},e),{},{center:e.center*n}):e}))})},U=function(e,n){var t=E,r=n(e),a=e;if(!r)return e;for(var o=!1,i=0;Math.abs(1-t)>1e-4&&i++<100;){var c=W(a,t),u=n(c)||0;u<r?(a=c,r=u):o?(o=!1,t/=2):(o=!0,t=1/t)}return a},X=function(e,n){for(var t=function(n){e[n]=U(e[n],(function(t){return _(e[n-12],t)}))},r=n+12;r<=87;r+=12)t(r);for(var a=function(n){e[n]=U(e[n],(function(t){return _(e[n+12],t)}))},o=n-12;o>=0;o-=12)a(o)},V=function(e){for(var n=0,t=0,r=0;r<88;r++)for(var a=r+1;a<88;a++){var o=_(e[r],e[a]);null!==o&&(n+=o,t++)}return n/t};function Y(e){var n="0123456789abcdef";return 0===e||isNaN(e)?"00":(e=Math.round(Math.min(Math.max(0,e),255)),n.charAt((e-e%16)/16)+n.charAt(e%16))}function Q(e){return"#"===e.charAt(0)?e.substring(1,7):e}function Z(e){return[parseInt(Q(e).substring(0,2),16),parseInt(Q(e).substring(2,4),16),parseInt(Q(e).substring(4,6),16)]}var $=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6,t=new AudioContext;e.forEach((function(e){if(e){var r=t.createOscillator();r.frequency.value=e.center;var a=t.createGain();a.gain.value=e.amplitude/255,a.gain.exponentialRampToValueAtTime(1e-5,t.currentTime+n),r.connect(a),a.connect(t.destination),r.start(0),r.stop(n)}})),setTimeout((function(){return t.close()}),333*n)},ee=t(10),ne=t.n(ee),te=t(14),re=function(){var e=Object(r.useState)(!document.hidden),n=Object(l.a)(e,2),t=n[0],a=n[1];return Object(r.useEffect)((function(){var e=function(){t===document.hidden&&a(!document.hidden)};return window.addEventListener("visibilitychange",e),function(){return window.removeEventListener("visibilitychange",e)}}),[t]),t},ae={},oe="undefined"!==typeof localStorage,ie="PIANO-TUNING-DATA-STORE",ce=12096e5,ue=0;function le(){if(oe){var e=localStorage.getItem(ie);if(e)return JSON.parse(e)}return ae}function se(e){ae=e,oe&&localStorage.setItem(ie,JSON.stringify(e))}function he(e){var n=le();delete n[e],se(n)}var de={set:function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:ce,r=le();return r[e]={expiration:Date.now()+t,value:n},se(r),n},get:function(e){var n=le()[e];if(n)return n.expiration<Date.now()?he(e):n.value},clear:he,checkForExpired:function(){if(!(Date.now()<ue+36e5)){var e=le();Object.keys(e).forEach((function(n){e[n].expiration<Date.now()&&delete e[n]})),se(e),ue=Date.now()}}},ve=function(e,n){for(var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:20,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5e3,a=[],o=Math.floor(n/r)-1,i=Math.ceil(n/t)+1,c=e.length-i,u=0,l=1,s=-1,h=o;h<i;h++){var d=0;c=e.length-h;for(var v=0;v<c;v++){var f=(e[v]-128)/128,p=(e[v+h]-128)/128;d+=f*p}var m=d/c;a.push(m),m<l&&(l=m),m>u&&(u=m,s=h)}return a.map((function(e,t){return{r:(e-l)/(u-l),k:t/s,fq:n/(t+o)}}))},fe=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:20,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5e3,a=ve(e,n,t,r),o=M(a.map((function(e){return e.r})),.9),i=o.map((function(e){var n,t,r=Math.floor(e.center),o=e.center-r,i=null===(n=a[r])||void 0===n?void 0:n.fq,c=(null===(t=a[r+1])||void 0===t?void 0:t.fq)||i;return{amplitude:e.amplitude,center:i*(1-o)+c*o}})),c=0,u=0;return i.forEach((function(e){e.amplitude>1.05*u&&(u=e.amplitude,c=e.center)})),{autocorrelation:a,autoPeaksFq:i,largestPeakFq:c}};function pe(e,n){var t="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e)),r=document.createElement("a");r.setAttribute("href",t),r.setAttribute("download",n),document.body.appendChild(r),r.click(),r.remove()}function me(e){return{type:"file",onChange:function(n){var t=n.target.files;if(null===t||void 0===t?void 0:t.length){var r=t[0],a=new FileReader;a.onload=function(n){var t,r=null===(t=n.target)||void 0===t?void 0:t.result;e(JSON.parse(r))},a.readAsText(r)}}}}var xe=function(e){var n=0;return e.forEach((function(e){return n+=e})),n/=e.length},ye=function(e){var n=null;return e.forEach((function(e){(null===n||e>n)&&(n=e)})),n},ge=de.get("recordedHarmonics")||{},je=de.get("tunedHarmonics")||{},be=function(e,n,t){for(var r,a=Z(e),o=Z(n),i=t,c=0,u=[],l=0;l<i;l++){var s=[0,0,0];c+=1/i,s[0]=o[0]*c+(1-c)*a[0],s[1]=o[1]*c+(1-c)*a[1],s[2]=o[2]*c+(1-c)*a[2],u.push(Y((r=s)[0])+Y(r[1])+Y(r[2]))}return u}("00FF00","FF0000",100),ke={mode:"recording",noteSounds:{harmonics:"tuned",notes:[]},tuning:{curve:"entropy"},transition:{auto:"next"},hiddenCharts:[]};var Oe=function(){var e=Object(r.useRef)(),n=Object(r.useRef)({autoChange:0,volume:[],lastReset:0}),t=Object(r.useRef)(de.get("tuningSettings")||ke),a=Object(r.useRef)(0),o=Object(r.useState)(0),i=Object(l.a)(o,2),f=i[0],p=i[1],m=function(e){var n,r,o,i,c,u="recorded"===t.current.noteSounds.harmonics?ge:je,l=t.current.noteSounds.notes;-1!==l.indexOf(0)&&$(null===u||void 0===u||null===(n=u[e])||void 0===n?void 0:n.harmonics),-1!==l.indexOf(l[4])&&e+4<88&&$(null===u||void 0===u||null===(r=u[e+4])||void 0===r?void 0:r.harmonics),-1!==l.indexOf(l[7])&&e+7<88&&$(null===u||void 0===u||null===(o=u[e+7])||void 0===o?void 0:o.harmonics),-1!==l.indexOf(l[12])&&e+12<88&&$(null===u||void 0===u||null===(i=u[e+12])||void 0===i?void 0:i.harmonics),-1!==l.indexOf(l[24])&&e+24<88&&$(null===u||void 0===u||null===(c=u[e+24])||void 0===c?void 0:c.harmonics),p(e),a.current=e};P("ArrowLeft",(function(){f>0&&m(f-1)})),P("ArrowRight",(function(){f<87&&m(f+1)})),function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,t=re();Object(r.useEffect)((function(){if(t){var r=0,a=!0,o=function(){var t=Object(te.a)(ne.a.mark((function t(){return ne.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(clearTimeout(r),a){t.next=3;break}return t.abrupt("return");case 3:return t.next=5,e();case 5:r=window.setTimeout(o,n);case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return r=window.setTimeout(o,0),function(){a=!1,clearTimeout(r)}}}),[t,e,n])}((function(){JSON.stringify(de.get("recordedHarmonics"))!==JSON.stringify(ge)&&de.set("recordedHarmonics",ge),JSON.stringify(de.get("tunedHarmonics"))!==JSON.stringify(je)&&de.set("tunedHarmonics",je),JSON.stringify(de.get("tuningSettings"))!==JSON.stringify(t.current)&&de.set("tuningSettings",t.current)}),6e4);var x=Object(r.useState)(0),y=Object(l.a)(x,2)[1],g=function(){return y((function(e){return e+1}))},j={};!function(){for(var e="recorded"===t.current.noteSounds.harmonics?ge:je,n=t.current.noteSounds.notes,r={},a=e[f],o=0;o<88;o++)if(-1!==n.indexOf(Math.abs(e[o].key-a.key))){var i=_(a,e[o]);if(null!==i){r[o]=i;var c=Math.floor(Math.min(99,10*i));j[o+1]={fill:"#".concat(be[c])}}}}();var k,O=Math.min(window.innerWidth-2,1024),C=Math.min(O/1024*300,150),F=h({domain:{x1:0,x2:4500,y1:255,y2:0},width:O,height:C}),T=h({domain:{x1:1/D,x2:D,y1:255,y2:0},width:O,height:C}),q=h({domain:{x1:-2,x2:104,y1:1,y2:0},width:O,height:C}),R=h({domain:{x1:0,x2:4500,y1:1,y2:0},width:O,height:C}),B=h({domain:{x1:-1,x2:50,y1:2,y2:.8},width:O,height:C}),H=h({domain:{x1:-1,x2:88,y1:1*D,y2:1/D},width:O,height:C}),K=function(e){var n,r;return-1===(null!==(n=null===(r=t.current.hiddenCharts)||void 0===r?void 0:r.indexOf(e))&&void 0!==n?n:-1)},Y=function(e){var n=t.current.hiddenCharts.indexOf(e);-1===n?t.current.hiddenCharts.push(e):t.current.hiddenCharts.splice(n,1),g()};return k=function(){var r=v[a.current];F.clear(),T.clear(),q.clear(),B.clear(),H.clear(),R.clear(),function(){var e,n,t,o,i,c,u,l,s,h=(null===(e=je[a.current])||void 0===e?void 0:e.fundamentalFq)||0,d=(null===(n=ge[a.current])||void 0===n?void 0:n.fundamentalFq)||0;B.line({x1:0,x2:49,y1:1,y2:1}),B.line({x1:0,x2:49,y1:(h||d)/r.hz,y2:(h||d)/r.hz},"red"),B.text({x:0,y:1.9},"".concat(r.name," (").concat(Math.round(100*r.hz)/100,")")),d&&B.text({x:0,y:1.8},"Recorded (".concat(Math.round(100*d)/100,")")),h&&B.text({x:0,y:1.7},"Tuned (".concat(Math.round(100*h)/100,")"),"red"),null===(t=(null===(o=je[a.current])||void 0===o?void 0:o.harmonics)||(null===(i=ge[a.current])||void 0===i?void 0:i.harmonics))||void 0===t||t.forEach((function(e,n){e&&F.line({x1:e.center,x2:e.center,y1:0,y2:e.amplitude},"green")})),null===(c=ge[a.current])||void 0===c||null===(u=c.harmonics)||void 0===u||u.forEach((function(e,n){e&&B.circle({x:n,y:e.center/r.hz/(n+1)},5,"rgb(0 0 0 / ".concat(Math.round(Math.min(100,(e.amplitude+30)/2.55)),"%)"))})),null===(l=je[a.current])||void 0===l||null===(s=l.harmonics)||void 0===s||s.forEach((function(e,n){if(e){var t=e.center/r.hz/(n+1);B.line({x1:n-.5,x2:n+.5,y1:t,y2:t},"red")}}))}(),v.forEach((function(e,n){var t,r,o,i,c,u,l,s,h,d,v=null===(t=ge[n])||void 0===t?void 0:t.harmonics,f=null===(r=je[n])||void 0===r?void 0:r.harmonics;(null===(o=ge)||void 0===o?void 0:o[n])&&(ge[n].harmonics=S(v));var p=(null===(i=ge)||void 0===i||null===(c=i[n])||void 0===c?void 0:c.fundamentalFq)||(null===v||void 0===v||null===(u=v[0])||void 0===u?void 0:u.center);p&&H.circle({x:n,y:p/e.hz}),(null===(l=je)||void 0===l?void 0:l[n])&&(je[n].harmonics=S(f)),(p=(null===(s=je)||void 0===s||null===(h=s[n])||void 0===h?void 0:h.fundamentalFq)||(null===f||void 0===f||null===(d=f[0])||void 0===d?void 0:d.center))&&H.line({x1:n-.5,x2:n+.5,y1:p/e.hz,y2:p/e.hz},"red"),n===a.current&&H.line({x1:n,x2:n,y1:D,y2:1/D},"blue")})),H.line({x1:0,x2:87,y1:1,y2:1});var o=e.current;if(o){var i=o.getFrequencyData(),l=o.getTimeData(),s=o.sampleRate/o.fftSize,h=function(e){for(var n=60,t=new Uint8Array(e.length),r=[],a=[],o=[],i=-60;i<e.length+n;i++){var c=Math.max(0,i-n),u=Math.min(i+n,e.length-1),l=u-c+1,s=r[i-1+n]||0;i+n<e.length&&(s+=e[i+n]),i-n-1>=0&&(s-=e[i-n-1]);for(var h=s/l,d=0,v=c;v<=u;v++)d+=Math.pow(e[v]-h,2);if(r[i+n]=s,a[i+n]=d,o[i+n]=l,!(i<0||i>e.length)){var f=Math.pow(d/(l-1),.5);f=Math.min(10,f),t[i]=Math.min(2.5*f+h,255)}}return t}(i),d=M(i,h).map((function(e){return Object(u.a)(Object(u.a)({},e),{},{center:e.center*s})}));!function(){i.forEach((function(e,n){F.rect({x1:n*s,x2:(n+1)*s,y1:0,y2:e})})),h.forEach((function(e,n){0!==n&&F.line({x1:n*s,x2:(n+1)*s,y1:h[n-1],y2:e},"blue")})),d.forEach((function(e,n){F.circle({x:e.center,y:e.amplitude},5,"red"),F.text({x:4e3,y:245-10*(n+1)},"Peak: ".concat(Math.round(10*e.center)/10," (").concat(Math.round(e.amplitude),")"))}));for(var e=[],n=0;n<d.length;n++){var t;e.push(d[n].center-((null===(t=d[n-1])||void 0===t?void 0:t.center)||0))}var r=e[Math.floor(e.length/2)];F.text({x:4e3,y:245},"Med Dist: ".concat(Math.round(10*r)/10))}(),function(){var e,n,t,o,u,l=(null===(e=je[a.current])||void 0===e?void 0:e.harmonics)||(null===(n=ge[a.current])||void 0===n?void 0:n.harmonics),h=null===l||void 0===l||null===(t=l.find((function(e){return(null===e||void 0===e?void 0:e.amplitude)===Math.max.apply(Math,Object(c.a)(l.map((function(e){return(null===e||void 0===e?void 0:e.amplitude)||0}))))})))||void 0===t?void 0:t.center;if(h){var v=((null===(o=je)||void 0===o||null===(u=o[a.current])||void 0===u?void 0:u.fundamentalFq)||r.hz)/h;i.forEach((function(e,n){T.rect({x1:(n-.5)*s/h,x2:(n+.5)*s/h,y1:0,y2:e})})),T.line({x1:1,x2:1,y1:0,y2:255},"red"),d.forEach((function(e,n){T.line({x1:e.center/h,x2:e.center/h,y1:0,y2:255},"green")}));var f=d.length?d.reduce((function(e,n){return Math.abs(h-e.center)<Math.abs(h-n.center)?e:n})):null;T.text({x:1.001/D,y:240},"".concat(r.name," (").concat(Math.round(100*r.hz)/100,")")),T.text({x:1.001/D,y:220},"Focused: ".concat(Math.round(h*v*100)/100),"red"),T.text({x:1.001/D,y:200},"Peak: ".concat(Math.round(((null===f||void 0===f?void 0:f.center)||0)*v*100)/100),"green"),T.text({x:1.001/D,y:180},"Harmonic Shown: ".concat(Math.round(100*h)/100))}}(),function(){var e,n,t,i,c,u,s,h=(null===(e=je)||void 0===e||null===(n=e[a.current])||void 0===n?void 0:n.fundamentalFqAutocorr)||(null===(t=je)||void 0===t||null===(i=t[a.current])||void 0===i?void 0:i.fundamentalFq)||r.hz,d=(null===(c=je[a.current])||void 0===c?void 0:c.fundamentalFq)/((null===(u=je)||void 0===u||null===(s=u[a.current])||void 0===s?void 0:s.fundamentalFqAutocorr)||0)||1,v=h/D,f=h*D,p=fe(l,o.sampleRate,v,f),m=p.autocorrelation,x=p.largestPeakFq;R.setDomain({x1:v,x2:f,y1:1,y2:0});for(var y=1;y<m.length;y++)R.rect({x1:m[y-1].fq,x2:m[y].fq,y1:0,y2:m[y-1].r});R.line({x1:h,x2:h,y1:0,y2:1},"red"),R.line({x1:x,x2:x,y1:0,y2:1},"green"),R.text({x:h/D,y:.9},"".concat(r.name," (").concat(Math.round(100*r.hz)/100,")")),R.text({x:h/D,y:.8},"Focused: ".concat(Math.round(h*d*100)/100),"red"),R.text({x:h/D,y:.7},"Peak: ".concat(Math.round(x*d*10)/10),"green")}(),function(){var e,r=function(e){var n=v[e].hz;return function(e,n){if(!e.length)return{score:0,harmonics:[]};for(var t=w,r=[],a=n,o=0,i=0,c=e[e.length-1].center,u=0,l=0,s=0;i*t<c&&l++<50&&(o=i,i+=a,!(s>=5));){var h=e.filter((function(e){return e.center>=i/t&&e.center<=i*t}));h.length?function(){s=0;var e=h[0];h.forEach((function(n){n.amplitude>e.amplitude&&(e=n)})),r.push(e),u+=e.amplitude,a=Math.max(e.center-o,a)}():(s++,r.push(null))}for(;null===r[r.length-1];)r.pop();return{score:u,harmonics:r}}(d,n)},c=function(e,n){var t,r=v[e].hz;if(n.score>((null===(t=ge[e])||void 0===t?void 0:t.score)||0)){var a,i=r*(E-1),c=r-50*i,s=r+50*i,h=d[d.length-1].center,f=G({lowFq:c,highFq:s,stepSize:i,targetHarmonics:N(r,Math.round(h/r),55e-5),peaks:d}).peakCenterFq,p=fe(l,o.sampleRate,r/D,r*D).largestPeakFq,m=S(n.harmonics),x=f;(x<=1.1*c||x>=.9*s)&&(x=(null===(a=m[0])||void 0===a?void 0:a.center)||0),ge[e]=Object(u.a)(Object(u.a)({},n),{},{harmonics:m,fundamentalFq:x,fundamentalFqTWM:f,fundamentalFqAutocorr:p,key:e})}},s=r(a.current),h=ye(i)||0;if("tuning"===t.current.mode&&xe(n.current.volume)<10&&h>50&&Date.now()-n.current.lastReset>2e3&&s.score>.5*((null===(e=ge[a.current])||void 0===e?void 0:e.score)||0)&&(delete ge[a.current],n.current.lastReset=Date.now()),n.current.volume.push(h),n.current.volume.length>10&&n.current.volume.shift(),c(a.current,s),"next"===t.current.transition.auto&&a.current<87){var f=r(a.current+1);f.score>s.score&&Date.now()-n.current.autoChange>2e3&&(n.current.autoChange=Date.now(),c(a.current+1,f),m(a.current+1))}}(),function(){if(d.length){var e,n,t,o,i,c,u,l,s=d[d.length-1].center,h=(null===(e=je[a.current])||void 0===e?void 0:e.harmonics)||N(r.hz,Math.round(s/r.hz),55e-5),v=(null===(n=je[a.current])||void 0===n||null===(t=n.harmonics)||void 0===t||null===(o=t[0])||void 0===o?void 0:o.center)||r.hz,f=v*(E-1),p=(null===(i=je[a.current])||void 0===i?void 0:i.fundamentalFq)/((null===(c=je[a.current])||void 0===c||null===(u=c.harmonics)||void 0===u||null===(l=u[0])||void 0===l?void 0:l.center)||1)||1,m=G({lowFq:v-50*f,highFq:v+50*f,stepSize:f,targetHarmonics:h,peaks:d}),x=m.prediction,y=m.maxPeak,g=m.peakCenterFq;x.forEach((function(e,n){q.rect({x1:n-.5,x2:n+.5,y1:0,y2:e})})),q.line({x1:(null===y||void 0===y?void 0:y.center)||0,x2:(null===y||void 0===y?void 0:y.center)||0,y1:0,y2:1},"green"),q.line({x1:50,x2:50,y1:0,y2:1},"red"),q.text({x:0,y:.9},"".concat(r.name," (").concat(Math.round(100*r.hz)/100,")")),q.text({x:0,y:.8},"Focused: ".concat(Math.round(v*p*100)/100),"red"),q.text({x:0,y:.7},"Peak: ".concat(Math.round(g*p*100)/100),"green")}}()}},Object(r.useEffect)((function(){var e=!1;return function n(){e||(k(),requestAnimationFrame(n))}(),function(){e=!0}}),[k]),Object(s.jsxs)("div",{className:"App",children:[e.current?Object(s.jsx)("button",{style:{background:"#f44336",color:"#fff",margin:20,border:"1px solid #a92319"},onClick:function(){e.current=void 0,g()},children:"Stop Listening"}):Object(s.jsx)("button",{style:{background:"#37c53c",color:"#fff",margin:20,border:"1px solid green"},onClick:function(){e.current=new A({fftSize:z("fftSize"),minDecibels:z("minDecibels"),maxDecibels:z("maxDecibels")}),g()},children:"Start Listening"}),Object(s.jsx)("div",{style:{overflowX:"auto",overflowY:"hidden",height:150},children:Object(s.jsx)(b,{onClick:m,notes:[v[f]],keyStyles:j})}),Object(s.jsxs)("div",{children:["Mode",Object(s.jsxs)("select",{value:t.current.mode,onChange:function(e){t.current.mode=e.target.value},children:[Object(s.jsx)("option",{value:"recording",children:"Recording"}),Object(s.jsx)("option",{value:"tuning",children:"Tuning"})]}),Object(s.jsxs)("select",{value:t.current.transition.auto,onChange:function(e){t.current.transition.auto=e.target.value},children:[Object(s.jsx)("option",{value:"none",children:"Auto Transition Disabled"}),Object(s.jsx)("option",{value:"next",children:"Auto Transition To Next Note"})]})]}),Object(s.jsxs)("div",{children:["Recorded",Object(s.jsx)("button",{onClick:function(){return pe(ge,"recorded.json")},children:"Download"}),Object(s.jsx)("input",Object(u.a)({className:"fileInput"},me((function(e){return ge=e})))),Object(s.jsx)("button",{onClick:function(){return delete ge[f]},children:"Clear Current"}),Object(s.jsx)("button",{onClick:function(){return ge={}},children:"Clear All"})]}),Object(s.jsxs)("div",{children:["Tuned",Object(s.jsx)("button",{onClick:function(){return pe(je,"tuned.json")},children:"Download"}),Object(s.jsx)("input",Object(u.a)({className:"fileInput"},me((function(e){return je=e})))),Object(s.jsx)("button",{onClick:function(){return je={}},children:"Clear All"})]}),Object(s.jsxs)("div",{children:["Sounds",Object(s.jsxs)("select",{value:JSON.stringify(t.current.noteSounds.notes),onChange:function(e){t.current.noteSounds.notes=JSON.parse(e.target.value)},children:[Object(s.jsx)("option",{value:"[]",children:"No Sounds"}),Object(s.jsx)("option",{value:"[0]",children:"Note Only"}),Object(s.jsx)("option",{value:"[0,4]",children:"Note + Third"}),Object(s.jsx)("option",{value:"[0,7]",children:"Note + Fifth"}),Object(s.jsx)("option",{value:"[0,12]",children:"Note + Octave"}),Object(s.jsx)("option",{value:"[0,24]",children:"Note + Double Octave"}),Object(s.jsx)("option",{value:"[0,4,7]",children:"Note + Third + Fifth"}),Object(s.jsx)("option",{value:"[0,4,7,12]",children:"Note + Third + Fifth + Octave"}),Object(s.jsx)("option",{value:"[0,12,24]",children:"Note + Octave + Double Octave"}),Object(s.jsx)("option",{value:"[0,4,7,12,24]",children:"Note + All"})]}),Object(s.jsxs)("select",{value:t.current.noteSounds.harmonics,onChange:function(e){t.current.noteSounds.harmonics=e.target.value},children:[Object(s.jsx)("option",{value:"recorded",children:"Recorded Notes"}),Object(s.jsx)("option",{value:"tuned",children:"Tuned Notes"})]})]}),Object(s.jsxs)("div",{children:["Tuning",Object(s.jsxs)("select",{value:t.current.tuning.curve,onChange:function(e){t.current.tuning.curve=e.target.value},children:[Object(s.jsx)("option",{value:"none",children:"No Curve"}),Object(s.jsx)("option",{value:"copy",children:"Same as Recorded"}),Object(s.jsx)("option",{value:"7,12",children:"Tune With Fifths + Octaves"}),Object(s.jsx)("option",{value:"entropy",children:"Tune With Entropy"})]}),Object(s.jsx)("button",{onClick:function(){var e=t.current.tuning.curve;"copy"===e&&(je=J(ge)),"none"===e&&(je=function(e){e=J(e);for(var n=0;n<88;n++){var t;e[n].harmonics=S(e[n].harmonics),e[n]=W(e[n],v[n].hz/((null===(t=e[n].harmonics[0])||void 0===t?void 0:t.center)||v[n].hz))}return e}(ge)),"7,12"===e&&(je=function(e){var n,t=(e=J(e))[48];e[48]=W(t,440/((null===(n=t.harmonics[0])||void 0===n?void 0:n.center)||440));var r=48;X(e,r);for(var a=0;a<11;a++)r<30&&(r+=12),U(e[r-7],(function(n){return _(e[r],n)})),X(e,r+=-7);return e}(ge)),"entropy"===e&&(je=function(e){var n,t=(e=J(e))[48];e[48]=W(t,440/((null===(n=t.harmonics[0])||void 0===n?void 0:n.center)||440));var r=V(e);console.log(r);for(var a=function(n){for(var t=48;48!==t;)t=L(88);for(var a=t+1;a!==t;)88===a&&(a=0),e[a]=U(e[a],(function(n){return V(Object(u.a)(Object(u.a)({},e),{},Object(I.a)({},a,n)))})),a+=1;var o=V(e);if(!(o<r))return"break";r=o,console.log(n,r)},o=0;o<10&&"break"!==a(o);o++);return e}(ge))},children:"Generate Tuning Curve"})]}),Object(s.jsx)("br",{}),Object(s.jsx)("div",{className:"chartTitle",onClick:function(){return Y("fullFFT")},children:"Full Spectrum FFT"}),Object(s.jsx)("div",{className:"chartContainer",style:{height:K("fullFFT")?C+2:0},children:Object(s.jsx)(d,Object(u.a)({},F))}),Object(s.jsx)("div",{className:"chartTitle",onClick:function(){return Y("focusedFFT")},children:"Focused FFT"}),Object(s.jsx)("div",{className:"chartContainer",style:{height:K("focusedFFT")?C+2:0},children:Object(s.jsx)(d,Object(u.a)({},T))}),Object(s.jsx)("div",{className:"chartTitle",onClick:function(){return Y("twm")},children:"Two Way Mismatch"}),Object(s.jsx)("div",{className:"chartContainer",style:{height:K("twm")?C+2:0},children:Object(s.jsx)(d,Object(u.a)({},q))}),Object(s.jsx)("div",{className:"chartTitle",onClick:function(){return Y("autocorr")},children:"Autocorrelation"}),Object(s.jsx)("div",{className:"chartContainer",style:{height:K("autocorr")?C+2:0},children:Object(s.jsx)(d,Object(u.a)({},R))}),Object(s.jsx)("div",{className:"chartTitle",onClick:function(){return Y("harmonics")},children:"Current Note Harmonics"}),Object(s.jsx)("div",{className:"chartContainer",style:{height:K("harmonics")?C+2:0},children:Object(s.jsx)(d,Object(u.a)({},B))}),Object(s.jsx)("div",{className:"chartTitle",onClick:function(){return Y("curve")},children:"Tuning Curve"}),Object(s.jsx)("div",{className:"chartContainer",style:{height:K("curve")?C+2:0},children:Object(s.jsx)(d,Object(u.a)({},H))})]})},ze=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,24)).then((function(n){var t=n.getCLS,r=n.getFID,a=n.getFCP,o=n.getLCP,i=n.getTTFB;t(e),r(e),a(e),o(e),i(e)}))};i.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(Oe,{})}),document.getElementById("root")),ze()},6:function(e,n,t){e.exports={key:"piano_key__38M4z",ivory:"piano_ivory__A0tOg",ebony:"piano_ebony__3WXM6",lit:"piano_lit__2Tqvo"}}},[[23,1,2]]]);
//# sourceMappingURL=main.dac5c82f.chunk.js.map