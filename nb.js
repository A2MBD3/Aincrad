/* NEBULA nb.js — full local tester UI
 * Loaded by: https://cdn.jsdelivr.net/gh/A2MBD3/Aincrad/nb.js
 * API: same-origin /nebula/get
 */
(function () {
  "use strict";

  const API_PATH = "/nebula/get";

  // —— styles ——
  const css = `
:root {
  --bg: #0b1120; --card: #1e293b; --bd: #334155; --t: #e2e8f0;
  --m: #94a3b8; --a: #38bdf8; --a2: #818cf8; --ok: #34d399; --err: #f87171;
  --shadow: 0 10px 30px -10px rgba(0,0,0,.5);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  background:
    radial-gradient(1200px 600px at 10% -10%, #1e293b 0%, transparent 55%),
    radial-gradient(900px 500px at 110% 10%, #312e81 0%, transparent 50%),
    var(--bg);
  color: var(--t);
  min-height: 100vh; padding: 28px 18px 60px; line-height: 1.45;
}
.wrap { width: 100%; max-width: 1280px; margin: 0 auto; }

/* —— header —— */
.head {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 12px; margin-bottom: 22px;
}
h1 {
  font-size: 1.7rem; font-weight: 800; letter-spacing: .5px;
  background: linear-gradient(90deg, var(--a), var(--a2));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.sub { color: var(--m); font-size: 0.85rem; margin-top: 4px; }
.badge {
  display: inline-block; padding: 3px 10px; border-radius: 999px;
  font-size: 0.72rem; background: #312e81; color: #c4b5fd;
  margin-left: 8px; vertical-align: middle;
}

/* —— full-width grid —— */
.grid {
  display: grid;
  grid-template-columns: minmax(320px, 420px) 1fr;
  gap: 18px;
  align-items: start;
}
@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr; }
}
.col { display: flex; flex-direction: column; gap: 18px; min-width: 0; }

/* —— cards —— */
.card {
  background: linear-gradient(180deg, #1e293b, #172033);
  border: 1px solid var(--bd);
  border-radius: 16px; padding: 18px;
  box-shadow: var(--shadow);
}
.card-head {
  display: flex; align-items: center; justify-content: space-between;
  gap: 10px; margin-bottom: 12px;
}
h2 {
  font-size: 0.95rem; color: var(--a); font-weight: 700;
  display: flex; align-items: center; gap: 8px;
}
h2::before {
  content: ""; width: 4px; height: 16px; border-radius: 4px;
  background: linear-gradient(180deg, var(--a), var(--a2));
}

/* —— form —— */
label { display: block; font-size: 0.78rem; color: var(--m); margin-bottom: 5px; font-weight: 600; }
input, select {
  width: 100%; padding: 11px 13px; border-radius: 10px;
  border: 1px solid var(--bd); background: #0f172a; color: var(--t);
  font-size: 0.95rem; margin-bottom: 14px; outline: none;
  transition: border-color .15s, box-shadow .15s;
}
input:focus, select:focus {
  border-color: var(--a);
  box-shadow: 0 0 0 3px rgba(56,189,248,.15);
}
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 560px) { .row { grid-template-columns: 1fr; } }

/* —— buttons —— */
.btns { display: flex; flex-wrap: wrap; gap: 10px; }
button {
  padding: 11px 16px; border: none; border-radius: 10px;
  font-weight: 600; font-size: 0.88rem; cursor: pointer;
  transition: opacity .15s, transform .1s, box-shadow .15s;
}
.primary {
  background: linear-gradient(135deg, var(--a), var(--a2)); color: #0f172a;
  box-shadow: 0 6px 16px -6px rgba(56,189,248,.6);
}
.ghost { background: #0f172a; color: var(--t); border: 1px solid var(--bd); }
.ghost:hover { border-color: var(--a); }
button:active { opacity: 0.85; transform: scale(0.98); }

/* copy button */
.copy {
  background: #0f172a; color: var(--m);
  border: 1px solid var(--bd); border-radius: 8px;
  padding: 5px 11px; font-size: 0.72rem; font-weight: 600;
  display: inline-flex; align-items: center; gap: 5px;
  cursor: pointer; transition: all .15s;
}
.copy:hover { color: var(--a); border-color: var(--a); }
.copy.done { color: var(--ok); border-color: var(--ok); }

/* —— status —— */
.status {
  font-size: 0.85rem; margin-top: 12px; min-height: 1.2em;
  padding: 8px 12px; border-radius: 8px; background: #0f172a;
  border: 1px solid var(--bd);
}
.ok { color: var(--ok); border-color: rgba(52,211,153,.4); }
.err { color: var(--err); border-color: rgba(248,113,113,.4); }

/* —— pre blocks (full body) —— */
pre {
  background: #0f172a; border: 1px solid var(--bd); border-radius: 12px;
  padding: 14px; overflow: auto; font-size: 0.75rem; line-height: 1.5;
  white-space: pre-wrap; word-break: break-word;
  font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  max-height: 460px;
}
.body-pre { max-height: 620px; }
.hint { font-size: 0.8rem; color: var(--m); margin-top: 10px; }
`;

  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([k, v]) => {
        if (k === "className") n.className = v;
        else if (k === "text") n.textContent = v;
        else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2).toLowerCase(), v);
        else n.setAttribute(k, v);
      });
    }
    kids.forEach((c) => {
      if (c == null) return;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return n;
  }

  function originBase() {
    return location.origin;
  }

  /* —— copy helper —— */
  function makeCopyBtn(getText, label) {
    const btn = el("button", {
      className: "copy",
      type: "button",
      onClick: async () => {
        const text = getText();
        try {
          await navigator.clipboard.writeText(text);
        } catch (e) {
          // fallback
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); } catch (_) {}
          document.body.removeChild(ta);
        }
        const old = btn.textContent;
        btn.textContent = "✓ Copied";
        btn.classList.add("done");
        setTimeout(() => {
          btn.textContent = old;
          btn.classList.remove("done");
        }, 1200);
      },
    });
    btn.textContent = label || "⧉ Copy";
    return btn;
  }

  function buildUI() {
    document.head.appendChild(el("style", { text: css }));
    document.body.innerHTML = "";

    const baseIn = el("input", { id: "base", value: originBase() });
    const domainIn = el("input", { id: "domain", placeholder: "test.com (empty = all)" });
    const nameIn = el("input", { id: "name", placeholder: "cookie name (optional)" });
    const methodSel = el("select", { id: "method" },
      el("option", { value: "POST", text: "POST" }),
      el("option", { value: "GET", text: "GET" })
    );
    const status = el("div", { className: "status", id: "status", text: "Ready." });
    const headersPre = el("pre", { id: "headers", text: "—" });
    const bodyPre = el("pre", { id: "body", className: "body-pre", text: "—" });

    const copyHeaders = makeCopyBtn(() => headersPre.textContent || "");
    const copyBody = makeCopyBtn(() => bodyPre.textContent || "");

    async function run(mode) {
      const base = (baseIn.value || originBase()).replace(/\/$/, "");
      const domain = domainIn.value.trim();
      const name = nameIn.value.trim();
      status.textContent = "Requesting…";
      status.className = "status";

      let url = base + API_PATH;
      const opts = { cache: "no-store", method: "POST" };

      if (mode === "BAD") {
        url = base + "/nope";
        opts.method = "GET";
      } else if (methodSel.value === "GET" || mode === "GET") {
        opts.method = "GET";
        const q = new URLSearchParams();
        if (domain) q.set("domain", domain);
        if (name) q.set("name", name);
        if (q.toString()) url += "?" + q.toString();
      } else {
        opts.method = "POST";
        opts.headers = { "Content-Type": "application/json" };
        opts.body = JSON.stringify({
          domain: domain || null,
          name: name || null,
        });
      }

      try {
        const res = await fetch(url, opts);
        const lines = [];
        res.headers.forEach((v, k) => lines.push(k + ": " + v));
        const prefer = [
          "x-requested",
          "x-encrypted-key",
          "x-iv",
          "x-alg",
          "content-type",
          "access-control-allow-origin",
        ];
        lines.sort((a, b) => {
          const ka = a.split(":")[0].toLowerCase();
          const kb = b.split(":")[0].toLowerCase();
          const ia = prefer.indexOf(ka);
          const ib = prefer.indexOf(kb);
          return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        });
        headersPre.textContent =
          "HTTP " + res.status + " " + res.statusText + "\n\n" + lines.join("\n");

        const buf = new Uint8Array(await res.arrayBuffer());
        const text = new TextDecoder().decode(buf);

        if (text === "fail" || (res.headers.get("content-type") || "").includes("text/plain")) {
          bodyPre.textContent = text || "(empty)";
          status.textContent = "fail / plain";
          status.className = "status err";
          return;
        }

        const max = Math.min(buf.length, 192);
        let hex = "";
        for (let i = 0; i < max; i++) {
          hex += buf[i].toString(16).padStart(2, "0") + (i % 16 === 15 ? "\n" : " ");
        }
        bodyPre.textContent =
          "Binary length: " + buf.length + " bytes\n" +
          "X-Requested: " + (res.headers.get("X-Requested") || res.headers.get("x-requested") || "?") + "\n" +
          "X-Alg: " + (res.headers.get("X-Alg") || res.headers.get("x-alg") || "?") + "\n\n" +
          "First " + max + " bytes (hex):\n" + hex +
          (buf.length > max ? "\n… truncated" : "") +
          "\n\n→ Decrypt with private key (2/cmd/decrypt + keys/private.pem)";

        status.textContent = "encrypted OK · " + buf.length + " bytes";
        status.className = "status ok";
      } catch (e) {
        status.textContent = "Failed to fetch: " + e.message;
        status.className = "status err";
        headersPre.textContent = "—";
        bodyPre.textContent =
          "Check:\n• module running?\n• hosts: 127.0.0.1 crx.com\n• URL: " +
          base +
          API_PATH +
          "\n• HTTPS self-signed → accept cert once";
      }
    }

    const wrap = el(
      "div",
      { className: "wrap" },

      /* —— header —— */
      el(
        "div",
        { className: "head" },
        el(
          "div",
          null,
          el("h1", null, "NEBULA", el("span", { className: "badge", text: "nb.js" })),
          el("p", { className: "sub", text: "Tester · " + API_PATH + " · " + location.host })
        ),
        el("button", {
          className: "ghost",
          text: "⌫ Clear",
          onClick: () => {
            headersPre.textContent = "—";
            bodyPre.textContent = "—";
            status.textContent = "Ready.";
            status.className = "status";
          },
        })
      ),

      /* —— main grid —— */
      el(
        "div",
        { className: "grid" },

        /* left column: controls */
        el(
          "div",
          { className: "col" },
          el(
            "div",
            { className: "card" },
            el("div", { className: "card-head" }, el("h2", null, "Request")),
            el("label", { text: "Base URL" }),
            baseIn,
            el(
              "div",
              { className: "row" },
              el("div", null, el("label", { text: "Domain" }), domainIn),
              el("div", null, el("label", { text: "Cookie name" }), nameIn)
            ),
            el("label", { text: "Method" }),
            methodSel,
            el(
              "div",
              { className: "btns" },
              el("button", { className: "primary", text: "▶ Request", onClick: () => run() }),
              el("button", { className: "ghost", text: "Wrong path", onClick: () => run("BAD") })
            ),
            status,
            el("p", {
              className: "hint",
              text: "Success = encrypted body. Plain \"fail\" on error. Decrypt offline with private key.",
            })
          )
        ),

        /* right column: results */
        el(
          "div",
          { className: "col" },
          el(
            "div",
            { className: "card" },
            el(
              "div",
              { className: "card-head" },
              el("h2", null, "Response headers"),
              copyHeaders
            ),
            headersPre
          ),
          el(
            "div",
            { className: "card" },
            el(
              "div",
              { className: "card-head" },
              el("h2", null, "Body"),
              copyBody
            ),
            bodyPre
          )
        )
      )
    );

    document.body.appendChild(wrap);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildUI);
  } else {
    buildUI();
  }
})();