import { r as reactExports, g as getAugmentedNamespace, f as reactDomExports, h as getDefaultExportFromCjs } from "./index-nbqgCPN1.js";
var lib = { exports: {} };
var Modal$2 = {};
var propTypes = { exports: {} };
var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      return;
    }
    var err = new Error(
      "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
    );
    err.name = "Invariant Violation";
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  propTypes.exports = factoryWithThrowingShims();
}
var propTypesExports = propTypes.exports;
var ModalPortal = { exports: {} };
var focusManager = {};
var tabbable = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = findTabbableDescendants;
  /*!
   * Adapted from jQuery UI core
   *
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/category/ui-core/
   */
  var DISPLAY_NONE = "none";
  var DISPLAY_CONTENTS = "contents";
  var tabbableNode = /^(input|select|textarea|button|object|iframe)$/;
  function isNotOverflowing(element, style) {
    return style.getPropertyValue("overflow") !== "visible" || // if 'overflow: visible' set, check if there is actually any overflow
    element.scrollWidth <= 0 && element.scrollHeight <= 0;
  }
  function hidesContents(element) {
    var zeroSize = element.offsetWidth <= 0 && element.offsetHeight <= 0;
    if (zeroSize && !element.innerHTML) return true;
    try {
      var style = window.getComputedStyle(element);
      var displayValue = style.getPropertyValue("display");
      return zeroSize ? displayValue !== DISPLAY_CONTENTS && isNotOverflowing(element, style) : displayValue === DISPLAY_NONE;
    } catch (exception) {
      console.warn("Failed to inspect element style");
      return false;
    }
  }
  function visible(element) {
    var parentElement = element;
    var rootNode = element.getRootNode && element.getRootNode();
    while (parentElement) {
      if (parentElement === document.body) break;
      if (rootNode && parentElement === rootNode) parentElement = rootNode.host.parentNode;
      if (hidesContents(parentElement)) return false;
      parentElement = parentElement.parentNode;
    }
    return true;
  }
  function focusable(element, isTabIndexNotNaN) {
    var nodeName = element.nodeName.toLowerCase();
    var res = tabbableNode.test(nodeName) && !element.disabled || (nodeName === "a" ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
    return res && visible(element);
  }
  function tabbable2(element) {
    var tabIndex = element.getAttribute("tabindex");
    if (tabIndex === null) tabIndex = void 0;
    var isTabIndexNaN = isNaN(tabIndex);
    return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
  }
  function findTabbableDescendants(element) {
    var descendants = [].slice.call(element.querySelectorAll("*"), 0).reduce(function(finished, el) {
      return finished.concat(!el.shadowRoot ? [el] : findTabbableDescendants(el.shadowRoot));
    }, []);
    return descendants.filter(tabbable2);
  }
  module.exports = exports["default"];
})(tabbable, tabbable.exports);
var tabbableExports = tabbable.exports;
Object.defineProperty(focusManager, "__esModule", {
  value: true
});
focusManager.resetState = resetState$4;
focusManager.log = log$4;
focusManager.handleBlur = handleBlur;
focusManager.handleFocus = handleFocus;
focusManager.markForFocusLater = markForFocusLater;
focusManager.returnFocus = returnFocus;
focusManager.popWithoutFocus = popWithoutFocus;
focusManager.setupScopedFocus = setupScopedFocus;
focusManager.teardownScopedFocus = teardownScopedFocus;
var _tabbable = tabbableExports;
var _tabbable2 = _interopRequireDefault$4(_tabbable);
function _interopRequireDefault$4(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var focusLaterElements = [];
var modalElement = null;
var needToFocus = false;
function resetState$4() {
  focusLaterElements = [];
}
function log$4() {
}
function handleBlur() {
  needToFocus = true;
}
function handleFocus() {
  if (needToFocus) {
    needToFocus = false;
    if (!modalElement) {
      return;
    }
    setTimeout(function() {
      if (modalElement.contains(document.activeElement)) {
        return;
      }
      var el = (0, _tabbable2.default)(modalElement)[0] || modalElement;
      el.focus();
    }, 0);
  }
}
function markForFocusLater() {
  focusLaterElements.push(document.activeElement);
}
function returnFocus() {
  var preventScroll = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
  var toFocus = null;
  try {
    if (focusLaterElements.length !== 0) {
      toFocus = focusLaterElements.pop();
      toFocus.focus({ preventScroll });
    }
    return;
  } catch (e) {
    console.warn(["You tried to return focus to", toFocus, "but it is not in the DOM anymore"].join(" "));
  }
}
function popWithoutFocus() {
  focusLaterElements.length > 0 && focusLaterElements.pop();
}
function setupScopedFocus(element) {
  modalElement = element;
  if (window.addEventListener) {
    window.addEventListener("blur", handleBlur, false);
    document.addEventListener("focus", handleFocus, true);
  } else {
    window.attachEvent("onBlur", handleBlur);
    document.attachEvent("onFocus", handleFocus);
  }
}
function teardownScopedFocus() {
  modalElement = null;
  if (window.addEventListener) {
    window.removeEventListener("blur", handleBlur);
    document.removeEventListener("focus", handleFocus);
  } else {
    window.detachEvent("onBlur", handleBlur);
    document.detachEvent("onFocus", handleFocus);
  }
}
var scopeTab = { exports: {} };
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = scopeTab2;
  var _tabbable3 = tabbableExports;
  var _tabbable22 = _interopRequireDefault2(_tabbable3);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function getActiveElement() {
    var el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
    return el.activeElement.shadowRoot ? getActiveElement(el.activeElement.shadowRoot) : el.activeElement;
  }
  function scopeTab2(node, event) {
    var tabbable2 = (0, _tabbable22.default)(node);
    if (!tabbable2.length) {
      event.preventDefault();
      return;
    }
    var target = void 0;
    var shiftKey = event.shiftKey;
    var head = tabbable2[0];
    var tail = tabbable2[tabbable2.length - 1];
    var activeElement = getActiveElement();
    if (node === activeElement) {
      if (!shiftKey) return;
      target = tail;
    }
    if (tail === activeElement && !shiftKey) {
      target = head;
    }
    if (head === activeElement && shiftKey) {
      target = tail;
    }
    if (target) {
      event.preventDefault();
      target.focus();
      return;
    }
    var checkSafari = /(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent);
    var isSafariDesktop = checkSafari != null && checkSafari[1] != "Chrome" && /\biPod\b|\biPad\b/g.exec(navigator.userAgent) == null;
    if (!isSafariDesktop) return;
    var x = tabbable2.indexOf(activeElement);
    if (x > -1) {
      x += shiftKey ? -1 : 1;
    }
    target = tabbable2[x];
    if (typeof target === "undefined") {
      event.preventDefault();
      target = shiftKey ? tail : head;
      target.focus();
      return;
    }
    event.preventDefault();
    target.focus();
  }
  module.exports = exports["default"];
})(scopeTab, scopeTab.exports);
var scopeTabExports = scopeTab.exports;
var ariaAppHider$1 = {};
var warning = function() {
};
var warning_1 = warning;
var safeHTMLElement = {};
var exenv = { exports: {} };
/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
(function(module) {
  (function() {
    var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
    var ExecutionEnvironment = {
      canUseDOM,
      canUseWorkers: typeof Worker !== "undefined",
      canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
      canUseViewport: canUseDOM && !!window.screen
    };
    if (module.exports) {
      module.exports = ExecutionEnvironment;
    } else {
      window.ExecutionEnvironment = ExecutionEnvironment;
    }
  })();
})(exenv);
var exenvExports = exenv.exports;
Object.defineProperty(safeHTMLElement, "__esModule", {
  value: true
});
safeHTMLElement.canUseDOM = safeHTMLElement.SafeNodeList = safeHTMLElement.SafeHTMLCollection = void 0;
var _exenv = exenvExports;
var _exenv2 = _interopRequireDefault$3(_exenv);
function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var EE = _exenv2.default;
var SafeHTMLElement = EE.canUseDOM ? window.HTMLElement : {};
safeHTMLElement.SafeHTMLCollection = EE.canUseDOM ? window.HTMLCollection : {};
safeHTMLElement.SafeNodeList = EE.canUseDOM ? window.NodeList : {};
safeHTMLElement.canUseDOM = EE.canUseDOM;
safeHTMLElement.default = SafeHTMLElement;
Object.defineProperty(ariaAppHider$1, "__esModule", {
  value: true
});
ariaAppHider$1.resetState = resetState$3;
ariaAppHider$1.log = log$3;
ariaAppHider$1.assertNodeList = assertNodeList;
ariaAppHider$1.setElement = setElement;
ariaAppHider$1.validateElement = validateElement;
ariaAppHider$1.hide = hide;
ariaAppHider$1.show = show;
ariaAppHider$1.documentNotReadyOrSSRTesting = documentNotReadyOrSSRTesting;
var _warning = warning_1;
var _warning2 = _interopRequireDefault$2(_warning);
var _safeHTMLElement$1 = safeHTMLElement;
function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var globalElement = null;
function resetState$3() {
  if (globalElement) {
    if (globalElement.removeAttribute) {
      globalElement.removeAttribute("aria-hidden");
    } else if (globalElement.length != null) {
      globalElement.forEach(function(element) {
        return element.removeAttribute("aria-hidden");
      });
    } else {
      document.querySelectorAll(globalElement).forEach(function(element) {
        return element.removeAttribute("aria-hidden");
      });
    }
  }
  globalElement = null;
}
function log$3() {
}
function assertNodeList(nodeList, selector) {
  if (!nodeList || !nodeList.length) {
    throw new Error("react-modal: No elements were found for selector " + selector + ".");
  }
}
function setElement(element) {
  var useElement = element;
  if (typeof useElement === "string" && _safeHTMLElement$1.canUseDOM) {
    var el = document.querySelectorAll(useElement);
    assertNodeList(el, useElement);
    useElement = el;
  }
  globalElement = useElement || globalElement;
  return globalElement;
}
function validateElement(appElement) {
  var el = appElement || globalElement;
  if (el) {
    return Array.isArray(el) || el instanceof HTMLCollection || el instanceof NodeList ? el : [el];
  } else {
    (0, _warning2.default)(false, ["react-modal: App element is not defined.", "Please use `Modal.setAppElement(el)` or set `appElement={el}`.", "This is needed so screen readers don't see main content", "when modal is opened. It is not recommended, but you can opt-out", "by setting `ariaHideApp={false}`."].join(" "));
    return [];
  }
}
function hide(appElement) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = void 0;
  try {
    for (var _iterator = validateElement(appElement)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;
      el.setAttribute("aria-hidden", "true");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
function show(appElement) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = void 0;
  try {
    for (var _iterator2 = validateElement(appElement)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var el = _step2.value;
      el.removeAttribute("aria-hidden");
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}
function documentNotReadyOrSSRTesting() {
  globalElement = null;
}
var classList = {};
Object.defineProperty(classList, "__esModule", {
  value: true
});
classList.resetState = resetState$2;
classList.log = log$2;
var htmlClassList = {};
var docBodyClassList = {};
function removeClass(at, cls) {
  at.classList.remove(cls);
}
function resetState$2() {
  var htmlElement = document.getElementsByTagName("html")[0];
  for (var cls in htmlClassList) {
    removeClass(htmlElement, htmlClassList[cls]);
  }
  var body = document.body;
  for (var _cls in docBodyClassList) {
    removeClass(body, docBodyClassList[_cls]);
  }
  htmlClassList = {};
  docBodyClassList = {};
}
function log$2() {
}
var incrementReference = function incrementReference2(poll, className) {
  if (!poll[className]) {
    poll[className] = 0;
  }
  poll[className] += 1;
  return className;
};
var decrementReference = function decrementReference2(poll, className) {
  if (poll[className]) {
    poll[className] -= 1;
  }
  return className;
};
var trackClass = function trackClass2(classListRef, poll, classes) {
  classes.forEach(function(className) {
    incrementReference(poll, className);
    classListRef.add(className);
  });
};
var untrackClass = function untrackClass2(classListRef, poll, classes) {
  classes.forEach(function(className) {
    decrementReference(poll, className);
    poll[className] === 0 && classListRef.remove(className);
  });
};
classList.add = function add2(element, classString) {
  return trackClass(element.classList, element.nodeName.toLowerCase() == "html" ? htmlClassList : docBodyClassList, classString.split(" "));
};
classList.remove = function remove2(element, classString) {
  return untrackClass(element.classList, element.nodeName.toLowerCase() == "html" ? htmlClassList : docBodyClassList, classString.split(" "));
};
var portalOpenInstances$1 = {};
Object.defineProperty(portalOpenInstances$1, "__esModule", {
  value: true
});
portalOpenInstances$1.log = log$1;
portalOpenInstances$1.resetState = resetState$1;
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var PortalOpenInstances = function PortalOpenInstances2() {
  var _this = this;
  _classCallCheck$1(this, PortalOpenInstances2);
  this.register = function(openInstance) {
    if (_this.openInstances.indexOf(openInstance) !== -1) {
      return;
    }
    _this.openInstances.push(openInstance);
    _this.emit("register");
  };
  this.deregister = function(openInstance) {
    var index = _this.openInstances.indexOf(openInstance);
    if (index === -1) {
      return;
    }
    _this.openInstances.splice(index, 1);
    _this.emit("deregister");
  };
  this.subscribe = function(callback) {
    _this.subscribers.push(callback);
  };
  this.emit = function(eventType) {
    _this.subscribers.forEach(function(subscriber) {
      return subscriber(
        eventType,
        // shallow copy to avoid accidental mutation
        _this.openInstances.slice()
      );
    });
  };
  this.openInstances = [];
  this.subscribers = [];
};
var portalOpenInstances = new PortalOpenInstances();
function log$1() {
  console.log("portalOpenInstances ----------");
  console.log(portalOpenInstances.openInstances.length);
  portalOpenInstances.openInstances.forEach(function(p) {
    return console.log(p);
  });
  console.log("end portalOpenInstances ----------");
}
function resetState$1() {
  portalOpenInstances = new PortalOpenInstances();
}
portalOpenInstances$1.default = portalOpenInstances;
var bodyTrap$1 = {};
Object.defineProperty(bodyTrap$1, "__esModule", {
  value: true
});
bodyTrap$1.resetState = resetState;
bodyTrap$1.log = log;
var _portalOpenInstances = portalOpenInstances$1;
var _portalOpenInstances2 = _interopRequireDefault$1(_portalOpenInstances);
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var before = void 0, after = void 0, instances = [];
function resetState() {
  var _arr = [before, after];
  for (var _i = 0; _i < _arr.length; _i++) {
    var item = _arr[_i];
    if (!item) continue;
    item.parentNode && item.parentNode.removeChild(item);
  }
  before = after = null;
  instances = [];
}
function log() {
  console.log("bodyTrap ----------");
  console.log(instances.length);
  var _arr2 = [before, after];
  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var item = _arr2[_i2];
    var check = item || {};
    console.log(check.nodeName, check.className, check.id);
  }
  console.log("edn bodyTrap ----------");
}
function focusContent() {
  if (instances.length === 0) {
    return;
  }
  instances[instances.length - 1].focusContent();
}
function bodyTrap(eventType, openInstances) {
  if (!before && !after) {
    before = document.createElement("div");
    before.setAttribute("data-react-modal-body-trap", "");
    before.style.position = "absolute";
    before.style.opacity = "0";
    before.setAttribute("tabindex", "0");
    before.addEventListener("focus", focusContent);
    after = before.cloneNode();
    after.addEventListener("focus", focusContent);
  }
  instances = openInstances;
  if (instances.length > 0) {
    if (document.body.firstChild !== before) {
      document.body.insertBefore(before, document.body.firstChild);
    }
    if (document.body.lastChild !== after) {
      document.body.appendChild(after);
    }
  } else {
    if (before.parentElement) {
      before.parentElement.removeChild(before);
    }
    if (after.parentElement) {
      after.parentElement.removeChild(after);
    }
  }
}
_portalOpenInstances2.default.subscribe(bodyTrap);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _extends2 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  var _createClass2 = /* @__PURE__ */ function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _react3 = reactExports;
  var _propTypes3 = propTypesExports;
  var _propTypes22 = _interopRequireDefault2(_propTypes3);
  var _focusManager = focusManager;
  var focusManager$1 = _interopRequireWildcard2(_focusManager);
  var _scopeTab = scopeTabExports;
  var _scopeTab2 = _interopRequireDefault2(_scopeTab);
  var _ariaAppHider2 = ariaAppHider$1;
  var ariaAppHider2 = _interopRequireWildcard2(_ariaAppHider2);
  var _classList = classList;
  var classList$1 = _interopRequireWildcard2(_classList);
  var _safeHTMLElement3 = safeHTMLElement;
  var _safeHTMLElement22 = _interopRequireDefault2(_safeHTMLElement3);
  var _portalOpenInstances3 = portalOpenInstances$1;
  var _portalOpenInstances22 = _interopRequireDefault2(_portalOpenInstances3);
  function _interopRequireWildcard2(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};
      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }
      newObj.default = obj;
      return newObj;
    }
  }
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn2(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var CLASS_NAMES = {
    overlay: "ReactModal__Overlay",
    content: "ReactModal__Content"
  };
  var isTabKey = function isTabKey2(event) {
    return event.code === "Tab" || event.keyCode === 9;
  };
  var isEscKey = function isEscKey2(event) {
    return event.code === "Escape" || event.keyCode === 27;
  };
  var ariaHiddenInstances = 0;
  var ModalPortal2 = function(_Component) {
    _inherits2(ModalPortal22, _Component);
    function ModalPortal22(props) {
      _classCallCheck2(this, ModalPortal22);
      var _this = _possibleConstructorReturn2(this, (ModalPortal22.__proto__ || Object.getPrototypeOf(ModalPortal22)).call(this, props));
      _this.setOverlayRef = function(overlay) {
        _this.overlay = overlay;
        _this.props.overlayRef && _this.props.overlayRef(overlay);
      };
      _this.setContentRef = function(content) {
        _this.content = content;
        _this.props.contentRef && _this.props.contentRef(content);
      };
      _this.afterClose = function() {
        var _this$props = _this.props, appElement = _this$props.appElement, ariaHideApp = _this$props.ariaHideApp, htmlOpenClassName = _this$props.htmlOpenClassName, bodyOpenClassName2 = _this$props.bodyOpenClassName, parentSelector2 = _this$props.parentSelector;
        var parentDocument = parentSelector2 && parentSelector2().ownerDocument || document;
        bodyOpenClassName2 && classList$1.remove(parentDocument.body, bodyOpenClassName2);
        htmlOpenClassName && classList$1.remove(parentDocument.getElementsByTagName("html")[0], htmlOpenClassName);
        if (ariaHideApp && ariaHiddenInstances > 0) {
          ariaHiddenInstances -= 1;
          if (ariaHiddenInstances === 0) {
            ariaAppHider2.show(appElement);
          }
        }
        if (_this.props.shouldFocusAfterRender) {
          if (_this.props.shouldReturnFocusAfterClose) {
            focusManager$1.returnFocus(_this.props.preventScroll);
            focusManager$1.teardownScopedFocus();
          } else {
            focusManager$1.popWithoutFocus();
          }
        }
        if (_this.props.onAfterClose) {
          _this.props.onAfterClose();
        }
        _portalOpenInstances22.default.deregister(_this);
      };
      _this.open = function() {
        _this.beforeOpen();
        if (_this.state.afterOpen && _this.state.beforeClose) {
          clearTimeout(_this.closeTimer);
          _this.setState({ beforeClose: false });
        } else {
          if (_this.props.shouldFocusAfterRender) {
            focusManager$1.setupScopedFocus(_this.node);
            focusManager$1.markForFocusLater();
          }
          _this.setState({ isOpen: true }, function() {
            _this.openAnimationFrame = requestAnimationFrame(function() {
              _this.setState({ afterOpen: true });
              if (_this.props.isOpen && _this.props.onAfterOpen) {
                _this.props.onAfterOpen({
                  overlayEl: _this.overlay,
                  contentEl: _this.content
                });
              }
            });
          });
        }
      };
      _this.close = function() {
        if (_this.props.closeTimeoutMS > 0) {
          _this.closeWithTimeout();
        } else {
          _this.closeWithoutTimeout();
        }
      };
      _this.focusContent = function() {
        return _this.content && !_this.contentHasFocus() && _this.content.focus({ preventScroll: true });
      };
      _this.closeWithTimeout = function() {
        var closesAt = Date.now() + _this.props.closeTimeoutMS;
        _this.setState({ beforeClose: true, closesAt }, function() {
          _this.closeTimer = setTimeout(_this.closeWithoutTimeout, _this.state.closesAt - Date.now());
        });
      };
      _this.closeWithoutTimeout = function() {
        _this.setState({
          beforeClose: false,
          isOpen: false,
          afterOpen: false,
          closesAt: null
        }, _this.afterClose);
      };
      _this.handleKeyDown = function(event) {
        if (isTabKey(event)) {
          (0, _scopeTab2.default)(_this.content, event);
        }
        if (_this.props.shouldCloseOnEsc && isEscKey(event)) {
          event.stopPropagation();
          _this.requestClose(event);
        }
      };
      _this.handleOverlayOnClick = function(event) {
        if (_this.shouldClose === null) {
          _this.shouldClose = true;
        }
        if (_this.shouldClose && _this.props.shouldCloseOnOverlayClick) {
          if (_this.ownerHandlesClose()) {
            _this.requestClose(event);
          } else {
            _this.focusContent();
          }
        }
        _this.shouldClose = null;
      };
      _this.handleContentOnMouseUp = function() {
        _this.shouldClose = false;
      };
      _this.handleOverlayOnMouseDown = function(event) {
        if (!_this.props.shouldCloseOnOverlayClick && event.target == _this.overlay) {
          event.preventDefault();
        }
      };
      _this.handleContentOnClick = function() {
        _this.shouldClose = false;
      };
      _this.handleContentOnMouseDown = function() {
        _this.shouldClose = false;
      };
      _this.requestClose = function(event) {
        return _this.ownerHandlesClose() && _this.props.onRequestClose(event);
      };
      _this.ownerHandlesClose = function() {
        return _this.props.onRequestClose;
      };
      _this.shouldBeClosed = function() {
        return !_this.state.isOpen && !_this.state.beforeClose;
      };
      _this.contentHasFocus = function() {
        return document.activeElement === _this.content || _this.content.contains(document.activeElement);
      };
      _this.buildClassName = function(which, additional) {
        var classNames = (typeof additional === "undefined" ? "undefined" : _typeof(additional)) === "object" ? additional : {
          base: CLASS_NAMES[which],
          afterOpen: CLASS_NAMES[which] + "--after-open",
          beforeClose: CLASS_NAMES[which] + "--before-close"
        };
        var className = classNames.base;
        if (_this.state.afterOpen) {
          className = className + " " + classNames.afterOpen;
        }
        if (_this.state.beforeClose) {
          className = className + " " + classNames.beforeClose;
        }
        return typeof additional === "string" && additional ? className + " " + additional : className;
      };
      _this.attributesFromObject = function(prefix, items) {
        return Object.keys(items).reduce(function(acc, name) {
          acc[prefix + "-" + name] = items[name];
          return acc;
        }, {});
      };
      _this.state = {
        afterOpen: false,
        beforeClose: false
      };
      _this.shouldClose = null;
      _this.moveFromContentToOverlay = null;
      return _this;
    }
    _createClass2(ModalPortal22, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.isOpen) {
          this.open();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        if (this.props.isOpen && !prevProps.isOpen) {
          this.open();
        } else if (!this.props.isOpen && prevProps.isOpen) {
          this.close();
        }
        if (this.props.shouldFocusAfterRender && this.state.isOpen && !prevState.isOpen) {
          this.focusContent();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.state.isOpen) {
          this.afterClose();
        }
        clearTimeout(this.closeTimer);
        cancelAnimationFrame(this.openAnimationFrame);
      }
    }, {
      key: "beforeOpen",
      value: function beforeOpen() {
        var _props = this.props, appElement = _props.appElement, ariaHideApp = _props.ariaHideApp, htmlOpenClassName = _props.htmlOpenClassName, bodyOpenClassName2 = _props.bodyOpenClassName, parentSelector2 = _props.parentSelector;
        var parentDocument = parentSelector2 && parentSelector2().ownerDocument || document;
        bodyOpenClassName2 && classList$1.add(parentDocument.body, bodyOpenClassName2);
        htmlOpenClassName && classList$1.add(parentDocument.getElementsByTagName("html")[0], htmlOpenClassName);
        if (ariaHideApp) {
          ariaHiddenInstances += 1;
          ariaAppHider2.hide(appElement);
        }
        _portalOpenInstances22.default.register(this);
      }
      // Don't steal focus from inner elements
    }, {
      key: "render",
      value: function render() {
        var _props2 = this.props, id = _props2.id, className = _props2.className, overlayClassName = _props2.overlayClassName, defaultStyles = _props2.defaultStyles, children = _props2.children;
        var contentStyles = className ? {} : defaultStyles.content;
        var overlayStyles = overlayClassName ? {} : defaultStyles.overlay;
        if (this.shouldBeClosed()) {
          return null;
        }
        var overlayProps = {
          ref: this.setOverlayRef,
          className: this.buildClassName("overlay", overlayClassName),
          style: _extends2({}, overlayStyles, this.props.style.overlay),
          onClick: this.handleOverlayOnClick,
          onMouseDown: this.handleOverlayOnMouseDown
        };
        var contentProps = _extends2({
          id,
          ref: this.setContentRef,
          style: _extends2({}, contentStyles, this.props.style.content),
          className: this.buildClassName("content", className),
          tabIndex: "-1",
          onKeyDown: this.handleKeyDown,
          onMouseDown: this.handleContentOnMouseDown,
          onMouseUp: this.handleContentOnMouseUp,
          onClick: this.handleContentOnClick,
          role: this.props.role,
          "aria-label": this.props.contentLabel
        }, this.attributesFromObject("aria", _extends2({ modal: true }, this.props.aria)), this.attributesFromObject("data", this.props.data || {}), {
          "data-testid": this.props.testId
        });
        var contentElement2 = this.props.contentElement(contentProps, children);
        return this.props.overlayElement(overlayProps, contentElement2);
      }
    }]);
    return ModalPortal22;
  }(_react3.Component);
  ModalPortal2.defaultProps = {
    style: {
      overlay: {},
      content: {}
    },
    defaultStyles: {}
  };
  ModalPortal2.propTypes = {
    isOpen: _propTypes22.default.bool.isRequired,
    defaultStyles: _propTypes22.default.shape({
      content: _propTypes22.default.object,
      overlay: _propTypes22.default.object
    }),
    style: _propTypes22.default.shape({
      content: _propTypes22.default.object,
      overlay: _propTypes22.default.object
    }),
    className: _propTypes22.default.oneOfType([_propTypes22.default.string, _propTypes22.default.object]),
    overlayClassName: _propTypes22.default.oneOfType([_propTypes22.default.string, _propTypes22.default.object]),
    parentSelector: _propTypes22.default.func,
    bodyOpenClassName: _propTypes22.default.string,
    htmlOpenClassName: _propTypes22.default.string,
    ariaHideApp: _propTypes22.default.bool,
    appElement: _propTypes22.default.oneOfType([_propTypes22.default.instanceOf(_safeHTMLElement22.default), _propTypes22.default.instanceOf(_safeHTMLElement3.SafeHTMLCollection), _propTypes22.default.instanceOf(_safeHTMLElement3.SafeNodeList), _propTypes22.default.arrayOf(_propTypes22.default.instanceOf(_safeHTMLElement22.default))]),
    onAfterOpen: _propTypes22.default.func,
    onAfterClose: _propTypes22.default.func,
    onRequestClose: _propTypes22.default.func,
    closeTimeoutMS: _propTypes22.default.number,
    shouldFocusAfterRender: _propTypes22.default.bool,
    shouldCloseOnOverlayClick: _propTypes22.default.bool,
    shouldReturnFocusAfterClose: _propTypes22.default.bool,
    preventScroll: _propTypes22.default.bool,
    role: _propTypes22.default.string,
    contentLabel: _propTypes22.default.string,
    aria: _propTypes22.default.object,
    data: _propTypes22.default.object,
    children: _propTypes22.default.node,
    shouldCloseOnEsc: _propTypes22.default.bool,
    overlayRef: _propTypes22.default.func,
    contentRef: _propTypes22.default.func,
    id: _propTypes22.default.string,
    overlayElement: _propTypes22.default.func,
    contentElement: _propTypes22.default.func,
    testId: _propTypes22.default.string
  };
  exports.default = ModalPortal2;
  module.exports = exports["default"];
})(ModalPortal, ModalPortal.exports);
var ModalPortalExports = ModalPortal.exports;
function componentWillMount() {
  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (state !== null && state !== void 0) {
    this.setState(state);
  }
}
function componentWillReceiveProps(nextProps) {
  function updater(prevState) {
    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== void 0 ? state : null;
  }
  this.setState(updater.bind(this));
}
function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
      prevProps,
      prevState
    );
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
}
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;
function polyfill(Component) {
  var prototype = Component.prototype;
  if (!prototype || !prototype.isReactComponent) {
    throw new Error("Can only polyfill class components");
  }
  if (typeof Component.getDerivedStateFromProps !== "function" && typeof prototype.getSnapshotBeforeUpdate !== "function") {
    return Component;
  }
  var foundWillMountName = null;
  var foundWillReceivePropsName = null;
  var foundWillUpdateName = null;
  if (typeof prototype.componentWillMount === "function") {
    foundWillMountName = "componentWillMount";
  } else if (typeof prototype.UNSAFE_componentWillMount === "function") {
    foundWillMountName = "UNSAFE_componentWillMount";
  }
  if (typeof prototype.componentWillReceiveProps === "function") {
    foundWillReceivePropsName = "componentWillReceiveProps";
  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === "function") {
    foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
  }
  if (typeof prototype.componentWillUpdate === "function") {
    foundWillUpdateName = "componentWillUpdate";
  } else if (typeof prototype.UNSAFE_componentWillUpdate === "function") {
    foundWillUpdateName = "UNSAFE_componentWillUpdate";
  }
  if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
    var componentName = Component.displayName || Component.name;
    var newApiName = typeof Component.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
    throw Error(
      "Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n" + componentName + " uses " + newApiName + " but also contains the following legacy lifecycles:" + (foundWillMountName !== null ? "\n  " + foundWillMountName : "") + (foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "") + (foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "") + "\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks"
    );
  }
  if (typeof Component.getDerivedStateFromProps === "function") {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  }
  if (typeof prototype.getSnapshotBeforeUpdate === "function") {
    if (typeof prototype.componentDidUpdate !== "function") {
      throw new Error(
        "Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype"
      );
    }
    prototype.componentWillUpdate = componentWillUpdate;
    var componentDidUpdate = prototype.componentDidUpdate;
    prototype.componentDidUpdate = function componentDidUpdatePolyfill(prevProps, prevState, maybeSnapshot) {
      var snapshot = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : maybeSnapshot;
      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }
  return Component;
}
const reactLifecyclesCompat_es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  polyfill
}, Symbol.toStringTag, { value: "Module" }));
const require$$6 = /* @__PURE__ */ getAugmentedNamespace(reactLifecyclesCompat_es);
Object.defineProperty(Modal$2, "__esModule", {
  value: true
});
Modal$2.bodyOpenClassName = Modal$2.portalClassName = void 0;
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass = /* @__PURE__ */ function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var _react = reactExports;
var _react2 = _interopRequireDefault(_react);
var _reactDom = reactDomExports;
var _reactDom2 = _interopRequireDefault(_reactDom);
var _propTypes = propTypesExports;
var _propTypes2 = _interopRequireDefault(_propTypes);
var _ModalPortal = ModalPortalExports;
var _ModalPortal2 = _interopRequireDefault(_ModalPortal);
var _ariaAppHider = ariaAppHider$1;
var ariaAppHider = _interopRequireWildcard(_ariaAppHider);
var _safeHTMLElement = safeHTMLElement;
var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);
var _reactLifecyclesCompat = require$$6;
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var portalClassName = Modal$2.portalClassName = "ReactModalPortal";
var bodyOpenClassName = Modal$2.bodyOpenClassName = "ReactModal__Body--open";
var isReact16 = _safeHTMLElement.canUseDOM && _reactDom2.default.createPortal !== void 0;
var createHTMLElement = function createHTMLElement2(name) {
  return document.createElement(name);
};
var getCreatePortal = function getCreatePortal2() {
  return isReact16 ? _reactDom2.default.createPortal : _reactDom2.default.unstable_renderSubtreeIntoContainer;
};
function getParentElement(parentSelector2) {
  return parentSelector2();
}
var Modal$1 = function(_Component) {
  _inherits(Modal2, _Component);
  function Modal2() {
    var _ref;
    var _temp, _this, _ret;
    _classCallCheck(this, Modal2);
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal2.__proto__ || Object.getPrototypeOf(Modal2)).call.apply(_ref, [this].concat(args))), _this), _this.removePortal = function() {
      !isReact16 && _reactDom2.default.unmountComponentAtNode(_this.node);
      var parent = getParentElement(_this.props.parentSelector);
      if (parent && parent.contains(_this.node)) {
        parent.removeChild(_this.node);
      } else {
        console.warn('React-Modal: "parentSelector" prop did not returned any DOM element. Make sure that the parent element is unmounted to avoid any memory leaks.');
      }
    }, _this.portalRef = function(ref) {
      _this.portal = ref;
    }, _this.renderPortal = function(props) {
      var createPortal = getCreatePortal();
      var portal = createPortal(_this, _react2.default.createElement(_ModalPortal2.default, _extends({ defaultStyles: Modal2.defaultStyles }, props)), _this.node);
      _this.portalRef(portal);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  _createClass(Modal2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!_safeHTMLElement.canUseDOM) return;
      if (!isReact16) {
        this.node = createHTMLElement("div");
      }
      this.node.className = this.props.portalClassName;
      var parent = getParentElement(this.props.parentSelector);
      parent.appendChild(this.node);
      !isReact16 && this.renderPortal(this.props);
    }
  }, {
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(prevProps) {
      var prevParent = getParentElement(prevProps.parentSelector);
      var nextParent = getParentElement(this.props.parentSelector);
      return { prevParent, nextParent };
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, _, snapshot) {
      if (!_safeHTMLElement.canUseDOM) return;
      var _props = this.props, isOpen = _props.isOpen, portalClassName2 = _props.portalClassName;
      if (prevProps.portalClassName !== portalClassName2) {
        this.node.className = portalClassName2;
      }
      var prevParent = snapshot.prevParent, nextParent = snapshot.nextParent;
      if (nextParent !== prevParent) {
        prevParent.removeChild(this.node);
        nextParent.appendChild(this.node);
      }
      if (!prevProps.isOpen && !isOpen) return;
      !isReact16 && this.renderPortal(this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!_safeHTMLElement.canUseDOM || !this.node || !this.portal) return;
      var state = this.portal.state;
      var now = Date.now();
      var closesAt = state.isOpen && this.props.closeTimeoutMS && (state.closesAt || now + this.props.closeTimeoutMS);
      if (closesAt) {
        if (!state.beforeClose) {
          this.portal.closeWithTimeout();
        }
        setTimeout(this.removePortal, closesAt - now);
      } else {
        this.removePortal();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!_safeHTMLElement.canUseDOM || !isReact16) {
        return null;
      }
      if (!this.node && isReact16) {
        this.node = createHTMLElement("div");
      }
      var createPortal = getCreatePortal();
      return createPortal(_react2.default.createElement(_ModalPortal2.default, _extends({
        ref: this.portalRef,
        defaultStyles: Modal2.defaultStyles
      }, this.props)), this.node);
    }
  }], [{
    key: "setAppElement",
    value: function setAppElement(element) {
      ariaAppHider.setElement(element);
    }
    /* eslint-disable react/no-unused-prop-types */
    /* eslint-enable react/no-unused-prop-types */
  }]);
  return Modal2;
}(_react.Component);
Modal$1.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  style: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  portalClassName: _propTypes2.default.string,
  bodyOpenClassName: _propTypes2.default.string,
  htmlOpenClassName: _propTypes2.default.string,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    base: _propTypes2.default.string.isRequired,
    afterOpen: _propTypes2.default.string.isRequired,
    beforeClose: _propTypes2.default.string.isRequired
  })]),
  overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    base: _propTypes2.default.string.isRequired,
    afterOpen: _propTypes2.default.string.isRequired,
    beforeClose: _propTypes2.default.string.isRequired
  })]),
  appElement: _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(_safeHTMLElement2.default), _propTypes2.default.instanceOf(_safeHTMLElement.SafeHTMLCollection), _propTypes2.default.instanceOf(_safeHTMLElement.SafeNodeList), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_safeHTMLElement2.default))]),
  onAfterOpen: _propTypes2.default.func,
  onRequestClose: _propTypes2.default.func,
  closeTimeoutMS: _propTypes2.default.number,
  ariaHideApp: _propTypes2.default.bool,
  shouldFocusAfterRender: _propTypes2.default.bool,
  shouldCloseOnOverlayClick: _propTypes2.default.bool,
  shouldReturnFocusAfterClose: _propTypes2.default.bool,
  preventScroll: _propTypes2.default.bool,
  parentSelector: _propTypes2.default.func,
  aria: _propTypes2.default.object,
  data: _propTypes2.default.object,
  role: _propTypes2.default.string,
  contentLabel: _propTypes2.default.string,
  shouldCloseOnEsc: _propTypes2.default.bool,
  overlayRef: _propTypes2.default.func,
  contentRef: _propTypes2.default.func,
  id: _propTypes2.default.string,
  overlayElement: _propTypes2.default.func,
  contentElement: _propTypes2.default.func
};
Modal$1.defaultProps = {
  isOpen: false,
  portalClassName,
  bodyOpenClassName,
  role: "dialog",
  ariaHideApp: true,
  closeTimeoutMS: 0,
  shouldFocusAfterRender: true,
  shouldCloseOnEsc: true,
  shouldCloseOnOverlayClick: true,
  shouldReturnFocusAfterClose: true,
  preventScroll: false,
  parentSelector: function parentSelector() {
    return document.body;
  },
  overlayElement: function overlayElement(props, contentEl) {
    return _react2.default.createElement(
      "div",
      props,
      contentEl
    );
  },
  contentElement: function contentElement(props, children) {
    return _react2.default.createElement(
      "div",
      props,
      children
    );
  }
};
Modal$1.defaultStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)"
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px"
  }
};
(0, _reactLifecyclesCompat.polyfill)(Modal$1);
Modal$2.default = Modal$1;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _Modal = Modal$2;
  var _Modal2 = _interopRequireDefault2(_Modal);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = _Modal2.default;
  module.exports = exports["default"];
})(lib, lib.exports);
var libExports = lib.exports;
const Modal = /* @__PURE__ */ getDefaultExportFromCjs(libExports);
export {
  Modal as M
};
