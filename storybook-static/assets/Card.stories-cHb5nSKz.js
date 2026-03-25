import{j as a}from"./iframe-BG6vyWzJ.js";import{C as c,a as h}from"./CardContent-C_KL8qWj.js";import{T as t}from"./Typography-EIW_Gx22.js";import"./preload-helper-PPVm8Dsz.js";import"./styled-DEFBfLsy.js";import"./Paper-1uWXS5PB.js";var s,d,n,i,l,p;const x={title:"RSTO/Card",component:c,tags:["autodocs"],decorators:[r=>a.jsx("div",{style:{width:320},children:a.jsx(r,{})})],argTypes:{variant:{control:"select",options:["outlined","elevation"]}}},e={render:r=>a.jsx(c,{...r,children:a.jsxs(h,{children:[a.jsx(t,{variant:"h6",children:"Card title"}),a.jsx(t,{variant:"body2",color:"text.secondary",children:"Card content goes here. This is how data cards look in the RSTO app."})]})})},o={args:{variant:"elevation"},render:r=>a.jsx(c,{...r,children:a.jsxs(h,{children:[a.jsx(t,{variant:"h6",children:"Elevated card"}),a.jsx(t,{variant:"body2",color:"text.secondary",children:"This variant has a subtle drop shadow."})]})})};e.parameters={...e.parameters,docs:{...(s=e.parameters)===null||s===void 0?void 0:s.docs,source:{originalSource:`{
  render: args => <Card {...args}>
            <CardContent>
                <Typography variant="h6">Card title</Typography>
                <Typography variant="body2" color="text.secondary">
                    Card content goes here. This is how data cards look in the RSTO app.
                </Typography>
            </CardContent>
        </Card>
}`,...(n=e.parameters)===null||n===void 0||(d=n.docs)===null||d===void 0?void 0:d.source}}};o.parameters={...o.parameters,docs:{...(i=o.parameters)===null||i===void 0?void 0:i.docs,source:{originalSource:`{
  args: {
    variant: 'elevation'
  },
  render: args => <Card {...args}>
            <CardContent>
                <Typography variant="h6">Elevated card</Typography>
                <Typography variant="body2" color="text.secondary">
                    This variant has a subtle drop shadow.
                </Typography>
            </CardContent>
        </Card>
}`,...(p=o.parameters)===null||p===void 0||(l=p.docs)===null||l===void 0?void 0:l.source}}};const T=["Default","Elevated"];export{e as Default,o as Elevated,T as __namedExportsOrder,x as default};
