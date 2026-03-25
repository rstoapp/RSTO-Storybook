import{b as _,c as f,g as D,j as t}from"./iframe-BG6vyWzJ.js";import{r as O}from"./createSvgIcon-DeRy3f4R.js";import{S as j}from"./Stack-zJvUq2_T.js";import{B as g}from"./Box-CQx6J_kY.js";import{T as h}from"./Typography-EIW_Gx22.js";import"./preload-helper-PPVm8Dsz.js";import"./createSvgIcon-CEHH3AL9.js";import"./styled-DEFBfLsy.js";import"./useIsFocusVisible-DLuRAmzf.js";var s={},v;function b(){if(v)return s;v=1;var e=_();Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var r=e(O()),a=f();return s.default=(0,r.default)((0,a.jsx)("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm8-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75M19 19H5V5h14z"}),"AssignmentLateOutlined"),s}var P=b();const R=D(P);var i={},x;function q(){if(x)return i;x=1;var e=_();Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var r=e(O()),a=f();return i.default=(0,r.default)((0,a.jsx)("path",{d:"M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2zm10 14.5V20H8v-3.5l4-4zm-4-5-4-4V4h8v3.5z"}),"HourglassEmptyOutlined"),i}var E=q();const H=D(E),y=({title:e,description:r,icon:a})=>t.jsxs(j,{spacing:1,width:"fit-content",alignItems:"center",textAlign:"center",children:[t.jsx(g,{width:"64px",height:"64px",bgcolor:"rstoOrange._10",borderRadius:"8px",display:"flex",justifyContent:"center",alignItems:"center",children:t.jsx(g,{width:"48px",height:"48px",children:a})}),t.jsx(h,{variant:"body1",fontWeight:600,children:e}),t.jsx(h,{variant:"body2",sx:{whiteSpace:"pre"},children:r})]});y.__docgenInfo={description:"",methods:[],displayName:"DataProcessingAlert",props:{title:{required:!0,tsType:{name:"string"},description:""},description:{required:!0,tsType:{name:"string"},description:""},icon:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};var c,d,l,u,p,m;const z={title:"RSTO/DataStateViews",component:y,tags:["autodocs"],decorators:[e=>t.jsx(g,{display:"flex",justifyContent:"center",alignItems:"center",paddingTop:"120px",children:t.jsx(e,{})})]},n={args:{title:"Data missing",description:`Data not provided or available for this indicator.
Please upload and check back later.`,icon:t.jsx(R,{sx:{color:e=>e.palette.rstoOrange._50,width:"100%",height:"100%"}})}},o={args:{title:"Processing Data",description:`Your data is being processed.
Please check back later.`,icon:t.jsx(H,{sx:{color:e=>e.palette.rstoOrange._50,width:"100%",height:"100%"}})}};n.parameters={...n.parameters,docs:{...(c=n.parameters)===null||c===void 0?void 0:c.docs,source:{originalSource:`{
  args: {
    title: 'Data missing',
    description: 'Data not provided or available for this indicator.\\nPlease upload and check back later.',
    icon: <AssignmentLateOutlinedIcon sx={{
      color: theme => theme.palette.rstoOrange._50,
      width: '100%',
      height: '100%'
    }} />
  }
}`,...(l=n.parameters)===null||l===void 0||(d=l.docs)===null||d===void 0?void 0:d.source}}};o.parameters={...o.parameters,docs:{...(u=o.parameters)===null||u===void 0?void 0:u.docs,source:{originalSource:`{
  args: {
    title: 'Processing Data',
    description: 'Your data is being processed.\\nPlease check back later.',
    icon: <HourglassEmptyOutlinedIcon sx={{
      color: theme => theme.palette.rstoOrange._50,
      width: '100%',
      height: '100%'
    }} />
  }
}`,...(m=o.parameters)===null||m===void 0||(p=m.docs)===null||p===void 0?void 0:p.source}}};const C=["DataMissing","DataProcessing"];export{n as DataMissing,o as DataProcessing,C as __namedExportsOrder,z as default};
