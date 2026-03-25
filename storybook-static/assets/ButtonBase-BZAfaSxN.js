import{R as A,r as l,a as X,_ as te,j as F,u as be,l as ne}from"./iframe-BG6vyWzJ.js";import{c as E,a as ge,s as oe,g as Ie,b as Oe}from"./styled-DEFBfLsy.js";import{u as Ue,a as ce,c as ze,b as H}from"./useIsFocusVisible-DLuRAmzf.js";function Z(e,n){return Z=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,a){return r.__proto__=a,r},Z(e,n)}function Ke(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,Z(e,n)}const pe=A.createContext(null);function Ae(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ie(e,n){var r=function(t){return n&&l.isValidElement(t)?n(t):t},a=Object.create(null);return e&&l.Children.map(e,function(o){return o}).forEach(function(o){a[o.key]=r(o)}),a}function Xe(e,n){e=e||{},n=n||{};function r(d){return d in n?n[d]:e[d]}var a=Object.create(null),o=[];for(var t in e)t in n?o.length&&(a[t]=o,o=[]):o.push(t);var i,c={};for(var u in n){if(a[u])for(i=0;i<a[u].length;i++){var p=a[u][i];c[a[u][i]]=r(p)}c[u]=r(u)}for(i=0;i<o.length;i++)c[o[i]]=r(o[i]);return c}function j(e,n,r){return r[n]!=null?r[n]:e.props[n]}function Ye(e,n){return ie(e.children,function(r){return l.cloneElement(r,{onExited:n.bind(null,r),in:!0,appear:j(r,"appear",e),enter:j(r,"enter",e),exit:j(r,"exit",e)})})}function We(e,n,r){var a=ie(e.children),o=Xe(n,a);return Object.keys(o).forEach(function(t){var i=o[t];if(l.isValidElement(i)){var c=t in n,u=t in a,p=n[t],d=l.isValidElement(p)&&!p.props.in;u&&(!c||d)?o[t]=l.cloneElement(i,{onExited:r.bind(null,i),in:!0,exit:j(i,"exit",e),enter:j(i,"enter",e)}):!u&&c&&!d?o[t]=l.cloneElement(i,{in:!1}):u&&c&&l.isValidElement(p)&&(o[t]=l.cloneElement(i,{onExited:r.bind(null,i),in:p.props.in,exit:j(i,"exit",e),enter:j(i,"enter",e)}))}}),o}var He=Object.values||function(e){return Object.keys(e).map(function(n){return e[n]})},Ge={component:"div",childFactory:function(n){return n}},se=(function(e){Ke(n,e);function n(a,o){var t;t=e.call(this,a,o)||this;var i=t.handleExited.bind(Ae(t));return t.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},t}var r=n.prototype;return r.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},r.componentWillUnmount=function(){this.mounted=!1},n.getDerivedStateFromProps=function(o,t){var i=t.children,c=t.handleExited,u=t.firstRender;return{children:u?Ye(o,c):We(o,i,c),firstRender:!1}},r.handleExited=function(o,t){var i=ie(this.props.children);o.key in i||(o.props.onExited&&o.props.onExited(t),this.mounted&&this.setState(function(c){var u=X({},c.children);return delete u[o.key],{children:u}}))},r.render=function(){var o=this.props,t=o.component,i=o.childFactory,c=te(o,["component","childFactory"]),u=this.state.contextValue,p=He(this.state.children).map(i);return delete c.appear,delete c.enter,delete c.exit,t===null?A.createElement(pe.Provider,{value:u},p):A.createElement(pe.Provider,{value:u},A.createElement(t,c,p))},n})(A.Component);se.propTypes={};se.defaultProps=Ge;function qe(e){const{className:n,classes:r,pulsate:a=!1,rippleX:o,rippleY:t,rippleSize:i,in:c,onExited:u,timeout:p}=e,[d,g]=l.useState(!1),b=E(n,r.ripple,r.rippleVisible,a&&r.ripplePulsate),T={width:i,height:i,top:-(i/2)+t,left:-(i/2)+o},h=E(r.child,d&&r.childLeaving,a&&r.childPulsate);return!c&&!d&&g(!0),l.useEffect(()=>{if(!c&&u!=null){const R=setTimeout(u,p);return()=>{clearTimeout(R)}}},[u,c,p]),F.jsx("span",{className:b,style:T,children:F.jsx("span",{className:h})})}const m=ge("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),Je=["center","classes","className"];let G=e=>e,fe,de,he,me;const ee=550,Qe=80,Ze=ne(fe||(fe=G`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),et=ne(de||(de=G`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),tt=ne(he||(he=G`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),nt=oe("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),ot=oe(qe,{name:"MuiTouchRipple",slot:"Ripple"})(me||(me=G`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),m.rippleVisible,Ze,ee,({theme:e})=>e.transitions.easing.easeInOut,m.ripplePulsate,({theme:e})=>e.transitions.duration.shorter,m.child,m.childLeaving,et,ee,({theme:e})=>e.transitions.easing.easeInOut,m.childPulsate,tt,({theme:e})=>e.transitions.easing.easeInOut),it=l.forwardRef(function(n,r){const a=be({props:n,name:"MuiTouchRipple"}),{center:o=!1,classes:t={},className:i}=a,c=te(a,Je),[u,p]=l.useState([]),d=l.useRef(0),g=l.useRef(null);l.useEffect(()=>{g.current&&(g.current(),g.current=null)},[u]);const b=l.useRef(!1),T=Ue(),h=l.useRef(null),R=l.useRef(null),I=l.useCallback(f=>{const{pulsate:y,rippleX:M,rippleY:L,rippleSize:$,cb:U}=f;p(x=>[...x,F.jsx(ot,{classes:{ripple:E(t.ripple,m.ripple),rippleVisible:E(t.rippleVisible,m.rippleVisible),ripplePulsate:E(t.ripplePulsate,m.ripplePulsate),child:E(t.child,m.child),childLeaving:E(t.childLeaving,m.childLeaving),childPulsate:E(t.childPulsate,m.childPulsate)},timeout:ee,pulsate:y,rippleX:M,rippleY:L,rippleSize:$},d.current)]),d.current+=1,g.current=U},[t]),N=l.useCallback((f={},y={},M=()=>{})=>{const{pulsate:L=!1,center:$=o||y.pulsate,fakeElement:U=!1}=y;if(f?.type==="mousedown"&&b.current){b.current=!1;return}f?.type==="touchstart"&&(b.current=!0);const x=U?null:R.current,B=x?x.getBoundingClientRect():{width:0,height:0,left:0,top:0};let v,D,w;if($||f===void 0||f.clientX===0&&f.clientY===0||!f.clientX&&!f.touches)v=Math.round(B.width/2),D=Math.round(B.height/2);else{const{clientX:S,clientY:P}=f.touches&&f.touches.length>0?f.touches[0]:f;v=Math.round(S-B.left),D=Math.round(P-B.top)}if($)w=Math.sqrt((2*B.width**2+B.height**2)/3),w%2===0&&(w+=1);else{const S=Math.max(Math.abs((x?x.clientWidth:0)-v),v)*2+2,P=Math.max(Math.abs((x?x.clientHeight:0)-D),D)*2+2;w=Math.sqrt(S**2+P**2)}f!=null&&f.touches?h.current===null&&(h.current=()=>{I({pulsate:L,rippleX:v,rippleY:D,rippleSize:w,cb:M})},T.start(Qe,()=>{h.current&&(h.current(),h.current=null)})):I({pulsate:L,rippleX:v,rippleY:D,rippleSize:w,cb:M})},[o,I,T]),O=l.useCallback(()=>{N({},{pulsate:!0})},[N]),_=l.useCallback((f,y)=>{if(T.clear(),f?.type==="touchend"&&h.current){h.current(),h.current=null,T.start(0,()=>{_(f,y)});return}h.current=null,p(M=>M.length>0?M.slice(1):M),g.current=y},[T]);return l.useImperativeHandle(r,()=>({pulsate:O,start:N,stop:_}),[O,N,_]),F.jsx(nt,X({className:E(m.root,t.root,i),ref:R},c,{children:F.jsx(se,{component:null,exit:!0,children:u})}))});function st(e){return Ie("MuiButtonBase",e)}const rt=ge("MuiButtonBase",["root","disabled","focusVisible"]),at=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],lt=e=>{const{disabled:n,focusVisible:r,focusVisibleClassName:a,classes:o}=e,i=Oe({root:["root",n&&"disabled",r&&"focusVisible"]},st,o);return r&&a&&(i.root+=` ${a}`),i},ut=oe("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,n)=>n.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${rt.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),ht=l.forwardRef(function(n,r){const a=be({props:n,name:"MuiButtonBase"}),{action:o,centerRipple:t=!1,children:i,className:c,component:u="button",disabled:p=!1,disableRipple:d=!1,disableTouchRipple:g=!1,focusRipple:b=!1,LinkComponent:T="a",onBlur:h,onClick:R,onContextMenu:I,onDragLeave:N,onFocus:O,onFocusVisible:_,onKeyDown:f,onKeyUp:y,onMouseDown:M,onMouseLeave:L,onMouseUp:$,onTouchEnd:U,onTouchMove:x,onTouchStart:B,tabIndex:v=0,TouchRippleProps:D,touchRippleRef:w,type:S}=a,P=te(a,at),z=l.useRef(null),C=l.useRef(null),Re=ce(C,w),{isFocusVisibleRef:re,onFocus:ye,onBlur:Me,ref:xe}=ze(),[k,Y]=l.useState(!1);p&&k&&Y(!1),l.useImperativeHandle(o,()=>({focusVisible:()=>{Y(!0),z.current.focus()}}),[]);const[q,Ce]=l.useState(!1);l.useEffect(()=>{Ce(!0)},[]);const Ee=q&&!d&&!p;l.useEffect(()=>{k&&b&&!d&&q&&C.current.pulsate()},[d,b,k,q]);function V(s,le,$e=g){return H(ue=>(le&&le(ue),!$e&&C.current&&C.current[s](ue),!0))}const Te=V("start",M),ve=V("stop",I),Pe=V("stop",N),Ve=V("stop",$),Be=V("stop",s=>{k&&s.preventDefault(),L&&L(s)}),De=V("start",B),we=V("stop",U),Le=V("stop",x),Se=V("stop",s=>{Me(s),re.current===!1&&Y(!1),h&&h(s)},!1),ke=H(s=>{z.current||(z.current=s.currentTarget),ye(s),re.current===!0&&(Y(!0),_&&_(s)),O&&O(s)}),J=()=>{const s=z.current;return u&&u!=="button"&&!(s.tagName==="A"&&s.href)},Q=l.useRef(!1),je=H(s=>{b&&!Q.current&&k&&C.current&&s.key===" "&&(Q.current=!0,C.current.stop(s,()=>{C.current.start(s)})),s.target===s.currentTarget&&J()&&s.key===" "&&s.preventDefault(),f&&f(s),s.target===s.currentTarget&&J()&&s.key==="Enter"&&!p&&(s.preventDefault(),R&&R(s))}),Fe=H(s=>{b&&s.key===" "&&C.current&&k&&!s.defaultPrevented&&(Q.current=!1,C.current.stop(s,()=>{C.current.pulsate(s)})),y&&y(s),R&&s.target===s.currentTarget&&J()&&s.key===" "&&!s.defaultPrevented&&R(s)});let W=u;W==="button"&&(P.href||P.to)&&(W=T);const K={};W==="button"?(K.type=S===void 0?"button":S,K.disabled=p):(!P.href&&!P.to&&(K.role="button"),p&&(K["aria-disabled"]=p));const Ne=ce(r,xe,z),ae=X({},a,{centerRipple:t,component:u,disabled:p,disableRipple:d,disableTouchRipple:g,focusRipple:b,tabIndex:v,focusVisible:k}),_e=lt(ae);return F.jsxs(ut,X({as:W,className:E(_e.root,c),ownerState:ae,onBlur:Se,onClick:R,onContextMenu:ve,onFocus:ke,onKeyDown:je,onKeyUp:Fe,onMouseDown:Te,onMouseLeave:Be,onMouseUp:Ve,onDragLeave:Pe,onTouchEnd:we,onTouchMove:Le,onTouchStart:De,ref:Ne,tabIndex:p?-1:v,type:S},K,P,{children:[i,Ee?F.jsx(it,X({ref:Re,center:t},D)):null]}))});export{ht as B,pe as T,Ke as _};
