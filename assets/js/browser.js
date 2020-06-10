export let Browser = {
  canPushState() { return (typeof (history.pushState) !== "undefined") },

  dropLocal(namespace, subkey) {
    return window.localStorage.removeItem(this.localKey(namespace, subkey))
  },

  updateLocal(namespace, subkey, initial, func) {
    let current = this.getLocal(namespace, subkey)
    let key = this.localKey(namespace, subkey)
    let newVal = current === null ? initial : func(current)
    window.localStorage.setItem(key, JSON.stringify(newVal))
    return newVal
  },

  getLocal(namespace, subkey) {
    return JSON.parse(window.localStorage.getItem(this.localKey(namespace, subkey)))
  },

  fetchPage(href, callback) {
    let req = new XMLHttpRequest()
    req.open("GET", href, true)
    req.timeout = PUSH_TIMEOUT
    req.setRequestHeader("content-type", "text/html")
    req.setRequestHeader("cache-control", "max-age=0, no-cache, no-store, must-revalidate, post-check=0, pre-check=0")
    req.setRequestHeader(LINK_HEADER, "live-link")
    req.onerror = () => callback(400)
    req.ontimeout = () => callback(504)
    req.onreadystatechange = () => {
      if (req.readyState !== 4) { return }
      let requestURL = new URL(href)
      let requestPath = requestURL.pathname + requestURL.search
      let responseURL = maybe(req.getResponseHeader(RESPONSE_URL_HEADER) || req.responseURL, url => new URL(url))
      let responsePath = responseURL ? responseURL.pathname + responseURL.search : null
      if (req.getResponseHeader(LINK_HEADER) !== "live-link") {
        return callback(400)
      } else if (responseURL === null || responsePath != requestPath) {
        return callback(302)
      } else if (req.status !== 200) {
        return callback(req.status)
      } else {
        callback(200, req.responseText)
      }
    }
    req.send()
  },

  pushState(kind, meta, to) {
    if (this.canPushState()) {
      if (to !== window.location.href) {
        history[kind + "State"](meta, "", to || null) // IE will coerce undefined to string
        let hashEl = this.getHashTargetEl(window.location.hash)

        if (hashEl) {
          hashEl.scrollIntoView()
        } else if (meta.type === "redirect") {
          window.scroll(0, 0)
        }
      }
    } else {
      this.redirect(to)
    }
  },

  setCookie(name, value) {
    document.cookie = `${name}=${value}`
  },

  getCookie(name) {
    return document.cookie.replace(new RegExp(`(?:(?:^|.*;\s*)${name}\s*\=\s*([^;]*).*$)|^.*$`), "$1")
  },

  redirect(toURL, flash) {
    if (flash) { Browser.setCookie("__phoenix_flash__", flash + "; max-age=60000; path=/") }
    window.location = toURL
  },

  localKey(namespace, subkey) { return `${namespace}-${subkey}` },

  getHashTargetEl(hash) {
    if (hash.toString() === "") { return }
    return document.getElementById(hash) || document.querySelector(`a[name="${hash.substring(1)}"]`)
  }
}