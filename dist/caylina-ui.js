/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const St = globalThis, Wt = St.ShadowRoot && (St.ShadyCSS === void 0 || St.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Xt = Symbol(), cr = /* @__PURE__ */ new WeakMap();
let zr = class {
  constructor(t, r, o) {
    if (this._$cssResult$ = !0, o !== Xt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Wt && t === void 0) {
      const o = r !== void 0 && r.length === 1;
      o && (t = cr.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && cr.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Fr = (e) => new zr(typeof e == "string" ? e : e + "", void 0, Xt), b = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((o, i, a) => o + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[a + 1], e[0]);
  return new zr(r, e, Xt);
}, Nr = (e, t) => {
  if (Wt) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const o = document.createElement("style"), i = St.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = r.cssText, e.appendChild(o);
  }
}, dr = Wt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const o of t.cssRules) r += o.cssText;
  return Fr(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Vr, defineProperty: Hr, getOwnPropertyDescriptor: Kr, getOwnPropertyNames: Ur, getOwnPropertySymbols: qr, getPrototypeOf: Yr } = Object, jt = globalThis, pr = jt.trustedTypes, Qr = pr ? pr.emptyScript : "", Gr = jt.reactiveElementPolyfillSupport, at = (e, t) => e, Dt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Qr : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, Jt = (e, t) => !Vr(e, t), hr = { attribute: !0, type: String, converter: Dt, reflect: !1, useDefault: !1, hasChanged: Jt };
Symbol.metadata ??= Symbol("metadata"), jt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ve = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = hr) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(t, o, r);
      i !== void 0 && Hr(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, o) {
    const { get: i, set: a } = Kr(this.prototype, t) ?? { get() {
      return this[r];
    }, set(s) {
      this[r] = s;
    } };
    return { get: i, set(s) {
      const d = i?.call(this);
      a?.call(this, s), this.requestUpdate(t, d, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? hr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(at("elementProperties"))) return;
    const t = Yr(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(at("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(at("properties"))) {
      const r = this.properties, o = [...Ur(r), ...qr(r)];
      for (const i of o) this.createProperty(i, r[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [o, i] of r) this.elementProperties.set(o, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, o] of this.elementProperties) {
      const i = this._$Eu(r, o);
      i !== void 0 && this._$Eh.set(i, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const i of o) r.unshift(dr(i));
    } else t !== void 0 && r.push(dr(t));
    return r;
  }
  static _$Eu(t, r) {
    const o = r.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const o of r.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Nr(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, r, o) {
    this._$AK(t, o);
  }
  _$ET(t, r) {
    const o = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, o);
    if (i !== void 0 && o.reflect === !0) {
      const a = (o.converter?.toAttribute !== void 0 ? o.converter : Dt).toAttribute(r, o.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, r) {
    const o = this.constructor, i = o._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = o.getPropertyOptions(i), s = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : Dt;
      this._$Em = i;
      const d = s.fromAttribute(r, a.type);
      this[i] = d ?? this._$Ej?.get(i) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, r, o, i = !1, a) {
    if (t !== void 0) {
      const s = this.constructor;
      if (i === !1 && (a = this[t]), o ??= s.getPropertyOptions(t), !((o.hasChanged ?? Jt)(a, r) || o.useDefault && o.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, o)))) return;
      this.C(t, r, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: o, reflect: i, wrapped: a }, s) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, s ?? r ?? this[t]), a !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (r = void 0), this._$AL.set(t, r)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, a] of this._$Ep) this[i] = a;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [i, a] of o) {
        const { wrapped: s } = a, d = this[i];
        s !== !0 || this._$AL.has(i) || d === void 0 || this.C(i, void 0, a, d);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(r)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((r) => this._$ET(r, this[r])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Ve.elementStyles = [], Ve.shadowRootOptions = { mode: "open" }, Ve[at("elementProperties")] = /* @__PURE__ */ new Map(), Ve[at("finalized")] = /* @__PURE__ */ new Map(), Gr?.({ ReactiveElement: Ve }), (jt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zt = globalThis, ur = (e) => e, Et = Zt.trustedTypes, fr = Et ? Et.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Cr = "$lit$", le = `lit$${Math.random().toFixed(9).slice(2)}$`, Or = "?" + le, Wr = `<${Or}>`, Se = document, st = () => Se.createComment(""), nt = (e) => e === null || typeof e != "object" && typeof e != "function", er = Array.isArray, Xr = (e) => er(e) || typeof e?.[Symbol.iterator] == "function", Kt = `[ 	
\f\r]`, rt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, vr = /-->/g, gr = />/g, ze = RegExp(`>|${Kt}(?:([^\\s"'>=/]+)(${Kt}*=${Kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xr = /'/g, br = /"/g, Sr = /^(?:script|style|textarea|title)$/i, Jr = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), n = Jr(1), ce = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), mr = /* @__PURE__ */ new WeakMap(), Ce = Se.createTreeWalker(Se, 129);
function Dr(e, t) {
  if (!er(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return fr !== void 0 ? fr.createHTML(t) : t;
}
const Zr = (e, t) => {
  const r = e.length - 1, o = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = rt;
  for (let d = 0; d < r; d++) {
    const p = e[d];
    let x, m, f = -1, $ = 0;
    for (; $ < p.length && (s.lastIndex = $, m = s.exec(p), m !== null); ) $ = s.lastIndex, s === rt ? m[1] === "!--" ? s = vr : m[1] !== void 0 ? s = gr : m[2] !== void 0 ? (Sr.test(m[2]) && (i = RegExp("</" + m[2], "g")), s = ze) : m[3] !== void 0 && (s = ze) : s === ze ? m[0] === ">" ? (s = i ?? rt, f = -1) : m[1] === void 0 ? f = -2 : (f = s.lastIndex - m[2].length, x = m[1], s = m[3] === void 0 ? ze : m[3] === '"' ? br : xr) : s === br || s === xr ? s = ze : s === vr || s === gr ? s = rt : (s = ze, i = void 0);
    const w = s === ze && e[d + 1].startsWith("/>") ? " " : "";
    a += s === rt ? p + Wr : f >= 0 ? (o.push(x), p.slice(0, f) + Cr + p.slice(f) + le + w) : p + le + (f === -2 ? d : w);
  }
  return [Dr(e, a + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class lt {
  constructor({ strings: t, _$litType$: r }, o) {
    let i;
    this.parts = [];
    let a = 0, s = 0;
    const d = t.length - 1, p = this.parts, [x, m] = Zr(t, r);
    if (this.el = lt.createElement(x, o), Ce.currentNode = this.el.content, r === 2 || r === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (i = Ce.nextNode()) !== null && p.length < d; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const f of i.getAttributeNames()) if (f.endsWith(Cr)) {
          const $ = m[s++], w = i.getAttribute(f).split(le), k = /([.?@])?(.*)/.exec($);
          p.push({ type: 1, index: a, name: k[2], strings: w, ctor: k[1] === "." ? ti : k[1] === "?" ? ri : k[1] === "@" ? ii : Tt }), i.removeAttribute(f);
        } else f.startsWith(le) && (p.push({ type: 6, index: a }), i.removeAttribute(f));
        if (Sr.test(i.tagName)) {
          const f = i.textContent.split(le), $ = f.length - 1;
          if ($ > 0) {
            i.textContent = Et ? Et.emptyScript : "";
            for (let w = 0; w < $; w++) i.append(f[w], st()), Ce.nextNode(), p.push({ type: 2, index: ++a });
            i.append(f[$], st());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Or) p.push({ type: 2, index: a });
      else {
        let f = -1;
        for (; (f = i.data.indexOf(le, f + 1)) !== -1; ) p.push({ type: 7, index: a }), f += le.length - 1;
      }
      a++;
    }
  }
  static createElement(t, r) {
    const o = Se.createElement("template");
    return o.innerHTML = t, o;
  }
}
function He(e, t, r = e, o) {
  if (t === ce) return t;
  let i = o !== void 0 ? r._$Co?.[o] : r._$Cl;
  const a = nt(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, r, o)), o !== void 0 ? (r._$Co ??= [])[o] = i : r._$Cl = i), i !== void 0 && (t = He(e, i._$AS(e, t.values), i, o)), t;
}
class ei {
  constructor(t, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: r }, parts: o } = this._$AD, i = (t?.creationScope ?? Se).importNode(r, !0);
    Ce.currentNode = i;
    let a = Ce.nextNode(), s = 0, d = 0, p = o[0];
    for (; p !== void 0; ) {
      if (s === p.index) {
        let x;
        p.type === 2 ? x = new vt(a, a.nextSibling, this, t) : p.type === 1 ? x = new p.ctor(a, p.name, p.strings, this, t) : p.type === 6 && (x = new oi(a, this, t)), this._$AV.push(x), p = o[++d];
      }
      s !== p?.index && (a = Ce.nextNode(), s++);
    }
    return Ce.currentNode = Se, i;
  }
  p(t) {
    let r = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, r), r += o.strings.length - 2) : o._$AI(t[r])), r++;
  }
}
class vt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, r, o, i) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = o, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && t?.nodeType === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = He(this, t, r), nt(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== ce && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Xr(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && nt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Se.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: r, _$litType$: o } = t, i = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = lt.createElement(Dr(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === i) this._$AH.p(r);
    else {
      const a = new ei(i, this), s = a.u(this.options);
      a.p(r), this.T(s), this._$AH = a;
    }
  }
  _$AC(t) {
    let r = mr.get(t.strings);
    return r === void 0 && mr.set(t.strings, r = new lt(t)), r;
  }
  k(t) {
    er(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let o, i = 0;
    for (const a of t) i === r.length ? r.push(o = new vt(this.O(st()), this.O(st()), this, this.options)) : o = r[i], o._$AI(a), i++;
    i < r.length && (this._$AR(o && o._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); t !== this._$AB; ) {
      const o = ur(t).nextSibling;
      ur(t).remove(), t = o;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Tt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, o, i, a) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = a, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = c;
  }
  _$AI(t, r = this, o, i) {
    const a = this.strings;
    let s = !1;
    if (a === void 0) t = He(this, t, r, 0), s = !nt(t) || t !== this._$AH && t !== ce, s && (this._$AH = t);
    else {
      const d = t;
      let p, x;
      for (t = a[0], p = 0; p < a.length - 1; p++) x = He(this, d[o + p], r, p), x === ce && (x = this._$AH[p]), s ||= !nt(x) || x !== this._$AH[p], x === c ? t = c : t !== c && (t += (x ?? "") + a[p + 1]), this._$AH[p] = x;
    }
    s && !i && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ti extends Tt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class ri extends Tt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class ii extends Tt {
  constructor(t, r, o, i, a) {
    super(t, r, o, i, a), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = He(this, t, r, 0) ?? c) === ce) return;
    const o = this._$AH, i = t === c && o !== c || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, a = t !== c && (o === c || i);
    i && this.element.removeEventListener(this.name, this, o), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class oi {
  constructor(t, r, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    He(this, t);
  }
}
const ai = Zt.litHtmlPolyfillSupport;
ai?.(lt, vt), (Zt.litHtmlVersions ??= []).push("3.3.2");
const si = (e, t, r) => {
  const o = r?.renderBefore ?? t;
  let i = o._$litPart$;
  if (i === void 0) {
    const a = r?.renderBefore ?? null;
    o._$litPart$ = i = new vt(t.insertBefore(st(), a), a, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tr = globalThis;
let v = class extends Ve {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = si(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ce;
  }
};
v._$litElement$ = !0, v.finalized = !0, tr.litElementHydrateSupport?.({ LitElement: v });
const ni = tr.litElementPolyfillSupport;
ni?.({ LitElement: v });
(tr.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const g = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const li = { attribute: !0, type: String, converter: Dt, reflect: !1, hasChanged: Jt }, ci = (e = li, t, r) => {
  const { kind: o, metadata: i } = r;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), o === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(r.name, e), o === "accessor") {
    const { name: s } = r;
    return { set(d) {
      const p = t.get.call(this);
      t.set.call(this, d), this.requestUpdate(s, p, e, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(s, void 0, e, d), d;
    } };
  }
  if (o === "setter") {
    const { name: s } = r;
    return function(d) {
      const p = this[s];
      t.call(this, d), this.requestUpdate(s, p, e, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function l(e) {
  return (t, r) => typeof r == "object" ? ci(e, t, r) : ((o, i, a) => {
    const s = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, o), s ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function h(e) {
  return l({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const di = (e, t, r) => (r.configurable = !0, r.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, r), r);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function R(e, t) {
  return (r, o, i) => {
    const a = (s) => s.renderRoot?.querySelector(e) ?? null;
    return di(r, o, { get() {
      return a(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Er = { ATTRIBUTE: 1, CHILD: 2 }, Pr = (e) => (...t) => ({ _$litDirective$: e, values: t });
class Ir {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, r, o) {
    this._$Ct = t, this._$AM = r, this._$Ci = o;
  }
  _$AS(t, r) {
    return this.update(t, r);
  }
  update(t, r) {
    return this.render(...r);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u = Pr(class extends Ir {
  constructor(e) {
    if (super(e), e.type !== Er.ATTRIBUTE || e.name !== "class" || e.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
  }
  update(e, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((o) => o !== "")));
      for (const o in t) t[o] && !this.nt?.has(o) && this.st.add(o);
      return this.render(t);
    }
    const r = e.element.classList;
    for (const o of this.st) o in t || (r.remove(o), this.st.delete(o));
    for (const o in t) {
      const i = !!t[o];
      i === this.st.has(o) || this.nt?.has(o) || (i ? (r.add(o), this.st.add(o)) : (r.remove(o), this.st.delete(o)));
    }
    return ce;
  }
});
var pi = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, gt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? hi(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && pi(t, r, i), i;
};
let De = class extends v {
  constructor() {
    super(...arguments), this.variant = "primary", this.size = "md", this.disabled = !1, this.loading = !1;
  }
  render() {
    const e = {
      button: !0,
      [this.variant]: !0,
      [this.size]: !0,
      loading: this.loading
    };
    return n`
      <button
        class=${u(e)}
        ?disabled=${this.disabled}
        aria-busy=${this.loading ? "true" : c}
      >
        ${this.loading ? n`<span class="spinner"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>` : n`<span class="icon-slot"><slot name="icon"></slot></span><slot></slot>`}
      </button>
    `;
  }
};
De.styles = b`
    :host {
      display: inline-flex;
    }
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      line-height: 1;
      white-space: nowrap;
      position: relative;
      transition: background-color var(--ca-transition-fast), border-color var(--ca-transition-fast), opacity var(--ca-transition-fast);
      box-sizing: border-box;
      text-decoration: none;
      padding: 14px 24px;
      font-size: var(--ca-font-size-sm);
      border-radius: var(--ca-radius-button);
    }
    .button:focus-visible {
      outline: none;
    }

    /* Sizes */
    .button.xs { padding: 6px 12px; font-size: var(--ca-font-size-xs); }
    .button.sm { padding: 8px 16px; font-size: var(--ca-font-size-sm); }
    .button.md { padding: 14px 24px; font-size: var(--ca-font-size-sm); }
    .button.lg { padding: 16px 32px; font-size: var(--ca-font-size-lg); }
    .button.xl { padding: 20px 40px; font-size: var(--ca-font-size-lg); }

    /* Primary */
    .button.primary {
      background-color: var(--ca-color-primary);
      color: var(--ca-color-white);
    }
    .button.primary:hover:not(:disabled):not(.loading) {
      background-color: var(--ca-color-primary-pressed);
    }
    .button.primary:focus-visible {
      border: 2px solid var(--ca-color-focus-ring);
    }
    .button.primary:disabled,
    .button.primary.loading {
      background-color: var(--ca-color-disabled);
      color: var(--ca-color-disabled-text);
      cursor: not-allowed;
    }

    /* Secondary */
    .button.secondary {
      background-color: var(--ca-color-secondary);
      color: var(--ca-color-secondary-text, var(--ca-color-white));
    }
    .button.secondary:hover:not(:disabled):not(.loading) {
      opacity: 0.8;
    }
    .button.secondary:focus-visible {
      border: 2px solid var(--ca-color-focus-ring);
    }
    .button.secondary:disabled,
    .button.secondary.loading {
      background-color: var(--ca-color-disabled);
      color: var(--ca-color-disabled-text);
      cursor: not-allowed;
    }

    /* Tertiary */
    .button.tertiary {
      background-color: transparent;
      color: var(--ca-text-primary);
      border: 1px solid var(--ca-text-primary);
    }
    .button.tertiary:hover:not(:disabled):not(.loading) {
      background-color: var(--ca-color-secondary-hover);
    }
    .button.tertiary:focus-visible {
      border-width: 2.5px;
      border-color: var(--ca-text-primary);
    }
    .button.tertiary:disabled,
    .button.tertiary.loading {
      background-color: var(--ca-color-disabled);
      color: var(--ca-color-disabled-text);
      border-color: transparent;
      cursor: not-allowed;
    }

    /* Danger */
    .button.danger {
      background-color: var(--ca-color-danger);
      color: var(--ca-color-white);
    }
    .button.danger:hover:not(:disabled):not(.loading) {
      background-color: var(--ca-color-danger-pressed);
    }
    .button.danger:focus-visible {
      border: 2px solid var(--ca-color-focus-ring);
    }
    .button.danger:disabled,
    .button.danger.loading {
      background-color: var(--ca-color-disabled);
      color: var(--ca-color-disabled-text);
      cursor: not-allowed;
    }

    /* Icon */
    .icon-slot {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }
    .icon-slot ::slotted(svg),
    .icon-slot ::slotted(img) {
      width: 1em;
      height: 1em;
    }

    /* Loading */
    .loading {
      pointer-events: none;
    }
    .spinner {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--ca-color-disabled-text);
      animation: pulse 1.4s ease-in-out infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes pulse {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1); }
    }
  `;
gt([
  l({ type: String, reflect: !0 })
], De.prototype, "variant", 2);
gt([
  l({ type: String, reflect: !0 })
], De.prototype, "size", 2);
gt([
  l({ type: Boolean, reflect: !0 })
], De.prototype, "disabled", 2);
gt([
  l({ type: Boolean, reflect: !0 })
], De.prototype, "loading", 2);
De = gt([
  g("ca-button")
], De);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yt = (e) => e ?? c;
var ui = Object.defineProperty, fi = Object.getOwnPropertyDescriptor, re = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? fi(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && ui(t, r, i), i;
};
let F = class extends v {
  constructor() {
    super(...arguments), this.type = "text", this.value = "", this.label = "", this.error = "", this.placeholder = "", this.disabled = !1, this.loading = !1, this.size = "md", this.borderless = !1;
  }
  _handleInput(e) {
    const t = e.target;
    this.value = t.value, this.dispatchEvent(
      new CustomEvent("ca-input", {
        detail: { value: this.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleChange(e) {
    const t = e.target;
    this.value = t.value, this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { value: this.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    const e = !!this.error;
    return n`
      ${this.label ? n`<label class="label">${this.label}</label>` : c}
      <div class=${u({ field: !0, "has-error": e })}>
        <span class="icon"><slot name="icon"></slot></span>
        <input
          class="native"
          type=${this.type}
          .value=${this.value}
          placeholder=${Yt(this.placeholder || void 0)}
          ?disabled=${this.disabled}
          aria-invalid=${Yt(e ? "true" : void 0)}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        ${this.loading ? n`<span class="loader"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>` : n`<span class="icon-after"><slot name="icon-after"></slot></span>`}
      </div>
      ${e ? n`<span class="error-message">${this.error}</span>` : c}
    `;
  }
};
F.styles = b`
    :host {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-family: var(--ca-font-family);
    }
    .label {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      line-height: 1;
    }
    .field {
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      transition: border-color var(--ca-transition-fast);
      box-sizing: border-box;
      padding: 10px 12px;
      font-size: var(--ca-font-size-md);
    }
    .field:focus-within {
      border: 2px solid var(--ca-text-primary);
    }
    :host([borderless]) .field {
      border-color: transparent;
      background-color: transparent;
    }
    :host([borderless]) .field:focus-within {
      border: 2px solid var(--ca-text-primary);
    }
    .field.has-error {
      border-color: var(--ca-text-danger);
    }
    .field.has-error:focus-within {
      border-color: var(--ca-text-danger);
    }
    .native {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: transparent;
      color: var(--ca-text-primary);
      font-family: inherit;
      font-size: inherit;
      line-height: 1;
    }
    .native::placeholder {
      color: var(--ca-text-muted);
    }
    .native:disabled {
      cursor: not-allowed;
    }
    .icon, .icon-after {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
      color: var(--ca-text-secondary);
    }
    .icon ::slotted(svg), .icon-after ::slotted(svg) {
      width: 1em;
      height: 1em;
    }
    .error-message {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-danger);
      line-height: 1.3;
    }
    .loader {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: var(--ca-text-secondary);
      animation: pulse 1.4s ease-in-out infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes pulse {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1); }
    }

    /* Size: xs */
    :host([size='xs']) .field {
      padding: 6px 8px;
      font-size: var(--ca-font-size-xs);
      border-radius: 6px;
      gap: 6px;
    }
    /* Size: sm */
    :host([size='sm']) .field {
      padding: 8px 10px;
      font-size: var(--ca-font-size-xs);
      border-radius: 6px;
    }
    /* Size: lg */
    :host([size='lg']) .field {
      padding: 14px 14px;
      font-size: var(--ca-font-size-lg);
      border-radius: 10px;
    }
    /* Size: xl */
    :host([size='xl']) .field {
      padding: 18px 16px;
      font-size: 20px;
      border-radius: 12px;
      gap: 10px;
    }

    /* Disabled */
    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
re([
  l({ type: String })
], F.prototype, "type", 2);
re([
  l({ type: String })
], F.prototype, "value", 2);
re([
  l({ type: String })
], F.prototype, "label", 2);
re([
  l({ type: String })
], F.prototype, "error", 2);
re([
  l({ type: String })
], F.prototype, "placeholder", 2);
re([
  l({ type: Boolean, reflect: !0 })
], F.prototype, "disabled", 2);
re([
  l({ type: Boolean })
], F.prototype, "loading", 2);
re([
  l({ type: String, reflect: !0 })
], F.prototype, "size", 2);
re([
  l({ type: Boolean, reflect: !0 })
], F.prototype, "borderless", 2);
F = re([
  g("ca-input")
], F);
var vi = Object.defineProperty, gi = Object.getOwnPropertyDescriptor, We = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? gi(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && vi(t, r, i), i;
};
let de = class extends v {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.size = "md", this.label = "", this.subtext = "";
  }
  _handleChange(e) {
    this.disabled || (this.checked = e.target.checked, this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { checked: this.checked },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return n`
      <label class="checkbox">
        <input
          type="checkbox"
          class="hidden-input"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
          aria-label=${this.label || c}
        />
        <span class="focus-ring">
          <span class=${u({ box: !0, checked: this.checked })}>
            <svg
              class=${u({ checkmark: !0, visible: this.checked })}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </span>
        ${this.label || this.subtext ? n`
              <span class=${u({ "label-group": !0, "no-subtext": !this.subtext })}>
                ${this.label ? n`<span class="label">${this.label}</span>` : c}
                ${this.subtext ? n`<span class="subtext">${this.subtext}</span>` : c}
              </span>
            ` : c}
      </label>
    `;
  }
};
de.styles = b`
    :host {
      display: inline-flex;
    }
    .checkbox {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      user-select: none;
    }
    .hidden-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }
    .focus-ring {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      border: 2px solid transparent;
      padding: 2px;
      flex-shrink: 0;
      transition: border-color var(--ca-transition-fast);
    }
    .hidden-input:focus-visible ~ .focus-ring {
      border-color: var(--ca-text-primary);
    }
    .hidden-input:focus-visible ~ .focus-ring .box {
      border-color: var(--ca-text-primary);
    }
    .box {
      position: relative;
      flex-shrink: 0;
      border-radius: 4px;
      border: 1px solid var(--ca-border-input);
      background-color: var(--ca-surface);
      transition: background-color var(--ca-transition-fast), border-color var(--ca-transition-fast);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
    }
    .box.checked {
      background-color: var(--ca-checkbox-checked-bg, var(--ca-color-secondary));
      border-color: var(--ca-checkbox-checked-border, var(--ca-color-secondary));
    }
    .checkmark {
      opacity: 0;
      transition: opacity var(--ca-transition-fast);
      color: var(--ca-checkbox-checkmark, var(--ca-color-white));
      width: 16px;
      height: 16px;
    }
    .checkmark.visible {
      opacity: 1;
    }
    .label-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-top: 2px;
    }
    .label-group.no-subtext {
      padding-top: 0;
    }
    .label {
      font-family: var(--ca-font-family);
      font-weight: 400;
      line-height: 1;
      color: var(--ca-text-primary);
      font-size: 14px;
    }
    .subtext {
      font-family: var(--ca-font-family);
      font-weight: 400;
      line-height: 1.3;
      color: var(--ca-text-muted);
      max-width: 320px;
      font-size: 13px;
    }

    /* Size: xs */
    :host([size='xs']) .checkbox { gap: 8px; }
    :host([size='xs']) .box { width: 16px; height: 16px; border-radius: 3px; }
    :host([size='xs']) .checkmark { width: 10px; height: 10px; }
    :host([size='xs']) .label { font-size: 10px; }
    :host([size='xs']) .subtext { font-size: 10px; }

    /* Size: sm */
    :host([size='sm']) .checkbox { gap: 10px; }
    :host([size='sm']) .box { width: 20px; height: 20px; }
    :host([size='sm']) .checkmark { width: 12px; height: 12px; }
    :host([size='sm']) .label { font-size: 12px; }
    :host([size='sm']) .subtext { font-size: 12px; }

    /* Size: md (default) */
    :host .checkbox,
    :host([size='md']) .checkbox { gap: 12px; }

    /* Size: lg */
    :host([size='lg']) .checkbox { gap: 12px; }
    :host([size='lg']) .box { width: 28px; height: 28px; border-radius: 5px; }
    :host([size='lg']) .checkmark { width: 18px; height: 18px; }
    :host([size='lg']) .label { font-size: 16px; }
    :host([size='lg']) .subtext { font-size: 14px; }

    /* Size: xl */
    :host([size='xl']) .checkbox { gap: 14px; }
    :host([size='xl']) .box { width: 32px; height: 32px; border-radius: 6px; }
    :host([size='xl']) .focus-ring { border-radius: 10px; }
    :host([size='xl']) .checkmark { width: 22px; height: 22px; }
    :host([size='xl']) .label { font-size: 18px; }
    :host([size='xl']) .subtext { font-size: 16px; }

    /* Disabled */
    :host([disabled]) .checkbox {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;
We([
  l({ type: Boolean, reflect: !0 })
], de.prototype, "checked", 2);
We([
  l({ type: Boolean, reflect: !0 })
], de.prototype, "disabled", 2);
We([
  l({ type: String, reflect: !0 })
], de.prototype, "size", 2);
We([
  l({ type: String })
], de.prototype, "label", 2);
We([
  l({ type: String })
], de.prototype, "subtext", 2);
de = We([
  g("ca-checkbox")
], de);
var xi = Object.defineProperty, bi = Object.getOwnPropertyDescriptor, ve = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? bi(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && xi(t, r, i), i;
};
let Q = class extends v {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.size = "md", this.name = "", this.value = "", this.label = "", this.subtext = "";
  }
  _handleClick() {
    this.disabled || this.checked || (this.checked = !0, this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { value: this.value, name: this.name },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  _handleKeyDown(e) {
    (e.key === " " || e.key === "Enter") && (e.preventDefault(), this._handleClick());
  }
  render() {
    const e = !!this.subtext;
    return n`
      <label
        class=${u({ radio: !0, "has-subtext": e })}
        @click=${this._handleClick}
      >
        <input
          type="radio"
          class="hidden-input"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name || c}
          value=${this.value}
          @keydown=${this._handleKeyDown}
          aria-label=${this.label || c}
        />
        <span class="focus-ring">
          <span class=${u({ circle: !0, checked: this.checked })}>
            <span class=${u({ dot: !0, visible: this.checked })}></span>
          </span>
        </span>
        ${this.label || this.subtext ? n`
              <span class=${u({ "label-group": !0, "no-subtext": !e })}>
                ${this.label ? n`<span class="label">${this.label}</span>` : c}
                ${this.subtext ? n`<span class="subtext">${this.subtext}</span>` : c}
              </span>
            ` : c}
      </label>
    `;
  }
};
Q.styles = b`
    :host {
      display: inline-flex;
    }
    .radio {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      position: relative;
      user-select: none;
    }
    .radio.has-subtext {
      align-items: flex-start;
      gap: 16px;
    }
    .hidden-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }
    .focus-ring {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 2px solid transparent;
      padding: 2px;
      flex-shrink: 0;
      transition: border-color var(--ca-transition-fast);
    }
    .hidden-input:focus-visible ~ .focus-ring {
      border-color: var(--ca-text-primary);
    }
    .hidden-input:focus-visible ~ .focus-ring .circle {
      border-color: var(--ca-text-primary);
    }
    .circle {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid var(--ca-border);
      background-color: var(--ca-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: border-color var(--ca-transition-fast);
      box-sizing: border-box;
    }
    .circle.checked {
      border: 2px solid var(--ca-radio-checked-color, var(--ca-color-secondary));
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--ca-radio-checked-color, var(--ca-color-secondary));
      opacity: 0;
      transition: opacity var(--ca-transition-fast);
    }
    .dot.visible {
      opacity: 1;
    }
    .label-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-top: 2px;
    }
    .label-group.no-subtext {
      padding-top: 0;
    }
    .label {
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 16px;
      line-height: 1;
      color: var(--ca-text-primary);
    }
    .subtext {
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 14px;
      line-height: 1.3;
      color: var(--ca-text-muted);
      max-width: 320px;
    }

    /* Size: xs */
    :host([size='xs']) .radio { gap: 8px; }
    :host([size='xs']) .circle { width: 16px; height: 16px; }
    :host([size='xs']) .dot { width: 5px; height: 5px; }
    :host([size='xs']) .label { font-size: 10px; }
    :host([size='xs']) .subtext { font-size: 10px; }

    /* Size: sm (default) */
    :host([size='sm']) .radio { gap: 10px; }
    :host([size='sm']) .circle { width: 20px; height: 20px; }
    :host([size='sm']) .dot { width: 6px; height: 6px; }
    :host([size='sm']) .label { font-size: 12px; }
    :host([size='sm']) .subtext { font-size: 12px; }

    /* Size: md */
    :host([size='md']) .radio { gap: 12px; }

    /* Size: lg */
    :host([size='lg']) .radio { gap: 12px; }
    :host([size='lg']) .circle { width: 28px; height: 28px; }
    :host([size='lg']) .dot { width: 10px; height: 10px; }
    :host([size='lg']) .label { font-size: 16px; }
    :host([size='lg']) .subtext { font-size: 14px; }

    /* Size: xl */
    :host([size='xl']) .radio { gap: 14px; }
    :host([size='xl']) .circle { width: 32px; height: 32px; }
    :host([size='xl']) .dot { width: 12px; height: 12px; }
    :host([size='xl']) .label { font-size: 18px; }
    :host([size='xl']) .subtext { font-size: 16px; }

    /* Disabled */
    :host([disabled]) .radio {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;
ve([
  l({ type: Boolean, reflect: !0 })
], Q.prototype, "checked", 2);
ve([
  l({ type: Boolean, reflect: !0 })
], Q.prototype, "disabled", 2);
ve([
  l({ type: String, reflect: !0 })
], Q.prototype, "size", 2);
ve([
  l({ type: String })
], Q.prototype, "name", 2);
ve([
  l({ type: String })
], Q.prototype, "value", 2);
ve([
  l({ type: String })
], Q.prototype, "label", 2);
ve([
  l({ type: String })
], Q.prototype, "subtext", 2);
Q = ve([
  g("ca-radio")
], Q);
var mi = Object.defineProperty, yi = Object.getOwnPropertyDescriptor, Xe = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? yi(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && mi(t, r, i), i;
};
let pe = class extends v {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.size = "md", this.label = "", this.subtext = "";
  }
  _handleChange(e) {
    this.disabled || (this.checked = e.target.checked, this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { checked: this.checked },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    const e = !!this.subtext;
    return n`
      <label
        class=${u({ toggle: !0, "with-subtext": e })}
      >
        <input
          type="checkbox"
          class="hidden-input"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
          aria-label=${this.label || c}
        />
        <span class="focus-ring">
          <span class=${u({ track: !0, checked: this.checked })}>
            <span class=${u({ thumb: !0, checked: this.checked })}>
              <span class=${u({ "check-icon": !0, checked: this.checked })}>
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  <path d="M3.5 8.5L6.5 11.5L12.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </span>
          </span>
        </span>
        ${this.label || this.subtext ? n`
              <span class="label-group">
                ${this.label ? n`<span class="label">${this.label}</span>` : c}
                ${this.subtext ? n`<span class="subtext">${this.subtext}</span>` : c}
              </span>
            ` : c}
      </label>
    `;
  }
};
pe.styles = b`
    :host {
      display: inline-flex;
    }
    .toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      user-select: none;
    }
    .toggle.with-subtext {
      justify-content: flex-start;
      gap: 16px;
    }
    .hidden-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      margin: 0;
      pointer-events: none;
    }
    .focus-ring {
      display: flex;
      flex-shrink: 0;
      border-radius: 28px;
      border: 2px solid transparent;
      padding: 2px;
      transition: border-color var(--ca-transition-fast);
    }
    .hidden-input:focus-visible ~ .focus-ring {
      border-color: var(--ca-text-primary);
    }
    .track {
      position: relative;
      width: 48px;
      height: 32px;
      border-radius: 37px;
      background-color: var(--ca-toggle-track-bg, var(--ca-border-strong));
      transition: background-color var(--ca-transition-normal);
      flex-shrink: 0;
    }
    .toggle:hover .track {
      background-color: var(--ca-text-muted);
    }
    .track.checked {
      background-color: var(--ca-toggle-active-bg, var(--ca-toggle-active));
    }
    .toggle:hover .track.checked {
      background-color: var(--ca-toggle-active-bg, var(--ca-toggle-active));
    }
    .thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background-color: var(--ca-toggle-thumb-bg, var(--ca-color-white));
      box-shadow: var(--ca-shadow-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: left var(--ca-transition-normal);
    }
    .thumb.checked {
      left: 19px;
    }
    .check-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      color: var(--ca-toggle-active);
      opacity: 0;
      transition: opacity var(--ca-transition-fast);
    }
    .check-icon.checked {
      opacity: 1;
    }
    .label-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 2px;
    }
    .label {
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 16px;
      line-height: 1;
      color: var(--ca-text-primary);
    }
    .subtext {
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 14px;
      line-height: 1.3;
      color: var(--ca-text-muted);
    }

    /* Size: sm */
    :host([size='sm']) .focus-ring {
      border-radius: 20px;
      padding: 1px;
    }
    :host([size='sm']) .track {
      width: 36px;
      height: 22px;
      border-radius: 28px;
    }
    :host([size='sm']) .thumb {
      top: 2px;
      left: 2px;
      width: 18px;
      height: 18px;
    }
    :host([size='sm']) .thumb.checked {
      left: 16px;
    }
    :host([size='sm']) .check-icon {
      width: 12px;
      height: 12px;
    }
    :host([size='sm']) .label {
      font-size: 14px;
    }
    :host([size='sm']) .subtext {
      font-size: 12px;
    }

    /* Disabled */
    :host([disabled]) .toggle {
      cursor: not-allowed;
      opacity: 0.5;
    }
    :host([disabled]) .track {
      background-color: var(--ca-color-disabled) !important;
      cursor: not-allowed;
    }
    :host([disabled]) .thumb {
      box-shadow: none;
    }
  `;
Xe([
  l({ type: Boolean, reflect: !0 })
], pe.prototype, "checked", 2);
Xe([
  l({ type: Boolean, reflect: !0 })
], pe.prototype, "disabled", 2);
Xe([
  l({ type: String, reflect: !0 })
], pe.prototype, "size", 2);
Xe([
  l({ type: String })
], pe.prototype, "label", 2);
Xe([
  l({ type: String })
], pe.prototype, "subtext", 2);
pe = Xe([
  g("ca-toggle")
], pe);
var _i = Object.defineProperty, wi = Object.getOwnPropertyDescriptor, xt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? wi(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && _i(t, r, i), i;
};
let Ee = class extends v {
  constructor() {
    super(...arguments), this.variant = "default", this.size = "md", this.dot = !1, this.color = "";
  }
  updated(e) {
    super.updated?.(e), e.has("color") && (this.color ? this.style.backgroundColor = this.color : this.style.removeProperty("background-color"));
  }
  render() {
    return this.dot ? n`` : n`<slot></slot>`;
  }
};
Ee.styles = b`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--ca-radius-full);
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      line-height: 1;
      white-space: nowrap;
      box-sizing: border-box;
      color: var(--ca-color-white);
      background-color: var(--ca-color-secondary);
    }

    /* Sizes */
    :host([size='sm']) {
      font-size: var(--ca-font-size-xs);
      min-width: 18px;
      height: 18px;
      padding: 2px 6px;
    }
    :host, :host([size='md']) {
      font-size: var(--ca-font-size-sm);
      min-width: 22px;
      height: 22px;
      padding: 2px 8px;
    }

    /* Dot mode */
    :host([dot]) {
      padding: 0;
    }
    :host([dot][size='sm']) {
      width: 8px;
      height: 8px;
      min-width: 8px;
    }
    :host([dot]), :host([dot][size='md']) {
      width: 10px;
      height: 10px;
      min-width: 10px;
    }

    /* Variants */
    :host([variant='success']) { background-color: var(--ca-color-success); }
    :host([variant='warning']) { background-color: var(--ca-color-warning); }
    :host([variant='danger']) { background-color: var(--ca-color-danger); }
  `;
xt([
  l({ type: String, reflect: !0 })
], Ee.prototype, "variant", 2);
xt([
  l({ type: String, reflect: !0 })
], Ee.prototype, "size", 2);
xt([
  l({ type: Boolean, reflect: !0 })
], Ee.prototype, "dot", 2);
xt([
  l({ type: String })
], Ee.prototype, "color", 2);
Ee = xt([
  g("ca-badge")
], Ee);
var $i = Object.defineProperty, ki = Object.getOwnPropertyDescriptor, Bt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ki(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && $i(t, r, i), i;
};
let Ke = class extends v {
  constructor() {
    super(...arguments), this.selected = !1, this.disabled = !1, this.size = "md";
  }
  _handleClick() {
    this.disabled || (this.selected = !this.selected, this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { selected: this.selected },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return n`
      <button
        class=${u({ chip: !0, selected: this.selected })}
        ?disabled=${this.disabled}
        aria-pressed=${this.selected}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
};
Ke.styles = b`
    :host {
      display: inline-flex;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      border-radius: 50px;
      border: 1px solid var(--ca-border);
      background-color: var(--ca-surface);
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 14px;
      line-height: 1;
      color: var(--ca-text-primary);
      cursor: pointer;
      white-space: nowrap;
      transition: background-color var(--ca-transition-fast), border-color var(--ca-transition-fast), color var(--ca-transition-fast), transform 0.1s ease;
      box-sizing: border-box;
    }
    /* Size: sm */
    :host([size='sm']) .chip {
      padding: 6px 12px;
      font-size: 12px;
    }
    .chip:hover {
      border-color: var(--ca-text-primary);
    }
    .chip:active {
      border-color: var(--ca-text-primary);
      transform: scale(0.96);
    }
    .chip:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--ca-surface), 0 0 0 5px var(--ca-text-primary);
      border-color: var(--ca-text-primary);
    }
    .chip.selected {
      background-color: var(--ca-color-secondary);
      border-color: var(--ca-color-secondary);
      color: var(--ca-color-secondary-text, var(--ca-color-white));
    }
    :host([disabled]) .chip {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  `;
Bt([
  l({ type: Boolean, reflect: !0 })
], Ke.prototype, "selected", 2);
Bt([
  l({ type: Boolean, reflect: !0 })
], Ke.prototype, "disabled", 2);
Bt([
  l({ type: String, reflect: !0 })
], Ke.prototype, "size", 2);
Ke = Bt([
  g("ca-chip")
], Ke);
var zi = Object.defineProperty, Ci = Object.getOwnPropertyDescriptor, Lt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ci(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && zi(t, r, i), i;
};
let Ue = class extends v {
  constructor() {
    super(...arguments), this.selected = !1, this.viewed = !1, this.disabled = !1;
  }
  _handleClick() {
    this.disabled || (this.selected = !this.selected, this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { selected: this.selected },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return n`
      <button
        class=${u({
      "map-chip": !0,
      selected: this.selected,
      viewed: this.viewed && !this.selected
    })}
        ?disabled=${this.disabled}
        aria-pressed=${this.selected}
        @click=${this._handleClick}
      >
        <slot></slot>
        <span class="icon"><slot name="icon-after"></slot></span>
      </button>
    `;
  }
};
Ue.styles = b`
    :host {
      display: inline-flex;
    }
    .map-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px;
      border-radius: 43px;
      background-color: var(--ca-surface);
      box-shadow: var(--ca-shadow-chip);
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      font-size: 14px;
      line-height: 1;
      color: var(--ca-text-primary);
      cursor: pointer;
      white-space: nowrap;
      border: 1px solid transparent;
      transition: background-color var(--ca-transition-fast), color var(--ca-transition-fast);
    }
    .map-chip:hover {
      transform: scale(1.05);
    }
    .map-chip.selected {
      background-color: var(--ca-color-secondary);
      color: var(--ca-color-secondary-text, var(--ca-color-white));
    }
    .map-chip.viewed {
      background-color: var(--ca-surface-active);
      border-color: var(--ca-border-strong);
    }
    .icon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      color: var(--ca-color-primary);
      display: flex;
      align-items: center;
    }
    .icon ::slotted(svg) {
      width: 100%;
      height: 100%;
    }
    :host([disabled]) .map-chip {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  `;
Lt([
  l({ type: Boolean, reflect: !0 })
], Ue.prototype, "selected", 2);
Lt([
  l({ type: Boolean, reflect: !0 })
], Ue.prototype, "viewed", 2);
Lt([
  l({ type: Boolean, reflect: !0 })
], Ue.prototype, "disabled", 2);
Ue = Lt([
  g("ca-map-chip")
], Ue);
var Oi = Object.defineProperty, Si = Object.getOwnPropertyDescriptor, Mr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Si(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Oi(t, r, i), i;
};
let Pt = class extends v {
  constructor() {
    super(...arguments), this.padding = "md";
  }
  render() {
    return n`<slot></slot>`;
  }
};
Pt.styles = b`
    :host {
      display: block;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-lg);
      background-color: var(--ca-surface);
      font-family: var(--ca-font-family);
      padding: 24px;
    }
    :host([padding='none']) { padding: 0; }
    :host([padding='sm']) { padding: 16px; }
    :host([padding='md']) { padding: 24px; }
    :host([padding='lg']) { padding: 32px; }
  `;
Mr([
  l({ type: String, reflect: !0 })
], Pt.prototype, "padding", 2);
Pt = Mr([
  g("ca-card")
], Pt);
var Di = Object.defineProperty, Ei = Object.getOwnPropertyDescriptor, bt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ei(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Di(t, r, i), i;
};
let Pe = class extends v {
  constructor() {
    super(...arguments), this.selected = !1, this.size = "md", this.label = "", this._hasIcon = !1;
  }
  _onIconSlotChange(e) {
    const t = e.target;
    this._hasIcon = t.assignedNodes({ flatten: !0 }).length > 0;
  }
  _handleClick() {
    this.selected = !this.selected, this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { selected: this.selected },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return n`
      <button class="wrapper" @click=${this._handleClick} aria-pressed=${this.selected}>
        <div class=${u({ inner: !0, selected: this.selected })}>
          <span class="icon-slot">
            <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
            ${this._hasIcon ? c : n`
              <svg class="default-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            `}
          </span>
          ${this.label ? n`<span class="label">${this.label}</span>` : c}
        </div>
      </button>
    `;
  }
};
Pe.styles = b`
    :host {
      display: inline-flex;
    }
    .wrapper {
      display: flex;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 14px;
      box-sizing: border-box;
    }
    .wrapper:focus-visible {
      outline: none;
      padding: 3px;
    }
    .inner {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 40px;
      width: 166px;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid var(--ca-border);
      background-color: var(--ca-surface);
      box-sizing: border-box;
      transition: border-color var(--ca-transition-fast), background-color var(--ca-transition-fast);
    }
    .wrapper:hover .inner {
      border-color: var(--ca-text-primary);
    }
    .wrapper:active .inner {
      border-color: var(--ca-text-primary);
      transform: scale(0.97);
    }
    .wrapper:focus-visible .inner {
      border-color: var(--ca-border);
    }
    .inner.selected {
      background-color: var(--ca-surface-hover);
      border: 1px solid var(--ca-text-primary);
    }
    .icon-slot {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      color: var(--ca-text-primary);
    }
    .icon-slot ::slotted(svg) {
      width: 32px;
      height: 32px;
    }
    .default-icon {
      width: 100%;
      height: 100%;
      color: inherit;
    }
    .label {
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      font-size: 16px;
      line-height: 1;
      color: var(--ca-text-primary);
      white-space: nowrap;
    }

    /* xs */
    :host([size='xs']) .inner { width: 100px; gap: 16px; padding: 10px; border-radius: 8px; }
    :host([size='xs']) .icon-slot { width: 20px; height: 20px; }
    :host([size='xs']) .icon-slot ::slotted(svg) { width: 20px; height: 20px; }
    :host([size='xs']) .label { font-size: var(--ca-font-size-xs); }

    /* sm */
    :host([size='sm']) .inner { width: 130px; gap: 24px; padding: 12px; border-radius: 10px; }
    :host([size='sm']) .icon-slot { width: 24px; height: 24px; }
    :host([size='sm']) .icon-slot ::slotted(svg) { width: 24px; height: 24px; }
    :host([size='sm']) .label { font-size: var(--ca-font-size-sm); }

    /* lg */
    :host([size='lg']) .inner { width: 200px; gap: 48px; padding: 20px; border-radius: 14px; }
    :host([size='lg']) .icon-slot { width: 40px; height: 40px; }
    :host([size='lg']) .icon-slot ::slotted(svg) { width: 40px; height: 40px; }
    :host([size='lg']) .label { font-size: 18px; }

    /* xl */
    :host([size='xl']) .inner { width: 240px; gap: 56px; padding: 24px; border-radius: 16px; }
    :host([size='xl']) .icon-slot { width: 48px; height: 48px; }
    :host([size='xl']) .icon-slot ::slotted(svg) { width: 48px; height: 48px; }
    :host([size='xl']) .label { font-size: 20px; }
  `;
bt([
  l({ type: Boolean, reflect: !0 })
], Pe.prototype, "selected", 2);
bt([
  l({ type: String, reflect: !0 })
], Pe.prototype, "size", 2);
bt([
  l({ type: String })
], Pe.prototype, "label", 2);
bt([
  h()
], Pe.prototype, "_hasIcon", 2);
Pe = bt([
  g("ca-card-button")
], Pe);
var Pi = Object.defineProperty, Ii = Object.getOwnPropertyDescriptor, Ar = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ii(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Pi(t, r, i), i;
};
let It = class extends v {
  constructor() {
    super(...arguments), this.variant = "highlight";
  }
  render() {
    return n`
      <div class="callout">
        <span class="icon-slot"><slot name="icon"></slot></span>
        <div class="content"><slot></slot></div>
      </div>
    `;
  }
};
It.styles = b`
    :host {
      display: block;
    }
    .callout {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 24px;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-lg);
      background-color: var(--ca-surface);
      font-family: var(--ca-font-family);
    }
    .icon-slot {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon-slot ::slotted(svg) {
      width: 32px;
      height: 32px;
    }
    .content {
      flex: 1;
      min-width: 0;
    }

    /* Highlight variant */
    :host([variant='highlight']) .content {
      font-size: 16px;
      font-weight: 400;
      line-height: 1.4;
      color: var(--ca-text-primary);
    }

    /* Info variant */
    :host([variant='info']) .content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  `;
Ar([
  l({ type: String, reflect: !0 })
], It.prototype, "variant", 2);
It = Ar([
  g("ca-callout")
], It);
var Mi = Object.defineProperty, Ai = Object.getOwnPropertyDescriptor, mt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ai(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Mi(t, r, i), i;
};
let Ie = class extends v {
  constructor() {
    super(...arguments), this.href = "", this.target = "", this.type = "subtle", this.size = "md";
  }
  render() {
    return n`
      <a
        class=${u({
      link: !0,
      [this.type]: !0
    })}
        href=${this.href}
        target=${Yt(this.target || void 0)}
      >
        <slot></slot>
        <span class="icon-after"><slot name="icon"></slot></span>
      </a>
    `;
  }
};
Ie.styles = b`
    :host {
      display: inline-flex;
    }
    .link {
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      line-height: 1;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      border: 2px solid transparent;
      border-radius: var(--ca-radius-link-focus);
      padding: 2px;
      transition: border-color var(--ca-transition-fast);
      box-sizing: border-box;
      font-size: var(--ca-font-size-md);
    }
    .link:focus-visible {
      outline: none;
    }

    /* Subtle */
    .link.subtle {
      color: var(--ca-text-primary);
    }
    .link.subtle:hover {
      color: var(--ca-text-primary);
    }
    .link.subtle:focus-visible {
      border-color: var(--ca-text-primary);
    }

    /* Legal */
    .link.legal {
      color: var(--ca-color-link);
      text-decoration: underline;
      text-decoration-skip-ink: none;
    }
    .link.legal:hover {
      color: var(--ca-color-link);
    }
    .link.legal:focus-visible {
      border-color: var(--ca-color-link);
      border-radius: var(--ca-radius-link-focus-sm);
    }

    /* Sizes */
    :host([size='sm']) .link {
      font-size: 12px;
      font-feature-settings: 'kern' 0;
    }
    :host([size='sm']) .link.subtle {
      text-decoration: underline;
      text-decoration-skip-ink: none;
    }

    /* Icon */
    .icon-after {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }
    .icon-after ::slotted(svg),
    .icon-after ::slotted(img) {
      width: 1em;
      height: 1em;
    }
  `;
mt([
  l({ type: String })
], Ie.prototype, "href", 2);
mt([
  l({ type: String })
], Ie.prototype, "target", 2);
mt([
  l({ type: String, reflect: !0 })
], Ie.prototype, "type", 2);
mt([
  l({ type: String, reflect: !0 })
], Ie.prototype, "size", 2);
Ie = mt([
  g("ca-link")
], Ie);
var ji = Object.defineProperty, Ti = Object.getOwnPropertyDescriptor, rr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ti(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && ji(t, r, i), i;
};
let ct = class extends v {
  constructor() {
    super(...arguments), this.size = "md", this.variant = "dots";
  }
  render() {
    return this.variant === "circular" ? n`<span class="circle"></span>` : n`
      <span class="dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </span>
    `;
  }
};
ct.styles = b`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* Dots */
    .dots {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .dot {
      border-radius: 50%;
      background-color: var(--ca-text-secondary);
      animation: pulse 1.4s ease-in-out infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }

    /* Circular */
    .circle {
      display: block;
      border-radius: 50%;
      border: 2px solid var(--ca-text-secondary);
      border-top-color: transparent;
      animation: spin 0.8s linear infinite;
    }

    /* Sizes - dots */
    :host([size='sm']) .dot { width: 5px; height: 5px; }
    :host, :host([size='md']) { }
    :host([size='md']) .dot, .dot { width: 8px; height: 8px; }
    :host([size='lg']) .dot { width: 10px; height: 10px; }

    /* Sizes - circle */
    :host([size='sm']) .circle { width: 14px; height: 14px; }
    :host([size='md']) .circle, .circle { width: 20px; height: 20px; }
    :host([size='lg']) .circle { width: 28px; height: 28px; border-width: 3px; }

    @keyframes pulse {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
rr([
  l({ type: String, reflect: !0 })
], ct.prototype, "size", 2);
rr([
  l({ type: String, reflect: !0 })
], ct.prototype, "variant", 2);
ct = rr([
  g("ca-spinner")
], ct);
var Bi = Object.defineProperty, Li = Object.getOwnPropertyDescriptor, ir = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Li(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Bi(t, r, i), i;
};
let dt = class extends v {
  constructor() {
    super(...arguments), this.orientation = "horizontal", this.spacing = "";
  }
  render() {
    return n`<hr role="separator" aria-orientation=${this.orientation} />`;
  }
};
dt.styles = b`
    :host {
      display: block;
    }
    hr {
      border: none;
      background-color: var(--ca-divider);
      margin: 0;
      padding: 0;
      flex-shrink: 0;
    }

    /* Horizontal */
    :host([orientation='horizontal']) hr, hr {
      width: 100%;
      height: 1px;
    }

    /* Vertical */
    :host([orientation='vertical']) {
      display: inline-block;
      align-self: stretch;
    }
    :host([orientation='vertical']) hr {
      width: 1px;
      height: 100%;
    }

    /* Spacing - horizontal */
    :host([spacing='sm']) hr { margin-top: var(--ca-space-sm); margin-bottom: var(--ca-space-sm); }
    :host([spacing='md']) hr { margin-top: var(--ca-space-md); margin-bottom: var(--ca-space-md); }
    :host([spacing='lg']) hr { margin-top: var(--ca-space-lg); margin-bottom: var(--ca-space-lg); }

    /* Spacing - vertical */
    :host([orientation='vertical'][spacing='sm']) hr { margin-left: var(--ca-space-sm); margin-right: var(--ca-space-sm); margin-top: 0; margin-bottom: 0; }
    :host([orientation='vertical'][spacing='md']) hr { margin-left: var(--ca-space-md); margin-right: var(--ca-space-md); margin-top: 0; margin-bottom: 0; }
    :host([orientation='vertical'][spacing='lg']) hr { margin-left: var(--ca-space-lg); margin-right: var(--ca-space-lg); margin-top: 0; margin-bottom: 0; }
  `;
ir([
  l({ type: String, reflect: !0 })
], dt.prototype, "orientation", 2);
ir([
  l({ type: String, reflect: !0 })
], dt.prototype, "spacing", 2);
dt = ir([
  g("ca-divider")
], dt);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Qt extends Ir {
  constructor(t) {
    if (super(t), this.it = c, t.type !== Er.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === c || t == null) return this._t = void 0, this.it = t;
    if (t === ce) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const r = [t];
    return r.raw = r, this._t = { _$litType$: this.constructor.resultType, strings: r, values: [] };
  }
}
Qt.directiveName = "unsafeHTML", Qt.resultType = 1;
const Oe = Pr(Qt);
var Ri = Object.defineProperty, Fi = Object.getOwnPropertyDescriptor, or = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Fi(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Ri(t, r, i), i;
};
let pt = class extends v {
  constructor() {
    super(...arguments), this.tabs = [], this.activeId = "";
  }
  _handleClick(e) {
    this.activeId = e.id, this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { id: e.id },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return n`
      ${this.tabs.map(
      (e) => n`
          <button
            class=${u({ tab: !0, active: e.id === this.activeId })}
            role="tab"
            aria-selected=${e.id === this.activeId}
            @click=${() => this._handleClick(e)}
          >
            <span class="tab-content">
              ${e.icon ? n`<span class="tab-icon">${Oe(e.icon)}</span>` : c}
              <span class="tab-label">${e.label}</span>
            </span>
            <span class="indicator"></span>
          </button>
        `
    )}
    `;
  }
};
pt.styles = b`
    :host {
      display: flex;
      align-items: center;
      gap: 0;
    }
    .tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: 14px;
      line-height: 1;
      color: var(--ca-text-muted);
      font-weight: 400;
      position: relative;
      box-sizing: border-box;
      border-radius: var(--ca-radius-md);
    }
    .tab:focus-visible {
      outline: 2px solid var(--ca-color-focus-ring);
      outline-offset: 4px;
      border-radius: var(--ca-radius-md);
    }
    .tab:hover {
      color: var(--ca-text-primary);
    }
    .tab.active {
      color: var(--ca-text-primary);
      font-weight: var(--ca-font-weight-semibold);
    }
    .tab-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
    }
    .tab-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      color: inherit;
    }
    .tab-icon svg {
      width: 100%;
      height: 100%;
    }
    .tab-label {
      white-space: nowrap;
    }
    .indicator {
      display: block;
      width: 100%;
      height: 2px;
      background-color: transparent;
      border-radius: 1px;
    }
    .tab.active .indicator {
      background-color: var(--ca-text-primary);
    }
  `;
or([
  l({ type: Array })
], pt.prototype, "tabs", 2);
or([
  l({ type: String, attribute: "active-id" })
], pt.prototype, "activeId", 2);
pt = or([
  g("ca-underline-tabs")
], pt);
var Ni = Object.defineProperty, Vi = Object.getOwnPropertyDescriptor, ar = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Vi(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Ni(t, r, i), i;
};
let ht = class extends v {
  constructor() {
    super(...arguments), this.tabs = [], this.activeId = "";
  }
  _handleClick(e) {
    this.activeId = e.id, this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { id: e.id },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return n`
      ${this.tabs.map(
      (e) => n`
          <button
            class=${u({ tab: !0, active: e.id === this.activeId })}
            role="tab"
            aria-selected=${e.id === this.activeId}
            @click=${() => this._handleClick(e)}
          >
            ${e.label}
          </button>
        `
    )}
    `;
  }
};
ht.styles = b`
    :host {
      display: inline-flex;
      align-items: flex-start;
      padding: 4px;
      background-color: var(--ca-surface-active);
      border-radius: 50px;
      width: fit-content;
    }
    .tab {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 12px;
      min-width: 100px;
      border-radius: 500px;
      border: 2px solid transparent;
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      font-size: 14px;
      line-height: 1;
      color: var(--ca-text-primary);
      white-space: nowrap;
      box-sizing: border-box;
      transition: background-color var(--ca-transition-fast), box-shadow var(--ca-transition-fast);
    }
    .tab:hover {
      background-color: var(--ca-surface);
    }
    .tab:focus-visible {
      outline: none;
      border-color: var(--ca-text-primary);
      background-color: var(--ca-surface-hover);
    }
    .tab.active {
      background-color: var(--ca-surface);
      box-shadow: 0px 6px 17px 0px rgba(0, 0, 0, 0.08);
    }
  `;
ar([
  l({ type: Array })
], ht.prototype, "tabs", 2);
ar([
  l({ type: String, attribute: "active-id" })
], ht.prototype, "activeId", 2);
ht = ar([
  g("ca-pill-tabs")
], ht);
var Hi = Object.defineProperty, Ki = Object.getOwnPropertyDescriptor, jr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ki(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Hi(t, r, i), i;
};
let Mt = class extends v {
  constructor() {
    super(...arguments), this.sections = [];
  }
  _handleItemClick(e) {
    this.dispatchEvent(
      new CustomEvent("ca-select", {
        detail: { label: e.label, action: e.action },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return n`
      ${this.sections.map(
      (e, t) => n`
          ${t > 0 ? n`<hr class="divider" />` : c}
          ${e.items.map(
        (r) => r.href ? n`<a class=${u({ item: !0, bold: !!r.bold })} href=${r.href}>${r.label}</a>` : n`<button class=${u({ item: !0, bold: !!r.bold })} @click=${() => this._handleItemClick(r)}>${r.label}</button>`
      )}
        `
    )}
    `;
  }
};
Mt.styles = b`
    :host {
      display: flex;
      flex-direction: column;
      background-color: var(--ca-surface);
      border-radius: 16px;
      box-shadow: var(--ca-shadow-menu);
      padding: 12px 0;
      min-width: 200px;
      overflow: hidden;
    }
    .item {
      display: block;
      width: 100%;
      padding: 12px 24px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 14px;
      line-height: 1;
      color: var(--ca-text-primary);
      text-align: left;
      text-decoration: none;
      box-sizing: border-box;
    }
    .item:hover {
      background-color: var(--ca-surface-hover);
    }
    .item:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: -2px;
    }
    .item.bold {
      font-weight: var(--ca-font-weight-semibold);
    }
    .divider {
      height: 1px;
      background-color: var(--ca-border);
      margin: 8px 0;
      border: none;
    }
  `;
jr([
  l({ type: Array })
], Mt.prototype, "sections", 2);
Mt = jr([
  g("ca-menu")
], Mt);
var Ui = Object.defineProperty, qi = Object.getOwnPropertyDescriptor, ge = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? qi(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Ui(t, r, i), i;
};
let G = class extends v {
  constructor() {
    super(...arguments), this.value = 0, this.max = 100, this.showLabel = !1, this.size = "md", this.labelSuffix = "", this.color = "", this.segments = [];
  }
  get _percent() {
    return this.max <= 0 ? 0 : Math.min(100, Math.max(0, this.value / this.max * 100));
  }
  render() {
    const e = this.segments.length > 0;
    return n`
      <div class="track" role="progressbar" aria-valuenow=${this.value} aria-valuemin="0" aria-valuemax=${this.max}>
        ${e ? this.segments.map((t) => {
      const r = this.max > 0 ? Math.min(100, Math.max(0, t.value / this.max * 100)) : 0;
      return n`<div class="fill" style="width:${r}%; background-color:${t.color}"></div>`;
    }) : n`<div class="fill" style="width:${this._percent}%${this.color ? `; background-color:${this.color}` : ""}"></div>`}
      </div>
      ${this.showLabel ? n`<span class="label">${this.value}/${this.max}${this.labelSuffix ? ` ${this.labelSuffix}` : ""}</span>` : c}
    `;
  }
};
G.styles = b`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
    .track {
      flex: 1;
      height: 8px;
      border-radius: var(--ca-radius-full);
      background-color: var(--ca-surface-active);
      overflow: hidden;
      display: flex;
    }
    :host([size='sm']) .track {
      height: 6px;
    }
    .fill {
      height: 100%;
      background-color: var(--ca-color-primary);
      transition: width var(--ca-transition-normal);
      min-width: 0;
    }
    .fill:first-child {
      border-radius: var(--ca-radius-full) 0 0 var(--ca-radius-full);
    }
    .fill:last-child {
      border-radius: 0 var(--ca-radius-full) var(--ca-radius-full) 0;
    }
    .fill:only-child {
      border-radius: var(--ca-radius-full);
    }
    .label {
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
      white-space: nowrap;
      flex-shrink: 0;
    }
    :host([size='sm']) .label {
      font-size: var(--ca-font-size-xs);
    }
  `;
ge([
  l({ type: Number })
], G.prototype, "value", 2);
ge([
  l({ type: Number })
], G.prototype, "max", 2);
ge([
  l({ type: Boolean, reflect: !0, attribute: "show-label" })
], G.prototype, "showLabel", 2);
ge([
  l({ type: String, reflect: !0 })
], G.prototype, "size", 2);
ge([
  l({ type: String })
], G.prototype, "labelSuffix", 2);
ge([
  l({ type: String })
], G.prototype, "color", 2);
ge([
  l({ type: Array, attribute: !1 })
], G.prototype, "segments", 2);
G = ge([
  g("ca-progress-bar")
], G);
var Yi = Object.defineProperty, Qi = Object.getOwnPropertyDescriptor, _ = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Qi(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Yi(t, r, i), i;
};
let y = class extends v {
  constructor() {
    super(...arguments), this.columns = [], this.rows = [], this.heading = "", this.headingBadge = "", this.supportingText = "", this.selectable = !1, this.draggable = !1, this.showSearch = !1, this.showFilters = !1, this.filterTabs = [], this.activeFilterTab = "", this.rowActions = [], this.selectedIds = [], this.rowHeight = "default", this.expandable = !1, this.expandedIds = [], this.resizable = !1, this.columnFilters = {}, this.clickableRows = !1, this.groups = [], this.inlineAdd = !1, this.virtualScroll = !1, this._openMenuRowId = null, this._searchQuery = "", this._dragRowId = null, this._dragOverRowId = null, this._dragOverPosition = null, this._openFilterColKey = null, this._columnWidths = /* @__PURE__ */ new Map(), this._fullRows = [], this._collapsedGroupIds = /* @__PURE__ */ new Set(), this._addRowGroupId = null, this._addRowValue = "", this._virtualScrollTop = 0, this._editingCell = null, this._editOriginalValue = null, this._searchTimeout = null, this._boundCloseMenu = this._closeMenu.bind(this), this._boundCloseFilter = this._closeFilter.bind(this), this._dragStartY = 0, this._dragRowIndex = -1, this._resizingColKey = null, this._resizeStartX = 0, this._resizeStartWidth = 0, this._filterSearchQuery = /* @__PURE__ */ new Map();
  }
  willUpdate(e) {
    e.has("rows") && (!Object.values(this.columnFilters).some((r) => r && r.length > 0) || this._fullRows.length === 0) && (this._fullRows = [...this.rows]);
  }
  updated(e) {
    e.has("_editingCell") && this._editingCell && this.updateComplete.then(() => {
      const t = this.shadowRoot?.querySelector(".cell-editable-editing ca-input");
      t && t.updateComplete?.then(() => {
        const o = t.shadowRoot?.querySelector("input");
        o?.focus(), o?.select();
      });
      const r = this.shadowRoot?.querySelector(".cell-editable-editing ca-select");
      r && r.updateComplete?.then(() => {
        r._isOpen = !0;
      });
    });
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._boundCloseMenu), document.addEventListener("click", this._boundCloseFilter);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._boundCloseMenu), document.removeEventListener("click", this._boundCloseFilter), this._searchTimeout && clearTimeout(this._searchTimeout);
  }
  /* ── Grid template columns computation ── */
  get _gridTemplateCols() {
    const e = [];
    this.expandable && e.push("32px"), this.draggable && e.push("40px"), this.selectable && e.push("48px");
    for (const t of this.columns) {
      const r = this._columnWidths.get(t.key);
      r ? e.push(`${r}px`) : e.push(t.width || "minmax(120px, 1fr)");
    }
    return this.rowActions.length > 0 && e.push("48px"), e.join(" ");
  }
  /* ── Select-all logic ── */
  get _allSelected() {
    return this.rows.length > 0 && this.rows.every((e) => this.selectedIds.includes(e.id));
  }
  get _someSelected() {
    return this.rows.some((e) => this.selectedIds.includes(e.id)) && !this._allSelected;
  }
  /* ── Pagination helpers ── */
  get _pageStart() {
    return this.pagination ? (this.pagination.page - 1) * this.pagination.pageSize + 1 : 0;
  }
  get _pageEnd() {
    return this.pagination ? Math.min(this.pagination.page * this.pagination.pageSize, this.pagination.totalItems) : 0;
  }
  get _totalPages() {
    return this.pagination ? Math.ceil(this.pagination.totalItems / this.pagination.pageSize) : 0;
  }
  /* ── Event emitters ── */
  _emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  /* ── Sort handler ── */
  _handleSort(e) {
    if (!e.sortable) return;
    let t = "asc";
    this.sort && this.sort.key === e.key && (t = this.sort.direction === "asc" ? "desc" : "asc"), this._emit("ca-sort", { key: e.key, direction: t });
  }
  /* ── Selection handlers ── */
  _handleSelectAll() {
    const e = this._allSelected ? [] : this.rows.map((t) => t.id);
    this._emit("ca-select", { selectedIds: e });
  }
  _handleSelectRow(e) {
    const t = this.selectedIds.indexOf(e.id), r = [...this.selectedIds];
    t >= 0 ? r.splice(t, 1) : r.push(e.id), this._emit("ca-select", { selectedIds: r });
  }
  /* ── Row actions ── */
  _toggleMenu(e, t) {
    e.stopPropagation(), this._openMenuRowId = this._openMenuRowId === t ? null : t;
  }
  _closeMenu() {
    this._openMenuRowId = null;
  }
  _handleRowAction(e, t) {
    this._openMenuRowId = null, this._emit("ca-row-action", { action: e.action, row: t });
  }
  /* ── Toolbar handlers ── */
  _handleFilterTab(e) {
    this._emit("ca-filter-tab", { id: e.id });
  }
  _handleSearchInput(e) {
    const t = e.target.value;
    this._searchQuery = t, this._searchTimeout && clearTimeout(this._searchTimeout), this._searchTimeout = setTimeout(() => {
      this._emit("ca-search", { query: t });
    }, 300);
  }
  _handleFilterClick() {
    this._emit("ca-filter-click", {});
  }
  /* ── Pagination handlers ── */
  _handlePrevPage() {
    !this.pagination || this.pagination.page <= 1 || this._emit("ca-page", { page: this.pagination.page - 1, pageSize: this.pagination.pageSize });
  }
  _handleNextPage() {
    !this.pagination || this.pagination.page >= this._totalPages || this._emit("ca-page", { page: this.pagination.page + 1, pageSize: this.pagination.pageSize });
  }
  /* ── Toggle handler ── */
  _handleToggle(e, t, r) {
    const o = r.detail?.checked ?? !1;
    this._emit("ca-cell-toggle", { key: e.key, row: t, checked: o });
  }
  /* ── Expand/collapse handler ── */
  _handleExpand(e) {
    const t = this.expandedIds.indexOf(e.id), r = [...this.expandedIds];
    t >= 0 ? r.splice(t, 1) : r.push(e.id), this._emit("ca-expand", { id: e.id, expanded: t < 0, expandedIds: r });
  }
  /* ── Drag-and-drop (pointer events) ── */
  _handleDragStart(e, t, r) {
    this._dragRowId = t, this._dragStartY = e.clientY, this._dragRowIndex = r, e.target.setPointerCapture(e.pointerId);
  }
  _handleDragMove(e) {
    if (!this._dragRowId) return;
    const r = this.shadowRoot?.elementFromPoint(e.clientX, e.clientY)?.closest("[data-row-id]");
    if (r) {
      const o = r.dataset.rowId;
      if (o !== this._dragRowId) {
        const i = r.getBoundingClientRect(), a = i.top + i.height / 2;
        this._dragOverRowId = o, this._dragOverPosition = e.clientY < a ? "above" : "below";
      } else
        this._dragOverRowId = null, this._dragOverPosition = null;
    }
  }
  _handleDragEnd(e) {
    if (!this._dragRowId || !this._dragOverRowId) {
      this._dragRowId = null, this._dragOverRowId = null, this._dragOverPosition = null;
      return;
    }
    if (this.groups.length > 0) {
      let t = "", r = -1, o = "", i = -1;
      for (const a of this.groups) {
        const s = a.rows.findIndex((p) => p.id === this._dragRowId);
        s >= 0 && (t = a.id, r = s);
        const d = a.rows.findIndex((p) => p.id === this._dragOverRowId);
        d >= 0 && (o = a.id, i = d, this._dragOverPosition === "below" && (i += 1));
      }
      t && o && r >= 0 && i >= 0 && (t === o && r < i && (i -= 1), t === o && r === i || this._emit("ca-reorder", {
        rowId: this._dragRowId,
        fromGroupId: t,
        toGroupId: o,
        fromIndex: r,
        toIndex: i
      }));
    } else {
      const t = this._dragRowIndex;
      let o = this.rows.findIndex((i) => i.id === this._dragOverRowId);
      if (this._dragOverPosition === "below" && (o += 1), t < o && (o -= 1), t !== o && o >= 0) {
        const i = [...this.rows], [a] = i.splice(t, 1);
        i.splice(o, 0, a), this._emit("ca-reorder", { rowId: this._dragRowId, fromIndex: t, toIndex: o, rows: i });
      }
    }
    this._dragRowId = null, this._dragOverRowId = null, this._dragOverPosition = null;
  }
  /* ── Column resize (pointer events) ── */
  _handleResizeStart(e, t) {
    e.stopPropagation(), e.preventDefault(), this._resizingColKey = t, this._resizeStartX = e.clientX;
    const r = this.shadowRoot?.querySelector(`[data-col="${t}"]`);
    this._resizeStartWidth = r ? r.getBoundingClientRect().width : 120, e.target.setPointerCapture(e.pointerId);
  }
  _handleResizeMove(e) {
    if (!this._resizingColKey) return;
    e.preventDefault();
    const t = e.clientX - this._resizeStartX, r = Math.max(60, this._resizeStartWidth + t), o = new Map(this._columnWidths);
    o.set(this._resizingColKey, r), this._columnWidths = o;
  }
  _handleResizeEnd(e) {
    if (!this._resizingColKey) return;
    const t = this._columnWidths.get(this._resizingColKey) || 120;
    this._emit("ca-column-resize", { key: this._resizingColKey, width: t }), this._resizingColKey = null;
  }
  /* ── Column filter handlers ── */
  _toggleFilter(e, t) {
    e.stopPropagation(), this._openFilterColKey = this._openFilterColKey === t ? null : t;
  }
  _closeFilter() {
    this._openFilterColKey = null;
  }
  _getUniqueValuesForColumn(e) {
    const t = this._fullRows.length > 0 ? this._fullRows : this.rows, r = /* @__PURE__ */ new Set();
    for (const o of t) {
      const i = o[e];
      i != null && i !== "" && r.add(String(i));
    }
    return Array.from(r).sort();
  }
  _handleFilterToggleValue(e, t) {
    const r = this.columnFilters[e] || [], o = r.indexOf(t);
    let i;
    o >= 0 ? i = r.filter((a) => a !== t) : i = [...r, t], this._emit("ca-column-filter", { key: e, values: i });
  }
  _handleFilterSelectAll(e) {
    const t = this._getUniqueValuesForColumn(e);
    this._emit("ca-column-filter", { key: e, values: t });
  }
  _handleFilterClear(e) {
    this._emit("ca-column-filter", { key: e, values: [] });
  }
  _handleFilterSearch(e, t) {
    const r = t.target.value;
    this._filterSearchQuery = new Map(this._filterSearchQuery), this._filterSearchQuery.set(e, r), this.requestUpdate();
  }
  /* ── Cell renderers ── */
  _renderCell(e, t) {
    const r = t[e.key];
    switch (e.type || "text") {
      case "bold-text":
        return n`<span class="cell-bold cell-text">${r ?? ""}</span>`;
      case "badge": {
        const i = e.badgeMap?.[String(r)] || "default";
        return n`<ca-badge variant=${i} size="sm">${r}</ca-badge>`;
      }
      case "toggle":
        return n`<ca-toggle size="sm" ?checked=${!!r} @ca-change=${(i) => this._handleToggle(e, t, i)}></ca-toggle>`;
      case "progress": {
        const i = e.progressMax && t[e.progressMax] || 100;
        return n`<ca-progress-bar value=${Number(r) || 0} max=${i} show-label labelSuffix=${e.progressSuffix || ""}></ca-progress-bar>`;
      }
      case "editable":
        return this._editingCell?.rowId === t.id && this._editingCell?.key === e.key ? n`
            <div class="cell-editable-editing" @click=${(a) => a.stopPropagation()}>
              <ca-input
                size="sm"
                borderless
                .value=${String(r ?? "")}
                placeholder=${e.editPlaceholder || ""}
                @keydown=${(a) => this._handleEditKeyDown(a, t.id, e.key)}
                @blur=${(a) => this._handleEditBlur(a, t.id, e.key)}
              ></ca-input>
            </div>
          ` : n`
          <span class="cell-editable cell-text" @click=${(a) => {
          a.stopPropagation(), this._startEditing(t.id, e.key, r);
        }}>
            ${r ?? ""}
          </span>
        `;
      case "editable-select": {
        if (this._editingCell?.rowId === t.id && this._editingCell?.key === e.key)
          return n`
            <div class="cell-editable-editing" @click=${(a) => a.stopPropagation()}>
              <ca-select
                size="sm"
                borderless
                .options=${e.options || []}
                .value=${String(r ?? "")}
                @ca-change=${(a) => this._handleSelectChange(a, t.id, e.key)}
                @blur=${(a) => this._handleEditBlur(a, t.id, e.key)}
              ></ca-select>
            </div>
          `;
        if (e.badgeMap) {
          const a = e.badgeMap[String(r)] || "default";
          return n`
            <span class="cell-editable" @click=${(s) => {
            s.stopPropagation(), this._startEditing(t.id, e.key, r);
          }}>
              <ca-badge variant=${a} size="sm">${r}</ca-badge>
            </span>
          `;
        }
        return n`
          <span class="cell-editable cell-text" @click=${(a) => {
          a.stopPropagation(), this._startEditing(t.id, e.key, r);
        }}>
            ${r ?? ""}
          </span>
        `;
      }
      case "custom":
        return e.render ? e.render(r, t) : n`${r ?? ""}`;
      default:
        return n`<span class="cell-text">${r ?? ""}</span>`;
    }
  }
  /* ── Inline editing handlers ── */
  _startEditing(e, t, r) {
    this._editOriginalValue = r, this._editingCell = { rowId: e, key: t };
  }
  _commitEdit(e, t, r) {
    const o = this._editOriginalValue;
    this._editingCell = null, this._editOriginalValue = null, r !== o && this.dispatchEvent(
      new CustomEvent("ca-cell-edit", {
        detail: { rowId: e, key: t, value: r, oldValue: o },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _cancelEdit() {
    this._editingCell = null, this._editOriginalValue = null;
  }
  _handleEditKeyDown(e, t, r) {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      const o = e.target, a = o.closest("ca-input")?.value ?? o.value;
      this._commitEdit(t, r, a);
    } else e.key === "Escape" && (e.preventDefault(), this._cancelEdit());
  }
  _handleEditBlur(e, t, r) {
    const o = e.relatedTarget;
    if (o && e.target?.closest(".cell-editable-editing")?.contains(o))
      return;
    const a = e.target.closest?.("ca-input");
    a && this._commitEdit(t, r, a.value);
  }
  _handleSelectChange(e, t, r) {
    this._commitEdit(t, r, e.detail.value);
  }
  /* ── Sort icon ── */
  _renderSortIcon(e) {
    if (!e.sortable) return c;
    const t = this.sort?.key === e.key, r = t && this.sort?.direction === "asc", o = t && this.sort?.direction === "desc";
    return n`
      <span class="sort-icon">
        <span class=${u({ "sort-asc": !0, active: r })}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 5L5 1L9 5"/>
          </svg>
        </span>
        <span class=${u({ "sort-desc": !0, active: o })}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 1L5 5L9 1"/>
          </svg>
        </span>
      </span>
    `;
  }
  /* ── Filter icon ── */
  _renderFilterIcon(e) {
    if (!e.filterable) return c;
    const t = (this.columnFilters[e.key]?.length ?? 0) > 0;
    return n`
      <span
        class=${u({ "filter-icon": !0, active: t })}
        @click=${(r) => {
      r.stopPropagation(), this._toggleFilter(r, e.key);
    }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
      </span>
    `;
  }
  /* ── Filter dropdown ── */
  _renderFilterDropdown(e) {
    if (!e.filterable || this._openFilterColKey !== e.key) return c;
    const t = this._getUniqueValuesForColumn(e.key), r = this.columnFilters[e.key] || [], o = (this._filterSearchQuery.get(e.key) || "").toLowerCase(), i = o ? t.filter((s) => s.toLowerCase().includes(o)) : t, a = t.length > 8;
    return n`
      <div class="filter-dropdown" @click=${(s) => s.stopPropagation()}>
        ${a ? n`
              <div class="filter-dropdown-search">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  type="text"
                  placeholder="Search..."
                  .value=${this._filterSearchQuery.get(e.key) || ""}
                  @input=${(s) => this._handleFilterSearch(e.key, s)}
                />
              </div>
            ` : c}
        <div class="filter-options">
          ${i.map(
      (s) => n`
              <div class="filter-option" @click=${() => this._handleFilterToggleValue(e.key, s)}>
                <ca-checkbox
                  size="xs"
                  ?checked=${r.includes(s)}
                  @ca-change=${(d) => {
        d.stopPropagation(), this._handleFilterToggleValue(e.key, s);
      }}
                ></ca-checkbox>
                <span>${s}</span>
              </div>
            `
    )}
        </div>
        <div class="filter-actions">
          <button class="filter-action-btn" @click=${() => this._handleFilterSelectAll(e.key)}>Select All</button>
          <button class="filter-action-btn" @click=${() => this._handleFilterClear(e.key)}>Clear</button>
        </div>
      </div>
    `;
  }
  /* ── Group methods ── */
  _handleGroupToggle(e) {
    const t = new Set(this._collapsedGroupIds);
    t.has(e.id) ? t.delete(e.id) : t.add(e.id), this._collapsedGroupIds = t, this.dispatchEvent(
      new CustomEvent("ca-group-toggle", {
        detail: { groupId: e.id, collapsed: t.has(e.id) },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleRowClick(e) {
    this.dispatchEvent(
      new CustomEvent("ca-row-click", {
        detail: { row: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleInlineAddKeyDown(e, t) {
    e.key === "Enter" && this._addRowValue.trim() ? (this.dispatchEvent(
      new CustomEvent("ca-row-create", {
        detail: { value: this._addRowValue.trim(), groupId: t },
        bubbles: !0,
        composed: !0
      })
    ), this._addRowValue = "") : e.key === "Escape" && (this._addRowValue = "", this._addRowGroupId = null);
  }
  _renderGroupHeader(e) {
    const t = this._collapsedGroupIds.has(e.id);
    return n`
      <div class="group-header" @click=${() => this._handleGroupToggle(e)}>
        <span class=${u({ "group-toggle": !0, collapsed: t })}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        ${e.color ? n`<span class="group-color-dot" style="background-color: ${e.color}"></span>` : c}
        <span class="group-label">${e.label}</span>
        <span class="group-count">${e.rows.length}</span>
        ${Array.isArray(e.progress) && e.progressMax ? n`<ca-progress-bar class="group-progress" .segments=${e.progress} .max=${e.progressMax} .value=${e.progress.reduce((r, o) => r + o.value, 0)} size="sm"></ca-progress-bar>` : c}
      </div>
    `;
  }
  _renderInlineAdd(e) {
    return this.inlineAdd ? n`
      <div class="add-row">
        <button class="add-row-btn" @click=${() => {
      this._addRowGroupId = e ?? "__ungrouped__", this.updateComplete.then(() => {
        this.shadowRoot?.querySelector(".add-row-input")?.focus();
      });
    }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          Add task
        </button>
        ${this._addRowGroupId === (e ?? "__ungrouped__") ? n`
              <input
                class="add-row-input"
                type="text"
                placeholder="Task name..."
                .value=${this._addRowValue}
                @input=${(t) => {
      this._addRowValue = t.target.value;
    }}
                @keydown=${(t) => this._handleInlineAddKeyDown(t, e)}
                @blur=${() => {
      this._addRowGroupId = null;
    }}
              />
            ` : c}
      </div>
    ` : c;
  }
  _renderGroupedGrid(e) {
    return n`
      ${this.groups.map((t) => {
      const r = this._collapsedGroupIds.has(t.id);
      return n`
          ${this._renderGroupHeader(t)}
          ${r ? c : n`
                <div class="grid" style="grid-template-columns:${this._gridTemplateCols}"
                  @pointermove=${this._handleDragMove}
                  @pointerup=${this._handleDragEnd}
                >
                  <!-- Header row -->
                  <div class="grid-header">
                    ${this.expandable ? n`<div class="cell"></div>` : c}
                    ${this.draggable ? n`<div class="cell"></div>` : c}
                    ${this.selectable ? n`<div class="cell cell-checkbox">
                          <ca-checkbox size="xs" @ca-change=${this._handleSelectAll}></ca-checkbox>
                        </div>` : c}
                    ${this.columns.map(
        (o) => n`
                        <div class=${u({ cell: !0, sortable: !!o.sortable })} data-col=${o.key} @click=${() => this._handleSort(o)}>
                          ${this._renderFilterIcon(o)}
                          <span class="header-text">${o.heading}</span>
                          ${this._renderSortIcon(o)}
                          ${this._renderFilterDropdown(o)}
                        </div>
                      `
      )}
                    ${e ? n`<div class="cell"></div>` : c}
                  </div>
                  <!-- Rows -->
                  ${t.rows.length === 0 ? n`<div class="empty" style="grid-column:1/-1">No tasks in this group</div>` : t.rows.map((o, i) => n`
                        ${this._renderRow(o, i, e)}
                        ${this.expandable && (o.children?.length ?? 0) > 0 && this.expandedIds.includes(o.id) ? o.children.map((a, s) => this._renderChildRow(a, s, e)) : c}
                      `)}
                </div>
                ${this._renderInlineAdd(t.id)}
              `}
        `;
    })}
    `;
  }
  /* ── Main render ── */
  render() {
    const e = this.heading || this.supportingText, t = this.filterTabs.length > 0 || this.showSearch || this.showFilters, r = this.rowActions.length > 0, o = this.groups.length > 0;
    return n`
      <div class="wrapper">
        ${e ? this._renderHeader() : c}
        ${t ? this._renderToolbar() : c}
        ${o ? this._renderGroupedGrid(r) : n`
              ${this._renderGrid(r)}
              ${this.inlineAdd ? this._renderInlineAdd() : c}
            `}
        ${this.pagination ? this._renderPagination() : c}
      </div>
    `;
  }
  _renderHeader() {
    return n`
      <div class="header">
        <div class="header-left">
          <div>
            <div style="display:flex;align-items:center;gap:8px">
              <span class="heading">${this.heading}</span>
              ${this.headingBadge ? n`<ca-badge variant="success" size="sm">${this.headingBadge}</ca-badge>` : c}
            </div>
            ${this.supportingText ? n`<div class="supporting-text">${this.supportingText}</div>` : c}
          </div>
        </div>
        <div class="header-actions">
          <slot name="header-actions"></slot>
        </div>
      </div>
    `;
  }
  _renderToolbar() {
    return n`
      <div class="toolbar">
        <div class="toolbar-left">
          ${this.filterTabs.map(
      (e) => n`
              <button
                class=${u({ "filter-tab": !0, active: e.id === this.activeFilterTab })}
                @click=${() => this._handleFilterTab(e)}
              >
                ${e.label}${e.count != null ? n`<span class="filter-tab-count">${e.count}</span>` : c}
              </button>
            `
    )}
        </div>
        <div class="toolbar-right">
          ${this.showSearch ? n`
                <div class="search-box">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input class="search-input" type="text" placeholder="Search..." .value=${this._searchQuery} @input=${this._handleSearchInput} />
                </div>
              ` : c}
          ${this.showFilters ? n`
                <button class="filters-btn" @click=${this._handleFilterClick}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                  Filters
                </button>
              ` : c}
        </div>
      </div>
    `;
  }
  _renderGrid(e) {
    return n`
      <div class="grid" style="grid-template-columns:${this._gridTemplateCols}"
        @pointermove=${this._handleDragMove}
        @pointerup=${this._handleDragEnd}
      >
        <!-- Header row -->
        <div class="grid-header">
          ${this.expandable ? n`<div class="cell"></div>` : c}
          ${this.draggable ? n`<div class="cell"></div>` : c}
          ${this.selectable ? n`
                <div class="cell cell-checkbox">
                  <ca-checkbox
                    size="xs"
                    ?checked=${this._allSelected}
                    @ca-change=${this._handleSelectAll}
                  ></ca-checkbox>
                </div>
              ` : c}
          ${this.columns.map(
      (t) => n`
              <div
                class=${u({ cell: !0, sortable: !!t.sortable })}
                data-col=${t.key}
                @click=${() => this._handleSort(t)}
              >
                ${this._renderFilterIcon(t)}
                <span class="header-text">${t.heading}</span>
                ${this._renderSortIcon(t)}
                ${this._renderFilterDropdown(t)}
                ${this.resizable ? n`<span
                      class=${u({ "resize-handle": !0, resizing: this._resizingColKey === t.key })}
                      @pointerdown=${(r) => this._handleResizeStart(r, t.key)}
                      @pointermove=${(r) => this._handleResizeMove(r)}
                      @pointerup=${(r) => this._handleResizeEnd(r)}
                      @click=${(r) => r.stopPropagation()}
                    ></span>` : c}
              </div>
            `
    )}
          ${e ? n`<div class="cell"></div>` : c}
        </div>

        <!-- Data rows -->
        ${this.rows.length === 0 ? n`<div class="empty" style="grid-column:1/-1">No data</div>` : this.rows.map((t, r) => n`
              ${this._renderRow(t, r, e)}
              ${this.expandable && (t.children?.length ?? 0) > 0 && this.expandedIds.includes(t.id) ? t.children.map((o, i) => this._renderChildRow(o, i, e)) : c}
            `)}
      </div>
    `;
  }
  _renderRow(e, t, r) {
    const o = this.selectedIds.includes(e.id), i = this._dragRowId === e.id, a = this._dragOverRowId === e.id && this._dragOverPosition === "above", s = this._dragOverRowId === e.id && this._dragOverPosition === "below", d = this.expandable && (e.children?.length ?? 0) > 0, p = this.expandedIds.includes(e.id);
    return n`
      <div
        class=${u({
      "grid-row": !0,
      selected: o,
      dragging: i,
      "drag-over-above": a,
      "drag-over-below": s,
      clickable: !this.selectable && !this.draggable
    })}
        data-row-id=${e.id}
        @click=${() => this._handleRowClick(e)}
      >
        ${this.expandable ? n`
              <div class="cell cell-expand">
                ${d ? n`
                      <button class="expand-btn" @click=${() => this._handleExpand(e)} aria-label=${p ? "Collapse" : "Expand"}>
                        <span class=${u({ "expand-icon": !0, expanded: p })}>
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </span>
                      </button>
                    ` : c}
              </div>
            ` : c}
        ${this.draggable ? n`
              <div class="cell cell-checkbox">
                <span
                  class="drag-handle"
                  @pointerdown=${(x) => this._handleDragStart(x, e.id, t)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="5.5" cy="3.5" r="1.5"/><circle cx="10.5" cy="3.5" r="1.5"/>
                    <circle cx="5.5" cy="8" r="1.5"/><circle cx="10.5" cy="8" r="1.5"/>
                    <circle cx="5.5" cy="12.5" r="1.5"/><circle cx="10.5" cy="12.5" r="1.5"/>
                  </svg>
                </span>
              </div>
            ` : c}
        ${this.selectable ? n`
              <div class="cell cell-checkbox">
                <ca-checkbox size="xs" ?checked=${o} @ca-change=${() => this._handleSelectRow(e)}></ca-checkbox>
              </div>
            ` : c}
        ${this.columns.map(
      (x) => n`
            <div class="cell">${this._renderCell(x, e)}</div>
          `
    )}
        ${r ? n`
              <div class="cell cell-actions">
                <button class="actions-btn" @click=${(x) => this._toggleMenu(x, e.id)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="3" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="13" r="1.5"/>
                  </svg>
                </button>
                ${this._openMenuRowId === e.id ? n`
                      <div class="actions-dropdown" @click=${(x) => x.stopPropagation()}>
                        ${this.rowActions.map(
      (x) => n`
                            <button @click=${() => this._handleRowAction(x, e)}>${x.label}</button>
                          `
    )}
                      </div>
                    ` : c}
              </div>
            ` : c}
      </div>
    `;
  }
  _renderChildRow(e, t, r) {
    return n`
      <div class="grid-row child-row" data-row-id=${e.id}>
        ${this.expandable ? n`<div class="cell cell-expand"></div>` : c}
        ${this.draggable ? n`<div class="cell"></div>` : c}
        ${this.selectable ? n`<div class="cell"></div>` : c}
        ${this.columns.map(
      (o, i) => n`
            <div class="cell ${i === 0 ? "child-indent" : ""}">${this._renderCell(o, e)}</div>
          `
    )}
        ${r ? n`<div class="cell"></div>` : c}
      </div>
    `;
  }
  _renderPagination() {
    return this.pagination ? n`
      <div class="pagination">
        <span>${this._pageStart} - ${this._pageEnd} of ${this.pagination.totalItems} items</span>
        <div class="pagination-btns">
          <button class="page-btn" ?disabled=${this.pagination.page <= 1} @click=${this._handlePrevPage}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Previous
          </button>
          <button class="page-btn" ?disabled=${this.pagination.page >= this._totalPages} @click=${this._handleNextPage}>
            Next
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    ` : c;
  }
};
y.styles = b`
    /* ── Host ── */
    :host {
      display: block;
      font-family: var(--ca-font-family);
      color: var(--ca-text-primary);
    }

    /* ── Card wrapper ── */
    .wrapper {
      background-color: var(--ca-surface);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-lg);
      overflow: hidden;
    }

    /* ── Card header ── */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      gap: 12px;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .heading {
      font-size: var(--ca-font-size-lg);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      line-height: 1.2;
    }
    .supporting-text {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
      margin-top: 2px;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    /* ── Toolbar ── */
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px 12px;
      gap: 12px;
    }
    .toolbar-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .filter-tab {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: var(--ca-radius-full);
      border: 1px solid var(--ca-border);
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-secondary);
      transition: background-color var(--ca-transition-fast), color var(--ca-transition-fast), border-color var(--ca-transition-fast);
      white-space: nowrap;
    }
    .filter-tab:hover {
      background-color: var(--ca-surface-hover);
    }
    .filter-tab.active {
      background-color: var(--ca-color-secondary);
      color: var(--ca-color-white);
      border-color: var(--ca-color-secondary);
    }
    .filter-tab-count {
      font-size: var(--ca-font-size-xs);
      opacity: 0.7;
    }
    .search-box {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      background: var(--ca-surface);
      min-width: 180px;
    }
    .search-box svg {
      flex-shrink: 0;
      color: var(--ca-text-muted);
    }
    .search-input {
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      width: 100%;
    }
    .search-input::placeholder {
      color: var(--ca-text-muted);
    }
    .filters-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
    }
    .filters-btn:hover {
      background-color: var(--ca-surface-hover);
    }

    /* ── Grid ── */
    .grid {
      display: grid;
      width: 100%;
      overflow-x: auto;
    }

    /* ── Header row ── */
    .grid-header {
      display: contents;
    }
    .grid-header .cell {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.03em;
      background-color: var(--ca-surface-active);
      border-bottom: 1px solid var(--ca-border);
      border-top: 1px solid var(--ca-border);
      user-select: none;
      white-space: nowrap;
      gap: 4px;
      position: relative;
    }
    .grid-header .cell.sortable {
      cursor: pointer;
    }
    .grid-header .cell.sortable:hover {
      color: var(--ca-text-primary);
    }
    .sort-icon {
      display: inline-flex;
      flex-direction: column;
      flex-shrink: 0;
      gap: 1px;
      color: var(--ca-text-muted);
      transition: color var(--ca-transition-fast);
    }
    .sort-icon .sort-asc,
    .sort-icon .sort-desc {
      display: flex;
      opacity: 0.4;
      transition: opacity var(--ca-transition-fast), color var(--ca-transition-fast);
    }
    .sort-icon .sort-asc.active,
    .sort-icon .sort-desc.active {
      opacity: 1;
      color: var(--ca-text-primary);
    }
    .grid-header .cell.sortable:hover .sort-icon .sort-asc,
    .grid-header .cell.sortable:hover .sort-icon .sort-desc {
      opacity: 0.7;
    }
    .grid-header .cell.sortable:hover .sort-icon .sort-asc.active,
    .grid-header .cell.sortable:hover .sort-icon .sort-desc.active {
      opacity: 1;
    }

    /* ── Resize handle ── */
    .resize-handle {
      position: absolute;
      top: 0;
      right: 0;
      width: 6px;
      height: 100%;
      cursor: col-resize;
      background: transparent;
      z-index: 2;
      transition: background-color var(--ca-transition-fast);
    }
    .resize-handle:hover,
    .resize-handle.resizing {
      background-color: var(--ca-color-primary);
    }

    /* ── Column filter icon ── */
    .filter-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      opacity: 0.4;
      cursor: pointer;
      transition: opacity var(--ca-transition-fast), color var(--ca-transition-fast);
      padding: 2px;
      border-radius: var(--ca-radius-sm);
    }
    .filter-icon:hover {
      opacity: 0.8;
    }
    .filter-icon.active {
      opacity: 1;
      color: var(--ca-color-primary);
    }
    .header-text {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* ── Column filter dropdown ── */
    .filter-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 30;
      background-color: var(--ca-surface-elevated);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      box-shadow: var(--ca-shadow-menu);
      padding: 4px 0;
      min-width: 180px;
      max-height: 300px;
      display: flex;
      flex-direction: column;
      text-transform: none;
      letter-spacing: normal;
      font-weight: normal;
    }
    .filter-dropdown-search {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-bottom: 1px solid var(--ca-border);
    }
    .filter-dropdown-search input {
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      width: 100%;
    }
    .filter-dropdown-search input::placeholder {
      color: var(--ca-text-muted);
    }
    .filter-options {
      overflow-y: auto;
      flex: 1;
      padding: 4px 0;
    }
    .filter-option {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      cursor: pointer;
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      transition: background-color var(--ca-transition-fast);
    }
    .filter-option:hover {
      background-color: var(--ca-surface-hover);
    }
    .filter-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 8px;
      border-top: 1px solid var(--ca-border);
    }
    .filter-action-btn {
      flex: 1;
      padding: 4px 8px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-secondary);
      text-align: center;
      transition: background-color var(--ca-transition-fast), color var(--ca-transition-fast);
    }
    .filter-action-btn:hover {
      background-color: var(--ca-surface-hover);
      color: var(--ca-text-primary);
    }

    /* ── Data rows ── */
    .grid-row {
      display: contents;
    }
    .grid-row .cell {
      display: flex;
      align-items: center;
      padding: 12px;
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
      border-bottom: 1px solid var(--ca-border);
      background-color: var(--ca-surface);
      transition: background-color var(--ca-transition-fast);
      min-width: 0;
    }
    .grid-row .cell > ca-input,
    .grid-row .cell > ca-select,
    .grid-row .cell > ca-multi-select {
      width: 100%;
      min-width: 0;
    }
    .grid-row:hover .cell {
      background-color: var(--ca-surface-hover);
    }
    .grid-row.selected .cell {
      background-color: var(--ca-surface-hover);
    }
    .grid-row.dragging .cell {
      opacity: 0.4;
    }
    .grid-row.drag-over-above .cell {
      box-shadow: inset 0 2px 0 0 var(--ca-color-primary);
    }
    .grid-row.drag-over-below .cell {
      box-shadow: inset 0 -2px 0 0 var(--ca-color-primary);
    }

    /* ── Expand toggle ── */
    .expand-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background: none;
      cursor: pointer;
      color: var(--ca-text-muted);
      padding: 0;
      transition: color var(--ca-transition-fast), background-color var(--ca-transition-fast);
    }
    .expand-btn:hover {
      color: var(--ca-text-primary);
      background-color: var(--ca-surface-active);
    }
    .expand-icon {
      display: inline-flex;
      transition: transform 0.2s ease;
    }
    .expand-icon.expanded {
      transform: rotate(90deg);
    }
    .cell-expand {
      justify-content: center;
    }

    /* ── Child rows container ── */
    .child-rows {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease;
      grid-column: 1 / -1;
    }
    .child-rows.open {
      grid-template-rows: 1fr;
    }
    .child-rows-inner {
      overflow: hidden;
      display: contents;
    }
    .child-rows:not(.open) .child-rows-inner {
      display: grid;
      grid-template-rows: 0fr;
      overflow: hidden;
    }

    /* Child row styling */
    .grid-row.child-row .cell {
      background-color: var(--ca-surface-active);
    }
    .grid-row.child-row:hover .cell {
      background-color: var(--ca-surface-hover);
    }
    .child-indent {
      padding-left: 28px;
    }

    /* Row height variants */
    :host([row-height='compact']) .grid-row .cell { padding-top: 6px; padding-bottom: 6px; }
    :host([row-height='relaxed']) .grid-row .cell { padding-top: 18px; padding-bottom: 18px; }

    /* ── Cell content types ── */
    .cell-bold {
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }
    .cell-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* ── Drag handle ── */
    .drag-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      color: var(--ca-text-muted);
      padding: 0;
      flex-shrink: 0;
    }
    .drag-handle:active {
      cursor: grabbing;
    }

    /* ── Checkbox cell ── */
    .cell-checkbox {
      justify-content: center;
    }

    /* ── Actions cell ── */
    .cell-actions {
      justify-content: center;
      position: relative;
    }
    .actions-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background: none;
      cursor: pointer;
      color: var(--ca-text-muted);
      padding: 0;
    }
    .actions-btn:hover {
      background-color: var(--ca-surface-active);
      color: var(--ca-text-primary);
    }

    /* ── Row actions dropdown ── */
    .actions-dropdown {
      position: absolute;
      top: 100%;
      right: 8px;
      z-index: 20;
      background-color: var(--ca-surface-elevated);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      box-shadow: var(--ca-shadow-menu);
      padding: 4px 0;
      min-width: 140px;
    }
    .actions-dropdown button {
      display: block;
      width: 100%;
      padding: 8px 14px;
      border: none;
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      text-align: left;
    }
    .actions-dropdown button:hover {
      background-color: var(--ca-surface-hover);
    }

    /* ── Pagination ── */
    .pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
    }
    .pagination-btns {
      display: flex;
      gap: 4px;
    }
    .page-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
    }
    .page-btn:hover:not(:disabled) {
      background-color: var(--ca-surface-hover);
    }
    .page-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* ── Empty state ── */
    .empty {
      padding: 40px 20px;
      text-align: center;
      color: var(--ca-text-muted);
      font-size: var(--ca-font-size-sm);
      border-bottom: 1px solid var(--ca-border);
    }

    /* ── Group header ── */
    .group-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      background-color: var(--ca-surface-active);
      border-bottom: 1px solid var(--ca-border);
      cursor: pointer;
      user-select: none;
      transition: background-color var(--ca-transition-fast);
    }
    .group-header:hover {
      background-color: var(--ca-surface-hover);
    }
    .group-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      color: var(--ca-text-secondary);
      transition: transform var(--ca-transition-fast);
      flex-shrink: 0;
    }
    .group-toggle.collapsed {
      transform: rotate(-90deg);
    }
    .group-color-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .group-label {
      font-weight: var(--ca-font-weight-semibold);
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
    }
    .group-count {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
    }
    .group-progress {
      flex: 1;
      max-width: 200px;
      margin-left: auto;
    }

    /* ── Inline add row ── */
    .add-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 20px;
      border-bottom: 1px solid var(--ca-border);
    }
    .add-row-input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
    }
    .add-row-input::placeholder { color: var(--ca-text-muted); }
    .add-row-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border: 1px dashed var(--ca-border-strong);
      border-radius: var(--ca-radius-sm);
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      transition: color var(--ca-transition-fast), border-color var(--ca-transition-fast);
    }
    .add-row-btn:hover {
      color: var(--ca-text-primary);
      border-color: var(--ca-text-primary);
    }

    /* ── Virtual scroll container ── */
    .virtual-scroll-container {
      overflow-y: auto;
      max-height: var(--ca-table-max-height, 600px);
    }

    /* ── Clickable rows ── */
    .grid-row.clickable {
      cursor: pointer;
    }
    .grid-row.clickable:hover {
      background-color: var(--ca-surface-hover);
    }

    /* ── Editable cells ── */
    .cell-editable {
      cursor: pointer;
      border-radius: var(--ca-radius-sm);
      padding: 2px 4px;
      margin: -2px -4px;
    }
    .cell-editable:hover {
      background-color: var(--ca-surface-hover);
    }
    .cell-editable-editing {
      padding: 0;
      margin: -4px -4px;
    }
    .cell-editable-editing ca-input,
    .cell-editable-editing ca-select {
      --ca-input-height: 28px;
      font-size: var(--ca-font-size-sm);
    }
  `;
_([
  l({ type: Array })
], y.prototype, "columns", 2);
_([
  l({ type: Array })
], y.prototype, "rows", 2);
_([
  l({ type: String })
], y.prototype, "heading", 2);
_([
  l({ type: String, attribute: "heading-badge" })
], y.prototype, "headingBadge", 2);
_([
  l({ type: String, attribute: "supporting-text" })
], y.prototype, "supportingText", 2);
_([
  l({ type: Boolean, reflect: !0 })
], y.prototype, "selectable", 2);
_([
  l({ type: Boolean, reflect: !0 })
], y.prototype, "draggable", 2);
_([
  l({ type: Boolean, reflect: !0, attribute: "show-search" })
], y.prototype, "showSearch", 2);
_([
  l({ type: Boolean, reflect: !0, attribute: "show-filters" })
], y.prototype, "showFilters", 2);
_([
  l({ type: Array, attribute: !1 })
], y.prototype, "filterTabs", 2);
_([
  l({ type: String, attribute: "active-filter-tab" })
], y.prototype, "activeFilterTab", 2);
_([
  l({ type: Array, attribute: !1 })
], y.prototype, "rowActions", 2);
_([
  l({ type: Object, attribute: !1 })
], y.prototype, "pagination", 2);
_([
  l({ type: Object, attribute: !1 })
], y.prototype, "sort", 2);
_([
  l({ type: Array, attribute: !1 })
], y.prototype, "selectedIds", 2);
_([
  l({ type: String, reflect: !0, attribute: "row-height" })
], y.prototype, "rowHeight", 2);
_([
  l({ type: Boolean, reflect: !0 })
], y.prototype, "expandable", 2);
_([
  l({ type: Array, attribute: !1 })
], y.prototype, "expandedIds", 2);
_([
  l({ type: Boolean, reflect: !0 })
], y.prototype, "resizable", 2);
_([
  l({ type: Object, attribute: !1 })
], y.prototype, "columnFilters", 2);
_([
  l({ type: Boolean, reflect: !0, attribute: "clickable-rows" })
], y.prototype, "clickableRows", 2);
_([
  l({ type: Array, attribute: !1 })
], y.prototype, "groups", 2);
_([
  l({ type: Boolean, reflect: !0, attribute: "inline-add" })
], y.prototype, "inlineAdd", 2);
_([
  l({ type: Boolean, reflect: !0, attribute: "virtual-scroll" })
], y.prototype, "virtualScroll", 2);
_([
  h()
], y.prototype, "_openMenuRowId", 2);
_([
  h()
], y.prototype, "_searchQuery", 2);
_([
  h()
], y.prototype, "_dragRowId", 2);
_([
  h()
], y.prototype, "_dragOverRowId", 2);
_([
  h()
], y.prototype, "_dragOverPosition", 2);
_([
  h()
], y.prototype, "_openFilterColKey", 2);
_([
  h()
], y.prototype, "_columnWidths", 2);
_([
  h()
], y.prototype, "_fullRows", 2);
_([
  h()
], y.prototype, "_collapsedGroupIds", 2);
_([
  h()
], y.prototype, "_addRowGroupId", 2);
_([
  h()
], y.prototype, "_addRowValue", 2);
_([
  h()
], y.prototype, "_virtualScrollTop", 2);
_([
  h()
], y.prototype, "_editingCell", 2);
y = _([
  g("ca-table")
], y);
var Gi = Object.defineProperty, Wi = Object.getOwnPropertyDescriptor, Je = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Wi(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Gi(t, r, i), i;
};
const yr = [
  "#3b82f6",
  "#22c55e",
  "#f97316",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#eab308",
  "#6366f1",
  "#6b7280"
];
let he = class extends v {
  constructor() {
    super(...arguments), this.type = "bar", this.data = { labels: [], datasets: [] }, this.showLegend = !0, this._tooltip = null;
  }
  _getColor(e) {
    return yr[e % yr.length];
  }
  _handleSegmentClick(e, t, r, o) {
    this.dispatchEvent(
      new CustomEvent("ca-segment-click", {
        detail: { datasetIndex: e, dataIndex: t, value: r, label: o },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return n`
      <div class="chart-container"
        @mouseleave=${() => {
      this._tooltip = null;
    }}
      >
        ${this.type === "bar" ? this._renderBarChart() : this.type === "line" ? this._renderLineChart() : this.type === "pie" || this.type === "doughnut" ? this._renderPieChart() : c}
        ${this._tooltip ? n`<div class="tooltip" style="left:${this._tooltip.x}px; top:${this._tooltip.y}px">${this._tooltip.text}</div>` : c}
      </div>
      ${this.showLegend && this.data.datasets.length > 0 ? n`<div class="legend">
            ${this.data.datasets.map(
      (e, t) => n`
                <span class="legend-item">
                  <span class="legend-dot" style="background-color:${e.color || this._getColor(t)}"></span>
                  ${e.label}
                </span>
              `
    )}
          </div>` : c}
    `;
  }
  _renderBarChart() {
    const { labels: e, datasets: t } = this.data;
    if (!e.length || !t.length) return c;
    const r = 600, o = 300, i = { top: 20, right: 20, bottom: 40, left: 50 }, a = r - i.left - i.right, s = o - i.top - i.bottom, d = t.flatMap((w) => w.data), p = Math.max(...d, 1), x = a / e.length, m = x / (t.length + 1), f = 5, $ = p / f;
    return n`
      <svg viewBox="0 0 ${r} ${o}">
        <g transform="translate(${i.left}, ${i.top})">
          <!-- Grid -->
          ${Array.from({ length: f + 1 }, (w, k) => {
      const O = s - k * s / f, I = Math.round(k * $);
      return n`
              <line class="grid-line" x1="0" y1=${O} x2=${a} y2=${O} />
              <text class="axis-label" x="-8" y=${O + 4} text-anchor="end">${I}</text>
            `;
    })}
          <!-- Bars -->
          ${t.map(
      (w, k) => w.data.map((O, I) => {
        const K = O / p * s, ke = I * x + k * m + m * 0.5, tt = s - K, Ht = w.color || this._getColor(k);
        return n`
                <rect
                  class="bar-rect"
                  x=${ke} y=${tt} width=${m * 0.8} height=${K}
                  fill=${Ht} rx="2"
                  @click=${() => this._handleSegmentClick(k, I, O, e[I])}
                  @mouseenter=${(zt) => {
          this._tooltip = { text: `${w.label}: ${O}`, x: zt.offsetX + 10, y: zt.offsetY - 20 };
        }}
                  @mouseleave=${() => {
          this._tooltip = null;
        }}
                />
              `;
      })
    )}
          <!-- X axis labels -->
          ${e.map((w, k) => n`
            <text class="axis-label" x=${k * x + x / 2} y=${s + 20} text-anchor="middle">${w}</text>
          `)}
        </g>
      </svg>
    `;
  }
  _renderLineChart() {
    const { labels: e, datasets: t } = this.data;
    if (!e.length || !t.length) return c;
    const r = 600, o = 300, i = { top: 20, right: 20, bottom: 40, left: 50 }, a = r - i.left - i.right, s = o - i.top - i.bottom, d = t.flatMap(($) => $.data), p = Math.max(...d, 1), x = a / Math.max(e.length - 1, 1), m = 5, f = p / m;
    return n`
      <svg viewBox="0 0 ${r} ${o}">
        <g transform="translate(${i.left}, ${i.top})">
          <!-- Grid -->
          ${Array.from({ length: m + 1 }, ($, w) => {
      const k = s - w * s / m, O = Math.round(w * f);
      return n`
              <line class="grid-line" x1="0" y1=${k} x2=${a} y2=${k} />
              <text class="axis-label" x="-8" y=${k + 4} text-anchor="end">${O}</text>
            `;
    })}
          <!-- Lines -->
          ${t.map(($, w) => {
      const k = $.color || this._getColor(w), O = $.data.map((I, K) => `${K * x},${s - I / p * s}`).join(" ");
      return n`
              <polyline fill="none" stroke=${k} stroke-width="2" points=${O} />
              ${$.data.map((I, K) => n`
                <circle
                  class="line-point"
                  cx=${K * x} cy=${s - I / p * s} r="4"
                  fill=${k} stroke="#fff" stroke-width="2"
                  @click=${() => this._handleSegmentClick(w, K, I, e[K])}
                  @mouseenter=${(ke) => {
        this._tooltip = { text: `${$.label}: ${I}`, x: ke.offsetX + 10, y: ke.offsetY - 20 };
      }}
                  @mouseleave=${() => {
        this._tooltip = null;
      }}
                />
              `)}
            `;
    })}
          <!-- X labels -->
          ${e.map(($, w) => n`
            <text class="axis-label" x=${w * x} y=${s + 20} text-anchor="middle">${$}</text>
          `)}
        </g>
      </svg>
    `;
  }
  _renderPieChart() {
    const { datasets: e } = this.data;
    if (!e.length || !e[0].data.length) return c;
    const t = e[0].data, r = this.data.labels, o = t.reduce((m, f) => m + f, 0);
    if (o === 0) return c;
    const i = 150, a = 150, s = 120, d = this.type === "doughnut" ? s * 0.6 : 0;
    let p = -Math.PI / 2;
    const x = t.map((m, f) => {
      const $ = m / o * 2 * Math.PI, w = p + $, k = $ > Math.PI ? 1 : 0, O = i + s * Math.cos(p), I = a + s * Math.sin(p), K = i + s * Math.cos(w), ke = a + s * Math.sin(w);
      let tt = "";
      if (d > 0) {
        const zt = i + d * Math.cos(p), Br = a + d * Math.sin(p), Lr = i + d * Math.cos(w), Rr = a + d * Math.sin(w);
        tt = `M${O},${I} A${s},${s} 0 ${k} 1 ${K},${ke} L${Lr},${Rr} A${d},${d} 0 ${k} 0 ${zt},${Br} Z`;
      } else
        tt = `M${i},${a} L${O},${I} A${s},${s} 0 ${k} 1 ${K},${ke} Z`;
      const Ht = e[0].color ? void 0 : this._getColor(f);
      return p = w, { d: tt, color: Ht || this._getColor(f), val: m, label: r[f] || `Segment ${f + 1}`, index: f };
    });
    return n`
      <svg viewBox="0 0 300 300">
        ${x.map(
      (m) => n`
            <path
              class="pie-slice"
              d=${m.d}
              fill=${m.color}
              @click=${() => this._handleSegmentClick(0, m.index, m.val, m.label)}
              @mouseenter=${(f) => {
        const $ = (m.val / o * 100).toFixed(1);
        this._tooltip = { text: `${m.label}: ${m.val} (${$}%)`, x: f.offsetX + 10, y: f.offsetY - 20 };
      }}
              @mouseleave=${() => {
        this._tooltip = null;
      }}
            />
          `
    )}
      </svg>
    `;
  }
};
he.styles = b`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }
    .chart-container {
      position: relative;
    }
    svg {
      width: 100%;
      display: block;
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      padding: 8px 0;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
    }
    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .bar-rect, .pie-slice, .line-point {
      cursor: pointer;
      transition: opacity var(--ca-transition-fast);
    }
    .bar-rect:hover, .pie-slice:hover, .line-point:hover {
      opacity: 0.8;
    }
    .axis-label {
      font-size: 11px;
      fill: var(--ca-text-muted, #717171);
      font-family: var(--ca-font-family);
    }
    .grid-line {
      stroke: var(--ca-border, #ddd);
      stroke-dasharray: 3 3;
    }
    .tooltip {
      position: absolute;
      background: var(--ca-color-secondary, #222);
      color: #fff;
      padding: 4px 8px;
      border-radius: var(--ca-radius-sm, 4px);
      font-size: 12px;
      font-family: var(--ca-font-family);
      pointer-events: none;
      white-space: nowrap;
      z-index: 5;
    }
  `;
Je([
  l({ type: String })
], he.prototype, "type", 2);
Je([
  l({ type: Object, attribute: !1 })
], he.prototype, "data", 2);
Je([
  l({ type: Boolean, attribute: "show-legend" })
], he.prototype, "showLegend", 2);
Je([
  h()
], he.prototype, "_tooltip", 2);
Je([
  R(".chart-container")
], he.prototype, "_container", 2);
he = Je([
  g("ca-chart")
], he);
var Xi = Object.defineProperty, Ji = Object.getOwnPropertyDescriptor, xe = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ji(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Xi(t, r, i), i;
};
let W = class extends v {
  constructor() {
    super(...arguments), this.tasks = [], this.viewMode = "week", this.showTodayMarker = !0, this._resizingTaskId = null, this._resizeSide = null, this._resizeStartX = 0, this._resizeStartDate = null;
  }
  /* ── Date helpers ── */
  _parseDate(e) {
    const [t, r, o] = e.split("-").map(Number);
    return new Date(t, r - 1, o);
  }
  _toISO(e) {
    return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
  }
  _daysBetween(e, t) {
    return Math.round((t.getTime() - e.getTime()) / 864e5);
  }
  _addDays(e, t) {
    const r = new Date(e);
    return r.setDate(r.getDate() + t), r;
  }
  _isWeekend(e) {
    const t = e.getDay();
    return t === 0 || t === 6;
  }
  get _dateRange() {
    if (this.tasks.length === 0) {
      const s = /* @__PURE__ */ new Date(), d = this._addDays(s, -7), p = this._addDays(s, 21);
      return this._buildRange(d, p);
    }
    const e = this.tasks.map((s) => this._parseDate(s.startDate)), t = this.tasks.map((s) => this._parseDate(s.endDate)), r = new Date(Math.min(...e.map((s) => s.getTime()))), o = new Date(Math.max(...t.map((s) => s.getTime()))), i = this._addDays(r, -3), a = this._addDays(o, 7);
    return this._buildRange(i, a);
  }
  _buildRange(e, t) {
    const r = [];
    let o = new Date(e);
    for (; o <= t; )
      r.push(new Date(o)), o.setDate(o.getDate() + 1);
    return { start: e, end: t, days: r };
  }
  get _colWidth() {
    switch (this.viewMode) {
      case "day":
        return 40;
      case "week":
        return 24;
      case "month":
        return 8;
    }
  }
  /* ── Resize ── */
  _handleResizeStart(e, t, r) {
    e.stopPropagation(), e.preventDefault(), this._resizingTaskId = t, this._resizeSide = r, this._resizeStartX = e.clientX;
    const o = this.tasks.find((i) => i.id === t);
    o && (this._resizeStartDate = this._parseDate(r === "left" ? o.startDate : o.endDate)), e.target.setPointerCapture(e.pointerId);
  }
  _handleResizeMove(e) {
    !this._resizingTaskId || this._resizeStartDate;
  }
  _handleResizeEnd(e) {
    if (!this._resizingTaskId || !this._resizeStartDate) {
      this._resizingTaskId = null;
      return;
    }
    const t = e.clientX - this._resizeStartX, r = Math.round(t / this._colWidth), o = this.tasks.find((i) => i.id === this._resizingTaskId);
    if (o && r !== 0) {
      let i = this._parseDate(o.startDate), a = this._parseDate(o.endDate);
      this._resizeSide === "left" ? (i = this._addDays(i, r), i >= a && (i = this._addDays(a, -1))) : (a = this._addDays(a, r), a <= i && (a = this._addDays(i, 1))), this.dispatchEvent(
        new CustomEvent("ca-task-resize", {
          detail: { id: o.id, startDate: this._toISO(i), endDate: this._toISO(a) },
          bubbles: !0,
          composed: !0
        })
      );
    }
    this._resizingTaskId = null, this._resizeSide = null, this._resizeStartDate = null;
  }
  _handleTaskClick(e) {
    this.dispatchEvent(
      new CustomEvent("ca-task-click", {
        detail: { task: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleViewChange(e) {
    this.viewMode = e;
  }
  /* ── Format date labels ── */
  _formatDateLabel(e) {
    const t = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    switch (this.viewMode) {
      case "day":
        return `${e.getDate()} ${t[e.getMonth()]}`;
      case "week":
        return `${e.getDate()}`;
      case "month":
        return e.getDate() === 1 ? t[e.getMonth()] : "";
    }
  }
  render() {
    const { days: e } = this._dateRange, t = this._colWidth, r = e.length * t, o = /* @__PURE__ */ new Date();
    o.setHours(0, 0, 0, 0);
    const i = e.findIndex(
      (a) => a.getFullYear() === o.getFullYear() && a.getMonth() === o.getMonth() && a.getDate() === o.getDate()
    );
    return n`
      <div class="view-controls">
        ${["day", "week", "month"].map(
      (a) => n`
            <button class=${u({ "view-btn": !0, active: this.viewMode === a })} @click=${() => this._handleViewChange(a)}>
              ${a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          `
    )}
      </div>
      <div class="gantt-container">
        <!-- Task list -->
        <div class="task-list">
          <div class="task-list-header">Tasks</div>
          ${this.tasks.map(
      (a) => n`
              <div class="task-list-row" @click=${() => this._handleTaskClick(a)}>${a.title}</div>
            `
    )}
        </div>
        <!-- Timeline -->
        <div class="timeline">
          <div class="timeline-inner" style="width:${r}px; --col-width:${t}px">
            <!-- Header -->
            <div class="timeline-header">
              ${e.map((a) => {
      const s = this._formatDateLabel(a), d = a.getTime() === o.getTime(), p = this._isWeekend(a);
      return n`<div class=${u({ "timeline-date": !0, weekend: p, today: d })}>${s}</div>`;
    })}
            </div>
            <!-- Rows -->
            <div class="timeline-rows">
              ${this.showTodayMarker && i >= 0 ? n`<div class="today-marker" style="left:${i * t + t / 2}px"></div>` : c}
              ${this.tasks.map((a, s) => {
      const d = this._parseDate(a.startDate), p = this._parseDate(a.endDate), x = e[0], m = this._daysBetween(x, d), f = this._daysBetween(d, p) + 1, $ = m * t, w = f * t, k = a.color || "var(--ca-color-primary)";
      return n`
                  <div class="timeline-row">
                    <div class="timeline-row-bg">
                      ${e.map((O) => n`<div class=${u({ "timeline-cell": !0, weekend: this._isWeekend(O) })}></div>`)}
                    </div>
                    <div
                      class="task-bar"
                      style="left:${$}px; width:${Math.max(w, t)}px; background-color:${k}"
                      @click=${() => this._handleTaskClick(a)}
                      @pointermove=${this._handleResizeMove}
                      @pointerup=${this._handleResizeEnd}
                    >
                      ${a.progress != null ? n`<div class="task-bar-fill" style="width:${a.progress}%; background-color:${k}"></div>` : c}
                      <span class="task-bar-label">${a.title}</span>
                      <div class="resize-handle left"
                        @pointerdown=${(O) => this._handleResizeStart(O, a.id, "left")}></div>
                      <div class="resize-handle right"
                        @pointerdown=${(O) => this._handleResizeStart(O, a.id, "right")}></div>
                    </div>
                  </div>
                `;
    })}
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
W.styles = b`
    :host {
      display: block;
      font-family: var(--ca-font-family);
      color: var(--ca-text-primary);
    }
    .gantt-container {
      display: flex;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-lg);
      overflow: hidden;
      background: var(--ca-surface);
    }

    /* ── Task list (left panel) ── */
    .task-list {
      flex: 0 0 220px;
      border-right: 1px solid var(--ca-border);
      overflow-y: auto;
    }
    .task-list-header {
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      font-weight: var(--ca-font-weight-semibold);
      font-size: var(--ca-font-size-sm);
      border-bottom: 1px solid var(--ca-border);
      background: var(--ca-surface-active);
    }
    .task-list-row {
      height: var(--ca-gantt-row-height, 40px);
      display: flex;
      align-items: center;
      padding: 0 12px;
      font-size: var(--ca-font-size-sm);
      border-bottom: 1px solid var(--ca-border);
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .task-list-row:hover {
      background: var(--ca-surface-hover);
    }

    /* ── Timeline (right panel) ── */
    .timeline {
      flex: 1;
      overflow-x: auto;
      overflow-y: auto;
    }
    .timeline-inner {
      min-width: 100%;
      position: relative;
    }

    /* ── Header dates ── */
    .timeline-header {
      display: flex;
      height: 40px;
      border-bottom: 1px solid var(--ca-border);
      background: var(--ca-surface-active);
      position: sticky;
      top: 0;
      z-index: 2;
    }
    .timeline-date {
      flex: 0 0 var(--col-width, 40px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: var(--ca-text-muted);
      border-right: 1px solid var(--ca-border);
      box-sizing: border-box;
    }
    .timeline-date.weekend {
      background: color-mix(in srgb, var(--ca-surface-active) 50%, var(--ca-border) 5%);
    }
    .timeline-date.today {
      color: var(--ca-gantt-today-color, var(--ca-color-danger));
      font-weight: var(--ca-font-weight-semibold);
    }

    /* ── Rows grid ── */
    .timeline-rows {
      position: relative;
    }
    .timeline-row {
      height: var(--ca-gantt-row-height, 40px);
      position: relative;
      border-bottom: 1px solid var(--ca-border);
    }
    .timeline-row-bg {
      display: flex;
      height: 100%;
    }
    .timeline-cell {
      flex: 0 0 var(--col-width, 40px);
      border-right: 1px solid color-mix(in srgb, var(--ca-border) 30%, transparent);
      box-sizing: border-box;
    }
    .timeline-cell.weekend {
      background: color-mix(in srgb, var(--ca-surface-active) 50%, var(--ca-border) 3%);
    }

    /* ── Today marker ── */
    .today-marker {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--ca-gantt-today-color, var(--ca-color-danger));
      z-index: 3;
      pointer-events: none;
    }

    /* ── Task bars ── */
    .task-bar {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: var(--ca-gantt-bar-height, 24px);
      border-radius: var(--ca-radius-sm);
      cursor: pointer;
      display: flex;
      align-items: center;
      overflow: hidden;
      transition: opacity var(--ca-transition-fast);
      z-index: 1;
    }
    .task-bar:hover {
      opacity: 0.85;
    }
    .task-bar-fill {
      height: 100%;
      border-radius: inherit;
      opacity: 0.3;
    }
    .task-bar-label {
      position: absolute;
      left: 6px;
      font-size: 10px;
      font-weight: var(--ca-font-weight-semibold);
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(100% - 12px);
    }

    /* ── Resize handles ── */
    .resize-handle {
      position: absolute;
      top: 0;
      width: 6px;
      height: 100%;
      cursor: ew-resize;
      z-index: 2;
    }
    .resize-handle.left { left: 0; }
    .resize-handle.right { right: 0; }

    /* ── View mode selector ── */
    .view-controls {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 8px 12px;
      border-bottom: 1px solid var(--ca-border);
    }
    .view-btn {
      padding: 4px 10px;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-sm);
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
    }
    .view-btn.active {
      background: var(--ca-color-secondary);
      color: var(--ca-color-white);
      border-color: var(--ca-color-secondary);
    }
    .view-btn:hover:not(.active) {
      background: var(--ca-surface-hover);
    }
  `;
xe([
  l({ type: Array, attribute: !1 })
], W.prototype, "tasks", 2);
xe([
  l({ type: String, attribute: "view-mode" })
], W.prototype, "viewMode", 2);
xe([
  l({ type: Boolean, attribute: "show-today-marker" })
], W.prototype, "showTodayMarker", 2);
xe([
  h()
], W.prototype, "_resizingTaskId", 2);
xe([
  h()
], W.prototype, "_resizeSide", 2);
xe([
  h()
], W.prototype, "_resizeStartX", 2);
xe([
  h()
], W.prototype, "_resizeStartDate", 2);
W = xe([
  g("ca-gantt-chart")
], W);
var Zi = Object.defineProperty, eo = Object.getOwnPropertyDescriptor, yt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? eo(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Zi(t, r, i), i;
};
let Me = class extends v {
  constructor() {
    super(...arguments), this.items = [], this.multiple = !1, this._internalIds = [];
  }
  get _openIds() {
    return this.openIds ?? this._internalIds;
  }
  _toggle(e) {
    const t = this._openIds, r = t.includes(e) ? t.filter((o) => o !== e) : this.multiple ? [...t, e] : [e];
    this.openIds === void 0 && (this._internalIds = r), this.dispatchEvent(
      new CustomEvent("ca-open-change", {
        detail: { ids: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _isOpen(e) {
    return this._openIds.includes(e);
  }
  render() {
    return n`
      <div class="accordion">
        ${this.items.map(
      (e) => n`
            <div class="item">
              <button
                class="trigger"
                @click=${() => this._toggle(e.id)}
                aria-expanded=${this._isOpen(e.id)}
                aria-controls=${`panel-${e.id}`}
              >
                <span>${e.title}</span>
                <svg
                  class=${u({ chevron: !0, open: this._isOpen(e.id) })}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div
                id=${`panel-${e.id}`}
                class=${u({ panel: !0, open: this._isOpen(e.id) })}
                role="region"
              >
                <div class="panel-content">${e.content}</div>
              </div>
            </div>
          `
    )}
      </div>
    `;
  }
};
Me.styles = b`
    .accordion {
      --_border: var(--ca-accordion-border, 1px solid var(--ca-divider));
      width: 100%;
    }
    .item {
      border-bottom: var(--_border);
    }
    .trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      width: 100%;
      padding: 24px 0;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 22px;
      line-height: 1;
      color: var(--ca-text-primary);
      text-align: left;
    }
    .trigger:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 2px;
      border-radius: var(--ca-radius-sm);
    }
    .chevron {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      transition: transform 0.25s ease;
      color: var(--ca-text-primary);
    }
    .chevron.open {
      transform: rotate(180deg);
    }
    .panel {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease, opacity 0.25s ease;
      opacity: 0;
    }
    .panel > .panel-content {
      overflow: hidden;
    }
    .panel.open {
      grid-template-rows: 1fr;
      opacity: 1;
    }
    .panel-content {
      padding: 0 0 32px 0;
    }
  `;
yt([
  l({ type: Array })
], Me.prototype, "items", 2);
yt([
  l({ type: Boolean })
], Me.prototype, "multiple", 2);
yt([
  l({ type: Array, attribute: !1 })
], Me.prototype, "openIds", 2);
yt([
  h()
], Me.prototype, "_internalIds", 2);
Me = yt([
  g("ca-accordion")
], Me);
var to = Object.defineProperty, ro = Object.getOwnPropertyDescriptor, be = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ro(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && to(t, r, i), i;
};
let X = class extends v {
  constructor() {
    super(...arguments), this.src = "", this.alt = "", this.name = "", this.size = "md", this.color = "", this._imgError = !1;
  }
  _getInitials(e) {
    if (!e) return "";
    const t = e.trim().split(/\s+/);
    return t.length === 1 ? t[0].charAt(0).toUpperCase() : (t[0].charAt(0) + t[t.length - 1].charAt(0)).toUpperCase();
  }
  _handleImgError() {
    this._imgError = !0;
  }
  updated(e) {
    e.has("src") && (this._imgError = !1);
  }
  render() {
    const e = this.src && !this._imgError, t = this._getInitials(this.name);
    return n`
      <div class="avatar" role="img" aria-label=${this.alt || this.name || "avatar"}
        style=${this.color ? `background-color: ${this.color}` : ""}>
        ${e ? n`
              <img
                class="image"
                src=${this.src}
                alt=${this.alt || this.name || ""}
                @error=${this._handleImgError}
              />
            ` : n`<span class="initials">${t}</span>`}
        ${this.status ? n`
              <span
                class=${u({
      status: !0,
      "status-online": this.status === "online",
      "status-offline": this.status === "offline",
      "status-away": this.status === "away"
    })}
              ></span>
            ` : null}
      </div>
    `;
  }
};
X.styles = b`
    :host {
      display: inline-flex;
    }
    .avatar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--ca-avatar-radius, 9999px);
      background-color: var(--ca-avatar-bg, var(--ca-color-primary));
      color: var(--ca-avatar-color, var(--ca-color-white));
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      overflow: hidden;
      flex-shrink: 0;
      user-select: none;
      /* md default */
      width: 40px;
      height: 40px;
      font-size: 14px;
    }
    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    .initials {
      line-height: 1;
    }
    /* Sizes */
    :host([size='xs']) .avatar {
      width: 24px;
      height: 24px;
      font-size: 10px;
    }
    :host([size='sm']) .avatar {
      width: 32px;
      height: 32px;
      font-size: 12px;
    }
    :host([size='lg']) .avatar {
      width: 48px;
      height: 48px;
      font-size: 16px;
    }
    :host([size='xl']) .avatar {
      width: 64px;
      height: 64px;
      font-size: 20px;
    }
    /* Status dot */
    .status {
      position: absolute;
      bottom: 0;
      right: 0;
      border-radius: 50%;
      border: 2px solid var(--ca-surface);
      box-sizing: content-box;
      width: 10px;
      height: 10px;
    }
    :host([size='xs']) .status,
    :host([size='sm']) .status {
      width: 8px;
      height: 8px;
    }
    :host([size='xl']) .status {
      width: 12px;
      height: 12px;
    }
    .status-online {
      background-color: var(--ca-avatar-status-online, var(--ca-color-success));
    }
    .status-offline {
      background-color: var(--ca-avatar-status-offline, var(--ca-border-strong));
    }
    .status-away {
      background-color: var(--ca-avatar-status-away, var(--ca-color-warning));
    }
  `;
be([
  l({ type: String })
], X.prototype, "src", 2);
be([
  l({ type: String })
], X.prototype, "alt", 2);
be([
  l({ type: String })
], X.prototype, "name", 2);
be([
  l({ type: String, reflect: !0 })
], X.prototype, "size", 2);
be([
  l({ type: String })
], X.prototype, "status", 2);
be([
  l({ type: String })
], X.prototype, "color", 2);
be([
  h()
], X.prototype, "_imgError", 2);
X = be([
  g("ca-avatar")
], X);
var io = Object.defineProperty, oo = Object.getOwnPropertyDescriptor, _t = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? oo(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && io(t, r, i), i;
};
let Ae = class extends v {
  constructor() {
    super(...arguments), this.members = [], this.max = 3, this.size = "md", this.interactive = !1;
  }
  _handleClick() {
    this.interactive && this.dispatchEvent(new CustomEvent("ca-click", { bubbles: !0, composed: !0 }));
  }
  render() {
    const e = this.members.slice(0, this.max), t = this.members.length - e.length;
    return n`
      <div class="stack" @click=${this._handleClick}>
        ${e.map(
      (r) => n`
            <ca-avatar
              .name=${r.name}
              .src=${r.src || ""}
              .color=${r.color || ""}
              .size=${this.size}
            ></ca-avatar>
          `
    )}
        ${t > 0 ? n`<span class="overflow">+${t}</span>` : c}
      </div>
    `;
  }
};
Ae.styles = b`
    :host {
      display: inline-flex;
      align-items: center;
      cursor: default;
    }
    :host([interactive]) {
      cursor: pointer;
    }
    .stack {
      display: flex;
      align-items: center;
    }
    .stack ca-avatar {
      margin-left: -8px;
      border: 2px solid var(--ca-surface);
      border-radius: 50%;
      box-sizing: content-box;
    }
    .stack ca-avatar:first-child {
      margin-left: 0;
    }
    :host([size='xs']) .stack ca-avatar { margin-left: -5px; border-width: 1.5px; }
    :host([size='sm']) .stack ca-avatar { margin-left: -6px; border-width: 1.5px; }
    :host([size='lg']) .stack ca-avatar { margin-left: -10px; border-width: 2.5px; }

    .overflow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: var(--ca-surface-active);
      border: 2px solid var(--ca-surface);
      color: var(--ca-text-secondary);
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      margin-left: -8px;
      box-sizing: content-box;
      /* md default */
      width: 40px;
      height: 40px;
      font-size: 12px;
    }
    :host([size='xs']) .overflow { width: 24px; height: 24px; font-size: 9px; margin-left: -5px; border-width: 1.5px; }
    :host([size='sm']) .overflow { width: 32px; height: 32px; font-size: 10px; margin-left: -6px; border-width: 1.5px; }
    :host([size='lg']) .overflow { width: 48px; height: 48px; font-size: 14px; margin-left: -10px; border-width: 2.5px; }
  `;
_t([
  l({ type: Array, attribute: !1 })
], Ae.prototype, "members", 2);
_t([
  l({ type: Number })
], Ae.prototype, "max", 2);
_t([
  l({ type: String, reflect: !0 })
], Ae.prototype, "size", 2);
_t([
  l({ type: Boolean, reflect: !0 })
], Ae.prototype, "interactive", 2);
Ae = _t([
  g("ca-avatar-group")
], Ae);
const Ne = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], ao = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
], so = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function _r(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function no(e, t) {
  return new Date(e, t, 1).getDay();
}
function lo(e, t) {
  const r = [], o = no(e, t), i = _r(e, t), a = t === 0 ? 11 : t - 1, s = t === 0 ? e - 1 : e, d = _r(s, a);
  for (let f = o - 1; f >= 0; f--)
    r.push({ year: s, month: a, day: d - f, isCurrentMonth: !1 });
  for (let f = 1; f <= i; f++)
    r.push({ year: e, month: t, day: f, isCurrentMonth: !0 });
  const p = t === 11 ? 0 : t + 1, x = t === 11 ? e + 1 : e, m = 42 - r.length;
  for (let f = 1; f <= m; f++)
    r.push({ year: x, month: p, day: f, isCurrentMonth: !1 });
  return r;
}
function it(e) {
  return `${ao[e.getMonth()]} ${e.getDate()}, ${e.getFullYear()}`;
}
function Ut(e) {
  const t = e.getFullYear(), r = String(e.getMonth() + 1).padStart(2, "0"), o = String(e.getDate()).padStart(2, "0");
  return `${t}-${r}-${o}`;
}
function ot(e) {
  const t = /^(\d{4})-(\d{2})-(\d{2})$/.exec(e);
  if (!t) return null;
  const r = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
  return isNaN(r.getTime()) ? null : r;
}
function Y(e, t) {
  return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function wr(e, t, r) {
  const o = e.getTime(), i = t.getTime(), a = r.getTime(), s = Math.min(i, a), d = Math.max(i, a);
  return o >= s && o <= d;
}
function Ct(e, t, r) {
  if (t) {
    const o = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    if (e < o) return !0;
  }
  if (r) {
    const o = new Date(r.getFullYear(), r.getMonth(), r.getDate());
    if (e > o) return !0;
  }
  return !1;
}
var co = Object.defineProperty, po = Object.getOwnPropertyDescriptor, C = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? po(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && co(t, r, i), i;
};
const ho = n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`, uo = n`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 12L6 8l4-4"/></svg>`, fo = n`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l4 4-4 4"/></svg>`, vo = n`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>`;
function qt(e) {
  return new Date(e.year, e.month, e.day);
}
let z = class extends v {
  constructor() {
    super(...arguments), this.mode = "single", this.size = "md", this.value = "", this.startDate = "", this.endDate = "", this.label = "", this.error = "", this.placeholder = "Select date", this.minDate = "", this.maxDate = "", this.disabled = !1, this.borderless = !1, this.overdue = !1, this._isOpen = !1, this._viewYear = (/* @__PURE__ */ new Date()).getFullYear(), this._viewMonth = (/* @__PURE__ */ new Date()).getMonth(), this._rangeStart = null, this._hoverDate = null, this._focusedIndex = null, this._liveText = "", this._boundClickOutside = this._handleClickOutside.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._boundClickOutside);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._boundClickOutside);
  }
  // ── Click outside (composedPath for Shadow DOM) ────────────────────
  _handleClickOutside(e) {
    if (!this._isOpen) return;
    e.composedPath().includes(this) || this._close();
  }
  // ── Parsed values (derived from public properties) ─────────────────
  get _parsedMin() {
    return this.minDate ? ot(this.minDate) : null;
  }
  get _parsedMax() {
    return this.maxDate ? ot(this.maxDate) : null;
  }
  get _singleDate() {
    return this.mode === "single" && this.value ? ot(this.value) : null;
  }
  get _rangeStartVal() {
    return this.mode === "range" && this.startDate ? ot(this.startDate) : null;
  }
  get _rangeEndVal() {
    return this.mode === "range" && this.endDate ? ot(this.endDate) : null;
  }
  get _grid() {
    return lo(this._viewYear, this._viewMonth);
  }
  // ── Display text ───────────────────────────────────────────────────
  get _displayText() {
    if (this.mode === "single") {
      const r = this._singleDate;
      return r ? it(r) : "";
    }
    const e = this._rangeStartVal, t = this._rangeEndVal;
    return e && t ? `${it(e)} – ${it(t)}` : e ? `${it(e)} – ...` : "";
  }
  get _hasValue() {
    return this.mode === "single" ? this.value !== "" : this.startDate !== "" || this.endDate !== "";
  }
  // ── Open / close ───────────────────────────────────────────────────
  _open() {
    if (this.disabled) return;
    const e = this._singleDate ?? this._rangeStartVal ?? /* @__PURE__ */ new Date();
    this._viewYear = e.getFullYear(), this._viewMonth = e.getMonth(), this._isOpen = !0, this._rangeStart = null, this._hoverDate = null, this._announceLive(`${Ne[this._viewMonth]} ${this._viewYear}`), this.updateComplete.then(() => {
      const t = this._grid, r = this._singleDate ?? this._rangeStartVal ?? /* @__PURE__ */ new Date(), o = t.findIndex(
        (i) => i.isCurrentMonth && i.year === r.getFullYear() && i.month === r.getMonth() && i.day === r.getDate()
      );
      this._focusedIndex = o >= 0 ? o : t.findIndex((i) => i.isCurrentMonth), this._focusCellByIndex(this._focusedIndex);
    });
  }
  _close() {
    this._isOpen = !1, this._rangeStart = null, this._hoverDate = null, this._focusedIndex = null;
  }
  _toggle() {
    this._isOpen ? this._close() : this._open();
  }
  // ── Navigation ─────────────────────────────────────────────────────
  _prevMonth() {
    this._viewMonth === 0 ? (this._viewMonth = 11, this._viewYear--) : this._viewMonth--, this._announceLive(`${Ne[this._viewMonth]} ${this._viewYear}`);
  }
  _nextMonth() {
    this._viewMonth === 11 ? (this._viewMonth = 0, this._viewYear++) : this._viewMonth++, this._announceLive(`${Ne[this._viewMonth]} ${this._viewYear}`);
  }
  _goToToday() {
    const e = /* @__PURE__ */ new Date();
    this._viewYear = e.getFullYear(), this._viewMonth = e.getMonth(), this._announceLive(`${Ne[this._viewMonth]} ${this._viewYear}`), this.mode === "single" && !Ct(e, this._parsedMin, this._parsedMax) && this._selectDate(e);
  }
  // ── Selection ──────────────────────────────────────────────────────
  _selectDate(e) {
    if (Ct(e, this._parsedMin, this._parsedMax)) return;
    if (this.mode === "single") {
      this.dispatchEvent(
        new CustomEvent("ca-change", {
          detail: { value: Ut(e) },
          bubbles: !0,
          composed: !0
        })
      ), this._close();
      return;
    }
    if (!this._rangeStart) {
      this._rangeStart = e;
      return;
    }
    const [t, r] = this._rangeStart.getTime() <= e.getTime() ? [this._rangeStart, e] : [e, this._rangeStart];
    this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: {
          startDate: Ut(t),
          endDate: Ut(r)
        },
        bubbles: !0,
        composed: !0
      })
    ), this._rangeStart = null, this._hoverDate = null, this._close();
  }
  // ── Day cell state computation ─────────────────────────────────────
  _getDayClasses(e, t) {
    const r = qt(e), i = Y(r, /* @__PURE__ */ new Date()), a = !e.isCurrentMonth, s = Ct(r, this._parsedMin, this._parsedMax);
    let d = !1, p = !1, x = !1, m = !1;
    if (this.mode === "single") {
      const f = this._singleDate;
      f && Y(r, f) && (d = !0);
    } else if (this.mode === "range")
      if (this._rangeStart) {
        const f = this._hoverDate ?? this._rangeStart, [$, w] = this._rangeStart.getTime() <= f.getTime() ? [this._rangeStart, f] : [f, this._rangeStart];
        x = Y(r, $), m = Y(r, w), d = Y(r, this._rangeStart) || Y(r, f), p = wr(r, $, w) && !Y(r, $) && !Y(r, w);
      } else this._rangeStartVal && this._rangeEndVal && (x = Y(r, this._rangeStartVal), m = Y(r, this._rangeEndVal), d = x || m, p = wr(r, this._rangeStartVal, this._rangeEndVal) && !x && !m);
    return {
      "day-cell": !0,
      outside: a,
      today: i,
      selected: d,
      "in-range": p,
      "range-start": x,
      "range-end": m,
      "day-disabled": s
    };
  }
  // ── Keyboard: trigger ──────────────────────────────────────────────
  _handleFieldKeydown(e) {
    e.key === "Enter" || e.key === " " ? (e.preventDefault(), this._toggle()) : e.key === "Escape" && this._isOpen && (e.preventDefault(), this._close());
  }
  // ── Keyboard: grid ─────────────────────────────────────────────────
  _handleGridKeydown(e) {
    const t = this._grid;
    let r = this._focusedIndex;
    if (r === null) {
      const a = /* @__PURE__ */ new Date();
      r = t.findIndex(
        (s) => s.isCurrentMonth && s.year === a.getFullYear() && s.month === a.getMonth() && s.day === a.getDate()
      ), r === -1 && (r = t.findIndex((s) => s.isCurrentMonth));
    }
    let o = r, i = !0;
    switch (e.key) {
      case "ArrowLeft":
        o = r - 1;
        break;
      case "ArrowRight":
        o = r + 1;
        break;
      case "ArrowUp":
        o = r - 7;
        break;
      case "ArrowDown":
        o = r + 7;
        break;
      case "Home": {
        o = t.findIndex((a) => a.isCurrentMonth);
        break;
      }
      case "End": {
        for (let a = t.length - 1; a >= 0; a--)
          if (t[a].isCurrentMonth) {
            o = a;
            break;
          }
        break;
      }
      case "PageUp":
        e.preventDefault(), e.shiftKey ? this._viewYear-- : this._prevMonth(), this.updateComplete.then(() => {
          const a = Math.min(r, this._grid.length - 1);
          this._focusedIndex = a, this._focusCellByIndex(a);
        });
        return;
      case "PageDown":
        e.preventDefault(), e.shiftKey ? this._viewYear++ : this._nextMonth(), this.updateComplete.then(() => {
          const a = Math.min(r, this._grid.length - 1);
          this._focusedIndex = a, this._focusCellByIndex(a);
        });
        return;
      case "Enter":
      case " ":
        e.preventDefault(), r >= 0 && r < t.length && this._selectDate(qt(t[r]));
        return;
      case "Escape":
        e.preventDefault(), this._close(), this.updateComplete.then(() => {
          this.shadowRoot?.querySelector('[role="combobox"]')?.focus();
        });
        return;
      default:
        i = !1;
    }
    if (i) {
      if (e.preventDefault(), o < 0) {
        this._prevMonth(), this.updateComplete.then(() => {
          const a = Math.max(0, Math.min(o + 42, this._grid.length - 1));
          this._focusedIndex = a, this._focusCellByIndex(a);
        });
        return;
      }
      if (o >= 42) {
        this._nextMonth(), this.updateComplete.then(() => {
          const a = Math.min(o - 42, this._grid.length - 1);
          this._focusedIndex = a, this._focusCellByIndex(a);
        });
        return;
      }
      this._focusedIndex = o, this._focusCellByIndex(o);
    }
  }
  // ── Focus helpers ──────────────────────────────────────────────────
  _focusCellByIndex(e) {
    this.updateComplete.then(() => {
      const t = this.shadowRoot?.querySelector(".day-grid");
      if (!t) return;
      t.querySelectorAll(".day-cell")[e]?.focus();
    });
  }
  _announceLive(e) {
    this._liveText = e;
  }
  // ── Rendering ──────────────────────────────────────────────────────
  render() {
    const e = this._displayText, t = this._grid;
    return n`
      ${this.label ? n`<label class="label">${this.label}</label>` : c}

      <!-- Trigger field -->
      <div
        class=${u({ field: !0, disabled: this.disabled })}
        part="field"
        tabindex=${this.disabled ? -1 : 0}
        role="combobox"
        aria-expanded=${this._isOpen}
        aria-haspopup="dialog"
        aria-label=${this.label || this.placeholder}
        @click=${this._toggle}
        @keydown=${this._handleFieldKeydown}
      >
        <span class="calendar-icon">${ho}</span>
        <span class=${u({ "value-text": !0, placeholder: !e })}>
          ${e || this.placeholder}
        </span>
        <span class=${u({ chevron: !0, open: this._isOpen })}>
          ${vo}
        </span>
      </div>

      ${this.error ? n`<div class="error-text" role="alert">${this.error}</div>` : c}

      <!-- Calendar dropdown -->
      ${this._isOpen ? n`
            <div
              class="dropdown"
              part="dropdown"
              role="dialog"
              aria-label=${this.mode === "range" ? "Choose date range" : "Choose date"}
            >
              <!-- Header -->
              <div class="calendar-header">
                <button
                  type="button"
                  class="nav-button"
                  aria-label="Previous month"
                  @click=${(r) => {
      r.stopPropagation(), this._prevMonth();
    }}
                >
                  ${uo}
                </button>
                <span class="month-year">
                  ${Ne[this._viewMonth]} ${this._viewYear}
                </span>
                <button
                  type="button"
                  class="nav-button"
                  aria-label="Next month"
                  @click=${(r) => {
      r.stopPropagation(), this._nextMonth();
    }}
                >
                  ${fo}
                </button>
              </div>

              <!-- Weekday labels -->
              <div class="weekday-row" role="row">
                ${so.map(
      (r) => n`<span class="weekday" role="columnheader">${r}</span>`
    )}
              </div>

              <!-- Day grid -->
              <div
                class="day-grid"
                role="grid"
                aria-label="${Ne[this._viewMonth]} ${this._viewYear}"
                @keydown=${this._handleGridKeydown}
              >
                ${t.map((r, o) => {
      const i = qt(r), a = Ct(i, this._parsedMin, this._parsedMax), s = this._getDayClasses(r, o);
      return n`
                    <button
                      type="button"
                      data-cell=${o}
                      class=${u(s)}
                      tabindex=${this._focusedIndex === o ? 0 : -1}
                      role="gridcell"
                      aria-label=${it(i)}
                      aria-selected=${s.selected ? "true" : "false"}
                      aria-disabled=${a ? "true" : c}
                      @click=${(d) => {
        d.stopPropagation(), a || (this._focusedIndex = o, this._selectDate(i));
      }}
                      @mouseenter=${() => {
        !a && this.mode === "range" && this._rangeStart && (this._hoverDate = i);
      }}
                      @focus=${() => {
        this._focusedIndex = o;
      }}
                    >
                      ${r.day}
                    </button>
                  `;
    })}
              </div>

              <!-- Footer -->
              <div class="calendar-footer">
                <button
                  type="button"
                  class="today-button"
                  @click=${(r) => {
      r.stopPropagation(), this._goToToday();
    }}
                >
                  Today
                </button>
              </div>
            </div>
          ` : c}

      <!-- Screen reader live region -->
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        ${this._liveText}
      </div>
    `;
  }
};
z.styles = b`
    /* ── Private custom properties ── */
    :host {
      --_bg: var(--ca-datepicker-bg, var(--ca-surface));
      --_border: var(--ca-datepicker-border, var(--ca-border-input));
      --_radius: var(--ca-datepicker-radius, var(--ca-radius-md));
      --_color: var(--ca-datepicker-color, var(--ca-text-primary));
      --_focus-border: var(--ca-datepicker-focus-border, var(--ca-text-primary));
      --_day-size: var(--ca-datepicker-day-size, 36px);
      --_day-hover-bg: var(--ca-datepicker-day-hover-bg, var(--ca-surface-hover));
      --_selected-bg: var(--ca-datepicker-selected-bg, var(--ca-color-primary));
      --_selected-color: var(--ca-datepicker-selected-color, #ffffff);
      --_range-bg: var(--ca-datepicker-range-bg, color-mix(in srgb, var(--ca-color-primary) 12%, transparent));
      --_today-border: var(--ca-datepicker-today-border, var(--ca-border-strong));
      --_shadow: var(--ca-datepicker-shadow, var(--ca-shadow-menu));

      display: flex;
      flex-direction: column;
      gap: 6px;
      position: relative;
      width: 100%;
      font-family: var(--ca-font-family);
    }

    :host([disabled]) {
      pointer-events: none;
    }

    :host([borderless]) .field {
      border-color: transparent;
      background-color: transparent;
    }
    :host([borderless]) .field:hover:not(.disabled) {
      border-color: var(--_border);
    }

    :host([overdue]) .field {
      color: var(--ca-text-danger);
    }
    :host([overdue]) .value-text {
      color: var(--ca-text-danger);
    }

    /* ── Label ── */
    .label {
      font-weight: var(--ca-font-weight-semibold);
      font-size: var(--ca-font-size-sm);
      color: var(--_color);
      line-height: 1;
    }

    /* ── Field / trigger ── */
    .field {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--_border);
      border-radius: var(--_radius);
      background-color: var(--_bg);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-md);
      color: var(--_color);
      cursor: pointer;
      box-sizing: border-box;
      line-height: 1;
      transition: border-color var(--ca-transition-fast);
    }

    .field:hover:not(.disabled) {
      border-color: var(--_focus-border);
    }

    .field:focus-visible,
    .field:focus {
      outline: none;
      border: 2px solid var(--_focus-border);
    }

    .field.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── Size variants ── */
    :host([size='xs']) .field {
      padding: 6px 8px;
      font-size: 11px;
      border-radius: 6px;
      gap: 6px;
    }
    :host([size='sm']) .field {
      padding: 8px 10px;
      font-size: var(--ca-font-size-xs);
      border-radius: 6px;
      gap: 8px;
    }
    :host([size='lg']) .field {
      padding: 14px 14px;
      font-size: var(--ca-font-size-lg);
      border-radius: 10px;
      gap: 12px;
    }
    :host([size='xl']) .field {
      padding: 18px 16px;
      font-size: 20px;
      border-radius: 12px;
      gap: 14px;
    }

    /* ── Calendar icon ── */
    .calendar-icon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      color: var(--ca-text-muted);
    }
    .calendar-icon svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    :host([size='xs']) .calendar-icon { width: 12px; height: 12px; }
    :host([size='sm']) .calendar-icon { width: 14px; height: 14px; }
    :host([size='lg']) .calendar-icon { width: 20px; height: 20px; }
    :host([size='xl']) .calendar-icon { width: 22px; height: 22px; }

    /* ── Value text ── */
    .value-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--_color);
    }
    .value-text.placeholder {
      color: var(--ca-text-secondary);
    }

    /* ── Chevron ── */
    .chevron {
      flex-shrink: 0;
      width: 14px;
      height: 14px;
      color: var(--ca-text-muted);
      transition: transform var(--ca-transition-normal);
    }
    .chevron svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .chevron.open {
      transform: rotate(180deg);
    }
    :host([size='xs']) .chevron { width: 10px; height: 10px; }
    :host([size='sm']) .chevron { width: 12px; height: 12px; }
    :host([size='lg']) .chevron { width: 16px; height: 16px; }
    :host([size='xl']) .chevron { width: 18px; height: 18px; }

    /* ── Error ── */
    .error-text {
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-danger);
      line-height: 1.3;
    }
    :host([error]) .field {
      border-color: var(--ca-text-danger);
    }

    /* ── Dropdown ── */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 10;
      margin-top: 4px;
      min-width: 280px;
      background-color: var(--_bg);
      border: 1px solid var(--ca-border-strong);
      border-radius: var(--_radius);
      box-shadow: var(--_shadow);
      box-sizing: border-box;
      padding: 12px;
      animation: ca-dp-fade-in 0.12s ease;
    }

    @keyframes ca-dp-fade-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Calendar header ── */
    .calendar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .nav-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background: none;
      color: var(--_color);
      cursor: pointer;
      padding: 0;
    }
    .nav-button:hover {
      background-color: var(--_day-hover-bg);
    }
    .nav-button:focus-visible {
      outline: 2px solid var(--_focus-border);
      outline-offset: -2px;
    }
    .nav-button:focus:not(:focus-visible) {
      outline: none;
    }
    .nav-button svg {
      width: 14px;
      height: 14px;
    }

    .month-year {
      font-weight: var(--ca-font-weight-semibold);
      font-size: var(--ca-font-size-md);
      color: var(--_color);
    }

    /* ── Weekday row ── */
    .weekday-row {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      margin-bottom: 4px;
    }

    .weekday {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--_day-size);
      font-size: 11px;
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-muted);
      user-select: none;
    }

    /* ── Day grid ── */
    .day-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
    }

    .day-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: var(--_day-size);
      border: none;
      border-radius: 50%;
      background: none;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--_color);
      cursor: pointer;
      padding: 0;
      position: relative;
      box-sizing: border-box;
    }

    .day-cell:hover:not(.day-disabled):not(.selected) {
      background-color: var(--_day-hover-bg);
    }

    .day-cell:focus-visible {
      outline: 2px solid var(--_focus-border);
      outline-offset: -2px;
      z-index: 1;
    }

    .day-cell:focus:not(:focus-visible) {
      outline: none;
    }

    /* Outside current month */
    .day-cell.outside {
      color: var(--ca-text-muted);
      opacity: 0.4;
    }

    /* Today */
    .day-cell.today {
      border: 1px solid var(--_today-border);
      font-weight: var(--ca-font-weight-semibold);
    }

    /* Selected */
    .day-cell.selected {
      background-color: var(--_selected-bg);
      color: var(--_selected-color);
      font-weight: var(--ca-font-weight-semibold);
    }

    .day-cell.selected.today {
      border-color: var(--_selected-bg);
    }

    /* Range in-between */
    .day-cell.in-range {
      background-color: var(--_range-bg);
      border-radius: 0;
    }

    /* Range endpoints */
    .day-cell.range-start {
      border-radius: 50% 0 0 50%;
    }

    .day-cell.range-end {
      border-radius: 0 50% 50% 0;
    }

    .day-cell.range-start.range-end {
      border-radius: 50%;
    }

    /* Disabled day */
    .day-cell.day-disabled {
      color: var(--ca-text-muted);
      opacity: 0.3;
      cursor: not-allowed;
    }

    /* ── Footer ── */
    .calendar-footer {
      display: flex;
      justify-content: center;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--ca-border);
    }

    .today-button {
      border: none;
      background: none;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-color-primary);
      cursor: pointer;
      padding: 4px 12px;
      border-radius: var(--ca-radius-sm);
    }
    .today-button:hover {
      background-color: var(--_day-hover-bg);
    }
    .today-button:focus-visible {
      outline: 2px solid var(--_focus-border);
      outline-offset: -2px;
    }
    .today-button:focus:not(:focus-visible) {
      outline: none;
    }

    /* ── Screen reader only ── */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
C([
  l({ type: String, reflect: !0 })
], z.prototype, "mode", 2);
C([
  l({ type: String, reflect: !0 })
], z.prototype, "size", 2);
C([
  l({ type: String })
], z.prototype, "value", 2);
C([
  l({ type: String, attribute: "start-date" })
], z.prototype, "startDate", 2);
C([
  l({ type: String, attribute: "end-date" })
], z.prototype, "endDate", 2);
C([
  l({ type: String })
], z.prototype, "label", 2);
C([
  l({ type: String, reflect: !0 })
], z.prototype, "error", 2);
C([
  l({ type: String })
], z.prototype, "placeholder", 2);
C([
  l({ type: String, attribute: "min-date" })
], z.prototype, "minDate", 2);
C([
  l({ type: String, attribute: "max-date" })
], z.prototype, "maxDate", 2);
C([
  l({ type: Boolean, reflect: !0 })
], z.prototype, "disabled", 2);
C([
  l({ type: Boolean, reflect: !0 })
], z.prototype, "borderless", 2);
C([
  l({ type: Boolean, reflect: !0 })
], z.prototype, "overdue", 2);
C([
  h()
], z.prototype, "_isOpen", 2);
C([
  h()
], z.prototype, "_viewYear", 2);
C([
  h()
], z.prototype, "_viewMonth", 2);
C([
  h()
], z.prototype, "_rangeStart", 2);
C([
  h()
], z.prototype, "_hoverDate", 2);
C([
  h()
], z.prototype, "_focusedIndex", 2);
C([
  h()
], z.prototype, "_liveText", 2);
C([
  R(".day-grid")
], z.prototype, "_dayGrid", 2);
z = C([
  g("ca-datepicker")
], z);
var go = Object.defineProperty, xo = Object.getOwnPropertyDescriptor, Rt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? xo(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && go(t, r, i), i;
};
let qe = class extends v {
  constructor() {
    super(...arguments), this.open = !1, this.size = "md", this._previouslyFocused = null, this._boundKeydown = this._handleKeydown.bind(this);
  }
  updated(e) {
    e.has("open") && (this.open ? this._onOpen() : this._onClose());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._onClose();
  }
  _onOpen() {
    this._previouslyFocused = document.activeElement, document.body.style.overflow = "hidden", document.addEventListener("keydown", this._boundKeydown), this.updateComplete.then(() => {
      this._panel?.focus();
    });
  }
  _onClose() {
    document.body.style.overflow = "", document.removeEventListener("keydown", this._boundKeydown), this._previouslyFocused && (this._previouslyFocused.focus(), this._previouslyFocused = null);
  }
  _handleKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault(), this._emitClose();
      return;
    }
    e.key === "Tab" && this._trapFocus(e);
  }
  _trapFocus(e) {
    const t = this._panel;
    if (!t) return;
    const r = this._getFocusableElements(t);
    if (r.length === 0) {
      e.preventDefault();
      return;
    }
    const o = r[0], i = r[r.length - 1];
    e.shiftKey ? (document.activeElement === o || this.shadowRoot?.activeElement === o) && (e.preventDefault(), i.focus()) : (document.activeElement === i || this.shadowRoot?.activeElement === i) && (e.preventDefault(), o.focus());
  }
  _getFocusableElements(e) {
    const t = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', r = [];
    return e.querySelectorAll(t).forEach((a) => r.push(a)), e.querySelectorAll("slot").forEach((a) => {
      a.assignedElements({ flatten: !0 }).forEach((d) => {
        d.matches?.(t) && r.push(d), d.querySelectorAll(t).forEach((x) => r.push(x));
      });
    }), r;
  }
  _handleOverlayClick(e) {
    e.target === e.currentTarget && this._emitClose();
  }
  _emitClose() {
    this.dispatchEvent(new CustomEvent("ca-close", { bubbles: !0, composed: !0 }));
  }
  render() {
    return this.open ? n`
      <div class="overlay" @click=${this._handleOverlayClick}>
        <div
          class=${u({ panel: !0, [this.size]: !0 })}
          role="dialog"
          aria-modal="true"
          tabindex="-1"
        >
          <div class="header">
            <slot name="header"></slot>
            <button class="close-btn" type="button" aria-label="Close" @click=${this._emitClose}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div class="body">
            <slot></slot>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    ` : c;
  }
};
qe.styles = b`
    :host { display: contents; }
    .overlay { position: fixed; inset: 0; z-index: 9000; display: flex; align-items: center; justify-content: center; background-color: rgba(0,0,0,0.5); animation: overlay-fade-in 0.2s ease; }
    .panel { position: relative; background-color: var(--ca-surface-elevated); border-radius: var(--ca-radius-lg); box-shadow: var(--ca-shadow-lg); max-height: 90vh; overflow-y: auto; animation: panel-slide-up 0.25s ease; box-sizing: border-box; font-family: var(--ca-font-family); color: var(--ca-text-primary); }
    .sm { width: 90%; max-width: 400px; }
    .md { width: 90%; max-width: 560px; }
    .lg { width: 90%; max-width: 720px; }
    .full { width: 100%; height: 100%; max-width: none; max-height: none; border-radius: 0; }
    .header { display: flex; align-items: center; justify-content: space-between; padding: var(--ca-space-md) var(--ca-space-lg); font-weight: var(--ca-font-weight-semibold); font-size: var(--ca-font-size-lg); }
    .header .close-btn { background: none; border: none; cursor: pointer; padding: 4px; color: var(--ca-text-secondary); border-radius: var(--ca-radius-sm); line-height: 0; }
    .header .close-btn:hover { color: var(--ca-text-primary); background: var(--ca-surface-hover); }
    .body { padding: var(--ca-space-lg); }
    .footer { display: flex; align-items: center; justify-content: flex-end; gap: var(--ca-space-sm); padding: var(--ca-space-md) var(--ca-space-lg); }
    .footer ::slotted(*) { margin: 0; }
    @keyframes overlay-fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes panel-slide-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  `;
Rt([
  l({ type: Boolean, reflect: !0 })
], qe.prototype, "open", 2);
Rt([
  l({ type: String })
], qe.prototype, "size", 2);
Rt([
  R(".panel")
], qe.prototype, "_panel", 2);
qe = Rt([
  g("ca-modal")
], qe);
var bo = Object.defineProperty, mo = Object.getOwnPropertyDescriptor, me = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? mo(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && bo(t, r, i), i;
};
let J = class extends v {
  constructor() {
    super(...arguments), this.open = !1, this.position = "right", this.size = "40%", this.heading = "", this.backdrop = !0, this.noPadding = !1, this._previouslyFocused = null, this._boundKeydown = this._handleKeydown.bind(this), this._hasFooter = !1;
  }
  updated(e) {
    e.has("open") && (this.open ? this._onOpen() : this._onClose());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._onClose();
  }
  _onOpen() {
    this._previouslyFocused = document.activeElement, document.body.style.overflow = "hidden", document.addEventListener("keydown", this._boundKeydown), this.updateComplete.then(() => {
      this._panel?.focus();
    });
  }
  _onClose() {
    document.body.style.overflow = "", document.removeEventListener("keydown", this._boundKeydown), this._previouslyFocused && (this._previouslyFocused.focus(), this._previouslyFocused = null);
  }
  _handleKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault(), this._emitClose();
      return;
    }
    e.key === "Tab" && this._trapFocus(e);
  }
  _trapFocus(e) {
    const t = this._panel;
    if (!t) return;
    const r = this._getFocusableElements(t);
    if (r.length === 0) {
      e.preventDefault();
      return;
    }
    const o = r[0], i = r[r.length - 1];
    e.shiftKey ? (document.activeElement === o || this.shadowRoot?.activeElement === o) && (e.preventDefault(), i.focus()) : (document.activeElement === i || this.shadowRoot?.activeElement === i) && (e.preventDefault(), o.focus());
  }
  _getFocusableElements(e) {
    const t = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', r = [];
    return e.querySelectorAll(t).forEach((a) => r.push(a)), e.querySelectorAll("slot").forEach((a) => {
      a.assignedElements({ flatten: !0 }).forEach((d) => {
        d.matches?.(t) && r.push(d), d.querySelectorAll(t).forEach((x) => r.push(x));
      });
    }), r;
  }
  _handleOverlayClick(e) {
    this.backdrop && e.target === e.currentTarget && this._emitClose();
  }
  _emitClose() {
    this.dispatchEvent(new CustomEvent("ca-close", { bubbles: !0, composed: !0 }));
  }
  _handleFooterSlotChange(e) {
    const t = e.target;
    this._hasFooter = t.assignedElements({ flatten: !0 }).length > 0, this.requestUpdate();
  }
  render() {
    return this.open ? n`
      <div
        class=${u({ overlay: !0, "with-backdrop": this.backdrop })}
        @click=${this._handleOverlayClick}
      >
        <aside
          class=${u({ panel: !0, [this.position]: !0 })}
          style="--drawer-size: ${this.size}"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
        >
          <div class="header">
            <span class="header-left">${this.heading}</span>
            <div class="header-right">
              <slot name="header-actions"></slot>
              <button class="close-btn" type="button" aria-label="Close" @click=${this._emitClose}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="body">
            <slot></slot>
          </div>
          <div class=${this._hasFooter ? "footer" : "footer-empty"}>
            <slot name="footer" @slotchange=${this._handleFooterSlotChange}></slot>
          </div>
        </aside>
      </div>
    ` : c;
  }
};
J.styles = b`
    :host { display: contents; }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 9000;
      display: flex;
      animation: overlay-fade-in 0.3s ease;
    }
    .overlay.with-backdrop {
      background-color: rgba(0, 0, 0, 0.4);
    }

    .panel {
      position: fixed;
      display: flex;
      flex-direction: column;
      background-color: var(--ca-surface-elevated);
      box-shadow: var(--ca-shadow-lg);
      font-family: var(--ca-font-family);
      color: var(--ca-text-primary);
      box-sizing: border-box;
      overflow: hidden;
    }

    /* Right position */
    .panel.right {
      top: 0;
      right: 0;
      height: 100%;
      width: var(--drawer-size, 40%);
      max-width: 100%;
      animation: slide-in-right 0.3s ease;
    }

    /* Bottom position */
    .panel.bottom {
      bottom: 0;
      left: 0;
      width: 100%;
      height: var(--drawer-size, 40%);
      max-height: 100%;
      animation: slide-in-bottom 0.3s ease;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ca-space-md) var(--ca-space-lg);
      border-bottom: 1px solid var(--ca-border);
      flex-shrink: 0;
      gap: 12px;
    }
    .header-left {
      font-weight: var(--ca-font-weight-semibold);
      font-size: var(--ca-font-size-lg);
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      color: var(--ca-text-secondary);
      border-radius: var(--ca-radius-sm);
      line-height: 0;
    }
    .close-btn:hover {
      color: var(--ca-text-primary);
      background: var(--ca-surface-hover);
    }

    .body {
      flex: 1;
      overflow-y: auto;
      padding: var(--ca-space-lg);
    }
    :host([no-padding]) .body {
      padding: 0;
    }

    .footer {
      border-top: 1px solid var(--ca-border);
      padding: var(--ca-space-md) var(--ca-space-lg);
      flex-shrink: 0;
    }
    .footer-empty { display: none; }

    @keyframes overlay-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slide-in-right {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    @keyframes slide-in-bottom {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
  `;
me([
  l({ type: Boolean, reflect: !0 })
], J.prototype, "open", 2);
me([
  l({ type: String })
], J.prototype, "position", 2);
me([
  l({ type: String })
], J.prototype, "size", 2);
me([
  l({ type: String })
], J.prototype, "heading", 2);
me([
  l({ type: Boolean })
], J.prototype, "backdrop", 2);
me([
  l({ type: Boolean, reflect: !0, attribute: "no-padding" })
], J.prototype, "noPadding", 2);
me([
  R(".panel")
], J.prototype, "_panel", 2);
J = me([
  g("ca-drawer")
], J);
var yo = Object.defineProperty, _o = Object.getOwnPropertyDescriptor, T = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? _o(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && yo(t, r, i), i;
};
let D = class extends v {
  constructor() {
    super(...arguments), this.size = "md", this.label = "", this.placeholder = "Placeholder text", this.options = [], this.value = "", this.loading = !1, this.borderless = !1, this.searchable = !1, this.allowCreate = !1, this._isOpen = !1, this._searchQuery = "", this._dropdownPos = { top: 0, left: 0, width: 0 }, this._boundClickOutside = this._handleClickOutside.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._boundClickOutside);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._boundClickOutside);
  }
  updated(e) {
    e.has("_isOpen") && this._isOpen && this._updateDropdownPos();
  }
  _handleClickOutside(e) {
    if (!this._isOpen) return;
    e.composedPath().includes(this) || (this._isOpen = !1);
  }
  _toggleOpen() {
    this.loading || (this._isOpen = !this._isOpen, this._isOpen ? this._updateDropdownPos() : this._searchQuery = "");
  }
  _updateDropdownPos() {
    if (!this._fieldEl) return;
    const e = this._fieldEl.getBoundingClientRect();
    this._dropdownPos = {
      top: e.bottom + 4,
      left: e.left,
      width: e.width
    };
  }
  _handleKeyDown(e) {
    e.key === "Enter" || e.key === " " ? (e.preventDefault(), this._toggleOpen()) : e.key === "Escape" && (this._isOpen = !1);
  }
  _handleSelect(e) {
    this._isOpen = !1, this._searchQuery = "", this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { value: e.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleCreate() {
    this._isOpen = !1;
    const e = this._searchQuery;
    this._searchQuery = "", this.dispatchEvent(
      new CustomEvent("ca-create", {
        detail: { value: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleSearchInput(e) {
    this._searchQuery = e.target.value;
  }
  get _filteredOptions() {
    if (!this._searchQuery) return this.options;
    const e = this._searchQuery.toLowerCase();
    return this.options.filter((t) => t.label.toLowerCase().includes(e));
  }
  get _selectedLabel() {
    return this.options.find((e) => e.value === this.value)?.label;
  }
  render() {
    if (this.loading)
      return n`
        <div class="field loading" tabindex="0">
          <div class="spinner">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      `;
    const e = this._selectedLabel;
    return n`
      <div
        class="field"
        tabindex="0"
        @click=${this._toggleOpen}
        @keydown=${this._handleKeyDown}
        role="combobox"
        aria-expanded=${this._isOpen}
        aria-haspopup="listbox"
      >
        <div class="text-area">
          ${this.label ? n`<span class="label">${this.label}</span>` : null}
          ${e ? n`<span class="value">${e}</span>` : n`<span class="value placeholder">${this.placeholder}</span>`}
        </div>
        <svg
          class=${u({ chevron: !0, open: this._isOpen })}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      ${this._isOpen ? n`
            <div class="dropdown" role="listbox" style="top:${this._dropdownPos.top}px;left:${this._dropdownPos.left}px;width:${this._dropdownPos.width}px;">
              ${this.searchable ? n`
                    <div class="search-wrapper">
                      <input
                        class="search-input"
                        type="text"
                        placeholder="Search..."
                        .value=${this._searchQuery}
                        @input=${this._handleSearchInput}
                        @click=${(t) => t.stopPropagation()}
                        @keydown=${(t) => {
      t.key === "Escape" && (this._isOpen = !1, this._searchQuery = "");
    }}
                      />
                    </div>
                  ` : null}
              <div class="options-list">
                ${this._filteredOptions.length === 0 ? n`<div class="no-results">No results</div>` : this._filteredOptions.map(
      (t) => n`
                      <button
                        class=${u({
        option: !0,
        selected: t.value === this.value
      })}
                        role="option"
                        aria-selected=${t.value === this.value}
                        @click=${() => this._handleSelect(t)}
                      >
                        <span class="option-text">${t.label}</span>
                        ${t.value === this.value ? n`
                              <svg
                                class="check-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 13L9 17L19 7"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            ` : null}
                      </button>
                    `
    )}
              </div>
              ${this.allowCreate && this._searchQuery && this._filteredOptions.length === 0 ? n`
                    <button class="create-btn" @click=${() => this._handleCreate()}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                      </svg>
                      Create "${this._searchQuery}"
                    </button>
                  ` : null}
            </div>
          ` : null}
    `;
  }
};
D.styles = b`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      position: relative;
      width: 100%;
    }
    .field {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--ca-border-strong);
      border-radius: 8px;
      background-color: var(--ca-surface);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      cursor: pointer;
      box-sizing: border-box;
      transition: border-color 0.15s ease;
    }
    .field:hover {
      border-color: var(--ca-text-primary);
    }
    .field:focus-visible,
    .field:focus {
      outline: none;
      border: 2px solid var(--ca-text-primary);
    }
    :host([borderless]) .field {
      border-color: transparent;
      background-color: transparent;
    }
    :host([borderless]) .field:hover {
      border-color: var(--ca-text-primary);
    }
    :host([borderless]) .field:focus-visible,
    :host([borderless]) .field:focus {
      border: 2px solid var(--ca-text-primary);
    }
    .field.loading {
      justify-content: center;
      pointer-events: none;
    }
    :host([size='xs']) .field { padding: 6px 8px; gap: 8px; font-size: var(--ca-font-size-xs); border-radius: 6px; }
    :host([size='xs']) .label { font-size: 9px; }
    :host([size='xs']) .value { font-size: var(--ca-font-size-xs); }
    :host([size='xs']) .chevron { width: 12px; height: 12px; }
    :host([size='xs']) .dropdown { border-radius: 6px; }
    :host([size='xs']) .option { padding: 6px 8px; font-size: var(--ca-font-size-xs); gap: 8px; }
    :host([size='xs']) .check-icon { width: 14px; height: 14px; }

    :host([size='sm']) .field { padding: 8px 10px; gap: 10px; font-size: var(--ca-font-size-sm); border-radius: 6px; }
    :host([size='sm']) .label { font-size: 10px; }
    :host([size='sm']) .value { font-size: var(--ca-font-size-sm); }
    :host([size='sm']) .chevron { width: 14px; height: 14px; }
    :host([size='sm']) .dropdown { border-radius: 6px; }
    :host([size='sm']) .option { padding: 8px 10px; font-size: var(--ca-font-size-sm); gap: 10px; }
    :host([size='sm']) .check-icon { width: 18px; height: 18px; }

    :host([size='lg']) .field { padding: 14px 14px; gap: 14px; font-size: var(--ca-font-size-lg); border-radius: 10px; }
    :host([size='lg']) .label { font-size: 13px; }
    :host([size='lg']) .value { font-size: var(--ca-font-size-lg); }
    :host([size='lg']) .chevron { width: 18px; height: 18px; }
    :host([size='lg']) .dropdown { border-radius: 10px; }
    :host([size='lg']) .option { padding: 14px 14px; font-size: var(--ca-font-size-lg); gap: 14px; }
    :host([size='lg']) .check-icon { width: 26px; height: 26px; }

    :host([size='xl']) .field { padding: 18px 16px; gap: 16px; font-size: 20px; border-radius: 12px; }
    :host([size='xl']) .label { font-size: 14px; }
    :host([size='xl']) .value { font-size: 20px; }
    :host([size='xl']) .chevron { width: 20px; height: 20px; }
    :host([size='xl']) .dropdown { border-radius: 12px; }
    :host([size='xl']) .option { padding: 18px 16px; font-size: 20px; gap: 16px; }
    :host([size='xl']) .check-icon { width: 28px; height: 28px; }
    .text-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }
    .label {
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 12px;
      color: var(--ca-text-muted);
      line-height: 1;
    }
    .value {
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      line-height: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .placeholder {
      color: var(--ca-text-secondary);
    }
    .chevron {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      color: var(--ca-text-primary);
      transition: transform 0.2s ease;
    }
    .chevron.open {
      transform: rotate(180deg);
    }
    .dropdown {
      position: fixed;
      z-index: 9999;
      background-color: var(--ca-surface);
      border: 1px solid var(--ca-border-strong);
      border-radius: 8px;
      box-shadow: var(--ca-shadow-menu);
      overflow: hidden;
      max-height: 280px;
      display: flex;
      flex-direction: column;
    }
    .search-wrapper {
      padding: 10px 12px;
      border-bottom: 1px solid var(--ca-border);
      flex-shrink: 0;
    }
    .search-input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      box-sizing: border-box;
    }
    .search-input::placeholder { color: var(--ca-text-muted); }
    .options-list {
      overflow-y: auto;
      flex: 1;
    }
    .no-results {
      padding: 12px;
      text-align: center;
      color: var(--ca-text-muted);
      font-size: var(--ca-font-size-sm);
    }
    .create-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 10px 12px;
      background: none;
      border: none;
      border-top: 1px solid var(--ca-border);
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-color-primary);
      text-align: left;
      box-sizing: border-box;
    }
    .create-btn:hover { background-color: var(--ca-surface-hover); }
    .option {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 10px 12px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      text-align: left;
      box-sizing: border-box;
    }
    .option:hover {
      background-color: var(--ca-surface-hover);
    }
    .option.selected {
      background-color: var(--ca-surface-hover);
    }
    .option-text {
      flex: 1;
    }
    .check-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      color: var(--ca-text-muted);
    }
    .spinner {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--ca-border-strong);
      animation: ca-select-pulse 1.4s ease-in-out infinite;
    }
    .dot:nth-child(2) {
      animation-delay: 0.2s;
    }
    .dot:nth-child(3) {
      animation-delay: 0.4s;
    }
    @keyframes ca-select-pulse {
      0%,
      80%,
      100% {
        opacity: 0.3;
        transform: scale(0.8);
      }
      40% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;
T([
  l({ type: String, reflect: !0 })
], D.prototype, "size", 2);
T([
  l({ type: String })
], D.prototype, "label", 2);
T([
  l({ type: String })
], D.prototype, "placeholder", 2);
T([
  l({ type: Array })
], D.prototype, "options", 2);
T([
  l({ type: String })
], D.prototype, "value", 2);
T([
  l({ type: Boolean })
], D.prototype, "loading", 2);
T([
  l({ type: Boolean, reflect: !0 })
], D.prototype, "borderless", 2);
T([
  l({ type: Boolean })
], D.prototype, "searchable", 2);
T([
  l({ type: Boolean, attribute: "allow-create" })
], D.prototype, "allowCreate", 2);
T([
  h()
], D.prototype, "_isOpen", 2);
T([
  h()
], D.prototype, "_searchQuery", 2);
T([
  h()
], D.prototype, "_dropdownPos", 2);
T([
  R(".field")
], D.prototype, "_fieldEl", 2);
D = T([
  g("ca-select")
], D);
var wo = Object.defineProperty, $o = Object.getOwnPropertyDescriptor, P = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? $o(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && wo(t, r, i), i;
};
let S = class extends v {
  constructor() {
    super(...arguments), this.size = "md", this.label = "", this.placeholder = "Select...", this.options = [], this.value = [], this.loading = !1, this.disabled = !1, this.searchable = !1, this.maxVisibleChips = 3, this.allowCreate = !1, this._isOpen = !1, this._searchQuery = "", this._boundClickOutside = this._handleClickOutside.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._boundClickOutside);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._boundClickOutside);
  }
  _handleClickOutside(e) {
    if (!this._isOpen) return;
    e.composedPath().includes(this) || (this._isOpen = !1, this._searchQuery = "");
  }
  _toggleOpen() {
    this.loading || this.disabled || (this._isOpen = !this._isOpen, this._isOpen ? this.searchable && this.updateComplete.then(() => this._searchInput?.focus()) : this._searchQuery = "");
  }
  _handleFieldKeyDown(e) {
    e.key === "Enter" || e.key === " " ? (e.preventDefault(), this._toggleOpen()) : e.key === "Escape" && (this._isOpen = !1, this._searchQuery = "");
  }
  _handleOptionToggle(e, t) {
    t.stopPropagation();
    const r = [...this.value], o = r.indexOf(e.value);
    o >= 0 ? r.splice(o, 1) : r.push(e.value), this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { value: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleRemoveChip(e, t) {
    t.stopPropagation();
    const r = this.value.filter((o) => o !== e);
    this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { value: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleClearAll(e) {
    e.stopPropagation(), this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { value: [] },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleSearchInput(e) {
    this._searchQuery = e.target.value;
  }
  get _filteredOptions() {
    if (!this._searchQuery) return this.options;
    const e = this._searchQuery.toLowerCase();
    return this.options.filter((t) => t.label.toLowerCase().includes(e));
  }
  get _selectedLabels() {
    const e = /* @__PURE__ */ new Map();
    for (const t of this.options)
      this.value.includes(t.value) && e.set(t.value, t.label);
    return e;
  }
  render() {
    if (this.loading)
      return n`
        <div class="field loading" tabindex="0">
          <div class="spinner">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      `;
    const e = this._selectedLabels, t = e.size > 0;
    return n`
      <div
        class=${u({ field: !0, disabled: this.disabled })}
        tabindex=${this.disabled ? "-1" : "0"}
        @click=${this._toggleOpen}
        @keydown=${this._handleFieldKeyDown}
        role="combobox"
        aria-expanded=${this._isOpen}
        aria-haspopup="listbox"
      >
        <div class="text-area">
          ${this.label ? n`<span class="label">${this.label}</span>` : c}
          ${t ? this._renderChips(e) : n`<span class="value placeholder">${this.placeholder}</span>`}
        </div>
        ${t ? n`
              <button class="clear-btn" @click=${this._handleClearAll} aria-label="Clear all" tabindex="-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            ` : c}
        <svg
          class=${u({ chevron: !0, open: this._isOpen })}
          viewBox="0 0 16 16" fill="none"
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      ${this._isOpen ? this._renderDropdown() : c}
    `;
  }
  _renderChips(e) {
    const t = [...e.entries()], r = t.slice(0, this.maxVisibleChips), o = t.length - r.length;
    return n`
      <div class="chips-area">
        ${r.map(
      ([i, a]) => n`
            <span class="chip">
              <span class="chip-label">${a}</span>
              <button class="chip-remove" @click=${(s) => this._handleRemoveChip(i, s)} aria-label="Remove ${a}" tabindex="-1">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </span>
          `
    )}
        ${o > 0 ? n`<span class="overflow-count">+${o}</span>` : c}
      </div>
    `;
  }
  _renderDropdown() {
    const e = this._filteredOptions;
    return n`
      <div class="dropdown" role="listbox" aria-multiselectable="true">
        ${this.searchable ? n`
              <div class="search-wrapper">
                <input
                  class="search-input"
                  type="text"
                  placeholder="Search..."
                  .value=${this._searchQuery}
                  @input=${this._handleSearchInput}
                  @click=${(t) => t.stopPropagation()}
                  @keydown=${(t) => {
      t.key === "Escape" && (this._isOpen = !1, this._searchQuery = "");
    }}
                />
              </div>
            ` : c}
        <div class="options-list">
          ${e.length === 0 ? n`<div class="no-results">No results</div>` : e.map((t) => {
      const r = this.value.includes(t.value);
      return n`
                  <button
                    class=${u({ option: !0, selected: r })}
                    role="option"
                    aria-selected=${r}
                    @click=${(o) => this._handleOptionToggle(t, o)}
                  >
                    <span class=${u({ "checkbox-box": !0, checked: r })}>
                      ${r ? n`<svg viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` : c}
                    </span>
                    <span class="option-text">${t.label}</span>
                  </button>
                `;
    })}
        </div>
        ${this.allowCreate && this._searchQuery && this._filteredOptions.length === 0 ? n`
              <button class="create-btn" @click=${(t) => {
      t.stopPropagation(), this._handleCreate();
    }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                Create "${this._searchQuery}"
              </button>
            ` : c}
      </div>
    `;
  }
  _handleCreate() {
    const e = this._searchQuery;
    this._searchQuery = "", this.dispatchEvent(
      new CustomEvent("ca-create", {
        detail: { value: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
};
S.styles = b`
    :host {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      position: relative;
      width: 100%;
    }

    /* ── Field ── */
    .field {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--ca-border-strong);
      border-radius: 8px;
      background-color: var(--ca-surface);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      cursor: pointer;
      box-sizing: border-box;
      transition: border-color 0.15s ease;
      min-height: 0;
    }
    .field:hover { border-color: var(--ca-text-primary); }
    .field:focus-visible,
    .field:focus { outline: none; border: 2px solid var(--ca-text-primary); }
    .field.loading { justify-content: center; pointer-events: none; }

    /* ── XS ── */
    :host([size='xs']) .field { padding: 6px 8px; gap: 8px; font-size: var(--ca-font-size-xs); border-radius: 6px; }
    :host([size='xs']) .label { font-size: 9px; }
    :host([size='xs']) .value,
    :host([size='xs']) .chips-area { font-size: var(--ca-font-size-xs); }
    :host([size='xs']) .chip { padding: 1px 5px; font-size: 10px; gap: 3px; }
    :host([size='xs']) .chip-remove { width: 12px; height: 12px; }
    :host([size='xs']) .chip-remove svg { width: 8px; height: 8px; }
    :host([size='xs']) .chevron { width: 12px; height: 12px; }
    :host([size='xs']) .option { padding: 6px 8px; font-size: var(--ca-font-size-xs); gap: 6px; }
    :host([size='xs']) .dropdown { border-radius: 6px; }
    :host([size='xs']) .search-input { font-size: var(--ca-font-size-xs); }
    :host([size='xs']) .search-wrapper { padding: 6px 8px; }
    :host([size='xs']) .checkbox-box { width: 13px; height: 13px; border-radius: 3px; }
    :host([size='xs']) .checkbox-box svg { width: 8px; height: 8px; }

    /* ── SM ── */
    :host([size='sm']) .field { padding: 8px 10px; gap: 10px; font-size: var(--ca-font-size-sm); border-radius: 6px; }
    :host([size='sm']) .label { font-size: 10px; }
    :host([size='sm']) .value,
    :host([size='sm']) .chips-area { font-size: var(--ca-font-size-sm); }
    :host([size='sm']) .chip { padding: 2px 6px; font-size: 11px; gap: 3px; }
    :host([size='sm']) .chip-remove { width: 14px; height: 14px; }
    :host([size='sm']) .chip-remove svg { width: 8px; height: 8px; }
    :host([size='sm']) .chevron { width: 14px; height: 14px; }
    :host([size='sm']) .option { padding: 8px 10px; font-size: var(--ca-font-size-sm); gap: 8px; }
    :host([size='sm']) .dropdown { border-radius: 6px; }
    :host([size='sm']) .search-input { font-size: var(--ca-font-size-sm); }
    :host([size='sm']) .search-wrapper { padding: 8px 10px; }
    :host([size='sm']) .checkbox-box { width: 14px; height: 14px; border-radius: 3px; }
    :host([size='sm']) .checkbox-box svg { width: 9px; height: 9px; }

    /* ── LG ── */
    :host([size='lg']) .field { padding: 14px 14px; gap: 14px; font-size: var(--ca-font-size-lg); border-radius: 10px; }
    :host([size='lg']) .label { font-size: 13px; }
    :host([size='lg']) .value,
    :host([size='lg']) .chips-area { font-size: var(--ca-font-size-lg); }
    :host([size='lg']) .chip { padding: 4px 10px; font-size: 14px; }
    :host([size='lg']) .chevron { width: 18px; height: 18px; }
    :host([size='lg']) .option { padding: 14px 14px; font-size: var(--ca-font-size-lg); }
    :host([size='lg']) .dropdown { border-radius: 10px; }
    :host([size='lg']) .search-input { font-size: var(--ca-font-size-lg); }
    :host([size='lg']) .search-wrapper { padding: 14px; }
    :host([size='lg']) .checkbox-box { width: 20px; height: 20px; }

    /* ── XL ── */
    :host([size='xl']) .field { padding: 18px 16px; gap: 16px; font-size: 20px; border-radius: 12px; }
    :host([size='xl']) .label { font-size: 14px; }
    :host([size='xl']) .value,
    :host([size='xl']) .chips-area { font-size: 20px; }
    :host([size='xl']) .chip { padding: 5px 12px; font-size: 15px; }
    :host([size='xl']) .chevron { width: 20px; height: 20px; }
    :host([size='xl']) .option { padding: 18px 16px; font-size: 20px; }
    :host([size='xl']) .dropdown { border-radius: 12px; }
    :host([size='xl']) .search-input { font-size: 20px; }
    :host([size='xl']) .search-wrapper { padding: 16px; }
    :host([size='xl']) .checkbox-box { width: 22px; height: 22px; }

    /* ── Text area / value ── */
    .text-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }
    .label {
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 12px;
      color: var(--ca-text-muted);
      line-height: 1;
    }
    .value {
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      line-height: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .placeholder { color: var(--ca-text-secondary); }

    /* ── Chips in field ── */
    .chips-area {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      min-width: 0;
      align-items: center;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      background-color: var(--ca-surface-active);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-full);
      font-family: var(--ca-font-family);
      font-size: 12px;
      color: var(--ca-text-primary);
      line-height: 1.3;
      white-space: nowrap;
      max-width: 100%;
    }
    .chip-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .chip-remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      color: var(--ca-text-muted);
      border-radius: 50%;
      flex-shrink: 0;
    }
    .chip-remove:hover {
      color: var(--ca-text-primary);
      background-color: var(--ca-surface-hover);
    }
    .overflow-count {
      font-size: 12px;
      color: var(--ca-text-muted);
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* ── Chevron ── */
    .chevron {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      color: var(--ca-text-primary);
      transition: transform 0.2s ease;
    }
    .chevron.open { transform: rotate(180deg); }

    /* ── Dropdown ── */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 10;
      margin-top: 4px;
      background-color: var(--ca-surface);
      border: 1px solid var(--ca-border-strong);
      border-radius: 8px;
      box-shadow: var(--ca-shadow-menu);
      overflow: hidden;
      max-height: 280px;
      display: flex;
      flex-direction: column;
    }

    /* ── Search ── */
    .search-wrapper {
      padding: 10px 12px;
      border-bottom: 1px solid var(--ca-border);
      flex-shrink: 0;
    }
    .search-input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      box-sizing: border-box;
    }
    .search-input::placeholder { color: var(--ca-text-muted); }

    /* ── Options ── */
    .options-list {
      overflow-y: auto;
      flex: 1;
    }
    .option {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 12px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      text-align: left;
      box-sizing: border-box;
      transition: background-color var(--ca-transition-fast);
    }
    .option:hover { background-color: var(--ca-surface-hover); }
    .option.selected { background-color: var(--ca-surface-hover); }

    /* ── Checkbox ── */
    .checkbox-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border: 1.5px solid var(--ca-border-strong);
      border-radius: 4px;
      flex-shrink: 0;
      transition: background-color var(--ca-transition-fast), border-color var(--ca-transition-fast);
    }
    .checkbox-box.checked {
      background-color: var(--ca-color-secondary);
      border-color: var(--ca-color-secondary);
    }
    .checkbox-box svg {
      width: 10px;
      height: 10px;
      color: var(--ca-color-white);
    }

    .option-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .no-results {
      padding: 12px;
      text-align: center;
      color: var(--ca-text-muted);
      font-size: var(--ca-font-size-sm);
    }
    .create-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 10px 12px;
      background: none;
      border: none;
      border-top: 1px solid var(--ca-border);
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-color-primary);
      text-align: left;
      box-sizing: border-box;
      flex-shrink: 0;
    }
    .create-btn:hover { background-color: var(--ca-surface-hover); }

    /* ── Clear all ── */
    .clear-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--ca-text-muted);
      flex-shrink: 0;
      border-radius: var(--ca-radius-sm);
      width: 20px;
      height: 20px;
    }
    .clear-btn:hover { color: var(--ca-text-primary); background: var(--ca-surface-hover); }

    /* ── Spinner ── */
    .spinner { display: flex; align-items: center; gap: 6px; }
    .dot {
      width: 8px; height: 8px; border-radius: 50%;
      background-color: var(--ca-border-strong);
      animation: ca-ms-pulse 1.4s ease-in-out infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes ca-ms-pulse {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1); }
    }
  `;
P([
  l({ type: String, reflect: !0 })
], S.prototype, "size", 2);
P([
  l({ type: String })
], S.prototype, "label", 2);
P([
  l({ type: String })
], S.prototype, "placeholder", 2);
P([
  l({ type: Array })
], S.prototype, "options", 2);
P([
  l({ type: Array, attribute: !1 })
], S.prototype, "value", 2);
P([
  l({ type: Boolean })
], S.prototype, "loading", 2);
P([
  l({ type: Boolean })
], S.prototype, "disabled", 2);
P([
  l({ type: Boolean })
], S.prototype, "searchable", 2);
P([
  l({ type: Number, attribute: "max-visible-chips" })
], S.prototype, "maxVisibleChips", 2);
P([
  l({ type: Boolean, attribute: "allow-create" })
], S.prototype, "allowCreate", 2);
P([
  h()
], S.prototype, "_isOpen", 2);
P([
  h()
], S.prototype, "_searchQuery", 2);
P([
  R(".field")
], S.prototype, "_fieldEl", 2);
P([
  R(".search-input")
], S.prototype, "_searchInput", 2);
S = P([
  g("ca-multi-select")
], S);
var ko = Object.defineProperty, zo = Object.getOwnPropertyDescriptor, ye = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? zo(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && ko(t, r, i), i;
};
const Co = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>', Oo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4l-4 4 4 4"/></svg>', So = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l4 4-4 4"/></svg>';
let Z = class extends v {
  constructor() {
    super(...arguments), this.collapsed = !1, this.activeId = "", this.profile = null, this.sections = [], this._openDropdowns = /* @__PURE__ */ new Set(), this._tooltip = null, this._popover = null, this._boundClickOutside = this._handleClickOutside.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._boundClickOutside);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._boundClickOutside);
  }
  _handleClickOutside(e) {
    this._popover && !this.contains(e.target) && (this._popover = null);
  }
  _navigate(e) {
    this.dispatchEvent(
      new CustomEvent("ca-navigate", {
        detail: { id: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _toggleCollapse() {
    this.dispatchEvent(
      new CustomEvent("ca-toggle", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  _toggleDropdown(e) {
    const t = new Set(this._openDropdowns);
    t.has(e) ? t.delete(e) : t.add(e), this._openDropdowns = t;
  }
  _isItemActive(e) {
    return e.id === this.activeId ? !0 : e.children ? e.children.some((t) => t.id === this.activeId) : !1;
  }
  _handleMouseEnter(e, t) {
    if (!this.collapsed) return;
    const r = t.currentTarget, o = this.getBoundingClientRect(), i = r.getBoundingClientRect(), a = i.top - o.top + i.height / 2;
    e.children && e.children.length > 0 ? (this._tooltip = null, this._popover = { id: e.id, top: i.top - o.top, items: e.children }) : (this._popover = null, this._tooltip = { id: e.id, top: a });
  }
  _handleMouseLeave() {
    this.collapsed && (this._tooltip = null);
  }
  _handleItemClick(e) {
    if (e.children && e.children.length > 0) {
      if (this.collapsed)
        return;
      this._toggleDropdown(e.id);
    } else
      this._navigate(e.id);
  }
  _renderProfile() {
    return this.profile ? n`
      <div class="profile">
        ${this.profile.avatar ? n`<img class="avatar" src=${this.profile.avatar} alt=${this.profile.name} />` : n`<div class="avatar-placeholder"></div>`}
        ${this.collapsed ? c : n`
              <div class="profile-text">
                ${this.profile.role ? n`<span class="profile-role">${this.profile.role}</span>` : c}
                <span class="profile-name">${this.profile.name}</span>
              </div>
            `}
      </div>
      <div class="divider-line"></div>
    ` : c;
  }
  _renderSubItems(e) {
    return !e.children || e.children.length === 0 || this.collapsed || !this._openDropdowns.has(e.id) ? c : n`
      <div class="sub-items">
        <div class="sub-line"></div>
        <div class="sub-list">
          ${e.children.map(
      (t) => n`
              <button
                class=${u({
        "sub-link": !0,
        active: t.id === this.activeId
      })}
                @click=${() => this._navigate(t.id)}
              >
                <span class="sub-radius"></span>
                ${t.label}
              </button>
            `
    )}
        </div>
      </div>
    `;
  }
  _renderItem(e) {
    const t = e.children && e.children.length > 0, r = this._openDropdowns.has(e.id), o = this._isItemActive(e);
    return n`
      <div class="item-group">
        <button
          class=${u({
      "nav-link": !0,
      active: o,
      danger: !!e.danger
    })}
          @click=${() => this._handleItemClick(e)}
          @mouseenter=${(i) => this._handleMouseEnter(e, i)}
          @mouseleave=${() => this._handleMouseLeave()}
        >
          ${e.icon ? n`<span class="nav-icon">${Oe(e.icon)}</span>` : c}
          ${this.collapsed ? c : n`<span class="nav-label">${e.label}</span>`}
          ${t && !this.collapsed ? n`
                <span
                  class=${u({
      "nav-chevron": !0,
      "chevron-open": r
    })}
                >
                  ${Oe(Co)}
                </span>
              ` : c}
        </button>
        ${this._renderSubItems(e)}
      </div>
    `;
  }
  _renderSection(e, t) {
    return n`
      <div
        class=${u({
      section: !0,
      "section-grow": !!e.grow
    })}
      >
        ${e.title ? n`
              <div class="section-title">
                <span>${e.title}</span>
              </div>
            ` : c}
        ${e.items.map((r) => this._renderItem(r))}
      </div>
    `;
  }
  _renderTooltip() {
    return !this._tooltip || !this.collapsed ? c : n`
      <div class="tooltip" style="top: ${this._tooltip.top}px;">
        <div class="tooltip-arrow"></div>
        <span class="tooltip-text">
          ${this._getItemLabel(this._tooltip.id)}
        </span>
      </div>
    `;
  }
  _renderPopover() {
    return !this._popover || !this.collapsed ? c : n`
      <div class="popover" style="top: ${this._popover.top}px;">
        ${this._popover.items.map(
      (e) => n`
            <button
              class=${u({
        "popover-link": !0,
        active: e.id === this.activeId
      })}
              @click=${() => {
        this._navigate(e.id), this._popover = null;
      }}
            >
              ${e.label}
            </button>
          `
    )}
      </div>
    `;
  }
  _getItemLabel(e) {
    for (const t of this.sections)
      for (const r of t.items)
        if (r.id === e) return r.label;
    return "";
  }
  render() {
    return n`
      <button
        class="toggle-btn"
        @click=${this._toggleCollapse}
        aria-label=${this.collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        ${this.collapsed ? Oe(So) : Oe(Oo)}
      </button>

      ${this._renderProfile()}
      ${this.sections.map((e, t) => this._renderSection(e, t))}
      ${this._renderTooltip()}
      ${this._renderPopover()}
    `;
  }
};
Z.styles = b`
    :host {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 24px;
      background-color: var(--ca-surface);
      border-right: 1px solid var(--ca-border);
      font-family: "Inter", var(--ca-font-family);
      position: relative;
      box-sizing: border-box;
      height: 100%;
      transition: width 0.2s ease;
    }
    :host(:not([collapsed])) {
      width: var(--ca-sidenav-width, 256px);
    }
    :host([collapsed]) {
      width: 92px;
      align-items: center;
    }

    /* Profile */
    .profile {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
    }
    .avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }
    .avatar-placeholder {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: var(--ca-surface-active);
      flex-shrink: 0;
    }
    .profile-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
      min-width: 0;
    }
    .profile-role {
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      line-height: 12px;
      color: var(--ca-text-secondary);
    }
    .profile-name {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: var(--ca-text-primary);
    }
    .divider-line {
      width: 100%;
      height: 2px;
      border-radius: 2px;
      background-color: var(--ca-surface-active);
      flex-shrink: 0;
    }

    /* Sections */
    .section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }
    .section + .section {
      border-top: 2px solid var(--ca-surface-active);
      padding-top: 24px;
    }
    .section-grow {
      flex: 1;
      min-height: 0;
    }
    .section-title {
      padding: 0 12px;
    }
    .section-title span {
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      line-height: 12px;
      color: var(--ca-text-secondary);
    }
    :host([collapsed]) .section-title {
      padding: 0;
      text-align: center;
    }
    :host([collapsed]) .section {
      align-items: center;
    }

    /* Nav Link */
    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: var(--ca-radius-md);
      border: none;
      background: none;
      cursor: pointer;
      width: 100%;
      text-align: left;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -0.28px;
      color: var(--ca-text-secondary);
      transition: background-color 0.15s ease, color 0.15s ease;
      box-sizing: border-box;
    }
    .nav-link:hover {
      background-color: var(--ca-surface-hover);
    }
    .nav-link.active {
      background-color: var(--ca-surface-active);
      color: var(--ca-text-primary);
    }
    .nav-link.danger {
      color: var(--ca-text-danger);
    }
    .nav-link:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: -2px;
    }
    :host([collapsed]) .nav-link {
      width: auto;
      padding: 10px 12px;
    }
    .nav-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: inherit;
    }
    .nav-icon svg {
      width: 20px;
      height: 20px;
    }
    .nav-label {
      flex: 1;
      min-width: 0;
    }
    .nav-chevron {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      transition: transform 0.2s ease;
      color: inherit;
    }
    .nav-chevron svg {
      width: 16px;
      height: 16px;
    }
    .chevron-open {
      transform: rotate(180deg);
    }

    /* Sub Items */
    .sub-items {
      display: flex;
      gap: 0;
      padding-left: 32px;
      position: relative;
    }
    .sub-line {
      position: absolute;
      left: 20px;
      top: 0;
      bottom: 16px;
      width: 2px;
      background-color: var(--ca-surface-active);
    }
    .sub-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
    }
    .sub-link {
      display: flex;
      align-items: center;
      gap: 0;
      padding: 8px 12px;
      border-radius: var(--ca-radius-md);
      border: none;
      background: none;
      cursor: pointer;
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: -0.24px;
      color: var(--ca-text-secondary);
      width: 100%;
      text-align: left;
      position: relative;
      transition: background-color 0.15s ease, color 0.15s ease;
      box-sizing: border-box;
    }
    .sub-link:hover {
      background-color: var(--ca-surface-hover);
    }
    .sub-link.active {
      background-color: var(--ca-surface-active);
      color: var(--ca-text-primary);
    }
    .sub-link:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: -2px;
    }
    .sub-radius {
      position: absolute;
      left: -13px;
      top: 50%;
      transform: translateY(-50%);
      width: 13px;
      height: 8px;
      border-left: 2px solid var(--ca-surface-active);
      border-bottom: 2px solid var(--ca-surface-active);
      border-bottom-left-radius: 8px;
    }
    .item-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }
    :host([collapsed]) .item-group {
      width: auto;
    }

    /* Toggle Button */
    .toggle-btn {
      position: absolute;
      right: -15px;
      top: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: var(--ca-radius-md);
      border: 1px solid var(--ca-surface-active);
      background-color: var(--ca-surface);
      cursor: pointer;
      color: var(--ca-text-secondary);
      transition: background-color 0.15s ease;
      z-index: 5;
    }
    .toggle-btn:hover {
      background-color: var(--ca-surface-hover);
    }
    .toggle-btn:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 2px;
    }
    .toggle-btn svg {
      width: 16px;
      height: 16px;
    }

    /* Tooltip */
    .tooltip {
      position: absolute;
      left: calc(100% + 8px);
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      z-index: 20;
      pointer-events: none;
    }
    .tooltip-arrow {
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: 6px solid var(--ca-text-primary);
      flex-shrink: 0;
    }
    .tooltip-text {
      display: block;
      padding: 10px 12px;
      border-radius: var(--ca-radius-sm);
      background-color: var(--ca-text-primary);
      color: var(--ca-surface);
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      white-space: nowrap;
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.25);
    }

    /* Popover */
    .popover {
      position: absolute;
      left: calc(100% + 8px);
      z-index: 20;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px;
      width: 172px;
      background-color: var(--ca-surface-elevated);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-lg);
      box-shadow: 0px 100px 80px 0px rgba(0, 0, 0, 0.07),
        0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.05);
    }
    .popover-link {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      border-radius: var(--ca-radius-md);
      border: none;
      background: none;
      cursor: pointer;
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: -0.24px;
      color: var(--ca-text-secondary);
      width: 100%;
      text-align: left;
      transition: background-color 0.15s ease, color 0.15s ease;
      box-sizing: border-box;
    }
    .popover-link:hover {
      background-color: var(--ca-surface-hover);
    }
    .popover-link.active {
      background-color: var(--ca-surface-active);
      color: var(--ca-text-primary);
    }
  `;
ye([
  l({ type: Boolean, reflect: !0 })
], Z.prototype, "collapsed", 2);
ye([
  l({ type: String, attribute: "active-id" })
], Z.prototype, "activeId", 2);
ye([
  l({ type: Object })
], Z.prototype, "profile", 2);
ye([
  l({ type: Array })
], Z.prototype, "sections", 2);
ye([
  h()
], Z.prototype, "_openDropdowns", 2);
ye([
  h()
], Z.prototype, "_tooltip", 2);
ye([
  h()
], Z.prototype, "_popover", 2);
Z = ye([
  g("ca-sidenav")
], Z);
var Do = Object.defineProperty, Eo = Object.getOwnPropertyDescriptor, V = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Eo(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Do(t, r, i), i;
};
let M = class extends v {
  constructor() {
    super(...arguments), this.variant = "primary", this.size = "md", this.options = [], this.value = "", this.label = "", this.loading = !1, this.disabled = !1, this._isOpen = !1, this._focusedIndex = -1, this._boundClickOutside = this._handleClickOutside.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._boundClickOutside);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._boundClickOutside);
  }
  _handleClickOutside(e) {
    if (!this._isOpen) return;
    e.composedPath().includes(this) || (this._isOpen = !1, this._focusedIndex = -1);
  }
  _handleMainClick() {
    this.dispatchEvent(new CustomEvent("ca-click", { bubbles: !0, composed: !0 }));
  }
  _toggleDropdown() {
    this._isOpen = !this._isOpen, this._focusedIndex = -1;
  }
  _selectOption(e) {
    this.dispatchEvent(new CustomEvent("ca-change", { bubbles: !0, composed: !0, detail: { value: e.value } })), this._isOpen = !1, this._focusedIndex = -1;
  }
  _handleTriggerKeydown(e) {
    e.key === "Enter" || e.key === " " ? (e.preventDefault(), this._toggleDropdown()) : e.key === "Escape" ? (this._isOpen = !1, this._focusedIndex = -1) : e.key === "ArrowDown" && (e.preventDefault(), this._isOpen || (this._isOpen = !0), this._focusedIndex = 0, this.updateComplete.then(() => this._focusOption(0)));
  }
  _handleDropdownKeydown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const t = Math.min(this._focusedIndex + 1, this.options.length - 1);
      this._focusedIndex = t, this._focusOption(t);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const t = Math.max(this._focusedIndex - 1, 0);
      this._focusedIndex = t, this._focusOption(t);
    } else e.key === "Enter" || e.key === " " ? (e.preventDefault(), this._focusedIndex >= 0 && this._focusedIndex < this.options.length && this._selectOption(this.options[this._focusedIndex])) : e.key === "Escape" && (this._isOpen = !1, this._focusedIndex = -1, this._triggerEl?.focus());
  }
  _focusOption(e) {
    this.updateComplete.then(() => {
      this.shadowRoot?.querySelectorAll(".option")?.[e]?.focus();
    });
  }
  _renderCheckIcon() {
    return n`<svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  }
  _renderChevron() {
    return n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
  }
  render() {
    return n`
      <button
        class="main-button"
        ?disabled=${this.disabled}
        @click=${this._handleMainClick}
      >
        ${this.loading ? n`<span class="spinner"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>` : this.label}
      </button>
      <span class="divider"></span>
      <button
        class="dropdown-trigger"
        ?disabled=${this.disabled}
        @click=${this._toggleDropdown}
        @keydown=${this._handleTriggerKeydown}
        aria-haspopup="listbox"
        aria-expanded=${this._isOpen}
      >
        <span class=${u({ chevron: !0, open: this._isOpen })}>
          ${this._renderChevron()}
        </span>
      </button>
      ${this._isOpen ? n`
            <div class="dropdown" role="listbox" @keydown=${this._handleDropdownKeydown}>
              ${this.options.map(
      (e, t) => n`
                  <button
                    class=${u({ option: !0, selected: e.value === this.value })}
                    role="option"
                    aria-selected=${e.value === this.value}
                    tabindex=${t === this._focusedIndex ? "0" : "-1"}
                    @click=${() => this._selectOption(e)}
                  >
                    <span class="option-text">${e.label}</span>
                    ${e.value === this.value ? this._renderCheckIcon() : c}
                  </button>
                `
    )}
            </div>
          ` : c}
    `;
  }
};
M.styles = b`
    :host { display: inline-flex; align-items: stretch; position: relative; }
    .main-button, .dropdown-trigger { display: inline-flex; align-items: center; justify-content: center; gap: 4px; cursor: pointer; font-family: var(--ca-font-family); font-weight: var(--ca-font-weight-semibold); line-height: 1; white-space: nowrap; transition: background-color 0.15s ease, opacity 0.15s ease; box-sizing: border-box; }
    .main-button { border-radius: var(--ca-radius-button) 0 0 var(--ca-radius-button); }
    .dropdown-trigger { border-radius: 0 var(--ca-radius-button) var(--ca-radius-button) 0; }
    .divider { width: 1px; align-self: center; height: 60%; flex-shrink: 0; }
    /* Size: xs */
    :host([size="xs"]) .main-button { padding: 6px 12px; font-size: 11px; }
    :host([size="xs"]) .dropdown-trigger { padding: 6px 8px; }
    /* Size: sm */
    :host([size="sm"]) .main-button { padding: 8px 16px; font-size: 13px; }
    :host([size="sm"]) .dropdown-trigger { padding: 8px 10px; }
    /* Size: md (default) */
    .main-button { padding: 14px 24px; font-size: 13px; }
    .dropdown-trigger { padding: 14px 12px; }
    /* Size: lg */
    :host([size="lg"]) .main-button { padding: 16px 32px; font-size: 16px; }
    :host([size="lg"]) .dropdown-trigger { padding: 16px 16px; }
    /* Size: xl */
    :host([size="xl"]) .main-button { padding: 20px 40px; font-size: 16px; }
    :host([size="xl"]) .dropdown-trigger { padding: 20px 20px; }
    /* Primary */
    :host([variant="primary"]) .main-button, :host([variant="primary"]) .dropdown-trigger, .main-button, .dropdown-trigger { background-color: var(--ca-color-primary); color: var(--ca-color-white); border: none; }
    :host([variant="primary"]) .divider, .divider { background-color: rgba(255,255,255,0.25); }
    :host([variant="primary"]) .main-button:hover:not(:disabled), :host([variant="primary"]) .dropdown-trigger:hover:not(:disabled) { background-color: var(--ca-color-primary-pressed); }
    /* Secondary */
    :host([variant="secondary"]) .main-button, :host([variant="secondary"]) .dropdown-trigger { background-color: var(--ca-color-secondary); color: var(--ca-color-secondary-text, var(--ca-color-white)); border: none; }
    :host([variant="secondary"]) .divider { background-color: var(--ca-color-secondary-divider, rgba(255,255,255,0.2)); }
    :host([variant="secondary"]) .main-button:hover:not(:disabled), :host([variant="secondary"]) .dropdown-trigger:hover:not(:disabled) { opacity: 0.8; }
    /* Tertiary */
    :host([variant="tertiary"]) .main-button, :host([variant="tertiary"]) .dropdown-trigger { background-color: transparent; color: var(--ca-text-primary); border: 1px solid var(--ca-text-primary); }
    :host([variant="tertiary"]) .main-button { border-right: none; }
    :host([variant="tertiary"]) .divider { background-color: var(--ca-text-primary); }
    :host([variant="tertiary"]) .main-button:hover:not(:disabled), :host([variant="tertiary"]) .dropdown-trigger:hover:not(:disabled) { background-color: var(--ca-color-secondary-hover); }
    /* Focus */
    .main-button:focus-visible, .dropdown-trigger:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--ca-color-focus-ring); }
    /* Disabled */
    :host([disabled]) { opacity: 0.5; pointer-events: none; }
    /* Chevron */
    .chevron { display: flex; align-items: center; width: 14px; height: 14px; transition: transform 0.2s ease; }
    .chevron.open { transform: rotate(180deg); }
    /* Dropdown */
    .dropdown { position: absolute; top: 100%; right: 0; z-index: 10; margin-top: 4px; min-width: 100%; background-color: var(--ca-surface-elevated); border: 1px solid var(--ca-border-strong); border-radius: var(--ca-radius-md); box-shadow: var(--ca-shadow-menu); overflow: hidden; }
    .option { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 16px; background: none; border: none; cursor: pointer; font-family: var(--ca-font-family); font-size: 13px; color: var(--ca-text-primary); text-align: left; white-space: nowrap; box-sizing: border-box; }
    .option:hover, .option.selected { background-color: var(--ca-surface-hover); }
    .option:focus-visible { outline: none; background-color: var(--ca-surface-hover); }
    .option-text { flex: 1; }
    .check-icon { flex-shrink: 0; width: 18px; height: 18px; color: var(--ca-text-muted); }
    /* Loading */
    .spinner { display: flex; align-items: center; gap: 6px; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background-color: currentColor; opacity: 0.6; animation: sb-pulse 1.4s ease-in-out infinite; }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes sb-pulse { 0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }
  `;
V([
  l({ type: String, reflect: !0 })
], M.prototype, "variant", 2);
V([
  l({ type: String, reflect: !0 })
], M.prototype, "size", 2);
V([
  l({ type: Array })
], M.prototype, "options", 2);
V([
  l({ type: String })
], M.prototype, "value", 2);
V([
  l({ type: String })
], M.prototype, "label", 2);
V([
  l({ type: Boolean, reflect: !0 })
], M.prototype, "loading", 2);
V([
  l({ type: Boolean, reflect: !0 })
], M.prototype, "disabled", 2);
V([
  h()
], M.prototype, "_isOpen", 2);
V([
  h()
], M.prototype, "_focusedIndex", 2);
V([
  R(".dropdown")
], M.prototype, "_dropdown", 2);
V([
  R(".dropdown-trigger")
], M.prototype, "_triggerEl", 2);
M = V([
  g("ca-split-button")
], M);
var Po = Object.defineProperty, Io = Object.getOwnPropertyDescriptor, H = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Io(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Po(t, r, i), i;
};
let A = class extends v {
  constructor() {
    super(...arguments), this.size = "md", this.label = "", this.error = "", this.autoresize = !1, this.rows = 3, this.disabled = !1, this.value = "", this.placeholder = "", this._charCount = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this._charCount = this.value?.length ?? 0;
  }
  updated(e) {
    e.has("value") && (this._charCount = this.value?.length ?? 0);
  }
  _handleInput(e) {
    const t = e.target, r = t.value;
    this._charCount = r.length, this.autoresize && (t.style.height = "auto", t.style.height = `${t.scrollHeight}px`), this.dispatchEvent(
      new CustomEvent("ca-input", {
        detail: { value: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    const e = this.maxlength !== void 0 && this._charCount > this.maxlength;
    return n`
      ${this.label ? n`<label class="label">${this.label}</label>` : null}
      <div class=${u({ field: !0, disabled: this.disabled })}>
        <textarea
          .value=${this.value}
          rows=${this.rows}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          maxlength=${this.maxlength ?? ""}
          @input=${this._handleInput}
          style=${this.autoresize ? "resize: none; overflow: hidden;" : ""}
        ></textarea>
      </div>
      ${this.error || this.maxlength !== void 0 ? n`
            <div class="footer">
              ${this.error ? n`<span class="error-text">${this.error}</span>` : n`<span></span>`}
              ${this.maxlength !== void 0 ? n`
                    <span class=${u({ counter: !0, "counter-over": e })}>
                      ${this._charCount} / ${this.maxlength}
                    </span>
                  ` : null}
            </div>
          ` : null}
    `;
  }
};
A.styles = b`
    :host {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-family: var(--ca-font-family);
    }
    .label {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      line-height: 1;
    }
    .field {
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      transition: border-color 0.15s ease;
    }
    .field:focus-within {
      border: 2px solid var(--ca-text-primary);
    }
    :host([error]) .field {
      border-color: var(--ca-text-danger);
    }
    :host([error]) .field:focus-within {
      border-color: var(--ca-text-danger);
    }
    .field.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    textarea {
      display: block;
      width: 100%;
      padding: 10px 12px;
      border: none;
      outline: none;
      background: transparent;
      color: var(--ca-text-primary);
      font-family: inherit;
      font-size: var(--ca-font-size-md);
      line-height: 1.5;
      resize: vertical;
      box-sizing: border-box;
    }
    textarea::placeholder {
      color: var(--ca-text-muted);
    }
    textarea:disabled {
      cursor: not-allowed;
      resize: none;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 16px;
    }
    .error-text {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-danger);
      line-height: 1.3;
    }
    .counter {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      margin-left: auto;
    }
    .counter-over {
      color: var(--ca-text-danger);
    }

    /* Size: xs */
    :host([size='xs']) textarea {
      padding: 6px 8px;
      font-size: var(--ca-font-size-xs);
    }
    :host([size='xs']) .field { border-radius: 6px; }

    /* Size: sm */
    :host([size='sm']) textarea {
      padding: 8px 10px;
      font-size: var(--ca-font-size-xs);
    }
    :host([size='sm']) .field { border-radius: 6px; }

    /* Size: lg */
    :host([size='lg']) textarea {
      padding: 14px 14px;
      font-size: var(--ca-font-size-lg);
    }
    :host([size='lg']) .field { border-radius: 10px; }

    /* Size: xl */
    :host([size='xl']) textarea {
      padding: 18px 16px;
      font-size: 20px;
    }
    :host([size='xl']) .field { border-radius: 12px; }
  `;
H([
  l({ type: String, reflect: !0 })
], A.prototype, "size", 2);
H([
  l({ type: String })
], A.prototype, "label", 2);
H([
  l({ type: String, reflect: !0 })
], A.prototype, "error", 2);
H([
  l({ type: Number })
], A.prototype, "maxlength", 2);
H([
  l({ type: Boolean })
], A.prototype, "autoresize", 2);
H([
  l({ type: Number })
], A.prototype, "rows", 2);
H([
  l({ type: Boolean })
], A.prototype, "disabled", 2);
H([
  l({ type: String })
], A.prototype, "value", 2);
H([
  l({ type: String })
], A.prototype, "placeholder", 2);
H([
  h()
], A.prototype, "_charCount", 2);
H([
  R("textarea")
], A.prototype, "_textareaEl", 2);
A = H([
  g("ca-textarea")
], A);
var Mo = Object.defineProperty, Ao = Object.getOwnPropertyDescriptor, Tr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ao(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Mo(t, r, i), i;
};
let jo = 0, At = class extends v {
  constructor() {
    super(...arguments), this._toasts = [], this._timers = /* @__PURE__ */ new Map();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._timers.forEach((e) => clearTimeout(e)), this._timers.clear();
  }
  toast(e, t) {
    const r = jo++, o = t?.type ?? "info", i = t?.duration ?? 5e3, a = { id: r, message: e, type: o, duration: i, exiting: !1 };
    this._toasts = [...this._toasts, a];
    const s = setTimeout(() => {
      this._dismiss(r);
    }, i);
    this._timers.set(r, s);
  }
  _dismiss(e) {
    const t = this._timers.get(e);
    t && (clearTimeout(t), this._timers.delete(e)), this._toasts = this._toasts.map(
      (r) => r.id === e ? { ...r, exiting: !0 } : r
    ), setTimeout(() => {
      this._toasts = this._toasts.filter((r) => r.id !== e);
    }, 200);
  }
  _renderCloseIcon() {
    return n`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
  }
  render() {
    return this._toasts.length === 0 ? c : n`
      ${this._toasts.map(
      (e) => n`
          <div class=${u({ toast: !0, [e.type]: !0, exiting: e.exiting })}>
            <span class="message">${e.message}</span>
            <button class="close" @click=${() => this._dismiss(e.id)} aria-label="Close">
              ${this._renderCloseIcon()}
            </button>
          </div>
        `
    )}
    `;
  }
};
At.styles = b`
    :host { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 9500; display: flex; flex-direction: column; gap: 8px; align-items: center; pointer-events: none; }
    .toast { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: var(--ca-radius-md); font-family: var(--ca-font-family); font-size: 13px; box-shadow: var(--ca-shadow-md); pointer-events: auto; animation: toast-slide-in 0.25s ease; white-space: nowrap; }
    .toast.exiting { animation: toast-slide-out 0.2s ease forwards; }
    .info { background-color: var(--ca-text-primary); color: var(--ca-surface); }
    .success { background-color: var(--ca-color-success); color: white; }
    .error { background-color: var(--ca-color-danger); color: white; }
    .warning { background-color: var(--ca-color-warning); color: white; }
    .message { flex: 1; line-height: 1.4; }
    .close { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0; border: none; background: none; color: inherit; cursor: pointer; opacity: 0.7; transition: opacity 0.15s ease; }
    .close:hover { opacity: 1; }
    @keyframes toast-slide-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes toast-slide-out { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(16px); } }
  `;
Tr([
  h()
], At.prototype, "_toasts", 2);
At = Tr([
  g("ca-toast-container")
], At);
function Pa(e, t) {
  let r = document.querySelector("ca-toast-container");
  r || (r = document.createElement("ca-toast-container"), document.body.appendChild(r)), r.toast(e, t);
}
var To = Object.defineProperty, Bo = Object.getOwnPropertyDescriptor, Ze = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Bo(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && To(t, r, i), i;
};
let ue = class extends v {
  constructor() {
    super(...arguments), this.content = "", this.position = "top", this.delay = 300, this._visible = !1, this._coords = { top: 0, left: 0 }, this._showTimeout = null, this._hideTimeout = null;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._showTimeout && clearTimeout(this._showTimeout), this._hideTimeout && clearTimeout(this._hideTimeout);
  }
  _show() {
    this._hideTimeout && (clearTimeout(this._hideTimeout), this._hideTimeout = null), this._showTimeout = setTimeout(() => {
      this._updatePosition(), this._visible = !0;
    }, this.delay);
  }
  _hide() {
    this._showTimeout && (clearTimeout(this._showTimeout), this._showTimeout = null), this._visible = !1;
  }
  _updatePosition() {
    const e = this.shadowRoot?.querySelector("slot")?.assignedElements()[0];
    if (!e) return;
    const t = e.getBoundingClientRect(), r = 8;
    let o = 0, i = 0;
    switch (this.position) {
      case "top":
        o = t.top - r, i = t.left + t.width / 2;
        break;
      case "bottom":
        o = t.bottom + r, i = t.left + t.width / 2;
        break;
      case "left":
        o = t.top + t.height / 2, i = t.left - r;
        break;
      case "right":
        o = t.top + t.height / 2, i = t.right + r;
        break;
    }
    this._coords = { top: o, left: i };
  }
  _getTooltipStyle() {
    const { top: e, left: t } = this._coords;
    switch (this.position) {
      case "top":
        return `top: ${e}px; left: ${t}px; transform: translate(-50%, -100%);`;
      case "bottom":
        return `top: ${e}px; left: ${t}px; transform: translate(-50%, 0);`;
      case "left":
        return `top: ${e}px; left: ${t}px; transform: translate(-100%, -50%);`;
      case "right":
        return `top: ${e}px; left: ${t}px; transform: translate(0, -50%);`;
    }
  }
  render() {
    return n`
      <slot
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focus=${this._show}
        @blur=${this._hide}
      ></slot>
      ${this._visible && this.content ? n`
            <div
              class=${u({ tooltip: !0, [this.position]: !0 })}
              role="tooltip"
              style=${this._getTooltipStyle()}
            >
              <span class="tooltip-content">${this.content}</span>
              <span class="arrow"></span>
            </div>
          ` : c}
    `;
  }
};
ue.styles = b`
    :host { display: inline-flex; position: relative; }
    .tooltip { position: fixed; z-index: 9999; pointer-events: none; animation: tooltip-fade-in 0.15s ease; }
    .tooltip-content { display: block; padding: 6px 10px; background-color: var(--ca-text-primary); color: var(--ca-surface); font-family: var(--ca-font-family); font-size: 11px; line-height: 1.4; border-radius: var(--ca-radius-sm); box-shadow: var(--ca-shadow-sm); white-space: nowrap; }
    .arrow { position: absolute; width: 0; height: 0; border: 5px solid transparent; }
    .top .arrow { bottom: -10px; left: 50%; transform: translateX(-50%); border-top-color: var(--ca-text-primary); }
    .bottom .arrow { top: -10px; left: 50%; transform: translateX(-50%); border-bottom-color: var(--ca-text-primary); }
    .left .arrow { right: -10px; top: 50%; transform: translateY(-50%); border-left-color: var(--ca-text-primary); }
    .right .arrow { left: -10px; top: 50%; transform: translateY(-50%); border-right-color: var(--ca-text-primary); }
    @keyframes tooltip-fade-in { from { opacity: 0; } to { opacity: 1; } }
  `;
Ze([
  l({ type: String })
], ue.prototype, "content", 2);
Ze([
  l({ type: String })
], ue.prototype, "position", 2);
Ze([
  l({ type: Number })
], ue.prototype, "delay", 2);
Ze([
  h()
], ue.prototype, "_visible", 2);
Ze([
  h()
], ue.prototype, "_coords", 2);
ue = Ze([
  g("ca-tooltip")
], ue);
var Lo = Object.defineProperty, _e = (e, t, r, o) => {
  for (var i = void 0, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = s(t, r, i) || i);
  return i && Lo(t, r, i), i;
};
const lr = class lr extends v {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.size = "md", this.borderless = !1, this.allowCreate = !1, this.placeholder = "Select...", this._isOpen = !1, this._focusedIndex = -1, this._boundClickOutside = this._handleClickOutside.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._boundClickOutside);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._boundClickOutside);
  }
  _handleClickOutside(t) {
    this._isOpen && (t.composedPath().includes(this) || (this._isOpen = !1, this._focusedIndex = -1));
  }
  _toggle() {
    this._isOpen = !this._isOpen, this._isOpen || (this._focusedIndex = -1);
  }
  _handlePillKeyDown(t) {
    t.key === "Enter" || t.key === " " ? (t.preventDefault(), this._toggle()) : t.key === "Escape" ? (this._isOpen = !1, this._focusedIndex = -1) : t.key === "ArrowDown" && this._isOpen ? (t.preventDefault(), this._focusedIndex = Math.min(this._focusedIndex + 1, this.options.length - 1)) : t.key === "ArrowUp" && this._isOpen ? (t.preventDefault(), this._focusedIndex = Math.max(this._focusedIndex - 1, 0)) : (t.key === "Enter" || t.key === " ") && this._isOpen && this._focusedIndex >= 0 && (t.preventDefault(), this._selectOption(this.options[this._focusedIndex]));
  }
  _selectOption(t) {
    this._isOpen = !1, this._focusedIndex = -1, this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { value: t.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleCreate() {
    this._isOpen = !1, this.dispatchEvent(
      new CustomEvent("ca-create", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  get _selectedOption() {
    return this.options.find((t) => t.value === this.value);
  }
  /** Override in subclass for custom icon rendering */
  renderOptionIcon(t) {
    return n`<span class="option-dot" style="background-color: ${t.color}"></span>`;
  }
  render() {
    const t = this._selectedOption, r = t ? t.color : "var(--ca-border-strong)";
    return n`
      <div
        class="pill"
        style="background-color: ${this.borderless ? "transparent" : r}"
        tabindex="0"
        role="combobox"
        aria-expanded=${this._isOpen}
        aria-haspopup="listbox"
        @click=${this._toggle}
        @keydown=${this._handlePillKeyDown}
      >
        ${this.borderless && t ? n`<span class="dot" style="background-color: ${t.color}"></span>` : c}
        ${t ? n`<span>${t.label}</span>` : n`<span class="placeholder-text">${this.placeholder}</span>`}
      </div>
      ${this._isOpen ? this._renderDropdown() : c}
    `;
  }
  _renderDropdown() {
    return n`
      <div class="dropdown" role="listbox">
        ${this.options.map((t, r) => {
      const o = t.value === this.value;
      return n`
            <button
              class=${u({ option: !0, selected: o, focused: r === this._focusedIndex })}
              role="option"
              aria-selected=${o}
              @click=${(i) => {
        i.stopPropagation(), this._selectOption(t);
      }}
            >
              ${this.renderOptionIcon(t)}
              <span class="option-label">${t.label}</span>
              ${o ? n`<svg class="check-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>` : c}
            </button>
          `;
    })}
        ${this.allowCreate ? n`
              <button class="create-row" @click=${(t) => {
      t.stopPropagation(), this._handleCreate();
    }}>
                <svg class="create-icon" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <span>Create new</span>
              </button>
            ` : c}
      </div>
    `;
  }
};
lr.styles = b`
    :host {
      display: inline-flex;
      position: relative;
      font-family: var(--ca-font-family);
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: var(--ca-radius-full);
      border: 1px solid transparent;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: #fff;
      cursor: pointer;
      line-height: 1.3;
      white-space: nowrap;
      transition: opacity var(--ca-transition-fast);
      user-select: none;
    }
    .pill:hover {
      opacity: 0.85;
    }
    .pill:focus-visible {
      outline: 2px solid var(--ca-color-focus-ring);
      outline-offset: 2px;
    }
    .pill:focus:not(:focus-visible) {
      outline: none;
    }

    :host([borderless]) .pill {
      background-color: transparent !important;
      color: var(--ca-text-primary);
      padding: 2px 6px;
    }
    :host([borderless]) .pill .dot {
      display: inline-block;
    }

    /* Size variants */
    :host([size='xs']) .pill { padding: 2px 6px; font-size: var(--ca-font-size-xs); gap: 4px; }
    :host([size='sm']) .pill { padding: 3px 8px; font-size: var(--ca-font-size-xs); gap: 5px; }
    :host([size='lg']) .pill { padding: 6px 14px; font-size: var(--ca-font-size-md); gap: 8px; }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .pill-icon {
      display: inline-flex;
      width: 12px;
      height: 12px;
      flex-shrink: 0;
    }

    .placeholder-text {
      color: var(--ca-text-secondary);
      font-weight: 400;
    }

    /* Dropdown */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 10;
      margin-top: 4px;
      min-width: 180px;
      background-color: var(--ca-surface);
      border: 1px solid var(--ca-border-strong);
      border-radius: var(--ca-radius-md);
      box-shadow: var(--ca-shadow-menu);
      overflow: hidden;
      animation: ca-pill-fade-in 0.12s ease;
    }

    @keyframes ca-pill-fade-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .option {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 12px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      text-align: left;
      box-sizing: border-box;
      transition: background-color var(--ca-transition-fast);
    }
    .option:hover,
    .option.focused {
      background-color: var(--ca-surface-hover);
    }
    .option.selected {
      font-weight: var(--ca-font-weight-semibold);
    }
    .option-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .option-label {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .check-icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: var(--ca-text-muted);
    }

    /* Create row */
    .create-row {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 12px;
      background: none;
      border: none;
      border-top: 1px solid var(--ca-border);
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-color-primary);
      text-align: left;
      box-sizing: border-box;
    }
    .create-row:hover {
      background-color: var(--ca-surface-hover);
    }
    .create-icon {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }
  `;
let j = lr;
_e([
  l({ type: Array })
], j.prototype, "options");
_e([
  l({ type: String })
], j.prototype, "value");
_e([
  l({ type: String, reflect: !0 })
], j.prototype, "size");
_e([
  l({ type: Boolean, reflect: !0 })
], j.prototype, "borderless");
_e([
  l({ type: Boolean, attribute: "allow-create" })
], j.prototype, "allowCreate");
_e([
  l({ type: String })
], j.prototype, "placeholder");
_e([
  h()
], j.prototype, "_isOpen");
_e([
  h()
], j.prototype, "_focusedIndex");
var Ro = Object.getOwnPropertyDescriptor, Fo = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ro(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = s(i) || i);
  return i;
};
let $r = class extends j {
};
$r = Fo([
  g("ca-status-selector")
], $r);
var No = Object.getOwnPropertyDescriptor, Vo = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? No(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = s(i) || i);
  return i;
};
let Gt = class extends j {
  renderOptionIcon(e) {
    return e.icon ? n`<span class="priority-icon" style="color: ${e.color}">${this._getIconSvg(e.icon)}</span>` : n`<span class="option-dot" style="background-color: ${e.color}"></span>`;
  }
  _getIconSvg(e) {
    switch (e) {
      case "urgent":
        return n`<svg viewBox="0 0 16 16" fill="none"><path d="M8 3v6M8 11v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
      case "high":
        return n`<svg viewBox="0 0 16 16" fill="none"><path d="M8 12V4M4 7l4-3 4 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case "medium":
        return n`<svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      case "low":
        return n`<svg viewBox="0 0 16 16" fill="none"><path d="M8 4v8M4 9l4 3 4-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      default:
        return n`<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="4" fill="currentColor"/></svg>`;
    }
  }
};
Gt.styles = [
  j.styles,
  b`
      .priority-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 14px;
        height: 14px;
        flex-shrink: 0;
      }
      .priority-icon svg {
        width: 100%;
        height: 100%;
      }
    `
];
Gt = Vo([
  g("ca-priority-selector")
], Gt);
var Ho = Object.getOwnPropertyDescriptor, Ko = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Ho(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = s(i) || i);
  return i;
};
let kr = class extends j {
};
kr = Ko([
  g("ca-phase-selector")
], kr);
var Uo = Object.defineProperty, qo = Object.getOwnPropertyDescriptor, we = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? qo(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Uo(t, r, i), i;
};
let ee = class extends v {
  constructor() {
    super(...arguments), this.members = [], this.value = [], this.size = "md", this.borderless = !1, this.searchable = !0, this._isOpen = !1, this._searchQuery = "", this._boundClickOutside = this._handleClickOutside.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._boundClickOutside);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._boundClickOutside);
  }
  _handleClickOutside(e) {
    this._isOpen && (e.composedPath().includes(this) || (this._isOpen = !1, this._searchQuery = ""));
  }
  _toggle() {
    this._isOpen = !this._isOpen, this._isOpen || (this._searchQuery = "");
  }
  _handleToggleMember(e, t) {
    t.stopPropagation();
    const r = [...this.value], o = r.indexOf(e.value);
    o >= 0 ? r.splice(o, 1) : r.push(e.value), this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { value: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
  get _filteredMembers() {
    if (!this._searchQuery) return this.members;
    const e = this._searchQuery.toLowerCase();
    return this.members.filter(
      (t) => t.label.toLowerCase().includes(e) || t.email && t.email.toLowerCase().includes(e)
    );
  }
  get _selectedMembers() {
    return this.members.filter((e) => this.value.includes(e.value));
  }
  render() {
    const e = this._selectedMembers;
    return n`
      <div
        class="trigger"
        tabindex="0"
        role="combobox"
        aria-expanded=${this._isOpen}
        aria-haspopup="listbox"
        @click=${this._toggle}
        @keydown=${(t) => {
      t.key === "Enter" || t.key === " " ? (t.preventDefault(), this._toggle()) : t.key === "Escape" && (this._isOpen = !1, this._searchQuery = "");
    }}
      >
        ${e.length > 0 ? n`<ca-avatar-group
              .members=${e.map((t) => ({ name: t.label, src: t.src, color: t.color }))}
              .size=${this.size}
              .max=${3}
            ></ca-avatar-group>` : n`
              <span class="add-icon">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>
            `}
      </div>
      ${this._isOpen ? this._renderDropdown() : c}
    `;
  }
  _renderDropdown() {
    const e = this._filteredMembers;
    return n`
      <div class="dropdown" role="listbox" aria-multiselectable="true">
        ${this.searchable ? n`
              <div class="search-wrapper">
                <input
                  class="search-input"
                  type="text"
                  placeholder="Search members..."
                  .value=${this._searchQuery}
                  @input=${(t) => {
      this._searchQuery = t.target.value;
    }}
                  @click=${(t) => t.stopPropagation()}
                  @keydown=${(t) => {
      t.key === "Escape" && (this._isOpen = !1, this._searchQuery = "");
    }}
                />
              </div>
            ` : c}
        <div class="options-list">
          ${e.length === 0 ? n`<div class="no-results">No members found</div>` : e.map((t) => {
      const r = this.value.includes(t.value);
      return n`
                  <button
                    class="option"
                    role="option"
                    aria-selected=${r}
                    @click=${(o) => this._handleToggleMember(t, o)}
                  >
                    <ca-avatar
                      .name=${t.label}
                      .src=${t.src || ""}
                      .color=${t.color || ""}
                      size="xs"
                    ></ca-avatar>
                    <div class="member-info">
                      <span class="member-name">${t.label}</span>
                      ${t.email ? n`<span class="member-email">${t.email}</span>` : c}
                    </div>
                    <span class=${u({ "checkbox-box": !0, checked: r })}>
                      ${r ? n`<svg viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` : c}
                    </span>
                  </button>
                `;
    })}
        </div>
      </div>
    `;
  }
};
ee.styles = b`
    :host {
      display: inline-flex;
      position: relative;
      font-family: var(--ca-font-family);
    }

    .trigger {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      padding: 4px;
      border: 1px solid transparent;
      border-radius: var(--ca-radius-md);
      transition: border-color var(--ca-transition-fast);
    }
    .trigger:hover {
      border-color: var(--ca-border);
    }
    .trigger:focus-visible {
      outline: 2px solid var(--ca-color-focus-ring);
      outline-offset: 2px;
    }
    .trigger:focus:not(:focus-visible) {
      outline: none;
    }
    :host([borderless]) .trigger {
      border-color: transparent;
      padding: 2px;
    }

    .placeholder {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
    }

    .add-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1.5px dashed var(--ca-border-strong);
      color: var(--ca-text-muted);
      flex-shrink: 0;
    }
    :host([size='xs']) .add-icon { width: 20px; height: 20px; }
    :host([size='sm']) .add-icon { width: 24px; height: 24px; }

    /* Dropdown */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 10;
      margin-top: 4px;
      min-width: 240px;
      max-height: 300px;
      background-color: var(--ca-surface);
      border: 1px solid var(--ca-border-strong);
      border-radius: var(--ca-radius-md);
      box-shadow: var(--ca-shadow-menu);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: ca-as-fade-in 0.12s ease;
    }

    @keyframes ca-as-fade-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .search-wrapper {
      padding: 8px 12px;
      border-bottom: 1px solid var(--ca-border);
      flex-shrink: 0;
    }
    .search-input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      box-sizing: border-box;
    }
    .search-input::placeholder { color: var(--ca-text-muted); }

    .options-list {
      overflow-y: auto;
      flex: 1;
    }

    .option {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 8px 12px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      text-align: left;
      box-sizing: border-box;
      transition: background-color var(--ca-transition-fast);
    }
    .option:hover { background-color: var(--ca-surface-hover); }

    .checkbox-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border: 1.5px solid var(--ca-border-strong);
      border-radius: 4px;
      flex-shrink: 0;
      transition: background-color var(--ca-transition-fast), border-color var(--ca-transition-fast);
    }
    .checkbox-box.checked {
      background-color: var(--ca-color-secondary);
      border-color: var(--ca-color-secondary);
    }
    .checkbox-box svg {
      width: 10px;
      height: 10px;
      color: var(--ca-color-white);
    }

    .member-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .member-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .member-email {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .no-results {
      padding: 12px;
      text-align: center;
      color: var(--ca-text-muted);
      font-size: var(--ca-font-size-sm);
    }
  `;
we([
  l({ type: Array, attribute: !1 })
], ee.prototype, "members", 2);
we([
  l({ type: Array, attribute: !1 })
], ee.prototype, "value", 2);
we([
  l({ type: String, reflect: !0 })
], ee.prototype, "size", 2);
we([
  l({ type: Boolean, reflect: !0 })
], ee.prototype, "borderless", 2);
we([
  l({ type: Boolean })
], ee.prototype, "searchable", 2);
we([
  h()
], ee.prototype, "_isOpen", 2);
we([
  h()
], ee.prototype, "_searchQuery", 2);
ee = we([
  g("ca-assignee-selector")
], ee);
var Yo = Object.defineProperty, Qo = Object.getOwnPropertyDescriptor, q = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Qo(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Yo(t, r, i), i;
};
const Ot = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#6b7280"
];
let L = class extends v {
  constructor() {
    super(...arguments), this.labels = [], this.value = [], this.allowCreate = !1, this.size = "md", this.borderless = !1, this._isOpen = !1, this._searchQuery = "", this._showCreate = !1, this._newLabelName = "", this._newLabelColor = Ot[0], this._boundClickOutside = this._handleClickOutside.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._boundClickOutside);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._boundClickOutside);
  }
  _handleClickOutside(e) {
    this._isOpen && (e.composedPath().includes(this) || this._close());
  }
  _close() {
    this._isOpen = !1, this._searchQuery = "", this._showCreate = !1, this._newLabelName = "", this._newLabelColor = Ot[0];
  }
  _toggle() {
    this._isOpen ? this._close() : this._isOpen = !0;
  }
  _handleToggleLabel(e, t) {
    t.stopPropagation();
    const r = [...this.value], o = r.indexOf(e.value);
    o >= 0 ? r.splice(o, 1) : r.push(e.value), this.dispatchEvent(
      new CustomEvent("ca-change", { detail: { value: r }, bubbles: !0, composed: !0 })
    );
  }
  _handleCreateLabel() {
    this._newLabelName.trim() && (this.dispatchEvent(
      new CustomEvent("ca-create", {
        detail: { label: this._newLabelName.trim(), color: this._newLabelColor },
        bubbles: !0,
        composed: !0
      })
    ), this._showCreate = !1, this._newLabelName = "", this._newLabelColor = Ot[0]);
  }
  get _filteredLabels() {
    if (!this._searchQuery) return this.labels;
    const e = this._searchQuery.toLowerCase();
    return this.labels.filter((t) => t.label.toLowerCase().includes(e));
  }
  get _selectedLabels() {
    return this.labels.filter((e) => this.value.includes(e.value));
  }
  render() {
    const e = this._selectedLabels;
    return n`
      <div
        class="trigger"
        tabindex="0"
        role="combobox"
        aria-expanded=${this._isOpen}
        aria-haspopup="listbox"
        @click=${this._toggle}
        @keydown=${(t) => {
      t.key === "Enter" || t.key === " " ? (t.preventDefault(), this._toggle()) : t.key === "Escape" && this._close();
    }}
      >
        ${e.length > 0 ? e.map((t) => n`<span class="label-chip" style="background-color: ${t.color}">${t.label}</span>`) : n`<span class="add-icon">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </span>`}
      </div>
      ${this._isOpen ? this._renderDropdown() : c}
    `;
  }
  _renderDropdown() {
    const e = this._filteredLabels;
    return n`
      <div class="dropdown" role="listbox" aria-multiselectable="true">
        <div class="search-wrapper">
          <input
            class="search-input"
            type="text"
            placeholder="Search labels..."
            .value=${this._searchQuery}
            @input=${(t) => {
      this._searchQuery = t.target.value;
    }}
            @click=${(t) => t.stopPropagation()}
            @keydown=${(t) => {
      t.key === "Escape" && this._close();
    }}
          />
        </div>
        <div class="options-list">
          ${e.length === 0 ? n`<div class="no-results">No labels found</div>` : e.map((t) => {
      const r = this.value.includes(t.value);
      return n`
                  <button class="option" role="option" aria-selected=${r}
                    @click=${(o) => this._handleToggleLabel(t, o)}>
                    <span class="color-dot" style="background-color: ${t.color}"></span>
                    <span class="option-label">${t.label}</span>
                    <span class=${u({ "checkbox-box": !0, checked: r })}>
                      ${r ? n`<svg viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` : c}
                    </span>
                  </button>
                `;
    })}
        </div>
        ${this.allowCreate ? n`
              <div class="create-section" @click=${(t) => t.stopPropagation()}>
                ${this._showCreate ? n`
                      <div class="swatches">
                        ${Ot.map(
      (t) => n`
                            <button class=${u({ swatch: !0, selected: t === this._newLabelColor })}
                              @click=${() => {
        this._newLabelColor = t;
      }}>
                              <div class="swatch-inner" style="background-color: ${t}"></div>
                            </button>
                          `
    )}
                      </div>
                      <input class="create-input" type="text" placeholder="Label name..."
                        .value=${this._newLabelName}
                        @input=${(t) => {
      this._newLabelName = t.target.value;
    }}
                        @keydown=${(t) => {
      t.key === "Enter" && this._handleCreateLabel();
    }}
                      />
                      <div class="create-actions">
                        <button class="create-btn create-btn-cancel" @click=${() => {
      this._showCreate = !1;
    }}>Cancel</button>
                        <button class="create-btn create-btn-primary" @click=${this._handleCreateLabel}>Create</button>
                      </div>
                    ` : n`
                      <div class="create-row" @click=${() => {
      this._showCreate = !0;
    }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        <span>Create label</span>
                      </div>
                    `}
              </div>
            ` : c}
      </div>
    `;
  }
};
L.styles = b`
    :host {
      display: inline-flex;
      position: relative;
      font-family: var(--ca-font-family);
    }

    .trigger {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
      cursor: pointer;
      padding: 4px;
      border: 1px solid transparent;
      border-radius: var(--ca-radius-md);
      transition: border-color var(--ca-transition-fast);
      min-height: 28px;
    }
    .trigger:hover { border-color: var(--ca-border); }
    .trigger:focus-visible { outline: 2px solid var(--ca-color-focus-ring); outline-offset: 2px; }
    .trigger:focus:not(:focus-visible) { outline: none; }
    :host([borderless]) .trigger { border-color: transparent; padding: 2px; }

    .label-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: var(--ca-radius-full);
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-semibold);
      color: #fff;
      white-space: nowrap;
      line-height: 1.4;
    }

    :host([size='xs']) .label-chip { padding: 1px 5px; font-size: 10px; }
    :host([size='sm']) .label-chip { padding: 1px 6px; font-size: var(--ca-font-size-xs); }
    :host([size='lg']) .label-chip { padding: 3px 10px; font-size: var(--ca-font-size-sm); }

    .add-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1.5px dashed var(--ca-border-strong);
      color: var(--ca-text-muted);
      flex-shrink: 0;
    }

    .placeholder {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
    }

    /* Dropdown */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 10;
      margin-top: 4px;
      min-width: 220px;
      max-height: 320px;
      background-color: var(--ca-surface);
      border: 1px solid var(--ca-border-strong);
      border-radius: var(--ca-radius-md);
      box-shadow: var(--ca-shadow-menu);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: ca-ls-fade-in 0.12s ease;
    }

    @keyframes ca-ls-fade-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .search-wrapper {
      padding: 8px 12px;
      border-bottom: 1px solid var(--ca-border);
      flex-shrink: 0;
    }
    .search-input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      box-sizing: border-box;
    }
    .search-input::placeholder { color: var(--ca-text-muted); }

    .options-list {
      overflow-y: auto;
      flex: 1;
    }

    .option {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 12px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      text-align: left;
      box-sizing: border-box;
    }
    .option:hover { background-color: var(--ca-surface-hover); }

    .color-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .checkbox-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border: 1.5px solid var(--ca-border-strong);
      border-radius: 4px;
      flex-shrink: 0;
      transition: background-color var(--ca-transition-fast), border-color var(--ca-transition-fast);
    }
    .checkbox-box.checked {
      background-color: var(--ca-color-secondary);
      border-color: var(--ca-color-secondary);
    }
    .checkbox-box svg {
      width: 10px;
      height: 10px;
      color: var(--ca-color-white);
    }

    .option-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    .no-results {
      padding: 12px;
      text-align: center;
      color: var(--ca-text-muted);
      font-size: var(--ca-font-size-sm);
    }

    /* Create section */
    .create-section {
      border-top: 1px solid var(--ca-border);
      padding: 8px 12px;
      flex-shrink: 0;
    }
    .create-row {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: var(--ca-font-size-sm);
      color: var(--ca-color-primary);
      padding: 4px 0;
    }
    .create-row:hover { opacity: 0.8; }

    .swatches {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
      margin-top: 6px;
    }
    .swatch {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      padding: 0;
      background: none;
    }
    .swatch:hover { opacity: 0.8; }
    .swatch.selected { border-color: var(--ca-text-primary); }
    .swatch-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .create-input {
      width: 100%;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-sm);
      padding: 4px 8px;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      background: var(--ca-surface);
      box-sizing: border-box;
      margin-top: 6px;
    }
    .create-input:focus { outline: none; border-color: var(--ca-text-primary); }

    .create-actions {
      display: flex;
      justify-content: flex-end;
      gap: 6px;
      margin-top: 6px;
    }
    .create-btn {
      padding: 4px 12px;
      border: none;
      border-radius: var(--ca-radius-sm);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      cursor: pointer;
      font-weight: var(--ca-font-weight-semibold);
    }
    .create-btn-primary {
      background-color: var(--ca-color-primary);
      color: #fff;
    }
    .create-btn-primary:hover { opacity: 0.9; }
    .create-btn-cancel {
      background: none;
      color: var(--ca-text-secondary);
    }
    .create-btn-cancel:hover { color: var(--ca-text-primary); }
  `;
q([
  l({ type: Array, attribute: !1 })
], L.prototype, "labels", 2);
q([
  l({ type: Array, attribute: !1 })
], L.prototype, "value", 2);
q([
  l({ type: Boolean, attribute: "allow-create" })
], L.prototype, "allowCreate", 2);
q([
  l({ type: String, reflect: !0 })
], L.prototype, "size", 2);
q([
  l({ type: Boolean, reflect: !0 })
], L.prototype, "borderless", 2);
q([
  h()
], L.prototype, "_isOpen", 2);
q([
  h()
], L.prototype, "_searchQuery", 2);
q([
  h()
], L.prototype, "_showCreate", 2);
q([
  h()
], L.prototype, "_newLabelName", 2);
q([
  h()
], L.prototype, "_newLabelColor", 2);
L = q([
  g("ca-label-selector")
], L);
var Go = Object.defineProperty, Wo = Object.getOwnPropertyDescriptor, et = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Wo(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Go(t, r, i), i;
};
const Xo = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#6b7280",
  "#374151",
  "#1e3a5f"
];
let fe = class extends v {
  constructor() {
    super(...arguments), this.value = "", this.presets = Xo, this.size = "md", this.allowCustom = !1, this._customHex = "";
  }
  _selectColor(e) {
    this.value = e, this._customHex = e, this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { value: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleCustomInput(e) {
    let r = e.target.value.trim();
    this._customHex = r, r && !r.startsWith("#") && (r = "#" + r), /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(r) && this._selectColor(r.toLowerCase());
  }
  _handleCustomKeydown(e) {
    if (e.key === "Enter") {
      let t = this._customHex.trim();
      t && !t.startsWith("#") && (t = "#" + t), /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t) && this._selectColor(t.toLowerCase());
    }
  }
  render() {
    const e = this.value?.toLowerCase() ?? "";
    return n`
      <div class="picker">
        <div class="grid">
          ${this.presets.map(
      (t) => n`
              <button
                class=${u({
        swatch: !0,
        selected: e === t.toLowerCase()
      })}
                @click=${() => this._selectColor(t)}
                aria-label=${`Select color ${t}`}
                title=${t}
              >
                <span class="inner" style="background-color: ${t}"></span>
              </button>
            `
    )}
        </div>
        ${this.allowCustom ? n`
              <div class="custom-input-wrapper">
                <span
                  class="color-preview"
                  style="background-color: ${e || "#ffffff"}"
                ></span>
                <input
                  type="text"
                  class="hex-input"
                  placeholder="#000000"
                  .value=${this._customHex || this.value || ""}
                  @input=${this._handleCustomInput}
                  @keydown=${this._handleCustomKeydown}
                  aria-label="Custom hex color"
                  maxlength="7"
                />
              </div>
            ` : c}
      </div>
    `;
  }
};
fe.styles = b`
    :host {
      display: inline-block;
      font-family: var(--ca-font-family);
    }
    .picker {
      background-color: var(--ca-surface-elevated);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      padding: var(--ca-space-sm);
      box-shadow: var(--ca-shadow-md);
      box-sizing: border-box;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 8px;
    }
    :host([size='sm']) .grid {
      gap: 6px;
    }
    .swatch {
      position: relative;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      padding: 0;
      outline: none;
      box-sizing: border-box;
      transition: transform 0.1s ease, border-color var(--ca-transition-fast);
    }
    :host([size='sm']) .swatch {
      width: 24px;
      height: 24px;
    }
    .swatch:hover {
      transform: scale(1.15);
    }
    .swatch:active {
      transform: scale(0.95);
    }
    .swatch:focus-visible {
      box-shadow: 0 0 0 2px var(--ca-surface), 0 0 0 4px var(--ca-text-primary);
    }
    .swatch.selected {
      border-color: var(--ca-text-primary);
      box-shadow: 0 0 0 2px var(--ca-surface), 0 0 0 4px var(--ca-text-primary);
    }
    .swatch .inner {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .custom-input-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: var(--ca-space-sm);
      padding-top: var(--ca-space-sm);
      border-top: 1px solid var(--ca-border);
    }
    .color-preview {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid var(--ca-border);
      flex-shrink: 0;
    }
    :host([size='sm']) .color-preview {
      width: 22px;
      height: 22px;
    }
    .hex-input {
      flex: 1;
      min-width: 0;
      padding: 6px 8px;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-sm);
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
      font-family: var(--ca-font-family);
      font-size: 14px;
      line-height: 1;
      outline: none;
      box-sizing: border-box;
    }
    :host([size='sm']) .hex-input {
      padding: 4px 6px;
      font-size: 12px;
    }
    .hex-input:focus {
      border-color: var(--ca-color-secondary);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--ca-color-secondary) 25%, transparent);
    }
  `;
et([
  l({ type: String, reflect: !0 })
], fe.prototype, "value", 2);
et([
  l({ type: Array })
], fe.prototype, "presets", 2);
et([
  l({ type: String, reflect: !0 })
], fe.prototype, "size", 2);
et([
  l({ type: Boolean, attribute: "allow-custom", reflect: !0 })
], fe.prototype, "allowCustom", 2);
et([
  h()
], fe.prototype, "_customHex", 2);
fe = et([
  g("ca-color-picker")
], fe);
var Jo = Object.defineProperty, Zo = Object.getOwnPropertyDescriptor, wt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Zo(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Jo(t, r, i), i;
};
let je = class extends v {
  constructor() {
    super(...arguments), this.value = 0, this.unit = "hours", this.borderless = !1, this.size = "md";
  }
  get _unitLabel() {
    switch (this.unit) {
      case "hours":
        return "h";
      case "points":
        return "pts";
      case "days":
        return "d";
      default:
        return this.unit;
    }
  }
  _handleInput(e) {
    const t = e.target, r = parseFloat(t.value);
    this.value = Number.isNaN(r) ? 0 : r;
  }
  _handleChange(e) {
    const t = e.target, r = parseFloat(t.value);
    this.value = Number.isNaN(r) ? 0 : r, this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { value: this.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return n`
      <div class="field">
        <input
          class="native"
          type="number"
          .value=${String(this.value)}
          min="0"
          step="any"
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        <span class="unit">${this._unitLabel}</span>
      </div>
    `;
  }
};
je.styles = b`
    :host {
      display: inline-flex;
      align-items: center;
      font-family: var(--ca-font-family);
    }

    .field {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      transition: border-color var(--ca-transition-fast);
      box-sizing: border-box;
      padding: 6px 8px;
      font-size: var(--ca-font-size-sm);
    }
    .field:focus-within {
      border: 2px solid var(--ca-text-primary);
    }

    :host([borderless]) .field {
      border-color: transparent;
      background-color: transparent;
    }
    :host([borderless]) .field:focus-within {
      border: 2px solid var(--ca-text-primary);
    }

    /* Size: xs */
    :host([size='xs']) .field {
      padding: 3px 6px;
      font-size: var(--ca-font-size-xs);
      border-radius: 6px;
      gap: 3px;
    }
    /* Size: sm */
    :host([size='sm']) .field {
      padding: 4px 6px;
      font-size: var(--ca-font-size-xs);
      border-radius: 6px;
    }
    /* Size: md — default, handled by base .field */
    /* Size: lg */
    :host([size='lg']) .field {
      padding: 10px 12px;
      font-size: var(--ca-font-size-md);
      border-radius: 10px;
      gap: 6px;
    }

    .native {
      width: 48px;
      min-width: 0;
      border: none;
      outline: none;
      background: transparent;
      color: var(--ca-text-primary);
      font-family: inherit;
      font-size: inherit;
      line-height: 1;
      text-align: right;
      -moz-appearance: textfield;
    }
    .native::-webkit-inner-spin-button,
    .native::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .unit {
      font-size: inherit;
      color: var(--ca-text-muted);
      white-space: nowrap;
      user-select: none;
      line-height: 1;
    }
  `;
wt([
  l({ type: Number })
], je.prototype, "value", 2);
wt([
  l({ type: String, reflect: !0 })
], je.prototype, "unit", 2);
wt([
  l({ type: Boolean, reflect: !0 })
], je.prototype, "borderless", 2);
wt([
  l({ type: String, reflect: !0 })
], je.prototype, "size", 2);
je = wt([
  g("ca-estimation-input")
], je);
var ea = Object.defineProperty, ta = Object.getOwnPropertyDescriptor, B = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ta(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && ea(t, r, i), i;
};
let E = class extends v {
  constructor() {
    super(...arguments), this.columns = [], this.groups = [], this.heading = "", this.supportingText = "", this.draggable = !0, this.expandable = !0, this.inlineAdd = !0, this.clickableRows = !0, this.selectable = !1, this._expandedIds = [], this._filterModalOpen = !1, this._activeFilters = {}, this._sort = void 0;
  }
  /* ── Map TaskTableColumn[] → TableColumn[] (filterable always false — we handle filtering via modal) ── */
  get _tableColumns() {
    return this.columns.map((e) => ({
      ...e,
      filterable: !1
    }));
  }
  /* ── Collect all rows (including children) across all groups ── */
  get _allRows() {
    const e = [];
    for (const t of this.groups)
      for (const r of t.rows)
        e.push(r), r.children && e.push(...r.children);
    return e;
  }
  /* ── Get unique values for a column across all data ── */
  _uniqueValuesForColumn(e) {
    const t = /* @__PURE__ */ new Set();
    for (const r of this._allRows) {
      const o = r[e];
      o != null && o !== "" && t.add(String(o));
    }
    return [...t].sort();
  }
  /* ── Filterable columns (those with filterable !== false) ── */
  get _filterableColumns() {
    return this.columns.filter((e) => e.filterable !== !1);
  }
  /* ── Count of active filter selections ── */
  get _activeFilterCount() {
    return Object.values(this._activeFilters).reduce((e, t) => e + t.length, 0);
  }
  /* ── Apply filters to groups ── */
  get _filteredGroups() {
    return this._activeFilterCount > 0 ? this.groups.map((t) => ({
      ...t,
      rows: t.rows.filter((r) => this._rowMatchesFilters(r))
    })) : this.groups;
  }
  _rowMatchesFilters(e) {
    for (const [t, r] of Object.entries(this._activeFilters)) {
      if (r.length === 0) continue;
      const o = String(e[t] ?? "");
      if (!r.includes(o)) return !1;
    }
    return !0;
  }
  /* ── Apply sorting per-group ── */
  get _sortedGroups() {
    const e = this._filteredGroups;
    if (!this._sort) return e;
    const { key: t, direction: r } = this._sort, o = r === "asc" ? 1 : -1;
    return e.map((i) => ({
      ...i,
      rows: [...i.rows].sort((a, s) => {
        const d = String(a[t] ?? ""), p = String(s[t] ?? "");
        return d.localeCompare(p) * o;
      })
    }));
  }
  /* ── Final processed groups: filtered → sorted → mapped to TableGroup ── */
  get _processedGroups() {
    return this._sortedGroups.map((e) => ({
      id: e.id,
      label: e.label,
      color: e.color,
      rows: e.rows
    }));
  }
  /* ── Find which group a row belongs to ── */
  _findGroupForRow(e) {
    for (const t of this.groups) {
      if (t.rows.some((r) => r.id === e)) return t.id;
      for (const r of t.rows)
        if (r.children?.some((o) => o.id === e)) return t.id;
    }
  }
  /* ── Event handlers ── */
  _onReorder(e) {
    const { rowId: t, fromGroupId: r, toGroupId: o, fromIndex: i, toIndex: a } = e.detail;
    this._dispatch("ca-task-move", { rowId: t, fromGroupId: r, toGroupId: o, fromIndex: i, toIndex: a });
  }
  _onCellEdit(e) {
    const { rowId: t, key: r, value: o, oldValue: i } = e.detail, a = this._findGroupForRow(t);
    this._dispatch("ca-task-edit", { rowId: t, groupId: a, key: r, value: o, oldValue: i });
  }
  _onRowCreate(e) {
    const { groupId: t, value: r } = e.detail;
    this._dispatch("ca-task-create", { groupId: t, value: r });
  }
  _onRowClick(e) {
    const { row: t } = e.detail, r = this._findGroupForRow(t.id);
    this._dispatch("ca-task-click", { row: t, groupId: r });
  }
  _onExpand(e) {
    const { id: t, expanded: r, expandedIds: o } = e.detail;
    this._expandedIds = o, this._dispatch("ca-task-expand", { id: t, expanded: r });
  }
  _onGroupToggle(e) {
    this._dispatch("ca-group-toggle", e.detail);
  }
  _onSort(e) {
    e.stopPropagation();
    const { key: t, direction: r } = e.detail;
    this._sort = { key: t, direction: r }, this._dispatch("ca-task-sort", { key: t, direction: r });
  }
  _dispatch(e, t) {
    this.dispatchEvent(
      new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 })
    );
  }
  /* ── Filter modal handlers ── */
  _openFilterModal() {
    this._filterModalOpen = !0;
  }
  _closeFilterModal() {
    this._filterModalOpen = !1;
  }
  _toggleFilterValue(e, t) {
    const r = this._activeFilters[e] || [], i = r.indexOf(t) >= 0 ? r.filter((a) => a !== t) : [...r, t];
    this._activeFilters = { ...this._activeFilters, [e]: i }, this._dispatch("ca-task-filter", { filters: this._activeFilters });
  }
  _clearAllFilters() {
    this._activeFilters = {}, this._dispatch("ca-task-filter", { filters: this._activeFilters });
  }
  /* ── Render ── */
  _renderFilterModal() {
    const e = this._filterableColumns;
    return e.length === 0 ? c : n`
      <ca-modal
        .open=${this._filterModalOpen}
        size="sm"
        @ca-close=${this._closeFilterModal}
      >
        <span slot="heading">Filters</span>
        <div class="filter-modal-body">
          ${e.map((t) => {
      const r = this._uniqueValuesForColumn(t.key), o = this._activeFilters[t.key] || [];
      return n`
              <div class="filter-column-section">
                <h4>${t.heading}</h4>
                <div class="filter-checkboxes">
                  ${r.map((i) => n`
                    <ca-checkbox
                      size="sm"
                      label=${i}
                      ?checked=${o.includes(i)}
                      @ca-change=${() => this._toggleFilterValue(t.key, i)}
                    ></ca-checkbox>
                  `)}
                </div>
              </div>
            `;
    })}
        </div>
        <div class="filter-modal-footer">
          <ca-button variant="tertiary" size="sm" @click=${this._clearAllFilters}>Clear all</ca-button>
          <ca-button variant="primary" size="sm" @click=${this._closeFilterModal}>Done</ca-button>
        </div>
      </ca-modal>
    `;
  }
  render() {
    const e = this._activeFilterCount;
    return n`
      <ca-table
        .columns=${this._tableColumns}
        .groups=${this._processedGroups}
        .heading=${this.heading}
        .supportingText=${this.supportingText}
        .expandedIds=${this._expandedIds}
        .sort=${this._sort}
        ?expandable=${this.expandable}
        ?draggable=${this.draggable}
        ?clickable-rows=${this.clickableRows}
        ?inline-add=${this.inlineAdd}
        ?selectable=${this.selectable}
        @ca-reorder=${this._onReorder}
        @ca-cell-edit=${this._onCellEdit}
        @ca-row-create=${this._onRowCreate}
        @ca-row-click=${this._onRowClick}
        @ca-expand=${this._onExpand}
        @ca-group-toggle=${this._onGroupToggle}
        @ca-sort=${this._onSort}
      >
        <ca-button slot="header-actions" variant="secondary" size="sm" @click=${this._openFilterModal}>
          <span class="filter-btn-inner">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1.5 2h13l-5 6.5v4l-3 2v-6z"/>
            </svg>
            Filters
            ${e > 0 ? n`<span class="filter-badge">${e}</span>` : c}
          </span>
        </ca-button>
      </ca-table>
      ${this._renderFilterModal()}
    `;
  }
};
E.styles = b`
    :host { display: block; }

    .filter-btn-inner {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .filter-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 9px;
      background: var(--ca-primary);
      color: #fff;
      font-size: 11px;
      font-weight: 600;
      line-height: 1;
    }

    .filter-modal-body {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-height: 60vh;
      overflow-y: auto;
      padding: 4px 0;
    }

    .filter-column-section h4 {
      margin: 0 0 8px;
      font-size: 13px;
      font-weight: 600;
      color: var(--ca-text-primary);
    }

    .filter-checkboxes {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .filter-modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding-top: 12px;
      border-top: 1px solid var(--ca-border);
    }
  `;
B([
  l({ type: Array })
], E.prototype, "columns", 2);
B([
  l({ type: Array })
], E.prototype, "groups", 2);
B([
  l({ type: String })
], E.prototype, "heading", 2);
B([
  l({ type: String, attribute: "supporting-text" })
], E.prototype, "supportingText", 2);
B([
  l({ type: Boolean })
], E.prototype, "draggable", 2);
B([
  l({ type: Boolean })
], E.prototype, "expandable", 2);
B([
  l({ type: Boolean, attribute: "inline-add" })
], E.prototype, "inlineAdd", 2);
B([
  l({ type: Boolean, attribute: "clickable-rows" })
], E.prototype, "clickableRows", 2);
B([
  l({ type: Boolean })
], E.prototype, "selectable", 2);
B([
  h()
], E.prototype, "_expandedIds", 2);
B([
  h()
], E.prototype, "_filterModalOpen", 2);
B([
  h()
], E.prototype, "_activeFilters", 2);
B([
  h()
], E.prototype, "_sort", 2);
E = B([
  g("ca-task-table")
], E);
var ra = Object.defineProperty, ia = Object.getOwnPropertyDescriptor, ie = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ia(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && ra(t, r, i), i;
};
let N = class extends v {
  constructor() {
    super(...arguments), this.title = "", this.taskKey = "", this.priorityColor = "", this.dueDate = "", this.overdue = !1, this.labels = [], this.assignees = [], this.commentsCount = 0, this.attachmentsCount = 0;
  }
  _handleClick() {
    this.dispatchEvent(new CustomEvent("ca-click", { bubbles: !0, composed: !0 }));
  }
  render() {
    return n`
      <div class="card ${this.overdue ? "overdue" : ""}" @click=${this._handleClick}>
        ${this.taskKey ? n`<div class="task-key">${this.taskKey}</div>` : c}
        <div class="title">${this.title}</div>
        ${this.labels.length > 0 ? n`<div class="labels">
              ${this.labels.map((e) => n`<span class="label-chip" style="background-color: ${e.color}">${e.label}</span>`)}
            </div>` : c}
        <div class="footer">
          <div class="footer-left">
            ${this.priorityColor ? n`<span class="priority-dot" style="background-color: ${this.priorityColor}"></span>` : c}
            ${this.dueDate ? n`<span class="due-date ${this.overdue ? "overdue" : ""}">${this.dueDate}</span>` : c}
            <div class="meta">
              ${this.commentsCount > 0 ? n`<span class="meta-item">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M2 3h12v8H5l-3 3V3z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    ${this.commentsCount}
                  </span>` : c}
              ${this.attachmentsCount > 0 ? n`<span class="meta-item">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M13.5 7.5l-5.5 5.5a3.5 3.5 0 01-5-5l5.5-5.5a2 2 0 013 3L6 11a.5.5 0 01-1-1l4.5-4.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    ${this.attachmentsCount}
                  </span>` : c}
            </div>
          </div>
          ${this.assignees.length > 0 ? n`<ca-avatar-group .members=${this.assignees} size="xs" .max=${2}></ca-avatar-group>` : c}
        </div>
      </div>
    `;
  }
};
N.styles = b`
    :host {
      display: block;
    }
    .card {
      background-color: var(--ca-surface);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      padding: 12px;
      cursor: pointer;
      box-shadow: var(--ca-kanban-card-shadow);
      transition: box-shadow var(--ca-transition-fast), border-color var(--ca-transition-fast);
      font-family: var(--ca-font-family);
    }
    .card:hover {
      box-shadow: var(--ca-shadow-md);
      border-color: var(--ca-border-strong);
    }
    .card.overdue {
      border-left: 3px solid var(--ca-color-danger);
    }
    .task-key {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      margin-bottom: 4px;
    }
    .title {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      line-height: 1.4;
      margin-bottom: 8px;
      word-break: break-word;
    }
    .labels {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 8px;
    }
    .label-chip {
      display: inline-flex;
      padding: 1px 6px;
      border-radius: var(--ca-radius-full);
      font-size: 10px;
      font-weight: var(--ca-font-weight-semibold);
      color: #fff;
      line-height: 1.5;
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .footer-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .priority-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .due-date {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
    }
    .due-date.overdue {
      color: var(--ca-text-danger);
      font-weight: var(--ca-font-weight-semibold);
    }
    .meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
    }
    .meta-item {
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    .meta-item svg {
      width: 12px;
      height: 12px;
    }
  `;
ie([
  l({ type: String })
], N.prototype, "title", 2);
ie([
  l({ type: String, attribute: "task-key" })
], N.prototype, "taskKey", 2);
ie([
  l({ type: String, attribute: "priority-color" })
], N.prototype, "priorityColor", 2);
ie([
  l({ type: String, attribute: "due-date" })
], N.prototype, "dueDate", 2);
ie([
  l({ type: Boolean })
], N.prototype, "overdue", 2);
ie([
  l({ type: Array, attribute: !1 })
], N.prototype, "labels", 2);
ie([
  l({ type: Array, attribute: !1 })
], N.prototype, "assignees", 2);
ie([
  l({ type: Number, attribute: "comments-count" })
], N.prototype, "commentsCount", 2);
ie([
  l({ type: Number, attribute: "attachments-count" })
], N.prototype, "attachmentsCount", 2);
N = ie([
  g("ca-kanban-card")
], N);
var oa = Object.defineProperty, aa = Object.getOwnPropertyDescriptor, ne = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? aa(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && oa(t, r, i), i;
};
let U = class extends v {
  constructor() {
    super(...arguments), this.columns = [], this.allowCreate = !1, this._dragCardId = null, this._dragFromColumnId = null, this._dragOverColumnId = null, this._dragOverIndex = -1, this._addingColumnId = null, this._addCardValue = "";
  }
  _handleCardClick(e, t) {
    this.dispatchEvent(
      new CustomEvent("ca-card-click", {
        detail: { card: e, columnId: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /* ── Pointer-based drag ── */
  _handleDragStart(e, t, r) {
    e.button === 0 && (e.preventDefault(), this._dragCardId = t, this._dragFromColumnId = r, e.target.setPointerCapture?.(e.pointerId));
  }
  _handleColumnDragOver(e, t, r) {
    this._dragCardId && (this._dragOverColumnId = t, this._dragOverIndex = r);
  }
  _handleColumnDrop(e) {
    !this._dragCardId || !this._dragFromColumnId || ((this._dragFromColumnId !== e || this._dragOverIndex >= 0) && this.dispatchEvent(
      new CustomEvent("ca-card-move", {
        detail: {
          cardId: this._dragCardId,
          fromColumnId: this._dragFromColumnId,
          toColumnId: e,
          toIndex: Math.max(0, this._dragOverIndex)
        },
        bubbles: !0,
        composed: !0
      })
    ), this._resetDrag());
  }
  _handleDragEnd() {
    this._dragCardId && this._dragOverColumnId ? this._handleColumnDrop(this._dragOverColumnId) : this._resetDrag();
  }
  _resetDrag() {
    this._dragCardId = null, this._dragFromColumnId = null, this._dragOverColumnId = null, this._dragOverIndex = -1;
  }
  /* ── Add card ── */
  _handleAddCardKeyDown(e, t) {
    e.key === "Enter" && this._addCardValue.trim() ? (this.dispatchEvent(
      new CustomEvent("ca-card-create", {
        detail: { columnId: t, title: this._addCardValue.trim() },
        bubbles: !0,
        composed: !0
      })
    ), this._addCardValue = "", this._addingColumnId = null) : e.key === "Escape" && (this._addCardValue = "", this._addingColumnId = null);
  }
  render() {
    return n`
      <div class="board" @pointerup=${this._handleDragEnd}>
        ${this.columns.map((e) => this._renderColumn(e))}
      </div>
    `;
  }
  _renderColumn(e) {
    const t = this._dragOverColumnId === e.id && this._dragCardId;
    return n`
      <div class="column">
        <div class="column-header">
          ${e.color ? n`<span class="column-color" style="background-color: ${e.color}"></span>` : c}
          <span class="column-label">${e.label}</span>
          <span class="column-count">${e.cards.length}</span>
        </div>
        <div
          class="column-cards ${t ? "drag-over" : ""}"
          @pointerenter=${(r) => this._handleColumnDragOver(r, e.id, e.cards.length)}
        >
          ${e.cards.map((r, o) => n`
            <ca-kanban-card
              class=${this._dragCardId === r.id ? "dragging" : ""}
              .title=${r.title}
              .taskKey=${r.taskKey || ""}
              .priorityColor=${r.priorityColor || ""}
              .dueDate=${r.dueDate || ""}
              ?overdue=${r.overdue || !1}
              .labels=${r.labels || []}
              .assignees=${r.assignees || []}
              .commentsCount=${r.commentsCount || 0}
              .attachmentsCount=${r.attachmentsCount || 0}
              @ca-click=${() => this._handleCardClick(r, e.id)}
              @pointerdown=${(i) => this._handleDragStart(i, r.id, e.id)}
              @pointerenter=${(i) => this._handleColumnDragOver(i, e.id, o)}
            ></ca-kanban-card>
          `)}
        </div>
        ${this.allowCreate ? this._addingColumnId === e.id ? n`
                <div class="add-card-input">
                  <input
                    type="text"
                    placeholder="Card title..."
                    .value=${this._addCardValue}
                    @input=${(r) => {
      this._addCardValue = r.target.value;
    }}
                    @keydown=${(r) => this._handleAddCardKeyDown(r, e.id)}
                    @blur=${() => {
      this._addingColumnId = null, this._addCardValue = "";
    }}
                  />
                </div>
              ` : n`
                <button class="add-card-btn" @click=${() => {
      this._addingColumnId = e.id, this.updateComplete.then(() => {
        this.shadowRoot?.querySelector(".add-card-input input")?.focus();
      });
    }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  Add card
                </button>
              ` : c}
      </div>
    `;
  }
};
U.styles = b`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }
    .board {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      padding: 4px;
      align-items: flex-start;
    }
    .column {
      flex: 0 0 280px;
      min-width: 280px;
      max-height: calc(100vh - 200px);
      display: flex;
      flex-direction: column;
      background-color: var(--ca-kanban-column-bg);
      border-radius: var(--ca-radius-lg);
      overflow: hidden;
    }
    .column-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      flex-shrink: 0;
    }
    .column-color {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .column-label {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }
    .column-count {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      margin-left: auto;
    }
    .column-cards {
      flex: 1;
      overflow-y: auto;
      padding: 0 8px 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-height: 40px;
    }
    .column-cards.drag-over {
      background-color: color-mix(in srgb, var(--ca-color-primary) 5%, transparent);
      border-radius: var(--ca-radius-md);
    }
    .add-card-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px;
      margin: 0 8px 8px;
      border: 1px dashed var(--ca-border-strong);
      border-radius: var(--ca-radius-md);
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      transition: color var(--ca-transition-fast), border-color var(--ca-transition-fast);
      flex-shrink: 0;
    }
    .add-card-btn:hover {
      color: var(--ca-text-primary);
      border-color: var(--ca-text-primary);
    }
    .add-card-input {
      margin: 0 8px 8px;
      flex-shrink: 0;
    }
    .add-card-input input {
      width: 100%;
      border: 1px solid var(--ca-border-strong);
      border-radius: var(--ca-radius-md);
      padding: 8px 12px;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      background: var(--ca-surface);
      box-sizing: border-box;
    }
    .add-card-input input:focus {
      outline: none;
      border-color: var(--ca-text-primary);
    }

    /* Drag state */
    ca-kanban-card {
      transition: opacity var(--ca-transition-fast);
    }
    ca-kanban-card.dragging {
      opacity: 0.4;
    }
    .drop-indicator {
      height: 3px;
      background-color: var(--ca-color-primary);
      border-radius: 2px;
      margin: -2px 0;
    }
  `;
ne([
  l({ type: Array, attribute: !1 })
], U.prototype, "columns", 2);
ne([
  l({ type: Boolean, attribute: "allow-create" })
], U.prototype, "allowCreate", 2);
ne([
  h()
], U.prototype, "_dragCardId", 2);
ne([
  h()
], U.prototype, "_dragFromColumnId", 2);
ne([
  h()
], U.prototype, "_dragOverColumnId", 2);
ne([
  h()
], U.prototype, "_dragOverIndex", 2);
ne([
  h()
], U.prototype, "_addingColumnId", 2);
ne([
  h()
], U.prototype, "_addCardValue", 2);
U = ne([
  g("ca-kanban-board")
], U);
var sa = Object.defineProperty, na = Object.getOwnPropertyDescriptor, $e = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? na(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && sa(t, r, i), i;
};
let te = class extends v {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "Write something...", this.toolbar = ["bold", "italic", "underline", "|", "h1", "h2", "|", "ul", "ol", "|", "blockquote", "code", "|", "link"], this.readonly = !1, this.minHeight = "", this._activeFormats = /* @__PURE__ */ new Set(), this._debounceTimer = null;
  }
  updated(e) {
    e.has("value") && this._editor && this._editor.innerHTML !== this.value && (this._editor.innerHTML = this.value);
  }
  _handleInput() {
    this._debounceTimer && clearTimeout(this._debounceTimer), this._debounceTimer = setTimeout(() => {
      const e = this._editor?.innerHTML || "";
      this.dispatchEvent(
        new CustomEvent("ca-change", {
          detail: { value: e },
          bubbles: !0,
          composed: !0
        })
      );
    }, 150), this._updateActiveFormats(), this._checkMention();
  }
  _handleKeyDown(e) {
    (e.metaKey || e.ctrlKey) && (e.key === "b" && (e.preventDefault(), this._execCommand("bold")), e.key === "i" && (e.preventDefault(), this._execCommand("italic")), e.key === "u" && (e.preventDefault(), this._execCommand("underline")));
  }
  _execCommand(e, t) {
    if (!this.readonly) {
      switch (this._editor?.focus(), e) {
        case "bold":
          document.execCommand("bold");
          break;
        case "italic":
          document.execCommand("italic");
          break;
        case "underline":
          document.execCommand("underline");
          break;
        case "h1":
          document.execCommand("formatBlock", !1, "<h1>");
          break;
        case "h2":
          document.execCommand("formatBlock", !1, "<h2>");
          break;
        case "ul":
          document.execCommand("insertUnorderedList");
          break;
        case "ol":
          document.execCommand("insertOrderedList");
          break;
        case "blockquote":
          document.execCommand("formatBlock", !1, "<blockquote>");
          break;
        case "code":
          document.execCommand("formatBlock", !1, "<pre>");
          break;
        case "link": {
          const r = prompt("Enter URL:");
          r && document.execCommand("createLink", !1, r);
          break;
        }
      }
      this._updateActiveFormats(), this._handleInput();
    }
  }
  _updateActiveFormats() {
    const e = /* @__PURE__ */ new Set();
    document.queryCommandState("bold") && e.add("bold"), document.queryCommandState("italic") && e.add("italic"), document.queryCommandState("underline") && e.add("underline"), document.queryCommandState("insertUnorderedList") && e.add("ul"), document.queryCommandState("insertOrderedList") && e.add("ol"), this._activeFormats = e;
  }
  _checkMention() {
    const e = this.shadowRoot?.getSelection?.() || window.getSelection();
    if (!e || e.rangeCount === 0) return;
    const t = e.getRangeAt(0), r = t.startContainer.textContent || "", o = t.startOffset, i = r.substring(0, o), a = i.lastIndexOf("@");
    if (a >= 0 && (a === 0 || i[a - 1] === " ")) {
      const s = i.substring(a + 1);
      this.dispatchEvent(
        new CustomEvent("ca-mention", {
          detail: { query: s },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  _getToolbarIcon(e) {
    switch (e) {
      case "bold":
        return n`<svg viewBox="0 0 16 16" fill="none"><path d="M4 2h5a3 3 0 012 5.2A3 3 0 0110 14H4V2z" stroke="currentColor" stroke-width="1.5"/><path d="M4 8h6" stroke="currentColor" stroke-width="1.5"/></svg>`;
      case "italic":
        return n`<svg viewBox="0 0 16 16" fill="none"><path d="M10 2H6M10 14H6M9 2L7 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      case "underline":
        return n`<svg viewBox="0 0 16 16" fill="none"><path d="M4 2v5a4 4 0 008 0V2M3 14h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      case "h1":
        return n`<svg viewBox="0 0 16 16" fill="none"><text x="2" y="12" font-size="11" font-weight="bold" fill="currentColor">H1</text></svg>`;
      case "h2":
        return n`<svg viewBox="0 0 16 16" fill="none"><text x="2" y="12" font-size="11" font-weight="bold" fill="currentColor">H2</text></svg>`;
      case "ul":
        return n`<svg viewBox="0 0 16 16" fill="none"><circle cx="3" cy="4" r="1.5" fill="currentColor"/><circle cx="3" cy="8" r="1.5" fill="currentColor"/><circle cx="3" cy="12" r="1.5" fill="currentColor"/><path d="M6 4h8M6 8h8M6 12h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      case "ol":
        return n`<svg viewBox="0 0 16 16" fill="none"><text x="1" y="6" font-size="8" fill="currentColor">1.</text><text x="1" y="10" font-size="8" fill="currentColor">2.</text><text x="1" y="14" font-size="8" fill="currentColor">3.</text><path d="M6 4h8M6 8h8M6 12h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      case "blockquote":
        return n`<svg viewBox="0 0 16 16" fill="none"><path d="M3 3v10M6 5h7M6 8h5M6 11h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      case "code":
        return n`<svg viewBox="0 0 16 16" fill="none"><path d="M5 4L1 8l4 4M11 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case "link":
        return n`<svg viewBox="0 0 16 16" fill="none"><path d="M7 9l2-2M6 12l-1 1a2.5 2.5 0 01-3.5-3.5l1-1M10 4l1-1a2.5 2.5 0 013.5 3.5l-1 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      default:
        return c;
    }
  }
  render() {
    return n`
      <div class="editor-wrapper">
        ${this.readonly ? c : n`
              <div class="toolbar">
                ${this.toolbar.map(
      (e) => e === "|" ? n`<div class="toolbar-divider"></div>` : n`
                        <button
                          class=${u({ "toolbar-btn": !0, active: this._activeFormats.has(e) })}
                          @click=${() => this._execCommand(e)}
                          title=${e}
                          type="button"
                        >
                          ${this._getToolbarIcon(e)}
                        </button>
                      `
    )}
              </div>
            `}
        <div
          class="editor"
          contenteditable=${this.readonly ? "false" : "true"}
          data-placeholder=${this.placeholder}
          style=${this.minHeight ? `min-height:${this.minHeight}` : ""}
          @input=${this._handleInput}
          @keydown=${this._handleKeyDown}
          @mouseup=${() => this._updateActiveFormats()}
          @keyup=${() => this._updateActiveFormats()}
        ></div>
      </div>
    `;
  }
};
te.styles = b`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }
    .editor-wrapper {
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      overflow: hidden;
      background: var(--ca-surface);
      transition: border-color var(--ca-transition-fast);
    }
    .editor-wrapper:focus-within {
      border-color: var(--ca-text-primary);
    }
    :host([readonly]) .editor-wrapper {
      background: var(--ca-surface-active);
    }

    /* ── Toolbar ── */
    .toolbar {
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 6px 8px;
      border-bottom: 1px solid var(--ca-border);
      flex-wrap: wrap;
    }
    .toolbar-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background: none;
      cursor: pointer;
      color: var(--ca-text-secondary);
      padding: 0;
      transition: background-color var(--ca-transition-fast), color var(--ca-transition-fast);
    }
    .toolbar-btn:hover {
      background: var(--ca-surface-hover);
      color: var(--ca-text-primary);
    }
    .toolbar-btn.active {
      background: var(--ca-surface-active);
      color: var(--ca-text-primary);
    }
    .toolbar-btn svg {
      width: 16px;
      height: 16px;
    }
    .toolbar-divider {
      width: 1px;
      height: 20px;
      background: var(--ca-border);
      margin: 0 4px;
    }

    /* ── Editor area ── */
    .editor {
      padding: 12px;
      outline: none;
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      line-height: 1.6;
      min-height: var(--ca-rte-min-height, 120px);
      max-height: 400px;
      overflow-y: auto;
    }
    .editor:empty::before {
      content: attr(data-placeholder);
      color: var(--ca-text-muted);
      pointer-events: none;
    }
    .editor p { margin: 0 0 8px; }
    .editor h1 { font-size: 1.5em; margin: 0 0 8px; font-weight: var(--ca-font-weight-semibold); }
    .editor h2 { font-size: 1.25em; margin: 0 0 8px; font-weight: var(--ca-font-weight-semibold); }
    .editor h3 { font-size: 1.1em; margin: 0 0 8px; font-weight: var(--ca-font-weight-semibold); }
    .editor ul, .editor ol { margin: 0 0 8px; padding-left: 24px; }
    .editor blockquote {
      margin: 0 0 8px;
      padding: 8px 16px;
      border-left: 3px solid var(--ca-border-strong);
      color: var(--ca-text-secondary);
    }
    .editor code {
      background: var(--ca-surface-active);
      padding: 2px 4px;
      border-radius: var(--ca-radius-sm);
      font-size: 0.9em;
    }
    .editor pre {
      background: var(--ca-surface-active);
      padding: 12px;
      border-radius: var(--ca-radius-md);
      overflow-x: auto;
      margin: 0 0 8px;
    }
    .editor a { color: var(--ca-color-link); }
    .editor img { max-width: 100%; border-radius: var(--ca-radius-md); }
  `;
$e([
  l({ type: String })
], te.prototype, "value", 2);
$e([
  l({ type: String })
], te.prototype, "placeholder", 2);
$e([
  l({ type: Array, attribute: !1 })
], te.prototype, "toolbar", 2);
$e([
  l({ type: Boolean, reflect: !0 })
], te.prototype, "readonly", 2);
$e([
  l({ type: String, attribute: "min-height" })
], te.prototype, "minHeight", 2);
$e([
  h()
], te.prototype, "_activeFormats", 2);
$e([
  R(".editor")
], te.prototype, "_editor", 2);
te = $e([
  g("ca-rich-text-editor")
], te);
var la = Object.defineProperty, ca = Object.getOwnPropertyDescriptor, Le = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ca(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && la(t, r, i), i;
};
let oe = class extends v {
  constructor() {
    super(...arguments), this.comments = [], this.currentUser = { name: "" }, this._editingId = null, this._editText = "", this._newText = "";
  }
  _startEdit(e) {
    this._editingId = e.id, this._editText = e.text;
  }
  _cancelEdit() {
    this._editingId = null, this._editText = "";
  }
  _saveEdit() {
    !this._editingId || !this._editText.trim() || (this.dispatchEvent(
      new CustomEvent("ca-edit", {
        detail: { id: this._editingId, text: this._editText.trim() },
        bubbles: !0,
        composed: !0
      })
    ), this._editingId = null, this._editText = "");
  }
  _handleDelete(e) {
    this.dispatchEvent(
      new CustomEvent("ca-delete", {
        detail: { id: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleSubmit() {
    this._newText.trim() && (this.dispatchEvent(
      new CustomEvent("ca-submit", {
        detail: { text: this._newText.trim() },
        bubbles: !0,
        composed: !0
      })
    ), this._newText = "");
  }
  _handleKeydown(e) {
    e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), this._handleSubmit());
  }
  render() {
    return n`
      <div class="comments">
        ${this.comments.map(
      (e) => this._editingId === e.id ? this._renderEditMode(e) : this._renderComment(e)
    )}
      </div>
      ${this._renderInput()}
    `;
  }
  _renderComment(e) {
    return n`
      <div class="comment">
        <div class="comment-avatar">
          <ca-avatar
            size="sm"
            name=${e.user.name}
            src=${e.user.src ?? ""}
          ></ca-avatar>
        </div>
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-name">${e.user.name}</span>
            <span class="comment-time">${e.timestamp}</span>
            ${e.edited ? n`<span class="comment-edited">(edited)</span>` : c}
          </div>
          <div class="comment-text">${e.text}</div>
          <div class="comment-actions">
            <button
              class="action-btn"
              @click=${() => this._startEdit(e)}
            >
              Edit
            </button>
            <button
              class="action-btn danger"
              @click=${() => this._handleDelete(e.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    `;
  }
  _renderEditMode(e) {
    return n`
      <div class="comment">
        <div class="comment-avatar">
          <ca-avatar
            size="sm"
            name=${e.user.name}
            src=${e.user.src ?? ""}
          ></ca-avatar>
        </div>
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-name">${e.user.name}</span>
          </div>
          <div class="edit-area">
            <textarea
              class="edit-textarea"
              rows="3"
              .value=${this._editText}
              @input=${(t) => {
      this._editText = t.target.value;
    }}
            ></textarea>
            <div class="edit-buttons">
              <button class="edit-save-btn" @click=${this._saveEdit}>
                Save
              </button>
              <button class="edit-cancel-btn" @click=${this._cancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  _renderInput() {
    return n`
      <div class="input-area">
        <div class="input-avatar">
          <ca-avatar
            size="sm"
            name=${this.currentUser.name}
            src=${this.currentUser.src ?? ""}
          ></ca-avatar>
        </div>
        <div class="input-form">
          <textarea
            class="input-textarea"
            rows="2"
            placeholder="Write a comment..."
            .value=${this._newText}
            @input=${(e) => {
      this._newText = e.target.value;
    }}
            @keydown=${this._handleKeydown}
          ></textarea>
          <div class="submit-row">
            <button
              class="submit-btn"
              ?disabled=${!this._newText.trim()}
              @click=${this._handleSubmit}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
oe.styles = b`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }

    /* ── Comment list ── */
    .comments {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .comment {
      display: flex;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid var(--ca-border);
    }
    .comment:last-child {
      border-bottom: none;
    }
    .comment-avatar {
      flex-shrink: 0;
      padding-top: 2px;
    }
    .comment-body {
      flex: 1;
      min-width: 0;
    }
    .comment-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .comment-name {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      line-height: 1;
    }
    .comment-time {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      line-height: 1;
    }
    .comment-edited {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      font-style: italic;
      line-height: 1;
    }
    .comment-text {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .comment-actions {
      display: flex;
      gap: 4px;
      margin-top: 6px;
    }
    .action-btn {
      padding: 2px 8px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background: none;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      cursor: pointer;
      line-height: 1.4;
      transition: color var(--ca-transition-fast),
        background-color var(--ca-transition-fast);
    }
    .action-btn:hover {
      color: var(--ca-text-primary);
      background-color: var(--ca-surface-hover);
    }
    .action-btn.danger:hover {
      color: var(--ca-color-danger);
    }
    .action-btn:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 1px;
    }

    /* ── Edit mode ── */
    .edit-area {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 4px;
    }
    .edit-textarea {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      line-height: 1.5;
      resize: vertical;
      box-sizing: border-box;
    }
    .edit-textarea:focus {
      outline: none;
      border: 2px solid var(--ca-text-primary);
    }
    .edit-buttons {
      display: flex;
      gap: 6px;
    }
    .edit-save-btn,
    .edit-cancel-btn {
      padding: 4px 12px;
      border-radius: var(--ca-radius-md);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-semibold);
      cursor: pointer;
      line-height: 1.4;
      border: 1px solid var(--ca-border);
    }
    .edit-save-btn {
      background-color: var(--ca-color-primary);
      color: var(--ca-color-white);
      border-color: var(--ca-color-primary);
    }
    .edit-save-btn:hover {
      background-color: var(--ca-color-primary-pressed);
    }
    .edit-cancel-btn {
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
    }
    .edit-cancel-btn:hover {
      background-color: var(--ca-surface-hover);
    }

    /* ── Input area ── */
    .input-area {
      display: flex;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid var(--ca-border);
      margin-top: 4px;
    }
    .input-avatar {
      flex-shrink: 0;
      padding-top: 2px;
    }
    .input-form {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .input-textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      line-height: 1.5;
      resize: vertical;
      box-sizing: border-box;
    }
    .input-textarea::placeholder {
      color: var(--ca-text-muted);
    }
    .input-textarea:focus {
      outline: none;
      border: 2px solid var(--ca-text-primary);
    }
    .submit-row {
      display: flex;
      justify-content: flex-end;
    }
    .submit-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px 16px;
      border: none;
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-color-primary);
      color: var(--ca-color-white);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      cursor: pointer;
      transition: background-color var(--ca-transition-fast);
    }
    .submit-btn:hover {
      background-color: var(--ca-color-primary-pressed);
    }
    .submit-btn:disabled {
      background-color: var(--ca-color-disabled);
      color: var(--ca-color-disabled-text);
      cursor: not-allowed;
    }
    .submit-btn:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 2px;
    }
  `;
Le([
  l({ type: Array })
], oe.prototype, "comments", 2);
Le([
  l({ type: Object, attribute: "current-user" })
], oe.prototype, "currentUser", 2);
Le([
  h()
], oe.prototype, "_editingId", 2);
Le([
  h()
], oe.prototype, "_editText", 2);
Le([
  h()
], oe.prototype, "_newText", 2);
Le([
  R(".input-textarea")
], oe.prototype, "_inputEl", 2);
oe = Le([
  g("ca-comment-thread")
], oe);
var da = Object.defineProperty, pa = Object.getOwnPropertyDescriptor, sr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? pa(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && da(t, r, i), i;
};
let ut = class extends v {
  constructor() {
    super(...arguments), this.entries = [], this.loading = !1;
  }
  _handleLoadMore() {
    this.dispatchEvent(
      new CustomEvent("ca-load-more", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return this.loading && this.entries.length === 0 ? n`<div class="loading">Loading activity...</div>` : n`
      <ul class="timeline">
        ${this.entries.map(
      (e) => n`
            <li class="entry">
              <div class="avatar-col">
                <ca-avatar
                  size="sm"
                  name=${e.user.name}
                  src=${e.user.src ?? ""}
                ></ca-avatar>
              </div>
              <div class="content">
                <div class="action-row">
                  <span class="user-name">${e.user.name}</span>
                  <span class="action-text">${e.action}</span>
                </div>
                <div class="timestamp">${e.timestamp}</div>
                ${e.details ? n`<div class="details">${e.details}</div>` : c}
              </div>
            </li>
          `
    )}
      </ul>
      ${this.entries.length > 0 ? n`
            <div class="load-more-wrapper">
              <button
                class="load-more-btn"
                @click=${this._handleLoadMore}
                ?disabled=${this.loading}
              >
                ${this.loading ? "Loading..." : "Load more"}
              </button>
            </div>
          ` : c}
    `;
  }
};
ut.styles = b`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }
    .timeline {
      position: relative;
      padding: 0;
      margin: 0;
      list-style: none;
    }
    /* Vertical dotted line */
    .timeline::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 19px;
      width: 1px;
      border-left: 2px dotted var(--ca-border);
    }
    .entry {
      position: relative;
      display: flex;
      gap: 12px;
      padding: 12px 0;
    }
    .entry:first-child {
      padding-top: 0;
    }
    .entry:last-child {
      padding-bottom: 0;
    }
    .avatar-col {
      position: relative;
      z-index: 1;
      flex-shrink: 0;
    }
    .content {
      flex: 1;
      min-width: 0;
      padding-top: 2px;
    }
    .action-row {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 6px;
    }
    .user-name {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      line-height: 1.4;
    }
    .action-text {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
      line-height: 1.4;
    }
    .timestamp {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      line-height: 1.4;
      margin-top: 2px;
    }
    .details {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-muted);
      line-height: 1.5;
      margin-top: 4px;
    }
    .load-more-wrapper {
      display: flex;
      justify-content: center;
      padding-top: 16px;
    }
    .load-more-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px 16px;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      cursor: pointer;
      transition: background-color var(--ca-transition-fast),
        border-color var(--ca-transition-fast);
    }
    .load-more-btn:hover {
      background-color: var(--ca-surface-hover);
      border-color: var(--ca-border-strong);
    }
    .load-more-btn:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 2px;
    }
    .loading {
      display: flex;
      justify-content: center;
      padding: 24px 0;
      color: var(--ca-text-muted);
      font-size: var(--ca-font-size-sm);
    }
  `;
sr([
  l({ type: Array })
], ut.prototype, "entries", 2);
sr([
  l({ type: Boolean })
], ut.prototype, "loading", 2);
ut = sr([
  g("ca-activity-timeline")
], ut);
var ha = Object.defineProperty, ua = Object.getOwnPropertyDescriptor, Re = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ua(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && ha(t, r, i), i;
};
let ae = class extends v {
  constructor() {
    super(...arguments), this.entries = [], this.allowAdd = !1, this.totalLogged = 0, this._addDuration = "", this._addDescription = "", this._addBillable = !1;
  }
  /**
   * Format minutes into "Xh Ym" display.
   */
  _formatDuration(e) {
    const t = Math.floor(e / 60), r = e % 60;
    return t === 0 ? `${r}m` : r === 0 ? `${t}h` : `${t}h ${r}m`;
  }
  /**
   * Parse a duration string like "2h 30m", "2.5", "90m", "1h" into minutes.
   */
  _parseDuration(e) {
    const t = e.trim().toLowerCase();
    if (!t) return 0;
    const r = t.match(
      /^(\d+(?:\.\d+)?)\s*h(?:\s*(\d+)\s*m)?$/
    );
    if (r) {
      const a = parseFloat(r[1]), s = r[2] ? parseInt(r[2], 10) : 0;
      return Math.round(a * 60) + s;
    }
    const o = t.match(/^(\d+)\s*m$/);
    if (o)
      return parseInt(o[1], 10);
    const i = parseFloat(t);
    return isNaN(i) ? 0 : Math.round(i * 60);
  }
  _handleDelete(e) {
    this.dispatchEvent(
      new CustomEvent("ca-delete", {
        detail: { id: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleAdd() {
    const e = this._parseDuration(this._addDuration);
    e <= 0 || (this.dispatchEvent(
      new CustomEvent("ca-add", {
        detail: {
          duration: e,
          description: this._addDescription.trim(),
          billable: this._addBillable
        },
        bubbles: !0,
        composed: !0
      })
    ), this._addDuration = "", this._addDescription = "", this._addBillable = !1);
  }
  _handleKeydown(e) {
    e.key === "Enter" && (e.preventDefault(), this._handleAdd());
  }
  render() {
    return n`
      <div class="header">
        <span class="header-label">Time logged</span>
        <span class="header-total">${this._formatDuration(this.totalLogged)}</span>
      </div>

      ${this.entries.length === 0 ? n`<div class="empty">No time entries yet</div>` : n`
            <ul class="entries">
              ${this.entries.map(
      (e) => n`
                  <li class="entry">
                    <span class="entry-duration">
                      ${this._formatDuration(e.duration)}
                    </span>
                    <div class="entry-details">
                      ${e.description ? n`<div class="entry-desc">${e.description}</div>` : c}
                      <div class="entry-meta">
                        <span class="entry-user">${e.user}</span>
                        <span class="entry-date">${e.date}</span>
                        ${e.billable ? n`<span class="entry-billable">Billable</span>` : c}
                      </div>
                    </div>
                    <button
                      class="entry-delete"
                      aria-label="Delete time entry"
                      @click=${() => this._handleDelete(e.id)}
                    >
                      &times;
                    </button>
                  </li>
                `
    )}
            </ul>
          `}

      ${this.allowAdd ? this._renderAddRow() : c}
    `;
  }
  _renderAddRow() {
    const e = this._parseDuration(this._addDuration) > 0;
    return n`
      <div class="add-row">
        <input
          class="add-duration-input"
          type="text"
          placeholder="e.g. 1h 30m"
          .value=${this._addDuration}
          @input=${(t) => {
      this._addDuration = t.target.value;
    }}
          @keydown=${this._handleKeydown}
        />
        <input
          class="add-desc-input"
          type="text"
          placeholder="Description (optional)"
          .value=${this._addDescription}
          @input=${(t) => {
      this._addDescription = t.target.value;
    }}
          @keydown=${this._handleKeydown}
        />
        <label class="add-billable-label">
          <input
            type="checkbox"
            .checked=${this._addBillable}
            @change=${(t) => {
      this._addBillable = t.target.checked;
    }}
          />
          Billable
        </label>
        <button
          class="add-btn"
          ?disabled=${!e}
          @click=${this._handleAdd}
        >
          Add
        </button>
      </div>
    `;
  }
};
ae.styles = b`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }

    /* ── Header / Total ── */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--ca-border);
      margin-bottom: 4px;
    }
    .header-label {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }
    .header-total {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }

    /* ── Entries list ── */
    .entries {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .entry {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid var(--ca-border);
    }
    .entry:last-child {
      border-bottom: none;
    }
    .entry-duration {
      flex-shrink: 0;
      min-width: 64px;
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }
    .entry-details {
      flex: 1;
      min-width: 0;
    }
    .entry-desc {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      line-height: 1.4;
      word-break: break-word;
    }
    .entry-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 2px;
    }
    .entry-user {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
    }
    .entry-date {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
    }
    .entry-billable {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-color-success);
      font-weight: var(--ca-font-weight-semibold);
    }
    .entry-delete {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background: none;
      color: var(--ca-text-muted);
      cursor: pointer;
      font-size: 16px;
      transition: color var(--ca-transition-fast),
        background-color var(--ca-transition-fast);
    }
    .entry-delete:hover {
      color: var(--ca-color-danger);
      background-color: var(--ca-surface-hover);
    }
    .entry-delete:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 1px;
    }

    /* ── Add row ── */
    .add-row {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding-top: 12px;
      border-top: 1px solid var(--ca-border);
      margin-top: 4px;
    }
    .add-duration-input {
      width: 80px;
      flex-shrink: 0;
      padding: 8px 10px;
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      box-sizing: border-box;
    }
    .add-duration-input::placeholder {
      color: var(--ca-text-muted);
    }
    .add-duration-input:focus {
      outline: none;
      border: 2px solid var(--ca-text-primary);
    }
    .add-desc-input {
      flex: 1;
      padding: 8px 10px;
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      box-sizing: border-box;
    }
    .add-desc-input::placeholder {
      color: var(--ca-text-muted);
    }
    .add-desc-input:focus {
      outline: none;
      border: 2px solid var(--ca-text-primary);
    }
    .add-billable-label {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
      cursor: pointer;
      user-select: none;
      padding-top: 8px;
    }
    .add-billable-label input[type='checkbox'] {
      accent-color: var(--ca-color-primary);
      cursor: pointer;
    }
    .add-btn {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px 16px;
      border: none;
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-color-primary);
      color: var(--ca-color-white);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      cursor: pointer;
      transition: background-color var(--ca-transition-fast);
    }
    .add-btn:hover {
      background-color: var(--ca-color-primary-pressed);
    }
    .add-btn:disabled {
      background-color: var(--ca-color-disabled);
      color: var(--ca-color-disabled-text);
      cursor: not-allowed;
    }
    .add-btn:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 2px;
    }

    .empty {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-muted);
      text-align: center;
      padding: 24px 0;
    }
  `;
Re([
  l({ type: Array })
], ae.prototype, "entries", 2);
Re([
  l({ type: Boolean, attribute: "allow-add" })
], ae.prototype, "allowAdd", 2);
Re([
  l({ type: Number, attribute: "total-logged" })
], ae.prototype, "totalLogged", 2);
Re([
  h()
], ae.prototype, "_addDuration", 2);
Re([
  h()
], ae.prototype, "_addDescription", 2);
Re([
  h()
], ae.prototype, "_addBillable", 2);
ae = Re([
  g("ca-time-log")
], ae);
var fa = Object.defineProperty, va = Object.getOwnPropertyDescriptor, nr = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? va(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && fa(t, r, i), i;
};
let ft = class extends v {
  constructor() {
    super(...arguments), this.items = [], this.separator = "/";
  }
  _handleClick(e) {
    this.dispatchEvent(
      new CustomEvent("ca-navigate", {
        detail: { item: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return n`
      ${this.items.map((e, t) => {
      const r = t === this.items.length - 1;
      return n`
          ${t > 0 ? n`<span class="separator">${this.separator}</span>` : c}
          <span class="item">
            ${r ? n`<span class="current">${e.label}</span>` : e.href ? n`<a class="link" href=${e.href} @click=${(o) => {
        o.preventDefault(), this._handleClick(e);
      }}>${e.label}</a>` : n`<button class="link" @click=${() => this._handleClick(e)}>${e.label}</button>`}
          </span>
        `;
    })}
    `;
  }
};
ft.styles = b`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
    }
    .separator {
      color: var(--ca-text-tertiary);
      user-select: none;
    }
    .item {
      display: inline-flex;
      align-items: center;
    }
    .link {
      color: var(--ca-text-secondary);
      text-decoration: none;
      cursor: pointer;
      border-radius: var(--ca-radius-sm);
      padding: 2px 4px;
      margin: -2px -4px;
      background: none;
      border: none;
      font: inherit;
      line-height: inherit;
    }
    .link:hover {
      color: var(--ca-text-primary);
      background-color: var(--ca-surface-hover);
    }
    .link:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 2px;
    }
    .current {
      color: var(--ca-text-primary);
      font-weight: var(--ca-font-weight-semibold);
    }
  `;
nr([
  l({ type: Array })
], ft.prototype, "items", 2);
nr([
  l({ type: String })
], ft.prototype, "separator", 2);
ft = nr([
  g("ca-breadcrumb")
], ft);
var ga = Object.defineProperty, xa = Object.getOwnPropertyDescriptor, Ft = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? xa(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && ga(t, r, i), i;
};
let Ye = class extends v {
  constructor() {
    super(...arguments), this.heading = "", this.description = "", this.actionLabel = "";
  }
  _handleAction() {
    this.dispatchEvent(
      new CustomEvent("ca-action", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return n`
      <div class="illustration">
        <slot></slot>
      </div>
      ${this.heading ? n`<h3 class="heading">${this.heading}</h3>` : c}
      ${this.description ? n`<p class="description">${this.description}</p>` : c}
      ${this.actionLabel ? n`<button class="action-btn" @click=${this._handleAction}>${this.actionLabel}</button>` : c}
    `;
  }
};
Ye.styles = b`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--ca-space-xl) var(--ca-space-lg);
      font-family: var(--ca-font-family);
      color: var(--ca-text-primary);
    }
    .illustration {
      margin-bottom: var(--ca-space-md);
      color: var(--ca-text-tertiary);
    }
    .illustration ::slotted(*) {
      max-width: 160px;
      max-height: 160px;
    }
    .heading {
      margin: 0 0 8px;
      font-size: var(--ca-font-size-lg);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }
    .description {
      margin: 0 0 var(--ca-space-md);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-secondary);
      max-width: 360px;
      line-height: 1.5;
    }
    .action-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      border: none;
      border-radius: var(--ca-radius-md);
      background-color: var(--ca-color-primary);
      color: var(--ca-color-white);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      cursor: pointer;
      line-height: 1;
    }
    .action-btn:hover {
      opacity: 0.9;
    }
    .action-btn:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: 2px;
    }
  `;
Ft([
  l({ type: String })
], Ye.prototype, "heading", 2);
Ft([
  l({ type: String })
], Ye.prototype, "description", 2);
Ft([
  l({ type: String, attribute: "action-label" })
], Ye.prototype, "actionLabel", 2);
Ye = Ft([
  g("ca-empty-state")
], Ye);
var ba = Object.defineProperty, ma = Object.getOwnPropertyDescriptor, $t = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ma(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && ba(t, r, i), i;
};
let Te = class extends v {
  constructor() {
    super(...arguments), this.variant = "text", this.width = "", this.height = "", this.animation = "pulse";
  }
  updated(e) {
    super.updated?.(e), e.has("width") && (this.width ? this.style.width = this.width : this.style.removeProperty("width")), e.has("height") && (this.height ? this.style.height = this.height : this.style.removeProperty("height"));
  }
};
Te.styles = b`
    :host {
      display: block;
      background-color: var(--ca-surface-hover);
      overflow: hidden;
      position: relative;
    }

    /* Variants */
    :host([variant='text']), :host(:not([variant])) {
      border-radius: var(--ca-radius-sm);
      height: 1em;
    }
    :host([variant='circle']) {
      border-radius: var(--ca-radius-full);
    }
    :host([variant='rect']) {
      border-radius: 0;
    }

    /* Pulse animation */
    :host([animation='pulse']), :host(:not([animation])) {
      animation: pulse 1.5s ease-in-out infinite;
    }

    /* Wave animation */
    :host([animation='wave'])::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--ca-surface-elevated, rgba(255, 255, 255, 0.4)) 50%,
        transparent 100%
      );
      animation: wave 1.6s linear infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    @keyframes wave {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `;
$t([
  l({ type: String, reflect: !0 })
], Te.prototype, "variant", 2);
$t([
  l({ type: String })
], Te.prototype, "width", 2);
$t([
  l({ type: String })
], Te.prototype, "height", 2);
$t([
  l({ type: String, reflect: !0 })
], Te.prototype, "animation", 2);
Te = $t([
  g("ca-skeleton")
], Te);
var ya = Object.defineProperty, _a = Object.getOwnPropertyDescriptor, kt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? _a(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && ya(t, r, i), i;
};
let Be = class extends v {
  constructor() {
    super(...arguments), this.items = [], this.open = !1, this.x = 0, this.y = 0;
  }
  _handleSelect(e) {
    this.dispatchEvent(
      new CustomEvent("ca-select", {
        detail: { id: e.id },
        bubbles: !0,
        composed: !0
      })
    ), this._close();
  }
  _close() {
    this.open = !1, this.dispatchEvent(
      new CustomEvent("ca-close", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleOverlayClick() {
    this._close();
  }
  render() {
    return this.open ? n`
      <div class="overlay" @click=${this._handleOverlayClick} @contextmenu=${(e) => {
      e.preventDefault(), this._close();
    }}></div>
      <div class="menu" style="left:${this.x}px;top:${this.y}px;">
        ${this.items.map(
      (e) => n`
            ${e.divider ? n`<hr class="divider" />` : c}
            <button
              class="item ${e.danger ? "danger" : ""}"
              @click=${() => this._handleSelect(e)}
            >
              ${e.icon ? n`<span class="icon">${Oe(e.icon)}</span>` : c}
              ${e.label}
            </button>
          `
    )}
      </div>
    ` : c;
  }
};
Be.styles = b`
    :host {
      display: contents;
    }
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
    }
    .menu {
      position: fixed;
      z-index: 10000;
      background-color: var(--ca-surface-elevated);
      border-radius: var(--ca-radius-md);
      box-shadow: var(--ca-shadow-menu);
      padding: 6px 0;
      min-width: 180px;
      font-family: var(--ca-font-family);
      animation: fade-in 0.12s ease;
    }
    .item {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 16px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      text-align: left;
      line-height: 1;
      box-sizing: border-box;
    }
    .item:hover {
      background-color: var(--ca-surface-hover);
    }
    .item:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: -2px;
    }
    .item.danger {
      color: var(--ca-color-danger);
    }
    .item.danger:hover {
      background-color: var(--ca-color-danger);
      color: var(--ca-color-white);
    }
    .icon {
      display: inline-flex;
      width: 16px;
      height: 16px;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }
    .divider {
      height: 1px;
      background-color: var(--ca-border);
      margin: 4px 0;
      border: none;
    }
    @keyframes fade-in {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
kt([
  l({ type: Array })
], Be.prototype, "items", 2);
kt([
  l({ type: Boolean, reflect: !0 })
], Be.prototype, "open", 2);
kt([
  l({ type: Number })
], Be.prototype, "x", 2);
kt([
  l({ type: Number })
], Be.prototype, "y", 2);
Be = kt([
  g("ca-context-menu")
], Be);
var wa = Object.defineProperty, $a = Object.getOwnPropertyDescriptor, Nt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? $a(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && wa(t, r, i), i;
};
let Qe = class extends v {
  constructor() {
    super(...arguments), this.count = 0, this.open = !1, this.actions = [], this._closing = !1;
  }
  _handleAction(e) {
    this.dispatchEvent(
      new CustomEvent("ca-action", {
        detail: { id: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleClear() {
    this._closing = !0, this.requestUpdate();
    const e = this.shadowRoot?.querySelector(".bar"), t = () => {
      e?.removeEventListener("animationend", t), this._closing = !1, this.dispatchEvent(
        new CustomEvent("ca-clear", {
          bubbles: !0,
          composed: !0
        })
      );
    };
    e?.addEventListener("animationend", t);
  }
  render() {
    return !this.open && !this._closing ? c : n`
      <div class="bar ${this._closing ? "closing" : ""}">
        <span class="count">${this.count} selected</span>
        <span class="divider"></span>
        ${this.actions.map(
      (e) => n`
            <button
              class="action-btn"
              @click=${() => this._handleAction(e.id)}
              aria-label=${e.label}
            >
              ${e.icon ? n`<span class="action-icon" .innerHTML=${e.icon}></span>` : c}
              ${e.label}
            </button>
          `
    )}
        <span class="divider"></span>
        <button
          class="clear-btn"
          @click=${this._handleClear}
          aria-label="Clear selection"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    `;
  }
};
Qe.styles = b`
    :host {
      display: contents;
      font-family: var(--ca-font-family);
    }
    .bar {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 8000;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      background-color: var(--ca-color-secondary);
      color: var(--ca-color-secondary-text, var(--ca-color-white));
      border-radius: var(--ca-radius-lg);
      box-shadow: var(--ca-shadow-lg);
      white-space: nowrap;
      animation: bar-slide-up 0.25s ease forwards;
    }
    .bar.closing {
      animation: bar-slide-down 0.2s ease forwards;
    }
    @keyframes bar-slide-up {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
    @keyframes bar-slide-down {
      from {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      to {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
    }
    .count {
      font-size: 14px;
      font-weight: var(--ca-font-weight-semibold, 600);
      padding-right: 4px;
    }
    .divider {
      width: 1px;
      height: 20px;
      background-color: currentColor;
      opacity: 0.3;
      flex-shrink: 0;
    }
    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border: none;
      border-radius: var(--ca-radius-sm);
      background-color: rgba(255, 255, 255, 0.15);
      color: inherit;
      font-family: var(--ca-font-family);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      line-height: 1;
      white-space: nowrap;
      transition: background-color var(--ca-transition-fast);
    }
    .action-btn:hover {
      background-color: rgba(255, 255, 255, 0.25);
    }
    .action-btn:active {
      background-color: rgba(255, 255, 255, 0.35);
    }
    .action-btn:focus-visible {
      outline: 2px solid var(--ca-color-white);
      outline-offset: 1px;
    }
    .action-icon {
      display: inline-flex;
      align-items: center;
      width: 14px;
      height: 14px;
    }
    .action-icon ::slotted(svg),
    .action-icon svg {
      width: 100%;
      height: 100%;
    }
    .clear-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      margin-left: 4px;
      border: none;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.15);
      color: inherit;
      cursor: pointer;
      line-height: 0;
      transition: background-color var(--ca-transition-fast);
    }
    .clear-btn:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    .clear-btn:active {
      background-color: rgba(255, 255, 255, 0.4);
    }
    .clear-btn:focus-visible {
      outline: 2px solid var(--ca-color-white);
      outline-offset: 1px;
    }
  `;
Nt([
  l({ type: Number })
], Qe.prototype, "count", 2);
Nt([
  l({ type: Boolean, reflect: !0 })
], Qe.prototype, "open", 2);
Nt([
  l({ type: Array })
], Qe.prototype, "actions", 2);
Qe = Nt([
  g("ca-bulk-action-bar")
], Qe);
var ka = Object.defineProperty, za = Object.getOwnPropertyDescriptor, Fe = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? za(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && ka(t, r, i), i;
};
let se = class extends v {
  constructor() {
    super(...arguments), this.open = !1, this.commands = [], this.placeholder = "Search commands...", this._query = "", this._focusedIndex = -1, this._previouslyFocused = null, this._boundKeydown = this._handleKeydown.bind(this);
  }
  updated(e) {
    e.has("open") && (this.open ? this._onOpen() : this._onClose());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._onClose();
  }
  _onOpen() {
    this._query = "", this._focusedIndex = -1, this._previouslyFocused = document.activeElement, document.body.style.overflow = "hidden", document.addEventListener("keydown", this._boundKeydown), this.updateComplete.then(() => {
      this._searchInput?.focus();
    });
  }
  _onClose() {
    document.body.style.overflow = "", document.removeEventListener("keydown", this._boundKeydown), this._previouslyFocused && (this._previouslyFocused.focus(), this._previouslyFocused = null);
  }
  get _filteredCommands() {
    const e = this._query.toLowerCase().trim();
    return e ? this.commands.filter((t) => t.label.toLowerCase().includes(e)) : this.commands;
  }
  _handleKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault(), this._emitClose();
      return;
    }
    const t = this._filteredCommands;
    e.key === "ArrowDown" ? (e.preventDefault(), this._focusedIndex = Math.min(this._focusedIndex + 1, t.length - 1)) : e.key === "ArrowUp" ? (e.preventDefault(), this._focusedIndex = Math.max(this._focusedIndex - 1, 0)) : e.key === "Enter" && this._focusedIndex >= 0 && this._focusedIndex < t.length && (e.preventDefault(), this._selectCommand(t[this._focusedIndex])), e.key === "Tab" && e.preventDefault();
  }
  _handleSearchInput(e) {
    const t = e.target;
    this._query = t.value, this._focusedIndex = -1, this.dispatchEvent(
      new CustomEvent("ca-search", {
        detail: { query: this._query },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _selectCommand(e) {
    this.dispatchEvent(
      new CustomEvent("ca-select", {
        detail: { id: e.id },
        bubbles: !0,
        composed: !0
      })
    ), this._emitClose();
  }
  _emitClose() {
    this.dispatchEvent(
      new CustomEvent("ca-close", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleOverlayClick(e) {
    e.target === e.currentTarget && this._emitClose();
  }
  render() {
    if (!this.open) return c;
    const e = this._filteredCommands, t = /* @__PURE__ */ new Map();
    for (const o of e) {
      const i = o.group ?? "";
      t.has(i) || t.set(i, []), t.get(i).push(o);
    }
    let r = 0;
    return n`
      <div class="overlay" @click=${this._handleOverlayClick}>
        <div class="panel" role="dialog" aria-modal="true" aria-label="Command palette">
          <div class="search-wrapper">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
              <path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <input
              class="search-input"
              type="text"
              .value=${this._query}
              placeholder=${this.placeholder}
              @input=${this._handleSearchInput}
            />
          </div>
          <div class="results" role="listbox">
            ${e.length === 0 ? n`<div class="empty">No commands found</div>` : Array.from(t.entries()).map(([o, i]) => n`
                  ${o ? n`<div class="group-header">${o}</div>` : c}
                  ${i.map((a) => {
      const s = r++;
      return n`
                      <button
                        class=${u({ command: !0, focused: s === this._focusedIndex })}
                        role="option"
                        @click=${() => this._selectCommand(a)}
                      >
                        ${a.icon ? n`<span class="command-icon">${Oe(a.icon)}</span>` : c}
                        <span class="command-label">${a.label}</span>
                        ${a.shortcut ? n`<span class="command-shortcut">${a.shortcut}</span>` : c}
                      </button>
                    `;
    })}
                `)}
          </div>
        </div>
      </div>
    `;
  }
};
se.styles = b`
    :host {
      display: contents;
      font-family: var(--ca-font-family);
    }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 9000;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 15vh;
      background-color: rgba(0, 0, 0, 0.5);
      animation: overlay-fade-in 0.15s ease;
    }

    .panel {
      width: 90%;
      max-width: 560px;
      background-color: var(--ca-surface-elevated);
      border-radius: var(--ca-radius-lg);
      box-shadow: var(--ca-shadow-lg);
      overflow: hidden;
      animation: panel-slide-down 0.2s ease;
      display: flex;
      flex-direction: column;
      max-height: 60vh;
    }

    .search-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 16px;
      border-bottom: 1px solid var(--ca-border);
    }

    .search-icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      color: var(--ca-text-muted);
    }

    .search-input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: transparent;
      color: var(--ca-text-primary);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-md);
      line-height: 1;
    }
    .search-input::placeholder {
      color: var(--ca-text-muted);
    }

    .results {
      overflow-y: auto;
      padding: 6px 0;
    }

    .group-header {
      padding: 8px 16px 4px;
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      user-select: none;
    }

    .command {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 16px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      text-align: left;
      box-sizing: border-box;
      transition: background-color var(--ca-transition-fast);
    }
    .command:hover,
    .command.focused {
      background-color: var(--ca-surface-hover);
    }

    .command-icon {
      display: inline-flex;
      width: 16px;
      height: 16px;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
      color: var(--ca-text-secondary);
    }

    .command-label {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .command-shortcut {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      flex-shrink: 0;
      white-space: nowrap;
    }

    .empty {
      padding: 24px 16px;
      text-align: center;
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-muted);
    }

    @keyframes overlay-fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes panel-slide-down {
      from { opacity: 0; transform: translateY(-12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
Fe([
  l({ type: Boolean, reflect: !0 })
], se.prototype, "open", 2);
Fe([
  l({ type: Array })
], se.prototype, "commands", 2);
Fe([
  l({ type: String })
], se.prototype, "placeholder", 2);
Fe([
  h()
], se.prototype, "_query", 2);
Fe([
  h()
], se.prototype, "_focusedIndex", 2);
Fe([
  R(".search-input")
], se.prototype, "_searchInput", 2);
se = Fe([
  g("ca-command-bar")
], se);
var Ca = Object.defineProperty, Oa = Object.getOwnPropertyDescriptor, Vt = (e, t, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Oa(t, r) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (o ? s(t, r, i) : s(i)) || i);
  return o && i && Ca(t, r, i), i;
};
let Ge = class extends v {
  constructor() {
    super(...arguments), this.notifications = [], this.unreadCount = 0, this.open = !1, this._boundClickOutside = this._handleClickOutside.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._boundClickOutside);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._boundClickOutside);
  }
  _handleClickOutside(e) {
    this.open && (e.composedPath().includes(this) || (this.open = !1));
  }
  _toggleDropdown() {
    this.open = !this.open;
  }
  _handleNotificationClick(e) {
    e.read || this.dispatchEvent(
      new CustomEvent("ca-read", {
        detail: { id: e.id },
        bubbles: !0,
        composed: !0
      })
    ), this.dispatchEvent(
      new CustomEvent("ca-click", {
        detail: { id: e.id },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleMarkAllRead() {
    for (const e of this.notifications)
      e.read || this.dispatchEvent(
        new CustomEvent("ca-read", {
          detail: { id: e.id },
          bubbles: !0,
          composed: !0
        })
      );
  }
  _handleClearAll() {
    this.dispatchEvent(
      new CustomEvent("ca-clear-all", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return n`
      <button class="trigger" @click=${this._toggleDropdown} aria-label="Notifications" aria-haspopup="true" aria-expanded=${this.open}>
        <svg class="bell-icon" viewBox="0 0 24 24" fill="none">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        ${this.unreadCount > 0 ? n`<span class="badge">${this.unreadCount > 99 ? "99+" : this.unreadCount}</span>` : c}
      </button>

      ${this.open ? n`
        <div class="dropdown">
          <div class="dropdown-header">
            <span class="dropdown-title">Notifications</span>
            <div class="header-actions">
              <button class="header-btn" @click=${this._handleMarkAllRead}>Mark all read</button>
              <button class="header-btn" @click=${this._handleClearAll}>Clear all</button>
            </div>
          </div>
          <div class="notification-list">
            ${this.notifications.length === 0 ? n`<div class="empty-state">No notifications</div>` : this.notifications.map((e) => n`
                  <button
                    class=${u({ "notification-item": !0, unread: !e.read })}
                    @click=${() => this._handleNotificationClick(e)}
                  >
                    ${e.read ? n`<span class="dot-placeholder"></span>` : n`<span class="unread-dot"></span>`}
                    <div class="notification-content">
                      <div class="notification-title">${e.title}</div>
                      ${e.body ? n`<div class="notification-body">${e.body}</div>` : c}
                      <div class="notification-timestamp">${e.timestamp}</div>
                    </div>
                  </button>
                `)}
          </div>
        </div>
      ` : c}
    `;
  }
};
Ge.styles = b`
    :host {
      display: inline-flex;
      position: relative;
      font-family: var(--ca-font-family);
    }

    .trigger {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      border-radius: var(--ca-radius-md);
      background: none;
      cursor: pointer;
      color: var(--ca-text-secondary);
      transition: background-color var(--ca-transition-fast), color var(--ca-transition-fast);
    }
    .trigger:hover {
      background-color: var(--ca-surface-hover);
      color: var(--ca-text-primary);
    }
    .trigger:focus-visible {
      outline: 2px solid var(--ca-color-focus-ring);
      outline-offset: 2px;
    }
    .trigger:focus:not(:focus-visible) {
      outline: none;
    }

    .bell-icon {
      width: 20px;
      height: 20px;
    }

    .badge {
      position: absolute;
      top: 4px;
      right: 4px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      border-radius: var(--ca-radius-full);
      background-color: var(--ca-color-danger);
      color: #fff;
      font-size: 10px;
      font-weight: var(--ca-font-weight-semibold);
      line-height: 16px;
      text-align: center;
      box-sizing: border-box;
    }

    /* Dropdown */
    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      z-index: 10;
      margin-top: 6px;
      width: 360px;
      max-height: 420px;
      background-color: var(--ca-surface-elevated);
      border: 1px solid var(--ca-border-strong);
      border-radius: var(--ca-radius-lg);
      box-shadow: var(--ca-shadow-menu);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: nc-fade-in 0.15s ease;
    }

    @keyframes nc-fade-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .dropdown-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid var(--ca-border);
    }

    .dropdown-title {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .header-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-color-primary);
      padding: 2px 6px;
      border-radius: var(--ca-radius-sm);
      transition: background-color var(--ca-transition-fast);
    }
    .header-btn:hover {
      background-color: var(--ca-surface-hover);
    }

    .notification-list {
      overflow-y: auto;
      flex: 1;
    }

    .notification-item {
      display: flex;
      gap: 10px;
      padding: 12px 16px;
      cursor: pointer;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-family: var(--ca-font-family);
      box-sizing: border-box;
      transition: background-color var(--ca-transition-fast);
      border-bottom: 1px solid var(--ca-border);
    }
    .notification-item:last-child {
      border-bottom: none;
    }
    .notification-item:hover {
      background-color: var(--ca-surface-hover);
    }
    .notification-item.unread {
      background-color: var(--ca-surface-selected);
    }
    .notification-item.unread:hover {
      background-color: var(--ca-surface-hover);
    }

    .unread-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--ca-color-primary);
      flex-shrink: 0;
      margin-top: 5px;
    }
    .dot-placeholder {
      width: 8px;
      flex-shrink: 0;
    }

    .notification-content {
      flex: 1;
      min-width: 0;
    }

    .notification-title {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .notification-body {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
      line-height: 1.4;
      margin-top: 2px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .notification-timestamp {
      font-size: 11px;
      color: var(--ca-text-muted);
      margin-top: 4px;
    }

    .empty-state {
      padding: 32px 16px;
      text-align: center;
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-muted);
    }
  `;
Vt([
  l({ type: Array })
], Ge.prototype, "notifications", 2);
Vt([
  l({ type: Number, attribute: "unread-count" })
], Ge.prototype, "unreadCount", 2);
Vt([
  l({ type: Boolean, reflect: !0 })
], Ge.prototype, "open", 2);
Ge = Vt([
  g("ca-notification-center")
], Ge);
export {
  Ne as MONTH_NAMES,
  ao as MONTH_NAMES_SHORT,
  so as WEEKDAY_LABELS,
  lo as buildCalendarGrid,
  it as formatDate,
  Ct as isDateDisabled,
  wr as isInRange,
  Y as isSameDay,
  ot as parseISODateString,
  Ut as toISODateString,
  Pa as toast
};
