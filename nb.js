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
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  background: var(--bg); color: var(--t);
  min-height: 100vh; padding: 20px; line-height: 1.45;
}
.wrap { max-width: 820px; margin: 0 auto; }
h1 {
  font-size: 1.4rem; font-weight: 700;
  background: linear-gradient(90deg, var(--a), var(--a2));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.sub { color: var(--m); font-size: 0.85rem; margin: 6px 0 18px; }
.card {
  background: var(--card); border: 1px solid var(--bd);
  border-radius: 14px; padding: 16px; margin-bottom: 14px;
}
label { display: block; font-size: 0.78rem; color: var(--m); margin-bottom: 4px; }
input, select {
  width: 100%; padding: 10px 12px; border-radius: 10px;
  border: 1px solid var(--bd); background: #0f172a; color: var(--t);
  font-size: 0.95rem; margin-bottom: 12px; outline: none;
}
input:focus { border-color: var(--a); }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@media (max-width: 560px) { .row { grid-template-columns: 1fr; } }
.btns { display: flex; flex-wrap: wrap; gap: 8px; }
button {
  padding: 10px 14px; border: none; border-radius: 10px;
  font-weight: 600; font-size: 0.88rem; cursor: pointer;
}
.primary {
  background: linear-gradient(135deg, var(--a), var(--a2)); color: #0f172a;
}
.ghost { background: #0f172a; color: var(--t); border: 1px solid var(--bd); }
button:active { opacity: 0.85; transform: scale(0.98); }
.status { font-size: 0.85rem; margin-top: 10px; min-height: 1.2em; }
.ok { color: var(--ok); } .err { color: var(--err); }
h2 { font-size: 0.92rem; color: var(--a); margin-bottom: 8px; }
pre {
  background: #0f172a; border: 1px solid var(--bd); border-radius: 10px;
  padding: 12px; overflow: auto; font-size: 0.75rem; max-height: 280px;
  white-space: pre-wrap; word-break: break-all;
}
.hint { font-size: 0.8rem; color: var(--m); margin-top: 8px; }
.badge {
  display: inline-block; padding: 2px 8px; border-radius: 999px;
  font-size: 0.72rem; background: #312e81; color: #c4b5fd; margin-left: 6px;
}
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
    // same host as page (crx.com / 127.0.0.1)
    return location.origin;
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
    const status = el("div", { className: "status", id: "status" });
    const headersPre = el("pre", { id: "headers", text: "—" });
    const bodyPre = el("pre", { id: "body", text: "—" });

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
      el("h1", null, "NEBULA", el("span", { className: "badge", text: "nb.js" })),
      el("p", { className: "sub", text: "Tester · " + API_PATH + " · " + location.host }),
      el(
        "div",
        { className: "card" },
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
          el("button", { className: "ghost", text: "Wrong path", onClick: () => run("BAD") }),
          el("button", {
            className: "ghost",
            text: "Clear",
            onClick: () => {
              headersPre.textContent = "—";
              bodyPre.textContent = "—";
              status.textContent = "";
              status.className = "status";
            },
          })
        ),
        status,
        el("p", {
          className: "hint",
          text: "Success = encrypted body. Plain \"fail\" on error. Decrypt offline with private key.",
        })
      ),
      el("div", { className: "card" }, el("h2", { text: "Response headers" }), headersPre),
      el("div", { className: "card" }, el("h2", { text: "Body" }), bodyPre)
    );

    document.body.appendChild(wrap);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildUI);
  } else {
    buildUI();
  }
})();
