(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[245],{6681:function(e,t,a){"use strict";a.d(t,{A:function(){return Y}});var r=a(3153),n=(0,r.w)({d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",displayName:"ArrowBackIcon"}),o=(0,r.w)({d:"M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z",displayName:"ArrowForwardIcon"}),i=a(8539),c=a(4130),s=a(8855),l=a(3720),u=a(9857),m=a(6540),h=a(4848),p={horizontal:{"> *:first-of-type:not(:last-of-type)":{borderEndRadius:0},"> *:not(:first-of-type):not(:last-of-type)":{borderRadius:0},"> *:not(:first-of-type):last-of-type":{borderStartRadius:0}},vertical:{"> *:first-of-type:not(:last-of-type)":{borderBottomRadius:0},"> *:not(:first-of-type):not(:last-of-type)":{borderRadius:0},"> *:not(:first-of-type):last-of-type":{borderTopRadius:0}}},d={horizontal:e=>({"& > *:not(style) ~ *:not(style)":{marginStart:e}}),vertical:e=>({"& > *:not(style) ~ *:not(style)":{marginTop:e}})},f=(0,s.R)((function(e,t){const{size:a,colorScheme:r,variant:n,className:o,spacing:i="0.5rem",isAttached:s,isDisabled:f,orientation:g="horizontal",...y}=e,E=(0,u.cx)("chakra-button__group",o),b=(0,m.useMemo)((()=>({size:a,colorScheme:r,variant:n,isDisabled:f})),[a,r,n,f]);let v={display:"inline-flex",...s?p[g]:d[g](i)};const A="vertical"===g;return(0,h.jsx)(c.l,{value:b,children:(0,h.jsx)(l.B.div,{ref:t,role:"group",__css:v,className:E,"data-attached":s?"":void 0,"data-orientation":g,flexDir:A?"column":void 0,...y})})}));f.displayName="ButtonGroup";var g=a(4893),y=a(7500),E=a(4194),b=(0,s.R)((function(e,t){const{templateAreas:a,gap:r,rowGap:n,columnGap:o,column:i,row:c,autoFlow:s,autoRows:u,templateRows:m,autoColumns:p,templateColumns:d,...f}=e,g={display:"grid",gridTemplateAreas:a,gridGap:r,gridRowGap:n,gridColumnGap:o,gridAutoColumns:p,gridColumn:i,gridRow:c,gridAutoFlow:s,gridAutoRows:u,gridTemplateRows:m,gridTemplateColumns:d};return(0,h.jsx)(l.B.div,{ref:t,__css:g,...f})}));b.displayName="Grid";var v=a(4940),A=a(3008),w=a(1235),N=(0,s.R)((function(e,t){const{columns:a,spacingX:r,spacingY:n,spacing:o,minChildWidth:i,...c}=e,s=(0,v.D)(),l=i?function(e,t){return(0,w.bk)(e,(e=>{const a=(0,A.gf)("sizes",e,"number"==typeof(r=e)?`${r}px`:r)(t);var r;return null===e?null:`repeat(auto-fit, minmax(${a}, 1fr))`}))}(i,s):(u=a,(0,w.bk)(u,(e=>null===e?null:`repeat(${e}, minmax(0, 1fr))`)));var u;return(0,h.jsx)(b,{ref:t,gap:o,columnGap:r,rowGap:n,templateColumns:l,...c})}));N.displayName="SimpleGrid";var O=function(e,t){const{0:a,1:r}=(0,m.useState)(0),n=Math.ceil(e.length/t);return{pageNumber:a,pageCount:n,changePage:e=>{r(e)},pageData:()=>{const r=a*t,n=r+t;return e.slice(r,n)},nextPage:()=>{r(Math.min(a+1,n-1))},previousPage:()=>{r(Math.max(a-1,0))}}},j=a(1639),[k,x]=(0,j.Wh)("Card"),C=a(4515),z=a(3352),R=(0,s.R)((function(e,t){const{className:a,children:r,direction:n="column",justify:o,align:i,...c}=(0,C.MN)(e),s=(0,z.o5)("Card",e);return(0,h.jsx)(l.B.div,{ref:t,className:(0,u.cx)("chakra-card",a),__css:{display:"flex",flexDirection:n,justifyContent:o,alignItems:i,position:"relative",minWidth:0,wordWrap:"break-word",...s.container},...c,children:(0,h.jsx)(k,{value:s,children:r})})})),S=(0,s.R)((function(e,t){const{className:a,...r}=e,n=x();return(0,h.jsx)(l.B.div,{ref:t,className:(0,u.cx)("chakra-card__header",a),__css:n.header,...r})})),T=(0,s.R)((function(e,t){const{className:a,...r}=e,n=x();return(0,h.jsx)(l.B.div,{ref:t,className:(0,u.cx)("chakra-card__body",a),__css:n.body,...r})})),I=a(4794);var P=function(e){let{policyNode:t}=e;const{policy:{PolicyName:a}}=t;return m.createElement(g.$,{as:I.Link,size:"sm",to:"/"+a},a)},U=a(8821);var L=function(e){let{policyNode:t}=e;const{policy:a}=t;return m.createElement(R,null,m.createElement(S,null,m.createElement(i.T,{alignItems:"flex-start"},m.createElement(P,{policyNode:t}),m.createElement(y.E,{fontSize:"sm"},a.PolicyName))),m.createElement(T,null,m.createElement(U.A,{services:t.services})))};function D(e){let{items:t,pageLimit:a,setPageItems:r}=e;const{pageNumber:c,changePage:s,pageData:l,nextPage:u,previousPage:h}=O(t,a);(0,m.useEffect)((()=>{r(l)}),[c]);const p=l(),d=p[0].policy.PolicyName,b=p[p.length-1].policy.PolicyName;return m.createElement(m.Fragment,null,m.createElement(i.T,{alignItems:"flex-start"},m.createElement(f,{size:"xs"},m.createElement(g.$,{leftIcon:m.createElement(n,null),onClick:h},"Prev Page"),m.createElement(y.E,null,c+1),m.createElement(g.$,{rightIcon:m.createElement(o,null),onClick:u},"Next Page")),m.createElement(E.z,null,m.createElement(y.E,{as:"b"},d),m.createElement(y.E,null,"…"),m.createElement(y.E,{as:"b"},b))))}var Y=function(e){let{policyNodes:t}=e;const{0:a,1:r}=(0,m.useState)([]);return m.createElement(i.T,{spacing:4,align:"stretch"},m.createElement(D,{items:t,pageLimit:48,setPageItems:r}),m.createElement(N,{columns:{sm:1,md:2},spacing:2},a.map((e=>m.createElement(L,{key:e.policy.PolicyName,policyNode:e})))))}},1042:function(e,t,a){"use strict";var r=a(6540),n=a(4794);function o(e){var t;let{description:a,lang:o,meta:i,title:c}=e;const{site:s}=(0,n.useStaticQuery)("63159454");a||s.siteMetadata.description,null===(t=s.siteMetadata)||void 0===t||t.title;return r.createElement(r.Fragment,null)}o.defaultProps={lang:"en",meta:[],description:""},t.A=o},8821:function(e,t,a){"use strict";a.d(t,{A:function(){return s}});var r=a(6287),n=a(6540),o=a(4893),i=a(4794);var c=function(e){let{service:t}=e;return n.createElement(n.Fragment,null,"*"===t?n.createElement(o.$,{disabled:!0,size:"xs",mr:1,mb:1},t):n.createElement(o.$,{as:i.Link,to:"/service/"+t,size:"xs",mr:1,mb:1},t))};var s=function(e){let{services:t}=e;return n.createElement(r.az,null,t.map((e=>n.createElement(c,{key:e,service:e}))))}},2783:function(e,t,a){"use strict";a.r(t);var r=a(8539),n=a(8340),o=a(6540),i=a(6681),c=a(1042);a(3099);t.default=function(e){let{data:t}=e;const a=t.allPolicyMetadata.nodes.map((e=>{const{policy:t,services:a,actions:r}=e;return{policy:t,services:a,actions:r}}));return o.createElement(o.Fragment,null,o.createElement(c.A,{title:"Home"}),o.createElement(r.T,{spacing:10,align:"stretch"},o.createElement(n.D,{fontSize:"2xl"},"All AWS Managed Policies"),o.createElement(i.A,{policyNodes:a})))}},3099:function(e,t){var a;!function(r){let n;function o(e,t){const a=e.charCodeAt(t);if(isNaN(a))throw new RangeError("Index "+t+' out of range for string "'+e+'"; please open an issue at https://github.com/Trott/slug/issues/new');if(a<55296||a>57343)return[e.charAt(t),t];if(a>=55296&&a<=56319){if(e.length<=t+1)return[" ",t];const a=e.charCodeAt(t+1);return a<56320||a>57343?[" ",t]:[e.charAt(t)+e.charAt(t+1),t+1]}if(0===t)return[" ",t];const r=e.charCodeAt(t-1);if(r<55296||r>56319)return[" ",t];throw new Error('String "'+e+'" reaches code believed to be unreachable; please open an issue at https://github.com/Trott/slug/issues/new')}function i(e,t){let a=s(e,t);if(""===a){let r="";for(let t=0;t<e.length;t++){const a=o(e,t);t=a[1],r+=a[0]}a=s(n(r),t)}return a}n="undefined"!=typeof window?window.btoa?function(e){return btoa(unescape(encodeURIComponent(e)))}:function(e){const t=unescape(encodeURIComponent(e+""));let a="";for(let r,n,o=0,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.charAt(0|o)||(i="=",o%1);a+=i.charAt(63&r>>8-o%1*8)){if(n=t.charCodeAt(o+=3/4),n>255)throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");r=r<<8|n}return a}:function(e){return Buffer.from(e).toString("base64")},"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(e,t){"use strict";if(null==e)throw new TypeError("Cannot convert undefined or null to object");const a=Object(e);for(let n=1;n<arguments.length;n++){const e=arguments[n];if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(a[r]=e[r])}return a},writable:!0,configurable:!0});const c={bg:{"Й":"Y","й":"y",X:"H",x:"h","Ц":"Ts","ц":"ts","Щ":"Sht","щ":"sht","Ъ":"A","ъ":"a","Ь":"Y","ь":"y"},de:{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue"},sr:{"đ":"dj","Đ":"DJ"},uk:{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"}};function s(e,t){if("string"!=typeof e)throw new Error("slug() requires a string argument, received "+typeof e);"string"==typeof t&&(t={replacement:t}),(t=t?Object.assign({},t):{}).mode=t.mode||i.defaults.mode;const a=i.defaults.modes[t.mode],r=["replacement","multicharmap","charmap","remove","lower","trim"];for(let i,c=0,u=r.length;c<u;c++)i=r[c],t[i]=i in t?t[i]:a[i];const n=c[t.locale]||{};let o=[];for(let i in t.multicharmap){if(!Object.prototype.hasOwnProperty.call(t.multicharmap,i))continue;const e=i.length;-1===o.indexOf(e)&&o.push(e)}o=o.sort((function(e,t){return t-e}));const s="rfc3986"===t.mode?/[^\w\s\-.~]/:/[^A-Za-z0-9\s]/;let l="";for(let i,c=0,u=e.length;c<u;c++){i=e[c];let a=!1;for(let r=0;r<o.length;r++){const n=o[r],s=e.substr(c,n);if(t.multicharmap[s]){c+=n-1,i=t.multicharmap[s],a=!0;break}}a||(i=n[i]?n[i]:t.charmap[i]?t.charmap[i]:i.includes(t.replacement)?i.replace(t.replacement," "):i.replace(s,"")),l+=i}return t.remove&&(l=l.replace(t.remove,"")),t.trim&&(l=l.trim()),l=l.replace(/\s+/g,t.replacement),t.lower&&(l=l.toLowerCase()),l}const l={"फ़":"Fi","ग़":"Ghi","ख़":"Khi","क़":"Qi","ड़":"ugDha","ढ़":"ugDhha","य़":"Yi","ज़":"Za","בִי":"i","בֵ":"e","בֵי":"e","בֶ":"e","בַ":"a","בָ":"a","בֹ":"o","וֹ":"o","בֻ":"u","וּ":"u","בּ":"b","כּ":"k","ךּ":"k","פּ":"p","שׁ":"sh","שׂ":"s","בְ":"e","חֱ":"e","חֲ":"a","חֳ":"o","בִ":"i"},u={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ő":"O","Ø":"O","Ō":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ű":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ő":"o","ø":"o","ō":"o","Œ":"OE","œ":"oe","ù":"u","ú":"u","û":"u","ü":"u","ű":"u","ý":"y","þ":"th","ÿ":"y","ẞ":"SS","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ά":"a","έ":"e","ί":"i","ό":"o","ύ":"y","ή":"h","ώ":"w","ς":"s","ϊ":"i","ΰ":"y","ϋ":"y","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ά":"A","Έ":"E","Ί":"I","Ό":"O","Ύ":"Y","Ή":"H","Ώ":"W","Ϊ":"I","Ϋ":"Y","ş":"s","Ş":"S","ı":"i","İ":"I","ğ":"g","Ğ":"G","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"yo","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ё":"Yo","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","Є":"Ye","І":"I","Ї":"Yi","Ґ":"G","є":"ye","і":"i","ї":"yi","ґ":"g","č":"c","ď":"d","ě":"e","ň":"n","ř":"r","š":"s","ť":"t","ů":"u","ž":"z","Č":"C","Ď":"D","Ě":"E","Ň":"N","Ř":"R","Š":"S","Ť":"T","Ů":"U","Ž":"Z","ľ":"l","ĺ":"l","ŕ":"r","Ľ":"L","Ĺ":"L","Ŕ":"R","ą":"a","ć":"c","ę":"e","ł":"l","ń":"n","ś":"s","ź":"z","ż":"z","Ą":"A","Ć":"C","Ę":"E","Ł":"L","Ń":"N","Ś":"S","Ź":"Z","Ż":"Z","ā":"a","ē":"e","ģ":"g","ī":"i","ķ":"k","ļ":"l","ņ":"n","ū":"u","Ā":"A","Ē":"E","Ģ":"G","Ī":"I","Ķ":"K","Ļ":"L","Ņ":"N","Ū":"U","أ":"a","إ":"i","ب":"b","ت":"t","ث":"th","ج":"g","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"d","ط":"t","ظ":"th","ع":"aa","غ":"gh","ف":"f","ق":"k","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"o","ي":"y","ء":"aa","ة":"a","آ":"a","ا":"a","پ":"p","ژ":"zh","گ":"g","چ":"ch","ک":"k","ی":"i","ė":"e","į":"i","ų":"u","Ė":"E","Į":"I","Ų":"U","ț":"t","Ț":"T","ţ":"t","Ţ":"T","ș":"s","Ș":"S","ă":"a","Ă":"A","Ạ":"A","Ả":"A","Ầ":"A","Ấ":"A","Ậ":"A","Ẩ":"A","Ẫ":"A","Ằ":"A","Ắ":"A","Ặ":"A","Ẳ":"A","Ẵ":"A","Ẹ":"E","Ẻ":"E","Ẽ":"E","Ề":"E","Ế":"E","Ệ":"E","Ể":"E","Ễ":"E","Ị":"I","Ỉ":"I","Ĩ":"I","Ọ":"O","Ỏ":"O","Ồ":"O","Ố":"O","Ộ":"O","Ổ":"O","Ỗ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ợ":"O","Ở":"O","Ỡ":"O","Ụ":"U","Ủ":"U","Ũ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ự":"U","Ử":"U","Ữ":"U","Ỳ":"Y","Ỵ":"Y","Ỷ":"Y","Ỹ":"Y","Đ":"D","ạ":"a","ả":"a","ầ":"a","ấ":"a","ậ":"a","ẩ":"a","ẫ":"a","ằ":"a","ắ":"a","ặ":"a","ẳ":"a","ẵ":"a","ẹ":"e","ẻ":"e","ẽ":"e","ề":"e","ế":"e","ệ":"e","ể":"e","ễ":"e","ị":"i","ỉ":"i","ĩ":"i","ọ":"o","ỏ":"o","ồ":"o","ố":"o","ộ":"o","ổ":"o","ỗ":"o","ơ":"o","ờ":"o","ớ":"o","ợ":"o","ở":"o","ỡ":"o","ụ":"u","ủ":"u","ũ":"u","ư":"u","ừ":"u","ứ":"u","ự":"u","ử":"u","ữ":"u","ỳ":"y","ỵ":"y","ỷ":"y","ỹ":"y","đ":"d","Ә":"AE","ә":"ae","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ө":"OE","ө":"oe","ђ":"dj","ј":"j","љ":"lj","њ":"nj","ћ":"c","џ":"dz","Ђ":"Dj","Ј":"j","Љ":"Lj","Њ":"Nj","Ћ":"C","Џ":"Dz","ǌ":"nj","ǉ":"lj","ǋ":"NJ","ǈ":"LJ","अ":"a","आ":"aa","ए":"e","ई":"ii","ऍ":"ei","ऎ":"ae","ऐ":"ai","इ":"i","ओ":"o","ऑ":"oi","ऒ":"oii","ऊ":"uu","औ":"ou","उ":"u","ब":"B","भ":"Bha","च":"Ca","छ":"Chha","ड":"Da","ढ":"Dha","फ":"Fa","ग":"Ga","घ":"Gha","ग़":"Ghi","ह":"Ha","ज":"Ja","झ":"Jha","क":"Ka","ख":"Kha","ख़":"Khi","ल":"L","ळ":"Li","ऌ":"Li","ऴ":"Lii","ॡ":"Lii","म":"Ma","न":"Na","ङ":"Na","ञ":"Nia","ण":"Nae","ऩ":"Ni","ॐ":"oms","प":"Pa","क़":"Qi","र":"Ra","ऋ":"Ri","ॠ":"Ri","ऱ":"Ri","स":"Sa","श":"Sha","ष":"Shha","ट":"Ta","त":"Ta","ठ":"Tha","द":"Tha","थ":"Tha","ध":"Thha","ड़":"ugDha","ढ़":"ugDhha","व":"Va","य":"Ya","य़":"Yi","ज़":"Za","ə":"e","Ə":"E","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"p","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","ב":"v","גּ":"g","ג":"g","ד":"d","דּ":"d","ה":"h","ו":"v","ז":"z","ח":"h","ט":"t","י":"y","כ":"kh","ך":"kh","ל":"l","מ":"m","ם":"m","נ":"n","ן":"n","ס":"s","פ":"f","ף":"f","ץ":"ts","צ":"ts","ק":"k","ר":"r","תּ":"t","ת":"t"};i.charmap=Object.assign({},u),i.multicharmap=Object.assign({},l),i.defaults={charmap:i.charmap,mode:"pretty",modes:{rfc3986:{replacement:"-",remove:null,lower:!0,charmap:i.charmap,multicharmap:i.multicharmap,trim:!0},pretty:{replacement:"-",remove:null,lower:!0,charmap:i.charmap,multicharmap:i.multicharmap,trim:!0}},multicharmap:i.multicharmap},i.reset=function(){i.defaults.modes.rfc3986.charmap=i.defaults.modes.pretty.charmap=i.charmap=i.defaults.charmap=Object.assign({},u),i.defaults.modes.rfc3986.multicharmap=i.defaults.modes.pretty.multicharmap=i.multicharmap=i.defaults.multicharmap=Object.assign({},l)},i.extend=function(e){const t=Object.keys(e),a={},r={};for(let n=0;n<t.length;n++)t[n].length>1?a[t[n]]=e[t[n]]:r[t[n]]=e[t[n]];Object.assign(i.charmap,r),Object.assign(i.multicharmap,a)},void 0===(a=function(){return i}.apply(t,[]))||(e.exports=a)}()},8539:function(e,t,a){"use strict";a.d(t,{T:function(){return i}});var r=a(6400),n=a(8855),o=a(4848),i=(0,n.R)(((e,t)=>(0,o.jsx)(r.B,{align:"center",...e,direction:"column",ref:t})));i.displayName="VStack"}}]);
//# sourceMappingURL=component---src-pages-index-tsx-da1349b145ff56351c85.js.map