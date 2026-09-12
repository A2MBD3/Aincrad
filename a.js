javascript:(function(){
  var S="https://nebula-bot-g8ey.onrender.com/n";
  var t=document.createElement("div");
  t.id="nb-loader-toast";
  t.style.cssText="position:fixed;top:16px;right:16px;z-index:2147483647;background:rgba(10,14,24,.92);color:#e8eefc;padding:12px 16px;border-radius:12px;border:1px solid rgba(0,242,255,.45);font:13px system-ui,sans-serif;box-shadow:0 12px 28px rgba(0,0,0,.45)";
  t.textContent="Loading NEBULA…";
  (document.body||document.documentElement).appendChild(t);
  fetch(S+"?t="+Date.now(),{cache:"no-store"})
    .then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.text();})
    .then(function(code){
      t.textContent="Running…";
      (0,eval)(code);
      t.textContent="NEBULA ready";
      setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},1200);
    })
    .catch(function(e){
      t.style.borderColor="rgba(255,80,80,.7)";
      t.textContent="Load failed: "+(e&&e.message?e.message:e);
      setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},4000);
    });
})();
