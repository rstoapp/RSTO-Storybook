import{j as r}from"./iframe-BG6vyWzJ.js";import{C as h}from"./Chip-ChN0YSx5.js";import{T as S}from"./Typography-EIW_Gx22.js";import{S as D}from"./Stack-zJvUq2_T.js";import"./preload-helper-PPVm8Dsz.js";import"./styled-DEFBfLsy.js";import"./createSvgIcon-CEHH3AL9.js";import"./useIsFocusVisible-DLuRAmzf.js";import"./ButtonBase-BZAfaSxN.js";const e=({text:y,...g})=>r.jsx(h,{...g,label:r.jsx(S,{variant:"caption",sx:{fontWeight:"600"},children:y})});e.__docgenInfo={description:"",methods:[],displayName:"RstoChip",props:{text:{required:!0,tsType:{name:"string"},description:""}}};var i,n,l,c,d,p,m,u,_,v,f,x;const w={title:"RSTO/RstoChip",component:e,tags:["autodocs"],args:{text:"Label"},argTypes:{color:{control:"select",options:["default","primary","secondary"]}}},o={args:{color:"default",text:"Default"}},a={args:{color:"primary",text:"Published"}},t={args:{color:"secondary",text:"Draft"}},s={render:()=>r.jsxs(D,{direction:"row",spacing:1,children:[r.jsx(e,{text:"Default",color:"default"}),r.jsx(e,{text:"Published",color:"primary"}),r.jsx(e,{text:"Draft",color:"secondary"})]})};o.parameters={...o.parameters,docs:{...(i=o.parameters)===null||i===void 0?void 0:i.docs,source:{originalSource:`{
  args: {
    color: 'default',
    text: 'Default'
  }
}`,...(l=o.parameters)===null||l===void 0||(n=l.docs)===null||n===void 0?void 0:n.source}}};a.parameters={...a.parameters,docs:{...(c=a.parameters)===null||c===void 0?void 0:c.docs,source:{originalSource:`{
  args: {
    color: 'primary',
    text: 'Published'
  }
}`,...(p=a.parameters)===null||p===void 0||(d=p.docs)===null||d===void 0?void 0:d.source}}};t.parameters={...t.parameters,docs:{...(m=t.parameters)===null||m===void 0?void 0:m.docs,source:{originalSource:`{
  args: {
    color: 'secondary',
    text: 'Draft'
  }
}`,...(_=t.parameters)===null||_===void 0||(u=_.docs)===null||u===void 0?void 0:u.source}}};s.parameters={...s.parameters,docs:{...(v=s.parameters)===null||v===void 0?void 0:v.docs,source:{originalSource:`{
  render: () => <Stack direction="row" spacing={1}>
            <RstoChip text="Default" color="default" />
            <RstoChip text="Published" color="primary" />
            <RstoChip text="Draft" color="secondary" />
        </Stack>
}`,...(x=s.parameters)===null||x===void 0||(f=x.docs)===null||f===void 0?void 0:f.source}}};const E=["Default","Primary","Secondary","AllVariants"];export{s as AllVariants,o as Default,a as Primary,t as Secondary,E as __namedExportsOrder,w as default};
