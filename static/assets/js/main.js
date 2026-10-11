/* =====================================================================
   LAINER PEINTURE — interactions (vanilla JS, no dependencies)
   1. Mobile menu   2. Language memory   3. Header state   4. Enquiry form
   Form texts come from the page itself (#form-i18n), so they are always
   in the page's language. Edit them in content/translations.mjs.
   ===================================================================== */
(function () {
  "use strict";
  var LANG_KEY = "lainer-lang";

  /* 1. Mobile menu ------------------------------------------------------ */
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    var label = toggle.querySelector("[data-menu-label]");
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      if (label) label.textContent = open ? toggle.dataset.labelClose : toggle.dataset.labelOpen;
    };
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      setOpen(open);
      if (open) {
        var first = nav.querySelector("a");
        if (first) first.focus();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (m) {
      if (m.matches) setOpen(false);
    });
  }

  /* 2. Language switch: remember the choice, keep the same section ------ */
  document.querySelectorAll(".lang-switch a[data-lang]").forEach(function (a) {
    a.addEventListener("click", function () {
      try { localStorage.setItem(LANG_KEY, a.dataset.lang); } catch (e) { /* private mode */ }
      if (location.search || location.hash) {
        a.href = a.href.split(/[?#]/)[0] + location.search + location.hash;
      }
    });
  });

  /* 3. Header border once the page is scrolled -------------------------- */
  var header = document.querySelector("[data-header]");
  if (header && "IntersectionObserver" in window) {
    var sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px";
    document.body.prepend(sentinel);
    new IntersectionObserver(function (entries) {
      header.classList.toggle("is-scrolled", !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* 4. Enquiry form ------------------------------------------------------ */
  var i18nEl = document.getElementById("form-i18n");
  var T = i18nEl ? JSON.parse(i18nEl.textContent) : null;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function phoneOk(v) {
    var digits = v.replace(/[\s.\-()]/g, "");
    return /^\+?\d{9,15}$/.test(digits);
  }

  function validators(form) {
    return [
      { name: "name", check: function (v) { return v.trim().length >= 2 ? "" : T.errors.nameMissing; } },
      { name: "phone", check: function (v) { return !v.trim() ? T.errors.phoneMissing : phoneOk(v) ? "" : T.errors.phoneInvalid; } },
      { name: "email", check: function (v) { return !v.trim() ? T.errors.emailMissing : EMAIL_RE.test(v.trim()) ? "" : T.errors.emailInvalid; } },
      { name: "message", check: function (v) { return v.trim().length >= 3 ? "" : T.errors.messageMissing; } },
    ].map(function (r) { r.el = form.elements[r.name]; return r; });
  }

  function showError(rule, msg) {
    var wrap = rule.el.closest(".field");
    var err = wrap.querySelector(".field-error");
    wrap.classList.toggle("has-error", !!msg);
    rule.el.setAttribute("aria-invalid", msg ? "true" : "false");
    err.textContent = msg;
    err.hidden = !msg;
  }

  function setStatus(box, type, msg) {
    box.className = "form-status" + (type ? " is-" + type : "");
    box.textContent = msg || "";
  }

  document.querySelectorAll("[data-form]").forEach(function (form) {
    if (!T) return;
    var rules = validators(form);
    var summary = form.querySelector("[data-summary]");
    var status = form.querySelector("[data-status]");
    var submit = form.querySelector("[data-submit]");
    var submitted = false;
    var busy = false;

    // Pre-select a service from ?service=... (links on the Services page)
    var wanted = new URLSearchParams(location.search).get("service");
    if (wanted) {
      var opt = form.querySelector('option[data-id="' + wanted.replace(/[^a-z-]/g, "") + '"]');
      if (opt) opt.selected = true;
    }

    // After the first attempt, re-check fields as the visitor corrects them
    rules.forEach(function (r) {
      r.el.addEventListener("input", function () { if (submitted) showError(r, r.check(r.el.value)); });
      r.el.addEventListener("blur", function () { if (submitted) showError(r, r.check(r.el.value)); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (busy) return;
      submitted = true;
      setStatus(status, "", "");

      var failed = [];
      rules.forEach(function (r) {
        var msg = r.check(r.el.value);
        showError(r, msg);
        if (msg) failed.push(r);
      });
      if (failed.length) {
        summary.textContent = failed.length === 1 ? T.errors.summaryOne : T.errors.summaryMany.replace("{n}", failed.length);
        summary.hidden = false;
        failed[0].el.focus();
        return;
      }
      summary.hidden = true;

      // Never fake a success: if the form service is not configured, say so.
      if (form.dataset.configured !== "true") {
        setStatus(status, "error", T.notConfigured);
        return;
      }

      busy = true;
      submit.setAttribute("aria-disabled", "true");
      submit.textContent = T.sending;
      form.setAttribute("aria-busy", "true");

      var data = Object.fromEntries(new FormData(form).entries());
      data.botcheck = form.elements.botcheck.checked; // honeypot: true = bot
      data.replyto = data.email;

      fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (json) {
            if (!res.ok || json.success !== true) throw new Error(json.message || "HTTP " + res.status);
          });
        })
        .then(function () {
          form.reset();
          submitted = false;
          rules.forEach(function (r) { showError(r, ""); });
          setStatus(status, "success", T.success);
          status.setAttribute("tabindex", "-1");
          status.focus();
        })
        .catch(function () {
          setStatus(status, "error", T.failure);
        })
        .then(function () {
          busy = false;
          submit.removeAttribute("aria-disabled");
          submit.textContent = T.submit;
          form.removeAttribute("aria-busy");
        });
    });
  });
})();
