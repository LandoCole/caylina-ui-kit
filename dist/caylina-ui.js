/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lt = globalThis, ir = Lt.ShadowRoot && (Lt.ShadyCSS === void 0 || Lt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, sr = Symbol(), mr = /* @__PURE__ */ new WeakMap();
let Br = class {
  constructor(t, r, a) {
    if (this._$cssResult$ = !0, a !== sr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (ir && t === void 0) {
      const a = r !== void 0 && r.length === 1;
      a && (t = mr.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), a && mr.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Wr = (e) => new Br(typeof e == "string" ? e : e + "", void 0, sr), b = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((a, o, i) => a + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[i + 1], e[0]);
  return new Br(r, e, sr);
}, Xr = (e, t) => {
  if (ir) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const a = document.createElement("style"), o = Lt.litNonce;
    o !== void 0 && a.setAttribute("nonce", o), a.textContent = r.cssText, e.appendChild(a);
  }
}, yr = ir ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const a of t.cssRules) r += a.cssText;
  return Wr(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Jr, defineProperty: Zr, getOwnPropertyDescriptor: eo, getOwnPropertyNames: to, getOwnPropertySymbols: ro, getPrototypeOf: oo } = Object, Ht = globalThis, wr = Ht.trustedTypes, ao = wr ? wr.emptyScript : "", io = Ht.reactiveElementPolyfillSupport, ht = (e, t) => e, Rt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ao : null;
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
} }, nr = (e, t) => !Jr(e, t), _r = { attribute: !0, type: String, converter: Rt, reflect: !1, useDefault: !1, hasChanged: nr };
Symbol.metadata ??= Symbol("metadata"), Ht.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Qe = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = _r) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const a = Symbol(), o = this.getPropertyDescriptor(t, a, r);
      o !== void 0 && Zr(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, r, a) {
    const { get: o, set: i } = eo(this.prototype, t) ?? { get() {
      return this[r];
    }, set(s) {
      this[r] = s;
    } };
    return { get: o, set(s) {
      const d = o?.call(this);
      i?.call(this, s), this.requestUpdate(t, d, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? _r;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ht("elementProperties"))) return;
    const t = oo(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ht("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ht("properties"))) {
      const r = this.properties, a = [...to(r), ...ro(r)];
      for (const o of a) this.createProperty(o, r[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [a, o] of r) this.elementProperties.set(a, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, a] of this.elementProperties) {
      const o = this._$Eu(r, a);
      o !== void 0 && this._$Eh.set(o, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const a = new Set(t.flat(1 / 0).reverse());
      for (const o of a) r.unshift(yr(o));
    } else t !== void 0 && r.push(yr(t));
    return r;
  }
  static _$Eu(t, r) {
    const a = r.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const a of r.keys()) this.hasOwnProperty(a) && (t.set(a, this[a]), delete this[a]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Xr(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, r, a) {
    this._$AK(t, a);
  }
  _$ET(t, r) {
    const a = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, a);
    if (o !== void 0 && a.reflect === !0) {
      const i = (a.converter?.toAttribute !== void 0 ? a.converter : Rt).toAttribute(r, a.type);
      this._$Em = t, i == null ? this.removeAttribute(o) : this.setAttribute(o, i), this._$Em = null;
    }
  }
  _$AK(t, r) {
    const a = this.constructor, o = a._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const i = a.getPropertyOptions(o), s = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : Rt;
      this._$Em = o;
      const d = s.fromAttribute(r, i.type);
      this[o] = d ?? this._$Ej?.get(o) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, r, a, o = !1, i) {
    if (t !== void 0) {
      const s = this.constructor;
      if (o === !1 && (i = this[t]), a ??= s.getPropertyOptions(t), !((a.hasChanged ?? nr)(i, r) || a.useDefault && a.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, a)))) return;
      this.C(t, r, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: a, reflect: o, wrapped: i }, s) {
    a && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, s ?? r ?? this[t]), i !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || a || (r = void 0), this._$AL.set(t, r)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, i] of this._$Ep) this[o] = i;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [o, i] of a) {
        const { wrapped: s } = i, d = this[o];
        s !== !0 || this._$AL.has(o) || d === void 0 || this.C(o, void 0, i, d);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), this._$EO?.forEach((a) => a.hostUpdate?.()), this.update(r)) : this._$EM();
    } catch (a) {
      throw t = !1, this._$EM(), a;
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
Qe.elementStyles = [], Qe.shadowRootOptions = { mode: "open" }, Qe[ht("elementProperties")] = /* @__PURE__ */ new Map(), Qe[ht("finalized")] = /* @__PURE__ */ new Map(), io?.({ ReactiveElement: Qe }), (Ht.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lr = globalThis, $r = (e) => e, Ft = lr.trustedTypes, kr = Ft ? Ft.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Lr = "$lit$", he = `lit$${Math.random().toFixed(9).slice(2)}$`, Rr = "?" + he, so = `<${Rr}>`, Ie = document, ut = () => Ie.createComment(""), vt = (e) => e === null || typeof e != "object" && typeof e != "function", cr = Array.isArray, no = (e) => cr(e) || typeof e?.[Symbol.iterator] == "function", Zt = `[ 	
\f\r]`, dt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, zr = /-->/g, Cr = />/g, Ee = RegExp(`>|${Zt}(?:([^\\s"'>=/]+)(${Zt}*=${Zt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Or = /'/g, Sr = /"/g, Fr = /^(?:script|style|textarea|title)$/i, lo = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), n = lo(1), ue = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), Dr = /* @__PURE__ */ new WeakMap(), Pe = Ie.createTreeWalker(Ie, 129);
function Nr(e, t) {
  if (!cr(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return kr !== void 0 ? kr.createHTML(t) : t;
}
const co = (e, t) => {
  const r = e.length - 1, a = [];
  let o, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = dt;
  for (let d = 0; d < r; d++) {
    const h = e[d];
    let m, x, u = -1, $ = 0;
    for (; $ < h.length && (s.lastIndex = $, x = s.exec(h), x !== null); ) $ = s.lastIndex, s === dt ? x[1] === "!--" ? s = zr : x[1] !== void 0 ? s = Cr : x[2] !== void 0 ? (Fr.test(x[2]) && (o = RegExp("</" + x[2], "g")), s = Ee) : x[3] !== void 0 && (s = Ee) : s === Ee ? x[0] === ">" ? (s = o ?? dt, u = -1) : x[1] === void 0 ? u = -2 : (u = s.lastIndex - x[2].length, m = x[1], s = x[3] === void 0 ? Ee : x[3] === '"' ? Sr : Or) : s === Sr || s === Or ? s = Ee : s === zr || s === Cr ? s = dt : (s = Ee, o = void 0);
    const _ = s === Ee && e[d + 1].startsWith("/>") ? " " : "";
    i += s === dt ? h + so : u >= 0 ? (a.push(m), h.slice(0, u) + Lr + h.slice(u) + he + _) : h + he + (u === -2 ? d : _);
  }
  return [Nr(e, i + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), a];
};
class ft {
  constructor({ strings: t, _$litType$: r }, a) {
    let o;
    this.parts = [];
    let i = 0, s = 0;
    const d = t.length - 1, h = this.parts, [m, x] = co(t, r);
    if (this.el = ft.createElement(m, a), Pe.currentNode = this.el.content, r === 2 || r === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = Pe.nextNode()) !== null && h.length < d; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(Lr)) {
          const $ = x[s++], _ = o.getAttribute(u).split(he), k = /([.?@])?(.*)/.exec($);
          h.push({ type: 1, index: i, name: k[2], strings: _, ctor: k[1] === "." ? ho : k[1] === "?" ? uo : k[1] === "@" ? vo : qt }), o.removeAttribute(u);
        } else u.startsWith(he) && (h.push({ type: 6, index: i }), o.removeAttribute(u));
        if (Fr.test(o.tagName)) {
          const u = o.textContent.split(he), $ = u.length - 1;
          if ($ > 0) {
            o.textContent = Ft ? Ft.emptyScript : "";
            for (let _ = 0; _ < $; _++) o.append(u[_], ut()), Pe.nextNode(), h.push({ type: 2, index: ++i });
            o.append(u[$], ut());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Rr) h.push({ type: 2, index: i });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(he, u + 1)) !== -1; ) h.push({ type: 7, index: i }), u += he.length - 1;
      }
      i++;
    }
  }
  static createElement(t, r) {
    const a = Ie.createElement("template");
    return a.innerHTML = t, a;
  }
}
function Ge(e, t, r = e, a) {
  if (t === ue) return t;
  let o = a !== void 0 ? r._$Co?.[a] : r._$Cl;
  const i = vt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== i && (o?._$AO?.(!1), i === void 0 ? o = void 0 : (o = new i(e), o._$AT(e, r, a)), a !== void 0 ? (r._$Co ??= [])[a] = o : r._$Cl = o), o !== void 0 && (t = Ge(e, o._$AS(e, t.values), o, a)), t;
}
class po {
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
    const { el: { content: r }, parts: a } = this._$AD, o = (t?.creationScope ?? Ie).importNode(r, !0);
    Pe.currentNode = o;
    let i = Pe.nextNode(), s = 0, d = 0, h = a[0];
    for (; h !== void 0; ) {
      if (s === h.index) {
        let m;
        h.type === 2 ? m = new _t(i, i.nextSibling, this, t) : h.type === 1 ? m = new h.ctor(i, h.name, h.strings, this, t) : h.type === 6 && (m = new fo(i, this, t)), this._$AV.push(m), h = a[++d];
      }
      s !== h?.index && (i = Pe.nextNode(), s++);
    }
    return Pe.currentNode = Ie, o;
  }
  p(t) {
    let r = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(t, a, r), r += a.strings.length - 2) : a._$AI(t[r])), r++;
  }
}
class _t {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, r, a, o) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = a, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = Ge(this, t, r), vt(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== ue && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : no(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && vt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ie.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: r, _$litType$: a } = t, o = typeof a == "number" ? this._$AC(t) : (a.el === void 0 && (a.el = ft.createElement(Nr(a.h, a.h[0]), this.options)), a);
    if (this._$AH?._$AD === o) this._$AH.p(r);
    else {
      const i = new po(o, this), s = i.u(this.options);
      i.p(r), this.T(s), this._$AH = i;
    }
  }
  _$AC(t) {
    let r = Dr.get(t.strings);
    return r === void 0 && Dr.set(t.strings, r = new ft(t)), r;
  }
  k(t) {
    cr(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let a, o = 0;
    for (const i of t) o === r.length ? r.push(a = new _t(this.O(ut()), this.O(ut()), this, this.options)) : a = r[o], a._$AI(i), o++;
    o < r.length && (this._$AR(a && a._$AB.nextSibling, o), r.length = o);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); t !== this._$AB; ) {
      const a = $r(t).nextSibling;
      $r(t).remove(), t = a;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class qt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, a, o, i) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = r, this._$AM = o, this.options = i, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = c;
  }
  _$AI(t, r = this, a, o) {
    const i = this.strings;
    let s = !1;
    if (i === void 0) t = Ge(this, t, r, 0), s = !vt(t) || t !== this._$AH && t !== ue, s && (this._$AH = t);
    else {
      const d = t;
      let h, m;
      for (t = i[0], h = 0; h < i.length - 1; h++) m = Ge(this, d[a + h], r, h), m === ue && (m = this._$AH[h]), s ||= !vt(m) || m !== this._$AH[h], m === c ? t = c : t !== c && (t += (m ?? "") + i[h + 1]), this._$AH[h] = m;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ho extends qt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class uo extends qt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class vo extends qt {
  constructor(t, r, a, o, i) {
    super(t, r, a, o, i), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = Ge(this, t, r, 0) ?? c) === ue) return;
    const a = this._$AH, o = t === c && a !== c || t.capture !== a.capture || t.once !== a.once || t.passive !== a.passive, i = t !== c && (a === c || o);
    o && this.element.removeEventListener(this.name, this, a), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class fo {
  constructor(t, r, a) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ge(this, t);
  }
}
const go = lr.litHtmlPolyfillSupport;
go?.(ft, _t), (lr.litHtmlVersions ??= []).push("3.3.2");
const bo = (e, t, r) => {
  const a = r?.renderBefore ?? t;
  let o = a._$litPart$;
  if (o === void 0) {
    const i = r?.renderBefore ?? null;
    a._$litPart$ = o = new _t(t.insertBefore(ut(), i), i, void 0, r ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dr = globalThis;
let f = class extends Qe {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = bo(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ue;
  }
};
f._$litElement$ = !0, f.finalized = !0, dr.litElementHydrateSupport?.({ LitElement: f });
const xo = dr.litElementPolyfillSupport;
xo?.({ LitElement: f });
(dr.litElementVersions ??= []).push("4.2.2");
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
const mo = { attribute: !0, type: String, converter: Rt, reflect: !1, hasChanged: nr }, yo = (e = mo, t, r) => {
  const { kind: a, metadata: o } = r;
  let i = globalThis.litPropertyMetadata.get(o);
  if (i === void 0 && globalThis.litPropertyMetadata.set(o, i = /* @__PURE__ */ new Map()), a === "setter" && ((e = Object.create(e)).wrapped = !0), i.set(r.name, e), a === "accessor") {
    const { name: s } = r;
    return { set(d) {
      const h = t.get.call(this);
      t.set.call(this, d), this.requestUpdate(s, h, e, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(s, void 0, e, d), d;
    } };
  }
  if (a === "setter") {
    const { name: s } = r;
    return function(d) {
      const h = this[s];
      t.call(this, d), this.requestUpdate(s, h, e, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function l(e) {
  return (t, r) => typeof r == "object" ? yo(e, t, r) : ((a, o, i) => {
    const s = o.hasOwnProperty(i);
    return o.constructor.createProperty(i, a), s ? Object.getOwnPropertyDescriptor(o, i) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function v(e) {
  return l({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wo = (e, t, r) => (r.configurable = !0, r.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, r), r);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function F(e, t) {
  return (r, a, o) => {
    const i = (s) => s.renderRoot?.querySelector(e) ?? null;
    return wo(r, a, { get() {
      return i(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vr = { ATTRIBUTE: 1, CHILD: 2 }, Hr = (e) => (...t) => ({ _$litDirective$: e, values: t });
class qr {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, r, a) {
    this._$Ct = t, this._$AM = r, this._$Ci = a;
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
const p = Hr(class extends qr {
  constructor(e) {
    if (super(e), e.type !== Vr.ATTRIBUTE || e.name !== "class" || e.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
  }
  update(e, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((a) => a !== "")));
      for (const a in t) t[a] && !this.nt?.has(a) && this.st.add(a);
      return this.render(t);
    }
    const r = e.element.classList;
    for (const a of this.st) a in t || (r.remove(a), this.st.delete(a));
    for (const a in t) {
      const o = !!t[a];
      o === this.st.has(a) || this.nt?.has(a) || (o ? (r.add(a), this.st.add(a)) : (r.remove(a), this.st.delete(a)));
    }
    return ue;
  }
});
var _o = Object.defineProperty, $o = Object.getOwnPropertyDescriptor, $t = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? $o(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && _o(t, r, o), o;
};
let Me = class extends f {
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
        class=${p(e)}
        ?disabled=${this.disabled}
        aria-busy=${this.loading ? "true" : c}
      >
        ${this.loading ? n`<span class="spinner"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>` : n`<span class="icon-slot"><slot name="icon"></slot></span><slot></slot>`}
      </button>
    `;
  }
};
Me.styles = b`
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
      font-weight: var(--ca-font-weight-medium);
      line-height: 1;
      white-space: nowrap;
      position: relative;
      transition: background-color var(--ca-transition-fast), border-color var(--ca-transition-fast), opacity var(--ca-transition-fast);
      box-sizing: border-box;
      text-decoration: none;
      min-height: var(--ca-control-height-md);
      padding: 0 14px;
      font-size: var(--ca-font-size-sm);
      border-radius: var(--ca-radius-button);
    }
    .button:focus-visible {
      outline: none;
    }

    /* Sizes — height comes from --ca-control-height-*; padding is horizontal only */
    .button.xs { min-height: var(--ca-control-height-xs); padding: 0 10px; font-size: var(--ca-font-size-xs); }
    .button.sm { min-height: var(--ca-control-height-sm); padding: 0 12px; font-size: var(--ca-font-size-sm); }
    .button.md { min-height: var(--ca-control-height-md); padding: 0 14px; font-size: var(--ca-font-size-sm); }
    .button.lg { min-height: var(--ca-control-height-lg); padding: 0 18px; font-size: var(--ca-font-size-md); }
    .button.xl { min-height: var(--ca-control-height-xl); padding: 0 22px; font-size: var(--ca-font-size-lg); }

    /* Primary */
    .button.primary {
      background-color: var(--ca-color-primary);
      color: var(--ca-color-on-primary);
      box-shadow:
        inset 0 1px 0 0 rgba(255, 255, 255, 0.14),
        inset 0 -1px 0 0 rgba(0, 0, 0, 0.18),
        var(--ca-shadow-sm);
    }
    .button.primary:hover:not(:disabled):not(.loading) {
      background-color: var(--ca-color-primary-hover);
    }
    .button.primary:active:not(:disabled):not(.loading) {
      background-color: var(--ca-color-primary-pressed);
    }
    .button.primary:focus-visible {
      border: 2px solid var(--ca-color-focus-ring);
    }
    .button.primary:disabled,
    .button.primary.loading {
      background-color: var(--ca-color-disabled);
      color: var(--ca-color-disabled-text);
      box-shadow: none;
      cursor: not-allowed;
    }

    /* Secondary */
    .button.secondary {
      background-color: var(--ca-surface);
      color: var(--ca-text-primary);
      border: 1px solid var(--ca-border);
      box-shadow: var(--ca-shadow-sm);
    }
    .button.secondary:hover:not(:disabled):not(.loading) {
      background-color: var(--ca-surface-hover);
    }
    .button.secondary:focus-visible {
      border: 2px solid var(--ca-text-primary);
    }
    .button.secondary:disabled,
    .button.secondary.loading {
      background-color: var(--ca-color-disabled);
      color: var(--ca-color-disabled-text);
      border-color: var(--ca-color-disabled);
      box-shadow: none;
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
$t([
  l({ type: String, reflect: !0 })
], Me.prototype, "variant", 2);
$t([
  l({ type: String, reflect: !0 })
], Me.prototype, "size", 2);
$t([
  l({ type: Boolean, reflect: !0 })
], Me.prototype, "disabled", 2);
$t([
  l({ type: Boolean, reflect: !0 })
], Me.prototype, "loading", 2);
Me = $t([
  g("ca-button")
], Me);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rr = (e) => e ?? c;
var ko = Object.defineProperty, zo = Object.getOwnPropertyDescriptor, se = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? zo(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && ko(t, r, o), o;
};
let V = class extends f {
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
      <div class=${p({ field: !0, "has-error": e })}>
        <span class="icon"><slot name="icon"></slot></span>
        <div class="text-area">
          ${this.label ? n`<label class="label">${this.label}</label>` : c}
          <input
            class="native"
            type=${this.type}
            .value=${this.value}
            placeholder=${rr(this.placeholder || void 0)}
            ?disabled=${this.disabled}
            aria-invalid=${rr(e ? "true" : void 0)}
            @input=${this._handleInput}
            @change=${this._handleChange}
          />
        </div>
        ${this.loading ? n`<span class="loader"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>` : n`<span class="icon-after"><slot name="icon-after"></slot></span>`}
      </div>
      ${e ? n`<span class="error-message">${this.error}</span>` : c}
    `;
  }
};
V.styles = b`
    :host {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-family: var(--ca-font-family);
    }
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
    .field {
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-sm);
      background-color: var(--ca-surface);
      transition: border-color var(--ca-transition-fast);
      box-sizing: border-box;
      min-height: var(--ca-control-height-md);
      padding: 6px 12px;
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
      min-height: var(--ca-control-height-xs);
      padding: 2px 8px;
      font-size: var(--ca-font-size-xs);
      border-radius: var(--ca-radius-sm);
      gap: 6px;
    }
    :host([size='xs']) .label { font-size: 9px; }
    /* Size: sm */
    :host([size='sm']) .field {
      min-height: var(--ca-control-height-sm);
      padding: 4px 10px;
      font-size: var(--ca-font-size-xs);
      border-radius: var(--ca-radius-sm);
    }
    :host([size='sm']) .label { font-size: 10px; }
    /* Size: lg */
    :host([size='lg']) .field {
      min-height: var(--ca-control-height-lg);
      padding: 8px 14px;
      font-size: var(--ca-font-size-md);
      border-radius: var(--ca-radius-sm);
    }
    :host([size='lg']) .label { font-size: 13px; }
    /* Size: xl */
    :host([size='xl']) .field {
      min-height: var(--ca-control-height-xl);
      padding: 10px 16px;
      font-size: var(--ca-font-size-lg);
      border-radius: var(--ca-radius-sm);
      gap: 10px;
    }
    :host([size='xl']) .label { font-size: 14px; }

    /* Disabled */
    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
se([
  l({ type: String })
], V.prototype, "type", 2);
se([
  l({ type: String })
], V.prototype, "value", 2);
se([
  l({ type: String })
], V.prototype, "label", 2);
se([
  l({ type: String })
], V.prototype, "error", 2);
se([
  l({ type: String })
], V.prototype, "placeholder", 2);
se([
  l({ type: Boolean, reflect: !0 })
], V.prototype, "disabled", 2);
se([
  l({ type: Boolean })
], V.prototype, "loading", 2);
se([
  l({ type: String, reflect: !0 })
], V.prototype, "size", 2);
se([
  l({ type: Boolean, reflect: !0 })
], V.prototype, "borderless", 2);
V = se([
  g("ca-input")
], V);
var Co = Object.defineProperty, Oo = Object.getOwnPropertyDescriptor, ot = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Oo(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Co(t, r, o), o;
};
let ve = class extends f {
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
          <span class=${p({ box: !0, checked: this.checked })}>
            <svg
              class=${p({ checkmark: !0, visible: this.checked })}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </span>
        ${this.label || this.subtext ? n`
              <span class=${p({ "label-group": !0, "no-subtext": !this.subtext })}>
                ${this.label ? n`<span class="label">${this.label}</span>` : c}
                ${this.subtext ? n`<span class="subtext">${this.subtext}</span>` : c}
              </span>
            ` : c}
      </label>
    `;
  }
};
ve.styles = b`
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
      background-color: var(--ca-checkbox-checked-bg, var(--ca-color-primary));
      border-color: var(--ca-checkbox-checked-border, var(--ca-color-primary));
    }
    .checkmark {
      opacity: 0;
      transition: opacity var(--ca-transition-fast);
      color: var(--ca-checkbox-checkmark, var(--ca-color-on-primary));
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
ot([
  l({ type: Boolean, reflect: !0 })
], ve.prototype, "checked", 2);
ot([
  l({ type: Boolean, reflect: !0 })
], ve.prototype, "disabled", 2);
ot([
  l({ type: String, reflect: !0 })
], ve.prototype, "size", 2);
ot([
  l({ type: String })
], ve.prototype, "label", 2);
ot([
  l({ type: String })
], ve.prototype, "subtext", 2);
ve = ot([
  g("ca-checkbox")
], ve);
var So = Object.defineProperty, Do = Object.getOwnPropertyDescriptor, ye = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Do(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && So(t, r, o), o;
};
let J = class extends f {
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
        class=${p({ radio: !0, "has-subtext": e })}
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
          <span class=${p({ circle: !0, checked: this.checked })}>
            <span class=${p({ dot: !0, visible: this.checked })}></span>
          </span>
        </span>
        ${this.label || this.subtext ? n`
              <span class=${p({ "label-group": !0, "no-subtext": !e })}>
                ${this.label ? n`<span class="label">${this.label}</span>` : c}
                ${this.subtext ? n`<span class="subtext">${this.subtext}</span>` : c}
              </span>
            ` : c}
      </label>
    `;
  }
};
J.styles = b`
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
      border: 2px solid var(--ca-radio-checked-color, var(--ca-color-primary));
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--ca-radio-checked-color, var(--ca-color-primary));
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
ye([
  l({ type: Boolean, reflect: !0 })
], J.prototype, "checked", 2);
ye([
  l({ type: Boolean, reflect: !0 })
], J.prototype, "disabled", 2);
ye([
  l({ type: String, reflect: !0 })
], J.prototype, "size", 2);
ye([
  l({ type: String })
], J.prototype, "name", 2);
ye([
  l({ type: String })
], J.prototype, "value", 2);
ye([
  l({ type: String })
], J.prototype, "label", 2);
ye([
  l({ type: String })
], J.prototype, "subtext", 2);
J = ye([
  g("ca-radio")
], J);
var Eo = Object.defineProperty, Po = Object.getOwnPropertyDescriptor, at = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Po(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Eo(t, r, o), o;
};
let fe = class extends f {
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
        class=${p({ toggle: !0, "with-subtext": e })}
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
          <span class=${p({ track: !0, checked: this.checked })}>
            <span class=${p({ thumb: !0, checked: this.checked })}>
              <span class=${p({ "check-icon": !0, checked: this.checked })}>
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
fe.styles = b`
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
at([
  l({ type: Boolean, reflect: !0 })
], fe.prototype, "checked", 2);
at([
  l({ type: Boolean, reflect: !0 })
], fe.prototype, "disabled", 2);
at([
  l({ type: String, reflect: !0 })
], fe.prototype, "size", 2);
at([
  l({ type: String })
], fe.prototype, "label", 2);
at([
  l({ type: String })
], fe.prototype, "subtext", 2);
fe = at([
  g("ca-toggle")
], fe);
var Io = Object.defineProperty, Mo = Object.getOwnPropertyDescriptor, kt = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Mo(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Io(t, r, o), o;
};
let Ae = class extends f {
  constructor() {
    super(...arguments), this.variant = "default", this.size = "md", this.dot = !1, this.color = "";
  }
  updated(e) {
    super.updated?.(e), e.has("color") && (this.color ? this.dot ? (this.style.backgroundColor = this.color, this.style.removeProperty("color"), this.style.removeProperty("border-color")) : (this.style.color = `color-mix(in srgb, ${this.color} 75%, var(--ca-text-primary))`, this.style.backgroundColor = `color-mix(in srgb, ${this.color} 14%, transparent)`, this.style.borderColor = `color-mix(in srgb, ${this.color} 30%, transparent)`) : (this.style.removeProperty("color"), this.style.removeProperty("background-color"), this.style.removeProperty("border-color")));
  }
  render() {
    return this.dot ? n`` : n`<slot></slot>`;
  }
};
Ae.styles = b`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      border-radius: var(--ca-radius-full);
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-semibold);
      line-height: 1;
      white-space: nowrap;
      box-sizing: border-box;
      /* Default = info (periwinkle accent family) */
      color: var(--ca-info-fg);
      background-color: var(--ca-info-bg);
      border: 1px solid color-mix(in srgb, var(--ca-color-primary) 30%, transparent);
    }

    /* Sizes */
    :host([size='sm']) {
      font-size: var(--ca-font-size-xs);
      min-width: 20px;
      height: 20px;
      padding: 0 8px;
    }
    :host, :host([size='md']) {
      font-size: 12px;
      min-width: 22px;
      height: 22px;
      padding: 0 9px;
    }

    /* Dot mode */
    :host([dot]) {
      padding: 0;
      border: none;
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

    /* Variants — soft tinted pills with matching colored borders */
    :host([variant='success']) {
      color: var(--ca-success-fg);
      background-color: var(--ca-success-bg);
      border-color: color-mix(in srgb, var(--ca-color-success) 30%, transparent);
    }
    :host([variant='warning']) {
      color: var(--ca-warning-fg);
      background-color: var(--ca-warning-bg);
      border-color: color-mix(in srgb, var(--ca-color-warning) 35%, transparent);
    }
    :host([variant='danger']) {
      color: var(--ca-danger-fg);
      background-color: var(--ca-danger-bg);
      border-color: color-mix(in srgb, var(--ca-color-danger) 30%, transparent);
    }

    /* Dot variant retains solid color */
    :host([dot][variant='success']) {
      background-color: var(--ca-color-success);
    }
    :host([dot][variant='warning']) {
      background-color: var(--ca-color-warning);
    }
    :host([dot][variant='danger']) {
      background-color: var(--ca-color-danger);
    }
  `;
kt([
  l({ type: String, reflect: !0 })
], Ae.prototype, "variant", 2);
kt([
  l({ type: String, reflect: !0 })
], Ae.prototype, "size", 2);
kt([
  l({ type: Boolean, reflect: !0 })
], Ae.prototype, "dot", 2);
kt([
  l({ type: String })
], Ae.prototype, "color", 2);
Ae = kt([
  g("ca-badge")
], Ae);
var Ao = Object.defineProperty, To = Object.getOwnPropertyDescriptor, Kt = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? To(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Ao(t, r, o), o;
};
let We = class extends f {
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
        class=${p({ chip: !0, selected: this.selected })}
        ?disabled=${this.disabled}
        aria-pressed=${this.selected}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
};
We.styles = b`
    :host {
      display: inline-flex;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: var(--ca-radius-full);
      border: 1px solid var(--ca-border);
      background-color: var(--ca-surface);
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-medium, 500);
      font-size: var(--ca-font-size-sm);
      line-height: 1;
      color: var(--ca-text-primary);
      cursor: pointer;
      white-space: nowrap;
      transition: background-color var(--ca-transition-fast), border-color var(--ca-transition-fast), color var(--ca-transition-fast), transform 0.1s ease;
      box-sizing: border-box;
    }
    /* Size: sm */
    :host([size='sm']) .chip {
      padding: 4px 10px;
      font-size: var(--ca-font-size-xs);
    }
    .chip:hover {
      background-color: var(--ca-surface-hover);
      border-color: var(--ca-border-strong);
    }
    .chip:active {
      transform: scale(0.97);
    }
    .chip:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--ca-surface), 0 0 0 4px var(--ca-text-primary);
      border-color: var(--ca-text-primary);
    }
    .chip.selected {
      background-color: var(--ca-color-primary);
      border-color: var(--ca-color-primary);
      color: var(--ca-color-on-primary);
    }
    .chip.selected:hover {
      background-color: var(--ca-color-primary-hover);
    }
    :host([disabled]) .chip {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  `;
Kt([
  l({ type: Boolean, reflect: !0 })
], We.prototype, "selected", 2);
Kt([
  l({ type: Boolean, reflect: !0 })
], We.prototype, "disabled", 2);
Kt([
  l({ type: String, reflect: !0 })
], We.prototype, "size", 2);
We = Kt([
  g("ca-chip")
], We);
var jo = Object.defineProperty, Bo = Object.getOwnPropertyDescriptor, Ut = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Bo(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && jo(t, r, o), o;
};
let Xe = class extends f {
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
        class=${p({
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
Xe.styles = b`
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
      background-color: var(--ca-color-primary);
      color: var(--ca-color-on-primary);
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
Ut([
  l({ type: Boolean, reflect: !0 })
], Xe.prototype, "selected", 2);
Ut([
  l({ type: Boolean, reflect: !0 })
], Xe.prototype, "viewed", 2);
Ut([
  l({ type: Boolean, reflect: !0 })
], Xe.prototype, "disabled", 2);
Xe = Ut([
  g("ca-map-chip")
], Xe);
var Lo = Object.defineProperty, Ro = Object.getOwnPropertyDescriptor, zt = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ro(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Lo(t, r, o), o;
};
let Te = class extends f {
  constructor() {
    super(...arguments), this.padding = "md", this.elevated = !1, this.flat = !1, this.interactive = !1;
  }
  render() {
    return n`<slot></slot>`;
  }
};
Te.styles = b`
    :host {
      display: block;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-lg);
      background-color: var(--ca-surface);
      font-family: var(--ca-font-family);
      padding: 24px;
      box-shadow: var(--ca-shadow-sm);
      box-sizing: border-box;
    }
    :host([padding='none']) { padding: 0; }
    :host([padding='sm']) { padding: 16px; }
    :host([padding='md']) { padding: 24px; }
    :host([padding='lg']) { padding: 32px; }

    :host([elevated]) {
      box-shadow: var(--ca-shadow-sm);
    }
    :host([flat]) {
      box-shadow: none;
    }
    :host([interactive]) {
      cursor: pointer;
      transition: border-color var(--ca-transition-fast), box-shadow var(--ca-transition-fast), transform var(--ca-transition-fast);
    }
    :host([interactive]:hover) {
      border-color: var(--ca-border-strong);
      box-shadow: var(--ca-shadow-sm);
    }
  `;
zt([
  l({ type: String, reflect: !0 })
], Te.prototype, "padding", 2);
zt([
  l({ type: Boolean, reflect: !0 })
], Te.prototype, "elevated", 2);
zt([
  l({ type: Boolean, reflect: !0 })
], Te.prototype, "flat", 2);
zt([
  l({ type: Boolean, reflect: !0 })
], Te.prototype, "interactive", 2);
Te = zt([
  g("ca-card")
], Te);
var Fo = Object.defineProperty, No = Object.getOwnPropertyDescriptor, Ct = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? No(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Fo(t, r, o), o;
};
let je = class extends f {
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
        <div class=${p({ inner: !0, selected: this.selected })}>
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
je.styles = b`
    :host {
      display: inline-flex;
    }
    .wrapper {
      display: flex;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: var(--ca-radius-lg);
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
      gap: 32px;
      width: 166px;
      padding: 16px;
      border-radius: var(--ca-radius-lg);
      border: 1px solid var(--ca-border);
      background-color: var(--ca-surface);
      box-shadow: var(--ca-shadow-sm);
      box-sizing: border-box;
      transition: border-color var(--ca-transition-fast), background-color var(--ca-transition-fast), box-shadow var(--ca-transition-fast);
    }
    .wrapper:hover .inner {
      border-color: var(--ca-border-strong);
      box-shadow: var(--ca-shadow-sm);
    }
    .wrapper:active .inner {
      transform: scale(0.97);
    }
    .wrapper:focus-visible .inner {
      border-color: var(--ca-text-primary);
    }
    .inner.selected {
      background-color: var(--ca-color-primary-tint);
      border-color: var(--ca-color-primary);
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
    :host([size='xs']) .inner { width: 100px; gap: 14px; padding: 10px; border-radius: var(--ca-radius-md); }
    :host([size='xs']) .icon-slot { width: 20px; height: 20px; }
    :host([size='xs']) .icon-slot ::slotted(svg) { width: 20px; height: 20px; }
    :host([size='xs']) .label { font-size: var(--ca-font-size-xs); }

    /* sm */
    :host([size='sm']) .inner { width: 130px; gap: 20px; padding: 12px; border-radius: var(--ca-radius-md); }
    :host([size='sm']) .icon-slot { width: 24px; height: 24px; }
    :host([size='sm']) .icon-slot ::slotted(svg) { width: 24px; height: 24px; }
    :host([size='sm']) .label { font-size: var(--ca-font-size-sm); }

    /* lg */
    :host([size='lg']) .inner { width: 200px; gap: 40px; padding: 20px; border-radius: var(--ca-radius-lg); }
    :host([size='lg']) .icon-slot { width: 40px; height: 40px; }
    :host([size='lg']) .icon-slot ::slotted(svg) { width: 40px; height: 40px; }
    :host([size='lg']) .label { font-size: 18px; }

    /* xl */
    :host([size='xl']) .inner { width: 240px; gap: 48px; padding: 24px; border-radius: var(--ca-radius-xl); }
    :host([size='xl']) .icon-slot { width: 48px; height: 48px; }
    :host([size='xl']) .icon-slot ::slotted(svg) { width: 48px; height: 48px; }
    :host([size='xl']) .label { font-size: 20px; }
  `;
Ct([
  l({ type: Boolean, reflect: !0 })
], je.prototype, "selected", 2);
Ct([
  l({ type: String, reflect: !0 })
], je.prototype, "size", 2);
Ct([
  l({ type: String })
], je.prototype, "label", 2);
Ct([
  v()
], je.prototype, "_hasIcon", 2);
je = Ct([
  g("ca-card-button")
], je);
var Vo = Object.defineProperty, Ho = Object.getOwnPropertyDescriptor, pr = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ho(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Vo(t, r, o), o;
};
let gt = class extends f {
  constructor() {
    super(...arguments), this.variant = "highlight", this.tone = "neutral";
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
gt.styles = b`
    :host {
      display: block;
    }
    .callout {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 20px 24px;
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
      color: var(--ca-text-secondary);
    }
    .icon-slot ::slotted(svg) {
      width: 28px;
      height: 28px;
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

    /* Tone variants — tinted soft backgrounds with matching icon color */
    :host([tone='warning']) .callout {
      background-color: var(--ca-warning-bg);
      border-color: color-mix(in srgb, var(--ca-color-warning) 30%, transparent);
    }
    :host([tone='warning']) .icon-slot {
      color: var(--ca-warning-fg);
    }
    :host([tone='success']) .callout {
      background-color: var(--ca-success-bg);
      border-color: color-mix(in srgb, var(--ca-color-success) 25%, transparent);
    }
    :host([tone='success']) .icon-slot {
      color: var(--ca-success-fg);
    }
    :host([tone='danger']) .callout {
      background-color: var(--ca-danger-bg);
      border-color: color-mix(in srgb, var(--ca-color-danger) 25%, transparent);
    }
    :host([tone='danger']) .icon-slot {
      color: var(--ca-danger-fg);
    }
    :host([tone='info']) .callout {
      background-color: var(--ca-info-bg);
      border-color: color-mix(in srgb, var(--ca-color-primary) 25%, transparent);
    }
    :host([tone='info']) .icon-slot {
      color: var(--ca-info-fg);
    }
  `;
pr([
  l({ type: String, reflect: !0 })
], gt.prototype, "variant", 2);
pr([
  l({ type: String, reflect: !0 })
], gt.prototype, "tone", 2);
gt = pr([
  g("ca-callout")
], gt);
var qo = Object.defineProperty, Ko = Object.getOwnPropertyDescriptor, Ot = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ko(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && qo(t, r, o), o;
};
let Be = class extends f {
  constructor() {
    super(...arguments), this.href = "", this.target = "", this.type = "subtle", this.size = "md";
  }
  render() {
    return n`
      <a
        class=${p({
      link: !0,
      [this.type]: !0
    })}
        href=${this.href}
        target=${rr(this.target || void 0)}
      >
        <slot></slot>
        <span class="icon-after"><slot name="icon"></slot></span>
      </a>
    `;
  }
};
Be.styles = b`
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
Ot([
  l({ type: String })
], Be.prototype, "href", 2);
Ot([
  l({ type: String })
], Be.prototype, "target", 2);
Ot([
  l({ type: String, reflect: !0 })
], Be.prototype, "type", 2);
Ot([
  l({ type: String, reflect: !0 })
], Be.prototype, "size", 2);
Be = Ot([
  g("ca-link")
], Be);
var Uo = Object.defineProperty, Yo = Object.getOwnPropertyDescriptor, hr = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Yo(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Uo(t, r, o), o;
};
let bt = class extends f {
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
bt.styles = b`
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
      background-color: var(--ca-color-primary);
      animation: pulse 1.4s ease-in-out infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }

    /* Circular */
    .circle {
      display: block;
      border-radius: 50%;
      border: 2.5px solid var(--ca-surface-active);
      border-top-color: var(--ca-color-primary);
      animation: spin 0.7s linear infinite;
    }

    /* Sizes - dots */
    :host([size='sm']) .dot { width: 5px; height: 5px; }
    :host, :host([size='md']) { }
    :host([size='md']) .dot, .dot { width: 8px; height: 8px; }
    :host([size='lg']) .dot { width: 10px; height: 10px; }

    /* Sizes - circle */
    :host([size='sm']) .circle { width: 14px; height: 14px; }
    :host([size='md']) .circle, .circle { width: 22px; height: 22px; }
    :host([size='lg']) .circle { width: 28px; height: 28px; border-width: 3px; }

    @keyframes pulse {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
hr([
  l({ type: String, reflect: !0 })
], bt.prototype, "size", 2);
hr([
  l({ type: String, reflect: !0 })
], bt.prototype, "variant", 2);
bt = hr([
  g("ca-spinner")
], bt);
var Qo = Object.defineProperty, Go = Object.getOwnPropertyDescriptor, ur = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Go(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Qo(t, r, o), o;
};
let xt = class extends f {
  constructor() {
    super(...arguments), this.orientation = "horizontal", this.spacing = "";
  }
  render() {
    return n`<hr role="separator" aria-orientation=${this.orientation} />`;
  }
};
xt.styles = b`
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
ur([
  l({ type: String, reflect: !0 })
], xt.prototype, "orientation", 2);
ur([
  l({ type: String, reflect: !0 })
], xt.prototype, "spacing", 2);
xt = ur([
  g("ca-divider")
], xt);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class or extends qr {
  constructor(t) {
    if (super(t), this.it = c, t.type !== Vr.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === c || t == null) return this._t = void 0, this.it = t;
    if (t === ue) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const r = [t];
    return r.raw = r, this._t = { _$litType$: this.constructor.resultType, strings: r, values: [] };
  }
}
or.directiveName = "unsafeHTML", or.resultType = 1;
const N = Hr(or);
var Wo = Object.defineProperty, Xo = Object.getOwnPropertyDescriptor, vr = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Xo(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Wo(t, r, o), o;
};
let mt = class extends f {
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
            class=${p({ tab: !0, active: e.id === this.activeId })}
            role="tab"
            aria-selected=${e.id === this.activeId}
            @click=${() => this._handleClick(e)}
          >
            <span class="tab-content">
              ${e.icon ? n`<span class="tab-icon">${N(e.icon)}</span>` : c}
              <span class="tab-label">${e.label}</span>
            </span>
            <span class="indicator"></span>
          </button>
        `
    )}
    `;
  }
};
mt.styles = b`
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
      background-color: var(--ca-color-primary);
    }
  `;
vr([
  l({ type: Array })
], mt.prototype, "tabs", 2);
vr([
  l({ type: String, attribute: "active-id" })
], mt.prototype, "activeId", 2);
mt = vr([
  g("ca-underline-tabs")
], mt);
var Jo = Object.defineProperty, Zo = Object.getOwnPropertyDescriptor, Yt = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Zo(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Jo(t, r, o), o;
};
let Je = class extends f {
  constructor() {
    super(...arguments), this.tabs = [], this.activeId = "", this.filled = !1;
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
            class=${p({ tab: !0, active: e.id === this.activeId })}
            role="tab"
            aria-selected=${e.id === this.activeId}
            @click=${() => this._handleClick(e)}
          >
            <span>${e.label}</span>
            ${e.count != null ? n`<span class="count">${e.count}</span>` : ""}
          </button>
        `
    )}
    `;
  }
};
Je.styles = b`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      width: fit-content;
    }
    .tab {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 6px 12px;
      min-width: 0;
      border-radius: var(--ca-radius-full);
      border: 1px solid transparent;
      background: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-medium, 500);
      font-size: var(--ca-font-size-sm);
      line-height: 1;
      color: var(--ca-text-secondary);
      white-space: nowrap;
      box-sizing: border-box;
      transition: background-color var(--ca-transition-fast), color var(--ca-transition-fast), border-color var(--ca-transition-fast);
    }
    .tab:hover {
      color: var(--ca-text-primary);
      background-color: var(--ca-surface-hover);
    }
    .tab:focus-visible {
      outline: none;
      border-color: var(--ca-text-primary);
    }
    .tab.active {
      background-color: var(--ca-surface);
      border-color: var(--ca-border);
      color: var(--ca-text-primary);
      font-weight: var(--ca-font-weight-semibold);
      box-shadow: var(--ca-shadow-sm);
    }
    .count {
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-medium, 500);
      color: var(--ca-text-muted);
    }
    .tab.active .count {
      color: var(--ca-text-secondary);
    }

    /* Filled variant — preserves the legacy segmented-control look */
    :host([filled]) {
      padding: 4px;
      background-color: var(--ca-surface-active);
      border-radius: var(--ca-radius-full);
    }
    :host([filled]) .tab {
      border-color: transparent;
    }
    :host([filled]) .tab:hover {
      background-color: var(--ca-surface);
    }
    :host([filled]) .tab.active {
      border-color: transparent;
    }
  `;
Yt([
  l({ type: Array })
], Je.prototype, "tabs", 2);
Yt([
  l({ type: String, attribute: "active-id" })
], Je.prototype, "activeId", 2);
Yt([
  l({ type: Boolean, reflect: !0 })
], Je.prototype, "filled", 2);
Je = Yt([
  g("ca-pill-tabs")
], Je);
var ea = Object.defineProperty, ta = Object.getOwnPropertyDescriptor, Kr = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? ta(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && ea(t, r, o), o;
};
let Nt = class extends f {
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
        (r) => r.href ? n`<a class=${p({ item: !0, bold: !!r.bold })} href=${r.href}>${r.label}</a>` : n`<button class=${p({ item: !0, bold: !!r.bold })} @click=${() => this._handleItemClick(r)}>${r.label}</button>`
      )}
        `
    )}
    `;
  }
};
Nt.styles = b`
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
Kr([
  l({ type: Array })
], Nt.prototype, "sections", 2);
Nt = Kr([
  g("ca-menu")
], Nt);
var ra = Object.defineProperty, oa = Object.getOwnPropertyDescriptor, we = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? oa(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && ra(t, r, o), o;
};
let Z = class extends f {
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
Z.styles = b`
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
we([
  l({ type: Number })
], Z.prototype, "value", 2);
we([
  l({ type: Number })
], Z.prototype, "max", 2);
we([
  l({ type: Boolean, reflect: !0, attribute: "show-label" })
], Z.prototype, "showLabel", 2);
we([
  l({ type: String, reflect: !0 })
], Z.prototype, "size", 2);
we([
  l({ type: String })
], Z.prototype, "labelSuffix", 2);
we([
  l({ type: String })
], Z.prototype, "color", 2);
we([
  l({ type: Array, attribute: !1 })
], Z.prototype, "segments", 2);
Z = we([
  g("ca-progress-bar")
], Z);
var aa = Object.defineProperty, ia = Object.getOwnPropertyDescriptor, w = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? ia(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && aa(t, r, o), o;
};
let y = class extends f {
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
        const a = t.shadowRoot?.querySelector("input");
        a?.focus(), a?.select();
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
    const a = r.detail?.checked ?? !1;
    this._emit("ca-cell-toggle", { key: e.key, row: t, checked: a });
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
      const a = r.dataset.rowId;
      if (a !== this._dragRowId) {
        const o = r.getBoundingClientRect(), i = o.top + o.height / 2;
        this._dragOverRowId = a, this._dragOverPosition = e.clientY < i ? "above" : "below";
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
      let t = "", r = -1, a = "", o = -1;
      for (const i of this.groups) {
        const s = i.rows.findIndex((h) => h.id === this._dragRowId);
        s >= 0 && (t = i.id, r = s);
        const d = i.rows.findIndex((h) => h.id === this._dragOverRowId);
        d >= 0 && (a = i.id, o = d, this._dragOverPosition === "below" && (o += 1));
      }
      t && a && r >= 0 && o >= 0 && (t === a && r < o && (o -= 1), t === a && r === o || this._emit("ca-reorder", {
        rowId: this._dragRowId,
        fromGroupId: t,
        toGroupId: a,
        fromIndex: r,
        toIndex: o
      }));
    } else {
      const t = this._dragRowIndex;
      let a = this.rows.findIndex((o) => o.id === this._dragOverRowId);
      if (this._dragOverPosition === "below" && (a += 1), t < a && (a -= 1), t !== a && a >= 0) {
        const o = [...this.rows], [i] = o.splice(t, 1);
        o.splice(a, 0, i), this._emit("ca-reorder", { rowId: this._dragRowId, fromIndex: t, toIndex: a, rows: o });
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
    const t = e.clientX - this._resizeStartX, r = Math.max(60, this._resizeStartWidth + t), a = new Map(this._columnWidths);
    a.set(this._resizingColKey, r), this._columnWidths = a;
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
    for (const a of t) {
      const o = a[e];
      o != null && o !== "" && r.add(String(o));
    }
    return Array.from(r).sort();
  }
  _handleFilterToggleValue(e, t) {
    const r = this.columnFilters[e] || [], a = r.indexOf(t);
    let o;
    a >= 0 ? o = r.filter((i) => i !== t) : o = [...r, t], this._emit("ca-column-filter", { key: e, values: o });
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
        const o = e.badgeMap?.[String(r)] || "default";
        return n`<ca-badge variant=${o} size="sm">${r}</ca-badge>`;
      }
      case "toggle":
        return n`<ca-toggle size="sm" ?checked=${!!r} @ca-change=${(o) => this._handleToggle(e, t, o)}></ca-toggle>`;
      case "progress": {
        const o = e.progressMax && t[e.progressMax] || 100;
        return n`<ca-progress-bar value=${Number(r) || 0} max=${o} show-label labelSuffix=${e.progressSuffix || ""}></ca-progress-bar>`;
      }
      case "editable":
        return this._editingCell?.rowId === t.id && this._editingCell?.key === e.key ? n`
            <div class="cell-editable-editing" @click=${(i) => i.stopPropagation()}>
              <ca-input
                size="sm"
                borderless
                .value=${String(r ?? "")}
                placeholder=${e.editPlaceholder || ""}
                @keydown=${(i) => this._handleEditKeyDown(i, t.id, e.key)}
                @blur=${(i) => this._handleEditBlur(i, t.id, e.key)}
              ></ca-input>
            </div>
          ` : n`
          <span class="cell-editable cell-text" @click=${(i) => {
          i.stopPropagation(), this._startEditing(t.id, e.key, r);
        }}>
            ${r ?? ""}
          </span>
        `;
      case "editable-select": {
        if (this._editingCell?.rowId === t.id && this._editingCell?.key === e.key)
          return n`
            <div class="cell-editable-editing" @click=${(i) => i.stopPropagation()}>
              <ca-select
                size="sm"
                borderless
                .options=${e.options || []}
                .value=${String(r ?? "")}
                @ca-change=${(i) => this._handleSelectChange(i, t.id, e.key)}
                @blur=${(i) => this._handleEditBlur(i, t.id, e.key)}
              ></ca-select>
            </div>
          `;
        if (e.badgeMap) {
          const i = e.badgeMap[String(r)] || "default";
          return n`
            <span class="cell-editable" @click=${(s) => {
            s.stopPropagation(), this._startEditing(t.id, e.key, r);
          }}>
              <ca-badge variant=${i} size="sm">${r}</ca-badge>
            </span>
          `;
        }
        return n`
          <span class="cell-editable cell-text" @click=${(i) => {
          i.stopPropagation(), this._startEditing(t.id, e.key, r);
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
    const a = this._editOriginalValue;
    this._editingCell = null, this._editOriginalValue = null, r !== a && this.dispatchEvent(
      new CustomEvent("ca-cell-edit", {
        detail: { rowId: e, key: t, value: r, oldValue: a },
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
      const a = e.target, i = a.closest("ca-input")?.value ?? a.value;
      this._commitEdit(t, r, i);
    } else e.key === "Escape" && (e.preventDefault(), this._cancelEdit());
  }
  _handleEditBlur(e, t, r) {
    const a = e.relatedTarget;
    if (a && e.target?.closest(".cell-editable-editing")?.contains(a))
      return;
    const i = e.target.closest?.("ca-input");
    i && this._commitEdit(t, r, i.value);
  }
  _handleSelectChange(e, t, r) {
    this._commitEdit(t, r, e.detail.value);
  }
  /* ── Sort icon ── */
  _renderSortIcon(e) {
    if (!e.sortable) return c;
    const t = this.sort?.key === e.key, r = t && this.sort?.direction === "asc", a = t && this.sort?.direction === "desc";
    return n`
      <span class="sort-icon">
        <span class=${p({ "sort-asc": !0, active: r })}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 5L5 1L9 5"/>
          </svg>
        </span>
        <span class=${p({ "sort-desc": !0, active: a })}>
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
        class=${p({ "filter-icon": !0, active: t })}
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
    const t = this._getUniqueValuesForColumn(e.key), r = this.columnFilters[e.key] || [], a = (this._filterSearchQuery.get(e.key) || "").toLowerCase(), o = a ? t.filter((s) => s.toLowerCase().includes(a)) : t, i = t.length > 8;
    return n`
      <div class="filter-dropdown" @click=${(s) => s.stopPropagation()}>
        ${i ? n`
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
          ${o.map(
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
        <span class=${p({ "group-toggle": !0, collapsed: t })}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        ${e.color ? n`<span class="group-color-dot" style="background-color: ${e.color}"></span>` : c}
        <span class="group-label">${e.label}</span>
        <span class="group-count">${e.rows.length}</span>
        ${Array.isArray(e.progress) && e.progressMax ? n`<ca-progress-bar class="group-progress" .segments=${e.progress} .max=${e.progressMax} .value=${e.progress.reduce((r, a) => r + a.value, 0)} size="sm"></ca-progress-bar>` : c}
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
        (a) => n`
                        <div class=${p({ cell: !0, sortable: !!a.sortable })} data-col=${a.key} @click=${() => this._handleSort(a)}>
                          ${this._renderFilterIcon(a)}
                          <span class="header-text">${a.heading}</span>
                          ${this._renderSortIcon(a)}
                          ${this._renderFilterDropdown(a)}
                        </div>
                      `
      )}
                    ${e ? n`<div class="cell"></div>` : c}
                  </div>
                  <!-- Rows -->
                  ${t.rows.length === 0 ? n`<div class="empty" style="grid-column:1/-1">No tasks in this group</div>` : t.rows.map((a, o) => this._renderRowTree(a, o, e, 0))}
                </div>
                ${this._renderInlineAdd(t.id)}
              `}
        `;
    })}
    `;
  }
  /* ── Main render ── */
  render() {
    const e = this.heading || this.supportingText, t = this.filterTabs.length > 0 || this.showSearch || this.showFilters, r = this.rowActions.length > 0, a = this.groups.length > 0;
    return n`
      <div class="wrapper">
        ${e ? this._renderHeader() : c}
        ${t ? this._renderToolbar() : c}
        ${a ? this._renderGroupedGrid(r) : n`
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
                class=${p({ "filter-tab": !0, active: e.id === this.activeFilterTab })}
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
                class=${p({ cell: !0, sortable: !!t.sortable })}
                data-col=${t.key}
                @click=${() => this._handleSort(t)}
              >
                ${this._renderFilterIcon(t)}
                <span class="header-text">${t.heading}</span>
                ${this._renderSortIcon(t)}
                ${this._renderFilterDropdown(t)}
                ${this.resizable ? n`<span
                      class=${p({ "resize-handle": !0, resizing: this._resizingColKey === t.key })}
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
        ${this.rows.length === 0 ? n`<div class="empty" style="grid-column:1/-1">No data</div>` : this.rows.map((t, r) => this._renderRowTree(t, r, e, 0))}
      </div>
    `;
  }
  /** Render a row plus, when expanded, its descendants — recursive to any depth. */
  _renderRowTree(e, t, r, a = 0) {
    const o = this.expandable && (e.children?.length ?? 0) > 0, i = this.expandedIds.includes(e.id);
    return n`
      ${this._renderRow(e, t, r, a)}
      ${o && i ? e.children.map((s, d) => this._renderRowTree(s, d, r, a + 1)) : c}
    `;
  }
  _renderRow(e, t, r, a = 0) {
    const o = a > 0, i = this.selectedIds.includes(e.id), s = this._dragRowId === e.id, d = this._dragOverRowId === e.id && this._dragOverPosition === "above", h = this._dragOverRowId === e.id && this._dragOverPosition === "below", m = this.expandable && (e.children?.length ?? 0) > 0, x = this.expandedIds.includes(e.id);
    return n`
      <div
        class=${p({
      "grid-row": !0,
      "child-row": o,
      selected: i,
      dragging: s,
      "drag-over-above": d,
      "drag-over-below": h,
      clickable: !this.selectable && !this.draggable
    })}
        data-row-id=${e.id}
        @click=${() => this._handleRowClick(e)}
      >
        ${this.expandable ? n`
              <div class="cell cell-expand">
                ${m ? n`
                      <button class="expand-btn" @click=${() => this._handleExpand(e)} aria-label=${x ? "Collapse" : "Expand"}>
                        <span class=${p({ "expand-icon": !0, expanded: x })}>
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </span>
                      </button>
                    ` : c}
              </div>
            ` : c}
        ${this.draggable ? o ? n`<div class="cell cell-checkbox"></div>` : n`
              <div class="cell cell-checkbox">
                <span
                  class="drag-handle"
                  @pointerdown=${(u) => this._handleDragStart(u, e.id, t)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="5.5" cy="3.5" r="1.5"/><circle cx="10.5" cy="3.5" r="1.5"/>
                    <circle cx="5.5" cy="8" r="1.5"/><circle cx="10.5" cy="8" r="1.5"/>
                    <circle cx="5.5" cy="12.5" r="1.5"/><circle cx="10.5" cy="12.5" r="1.5"/>
                  </svg>
                </span>
              </div>
            ` : c}
        ${this.selectable ? o ? n`<div class="cell cell-checkbox"></div>` : n`
              <div class="cell cell-checkbox">
                <ca-checkbox size="xs" ?checked=${i} @ca-change=${() => this._handleSelectRow(e)}></ca-checkbox>
              </div>
            ` : c}
        ${this.columns.map(
      (u, $) => n`
            <div
              class="cell ${o && $ === 0 ? "child-indent" : ""}"
              style=${o && $ === 0 ? `--_depth:${a}` : c}
            >${this._renderCell(u, e)}</div>
          `
    )}
        ${r ? o ? n`<div class="cell cell-actions"></div>` : n`
              <div class="cell cell-actions">
                <button class="actions-btn" @click=${(u) => this._toggleMenu(u, e.id)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="3" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="13" r="1.5"/>
                  </svg>
                </button>
                ${this._openMenuRowId === e.id ? n`
                      <div class="actions-dropdown" @click=${(u) => u.stopPropagation()}>
                        ${this.rowActions.map(
      (u) => n`
                            <button @click=${() => this._handleRowAction(u, e)}>${u.label}</button>
                          `
    )}
                      </div>
                    ` : c}
              </div>
            ` : c}
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
      border-top: 1px solid var(--ca-border);
      border-bottom: 1px solid var(--ca-border);
      width: 100%;
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
      background-color: var(--ca-color-primary);
      color: var(--ca-color-on-primary);
      border-color: var(--ca-color-primary);
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
    /* .cell.child-indent matches the specificity of .grid-row .cell so the
       depth indent isn't overridden by the base cell padding shorthand. */
    .cell.child-indent {
      /* depth 1 = 28px; each further level adds 16px */
      padding-left: calc(28px + (var(--_depth, 1) - 1) * 16px);
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
w([
  l({ type: Array })
], y.prototype, "columns", 2);
w([
  l({ type: Array })
], y.prototype, "rows", 2);
w([
  l({ type: String })
], y.prototype, "heading", 2);
w([
  l({ type: String, attribute: "heading-badge" })
], y.prototype, "headingBadge", 2);
w([
  l({ type: String, attribute: "supporting-text" })
], y.prototype, "supportingText", 2);
w([
  l({ type: Boolean, reflect: !0 })
], y.prototype, "selectable", 2);
w([
  l({ type: Boolean, reflect: !0 })
], y.prototype, "draggable", 2);
w([
  l({ type: Boolean, reflect: !0, attribute: "show-search" })
], y.prototype, "showSearch", 2);
w([
  l({ type: Boolean, reflect: !0, attribute: "show-filters" })
], y.prototype, "showFilters", 2);
w([
  l({ type: Array, attribute: !1 })
], y.prototype, "filterTabs", 2);
w([
  l({ type: String, attribute: "active-filter-tab" })
], y.prototype, "activeFilterTab", 2);
w([
  l({ type: Array, attribute: !1 })
], y.prototype, "rowActions", 2);
w([
  l({ type: Object, attribute: !1 })
], y.prototype, "pagination", 2);
w([
  l({ type: Object, attribute: !1 })
], y.prototype, "sort", 2);
w([
  l({ type: Array, attribute: !1 })
], y.prototype, "selectedIds", 2);
w([
  l({ type: String, reflect: !0, attribute: "row-height" })
], y.prototype, "rowHeight", 2);
w([
  l({ type: Boolean, reflect: !0 })
], y.prototype, "expandable", 2);
w([
  l({ type: Array, attribute: !1 })
], y.prototype, "expandedIds", 2);
w([
  l({ type: Boolean, reflect: !0 })
], y.prototype, "resizable", 2);
w([
  l({ type: Object, attribute: !1 })
], y.prototype, "columnFilters", 2);
w([
  l({ type: Boolean, reflect: !0, attribute: "clickable-rows" })
], y.prototype, "clickableRows", 2);
w([
  l({ type: Array, attribute: !1 })
], y.prototype, "groups", 2);
w([
  l({ type: Boolean, reflect: !0, attribute: "inline-add" })
], y.prototype, "inlineAdd", 2);
w([
  l({ type: Boolean, reflect: !0, attribute: "virtual-scroll" })
], y.prototype, "virtualScroll", 2);
w([
  v()
], y.prototype, "_openMenuRowId", 2);
w([
  v()
], y.prototype, "_searchQuery", 2);
w([
  v()
], y.prototype, "_dragRowId", 2);
w([
  v()
], y.prototype, "_dragOverRowId", 2);
w([
  v()
], y.prototype, "_dragOverPosition", 2);
w([
  v()
], y.prototype, "_openFilterColKey", 2);
w([
  v()
], y.prototype, "_columnWidths", 2);
w([
  v()
], y.prototype, "_fullRows", 2);
w([
  v()
], y.prototype, "_collapsedGroupIds", 2);
w([
  v()
], y.prototype, "_addRowGroupId", 2);
w([
  v()
], y.prototype, "_addRowValue", 2);
w([
  v()
], y.prototype, "_virtualScrollTop", 2);
w([
  v()
], y.prototype, "_editingCell", 2);
y = w([
  g("ca-table")
], y);
var sa = Object.defineProperty, na = Object.getOwnPropertyDescriptor, it = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? na(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && sa(t, r, o), o;
};
const Er = [
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
let ge = class extends f {
  constructor() {
    super(...arguments), this.type = "bar", this.data = { labels: [], datasets: [] }, this.showLegend = !0, this._tooltip = null;
  }
  _getColor(e) {
    return Er[e % Er.length];
  }
  _handleSegmentClick(e, t, r, a) {
    this.dispatchEvent(
      new CustomEvent("ca-segment-click", {
        detail: { datasetIndex: e, dataIndex: t, value: r, label: a },
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
    const r = 600, a = 300, o = { top: 20, right: 20, bottom: 40, left: 50 }, i = r - o.left - o.right, s = a - o.top - o.bottom, d = t.flatMap((_) => _.data), h = Math.max(...d, 1), m = i / e.length, x = m / (t.length + 1), u = 5, $ = h / u;
    return n`
      <svg viewBox="0 0 ${r} ${a}">
        <g transform="translate(${o.left}, ${o.top})">
          <!-- Grid -->
          ${Array.from({ length: u + 1 }, (_, k) => {
      const O = s - k * s / u, I = Math.round(k * $);
      return n`
              <line class="grid-line" x1="0" y1=${O} x2=${i} y2=${O} />
              <text class="axis-label" x="-8" y=${O + 4} text-anchor="end">${I}</text>
            `;
    })}
          <!-- Bars -->
          ${t.map(
      (_, k) => _.data.map((O, I) => {
        const Y = O / h * s, De = I * m + k * x + x * 0.5, ct = s - Y, Jt = _.color || this._getColor(k);
        return n`
                <rect
                  class="bar-rect"
                  x=${De} y=${ct} width=${x * 0.8} height=${Y}
                  fill=${Jt} rx="2"
                  @click=${() => this._handleSegmentClick(k, I, O, e[I])}
                  @mouseenter=${(At) => {
          this._tooltip = { text: `${_.label}: ${O}`, x: At.offsetX + 10, y: At.offsetY - 20 };
        }}
                  @mouseleave=${() => {
          this._tooltip = null;
        }}
                />
              `;
      })
    )}
          <!-- X axis labels -->
          ${e.map((_, k) => n`
            <text class="axis-label" x=${k * m + m / 2} y=${s + 20} text-anchor="middle">${_}</text>
          `)}
        </g>
      </svg>
    `;
  }
  _renderLineChart() {
    const { labels: e, datasets: t } = this.data;
    if (!e.length || !t.length) return c;
    const r = 600, a = 300, o = { top: 20, right: 20, bottom: 40, left: 50 }, i = r - o.left - o.right, s = a - o.top - o.bottom, d = t.flatMap(($) => $.data), h = Math.max(...d, 1), m = i / Math.max(e.length - 1, 1), x = 5, u = h / x;
    return n`
      <svg viewBox="0 0 ${r} ${a}">
        <g transform="translate(${o.left}, ${o.top})">
          <!-- Grid -->
          ${Array.from({ length: x + 1 }, ($, _) => {
      const k = s - _ * s / x, O = Math.round(_ * u);
      return n`
              <line class="grid-line" x1="0" y1=${k} x2=${i} y2=${k} />
              <text class="axis-label" x="-8" y=${k + 4} text-anchor="end">${O}</text>
            `;
    })}
          <!-- Lines -->
          ${t.map(($, _) => {
      const k = $.color || this._getColor(_), O = $.data.map((I, Y) => `${Y * m},${s - I / h * s}`).join(" ");
      return n`
              <polyline fill="none" stroke=${k} stroke-width="2" points=${O} />
              ${$.data.map((I, Y) => n`
                <circle
                  class="line-point"
                  cx=${Y * m} cy=${s - I / h * s} r="4"
                  fill=${k} stroke="#fff" stroke-width="2"
                  @click=${() => this._handleSegmentClick(_, Y, I, e[Y])}
                  @mouseenter=${(De) => {
        this._tooltip = { text: `${$.label}: ${I}`, x: De.offsetX + 10, y: De.offsetY - 20 };
      }}
                  @mouseleave=${() => {
        this._tooltip = null;
      }}
                />
              `)}
            `;
    })}
          <!-- X labels -->
          ${e.map(($, _) => n`
            <text class="axis-label" x=${_ * m} y=${s + 20} text-anchor="middle">${$}</text>
          `)}
        </g>
      </svg>
    `;
  }
  _renderPieChart() {
    const { datasets: e } = this.data;
    if (!e.length || !e[0].data.length) return c;
    const t = e[0].data, r = this.data.labels, a = t.reduce((x, u) => x + u, 0);
    if (a === 0) return c;
    const o = 150, i = 150, s = 120, d = this.type === "doughnut" ? s * 0.6 : 0;
    let h = -Math.PI / 2;
    const m = t.map((x, u) => {
      const $ = x / a * 2 * Math.PI, _ = h + $, k = $ > Math.PI ? 1 : 0, O = o + s * Math.cos(h), I = i + s * Math.sin(h), Y = o + s * Math.cos(_), De = i + s * Math.sin(_);
      let ct = "";
      if (d > 0) {
        const At = o + d * Math.cos(h), Yr = i + d * Math.sin(h), Qr = o + d * Math.cos(_), Gr = i + d * Math.sin(_);
        ct = `M${O},${I} A${s},${s} 0 ${k} 1 ${Y},${De} L${Qr},${Gr} A${d},${d} 0 ${k} 0 ${At},${Yr} Z`;
      } else
        ct = `M${o},${i} L${O},${I} A${s},${s} 0 ${k} 1 ${Y},${De} Z`;
      const Jt = e[0].color ? void 0 : this._getColor(u);
      return h = _, { d: ct, color: Jt || this._getColor(u), val: x, label: r[u] || `Segment ${u + 1}`, index: u };
    });
    return n`
      <svg viewBox="0 0 300 300">
        ${m.map(
      (x) => n`
            <path
              class="pie-slice"
              d=${x.d}
              fill=${x.color}
              @click=${() => this._handleSegmentClick(0, x.index, x.val, x.label)}
              @mouseenter=${(u) => {
        const $ = (x.val / a * 100).toFixed(1);
        this._tooltip = { text: `${x.label}: ${x.val} (${$}%)`, x: u.offsetX + 10, y: u.offsetY - 20 };
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
ge.styles = b`
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
it([
  l({ type: String })
], ge.prototype, "type", 2);
it([
  l({ type: Object, attribute: !1 })
], ge.prototype, "data", 2);
it([
  l({ type: Boolean, attribute: "show-legend" })
], ge.prototype, "showLegend", 2);
it([
  v()
], ge.prototype, "_tooltip", 2);
it([
  F(".chart-container")
], ge.prototype, "_container", 2);
ge = it([
  g("ca-chart")
], ge);
var la = Object.defineProperty, ca = Object.getOwnPropertyDescriptor, _e = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? ca(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && la(t, r, o), o;
};
let ee = class extends f {
  constructor() {
    super(...arguments), this.tasks = [], this.viewMode = "week", this.showTodayMarker = !0, this._resizingTaskId = null, this._resizeSide = null, this._resizeStartX = 0, this._resizeStartDate = null;
  }
  /* ── Date helpers ── */
  _parseDate(e) {
    const [t, r, a] = e.split("-").map(Number);
    return new Date(t, r - 1, a);
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
      const s = /* @__PURE__ */ new Date(), d = this._addDays(s, -7), h = this._addDays(s, 21);
      return this._buildRange(d, h);
    }
    const e = this.tasks.map((s) => this._parseDate(s.startDate)), t = this.tasks.map((s) => this._parseDate(s.endDate)), r = new Date(Math.min(...e.map((s) => s.getTime()))), a = new Date(Math.max(...t.map((s) => s.getTime()))), o = this._addDays(r, -3), i = this._addDays(a, 7);
    return this._buildRange(o, i);
  }
  _buildRange(e, t) {
    const r = [];
    let a = new Date(e);
    for (; a <= t; )
      r.push(new Date(a)), a.setDate(a.getDate() + 1);
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
    const a = this.tasks.find((o) => o.id === t);
    a && (this._resizeStartDate = this._parseDate(r === "left" ? a.startDate : a.endDate)), e.target.setPointerCapture(e.pointerId);
  }
  _handleResizeMove(e) {
    !this._resizingTaskId || this._resizeStartDate;
  }
  _handleResizeEnd(e) {
    if (!this._resizingTaskId || !this._resizeStartDate) {
      this._resizingTaskId = null;
      return;
    }
    const t = e.clientX - this._resizeStartX, r = Math.round(t / this._colWidth), a = this.tasks.find((o) => o.id === this._resizingTaskId);
    if (a && r !== 0) {
      let o = this._parseDate(a.startDate), i = this._parseDate(a.endDate);
      this._resizeSide === "left" ? (o = this._addDays(o, r), o >= i && (o = this._addDays(i, -1))) : (i = this._addDays(i, r), i <= o && (i = this._addDays(o, 1))), this.dispatchEvent(
        new CustomEvent("ca-task-resize", {
          detail: { id: a.id, startDate: this._toISO(o), endDate: this._toISO(i) },
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
    const { days: e } = this._dateRange, t = this._colWidth, r = e.length * t, a = /* @__PURE__ */ new Date();
    a.setHours(0, 0, 0, 0);
    const o = e.findIndex(
      (i) => i.getFullYear() === a.getFullYear() && i.getMonth() === a.getMonth() && i.getDate() === a.getDate()
    );
    return n`
      <div class="view-controls">
        ${["day", "week", "month"].map(
      (i) => n`
            <button class=${p({ "view-btn": !0, active: this.viewMode === i })} @click=${() => this._handleViewChange(i)}>
              ${i.charAt(0).toUpperCase() + i.slice(1)}
            </button>
          `
    )}
      </div>
      <div class="gantt-container">
        <!-- Task list -->
        <div class="task-list">
          <div class="task-list-header">Tasks</div>
          ${this.tasks.map(
      (i) => n`
              <div class="task-list-row" @click=${() => this._handleTaskClick(i)}>${i.title}</div>
            `
    )}
        </div>
        <!-- Timeline -->
        <div class="timeline">
          <div class="timeline-inner" style="width:${r}px; --col-width:${t}px">
            <!-- Header -->
            <div class="timeline-header">
              ${e.map((i) => {
      const s = this._formatDateLabel(i), d = i.getTime() === a.getTime(), h = this._isWeekend(i);
      return n`<div class=${p({ "timeline-date": !0, weekend: h, today: d })}>${s}</div>`;
    })}
            </div>
            <!-- Rows -->
            <div class="timeline-rows">
              ${this.showTodayMarker && o >= 0 ? n`<div class="today-marker" style="left:${o * t + t / 2}px"></div>` : c}
              ${this.tasks.map((i, s) => {
      const d = this._parseDate(i.startDate), h = this._parseDate(i.endDate), m = e[0], x = this._daysBetween(m, d), u = this._daysBetween(d, h) + 1, $ = x * t, _ = u * t, k = i.color || "var(--ca-color-primary)";
      return n`
                  <div class="timeline-row">
                    <div class="timeline-row-bg">
                      ${e.map((O) => n`<div class=${p({ "timeline-cell": !0, weekend: this._isWeekend(O) })}></div>`)}
                    </div>
                    <div
                      class="task-bar"
                      style="left:${$}px; width:${Math.max(_, t)}px; background-color:${k}"
                      @click=${() => this._handleTaskClick(i)}
                      @pointermove=${this._handleResizeMove}
                      @pointerup=${this._handleResizeEnd}
                    >
                      ${i.progress != null ? n`<div class="task-bar-fill" style="width:${i.progress}%; background-color:${k}"></div>` : c}
                      <span class="task-bar-label">${i.title}</span>
                      <div class="resize-handle left"
                        @pointerdown=${(O) => this._handleResizeStart(O, i.id, "left")}></div>
                      <div class="resize-handle right"
                        @pointerdown=${(O) => this._handleResizeStart(O, i.id, "right")}></div>
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
ee.styles = b`
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
      color: var(--ca-color-white);
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
      background: var(--ca-color-primary);
      color: var(--ca-color-on-primary);
      border-color: var(--ca-color-primary);
    }
    .view-btn:hover:not(.active) {
      background: var(--ca-surface-hover);
    }
  `;
_e([
  l({ type: Array, attribute: !1 })
], ee.prototype, "tasks", 2);
_e([
  l({ type: String, attribute: "view-mode" })
], ee.prototype, "viewMode", 2);
_e([
  l({ type: Boolean, attribute: "show-today-marker" })
], ee.prototype, "showTodayMarker", 2);
_e([
  v()
], ee.prototype, "_resizingTaskId", 2);
_e([
  v()
], ee.prototype, "_resizeSide", 2);
_e([
  v()
], ee.prototype, "_resizeStartX", 2);
_e([
  v()
], ee.prototype, "_resizeStartDate", 2);
ee = _e([
  g("ca-gantt-chart")
], ee);
var da = Object.defineProperty, pa = Object.getOwnPropertyDescriptor, St = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? pa(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && da(t, r, o), o;
};
let Le = class extends f {
  constructor() {
    super(...arguments), this.items = [], this.multiple = !1, this._internalIds = [];
  }
  get _openIds() {
    return this.openIds ?? this._internalIds;
  }
  _toggle(e) {
    const t = this._openIds, r = t.includes(e) ? t.filter((a) => a !== e) : this.multiple ? [...t, e] : [e];
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
                  class=${p({ chevron: !0, open: this._isOpen(e.id) })}
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
                class=${p({ panel: !0, open: this._isOpen(e.id) })}
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
Le.styles = b`
    .accordion {
      --_border: var(--ca-accordion-border, 1px solid var(--ca-border));
      width: 100%;
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      overflow: hidden;
    }
    .item {
      border-top: var(--_border);
    }
    .item:first-child {
      border-top: none;
    }
    .trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      width: 100%;
      padding: 14px 16px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--ca-font-family);
      font-weight: var(--ca-font-weight-medium);
      font-size: var(--ca-font-size-md);
      line-height: 1.3;
      color: var(--ca-text-primary);
      text-align: left;
      transition: background-color var(--ca-transition-fast);
    }
    .trigger:hover {
      background-color: var(--ca-surface-hover);
    }
    .trigger:focus-visible {
      outline: 2px solid var(--ca-color-primary);
      outline-offset: -2px;
    }
    .chevron {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      transition: transform 0.2s ease;
      color: var(--ca-text-muted);
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
      padding: 0 16px 16px;
      font-size: var(--ca-font-size-sm);
      line-height: 1.55;
      color: var(--ca-text-secondary);
    }
  `;
St([
  l({ type: Array })
], Le.prototype, "items", 2);
St([
  l({ type: Boolean })
], Le.prototype, "multiple", 2);
St([
  l({ type: Array, attribute: !1 })
], Le.prototype, "openIds", 2);
St([
  v()
], Le.prototype, "_internalIds", 2);
Le = St([
  g("ca-accordion")
], Le);
var ha = Object.defineProperty, ua = Object.getOwnPropertyDescriptor, $e = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? ua(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && ha(t, r, o), o;
};
let te = class extends f {
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
                class=${p({
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
te.styles = b`
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
      color: var(--ca-avatar-color, var(--ca-color-on-primary));
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
$e([
  l({ type: String })
], te.prototype, "src", 2);
$e([
  l({ type: String })
], te.prototype, "alt", 2);
$e([
  l({ type: String })
], te.prototype, "name", 2);
$e([
  l({ type: String, reflect: !0 })
], te.prototype, "size", 2);
$e([
  l({ type: String })
], te.prototype, "status", 2);
$e([
  l({ type: String })
], te.prototype, "color", 2);
$e([
  v()
], te.prototype, "_imgError", 2);
te = $e([
  g("ca-avatar")
], te);
var va = Object.defineProperty, fa = Object.getOwnPropertyDescriptor, Dt = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? fa(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && va(t, r, o), o;
};
let Re = class extends f {
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
Re.styles = b`
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
Dt([
  l({ type: Array, attribute: !1 })
], Re.prototype, "members", 2);
Dt([
  l({ type: Number })
], Re.prototype, "max", 2);
Dt([
  l({ type: String, reflect: !0 })
], Re.prototype, "size", 2);
Dt([
  l({ type: Boolean, reflect: !0 })
], Re.prototype, "interactive", 2);
Re = Dt([
  g("ca-avatar-group")
], Re);
const Ye = [
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
], fr = [
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
], ga = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function Pr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function ba(e, t) {
  return new Date(e, t, 1).getDay();
}
function xa(e, t) {
  const r = [], a = ba(e, t), o = Pr(e, t), i = t === 0 ? 11 : t - 1, s = t === 0 ? e - 1 : e, d = Pr(s, i);
  for (let u = a - 1; u >= 0; u--)
    r.push({ year: s, month: i, day: d - u, isCurrentMonth: !1 });
  for (let u = 1; u <= o; u++)
    r.push({ year: e, month: t, day: u, isCurrentMonth: !0 });
  const h = t === 11 ? 0 : t + 1, m = t === 11 ? e + 1 : e, x = 42 - r.length;
  for (let u = 1; u <= x; u++)
    r.push({ year: m, month: h, day: u, isCurrentMonth: !1 });
  return r;
}
function pt(e) {
  return `${fr[e.getMonth()]} ${e.getDate()}, ${e.getFullYear()}`;
}
function er(e) {
  const t = e.getFullYear(), r = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${r}-${a}`;
}
function Q(e) {
  const t = /^(\d{4})-(\d{2})-(\d{2})$/.exec(e);
  if (!t) return null;
  const r = new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]));
  return isNaN(r.getTime()) ? null : r;
}
function X(e, t) {
  return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function Ir(e, t, r) {
  const a = e.getTime(), o = t.getTime(), i = r.getTime(), s = Math.min(o, i), d = Math.max(o, i);
  return a >= s && a <= d;
}
function Tt(e, t, r) {
  if (t) {
    const a = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    if (e < a) return !0;
  }
  if (r) {
    const a = new Date(r.getFullYear(), r.getMonth(), r.getDate());
    if (e > a) return !0;
  }
  return !1;
}
var ma = Object.defineProperty, ya = Object.getOwnPropertyDescriptor, C = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? ya(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && ma(t, r, o), o;
};
const wa = n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`, _a = n`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 12L6 8l4-4"/></svg>`, $a = n`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l4 4-4 4"/></svg>`, ka = n`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>`;
function tr(e) {
  return new Date(e.year, e.month, e.day);
}
let z = class extends f {
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
    return this.minDate ? Q(this.minDate) : null;
  }
  get _parsedMax() {
    return this.maxDate ? Q(this.maxDate) : null;
  }
  get _singleDate() {
    return this.mode === "single" && this.value ? Q(this.value) : null;
  }
  get _rangeStartVal() {
    return this.mode === "range" && this.startDate ? Q(this.startDate) : null;
  }
  get _rangeEndVal() {
    return this.mode === "range" && this.endDate ? Q(this.endDate) : null;
  }
  get _grid() {
    return xa(this._viewYear, this._viewMonth);
  }
  // ── Display text ───────────────────────────────────────────────────
  get _displayText() {
    if (this.mode === "single") {
      const r = this._singleDate;
      return r ? pt(r) : "";
    }
    const e = this._rangeStartVal, t = this._rangeEndVal;
    return e && t ? `${pt(e)} – ${pt(t)}` : e ? `${pt(e)} – ...` : "";
  }
  get _hasValue() {
    return this.mode === "single" ? this.value !== "" : this.startDate !== "" || this.endDate !== "";
  }
  // ── Open / close ───────────────────────────────────────────────────
  _open() {
    if (this.disabled) return;
    const e = this._singleDate ?? this._rangeStartVal ?? /* @__PURE__ */ new Date();
    this._viewYear = e.getFullYear(), this._viewMonth = e.getMonth(), this._isOpen = !0, this._rangeStart = null, this._hoverDate = null, this._announceLive(`${Ye[this._viewMonth]} ${this._viewYear}`), this.updateComplete.then(() => {
      const t = this._grid, r = this._singleDate ?? this._rangeStartVal ?? /* @__PURE__ */ new Date(), a = t.findIndex(
        (o) => o.isCurrentMonth && o.year === r.getFullYear() && o.month === r.getMonth() && o.day === r.getDate()
      );
      this._focusedIndex = a >= 0 ? a : t.findIndex((o) => o.isCurrentMonth), this._focusCellByIndex(this._focusedIndex);
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
    this._viewMonth === 0 ? (this._viewMonth = 11, this._viewYear--) : this._viewMonth--, this._announceLive(`${Ye[this._viewMonth]} ${this._viewYear}`);
  }
  _nextMonth() {
    this._viewMonth === 11 ? (this._viewMonth = 0, this._viewYear++) : this._viewMonth++, this._announceLive(`${Ye[this._viewMonth]} ${this._viewYear}`);
  }
  _goToToday() {
    const e = /* @__PURE__ */ new Date();
    this._viewYear = e.getFullYear(), this._viewMonth = e.getMonth(), this._announceLive(`${Ye[this._viewMonth]} ${this._viewYear}`), this.mode === "single" && !Tt(e, this._parsedMin, this._parsedMax) && this._selectDate(e);
  }
  // ── Selection ──────────────────────────────────────────────────────
  _selectDate(e) {
    if (Tt(e, this._parsedMin, this._parsedMax)) return;
    if (this.mode === "single") {
      this.dispatchEvent(
        new CustomEvent("ca-change", {
          detail: { value: er(e) },
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
          startDate: er(t),
          endDate: er(r)
        },
        bubbles: !0,
        composed: !0
      })
    ), this._rangeStart = null, this._hoverDate = null, this._close();
  }
  // ── Day cell state computation ─────────────────────────────────────
  _getDayClasses(e, t) {
    const r = tr(e), o = X(r, /* @__PURE__ */ new Date()), i = !e.isCurrentMonth, s = Tt(r, this._parsedMin, this._parsedMax);
    let d = !1, h = !1, m = !1, x = !1;
    if (this.mode === "single") {
      const u = this._singleDate;
      u && X(r, u) && (d = !0);
    } else if (this.mode === "range")
      if (this._rangeStart) {
        const u = this._hoverDate ?? this._rangeStart, [$, _] = this._rangeStart.getTime() <= u.getTime() ? [this._rangeStart, u] : [u, this._rangeStart];
        m = X(r, $), x = X(r, _), d = X(r, this._rangeStart) || X(r, u), h = Ir(r, $, _) && !X(r, $) && !X(r, _);
      } else this._rangeStartVal && this._rangeEndVal && (m = X(r, this._rangeStartVal), x = X(r, this._rangeEndVal), d = m || x, h = Ir(r, this._rangeStartVal, this._rangeEndVal) && !m && !x);
    return {
      "day-cell": !0,
      outside: i,
      today: o,
      selected: d,
      "in-range": h,
      "range-start": m,
      "range-end": x,
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
      const i = /* @__PURE__ */ new Date();
      r = t.findIndex(
        (s) => s.isCurrentMonth && s.year === i.getFullYear() && s.month === i.getMonth() && s.day === i.getDate()
      ), r === -1 && (r = t.findIndex((s) => s.isCurrentMonth));
    }
    let a = r, o = !0;
    switch (e.key) {
      case "ArrowLeft":
        a = r - 1;
        break;
      case "ArrowRight":
        a = r + 1;
        break;
      case "ArrowUp":
        a = r - 7;
        break;
      case "ArrowDown":
        a = r + 7;
        break;
      case "Home": {
        a = t.findIndex((i) => i.isCurrentMonth);
        break;
      }
      case "End": {
        for (let i = t.length - 1; i >= 0; i--)
          if (t[i].isCurrentMonth) {
            a = i;
            break;
          }
        break;
      }
      case "PageUp":
        e.preventDefault(), e.shiftKey ? this._viewYear-- : this._prevMonth(), this.updateComplete.then(() => {
          const i = Math.min(r, this._grid.length - 1);
          this._focusedIndex = i, this._focusCellByIndex(i);
        });
        return;
      case "PageDown":
        e.preventDefault(), e.shiftKey ? this._viewYear++ : this._nextMonth(), this.updateComplete.then(() => {
          const i = Math.min(r, this._grid.length - 1);
          this._focusedIndex = i, this._focusCellByIndex(i);
        });
        return;
      case "Enter":
      case " ":
        e.preventDefault(), r >= 0 && r < t.length && this._selectDate(tr(t[r]));
        return;
      case "Escape":
        e.preventDefault(), this._close(), this.updateComplete.then(() => {
          this.shadowRoot?.querySelector('[role="combobox"]')?.focus();
        });
        return;
      default:
        o = !1;
    }
    if (o) {
      if (e.preventDefault(), a < 0) {
        this._prevMonth(), this.updateComplete.then(() => {
          const i = Math.max(0, Math.min(a + 42, this._grid.length - 1));
          this._focusedIndex = i, this._focusCellByIndex(i);
        });
        return;
      }
      if (a >= 42) {
        this._nextMonth(), this.updateComplete.then(() => {
          const i = Math.min(a - 42, this._grid.length - 1);
          this._focusedIndex = i, this._focusCellByIndex(i);
        });
        return;
      }
      this._focusedIndex = a, this._focusCellByIndex(a);
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
      <!-- Trigger field -->
      <div
        class=${p({ field: !0, disabled: this.disabled })}
        part="field"
        tabindex=${this.disabled ? -1 : 0}
        role="combobox"
        aria-expanded=${this._isOpen}
        aria-haspopup="dialog"
        aria-label=${this.label || this.placeholder}
        @click=${this._toggle}
        @keydown=${this._handleFieldKeydown}
      >
        <span class="calendar-icon">${wa}</span>
        <div class="text-area">
          ${this.label ? n`<span class="label">${this.label}</span>` : c}
          <span class=${p({ "value-text": !0, placeholder: !e })}>
            ${e || this.placeholder}
          </span>
        </div>
        <span class=${p({ chevron: !0, open: this._isOpen })}>
          ${ka}
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
                  ${_a}
                </button>
                <span class="month-year">
                  ${Ye[this._viewMonth]} ${this._viewYear}
                </span>
                <button
                  type="button"
                  class="nav-button"
                  aria-label="Next month"
                  @click=${(r) => {
      r.stopPropagation(), this._nextMonth();
    }}
                >
                  ${$a}
                </button>
              </div>

              <!-- Weekday labels -->
              <div class="weekday-row" role="row">
                ${ga.map(
      (r) => n`<span class="weekday" role="columnheader">${r}</span>`
    )}
              </div>

              <!-- Day grid -->
              <div
                class="day-grid"
                role="grid"
                aria-label="${Ye[this._viewMonth]} ${this._viewYear}"
                @keydown=${this._handleGridKeydown}
              >
                ${t.map((r, a) => {
      const o = tr(r), i = Tt(o, this._parsedMin, this._parsedMax), s = this._getDayClasses(r, a);
      return n`
                    <button
                      type="button"
                      data-cell=${a}
                      class=${p(s)}
                      tabindex=${this._focusedIndex === a ? 0 : -1}
                      role="gridcell"
                      aria-label=${pt(o)}
                      aria-selected=${s.selected ? "true" : "false"}
                      aria-disabled=${i ? "true" : c}
                      @click=${(d) => {
        d.stopPropagation(), i || (this._focusedIndex = a, this._selectDate(o));
      }}
                      @mouseenter=${() => {
        !i && this.mode === "range" && this._rangeStart && (this._hoverDate = o);
      }}
                      @focus=${() => {
        this._focusedIndex = a;
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
      --_selected-color: var(--ca-datepicker-selected-color, var(--ca-color-on-primary));
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

    /* ── Label (inner) ── */
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

    /* ── Field / trigger ── */
    .field {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      min-height: var(--ca-control-height-md);
      padding: 6px 12px;
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
      min-height: var(--ca-control-height-xs);
      padding: 2px 8px;
      font-size: var(--ca-font-size-xs);
      border-radius: var(--ca-radius-md);
      gap: 6px;
    }
    :host([size='xs']) .label { font-size: 9px; }
    :host([size='sm']) .field {
      min-height: var(--ca-control-height-sm);
      padding: 4px 10px;
      font-size: var(--ca-font-size-xs);
      border-radius: var(--ca-radius-md);
      gap: 8px;
    }
    :host([size='sm']) .label { font-size: 10px; }
    :host([size='lg']) .field {
      min-height: var(--ca-control-height-lg);
      padding: 8px 14px;
      font-size: var(--ca-font-size-md);
      border-radius: var(--ca-radius-md);
      gap: 12px;
    }
    :host([size='lg']) .label { font-size: 13px; }
    :host([size='xl']) .field {
      min-height: var(--ca-control-height-xl);
      padding: 10px 16px;
      font-size: var(--ca-font-size-lg);
      border-radius: var(--ca-radius-lg);
      gap: 14px;
    }
    :host([size='xl']) .label { font-size: 14px; }

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
  v()
], z.prototype, "_isOpen", 2);
C([
  v()
], z.prototype, "_viewYear", 2);
C([
  v()
], z.prototype, "_viewMonth", 2);
C([
  v()
], z.prototype, "_rangeStart", 2);
C([
  v()
], z.prototype, "_hoverDate", 2);
C([
  v()
], z.prototype, "_focusedIndex", 2);
C([
  v()
], z.prototype, "_liveText", 2);
C([
  F(".day-grid")
], z.prototype, "_dayGrid", 2);
z = C([
  g("ca-datepicker")
], z);
var za = Object.defineProperty, Ca = Object.getOwnPropertyDescriptor, Qt = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ca(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && za(t, r, o), o;
};
let Ze = class extends f {
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
    const a = r[0], o = r[r.length - 1];
    e.shiftKey ? (document.activeElement === a || this.shadowRoot?.activeElement === a) && (e.preventDefault(), o.focus()) : (document.activeElement === o || this.shadowRoot?.activeElement === o) && (e.preventDefault(), a.focus());
  }
  _getFocusableElements(e) {
    const t = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', r = [];
    return e.querySelectorAll(t).forEach((i) => r.push(i)), e.querySelectorAll("slot").forEach((i) => {
      i.assignedElements({ flatten: !0 }).forEach((d) => {
        d.matches?.(t) && r.push(d), d.querySelectorAll(t).forEach((m) => r.push(m));
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
          class=${p({ panel: !0, [this.size]: !0 })}
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
Ze.styles = b`
    :host { display: contents; }
    .overlay { position: fixed; inset: 0; z-index: 9000; display: flex; align-items: center; justify-content: center; background-color: rgba(10,11,14,0.5); animation: overlay-fade-in 0.2s ease; }
    .panel { position: relative; background-color: var(--ca-surface-elevated); border-radius: var(--ca-radius-lg); box-shadow: var(--ca-shadow-lg); max-height: 90vh; overflow-y: auto; animation: panel-slide-up 0.25s ease; box-sizing: border-box; font-family: var(--ca-font-family); color: var(--ca-text-primary); }
    .sm { width: 90%; max-width: 400px; }
    .md { width: 90%; max-width: 560px; }
    .lg { width: 90%; max-width: 720px; }
    .full { width: 100%; height: 100%; max-width: none; max-height: none; border-radius: 0; }
    .header { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border-bottom: 1px solid var(--ca-border); font-weight: var(--ca-font-weight-semibold); font-size: var(--ca-font-size-md); }
    .header .close-btn { background: none; border: none; cursor: pointer; padding: 4px; color: var(--ca-text-muted); border-radius: var(--ca-radius-sm); line-height: 0; }
    .header .close-btn:hover { color: var(--ca-text-primary); background: var(--ca-surface-hover); }
    .body { padding: 16px; font-size: var(--ca-font-size-sm); line-height: 1.55; color: var(--ca-text-secondary); }
    .footer { display: flex; align-items: center; justify-content: flex-end; gap: var(--ca-space-sm); padding: 12px 16px; border-top: 1px solid var(--ca-border); }
    .footer ::slotted(*) { margin: 0; }
    @keyframes overlay-fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes panel-slide-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  `;
Qt([
  l({ type: Boolean, reflect: !0 })
], Ze.prototype, "open", 2);
Qt([
  l({ type: String })
], Ze.prototype, "size", 2);
Qt([
  F(".panel")
], Ze.prototype, "_panel", 2);
Ze = Qt([
  g("ca-modal")
], Ze);
var Oa = Object.defineProperty, Sa = Object.getOwnPropertyDescriptor, ke = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Sa(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Oa(t, r, o), o;
};
let re = class extends f {
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
    const a = r[0], o = r[r.length - 1];
    e.shiftKey ? (document.activeElement === a || this.shadowRoot?.activeElement === a) && (e.preventDefault(), o.focus()) : (document.activeElement === o || this.shadowRoot?.activeElement === o) && (e.preventDefault(), a.focus());
  }
  _getFocusableElements(e) {
    const t = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', r = [];
    return e.querySelectorAll(t).forEach((i) => r.push(i)), e.querySelectorAll("slot").forEach((i) => {
      i.assignedElements({ flatten: !0 }).forEach((d) => {
        d.matches?.(t) && r.push(d), d.querySelectorAll(t).forEach((m) => r.push(m));
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
        class=${p({ overlay: !0, "with-backdrop": this.backdrop })}
        @click=${this._handleOverlayClick}
      >
        <aside
          class=${p({ panel: !0, [this.position]: !0 })}
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
re.styles = b`
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
ke([
  l({ type: Boolean, reflect: !0 })
], re.prototype, "open", 2);
ke([
  l({ type: String })
], re.prototype, "position", 2);
ke([
  l({ type: String })
], re.prototype, "size", 2);
ke([
  l({ type: String })
], re.prototype, "heading", 2);
ke([
  l({ type: Boolean })
], re.prototype, "backdrop", 2);
ke([
  l({ type: Boolean, reflect: !0, attribute: "no-padding" })
], re.prototype, "noPadding", 2);
ke([
  F(".panel")
], re.prototype, "_panel", 2);
re = ke([
  g("ca-drawer")
], re);
var Da = Object.defineProperty, Ea = Object.getOwnPropertyDescriptor, B = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ea(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Da(t, r, o), o;
};
let D = class extends f {
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
          class=${p({ chevron: !0, open: this._isOpen })}
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
                        class=${p({
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
      min-height: var(--ca-control-height-md);
      padding: 6px 12px;
      border: 1px solid var(--ca-border-strong);
      border-radius: var(--ca-radius-sm);
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
    :host([size='xs']) .field { min-height: var(--ca-control-height-xs); padding: 2px 8px; gap: 8px; font-size: var(--ca-font-size-xs); border-radius: var(--ca-radius-sm); }
    :host([size='xs']) .label { font-size: 9px; }
    :host([size='xs']) .value { font-size: var(--ca-font-size-xs); }
    :host([size='xs']) .chevron { width: 12px; height: 12px; }
    :host([size='xs']) .dropdown { border-radius: var(--ca-radius-md); }
    :host([size='xs']) .option { padding: 6px 8px; font-size: var(--ca-font-size-xs); gap: 8px; }
    :host([size='xs']) .check-icon { width: 14px; height: 14px; }

    :host([size='sm']) .field { min-height: var(--ca-control-height-sm); padding: 4px 10px; gap: 10px; font-size: var(--ca-font-size-sm); border-radius: var(--ca-radius-sm); }
    :host([size='sm']) .label { font-size: 10px; }
    :host([size='sm']) .value { font-size: var(--ca-font-size-sm); }
    :host([size='sm']) .chevron { width: 14px; height: 14px; }
    :host([size='sm']) .dropdown { border-radius: var(--ca-radius-md); }
    :host([size='sm']) .option { padding: 8px 10px; font-size: var(--ca-font-size-sm); gap: 10px; }
    :host([size='sm']) .check-icon { width: 18px; height: 18px; }

    :host([size='lg']) .field { min-height: var(--ca-control-height-lg); padding: 8px 14px; gap: 14px; font-size: var(--ca-font-size-md); border-radius: var(--ca-radius-sm); }
    :host([size='lg']) .label { font-size: 13px; }
    :host([size='lg']) .value { font-size: var(--ca-font-size-md); }
    :host([size='lg']) .chevron { width: 18px; height: 18px; }
    :host([size='lg']) .dropdown { border-radius: var(--ca-radius-md); }
    :host([size='lg']) .option { padding: 12px 14px; font-size: var(--ca-font-size-md); gap: 14px; }
    :host([size='lg']) .check-icon { width: 22px; height: 22px; }

    :host([size='xl']) .field { min-height: var(--ca-control-height-xl); padding: 10px 16px; gap: 16px; font-size: var(--ca-font-size-lg); border-radius: var(--ca-radius-sm); }
    :host([size='xl']) .label { font-size: 14px; }
    :host([size='xl']) .value { font-size: var(--ca-font-size-lg); }
    :host([size='xl']) .chevron { width: 20px; height: 20px; }
    :host([size='xl']) .dropdown { border-radius: var(--ca-radius-lg); }
    :host([size='xl']) .option { padding: 14px 16px; font-size: var(--ca-font-size-lg); gap: 16px; }
    :host([size='xl']) .check-icon { width: 26px; height: 26px; }
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
      background-color: var(--ca-color-primary-tint);
      color: var(--ca-color-primary-pressed);
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
B([
  l({ type: String, reflect: !0 })
], D.prototype, "size", 2);
B([
  l({ type: String })
], D.prototype, "label", 2);
B([
  l({ type: String })
], D.prototype, "placeholder", 2);
B([
  l({ type: Array })
], D.prototype, "options", 2);
B([
  l({ type: String })
], D.prototype, "value", 2);
B([
  l({ type: Boolean })
], D.prototype, "loading", 2);
B([
  l({ type: Boolean, reflect: !0 })
], D.prototype, "borderless", 2);
B([
  l({ type: Boolean })
], D.prototype, "searchable", 2);
B([
  l({ type: Boolean, attribute: "allow-create" })
], D.prototype, "allowCreate", 2);
B([
  v()
], D.prototype, "_isOpen", 2);
B([
  v()
], D.prototype, "_searchQuery", 2);
B([
  v()
], D.prototype, "_dropdownPos", 2);
B([
  F(".field")
], D.prototype, "_fieldEl", 2);
D = B([
  g("ca-select")
], D);
var Pa = Object.defineProperty, Ia = Object.getOwnPropertyDescriptor, P = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ia(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Pa(t, r, o), o;
};
let S = class extends f {
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
    const r = [...this.value], a = r.indexOf(e.value);
    a >= 0 ? r.splice(a, 1) : r.push(e.value), this.dispatchEvent(
      new CustomEvent("ca-change", {
        detail: { value: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleRemoveChip(e, t) {
    t.stopPropagation();
    const r = this.value.filter((a) => a !== e);
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
        class=${p({ field: !0, disabled: this.disabled })}
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
          class=${p({ chevron: !0, open: this._isOpen })}
          viewBox="0 0 16 16" fill="none"
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      ${this._isOpen ? this._renderDropdown() : c}
    `;
  }
  _renderChips(e) {
    const t = [...e.entries()], r = t.slice(0, this.maxVisibleChips), a = t.length - r.length;
    return n`
      <div class="chips-area">
        ${r.map(
      ([o, i]) => n`
            <span class="chip">
              <span class="chip-label">${i}</span>
              <button class="chip-remove" @click=${(s) => this._handleRemoveChip(o, s)} aria-label="Remove ${i}" tabindex="-1">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </span>
          `
    )}
        ${a > 0 ? n`<span class="overflow-count">+${a}</span>` : c}
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
                    class=${p({ option: !0, selected: r })}
                    role="option"
                    aria-selected=${r}
                    @click=${(a) => this._handleOptionToggle(t, a)}
                  >
                    <span class=${p({ "checkbox-box": !0, checked: r })}>
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
      min-height: var(--ca-control-height-md);
      padding: 6px 12px;
      border: 1px solid var(--ca-border-strong);
      border-radius: var(--ca-radius-sm);
      background-color: var(--ca-surface);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      cursor: pointer;
      box-sizing: border-box;
      transition: border-color 0.15s ease;
    }
    .field:hover { border-color: var(--ca-text-primary); }
    .field:focus-visible,
    .field:focus { outline: none; border: 2px solid var(--ca-text-primary); }
    .field.loading { justify-content: center; pointer-events: none; }

    /* ── XS ── */
    :host([size='xs']) .field { min-height: var(--ca-control-height-xs); padding: 2px 8px; gap: 8px; font-size: var(--ca-font-size-xs); border-radius: var(--ca-radius-sm); }
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
    :host([size='sm']) .field { min-height: var(--ca-control-height-sm); padding: 4px 10px; gap: 10px; font-size: var(--ca-font-size-sm); border-radius: var(--ca-radius-sm); }
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
    :host([size='lg']) .field { min-height: var(--ca-control-height-lg); padding: 8px 14px; gap: 14px; font-size: var(--ca-font-size-md); border-radius: var(--ca-radius-sm); }
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
    :host([size='xl']) .field { min-height: var(--ca-control-height-xl); padding: 10px 16px; gap: 16px; font-size: var(--ca-font-size-lg); border-radius: var(--ca-radius-sm); }
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
      background-color: var(--ca-color-primary);
      border-color: var(--ca-color-primary);
    }
    .checkbox-box svg {
      width: 10px;
      height: 10px;
      color: var(--ca-color-on-primary);
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
  v()
], S.prototype, "_isOpen", 2);
P([
  v()
], S.prototype, "_searchQuery", 2);
P([
  F(".field")
], S.prototype, "_fieldEl", 2);
P([
  F(".search-input")
], S.prototype, "_searchInput", 2);
S = P([
  g("ca-multi-select")
], S);
var Ma = Object.defineProperty, Aa = Object.getOwnPropertyDescriptor, q = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Aa(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Ma(t, r, o), o;
};
const Ta = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>', ja = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4l-4 4 4 4"/></svg>', Ba = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l4 4-4 4"/></svg>', La = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="3" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="13" r="1.5"/></svg>', Ra = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="1.6 2"><circle cx="7" cy="7" r="5.5"/></svg>';
let M = class extends f {
  constructor() {
    super(...arguments), this.collapsed = !1, this.activeId = "", this.sections = [], this.profileActions = [], this.logoSrc = "", this.logoCollapsedSrc = "", this.logoAlt = "", this._openDropdowns = /* @__PURE__ */ new Set(), this._tooltip = null, this._popover = null, this._profilePopover = !1, this._boundClickOutside = this._handleClickOutside.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._boundClickOutside);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._boundClickOutside);
  }
  _handleClickOutside(e) {
    this.contains(e.target) || (this._popover && (this._popover = null), this._profilePopover && (this._profilePopover = !1));
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
    const r = t.currentTarget, a = this.getBoundingClientRect(), o = r.getBoundingClientRect(), i = o.top - a.top + o.height / 2;
    e.children && e.children.length > 0 ? (this._tooltip = null, this._popover = { id: e.id, top: o.top - a.top, items: e.children }) : (this._popover = null, this._tooltip = { id: e.id, top: i });
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
  _toggleProfilePopover() {
    this._profilePopover = !this._profilePopover;
  }
  _handleProfileAction(e) {
    this.dispatchEvent(
      new CustomEvent("ca-profile-action", {
        detail: { id: e },
        bubbles: !0,
        composed: !0
      })
    ), this._profilePopover = !1;
  }
  _renderSubItems(e) {
    return !e.children || e.children.length === 0 || this.collapsed || !this._openDropdowns.has(e.id) ? c : n`
      <div class="sub-items">
        <div class="sub-line"></div>
        <div class="sub-list">
          ${e.children.map(
      (t) => n`
              <button
                class=${p({
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
    const t = e.children && e.children.length > 0, r = this._openDropdowns.has(e.id), a = this._isItemActive(e);
    return n`
      <div class="item-group">
        <button
          class=${p({
      "nav-link": !0,
      active: a,
      danger: !!e.danger
    })}
          @click=${() => this._handleItemClick(e)}
          @mouseenter=${(o) => this._handleMouseEnter(e, o)}
          @mouseleave=${() => this._handleMouseLeave()}
        >
          ${e.icon ? n`<span class="nav-icon">${N(e.icon)}</span>` : c}
          ${this.collapsed ? c : n`<span class="nav-label">${e.label}</span>`}
          ${e.accessory && !this.collapsed ? n`<span class="nav-accessory">${N(e.accessory)}</span>` : c}
          ${t && !this.collapsed ? n`
                <span
                  class=${p({
      "nav-chevron": !0,
      "chevron-open": r
    })}
                >
                  ${N(Ta)}
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
        class=${p({
      section: !0,
      "section-grow": !!e.grow
    })}
      >
        ${e.title ? n`
              <div class="section-title">
                <span class="section-title-icon">${N(Ra)}</span>
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
              class=${p({
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
  _renderProfilePopover() {
    return !this._profilePopover || this.profileActions.length === 0 ? c : n`
      <div class="profile-popover">
        ${this.profileActions.map(
      (e) => n`
            <button
              class=${p({
        "popover-link": !0,
        danger: !!e.danger
      })}
              @click=${() => this._handleProfileAction(e.id)}
            >
              ${e.icon ? n`<span class="nav-icon">${N(e.icon)}</span>` : c}
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
        ${this.collapsed ? N(Ba) : N(ja)}
      </button>

      <div class="logo-area">
        <span class="logo-expanded">
          ${this.logoSrc ? n`<img class="logo-img" src=${this.logoSrc} alt=${this.logoAlt} />` : n`<slot name="logo"></slot>`}
        </span>
        <span class="logo-collapsed">
          ${this.logoCollapsedSrc || this.logoSrc ? n`<img class="logo-img logo-img-collapsed" src=${this.logoCollapsedSrc || this.logoSrc} alt=${this.logoAlt} />` : n`<slot name="logo-collapsed"></slot>`}
        </span>
      </div>
      <div class="divider-line"></div>

      <div class="nav-sections">
        ${this.sections.map((e, t) => this._renderSection(e, t))}
      </div>

      <div class="divider-line"></div>
      <div class="profile-area">
        <div class="profile-avatar">
          <slot name="profile-avatar"></slot>
        </div>
        <div class="profile-slot-wrapper">
          <slot name="profile"></slot>
        </div>
        ${this.profileActions.length > 0 ? n`
              <button
                class="kebab-btn"
                @click=${this._toggleProfilePopover}
                aria-label="User menu"
              >
                ${N(La)}
              </button>
            ` : c}
      </div>

      ${this._renderProfilePopover()}
      ${this._renderTooltip()}
      ${this._renderPopover()}
    `;
  }
};
M.styles = b`
    :host {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 24px;
      background-color: var(--ca-surface);
      border-right: 1px solid var(--ca-border);
      font-family: var(--ca-font-family);
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

    /* Logo area */
    .logo-area {
      display: flex;
      align-items: center;
      width: 100%;
    }
    .logo-expanded {
      display: contents;
    }
    .logo-collapsed {
      display: none;
    }
    :host([collapsed]) .logo-area {
      justify-content: center;
    }
    :host([collapsed]) .logo-expanded {
      display: none;
    }
    :host([collapsed]) .logo-collapsed {
      display: contents;
    }

    /* Logo image (via prop or slotted <img>) */
    .logo-img {
      max-height: var(--ca-sidenav-logo-height, 32px);
      width: auto;
      display: block;
    }
    .logo-img-collapsed {
      width: var(--ca-sidenav-icon-size, 32px);
      height: var(--ca-sidenav-icon-size, 32px);
      object-fit: contain;
      display: block;
    }
    .logo-expanded ::slotted(img) {
      max-height: var(--ca-sidenav-logo-height, 32px);
      width: auto;
      display: block;
    }
    .logo-collapsed ::slotted(img) {
      width: var(--ca-sidenav-icon-size, 32px);
      height: var(--ca-sidenav-icon-size, 32px);
      object-fit: contain;
      display: block;
    }

    /* Divider */
    .divider-line {
      width: 100%;
      height: 1px;
      background-color: var(--ca-border);
      flex-shrink: 0;
    }

    /* Nav sections wrapper — flex-grow pins profile to bottom */
    .nav-sections {
      display: flex;
      flex-direction: column;
      gap: 24px;
      flex: 1;
      min-height: 0;
      width: 100%;
    }
    :host([collapsed]) .nav-sections {
      align-items: center;
    }

    /* Sections */
    .section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }
    .section + .section {
      padding-top: 8px;
    }
    .section-grow {
      flex: 1;
      min-height: 0;
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 4px 12px 4px 12px;
      color: var(--ca-text-muted);
    }
    .section-title-icon {
      display: inline-flex;
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }
    .section-title-icon svg {
      width: 14px;
      height: 14px;
    }
    .section-title span {
      font-size: 13px;
      font-weight: 500;
      line-height: 1.2;
      color: var(--ca-text-muted);
    }
    :host([collapsed]) .section-title {
      display: none;
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
      border: 1px solid transparent;
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
      transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
      box-sizing: border-box;
    }
    .nav-link:hover {
      background-color: var(--ca-surface-hover);
    }
    .nav-link.active {
      background-color: var(--ca-surface);
      border-color: var(--ca-border);
      color: var(--ca-text-primary);
      box-shadow: var(--ca-shadow-sm);
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
    .nav-accessory {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: var(--ca-text-muted);
    }
    .nav-accessory svg {
      width: 16px;
      height: 16px;
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
      width: 1px;
      background-color: var(--ca-border);
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
      border-left: 1px solid var(--ca-border);
      border-bottom: 1px solid var(--ca-border);
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

    /* Profile area */
    .profile-area {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
    :host([collapsed]) .profile-area {
      justify-content: center;
    }
    .profile-slot-wrapper {
      flex: 1;
      min-width: 0;
    }
    :host([collapsed]) .profile-slot-wrapper {
      display: none;
    }
    :host([collapsed]) .kebab-btn {
      display: none;
    }
    .profile-avatar {
      flex-shrink: 0;
    }

    /* Kebab button */
    .kebab-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: var(--ca-radius-md);
      border: none;
      background: none;
      cursor: pointer;
      color: var(--ca-text-secondary);
      transition: background-color 0.15s ease;
      flex-shrink: 0;
    }
    .kebab-btn:hover {
      background-color: var(--ca-surface-hover);
    }
    .kebab-btn:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: -2px;
    }
    .kebab-btn svg {
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
      gap: 8px;
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
    .popover-link.danger {
      color: var(--ca-text-danger);
    }
    .popover-link .nav-icon {
      width: 16px;
      height: 16px;
    }
    .popover-link .nav-icon svg {
      width: 16px;
      height: 16px;
    }

    /* Profile popover — expanded mode (above profile) */
    .profile-popover {
      position: absolute;
      bottom: 80px;
      left: 24px;
      right: 24px;
      z-index: 20;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px;
      background-color: var(--ca-surface-elevated);
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-lg);
      box-shadow: 0px 100px 80px 0px rgba(0, 0, 0, 0.07),
        0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.05);
    }
    /* Profile popover — collapsed mode (to the right) */
    :host([collapsed]) .profile-popover {
      bottom: auto;
      left: calc(100% + 8px);
      right: auto;
      width: 172px;
    }
  `;
q([
  l({ type: Boolean, reflect: !0 })
], M.prototype, "collapsed", 2);
q([
  l({ type: String, attribute: "active-id" })
], M.prototype, "activeId", 2);
q([
  l({ type: Array })
], M.prototype, "sections", 2);
q([
  l({ type: Array })
], M.prototype, "profileActions", 2);
q([
  l({ type: String, attribute: "logo-src" })
], M.prototype, "logoSrc", 2);
q([
  l({ type: String, attribute: "logo-collapsed-src" })
], M.prototype, "logoCollapsedSrc", 2);
q([
  l({ type: String, attribute: "logo-alt" })
], M.prototype, "logoAlt", 2);
q([
  v()
], M.prototype, "_openDropdowns", 2);
q([
  v()
], M.prototype, "_tooltip", 2);
q([
  v()
], M.prototype, "_popover", 2);
q([
  v()
], M.prototype, "_profilePopover", 2);
M = q([
  g("ca-sidenav")
], M);
var Fa = Object.defineProperty, Na = Object.getOwnPropertyDescriptor, K = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Na(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Fa(t, r, o), o;
};
let A = class extends f {
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
        <span class=${p({ chevron: !0, open: this._isOpen })}>
          ${this._renderChevron()}
        </span>
      </button>
      ${this._isOpen ? n`
            <div class="dropdown" role="listbox" @keydown=${this._handleDropdownKeydown}>
              ${this.options.map(
      (e, t) => n`
                  <button
                    class=${p({ option: !0, selected: e.value === this.value })}
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
A.styles = b`
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
    :host([variant="primary"]) .main-button, :host([variant="primary"]) .dropdown-trigger, .main-button, .dropdown-trigger { background-color: var(--ca-color-primary); color: var(--ca-color-on-primary); border: none; }
    :host([variant="primary"]) .divider, .divider { background-color: rgba(255,255,255,0.25); }
    :host([variant="primary"]) .main-button:hover:not(:disabled), :host([variant="primary"]) .dropdown-trigger:hover:not(:disabled) { background-color: var(--ca-color-primary-hover); }
    :host([variant="primary"]) .main-button:active:not(:disabled), :host([variant="primary"]) .dropdown-trigger:active:not(:disabled) { background-color: var(--ca-color-primary-pressed); }
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
K([
  l({ type: String, reflect: !0 })
], A.prototype, "variant", 2);
K([
  l({ type: String, reflect: !0 })
], A.prototype, "size", 2);
K([
  l({ type: Array })
], A.prototype, "options", 2);
K([
  l({ type: String })
], A.prototype, "value", 2);
K([
  l({ type: String })
], A.prototype, "label", 2);
K([
  l({ type: Boolean, reflect: !0 })
], A.prototype, "loading", 2);
K([
  l({ type: Boolean, reflect: !0 })
], A.prototype, "disabled", 2);
K([
  v()
], A.prototype, "_isOpen", 2);
K([
  v()
], A.prototype, "_focusedIndex", 2);
K([
  F(".dropdown")
], A.prototype, "_dropdown", 2);
K([
  F(".dropdown-trigger")
], A.prototype, "_triggerEl", 2);
A = K([
  g("ca-split-button")
], A);
var Va = Object.defineProperty, Ha = Object.getOwnPropertyDescriptor, U = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ha(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Va(t, r, o), o;
};
let T = class extends f {
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
      <div class=${p({ field: !0, disabled: this.disabled, "has-label": !!this.label })}>
        ${this.label ? n`<label class="label">${this.label}</label>` : null}
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
                    <span class=${p({ counter: !0, "counter-over": e })}>
                      ${this._charCount} / ${this.maxlength}
                    </span>
                  ` : null}
            </div>
          ` : null}
    `;
  }
};
T.styles = b`
    :host {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-family: var(--ca-font-family);
    }
    .label {
      font-family: var(--ca-font-family);
      font-weight: 400;
      font-size: 12px;
      color: var(--ca-text-muted);
      line-height: 1;
      padding: 10px 12px 0 12px;
    }
    .field {
      border: 1px solid var(--ca-border-input);
      border-radius: var(--ca-radius-sm);
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
    :host([size='xs']) .field { border-radius: var(--ca-radius-sm); }
    :host([size='xs']) .label { font-size: 9px; padding: 6px 8px 0 8px; }

    /* Size: sm */
    :host([size='sm']) textarea {
      padding: 8px 10px;
      font-size: var(--ca-font-size-xs);
    }
    :host([size='sm']) .field { border-radius: var(--ca-radius-sm); }
    :host([size='sm']) .label { font-size: 10px; padding: 8px 10px 0 10px; }

    /* Size: lg */
    :host([size='lg']) textarea {
      padding: 14px 14px;
      font-size: var(--ca-font-size-lg);
    }
    :host([size='lg']) .field { border-radius: var(--ca-radius-sm); }
    :host([size='lg']) .label { font-size: 13px; padding: 14px 14px 0 14px; }

    /* Size: xl */
    :host([size='xl']) textarea {
      padding: 18px 16px;
      font-size: 20px;
    }
    :host([size='xl']) .field { border-radius: var(--ca-radius-sm); }
    :host([size='xl']) .label { font-size: 14px; padding: 18px 16px 0 16px; }

    /* Reduce textarea top padding when label is present */
    .has-label textarea {
      padding-top: 4px;
    }
  `;
U([
  l({ type: String, reflect: !0 })
], T.prototype, "size", 2);
U([
  l({ type: String })
], T.prototype, "label", 2);
U([
  l({ type: String, reflect: !0 })
], T.prototype, "error", 2);
U([
  l({ type: Number })
], T.prototype, "maxlength", 2);
U([
  l({ type: Boolean })
], T.prototype, "autoresize", 2);
U([
  l({ type: Number })
], T.prototype, "rows", 2);
U([
  l({ type: Boolean })
], T.prototype, "disabled", 2);
U([
  l({ type: String })
], T.prototype, "value", 2);
U([
  l({ type: String })
], T.prototype, "placeholder", 2);
U([
  v()
], T.prototype, "_charCount", 2);
U([
  F("textarea")
], T.prototype, "_textareaEl", 2);
T = U([
  g("ca-textarea")
], T);
var qa = Object.defineProperty, Ka = Object.getOwnPropertyDescriptor, Ur = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ka(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && qa(t, r, o), o;
};
let Ua = 0, Vt = class extends f {
  constructor() {
    super(...arguments), this._toasts = [], this._timers = /* @__PURE__ */ new Map();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._timers.forEach((e) => clearTimeout(e)), this._timers.clear();
  }
  toast(e, t) {
    const r = Ua++, a = t?.type ?? "info", o = t?.duration ?? 5e3, i = { id: r, message: e, type: a, duration: o, exiting: !1 };
    this._toasts = [...this._toasts, i];
    const s = setTimeout(() => {
      this._dismiss(r);
    }, o);
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
          <div class=${p({ toast: !0, [e.type]: !0, exiting: e.exiting })}>
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
Vt.styles = b`
    :host { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 9500; display: flex; flex-direction: column; gap: 8px; align-items: center; pointer-events: none; }
    .toast { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: var(--ca-radius-md); font-family: var(--ca-font-family); font-size: 13px; box-shadow: var(--ca-shadow-md); pointer-events: auto; animation: toast-slide-in 0.25s ease; white-space: nowrap; }
    .toast.exiting { animation: toast-slide-out 0.2s ease forwards; }
    .info { background-color: var(--ca-text-primary); color: var(--ca-surface); }
    .success { background-color: var(--ca-color-success); color: var(--ca-color-white); }
    .error { background-color: var(--ca-color-danger); color: var(--ca-color-white); }
    .warning { background-color: var(--ca-color-warning); color: var(--ca-color-white); }
    .message { flex: 1; line-height: 1.4; }
    .close { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0; border: none; background: none; color: inherit; cursor: pointer; opacity: 0.7; transition: opacity 0.15s ease; }
    .close:hover { opacity: 1; }
    @keyframes toast-slide-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes toast-slide-out { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(16px); } }
  `;
Ur([
  v()
], Vt.prototype, "_toasts", 2);
Vt = Ur([
  g("ca-toast-container")
], Vt);
function Gi(e, t) {
  let r = document.querySelector("ca-toast-container");
  r || (r = document.createElement("ca-toast-container"), document.body.appendChild(r)), r.toast(e, t);
}
var Ya = Object.defineProperty, Qa = Object.getOwnPropertyDescriptor, st = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Qa(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Ya(t, r, o), o;
};
let be = class extends f {
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
    let a = 0, o = 0;
    switch (this.position) {
      case "top":
        a = t.top - r, o = t.left + t.width / 2;
        break;
      case "bottom":
        a = t.bottom + r, o = t.left + t.width / 2;
        break;
      case "left":
        a = t.top + t.height / 2, o = t.left - r;
        break;
      case "right":
        a = t.top + t.height / 2, o = t.right + r;
        break;
    }
    this._coords = { top: a, left: o };
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
              class=${p({ tooltip: !0, [this.position]: !0 })}
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
be.styles = b`
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
st([
  l({ type: String })
], be.prototype, "content", 2);
st([
  l({ type: String })
], be.prototype, "position", 2);
st([
  l({ type: Number })
], be.prototype, "delay", 2);
st([
  v()
], be.prototype, "_visible", 2);
st([
  v()
], be.prototype, "_coords", 2);
be = st([
  g("ca-tooltip")
], be);
var Ga = Object.defineProperty, ze = (e, t, r, a) => {
  for (var o = void 0, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = s(t, r, o) || o);
  return o && Ga(t, r, o), o;
};
const xr = class xr extends f {
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
      const a = t.value === this.value;
      return n`
            <button
              class=${p({ option: !0, selected: a, focused: r === this._focusedIndex })}
              role="option"
              aria-selected=${a}
              @click=${(o) => {
        o.stopPropagation(), this._selectOption(t);
      }}
            >
              ${this.renderOptionIcon(t)}
              <span class="option-label">${t.label}</span>
              ${a ? n`<svg class="check-icon" viewBox="0 0 24 24" fill="none">
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
xr.styles = b`
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
let j = xr;
ze([
  l({ type: Array })
], j.prototype, "options");
ze([
  l({ type: String })
], j.prototype, "value");
ze([
  l({ type: String, reflect: !0 })
], j.prototype, "size");
ze([
  l({ type: Boolean, reflect: !0 })
], j.prototype, "borderless");
ze([
  l({ type: Boolean, attribute: "allow-create" })
], j.prototype, "allowCreate");
ze([
  l({ type: String })
], j.prototype, "placeholder");
ze([
  v()
], j.prototype, "_isOpen");
ze([
  v()
], j.prototype, "_focusedIndex");
var Wa = Object.getOwnPropertyDescriptor, Xa = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Wa(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = s(o) || o);
  return o;
};
let Mr = class extends j {
};
Mr = Xa([
  g("ca-status-selector")
], Mr);
var Ja = Object.getOwnPropertyDescriptor, Za = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ja(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = s(o) || o);
  return o;
};
let ar = class extends j {
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
ar.styles = [
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
ar = Za([
  g("ca-priority-selector")
], ar);
var ei = Object.getOwnPropertyDescriptor, ti = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? ei(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = s(o) || o);
  return o;
};
let Ar = class extends j {
};
Ar = ti([
  g("ca-phase-selector")
], Ar);
var ri = Object.defineProperty, oi = Object.getOwnPropertyDescriptor, Ce = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? oi(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && ri(t, r, o), o;
};
let oe = class extends f {
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
    const r = [...this.value], a = r.indexOf(e.value);
    a >= 0 ? r.splice(a, 1) : r.push(e.value), this.dispatchEvent(
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
                    @click=${(a) => this._handleToggleMember(t, a)}
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
                    <span class=${p({ "checkbox-box": !0, checked: r })}>
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
oe.styles = b`
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
      background-color: var(--ca-color-primary);
      border-color: var(--ca-color-primary);
    }
    .checkbox-box svg {
      width: 10px;
      height: 10px;
      color: var(--ca-color-on-primary);
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
Ce([
  l({ type: Array, attribute: !1 })
], oe.prototype, "members", 2);
Ce([
  l({ type: Array, attribute: !1 })
], oe.prototype, "value", 2);
Ce([
  l({ type: String, reflect: !0 })
], oe.prototype, "size", 2);
Ce([
  l({ type: Boolean, reflect: !0 })
], oe.prototype, "borderless", 2);
Ce([
  l({ type: Boolean })
], oe.prototype, "searchable", 2);
Ce([
  v()
], oe.prototype, "_isOpen", 2);
Ce([
  v()
], oe.prototype, "_searchQuery", 2);
oe = Ce([
  g("ca-assignee-selector")
], oe);
var ai = Object.defineProperty, ii = Object.getOwnPropertyDescriptor, W = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? ii(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && ai(t, r, o), o;
};
const jt = [
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
let R = class extends f {
  constructor() {
    super(...arguments), this.labels = [], this.value = [], this.allowCreate = !1, this.size = "md", this.borderless = !1, this._isOpen = !1, this._searchQuery = "", this._showCreate = !1, this._newLabelName = "", this._newLabelColor = jt[0], this._boundClickOutside = this._handleClickOutside.bind(this);
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
    this._isOpen = !1, this._searchQuery = "", this._showCreate = !1, this._newLabelName = "", this._newLabelColor = jt[0];
  }
  _toggle() {
    this._isOpen ? this._close() : this._isOpen = !0;
  }
  _handleToggleLabel(e, t) {
    t.stopPropagation();
    const r = [...this.value], a = r.indexOf(e.value);
    a >= 0 ? r.splice(a, 1) : r.push(e.value), this.dispatchEvent(
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
    ), this._showCreate = !1, this._newLabelName = "", this._newLabelColor = jt[0]);
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
                    @click=${(a) => this._handleToggleLabel(t, a)}>
                    <span class="color-dot" style="background-color: ${t.color}"></span>
                    <span class="option-label">${t.label}</span>
                    <span class=${p({ "checkbox-box": !0, checked: r })}>
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
                        ${jt.map(
      (t) => n`
                            <button class=${p({ swatch: !0, selected: t === this._newLabelColor })}
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
R.styles = b`
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
      color: var(--ca-color-white);
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
      background-color: var(--ca-color-primary);
      border-color: var(--ca-color-primary);
    }
    .checkbox-box svg {
      width: 10px;
      height: 10px;
      color: var(--ca-color-on-primary);
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
      color: var(--ca-color-on-primary);
    }
    .create-btn-primary:hover { opacity: 0.9; }
    .create-btn-cancel {
      background: none;
      color: var(--ca-text-secondary);
    }
    .create-btn-cancel:hover { color: var(--ca-text-primary); }
  `;
W([
  l({ type: Array, attribute: !1 })
], R.prototype, "labels", 2);
W([
  l({ type: Array, attribute: !1 })
], R.prototype, "value", 2);
W([
  l({ type: Boolean, attribute: "allow-create" })
], R.prototype, "allowCreate", 2);
W([
  l({ type: String, reflect: !0 })
], R.prototype, "size", 2);
W([
  l({ type: Boolean, reflect: !0 })
], R.prototype, "borderless", 2);
W([
  v()
], R.prototype, "_isOpen", 2);
W([
  v()
], R.prototype, "_searchQuery", 2);
W([
  v()
], R.prototype, "_showCreate", 2);
W([
  v()
], R.prototype, "_newLabelName", 2);
W([
  v()
], R.prototype, "_newLabelColor", 2);
R = W([
  g("ca-label-selector")
], R);
var si = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, nt = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? ni(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && si(t, r, o), o;
};
const li = [
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
let xe = class extends f {
  constructor() {
    super(...arguments), this.value = "", this.presets = li, this.size = "md", this.allowCustom = !1, this._customHex = "";
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
                class=${p({
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
xe.styles = b`
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
nt([
  l({ type: String, reflect: !0 })
], xe.prototype, "value", 2);
nt([
  l({ type: Array })
], xe.prototype, "presets", 2);
nt([
  l({ type: String, reflect: !0 })
], xe.prototype, "size", 2);
nt([
  l({ type: Boolean, attribute: "allow-custom", reflect: !0 })
], xe.prototype, "allowCustom", 2);
nt([
  v()
], xe.prototype, "_customHex", 2);
xe = nt([
  g("ca-color-picker")
], xe);
var ci = Object.defineProperty, di = Object.getOwnPropertyDescriptor, Et = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? di(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && ci(t, r, o), o;
};
let Fe = class extends f {
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
Fe.styles = b`
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
Et([
  l({ type: Number })
], Fe.prototype, "value", 2);
Et([
  l({ type: String, reflect: !0 })
], Fe.prototype, "unit", 2);
Et([
  l({ type: Boolean, reflect: !0 })
], Fe.prototype, "borderless", 2);
Et([
  l({ type: String, reflect: !0 })
], Fe.prototype, "size", 2);
Fe = Et([
  g("ca-estimation-input")
], Fe);
var pi = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, L = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? hi(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && pi(t, r, o), o;
};
let E = class extends f {
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
  /* ── Collect all rows (including nested children, any depth) across all groups ── */
  get _allRows() {
    const e = [], t = (r) => {
      if (e.push(r), r.children) for (const a of r.children) t(a);
    };
    for (const r of this.groups)
      for (const a of r.rows) t(a);
    return e;
  }
  /* ── Get unique values for a column across all data ── */
  _uniqueValuesForColumn(e) {
    const t = /* @__PURE__ */ new Set();
    for (const r of this._allRows) {
      const a = r[e];
      a != null && a !== "" && t.add(String(a));
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
      const a = String(e[t] ?? "");
      if (!r.includes(a)) return !1;
    }
    return !0;
  }
  /* ── Apply sorting per-group ── */
  get _sortedGroups() {
    const e = this._filteredGroups;
    if (!this._sort) return e;
    const { key: t, direction: r } = this._sort, a = r === "asc" ? 1 : -1;
    return e.map((o) => ({
      ...o,
      rows: [...o.rows].sort((i, s) => {
        const d = String(i[t] ?? ""), h = String(s[t] ?? "");
        return d.localeCompare(h) * a;
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
        if (r.children?.some((a) => a.id === e)) return t.id;
    }
  }
  /* ── Event handlers ── */
  _onReorder(e) {
    const { rowId: t, fromGroupId: r, toGroupId: a, fromIndex: o, toIndex: i } = e.detail;
    this._dispatch("ca-task-move", { rowId: t, fromGroupId: r, toGroupId: a, fromIndex: o, toIndex: i });
  }
  _onCellEdit(e) {
    const { rowId: t, key: r, value: a, oldValue: o } = e.detail, i = this._findGroupForRow(t);
    this._dispatch("ca-task-edit", { rowId: t, groupId: i, key: r, value: a, oldValue: o });
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
    const { id: t, expanded: r, expandedIds: a } = e.detail;
    this._expandedIds = a, this._dispatch("ca-task-expand", { id: t, expanded: r });
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
    const r = this._activeFilters[e] || [], o = r.indexOf(t) >= 0 ? r.filter((i) => i !== t) : [...r, t];
    this._activeFilters = { ...this._activeFilters, [e]: o }, this._dispatch("ca-task-filter", { filters: this._activeFilters });
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
      const r = this._uniqueValuesForColumn(t.key), a = this._activeFilters[t.key] || [];
      return n`
              <div class="filter-column-section">
                <h4>${t.heading}</h4>
                <div class="filter-checkboxes">
                  ${r.map((o) => n`
                    <ca-checkbox
                      size="sm"
                      label=${o}
                      ?checked=${a.includes(o)}
                      @ca-change=${() => this._toggleFilterValue(t.key, o)}
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
      background: var(--ca-color-primary);
      color: var(--ca-color-on-primary);
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
L([
  l({ type: Array })
], E.prototype, "columns", 2);
L([
  l({ type: Array })
], E.prototype, "groups", 2);
L([
  l({ type: String })
], E.prototype, "heading", 2);
L([
  l({ type: String, attribute: "supporting-text" })
], E.prototype, "supportingText", 2);
L([
  l({ type: Boolean })
], E.prototype, "draggable", 2);
L([
  l({ type: Boolean })
], E.prototype, "expandable", 2);
L([
  l({ type: Boolean, attribute: "inline-add" })
], E.prototype, "inlineAdd", 2);
L([
  l({ type: Boolean, attribute: "clickable-rows" })
], E.prototype, "clickableRows", 2);
L([
  l({ type: Boolean })
], E.prototype, "selectable", 2);
L([
  v()
], E.prototype, "_expandedIds", 2);
L([
  v()
], E.prototype, "_filterModalOpen", 2);
L([
  v()
], E.prototype, "_activeFilters", 2);
L([
  v()
], E.prototype, "_sort", 2);
E = L([
  g("ca-task-table")
], E);
var ui = Object.defineProperty, vi = Object.getOwnPropertyDescriptor, ne = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? vi(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && ui(t, r, o), o;
};
let H = class extends f {
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
H.styles = b`
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
      box-shadow: var(--ca-shadow-sm);
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
      color: var(--ca-color-white);
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
ne([
  l({ type: String })
], H.prototype, "title", 2);
ne([
  l({ type: String, attribute: "task-key" })
], H.prototype, "taskKey", 2);
ne([
  l({ type: String, attribute: "priority-color" })
], H.prototype, "priorityColor", 2);
ne([
  l({ type: String, attribute: "due-date" })
], H.prototype, "dueDate", 2);
ne([
  l({ type: Boolean })
], H.prototype, "overdue", 2);
ne([
  l({ type: Array, attribute: !1 })
], H.prototype, "labels", 2);
ne([
  l({ type: Array, attribute: !1 })
], H.prototype, "assignees", 2);
ne([
  l({ type: Number, attribute: "comments-count" })
], H.prototype, "commentsCount", 2);
ne([
  l({ type: Number, attribute: "attachments-count" })
], H.prototype, "attachmentsCount", 2);
H = ne([
  g("ca-kanban-card")
], H);
var fi = Object.defineProperty, gi = Object.getOwnPropertyDescriptor, pe = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? gi(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && fi(t, r, o), o;
};
let G = class extends f {
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
          ${e.cards.map((r, a) => n`
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
              @pointerdown=${(o) => this._handleDragStart(o, r.id, e.id)}
              @pointerenter=${(o) => this._handleColumnDragOver(o, e.id, a)}
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
G.styles = b`
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
pe([
  l({ type: Array, attribute: !1 })
], G.prototype, "columns", 2);
pe([
  l({ type: Boolean, attribute: "allow-create" })
], G.prototype, "allowCreate", 2);
pe([
  v()
], G.prototype, "_dragCardId", 2);
pe([
  v()
], G.prototype, "_dragFromColumnId", 2);
pe([
  v()
], G.prototype, "_dragOverColumnId", 2);
pe([
  v()
], G.prototype, "_dragOverIndex", 2);
pe([
  v()
], G.prototype, "_addingColumnId", 2);
pe([
  v()
], G.prototype, "_addCardValue", 2);
G = pe([
  g("ca-kanban-board")
], G);
var bi = Object.defineProperty, xi = Object.getOwnPropertyDescriptor, Oe = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? xi(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && bi(t, r, o), o;
};
let ae = class extends f {
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
    const t = e.getRangeAt(0), r = t.startContainer.textContent || "", a = t.startOffset, o = r.substring(0, a), i = o.lastIndexOf("@");
    if (i >= 0 && (i === 0 || o[i - 1] === " ")) {
      const s = o.substring(i + 1);
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
                          class=${p({ "toolbar-btn": !0, active: this._activeFormats.has(e) })}
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
ae.styles = b`
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
Oe([
  l({ type: String })
], ae.prototype, "value", 2);
Oe([
  l({ type: String })
], ae.prototype, "placeholder", 2);
Oe([
  l({ type: Array, attribute: !1 })
], ae.prototype, "toolbar", 2);
Oe([
  l({ type: Boolean, reflect: !0 })
], ae.prototype, "readonly", 2);
Oe([
  l({ type: String, attribute: "min-height" })
], ae.prototype, "minHeight", 2);
Oe([
  v()
], ae.prototype, "_activeFormats", 2);
Oe([
  F(".editor")
], ae.prototype, "_editor", 2);
ae = Oe([
  g("ca-rich-text-editor")
], ae);
var mi = Object.defineProperty, yi = Object.getOwnPropertyDescriptor, qe = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? yi(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && mi(t, r, o), o;
};
let le = class extends f {
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
le.styles = b`
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
      color: var(--ca-color-on-primary);
      border-color: var(--ca-color-primary);
    }
    .edit-save-btn:hover {
      background-color: var(--ca-color-primary-hover);
    }
    .edit-save-btn:active {
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
      color: var(--ca-color-on-primary);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      cursor: pointer;
      transition: background-color var(--ca-transition-fast);
    }
    .submit-btn:hover {
      background-color: var(--ca-color-primary-hover);
    }
    .submit-btn:active {
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
qe([
  l({ type: Array })
], le.prototype, "comments", 2);
qe([
  l({ type: Object, attribute: "current-user" })
], le.prototype, "currentUser", 2);
qe([
  v()
], le.prototype, "_editingId", 2);
qe([
  v()
], le.prototype, "_editText", 2);
qe([
  v()
], le.prototype, "_newText", 2);
qe([
  F(".input-textarea")
], le.prototype, "_inputEl", 2);
le = qe([
  g("ca-comment-thread")
], le);
var wi = Object.defineProperty, _i = Object.getOwnPropertyDescriptor, gr = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? _i(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && wi(t, r, o), o;
};
let yt = class extends f {
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
yt.styles = b`
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
gr([
  l({ type: Array })
], yt.prototype, "entries", 2);
gr([
  l({ type: Boolean })
], yt.prototype, "loading", 2);
yt = gr([
  g("ca-activity-timeline")
], yt);
var $i = Object.defineProperty, ki = Object.getOwnPropertyDescriptor, Ke = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? ki(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && $i(t, r, o), o;
};
let ce = class extends f {
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
      const i = parseFloat(r[1]), s = r[2] ? parseInt(r[2], 10) : 0;
      return Math.round(i * 60) + s;
    }
    const a = t.match(/^(\d+)\s*m$/);
    if (a)
      return parseInt(a[1], 10);
    const o = parseFloat(t);
    return isNaN(o) ? 0 : Math.round(o * 60);
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
ce.styles = b`
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
      color: var(--ca-color-on-primary);
      font-family: var(--ca-font-family);
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      cursor: pointer;
      transition: background-color var(--ca-transition-fast);
    }
    .add-btn:hover {
      background-color: var(--ca-color-primary-hover);
    }
    .add-btn:active {
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
Ke([
  l({ type: Array })
], ce.prototype, "entries", 2);
Ke([
  l({ type: Boolean, attribute: "allow-add" })
], ce.prototype, "allowAdd", 2);
Ke([
  l({ type: Number, attribute: "total-logged" })
], ce.prototype, "totalLogged", 2);
Ke([
  v()
], ce.prototype, "_addDuration", 2);
Ke([
  v()
], ce.prototype, "_addDescription", 2);
Ke([
  v()
], ce.prototype, "_addBillable", 2);
ce = Ke([
  g("ca-time-log")
], ce);
var zi = Object.defineProperty, Ci = Object.getOwnPropertyDescriptor, Pt = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ci(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && zi(t, r, o), o;
};
function Bt(e) {
  return `${fr[e.getMonth()]} ${e.getDate()}`;
}
function Tr(e) {
  return `${fr[e.getMonth()]} ${e.getDate()}, ${e.getFullYear()}`;
}
function jr(e, t) {
  return Math.round(Math.abs(t.getTime() - e.getTime()) / 864e5);
}
let Ne = class extends f {
  constructor() {
    super(...arguments), this.periods = [], this.frequency = "quarterly", this.view = "timeline", this.heading = "ETA Ranges";
  }
  _setView(e) {
    this.view = e, this.dispatchEvent(new CustomEvent("ca-view-change", {
      detail: { view: e },
      bubbles: !0,
      composed: !0
    }));
  }
  _frequencyLabel() {
    switch (this.frequency) {
      case "monthly":
        return "Monthly";
      case "quarterly":
        return "Quarterly";
      case "semi-annual":
        return "Semi-Annual";
      case "annual":
        return "Annual";
      default:
        return this.frequency;
    }
  }
  _renderHeader() {
    return n`
      <div class="header">
        <div>
          <span class="heading">${this.heading}</span>
          <span class="frequency">${this._frequencyLabel()}</span>
        </div>
        <div class="toggle">
          <button
            class="toggle-btn"
            aria-pressed="${this.view === "timeline"}"
            @click=${() => this._setView("timeline")}
            title="Timeline view"
          >&#9707;</button>
          <button
            class="toggle-btn"
            aria-pressed="${this.view === "list"}"
            @click=${() => this._setView("list")}
            title="List view"
          >&equiv;</button>
        </div>
      </div>
    `;
  }
  _renderTimeline() {
    return this.periods.map((e) => {
      const t = Q(e.periodStart), r = Q(e.periodEnd), a = Q(e.earliestDate), o = Q(e.latestDate);
      if (!t || !r || !a || !o) return c;
      const i = r.getTime() - t.getTime(), s = i > 0 ? (a.getTime() - t.getTime()) / i * 100 : 0, d = i > 0 ? (r.getTime() - o.getTime()) / i * 100 : 0, h = jr(a, o);
      return n`
        <div class="period-block">
          <div class="period-header">
            <span class="period-label">${e.label}</span>
            <span class="period-bounds">${Bt(t)} – ${Bt(r)}</span>
          </div>
          <div class="bar-row">
            <span class="bar-spacer"></span>
            <div class="bar-track">
              <div class="bar-fill" style="left:${Math.max(0, s)}%;right:${Math.max(0, d)}%">
                <span class="bar-date">${Bt(a)}</span>
                <span class="bar-date">${Bt(o)}</span>
              </div>
            </div>
            <span class="duration">${h}d</span>
          </div>
        </div>
      `;
    });
  }
  _renderList() {
    return this.periods.map((e) => {
      const t = Q(e.earliestDate), r = Q(e.latestDate);
      if (!t || !r) return c;
      const a = jr(t, r);
      return n`
        <div class="list-row">
          <span class="list-badge">${e.label}</span>
          <div class="list-dates">
            <div class="list-date-group">
              <span class="list-micro-label">Earliest</span>
              <span class="list-date-value">${Tr(t)}</span>
            </div>
            <span class="list-arrow">\u2192</span>
            <div class="list-date-group">
              <span class="list-micro-label">Latest</span>
              <span class="list-date-value">${Tr(r)}</span>
            </div>
          </div>
          <span class="duration">${a}d</span>
        </div>
      `;
    });
  }
  render() {
    return n`
      ${this._renderHeader()}
      ${this.view === "timeline" ? this._renderTimeline() : this._renderList()}
    `;
  }
};
Ne.styles = b`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }

    /* ── Header ── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .heading {
      font-size: var(--ca-font-size-sm);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
    }
    .frequency {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      font-weight: 400;
      margin-left: 6px;
    }

    /* ── View Toggle ── */
    .toggle {
      display: flex;
      background: var(--ca-surface-active);
      border-radius: 6px;
      padding: 2px;
    }
    .toggle-btn {
      all: unset;
      padding: 4px 10px;
      border-radius: var(--ca-radius-sm);
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-muted);
      cursor: pointer;
      line-height: 1;
      transition: background var(--ca-transition-fast), color var(--ca-transition-fast);
    }
    .toggle-btn[aria-pressed="true"] {
      background: var(--ca-color-primary);
      color: var(--ca-color-on-primary);
    }

    /* ── Timeline View ── */
    .period-block {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .period-block + .period-block {
      margin-top: 4px;
      padding-top: 8px;
      border-top: 1px solid var(--ca-border);
    }
    .period-header {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }
    .period-label {
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-text-primary);
      width: 48px;
      flex-shrink: 0;
    }
    .period-bounds {
      font-size: 10px;
      color: var(--ca-text-muted);
    }
    .bar-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .bar-spacer {
      width: 48px;
      flex-shrink: 0;
    }
    .bar-track {
      flex: 1;
      height: 26px;
      background: var(--ca-surface-active);
      border-radius: 6px;
      position: relative;
      overflow: hidden;
    }
    .bar-fill {
      position: absolute;
      height: 100%;
      background: linear-gradient(90deg, var(--ca-color-primary), color-mix(in srgb, var(--ca-color-primary) 70%, white));
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      min-width: 90px;
      box-sizing: border-box;
    }
    .bar-date {
      font-size: 10px;
      color: var(--ca-color-on-primary);
      font-weight: 500;
      white-space: nowrap;
    }
    .duration {
      font-size: var(--ca-font-size-xs);
      color: var(--ca-text-secondary);
      width: 36px;
      flex-shrink: 0;
      text-align: right;
      font-weight: 500;
    }

    /* ── List View ── */
    .list-row {
      display: flex;
      align-items: center;
      padding: 9px 0;
    }
    .list-row + .list-row {
      border-top: 1px solid var(--ca-border);
    }
    .list-badge {
      font-size: var(--ca-font-size-xs);
      font-weight: var(--ca-font-weight-semibold);
      color: var(--ca-color-primary);
      background: color-mix(in srgb, var(--ca-color-primary) 10%, transparent);
      padding: 2px 8px;
      border-radius: var(--ca-radius-sm);
      width: fit-content;
      flex-shrink: 0;
      margin-right: 12px;
    }
    .list-dates {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .list-date-group {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .list-micro-label {
      font-size: 9px;
      color: var(--ca-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .list-date-value {
      font-size: var(--ca-font-size-sm);
      color: var(--ca-text-primary);
      font-weight: 500;
    }
    .list-arrow {
      flex: 0 0 24px;
      text-align: center;
      color: var(--ca-text-muted);
      font-size: 12px;
      opacity: 0.5;
    }
  `;
Pt([
  l({ type: Array })
], Ne.prototype, "periods", 2);
Pt([
  l({ type: String })
], Ne.prototype, "frequency", 2);
Pt([
  l({ type: String, reflect: !0 })
], Ne.prototype, "view", 2);
Pt([
  l({ type: String })
], Ne.prototype, "heading", 2);
Ne = Pt([
  g("ca-eta-range")
], Ne);
var Oi = Object.defineProperty, Si = Object.getOwnPropertyDescriptor, Se = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Si(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Oi(t, r, o), o;
};
let ie = class extends f {
  constructor() {
    super(...arguments), this.steps = [], this.currentStep = null, this.status = "pending", this.heading = "", this.subheading = "", this.expanded = !1, this.size = "md";
  }
  get _stepIndex() {
    return !this.currentStep || this.steps.length === 0 ? -1 : this.steps.findIndex((e) => e.key === this.currentStep);
  }
  get _progressPercent() {
    if (this.status === "complete") return 100;
    if (this.status === "pending") return 0;
    const e = this._stepIndex;
    return e < 0 || this.steps.length === 0 ? 0 : (e + 1) / this.steps.length * 100;
  }
  get _subheadingText() {
    if (this.subheading) return this.subheading;
    if (this.status === "processing") {
      const e = this._stepIndex;
      if (e >= 0)
        return `Step ${e + 1} of ${this.steps.length} — ${this.steps[e].label}`;
    }
    return "";
  }
  get _defaultPillText() {
    switch (this.status) {
      case "pending":
        return "Pending";
      case "complete":
        return "Ready";
      case "error":
        return "Error";
      default:
        return "";
    }
  }
  _onToggle() {
    this.dispatchEvent(
      new CustomEvent("ca-toggle", {
        detail: { expanded: !this.expanded },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    const e = {
      card: !0,
      expanded: this.expanded,
      [`status-${this.status}`]: !0
    }, t = this._subheadingText, r = this._defaultPillText;
    return n`
      <div class=${p(e)}>
        <!-- Progress bar -->
        <div class="progress-bar">
          <div
            class="progress-fill"
            style="width: ${this._progressPercent}%"
          ></div>
        </div>

        <!-- Header -->
        <div
          class="header"
          role="button"
          tabindex="0"
          aria-expanded=${this.expanded}
          @click=${this._onToggle}
          @keydown=${(a) => {
      (a.key === "Enter" || a.key === " ") && (a.preventDefault(), this._onToggle());
    }}
        >
          <span class="icon-slot">
            <slot name="icon"></slot>
          </span>

          <div class="content">
            <div class="heading">${this.heading}</div>
            ${t ? n`
                  <div class="subheading">
                    ${this.status === "processing" ? n`<span class="pulse-dot"></span>` : c}
                    ${t}
                  </div>
                ` : c}
          </div>

          <slot name="status">
            ${r ? n`<span class="pill pill-${this.status}">${r}</span>` : c}
          </slot>

          <span class="actions-slot">
            <slot name="actions"></slot>
          </span>

          <svg
            class=${p({ chevron: !0, open: this.expanded })}
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

        <!-- Accordion panel -->
        <div class=${p({ panel: !0, open: this.expanded })} role="region">
          <div class="panel-inner">
            <div class="panel-content">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
ie.styles = b`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }

    .card {
      border: 1px solid var(--ca-border);
      border-radius: var(--ca-radius-md);
      overflow: hidden;
      background: var(--ca-surface);
      transition: border-color var(--ca-transition-fast),
                  opacity var(--ca-transition-fast),
                  box-shadow var(--ca-transition-fast);
    }
    .card.expanded {
      box-shadow: var(--ca-shadow-sm);
    }
    .card.status-pending {
      opacity: 0.55;
    }
    .card.status-complete {
      border-color: color-mix(in srgb, var(--ca-color-success) 30%, var(--ca-border));
    }
    .card.status-error {
      border-color: color-mix(in srgb, var(--ca-color-danger) 40%, var(--ca-border));
    }

    /* ── Progress bar ── */
    .progress-bar {
      height: 2.5px;
      background: var(--ca-border);
      position: relative;
    }
    .progress-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: 0 2px 2px 0;
      transition: width 0.4s ease, background-color 0.3s ease;
    }
    .status-processing .progress-fill {
      background: var(--ca-color-primary);
    }
    .status-complete .progress-fill {
      background: var(--ca-color-success);
    }
    .status-error .progress-fill {
      background: var(--ca-color-danger);
    }
    .status-processing .progress-fill {
      animation: progress-pulse 1.5s ease-in-out infinite;
    }

    @keyframes progress-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    /* ── Header ── */
    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      cursor: pointer;
      user-select: none;
    }
    .header:focus-visible {
      outline: 2px solid var(--ca-color-focus-ring);
      outline-offset: -2px;
      border-radius: var(--ca-radius-sm);
    }
    :host([size='sm']) .header {
      padding: 8px 12px;
      gap: 8px;
    }

    .icon-slot {
      flex-shrink: 0;
    }

    .content {
      flex: 1;
      min-width: 0;
    }
    .heading {
      font-size: var(--ca-font-size-md);
      color: var(--ca-text-primary);
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status-processing .heading,
    .status-complete .heading {
      font-weight: var(--ca-font-weight-semibold);
    }
    :host([size='sm']) .heading {
      font-size: var(--ca-font-size-sm);
    }

    .subheading {
      font-size: var(--ca-font-size-xs);
      margin-top: 2px;
      line-height: 1.3;
    }
    .status-processing .subheading {
      color: var(--ca-color-primary);
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .status-complete .subheading {
      color: var(--ca-color-success);
    }
    .status-error .subheading {
      color: var(--ca-color-danger);
    }
    .status-pending .subheading {
      color: var(--ca-text-muted);
    }

    .pulse-dot {
      display: inline-block;
      width: 5px;
      height: 5px;
      background: var(--ca-color-primary);
      border-radius: 50%;
      animation: dot-pulse 1s ease-in-out infinite;
    }
    @keyframes dot-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    /* ── Status pill ── */
    .pill {
      flex-shrink: 0;
      font-size: 10px;
      font-weight: var(--ca-font-weight-semibold);
      padding: 2px 8px;
      border-radius: var(--ca-radius-full);
      white-space: nowrap;
    }
    .pill-pending {
      color: var(--ca-text-muted);
      background: var(--ca-surface-hover);
    }
    .pill-complete {
      color: var(--ca-color-white);
      background: var(--ca-color-success);
    }
    .pill-error {
      color: var(--ca-color-white);
      background: var(--ca-color-danger);
    }

    .actions-slot {
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }

    /* ── Chevron ── */
    .chevron {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      color: var(--ca-text-muted);
      transition: transform 0.2s ease, color var(--ca-transition-fast);
    }
    .chevron.open {
      transform: rotate(180deg);
      color: var(--ca-text-primary);
    }

    /* ── Accordion panel ── */
    .panel {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease, opacity 0.25s ease;
      opacity: 0;
    }
    .panel.open {
      grid-template-rows: 1fr;
      opacity: 1;
    }
    .panel-inner {
      overflow: hidden;
    }
    .panel-content {
      padding: 16px;
      border-top: 1px solid var(--ca-divider);
      background: var(--ca-surface-hover);
    }
    :host([size='sm']) .panel-content {
      padding: 12px;
    }

    /* ── Dark mode ── */
    :host([data-theme='dark']) .card.expanded,
    :host-context([data-theme='dark']) .card.expanded {
      box-shadow: var(--ca-shadow-sm);
    }
  `;
Se([
  l({ type: Array })
], ie.prototype, "steps", 2);
Se([
  l({ type: String, attribute: "current-step" })
], ie.prototype, "currentStep", 2);
Se([
  l({ type: String, reflect: !0 })
], ie.prototype, "status", 2);
Se([
  l({ type: String })
], ie.prototype, "heading", 2);
Se([
  l({ type: String })
], ie.prototype, "subheading", 2);
Se([
  l({ type: Boolean, reflect: !0 })
], ie.prototype, "expanded", 2);
Se([
  l({ type: String, reflect: !0 })
], ie.prototype, "size", 2);
ie = Se([
  g("ca-process-card")
], ie);
var Di = Object.defineProperty, Ei = Object.getOwnPropertyDescriptor, br = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ei(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Di(t, r, o), o;
};
let wt = class extends f {
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
            ${r ? n`<span class="current">${e.label}</span>` : e.href ? n`<a class="link" href=${e.href} @click=${(a) => {
        a.preventDefault(), this._handleClick(e);
      }}>${e.label}</a>` : n`<button class="link" @click=${() => this._handleClick(e)}>${e.label}</button>`}
          </span>
        `;
    })}
    `;
  }
};
wt.styles = b`
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
br([
  l({ type: Array })
], wt.prototype, "items", 2);
br([
  l({ type: String })
], wt.prototype, "separator", 2);
wt = br([
  g("ca-breadcrumb")
], wt);
var Pi = Object.defineProperty, Ii = Object.getOwnPropertyDescriptor, lt = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ii(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Pi(t, r, o), o;
};
const Mi = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>';
let me = class extends f {
  constructor() {
    super(...arguments), this.items = [], this.activeId = "", this.scrollOffset = 0, this.scrollBehavior = "smooth", this._expandedId = "", this._observer = null, this._visibleIds = /* @__PURE__ */ new Set();
  }
  connectedCallback() {
    super.connectedCallback(), this._setupObserver();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._teardownObserver();
  }
  updated(e) {
    e.has("items") && (this._teardownObserver(), this._setupObserver());
  }
  _getAllIds() {
    const e = [];
    for (const t of this.items)
      if (e.push(t.id), t.children)
        for (const r of t.children)
          e.push(r.id);
    return e;
  }
  _setupObserver() {
    if (this.items.length) {
      this._observer = new IntersectionObserver(
        (e) => {
          for (const t of e)
            t.isIntersecting ? this._visibleIds.add(t.target.id) : this._visibleIds.delete(t.target.id);
          this._updateActiveFromVisible();
        },
        {
          rootMargin: `-${this.scrollOffset}px 0px 0px 0px`,
          threshold: 0
        }
      );
      for (const e of this._getAllIds()) {
        const t = document.getElementById(e);
        t && this._observer.observe(t);
      }
    }
  }
  _teardownObserver() {
    this._observer && (this._observer.disconnect(), this._observer = null), this._visibleIds.clear();
  }
  _updateActiveFromVisible() {
    if (this._visibleIds.size === 0) return;
    const e = this._getAllIds();
    let t = "", r = 1 / 0;
    for (const a of e) {
      if (!this._visibleIds.has(a)) continue;
      const o = document.getElementById(a);
      if (!o) continue;
      const i = o.getBoundingClientRect().top;
      i < r && (r = i, t = a);
    }
    if (t && t !== this.activeId) {
      this.activeId = t;
      for (const a of this.items)
        if (a.children?.some((o) => o.id === t)) {
          this._expandedId = a.id;
          break;
        }
    }
  }
  _handleItemClick(e) {
    if (e.children && e.children.length > 0) {
      if (this._expandedId === e.id) {
        this._expandedId = "";
        return;
      }
      this._expandedId = e.id;
    }
    this._scrollTo(e.id), this.dispatchEvent(
      new CustomEvent("ca-navigate", {
        detail: { id: e.id },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleChildClick(e) {
    this._scrollTo(e.id), this.dispatchEvent(
      new CustomEvent("ca-navigate", {
        detail: { id: e.id },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _scrollTo(e) {
    const t = document.getElementById(e);
    if (!t) return;
    const r = t.getBoundingClientRect().top + window.scrollY - this.scrollOffset;
    window.scrollTo({ top: r, behavior: this.scrollBehavior });
  }
  render() {
    return n`<nav>${this.items.map((e) => this._renderItem(e))}</nav>`;
  }
  _renderItem(e) {
    const t = e.children && e.children.length > 0, r = this._expandedId === e.id, a = this.activeId === e.id;
    return n`
      <div>
        <button
          class=${p({
      "nav-item": !0,
      active: a
    })}
          @click=${() => this._handleItemClick(e)}
          aria-expanded=${t ? r : c}
        >
          <span class="nav-label">${e.label}</span>
          ${t ? n`
                <span class=${p({ "nav-chevron": !0, "chevron-open": r })}>
                  ${N(Mi)}
                </span>
              ` : c}
        </button>
        ${t ? n`
              <div class=${p({ "children-panel": !0, open: r })}>
                <div class="children-inner">
                  <div class="children-list">
                    ${e.children.map(
      (o) => n`
                        <button
                          class=${p({
        "child-item": !0,
        active: this.activeId === o.id
      })}
                          @click=${() => this._handleChildClick(o)}
                        >
                          ${o.label}
                        </button>
                      `
    )}
                  </div>
                </div>
              </div>
            ` : c}
      </div>
    `;
  }
};
me.styles = b`
    :host {
      display: block;
      font-family: var(--ca-font-family);
    }
    nav {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* Parent items */
    .nav-item {
      display: flex;
      align-items: center;
      gap: 8px;
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
      color: var(--ca-text-secondary);
      transition: background-color 0.15s ease, color 0.15s ease;
      box-sizing: border-box;
    }
    .nav-item:hover {
      background-color: var(--ca-surface-hover);
    }
    .nav-item.active {
      color: var(--ca-text-primary);
      background-color: var(--ca-surface-hover);
    }
    .nav-item:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: -2px;
    }
    .nav-label {
      flex: 1;
      min-width: 0;
    }

    /* Chevron */
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

    /* Child items — collapse panel */
    .children-panel {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.15s ease;
    }
    .children-panel.open {
      grid-template-rows: 1fr;
    }
    .children-inner {
      overflow: hidden;
    }
    .children-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding-left: 24px;
    }

    /* Child link */
    .child-item {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      border-radius: var(--ca-radius-md);
      border: none;
      background: none;
      cursor: pointer;
      width: 100%;
      text-align: left;
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      color: var(--ca-text-secondary);
      transition: background-color 0.15s ease, color 0.15s ease;
      box-sizing: border-box;
    }
    .child-item:hover {
      background-color: var(--ca-surface-hover);
    }
    .child-item.active {
      color: var(--ca-text-primary);
      background-color: var(--ca-surface-hover);
    }
    .child-item:focus-visible {
      outline: 2px solid var(--ca-text-primary);
      outline-offset: -2px;
    }
  `;
lt([
  l({ type: Array })
], me.prototype, "items", 2);
lt([
  l({ type: String, reflect: !0, attribute: "active-id" })
], me.prototype, "activeId", 2);
lt([
  l({ type: Number, attribute: "scroll-offset" })
], me.prototype, "scrollOffset", 2);
lt([
  l({ type: String, attribute: "scroll-behavior" })
], me.prototype, "scrollBehavior", 2);
lt([
  v()
], me.prototype, "_expandedId", 2);
me = lt([
  g("ca-page-nav")
], me);
var Ai = Object.defineProperty, Ti = Object.getOwnPropertyDescriptor, Gt = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ti(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Ai(t, r, o), o;
};
let et = class extends f {
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
et.styles = b`
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
      color: var(--ca-color-on-primary);
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
Gt([
  l({ type: String })
], et.prototype, "heading", 2);
Gt([
  l({ type: String })
], et.prototype, "description", 2);
Gt([
  l({ type: String, attribute: "action-label" })
], et.prototype, "actionLabel", 2);
et = Gt([
  g("ca-empty-state")
], et);
var ji = Object.defineProperty, Bi = Object.getOwnPropertyDescriptor, It = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Bi(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && ji(t, r, o), o;
};
let Ve = class extends f {
  constructor() {
    super(...arguments), this.variant = "text", this.width = "", this.height = "", this.animation = "pulse";
  }
  updated(e) {
    super.updated?.(e), e.has("width") && (this.width ? this.style.width = this.width : this.style.removeProperty("width")), e.has("height") && (this.height ? this.style.height = this.height : this.style.removeProperty("height"));
  }
};
Ve.styles = b`
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
It([
  l({ type: String, reflect: !0 })
], Ve.prototype, "variant", 2);
It([
  l({ type: String })
], Ve.prototype, "width", 2);
It([
  l({ type: String })
], Ve.prototype, "height", 2);
It([
  l({ type: String, reflect: !0 })
], Ve.prototype, "animation", 2);
Ve = It([
  g("ca-skeleton")
], Ve);
var Li = Object.defineProperty, Ri = Object.getOwnPropertyDescriptor, Mt = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ri(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Li(t, r, o), o;
};
let He = class extends f {
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
              ${e.icon ? n`<span class="icon">${N(e.icon)}</span>` : c}
              ${e.label}
            </button>
          `
    )}
      </div>
    ` : c;
  }
};
He.styles = b`
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
Mt([
  l({ type: Array })
], He.prototype, "items", 2);
Mt([
  l({ type: Boolean, reflect: !0 })
], He.prototype, "open", 2);
Mt([
  l({ type: Number })
], He.prototype, "x", 2);
Mt([
  l({ type: Number })
], He.prototype, "y", 2);
He = Mt([
  g("ca-context-menu")
], He);
var Fi = Object.defineProperty, Ni = Object.getOwnPropertyDescriptor, Wt = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ni(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Fi(t, r, o), o;
};
let tt = class extends f {
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
tt.styles = b`
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
Wt([
  l({ type: Number })
], tt.prototype, "count", 2);
Wt([
  l({ type: Boolean, reflect: !0 })
], tt.prototype, "open", 2);
Wt([
  l({ type: Array })
], tt.prototype, "actions", 2);
tt = Wt([
  g("ca-bulk-action-bar")
], tt);
var Vi = Object.defineProperty, Hi = Object.getOwnPropertyDescriptor, Ue = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Hi(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && Vi(t, r, o), o;
};
let de = class extends f {
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
    for (const a of e) {
      const o = a.group ?? "";
      t.has(o) || t.set(o, []), t.get(o).push(a);
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
            ${e.length === 0 ? n`<div class="empty">No commands found</div>` : Array.from(t.entries()).map(([a, o]) => n`
                  ${a ? n`<div class="group-header">${a}</div>` : c}
                  ${o.map((i) => {
      const s = r++;
      return n`
                      <button
                        class=${p({ command: !0, focused: s === this._focusedIndex })}
                        role="option"
                        @click=${() => this._selectCommand(i)}
                      >
                        ${i.icon ? n`<span class="command-icon">${N(i.icon)}</span>` : c}
                        <span class="command-label">${i.label}</span>
                        ${i.shortcut ? n`<span class="command-shortcut">${i.shortcut}</span>` : c}
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
de.styles = b`
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
Ue([
  l({ type: Boolean, reflect: !0 })
], de.prototype, "open", 2);
Ue([
  l({ type: Array })
], de.prototype, "commands", 2);
Ue([
  l({ type: String })
], de.prototype, "placeholder", 2);
Ue([
  v()
], de.prototype, "_query", 2);
Ue([
  v()
], de.prototype, "_focusedIndex", 2);
Ue([
  F(".search-input")
], de.prototype, "_searchInput", 2);
de = Ue([
  g("ca-command-bar")
], de);
var qi = Object.defineProperty, Ki = Object.getOwnPropertyDescriptor, Xt = (e, t, r, a) => {
  for (var o = a > 1 ? void 0 : a ? Ki(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (a ? s(t, r, o) : s(o)) || o);
  return a && o && qi(t, r, o), o;
};
let rt = class extends f {
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
                    class=${p({ "notification-item": !0, unread: !e.read })}
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
rt.styles = b`
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
      color: var(--ca-color-white);
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
Xt([
  l({ type: Array })
], rt.prototype, "notifications", 2);
Xt([
  l({ type: Number, attribute: "unread-count" })
], rt.prototype, "unreadCount", 2);
Xt([
  l({ type: Boolean, reflect: !0 })
], rt.prototype, "open", 2);
rt = Xt([
  g("ca-notification-center")
], rt);
export {
  Ye as MONTH_NAMES,
  fr as MONTH_NAMES_SHORT,
  ga as WEEKDAY_LABELS,
  xa as buildCalendarGrid,
  pt as formatDate,
  Tt as isDateDisabled,
  Ir as isInRange,
  X as isSameDay,
  Q as parseISODateString,
  er as toISODateString,
  Gi as toast
};
