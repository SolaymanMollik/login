!(function () {
  'use strict';
  function e(e) {
    return null != e && '' !== String(e).trim();
  }
  function t(t) {
    return !!e(t) && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(t).trim());
  }
  function n(t) {
    return !!e(t) && /^\+?[\d\s\-]{7,15}$/.test(String(t).trim());
  }
  function r(t, n, r) {
    if (!e(t)) return !1;
    let o = Number(t);
    return !Number.isNaN(o) && o >= n && o <= r;
  }
  function o(t, n) {
    return !!e(t) && String(t).length <= n;
  }
  function s(e, t, n = {}) {
    var r;
    let o = n.delayMs ?? 700,
      s = n.failRate ?? 0.05;
    return 'string' != typeof e
      ? Promise.reject(Error('Invalid endpoint'))
      : ((r = o), new Promise((e) => setTimeout(e, r))).then(() => {
          if (Math.random() < s)
            return Promise.reject({
              ok: !1,
              status: 500,
              message: 'Simulated server error',
            });
          let n = {
            ok: !0,
            status: 200,
            endpoint: e,
            received: t,
            message: 'This is a mocked response. No network request was made.',
            timestamp: Date.now(),
          };
          return Promise.resolve(n);
        });
  }
  async function a(a, i = {}) {
    let u = i.onProgress ?? function () {},
      l = i.onSuccess ?? function () {},
      c = i.onError ?? function () {},
      d = i.apiEndpoint ?? '/mock/submit';
    if (!a || !(a instanceof HTMLFormElement))
      throw Error('handleSubmitForm needs a HTMLFormElement as first argument');
    let m = new FormData(a),
      f = Object.fromEntries(m.entries()),
      $ = {};
    if (
      (e(f.name) || ($.name = 'Name is required'),
      t(f.email) || ($.email = 'Invalid email'),
      n(f.phone) || ($.phone = 'Invalid phone'),
      r(f.age, 10, 120) || ($.age = 'Age must be 10-120'),
      o(f.note ?? '', 500) || ($.note = 'Note is too long (max 500 chars)'),
      Object.keys($).length > 0)
    )
      return { ok: !1, validation: !1, errors: $ };
    u({ stage: 'sending' });
    try {
      let g = await s(d, f, {
        delayMs: i.delayMs ?? 900,
        failRate: i.failRate ?? 0.03,
      });
      return (
        u({ stage: 'done', response: g }),
        l(g),
        { ok: !0, validation: !0, response: g }
      );
    } catch (y) {
      return (
        u({ stage: 'error', error: y }),
        c(y),
        { ok: !1, validation: !0, error: y }
      );
    }
  }
  function i(e, t = {}) {
    let n = 'string' == typeof e ? document.querySelector(e) : e;
    if (!n) throw Error('Form element not found: ' + String(e));
    if (!(n instanceof HTMLFormElement))
      throw Error('Provided element is not a form');
    n.addEventListener('submit', function (e) {
      e.preventDefault();
      let r = n.querySelector('[type="submit"]');
      r && (r.disabled = !0),
        a(n, {
          apiEndpoint: t.apiEndpoint,
          delayMs: t.delayMs,
          failRate: t.failRate,
          onProgress(e) {
            t.onProgress ? t.onProgress(e) : console.log('[mock-progress]', e);
          },
          onSuccess(e) {
            t.onSuccess ? t.onSuccess(e) : console.log('[mock-success]', e);
          },
          onError(e) {
            t.onError ? t.onError(e) : console.warn('[mock-error]', e);
          },
        }).finally(() => {
          r && (r.disabled = !1);
        });
    });
  }
  'undefined' != typeof window &&
    (window.DummyAPI = {
      isRequired: e,
      isEmail: t,
      isPhone: n,
      isNumberInRange: r,
      maxLength: o,
      mockApiPost: s,
      handleSubmitForm: a,
      addFormListener: i,
    }),
    'undefined' != typeof document &&
      document.addEventListener('DOMContentLoaded', function () {
        try {
          document.querySelectorAll('form[data-dummy="true"]').forEach((e) => {
            i(e, {
              onProgress(t) {
                let n = e.querySelector('.status');
                n && (n.textContent = 'Status: ' + (t.stage || ''));
              },
              onSuccess(t) {
                let n = e.querySelector('.status');
                n && (n.textContent = 'Submitted (mock).');
              },
              onError(t) {
                let n = e.querySelector('.status');
                n && (n.textContent = 'Error (mock).');
              },
            });
          });
        } catch (e) {}
      });
})();