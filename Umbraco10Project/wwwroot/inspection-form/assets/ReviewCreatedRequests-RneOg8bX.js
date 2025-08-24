import { R as React, r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner, F as FileUnknownIcon, b as useNavigate, a as useTranslation, c as Folder02Icon } from "./index-nbqgCPN1.js";
import { A as ApiService } from "./ApiService-CYgh-FHm.js";
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s2, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s2 = arguments[i2];
      for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2)) t[p2] = s2[p2];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2) for (var i2 = 0, l2 = from2.length, ar; i2 < l2; i2++) {
    if (ar || !(i2 in from2)) {
      if (!ar) ar = Array.prototype.slice.call(from2, 0, i2);
      ar[i2] = from2[i2];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search, position2) {
  return value.indexOf(search, position2);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
function filter(array, pattern) {
  return array.filter(function(value) {
    return !match(value, pattern);
  });
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2, siblings) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "", siblings };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0, root.siblings), root, { length: -root.length }, props);
}
function lift(root) {
  while (root.root)
    root = copy(root.root, { children: [root] });
  append(root, root.siblings);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f", abs(index ? points[index - 1] : 0)) != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2, rulesets), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2, children), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2, siblings) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i2 = 0, j2 = 0, k2 = 0; i2 < index; ++i2)
    for (var x2 = 0, y2 = substr(value, post + 1, post = abs(j2 = points[i2])), z2 = value; x2 < size; ++x2)
      if (z2 = trim(j2 > 0 ? rule[x2] + " " + y2 : replace(y2, /&\f/g, rule[x2])))
        props[k2++] = z2;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2, siblings);
}
function comment(value, root, parent, siblings) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
function declaration(value, root, parent, length2, siblings) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2, siblings);
}
function prefix(value, length2, children) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 4789:
      return MOZ + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
    case 6828:
    case 4268:
    case 2903:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/g, "") + (!match(value, /flex-|baseline/) ? MS + "grid-row-" + replace(value, /flex-|-self/g, "") : "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/g, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4200:
      if (!match(value, /flex-|baseline/)) return MS + "grid-column-align" + substr(value, length2) + value;
      break;
    case 2592:
    case 3360:
      return MS + replace(value, "template-", "") + value;
    case 4384:
    case 3616:
      if (children && children.some(function(element, index) {
        return length2 = index, match(element.props, /grid-\w+-end/);
      })) {
        return ~indexof(value + (children = children[length2].value), "span", 0) ? value : MS + replace(value, "-start", "") + value + MS + "grid-row-span:" + (~indexof(children, "span", 0) ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ";";
      }
      return MS + replace(value, "-start", "") + value;
    case 4896:
    case 4128:
      return children && children.some(function(element) {
        return match(element.props, /grid-\w+-start/);
      }) ? value : MS + replace(replace(value, "-end", "-span"), "span ", "") + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch", 0) ? prefix(replace(value, "stretch", "fill-available"), length2, children) + value : value;
        }
      break;
    case 5152:
    case 5920:
      return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(_2, a, b2, c2, d2, e, f2) {
        return MS + a + ":" + b2 + f2 + (c2 ? MS + a + "-span:" + (d2 ? e : +e - +b2) + f2 : "") + value;
      });
    case 4949:
      if (charat(value, length2 + 6) === 121)
        return replace(value, ":", ":" + WEBKIT) + value;
      break;
    case 6444:
      switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
        case 120:
          return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
        case 100:
          return replace(value, ":", ":" + MS) + value;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return replace(value, "scroll-", "scroll-snap-") + value;
  }
  return value;
}
function serialize(children, callback) {
  var output = "";
  for (var i2 = 0; i2 < children.length; i2++)
    output += callback(children[i2], i2, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      if (!strlen(element.value = element.props.join(","))) return "";
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i2 = 0; i2 < length2; i2++)
      output += collection[i2](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
function prefixer(element, index, children, callback) {
  if (element.length > -1) {
    if (!element.return)
      switch (element.type) {
        case DECLARATION:
          element.return = prefix(element.value, element.length, children);
          return;
        case KEYFRAMES:
          return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
        case RULESET:
          if (element.length)
            return combine(children = element.props, function(value) {
              switch (match(value, callback = /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  lift(copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] }));
                  lift(copy(element, { props: [value] }));
                  assign(element, { props: filter(children, callback) });
                  break;
                case "::placeholder":
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }));
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }));
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] }));
                  lift(copy(element, { props: [value] }));
                  assign(element, { props: filter(children, callback) });
                  break;
              }
              return "";
            });
      }
  }
}
var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var define_process_env_default = {};
var f$1 = "undefined" != typeof process && void 0 !== define_process_env_default && (define_process_env_default.REACT_APP_SC_ATTR || define_process_env_default.SC_ATTR) || "data-styled", m$1 = "active", y$1 = "data-styled-version", v$1 = "6.1.13", g$1 = "/*!sc*/\n", S$1 = "undefined" != typeof window && "HTMLElement" in window, w$1 = Boolean("boolean" == typeof SC_DISABLE_SPEEDY ? SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== define_process_env_default && void 0 !== define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY && "" !== define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY ? "false" !== define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY && define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== define_process_env_default && void 0 !== define_process_env_default.SC_DISABLE_SPEEDY && "" !== define_process_env_default.SC_DISABLE_SPEEDY ? "false" !== define_process_env_default.SC_DISABLE_SPEEDY && define_process_env_default.SC_DISABLE_SPEEDY : false), _$1 = Object.freeze([]), C$1 = Object.freeze({});
function I$1(e2, t2, n2) {
  return void 0 === n2 && (n2 = C$1), e2.theme !== n2.theme && e2.theme || t2 || n2.theme;
}
var A$1 = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "use", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"]), O$1 = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, D$1 = /(^-|-$)/g;
function R$1(e2) {
  return e2.replace(O$1, "-").replace(D$1, "");
}
var T$1 = /(a)(d)/gi, k$1 = 52, j$1 = function(e2) {
  return String.fromCharCode(e2 + (e2 > 25 ? 39 : 97));
};
function x$1(e2) {
  var t2, n2 = "";
  for (t2 = Math.abs(e2); t2 > k$1; t2 = t2 / k$1 | 0) n2 = j$1(t2 % k$1) + n2;
  return (j$1(t2 % k$1) + n2).replace(T$1, "$1-$2");
}
var V$1, F$1 = 5381, M$1 = function(e2, t2) {
  for (var n2 = t2.length; n2; ) e2 = 33 * e2 ^ t2.charCodeAt(--n2);
  return e2;
}, z$1 = function(e2) {
  return M$1(F$1, e2);
};
function $$1(e2) {
  return x$1(z$1(e2) >>> 0);
}
function B$1(e2) {
  return e2.displayName || e2.name || "Component";
}
function L$1(e2) {
  return "string" == typeof e2 && true;
}
var G$1 = "function" == typeof Symbol && Symbol.for, Y$1 = G$1 ? Symbol.for("react.memo") : 60115, W$1 = G$1 ? Symbol.for("react.forward_ref") : 60112, q$1 = { childContextTypes: true, contextType: true, contextTypes: true, defaultProps: true, displayName: true, getDefaultProps: true, getDerivedStateFromError: true, getDerivedStateFromProps: true, mixins: true, propTypes: true, type: true }, H$1 = { name: true, length: true, prototype: true, caller: true, callee: true, arguments: true, arity: true }, U$1 = { $$typeof: true, compare: true, defaultProps: true, displayName: true, propTypes: true, type: true }, J$1 = ((V$1 = {})[W$1] = { $$typeof: true, render: true, defaultProps: true, displayName: true, propTypes: true }, V$1[Y$1] = U$1, V$1);
function X$1(e2) {
  return ("type" in (t2 = e2) && t2.type.$$typeof) === Y$1 ? U$1 : "$$typeof" in e2 ? J$1[e2.$$typeof] : q$1;
  var t2;
}
var Z$1 = Object.defineProperty, K$1 = Object.getOwnPropertyNames, Q$1 = Object.getOwnPropertySymbols, ee$1 = Object.getOwnPropertyDescriptor, te$1 = Object.getPrototypeOf, ne$1 = Object.prototype;
function oe$1(e2, t2, n2) {
  if ("string" != typeof t2) {
    if (ne$1) {
      var o2 = te$1(t2);
      o2 && o2 !== ne$1 && oe$1(e2, o2, n2);
    }
    var r2 = K$1(t2);
    Q$1 && (r2 = r2.concat(Q$1(t2)));
    for (var s2 = X$1(e2), i2 = X$1(t2), a2 = 0; a2 < r2.length; ++a2) {
      var c2 = r2[a2];
      if (!(c2 in H$1 || n2 && n2[c2] || i2 && c2 in i2 || s2 && c2 in s2)) {
        var l2 = ee$1(t2, c2);
        try {
          Z$1(e2, c2, l2);
        } catch (e3) {
        }
      }
    }
  }
  return e2;
}
function re$1(e2) {
  return "function" == typeof e2;
}
function se$1(e2) {
  return "object" == typeof e2 && "styledComponentId" in e2;
}
function ie$1(e2, t2) {
  return e2 && t2 ? "".concat(e2, " ").concat(t2) : e2 || t2 || "";
}
function ae$1(e2, t2) {
  if (0 === e2.length) return "";
  for (var n2 = e2[0], o2 = 1; o2 < e2.length; o2++) n2 += e2[o2];
  return n2;
}
function ce$1(e2) {
  return null !== e2 && "object" == typeof e2 && e2.constructor.name === Object.name && !("props" in e2 && e2.$$typeof);
}
function le$1(e2, t2, n2) {
  if (void 0 === n2 && (n2 = false), !n2 && !ce$1(e2) && !Array.isArray(e2)) return t2;
  if (Array.isArray(t2)) for (var o2 = 0; o2 < t2.length; o2++) e2[o2] = le$1(e2[o2], t2[o2]);
  else if (ce$1(t2)) for (var o2 in t2) e2[o2] = le$1(e2[o2], t2[o2]);
  return e2;
}
function ue$1(e2, t2) {
  Object.defineProperty(e2, "toString", { value: t2 });
}
function he$1(t2) {
  for (var n2 = [], o2 = 1; o2 < arguments.length; o2++) n2[o2 - 1] = arguments[o2];
  return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(t2, " for more information.").concat(n2.length > 0 ? " Args: ".concat(n2.join(", ")) : ""));
}
var fe$1 = function() {
  function e2(e3) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e3;
  }
  return e2.prototype.indexOfGroup = function(e3) {
    for (var t2 = 0, n2 = 0; n2 < e3; n2++) t2 += this.groupSizes[n2];
    return t2;
  }, e2.prototype.insertRules = function(e3, t2) {
    if (e3 >= this.groupSizes.length) {
      for (var n2 = this.groupSizes, o2 = n2.length, r2 = o2; e3 >= r2; ) if ((r2 <<= 1) < 0) throw he$1(16, "".concat(e3));
      this.groupSizes = new Uint32Array(r2), this.groupSizes.set(n2), this.length = r2;
      for (var s2 = o2; s2 < r2; s2++) this.groupSizes[s2] = 0;
    }
    for (var i2 = this.indexOfGroup(e3 + 1), a2 = (s2 = 0, t2.length); s2 < a2; s2++) this.tag.insertRule(i2, t2[s2]) && (this.groupSizes[e3]++, i2++);
  }, e2.prototype.clearGroup = function(e3) {
    if (e3 < this.length) {
      var t2 = this.groupSizes[e3], n2 = this.indexOfGroup(e3), o2 = n2 + t2;
      this.groupSizes[e3] = 0;
      for (var r2 = n2; r2 < o2; r2++) this.tag.deleteRule(n2);
    }
  }, e2.prototype.getGroup = function(e3) {
    var t2 = "";
    if (e3 >= this.length || 0 === this.groupSizes[e3]) return t2;
    for (var n2 = this.groupSizes[e3], o2 = this.indexOfGroup(e3), r2 = o2 + n2, s2 = o2; s2 < r2; s2++) t2 += "".concat(this.tag.getRule(s2)).concat(g$1);
    return t2;
  }, e2;
}(), ye$1 = /* @__PURE__ */ new Map(), ve$1 = /* @__PURE__ */ new Map(), ge$1 = 1, Se$1 = function(e2) {
  if (ye$1.has(e2)) return ye$1.get(e2);
  for (; ve$1.has(ge$1); ) ge$1++;
  var t2 = ge$1++;
  return ye$1.set(e2, t2), ve$1.set(t2, e2), t2;
}, we$1 = function(e2, t2) {
  ge$1 = t2 + 1, ye$1.set(e2, t2), ve$1.set(t2, e2);
}, be$1 = "style[".concat(f$1, "][").concat(y$1, '="').concat(v$1, '"]'), Ee$1 = new RegExp("^".concat(f$1, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')), Ne$1 = function(e2, t2, n2) {
  for (var o2, r2 = n2.split(","), s2 = 0, i2 = r2.length; s2 < i2; s2++) (o2 = r2[s2]) && e2.registerName(t2, o2);
}, Pe$1 = function(e2, t2) {
  for (var n2, o2 = (null !== (n2 = t2.textContent) && void 0 !== n2 ? n2 : "").split(g$1), r2 = [], s2 = 0, i2 = o2.length; s2 < i2; s2++) {
    var a2 = o2[s2].trim();
    if (a2) {
      var c2 = a2.match(Ee$1);
      if (c2) {
        var l2 = 0 | parseInt(c2[1], 10), u2 = c2[2];
        0 !== l2 && (we$1(u2, l2), Ne$1(e2, u2, c2[3]), e2.getTag().insertRules(l2, r2)), r2.length = 0;
      } else r2.push(a2);
    }
  }
}, _e$1 = function(e2) {
  for (var t2 = document.querySelectorAll(be$1), n2 = 0, o2 = t2.length; n2 < o2; n2++) {
    var r2 = t2[n2];
    r2 && r2.getAttribute(f$1) !== m$1 && (Pe$1(e2, r2), r2.parentNode && r2.parentNode.removeChild(r2));
  }
};
function Ce$1() {
  return "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : null;
}
var Ie$1 = function(e2) {
  var t2 = document.head, n2 = e2 || t2, o2 = document.createElement("style"), r2 = function(e3) {
    var t3 = Array.from(e3.querySelectorAll("style[".concat(f$1, "]")));
    return t3[t3.length - 1];
  }(n2), s2 = void 0 !== r2 ? r2.nextSibling : null;
  o2.setAttribute(f$1, m$1), o2.setAttribute(y$1, v$1);
  var i2 = Ce$1();
  return i2 && o2.setAttribute("nonce", i2), n2.insertBefore(o2, s2), o2;
}, Ae$1 = function() {
  function e2(e3) {
    this.element = Ie$1(e3), this.element.appendChild(document.createTextNode("")), this.sheet = function(e4) {
      if (e4.sheet) return e4.sheet;
      for (var t2 = document.styleSheets, n2 = 0, o2 = t2.length; n2 < o2; n2++) {
        var r2 = t2[n2];
        if (r2.ownerNode === e4) return r2;
      }
      throw he$1(17);
    }(this.element), this.length = 0;
  }
  return e2.prototype.insertRule = function(e3, t2) {
    try {
      return this.sheet.insertRule(t2, e3), this.length++, true;
    } catch (e4) {
      return false;
    }
  }, e2.prototype.deleteRule = function(e3) {
    this.sheet.deleteRule(e3), this.length--;
  }, e2.prototype.getRule = function(e3) {
    var t2 = this.sheet.cssRules[e3];
    return t2 && t2.cssText ? t2.cssText : "";
  }, e2;
}(), Oe$1 = function() {
  function e2(e3) {
    this.element = Ie$1(e3), this.nodes = this.element.childNodes, this.length = 0;
  }
  return e2.prototype.insertRule = function(e3, t2) {
    if (e3 <= this.length && e3 >= 0) {
      var n2 = document.createTextNode(t2);
      return this.element.insertBefore(n2, this.nodes[e3] || null), this.length++, true;
    }
    return false;
  }, e2.prototype.deleteRule = function(e3) {
    this.element.removeChild(this.nodes[e3]), this.length--;
  }, e2.prototype.getRule = function(e3) {
    return e3 < this.length ? this.nodes[e3].textContent : "";
  }, e2;
}(), De$1 = function() {
  function e2(e3) {
    this.rules = [], this.length = 0;
  }
  return e2.prototype.insertRule = function(e3, t2) {
    return e3 <= this.length && (this.rules.splice(e3, 0, t2), this.length++, true);
  }, e2.prototype.deleteRule = function(e3) {
    this.rules.splice(e3, 1), this.length--;
  }, e2.prototype.getRule = function(e3) {
    return e3 < this.length ? this.rules[e3] : "";
  }, e2;
}(), Re$1 = S$1, Te$1 = { isServer: !S$1, useCSSOMInjection: !w$1 }, ke$1 = function() {
  function e2(e3, n2, o2) {
    void 0 === e3 && (e3 = C$1), void 0 === n2 && (n2 = {});
    var r2 = this;
    this.options = __assign(__assign({}, Te$1), e3), this.gs = n2, this.names = new Map(o2), this.server = !!e3.isServer, !this.server && S$1 && Re$1 && (Re$1 = false, _e$1(this)), ue$1(this, function() {
      return function(e4) {
        for (var t2 = e4.getTag(), n3 = t2.length, o3 = "", r3 = function(n4) {
          var r4 = function(e5) {
            return ve$1.get(e5);
          }(n4);
          if (void 0 === r4) return "continue";
          var s3 = e4.names.get(r4), i2 = t2.getGroup(n4);
          if (void 0 === s3 || !s3.size || 0 === i2.length) return "continue";
          var a2 = "".concat(f$1, ".g").concat(n4, '[id="').concat(r4, '"]'), c2 = "";
          void 0 !== s3 && s3.forEach(function(e5) {
            e5.length > 0 && (c2 += "".concat(e5, ","));
          }), o3 += "".concat(i2).concat(a2, '{content:"').concat(c2, '"}').concat(g$1);
        }, s2 = 0; s2 < n3; s2++) r3(s2);
        return o3;
      }(r2);
    });
  }
  return e2.registerId = function(e3) {
    return Se$1(e3);
  }, e2.prototype.rehydrate = function() {
    !this.server && S$1 && _e$1(this);
  }, e2.prototype.reconstructWithOptions = function(n2, o2) {
    return void 0 === o2 && (o2 = true), new e2(__assign(__assign({}, this.options), n2), this.gs, o2 && this.names || void 0);
  }, e2.prototype.allocateGSInstance = function(e3) {
    return this.gs[e3] = (this.gs[e3] || 0) + 1;
  }, e2.prototype.getTag = function() {
    return this.tag || (this.tag = (e3 = function(e4) {
      var t2 = e4.useCSSOMInjection, n2 = e4.target;
      return e4.isServer ? new De$1(n2) : t2 ? new Ae$1(n2) : new Oe$1(n2);
    }(this.options), new fe$1(e3)));
    var e3;
  }, e2.prototype.hasNameForId = function(e3, t2) {
    return this.names.has(e3) && this.names.get(e3).has(t2);
  }, e2.prototype.registerName = function(e3, t2) {
    if (Se$1(e3), this.names.has(e3)) this.names.get(e3).add(t2);
    else {
      var n2 = /* @__PURE__ */ new Set();
      n2.add(t2), this.names.set(e3, n2);
    }
  }, e2.prototype.insertRules = function(e3, t2, n2) {
    this.registerName(e3, t2), this.getTag().insertRules(Se$1(e3), n2);
  }, e2.prototype.clearNames = function(e3) {
    this.names.has(e3) && this.names.get(e3).clear();
  }, e2.prototype.clearRules = function(e3) {
    this.getTag().clearGroup(Se$1(e3)), this.clearNames(e3);
  }, e2.prototype.clearTag = function() {
    this.tag = void 0;
  }, e2;
}(), je$1 = /&/g, xe$1 = /^\s*\/\/.*$/gm;
function Ve$1(e2, t2) {
  return e2.map(function(e3) {
    return "rule" === e3.type && (e3.value = "".concat(t2, " ").concat(e3.value), e3.value = e3.value.replaceAll(",", ",".concat(t2, " ")), e3.props = e3.props.map(function(e4) {
      return "".concat(t2, " ").concat(e4);
    })), Array.isArray(e3.children) && "@keyframes" !== e3.type && (e3.children = Ve$1(e3.children, t2)), e3;
  });
}
function Fe$1(e2) {
  var t2, n2, o2, r2 = C$1, s2 = r2.options, i2 = void 0 === s2 ? C$1 : s2, a2 = r2.plugins, c2 = void 0 === a2 ? _$1 : a2, l2 = function(e3, o3, r3) {
    return r3.startsWith(n2) && r3.endsWith(n2) && r3.replaceAll(n2, "").length > 0 ? ".".concat(t2) : e3;
  }, u2 = c2.slice();
  u2.push(function(e3) {
    e3.type === RULESET && e3.value.includes("&") && (e3.props[0] = e3.props[0].replace(je$1, n2).replace(o2, l2));
  }), i2.prefix && u2.push(prefixer), u2.push(stringify);
  var p2 = function(e3, r3, s3, a3) {
    void 0 === r3 && (r3 = ""), void 0 === s3 && (s3 = ""), void 0 === a3 && (a3 = "&"), t2 = a3, n2 = r3, o2 = new RegExp("\\".concat(n2, "\\b"), "g");
    var c3 = e3.replace(xe$1, ""), l3 = compile(s3 || r3 ? "".concat(s3, " ").concat(r3, " { ").concat(c3, " }") : c3);
    i2.namespace && (l3 = Ve$1(l3, i2.namespace));
    var p3 = [];
    return serialize(l3, middleware(u2.concat(rulesheet(function(e4) {
      return p3.push(e4);
    })))), p3;
  };
  return p2.hash = c2.length ? c2.reduce(function(e3, t3) {
    return t3.name || he$1(15), M$1(e3, t3.name);
  }, F$1).toString() : "", p2;
}
var Me$1 = new ke$1(), ze$1 = Fe$1(), $e$1 = React.createContext({ shouldForwardProp: void 0, styleSheet: Me$1, stylis: ze$1 });
$e$1.Consumer;
React.createContext(void 0);
function Ge$1() {
  return reactExports.useContext($e$1);
}
var We$1 = function() {
  function e2(e3, t2) {
    var n2 = this;
    this.inject = function(e4, t3) {
      void 0 === t3 && (t3 = ze$1);
      var o2 = n2.name + t3.hash;
      e4.hasNameForId(n2.id, o2) || e4.insertRules(n2.id, o2, t3(n2.rules, o2, "@keyframes"));
    }, this.name = e3, this.id = "sc-keyframes-".concat(e3), this.rules = t2, ue$1(this, function() {
      throw he$1(12, String(n2.name));
    });
  }
  return e2.prototype.getName = function(e3) {
    return void 0 === e3 && (e3 = ze$1), this.name + e3.hash;
  }, e2;
}(), qe$1 = function(e2) {
  return e2 >= "A" && e2 <= "Z";
};
function He$1(e2) {
  for (var t2 = "", n2 = 0; n2 < e2.length; n2++) {
    var o2 = e2[n2];
    if (1 === n2 && "-" === o2 && "-" === e2[0]) return e2;
    qe$1(o2) ? t2 += "-" + o2.toLowerCase() : t2 += o2;
  }
  return t2.startsWith("ms-") ? "-" + t2 : t2;
}
var Ue$1 = function(e2) {
  return null == e2 || false === e2 || "" === e2;
}, Je = function(t2) {
  var n2, o2, r2 = [];
  for (var s2 in t2) {
    var i2 = t2[s2];
    t2.hasOwnProperty(s2) && !Ue$1(i2) && (Array.isArray(i2) && i2.isCss || re$1(i2) ? r2.push("".concat(He$1(s2), ":"), i2, ";") : ce$1(i2) ? r2.push.apply(r2, __spreadArray(__spreadArray(["".concat(s2, " {")], Je(i2), false), ["}"], false)) : r2.push("".concat(He$1(s2), ": ").concat((n2 = s2, null == (o2 = i2) || "boolean" == typeof o2 || "" === o2 ? "" : "number" != typeof o2 || 0 === o2 || n2 in unitlessKeys || n2.startsWith("--") ? String(o2).trim() : "".concat(o2, "px")), ";")));
  }
  return r2;
};
function Xe$1(e2, t2, n2, o2) {
  if (Ue$1(e2)) return [];
  if (se$1(e2)) return [".".concat(e2.styledComponentId)];
  if (re$1(e2)) {
    if (!re$1(s2 = e2) || s2.prototype && s2.prototype.isReactComponent || !t2) return [e2];
    var r2 = e2(t2);
    return Xe$1(r2, t2, n2, o2);
  }
  var s2;
  return e2 instanceof We$1 ? n2 ? (e2.inject(n2, o2), [e2.getName(o2)]) : [e2] : ce$1(e2) ? Je(e2) : Array.isArray(e2) ? Array.prototype.concat.apply(_$1, e2.map(function(e3) {
    return Xe$1(e3, t2, n2, o2);
  })) : [e2.toString()];
}
function Ze(e2) {
  for (var t2 = 0; t2 < e2.length; t2 += 1) {
    var n2 = e2[t2];
    if (re$1(n2) && !se$1(n2)) return false;
  }
  return true;
}
var Ke$1 = z$1(v$1), Qe$1 = function() {
  function e2(e3, t2, n2) {
    this.rules = e3, this.staticRulesId = "", this.isStatic = (void 0 === n2 || n2.isStatic) && Ze(e3), this.componentId = t2, this.baseHash = M$1(Ke$1, t2), this.baseStyle = n2, ke$1.registerId(t2);
  }
  return e2.prototype.generateAndInjectStyles = function(e3, t2, n2) {
    var o2 = this.baseStyle ? this.baseStyle.generateAndInjectStyles(e3, t2, n2) : "";
    if (this.isStatic && !n2.hash) if (this.staticRulesId && t2.hasNameForId(this.componentId, this.staticRulesId)) o2 = ie$1(o2, this.staticRulesId);
    else {
      var r2 = ae$1(Xe$1(this.rules, e3, t2, n2)), s2 = x$1(M$1(this.baseHash, r2) >>> 0);
      if (!t2.hasNameForId(this.componentId, s2)) {
        var i2 = n2(r2, ".".concat(s2), void 0, this.componentId);
        t2.insertRules(this.componentId, s2, i2);
      }
      o2 = ie$1(o2, s2), this.staticRulesId = s2;
    }
    else {
      for (var a2 = M$1(this.baseHash, n2.hash), c2 = "", l2 = 0; l2 < this.rules.length; l2++) {
        var u2 = this.rules[l2];
        if ("string" == typeof u2) c2 += u2;
        else if (u2) {
          var p2 = ae$1(Xe$1(u2, e3, t2, n2));
          a2 = M$1(a2, p2 + l2), c2 += p2;
        }
      }
      if (c2) {
        var d2 = x$1(a2 >>> 0);
        t2.hasNameForId(this.componentId, d2) || t2.insertRules(this.componentId, d2, n2(c2, ".".concat(d2), void 0, this.componentId)), o2 = ie$1(o2, d2);
      }
    }
    return o2;
  }, e2;
}(), et = React.createContext(void 0);
et.Consumer;
function ot(e2) {
  var n2 = React.useContext(et), r2 = reactExports.useMemo(function() {
    return function(e3, n3) {
      if (!e3) throw he$1(14);
      if (re$1(e3)) {
        var o2 = e3(n3);
        return o2;
      }
      if (Array.isArray(e3) || "object" != typeof e3) throw he$1(8);
      return n3 ? __assign(__assign({}, n3), e3) : e3;
    }(e2.theme, n2);
  }, [e2.theme, n2]);
  return e2.children ? React.createElement(et.Provider, { value: r2 }, e2.children) : null;
}
var rt = {};
function it(e2, r2, s2) {
  var i2 = se$1(e2), a2 = e2, c2 = !L$1(e2), p2 = r2.attrs, d2 = void 0 === p2 ? _$1 : p2, h2 = r2.componentId, f2 = void 0 === h2 ? function(e3, t2) {
    var n2 = "string" != typeof e3 ? "sc" : R$1(e3);
    rt[n2] = (rt[n2] || 0) + 1;
    var o2 = "".concat(n2, "-").concat($$1(v$1 + n2 + rt[n2]));
    return t2 ? "".concat(t2, "-").concat(o2) : o2;
  }(r2.displayName, r2.parentComponentId) : h2, m2 = r2.displayName, y2 = void 0 === m2 ? function(e3) {
    return L$1(e3) ? "styled.".concat(e3) : "Styled(".concat(B$1(e3), ")");
  }(e2) : m2, g2 = r2.displayName && r2.componentId ? "".concat(R$1(r2.displayName), "-").concat(r2.componentId) : r2.componentId || f2, S2 = i2 && a2.attrs ? a2.attrs.concat(d2).filter(Boolean) : d2, w2 = r2.shouldForwardProp;
  if (i2 && a2.shouldForwardProp) {
    var b2 = a2.shouldForwardProp;
    if (r2.shouldForwardProp) {
      var E2 = r2.shouldForwardProp;
      w2 = function(e3, t2) {
        return b2(e3, t2) && E2(e3, t2);
      };
    } else w2 = b2;
  }
  var N2 = new Qe$1(s2, g2, i2 ? a2.componentStyle : void 0);
  function O2(e3, r3) {
    return function(e4, r4, s3) {
      var i3 = e4.attrs, a3 = e4.componentStyle, c3 = e4.defaultProps, p3 = e4.foldedComponentIds, d3 = e4.styledComponentId, h3 = e4.target, f3 = React.useContext(et), m3 = Ge$1(), y3 = e4.shouldForwardProp || m3.shouldForwardProp;
      var v2 = I$1(r4, f3, c3) || C$1, g3 = function(e5, n2, o2) {
        for (var r5, s4 = __assign(__assign({}, n2), { className: void 0, theme: o2 }), i4 = 0; i4 < e5.length; i4 += 1) {
          var a4 = re$1(r5 = e5[i4]) ? r5(s4) : r5;
          for (var c4 in a4) s4[c4] = "className" === c4 ? ie$1(s4[c4], a4[c4]) : "style" === c4 ? __assign(__assign({}, s4[c4]), a4[c4]) : a4[c4];
        }
        return n2.className && (s4.className = ie$1(s4.className, n2.className)), s4;
      }(i3, r4, v2), S3 = g3.as || h3, w3 = {};
      for (var b3 in g3) void 0 === g3[b3] || "$" === b3[0] || "as" === b3 || "theme" === b3 && g3.theme === v2 || ("forwardedAs" === b3 ? w3.as = g3.forwardedAs : y3 && !y3(b3, S3) || (w3[b3] = g3[b3], y3 || true));
      var E3 = function(e5, t2) {
        var n2 = Ge$1(), o2 = e5.generateAndInjectStyles(t2, n2.styleSheet, n2.stylis);
        return o2;
      }(a3, g3);
      var N3 = ie$1(p3, d3);
      return E3 && (N3 += " " + E3), g3.className && (N3 += " " + g3.className), w3[L$1(S3) && !A$1.has(S3) ? "class" : "className"] = N3, w3.ref = s3, reactExports.createElement(S3, w3);
    }(D2, e3, r3);
  }
  O2.displayName = y2;
  var D2 = React.forwardRef(O2);
  return D2.attrs = S2, D2.componentStyle = N2, D2.displayName = y2, D2.shouldForwardProp = w2, D2.foldedComponentIds = i2 ? ie$1(a2.foldedComponentIds, a2.styledComponentId) : "", D2.styledComponentId = g2, D2.target = i2 ? a2.target : e2, Object.defineProperty(D2, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(e3) {
    this._foldedDefaultProps = i2 ? function(e4) {
      for (var t2 = [], n2 = 1; n2 < arguments.length; n2++) t2[n2 - 1] = arguments[n2];
      for (var o2 = 0, r3 = t2; o2 < r3.length; o2++) le$1(e4, r3[o2], true);
      return e4;
    }({}, a2.defaultProps, e3) : e3;
  } }), ue$1(D2, function() {
    return ".".concat(D2.styledComponentId);
  }), c2 && oe$1(D2, e2, { attrs: true, componentStyle: true, displayName: true, foldedComponentIds: true, shouldForwardProp: true, styledComponentId: true, target: true }), D2;
}
function at(e2, t2) {
  for (var n2 = [e2[0]], o2 = 0, r2 = t2.length; o2 < r2; o2 += 1) n2.push(t2[o2], e2[o2 + 1]);
  return n2;
}
var ct = function(e2) {
  return Object.assign(e2, { isCss: true });
};
function lt(t2) {
  for (var n2 = [], o2 = 1; o2 < arguments.length; o2++) n2[o2 - 1] = arguments[o2];
  if (re$1(t2) || ce$1(t2)) return ct(Xe$1(at(_$1, __spreadArray([t2], n2, true))));
  var r2 = t2;
  return 0 === n2.length && 1 === r2.length && "string" == typeof r2[0] ? Xe$1(r2) : ct(Xe$1(at(r2, n2)));
}
function ut(n2, o2, r2) {
  if (void 0 === r2 && (r2 = C$1), !o2) throw he$1(1, o2);
  var s2 = function(t2) {
    for (var s3 = [], i2 = 1; i2 < arguments.length; i2++) s3[i2 - 1] = arguments[i2];
    return n2(o2, r2, lt.apply(void 0, __spreadArray([t2], s3, false)));
  };
  return s2.attrs = function(e2) {
    return ut(n2, o2, __assign(__assign({}, r2), { attrs: Array.prototype.concat(r2.attrs, e2).filter(Boolean) }));
  }, s2.withConfig = function(e2) {
    return ut(n2, o2, __assign(__assign({}, r2), e2));
  }, s2;
}
var pt = function(e2) {
  return ut(it, e2);
}, dt = pt;
A$1.forEach(function(e2) {
  dt[e2] = pt(e2);
});
var l;
function r(e, t) {
  return e[t];
}
function i(e = [], t, n = 0) {
  return [...e.slice(0, n), t, ...e.slice(n)];
}
function s(e = [], t, n = "id") {
  const o = e.slice(), a = r(t, n);
  return a ? o.splice(o.findIndex((e2) => r(e2, n) === a), 1) : o.splice(o.findIndex((e2) => e2 === t), 1), o;
}
function d(e) {
  return e.map((e2, t) => {
    const n = Object.assign(Object.assign({}, e2), { sortable: e2.sortable || !!e2.sortFunction || void 0 });
    return e2.id || (n.id = t + 1), n;
  });
}
function c(e, t) {
  return Math.ceil(e / t);
}
function g(e, t) {
  return Math.min(e, t);
}
!function(e) {
  e.ASC = "asc", e.DESC = "desc";
}(l || (l = {}));
const u = () => null;
function p(e, t = [], n = []) {
  let o = {}, a = [...n];
  return t.length && t.forEach((t2) => {
    if (!t2.when || "function" != typeof t2.when) throw new Error('"when" must be defined in the conditional style object and must be function');
    t2.when(e) && (o = t2.style || {}, t2.classNames && (a = [...a, ...t2.classNames]), "function" == typeof t2.style && (o = t2.style(e) || {}));
  }), { conditionalStyle: o, classNames: a.join(" ") };
}
function b(e, t = [], n = "id") {
  const o = r(e, n);
  return o ? t.some((e2) => r(e2, n) === o) : t.some((t2) => t2 === e);
}
function m(e, t) {
  return t ? e.findIndex((e2) => h(e2.id, t)) : -1;
}
function h(e, t) {
  return e == t;
}
function w(e, t) {
  const n = !e.toggleOnSelectedRowsChange;
  switch (t.type) {
    case "SELECT_ALL_ROWS": {
      const { keyField: n2, rows: o, rowCount: a, mergeSelections: l2 } = t, r2 = !e.allSelected, i2 = !e.toggleOnSelectedRowsChange;
      if (l2) {
        const t2 = r2 ? [...e.selectedRows, ...o.filter((t3) => !b(t3, e.selectedRows, n2))] : e.selectedRows.filter((e2) => !b(e2, o, n2));
        return Object.assign(Object.assign({}, e), { allSelected: r2, selectedCount: t2.length, selectedRows: t2, toggleOnSelectedRowsChange: i2 });
      }
      return Object.assign(Object.assign({}, e), { allSelected: r2, selectedCount: r2 ? a : 0, selectedRows: r2 ? o : [], toggleOnSelectedRowsChange: i2 });
    }
    case "SELECT_SINGLE_ROW": {
      const { keyField: o, row: a, isSelected: l2, rowCount: r2, singleSelect: d2 } = t;
      return d2 ? l2 ? Object.assign(Object.assign({}, e), { selectedCount: 0, allSelected: false, selectedRows: [], toggleOnSelectedRowsChange: n }) : Object.assign(Object.assign({}, e), { selectedCount: 1, allSelected: false, selectedRows: [a], toggleOnSelectedRowsChange: n }) : l2 ? Object.assign(Object.assign({}, e), { selectedCount: e.selectedRows.length > 0 ? e.selectedRows.length - 1 : 0, allSelected: false, selectedRows: s(e.selectedRows, a, o), toggleOnSelectedRowsChange: n }) : Object.assign(Object.assign({}, e), { selectedCount: e.selectedRows.length + 1, allSelected: e.selectedRows.length + 1 === r2, selectedRows: i(e.selectedRows, a), toggleOnSelectedRowsChange: n });
    }
    case "SELECT_MULTIPLE_ROWS": {
      const { keyField: o, selectedRows: a, totalRows: l2, mergeSelections: r2 } = t;
      if (r2) {
        const t2 = [...e.selectedRows, ...a.filter((t3) => !b(t3, e.selectedRows, o))];
        return Object.assign(Object.assign({}, e), { selectedCount: t2.length, allSelected: false, selectedRows: t2, toggleOnSelectedRowsChange: n });
      }
      return Object.assign(Object.assign({}, e), { selectedCount: a.length, allSelected: a.length === l2, selectedRows: a, toggleOnSelectedRowsChange: n });
    }
    case "CLEAR_SELECTED_ROWS": {
      const { selectedRowsFlag: n2 } = t;
      return Object.assign(Object.assign({}, e), { allSelected: false, selectedCount: 0, selectedRows: [], selectedRowsFlag: n2 });
    }
    case "SORT_CHANGE": {
      const { sortDirection: o, selectedColumn: a, clearSelectedOnSort: l2 } = t;
      return Object.assign(Object.assign(Object.assign({}, e), { selectedColumn: a, sortDirection: o, currentPage: 1 }), l2 && { allSelected: false, selectedCount: 0, selectedRows: [], toggleOnSelectedRowsChange: n });
    }
    case "CHANGE_PAGE": {
      const { page: o, paginationServer: a, visibleOnly: l2, persistSelectedOnPageChange: r2 } = t, i2 = a && r2, s2 = a && !r2 || l2;
      return Object.assign(Object.assign(Object.assign(Object.assign({}, e), { currentPage: o }), i2 && { allSelected: false }), s2 && { allSelected: false, selectedCount: 0, selectedRows: [], toggleOnSelectedRowsChange: n });
    }
    case "CHANGE_ROWS_PER_PAGE": {
      const { rowsPerPage: n2, page: o } = t;
      return Object.assign(Object.assign({}, e), { currentPage: o, rowsPerPage: n2 });
    }
  }
}
const f = lt`
	pointer-events: none;
	opacity: 0.4;
`, x = dt.div`
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${({ disabled: e }) => e && f};
	${({ theme: e }) => e.table.style};
`, C = lt`
	position: sticky;
	position: -webkit-sticky; /* Safari */
	top: 0;
	z-index: 1;
`, y = dt.div`
	display: flex;
	width: 100%;
	${({ $fixedHeader: e }) => e && C};
	${({ theme: e }) => e.head.style};
`, R = dt.div`
	display: flex;
	align-items: stretch;
	width: 100%;
	${({ theme: e }) => e.headRow.style};
	${({ $dense: e, theme: t }) => e && t.headRow.denseStyle};
`, v = (e, ...t) => lt`
		@media screen and (max-width: ${599}px) {
			${lt(e, ...t)}
		}
	`, S = (e, ...t) => lt`
		@media screen and (max-width: ${959}px) {
			${lt(e, ...t)}
		}
	`, E = (e, ...t) => lt`
		@media screen and (max-width: ${1280}px) {
			${lt(e, ...t)}
		}
	`, O = (e) => (t, ...n) => lt`
			@media screen and (max-width: ${e}px) {
				${lt(t, ...n)}
			}
		`, $ = dt.div`
	position: relative;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	line-height: normal;
	${({ theme: e, $headCell: t }) => e[t ? "headCells" : "cells"].style};
	${({ $noPadding: e }) => e && "padding: 0"};
`, k = dt($)`
	flex-grow: ${({ button: e, grow: t }) => 0 === t || e ? 0 : t || 1};
	flex-shrink: 0;
	flex-basis: 0;
	max-width: ${({ maxWidth: e }) => e || "100%"};
	min-width: ${({ minWidth: e }) => e || "100px"};
	${({ width: e }) => e && lt`
			min-width: ${e};
			max-width: ${e};
		`};
	${({ right: e }) => e && "justify-content: flex-end"};
	${({ button: e, center: t }) => (t || e) && "justify-content: center"};
	${({ compact: e, button: t }) => (e || t) && "padding: 0"};

	/* handle hiding cells */
	${({ hide: e }) => e && "sm" === e && v`
    display: none;
  `};
	${({ hide: e }) => e && "md" === e && S`
    display: none;
  `};
	${({ hide: e }) => e && "lg" === e && E`
    display: none;
  `};
	${({ hide: e }) => e && Number.isInteger(e) && O(e)`
    display: none;
  `};
`, P = lt`
	div:first-child {
		white-space: ${({ $wrapCell: e }) => e ? "normal" : "nowrap"};
		overflow: ${({ $allowOverflow: e }) => e ? "visible" : "hidden"};
		text-overflow: ellipsis;
	}
`, D = dt(k).attrs((e) => ({ style: e.style }))`
	${({ $renderAsCell: e }) => !e && P};
	${({ theme: e, $isDragging: t }) => t && e.cells.draggingStyle};
	${({ $cellStyle: e }) => e};
`;
var H = reactExports.memo(function({ id: t, column: n, row: o, rowIndex: a, dataTag: l2, isDragging: r2, onDragStart: i2, onDragOver: s2, onDragEnd: d2, onDragEnter: c2, onDragLeave: g2 }) {
  const { conditionalStyle: u2, classNames: b2 } = p(o, n.conditionalCellStyles, ["rdt_TableCell"]);
  return reactExports.createElement(D, { id: t, "data-column-id": n.id, role: "cell", className: b2, "data-tag": l2, $cellStyle: n.style, $renderAsCell: !!n.cell, $allowOverflow: n.allowOverflow, button: n.button, center: n.center, compact: n.compact, grow: n.grow, hide: n.hide, maxWidth: n.maxWidth, minWidth: n.minWidth, right: n.right, width: n.width, $wrapCell: n.wrap, style: u2, $isDragging: r2, onDragStart: i2, onDragOver: s2, onDragEnd: d2, onDragEnter: c2, onDragLeave: g2 }, !n.cell && reactExports.createElement("div", { "data-tag": l2 }, function(e, t2, n2, o2) {
    return t2 ? n2 && "function" == typeof n2 ? n2(e, o2) : t2(e, o2) : null;
  }(o, n.selector, n.format, a)), n.cell && n.cell(o, a, n, t));
});
const F = "input";
var j = reactExports.memo(function({ name: t, component: n = F, componentOptions: o = { style: {} }, indeterminate: a = false, checked: l2 = false, disabled: r2 = false, onClick: i2 = u }) {
  const s2 = n, d2 = s2 !== F ? o.style : ((e) => Object.assign(Object.assign({ fontSize: "18px" }, !e && { cursor: "pointer" }), { padding: 0, marginTop: "1px", verticalAlign: "middle", position: "relative" }))(r2), c2 = reactExports.useMemo(() => function(e, ...t2) {
    let n2;
    return Object.keys(e).map((t3) => e[t3]).forEach((o2, a2) => {
      const l3 = e;
      "function" == typeof o2 && (n2 = Object.assign(Object.assign({}, l3), { [Object.keys(e)[a2]]: o2(...t2) }));
    }), n2 || e;
  }(o, a), [o, a]);
  return reactExports.createElement(s2, Object.assign({ type: "checkbox", ref: (e) => {
    e && (e.indeterminate = a);
  }, style: d2, onClick: r2 ? u : i2, name: t, "aria-label": t, checked: l2, disabled: r2 }, c2, { onChange: u }));
});
const I = dt($)`
	flex: 0 0 48px;
	min-width: 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
`;
function T({ name: t, keyField: n, row: o, rowCount: a, selected: l2, selectableRowsComponent: r2, selectableRowsComponentProps: i2, selectableRowsSingle: s2, selectableRowDisabled: d2, onSelectedRow: c2 }) {
  const g2 = !(!d2 || !d2(o));
  return reactExports.createElement(I, { onClick: (e) => e.stopPropagation(), className: "rdt_TableCell", $noPadding: true }, reactExports.createElement(j, { name: t, component: r2, componentOptions: i2, checked: l2, "aria-checked": l2, onClick: () => {
    c2({ type: "SELECT_SINGLE_ROW", row: o, isSelected: l2, keyField: n, rowCount: a, singleSelect: s2 });
  }, disabled: g2 }));
}
const M = dt.button`
	display: inline-flex;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	border: none;
	background-color: transparent;
	${({ theme: e }) => e.expanderButton.style};
`;
function L({ disabled: t = false, expanded: n = false, expandableIcon: o, id: a, row: l2, onToggled: r2 }) {
  const i2 = n ? o.expanded : o.collapsed;
  return reactExports.createElement(M, { "aria-disabled": t, onClick: () => r2 && r2(l2), "data-testid": `expander-button-${a}`, disabled: t, "aria-label": n ? "Collapse Row" : "Expand Row", role: "button", type: "button" }, i2);
}
const A = dt($)`
	white-space: nowrap;
	font-weight: 400;
	min-width: 48px;
	${({ theme: e }) => e.expanderCell.style};
`;
function _({ row: t, expanded: n = false, expandableIcon: o, id: a, onToggled: l2, disabled: r2 = false }) {
  return reactExports.createElement(A, { onClick: (e) => e.stopPropagation(), $noPadding: true }, reactExports.createElement(L, { id: a, row: t, expanded: n, expandableIcon: o, disabled: r2, onToggled: l2 }));
}
const N = dt.div`
	width: 100%;
	box-sizing: border-box;
	${({ theme: e }) => e.expanderRow.style};
	${({ $extendedRowStyle: e }) => e};
`;
var z = reactExports.memo(function({ data: t, ExpanderComponent: n, expanderComponentProps: o, extendedRowStyle: a, extendedClassNames: l2 }) {
  const r2 = ["rdt_ExpanderRow", ...l2.split(" ").filter((e) => "rdt_TableRow" !== e)].join(" ");
  return reactExports.createElement(N, { className: r2, $extendedRowStyle: a }, reactExports.createElement(n, Object.assign({ data: t }, o)));
});
const W = "allowRowEvents";
var B, G, V;
!function(e) {
  e.LTR = "ltr", e.RTL = "rtl", e.AUTO = "auto";
}(B || (B = {})), function(e) {
  e.LEFT = "left", e.RIGHT = "right", e.CENTER = "center";
}(G || (G = {})), function(e) {
  e.SM = "sm", e.MD = "md", e.LG = "lg";
}(V || (V = {}));
const U = lt`
	&:hover {
		${({ $highlightOnHover: e, theme: t }) => e && t.rows.highlightOnHoverStyle};
	}
`, Y = lt`
	&:hover {
		cursor: pointer;
	}
`, K = dt.div.attrs((e) => ({ style: e.style }))`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	${({ theme: e }) => e.rows.style};
	${({ $dense: e, theme: t }) => e && t.rows.denseStyle};
	${({ $striped: e, theme: t }) => e && t.rows.stripedStyle};
	${({ $highlightOnHover: e }) => e && U};
	${({ $pointerOnHover: e }) => e && Y};
	${({ $selected: e, theme: t }) => e && t.rows.selectedHighlightStyle};
	${({ $conditionalStyle: e }) => e};
`;
function q({ columns: t = [], conditionalRowStyles: n = [], defaultExpanded: o = false, defaultExpanderDisabled: a = false, dense: l2 = false, expandableIcon: i2, expandableRows: s2 = false, expandableRowsComponent: d2, expandableRowsComponentProps: c2, expandableRowsHideExpander: g2, expandOnRowClicked: b2 = false, expandOnRowDoubleClicked: m2 = false, highlightOnHover: w2 = false, id: f2, expandableInheritConditionalStyles: x2, keyField: C2, onRowClicked: y2 = u, onRowDoubleClicked: R2 = u, onRowMouseEnter: v2 = u, onRowMouseLeave: S2 = u, onRowExpandToggled: E2 = u, onSelectedRow: O2 = u, pointerOnHover: $2 = false, row: k2, rowCount: P2, rowIndex: D2, selectableRowDisabled: F2 = null, selectableRows: j2 = false, selectableRowsComponent: I2, selectableRowsComponentProps: M2, selectableRowsHighlight: L2 = false, selectableRowsSingle: A2 = false, selected: N2, striped: B2 = false, draggingColumnId: G2, onDragStart: V2, onDragOver: U2, onDragEnd: Y2, onDragEnter: q2, onDragLeave: J2 }) {
  const [Q2, X2] = reactExports.useState(o);
  reactExports.useEffect(() => {
    X2(o);
  }, [o]);
  const Z2 = reactExports.useCallback(() => {
    X2(!Q2), E2(!Q2, k2);
  }, [Q2, E2, k2]), ee2 = $2 || s2 && (b2 || m2), te2 = reactExports.useCallback((e) => {
    e.target.getAttribute("data-tag") === W && (y2(k2, e), !a && s2 && b2 && Z2());
  }, [a, b2, s2, Z2, y2, k2]), ne2 = reactExports.useCallback((e) => {
    e.target.getAttribute("data-tag") === W && (R2(k2, e), !a && s2 && m2 && Z2());
  }, [a, m2, s2, Z2, R2, k2]), oe2 = reactExports.useCallback((e) => {
    v2(k2, e);
  }, [v2, k2]), ae2 = reactExports.useCallback((e) => {
    S2(k2, e);
  }, [S2, k2]), le2 = r(k2, C2), { conditionalStyle: re2, classNames: ie2 } = p(k2, n, ["rdt_TableRow"]), se2 = L2 && N2, de2 = x2 ? re2 : {}, ce2 = B2 && D2 % 2 == 0;
  return reactExports.createElement(reactExports.Fragment, null, reactExports.createElement(K, { id: `row-${f2}`, role: "row", $striped: ce2, $highlightOnHover: w2, $pointerOnHover: !a && ee2, $dense: l2, onClick: te2, onDoubleClick: ne2, onMouseEnter: oe2, onMouseLeave: ae2, className: ie2, $selected: se2, $conditionalStyle: re2 }, j2 && reactExports.createElement(T, { name: `select-row-${le2}`, keyField: C2, row: k2, rowCount: P2, selected: N2, selectableRowsComponent: I2, selectableRowsComponentProps: M2, selectableRowDisabled: F2, selectableRowsSingle: A2, onSelectedRow: O2 }), s2 && !g2 && reactExports.createElement(_, { id: le2, expandableIcon: i2, expanded: Q2, row: k2, onToggled: Z2, disabled: a }), t.map((t2) => t2.omit ? null : reactExports.createElement(H, { id: `cell-${t2.id}-${le2}`, key: `cell-${t2.id}-${le2}`, dataTag: t2.ignoreRowClick || t2.button ? null : W, column: t2, row: k2, rowIndex: D2, isDragging: h(G2, t2.id), onDragStart: V2, onDragOver: U2, onDragEnd: Y2, onDragEnter: q2, onDragLeave: J2 }))), s2 && Q2 && reactExports.createElement(z, { key: `expander-${le2}`, data: k2, extendedRowStyle: de2, extendedClassNames: ie2, ExpanderComponent: d2, expanderComponentProps: c2 }));
}
const J = dt.span`
	padding: 2px;
	color: inherit;
	flex-grow: 0;
	flex-shrink: 0;
	${({ $sortActive: e }) => e ? "opacity: 1" : "opacity: 0"};
	${({ $sortDirection: e }) => "desc" === e && "transform: rotate(180deg)"};
`, Q = ({ sortActive: e, sortDirection: n }) => React.createElement(J, { $sortActive: e, $sortDirection: n }, "▲"), X = dt(k)`
	${({ button: e }) => e && "text-align: center"};
	${({ theme: e, $isDragging: t }) => t && e.headCells.draggingStyle};
`, Z = lt`
	cursor: pointer;
	span.__rdt_custom_sort_icon__ {
		i,
		svg {
			transform: 'translate3d(0, 0, 0)';
			${({ $sortActive: e }) => e ? "opacity: 1" : "opacity: 0"};
			color: inherit;
			font-size: 18px;
			height: 18px;
			width: 18px;
			backface-visibility: hidden;
			transform-style: preserve-3d;
			transition-duration: 95ms;
			transition-property: transform;
		}

		&.asc i,
		&.asc svg {
			transform: rotate(180deg);
		}
	}

	${({ $sortActive: e }) => !e && lt`
			&:hover,
			&:focus {
				opacity: 0.7;

				span,
				span.__rdt_custom_sort_icon__ * {
					opacity: 0.7;
				}
			}
		`};
`, ee = dt.div`
	display: inline-flex;
	align-items: center;
	justify-content: inherit;
	height: 100%;
	width: 100%;
	outline: none;
	user-select: none;
	overflow: hidden;
	${({ disabled: e }) => !e && Z};
`, te = dt.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;
var ne = reactExports.memo(function({ column: t, disabled: n, draggingColumnId: o, selectedColumn: a = {}, sortDirection: r2, sortIcon: i2, sortServer: s2, pagination: d2, paginationServer: c2, persistSelectedOnSort: g2, selectableRowsVisibleOnly: u2, onSort: p2, onDragStart: b2, onDragOver: m2, onDragEnd: w2, onDragEnter: f2, onDragLeave: x2 }) {
  reactExports.useEffect(() => {
    "string" == typeof t.selector && console.error(`Warning: ${t.selector} is a string based column selector which has been deprecated as of v7 and will be removed in v8. Instead, use a selector function e.g. row => row[field]...`);
  }, []);
  const [C2, y2] = reactExports.useState(false), R2 = reactExports.useRef(null);
  if (reactExports.useEffect(() => {
    R2.current && y2(R2.current.scrollWidth > R2.current.clientWidth);
  }, [C2]), t.omit) return null;
  const v2 = () => {
    if (!t.sortable && !t.selector) return;
    let e = r2;
    h(a.id, t.id) && (e = r2 === l.ASC ? l.DESC : l.ASC), p2({ type: "SORT_CHANGE", sortDirection: e, selectedColumn: t, clearSelectedOnSort: d2 && c2 && !g2 || s2 || u2 });
  }, S2 = (t2) => reactExports.createElement(Q, { sortActive: t2, sortDirection: r2 }), E2 = () => reactExports.createElement("span", { className: [r2, "__rdt_custom_sort_icon__"].join(" ") }, i2), O2 = !(!t.sortable || !h(a.id, t.id)), $2 = !t.sortable || n, k2 = t.sortable && !i2 && !t.right, P2 = t.sortable && !i2 && t.right, D2 = t.sortable && i2 && !t.right, H2 = t.sortable && i2 && t.right;
  return reactExports.createElement(X, { "data-column-id": t.id, className: "rdt_TableCol", $headCell: true, allowOverflow: t.allowOverflow, button: t.button, compact: t.compact, grow: t.grow, hide: t.hide, maxWidth: t.maxWidth, minWidth: t.minWidth, right: t.right, center: t.center, width: t.width, draggable: t.reorder, $isDragging: h(t.id, o), onDragStart: b2, onDragOver: m2, onDragEnd: w2, onDragEnter: f2, onDragLeave: x2 }, t.name && reactExports.createElement(ee, { "data-column-id": t.id, "data-sort-id": t.id, role: "columnheader", tabIndex: 0, className: "rdt_TableCol_Sortable", onClick: $2 ? void 0 : v2, onKeyPress: $2 ? void 0 : (e) => {
    "Enter" === e.key && v2();
  }, $sortActive: !$2 && O2, disabled: $2 }, !$2 && H2 && E2(), !$2 && P2 && S2(O2), "string" == typeof t.name ? reactExports.createElement(te, { title: C2 ? t.name : void 0, ref: R2, "data-column-id": t.id }, t.name) : t.name, !$2 && D2 && E2(), !$2 && k2 && S2(O2)));
});
const oe = dt($)`
	flex: 0 0 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	font-size: unset;
`;
function ae({ headCell: t = true, rowData: n, keyField: o, allSelected: a, mergeSelections: l2, selectedRows: r2, selectableRowsComponent: i2, selectableRowsComponentProps: s2, selectableRowDisabled: d2, onSelectAllRows: c2 }) {
  const g2 = r2.length > 0 && !a, u2 = d2 ? n.filter((e) => !d2(e)) : n, p2 = 0 === u2.length, b2 = Math.min(n.length, u2.length);
  return reactExports.createElement(oe, { className: "rdt_TableCol", $headCell: t, $noPadding: true }, reactExports.createElement(j, { name: "select-all-rows", component: i2, componentOptions: s2, onClick: () => {
    c2({ type: "SELECT_ALL_ROWS", rows: u2, rowCount: b2, mergeSelections: l2, keyField: o });
  }, checked: a, indeterminate: g2, disabled: p2 }));
}
function le(t = B.AUTO) {
  const n = "object" == typeof window, [o, a] = reactExports.useState(false);
  return reactExports.useEffect(() => {
    if (n) if ("auto" !== t) a("rtl" === t);
    else {
      const e = !(!window.document || !window.document.createElement), t2 = document.getElementsByTagName("BODY")[0], n2 = document.getElementsByTagName("HTML")[0], o2 = "rtl" === t2.dir || "rtl" === n2.dir;
      a(e && o2);
    }
  }, [t, n]), o;
}
const re = dt.div`
	display: flex;
	align-items: center;
	flex: 1 0 auto;
	height: 100%;
	color: ${({ theme: e }) => e.contextMenu.fontColor};
	font-size: ${({ theme: e }) => e.contextMenu.fontSize};
	font-weight: 400;
`, ie = dt.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
`, se = dt.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: inherit;
	z-index: 1;
	align-items: center;
	justify-content: space-between;
	display: flex;
	${({ $rtl: e }) => e && "direction: rtl"};
	${({ theme: e }) => e.contextMenu.style};
	${({ theme: e, $visible: t }) => t && e.contextMenu.activeStyle};
`;
function de({ contextMessage: t, contextActions: n, contextComponent: o, selectedCount: a, direction: l2 }) {
  const r2 = le(l2), i2 = a > 0;
  return o ? reactExports.createElement(se, { $visible: i2 }, reactExports.cloneElement(o, { selectedCount: a })) : reactExports.createElement(se, { $visible: i2, $rtl: r2 }, reactExports.createElement(re, null, ((e, t2, n2) => {
    if (0 === t2) return null;
    const o2 = 1 === t2 ? e.singular : e.plural;
    return n2 ? `${t2} ${e.message || ""} ${o2}` : `${t2} ${o2} ${e.message || ""}`;
  })(t, a, r2)), reactExports.createElement(ie, null, n));
}
const ce = dt.div`
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	flex: 1 1 auto;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
	${({ theme: e }) => e.header.style}
`, ge = dt.div`
	flex: 1 0 auto;
	color: ${({ theme: e }) => e.header.fontColor};
	font-size: ${({ theme: e }) => e.header.fontSize};
	font-weight: 400;
`, ue = dt.div`
	flex: 1 0 auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	> * {
		margin-left: 5px;
	}
`, pe = ({ title: t, actions: n = null, contextMessage: o, contextActions: a, contextComponent: l2, selectedCount: r2, direction: i2, showMenu: s2 = true }) => reactExports.createElement(ce, { className: "rdt_TableHeader", role: "heading", "aria-level": 1 }, reactExports.createElement(ge, null, t), n && reactExports.createElement(ue, null, n), s2 && reactExports.createElement(de, { contextMessage: o, contextActions: a, contextComponent: l2, direction: i2, selectedCount: r2 }));
function be(e, t) {
  var n = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
    var a = 0;
    for (o = Object.getOwnPropertySymbols(e); a < o.length; a++) t.indexOf(o[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[a]) && (n[o[a]] = e[o[a]]);
  }
  return n;
}
"function" == typeof SuppressedError && SuppressedError;
const me = { left: "flex-start", right: "flex-end", center: "center" }, he = dt.header`
	position: relative;
	display: flex;
	flex: 1 1 auto;
	box-sizing: border-box;
	align-items: center;
	padding: 4px 16px 4px 24px;
	width: 100%;
	justify-content: ${({ align: e }) => me[e]};
	flex-wrap: ${({ $wrapContent: e }) => e ? "wrap" : "nowrap"};
	${({ theme: e }) => e.subHeader.style}
`, we = (t) => {
  var { align: n = "right", wrapContent: o = true } = t, a = be(t, ["align", "wrapContent"]);
  return reactExports.createElement(he, Object.assign({ align: n, $wrapContent: o }, a));
}, fe = dt.div`
	display: flex;
	flex-direction: column;
`, xe = dt.div`
	position: relative;
	width: 100%;
	border-radius: inherit;
	${({ $responsive: e, $fixedHeader: t }) => e && lt`
			overflow-x: auto;

			// hidden prevents vertical scrolling in firefox when fixedHeader is disabled
			overflow-y: ${t ? "auto" : "hidden"};
			min-height: 0;
		`};

	${({ $fixedHeader: e = false, $fixedHeaderScrollHeight: t = "100vh" }) => e && lt`
			max-height: ${t};
			-webkit-overflow-scrolling: touch;
		`};

	${({ theme: e }) => e.responsiveWrapper.style};
`, Ce = dt.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${(e) => e.theme.progress.style};
`, ye = dt.div`
	position: relative;
	width: 100%;
	${({ theme: e }) => e.tableWrapper.style};
`, Re = dt($)`
	white-space: nowrap;
	${({ theme: e }) => e.expanderCell.style};
`, ve = dt.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${({ theme: e }) => e.noData.style};
`, Se = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" }, React.createElement("path", { d: "M7 10l5 5 5-5z" }), React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })), Ee = dt.select`
	cursor: pointer;
	height: 24px;
	max-width: 100%;
	user-select: none;
	padding-left: 8px;
	padding-right: 24px;
	box-sizing: content-box;
	font-size: inherit;
	color: inherit;
	border: none;
	background-color: transparent;
	appearance: none;
	direction: ltr;
	flex-shrink: 0;

	&::-ms-expand {
		display: none;
	}

	&:disabled::-ms-expand {
		background: #f60;
	}

	option {
		color: initial;
	}
`, Oe = dt.div`
	position: relative;
	flex-shrink: 0;
	font-size: inherit;
	color: inherit;
	margin-top: 1px;

	svg {
		top: 0;
		right: 0;
		color: inherit;
		position: absolute;
		fill: currentColor;
		width: 24px;
		height: 24px;
		display: inline-block;
		user-select: none;
		pointer-events: none;
	}
`, $e = (t) => {
  var { defaultValue: n, onChange: o } = t, a = be(t, ["defaultValue", "onChange"]);
  return reactExports.createElement(Oe, null, reactExports.createElement(Ee, Object.assign({ onChange: o, defaultValue: n }, a)), reactExports.createElement(Se, null));
}, ke = { columns: [], data: [], title: "", keyField: "id", selectableRows: false, selectableRowsHighlight: false, selectableRowsNoSelectAll: false, selectableRowSelected: null, selectableRowDisabled: null, selectableRowsComponent: "input", selectableRowsComponentProps: {}, selectableRowsVisibleOnly: false, selectableRowsSingle: false, clearSelectedRows: false, expandableRows: false, expandableRowDisabled: null, expandableRowExpanded: null, expandOnRowClicked: false, expandableRowsHideExpander: false, expandOnRowDoubleClicked: false, expandableInheritConditionalStyles: false, expandableRowsComponent: function() {
  return React.createElement("div", null, "To add an expander pass in a component instance via ", React.createElement("strong", null, "expandableRowsComponent"), ". You can then access props.data from this component.");
}, expandableIcon: { collapsed: React.createElement(() => React.createElement("svg", { fill: "currentColor", height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" }, React.createElement("path", { d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" }), React.createElement("path", { d: "M0-.25h24v24H0z", fill: "none" })), null), expanded: React.createElement(() => React.createElement("svg", { fill: "currentColor", height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" }, React.createElement("path", { d: "M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" }), React.createElement("path", { d: "M0-.75h24v24H0z", fill: "none" })), null) }, expandableRowsComponentProps: {}, progressPending: false, progressComponent: React.createElement("div", { style: { fontSize: "24px", fontWeight: 700, padding: "24px" } }, "Loading..."), persistTableHead: false, sortIcon: null, sortFunction: null, sortServer: false, striped: false, highlightOnHover: false, pointerOnHover: false, noContextMenu: false, contextMessage: { singular: "item", plural: "items", message: "selected" }, actions: null, contextActions: null, contextComponent: null, defaultSortFieldId: null, defaultSortAsc: true, responsive: true, noDataComponent: React.createElement("div", { style: { padding: "24px" } }, "There are no records to display"), disabled: false, noTableHead: false, noHeader: false, subHeader: false, subHeaderAlign: G.RIGHT, subHeaderWrap: true, subHeaderComponent: null, fixedHeader: false, fixedHeaderScrollHeight: "100vh", pagination: false, paginationServer: false, paginationServerOptions: { persistSelectedOnSort: false, persistSelectedOnPageChange: false }, paginationDefaultPage: 1, paginationResetDefaultPage: false, paginationTotalRows: 0, paginationPerPage: 10, paginationRowsPerPageOptions: [10, 15, 20, 25, 30], paginationComponent: null, paginationComponentOptions: {}, paginationIconFirstPage: React.createElement(() => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", "aria-hidden": "true", role: "presentation" }, React.createElement("path", { d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" }), React.createElement("path", { fill: "none", d: "M24 24H0V0h24v24z" })), null), paginationIconLastPage: React.createElement(() => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", "aria-hidden": "true", role: "presentation" }, React.createElement("path", { d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" }), React.createElement("path", { fill: "none", d: "M0 0h24v24H0V0z" })), null), paginationIconNext: React.createElement(() => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", "aria-hidden": "true", role: "presentation" }, React.createElement("path", { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" }), React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })), null), paginationIconPrevious: React.createElement(() => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", "aria-hidden": "true", role: "presentation" }, React.createElement("path", { d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" }), React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })), null), dense: false, conditionalRowStyles: [], theme: "default", customStyles: {}, direction: B.AUTO, onChangePage: u, onChangeRowsPerPage: u, onRowClicked: u, onRowDoubleClicked: u, onRowMouseEnter: u, onRowMouseLeave: u, onRowExpandToggled: u, onSelectedRowsChange: u, onSort: u, onColumnOrderChange: u }, Pe = { rowsPerPageText: "Rows per page:", rangeSeparatorText: "of", noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: "All" }, De = dt.nav`
	display: flex;
	flex: 1 1 auto;
	justify-content: flex-end;
	align-items: center;
	box-sizing: border-box;
	padding-right: 8px;
	padding-left: 8px;
	width: 100%;
	${({ theme: e }) => e.pagination.style};
`, He = dt.button`
	position: relative;
	display: block;
	user-select: none;
	border: none;
	${({ theme: e }) => e.pagination.pageButtonsStyle};
	${({ $isRTL: e }) => e && "transform: scale(-1, -1)"};
`, Fe = dt.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	${v`
    width: 100%;
    justify-content: space-around;
  `};
`, je = dt.span`
	flex-shrink: 1;
	user-select: none;
`, Ie = dt(je)`
	margin: 0 24px;
`, Te = dt(je)`
	margin: 0 4px;
`;
var Me = reactExports.memo(function({ rowsPerPage: t, rowCount: n, currentPage: o, direction: a = ke.direction, paginationRowsPerPageOptions: l2 = ke.paginationRowsPerPageOptions, paginationIconLastPage: r2 = ke.paginationIconLastPage, paginationIconFirstPage: i2 = ke.paginationIconFirstPage, paginationIconNext: s2 = ke.paginationIconNext, paginationIconPrevious: d2 = ke.paginationIconPrevious, paginationComponentOptions: g2 = ke.paginationComponentOptions, onChangeRowsPerPage: u2 = ke.onChangeRowsPerPage, onChangePage: p2 = ke.onChangePage }) {
  const b2 = (() => {
    const t2 = "object" == typeof window;
    function n2() {
      return { width: t2 ? window.innerWidth : void 0, height: t2 ? window.innerHeight : void 0 };
    }
    const [o2, a2] = reactExports.useState(n2);
    return reactExports.useEffect(() => {
      if (!t2) return () => null;
      function e() {
        a2(n2());
      }
      return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
    }, []), o2;
  })(), m2 = le(a), h2 = b2.width && b2.width > 599, w2 = c(n, t), f2 = o * t, x2 = f2 - t + 1, C2 = 1 === o, y2 = o === w2, R2 = Object.assign(Object.assign({}, Pe), g2), v2 = o === w2 ? `${x2}-${n} ${R2.rangeSeparatorText} ${n}` : `${x2}-${f2} ${R2.rangeSeparatorText} ${n}`, S2 = reactExports.useCallback(() => p2(o - 1), [o, p2]), E2 = reactExports.useCallback(() => p2(o + 1), [o, p2]), O2 = reactExports.useCallback(() => p2(1), [p2]), $2 = reactExports.useCallback(() => p2(c(n, t)), [p2, n, t]), k2 = reactExports.useCallback((e) => u2(Number(e.target.value), o), [o, u2]), P2 = l2.map((t2) => reactExports.createElement("option", { key: t2, value: t2 }, t2));
  R2.selectAllRowsItem && P2.push(reactExports.createElement("option", { key: -1, value: n }, R2.selectAllRowsItemText));
  const D2 = reactExports.createElement($e, { onChange: k2, defaultValue: t, "aria-label": R2.rowsPerPageText }, P2);
  return reactExports.createElement(De, { className: "rdt_Pagination" }, !R2.noRowsPerPage && h2 && reactExports.createElement(reactExports.Fragment, null, reactExports.createElement(Te, null, R2.rowsPerPageText), D2), h2 && reactExports.createElement(Ie, null, v2), reactExports.createElement(Fe, null, reactExports.createElement(He, { id: "pagination-first-page", type: "button", "aria-label": "First Page", "aria-disabled": C2, onClick: O2, disabled: C2, $isRTL: m2 }, i2), reactExports.createElement(He, { id: "pagination-previous-page", type: "button", "aria-label": "Previous Page", "aria-disabled": C2, onClick: S2, disabled: C2, $isRTL: m2 }, d2), !R2.noRowsPerPage && !h2 && D2, reactExports.createElement(He, { id: "pagination-next-page", type: "button", "aria-label": "Next Page", "aria-disabled": y2, onClick: E2, disabled: y2, $isRTL: m2 }, s2), reactExports.createElement(He, { id: "pagination-last-page", type: "button", "aria-label": "Last Page", "aria-disabled": y2, onClick: $2, disabled: y2, $isRTL: m2 }, r2)));
});
const Le = (t, n) => {
  const o = reactExports.useRef(true);
  reactExports.useEffect(() => {
    o.current ? o.current = false : t();
  }, n);
};
function Ae(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var _e = function(e) {
  return /* @__PURE__ */ function(e2) {
    return !!e2 && "object" == typeof e2;
  }(e) && !function(e2) {
    var t = Object.prototype.toString.call(e2);
    return "[object RegExp]" === t || "[object Date]" === t || function(e3) {
      return e3.$$typeof === Ne;
    }(e2);
  }(e);
};
var Ne = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;
function ze(e, t) {
  return false !== t.clone && t.isMergeableObject(e) ? Ue((n = e, Array.isArray(n) ? [] : {}), e, t) : e;
  var n;
}
function We(e, t, n) {
  return e.concat(t).map(function(e2) {
    return ze(e2, n);
  });
}
function Be(e) {
  return Object.keys(e).concat(function(e2) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e2).filter(function(t) {
      return Object.propertyIsEnumerable.call(e2, t);
    }) : [];
  }(e));
}
function Ge(e, t) {
  try {
    return t in e;
  } catch (e2) {
    return false;
  }
}
function Ve(e, t, n) {
  var o = {};
  return n.isMergeableObject(e) && Be(e).forEach(function(t2) {
    o[t2] = ze(e[t2], n);
  }), Be(t).forEach(function(a) {
    (function(e2, t2) {
      return Ge(e2, t2) && !(Object.hasOwnProperty.call(e2, t2) && Object.propertyIsEnumerable.call(e2, t2));
    })(e, a) || (Ge(e, a) && n.isMergeableObject(t[a]) ? o[a] = function(e2, t2) {
      if (!t2.customMerge) return Ue;
      var n2 = t2.customMerge(e2);
      return "function" == typeof n2 ? n2 : Ue;
    }(a, n)(e[a], t[a], n) : o[a] = ze(t[a], n));
  }), o;
}
function Ue(e, t, n) {
  (n = n || {}).arrayMerge = n.arrayMerge || We, n.isMergeableObject = n.isMergeableObject || _e, n.cloneUnlessOtherwiseSpecified = ze;
  var o = Array.isArray(t);
  return o === Array.isArray(e) ? o ? n.arrayMerge(e, t, n) : Ve(e, t, n) : ze(t, n);
}
Ue.all = function(e, t) {
  if (!Array.isArray(e)) throw new Error("first argument should be an array");
  return e.reduce(function(e2, n) {
    return Ue(e2, n, t);
  }, {});
};
var Ye = Ae(Ue);
const Ke = { text: { primary: "rgba(0, 0, 0, 0.87)", secondary: "rgba(0, 0, 0, 0.54)", disabled: "rgba(0, 0, 0, 0.38)" }, background: { default: "#FFFFFF" }, context: { background: "#e3f2fd", text: "rgba(0, 0, 0, 0.87)" }, divider: { default: "rgba(0,0,0,.12)" }, button: { default: "rgba(0,0,0,.54)", focus: "rgba(0,0,0,.12)", hover: "rgba(0,0,0,.12)", disabled: "rgba(0, 0, 0, .18)" }, selected: { default: "#e3f2fd", text: "rgba(0, 0, 0, 0.87)" }, highlightOnHover: { default: "#EEEEEE", text: "rgba(0, 0, 0, 0.87)" }, striped: { default: "#FAFAFA", text: "rgba(0, 0, 0, 0.87)" } }, qe = { default: Ke, light: Ke, dark: { text: { primary: "#FFFFFF", secondary: "rgba(255, 255, 255, 0.7)", disabled: "rgba(0,0,0,.12)" }, background: { default: "#424242" }, context: { background: "#E91E63", text: "#FFFFFF" }, divider: { default: "rgba(81, 81, 81, 1)" }, button: { default: "#FFFFFF", focus: "rgba(255, 255, 255, .54)", hover: "rgba(255, 255, 255, .12)", disabled: "rgba(255, 255, 255, .18)" }, selected: { default: "rgba(0, 0, 0, .7)", text: "#FFFFFF" }, highlightOnHover: { default: "rgba(0, 0, 0, .7)", text: "#FFFFFF" }, striped: { default: "rgba(0, 0, 0, .87)", text: "#FFFFFF" } } };
function Qe(t, n, o, a) {
  const [r2, i2] = reactExports.useState(() => d(t)), [s2, c2] = reactExports.useState(""), g2 = reactExports.useRef("");
  Le(() => {
    i2(d(t));
  }, [t]);
  const u2 = reactExports.useCallback((e) => {
    var t2, n2, o2;
    const { attributes: a2 } = e.target, l2 = null === (t2 = a2.getNamedItem("data-column-id")) || void 0 === t2 ? void 0 : t2.value;
    l2 && (g2.current = (null === (o2 = null === (n2 = r2[m(r2, l2)]) || void 0 === n2 ? void 0 : n2.id) || void 0 === o2 ? void 0 : o2.toString()) || "", c2(g2.current));
  }, [r2]), p2 = reactExports.useCallback((e) => {
    var t2;
    const { attributes: o2 } = e.target, a2 = null === (t2 = o2.getNamedItem("data-column-id")) || void 0 === t2 ? void 0 : t2.value;
    if (a2 && g2.current && a2 !== g2.current) {
      const e2 = m(r2, g2.current), t3 = m(r2, a2), o3 = [...r2];
      o3[e2] = r2[t3], o3[t3] = r2[e2], i2(o3), n(o3);
    }
  }, [n, r2]), b2 = reactExports.useCallback((e) => {
    e.preventDefault();
  }, []), h2 = reactExports.useCallback((e) => {
    e.preventDefault();
  }, []), w2 = reactExports.useCallback((e) => {
    e.preventDefault(), g2.current = "", c2("");
  }, []), f2 = function(e = false) {
    return e ? l.ASC : l.DESC;
  }(a), x2 = reactExports.useMemo(() => r2[m(r2, null == o ? void 0 : o.toString())] || {}, [o, r2]);
  return { tableColumns: r2, draggingColumnId: s2, handleDragStart: u2, handleDragEnter: p2, handleDragOver: b2, handleDragLeave: h2, handleDragEnd: w2, defaultSortDirection: f2, defaultSortColumn: x2 };
}
var Xe = reactExports.memo(function(t) {
  const { data: n = ke.data, columns: o = ke.columns, title: i2 = ke.title, actions: s2 = ke.actions, keyField: d2 = ke.keyField, striped: u2 = ke.striped, highlightOnHover: p2 = ke.highlightOnHover, pointerOnHover: m2 = ke.pointerOnHover, dense: h2 = ke.dense, selectableRows: f2 = ke.selectableRows, selectableRowsSingle: C2 = ke.selectableRowsSingle, selectableRowsHighlight: v2 = ke.selectableRowsHighlight, selectableRowsNoSelectAll: S2 = ke.selectableRowsNoSelectAll, selectableRowsVisibleOnly: E2 = ke.selectableRowsVisibleOnly, selectableRowSelected: O2 = ke.selectableRowSelected, selectableRowDisabled: k2 = ke.selectableRowDisabled, selectableRowsComponent: P2 = ke.selectableRowsComponent, selectableRowsComponentProps: D2 = ke.selectableRowsComponentProps, onRowExpandToggled: H2 = ke.onRowExpandToggled, onSelectedRowsChange: F2 = ke.onSelectedRowsChange, expandableIcon: j2 = ke.expandableIcon, onChangeRowsPerPage: I2 = ke.onChangeRowsPerPage, onChangePage: T2 = ke.onChangePage, paginationServer: M2 = ke.paginationServer, paginationServerOptions: L2 = ke.paginationServerOptions, paginationTotalRows: A2 = ke.paginationTotalRows, paginationDefaultPage: _2 = ke.paginationDefaultPage, paginationResetDefaultPage: N2 = ke.paginationResetDefaultPage, paginationPerPage: z2 = ke.paginationPerPage, paginationRowsPerPageOptions: W2 = ke.paginationRowsPerPageOptions, paginationIconLastPage: B2 = ke.paginationIconLastPage, paginationIconFirstPage: G2 = ke.paginationIconFirstPage, paginationIconNext: V2 = ke.paginationIconNext, paginationIconPrevious: U2 = ke.paginationIconPrevious, paginationComponent: Y2 = ke.paginationComponent, paginationComponentOptions: K2 = ke.paginationComponentOptions, responsive: J2 = ke.responsive, progressPending: Q2 = ke.progressPending, progressComponent: X2 = ke.progressComponent, persistTableHead: Z2 = ke.persistTableHead, noDataComponent: ee2 = ke.noDataComponent, disabled: te2 = ke.disabled, noTableHead: oe2 = ke.noTableHead, noHeader: le2 = ke.noHeader, fixedHeader: re2 = ke.fixedHeader, fixedHeaderScrollHeight: ie2 = ke.fixedHeaderScrollHeight, pagination: se2 = ke.pagination, subHeader: de2 = ke.subHeader, subHeaderAlign: ce2 = ke.subHeaderAlign, subHeaderWrap: ge2 = ke.subHeaderWrap, subHeaderComponent: ue2 = ke.subHeaderComponent, noContextMenu: be2 = ke.noContextMenu, contextMessage: me2 = ke.contextMessage, contextActions: he2 = ke.contextActions, contextComponent: Se2 = ke.contextComponent, expandableRows: Ee2 = ke.expandableRows, onRowClicked: Oe2 = ke.onRowClicked, onRowDoubleClicked: $e2 = ke.onRowDoubleClicked, onRowMouseEnter: Pe2 = ke.onRowMouseEnter, onRowMouseLeave: De2 = ke.onRowMouseLeave, sortIcon: He2 = ke.sortIcon, onSort: Fe2 = ke.onSort, sortFunction: je2 = ke.sortFunction, sortServer: Ie2 = ke.sortServer, expandableRowsComponent: Te2 = ke.expandableRowsComponent, expandableRowsComponentProps: Ae2 = ke.expandableRowsComponentProps, expandableRowDisabled: _e2 = ke.expandableRowDisabled, expandableRowsHideExpander: Ne2 = ke.expandableRowsHideExpander, expandOnRowClicked: ze2 = ke.expandOnRowClicked, expandOnRowDoubleClicked: We2 = ke.expandOnRowDoubleClicked, expandableRowExpanded: Be2 = ke.expandableRowExpanded, expandableInheritConditionalStyles: Ge2 = ke.expandableInheritConditionalStyles, defaultSortFieldId: Ve2 = ke.defaultSortFieldId, defaultSortAsc: Ue2 = ke.defaultSortAsc, clearSelectedRows: Ke2 = ke.clearSelectedRows, conditionalRowStyles: Je2 = ke.conditionalRowStyles, theme: Xe2 = ke.theme, customStyles: Ze2 = ke.customStyles, direction: et2 = ke.direction, onColumnOrderChange: tt = ke.onColumnOrderChange, className: nt } = t, { tableColumns: ot$1, draggingColumnId: at2, handleDragStart: lt2, handleDragEnter: rt2, handleDragOver: it2, handleDragLeave: st, handleDragEnd: dt2, defaultSortDirection: ct2, defaultSortColumn: gt } = Qe(o, tt, Ve2, Ue2), [{ rowsPerPage: ut2, currentPage: pt2, selectedRows: bt, allSelected: mt, selectedCount: ht, selectedColumn: wt, sortDirection: ft, toggleOnSelectedRowsChange: xt }, Ct] = reactExports.useReducer(w, { allSelected: false, selectedCount: 0, selectedRows: [], selectedColumn: gt, toggleOnSelectedRowsChange: false, sortDirection: ct2, currentPage: _2, rowsPerPage: z2, selectedRowsFlag: false, contextMessage: ke.contextMessage }), { persistSelectedOnSort: yt = false, persistSelectedOnPageChange: Rt = false } = L2, vt = !(!M2 || !Rt && !yt), St = se2 && !Q2 && n.length > 0, Et = Y2 || Me, Ot = reactExports.useMemo(() => ((e = {}, t2 = "default", n2 = "default") => {
    const o2 = qe[t2] ? t2 : n2;
    return Ye({ table: { style: { color: (a = qe[o2]).text.primary, backgroundColor: a.background.default } }, tableWrapper: { style: { display: "table" } }, responsiveWrapper: { style: {} }, header: { style: { fontSize: "22px", color: a.text.primary, backgroundColor: a.background.default, minHeight: "56px", paddingLeft: "16px", paddingRight: "8px" } }, subHeader: { style: { backgroundColor: a.background.default, minHeight: "52px" } }, head: { style: { color: a.text.primary, fontSize: "12px", fontWeight: 500 } }, headRow: { style: { backgroundColor: a.background.default, minHeight: "52px", borderBottomWidth: "1px", borderBottomColor: a.divider.default, borderBottomStyle: "solid" }, denseStyle: { minHeight: "32px" } }, headCells: { style: { paddingLeft: "16px", paddingRight: "16px" }, draggingStyle: { cursor: "move" } }, contextMenu: { style: { backgroundColor: a.context.background, fontSize: "18px", fontWeight: 400, color: a.context.text, paddingLeft: "16px", paddingRight: "8px", transform: "translate3d(0, -100%, 0)", transitionDuration: "125ms", transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)", willChange: "transform" }, activeStyle: { transform: "translate3d(0, 0, 0)" } }, cells: { style: { paddingLeft: "16px", paddingRight: "16px", wordBreak: "break-word" }, draggingStyle: {} }, rows: { style: { fontSize: "13px", fontWeight: 400, color: a.text.primary, backgroundColor: a.background.default, minHeight: "48px", "&:not(:last-of-type)": { borderBottomStyle: "solid", borderBottomWidth: "1px", borderBottomColor: a.divider.default } }, denseStyle: { minHeight: "32px" }, selectedHighlightStyle: { "&:nth-of-type(n)": { color: a.selected.text, backgroundColor: a.selected.default, borderBottomColor: a.background.default } }, highlightOnHoverStyle: { color: a.highlightOnHover.text, backgroundColor: a.highlightOnHover.default, transitionDuration: "0.15s", transitionProperty: "background-color", borderBottomColor: a.background.default, outlineStyle: "solid", outlineWidth: "1px", outlineColor: a.background.default }, stripedStyle: { color: a.striped.text, backgroundColor: a.striped.default } }, expanderRow: { style: { color: a.text.primary, backgroundColor: a.background.default } }, expanderCell: { style: { flex: "0 0 48px" } }, expanderButton: { style: { color: a.button.default, fill: a.button.default, backgroundColor: "transparent", borderRadius: "2px", transition: "0.25s", height: "100%", width: "100%", "&:hover:enabled": { cursor: "pointer" }, "&:disabled": { color: a.button.disabled }, "&:hover:not(:disabled)": { cursor: "pointer", backgroundColor: a.button.hover }, "&:focus": { outline: "none", backgroundColor: a.button.focus }, svg: { margin: "auto" } } }, pagination: { style: { color: a.text.secondary, fontSize: "13px", minHeight: "56px", backgroundColor: a.background.default, borderTopStyle: "solid", borderTopWidth: "1px", borderTopColor: a.divider.default }, pageButtonsStyle: { borderRadius: "50%", height: "40px", width: "40px", padding: "8px", margin: "px", cursor: "pointer", transition: "0.4s", color: a.button.default, fill: a.button.default, backgroundColor: "transparent", "&:disabled": { cursor: "unset", color: a.button.disabled, fill: a.button.disabled }, "&:hover:not(:disabled)": { backgroundColor: a.button.hover }, "&:focus": { outline: "none", backgroundColor: a.button.focus } } }, noData: { style: { display: "flex", alignItems: "center", justifyContent: "center", color: a.text.primary, backgroundColor: a.background.default } }, progress: { style: { display: "flex", alignItems: "center", justifyContent: "center", color: a.text.primary, backgroundColor: a.background.default } } }, e);
    var a;
  })(Ze2, Xe2), [Ze2, Xe2]), $t = reactExports.useMemo(() => Object.assign({}, "auto" !== et2 && { dir: et2 }), [et2]), kt = reactExports.useMemo(() => {
    if (Ie2) return n;
    if ((null == wt ? void 0 : wt.sortFunction) && "function" == typeof wt.sortFunction) {
      const e = wt.sortFunction, t2 = ft === l.ASC ? e : (t3, n2) => -1 * e(t3, n2);
      return [...n].sort(t2);
    }
    return function(e, t2, n2, o2) {
      return t2 ? o2 && "function" == typeof o2 ? o2(e.slice(0), t2, n2) : e.slice(0).sort((e2, o3) => {
        const a = t2(e2), l2 = t2(o3);
        if ("asc" === n2) {
          if (a < l2) return -1;
          if (a > l2) return 1;
        }
        if ("desc" === n2) {
          if (a > l2) return -1;
          if (a < l2) return 1;
        }
        return 0;
      }) : e;
    }(n, null == wt ? void 0 : wt.selector, ft, je2);
  }, [Ie2, wt, ft, n, je2]), Pt = reactExports.useMemo(() => {
    if (se2 && !M2) {
      const e = pt2 * ut2, t2 = e - ut2;
      return kt.slice(t2, e);
    }
    return kt;
  }, [pt2, se2, M2, ut2, kt]), Dt = reactExports.useCallback((e) => {
    Ct(e);
  }, []), Ht = reactExports.useCallback((e) => {
    Ct(e);
  }, []), Ft = reactExports.useCallback((e) => {
    Ct(e);
  }, []), jt = reactExports.useCallback((e, t2) => Oe2(e, t2), [Oe2]), It = reactExports.useCallback((e, t2) => $e2(e, t2), [$e2]), Tt = reactExports.useCallback((e, t2) => Pe2(e, t2), [Pe2]), Mt = reactExports.useCallback((e, t2) => De2(e, t2), [De2]), Lt = reactExports.useCallback((e) => Ct({ type: "CHANGE_PAGE", page: e, paginationServer: M2, visibleOnly: E2, persistSelectedOnPageChange: Rt }), [M2, Rt, E2]), At = reactExports.useCallback((e) => {
    const t2 = c(A2 || Pt.length, e), n2 = g(pt2, t2);
    M2 || Lt(n2), Ct({ type: "CHANGE_ROWS_PER_PAGE", page: n2, rowsPerPage: e });
  }, [pt2, Lt, M2, A2, Pt.length]);
  if (se2 && !M2 && kt.length > 0 && 0 === Pt.length) {
    const e = c(kt.length, ut2), t2 = g(pt2, e);
    Lt(t2);
  }
  Le(() => {
    F2({ allSelected: mt, selectedCount: ht, selectedRows: bt.slice(0) });
  }, [xt]), Le(() => {
    Fe2(wt, ft, kt.slice(0));
  }, [wt, ft]), Le(() => {
    T2(pt2, A2 || kt.length);
  }, [pt2]), Le(() => {
    I2(ut2, pt2);
  }, [ut2]), Le(() => {
    Lt(_2);
  }, [_2, N2]), Le(() => {
    if (se2 && M2 && A2 > 0) {
      const e = c(A2, ut2), t2 = g(pt2, e);
      pt2 !== t2 && Lt(t2);
    }
  }, [A2]), reactExports.useEffect(() => {
    Ct({ type: "CLEAR_SELECTED_ROWS", selectedRowsFlag: Ke2 });
  }, [C2, Ke2]), reactExports.useEffect(() => {
    if (!O2) return;
    const e = kt.filter((e2) => O2(e2)), t2 = C2 ? e.slice(0, 1) : e;
    Ct({ type: "SELECT_MULTIPLE_ROWS", keyField: d2, selectedRows: t2, totalRows: kt.length, mergeSelections: vt });
  }, [n, O2]);
  const _t = E2 ? Pt : kt, Nt = Rt || C2 || S2;
  return reactExports.createElement(ot, { theme: Ot }, !le2 && (!!i2 || !!s2) && reactExports.createElement(pe, { title: i2, actions: s2, showMenu: !be2, selectedCount: ht, direction: et2, contextActions: he2, contextComponent: Se2, contextMessage: me2 }), de2 && reactExports.createElement(we, { align: ce2, wrapContent: ge2 }, ue2), reactExports.createElement(xe, Object.assign({ $responsive: J2, $fixedHeader: re2, $fixedHeaderScrollHeight: ie2, className: nt }, $t), reactExports.createElement(ye, null, Q2 && !Z2 && reactExports.createElement(Ce, null, X2), reactExports.createElement(x, { disabled: te2, className: "rdt_Table", role: "table" }, !oe2 && (!!Z2 || kt.length > 0 && !Q2) && reactExports.createElement(y, { className: "rdt_TableHead", role: "rowgroup", $fixedHeader: re2 }, reactExports.createElement(R, { className: "rdt_TableHeadRow", role: "row", $dense: h2 }, f2 && (Nt ? reactExports.createElement($, { style: { flex: "0 0 48px" } }) : reactExports.createElement(ae, { allSelected: mt, selectedRows: bt, selectableRowsComponent: P2, selectableRowsComponentProps: D2, selectableRowDisabled: k2, rowData: _t, keyField: d2, mergeSelections: vt, onSelectAllRows: Ht })), Ee2 && !Ne2 && reactExports.createElement(Re, null), ot$1.map((t2) => reactExports.createElement(ne, { key: t2.id, column: t2, selectedColumn: wt, disabled: Q2 || 0 === kt.length, pagination: se2, paginationServer: M2, persistSelectedOnSort: yt, selectableRowsVisibleOnly: E2, sortDirection: ft, sortIcon: He2, sortServer: Ie2, onSort: Dt, onDragStart: lt2, onDragOver: it2, onDragEnd: dt2, onDragEnter: rt2, onDragLeave: st, draggingColumnId: at2 })))), !kt.length && !Q2 && reactExports.createElement(ve, null, ee2), Q2 && Z2 && reactExports.createElement(Ce, null, X2), !Q2 && kt.length > 0 && reactExports.createElement(fe, { className: "rdt_TableBody", role: "rowgroup" }, Pt.map((t2, n2) => {
    const o2 = r(t2, d2), a = function(e = "") {
      return "number" != typeof e && (!e || 0 === e.length);
    }(o2) ? n2 : o2, l2 = b(t2, bt, d2), i3 = !!(Ee2 && Be2 && Be2(t2)), s3 = !!(Ee2 && _e2 && _e2(t2));
    return reactExports.createElement(q, { id: a, key: a, keyField: d2, "data-row-id": a, columns: ot$1, row: t2, rowCount: kt.length, rowIndex: n2, selectableRows: f2, expandableRows: Ee2, expandableIcon: j2, highlightOnHover: p2, pointerOnHover: m2, dense: h2, expandOnRowClicked: ze2, expandOnRowDoubleClicked: We2, expandableRowsComponent: Te2, expandableRowsComponentProps: Ae2, expandableRowsHideExpander: Ne2, defaultExpanderDisabled: s3, defaultExpanded: i3, expandableInheritConditionalStyles: Ge2, conditionalRowStyles: Je2, selected: l2, selectableRowsHighlight: v2, selectableRowsComponent: P2, selectableRowsComponentProps: D2, selectableRowDisabled: k2, selectableRowsSingle: C2, striped: u2, onRowExpandToggled: H2, onRowClicked: jt, onRowDoubleClicked: It, onRowMouseEnter: Tt, onRowMouseLeave: Mt, onSelectedRow: Ft, draggingColumnId: at2, onDragStart: lt2, onDragOver: it2, onDragEnd: dt2, onDragEnter: rt2, onDragLeave: st });
  }))))), St && reactExports.createElement("div", null, reactExports.createElement(Et, { onChangePage: Lt, onChangeRowsPerPage: At, rowCount: A2 || kt.length, currentPage: pt2, rowsPerPage: ut2, direction: et2, paginationRowsPerPageOptions: W2, paginationIconLastPage: B2, paginationIconFirstPage: G2, paginationIconNext: V2, paginationIconPrevious: U2, paginationComponentOptions: K2 })));
});
const ReblDataTable = ({
  columns,
  data,
  onRowClicked,
  isLoading
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Xe,
    {
      columns,
      noDataComponent: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "m-10 text-center w-100", children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "m-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { loading: true }) }),
        !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileUnknownIcon, { className: "mx-auto", height: 40, width: 40 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm  text-gray-900", children: "لا توجد بيانات لعرضها" })
        ] })
      ] }),
      data,
      customStyles,
      highlightOnHover: true,
      pointerOnHover: true,
      onRowClicked
    }
  );
};
const customStyles = {
  headRow: {
    style: {
      border: "none"
    }
  },
  headCells: {
    style: {
      color: "#202124",
      fontSize: "14px"
    }
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "4px",
      outline: "1px solid #FFFFFF"
    }
  },
  pagination: {
    style: {
      border: "none"
    }
  }
};
const ReviewCreatedRequests = () => {
  const [reports, setReports] = reactExports.useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const basePath = currentLanguage == "ar" ? "/media-center/complaints" : "/en/media-center/complaints";
  reactExports.useEffect(() => {
    ApiService.listCreatedRequests().then((response) => {
      setReports(
        response.data.requests.map((r2) => ({
          id: r2.id.toString(),
          created_at: r2.reportedDate,
          last_update: r2.lastUpdateDate,
          status: r2.statusName
        }))
      );
    }).finally(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    });
  }, []);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const getStatusColor = (status) => {
    switch (status) {
      case "مفتوحة":
        return "bg-primary";
      case "مغلقة":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };
  const columns = [
    {
      cell: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Folder02Icon,
        {
          style: { fill: "#43a047", width: 50, height: 50 },
          width: 70,
          height: 70
        }
      ),
      width: "56px",
      // custom width for icon button
      style: {
        borderBottom: "1px solid #FFFFFF",
        marginBottom: "-1px"
      }
    },
    {
      name: t("ticket_number"),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      selector: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "m-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge text-bg-light", children: row.id }) }),
      sortable: true,
      style: {
        color: "#202124",
        fontSize: "14px",
        fontWeight: 500
      }
    },
    {
      name: t("created_at"),
      cell: (row) => new Date(row.created_at).toLocaleDateString(),
      sortable: true,
      style: {
        color: "rgba(0,0,0,.54)",
        minWidth: 200,
        textAlign: "center"
      }
    },
    {
      name: t("last_update"),
      cell: (row) => new Date(row.last_update).toLocaleDateString(),
      sortable: true,
      style: {
        color: "rgba(0,0,0,.54)",
        minWidth: 200,
        textAlign: "center"
      }
    },
    {
      name: t("status"),
      cell: (row) => /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "m-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${getStatusColor(row.status)}`, children: row.status }) }),
      sortable: true,
      style: {
        color: "rgba(0,0,0,.54)"
      }
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "title h5 mb-4", children: t("previous_tickets") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReblDataTable,
      {
        isLoading,
        columns,
        data: reports,
        onRowClicked: (row) => {
          navigate(basePath + "/view-request", {
            state: { requestID: row.id }
          });
        }
      }
    ) }) })
  ] });
};
export {
  ReviewCreatedRequests as default
};
