javascript:(function(){
  const T={c:null,i(){
    if(!this.c){this.c=document.createElement('div');this.c.id='nt';this.c.style.cssText='position:fixed;top:16px;right:16px;z-index:2147483647;display:flex;flex-direction:column;gap:10px;width:min(380px,calc(100vw-32px));pointer-events:none;font-family:system-ui,sans-serif';document.body.appendChild(this.c)}
    return this.c
  },s(m,t='info',d=3000,o={}){
    const c=this.i();const cl={success:'#4ade80',error:'#f87171',warning:'#fbbf24',info:'#60a5fa',progress:'#a78bfa',loading:'#67e8f9'};const co=cl[t]||cl.info;const ic={success:'✓',error:'✕',warning:'!',info:'i',progress:'↻',loading:'◌'};
    const to=document.createElement('div');
    to.style.cssText=`background:linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.01));backdrop-filter:blur(24px) saturate(200%);-webkit-backdrop-filter:blur(24px) saturate(200%);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:14px 16px;color:#e2e8f0;font-size:13px;line-height:1.4;box-shadow:8px 8px 20px rgba(0,0,0,.25),-1px -1px 2px rgba(255,255,255,.04),inset 1px 1px 1px rgba(255,255,255,.02);transform:translateX(120%);animation:ns .35s cubic-bezier(.16,1,.3,1) forwards;pointer-events:auto;display:flex;align-items:flex-start;gap:10px;width:100%;position:relative;overflow:hidden`;
    const ac=document.createElement('div');ac.style.cssText=`position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,${co},${co}80,${co}40);border-radius:4px 0 0 4px;box-shadow:0 0 16px ${co}50`;
    to.appendChild(ac);
    const ic2=document.createElement('span');ic2.textContent=o.i||ic[t]||ic.info;ic2.style.cssText=`font-size:16px;flex-shrink:0;margin-top:1px;filter:drop-shadow(0 0 6px ${co}60)`;
    const mc=document.createElement('div');mc.style.cssText='flex:1;min-width:0;display:flex;flex-direction:column;gap:4px';
    if(o.ti){const ti=document.createElement('div');ti.textContent=o.ti;ti.style.cssText='font-weight:600;font-size:13px;color:#f1f5f9;letter-spacing:.3px';mc.appendChild(ti)}
    const ms=document.createElement('div');ms.textContent=m;ms.style.cssText='word-break:break-word;color:#cbd5e1;font-size:12px;opacity:.9';mc.appendChild(ms);
    const cb=document.createElement('button');cb.textContent='✕';cb.style.cssText='background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);color:#94a3b8;width:24px;height:24px;border-radius:50%;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;padding:0;transition:.2s;box-shadow:2px 2px 5px rgba(0,0,0,.2),inset -1px -1px 1px rgba(255,255,255,.02);margin-left:auto';cb.onmouseover=()=>{cb.style.background='rgba(248,113,113,.15)';cb.style.color='#f87171';cb.style.borderColor='rgba(248,113,113,.25)'};cb.onmouseout=()=>{cb.style.background='rgba(255,255,255,.03)';cb.style.color='#94a3b8';cb.style.borderColor='rgba(255,255,255,.06)'};
    to.appendChild(ic2);to.appendChild(mc);to.appendChild(cb);c.appendChild(to);
    let tid;if(d>0)tid=setTimeout(()=>this.r(to),d);
    const clr=()=>{clearTimeout(tid);this.r(to)};cb.onclick=e=>{e.stopPropagation();clr()};return to
  },r(to){if(!to||!to.parentNode)return;to.style.animation='no .25s ease forwards';setTimeout(()=>{if(to.parentNode)to.parentNode.removeChild(to)},250)},load(m,d){return this.s(m,'loading',d)}};
  
  const st=document.createElement('style');st.textContent='@keyframes ns{from{transform:translateX(120%) scale(.9);opacity:0}to{transform:translateX(0) scale(1);opacity:1}}@keyframes no{to{transform:translateX(120%) scale(.9);opacity:0}}@media(max-width:480px){#nt{right:8px;left:8px;width:auto}}';document.head.appendChild(st);
  
  const U=window.location.hostname,B=window.ABDULLAH_BOOKMARK_LOAD||'';
  
  function F(eng){
    const u='https://raw.githubusercontent.com/A2MBD3/Aincrad/main/dynamic-bypass-by-@a2mbd3.js?t='+Date.now()+'&n=0&site='+eng;
    const lt=T.load('⏳ Loading '+eng+' engine...',0);
    fetch(u).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(c=>{T.r(lt);try{eval(c);T.s('✅ '+eng+' engine activated!','success',3000)}catch(e){T.s('❌ '+e.message,'error',5000)}}).catch(e=>{T.r(lt);T.s('❌ '+e.message,'error',5000,{ti:'Error'})});
  }
  
  // Main logic - simplified
  if(B&&B!=='0'&&B!==0&&B!=='Abdullah'){
    F(B);
  }else{
    const sites={tarviral:'aincrad',rodaemotor:'aincrad',vipteam:'vipteam',powercheats:'powercheats',vplink:'universal-vplink'};
    let engine=null;
    for(let s in sites){if(U.includes(s)){engine=sites[s];break}}
    if(engine){F(engine)}else{T.s('⚠️ Site not supported','warning',4000)}
  }
})();