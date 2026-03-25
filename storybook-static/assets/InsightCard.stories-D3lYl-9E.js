import{h as I,i as F,r as K,u as V,_ as X,a as p,j as n,k as S,l as M,b as G,c as P,g as z}from"./iframe-BG6vyWzJ.js";import{r as H}from"./createSvgIcon-DeRy3f4R.js";import{I as J}from"./InfoCard-BGkH_K9r.js";import{a as Q}from"./CardContent-C_KL8qWj.js";import{S as m}from"./Stack-zJvUq2_T.js";import{T as g}from"./Typography-EIW_Gx22.js";import{B as Y}from"./Box-CQx6J_kY.js";import{g as Z,a as ee,c as te,b as ie,s as re}from"./styled-DEFBfLsy.js";import"./preload-helper-PPVm8Dsz.js";import"./createSvgIcon-CEHH3AL9.js";import"./useIsFocusVisible-DLuRAmzf.js";import"./Paper-1uWXS5PB.js";function ae(e,t=0,r=1){return F(e,t,r)}function ne(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(t);return r&&r[0].length===1&&(r=r.map(i=>i+i)),r?`rgb${r.length===4?"a":""}(${r.map((i,a)=>a<3?parseInt(i,16):Math.round(parseInt(i,16)/255*1e3)/1e3).join(", ")})`:""}function D(e){if(e.type)return e;if(e.charAt(0)==="#")return D(ne(e));const t=e.indexOf("("),r=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(I(9,e));let i=e.substring(t+1,e.length-1),a;if(r==="color"){if(i=i.split(" "),a=i.shift(),i.length===4&&i[3].charAt(0)==="/"&&(i[3]=i[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(a)===-1)throw new Error(I(10,a))}else i=i.split(",");return i=i.map(s=>parseFloat(s)),{type:r,values:i,colorSpace:a}}function se(e){const{type:t,colorSpace:r}=e;let{values:i}=e;return t.indexOf("rgb")!==-1?i=i.map((a,s)=>s<3?parseInt(a,10):a):t.indexOf("hsl")!==-1&&(i[1]=`${i[1]}%`,i[2]=`${i[2]}%`),t.indexOf("color")!==-1?i=`${r} ${i.join(" ")}`:i=`${i.join(", ")}`,`${t}(${i})`}function oe(e,t){return e=D(e),t=ae(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,se(e)}function le(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function de(e){return parseFloat(e)}function ce(e){return Z("MuiSkeleton",e)}ee("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const ue=["animation","className","component","height","style","variant","width"];let h=e=>e,L,$,N,T;const pe=e=>{const{classes:t,variant:r,animation:i,hasChildren:a,width:s,height:l}=e;return ie({root:["root",r,i,a&&"withChildren",a&&!s&&"fitContent",a&&!l&&"heightAuto"]},ce,t)},he=M(L||(L=h`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),me=M($||($=h`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),ge=re("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],r.animation!==!1&&t[r.animation],r.hasChildren&&t.withChildren,r.hasChildren&&!r.width&&t.fitContent,r.hasChildren&&!r.height&&t.heightAuto]}})(({theme:e,ownerState:t})=>{const r=le(e.shape.borderRadius)||"px",i=de(e.shape.borderRadius);return p({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:oe(e.palette.text.primary,e.palette.mode==="light"?.11:.13),height:"1.2em"},t.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${i}${r}/${Math.round(i/.6*10)/10}${r}`,"&:empty:before":{content:'"\\00a0"'}},t.variant==="circular"&&{borderRadius:"50%"},t.variant==="rounded"&&{borderRadius:(e.vars||e).shape.borderRadius},t.hasChildren&&{"& > *":{visibility:"hidden"}},t.hasChildren&&!t.width&&{maxWidth:"fit-content"},t.hasChildren&&!t.height&&{height:"auto"})},({ownerState:e})=>e.animation==="pulse"&&S(N||(N=h`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),he),({ownerState:e,theme:t})=>e.animation==="wave"&&S(T||(T=h`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),me,(t.vars||t).palette.action.hover)),fe=K.forwardRef(function(t,r){const i=V({props:t,name:"MuiSkeleton"}),{animation:a="pulse",className:s,component:l="span",height:j,style:B,variant:U="text",width:A}=i,k=X(i,ue),O=p({},i,{animation:a,component:l,variant:U,hasChildren:!!k.children}),W=pe(O);return n.jsx(ge,p({as:l,ref:r,className:te(W.root,s),ownerState:O},k,{style:p({width:A,height:j},B)}))});var o={},q;function ve(){if(q)return o;q=1;var e=G();Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var t=e(H()),r=P();return o.default=(0,t.default)((0,r.jsx)("path",{d:"M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7m2.85 11.1-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1"}),"LightbulbOutlined"),o}var xe=ve();const be=z(xe),E=({insightName:e="Insight One",title:t,description:r,icon:i})=>n.jsx(J,{sx:{width:"100%",height:"auto",flexGrow:1,borderRadius:"8px"},children:n.jsxs(Q,{sx:{padding:"24px"},children:[n.jsx(m,{direction:"row",alignItems:"flex-start",justifyContent:"space-between",children:n.jsxs(m,{direction:"row",spacing:.5,alignItems:"center",children:[i||n.jsx(be,{sx:{color:"rstoBlue._60",width:"16px",height:"16px"}}),n.jsx(g,{sx:{color:"rstoBlue._60",fontWeight:"bold",textTransform:"uppercase",fontSize:"10px",marginLeft:"8px"},children:e})]})}),n.jsx(m,{direction:"row",spacing:2,children:n.jsxs(Y,{children:[n.jsx(g,{variant:"h5",color:"rstoGray._90",sx:{fontWeight:"700",marginTop:"4px",marginBottom:"4px"},children:t===void 0?n.jsx(fe,{}):t}),n.jsx(g,{variant:"body1",color:"rstoGray._90",children:r})]})})]})});E.__docgenInfo={description:"",methods:[],displayName:"InsightCard",props:{insightName:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Insight One'",computed:!1}},title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},description:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};var f,v,x,b,_,y,C,w,R;const Ne={title:"RSTO/InsightCard",component:E,tags:["autodocs"],decorators:[e=>n.jsx("div",{style:{width:420},children:n.jsx(e,{})})]},d={args:{insightName:"Insight One",title:"84.2%",description:"of children received their 12-month immunisation on time."}},c={args:{insightName:"Insight One",title:void 0,description:"Title is loading — shows a Skeleton placeholder."}},u={args:{insightName:"Key finding",title:"1 in 3",description:"children are attending early childhood education."}};d.parameters={...d.parameters,docs:{...(f=d.parameters)===null||f===void 0?void 0:f.docs,source:{originalSource:`{
  args: {
    insightName: 'Insight One',
    title: '84.2%',
    description: 'of children received their 12-month immunisation on time.'
  }
}`,...(x=d.parameters)===null||x===void 0||(v=x.docs)===null||v===void 0?void 0:v.source}}};c.parameters={...c.parameters,docs:{...(b=c.parameters)===null||b===void 0?void 0:b.docs,source:{originalSource:`{
  args: {
    insightName: 'Insight One',
    title: undefined,
    description: 'Title is loading — shows a Skeleton placeholder.'
  }
}`,...(y=c.parameters)===null||y===void 0||(_=y.docs)===null||_===void 0?void 0:_.source}}};u.parameters={...u.parameters,docs:{...(C=u.parameters)===null||C===void 0?void 0:C.docs,source:{originalSource:`{
  args: {
    insightName: 'Key finding',
    title: '1 in 3',
    description: 'children are attending early childhood education.'
  }
}`,...(R=u.parameters)===null||R===void 0||(w=R.docs)===null||w===void 0?void 0:w.source}}};const Te=["Default","Loading","CustomLabel"];export{u as CustomLabel,d as Default,c as Loading,Te as __namedExportsOrder,Ne as default};
