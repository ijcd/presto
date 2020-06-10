const PRESTO_COMPONENT = "data-presto-component"

export let DOM = {
  //     byId(id) { return document.getElementById(id) || logError(`no id found for ${id}`) },

  //     removeClass(el, className) {
  //         el.classList.remove(className)
  //         if (el.classList.length === 0) { el.removeAttribute("class") }
  //     },

  all(node, query, callback) {
    let array = Array.from(node.querySelectorAll(query))
    return callback ? array.forEach(callback) : array
  },

  /**
  *  Returns the first node with cid ID
  */
  findFirstComponentNode(node, cid) {
    return node.querySelector(`[${PRESTO_COMPONENT}="${cid}"]`)
  },

  //     findComponentNodeList(node, cid) { return this.all(node, `[${PRESTO_COMPONENT}="${cid}"]`) },

  //     findPhxChildrenInFragment(html, parentId) {
  //         let template = document.createElement("template")
  //         template.innerHTML = html
  //         return this.findPhxChildren(template.content, parentId)
  //     },

  //     isPhxUpdate(el, phxUpdate, updateTypes) {
  //         return el.getAttribute && updateTypes.indexOf(el.getAttribute(phxUpdate)) >= 0
  //     },

  //     findPhxChildren(el, parentId) {
  //         return this.all(el, `${PRESTO_VIEW_SELECTOR}[${PRESTO_PARENT_ID}="${parentId}"]`)
  //     },

  /**
  *  Returns all given cids unless they have parents
  */
  findParentCIDs(node, cids) {
    let initial = new Set(cids)
    return cids.reduce((acc, cid) => {
      let selector = `[${PRESTO_COMPONENT}="${cid}"] [${PRESTO_COMPONENT}]`
      this.all(node, selector)
        .map(el => parseInt(el.getAttribute(PRESTO_COMPONENT)))
        .forEach(childCID => acc.delete(childCID))

      return acc
    }, initial)
  },

  //     private(el, key) { return el[PRESTO_PRIVATE] && el[PRESTO_PRIVATE][key] },

  //     deletePrivate(el, key) { el[PRESTO_PRIVATE] && delete (el[PRESTO_PRIVATE][key]) },

  //     putPrivate(el, key, value) {
  //         if (!el[PRESTO_PRIVATE]) { el[PRESTO_PRIVATE] = {} }
  //         el[PRESTO_PRIVATE][key] = value
  //     },

  //     copyPrivates(target, source) {
  //         if (source[PRESTO_PRIVATE]) {
  //             target[PRESTO_PRIVATE] = clone(source[PRESTO_PRIVATE])
  //         }
  //     },

  // TODO: what are prefix/suffix for?
  putTitle(str) {
    let titleEl = document.querySelector("title")
    let { prefix, suffix } = titleEl.dataset
    document.title = `${prefix || ""}${str}${suffix || ""}`
  },

  //     debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, callback) {
  //         let debounce = el.getAttribute(phxDebounce)
  //         let throttle = el.getAttribute(phxThrottle)
  //         if (debounce === "") { debounce = defaultDebounce }
  //         if (throttle === "") { throttle = defaultThrottle }
  //         let value = debounce || throttle
  //         switch (value) {
  //             case null: return callback()

  //             case "blur":
  //                 if (this.once(el, "debounce-blur")) {
  //                     el.addEventListener("blur", () => callback())
  //                 }
  //                 return

  //             default:
  //                 let timeout = parseInt(value)
  //                 let trigger = () => throttle ? this.deletePrivate(el, THROTTLED) : callback()
  //                 let currentCycle = this.incCycle(el, DEBOUNCE_TRIGGER, trigger)
  //                 if (isNaN(timeout)) { return logError(`invalid throttle/debounce value: ${value}`) }
  //                 if (throttle) {
  //                     if (event.type === "keydown") {
  //                         let prevKey = this.private(el, DEBOUNCE_PREV_KEY)
  //                         this.putPrivate(el, DEBOUNCE_PREV_KEY, event.which)
  //                         if (prevKey !== event.which) { return callback() }
  //                     } else if (this.private(el, THROTTLED)) {
  //                         return false
  //                     } else {
  //                         callback()
  //                         this.putPrivate(el, THROTTLED, true)
  //                         setTimeout(() => this.triggerCycle(el, DEBOUNCE_TRIGGER), timeout)
  //                     }
  //                 } else {
  //                     setTimeout(() => this.triggerCycle(el, DEBOUNCE_TRIGGER, currentCycle), timeout)
  //                 }

  //                 if (el.form && this.once(el.form, "bind-debounce")) {
  //                     el.form.addEventListener("submit", (e) => {
  //                         Array.from((new FormData(el.form)).entries(), ([name, val]) => {
  //                             let input = el.form.querySelector(`[name="${name}"]`)
  //                             this.incCycle(input, DEBOUNCE_TRIGGER)
  //                             this.deletePrivate(input, THROTTLED)
  //                         })
  //                     })
  //                 }
  //                 if (this.once(el, "bind-debounce")) {
  //                     el.addEventListener("blur", (e) => this.triggerCycle(el, DEBOUNCE_TRIGGER))
  //                 }
  //         }
  //     },

  //     triggerCycle(el, key, currentCycle) {
  //         let [cycle, trigger] = this.private(el, key)
  //         if (!currentCycle) { currentCycle = cycle }
  //         if (currentCycle === cycle) {
  //             this.incCycle(el, key)
  //             trigger()
  //         }
  //     },

  //     once(el, key) {
  //         if (this.private(el, key) === true) { return false }
  //         this.putPrivate(el, key, true)
  //         return true
  //     },

  //     incCycle(el, key, trigger = function () { }) {
  //         let [currentCycle, oldTrigger] = this.private(el, key) || [0, trigger]
  //         currentCycle++
  //         this.putPrivate(el, key, [currentCycle, trigger])
  //         return currentCycle
  //     },

  //     discardError(container, el, phxFeedbackFor) {
  //         let field = el.getAttribute && el.getAttribute(phxFeedbackFor)
  //         let input = field && container.querySelector(`#${field}`)
  //         if (!input) { return }

  //         if (!(this.private(input, PRESTO_HAS_FOCUSED) || this.private(input.form, PRESTO_HAS_SUBMITTED))) {
  //             el.classList.add(PRESTO_NO_FEEDBACK_CLASS)
  //         }
  //     },

  //     isPhxChild(node) {
  //         return node.getAttribute && node.getAttribute(PRESTO_PARENT_ID)
  //     },

  //     dispatchEvent(target, eventString, detail = {}) {
  //         let event = new CustomEvent(eventString, { bubbles: true, cancelable: true, detail: detail })
  //         target.dispatchEvent(event)
  //     },

  //     cloneNode(node, html) {
  //         if (typeof (html) === "undefined") {
  //             return node.cloneNode(true)
  //         } else {
  //             let cloned = node.cloneNode(false)
  //             cloned.innerHTML = html
  //             return cloned
  //         }
  //     },

  //     mergeAttrs(target, source, exclude = []) {
  //         let sourceAttrs = source.attributes
  //         for (let i = sourceAttrs.length - 1; i >= 0; i--) {
  //             let name = sourceAttrs[i].name
  //             if (exclude.indexOf(name) < 0) { target.setAttribute(name, source.getAttribute(name)) }
  //         }

  //         let targetAttrs = target.attributes
  //         for (let i = targetAttrs.length - 1; i >= 0; i--) {
  //             let name = targetAttrs[i].name
  //             if (!source.hasAttribute(name)) { target.removeAttribute(name) }
  //         }
  //     },

  //     mergeFocusedInput(target, source) {
  //         // skip selects because FF will reset highlighted index for any setAttribute
  //         if (!(target instanceof HTMLSelectElement)) { DOM.mergeAttrs(target, source, ["value"]) }
  //         if (source.readOnly) {
  //             target.setAttribute("readonly", true)
  //         } else {
  //             target.removeAttribute("readonly")
  //         }
  //     },

  //     restoreFocus(focused, selectionStart, selectionEnd) {
  //         if (!DOM.isTextualInput(focused)) { return }
  //         let wasFocused = focused.matches(":focus")
  //         if (focused.readOnly) { focused.blur() }
  //         if (!wasFocused) { focused.focus() }
  //         if (focused.setSelectionRange && focused.type === "text" || focused.type === "textarea") {
  //             focused.setSelectionRange(selectionStart, selectionEnd)
  //         }
  //     },

  //     isFormInput(el) { return /^(?:input|select|textarea)$/i.test(el.tagName) },

  //     syncAttrsToProps(el) {
  //         if (el instanceof HTMLInputElement && CHECKABLE_INPUTS.indexOf(el.type.toLocaleLowerCase()) >= 0) {
  //             el.checked = el.getAttribute("checked") !== null
  //         }
  //     },

  //     isTextualInput(el) { return FOCUSABLE_INPUTS.indexOf(el.type) >= 0 },

  //     isNowTriggerFormExternal(el, phxTriggerExternal) {
  //         return el.getAttribute && el.getAttribute(phxTriggerExternal) !== null
  //     },

  //     undoRefs(ref, container) {
  //         DOM.all(container, `[${PRESTO_REF}]`, el => this.syncPendingRef(ref, el, el))
  //     },

  //     syncPendingRef(ref, fromEl, toEl) {
  //         let fromRefAttr = fromEl.getAttribute && fromEl.getAttribute(PRESTO_REF)
  //         if (fromRefAttr === null) { return true }

  //         let fromRef = parseInt(fromRefAttr)
  //         if (ref !== null && ref >= fromRef) {
  //             [fromEl, toEl].forEach(el => {
  //                 // remove refs
  //                 el.removeAttribute(PRESTO_REF)
  //                 // retore inputs
  //                 if (el.getAttribute(PRESTO_READONLY) !== null) {
  //                     el.readOnly = false
  //                     el.removeAttribute(PRESTO_READONLY)
  //                 }
  //                 if (el.getAttribute(PRESTO_DISABLED) !== null) {
  //                     el.disabled = false
  //                     el.removeAttribute(PRESTO_DISABLED)
  //                 }
  //                 // remove classes
  //                 PRESTO_EVENT_CLASSES.forEach(className => DOM.removeClass(el, className))
  //                 // restore disables
  //                 let disableRestore = el.getAttribute(PRESTO_DISABLE_WITH_RESTORE)
  //                 if (disableRestore !== null) {
  //                     el.innerText = disableRestore
  //                     el.removeAttribute(PRESTO_DISABLE_WITH_RESTORE)
  //                 }
  //             })
  //             return true
  //         } else {
  //             PRESTO_EVENT_CLASSES.forEach(className => {
  //                 fromEl.classList.contains(className) && toEl.classList.add(className)
  //             })
  //             toEl.setAttribute(PRESTO_REF, fromEl.getAttribute(PRESTO_REF))
  //             if (DOM.isFormInput(fromEl) || /submit/i.test(fromEl.type)) {
  //                 return false
  //             } else {
  //                 return true
  //             }
  //         }
  //     }
}