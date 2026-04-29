#!/usr/bin/env node
import { createRequire } from "node:module";
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
    var cached = cache.get(mod);
    if (cached)
      return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: __accessProp.bind(mod, key),
        enumerable: true
      });
  if (canCache)
    cache.set(mod, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = /* @__PURE__ */ createRequire(import.meta.url);

// ../../node_modules/.bun/esprima@4.0.1/node_modules/esprima/dist/esprima.js
var require_esprima = __commonJS((exports, module) => {
  (function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object")
      module.exports = factory();
    else if (typeof define === "function" && define.amd)
      define([], factory);
    else if (typeof exports === "object")
      exports["esprima"] = factory();
    else
      root["esprima"] = factory();
  })(exports, function() {
    return function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId])
          return installedModules[moduleId].exports;
        var module2 = installedModules[moduleId] = {
          exports: {},
          id: moduleId,
          loaded: false
        };
        modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
        module2.loaded = true;
        return module2.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.p = "";
      return __webpack_require__(0);
    }([
      function(module2, exports2, __webpack_require__) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        var comment_handler_1 = __webpack_require__(1);
        var jsx_parser_1 = __webpack_require__(3);
        var parser_1 = __webpack_require__(8);
        var tokenizer_1 = __webpack_require__(15);
        function parse(code, options, delegate) {
          var commentHandler = null;
          var proxyDelegate = function(node, metadata) {
            if (delegate) {
              delegate(node, metadata);
            }
            if (commentHandler) {
              commentHandler.visit(node, metadata);
            }
          };
          var parserDelegate = typeof delegate === "function" ? proxyDelegate : null;
          var collectComment = false;
          if (options) {
            collectComment = typeof options.comment === "boolean" && options.comment;
            var attachComment = typeof options.attachComment === "boolean" && options.attachComment;
            if (collectComment || attachComment) {
              commentHandler = new comment_handler_1.CommentHandler;
              commentHandler.attach = attachComment;
              options.comment = true;
              parserDelegate = proxyDelegate;
            }
          }
          var isModule = false;
          if (options && typeof options.sourceType === "string") {
            isModule = options.sourceType === "module";
          }
          var parser;
          if (options && typeof options.jsx === "boolean" && options.jsx) {
            parser = new jsx_parser_1.JSXParser(code, options, parserDelegate);
          } else {
            parser = new parser_1.Parser(code, options, parserDelegate);
          }
          var program = isModule ? parser.parseModule() : parser.parseScript();
          var ast = program;
          if (collectComment && commentHandler) {
            ast.comments = commentHandler.comments;
          }
          if (parser.config.tokens) {
            ast.tokens = parser.tokens;
          }
          if (parser.config.tolerant) {
            ast.errors = parser.errorHandler.errors;
          }
          return ast;
        }
        exports2.parse = parse;
        function parseModule(code, options, delegate) {
          var parsingOptions = options || {};
          parsingOptions.sourceType = "module";
          return parse(code, parsingOptions, delegate);
        }
        exports2.parseModule = parseModule;
        function parseScript(code, options, delegate) {
          var parsingOptions = options || {};
          parsingOptions.sourceType = "script";
          return parse(code, parsingOptions, delegate);
        }
        exports2.parseScript = parseScript;
        function tokenize(code, options, delegate) {
          var tokenizer = new tokenizer_1.Tokenizer(code, options);
          var tokens;
          tokens = [];
          try {
            while (true) {
              var token = tokenizer.getNextToken();
              if (!token) {
                break;
              }
              if (delegate) {
                token = delegate(token);
              }
              tokens.push(token);
            }
          } catch (e) {
            tokenizer.errorHandler.tolerate(e);
          }
          if (tokenizer.errorHandler.tolerant) {
            tokens.errors = tokenizer.errors();
          }
          return tokens;
        }
        exports2.tokenize = tokenize;
        var syntax_1 = __webpack_require__(2);
        exports2.Syntax = syntax_1.Syntax;
        exports2.version = "4.0.1";
      },
      function(module2, exports2, __webpack_require__) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        var syntax_1 = __webpack_require__(2);
        var CommentHandler = function() {
          function CommentHandler2() {
            this.attach = false;
            this.comments = [];
            this.stack = [];
            this.leading = [];
            this.trailing = [];
          }
          CommentHandler2.prototype.insertInnerComments = function(node, metadata) {
            if (node.type === syntax_1.Syntax.BlockStatement && node.body.length === 0) {
              var innerComments = [];
              for (var i = this.leading.length - 1;i >= 0; --i) {
                var entry = this.leading[i];
                if (metadata.end.offset >= entry.start) {
                  innerComments.unshift(entry.comment);
                  this.leading.splice(i, 1);
                  this.trailing.splice(i, 1);
                }
              }
              if (innerComments.length) {
                node.innerComments = innerComments;
              }
            }
          };
          CommentHandler2.prototype.findTrailingComments = function(metadata) {
            var trailingComments = [];
            if (this.trailing.length > 0) {
              for (var i = this.trailing.length - 1;i >= 0; --i) {
                var entry_1 = this.trailing[i];
                if (entry_1.start >= metadata.end.offset) {
                  trailingComments.unshift(entry_1.comment);
                }
              }
              this.trailing.length = 0;
              return trailingComments;
            }
            var entry = this.stack[this.stack.length - 1];
            if (entry && entry.node.trailingComments) {
              var firstComment = entry.node.trailingComments[0];
              if (firstComment && firstComment.range[0] >= metadata.end.offset) {
                trailingComments = entry.node.trailingComments;
                delete entry.node.trailingComments;
              }
            }
            return trailingComments;
          };
          CommentHandler2.prototype.findLeadingComments = function(metadata) {
            var leadingComments = [];
            var target;
            while (this.stack.length > 0) {
              var entry = this.stack[this.stack.length - 1];
              if (entry && entry.start >= metadata.start.offset) {
                target = entry.node;
                this.stack.pop();
              } else {
                break;
              }
            }
            if (target) {
              var count = target.leadingComments ? target.leadingComments.length : 0;
              for (var i = count - 1;i >= 0; --i) {
                var comment = target.leadingComments[i];
                if (comment.range[1] <= metadata.start.offset) {
                  leadingComments.unshift(comment);
                  target.leadingComments.splice(i, 1);
                }
              }
              if (target.leadingComments && target.leadingComments.length === 0) {
                delete target.leadingComments;
              }
              return leadingComments;
            }
            for (var i = this.leading.length - 1;i >= 0; --i) {
              var entry = this.leading[i];
              if (entry.start <= metadata.start.offset) {
                leadingComments.unshift(entry.comment);
                this.leading.splice(i, 1);
              }
            }
            return leadingComments;
          };
          CommentHandler2.prototype.visitNode = function(node, metadata) {
            if (node.type === syntax_1.Syntax.Program && node.body.length > 0) {
              return;
            }
            this.insertInnerComments(node, metadata);
            var trailingComments = this.findTrailingComments(metadata);
            var leadingComments = this.findLeadingComments(metadata);
            if (leadingComments.length > 0) {
              node.leadingComments = leadingComments;
            }
            if (trailingComments.length > 0) {
              node.trailingComments = trailingComments;
            }
            this.stack.push({
              node,
              start: metadata.start.offset
            });
          };
          CommentHandler2.prototype.visitComment = function(node, metadata) {
            var type = node.type[0] === "L" ? "Line" : "Block";
            var comment = {
              type,
              value: node.value
            };
            if (node.range) {
              comment.range = node.range;
            }
            if (node.loc) {
              comment.loc = node.loc;
            }
            this.comments.push(comment);
            if (this.attach) {
              var entry = {
                comment: {
                  type,
                  value: node.value,
                  range: [metadata.start.offset, metadata.end.offset]
                },
                start: metadata.start.offset
              };
              if (node.loc) {
                entry.comment.loc = node.loc;
              }
              node.type = type;
              this.leading.push(entry);
              this.trailing.push(entry);
            }
          };
          CommentHandler2.prototype.visit = function(node, metadata) {
            if (node.type === "LineComment") {
              this.visitComment(node, metadata);
            } else if (node.type === "BlockComment") {
              this.visitComment(node, metadata);
            } else if (this.attach) {
              this.visitNode(node, metadata);
            }
          };
          return CommentHandler2;
        }();
        exports2.CommentHandler = CommentHandler;
      },
      function(module2, exports2) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.Syntax = {
          AssignmentExpression: "AssignmentExpression",
          AssignmentPattern: "AssignmentPattern",
          ArrayExpression: "ArrayExpression",
          ArrayPattern: "ArrayPattern",
          ArrowFunctionExpression: "ArrowFunctionExpression",
          AwaitExpression: "AwaitExpression",
          BlockStatement: "BlockStatement",
          BinaryExpression: "BinaryExpression",
          BreakStatement: "BreakStatement",
          CallExpression: "CallExpression",
          CatchClause: "CatchClause",
          ClassBody: "ClassBody",
          ClassDeclaration: "ClassDeclaration",
          ClassExpression: "ClassExpression",
          ConditionalExpression: "ConditionalExpression",
          ContinueStatement: "ContinueStatement",
          DoWhileStatement: "DoWhileStatement",
          DebuggerStatement: "DebuggerStatement",
          EmptyStatement: "EmptyStatement",
          ExportAllDeclaration: "ExportAllDeclaration",
          ExportDefaultDeclaration: "ExportDefaultDeclaration",
          ExportNamedDeclaration: "ExportNamedDeclaration",
          ExportSpecifier: "ExportSpecifier",
          ExpressionStatement: "ExpressionStatement",
          ForStatement: "ForStatement",
          ForOfStatement: "ForOfStatement",
          ForInStatement: "ForInStatement",
          FunctionDeclaration: "FunctionDeclaration",
          FunctionExpression: "FunctionExpression",
          Identifier: "Identifier",
          IfStatement: "IfStatement",
          ImportDeclaration: "ImportDeclaration",
          ImportDefaultSpecifier: "ImportDefaultSpecifier",
          ImportNamespaceSpecifier: "ImportNamespaceSpecifier",
          ImportSpecifier: "ImportSpecifier",
          Literal: "Literal",
          LabeledStatement: "LabeledStatement",
          LogicalExpression: "LogicalExpression",
          MemberExpression: "MemberExpression",
          MetaProperty: "MetaProperty",
          MethodDefinition: "MethodDefinition",
          NewExpression: "NewExpression",
          ObjectExpression: "ObjectExpression",
          ObjectPattern: "ObjectPattern",
          Program: "Program",
          Property: "Property",
          RestElement: "RestElement",
          ReturnStatement: "ReturnStatement",
          SequenceExpression: "SequenceExpression",
          SpreadElement: "SpreadElement",
          Super: "Super",
          SwitchCase: "SwitchCase",
          SwitchStatement: "SwitchStatement",
          TaggedTemplateExpression: "TaggedTemplateExpression",
          TemplateElement: "TemplateElement",
          TemplateLiteral: "TemplateLiteral",
          ThisExpression: "ThisExpression",
          ThrowStatement: "ThrowStatement",
          TryStatement: "TryStatement",
          UnaryExpression: "UnaryExpression",
          UpdateExpression: "UpdateExpression",
          VariableDeclaration: "VariableDeclaration",
          VariableDeclarator: "VariableDeclarator",
          WhileStatement: "WhileStatement",
          WithStatement: "WithStatement",
          YieldExpression: "YieldExpression"
        };
      },
      function(module2, exports2, __webpack_require__) {
        var __extends = this && this.__extends || function() {
          var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
            d.__proto__ = b;
          } || function(d, b) {
            for (var p in b)
              if (b.hasOwnProperty(p))
                d[p] = b[p];
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __);
          };
        }();
        Object.defineProperty(exports2, "__esModule", { value: true });
        var character_1 = __webpack_require__(4);
        var JSXNode = __webpack_require__(5);
        var jsx_syntax_1 = __webpack_require__(6);
        var Node = __webpack_require__(7);
        var parser_1 = __webpack_require__(8);
        var token_1 = __webpack_require__(13);
        var xhtml_entities_1 = __webpack_require__(14);
        token_1.TokenName[100] = "JSXIdentifier";
        token_1.TokenName[101] = "JSXText";
        function getQualifiedElementName(elementName) {
          var qualifiedName;
          switch (elementName.type) {
            case jsx_syntax_1.JSXSyntax.JSXIdentifier:
              var id = elementName;
              qualifiedName = id.name;
              break;
            case jsx_syntax_1.JSXSyntax.JSXNamespacedName:
              var ns = elementName;
              qualifiedName = getQualifiedElementName(ns.namespace) + ":" + getQualifiedElementName(ns.name);
              break;
            case jsx_syntax_1.JSXSyntax.JSXMemberExpression:
              var expr = elementName;
              qualifiedName = getQualifiedElementName(expr.object) + "." + getQualifiedElementName(expr.property);
              break;
            default:
              break;
          }
          return qualifiedName;
        }
        var JSXParser = function(_super) {
          __extends(JSXParser2, _super);
          function JSXParser2(code, options, delegate) {
            return _super.call(this, code, options, delegate) || this;
          }
          JSXParser2.prototype.parsePrimaryExpression = function() {
            return this.match("<") ? this.parseJSXRoot() : _super.prototype.parsePrimaryExpression.call(this);
          };
          JSXParser2.prototype.startJSX = function() {
            this.scanner.index = this.startMarker.index;
            this.scanner.lineNumber = this.startMarker.line;
            this.scanner.lineStart = this.startMarker.index - this.startMarker.column;
          };
          JSXParser2.prototype.finishJSX = function() {
            this.nextToken();
          };
          JSXParser2.prototype.reenterJSX = function() {
            this.startJSX();
            this.expectJSX("}");
            if (this.config.tokens) {
              this.tokens.pop();
            }
          };
          JSXParser2.prototype.createJSXNode = function() {
            this.collectComments();
            return {
              index: this.scanner.index,
              line: this.scanner.lineNumber,
              column: this.scanner.index - this.scanner.lineStart
            };
          };
          JSXParser2.prototype.createJSXChildNode = function() {
            return {
              index: this.scanner.index,
              line: this.scanner.lineNumber,
              column: this.scanner.index - this.scanner.lineStart
            };
          };
          JSXParser2.prototype.scanXHTMLEntity = function(quote) {
            var result = "&";
            var valid = true;
            var terminated = false;
            var numeric = false;
            var hex = false;
            while (!this.scanner.eof() && valid && !terminated) {
              var ch = this.scanner.source[this.scanner.index];
              if (ch === quote) {
                break;
              }
              terminated = ch === ";";
              result += ch;
              ++this.scanner.index;
              if (!terminated) {
                switch (result.length) {
                  case 2:
                    numeric = ch === "#";
                    break;
                  case 3:
                    if (numeric) {
                      hex = ch === "x";
                      valid = hex || character_1.Character.isDecimalDigit(ch.charCodeAt(0));
                      numeric = numeric && !hex;
                    }
                    break;
                  default:
                    valid = valid && !(numeric && !character_1.Character.isDecimalDigit(ch.charCodeAt(0)));
                    valid = valid && !(hex && !character_1.Character.isHexDigit(ch.charCodeAt(0)));
                    break;
                }
              }
            }
            if (valid && terminated && result.length > 2) {
              var str = result.substr(1, result.length - 2);
              if (numeric && str.length > 1) {
                result = String.fromCharCode(parseInt(str.substr(1), 10));
              } else if (hex && str.length > 2) {
                result = String.fromCharCode(parseInt("0" + str.substr(1), 16));
              } else if (!numeric && !hex && xhtml_entities_1.XHTMLEntities[str]) {
                result = xhtml_entities_1.XHTMLEntities[str];
              }
            }
            return result;
          };
          JSXParser2.prototype.lexJSX = function() {
            var cp = this.scanner.source.charCodeAt(this.scanner.index);
            if (cp === 60 || cp === 62 || cp === 47 || cp === 58 || cp === 61 || cp === 123 || cp === 125) {
              var value = this.scanner.source[this.scanner.index++];
              return {
                type: 7,
                value,
                lineNumber: this.scanner.lineNumber,
                lineStart: this.scanner.lineStart,
                start: this.scanner.index - 1,
                end: this.scanner.index
              };
            }
            if (cp === 34 || cp === 39) {
              var start = this.scanner.index;
              var quote = this.scanner.source[this.scanner.index++];
              var str = "";
              while (!this.scanner.eof()) {
                var ch = this.scanner.source[this.scanner.index++];
                if (ch === quote) {
                  break;
                } else if (ch === "&") {
                  str += this.scanXHTMLEntity(quote);
                } else {
                  str += ch;
                }
              }
              return {
                type: 8,
                value: str,
                lineNumber: this.scanner.lineNumber,
                lineStart: this.scanner.lineStart,
                start,
                end: this.scanner.index
              };
            }
            if (cp === 46) {
              var n1 = this.scanner.source.charCodeAt(this.scanner.index + 1);
              var n2 = this.scanner.source.charCodeAt(this.scanner.index + 2);
              var value = n1 === 46 && n2 === 46 ? "..." : ".";
              var start = this.scanner.index;
              this.scanner.index += value.length;
              return {
                type: 7,
                value,
                lineNumber: this.scanner.lineNumber,
                lineStart: this.scanner.lineStart,
                start,
                end: this.scanner.index
              };
            }
            if (cp === 96) {
              return {
                type: 10,
                value: "",
                lineNumber: this.scanner.lineNumber,
                lineStart: this.scanner.lineStart,
                start: this.scanner.index,
                end: this.scanner.index
              };
            }
            if (character_1.Character.isIdentifierStart(cp) && cp !== 92) {
              var start = this.scanner.index;
              ++this.scanner.index;
              while (!this.scanner.eof()) {
                var ch = this.scanner.source.charCodeAt(this.scanner.index);
                if (character_1.Character.isIdentifierPart(ch) && ch !== 92) {
                  ++this.scanner.index;
                } else if (ch === 45) {
                  ++this.scanner.index;
                } else {
                  break;
                }
              }
              var id = this.scanner.source.slice(start, this.scanner.index);
              return {
                type: 100,
                value: id,
                lineNumber: this.scanner.lineNumber,
                lineStart: this.scanner.lineStart,
                start,
                end: this.scanner.index
              };
            }
            return this.scanner.lex();
          };
          JSXParser2.prototype.nextJSXToken = function() {
            this.collectComments();
            this.startMarker.index = this.scanner.index;
            this.startMarker.line = this.scanner.lineNumber;
            this.startMarker.column = this.scanner.index - this.scanner.lineStart;
            var token = this.lexJSX();
            this.lastMarker.index = this.scanner.index;
            this.lastMarker.line = this.scanner.lineNumber;
            this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
            if (this.config.tokens) {
              this.tokens.push(this.convertToken(token));
            }
            return token;
          };
          JSXParser2.prototype.nextJSXText = function() {
            this.startMarker.index = this.scanner.index;
            this.startMarker.line = this.scanner.lineNumber;
            this.startMarker.column = this.scanner.index - this.scanner.lineStart;
            var start = this.scanner.index;
            var text = "";
            while (!this.scanner.eof()) {
              var ch = this.scanner.source[this.scanner.index];
              if (ch === "{" || ch === "<") {
                break;
              }
              ++this.scanner.index;
              text += ch;
              if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                ++this.scanner.lineNumber;
                if (ch === "\r" && this.scanner.source[this.scanner.index] === `
`) {
                  ++this.scanner.index;
                }
                this.scanner.lineStart = this.scanner.index;
              }
            }
            this.lastMarker.index = this.scanner.index;
            this.lastMarker.line = this.scanner.lineNumber;
            this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
            var token = {
              type: 101,
              value: text,
              lineNumber: this.scanner.lineNumber,
              lineStart: this.scanner.lineStart,
              start,
              end: this.scanner.index
            };
            if (text.length > 0 && this.config.tokens) {
              this.tokens.push(this.convertToken(token));
            }
            return token;
          };
          JSXParser2.prototype.peekJSXToken = function() {
            var state = this.scanner.saveState();
            this.scanner.scanComments();
            var next = this.lexJSX();
            this.scanner.restoreState(state);
            return next;
          };
          JSXParser2.prototype.expectJSX = function(value) {
            var token = this.nextJSXToken();
            if (token.type !== 7 || token.value !== value) {
              this.throwUnexpectedToken(token);
            }
          };
          JSXParser2.prototype.matchJSX = function(value) {
            var next = this.peekJSXToken();
            return next.type === 7 && next.value === value;
          };
          JSXParser2.prototype.parseJSXIdentifier = function() {
            var node = this.createJSXNode();
            var token = this.nextJSXToken();
            if (token.type !== 100) {
              this.throwUnexpectedToken(token);
            }
            return this.finalize(node, new JSXNode.JSXIdentifier(token.value));
          };
          JSXParser2.prototype.parseJSXElementName = function() {
            var node = this.createJSXNode();
            var elementName = this.parseJSXIdentifier();
            if (this.matchJSX(":")) {
              var namespace = elementName;
              this.expectJSX(":");
              var name_1 = this.parseJSXIdentifier();
              elementName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_1));
            } else if (this.matchJSX(".")) {
              while (this.matchJSX(".")) {
                var object = elementName;
                this.expectJSX(".");
                var property = this.parseJSXIdentifier();
                elementName = this.finalize(node, new JSXNode.JSXMemberExpression(object, property));
              }
            }
            return elementName;
          };
          JSXParser2.prototype.parseJSXAttributeName = function() {
            var node = this.createJSXNode();
            var attributeName;
            var identifier = this.parseJSXIdentifier();
            if (this.matchJSX(":")) {
              var namespace = identifier;
              this.expectJSX(":");
              var name_2 = this.parseJSXIdentifier();
              attributeName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_2));
            } else {
              attributeName = identifier;
            }
            return attributeName;
          };
          JSXParser2.prototype.parseJSXStringLiteralAttribute = function() {
            var node = this.createJSXNode();
            var token = this.nextJSXToken();
            if (token.type !== 8) {
              this.throwUnexpectedToken(token);
            }
            var raw = this.getTokenRaw(token);
            return this.finalize(node, new Node.Literal(token.value, raw));
          };
          JSXParser2.prototype.parseJSXExpressionAttribute = function() {
            var node = this.createJSXNode();
            this.expectJSX("{");
            this.finishJSX();
            if (this.match("}")) {
              this.tolerateError("JSX attributes must only be assigned a non-empty expression");
            }
            var expression = this.parseAssignmentExpression();
            this.reenterJSX();
            return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
          };
          JSXParser2.prototype.parseJSXAttributeValue = function() {
            return this.matchJSX("{") ? this.parseJSXExpressionAttribute() : this.matchJSX("<") ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
          };
          JSXParser2.prototype.parseJSXNameValueAttribute = function() {
            var node = this.createJSXNode();
            var name = this.parseJSXAttributeName();
            var value = null;
            if (this.matchJSX("=")) {
              this.expectJSX("=");
              value = this.parseJSXAttributeValue();
            }
            return this.finalize(node, new JSXNode.JSXAttribute(name, value));
          };
          JSXParser2.prototype.parseJSXSpreadAttribute = function() {
            var node = this.createJSXNode();
            this.expectJSX("{");
            this.expectJSX("...");
            this.finishJSX();
            var argument = this.parseAssignmentExpression();
            this.reenterJSX();
            return this.finalize(node, new JSXNode.JSXSpreadAttribute(argument));
          };
          JSXParser2.prototype.parseJSXAttributes = function() {
            var attributes = [];
            while (!this.matchJSX("/") && !this.matchJSX(">")) {
              var attribute = this.matchJSX("{") ? this.parseJSXSpreadAttribute() : this.parseJSXNameValueAttribute();
              attributes.push(attribute);
            }
            return attributes;
          };
          JSXParser2.prototype.parseJSXOpeningElement = function() {
            var node = this.createJSXNode();
            this.expectJSX("<");
            var name = this.parseJSXElementName();
            var attributes = this.parseJSXAttributes();
            var selfClosing = this.matchJSX("/");
            if (selfClosing) {
              this.expectJSX("/");
            }
            this.expectJSX(">");
            return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
          };
          JSXParser2.prototype.parseJSXBoundaryElement = function() {
            var node = this.createJSXNode();
            this.expectJSX("<");
            if (this.matchJSX("/")) {
              this.expectJSX("/");
              var name_3 = this.parseJSXElementName();
              this.expectJSX(">");
              return this.finalize(node, new JSXNode.JSXClosingElement(name_3));
            }
            var name = this.parseJSXElementName();
            var attributes = this.parseJSXAttributes();
            var selfClosing = this.matchJSX("/");
            if (selfClosing) {
              this.expectJSX("/");
            }
            this.expectJSX(">");
            return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
          };
          JSXParser2.prototype.parseJSXEmptyExpression = function() {
            var node = this.createJSXChildNode();
            this.collectComments();
            this.lastMarker.index = this.scanner.index;
            this.lastMarker.line = this.scanner.lineNumber;
            this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
            return this.finalize(node, new JSXNode.JSXEmptyExpression);
          };
          JSXParser2.prototype.parseJSXExpressionContainer = function() {
            var node = this.createJSXNode();
            this.expectJSX("{");
            var expression;
            if (this.matchJSX("}")) {
              expression = this.parseJSXEmptyExpression();
              this.expectJSX("}");
            } else {
              this.finishJSX();
              expression = this.parseAssignmentExpression();
              this.reenterJSX();
            }
            return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
          };
          JSXParser2.prototype.parseJSXChildren = function() {
            var children = [];
            while (!this.scanner.eof()) {
              var node = this.createJSXChildNode();
              var token = this.nextJSXText();
              if (token.start < token.end) {
                var raw = this.getTokenRaw(token);
                var child = this.finalize(node, new JSXNode.JSXText(token.value, raw));
                children.push(child);
              }
              if (this.scanner.source[this.scanner.index] === "{") {
                var container = this.parseJSXExpressionContainer();
                children.push(container);
              } else {
                break;
              }
            }
            return children;
          };
          JSXParser2.prototype.parseComplexJSXElement = function(el) {
            var stack = [];
            while (!this.scanner.eof()) {
              el.children = el.children.concat(this.parseJSXChildren());
              var node = this.createJSXChildNode();
              var element = this.parseJSXBoundaryElement();
              if (element.type === jsx_syntax_1.JSXSyntax.JSXOpeningElement) {
                var opening = element;
                if (opening.selfClosing) {
                  var child = this.finalize(node, new JSXNode.JSXElement(opening, [], null));
                  el.children.push(child);
                } else {
                  stack.push(el);
                  el = { node, opening, closing: null, children: [] };
                }
              }
              if (element.type === jsx_syntax_1.JSXSyntax.JSXClosingElement) {
                el.closing = element;
                var open_1 = getQualifiedElementName(el.opening.name);
                var close_1 = getQualifiedElementName(el.closing.name);
                if (open_1 !== close_1) {
                  this.tolerateError("Expected corresponding JSX closing tag for %0", open_1);
                }
                if (stack.length > 0) {
                  var child = this.finalize(el.node, new JSXNode.JSXElement(el.opening, el.children, el.closing));
                  el = stack[stack.length - 1];
                  el.children.push(child);
                  stack.pop();
                } else {
                  break;
                }
              }
            }
            return el;
          };
          JSXParser2.prototype.parseJSXElement = function() {
            var node = this.createJSXNode();
            var opening = this.parseJSXOpeningElement();
            var children = [];
            var closing = null;
            if (!opening.selfClosing) {
              var el = this.parseComplexJSXElement({ node, opening, closing, children });
              children = el.children;
              closing = el.closing;
            }
            return this.finalize(node, new JSXNode.JSXElement(opening, children, closing));
          };
          JSXParser2.prototype.parseJSXRoot = function() {
            if (this.config.tokens) {
              this.tokens.pop();
            }
            this.startJSX();
            var element = this.parseJSXElement();
            this.finishJSX();
            return element;
          };
          JSXParser2.prototype.isStartOfExpression = function() {
            return _super.prototype.isStartOfExpression.call(this) || this.match("<");
          };
          return JSXParser2;
        }(parser_1.Parser);
        exports2.JSXParser = JSXParser;
      },
      function(module2, exports2) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        var Regex = {
          NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
          NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
        };
        exports2.Character = {
          fromCodePoint: function(cp) {
            return cp < 65536 ? String.fromCharCode(cp) : String.fromCharCode(55296 + (cp - 65536 >> 10)) + String.fromCharCode(56320 + (cp - 65536 & 1023));
          },
          isWhiteSpace: function(cp) {
            return cp === 32 || cp === 9 || cp === 11 || cp === 12 || cp === 160 || cp >= 5760 && [5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279].indexOf(cp) >= 0;
          },
          isLineTerminator: function(cp) {
            return cp === 10 || cp === 13 || cp === 8232 || cp === 8233;
          },
          isIdentifierStart: function(cp) {
            return cp === 36 || cp === 95 || cp >= 65 && cp <= 90 || cp >= 97 && cp <= 122 || cp === 92 || cp >= 128 && Regex.NonAsciiIdentifierStart.test(exports2.Character.fromCodePoint(cp));
          },
          isIdentifierPart: function(cp) {
            return cp === 36 || cp === 95 || cp >= 65 && cp <= 90 || cp >= 97 && cp <= 122 || cp >= 48 && cp <= 57 || cp === 92 || cp >= 128 && Regex.NonAsciiIdentifierPart.test(exports2.Character.fromCodePoint(cp));
          },
          isDecimalDigit: function(cp) {
            return cp >= 48 && cp <= 57;
          },
          isHexDigit: function(cp) {
            return cp >= 48 && cp <= 57 || cp >= 65 && cp <= 70 || cp >= 97 && cp <= 102;
          },
          isOctalDigit: function(cp) {
            return cp >= 48 && cp <= 55;
          }
        };
      },
      function(module2, exports2, __webpack_require__) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        var jsx_syntax_1 = __webpack_require__(6);
        var JSXClosingElement = function() {
          function JSXClosingElement2(name) {
            this.type = jsx_syntax_1.JSXSyntax.JSXClosingElement;
            this.name = name;
          }
          return JSXClosingElement2;
        }();
        exports2.JSXClosingElement = JSXClosingElement;
        var JSXElement = function() {
          function JSXElement2(openingElement, children, closingElement) {
            this.type = jsx_syntax_1.JSXSyntax.JSXElement;
            this.openingElement = openingElement;
            this.children = children;
            this.closingElement = closingElement;
          }
          return JSXElement2;
        }();
        exports2.JSXElement = JSXElement;
        var JSXEmptyExpression = function() {
          function JSXEmptyExpression2() {
            this.type = jsx_syntax_1.JSXSyntax.JSXEmptyExpression;
          }
          return JSXEmptyExpression2;
        }();
        exports2.JSXEmptyExpression = JSXEmptyExpression;
        var JSXExpressionContainer = function() {
          function JSXExpressionContainer2(expression) {
            this.type = jsx_syntax_1.JSXSyntax.JSXExpressionContainer;
            this.expression = expression;
          }
          return JSXExpressionContainer2;
        }();
        exports2.JSXExpressionContainer = JSXExpressionContainer;
        var JSXIdentifier = function() {
          function JSXIdentifier2(name) {
            this.type = jsx_syntax_1.JSXSyntax.JSXIdentifier;
            this.name = name;
          }
          return JSXIdentifier2;
        }();
        exports2.JSXIdentifier = JSXIdentifier;
        var JSXMemberExpression = function() {
          function JSXMemberExpression2(object, property) {
            this.type = jsx_syntax_1.JSXSyntax.JSXMemberExpression;
            this.object = object;
            this.property = property;
          }
          return JSXMemberExpression2;
        }();
        exports2.JSXMemberExpression = JSXMemberExpression;
        var JSXAttribute = function() {
          function JSXAttribute2(name, value) {
            this.type = jsx_syntax_1.JSXSyntax.JSXAttribute;
            this.name = name;
            this.value = value;
          }
          return JSXAttribute2;
        }();
        exports2.JSXAttribute = JSXAttribute;
        var JSXNamespacedName = function() {
          function JSXNamespacedName2(namespace, name) {
            this.type = jsx_syntax_1.JSXSyntax.JSXNamespacedName;
            this.namespace = namespace;
            this.name = name;
          }
          return JSXNamespacedName2;
        }();
        exports2.JSXNamespacedName = JSXNamespacedName;
        var JSXOpeningElement = function() {
          function JSXOpeningElement2(name, selfClosing, attributes) {
            this.type = jsx_syntax_1.JSXSyntax.JSXOpeningElement;
            this.name = name;
            this.selfClosing = selfClosing;
            this.attributes = attributes;
          }
          return JSXOpeningElement2;
        }();
        exports2.JSXOpeningElement = JSXOpeningElement;
        var JSXSpreadAttribute = function() {
          function JSXSpreadAttribute2(argument) {
            this.type = jsx_syntax_1.JSXSyntax.JSXSpreadAttribute;
            this.argument = argument;
          }
          return JSXSpreadAttribute2;
        }();
        exports2.JSXSpreadAttribute = JSXSpreadAttribute;
        var JSXText = function() {
          function JSXText2(value, raw) {
            this.type = jsx_syntax_1.JSXSyntax.JSXText;
            this.value = value;
            this.raw = raw;
          }
          return JSXText2;
        }();
        exports2.JSXText = JSXText;
      },
      function(module2, exports2) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.JSXSyntax = {
          JSXAttribute: "JSXAttribute",
          JSXClosingElement: "JSXClosingElement",
          JSXElement: "JSXElement",
          JSXEmptyExpression: "JSXEmptyExpression",
          JSXExpressionContainer: "JSXExpressionContainer",
          JSXIdentifier: "JSXIdentifier",
          JSXMemberExpression: "JSXMemberExpression",
          JSXNamespacedName: "JSXNamespacedName",
          JSXOpeningElement: "JSXOpeningElement",
          JSXSpreadAttribute: "JSXSpreadAttribute",
          JSXText: "JSXText"
        };
      },
      function(module2, exports2, __webpack_require__) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        var syntax_1 = __webpack_require__(2);
        var ArrayExpression = function() {
          function ArrayExpression2(elements) {
            this.type = syntax_1.Syntax.ArrayExpression;
            this.elements = elements;
          }
          return ArrayExpression2;
        }();
        exports2.ArrayExpression = ArrayExpression;
        var ArrayPattern = function() {
          function ArrayPattern2(elements) {
            this.type = syntax_1.Syntax.ArrayPattern;
            this.elements = elements;
          }
          return ArrayPattern2;
        }();
        exports2.ArrayPattern = ArrayPattern;
        var ArrowFunctionExpression = function() {
          function ArrowFunctionExpression2(params, body, expression) {
            this.type = syntax_1.Syntax.ArrowFunctionExpression;
            this.id = null;
            this.params = params;
            this.body = body;
            this.generator = false;
            this.expression = expression;
            this.async = false;
          }
          return ArrowFunctionExpression2;
        }();
        exports2.ArrowFunctionExpression = ArrowFunctionExpression;
        var AssignmentExpression = function() {
          function AssignmentExpression2(operator, left, right) {
            this.type = syntax_1.Syntax.AssignmentExpression;
            this.operator = operator;
            this.left = left;
            this.right = right;
          }
          return AssignmentExpression2;
        }();
        exports2.AssignmentExpression = AssignmentExpression;
        var AssignmentPattern = function() {
          function AssignmentPattern2(left, right) {
            this.type = syntax_1.Syntax.AssignmentPattern;
            this.left = left;
            this.right = right;
          }
          return AssignmentPattern2;
        }();
        exports2.AssignmentPattern = AssignmentPattern;
        var AsyncArrowFunctionExpression = function() {
          function AsyncArrowFunctionExpression2(params, body, expression) {
            this.type = syntax_1.Syntax.ArrowFunctionExpression;
            this.id = null;
            this.params = params;
            this.body = body;
            this.generator = false;
            this.expression = expression;
            this.async = true;
          }
          return AsyncArrowFunctionExpression2;
        }();
        exports2.AsyncArrowFunctionExpression = AsyncArrowFunctionExpression;
        var AsyncFunctionDeclaration = function() {
          function AsyncFunctionDeclaration2(id, params, body) {
            this.type = syntax_1.Syntax.FunctionDeclaration;
            this.id = id;
            this.params = params;
            this.body = body;
            this.generator = false;
            this.expression = false;
            this.async = true;
          }
          return AsyncFunctionDeclaration2;
        }();
        exports2.AsyncFunctionDeclaration = AsyncFunctionDeclaration;
        var AsyncFunctionExpression = function() {
          function AsyncFunctionExpression2(id, params, body) {
            this.type = syntax_1.Syntax.FunctionExpression;
            this.id = id;
            this.params = params;
            this.body = body;
            this.generator = false;
            this.expression = false;
            this.async = true;
          }
          return AsyncFunctionExpression2;
        }();
        exports2.AsyncFunctionExpression = AsyncFunctionExpression;
        var AwaitExpression = function() {
          function AwaitExpression2(argument) {
            this.type = syntax_1.Syntax.AwaitExpression;
            this.argument = argument;
          }
          return AwaitExpression2;
        }();
        exports2.AwaitExpression = AwaitExpression;
        var BinaryExpression = function() {
          function BinaryExpression2(operator, left, right) {
            var logical = operator === "||" || operator === "&&";
            this.type = logical ? syntax_1.Syntax.LogicalExpression : syntax_1.Syntax.BinaryExpression;
            this.operator = operator;
            this.left = left;
            this.right = right;
          }
          return BinaryExpression2;
        }();
        exports2.BinaryExpression = BinaryExpression;
        var BlockStatement = function() {
          function BlockStatement2(body) {
            this.type = syntax_1.Syntax.BlockStatement;
            this.body = body;
          }
          return BlockStatement2;
        }();
        exports2.BlockStatement = BlockStatement;
        var BreakStatement = function() {
          function BreakStatement2(label) {
            this.type = syntax_1.Syntax.BreakStatement;
            this.label = label;
          }
          return BreakStatement2;
        }();
        exports2.BreakStatement = BreakStatement;
        var CallExpression = function() {
          function CallExpression2(callee, args) {
            this.type = syntax_1.Syntax.CallExpression;
            this.callee = callee;
            this.arguments = args;
          }
          return CallExpression2;
        }();
        exports2.CallExpression = CallExpression;
        var CatchClause = function() {
          function CatchClause2(param, body) {
            this.type = syntax_1.Syntax.CatchClause;
            this.param = param;
            this.body = body;
          }
          return CatchClause2;
        }();
        exports2.CatchClause = CatchClause;
        var ClassBody = function() {
          function ClassBody2(body) {
            this.type = syntax_1.Syntax.ClassBody;
            this.body = body;
          }
          return ClassBody2;
        }();
        exports2.ClassBody = ClassBody;
        var ClassDeclaration = function() {
          function ClassDeclaration2(id, superClass, body) {
            this.type = syntax_1.Syntax.ClassDeclaration;
            this.id = id;
            this.superClass = superClass;
            this.body = body;
          }
          return ClassDeclaration2;
        }();
        exports2.ClassDeclaration = ClassDeclaration;
        var ClassExpression = function() {
          function ClassExpression2(id, superClass, body) {
            this.type = syntax_1.Syntax.ClassExpression;
            this.id = id;
            this.superClass = superClass;
            this.body = body;
          }
          return ClassExpression2;
        }();
        exports2.ClassExpression = ClassExpression;
        var ComputedMemberExpression = function() {
          function ComputedMemberExpression2(object, property) {
            this.type = syntax_1.Syntax.MemberExpression;
            this.computed = true;
            this.object = object;
            this.property = property;
          }
          return ComputedMemberExpression2;
        }();
        exports2.ComputedMemberExpression = ComputedMemberExpression;
        var ConditionalExpression = function() {
          function ConditionalExpression2(test, consequent, alternate) {
            this.type = syntax_1.Syntax.ConditionalExpression;
            this.test = test;
            this.consequent = consequent;
            this.alternate = alternate;
          }
          return ConditionalExpression2;
        }();
        exports2.ConditionalExpression = ConditionalExpression;
        var ContinueStatement = function() {
          function ContinueStatement2(label) {
            this.type = syntax_1.Syntax.ContinueStatement;
            this.label = label;
          }
          return ContinueStatement2;
        }();
        exports2.ContinueStatement = ContinueStatement;
        var DebuggerStatement = function() {
          function DebuggerStatement2() {
            this.type = syntax_1.Syntax.DebuggerStatement;
          }
          return DebuggerStatement2;
        }();
        exports2.DebuggerStatement = DebuggerStatement;
        var Directive = function() {
          function Directive2(expression, directive) {
            this.type = syntax_1.Syntax.ExpressionStatement;
            this.expression = expression;
            this.directive = directive;
          }
          return Directive2;
        }();
        exports2.Directive = Directive;
        var DoWhileStatement = function() {
          function DoWhileStatement2(body, test) {
            this.type = syntax_1.Syntax.DoWhileStatement;
            this.body = body;
            this.test = test;
          }
          return DoWhileStatement2;
        }();
        exports2.DoWhileStatement = DoWhileStatement;
        var EmptyStatement = function() {
          function EmptyStatement2() {
            this.type = syntax_1.Syntax.EmptyStatement;
          }
          return EmptyStatement2;
        }();
        exports2.EmptyStatement = EmptyStatement;
        var ExportAllDeclaration = function() {
          function ExportAllDeclaration2(source) {
            this.type = syntax_1.Syntax.ExportAllDeclaration;
            this.source = source;
          }
          return ExportAllDeclaration2;
        }();
        exports2.ExportAllDeclaration = ExportAllDeclaration;
        var ExportDefaultDeclaration = function() {
          function ExportDefaultDeclaration2(declaration) {
            this.type = syntax_1.Syntax.ExportDefaultDeclaration;
            this.declaration = declaration;
          }
          return ExportDefaultDeclaration2;
        }();
        exports2.ExportDefaultDeclaration = ExportDefaultDeclaration;
        var ExportNamedDeclaration = function() {
          function ExportNamedDeclaration2(declaration, specifiers, source) {
            this.type = syntax_1.Syntax.ExportNamedDeclaration;
            this.declaration = declaration;
            this.specifiers = specifiers;
            this.source = source;
          }
          return ExportNamedDeclaration2;
        }();
        exports2.ExportNamedDeclaration = ExportNamedDeclaration;
        var ExportSpecifier = function() {
          function ExportSpecifier2(local, exported) {
            this.type = syntax_1.Syntax.ExportSpecifier;
            this.exported = exported;
            this.local = local;
          }
          return ExportSpecifier2;
        }();
        exports2.ExportSpecifier = ExportSpecifier;
        var ExpressionStatement = function() {
          function ExpressionStatement2(expression) {
            this.type = syntax_1.Syntax.ExpressionStatement;
            this.expression = expression;
          }
          return ExpressionStatement2;
        }();
        exports2.ExpressionStatement = ExpressionStatement;
        var ForInStatement = function() {
          function ForInStatement2(left, right, body) {
            this.type = syntax_1.Syntax.ForInStatement;
            this.left = left;
            this.right = right;
            this.body = body;
            this.each = false;
          }
          return ForInStatement2;
        }();
        exports2.ForInStatement = ForInStatement;
        var ForOfStatement = function() {
          function ForOfStatement2(left, right, body) {
            this.type = syntax_1.Syntax.ForOfStatement;
            this.left = left;
            this.right = right;
            this.body = body;
          }
          return ForOfStatement2;
        }();
        exports2.ForOfStatement = ForOfStatement;
        var ForStatement = function() {
          function ForStatement2(init, test, update, body) {
            this.type = syntax_1.Syntax.ForStatement;
            this.init = init;
            this.test = test;
            this.update = update;
            this.body = body;
          }
          return ForStatement2;
        }();
        exports2.ForStatement = ForStatement;
        var FunctionDeclaration = function() {
          function FunctionDeclaration2(id, params, body, generator) {
            this.type = syntax_1.Syntax.FunctionDeclaration;
            this.id = id;
            this.params = params;
            this.body = body;
            this.generator = generator;
            this.expression = false;
            this.async = false;
          }
          return FunctionDeclaration2;
        }();
        exports2.FunctionDeclaration = FunctionDeclaration;
        var FunctionExpression = function() {
          function FunctionExpression2(id, params, body, generator) {
            this.type = syntax_1.Syntax.FunctionExpression;
            this.id = id;
            this.params = params;
            this.body = body;
            this.generator = generator;
            this.expression = false;
            this.async = false;
          }
          return FunctionExpression2;
        }();
        exports2.FunctionExpression = FunctionExpression;
        var Identifier = function() {
          function Identifier2(name) {
            this.type = syntax_1.Syntax.Identifier;
            this.name = name;
          }
          return Identifier2;
        }();
        exports2.Identifier = Identifier;
        var IfStatement = function() {
          function IfStatement2(test, consequent, alternate) {
            this.type = syntax_1.Syntax.IfStatement;
            this.test = test;
            this.consequent = consequent;
            this.alternate = alternate;
          }
          return IfStatement2;
        }();
        exports2.IfStatement = IfStatement;
        var ImportDeclaration = function() {
          function ImportDeclaration2(specifiers, source) {
            this.type = syntax_1.Syntax.ImportDeclaration;
            this.specifiers = specifiers;
            this.source = source;
          }
          return ImportDeclaration2;
        }();
        exports2.ImportDeclaration = ImportDeclaration;
        var ImportDefaultSpecifier = function() {
          function ImportDefaultSpecifier2(local) {
            this.type = syntax_1.Syntax.ImportDefaultSpecifier;
            this.local = local;
          }
          return ImportDefaultSpecifier2;
        }();
        exports2.ImportDefaultSpecifier = ImportDefaultSpecifier;
        var ImportNamespaceSpecifier = function() {
          function ImportNamespaceSpecifier2(local) {
            this.type = syntax_1.Syntax.ImportNamespaceSpecifier;
            this.local = local;
          }
          return ImportNamespaceSpecifier2;
        }();
        exports2.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
        var ImportSpecifier = function() {
          function ImportSpecifier2(local, imported) {
            this.type = syntax_1.Syntax.ImportSpecifier;
            this.local = local;
            this.imported = imported;
          }
          return ImportSpecifier2;
        }();
        exports2.ImportSpecifier = ImportSpecifier;
        var LabeledStatement = function() {
          function LabeledStatement2(label, body) {
            this.type = syntax_1.Syntax.LabeledStatement;
            this.label = label;
            this.body = body;
          }
          return LabeledStatement2;
        }();
        exports2.LabeledStatement = LabeledStatement;
        var Literal = function() {
          function Literal2(value, raw) {
            this.type = syntax_1.Syntax.Literal;
            this.value = value;
            this.raw = raw;
          }
          return Literal2;
        }();
        exports2.Literal = Literal;
        var MetaProperty = function() {
          function MetaProperty2(meta, property) {
            this.type = syntax_1.Syntax.MetaProperty;
            this.meta = meta;
            this.property = property;
          }
          return MetaProperty2;
        }();
        exports2.MetaProperty = MetaProperty;
        var MethodDefinition = function() {
          function MethodDefinition2(key, computed, value, kind, isStatic) {
            this.type = syntax_1.Syntax.MethodDefinition;
            this.key = key;
            this.computed = computed;
            this.value = value;
            this.kind = kind;
            this.static = isStatic;
          }
          return MethodDefinition2;
        }();
        exports2.MethodDefinition = MethodDefinition;
        var Module = function() {
          function Module2(body) {
            this.type = syntax_1.Syntax.Program;
            this.body = body;
            this.sourceType = "module";
          }
          return Module2;
        }();
        exports2.Module = Module;
        var NewExpression = function() {
          function NewExpression2(callee, args) {
            this.type = syntax_1.Syntax.NewExpression;
            this.callee = callee;
            this.arguments = args;
          }
          return NewExpression2;
        }();
        exports2.NewExpression = NewExpression;
        var ObjectExpression = function() {
          function ObjectExpression2(properties) {
            this.type = syntax_1.Syntax.ObjectExpression;
            this.properties = properties;
          }
          return ObjectExpression2;
        }();
        exports2.ObjectExpression = ObjectExpression;
        var ObjectPattern = function() {
          function ObjectPattern2(properties) {
            this.type = syntax_1.Syntax.ObjectPattern;
            this.properties = properties;
          }
          return ObjectPattern2;
        }();
        exports2.ObjectPattern = ObjectPattern;
        var Property = function() {
          function Property2(kind, key, computed, value, method, shorthand) {
            this.type = syntax_1.Syntax.Property;
            this.key = key;
            this.computed = computed;
            this.value = value;
            this.kind = kind;
            this.method = method;
            this.shorthand = shorthand;
          }
          return Property2;
        }();
        exports2.Property = Property;
        var RegexLiteral = function() {
          function RegexLiteral2(value, raw, pattern, flags) {
            this.type = syntax_1.Syntax.Literal;
            this.value = value;
            this.raw = raw;
            this.regex = { pattern, flags };
          }
          return RegexLiteral2;
        }();
        exports2.RegexLiteral = RegexLiteral;
        var RestElement = function() {
          function RestElement2(argument) {
            this.type = syntax_1.Syntax.RestElement;
            this.argument = argument;
          }
          return RestElement2;
        }();
        exports2.RestElement = RestElement;
        var ReturnStatement = function() {
          function ReturnStatement2(argument) {
            this.type = syntax_1.Syntax.ReturnStatement;
            this.argument = argument;
          }
          return ReturnStatement2;
        }();
        exports2.ReturnStatement = ReturnStatement;
        var Script = function() {
          function Script2(body) {
            this.type = syntax_1.Syntax.Program;
            this.body = body;
            this.sourceType = "script";
          }
          return Script2;
        }();
        exports2.Script = Script;
        var SequenceExpression = function() {
          function SequenceExpression2(expressions) {
            this.type = syntax_1.Syntax.SequenceExpression;
            this.expressions = expressions;
          }
          return SequenceExpression2;
        }();
        exports2.SequenceExpression = SequenceExpression;
        var SpreadElement = function() {
          function SpreadElement2(argument) {
            this.type = syntax_1.Syntax.SpreadElement;
            this.argument = argument;
          }
          return SpreadElement2;
        }();
        exports2.SpreadElement = SpreadElement;
        var StaticMemberExpression = function() {
          function StaticMemberExpression2(object, property) {
            this.type = syntax_1.Syntax.MemberExpression;
            this.computed = false;
            this.object = object;
            this.property = property;
          }
          return StaticMemberExpression2;
        }();
        exports2.StaticMemberExpression = StaticMemberExpression;
        var Super = function() {
          function Super2() {
            this.type = syntax_1.Syntax.Super;
          }
          return Super2;
        }();
        exports2.Super = Super;
        var SwitchCase = function() {
          function SwitchCase2(test, consequent) {
            this.type = syntax_1.Syntax.SwitchCase;
            this.test = test;
            this.consequent = consequent;
          }
          return SwitchCase2;
        }();
        exports2.SwitchCase = SwitchCase;
        var SwitchStatement = function() {
          function SwitchStatement2(discriminant, cases) {
            this.type = syntax_1.Syntax.SwitchStatement;
            this.discriminant = discriminant;
            this.cases = cases;
          }
          return SwitchStatement2;
        }();
        exports2.SwitchStatement = SwitchStatement;
        var TaggedTemplateExpression = function() {
          function TaggedTemplateExpression2(tag, quasi) {
            this.type = syntax_1.Syntax.TaggedTemplateExpression;
            this.tag = tag;
            this.quasi = quasi;
          }
          return TaggedTemplateExpression2;
        }();
        exports2.TaggedTemplateExpression = TaggedTemplateExpression;
        var TemplateElement = function() {
          function TemplateElement2(value, tail) {
            this.type = syntax_1.Syntax.TemplateElement;
            this.value = value;
            this.tail = tail;
          }
          return TemplateElement2;
        }();
        exports2.TemplateElement = TemplateElement;
        var TemplateLiteral = function() {
          function TemplateLiteral2(quasis, expressions) {
            this.type = syntax_1.Syntax.TemplateLiteral;
            this.quasis = quasis;
            this.expressions = expressions;
          }
          return TemplateLiteral2;
        }();
        exports2.TemplateLiteral = TemplateLiteral;
        var ThisExpression = function() {
          function ThisExpression2() {
            this.type = syntax_1.Syntax.ThisExpression;
          }
          return ThisExpression2;
        }();
        exports2.ThisExpression = ThisExpression;
        var ThrowStatement = function() {
          function ThrowStatement2(argument) {
            this.type = syntax_1.Syntax.ThrowStatement;
            this.argument = argument;
          }
          return ThrowStatement2;
        }();
        exports2.ThrowStatement = ThrowStatement;
        var TryStatement = function() {
          function TryStatement2(block, handler, finalizer) {
            this.type = syntax_1.Syntax.TryStatement;
            this.block = block;
            this.handler = handler;
            this.finalizer = finalizer;
          }
          return TryStatement2;
        }();
        exports2.TryStatement = TryStatement;
        var UnaryExpression = function() {
          function UnaryExpression2(operator, argument) {
            this.type = syntax_1.Syntax.UnaryExpression;
            this.operator = operator;
            this.argument = argument;
            this.prefix = true;
          }
          return UnaryExpression2;
        }();
        exports2.UnaryExpression = UnaryExpression;
        var UpdateExpression = function() {
          function UpdateExpression2(operator, argument, prefix) {
            this.type = syntax_1.Syntax.UpdateExpression;
            this.operator = operator;
            this.argument = argument;
            this.prefix = prefix;
          }
          return UpdateExpression2;
        }();
        exports2.UpdateExpression = UpdateExpression;
        var VariableDeclaration = function() {
          function VariableDeclaration2(declarations, kind) {
            this.type = syntax_1.Syntax.VariableDeclaration;
            this.declarations = declarations;
            this.kind = kind;
          }
          return VariableDeclaration2;
        }();
        exports2.VariableDeclaration = VariableDeclaration;
        var VariableDeclarator = function() {
          function VariableDeclarator2(id, init) {
            this.type = syntax_1.Syntax.VariableDeclarator;
            this.id = id;
            this.init = init;
          }
          return VariableDeclarator2;
        }();
        exports2.VariableDeclarator = VariableDeclarator;
        var WhileStatement = function() {
          function WhileStatement2(test, body) {
            this.type = syntax_1.Syntax.WhileStatement;
            this.test = test;
            this.body = body;
          }
          return WhileStatement2;
        }();
        exports2.WhileStatement = WhileStatement;
        var WithStatement = function() {
          function WithStatement2(object, body) {
            this.type = syntax_1.Syntax.WithStatement;
            this.object = object;
            this.body = body;
          }
          return WithStatement2;
        }();
        exports2.WithStatement = WithStatement;
        var YieldExpression = function() {
          function YieldExpression2(argument, delegate) {
            this.type = syntax_1.Syntax.YieldExpression;
            this.argument = argument;
            this.delegate = delegate;
          }
          return YieldExpression2;
        }();
        exports2.YieldExpression = YieldExpression;
      },
      function(module2, exports2, __webpack_require__) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        var assert_1 = __webpack_require__(9);
        var error_handler_1 = __webpack_require__(10);
        var messages_1 = __webpack_require__(11);
        var Node = __webpack_require__(7);
        var scanner_1 = __webpack_require__(12);
        var syntax_1 = __webpack_require__(2);
        var token_1 = __webpack_require__(13);
        var ArrowParameterPlaceHolder = "ArrowParameterPlaceHolder";
        var Parser = function() {
          function Parser2(code, options, delegate) {
            if (options === undefined) {
              options = {};
            }
            this.config = {
              range: typeof options.range === "boolean" && options.range,
              loc: typeof options.loc === "boolean" && options.loc,
              source: null,
              tokens: typeof options.tokens === "boolean" && options.tokens,
              comment: typeof options.comment === "boolean" && options.comment,
              tolerant: typeof options.tolerant === "boolean" && options.tolerant
            };
            if (this.config.loc && options.source && options.source !== null) {
              this.config.source = String(options.source);
            }
            this.delegate = delegate;
            this.errorHandler = new error_handler_1.ErrorHandler;
            this.errorHandler.tolerant = this.config.tolerant;
            this.scanner = new scanner_1.Scanner(code, this.errorHandler);
            this.scanner.trackComment = this.config.comment;
            this.operatorPrecedence = {
              ")": 0,
              ";": 0,
              ",": 0,
              "=": 0,
              "]": 0,
              "||": 1,
              "&&": 2,
              "|": 3,
              "^": 4,
              "&": 5,
              "==": 6,
              "!=": 6,
              "===": 6,
              "!==": 6,
              "<": 7,
              ">": 7,
              "<=": 7,
              ">=": 7,
              "<<": 8,
              ">>": 8,
              ">>>": 8,
              "+": 9,
              "-": 9,
              "*": 11,
              "/": 11,
              "%": 11
            };
            this.lookahead = {
              type: 2,
              value: "",
              lineNumber: this.scanner.lineNumber,
              lineStart: 0,
              start: 0,
              end: 0
            };
            this.hasLineTerminator = false;
            this.context = {
              isModule: false,
              await: false,
              allowIn: true,
              allowStrictDirective: true,
              allowYield: true,
              firstCoverInitializedNameError: null,
              isAssignmentTarget: false,
              isBindingElement: false,
              inFunctionBody: false,
              inIteration: false,
              inSwitch: false,
              labelSet: {},
              strict: false
            };
            this.tokens = [];
            this.startMarker = {
              index: 0,
              line: this.scanner.lineNumber,
              column: 0
            };
            this.lastMarker = {
              index: 0,
              line: this.scanner.lineNumber,
              column: 0
            };
            this.nextToken();
            this.lastMarker = {
              index: this.scanner.index,
              line: this.scanner.lineNumber,
              column: this.scanner.index - this.scanner.lineStart
            };
          }
          Parser2.prototype.throwError = function(messageFormat) {
            var values = [];
            for (var _i = 1;_i < arguments.length; _i++) {
              values[_i - 1] = arguments[_i];
            }
            var args = Array.prototype.slice.call(arguments, 1);
            var msg = messageFormat.replace(/%(\d)/g, function(whole, idx) {
              assert_1.assert(idx < args.length, "Message reference must be in range");
              return args[idx];
            });
            var index = this.lastMarker.index;
            var line = this.lastMarker.line;
            var column = this.lastMarker.column + 1;
            throw this.errorHandler.createError(index, line, column, msg);
          };
          Parser2.prototype.tolerateError = function(messageFormat) {
            var values = [];
            for (var _i = 1;_i < arguments.length; _i++) {
              values[_i - 1] = arguments[_i];
            }
            var args = Array.prototype.slice.call(arguments, 1);
            var msg = messageFormat.replace(/%(\d)/g, function(whole, idx) {
              assert_1.assert(idx < args.length, "Message reference must be in range");
              return args[idx];
            });
            var index = this.lastMarker.index;
            var line = this.scanner.lineNumber;
            var column = this.lastMarker.column + 1;
            this.errorHandler.tolerateError(index, line, column, msg);
          };
          Parser2.prototype.unexpectedTokenError = function(token, message) {
            var msg = message || messages_1.Messages.UnexpectedToken;
            var value;
            if (token) {
              if (!message) {
                msg = token.type === 2 ? messages_1.Messages.UnexpectedEOS : token.type === 3 ? messages_1.Messages.UnexpectedIdentifier : token.type === 6 ? messages_1.Messages.UnexpectedNumber : token.type === 8 ? messages_1.Messages.UnexpectedString : token.type === 10 ? messages_1.Messages.UnexpectedTemplate : messages_1.Messages.UnexpectedToken;
                if (token.type === 4) {
                  if (this.scanner.isFutureReservedWord(token.value)) {
                    msg = messages_1.Messages.UnexpectedReserved;
                  } else if (this.context.strict && this.scanner.isStrictModeReservedWord(token.value)) {
                    msg = messages_1.Messages.StrictReservedWord;
                  }
                }
              }
              value = token.value;
            } else {
              value = "ILLEGAL";
            }
            msg = msg.replace("%0", value);
            if (token && typeof token.lineNumber === "number") {
              var index = token.start;
              var line = token.lineNumber;
              var lastMarkerLineStart = this.lastMarker.index - this.lastMarker.column;
              var column = token.start - lastMarkerLineStart + 1;
              return this.errorHandler.createError(index, line, column, msg);
            } else {
              var index = this.lastMarker.index;
              var line = this.lastMarker.line;
              var column = this.lastMarker.column + 1;
              return this.errorHandler.createError(index, line, column, msg);
            }
          };
          Parser2.prototype.throwUnexpectedToken = function(token, message) {
            throw this.unexpectedTokenError(token, message);
          };
          Parser2.prototype.tolerateUnexpectedToken = function(token, message) {
            this.errorHandler.tolerate(this.unexpectedTokenError(token, message));
          };
          Parser2.prototype.collectComments = function() {
            if (!this.config.comment) {
              this.scanner.scanComments();
            } else {
              var comments = this.scanner.scanComments();
              if (comments.length > 0 && this.delegate) {
                for (var i = 0;i < comments.length; ++i) {
                  var e = comments[i];
                  var node = undefined;
                  node = {
                    type: e.multiLine ? "BlockComment" : "LineComment",
                    value: this.scanner.source.slice(e.slice[0], e.slice[1])
                  };
                  if (this.config.range) {
                    node.range = e.range;
                  }
                  if (this.config.loc) {
                    node.loc = e.loc;
                  }
                  var metadata = {
                    start: {
                      line: e.loc.start.line,
                      column: e.loc.start.column,
                      offset: e.range[0]
                    },
                    end: {
                      line: e.loc.end.line,
                      column: e.loc.end.column,
                      offset: e.range[1]
                    }
                  };
                  this.delegate(node, metadata);
                }
              }
            }
          };
          Parser2.prototype.getTokenRaw = function(token) {
            return this.scanner.source.slice(token.start, token.end);
          };
          Parser2.prototype.convertToken = function(token) {
            var t = {
              type: token_1.TokenName[token.type],
              value: this.getTokenRaw(token)
            };
            if (this.config.range) {
              t.range = [token.start, token.end];
            }
            if (this.config.loc) {
              t.loc = {
                start: {
                  line: this.startMarker.line,
                  column: this.startMarker.column
                },
                end: {
                  line: this.scanner.lineNumber,
                  column: this.scanner.index - this.scanner.lineStart
                }
              };
            }
            if (token.type === 9) {
              var pattern = token.pattern;
              var flags = token.flags;
              t.regex = { pattern, flags };
            }
            return t;
          };
          Parser2.prototype.nextToken = function() {
            var token = this.lookahead;
            this.lastMarker.index = this.scanner.index;
            this.lastMarker.line = this.scanner.lineNumber;
            this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
            this.collectComments();
            if (this.scanner.index !== this.startMarker.index) {
              this.startMarker.index = this.scanner.index;
              this.startMarker.line = this.scanner.lineNumber;
              this.startMarker.column = this.scanner.index - this.scanner.lineStart;
            }
            var next = this.scanner.lex();
            this.hasLineTerminator = token.lineNumber !== next.lineNumber;
            if (next && this.context.strict && next.type === 3) {
              if (this.scanner.isStrictModeReservedWord(next.value)) {
                next.type = 4;
              }
            }
            this.lookahead = next;
            if (this.config.tokens && next.type !== 2) {
              this.tokens.push(this.convertToken(next));
            }
            return token;
          };
          Parser2.prototype.nextRegexToken = function() {
            this.collectComments();
            var token = this.scanner.scanRegExp();
            if (this.config.tokens) {
              this.tokens.pop();
              this.tokens.push(this.convertToken(token));
            }
            this.lookahead = token;
            this.nextToken();
            return token;
          };
          Parser2.prototype.createNode = function() {
            return {
              index: this.startMarker.index,
              line: this.startMarker.line,
              column: this.startMarker.column
            };
          };
          Parser2.prototype.startNode = function(token, lastLineStart) {
            if (lastLineStart === undefined) {
              lastLineStart = 0;
            }
            var column = token.start - token.lineStart;
            var line = token.lineNumber;
            if (column < 0) {
              column += lastLineStart;
              line--;
            }
            return {
              index: token.start,
              line,
              column
            };
          };
          Parser2.prototype.finalize = function(marker, node) {
            if (this.config.range) {
              node.range = [marker.index, this.lastMarker.index];
            }
            if (this.config.loc) {
              node.loc = {
                start: {
                  line: marker.line,
                  column: marker.column
                },
                end: {
                  line: this.lastMarker.line,
                  column: this.lastMarker.column
                }
              };
              if (this.config.source) {
                node.loc.source = this.config.source;
              }
            }
            if (this.delegate) {
              var metadata = {
                start: {
                  line: marker.line,
                  column: marker.column,
                  offset: marker.index
                },
                end: {
                  line: this.lastMarker.line,
                  column: this.lastMarker.column,
                  offset: this.lastMarker.index
                }
              };
              this.delegate(node, metadata);
            }
            return node;
          };
          Parser2.prototype.expect = function(value) {
            var token = this.nextToken();
            if (token.type !== 7 || token.value !== value) {
              this.throwUnexpectedToken(token);
            }
          };
          Parser2.prototype.expectCommaSeparator = function() {
            if (this.config.tolerant) {
              var token = this.lookahead;
              if (token.type === 7 && token.value === ",") {
                this.nextToken();
              } else if (token.type === 7 && token.value === ";") {
                this.nextToken();
                this.tolerateUnexpectedToken(token);
              } else {
                this.tolerateUnexpectedToken(token, messages_1.Messages.UnexpectedToken);
              }
            } else {
              this.expect(",");
            }
          };
          Parser2.prototype.expectKeyword = function(keyword) {
            var token = this.nextToken();
            if (token.type !== 4 || token.value !== keyword) {
              this.throwUnexpectedToken(token);
            }
          };
          Parser2.prototype.match = function(value) {
            return this.lookahead.type === 7 && this.lookahead.value === value;
          };
          Parser2.prototype.matchKeyword = function(keyword) {
            return this.lookahead.type === 4 && this.lookahead.value === keyword;
          };
          Parser2.prototype.matchContextualKeyword = function(keyword) {
            return this.lookahead.type === 3 && this.lookahead.value === keyword;
          };
          Parser2.prototype.matchAssign = function() {
            if (this.lookahead.type !== 7) {
              return false;
            }
            var op = this.lookahead.value;
            return op === "=" || op === "*=" || op === "**=" || op === "/=" || op === "%=" || op === "+=" || op === "-=" || op === "<<=" || op === ">>=" || op === ">>>=" || op === "&=" || op === "^=" || op === "|=";
          };
          Parser2.prototype.isolateCoverGrammar = function(parseFunction) {
            var previousIsBindingElement = this.context.isBindingElement;
            var previousIsAssignmentTarget = this.context.isAssignmentTarget;
            var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
            this.context.isBindingElement = true;
            this.context.isAssignmentTarget = true;
            this.context.firstCoverInitializedNameError = null;
            var result = parseFunction.call(this);
            if (this.context.firstCoverInitializedNameError !== null) {
              this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
            }
            this.context.isBindingElement = previousIsBindingElement;
            this.context.isAssignmentTarget = previousIsAssignmentTarget;
            this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
            return result;
          };
          Parser2.prototype.inheritCoverGrammar = function(parseFunction) {
            var previousIsBindingElement = this.context.isBindingElement;
            var previousIsAssignmentTarget = this.context.isAssignmentTarget;
            var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
            this.context.isBindingElement = true;
            this.context.isAssignmentTarget = true;
            this.context.firstCoverInitializedNameError = null;
            var result = parseFunction.call(this);
            this.context.isBindingElement = this.context.isBindingElement && previousIsBindingElement;
            this.context.isAssignmentTarget = this.context.isAssignmentTarget && previousIsAssignmentTarget;
            this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.context.firstCoverInitializedNameError;
            return result;
          };
          Parser2.prototype.consumeSemicolon = function() {
            if (this.match(";")) {
              this.nextToken();
            } else if (!this.hasLineTerminator) {
              if (this.lookahead.type !== 2 && !this.match("}")) {
                this.throwUnexpectedToken(this.lookahead);
              }
              this.lastMarker.index = this.startMarker.index;
              this.lastMarker.line = this.startMarker.line;
              this.lastMarker.column = this.startMarker.column;
            }
          };
          Parser2.prototype.parsePrimaryExpression = function() {
            var node = this.createNode();
            var expr;
            var token, raw;
            switch (this.lookahead.type) {
              case 3:
                if ((this.context.isModule || this.context.await) && this.lookahead.value === "await") {
                  this.tolerateUnexpectedToken(this.lookahead);
                }
                expr = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(node, new Node.Identifier(this.nextToken().value));
                break;
              case 6:
              case 8:
                if (this.context.strict && this.lookahead.octal) {
                  this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.StrictOctalLiteral);
                }
                this.context.isAssignmentTarget = false;
                this.context.isBindingElement = false;
                token = this.nextToken();
                raw = this.getTokenRaw(token);
                expr = this.finalize(node, new Node.Literal(token.value, raw));
                break;
              case 1:
                this.context.isAssignmentTarget = false;
                this.context.isBindingElement = false;
                token = this.nextToken();
                raw = this.getTokenRaw(token);
                expr = this.finalize(node, new Node.Literal(token.value === "true", raw));
                break;
              case 5:
                this.context.isAssignmentTarget = false;
                this.context.isBindingElement = false;
                token = this.nextToken();
                raw = this.getTokenRaw(token);
                expr = this.finalize(node, new Node.Literal(null, raw));
                break;
              case 10:
                expr = this.parseTemplateLiteral();
                break;
              case 7:
                switch (this.lookahead.value) {
                  case "(":
                    this.context.isBindingElement = false;
                    expr = this.inheritCoverGrammar(this.parseGroupExpression);
                    break;
                  case "[":
                    expr = this.inheritCoverGrammar(this.parseArrayInitializer);
                    break;
                  case "{":
                    expr = this.inheritCoverGrammar(this.parseObjectInitializer);
                    break;
                  case "/":
                  case "/=":
                    this.context.isAssignmentTarget = false;
                    this.context.isBindingElement = false;
                    this.scanner.index = this.startMarker.index;
                    token = this.nextRegexToken();
                    raw = this.getTokenRaw(token);
                    expr = this.finalize(node, new Node.RegexLiteral(token.regex, raw, token.pattern, token.flags));
                    break;
                  default:
                    expr = this.throwUnexpectedToken(this.nextToken());
                }
                break;
              case 4:
                if (!this.context.strict && this.context.allowYield && this.matchKeyword("yield")) {
                  expr = this.parseIdentifierName();
                } else if (!this.context.strict && this.matchKeyword("let")) {
                  expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
                } else {
                  this.context.isAssignmentTarget = false;
                  this.context.isBindingElement = false;
                  if (this.matchKeyword("function")) {
                    expr = this.parseFunctionExpression();
                  } else if (this.matchKeyword("this")) {
                    this.nextToken();
                    expr = this.finalize(node, new Node.ThisExpression);
                  } else if (this.matchKeyword("class")) {
                    expr = this.parseClassExpression();
                  } else {
                    expr = this.throwUnexpectedToken(this.nextToken());
                  }
                }
                break;
              default:
                expr = this.throwUnexpectedToken(this.nextToken());
            }
            return expr;
          };
          Parser2.prototype.parseSpreadElement = function() {
            var node = this.createNode();
            this.expect("...");
            var arg = this.inheritCoverGrammar(this.parseAssignmentExpression);
            return this.finalize(node, new Node.SpreadElement(arg));
          };
          Parser2.prototype.parseArrayInitializer = function() {
            var node = this.createNode();
            var elements = [];
            this.expect("[");
            while (!this.match("]")) {
              if (this.match(",")) {
                this.nextToken();
                elements.push(null);
              } else if (this.match("...")) {
                var element = this.parseSpreadElement();
                if (!this.match("]")) {
                  this.context.isAssignmentTarget = false;
                  this.context.isBindingElement = false;
                  this.expect(",");
                }
                elements.push(element);
              } else {
                elements.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
                if (!this.match("]")) {
                  this.expect(",");
                }
              }
            }
            this.expect("]");
            return this.finalize(node, new Node.ArrayExpression(elements));
          };
          Parser2.prototype.parsePropertyMethod = function(params) {
            this.context.isAssignmentTarget = false;
            this.context.isBindingElement = false;
            var previousStrict = this.context.strict;
            var previousAllowStrictDirective = this.context.allowStrictDirective;
            this.context.allowStrictDirective = params.simple;
            var body = this.isolateCoverGrammar(this.parseFunctionSourceElements);
            if (this.context.strict && params.firstRestricted) {
              this.tolerateUnexpectedToken(params.firstRestricted, params.message);
            }
            if (this.context.strict && params.stricted) {
              this.tolerateUnexpectedToken(params.stricted, params.message);
            }
            this.context.strict = previousStrict;
            this.context.allowStrictDirective = previousAllowStrictDirective;
            return body;
          };
          Parser2.prototype.parsePropertyMethodFunction = function() {
            var isGenerator = false;
            var node = this.createNode();
            var previousAllowYield = this.context.allowYield;
            this.context.allowYield = true;
            var params = this.parseFormalParameters();
            var method = this.parsePropertyMethod(params);
            this.context.allowYield = previousAllowYield;
            return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
          };
          Parser2.prototype.parsePropertyMethodAsyncFunction = function() {
            var node = this.createNode();
            var previousAllowYield = this.context.allowYield;
            var previousAwait = this.context.await;
            this.context.allowYield = false;
            this.context.await = true;
            var params = this.parseFormalParameters();
            var method = this.parsePropertyMethod(params);
            this.context.allowYield = previousAllowYield;
            this.context.await = previousAwait;
            return this.finalize(node, new Node.AsyncFunctionExpression(null, params.params, method));
          };
          Parser2.prototype.parseObjectPropertyKey = function() {
            var node = this.createNode();
            var token = this.nextToken();
            var key;
            switch (token.type) {
              case 8:
              case 6:
                if (this.context.strict && token.octal) {
                  this.tolerateUnexpectedToken(token, messages_1.Messages.StrictOctalLiteral);
                }
                var raw = this.getTokenRaw(token);
                key = this.finalize(node, new Node.Literal(token.value, raw));
                break;
              case 3:
              case 1:
              case 5:
              case 4:
                key = this.finalize(node, new Node.Identifier(token.value));
                break;
              case 7:
                if (token.value === "[") {
                  key = this.isolateCoverGrammar(this.parseAssignmentExpression);
                  this.expect("]");
                } else {
                  key = this.throwUnexpectedToken(token);
                }
                break;
              default:
                key = this.throwUnexpectedToken(token);
            }
            return key;
          };
          Parser2.prototype.isPropertyKey = function(key, value) {
            return key.type === syntax_1.Syntax.Identifier && key.name === value || key.type === syntax_1.Syntax.Literal && key.value === value;
          };
          Parser2.prototype.parseObjectProperty = function(hasProto) {
            var node = this.createNode();
            var token = this.lookahead;
            var kind;
            var key = null;
            var value = null;
            var computed = false;
            var method = false;
            var shorthand = false;
            var isAsync = false;
            if (token.type === 3) {
              var id = token.value;
              this.nextToken();
              computed = this.match("[");
              isAsync = !this.hasLineTerminator && id === "async" && !this.match(":") && !this.match("(") && !this.match("*") && !this.match(",");
              key = isAsync ? this.parseObjectPropertyKey() : this.finalize(node, new Node.Identifier(id));
            } else if (this.match("*")) {
              this.nextToken();
            } else {
              computed = this.match("[");
              key = this.parseObjectPropertyKey();
            }
            var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
            if (token.type === 3 && !isAsync && token.value === "get" && lookaheadPropertyKey) {
              kind = "get";
              computed = this.match("[");
              key = this.parseObjectPropertyKey();
              this.context.allowYield = false;
              value = this.parseGetterMethod();
            } else if (token.type === 3 && !isAsync && token.value === "set" && lookaheadPropertyKey) {
              kind = "set";
              computed = this.match("[");
              key = this.parseObjectPropertyKey();
              value = this.parseSetterMethod();
            } else if (token.type === 7 && token.value === "*" && lookaheadPropertyKey) {
              kind = "init";
              computed = this.match("[");
              key = this.parseObjectPropertyKey();
              value = this.parseGeneratorMethod();
              method = true;
            } else {
              if (!key) {
                this.throwUnexpectedToken(this.lookahead);
              }
              kind = "init";
              if (this.match(":") && !isAsync) {
                if (!computed && this.isPropertyKey(key, "__proto__")) {
                  if (hasProto.value) {
                    this.tolerateError(messages_1.Messages.DuplicateProtoProperty);
                  }
                  hasProto.value = true;
                }
                this.nextToken();
                value = this.inheritCoverGrammar(this.parseAssignmentExpression);
              } else if (this.match("(")) {
                value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
                method = true;
              } else if (token.type === 3) {
                var id = this.finalize(node, new Node.Identifier(token.value));
                if (this.match("=")) {
                  this.context.firstCoverInitializedNameError = this.lookahead;
                  this.nextToken();
                  shorthand = true;
                  var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
                  value = this.finalize(node, new Node.AssignmentPattern(id, init));
                } else {
                  shorthand = true;
                  value = id;
                }
              } else {
                this.throwUnexpectedToken(this.nextToken());
              }
            }
            return this.finalize(node, new Node.Property(kind, key, computed, value, method, shorthand));
          };
          Parser2.prototype.parseObjectInitializer = function() {
            var node = this.createNode();
            this.expect("{");
            var properties = [];
            var hasProto = { value: false };
            while (!this.match("}")) {
              properties.push(this.parseObjectProperty(hasProto));
              if (!this.match("}")) {
                this.expectCommaSeparator();
              }
            }
            this.expect("}");
            return this.finalize(node, new Node.ObjectExpression(properties));
          };
          Parser2.prototype.parseTemplateHead = function() {
            assert_1.assert(this.lookahead.head, "Template literal must start with a template head");
            var node = this.createNode();
            var token = this.nextToken();
            var raw = token.value;
            var cooked = token.cooked;
            return this.finalize(node, new Node.TemplateElement({ raw, cooked }, token.tail));
          };
          Parser2.prototype.parseTemplateElement = function() {
            if (this.lookahead.type !== 10) {
              this.throwUnexpectedToken();
            }
            var node = this.createNode();
            var token = this.nextToken();
            var raw = token.value;
            var cooked = token.cooked;
            return this.finalize(node, new Node.TemplateElement({ raw, cooked }, token.tail));
          };
          Parser2.prototype.parseTemplateLiteral = function() {
            var node = this.createNode();
            var expressions = [];
            var quasis = [];
            var quasi = this.parseTemplateHead();
            quasis.push(quasi);
            while (!quasi.tail) {
              expressions.push(this.parseExpression());
              quasi = this.parseTemplateElement();
              quasis.push(quasi);
            }
            return this.finalize(node, new Node.TemplateLiteral(quasis, expressions));
          };
          Parser2.prototype.reinterpretExpressionAsPattern = function(expr) {
            switch (expr.type) {
              case syntax_1.Syntax.Identifier:
              case syntax_1.Syntax.MemberExpression:
              case syntax_1.Syntax.RestElement:
              case syntax_1.Syntax.AssignmentPattern:
                break;
              case syntax_1.Syntax.SpreadElement:
                expr.type = syntax_1.Syntax.RestElement;
                this.reinterpretExpressionAsPattern(expr.argument);
                break;
              case syntax_1.Syntax.ArrayExpression:
                expr.type = syntax_1.Syntax.ArrayPattern;
                for (var i = 0;i < expr.elements.length; i++) {
                  if (expr.elements[i] !== null) {
                    this.reinterpretExpressionAsPattern(expr.elements[i]);
                  }
                }
                break;
              case syntax_1.Syntax.ObjectExpression:
                expr.type = syntax_1.Syntax.ObjectPattern;
                for (var i = 0;i < expr.properties.length; i++) {
                  this.reinterpretExpressionAsPattern(expr.properties[i].value);
                }
                break;
              case syntax_1.Syntax.AssignmentExpression:
                expr.type = syntax_1.Syntax.AssignmentPattern;
                delete expr.operator;
                this.reinterpretExpressionAsPattern(expr.left);
                break;
              default:
                break;
            }
          };
          Parser2.prototype.parseGroupExpression = function() {
            var expr;
            this.expect("(");
            if (this.match(")")) {
              this.nextToken();
              if (!this.match("=>")) {
                this.expect("=>");
              }
              expr = {
                type: ArrowParameterPlaceHolder,
                params: [],
                async: false
              };
            } else {
              var startToken = this.lookahead;
              var params = [];
              if (this.match("...")) {
                expr = this.parseRestElement(params);
                this.expect(")");
                if (!this.match("=>")) {
                  this.expect("=>");
                }
                expr = {
                  type: ArrowParameterPlaceHolder,
                  params: [expr],
                  async: false
                };
              } else {
                var arrow = false;
                this.context.isBindingElement = true;
                expr = this.inheritCoverGrammar(this.parseAssignmentExpression);
                if (this.match(",")) {
                  var expressions = [];
                  this.context.isAssignmentTarget = false;
                  expressions.push(expr);
                  while (this.lookahead.type !== 2) {
                    if (!this.match(",")) {
                      break;
                    }
                    this.nextToken();
                    if (this.match(")")) {
                      this.nextToken();
                      for (var i = 0;i < expressions.length; i++) {
                        this.reinterpretExpressionAsPattern(expressions[i]);
                      }
                      arrow = true;
                      expr = {
                        type: ArrowParameterPlaceHolder,
                        params: expressions,
                        async: false
                      };
                    } else if (this.match("...")) {
                      if (!this.context.isBindingElement) {
                        this.throwUnexpectedToken(this.lookahead);
                      }
                      expressions.push(this.parseRestElement(params));
                      this.expect(")");
                      if (!this.match("=>")) {
                        this.expect("=>");
                      }
                      this.context.isBindingElement = false;
                      for (var i = 0;i < expressions.length; i++) {
                        this.reinterpretExpressionAsPattern(expressions[i]);
                      }
                      arrow = true;
                      expr = {
                        type: ArrowParameterPlaceHolder,
                        params: expressions,
                        async: false
                      };
                    } else {
                      expressions.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
                    }
                    if (arrow) {
                      break;
                    }
                  }
                  if (!arrow) {
                    expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
                  }
                }
                if (!arrow) {
                  this.expect(")");
                  if (this.match("=>")) {
                    if (expr.type === syntax_1.Syntax.Identifier && expr.name === "yield") {
                      arrow = true;
                      expr = {
                        type: ArrowParameterPlaceHolder,
                        params: [expr],
                        async: false
                      };
                    }
                    if (!arrow) {
                      if (!this.context.isBindingElement) {
                        this.throwUnexpectedToken(this.lookahead);
                      }
                      if (expr.type === syntax_1.Syntax.SequenceExpression) {
                        for (var i = 0;i < expr.expressions.length; i++) {
                          this.reinterpretExpressionAsPattern(expr.expressions[i]);
                        }
                      } else {
                        this.reinterpretExpressionAsPattern(expr);
                      }
                      var parameters = expr.type === syntax_1.Syntax.SequenceExpression ? expr.expressions : [expr];
                      expr = {
                        type: ArrowParameterPlaceHolder,
                        params: parameters,
                        async: false
                      };
                    }
                  }
                  this.context.isBindingElement = false;
                }
              }
            }
            return expr;
          };
          Parser2.prototype.parseArguments = function() {
            this.expect("(");
            var args = [];
            if (!this.match(")")) {
              while (true) {
                var expr = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAssignmentExpression);
                args.push(expr);
                if (this.match(")")) {
                  break;
                }
                this.expectCommaSeparator();
                if (this.match(")")) {
                  break;
                }
              }
            }
            this.expect(")");
            return args;
          };
          Parser2.prototype.isIdentifierName = function(token) {
            return token.type === 3 || token.type === 4 || token.type === 1 || token.type === 5;
          };
          Parser2.prototype.parseIdentifierName = function() {
            var node = this.createNode();
            var token = this.nextToken();
            if (!this.isIdentifierName(token)) {
              this.throwUnexpectedToken(token);
            }
            return this.finalize(node, new Node.Identifier(token.value));
          };
          Parser2.prototype.parseNewExpression = function() {
            var node = this.createNode();
            var id = this.parseIdentifierName();
            assert_1.assert(id.name === "new", "New expression must start with `new`");
            var expr;
            if (this.match(".")) {
              this.nextToken();
              if (this.lookahead.type === 3 && this.context.inFunctionBody && this.lookahead.value === "target") {
                var property = this.parseIdentifierName();
                expr = new Node.MetaProperty(id, property);
              } else {
                this.throwUnexpectedToken(this.lookahead);
              }
            } else {
              var callee = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
              var args = this.match("(") ? this.parseArguments() : [];
              expr = new Node.NewExpression(callee, args);
              this.context.isAssignmentTarget = false;
              this.context.isBindingElement = false;
            }
            return this.finalize(node, expr);
          };
          Parser2.prototype.parseAsyncArgument = function() {
            var arg = this.parseAssignmentExpression();
            this.context.firstCoverInitializedNameError = null;
            return arg;
          };
          Parser2.prototype.parseAsyncArguments = function() {
            this.expect("(");
            var args = [];
            if (!this.match(")")) {
              while (true) {
                var expr = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAsyncArgument);
                args.push(expr);
                if (this.match(")")) {
                  break;
                }
                this.expectCommaSeparator();
                if (this.match(")")) {
                  break;
                }
              }
            }
            this.expect(")");
            return args;
          };
          Parser2.prototype.parseLeftHandSideExpressionAllowCall = function() {
            var startToken = this.lookahead;
            var maybeAsync = this.matchContextualKeyword("async");
            var previousAllowIn = this.context.allowIn;
            this.context.allowIn = true;
            var expr;
            if (this.matchKeyword("super") && this.context.inFunctionBody) {
              expr = this.createNode();
              this.nextToken();
              expr = this.finalize(expr, new Node.Super);
              if (!this.match("(") && !this.match(".") && !this.match("[")) {
                this.throwUnexpectedToken(this.lookahead);
              }
            } else {
              expr = this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression);
            }
            while (true) {
              if (this.match(".")) {
                this.context.isBindingElement = false;
                this.context.isAssignmentTarget = true;
                this.expect(".");
                var property = this.parseIdentifierName();
                expr = this.finalize(this.startNode(startToken), new Node.StaticMemberExpression(expr, property));
              } else if (this.match("(")) {
                var asyncArrow = maybeAsync && startToken.lineNumber === this.lookahead.lineNumber;
                this.context.isBindingElement = false;
                this.context.isAssignmentTarget = false;
                var args = asyncArrow ? this.parseAsyncArguments() : this.parseArguments();
                expr = this.finalize(this.startNode(startToken), new Node.CallExpression(expr, args));
                if (asyncArrow && this.match("=>")) {
                  for (var i = 0;i < args.length; ++i) {
                    this.reinterpretExpressionAsPattern(args[i]);
                  }
                  expr = {
                    type: ArrowParameterPlaceHolder,
                    params: args,
                    async: true
                  };
                }
              } else if (this.match("[")) {
                this.context.isBindingElement = false;
                this.context.isAssignmentTarget = true;
                this.expect("[");
                var property = this.isolateCoverGrammar(this.parseExpression);
                this.expect("]");
                expr = this.finalize(this.startNode(startToken), new Node.ComputedMemberExpression(expr, property));
              } else if (this.lookahead.type === 10 && this.lookahead.head) {
                var quasi = this.parseTemplateLiteral();
                expr = this.finalize(this.startNode(startToken), new Node.TaggedTemplateExpression(expr, quasi));
              } else {
                break;
              }
            }
            this.context.allowIn = previousAllowIn;
            return expr;
          };
          Parser2.prototype.parseSuper = function() {
            var node = this.createNode();
            this.expectKeyword("super");
            if (!this.match("[") && !this.match(".")) {
              this.throwUnexpectedToken(this.lookahead);
            }
            return this.finalize(node, new Node.Super);
          };
          Parser2.prototype.parseLeftHandSideExpression = function() {
            assert_1.assert(this.context.allowIn, "callee of new expression always allow in keyword.");
            var node = this.startNode(this.lookahead);
            var expr = this.matchKeyword("super") && this.context.inFunctionBody ? this.parseSuper() : this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression);
            while (true) {
              if (this.match("[")) {
                this.context.isBindingElement = false;
                this.context.isAssignmentTarget = true;
                this.expect("[");
                var property = this.isolateCoverGrammar(this.parseExpression);
                this.expect("]");
                expr = this.finalize(node, new Node.ComputedMemberExpression(expr, property));
              } else if (this.match(".")) {
                this.context.isBindingElement = false;
                this.context.isAssignmentTarget = true;
                this.expect(".");
                var property = this.parseIdentifierName();
                expr = this.finalize(node, new Node.StaticMemberExpression(expr, property));
              } else if (this.lookahead.type === 10 && this.lookahead.head) {
                var quasi = this.parseTemplateLiteral();
                expr = this.finalize(node, new Node.TaggedTemplateExpression(expr, quasi));
              } else {
                break;
              }
            }
            return expr;
          };
          Parser2.prototype.parseUpdateExpression = function() {
            var expr;
            var startToken = this.lookahead;
            if (this.match("++") || this.match("--")) {
              var node = this.startNode(startToken);
              var token = this.nextToken();
              expr = this.inheritCoverGrammar(this.parseUnaryExpression);
              if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
                this.tolerateError(messages_1.Messages.StrictLHSPrefix);
              }
              if (!this.context.isAssignmentTarget) {
                this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
              }
              var prefix = true;
              expr = this.finalize(node, new Node.UpdateExpression(token.value, expr, prefix));
              this.context.isAssignmentTarget = false;
              this.context.isBindingElement = false;
            } else {
              expr = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
              if (!this.hasLineTerminator && this.lookahead.type === 7) {
                if (this.match("++") || this.match("--")) {
                  if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
                    this.tolerateError(messages_1.Messages.StrictLHSPostfix);
                  }
                  if (!this.context.isAssignmentTarget) {
                    this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
                  }
                  this.context.isAssignmentTarget = false;
                  this.context.isBindingElement = false;
                  var operator = this.nextToken().value;
                  var prefix = false;
                  expr = this.finalize(this.startNode(startToken), new Node.UpdateExpression(operator, expr, prefix));
                }
              }
            }
            return expr;
          };
          Parser2.prototype.parseAwaitExpression = function() {
            var node = this.createNode();
            this.nextToken();
            var argument = this.parseUnaryExpression();
            return this.finalize(node, new Node.AwaitExpression(argument));
          };
          Parser2.prototype.parseUnaryExpression = function() {
            var expr;
            if (this.match("+") || this.match("-") || this.match("~") || this.match("!") || this.matchKeyword("delete") || this.matchKeyword("void") || this.matchKeyword("typeof")) {
              var node = this.startNode(this.lookahead);
              var token = this.nextToken();
              expr = this.inheritCoverGrammar(this.parseUnaryExpression);
              expr = this.finalize(node, new Node.UnaryExpression(token.value, expr));
              if (this.context.strict && expr.operator === "delete" && expr.argument.type === syntax_1.Syntax.Identifier) {
                this.tolerateError(messages_1.Messages.StrictDelete);
              }
              this.context.isAssignmentTarget = false;
              this.context.isBindingElement = false;
            } else if (this.context.await && this.matchContextualKeyword("await")) {
              expr = this.parseAwaitExpression();
            } else {
              expr = this.parseUpdateExpression();
            }
            return expr;
          };
          Parser2.prototype.parseExponentiationExpression = function() {
            var startToken = this.lookahead;
            var expr = this.inheritCoverGrammar(this.parseUnaryExpression);
            if (expr.type !== syntax_1.Syntax.UnaryExpression && this.match("**")) {
              this.nextToken();
              this.context.isAssignmentTarget = false;
              this.context.isBindingElement = false;
              var left = expr;
              var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
              expr = this.finalize(this.startNode(startToken), new Node.BinaryExpression("**", left, right));
            }
            return expr;
          };
          Parser2.prototype.binaryPrecedence = function(token) {
            var op = token.value;
            var precedence;
            if (token.type === 7) {
              precedence = this.operatorPrecedence[op] || 0;
            } else if (token.type === 4) {
              precedence = op === "instanceof" || this.context.allowIn && op === "in" ? 7 : 0;
            } else {
              precedence = 0;
            }
            return precedence;
          };
          Parser2.prototype.parseBinaryExpression = function() {
            var startToken = this.lookahead;
            var expr = this.inheritCoverGrammar(this.parseExponentiationExpression);
            var token = this.lookahead;
            var prec = this.binaryPrecedence(token);
            if (prec > 0) {
              this.nextToken();
              this.context.isAssignmentTarget = false;
              this.context.isBindingElement = false;
              var markers = [startToken, this.lookahead];
              var left = expr;
              var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
              var stack = [left, token.value, right];
              var precedences = [prec];
              while (true) {
                prec = this.binaryPrecedence(this.lookahead);
                if (prec <= 0) {
                  break;
                }
                while (stack.length > 2 && prec <= precedences[precedences.length - 1]) {
                  right = stack.pop();
                  var operator = stack.pop();
                  precedences.pop();
                  left = stack.pop();
                  markers.pop();
                  var node = this.startNode(markers[markers.length - 1]);
                  stack.push(this.finalize(node, new Node.BinaryExpression(operator, left, right)));
                }
                stack.push(this.nextToken().value);
                precedences.push(prec);
                markers.push(this.lookahead);
                stack.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
              }
              var i = stack.length - 1;
              expr = stack[i];
              var lastMarker = markers.pop();
              while (i > 1) {
                var marker = markers.pop();
                var lastLineStart = lastMarker && lastMarker.lineStart;
                var node = this.startNode(marker, lastLineStart);
                var operator = stack[i - 1];
                expr = this.finalize(node, new Node.BinaryExpression(operator, stack[i - 2], expr));
                i -= 2;
                lastMarker = marker;
              }
            }
            return expr;
          };
          Parser2.prototype.parseConditionalExpression = function() {
            var startToken = this.lookahead;
            var expr = this.inheritCoverGrammar(this.parseBinaryExpression);
            if (this.match("?")) {
              this.nextToken();
              var previousAllowIn = this.context.allowIn;
              this.context.allowIn = true;
              var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
              this.context.allowIn = previousAllowIn;
              this.expect(":");
              var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
              expr = this.finalize(this.startNode(startToken), new Node.ConditionalExpression(expr, consequent, alternate));
              this.context.isAssignmentTarget = false;
              this.context.isBindingElement = false;
            }
            return expr;
          };
          Parser2.prototype.checkPatternParam = function(options, param) {
            switch (param.type) {
              case syntax_1.Syntax.Identifier:
                this.validateParam(options, param, param.name);
                break;
              case syntax_1.Syntax.RestElement:
                this.checkPatternParam(options, param.argument);
                break;
              case syntax_1.Syntax.AssignmentPattern:
                this.checkPatternParam(options, param.left);
                break;
              case syntax_1.Syntax.ArrayPattern:
                for (var i = 0;i < param.elements.length; i++) {
                  if (param.elements[i] !== null) {
                    this.checkPatternParam(options, param.elements[i]);
                  }
                }
                break;
              case syntax_1.Syntax.ObjectPattern:
                for (var i = 0;i < param.properties.length; i++) {
                  this.checkPatternParam(options, param.properties[i].value);
                }
                break;
              default:
                break;
            }
            options.simple = options.simple && param instanceof Node.Identifier;
          };
          Parser2.prototype.reinterpretAsCoverFormalsList = function(expr) {
            var params = [expr];
            var options;
            var asyncArrow = false;
            switch (expr.type) {
              case syntax_1.Syntax.Identifier:
                break;
              case ArrowParameterPlaceHolder:
                params = expr.params;
                asyncArrow = expr.async;
                break;
              default:
                return null;
            }
            options = {
              simple: true,
              paramSet: {}
            };
            for (var i = 0;i < params.length; ++i) {
              var param = params[i];
              if (param.type === syntax_1.Syntax.AssignmentPattern) {
                if (param.right.type === syntax_1.Syntax.YieldExpression) {
                  if (param.right.argument) {
                    this.throwUnexpectedToken(this.lookahead);
                  }
                  param.right.type = syntax_1.Syntax.Identifier;
                  param.right.name = "yield";
                  delete param.right.argument;
                  delete param.right.delegate;
                }
              } else if (asyncArrow && param.type === syntax_1.Syntax.Identifier && param.name === "await") {
                this.throwUnexpectedToken(this.lookahead);
              }
              this.checkPatternParam(options, param);
              params[i] = param;
            }
            if (this.context.strict || !this.context.allowYield) {
              for (var i = 0;i < params.length; ++i) {
                var param = params[i];
                if (param.type === syntax_1.Syntax.YieldExpression) {
                  this.throwUnexpectedToken(this.lookahead);
                }
              }
            }
            if (options.message === messages_1.Messages.StrictParamDupe) {
              var token = this.context.strict ? options.stricted : options.firstRestricted;
              this.throwUnexpectedToken(token, options.message);
            }
            return {
              simple: options.simple,
              params,
              stricted: options.stricted,
              firstRestricted: options.firstRestricted,
              message: options.message
            };
          };
          Parser2.prototype.parseAssignmentExpression = function() {
            var expr;
            if (!this.context.allowYield && this.matchKeyword("yield")) {
              expr = this.parseYieldExpression();
            } else {
              var startToken = this.lookahead;
              var token = startToken;
              expr = this.parseConditionalExpression();
              if (token.type === 3 && token.lineNumber === this.lookahead.lineNumber && token.value === "async") {
                if (this.lookahead.type === 3 || this.matchKeyword("yield")) {
                  var arg = this.parsePrimaryExpression();
                  this.reinterpretExpressionAsPattern(arg);
                  expr = {
                    type: ArrowParameterPlaceHolder,
                    params: [arg],
                    async: true
                  };
                }
              }
              if (expr.type === ArrowParameterPlaceHolder || this.match("=>")) {
                this.context.isAssignmentTarget = false;
                this.context.isBindingElement = false;
                var isAsync = expr.async;
                var list = this.reinterpretAsCoverFormalsList(expr);
                if (list) {
                  if (this.hasLineTerminator) {
                    this.tolerateUnexpectedToken(this.lookahead);
                  }
                  this.context.firstCoverInitializedNameError = null;
                  var previousStrict = this.context.strict;
                  var previousAllowStrictDirective = this.context.allowStrictDirective;
                  this.context.allowStrictDirective = list.simple;
                  var previousAllowYield = this.context.allowYield;
                  var previousAwait = this.context.await;
                  this.context.allowYield = true;
                  this.context.await = isAsync;
                  var node = this.startNode(startToken);
                  this.expect("=>");
                  var body = undefined;
                  if (this.match("{")) {
                    var previousAllowIn = this.context.allowIn;
                    this.context.allowIn = true;
                    body = this.parseFunctionSourceElements();
                    this.context.allowIn = previousAllowIn;
                  } else {
                    body = this.isolateCoverGrammar(this.parseAssignmentExpression);
                  }
                  var expression = body.type !== syntax_1.Syntax.BlockStatement;
                  if (this.context.strict && list.firstRestricted) {
                    this.throwUnexpectedToken(list.firstRestricted, list.message);
                  }
                  if (this.context.strict && list.stricted) {
                    this.tolerateUnexpectedToken(list.stricted, list.message);
                  }
                  expr = isAsync ? this.finalize(node, new Node.AsyncArrowFunctionExpression(list.params, body, expression)) : this.finalize(node, new Node.ArrowFunctionExpression(list.params, body, expression));
                  this.context.strict = previousStrict;
                  this.context.allowStrictDirective = previousAllowStrictDirective;
                  this.context.allowYield = previousAllowYield;
                  this.context.await = previousAwait;
                }
              } else {
                if (this.matchAssign()) {
                  if (!this.context.isAssignmentTarget) {
                    this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
                  }
                  if (this.context.strict && expr.type === syntax_1.Syntax.Identifier) {
                    var id = expr;
                    if (this.scanner.isRestrictedWord(id.name)) {
                      this.tolerateUnexpectedToken(token, messages_1.Messages.StrictLHSAssignment);
                    }
                    if (this.scanner.isStrictModeReservedWord(id.name)) {
                      this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
                    }
                  }
                  if (!this.match("=")) {
                    this.context.isAssignmentTarget = false;
                    this.context.isBindingElement = false;
                  } else {
                    this.reinterpretExpressionAsPattern(expr);
                  }
                  token = this.nextToken();
                  var operator = token.value;
                  var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
                  expr = this.finalize(this.startNode(startToken), new Node.AssignmentExpression(operator, expr, right));
                  this.context.firstCoverInitializedNameError = null;
                }
              }
            }
            return expr;
          };
          Parser2.prototype.parseExpression = function() {
            var startToken = this.lookahead;
            var expr = this.isolateCoverGrammar(this.parseAssignmentExpression);
            if (this.match(",")) {
              var expressions = [];
              expressions.push(expr);
              while (this.lookahead.type !== 2) {
                if (!this.match(",")) {
                  break;
                }
                this.nextToken();
                expressions.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
              }
              expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
            }
            return expr;
          };
          Parser2.prototype.parseStatementListItem = function() {
            var statement;
            this.context.isAssignmentTarget = true;
            this.context.isBindingElement = true;
            if (this.lookahead.type === 4) {
              switch (this.lookahead.value) {
                case "export":
                  if (!this.context.isModule) {
                    this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalExportDeclaration);
                  }
                  statement = this.parseExportDeclaration();
                  break;
                case "import":
                  if (!this.context.isModule) {
                    this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalImportDeclaration);
                  }
                  statement = this.parseImportDeclaration();
                  break;
                case "const":
                  statement = this.parseLexicalDeclaration({ inFor: false });
                  break;
                case "function":
                  statement = this.parseFunctionDeclaration();
                  break;
                case "class":
                  statement = this.parseClassDeclaration();
                  break;
                case "let":
                  statement = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({ inFor: false }) : this.parseStatement();
                  break;
                default:
                  statement = this.parseStatement();
                  break;
              }
            } else {
              statement = this.parseStatement();
            }
            return statement;
          };
          Parser2.prototype.parseBlock = function() {
            var node = this.createNode();
            this.expect("{");
            var block = [];
            while (true) {
              if (this.match("}")) {
                break;
              }
              block.push(this.parseStatementListItem());
            }
            this.expect("}");
            return this.finalize(node, new Node.BlockStatement(block));
          };
          Parser2.prototype.parseLexicalBinding = function(kind, options) {
            var node = this.createNode();
            var params = [];
            var id = this.parsePattern(params, kind);
            if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
              if (this.scanner.isRestrictedWord(id.name)) {
                this.tolerateError(messages_1.Messages.StrictVarName);
              }
            }
            var init = null;
            if (kind === "const") {
              if (!this.matchKeyword("in") && !this.matchContextualKeyword("of")) {
                if (this.match("=")) {
                  this.nextToken();
                  init = this.isolateCoverGrammar(this.parseAssignmentExpression);
                } else {
                  this.throwError(messages_1.Messages.DeclarationMissingInitializer, "const");
                }
              }
            } else if (!options.inFor && id.type !== syntax_1.Syntax.Identifier || this.match("=")) {
              this.expect("=");
              init = this.isolateCoverGrammar(this.parseAssignmentExpression);
            }
            return this.finalize(node, new Node.VariableDeclarator(id, init));
          };
          Parser2.prototype.parseBindingList = function(kind, options) {
            var list = [this.parseLexicalBinding(kind, options)];
            while (this.match(",")) {
              this.nextToken();
              list.push(this.parseLexicalBinding(kind, options));
            }
            return list;
          };
          Parser2.prototype.isLexicalDeclaration = function() {
            var state = this.scanner.saveState();
            this.scanner.scanComments();
            var next = this.scanner.lex();
            this.scanner.restoreState(state);
            return next.type === 3 || next.type === 7 && next.value === "[" || next.type === 7 && next.value === "{" || next.type === 4 && next.value === "let" || next.type === 4 && next.value === "yield";
          };
          Parser2.prototype.parseLexicalDeclaration = function(options) {
            var node = this.createNode();
            var kind = this.nextToken().value;
            assert_1.assert(kind === "let" || kind === "const", "Lexical declaration must be either let or const");
            var declarations = this.parseBindingList(kind, options);
            this.consumeSemicolon();
            return this.finalize(node, new Node.VariableDeclaration(declarations, kind));
          };
          Parser2.prototype.parseBindingRestElement = function(params, kind) {
            var node = this.createNode();
            this.expect("...");
            var arg = this.parsePattern(params, kind);
            return this.finalize(node, new Node.RestElement(arg));
          };
          Parser2.prototype.parseArrayPattern = function(params, kind) {
            var node = this.createNode();
            this.expect("[");
            var elements = [];
            while (!this.match("]")) {
              if (this.match(",")) {
                this.nextToken();
                elements.push(null);
              } else {
                if (this.match("...")) {
                  elements.push(this.parseBindingRestElement(params, kind));
                  break;
                } else {
                  elements.push(this.parsePatternWithDefault(params, kind));
                }
                if (!this.match("]")) {
                  this.expect(",");
                }
              }
            }
            this.expect("]");
            return this.finalize(node, new Node.ArrayPattern(elements));
          };
          Parser2.prototype.parsePropertyPattern = function(params, kind) {
            var node = this.createNode();
            var computed = false;
            var shorthand = false;
            var method = false;
            var key;
            var value;
            if (this.lookahead.type === 3) {
              var keyToken = this.lookahead;
              key = this.parseVariableIdentifier();
              var init = this.finalize(node, new Node.Identifier(keyToken.value));
              if (this.match("=")) {
                params.push(keyToken);
                shorthand = true;
                this.nextToken();
                var expr = this.parseAssignmentExpression();
                value = this.finalize(this.startNode(keyToken), new Node.AssignmentPattern(init, expr));
              } else if (!this.match(":")) {
                params.push(keyToken);
                shorthand = true;
                value = init;
              } else {
                this.expect(":");
                value = this.parsePatternWithDefault(params, kind);
              }
            } else {
              computed = this.match("[");
              key = this.parseObjectPropertyKey();
              this.expect(":");
              value = this.parsePatternWithDefault(params, kind);
            }
            return this.finalize(node, new Node.Property("init", key, computed, value, method, shorthand));
          };
          Parser2.prototype.parseObjectPattern = function(params, kind) {
            var node = this.createNode();
            var properties = [];
            this.expect("{");
            while (!this.match("}")) {
              properties.push(this.parsePropertyPattern(params, kind));
              if (!this.match("}")) {
                this.expect(",");
              }
            }
            this.expect("}");
            return this.finalize(node, new Node.ObjectPattern(properties));
          };
          Parser2.prototype.parsePattern = function(params, kind) {
            var pattern;
            if (this.match("[")) {
              pattern = this.parseArrayPattern(params, kind);
            } else if (this.match("{")) {
              pattern = this.parseObjectPattern(params, kind);
            } else {
              if (this.matchKeyword("let") && (kind === "const" || kind === "let")) {
                this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.LetInLexicalBinding);
              }
              params.push(this.lookahead);
              pattern = this.parseVariableIdentifier(kind);
            }
            return pattern;
          };
          Parser2.prototype.parsePatternWithDefault = function(params, kind) {
            var startToken = this.lookahead;
            var pattern = this.parsePattern(params, kind);
            if (this.match("=")) {
              this.nextToken();
              var previousAllowYield = this.context.allowYield;
              this.context.allowYield = true;
              var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
              this.context.allowYield = previousAllowYield;
              pattern = this.finalize(this.startNode(startToken), new Node.AssignmentPattern(pattern, right));
            }
            return pattern;
          };
          Parser2.prototype.parseVariableIdentifier = function(kind) {
            var node = this.createNode();
            var token = this.nextToken();
            if (token.type === 4 && token.value === "yield") {
              if (this.context.strict) {
                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
              } else if (!this.context.allowYield) {
                this.throwUnexpectedToken(token);
              }
            } else if (token.type !== 3) {
              if (this.context.strict && token.type === 4 && this.scanner.isStrictModeReservedWord(token.value)) {
                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
              } else {
                if (this.context.strict || token.value !== "let" || kind !== "var") {
                  this.throwUnexpectedToken(token);
                }
              }
            } else if ((this.context.isModule || this.context.await) && token.type === 3 && token.value === "await") {
              this.tolerateUnexpectedToken(token);
            }
            return this.finalize(node, new Node.Identifier(token.value));
          };
          Parser2.prototype.parseVariableDeclaration = function(options) {
            var node = this.createNode();
            var params = [];
            var id = this.parsePattern(params, "var");
            if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
              if (this.scanner.isRestrictedWord(id.name)) {
                this.tolerateError(messages_1.Messages.StrictVarName);
              }
            }
            var init = null;
            if (this.match("=")) {
              this.nextToken();
              init = this.isolateCoverGrammar(this.parseAssignmentExpression);
            } else if (id.type !== syntax_1.Syntax.Identifier && !options.inFor) {
              this.expect("=");
            }
            return this.finalize(node, new Node.VariableDeclarator(id, init));
          };
          Parser2.prototype.parseVariableDeclarationList = function(options) {
            var opt = { inFor: options.inFor };
            var list = [];
            list.push(this.parseVariableDeclaration(opt));
            while (this.match(",")) {
              this.nextToken();
              list.push(this.parseVariableDeclaration(opt));
            }
            return list;
          };
          Parser2.prototype.parseVariableStatement = function() {
            var node = this.createNode();
            this.expectKeyword("var");
            var declarations = this.parseVariableDeclarationList({ inFor: false });
            this.consumeSemicolon();
            return this.finalize(node, new Node.VariableDeclaration(declarations, "var"));
          };
          Parser2.prototype.parseEmptyStatement = function() {
            var node = this.createNode();
            this.expect(";");
            return this.finalize(node, new Node.EmptyStatement);
          };
          Parser2.prototype.parseExpressionStatement = function() {
            var node = this.createNode();
            var expr = this.parseExpression();
            this.consumeSemicolon();
            return this.finalize(node, new Node.ExpressionStatement(expr));
          };
          Parser2.prototype.parseIfClause = function() {
            if (this.context.strict && this.matchKeyword("function")) {
              this.tolerateError(messages_1.Messages.StrictFunction);
            }
            return this.parseStatement();
          };
          Parser2.prototype.parseIfStatement = function() {
            var node = this.createNode();
            var consequent;
            var alternate = null;
            this.expectKeyword("if");
            this.expect("(");
            var test = this.parseExpression();
            if (!this.match(")") && this.config.tolerant) {
              this.tolerateUnexpectedToken(this.nextToken());
              consequent = this.finalize(this.createNode(), new Node.EmptyStatement);
            } else {
              this.expect(")");
              consequent = this.parseIfClause();
              if (this.matchKeyword("else")) {
                this.nextToken();
                alternate = this.parseIfClause();
              }
            }
            return this.finalize(node, new Node.IfStatement(test, consequent, alternate));
          };
          Parser2.prototype.parseDoWhileStatement = function() {
            var node = this.createNode();
            this.expectKeyword("do");
            var previousInIteration = this.context.inIteration;
            this.context.inIteration = true;
            var body = this.parseStatement();
            this.context.inIteration = previousInIteration;
            this.expectKeyword("while");
            this.expect("(");
            var test = this.parseExpression();
            if (!this.match(")") && this.config.tolerant) {
              this.tolerateUnexpectedToken(this.nextToken());
            } else {
              this.expect(")");
              if (this.match(";")) {
                this.nextToken();
              }
            }
            return this.finalize(node, new Node.DoWhileStatement(body, test));
          };
          Parser2.prototype.parseWhileStatement = function() {
            var node = this.createNode();
            var body;
            this.expectKeyword("while");
            this.expect("(");
            var test = this.parseExpression();
            if (!this.match(")") && this.config.tolerant) {
              this.tolerateUnexpectedToken(this.nextToken());
              body = this.finalize(this.createNode(), new Node.EmptyStatement);
            } else {
              this.expect(")");
              var previousInIteration = this.context.inIteration;
              this.context.inIteration = true;
              body = this.parseStatement();
              this.context.inIteration = previousInIteration;
            }
            return this.finalize(node, new Node.WhileStatement(test, body));
          };
          Parser2.prototype.parseForStatement = function() {
            var init = null;
            var test = null;
            var update = null;
            var forIn = true;
            var left, right;
            var node = this.createNode();
            this.expectKeyword("for");
            this.expect("(");
            if (this.match(";")) {
              this.nextToken();
            } else {
              if (this.matchKeyword("var")) {
                init = this.createNode();
                this.nextToken();
                var previousAllowIn = this.context.allowIn;
                this.context.allowIn = false;
                var declarations = this.parseVariableDeclarationList({ inFor: true });
                this.context.allowIn = previousAllowIn;
                if (declarations.length === 1 && this.matchKeyword("in")) {
                  var decl = declarations[0];
                  if (decl.init && (decl.id.type === syntax_1.Syntax.ArrayPattern || decl.id.type === syntax_1.Syntax.ObjectPattern || this.context.strict)) {
                    this.tolerateError(messages_1.Messages.ForInOfLoopInitializer, "for-in");
                  }
                  init = this.finalize(init, new Node.VariableDeclaration(declarations, "var"));
                  this.nextToken();
                  left = init;
                  right = this.parseExpression();
                  init = null;
                } else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword("of")) {
                  init = this.finalize(init, new Node.VariableDeclaration(declarations, "var"));
                  this.nextToken();
                  left = init;
                  right = this.parseAssignmentExpression();
                  init = null;
                  forIn = false;
                } else {
                  init = this.finalize(init, new Node.VariableDeclaration(declarations, "var"));
                  this.expect(";");
                }
              } else if (this.matchKeyword("const") || this.matchKeyword("let")) {
                init = this.createNode();
                var kind = this.nextToken().value;
                if (!this.context.strict && this.lookahead.value === "in") {
                  init = this.finalize(init, new Node.Identifier(kind));
                  this.nextToken();
                  left = init;
                  right = this.parseExpression();
                  init = null;
                } else {
                  var previousAllowIn = this.context.allowIn;
                  this.context.allowIn = false;
                  var declarations = this.parseBindingList(kind, { inFor: true });
                  this.context.allowIn = previousAllowIn;
                  if (declarations.length === 1 && declarations[0].init === null && this.matchKeyword("in")) {
                    init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
                    this.nextToken();
                    left = init;
                    right = this.parseExpression();
                    init = null;
                  } else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword("of")) {
                    init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
                    this.nextToken();
                    left = init;
                    right = this.parseAssignmentExpression();
                    init = null;
                    forIn = false;
                  } else {
                    this.consumeSemicolon();
                    init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
                  }
                }
              } else {
                var initStartToken = this.lookahead;
                var previousAllowIn = this.context.allowIn;
                this.context.allowIn = false;
                init = this.inheritCoverGrammar(this.parseAssignmentExpression);
                this.context.allowIn = previousAllowIn;
                if (this.matchKeyword("in")) {
                  if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
                    this.tolerateError(messages_1.Messages.InvalidLHSInForIn);
                  }
                  this.nextToken();
                  this.reinterpretExpressionAsPattern(init);
                  left = init;
                  right = this.parseExpression();
                  init = null;
                } else if (this.matchContextualKeyword("of")) {
                  if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
                    this.tolerateError(messages_1.Messages.InvalidLHSInForLoop);
                  }
                  this.nextToken();
                  this.reinterpretExpressionAsPattern(init);
                  left = init;
                  right = this.parseAssignmentExpression();
                  init = null;
                  forIn = false;
                } else {
                  if (this.match(",")) {
                    var initSeq = [init];
                    while (this.match(",")) {
                      this.nextToken();
                      initSeq.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                    }
                    init = this.finalize(this.startNode(initStartToken), new Node.SequenceExpression(initSeq));
                  }
                  this.expect(";");
                }
              }
            }
            if (typeof left === "undefined") {
              if (!this.match(";")) {
                test = this.parseExpression();
              }
              this.expect(";");
              if (!this.match(")")) {
                update = this.parseExpression();
              }
            }
            var body;
            if (!this.match(")") && this.config.tolerant) {
              this.tolerateUnexpectedToken(this.nextToken());
              body = this.finalize(this.createNode(), new Node.EmptyStatement);
            } else {
              this.expect(")");
              var previousInIteration = this.context.inIteration;
              this.context.inIteration = true;
              body = this.isolateCoverGrammar(this.parseStatement);
              this.context.inIteration = previousInIteration;
            }
            return typeof left === "undefined" ? this.finalize(node, new Node.ForStatement(init, test, update, body)) : forIn ? this.finalize(node, new Node.ForInStatement(left, right, body)) : this.finalize(node, new Node.ForOfStatement(left, right, body));
          };
          Parser2.prototype.parseContinueStatement = function() {
            var node = this.createNode();
            this.expectKeyword("continue");
            var label = null;
            if (this.lookahead.type === 3 && !this.hasLineTerminator) {
              var id = this.parseVariableIdentifier();
              label = id;
              var key = "$" + id.name;
              if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
                this.throwError(messages_1.Messages.UnknownLabel, id.name);
              }
            }
            this.consumeSemicolon();
            if (label === null && !this.context.inIteration) {
              this.throwError(messages_1.Messages.IllegalContinue);
            }
            return this.finalize(node, new Node.ContinueStatement(label));
          };
          Parser2.prototype.parseBreakStatement = function() {
            var node = this.createNode();
            this.expectKeyword("break");
            var label = null;
            if (this.lookahead.type === 3 && !this.hasLineTerminator) {
              var id = this.parseVariableIdentifier();
              var key = "$" + id.name;
              if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
                this.throwError(messages_1.Messages.UnknownLabel, id.name);
              }
              label = id;
            }
            this.consumeSemicolon();
            if (label === null && !this.context.inIteration && !this.context.inSwitch) {
              this.throwError(messages_1.Messages.IllegalBreak);
            }
            return this.finalize(node, new Node.BreakStatement(label));
          };
          Parser2.prototype.parseReturnStatement = function() {
            if (!this.context.inFunctionBody) {
              this.tolerateError(messages_1.Messages.IllegalReturn);
            }
            var node = this.createNode();
            this.expectKeyword("return");
            var hasArgument = !this.match(";") && !this.match("}") && !this.hasLineTerminator && this.lookahead.type !== 2 || this.lookahead.type === 8 || this.lookahead.type === 10;
            var argument = hasArgument ? this.parseExpression() : null;
            this.consumeSemicolon();
            return this.finalize(node, new Node.ReturnStatement(argument));
          };
          Parser2.prototype.parseWithStatement = function() {
            if (this.context.strict) {
              this.tolerateError(messages_1.Messages.StrictModeWith);
            }
            var node = this.createNode();
            var body;
            this.expectKeyword("with");
            this.expect("(");
            var object = this.parseExpression();
            if (!this.match(")") && this.config.tolerant) {
              this.tolerateUnexpectedToken(this.nextToken());
              body = this.finalize(this.createNode(), new Node.EmptyStatement);
            } else {
              this.expect(")");
              body = this.parseStatement();
            }
            return this.finalize(node, new Node.WithStatement(object, body));
          };
          Parser2.prototype.parseSwitchCase = function() {
            var node = this.createNode();
            var test;
            if (this.matchKeyword("default")) {
              this.nextToken();
              test = null;
            } else {
              this.expectKeyword("case");
              test = this.parseExpression();
            }
            this.expect(":");
            var consequent = [];
            while (true) {
              if (this.match("}") || this.matchKeyword("default") || this.matchKeyword("case")) {
                break;
              }
              consequent.push(this.parseStatementListItem());
            }
            return this.finalize(node, new Node.SwitchCase(test, consequent));
          };
          Parser2.prototype.parseSwitchStatement = function() {
            var node = this.createNode();
            this.expectKeyword("switch");
            this.expect("(");
            var discriminant = this.parseExpression();
            this.expect(")");
            var previousInSwitch = this.context.inSwitch;
            this.context.inSwitch = true;
            var cases = [];
            var defaultFound = false;
            this.expect("{");
            while (true) {
              if (this.match("}")) {
                break;
              }
              var clause = this.parseSwitchCase();
              if (clause.test === null) {
                if (defaultFound) {
                  this.throwError(messages_1.Messages.MultipleDefaultsInSwitch);
                }
                defaultFound = true;
              }
              cases.push(clause);
            }
            this.expect("}");
            this.context.inSwitch = previousInSwitch;
            return this.finalize(node, new Node.SwitchStatement(discriminant, cases));
          };
          Parser2.prototype.parseLabelledStatement = function() {
            var node = this.createNode();
            var expr = this.parseExpression();
            var statement;
            if (expr.type === syntax_1.Syntax.Identifier && this.match(":")) {
              this.nextToken();
              var id = expr;
              var key = "$" + id.name;
              if (Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
                this.throwError(messages_1.Messages.Redeclaration, "Label", id.name);
              }
              this.context.labelSet[key] = true;
              var body = undefined;
              if (this.matchKeyword("class")) {
                this.tolerateUnexpectedToken(this.lookahead);
                body = this.parseClassDeclaration();
              } else if (this.matchKeyword("function")) {
                var token = this.lookahead;
                var declaration = this.parseFunctionDeclaration();
                if (this.context.strict) {
                  this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunction);
                } else if (declaration.generator) {
                  this.tolerateUnexpectedToken(token, messages_1.Messages.GeneratorInLegacyContext);
                }
                body = declaration;
              } else {
                body = this.parseStatement();
              }
              delete this.context.labelSet[key];
              statement = new Node.LabeledStatement(id, body);
            } else {
              this.consumeSemicolon();
              statement = new Node.ExpressionStatement(expr);
            }
            return this.finalize(node, statement);
          };
          Parser2.prototype.parseThrowStatement = function() {
            var node = this.createNode();
            this.expectKeyword("throw");
            if (this.hasLineTerminator) {
              this.throwError(messages_1.Messages.NewlineAfterThrow);
            }
            var argument = this.parseExpression();
            this.consumeSemicolon();
            return this.finalize(node, new Node.ThrowStatement(argument));
          };
          Parser2.prototype.parseCatchClause = function() {
            var node = this.createNode();
            this.expectKeyword("catch");
            this.expect("(");
            if (this.match(")")) {
              this.throwUnexpectedToken(this.lookahead);
            }
            var params = [];
            var param = this.parsePattern(params);
            var paramMap = {};
            for (var i = 0;i < params.length; i++) {
              var key = "$" + params[i].value;
              if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
                this.tolerateError(messages_1.Messages.DuplicateBinding, params[i].value);
              }
              paramMap[key] = true;
            }
            if (this.context.strict && param.type === syntax_1.Syntax.Identifier) {
              if (this.scanner.isRestrictedWord(param.name)) {
                this.tolerateError(messages_1.Messages.StrictCatchVariable);
              }
            }
            this.expect(")");
            var body = this.parseBlock();
            return this.finalize(node, new Node.CatchClause(param, body));
          };
          Parser2.prototype.parseFinallyClause = function() {
            this.expectKeyword("finally");
            return this.parseBlock();
          };
          Parser2.prototype.parseTryStatement = function() {
            var node = this.createNode();
            this.expectKeyword("try");
            var block = this.parseBlock();
            var handler = this.matchKeyword("catch") ? this.parseCatchClause() : null;
            var finalizer = this.matchKeyword("finally") ? this.parseFinallyClause() : null;
            if (!handler && !finalizer) {
              this.throwError(messages_1.Messages.NoCatchOrFinally);
            }
            return this.finalize(node, new Node.TryStatement(block, handler, finalizer));
          };
          Parser2.prototype.parseDebuggerStatement = function() {
            var node = this.createNode();
            this.expectKeyword("debugger");
            this.consumeSemicolon();
            return this.finalize(node, new Node.DebuggerStatement);
          };
          Parser2.prototype.parseStatement = function() {
            var statement;
            switch (this.lookahead.type) {
              case 1:
              case 5:
              case 6:
              case 8:
              case 10:
              case 9:
                statement = this.parseExpressionStatement();
                break;
              case 7:
                var value = this.lookahead.value;
                if (value === "{") {
                  statement = this.parseBlock();
                } else if (value === "(") {
                  statement = this.parseExpressionStatement();
                } else if (value === ";") {
                  statement = this.parseEmptyStatement();
                } else {
                  statement = this.parseExpressionStatement();
                }
                break;
              case 3:
                statement = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
                break;
              case 4:
                switch (this.lookahead.value) {
                  case "break":
                    statement = this.parseBreakStatement();
                    break;
                  case "continue":
                    statement = this.parseContinueStatement();
                    break;
                  case "debugger":
                    statement = this.parseDebuggerStatement();
                    break;
                  case "do":
                    statement = this.parseDoWhileStatement();
                    break;
                  case "for":
                    statement = this.parseForStatement();
                    break;
                  case "function":
                    statement = this.parseFunctionDeclaration();
                    break;
                  case "if":
                    statement = this.parseIfStatement();
                    break;
                  case "return":
                    statement = this.parseReturnStatement();
                    break;
                  case "switch":
                    statement = this.parseSwitchStatement();
                    break;
                  case "throw":
                    statement = this.parseThrowStatement();
                    break;
                  case "try":
                    statement = this.parseTryStatement();
                    break;
                  case "var":
                    statement = this.parseVariableStatement();
                    break;
                  case "while":
                    statement = this.parseWhileStatement();
                    break;
                  case "with":
                    statement = this.parseWithStatement();
                    break;
                  default:
                    statement = this.parseExpressionStatement();
                    break;
                }
                break;
              default:
                statement = this.throwUnexpectedToken(this.lookahead);
            }
            return statement;
          };
          Parser2.prototype.parseFunctionSourceElements = function() {
            var node = this.createNode();
            this.expect("{");
            var body = this.parseDirectivePrologues();
            var previousLabelSet = this.context.labelSet;
            var previousInIteration = this.context.inIteration;
            var previousInSwitch = this.context.inSwitch;
            var previousInFunctionBody = this.context.inFunctionBody;
            this.context.labelSet = {};
            this.context.inIteration = false;
            this.context.inSwitch = false;
            this.context.inFunctionBody = true;
            while (this.lookahead.type !== 2) {
              if (this.match("}")) {
                break;
              }
              body.push(this.parseStatementListItem());
            }
            this.expect("}");
            this.context.labelSet = previousLabelSet;
            this.context.inIteration = previousInIteration;
            this.context.inSwitch = previousInSwitch;
            this.context.inFunctionBody = previousInFunctionBody;
            return this.finalize(node, new Node.BlockStatement(body));
          };
          Parser2.prototype.validateParam = function(options, param, name) {
            var key = "$" + name;
            if (this.context.strict) {
              if (this.scanner.isRestrictedWord(name)) {
                options.stricted = param;
                options.message = messages_1.Messages.StrictParamName;
              }
              if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
                options.stricted = param;
                options.message = messages_1.Messages.StrictParamDupe;
              }
            } else if (!options.firstRestricted) {
              if (this.scanner.isRestrictedWord(name)) {
                options.firstRestricted = param;
                options.message = messages_1.Messages.StrictParamName;
              } else if (this.scanner.isStrictModeReservedWord(name)) {
                options.firstRestricted = param;
                options.message = messages_1.Messages.StrictReservedWord;
              } else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
                options.stricted = param;
                options.message = messages_1.Messages.StrictParamDupe;
              }
            }
            if (typeof Object.defineProperty === "function") {
              Object.defineProperty(options.paramSet, key, { value: true, enumerable: true, writable: true, configurable: true });
            } else {
              options.paramSet[key] = true;
            }
          };
          Parser2.prototype.parseRestElement = function(params) {
            var node = this.createNode();
            this.expect("...");
            var arg = this.parsePattern(params);
            if (this.match("=")) {
              this.throwError(messages_1.Messages.DefaultRestParameter);
            }
            if (!this.match(")")) {
              this.throwError(messages_1.Messages.ParameterAfterRestParameter);
            }
            return this.finalize(node, new Node.RestElement(arg));
          };
          Parser2.prototype.parseFormalParameter = function(options) {
            var params = [];
            var param = this.match("...") ? this.parseRestElement(params) : this.parsePatternWithDefault(params);
            for (var i = 0;i < params.length; i++) {
              this.validateParam(options, params[i], params[i].value);
            }
            options.simple = options.simple && param instanceof Node.Identifier;
            options.params.push(param);
          };
          Parser2.prototype.parseFormalParameters = function(firstRestricted) {
            var options;
            options = {
              simple: true,
              params: [],
              firstRestricted
            };
            this.expect("(");
            if (!this.match(")")) {
              options.paramSet = {};
              while (this.lookahead.type !== 2) {
                this.parseFormalParameter(options);
                if (this.match(")")) {
                  break;
                }
                this.expect(",");
                if (this.match(")")) {
                  break;
                }
              }
            }
            this.expect(")");
            return {
              simple: options.simple,
              params: options.params,
              stricted: options.stricted,
              firstRestricted: options.firstRestricted,
              message: options.message
            };
          };
          Parser2.prototype.matchAsyncFunction = function() {
            var match = this.matchContextualKeyword("async");
            if (match) {
              var state = this.scanner.saveState();
              this.scanner.scanComments();
              var next = this.scanner.lex();
              this.scanner.restoreState(state);
              match = state.lineNumber === next.lineNumber && next.type === 4 && next.value === "function";
            }
            return match;
          };
          Parser2.prototype.parseFunctionDeclaration = function(identifierIsOptional) {
            var node = this.createNode();
            var isAsync = this.matchContextualKeyword("async");
            if (isAsync) {
              this.nextToken();
            }
            this.expectKeyword("function");
            var isGenerator = isAsync ? false : this.match("*");
            if (isGenerator) {
              this.nextToken();
            }
            var message;
            var id = null;
            var firstRestricted = null;
            if (!identifierIsOptional || !this.match("(")) {
              var token = this.lookahead;
              id = this.parseVariableIdentifier();
              if (this.context.strict) {
                if (this.scanner.isRestrictedWord(token.value)) {
                  this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
                }
              } else {
                if (this.scanner.isRestrictedWord(token.value)) {
                  firstRestricted = token;
                  message = messages_1.Messages.StrictFunctionName;
                } else if (this.scanner.isStrictModeReservedWord(token.value)) {
                  firstRestricted = token;
                  message = messages_1.Messages.StrictReservedWord;
                }
              }
            }
            var previousAllowAwait = this.context.await;
            var previousAllowYield = this.context.allowYield;
            this.context.await = isAsync;
            this.context.allowYield = !isGenerator;
            var formalParameters = this.parseFormalParameters(firstRestricted);
            var params = formalParameters.params;
            var stricted = formalParameters.stricted;
            firstRestricted = formalParameters.firstRestricted;
            if (formalParameters.message) {
              message = formalParameters.message;
            }
            var previousStrict = this.context.strict;
            var previousAllowStrictDirective = this.context.allowStrictDirective;
            this.context.allowStrictDirective = formalParameters.simple;
            var body = this.parseFunctionSourceElements();
            if (this.context.strict && firstRestricted) {
              this.throwUnexpectedToken(firstRestricted, message);
            }
            if (this.context.strict && stricted) {
              this.tolerateUnexpectedToken(stricted, message);
            }
            this.context.strict = previousStrict;
            this.context.allowStrictDirective = previousAllowStrictDirective;
            this.context.await = previousAllowAwait;
            this.context.allowYield = previousAllowYield;
            return isAsync ? this.finalize(node, new Node.AsyncFunctionDeclaration(id, params, body)) : this.finalize(node, new Node.FunctionDeclaration(id, params, body, isGenerator));
          };
          Parser2.prototype.parseFunctionExpression = function() {
            var node = this.createNode();
            var isAsync = this.matchContextualKeyword("async");
            if (isAsync) {
              this.nextToken();
            }
            this.expectKeyword("function");
            var isGenerator = isAsync ? false : this.match("*");
            if (isGenerator) {
              this.nextToken();
            }
            var message;
            var id = null;
            var firstRestricted;
            var previousAllowAwait = this.context.await;
            var previousAllowYield = this.context.allowYield;
            this.context.await = isAsync;
            this.context.allowYield = !isGenerator;
            if (!this.match("(")) {
              var token = this.lookahead;
              id = !this.context.strict && !isGenerator && this.matchKeyword("yield") ? this.parseIdentifierName() : this.parseVariableIdentifier();
              if (this.context.strict) {
                if (this.scanner.isRestrictedWord(token.value)) {
                  this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
                }
              } else {
                if (this.scanner.isRestrictedWord(token.value)) {
                  firstRestricted = token;
                  message = messages_1.Messages.StrictFunctionName;
                } else if (this.scanner.isStrictModeReservedWord(token.value)) {
                  firstRestricted = token;
                  message = messages_1.Messages.StrictReservedWord;
                }
              }
            }
            var formalParameters = this.parseFormalParameters(firstRestricted);
            var params = formalParameters.params;
            var stricted = formalParameters.stricted;
            firstRestricted = formalParameters.firstRestricted;
            if (formalParameters.message) {
              message = formalParameters.message;
            }
            var previousStrict = this.context.strict;
            var previousAllowStrictDirective = this.context.allowStrictDirective;
            this.context.allowStrictDirective = formalParameters.simple;
            var body = this.parseFunctionSourceElements();
            if (this.context.strict && firstRestricted) {
              this.throwUnexpectedToken(firstRestricted, message);
            }
            if (this.context.strict && stricted) {
              this.tolerateUnexpectedToken(stricted, message);
            }
            this.context.strict = previousStrict;
            this.context.allowStrictDirective = previousAllowStrictDirective;
            this.context.await = previousAllowAwait;
            this.context.allowYield = previousAllowYield;
            return isAsync ? this.finalize(node, new Node.AsyncFunctionExpression(id, params, body)) : this.finalize(node, new Node.FunctionExpression(id, params, body, isGenerator));
          };
          Parser2.prototype.parseDirective = function() {
            var token = this.lookahead;
            var node = this.createNode();
            var expr = this.parseExpression();
            var directive = expr.type === syntax_1.Syntax.Literal ? this.getTokenRaw(token).slice(1, -1) : null;
            this.consumeSemicolon();
            return this.finalize(node, directive ? new Node.Directive(expr, directive) : new Node.ExpressionStatement(expr));
          };
          Parser2.prototype.parseDirectivePrologues = function() {
            var firstRestricted = null;
            var body = [];
            while (true) {
              var token = this.lookahead;
              if (token.type !== 8) {
                break;
              }
              var statement = this.parseDirective();
              body.push(statement);
              var directive = statement.directive;
              if (typeof directive !== "string") {
                break;
              }
              if (directive === "use strict") {
                this.context.strict = true;
                if (firstRestricted) {
                  this.tolerateUnexpectedToken(firstRestricted, messages_1.Messages.StrictOctalLiteral);
                }
                if (!this.context.allowStrictDirective) {
                  this.tolerateUnexpectedToken(token, messages_1.Messages.IllegalLanguageModeDirective);
                }
              } else {
                if (!firstRestricted && token.octal) {
                  firstRestricted = token;
                }
              }
            }
            return body;
          };
          Parser2.prototype.qualifiedPropertyName = function(token) {
            switch (token.type) {
              case 3:
              case 8:
              case 1:
              case 5:
              case 6:
              case 4:
                return true;
              case 7:
                return token.value === "[";
              default:
                break;
            }
            return false;
          };
          Parser2.prototype.parseGetterMethod = function() {
            var node = this.createNode();
            var isGenerator = false;
            var previousAllowYield = this.context.allowYield;
            this.context.allowYield = !isGenerator;
            var formalParameters = this.parseFormalParameters();
            if (formalParameters.params.length > 0) {
              this.tolerateError(messages_1.Messages.BadGetterArity);
            }
            var method = this.parsePropertyMethod(formalParameters);
            this.context.allowYield = previousAllowYield;
            return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
          };
          Parser2.prototype.parseSetterMethod = function() {
            var node = this.createNode();
            var isGenerator = false;
            var previousAllowYield = this.context.allowYield;
            this.context.allowYield = !isGenerator;
            var formalParameters = this.parseFormalParameters();
            if (formalParameters.params.length !== 1) {
              this.tolerateError(messages_1.Messages.BadSetterArity);
            } else if (formalParameters.params[0] instanceof Node.RestElement) {
              this.tolerateError(messages_1.Messages.BadSetterRestParameter);
            }
            var method = this.parsePropertyMethod(formalParameters);
            this.context.allowYield = previousAllowYield;
            return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
          };
          Parser2.prototype.parseGeneratorMethod = function() {
            var node = this.createNode();
            var isGenerator = true;
            var previousAllowYield = this.context.allowYield;
            this.context.allowYield = true;
            var params = this.parseFormalParameters();
            this.context.allowYield = false;
            var method = this.parsePropertyMethod(params);
            this.context.allowYield = previousAllowYield;
            return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
          };
          Parser2.prototype.isStartOfExpression = function() {
            var start = true;
            var value = this.lookahead.value;
            switch (this.lookahead.type) {
              case 7:
                start = value === "[" || value === "(" || value === "{" || value === "+" || value === "-" || value === "!" || value === "~" || value === "++" || value === "--" || value === "/" || value === "/=";
                break;
              case 4:
                start = value === "class" || value === "delete" || value === "function" || value === "let" || value === "new" || value === "super" || value === "this" || value === "typeof" || value === "void" || value === "yield";
                break;
              default:
                break;
            }
            return start;
          };
          Parser2.prototype.parseYieldExpression = function() {
            var node = this.createNode();
            this.expectKeyword("yield");
            var argument = null;
            var delegate = false;
            if (!this.hasLineTerminator) {
              var previousAllowYield = this.context.allowYield;
              this.context.allowYield = false;
              delegate = this.match("*");
              if (delegate) {
                this.nextToken();
                argument = this.parseAssignmentExpression();
              } else if (this.isStartOfExpression()) {
                argument = this.parseAssignmentExpression();
              }
              this.context.allowYield = previousAllowYield;
            }
            return this.finalize(node, new Node.YieldExpression(argument, delegate));
          };
          Parser2.prototype.parseClassElement = function(hasConstructor) {
            var token = this.lookahead;
            var node = this.createNode();
            var kind = "";
            var key = null;
            var value = null;
            var computed = false;
            var method = false;
            var isStatic = false;
            var isAsync = false;
            if (this.match("*")) {
              this.nextToken();
            } else {
              computed = this.match("[");
              key = this.parseObjectPropertyKey();
              var id = key;
              if (id.name === "static" && (this.qualifiedPropertyName(this.lookahead) || this.match("*"))) {
                token = this.lookahead;
                isStatic = true;
                computed = this.match("[");
                if (this.match("*")) {
                  this.nextToken();
                } else {
                  key = this.parseObjectPropertyKey();
                }
              }
              if (token.type === 3 && !this.hasLineTerminator && token.value === "async") {
                var punctuator = this.lookahead.value;
                if (punctuator !== ":" && punctuator !== "(" && punctuator !== "*") {
                  isAsync = true;
                  token = this.lookahead;
                  key = this.parseObjectPropertyKey();
                  if (token.type === 3 && token.value === "constructor") {
                    this.tolerateUnexpectedToken(token, messages_1.Messages.ConstructorIsAsync);
                  }
                }
              }
            }
            var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
            if (token.type === 3) {
              if (token.value === "get" && lookaheadPropertyKey) {
                kind = "get";
                computed = this.match("[");
                key = this.parseObjectPropertyKey();
                this.context.allowYield = false;
                value = this.parseGetterMethod();
              } else if (token.value === "set" && lookaheadPropertyKey) {
                kind = "set";
                computed = this.match("[");
                key = this.parseObjectPropertyKey();
                value = this.parseSetterMethod();
              }
            } else if (token.type === 7 && token.value === "*" && lookaheadPropertyKey) {
              kind = "init";
              computed = this.match("[");
              key = this.parseObjectPropertyKey();
              value = this.parseGeneratorMethod();
              method = true;
            }
            if (!kind && key && this.match("(")) {
              kind = "init";
              value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
              method = true;
            }
            if (!kind) {
              this.throwUnexpectedToken(this.lookahead);
            }
            if (kind === "init") {
              kind = "method";
            }
            if (!computed) {
              if (isStatic && this.isPropertyKey(key, "prototype")) {
                this.throwUnexpectedToken(token, messages_1.Messages.StaticPrototype);
              }
              if (!isStatic && this.isPropertyKey(key, "constructor")) {
                if (kind !== "method" || !method || value && value.generator) {
                  this.throwUnexpectedToken(token, messages_1.Messages.ConstructorSpecialMethod);
                }
                if (hasConstructor.value) {
                  this.throwUnexpectedToken(token, messages_1.Messages.DuplicateConstructor);
                } else {
                  hasConstructor.value = true;
                }
                kind = "constructor";
              }
            }
            return this.finalize(node, new Node.MethodDefinition(key, computed, value, kind, isStatic));
          };
          Parser2.prototype.parseClassElementList = function() {
            var body = [];
            var hasConstructor = { value: false };
            this.expect("{");
            while (!this.match("}")) {
              if (this.match(";")) {
                this.nextToken();
              } else {
                body.push(this.parseClassElement(hasConstructor));
              }
            }
            this.expect("}");
            return body;
          };
          Parser2.prototype.parseClassBody = function() {
            var node = this.createNode();
            var elementList = this.parseClassElementList();
            return this.finalize(node, new Node.ClassBody(elementList));
          };
          Parser2.prototype.parseClassDeclaration = function(identifierIsOptional) {
            var node = this.createNode();
            var previousStrict = this.context.strict;
            this.context.strict = true;
            this.expectKeyword("class");
            var id = identifierIsOptional && this.lookahead.type !== 3 ? null : this.parseVariableIdentifier();
            var superClass = null;
            if (this.matchKeyword("extends")) {
              this.nextToken();
              superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
            }
            var classBody = this.parseClassBody();
            this.context.strict = previousStrict;
            return this.finalize(node, new Node.ClassDeclaration(id, superClass, classBody));
          };
          Parser2.prototype.parseClassExpression = function() {
            var node = this.createNode();
            var previousStrict = this.context.strict;
            this.context.strict = true;
            this.expectKeyword("class");
            var id = this.lookahead.type === 3 ? this.parseVariableIdentifier() : null;
            var superClass = null;
            if (this.matchKeyword("extends")) {
              this.nextToken();
              superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
            }
            var classBody = this.parseClassBody();
            this.context.strict = previousStrict;
            return this.finalize(node, new Node.ClassExpression(id, superClass, classBody));
          };
          Parser2.prototype.parseModule = function() {
            this.context.strict = true;
            this.context.isModule = true;
            this.scanner.isModule = true;
            var node = this.createNode();
            var body = this.parseDirectivePrologues();
            while (this.lookahead.type !== 2) {
              body.push(this.parseStatementListItem());
            }
            return this.finalize(node, new Node.Module(body));
          };
          Parser2.prototype.parseScript = function() {
            var node = this.createNode();
            var body = this.parseDirectivePrologues();
            while (this.lookahead.type !== 2) {
              body.push(this.parseStatementListItem());
            }
            return this.finalize(node, new Node.Script(body));
          };
          Parser2.prototype.parseModuleSpecifier = function() {
            var node = this.createNode();
            if (this.lookahead.type !== 8) {
              this.throwError(messages_1.Messages.InvalidModuleSpecifier);
            }
            var token = this.nextToken();
            var raw = this.getTokenRaw(token);
            return this.finalize(node, new Node.Literal(token.value, raw));
          };
          Parser2.prototype.parseImportSpecifier = function() {
            var node = this.createNode();
            var imported;
            var local;
            if (this.lookahead.type === 3) {
              imported = this.parseVariableIdentifier();
              local = imported;
              if (this.matchContextualKeyword("as")) {
                this.nextToken();
                local = this.parseVariableIdentifier();
              }
            } else {
              imported = this.parseIdentifierName();
              local = imported;
              if (this.matchContextualKeyword("as")) {
                this.nextToken();
                local = this.parseVariableIdentifier();
              } else {
                this.throwUnexpectedToken(this.nextToken());
              }
            }
            return this.finalize(node, new Node.ImportSpecifier(local, imported));
          };
          Parser2.prototype.parseNamedImports = function() {
            this.expect("{");
            var specifiers = [];
            while (!this.match("}")) {
              specifiers.push(this.parseImportSpecifier());
              if (!this.match("}")) {
                this.expect(",");
              }
            }
            this.expect("}");
            return specifiers;
          };
          Parser2.prototype.parseImportDefaultSpecifier = function() {
            var node = this.createNode();
            var local = this.parseIdentifierName();
            return this.finalize(node, new Node.ImportDefaultSpecifier(local));
          };
          Parser2.prototype.parseImportNamespaceSpecifier = function() {
            var node = this.createNode();
            this.expect("*");
            if (!this.matchContextualKeyword("as")) {
              this.throwError(messages_1.Messages.NoAsAfterImportNamespace);
            }
            this.nextToken();
            var local = this.parseIdentifierName();
            return this.finalize(node, new Node.ImportNamespaceSpecifier(local));
          };
          Parser2.prototype.parseImportDeclaration = function() {
            if (this.context.inFunctionBody) {
              this.throwError(messages_1.Messages.IllegalImportDeclaration);
            }
            var node = this.createNode();
            this.expectKeyword("import");
            var src;
            var specifiers = [];
            if (this.lookahead.type === 8) {
              src = this.parseModuleSpecifier();
            } else {
              if (this.match("{")) {
                specifiers = specifiers.concat(this.parseNamedImports());
              } else if (this.match("*")) {
                specifiers.push(this.parseImportNamespaceSpecifier());
              } else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword("default")) {
                specifiers.push(this.parseImportDefaultSpecifier());
                if (this.match(",")) {
                  this.nextToken();
                  if (this.match("*")) {
                    specifiers.push(this.parseImportNamespaceSpecifier());
                  } else if (this.match("{")) {
                    specifiers = specifiers.concat(this.parseNamedImports());
                  } else {
                    this.throwUnexpectedToken(this.lookahead);
                  }
                }
              } else {
                this.throwUnexpectedToken(this.nextToken());
              }
              if (!this.matchContextualKeyword("from")) {
                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
                this.throwError(message, this.lookahead.value);
              }
              this.nextToken();
              src = this.parseModuleSpecifier();
            }
            this.consumeSemicolon();
            return this.finalize(node, new Node.ImportDeclaration(specifiers, src));
          };
          Parser2.prototype.parseExportSpecifier = function() {
            var node = this.createNode();
            var local = this.parseIdentifierName();
            var exported = local;
            if (this.matchContextualKeyword("as")) {
              this.nextToken();
              exported = this.parseIdentifierName();
            }
            return this.finalize(node, new Node.ExportSpecifier(local, exported));
          };
          Parser2.prototype.parseExportDeclaration = function() {
            if (this.context.inFunctionBody) {
              this.throwError(messages_1.Messages.IllegalExportDeclaration);
            }
            var node = this.createNode();
            this.expectKeyword("export");
            var exportDeclaration;
            if (this.matchKeyword("default")) {
              this.nextToken();
              if (this.matchKeyword("function")) {
                var declaration = this.parseFunctionDeclaration(true);
                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
              } else if (this.matchKeyword("class")) {
                var declaration = this.parseClassDeclaration(true);
                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
              } else if (this.matchContextualKeyword("async")) {
                var declaration = this.matchAsyncFunction() ? this.parseFunctionDeclaration(true) : this.parseAssignmentExpression();
                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
              } else {
                if (this.matchContextualKeyword("from")) {
                  this.throwError(messages_1.Messages.UnexpectedToken, this.lookahead.value);
                }
                var declaration = this.match("{") ? this.parseObjectInitializer() : this.match("[") ? this.parseArrayInitializer() : this.parseAssignmentExpression();
                this.consumeSemicolon();
                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
              }
            } else if (this.match("*")) {
              this.nextToken();
              if (!this.matchContextualKeyword("from")) {
                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
                this.throwError(message, this.lookahead.value);
              }
              this.nextToken();
              var src = this.parseModuleSpecifier();
              this.consumeSemicolon();
              exportDeclaration = this.finalize(node, new Node.ExportAllDeclaration(src));
            } else if (this.lookahead.type === 4) {
              var declaration = undefined;
              switch (this.lookahead.value) {
                case "let":
                case "const":
                  declaration = this.parseLexicalDeclaration({ inFor: false });
                  break;
                case "var":
                case "class":
                case "function":
                  declaration = this.parseStatementListItem();
                  break;
                default:
                  this.throwUnexpectedToken(this.lookahead);
              }
              exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
            } else if (this.matchAsyncFunction()) {
              var declaration = this.parseFunctionDeclaration();
              exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
            } else {
              var specifiers = [];
              var source = null;
              var isExportFromIdentifier = false;
              this.expect("{");
              while (!this.match("}")) {
                isExportFromIdentifier = isExportFromIdentifier || this.matchKeyword("default");
                specifiers.push(this.parseExportSpecifier());
                if (!this.match("}")) {
                  this.expect(",");
                }
              }
              this.expect("}");
              if (this.matchContextualKeyword("from")) {
                this.nextToken();
                source = this.parseModuleSpecifier();
                this.consumeSemicolon();
              } else if (isExportFromIdentifier) {
                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
                this.throwError(message, this.lookahead.value);
              } else {
                this.consumeSemicolon();
              }
              exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(null, specifiers, source));
            }
            return exportDeclaration;
          };
          return Parser2;
        }();
        exports2.Parser = Parser;
      },
      function(module2, exports2) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        function assert(condition, message) {
          if (!condition) {
            throw new Error("ASSERT: " + message);
          }
        }
        exports2.assert = assert;
      },
      function(module2, exports2) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        var ErrorHandler = function() {
          function ErrorHandler2() {
            this.errors = [];
            this.tolerant = false;
          }
          ErrorHandler2.prototype.recordError = function(error) {
            this.errors.push(error);
          };
          ErrorHandler2.prototype.tolerate = function(error) {
            if (this.tolerant) {
              this.recordError(error);
            } else {
              throw error;
            }
          };
          ErrorHandler2.prototype.constructError = function(msg, column) {
            var error = new Error(msg);
            try {
              throw error;
            } catch (base) {
              if (Object.create && Object.defineProperty) {
                error = Object.create(base);
                Object.defineProperty(error, "column", { value: column });
              }
            }
            return error;
          };
          ErrorHandler2.prototype.createError = function(index, line, col, description) {
            var msg = "Line " + line + ": " + description;
            var error = this.constructError(msg, col);
            error.index = index;
            error.lineNumber = line;
            error.description = description;
            return error;
          };
          ErrorHandler2.prototype.throwError = function(index, line, col, description) {
            throw this.createError(index, line, col, description);
          };
          ErrorHandler2.prototype.tolerateError = function(index, line, col, description) {
            var error = this.createError(index, line, col, description);
            if (this.tolerant) {
              this.recordError(error);
            } else {
              throw error;
            }
          };
          return ErrorHandler2;
        }();
        exports2.ErrorHandler = ErrorHandler;
      },
      function(module2, exports2) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.Messages = {
          BadGetterArity: "Getter must not have any formal parameters",
          BadSetterArity: "Setter must have exactly one formal parameter",
          BadSetterRestParameter: "Setter function argument must not be a rest parameter",
          ConstructorIsAsync: "Class constructor may not be an async method",
          ConstructorSpecialMethod: "Class constructor may not be an accessor",
          DeclarationMissingInitializer: "Missing initializer in %0 declaration",
          DefaultRestParameter: "Unexpected token =",
          DuplicateBinding: "Duplicate binding %0",
          DuplicateConstructor: "A class may only have one constructor",
          DuplicateProtoProperty: "Duplicate __proto__ fields are not allowed in object literals",
          ForInOfLoopInitializer: "%0 loop variable declaration may not have an initializer",
          GeneratorInLegacyContext: "Generator declarations are not allowed in legacy contexts",
          IllegalBreak: "Illegal break statement",
          IllegalContinue: "Illegal continue statement",
          IllegalExportDeclaration: "Unexpected token",
          IllegalImportDeclaration: "Unexpected token",
          IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list",
          IllegalReturn: "Illegal return statement",
          InvalidEscapedReservedWord: "Keyword must not contain escaped characters",
          InvalidHexEscapeSequence: "Invalid hexadecimal escape sequence",
          InvalidLHSInAssignment: "Invalid left-hand side in assignment",
          InvalidLHSInForIn: "Invalid left-hand side in for-in",
          InvalidLHSInForLoop: "Invalid left-hand side in for-loop",
          InvalidModuleSpecifier: "Unexpected token",
          InvalidRegExp: "Invalid regular expression",
          LetInLexicalBinding: "let is disallowed as a lexically bound name",
          MissingFromClause: "Unexpected token",
          MultipleDefaultsInSwitch: "More than one default clause in switch statement",
          NewlineAfterThrow: "Illegal newline after throw",
          NoAsAfterImportNamespace: "Unexpected token",
          NoCatchOrFinally: "Missing catch or finally after try",
          ParameterAfterRestParameter: "Rest parameter must be last formal parameter",
          Redeclaration: "%0 '%1' has already been declared",
          StaticPrototype: "Classes may not have static property named prototype",
          StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
          StrictDelete: "Delete of an unqualified identifier in strict mode.",
          StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block",
          StrictFunctionName: "Function name may not be eval or arguments in strict mode",
          StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
          StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
          StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
          StrictModeWith: "Strict mode code may not include a with statement",
          StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
          StrictParamDupe: "Strict mode function may not have duplicate parameter names",
          StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
          StrictReservedWord: "Use of future reserved word in strict mode",
          StrictVarName: "Variable name may not be eval or arguments in strict mode",
          TemplateOctalLiteral: "Octal literals are not allowed in template strings.",
          UnexpectedEOS: "Unexpected end of input",
          UnexpectedIdentifier: "Unexpected identifier",
          UnexpectedNumber: "Unexpected number",
          UnexpectedReserved: "Unexpected reserved word",
          UnexpectedString: "Unexpected string",
          UnexpectedTemplate: "Unexpected quasi %0",
          UnexpectedToken: "Unexpected token %0",
          UnexpectedTokenIllegal: "Unexpected token ILLEGAL",
          UnknownLabel: "Undefined label '%0'",
          UnterminatedRegExp: "Invalid regular expression: missing /"
        };
      },
      function(module2, exports2, __webpack_require__) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        var assert_1 = __webpack_require__(9);
        var character_1 = __webpack_require__(4);
        var messages_1 = __webpack_require__(11);
        function hexValue(ch) {
          return "0123456789abcdef".indexOf(ch.toLowerCase());
        }
        function octalValue(ch) {
          return "01234567".indexOf(ch);
        }
        var Scanner = function() {
          function Scanner2(code, handler) {
            this.source = code;
            this.errorHandler = handler;
            this.trackComment = false;
            this.isModule = false;
            this.length = code.length;
            this.index = 0;
            this.lineNumber = code.length > 0 ? 1 : 0;
            this.lineStart = 0;
            this.curlyStack = [];
          }
          Scanner2.prototype.saveState = function() {
            return {
              index: this.index,
              lineNumber: this.lineNumber,
              lineStart: this.lineStart
            };
          };
          Scanner2.prototype.restoreState = function(state) {
            this.index = state.index;
            this.lineNumber = state.lineNumber;
            this.lineStart = state.lineStart;
          };
          Scanner2.prototype.eof = function() {
            return this.index >= this.length;
          };
          Scanner2.prototype.throwUnexpectedToken = function(message) {
            if (message === undefined) {
              message = messages_1.Messages.UnexpectedTokenIllegal;
            }
            return this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
          };
          Scanner2.prototype.tolerateUnexpectedToken = function(message) {
            if (message === undefined) {
              message = messages_1.Messages.UnexpectedTokenIllegal;
            }
            this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
          };
          Scanner2.prototype.skipSingleLineComment = function(offset) {
            var comments = [];
            var start, loc;
            if (this.trackComment) {
              comments = [];
              start = this.index - offset;
              loc = {
                start: {
                  line: this.lineNumber,
                  column: this.index - this.lineStart - offset
                },
                end: {}
              };
            }
            while (!this.eof()) {
              var ch = this.source.charCodeAt(this.index);
              ++this.index;
              if (character_1.Character.isLineTerminator(ch)) {
                if (this.trackComment) {
                  loc.end = {
                    line: this.lineNumber,
                    column: this.index - this.lineStart - 1
                  };
                  var entry = {
                    multiLine: false,
                    slice: [start + offset, this.index - 1],
                    range: [start, this.index - 1],
                    loc
                  };
                  comments.push(entry);
                }
                if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
                  ++this.index;
                }
                ++this.lineNumber;
                this.lineStart = this.index;
                return comments;
              }
            }
            if (this.trackComment) {
              loc.end = {
                line: this.lineNumber,
                column: this.index - this.lineStart
              };
              var entry = {
                multiLine: false,
                slice: [start + offset, this.index],
                range: [start, this.index],
                loc
              };
              comments.push(entry);
            }
            return comments;
          };
          Scanner2.prototype.skipMultiLineComment = function() {
            var comments = [];
            var start, loc;
            if (this.trackComment) {
              comments = [];
              start = this.index - 2;
              loc = {
                start: {
                  line: this.lineNumber,
                  column: this.index - this.lineStart - 2
                },
                end: {}
              };
            }
            while (!this.eof()) {
              var ch = this.source.charCodeAt(this.index);
              if (character_1.Character.isLineTerminator(ch)) {
                if (ch === 13 && this.source.charCodeAt(this.index + 1) === 10) {
                  ++this.index;
                }
                ++this.lineNumber;
                ++this.index;
                this.lineStart = this.index;
              } else if (ch === 42) {
                if (this.source.charCodeAt(this.index + 1) === 47) {
                  this.index += 2;
                  if (this.trackComment) {
                    loc.end = {
                      line: this.lineNumber,
                      column: this.index - this.lineStart
                    };
                    var entry = {
                      multiLine: true,
                      slice: [start + 2, this.index - 2],
                      range: [start, this.index],
                      loc
                    };
                    comments.push(entry);
                  }
                  return comments;
                }
                ++this.index;
              } else {
                ++this.index;
              }
            }
            if (this.trackComment) {
              loc.end = {
                line: this.lineNumber,
                column: this.index - this.lineStart
              };
              var entry = {
                multiLine: true,
                slice: [start + 2, this.index],
                range: [start, this.index],
                loc
              };
              comments.push(entry);
            }
            this.tolerateUnexpectedToken();
            return comments;
          };
          Scanner2.prototype.scanComments = function() {
            var comments;
            if (this.trackComment) {
              comments = [];
            }
            var start = this.index === 0;
            while (!this.eof()) {
              var ch = this.source.charCodeAt(this.index);
              if (character_1.Character.isWhiteSpace(ch)) {
                ++this.index;
              } else if (character_1.Character.isLineTerminator(ch)) {
                ++this.index;
                if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
                  ++this.index;
                }
                ++this.lineNumber;
                this.lineStart = this.index;
                start = true;
              } else if (ch === 47) {
                ch = this.source.charCodeAt(this.index + 1);
                if (ch === 47) {
                  this.index += 2;
                  var comment = this.skipSingleLineComment(2);
                  if (this.trackComment) {
                    comments = comments.concat(comment);
                  }
                  start = true;
                } else if (ch === 42) {
                  this.index += 2;
                  var comment = this.skipMultiLineComment();
                  if (this.trackComment) {
                    comments = comments.concat(comment);
                  }
                } else {
                  break;
                }
              } else if (start && ch === 45) {
                if (this.source.charCodeAt(this.index + 1) === 45 && this.source.charCodeAt(this.index + 2) === 62) {
                  this.index += 3;
                  var comment = this.skipSingleLineComment(3);
                  if (this.trackComment) {
                    comments = comments.concat(comment);
                  }
                } else {
                  break;
                }
              } else if (ch === 60 && !this.isModule) {
                if (this.source.slice(this.index + 1, this.index + 4) === "!--") {
                  this.index += 4;
                  var comment = this.skipSingleLineComment(4);
                  if (this.trackComment) {
                    comments = comments.concat(comment);
                  }
                } else {
                  break;
                }
              } else {
                break;
              }
            }
            return comments;
          };
          Scanner2.prototype.isFutureReservedWord = function(id) {
            switch (id) {
              case "enum":
              case "export":
              case "import":
              case "super":
                return true;
              default:
                return false;
            }
          };
          Scanner2.prototype.isStrictModeReservedWord = function(id) {
            switch (id) {
              case "implements":
              case "interface":
              case "package":
              case "private":
              case "protected":
              case "public":
              case "static":
              case "yield":
              case "let":
                return true;
              default:
                return false;
            }
          };
          Scanner2.prototype.isRestrictedWord = function(id) {
            return id === "eval" || id === "arguments";
          };
          Scanner2.prototype.isKeyword = function(id) {
            switch (id.length) {
              case 2:
                return id === "if" || id === "in" || id === "do";
              case 3:
                return id === "var" || id === "for" || id === "new" || id === "try" || id === "let";
              case 4:
                return id === "this" || id === "else" || id === "case" || id === "void" || id === "with" || id === "enum";
              case 5:
                return id === "while" || id === "break" || id === "catch" || id === "throw" || id === "const" || id === "yield" || id === "class" || id === "super";
              case 6:
                return id === "return" || id === "typeof" || id === "delete" || id === "switch" || id === "export" || id === "import";
              case 7:
                return id === "default" || id === "finally" || id === "extends";
              case 8:
                return id === "function" || id === "continue" || id === "debugger";
              case 10:
                return id === "instanceof";
              default:
                return false;
            }
          };
          Scanner2.prototype.codePointAt = function(i) {
            var cp = this.source.charCodeAt(i);
            if (cp >= 55296 && cp <= 56319) {
              var second = this.source.charCodeAt(i + 1);
              if (second >= 56320 && second <= 57343) {
                var first = cp;
                cp = (first - 55296) * 1024 + second - 56320 + 65536;
              }
            }
            return cp;
          };
          Scanner2.prototype.scanHexEscape = function(prefix) {
            var len = prefix === "u" ? 4 : 2;
            var code = 0;
            for (var i = 0;i < len; ++i) {
              if (!this.eof() && character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
                code = code * 16 + hexValue(this.source[this.index++]);
              } else {
                return null;
              }
            }
            return String.fromCharCode(code);
          };
          Scanner2.prototype.scanUnicodeCodePointEscape = function() {
            var ch = this.source[this.index];
            var code = 0;
            if (ch === "}") {
              this.throwUnexpectedToken();
            }
            while (!this.eof()) {
              ch = this.source[this.index++];
              if (!character_1.Character.isHexDigit(ch.charCodeAt(0))) {
                break;
              }
              code = code * 16 + hexValue(ch);
            }
            if (code > 1114111 || ch !== "}") {
              this.throwUnexpectedToken();
            }
            return character_1.Character.fromCodePoint(code);
          };
          Scanner2.prototype.getIdentifier = function() {
            var start = this.index++;
            while (!this.eof()) {
              var ch = this.source.charCodeAt(this.index);
              if (ch === 92) {
                this.index = start;
                return this.getComplexIdentifier();
              } else if (ch >= 55296 && ch < 57343) {
                this.index = start;
                return this.getComplexIdentifier();
              }
              if (character_1.Character.isIdentifierPart(ch)) {
                ++this.index;
              } else {
                break;
              }
            }
            return this.source.slice(start, this.index);
          };
          Scanner2.prototype.getComplexIdentifier = function() {
            var cp = this.codePointAt(this.index);
            var id = character_1.Character.fromCodePoint(cp);
            this.index += id.length;
            var ch;
            if (cp === 92) {
              if (this.source.charCodeAt(this.index) !== 117) {
                this.throwUnexpectedToken();
              }
              ++this.index;
              if (this.source[this.index] === "{") {
                ++this.index;
                ch = this.scanUnicodeCodePointEscape();
              } else {
                ch = this.scanHexEscape("u");
                if (ch === null || ch === "\\" || !character_1.Character.isIdentifierStart(ch.charCodeAt(0))) {
                  this.throwUnexpectedToken();
                }
              }
              id = ch;
            }
            while (!this.eof()) {
              cp = this.codePointAt(this.index);
              if (!character_1.Character.isIdentifierPart(cp)) {
                break;
              }
              ch = character_1.Character.fromCodePoint(cp);
              id += ch;
              this.index += ch.length;
              if (cp === 92) {
                id = id.substr(0, id.length - 1);
                if (this.source.charCodeAt(this.index) !== 117) {
                  this.throwUnexpectedToken();
                }
                ++this.index;
                if (this.source[this.index] === "{") {
                  ++this.index;
                  ch = this.scanUnicodeCodePointEscape();
                } else {
                  ch = this.scanHexEscape("u");
                  if (ch === null || ch === "\\" || !character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
                    this.throwUnexpectedToken();
                  }
                }
                id += ch;
              }
            }
            return id;
          };
          Scanner2.prototype.octalToDecimal = function(ch) {
            var octal = ch !== "0";
            var code = octalValue(ch);
            if (!this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
              octal = true;
              code = code * 8 + octalValue(this.source[this.index++]);
              if ("0123".indexOf(ch) >= 0 && !this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
                code = code * 8 + octalValue(this.source[this.index++]);
              }
            }
            return {
              code,
              octal
            };
          };
          Scanner2.prototype.scanIdentifier = function() {
            var type;
            var start = this.index;
            var id = this.source.charCodeAt(start) === 92 ? this.getComplexIdentifier() : this.getIdentifier();
            if (id.length === 1) {
              type = 3;
            } else if (this.isKeyword(id)) {
              type = 4;
            } else if (id === "null") {
              type = 5;
            } else if (id === "true" || id === "false") {
              type = 1;
            } else {
              type = 3;
            }
            if (type !== 3 && start + id.length !== this.index) {
              var restore = this.index;
              this.index = start;
              this.tolerateUnexpectedToken(messages_1.Messages.InvalidEscapedReservedWord);
              this.index = restore;
            }
            return {
              type,
              value: id,
              lineNumber: this.lineNumber,
              lineStart: this.lineStart,
              start,
              end: this.index
            };
          };
          Scanner2.prototype.scanPunctuator = function() {
            var start = this.index;
            var str = this.source[this.index];
            switch (str) {
              case "(":
              case "{":
                if (str === "{") {
                  this.curlyStack.push("{");
                }
                ++this.index;
                break;
              case ".":
                ++this.index;
                if (this.source[this.index] === "." && this.source[this.index + 1] === ".") {
                  this.index += 2;
                  str = "...";
                }
                break;
              case "}":
                ++this.index;
                this.curlyStack.pop();
                break;
              case ")":
              case ";":
              case ",":
              case "[":
              case "]":
              case ":":
              case "?":
              case "~":
                ++this.index;
                break;
              default:
                str = this.source.substr(this.index, 4);
                if (str === ">>>=") {
                  this.index += 4;
                } else {
                  str = str.substr(0, 3);
                  if (str === "===" || str === "!==" || str === ">>>" || str === "<<=" || str === ">>=" || str === "**=") {
                    this.index += 3;
                  } else {
                    str = str.substr(0, 2);
                    if (str === "&&" || str === "||" || str === "==" || str === "!=" || str === "+=" || str === "-=" || str === "*=" || str === "/=" || str === "++" || str === "--" || str === "<<" || str === ">>" || str === "&=" || str === "|=" || str === "^=" || str === "%=" || str === "<=" || str === ">=" || str === "=>" || str === "**") {
                      this.index += 2;
                    } else {
                      str = this.source[this.index];
                      if ("<>=!+-*%&|^/".indexOf(str) >= 0) {
                        ++this.index;
                      }
                    }
                  }
                }
            }
            if (this.index === start) {
              this.throwUnexpectedToken();
            }
            return {
              type: 7,
              value: str,
              lineNumber: this.lineNumber,
              lineStart: this.lineStart,
              start,
              end: this.index
            };
          };
          Scanner2.prototype.scanHexLiteral = function(start) {
            var num = "";
            while (!this.eof()) {
              if (!character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
                break;
              }
              num += this.source[this.index++];
            }
            if (num.length === 0) {
              this.throwUnexpectedToken();
            }
            if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
              this.throwUnexpectedToken();
            }
            return {
              type: 6,
              value: parseInt("0x" + num, 16),
              lineNumber: this.lineNumber,
              lineStart: this.lineStart,
              start,
              end: this.index
            };
          };
          Scanner2.prototype.scanBinaryLiteral = function(start) {
            var num = "";
            var ch;
            while (!this.eof()) {
              ch = this.source[this.index];
              if (ch !== "0" && ch !== "1") {
                break;
              }
              num += this.source[this.index++];
            }
            if (num.length === 0) {
              this.throwUnexpectedToken();
            }
            if (!this.eof()) {
              ch = this.source.charCodeAt(this.index);
              if (character_1.Character.isIdentifierStart(ch) || character_1.Character.isDecimalDigit(ch)) {
                this.throwUnexpectedToken();
              }
            }
            return {
              type: 6,
              value: parseInt(num, 2),
              lineNumber: this.lineNumber,
              lineStart: this.lineStart,
              start,
              end: this.index
            };
          };
          Scanner2.prototype.scanOctalLiteral = function(prefix, start) {
            var num = "";
            var octal = false;
            if (character_1.Character.isOctalDigit(prefix.charCodeAt(0))) {
              octal = true;
              num = "0" + this.source[this.index++];
            } else {
              ++this.index;
            }
            while (!this.eof()) {
              if (!character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
                break;
              }
              num += this.source[this.index++];
            }
            if (!octal && num.length === 0) {
              this.throwUnexpectedToken();
            }
            if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
              this.throwUnexpectedToken();
            }
            return {
              type: 6,
              value: parseInt(num, 8),
              octal,
              lineNumber: this.lineNumber,
              lineStart: this.lineStart,
              start,
              end: this.index
            };
          };
          Scanner2.prototype.isImplicitOctalLiteral = function() {
            for (var i = this.index + 1;i < this.length; ++i) {
              var ch = this.source[i];
              if (ch === "8" || ch === "9") {
                return false;
              }
              if (!character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
                return true;
              }
            }
            return true;
          };
          Scanner2.prototype.scanNumericLiteral = function() {
            var start = this.index;
            var ch = this.source[start];
            assert_1.assert(character_1.Character.isDecimalDigit(ch.charCodeAt(0)) || ch === ".", "Numeric literal must start with a decimal digit or a decimal point");
            var num = "";
            if (ch !== ".") {
              num = this.source[this.index++];
              ch = this.source[this.index];
              if (num === "0") {
                if (ch === "x" || ch === "X") {
                  ++this.index;
                  return this.scanHexLiteral(start);
                }
                if (ch === "b" || ch === "B") {
                  ++this.index;
                  return this.scanBinaryLiteral(start);
                }
                if (ch === "o" || ch === "O") {
                  return this.scanOctalLiteral(ch, start);
                }
                if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
                  if (this.isImplicitOctalLiteral()) {
                    return this.scanOctalLiteral(ch, start);
                  }
                }
              }
              while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                num += this.source[this.index++];
              }
              ch = this.source[this.index];
            }
            if (ch === ".") {
              num += this.source[this.index++];
              while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                num += this.source[this.index++];
              }
              ch = this.source[this.index];
            }
            if (ch === "e" || ch === "E") {
              num += this.source[this.index++];
              ch = this.source[this.index];
              if (ch === "+" || ch === "-") {
                num += this.source[this.index++];
              }
              if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                  num += this.source[this.index++];
                }
              } else {
                this.throwUnexpectedToken();
              }
            }
            if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
              this.throwUnexpectedToken();
            }
            return {
              type: 6,
              value: parseFloat(num),
              lineNumber: this.lineNumber,
              lineStart: this.lineStart,
              start,
              end: this.index
            };
          };
          Scanner2.prototype.scanStringLiteral = function() {
            var start = this.index;
            var quote = this.source[start];
            assert_1.assert(quote === "'" || quote === '"', "String literal must starts with a quote");
            ++this.index;
            var octal = false;
            var str = "";
            while (!this.eof()) {
              var ch = this.source[this.index++];
              if (ch === quote) {
                quote = "";
                break;
              } else if (ch === "\\") {
                ch = this.source[this.index++];
                if (!ch || !character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                  switch (ch) {
                    case "u":
                      if (this.source[this.index] === "{") {
                        ++this.index;
                        str += this.scanUnicodeCodePointEscape();
                      } else {
                        var unescaped_1 = this.scanHexEscape(ch);
                        if (unescaped_1 === null) {
                          this.throwUnexpectedToken();
                        }
                        str += unescaped_1;
                      }
                      break;
                    case "x":
                      var unescaped = this.scanHexEscape(ch);
                      if (unescaped === null) {
                        this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
                      }
                      str += unescaped;
                      break;
                    case "n":
                      str += `
`;
                      break;
                    case "r":
                      str += "\r";
                      break;
                    case "t":
                      str += "\t";
                      break;
                    case "b":
                      str += "\b";
                      break;
                    case "f":
                      str += "\f";
                      break;
                    case "v":
                      str += "\v";
                      break;
                    case "8":
                    case "9":
                      str += ch;
                      this.tolerateUnexpectedToken();
                      break;
                    default:
                      if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
                        var octToDec = this.octalToDecimal(ch);
                        octal = octToDec.octal || octal;
                        str += String.fromCharCode(octToDec.code);
                      } else {
                        str += ch;
                      }
                      break;
                  }
                } else {
                  ++this.lineNumber;
                  if (ch === "\r" && this.source[this.index] === `
`) {
                    ++this.index;
                  }
                  this.lineStart = this.index;
                }
              } else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                break;
              } else {
                str += ch;
              }
            }
            if (quote !== "") {
              this.index = start;
              this.throwUnexpectedToken();
            }
            return {
              type: 8,
              value: str,
              octal,
              lineNumber: this.lineNumber,
              lineStart: this.lineStart,
              start,
              end: this.index
            };
          };
          Scanner2.prototype.scanTemplate = function() {
            var cooked = "";
            var terminated = false;
            var start = this.index;
            var head = this.source[start] === "`";
            var tail = false;
            var rawOffset = 2;
            ++this.index;
            while (!this.eof()) {
              var ch = this.source[this.index++];
              if (ch === "`") {
                rawOffset = 1;
                tail = true;
                terminated = true;
                break;
              } else if (ch === "$") {
                if (this.source[this.index] === "{") {
                  this.curlyStack.push("${");
                  ++this.index;
                  terminated = true;
                  break;
                }
                cooked += ch;
              } else if (ch === "\\") {
                ch = this.source[this.index++];
                if (!character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                  switch (ch) {
                    case "n":
                      cooked += `
`;
                      break;
                    case "r":
                      cooked += "\r";
                      break;
                    case "t":
                      cooked += "\t";
                      break;
                    case "u":
                      if (this.source[this.index] === "{") {
                        ++this.index;
                        cooked += this.scanUnicodeCodePointEscape();
                      } else {
                        var restore = this.index;
                        var unescaped_2 = this.scanHexEscape(ch);
                        if (unescaped_2 !== null) {
                          cooked += unescaped_2;
                        } else {
                          this.index = restore;
                          cooked += ch;
                        }
                      }
                      break;
                    case "x":
                      var unescaped = this.scanHexEscape(ch);
                      if (unescaped === null) {
                        this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
                      }
                      cooked += unescaped;
                      break;
                    case "b":
                      cooked += "\b";
                      break;
                    case "f":
                      cooked += "\f";
                      break;
                    case "v":
                      cooked += "\v";
                      break;
                    default:
                      if (ch === "0") {
                        if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                          this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
                        }
                        cooked += "\x00";
                      } else if (character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
                        this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
                      } else {
                        cooked += ch;
                      }
                      break;
                  }
                } else {
                  ++this.lineNumber;
                  if (ch === "\r" && this.source[this.index] === `
`) {
                    ++this.index;
                  }
                  this.lineStart = this.index;
                }
              } else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                ++this.lineNumber;
                if (ch === "\r" && this.source[this.index] === `
`) {
                  ++this.index;
                }
                this.lineStart = this.index;
                cooked += `
`;
              } else {
                cooked += ch;
              }
            }
            if (!terminated) {
              this.throwUnexpectedToken();
            }
            if (!head) {
              this.curlyStack.pop();
            }
            return {
              type: 10,
              value: this.source.slice(start + 1, this.index - rawOffset),
              cooked,
              head,
              tail,
              lineNumber: this.lineNumber,
              lineStart: this.lineStart,
              start,
              end: this.index
            };
          };
          Scanner2.prototype.testRegExp = function(pattern, flags) {
            var astralSubstitute = "￿";
            var tmp = pattern;
            var self = this;
            if (flags.indexOf("u") >= 0) {
              tmp = tmp.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function($0, $1, $2) {
                var codePoint = parseInt($1 || $2, 16);
                if (codePoint > 1114111) {
                  self.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
                }
                if (codePoint <= 65535) {
                  return String.fromCharCode(codePoint);
                }
                return astralSubstitute;
              }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
            }
            try {
              RegExp(tmp);
            } catch (e) {
              this.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
            }
            try {
              return new RegExp(pattern, flags);
            } catch (exception) {
              return null;
            }
          };
          Scanner2.prototype.scanRegExpBody = function() {
            var ch = this.source[this.index];
            assert_1.assert(ch === "/", "Regular expression literal must start with a slash");
            var str = this.source[this.index++];
            var classMarker = false;
            var terminated = false;
            while (!this.eof()) {
              ch = this.source[this.index++];
              str += ch;
              if (ch === "\\") {
                ch = this.source[this.index++];
                if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                  this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
                }
                str += ch;
              } else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
              } else if (classMarker) {
                if (ch === "]") {
                  classMarker = false;
                }
              } else {
                if (ch === "/") {
                  terminated = true;
                  break;
                } else if (ch === "[") {
                  classMarker = true;
                }
              }
            }
            if (!terminated) {
              this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
            }
            return str.substr(1, str.length - 2);
          };
          Scanner2.prototype.scanRegExpFlags = function() {
            var str = "";
            var flags = "";
            while (!this.eof()) {
              var ch = this.source[this.index];
              if (!character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
                break;
              }
              ++this.index;
              if (ch === "\\" && !this.eof()) {
                ch = this.source[this.index];
                if (ch === "u") {
                  ++this.index;
                  var restore = this.index;
                  var char = this.scanHexEscape("u");
                  if (char !== null) {
                    flags += char;
                    for (str += "\\u";restore < this.index; ++restore) {
                      str += this.source[restore];
                    }
                  } else {
                    this.index = restore;
                    flags += "u";
                    str += "\\u";
                  }
                  this.tolerateUnexpectedToken();
                } else {
                  str += "\\";
                  this.tolerateUnexpectedToken();
                }
              } else {
                flags += ch;
                str += ch;
              }
            }
            return flags;
          };
          Scanner2.prototype.scanRegExp = function() {
            var start = this.index;
            var pattern = this.scanRegExpBody();
            var flags = this.scanRegExpFlags();
            var value = this.testRegExp(pattern, flags);
            return {
              type: 9,
              value: "",
              pattern,
              flags,
              regex: value,
              lineNumber: this.lineNumber,
              lineStart: this.lineStart,
              start,
              end: this.index
            };
          };
          Scanner2.prototype.lex = function() {
            if (this.eof()) {
              return {
                type: 2,
                value: "",
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start: this.index,
                end: this.index
              };
            }
            var cp = this.source.charCodeAt(this.index);
            if (character_1.Character.isIdentifierStart(cp)) {
              return this.scanIdentifier();
            }
            if (cp === 40 || cp === 41 || cp === 59) {
              return this.scanPunctuator();
            }
            if (cp === 39 || cp === 34) {
              return this.scanStringLiteral();
            }
            if (cp === 46) {
              if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
                return this.scanNumericLiteral();
              }
              return this.scanPunctuator();
            }
            if (character_1.Character.isDecimalDigit(cp)) {
              return this.scanNumericLiteral();
            }
            if (cp === 96 || cp === 125 && this.curlyStack[this.curlyStack.length - 1] === "${") {
              return this.scanTemplate();
            }
            if (cp >= 55296 && cp < 57343) {
              if (character_1.Character.isIdentifierStart(this.codePointAt(this.index))) {
                return this.scanIdentifier();
              }
            }
            return this.scanPunctuator();
          };
          return Scanner2;
        }();
        exports2.Scanner = Scanner;
      },
      function(module2, exports2) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.TokenName = {};
        exports2.TokenName[1] = "Boolean";
        exports2.TokenName[2] = "<end>";
        exports2.TokenName[3] = "Identifier";
        exports2.TokenName[4] = "Keyword";
        exports2.TokenName[5] = "Null";
        exports2.TokenName[6] = "Numeric";
        exports2.TokenName[7] = "Punctuator";
        exports2.TokenName[8] = "String";
        exports2.TokenName[9] = "RegularExpression";
        exports2.TokenName[10] = "Template";
      },
      function(module2, exports2) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.XHTMLEntities = {
          quot: '"',
          amp: "&",
          apos: "'",
          gt: ">",
          nbsp: " ",
          iexcl: "¡",
          cent: "¢",
          pound: "£",
          curren: "¤",
          yen: "¥",
          brvbar: "¦",
          sect: "§",
          uml: "¨",
          copy: "©",
          ordf: "ª",
          laquo: "«",
          not: "¬",
          shy: "­",
          reg: "®",
          macr: "¯",
          deg: "°",
          plusmn: "±",
          sup2: "²",
          sup3: "³",
          acute: "´",
          micro: "µ",
          para: "¶",
          middot: "·",
          cedil: "¸",
          sup1: "¹",
          ordm: "º",
          raquo: "»",
          frac14: "¼",
          frac12: "½",
          frac34: "¾",
          iquest: "¿",
          Agrave: "À",
          Aacute: "Á",
          Acirc: "Â",
          Atilde: "Ã",
          Auml: "Ä",
          Aring: "Å",
          AElig: "Æ",
          Ccedil: "Ç",
          Egrave: "È",
          Eacute: "É",
          Ecirc: "Ê",
          Euml: "Ë",
          Igrave: "Ì",
          Iacute: "Í",
          Icirc: "Î",
          Iuml: "Ï",
          ETH: "Ð",
          Ntilde: "Ñ",
          Ograve: "Ò",
          Oacute: "Ó",
          Ocirc: "Ô",
          Otilde: "Õ",
          Ouml: "Ö",
          times: "×",
          Oslash: "Ø",
          Ugrave: "Ù",
          Uacute: "Ú",
          Ucirc: "Û",
          Uuml: "Ü",
          Yacute: "Ý",
          THORN: "Þ",
          szlig: "ß",
          agrave: "à",
          aacute: "á",
          acirc: "â",
          atilde: "ã",
          auml: "ä",
          aring: "å",
          aelig: "æ",
          ccedil: "ç",
          egrave: "è",
          eacute: "é",
          ecirc: "ê",
          euml: "ë",
          igrave: "ì",
          iacute: "í",
          icirc: "î",
          iuml: "ï",
          eth: "ð",
          ntilde: "ñ",
          ograve: "ò",
          oacute: "ó",
          ocirc: "ô",
          otilde: "õ",
          ouml: "ö",
          divide: "÷",
          oslash: "ø",
          ugrave: "ù",
          uacute: "ú",
          ucirc: "û",
          uuml: "ü",
          yacute: "ý",
          thorn: "þ",
          yuml: "ÿ",
          OElig: "Œ",
          oelig: "œ",
          Scaron: "Š",
          scaron: "š",
          Yuml: "Ÿ",
          fnof: "ƒ",
          circ: "ˆ",
          tilde: "˜",
          Alpha: "Α",
          Beta: "Β",
          Gamma: "Γ",
          Delta: "Δ",
          Epsilon: "Ε",
          Zeta: "Ζ",
          Eta: "Η",
          Theta: "Θ",
          Iota: "Ι",
          Kappa: "Κ",
          Lambda: "Λ",
          Mu: "Μ",
          Nu: "Ν",
          Xi: "Ξ",
          Omicron: "Ο",
          Pi: "Π",
          Rho: "Ρ",
          Sigma: "Σ",
          Tau: "Τ",
          Upsilon: "Υ",
          Phi: "Φ",
          Chi: "Χ",
          Psi: "Ψ",
          Omega: "Ω",
          alpha: "α",
          beta: "β",
          gamma: "γ",
          delta: "δ",
          epsilon: "ε",
          zeta: "ζ",
          eta: "η",
          theta: "θ",
          iota: "ι",
          kappa: "κ",
          lambda: "λ",
          mu: "μ",
          nu: "ν",
          xi: "ξ",
          omicron: "ο",
          pi: "π",
          rho: "ρ",
          sigmaf: "ς",
          sigma: "σ",
          tau: "τ",
          upsilon: "υ",
          phi: "φ",
          chi: "χ",
          psi: "ψ",
          omega: "ω",
          thetasym: "ϑ",
          upsih: "ϒ",
          piv: "ϖ",
          ensp: " ",
          emsp: " ",
          thinsp: " ",
          zwnj: "‌",
          zwj: "‍",
          lrm: "‎",
          rlm: "‏",
          ndash: "–",
          mdash: "—",
          lsquo: "‘",
          rsquo: "’",
          sbquo: "‚",
          ldquo: "“",
          rdquo: "”",
          bdquo: "„",
          dagger: "†",
          Dagger: "‡",
          bull: "•",
          hellip: "…",
          permil: "‰",
          prime: "′",
          Prime: "″",
          lsaquo: "‹",
          rsaquo: "›",
          oline: "‾",
          frasl: "⁄",
          euro: "€",
          image: "ℑ",
          weierp: "℘",
          real: "ℜ",
          trade: "™",
          alefsym: "ℵ",
          larr: "←",
          uarr: "↑",
          rarr: "→",
          darr: "↓",
          harr: "↔",
          crarr: "↵",
          lArr: "⇐",
          uArr: "⇑",
          rArr: "⇒",
          dArr: "⇓",
          hArr: "⇔",
          forall: "∀",
          part: "∂",
          exist: "∃",
          empty: "∅",
          nabla: "∇",
          isin: "∈",
          notin: "∉",
          ni: "∋",
          prod: "∏",
          sum: "∑",
          minus: "−",
          lowast: "∗",
          radic: "√",
          prop: "∝",
          infin: "∞",
          ang: "∠",
          and: "∧",
          or: "∨",
          cap: "∩",
          cup: "∪",
          int: "∫",
          there4: "∴",
          sim: "∼",
          cong: "≅",
          asymp: "≈",
          ne: "≠",
          equiv: "≡",
          le: "≤",
          ge: "≥",
          sub: "⊂",
          sup: "⊃",
          nsub: "⊄",
          sube: "⊆",
          supe: "⊇",
          oplus: "⊕",
          otimes: "⊗",
          perp: "⊥",
          sdot: "⋅",
          lceil: "⌈",
          rceil: "⌉",
          lfloor: "⌊",
          rfloor: "⌋",
          loz: "◊",
          spades: "♠",
          clubs: "♣",
          hearts: "♥",
          diams: "♦",
          lang: "⟨",
          rang: "⟩"
        };
      },
      function(module2, exports2, __webpack_require__) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        var error_handler_1 = __webpack_require__(10);
        var scanner_1 = __webpack_require__(12);
        var token_1 = __webpack_require__(13);
        var Reader = function() {
          function Reader2() {
            this.values = [];
            this.curly = this.paren = -1;
          }
          Reader2.prototype.beforeFunctionExpression = function(t) {
            return [
              "(",
              "{",
              "[",
              "in",
              "typeof",
              "instanceof",
              "new",
              "return",
              "case",
              "delete",
              "throw",
              "void",
              "=",
              "+=",
              "-=",
              "*=",
              "**=",
              "/=",
              "%=",
              "<<=",
              ">>=",
              ">>>=",
              "&=",
              "|=",
              "^=",
              ",",
              "+",
              "-",
              "*",
              "**",
              "/",
              "%",
              "++",
              "--",
              "<<",
              ">>",
              ">>>",
              "&",
              "|",
              "^",
              "!",
              "~",
              "&&",
              "||",
              "?",
              ":",
              "===",
              "==",
              ">=",
              "<=",
              "<",
              ">",
              "!=",
              "!=="
            ].indexOf(t) >= 0;
          };
          Reader2.prototype.isRegexStart = function() {
            var previous = this.values[this.values.length - 1];
            var regex = previous !== null;
            switch (previous) {
              case "this":
              case "]":
                regex = false;
                break;
              case ")":
                var keyword = this.values[this.paren - 1];
                regex = keyword === "if" || keyword === "while" || keyword === "for" || keyword === "with";
                break;
              case "}":
                regex = false;
                if (this.values[this.curly - 3] === "function") {
                  var check = this.values[this.curly - 4];
                  regex = check ? !this.beforeFunctionExpression(check) : false;
                } else if (this.values[this.curly - 4] === "function") {
                  var check = this.values[this.curly - 5];
                  regex = check ? !this.beforeFunctionExpression(check) : true;
                }
                break;
              default:
                break;
            }
            return regex;
          };
          Reader2.prototype.push = function(token) {
            if (token.type === 7 || token.type === 4) {
              if (token.value === "{") {
                this.curly = this.values.length;
              } else if (token.value === "(") {
                this.paren = this.values.length;
              }
              this.values.push(token.value);
            } else {
              this.values.push(null);
            }
          };
          return Reader2;
        }();
        var Tokenizer = function() {
          function Tokenizer2(code, config) {
            this.errorHandler = new error_handler_1.ErrorHandler;
            this.errorHandler.tolerant = config ? typeof config.tolerant === "boolean" && config.tolerant : false;
            this.scanner = new scanner_1.Scanner(code, this.errorHandler);
            this.scanner.trackComment = config ? typeof config.comment === "boolean" && config.comment : false;
            this.trackRange = config ? typeof config.range === "boolean" && config.range : false;
            this.trackLoc = config ? typeof config.loc === "boolean" && config.loc : false;
            this.buffer = [];
            this.reader = new Reader;
          }
          Tokenizer2.prototype.errors = function() {
            return this.errorHandler.errors;
          };
          Tokenizer2.prototype.getNextToken = function() {
            if (this.buffer.length === 0) {
              var comments = this.scanner.scanComments();
              if (this.scanner.trackComment) {
                for (var i = 0;i < comments.length; ++i) {
                  var e = comments[i];
                  var value = this.scanner.source.slice(e.slice[0], e.slice[1]);
                  var comment = {
                    type: e.multiLine ? "BlockComment" : "LineComment",
                    value
                  };
                  if (this.trackRange) {
                    comment.range = e.range;
                  }
                  if (this.trackLoc) {
                    comment.loc = e.loc;
                  }
                  this.buffer.push(comment);
                }
              }
              if (!this.scanner.eof()) {
                var loc = undefined;
                if (this.trackLoc) {
                  loc = {
                    start: {
                      line: this.scanner.lineNumber,
                      column: this.scanner.index - this.scanner.lineStart
                    },
                    end: {}
                  };
                }
                var startRegex = this.scanner.source[this.scanner.index] === "/" && this.reader.isRegexStart();
                var token = startRegex ? this.scanner.scanRegExp() : this.scanner.lex();
                this.reader.push(token);
                var entry = {
                  type: token_1.TokenName[token.type],
                  value: this.scanner.source.slice(token.start, token.end)
                };
                if (this.trackRange) {
                  entry.range = [token.start, token.end];
                }
                if (this.trackLoc) {
                  loc.end = {
                    line: this.scanner.lineNumber,
                    column: this.scanner.index - this.scanner.lineStart
                  };
                  entry.loc = loc;
                }
                if (token.type === 9) {
                  var pattern = token.pattern;
                  var flags = token.flags;
                  entry.regex = { pattern, flags };
                }
                this.buffer.push(entry);
              }
            }
            return this.buffer.shift();
          };
          return Tokenizer2;
        }();
        exports2.Tokenizer = Tokenizer;
      }
    ]);
  });
});

// ../../node_modules/.bun/array-timsort@1.0.3/node_modules/array-timsort/src/index.js
var require_src = __commonJS((exports, module) => {
  var DEFAULT_MIN_MERGE = 32;
  var DEFAULT_MIN_GALLOPING = 7;
  var DEFAULT_TMP_STORAGE_LENGTH = 256;
  var POWERS_OF_TEN = [1, 10, 100, 1000, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];
  var results;
  var log10 = (x) => x < 1e5 ? x < 100 ? x < 10 ? 0 : 1 : x < 1e4 ? x < 1000 ? 2 : 3 : 4 : x < 1e7 ? x < 1e6 ? 5 : 6 : x < 1e9 ? x < 1e8 ? 7 : 8 : 9;
  function alphabeticalCompare(a, b) {
    if (a === b) {
      return 0;
    }
    if (~~a === a && ~~b === b) {
      if (a === 0 || b === 0) {
        return a < b ? -1 : 1;
      }
      if (a < 0 || b < 0) {
        if (b >= 0) {
          return -1;
        }
        if (a >= 0) {
          return 1;
        }
        a = -a;
        b = -b;
      }
      const al = log10(a);
      const bl = log10(b);
      let t = 0;
      if (al < bl) {
        a *= POWERS_OF_TEN[bl - al - 1];
        b /= 10;
        t = -1;
      } else if (al > bl) {
        b *= POWERS_OF_TEN[al - bl - 1];
        a /= 10;
        t = 1;
      }
      if (a === b) {
        return t;
      }
      return a < b ? -1 : 1;
    }
    const aStr = String(a);
    const bStr = String(b);
    if (aStr === bStr) {
      return 0;
    }
    return aStr < bStr ? -1 : 1;
  }
  function minRunLength(n) {
    let r = 0;
    while (n >= DEFAULT_MIN_MERGE) {
      r |= n & 1;
      n >>= 1;
    }
    return n + r;
  }
  function makeAscendingRun(array, lo, hi, compare) {
    let runHi = lo + 1;
    if (runHi === hi) {
      return 1;
    }
    if (compare(array[runHi++], array[lo]) < 0) {
      while (runHi < hi && compare(array[runHi], array[runHi - 1]) < 0) {
        runHi++;
      }
      reverseRun(array, lo, runHi);
      reverseRun(results, lo, runHi);
    } else {
      while (runHi < hi && compare(array[runHi], array[runHi - 1]) >= 0) {
        runHi++;
      }
    }
    return runHi - lo;
  }
  function reverseRun(array, lo, hi) {
    hi--;
    while (lo < hi) {
      const t = array[lo];
      array[lo++] = array[hi];
      array[hi--] = t;
    }
  }
  function binaryInsertionSort(array, lo, hi, start, compare) {
    if (start === lo) {
      start++;
    }
    for (;start < hi; start++) {
      const pivot = array[start];
      const pivotIndex = results[start];
      let left = lo;
      let right = start;
      while (left < right) {
        const mid = left + right >>> 1;
        if (compare(pivot, array[mid]) < 0) {
          right = mid;
        } else {
          left = mid + 1;
        }
      }
      let n = start - left;
      switch (n) {
        case 3:
          array[left + 3] = array[left + 2];
          results[left + 3] = results[left + 2];
        case 2:
          array[left + 2] = array[left + 1];
          results[left + 2] = results[left + 1];
        case 1:
          array[left + 1] = array[left];
          results[left + 1] = results[left];
          break;
        default:
          while (n > 0) {
            array[left + n] = array[left + n - 1];
            results[left + n] = results[left + n - 1];
            n--;
          }
      }
      array[left] = pivot;
      results[left] = pivotIndex;
    }
  }
  function gallopLeft(value, array, start, length, hint, compare) {
    let lastOffset = 0;
    let maxOffset = 0;
    let offset = 1;
    if (compare(value, array[start + hint]) > 0) {
      maxOffset = length - hint;
      while (offset < maxOffset && compare(value, array[start + hint + offset]) > 0) {
        lastOffset = offset;
        offset = (offset << 1) + 1;
        if (offset <= 0) {
          offset = maxOffset;
        }
      }
      if (offset > maxOffset) {
        offset = maxOffset;
      }
      lastOffset += hint;
      offset += hint;
    } else {
      maxOffset = hint + 1;
      while (offset < maxOffset && compare(value, array[start + hint - offset]) <= 0) {
        lastOffset = offset;
        offset = (offset << 1) + 1;
        if (offset <= 0) {
          offset = maxOffset;
        }
      }
      if (offset > maxOffset) {
        offset = maxOffset;
      }
      const tmp = lastOffset;
      lastOffset = hint - offset;
      offset = hint - tmp;
    }
    lastOffset++;
    while (lastOffset < offset) {
      const m = lastOffset + (offset - lastOffset >>> 1);
      if (compare(value, array[start + m]) > 0) {
        lastOffset = m + 1;
      } else {
        offset = m;
      }
    }
    return offset;
  }
  function gallopRight(value, array, start, length, hint, compare) {
    let lastOffset = 0;
    let maxOffset = 0;
    let offset = 1;
    if (compare(value, array[start + hint]) < 0) {
      maxOffset = hint + 1;
      while (offset < maxOffset && compare(value, array[start + hint - offset]) < 0) {
        lastOffset = offset;
        offset = (offset << 1) + 1;
        if (offset <= 0) {
          offset = maxOffset;
        }
      }
      if (offset > maxOffset) {
        offset = maxOffset;
      }
      const tmp = lastOffset;
      lastOffset = hint - offset;
      offset = hint - tmp;
    } else {
      maxOffset = length - hint;
      while (offset < maxOffset && compare(value, array[start + hint + offset]) >= 0) {
        lastOffset = offset;
        offset = (offset << 1) + 1;
        if (offset <= 0) {
          offset = maxOffset;
        }
      }
      if (offset > maxOffset) {
        offset = maxOffset;
      }
      lastOffset += hint;
      offset += hint;
    }
    lastOffset++;
    while (lastOffset < offset) {
      const m = lastOffset + (offset - lastOffset >>> 1);
      if (compare(value, array[start + m]) < 0) {
        offset = m;
      } else {
        lastOffset = m + 1;
      }
    }
    return offset;
  }

  class TimSort {
    constructor(array, compare) {
      this.array = array;
      this.compare = compare;
      const { length } = array;
      this.length = length;
      this.minGallop = DEFAULT_MIN_GALLOPING;
      this.tmpStorageLength = length < 2 * DEFAULT_TMP_STORAGE_LENGTH ? length >>> 1 : DEFAULT_TMP_STORAGE_LENGTH;
      this.tmp = new Array(this.tmpStorageLength);
      this.tmpIndex = new Array(this.tmpStorageLength);
      this.stackLength = length < 120 ? 5 : length < 1542 ? 10 : length < 119151 ? 19 : 40;
      this.runStart = new Array(this.stackLength);
      this.runLength = new Array(this.stackLength);
      this.stackSize = 0;
    }
    pushRun(runStart, runLength) {
      this.runStart[this.stackSize] = runStart;
      this.runLength[this.stackSize] = runLength;
      this.stackSize += 1;
    }
    mergeRuns() {
      while (this.stackSize > 1) {
        let n = this.stackSize - 2;
        if (n >= 1 && this.runLength[n - 1] <= this.runLength[n] + this.runLength[n + 1] || n >= 2 && this.runLength[n - 2] <= this.runLength[n] + this.runLength[n - 1]) {
          if (this.runLength[n - 1] < this.runLength[n + 1]) {
            n--;
          }
        } else if (this.runLength[n] > this.runLength[n + 1]) {
          break;
        }
        this.mergeAt(n);
      }
    }
    forceMergeRuns() {
      while (this.stackSize > 1) {
        let n = this.stackSize - 2;
        if (n > 0 && this.runLength[n - 1] < this.runLength[n + 1]) {
          n--;
        }
        this.mergeAt(n);
      }
    }
    mergeAt(i) {
      const { compare } = this;
      const { array } = this;
      let start1 = this.runStart[i];
      let length1 = this.runLength[i];
      const start2 = this.runStart[i + 1];
      let length2 = this.runLength[i + 1];
      this.runLength[i] = length1 + length2;
      if (i === this.stackSize - 3) {
        this.runStart[i + 1] = this.runStart[i + 2];
        this.runLength[i + 1] = this.runLength[i + 2];
      }
      this.stackSize--;
      const k = gallopRight(array[start2], array, start1, length1, 0, compare);
      start1 += k;
      length1 -= k;
      if (length1 === 0) {
        return;
      }
      length2 = gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare);
      if (length2 === 0) {
        return;
      }
      if (length1 <= length2) {
        this.mergeLow(start1, length1, start2, length2);
      } else {
        this.mergeHigh(start1, length1, start2, length2);
      }
    }
    mergeLow(start1, length1, start2, length2) {
      const { compare } = this;
      const { array } = this;
      const { tmp } = this;
      const { tmpIndex } = this;
      let i = 0;
      for (i = 0;i < length1; i++) {
        tmp[i] = array[start1 + i];
        tmpIndex[i] = results[start1 + i];
      }
      let cursor1 = 0;
      let cursor2 = start2;
      let dest = start1;
      array[dest] = array[cursor2];
      results[dest] = results[cursor2];
      dest++;
      cursor2++;
      if (--length2 === 0) {
        for (i = 0;i < length1; i++) {
          array[dest + i] = tmp[cursor1 + i];
          results[dest + i] = tmpIndex[cursor1 + i];
        }
        return;
      }
      if (length1 === 1) {
        for (i = 0;i < length2; i++) {
          array[dest + i] = array[cursor2 + i];
          results[dest + i] = results[cursor2 + i];
        }
        array[dest + length2] = tmp[cursor1];
        results[dest + length2] = tmpIndex[cursor1];
        return;
      }
      let { minGallop } = this;
      while (true) {
        let count1 = 0;
        let count2 = 0;
        let exit = false;
        do {
          if (compare(array[cursor2], tmp[cursor1]) < 0) {
            array[dest] = array[cursor2];
            results[dest] = results[cursor2];
            dest++;
            cursor2++;
            count2++;
            count1 = 0;
            if (--length2 === 0) {
              exit = true;
              break;
            }
          } else {
            array[dest] = tmp[cursor1];
            results[dest] = tmpIndex[cursor1];
            dest++;
            cursor1++;
            count1++;
            count2 = 0;
            if (--length1 === 1) {
              exit = true;
              break;
            }
          }
        } while ((count1 | count2) < minGallop);
        if (exit) {
          break;
        }
        do {
          count1 = gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare);
          if (count1 !== 0) {
            for (i = 0;i < count1; i++) {
              array[dest + i] = tmp[cursor1 + i];
              results[dest + i] = tmpIndex[cursor1 + i];
            }
            dest += count1;
            cursor1 += count1;
            length1 -= count1;
            if (length1 <= 1) {
              exit = true;
              break;
            }
          }
          array[dest] = array[cursor2];
          results[dest] = results[cursor2];
          dest++;
          cursor2++;
          if (--length2 === 0) {
            exit = true;
            break;
          }
          count2 = gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare);
          if (count2 !== 0) {
            for (i = 0;i < count2; i++) {
              array[dest + i] = array[cursor2 + i];
              results[dest + i] = results[cursor2 + i];
            }
            dest += count2;
            cursor2 += count2;
            length2 -= count2;
            if (length2 === 0) {
              exit = true;
              break;
            }
          }
          array[dest] = tmp[cursor1];
          results[dest] = tmpIndex[cursor1];
          dest++;
          cursor1++;
          if (--length1 === 1) {
            exit = true;
            break;
          }
          minGallop--;
        } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);
        if (exit) {
          break;
        }
        if (minGallop < 0) {
          minGallop = 0;
        }
        minGallop += 2;
      }
      this.minGallop = minGallop;
      if (minGallop < 1) {
        this.minGallop = 1;
      }
      if (length1 === 1) {
        for (i = 0;i < length2; i++) {
          array[dest + i] = array[cursor2 + i];
          results[dest + i] = results[cursor2 + i];
        }
        array[dest + length2] = tmp[cursor1];
        results[dest + length2] = tmpIndex[cursor1];
      } else if (length1 === 0) {
        throw new Error("mergeLow preconditions were not respected");
      } else {
        for (i = 0;i < length1; i++) {
          array[dest + i] = tmp[cursor1 + i];
          results[dest + i] = tmpIndex[cursor1 + i];
        }
      }
    }
    mergeHigh(start1, length1, start2, length2) {
      const { compare } = this;
      const { array } = this;
      const { tmp } = this;
      const { tmpIndex } = this;
      let i = 0;
      for (i = 0;i < length2; i++) {
        tmp[i] = array[start2 + i];
        tmpIndex[i] = results[start2 + i];
      }
      let cursor1 = start1 + length1 - 1;
      let cursor2 = length2 - 1;
      let dest = start2 + length2 - 1;
      let customCursor = 0;
      let customDest = 0;
      array[dest] = array[cursor1];
      results[dest] = results[cursor1];
      dest--;
      cursor1--;
      if (--length1 === 0) {
        customCursor = dest - (length2 - 1);
        for (i = 0;i < length2; i++) {
          array[customCursor + i] = tmp[i];
          results[customCursor + i] = tmpIndex[i];
        }
        return;
      }
      if (length2 === 1) {
        dest -= length1;
        cursor1 -= length1;
        customDest = dest + 1;
        customCursor = cursor1 + 1;
        for (i = length1 - 1;i >= 0; i--) {
          array[customDest + i] = array[customCursor + i];
          results[customDest + i] = results[customCursor + i];
        }
        array[dest] = tmp[cursor2];
        results[dest] = tmpIndex[cursor2];
        return;
      }
      let { minGallop } = this;
      while (true) {
        let count1 = 0;
        let count2 = 0;
        let exit = false;
        do {
          if (compare(tmp[cursor2], array[cursor1]) < 0) {
            array[dest] = array[cursor1];
            results[dest] = results[cursor1];
            dest--;
            cursor1--;
            count1++;
            count2 = 0;
            if (--length1 === 0) {
              exit = true;
              break;
            }
          } else {
            array[dest] = tmp[cursor2];
            results[dest] = tmpIndex[cursor2];
            dest--;
            cursor2--;
            count2++;
            count1 = 0;
            if (--length2 === 1) {
              exit = true;
              break;
            }
          }
        } while ((count1 | count2) < minGallop);
        if (exit) {
          break;
        }
        do {
          count1 = length1 - gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare);
          if (count1 !== 0) {
            dest -= count1;
            cursor1 -= count1;
            length1 -= count1;
            customDest = dest + 1;
            customCursor = cursor1 + 1;
            for (i = count1 - 1;i >= 0; i--) {
              array[customDest + i] = array[customCursor + i];
              results[customDest + i] = results[customCursor + i];
            }
            if (length1 === 0) {
              exit = true;
              break;
            }
          }
          array[dest] = tmp[cursor2];
          results[dest] = tmpIndex[cursor2];
          dest--;
          cursor2--;
          if (--length2 === 1) {
            exit = true;
            break;
          }
          count2 = length2 - gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare);
          if (count2 !== 0) {
            dest -= count2;
            cursor2 -= count2;
            length2 -= count2;
            customDest = dest + 1;
            customCursor = cursor2 + 1;
            for (i = 0;i < count2; i++) {
              array[customDest + i] = tmp[customCursor + i];
              results[customDest + i] = tmpIndex[customCursor + i];
            }
            if (length2 <= 1) {
              exit = true;
              break;
            }
          }
          array[dest] = array[cursor1];
          results[dest] = results[cursor1];
          dest--;
          cursor1--;
          if (--length1 === 0) {
            exit = true;
            break;
          }
          minGallop--;
        } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);
        if (exit) {
          break;
        }
        if (minGallop < 0) {
          minGallop = 0;
        }
        minGallop += 2;
      }
      this.minGallop = minGallop;
      if (minGallop < 1) {
        this.minGallop = 1;
      }
      if (length2 === 1) {
        dest -= length1;
        cursor1 -= length1;
        customDest = dest + 1;
        customCursor = cursor1 + 1;
        for (i = length1 - 1;i >= 0; i--) {
          array[customDest + i] = array[customCursor + i];
          results[customDest + i] = results[customCursor + i];
        }
        array[dest] = tmp[cursor2];
        results[dest] = tmpIndex[cursor2];
      } else if (length2 === 0) {
        throw new Error("mergeHigh preconditions were not respected");
      } else {
        customCursor = dest - (length2 - 1);
        for (i = 0;i < length2; i++) {
          array[customCursor + i] = tmp[i];
          results[customCursor + i] = tmpIndex[i];
        }
      }
    }
  }
  function sort(array, compare, lo, hi) {
    if (!Array.isArray(array)) {
      throw new TypeError(`The "array" argument must be an array. Received ${array}`);
    }
    results = [];
    const { length } = array;
    let i = 0;
    while (i < length) {
      results[i] = i++;
    }
    if (!compare) {
      compare = alphabeticalCompare;
    } else if (typeof compare !== "function") {
      hi = lo;
      lo = compare;
      compare = alphabeticalCompare;
    }
    if (!lo) {
      lo = 0;
    }
    if (!hi) {
      hi = length;
    }
    let remaining = hi - lo;
    if (remaining < 2) {
      return results;
    }
    let runLength = 0;
    if (remaining < DEFAULT_MIN_MERGE) {
      runLength = makeAscendingRun(array, lo, hi, compare);
      binaryInsertionSort(array, lo, hi, lo + runLength, compare);
      return results;
    }
    const ts = new TimSort(array, compare);
    const minRun = minRunLength(remaining);
    do {
      runLength = makeAscendingRun(array, lo, hi, compare);
      if (runLength < minRun) {
        let force = remaining;
        if (force > minRun) {
          force = minRun;
        }
        binaryInsertionSort(array, lo, lo + force, lo + runLength, compare);
        runLength = force;
      }
      ts.pushRun(lo, runLength);
      ts.mergeRuns();
      remaining -= runLength;
      lo += runLength;
    } while (remaining !== 0);
    ts.forceMergeRuns();
    return results;
  }
  module.exports = {
    sort
  };
});

// ../../node_modules/.bun/comment-json@4.6.2/node_modules/comment-json/src/common.js
var require_common = __commonJS((exports, module) => {
  var PREFIX_BEFORE = "before";
  var PREFIX_AFTER_PROP = "after-prop";
  var PREFIX_AFTER_COLON = "after-colon";
  var PREFIX_AFTER_VALUE = "after-value";
  var PREFIX_AFTER = "after";
  var PREFIX_BEFORE_ALL = "before-all";
  var PREFIX_AFTER_ALL = "after-all";
  var BRACKET_OPEN = "[";
  var BRACKET_CLOSE = "]";
  var CURLY_BRACKET_OPEN = "{";
  var CURLY_BRACKET_CLOSE = "}";
  var COMMA = ",";
  var EMPTY = "";
  var MINUS = "-";
  var PROP_SYMBOL_PREFIXES = [
    PREFIX_BEFORE,
    PREFIX_AFTER_PROP,
    PREFIX_AFTER_COLON,
    PREFIX_AFTER_VALUE,
    PREFIX_AFTER
  ];
  var NON_PROP_SYMBOL_PREFIXES = [
    PREFIX_BEFORE,
    PREFIX_AFTER,
    PREFIX_BEFORE_ALL,
    PREFIX_AFTER_ALL
  ];
  var NON_PROP_SYMBOL_KEYS = NON_PROP_SYMBOL_PREFIXES.map(Symbol.for);
  var COLON = ":";
  var UNDEFINED = undefined;
  var LINE_BREAKS_BEFORE = new WeakMap;
  var LINE_BREAKS_AFTER = new WeakMap;
  var RAW_STRING_LITERALS = new WeakMap;
  var is_string = (subject) => typeof subject === "string";
  var is_number = (subject) => typeof subject === "number";
  var is_object = (v) => typeof v === "object" && v !== null;
  var normalize_key = (key) => is_string(key) || is_number(key) ? String(key) : null;
  var set_raw_string_literal = (host, key, raw) => {
    if (!is_object(host) || !is_string(raw)) {
      return;
    }
    const normalized = normalize_key(key);
    if (normalized === null) {
      return;
    }
    let map = RAW_STRING_LITERALS.get(host);
    if (!map) {
      map = new Map;
      RAW_STRING_LITERALS.set(host, map);
    }
    map.set(normalized, raw);
  };
  var get_raw_string_literal = (host, key) => {
    if (!is_object(host)) {
      return;
    }
    const normalized = normalize_key(key);
    if (normalized === null) {
      return;
    }
    const map = RAW_STRING_LITERALS.get(host);
    return map ? map.get(normalized) : undefined;
  };
  var symbol = (prefix, key) => Symbol.for(prefix + COLON + key);
  var symbol_checked = (prefix, key) => {
    if (key) {
      if (PROP_SYMBOL_PREFIXES.includes(prefix)) {
        return symbol(prefix, key);
      }
      throw new RangeError(`Unsupported comment position ${prefix} with key ${key}`);
    }
    if (NON_PROP_SYMBOL_PREFIXES.includes(prefix)) {
      return Symbol.for(prefix);
    }
    throw new RangeError(`Unsupported comment position ${prefix}`);
  };
  var define2 = (target, key, value) => Object.defineProperty(target, key, {
    value,
    writable: true,
    configurable: true
  });
  var copy_comments_by_kind = (target, source, target_key, source_key, prefix, remove_source) => {
    const source_prop = symbol(prefix, source_key);
    if (!Object.hasOwn(source, source_prop)) {
      return;
    }
    const target_prop = target_key === source_key ? source_prop : symbol(prefix, target_key);
    define2(target, target_prop, source[source_prop]);
    if (remove_source) {
      delete source[source_prop];
    }
  };
  var copy_comments = (target, source, target_key, source_key, remove_source) => {
    PROP_SYMBOL_PREFIXES.forEach((prefix) => {
      copy_comments_by_kind(target, source, target_key, source_key, prefix, remove_source);
    });
  };
  var swap_comments = (array, from, to) => {
    if (from === to) {
      return;
    }
    PROP_SYMBOL_PREFIXES.forEach((prefix) => {
      const target_prop = symbol(prefix, to);
      if (!Object.hasOwn(array, target_prop)) {
        copy_comments_by_kind(array, array, to, from, prefix, true);
        return;
      }
      const comments = array[target_prop];
      delete array[target_prop];
      copy_comments_by_kind(array, array, to, from, prefix, true);
      define2(array, symbol(prefix, from), comments);
    });
  };
  var assign_non_prop_comments = (target, source) => {
    NON_PROP_SYMBOL_KEYS.forEach((key) => {
      const comments = source[key];
      if (comments) {
        define2(target, key, comments);
      }
    });
  };
  var assign = (target, source, keys) => {
    keys.forEach((key) => {
      if (typeof key !== "string" && typeof key !== "number") {
        return;
      }
      if (!Object.hasOwn(source, key)) {
        return;
      }
      target[key] = source[key];
      copy_comments(target, source, key, key);
    });
    return target;
  };
  var is_raw_json = typeof JSON.isRawJSON === "function" ? JSON.isRawJSON : () => false;
  var set_comment_line_breaks = (comment, before, after) => {
    if (is_number(before) && before >= 0) {
      LINE_BREAKS_BEFORE.set(comment, before);
    }
    if (is_number(after) && after >= 0) {
      LINE_BREAKS_AFTER.set(comment, after);
    }
  };
  var get_comment_line_breaks_before = (comment) => LINE_BREAKS_BEFORE.get(comment);
  var get_comment_line_breaks_after = (comment) => LINE_BREAKS_AFTER.get(comment);
  module.exports = {
    PROP_SYMBOL_PREFIXES,
    PREFIX_BEFORE,
    PREFIX_AFTER_PROP,
    PREFIX_AFTER_COLON,
    PREFIX_AFTER_VALUE,
    PREFIX_AFTER,
    PREFIX_BEFORE_ALL,
    PREFIX_AFTER_ALL,
    BRACKET_OPEN,
    BRACKET_CLOSE,
    CURLY_BRACKET_OPEN,
    CURLY_BRACKET_CLOSE,
    COLON,
    COMMA,
    MINUS,
    EMPTY,
    UNDEFINED,
    symbol,
    define: define2,
    copy_comments,
    swap_comments,
    assign_non_prop_comments,
    is_string,
    is_number,
    is_object,
    is_raw_json,
    set_raw_string_literal,
    get_raw_string_literal,
    set_comment_line_breaks,
    get_comment_line_breaks_before,
    get_comment_line_breaks_after,
    assign(target, source, keys) {
      if (!is_object(target)) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      if (!is_object(source)) {
        return target;
      }
      if (keys === UNDEFINED) {
        keys = Object.keys(source);
        assign_non_prop_comments(target, source);
      } else if (!Array.isArray(keys)) {
        throw new TypeError("keys must be array or undefined");
      } else if (keys.length === 0) {
        assign_non_prop_comments(target, source);
      }
      return assign(target, source, keys);
    },
    moveComments(source, target, {
      where: from_where,
      key: from_key
    }, {
      where: to_where,
      key: to_key
    }, override = false) {
      if (!is_object(source)) {
        throw new TypeError("source must be an object");
      }
      if (!target) {
        target = source;
      }
      if (!is_object(target)) {
        return;
      }
      const from_prop = symbol_checked(from_where, from_key);
      const to_prop = symbol_checked(to_where, to_key);
      if (!Object.hasOwn(source, from_prop)) {
        return;
      }
      const source_comments = source[from_prop];
      delete source[from_prop];
      if (override || !Object.hasOwn(target, to_prop)) {
        define2(target, to_prop, source_comments);
        return;
      }
      const target_comments = target[to_prop];
      if (target_comments) {
        target_comments.push(...source_comments);
      }
    },
    removeComments(target, {
      where,
      key
    }) {
      if (!is_object(target)) {
        throw new TypeError("target must be an object");
      }
      const prop = symbol_checked(where, key);
      if (!Object.hasOwn(target, prop)) {
        return;
      }
      delete target[prop];
    }
  };
});

// ../../node_modules/.bun/comment-json@4.6.2/node_modules/comment-json/src/array.js
var require_array = __commonJS((exports, module) => {
  var { sort } = require_src();
  var {
    PROP_SYMBOL_PREFIXES,
    UNDEFINED,
    symbol,
    copy_comments,
    swap_comments
  } = require_common();
  var reverse_comments = (array) => {
    const { length } = array;
    let i = 0;
    const max = length / 2;
    for (;i < max; i++) {
      swap_comments(array, i, length - i - 1);
    }
  };
  var move_comment = (target, source, i, offset, remove) => {
    copy_comments(target, source, i + offset, i, remove);
  };
  var move_comments = (target, source, start, count, offset, remove) => {
    if (offset > 0) {
      let i2 = count;
      while (i2-- > 0) {
        move_comment(target, source, start + i2, offset, remove);
      }
      return;
    }
    let i = 0;
    while (i < count) {
      const ii = i++;
      move_comment(target, source, start + ii, offset, remove);
    }
  };
  var remove_comments = (array, key) => {
    PROP_SYMBOL_PREFIXES.forEach((prefix) => {
      const prop = symbol(prefix, key);
      delete array[prop];
    });
  };
  var get_mapped = (map, key) => {
    let mapped = key;
    while (mapped in map) {
      mapped = map[mapped];
    }
    return mapped;
  };

  class CommentArray extends Array {
    splice(...args) {
      const { length } = this;
      const ret = super.splice(...args);
      let [begin, deleteCount, ...items] = args;
      if (begin < 0) {
        begin += length;
      }
      if (arguments.length === 1) {
        deleteCount = length - begin;
      } else {
        deleteCount = Math.min(length - begin, deleteCount);
      }
      const {
        length: item_length
      } = items;
      const offset = item_length - deleteCount;
      const start = begin + deleteCount;
      const count = length - start;
      move_comments(this, this, start, count, offset, true);
      return ret;
    }
    slice(...args) {
      const { length } = this;
      const array = super.slice(...args);
      if (!array.length) {
        return new CommentArray;
      }
      let [begin, before] = args;
      if (before === UNDEFINED) {
        before = length;
      } else if (before < 0) {
        before += length;
      }
      if (begin < 0) {
        begin += length;
      } else if (begin === UNDEFINED) {
        begin = 0;
      }
      move_comments(array, this, begin, before - begin, -begin);
      return array;
    }
    unshift(...items) {
      const { length } = this;
      const ret = super.unshift(...items);
      const {
        length: items_length
      } = items;
      if (items_length > 0) {
        move_comments(this, this, 0, length, items_length, true);
      }
      return ret;
    }
    shift() {
      const ret = super.shift();
      const { length } = this;
      remove_comments(this, 0);
      move_comments(this, this, 1, length, -1, true);
      return ret;
    }
    reverse() {
      super.reverse();
      reverse_comments(this);
      return this;
    }
    pop() {
      const ret = super.pop();
      remove_comments(this, this.length);
      return ret;
    }
    concat(...items) {
      let { length } = this;
      const ret = super.concat(...items);
      if (!items.length) {
        return ret;
      }
      move_comments(ret, this, 0, this.length, 0);
      items.forEach((item) => {
        const prev = length;
        length += Array.isArray(item) ? item.length : 1;
        if (!(item instanceof CommentArray)) {
          return;
        }
        move_comments(ret, item, 0, item.length, prev);
      });
      return ret;
    }
    sort(...args) {
      const result = sort(this, ...args.slice(0, 1));
      const map = Object.create(null);
      result.forEach((source_index, index) => {
        if (source_index === index) {
          return;
        }
        const real_source_index = get_mapped(map, source_index);
        if (real_source_index === index) {
          return;
        }
        map[index] = real_source_index;
        swap_comments(this, index, real_source_index);
      });
      return this;
    }
  }
  module.exports = {
    CommentArray
  };
});

// ../../node_modules/.bun/comment-json@4.6.2/node_modules/comment-json/src/parse.js
var require_parse = __commonJS((exports, module) => {
  var esprima = require_esprima();
  var {
    CommentArray
  } = require_array();
  var {
    PREFIX_BEFORE,
    PREFIX_AFTER_PROP,
    PREFIX_AFTER_COLON,
    PREFIX_AFTER_VALUE,
    PREFIX_AFTER,
    PREFIX_BEFORE_ALL,
    PREFIX_AFTER_ALL,
    BRACKET_OPEN,
    BRACKET_CLOSE,
    CURLY_BRACKET_OPEN,
    CURLY_BRACKET_CLOSE,
    COLON,
    COMMA,
    MINUS,
    EMPTY,
    UNDEFINED,
    is_object,
    define: define2,
    set_raw_string_literal,
    set_comment_line_breaks,
    assign_non_prop_comments
  } = require_common();
  var tokenize = (code) => esprima.tokenize(code, {
    comment: true,
    loc: true
  });
  var current_code;
  var previous_hosts = [];
  var comments_host = null;
  var unassigned_comments = null;
  var previous_props = [];
  var last_prop;
  var remove_comments = false;
  var inline = false;
  var tokens = null;
  var last = null;
  var current = null;
  var index;
  var reviver = null;
  var clean = () => {
    current_code = UNDEFINED;
    previous_props.length = previous_hosts.length = 0;
    last = null;
    last_prop = UNDEFINED;
  };
  var free = () => {
    clean();
    tokens.length = 0;
    unassigned_comments = comments_host = tokens = last = current = reviver = null;
    current_code = UNDEFINED;
  };
  var symbolFor = (prefix) => Symbol.for(last_prop !== UNDEFINED ? prefix + COLON + last_prop : prefix);
  var transform = (k, { value, context = {} }) => reviver ? reviver(k, value, context) : value;
  var unexpected = () => {
    const error = new SyntaxError(`Unexpected token '${current.value.slice(0, 1)}', "${current_code}" is not valid JSON`);
    Object.assign(error, current.loc.start);
    free();
    throw error;
  };
  var unexpected_end = () => {
    const error = new SyntaxError("Unexpected end of JSON input");
    Object.assign(error, last ? last.loc.end : {
      line: 1,
      column: 0
    });
    free();
    throw error;
  };
  var next = () => {
    const new_token = tokens[++index];
    inline = current && new_token && current.loc.end.line === new_token.loc.start.line || false;
    last = current;
    current = new_token;
  };
  var type = () => {
    if (!current) {
      unexpected_end();
    }
    return current.type === "Punctuator" ? current.value : current.type;
  };
  var is = (t) => type() === t;
  var expect = (a) => {
    if (!is(a)) {
      unexpected();
    }
  };
  var set_comments_host = (new_host) => {
    previous_hosts.push(comments_host);
    comments_host = new_host;
  };
  var restore_comments_host = () => {
    comments_host = previous_hosts.pop();
  };
  var assign_after_comments = () => {
    if (!unassigned_comments) {
      return;
    }
    const after_comments = [];
    for (const comment of unassigned_comments) {
      if (comment.inline) {
        after_comments.push(comment);
      } else {
        break;
      }
    }
    const { length } = after_comments;
    if (!length) {
      return;
    }
    if (length === unassigned_comments.length) {
      unassigned_comments = null;
    } else {
      unassigned_comments.splice(0, length);
    }
    define2(comments_host, symbolFor(PREFIX_AFTER), after_comments);
  };
  var assign_comments = (prefix) => {
    if (!unassigned_comments) {
      return;
    }
    define2(comments_host, symbolFor(prefix), unassigned_comments);
    unassigned_comments = null;
  };
  var parse_comments = (prefix) => {
    const comments = [];
    while (current && (is("LineComment") || is("BlockComment"))) {
      const comment = {
        ...current,
        inline
      };
      const previous_line = last ? last.loc.end.line : 1;
      set_comment_line_breaks(comment, Math.max(0, comment.loc.start.line - previous_line));
      comments.push(comment);
      next();
    }
    const { length } = comments;
    if (length) {
      const comment = comments[length - 1];
      const current_line = current ? current.loc.start.line : comment.loc.end.line;
      set_comment_line_breaks(comment, undefined, Math.max(0, current_line - comment.loc.end.line));
    }
    if (remove_comments) {
      return;
    }
    if (!length) {
      return;
    }
    if (prefix) {
      define2(comments_host, symbolFor(prefix), comments);
      return;
    }
    unassigned_comments = comments;
  };
  var set_prop = (prop, push) => {
    if (push) {
      previous_props.push(last_prop);
    }
    last_prop = prop;
  };
  var restore_prop = () => {
    last_prop = previous_props.pop();
  };
  var parse_object = () => {
    const obj = {};
    set_comments_host(obj);
    set_prop(UNDEFINED, true);
    let started = false;
    let name;
    parse_comments();
    while (!is(CURLY_BRACKET_CLOSE)) {
      if (started) {
        assign_comments(PREFIX_AFTER_VALUE);
        expect(COMMA);
        next();
        parse_comments();
        assign_after_comments();
        if (is(CURLY_BRACKET_CLOSE)) {
          break;
        }
      }
      started = true;
      expect("String");
      name = JSON.parse(current.value);
      set_prop(name);
      assign_comments(PREFIX_BEFORE);
      next();
      parse_comments(PREFIX_AFTER_PROP);
      expect(COLON);
      next();
      parse_comments(PREFIX_AFTER_COLON);
      obj[name] = transform(name, walk());
      parse_comments();
    }
    if (started) {
      assign_comments(PREFIX_AFTER);
    }
    next();
    last_prop = undefined;
    if (!started) {
      assign_comments(PREFIX_BEFORE);
    }
    restore_comments_host();
    restore_prop();
    return obj;
  };
  var parse_array = () => {
    const array = new CommentArray;
    set_comments_host(array);
    set_prop(UNDEFINED, true);
    let started = false;
    let i = 0;
    parse_comments();
    while (!is(BRACKET_CLOSE)) {
      if (started) {
        assign_comments(PREFIX_AFTER_VALUE);
        expect(COMMA);
        next();
        parse_comments();
        assign_after_comments();
        if (is(BRACKET_CLOSE)) {
          break;
        }
      }
      started = true;
      set_prop(i);
      assign_comments(PREFIX_BEFORE);
      array[i] = transform(i, walk());
      i++;
      parse_comments();
    }
    if (started) {
      assign_comments(PREFIX_AFTER);
    }
    next();
    last_prop = undefined;
    if (!started) {
      assign_comments(PREFIX_BEFORE);
    }
    restore_comments_host();
    restore_prop();
    return array;
  };
  function walk() {
    let tt = type();
    if (tt === CURLY_BRACKET_OPEN) {
      next();
      return {
        value: parse_object()
      };
    }
    if (tt === BRACKET_OPEN) {
      next();
      return {
        value: parse_array()
      };
    }
    let negative = EMPTY;
    if (tt === MINUS) {
      next();
      tt = type();
      negative = MINUS;
    }
    let v;
    let source;
    switch (tt) {
      case "String":
        set_raw_string_literal(comments_host, last_prop, current.value);
      case "Boolean":
      case "Null":
      case "Numeric":
        v = current.value;
        next();
        source = negative + v;
        return {
          value: JSON.parse(source),
          context: {
            source
          }
        };
      default:
        return {};
    }
  }
  var parse = (code, rev, no_comments) => {
    clean();
    current_code = code;
    tokens = tokenize(code);
    reviver = rev;
    remove_comments = no_comments;
    if (!tokens.length) {
      unexpected_end();
    }
    index = -1;
    next();
    set_comments_host({});
    parse_comments(PREFIX_BEFORE_ALL);
    const final = walk();
    parse_comments(PREFIX_AFTER_ALL);
    if (current) {
      unexpected();
    }
    let result = transform("", final);
    if (!no_comments && result !== null) {
      if (!is_object(result)) {
        result = new Object(result);
      }
      assign_non_prop_comments(result, comments_host);
    }
    restore_comments_host();
    free();
    return result;
  };
  module.exports = {
    parse,
    tokenize
  };
});

// ../../node_modules/.bun/comment-json@4.6.2/node_modules/comment-json/src/stringify.js
var require_stringify = __commonJS((exports, module) => {
  var {
    PREFIX_BEFORE_ALL,
    PREFIX_BEFORE,
    PREFIX_AFTER_PROP,
    PREFIX_AFTER_COLON,
    PREFIX_AFTER_VALUE,
    PREFIX_AFTER,
    PREFIX_AFTER_ALL,
    BRACKET_OPEN,
    BRACKET_CLOSE,
    CURLY_BRACKET_OPEN,
    CURLY_BRACKET_CLOSE,
    COLON,
    COMMA,
    EMPTY,
    UNDEFINED,
    is_string,
    is_number,
    is_object,
    get_raw_string_literal,
    get_comment_line_breaks_before,
    get_comment_line_breaks_after,
    is_raw_json
  } = require_common();
  var SPACE = " ";
  var LF = `
`;
  var STR_NULL = "null";
  var BEFORE = (prop) => `${PREFIX_BEFORE}:${prop}`;
  var AFTER_PROP = (prop) => `${PREFIX_AFTER_PROP}:${prop}`;
  var AFTER_COLON = (prop) => `${PREFIX_AFTER_COLON}:${prop}`;
  var AFTER_VALUE = (prop) => `${PREFIX_AFTER_VALUE}:${prop}`;
  var AFTER = (prop) => `${PREFIX_AFTER}:${prop}`;
  var quote = JSON.stringify;
  var comment_stringify = (value, line) => line ? `//${value}` : `/*${value}*/`;
  var repeat_line_breaks = (line_breaks, gap) => (LF + gap).repeat(line_breaks);
  var read_line_breaks = (line_breaks) => is_number(line_breaks) && line_breaks >= 0 ? line_breaks : null;
  var read_line_breaks_from_loc = (previous_comment, comment) => {
    if (!previous_comment || !previous_comment.loc || !comment.loc) {
      return null;
    }
    const { end } = previous_comment.loc;
    const { start } = comment.loc;
    if (!end || !start || !is_number(end.line) || !is_number(start.line)) {
      return null;
    }
    const line_breaks = start.line - end.line;
    return line_breaks >= 0 ? line_breaks : null;
  };
  var count_trailing_line_breaks = (str, gap) => {
    const unit = LF + gap;
    const { length } = unit;
    let i = str.length;
    let count = 0;
    while (i >= length && str.slice(i - length, i) === unit) {
      i -= length;
      count++;
    }
    return count;
  };
  var process_comments = (host, symbol_tag, deeper_gap, display_block) => {
    const comments = host[Symbol.for(symbol_tag)];
    if (!comments || !comments.length) {
      return EMPTY;
    }
    let str = EMPTY;
    let last_comment = null;
    comments.forEach((comment, i) => {
      const {
        inline,
        type,
        value
      } = comment;
      let line_breaks_before = read_line_breaks(get_comment_line_breaks_before(comment));
      if (line_breaks_before === null) {
        line_breaks_before = read_line_breaks_from_loc(last_comment, comment);
      }
      if (line_breaks_before === null) {
        line_breaks_before = inline ? 0 : 1;
      }
      const delimiter = line_breaks_before > 0 ? repeat_line_breaks(line_breaks_before, deeper_gap) : inline ? SPACE : i === 0 ? EMPTY : LF + deeper_gap;
      const is_line_comment = type === "LineComment";
      str += delimiter + comment_stringify(value, is_line_comment);
      last_comment = comment;
    });
    const default_line_breaks_after = display_block || last_comment.type === "LineComment" ? 1 : 0;
    const line_breaks_after = Math.max(default_line_breaks_after, read_line_breaks(get_comment_line_breaks_after(last_comment)) || 0);
    return str + repeat_line_breaks(line_breaks_after, deeper_gap);
  };
  var replacer = null;
  var indent = EMPTY;
  var clean = () => {
    replacer = null;
    indent = EMPTY;
  };
  var join = (one, two, gap) => one ? two ? one + two.trim() + LF + gap : one.trimRight() + repeat_line_breaks(Math.max(1, count_trailing_line_breaks(one, gap)), gap) : two ? two.trimRight() + repeat_line_breaks(Math.max(1, count_trailing_line_breaks(two, gap)), gap) : EMPTY;
  var join_content = (inside, value, gap) => {
    const comment = process_comments(value, PREFIX_BEFORE, gap + indent, true);
    return join(comment, inside, gap);
  };
  var stringify_string = (holder, key, value) => {
    const raw = get_raw_string_literal(holder, key);
    if (is_string(raw)) {
      try {
        if (JSON.parse(raw) === value) {
          return raw;
        }
      } catch (e) {}
    }
    return quote(value);
  };
  var array_stringify = (value, gap) => {
    const deeper_gap = gap + indent;
    const { length } = value;
    let inside = EMPTY;
    let after_comma = EMPTY;
    for (let i = 0;i < length; i++) {
      if (i !== 0) {
        inside += COMMA;
      }
      const before = join(after_comma, process_comments(value, BEFORE(i), deeper_gap), deeper_gap);
      inside += before || LF + deeper_gap;
      inside += stringify(i, value, deeper_gap) || STR_NULL;
      inside += process_comments(value, AFTER_VALUE(i), deeper_gap);
      after_comma = process_comments(value, AFTER(i), deeper_gap);
    }
    inside += join(after_comma, process_comments(value, PREFIX_AFTER, deeper_gap), deeper_gap);
    return BRACKET_OPEN + join_content(inside, value, gap) + BRACKET_CLOSE;
  };
  var object_stringify = (value, gap) => {
    if (!value) {
      return "null";
    }
    const deeper_gap = gap + indent;
    let inside = EMPTY;
    let after_comma = EMPTY;
    let first = true;
    const keys = Array.isArray(replacer) ? replacer : Object.keys(value);
    const iteratee = (key) => {
      const sv = stringify(key, value, deeper_gap);
      if (sv === UNDEFINED) {
        return;
      }
      if (!first) {
        inside += COMMA;
      }
      first = false;
      const before = join(after_comma, process_comments(value, BEFORE(key), deeper_gap), deeper_gap);
      inside += before || LF + deeper_gap;
      inside += quote(key) + process_comments(value, AFTER_PROP(key), deeper_gap) + COLON + process_comments(value, AFTER_COLON(key), deeper_gap) + SPACE + sv + process_comments(value, AFTER_VALUE(key), deeper_gap);
      after_comma = process_comments(value, AFTER(key), deeper_gap);
    };
    keys.forEach(iteratee);
    inside += join(after_comma, process_comments(value, PREFIX_AFTER, deeper_gap), deeper_gap);
    return CURLY_BRACKET_OPEN + join_content(inside, value, gap) + CURLY_BRACKET_CLOSE;
  };
  function stringify(key, holder, gap) {
    let value = holder[key];
    if (is_object(value) && typeof value.toJSON === "function") {
      value = value.toJSON(key);
    }
    if (typeof replacer === "function") {
      value = replacer.call(holder, key, value);
    }
    switch (typeof value) {
      case "string":
        return stringify_string(holder, key, value);
      case "number":
        return Number.isFinite(value) ? String(value) : STR_NULL;
      case "boolean":
      case "null":
        return String(value);
      case "object":
        if (is_raw_json(value)) {
          return value.rawJSON;
        }
        return Array.isArray(value) ? array_stringify(value, gap) : object_stringify(value, gap);
      default:
    }
  }
  var get_indent = (space) => typeof space === "string" ? space : typeof space === "number" ? SPACE.repeat(space) : EMPTY;
  var { toString } = Object.prototype;
  var PRIMITIVE_OBJECT_TYPES = [
    "[object Number]",
    "[object String]",
    "[object Boolean]"
  ];
  var is_primitive_object = (subject) => {
    if (typeof subject !== "object") {
      return false;
    }
    const str = toString.call(subject);
    return PRIMITIVE_OBJECT_TYPES.includes(str);
  };
  module.exports = (value, replacer_, space) => {
    const indent_ = get_indent(space);
    if (!indent_) {
      return JSON.stringify(value, replacer_);
    }
    if (typeof replacer_ !== "function" && !Array.isArray(replacer_)) {
      replacer_ = null;
    }
    replacer = replacer_;
    indent = indent_;
    const str = is_primitive_object(value) ? JSON.stringify(value) : stringify("", { "": value }, EMPTY);
    clean();
    return is_object(value) ? process_comments(value, PREFIX_BEFORE_ALL, EMPTY, true).trimLeft() + str + process_comments(value, PREFIX_AFTER_ALL, EMPTY).trimRight() : str;
  };
});

// ../../node_modules/.bun/comment-json@4.6.2/node_modules/comment-json/src/index.js
var require_src2 = __commonJS((exports, module) => {
  var { parse, tokenize } = require_parse();
  var stringify = require_stringify();
  var { CommentArray } = require_array();
  var {
    PREFIX_BEFORE,
    PREFIX_AFTER_PROP,
    PREFIX_AFTER_COLON,
    PREFIX_AFTER_VALUE,
    PREFIX_AFTER,
    PREFIX_BEFORE_ALL,
    PREFIX_AFTER_ALL,
    assign,
    moveComments,
    removeComments
  } = require_common();
  module.exports = {
    PREFIX_BEFORE,
    PREFIX_AFTER_PROP,
    PREFIX_AFTER_COLON,
    PREFIX_AFTER_VALUE,
    PREFIX_AFTER,
    PREFIX_BEFORE_ALL,
    PREFIX_AFTER_ALL,
    parse,
    stringify,
    tokenize,
    CommentArray,
    assign,
    moveComments,
    removeComments
  };
});

// ../../node_modules/.bun/sisteransi@1.0.5/node_modules/sisteransi/src/index.js
var require_src3 = __commonJS((exports, module) => {
  var ESC = "\x1B";
  var CSI = `${ESC}[`;
  var beep = "\x07";
  var cursor = {
    to(x, y) {
      if (!y)
        return `${CSI}${x + 1}G`;
      return `${CSI}${y + 1};${x + 1}H`;
    },
    move(x, y) {
      let ret = "";
      if (x < 0)
        ret += `${CSI}${-x}D`;
      else if (x > 0)
        ret += `${CSI}${x}C`;
      if (y < 0)
        ret += `${CSI}${-y}A`;
      else if (y > 0)
        ret += `${CSI}${y}B`;
      return ret;
    },
    up: (count = 1) => `${CSI}${count}A`,
    down: (count = 1) => `${CSI}${count}B`,
    forward: (count = 1) => `${CSI}${count}C`,
    backward: (count = 1) => `${CSI}${count}D`,
    nextLine: (count = 1) => `${CSI}E`.repeat(count),
    prevLine: (count = 1) => `${CSI}F`.repeat(count),
    left: `${CSI}G`,
    hide: `${CSI}?25l`,
    show: `${CSI}?25h`,
    save: `${ESC}7`,
    restore: `${ESC}8`
  };
  var scroll = {
    up: (count = 1) => `${CSI}S`.repeat(count),
    down: (count = 1) => `${CSI}T`.repeat(count)
  };
  var erase = {
    screen: `${CSI}2J`,
    up: (count = 1) => `${CSI}1J`.repeat(count),
    down: (count = 1) => `${CSI}J`.repeat(count),
    line: `${CSI}2K`,
    lineEnd: `${CSI}K`,
    lineStart: `${CSI}1K`,
    lines(count) {
      let clear = "";
      for (let i = 0;i < count; i++)
        clear += this.line + (i < count - 1 ? cursor.up() : "");
      if (count)
        clear += cursor.left;
      return clear;
    }
  };
  module.exports = { cursor, scroll, erase, beep };
});

// src/cli/doctor.ts
var import_comment_json3 = __toESM(require_src2(), 1);
import { execSync as execSync2, spawnSync } from "node:child_process";
import { existsSync as existsSync7, readdirSync as readdirSync2, readFileSync as readFileSync6, rmSync, statSync as statSync2, writeFileSync as writeFileSync4 } from "node:fs";
import { createRequire as createRequire3 } from "node:module";
import { homedir as homedir6, platform, tmpdir as tmpdir3 } from "node:os";
import { join as join9 } from "node:path";

// src/config/variable.ts
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, isAbsolute, resolve } from "node:path";
var ENV_PATTERN = /\{env:([^}]+)\}/g;
var FILE_PATTERN = /\{file:([^}]+)\}/g;
function substituteConfigVariables(input) {
  const warnings = [];
  let text = input.text;
  text = text.replace(ENV_PATTERN, (_, rawName) => {
    const varName = rawName.trim();
    const value = varName ? process.env[varName] : undefined;
    if (value === undefined || value === "") {
      warnings.push(`Environment variable ${varName} is not set (referenced via {env:${varName}}); using empty string`);
      return "";
    }
    return value;
  });
  const fileMatches = Array.from(text.matchAll(FILE_PATTERN));
  if (fileMatches.length === 0) {
    return { text, warnings };
  }
  const configDir = input.configPath ? dirname(input.configPath) : process.cwd();
  let output = "";
  let cursor = 0;
  for (const match of fileMatches) {
    const token = match[0];
    const rawPath = match[1] ?? "";
    const index = match.index ?? 0;
    output += text.slice(cursor, index);
    cursor = index + token.length;
    const lineStart = text.lastIndexOf(`
`, index - 1) + 1;
    const prefix = text.slice(lineStart, index).trimStart();
    if (prefix.startsWith("//")) {
      output += token;
      continue;
    }
    let filePath = rawPath.trim();
    if (filePath.startsWith("~/")) {
      filePath = resolve(homedir(), filePath.slice(2));
    } else if (!isAbsolute(filePath)) {
      filePath = resolve(configDir, filePath);
    }
    if (!existsSync(filePath)) {
      warnings.push(`File not found for ${token} (resolved to ${filePath}); using empty string`);
      continue;
    }
    let contents;
    try {
      contents = readFileSync(filePath, "utf-8").trim();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      warnings.push(`Failed to read file for ${token} (${filePath}): ${message}; using empty string`);
      continue;
    }
    output += JSON.stringify(contents).slice(1, -1);
  }
  output += text.slice(cursor);
  return { text: output, warnings };
}

// src/features/magic-context/memory/embedding-probe.ts
var DEFAULT_TIMEOUT_MS = 1e4;
var MAX_PREVIEW_CHARS = 240;
async function probeEmbeddingEndpoint(options) {
  const endpoint = options.endpoint.trim().replace(/\/+$/, "");
  if (!endpoint) {
    return { kind: "invalid_scheme", endpoint: options.endpoint };
  }
  if (!endpoint.startsWith("https://") && !endpoint.startsWith("http://")) {
    return { kind: "invalid_scheme", endpoint: options.endpoint };
  }
  const fetchImpl = options.fetch ?? fetch;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const url = `${endpoint}/embeddings`;
  const apiKey = options.apiKey?.trim();
  const headers = { "content-type": "application/json" };
  if (apiKey) {
    headers.authorization = `Bearer ${apiKey}`;
  }
  const body = JSON.stringify({ model: options.model, input: "magic-context probe" });
  let response;
  try {
    response = await fetchImpl(url, {
      method: "POST",
      headers,
      body,
      signal: AbortSignal.timeout(timeoutMs)
    });
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      return { kind: "timeout", timeoutMs };
    }
    if (error instanceof Error && error.name === "AbortError") {
      return { kind: "timeout", timeoutMs };
    }
    return {
      kind: "network_error",
      message: error instanceof Error ? error.message : String(error)
    };
  }
  const status = response.status;
  if (response.ok) {
    let parsed = null;
    try {
      parsed = await response.json();
    } catch {
      return { kind: "endpoint_unsupported", status, preview: "" };
    }
    const dimensions = extractDimensions(parsed);
    if (dimensions === null) {
      return {
        kind: "endpoint_unsupported",
        status,
        preview: await readPreview(parsed)
      };
    }
    return { kind: "ok", status, dimensions };
  }
  const preview = await previewErrorBody(response);
  if (status === 401 || status === 403) {
    return { kind: "auth_failed", status, preview };
  }
  if (status === 404 || status === 405) {
    return { kind: "endpoint_unsupported", status, preview };
  }
  return { kind: "http_error", status, preview };
}
function extractDimensions(body) {
  if (!body || typeof body !== "object")
    return null;
  const data = body.data;
  if (!Array.isArray(data) || data.length === 0)
    return null;
  const first = data[0];
  if (!first || typeof first !== "object")
    return null;
  const embedding = first.embedding;
  if (!Array.isArray(embedding) || embedding.length === 0)
    return null;
  const sample = embedding[0];
  if (typeof sample !== "number" || !Number.isFinite(sample))
    return null;
  return embedding.length;
}
async function previewErrorBody(response) {
  try {
    const text = await response.text();
    return truncate(text);
  } catch {
    return "";
  }
}
async function readPreview(parsed) {
  try {
    return truncate(JSON.stringify(parsed));
  } catch {
    return "";
  }
}
function truncate(text) {
  if (text.length <= MAX_PREVIEW_CHARS)
    return text;
  return `${text.slice(0, MAX_PREVIEW_CHARS)}…`;
}

// src/shared/conflict-detector.ts
import { join as join2 } from "node:path";

// src/shared/jsonc-parser.ts
import { existsSync as existsSync2, readFileSync as readFileSync2 } from "node:fs";
function stripJsonComments(content) {
  let result = "";
  let inString = false;
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;
  for (let index = 0;index < content.length; index += 1) {
    const char = content[index];
    const next = content[index + 1];
    if (inLineComment) {
      if (char === `
`) {
        inLineComment = false;
        result += char;
      }
      continue;
    }
    if (inBlockComment) {
      if (char === "*" && next === "/") {
        inBlockComment = false;
        index += 1;
      }
      continue;
    }
    if (inString) {
      result += char;
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }
    if (char === '"') {
      inString = true;
      result += char;
      continue;
    }
    if (char === "/" && next === "/") {
      inLineComment = true;
      index += 1;
      continue;
    }
    if (char === "/" && next === "*") {
      inBlockComment = true;
      index += 1;
      continue;
    }
    result += char;
  }
  return result;
}
function stripTrailingCommas(content) {
  let result = "";
  let inString = false;
  let escaped = false;
  for (let index = 0;index < content.length; index += 1) {
    const char = content[index];
    if (inString) {
      result += char;
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }
    if (char === '"') {
      inString = true;
      result += char;
      continue;
    }
    if (char === ",") {
      let lookahead = index + 1;
      while (lookahead < content.length && /\s/.test(content[lookahead] ?? "")) {
        lookahead += 1;
      }
      const next = content[lookahead];
      if (next === "}" || next === "]") {
        continue;
      }
    }
    result += char;
  }
  return result;
}
function parseJsonc(content) {
  const normalized = stripTrailingCommas(stripJsonComments(content));
  return JSON.parse(normalized);
}
function readJsoncFile(filePath) {
  try {
    return parseJsonc(readFileSync2(filePath, "utf-8"));
  } catch (_error) {
    return null;
  }
}

// src/shared/opencode-config-dir.ts
import { homedir as homedir2 } from "node:os";
import { join, resolve as resolve2 } from "node:path";
function getCliConfigDir() {
  const envConfigDir = process.env.OPENCODE_CONFIG_DIR?.trim();
  if (envConfigDir) {
    return resolve2(envConfigDir);
  }
  if (process.platform === "win32") {
    return join(homedir2(), ".config", "opencode");
  }
  return join(process.env.XDG_CONFIG_HOME || join(homedir2(), ".config"), "opencode");
}
function getOpenCodeConfigDir(_options) {
  return getCliConfigDir();
}
function getOpenCodeConfigPaths(options) {
  const configDir = getOpenCodeConfigDir(options);
  return {
    configDir,
    configJson: join(configDir, "opencode.json"),
    configJsonc: join(configDir, "opencode.jsonc"),
    packageJson: join(configDir, "package.json"),
    omoConfig: join(configDir, "magic-context.jsonc")
  };
}

// src/shared/conflict-detector.ts
function detectConflicts(directory) {
  const conflicts = {
    compactionAuto: false,
    compactionPrune: false,
    dcpPlugin: false,
    omoPreemptiveCompaction: false,
    omoContextWindowMonitor: false,
    omoAnthropicRecovery: false
  };
  const reasons = [];
  const compactionResult = checkCompaction(directory);
  if (compactionResult.auto) {
    conflicts.compactionAuto = true;
    reasons.push("OpenCode auto-compaction is enabled (compaction.auto=true)");
  }
  if (compactionResult.prune) {
    conflicts.compactionPrune = true;
    reasons.push("OpenCode prune is enabled (compaction.prune=true)");
  }
  const dcpFound = checkDcpPlugin(directory);
  if (dcpFound) {
    conflicts.dcpPlugin = true;
    reasons.push("opencode-dcp plugin is installed — it conflicts with Magic Context's context management");
  }
  const omoResult = checkOmoHooks(directory);
  if (omoResult.preemptiveCompaction) {
    conflicts.omoPreemptiveCompaction = true;
    reasons.push("oh-my-opencode preemptive-compaction hook is active — it triggers compaction that conflicts with historian");
  }
  if (omoResult.contextWindowMonitor) {
    conflicts.omoContextWindowMonitor = true;
    reasons.push("oh-my-opencode context-window-monitor hook is active — it injects usage warnings that overlap with Magic Context nudges");
  }
  if (omoResult.anthropicRecovery) {
    conflicts.omoAnthropicRecovery = true;
    reasons.push("oh-my-opencode anthropic-context-window-limit-recovery hook is active — it triggers emergency compaction that bypasses historian");
  }
  return {
    hasConflict: reasons.length > 0,
    reasons,
    conflicts
  };
}
function checkCompaction(directory) {
  if (process.env.OPENCODE_DISABLE_AUTOCOMPACT) {
    return { auto: false, prune: false };
  }
  const projectResult = readProjectCompaction(directory);
  if (projectResult.resolved)
    return projectResult;
  const userResult = readUserCompaction();
  if (userResult.resolved)
    return userResult;
  return { auto: true, prune: false };
}
function readProjectCompaction(directory) {
  const dotOcJsonc = join2(directory, ".opencode", "opencode.jsonc");
  const dotOcJson = join2(directory, ".opencode", "opencode.json");
  const dotOcConfig = readJsoncFile(dotOcJsonc) ?? readJsoncFile(dotOcJson);
  if (dotOcConfig?.compaction) {
    const c = dotOcConfig.compaction;
    if (c.auto !== undefined || c.prune !== undefined) {
      return { auto: c.auto === true, prune: c.prune === true, resolved: true };
    }
  }
  const rootJsonc = join2(directory, "opencode.jsonc");
  const rootJson = join2(directory, "opencode.json");
  const rootConfig = readJsoncFile(rootJsonc) ?? readJsoncFile(rootJson);
  if (rootConfig?.compaction) {
    const c = rootConfig.compaction;
    if (c.auto !== undefined || c.prune !== undefined) {
      return { auto: c.auto === true, prune: c.prune === true, resolved: true };
    }
  }
  return { auto: false, prune: false, resolved: false };
}
function readUserCompaction() {
  try {
    const paths = getOpenCodeConfigPaths({ binary: "opencode" });
    const config = readJsoncFile(paths.configJsonc) ?? readJsoncFile(paths.configJson);
    if (config?.compaction) {
      const c = config.compaction;
      if (c.auto !== undefined || c.prune !== undefined) {
        return { auto: c.auto === true, prune: c.prune === true, resolved: true };
      }
    }
  } catch {}
  return { auto: false, prune: false, resolved: false };
}
function checkDcpPlugin(directory) {
  const plugins = collectPluginEntries(directory);
  return plugins.some((p) => p.includes("opencode-dcp"));
}
function collectPluginEntries(directory) {
  const plugins = [];
  for (const configPath of [
    join2(directory, ".opencode", "opencode.jsonc"),
    join2(directory, ".opencode", "opencode.json"),
    join2(directory, "opencode.jsonc"),
    join2(directory, "opencode.json")
  ]) {
    const config = readJsoncFile(configPath);
    if (config?.plugin) {
      plugins.push(...config.plugin);
    }
  }
  try {
    const paths = getOpenCodeConfigPaths({ binary: "opencode" });
    for (const configPath of [paths.configJsonc, paths.configJson]) {
      const config = readJsoncFile(configPath);
      if (config?.plugin) {
        plugins.push(...config.plugin);
      }
    }
  } catch {}
  return plugins;
}
function checkOmoHooks(directory) {
  const result = {
    preemptiveCompaction: false,
    contextWindowMonitor: false,
    anthropicRecovery: false
  };
  const plugins = collectPluginEntries(directory);
  const hasOmo = plugins.some((p) => p.includes("oh-my-opencode") || p.includes("oh-my-openagent") || p.includes("@code-yeongyu/"));
  if (!hasOmo)
    return result;
  const disabledHooks = readOmoDisabledHooks(directory);
  result.preemptiveCompaction = !disabledHooks.has("preemptive-compaction");
  result.contextWindowMonitor = !disabledHooks.has("context-window-monitor");
  result.anthropicRecovery = !disabledHooks.has("anthropic-context-window-limit-recovery");
  return result;
}
function readOmoDisabledHooks(directory) {
  const disabled = new Set;
  const configNames = [
    "oh-my-opencode.jsonc",
    "oh-my-opencode.json",
    "oh-my-openagent.jsonc",
    "oh-my-openagent.json"
  ];
  try {
    const paths = getOpenCodeConfigPaths({ binary: "opencode" });
    for (const name of configNames) {
      const configPath = join2(paths.configDir, name);
      const config = readJsoncFile(configPath);
      if (config?.disabled_hooks) {
        for (const hook of config.disabled_hooks) {
          disabled.add(hook);
        }
      }
    }
  } catch {}
  for (const name of configNames) {
    const config = readJsoncFile(join2(directory, name));
    if (config?.disabled_hooks) {
      for (const hook of config.disabled_hooks) {
        disabled.add(hook);
      }
    }
  }
  return disabled;
}

// src/shared/conflict-fixer.ts
import { existsSync as existsSync3, mkdirSync, writeFileSync } from "node:fs";
import { dirname as dirname2, join as join3 } from "node:path";
var CONFLICTING_OMO_HOOKS = [
  "context-window-monitor",
  "preemptive-compaction",
  "anthropic-context-window-limit-recovery"
];
var OMO_CONFIG_NAMES = [
  "oh-my-openagent.jsonc",
  "oh-my-openagent.json",
  "oh-my-opencode.jsonc",
  "oh-my-opencode.json"
];
function ensureParentDir(filePath) {
  mkdirSync(dirname2(filePath), { recursive: true });
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function asStringArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}
function readConfig(filePath) {
  if (!existsSync3(filePath)) {
    return {};
  }
  return readJsoncFile(filePath);
}
function writeConfig(filePath, config) {
  ensureParentDir(filePath);
  writeFileSync(filePath, `${JSON.stringify(config, null, 2)}
`);
}
function resolveUserOpenCodeConfigPath() {
  const paths = getOpenCodeConfigPaths({ binary: "opencode" });
  if (existsSync3(paths.configJsonc))
    return paths.configJsonc;
  return paths.configJson;
}
function collectOpenCodeConfigPaths(directory) {
  const paths = new Set;
  const userConfig = resolveUserOpenCodeConfigPath();
  paths.add(userConfig);
  for (const filePath of [
    join3(directory, ".opencode", "opencode.jsonc"),
    join3(directory, ".opencode", "opencode.json"),
    join3(directory, "opencode.jsonc"),
    join3(directory, "opencode.json")
  ]) {
    if (existsSync3(filePath)) {
      paths.add(filePath);
    }
  }
  return [...paths];
}
function collectOmoConfigPaths(directory) {
  const paths = new Set;
  const configDir = getOpenCodeConfigPaths({ binary: "opencode" }).configDir;
  for (const fileName of OMO_CONFIG_NAMES) {
    const userPath = join3(configDir, fileName);
    const projectPath = join3(directory, fileName);
    if (existsSync3(userPath)) {
      paths.add(userPath);
    }
    if (existsSync3(projectPath)) {
      paths.add(projectPath);
    }
  }
  if (paths.size === 0) {
    paths.add(join3(configDir, "oh-my-openagent.json"));
  }
  return [...paths];
}
function fixConflicts(directory, conflicts) {
  const actions = [];
  let updatedCompaction = false;
  let removedDcpPlugin = false;
  let disabledOmoHooks = false;
  if (conflicts.compactionAuto || conflicts.compactionPrune || conflicts.dcpPlugin) {
    for (const configPath of collectOpenCodeConfigPaths(directory)) {
      const config = readConfig(configPath);
      if (!config) {
        continue;
      }
      let changed = false;
      if (conflicts.compactionAuto || conflicts.compactionPrune) {
        const compaction = isRecord(config.compaction) ? { ...config.compaction } : {};
        if (compaction.auto !== false) {
          compaction.auto = false;
          changed = true;
          updatedCompaction = true;
        }
        if (compaction.prune !== false) {
          compaction.prune = false;
          changed = true;
          updatedCompaction = true;
        }
        config.compaction = compaction;
      }
      if (conflicts.dcpPlugin) {
        const plugins = asStringArray(config.plugin);
        const filteredPlugins = plugins.filter((plugin) => !plugin.includes("opencode-dcp"));
        if (filteredPlugins.length !== plugins.length) {
          config.plugin = filteredPlugins;
          changed = true;
          removedDcpPlugin = true;
        }
      }
      if (changed) {
        writeConfig(configPath, config);
      }
    }
  }
  if (conflicts.omoContextWindowMonitor || conflicts.omoPreemptiveCompaction || conflicts.omoAnthropicRecovery) {
    const hooksToDisable = new Set;
    if (conflicts.omoContextWindowMonitor) {
      hooksToDisable.add("context-window-monitor");
    }
    if (conflicts.omoPreemptiveCompaction) {
      hooksToDisable.add("preemptive-compaction");
    }
    if (conflicts.omoAnthropicRecovery) {
      hooksToDisable.add("anthropic-context-window-limit-recovery");
    }
    for (const configPath of collectOmoConfigPaths(directory)) {
      const config = readConfig(configPath);
      if (!config) {
        continue;
      }
      const disabledHooks = new Set(asStringArray(config.disabled_hooks));
      let changed = false;
      for (const hook of hooksToDisable) {
        if (!disabledHooks.has(hook)) {
          disabledHooks.add(hook);
          changed = true;
          disabledOmoHooks = true;
        }
      }
      if (changed) {
        config.disabled_hooks = [
          ...CONFLICTING_OMO_HOOKS.filter((hook) => disabledHooks.has(hook)),
          ...[...disabledHooks].filter((hook) => !CONFLICTING_OMO_HOOKS.includes(hook))
        ];
        writeConfig(configPath, config);
      }
    }
  }
  if (updatedCompaction) {
    actions.push("Disabled auto-compaction");
  }
  if (removedDcpPlugin) {
    actions.push("Removed opencode-dcp plugin");
  }
  if (disabledOmoHooks) {
    actions.push("Disabled conflicting oh-my-opencode hooks");
  }
  return actions;
}

// src/shared/tui-config.ts
var import_comment_json = __toESM(require_src2(), 1);
import { existsSync as existsSync4, mkdirSync as mkdirSync2, readFileSync as readFileSync3, writeFileSync as writeFileSync2 } from "node:fs";
import { dirname as dirname3, join as join5 } from "node:path";

// src/shared/logger.ts
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
var logFile = path.join(os.tmpdir(), "magic-context.log");
var isTestEnv = false;
var buffer = [];
var flushTimer = null;
var FLUSH_INTERVAL_MS = 500;
var BUFFER_SIZE_LIMIT = 50;
function flush() {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (buffer.length === 0)
    return;
  const data = buffer.join("");
  buffer = [];
  try {
    fs.appendFileSync(logFile, data);
  } catch {}
}
function scheduleFlush() {
  if (flushTimer)
    return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flush();
  }, FLUSH_INTERVAL_MS);
}
function log(message, data) {
  if (isTestEnv)
    return;
  try {
    const timestamp = new Date().toISOString();
    const serialized = data === undefined ? "" : data instanceof Error ? ` ${data.message}${data.stack ? `
${data.stack}` : ""}` : ` ${JSON.stringify(data)}`;
    buffer.push(`[${timestamp}] ${message}${serialized}
`);
    if (buffer.length >= BUFFER_SIZE_LIMIT) {
      flush();
    } else {
      scheduleFlush();
    }
  } catch {}
}
if (!isTestEnv) {
  process.on("exit", flush);
}

// src/shared/tui-config.ts
var PLUGIN_NAME = "@cortexkit/opencode-magic-context";
var PLUGIN_ENTRY = `${PLUGIN_NAME}@latest`;
function resolveTuiConfigPath() {
  const configDir = getOpenCodeConfigPaths({ binary: "opencode" }).configDir;
  const jsoncPath = join5(configDir, "tui.jsonc");
  const jsonPath = join5(configDir, "tui.json");
  if (existsSync4(jsoncPath))
    return jsoncPath;
  if (existsSync4(jsonPath))
    return jsonPath;
  return jsonPath;
}
function ensureTuiPluginEntry() {
  try {
    const configPath = resolveTuiConfigPath();
    let config = {};
    if (existsSync4(configPath)) {
      const raw = readFileSync3(configPath, "utf-8");
      config = import_comment_json.parse(raw) ?? {};
    }
    const plugins = Array.isArray(config.plugin) ? config.plugin.filter((p) => typeof p === "string") : [];
    const existingIdx = plugins.findIndex((p) => p === PLUGIN_NAME || p.startsWith(`${PLUGIN_NAME}@`));
    if (existingIdx >= 0) {
      if (plugins[existingIdx] === PLUGIN_ENTRY) {
        return false;
      }
      const existing = plugins[existingIdx];
      if (existing === PLUGIN_NAME) {
        plugins[existingIdx] = PLUGIN_ENTRY;
      } else {
        return false;
      }
    } else {
      plugins.push(PLUGIN_ENTRY);
    }
    config.plugin = plugins;
    mkdirSync2(dirname3(configPath), { recursive: true });
    writeFileSync2(configPath, `${import_comment_json.stringify(config, null, 2)}
`);
    log(`[magic-context] updated TUI plugin entry in ${configPath}`);
    return true;
  } catch (error) {
    log(`[magic-context] failed to update tui.json: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

// src/cli/config-paths.ts
import { existsSync as existsSync5 } from "node:fs";
import { homedir as homedir3 } from "node:os";
import { join as join6 } from "node:path";
function getConfigDir() {
  const envDir = process.env.OPENCODE_CONFIG_DIR?.trim();
  if (envDir)
    return envDir;
  if (process.platform === "win32") {
    return join6(homedir3(), ".config", "opencode");
  }
  const xdgConfig = process.env.XDG_CONFIG_HOME || join6(homedir3(), ".config");
  return join6(xdgConfig, "opencode");
}
function findOmoConfig(configDir) {
  const locations = [
    join6(configDir, "oh-my-openagent.jsonc"),
    join6(configDir, "oh-my-openagent.json"),
    join6(configDir, "oh-my-opencode.jsonc"),
    join6(configDir, "oh-my-opencode.json")
  ];
  for (const loc of locations) {
    if (existsSync5(loc))
      return loc;
  }
  return null;
}
function detectConfigPaths() {
  const configDir = getConfigDir();
  let opencodeConfig;
  let opencodeConfigFormat;
  let tuiConfig;
  let tuiConfigFormat;
  const jsoncPath = join6(configDir, "opencode.jsonc");
  const jsonPath = join6(configDir, "opencode.json");
  if (existsSync5(jsoncPath)) {
    opencodeConfig = jsoncPath;
    opencodeConfigFormat = "jsonc";
  } else if (existsSync5(jsonPath)) {
    opencodeConfig = jsonPath;
    opencodeConfigFormat = "json";
  } else {
    opencodeConfig = jsonPath;
    opencodeConfigFormat = "none";
  }
  const tuiJsoncPath = join6(configDir, "tui.jsonc");
  const tuiJsonPath = join6(configDir, "tui.json");
  if (existsSync5(tuiJsoncPath)) {
    tuiConfig = tuiJsoncPath;
    tuiConfigFormat = "jsonc";
  } else if (existsSync5(tuiJsonPath)) {
    tuiConfig = tuiJsonPath;
    tuiConfigFormat = "json";
  } else {
    tuiConfig = tuiJsonPath;
    tuiConfigFormat = "none";
  }
  return {
    configDir,
    opencodeConfig,
    opencodeConfigFormat,
    magicContextConfig: join6(configDir, "magic-context.jsonc"),
    omoConfig: findOmoConfig(configDir),
    tuiConfig,
    tuiConfigFormat
  };
}

// src/cli/diagnostics.ts
var import_comment_json2 = __toESM(require_src2(), 1);
import { Database } from "bun:sqlite";
import { existsSync as existsSync6, readdirSync, readFileSync as readFileSync4, statSync } from "node:fs";
import { createRequire as createRequire2 } from "node:module";
import { homedir as homedir4, tmpdir as tmpdir2, userInfo } from "node:os";
import { join as join7 } from "node:path";

// src/hooks/magic-context/compartment-parser.ts
var COMPARTMENT_REGEX = /<compartment\s+(?:id="[^"]*"\s+)?start="(\d+)"\s+end="(\d+)"\s+title="([^"]+)"\s*>(.*?)<\/compartment>/gs;
var CATEGORY_BLOCK_REGEX = /<(WORKFLOW_RULES|ARCHITECTURE_DECISIONS|CONSTRAINTS|CONFIG_DEFAULTS|KNOWN_ISSUES|ENVIRONMENT|NAMING|USER_PREFERENCES|USER_DIRECTIVES)>(.*?)<\/\1>/gs;
var FACT_ITEM_REGEX = /^\s*\*\s*(.+)$/gm;
var UNPROCESSED_REGEX = /<unprocessed_from>(\d+)<\/unprocessed_from>/;
var USER_OBSERVATIONS_REGEX = /<user_observations>(.*?)<\/user_observations>/s;
var USER_OBS_ITEM_REGEX = /^\s*\*\s*(.+)$/gm;
function parseCompartmentOutput(text) {
  const compartments = [];
  const facts = [];
  for (const match of text.matchAll(COMPARTMENT_REGEX)) {
    const startMessage = parseInt(match[1], 10);
    const endMessage = parseInt(match[2], 10);
    const title = unescapeXml(match[3]);
    const content = unescapeXml(match[4].trim());
    if (!Number.isNaN(startMessage) && !Number.isNaN(endMessage) && title && content) {
      compartments.push({ startMessage, endMessage, title, content });
    }
  }
  for (const categoryMatch of text.matchAll(CATEGORY_BLOCK_REGEX)) {
    const category = categoryMatch[1];
    const blockContent = categoryMatch[2];
    for (const itemMatch of blockContent.matchAll(FACT_ITEM_REGEX)) {
      const content = unescapeXml(itemMatch[1].trim());
      if (content) {
        facts.push({ category, content });
      }
    }
  }
  const unprocessedMatch = text.match(UNPROCESSED_REGEX);
  const unprocessedFrom = unprocessedMatch ? parseInt(unprocessedMatch[1], 10) : null;
  const userObservations = [];
  const userObsMatch = text.match(USER_OBSERVATIONS_REGEX);
  if (userObsMatch) {
    for (const itemMatch of userObsMatch[1].matchAll(USER_OBS_ITEM_REGEX)) {
      const obs = unescapeXml(itemMatch[1].trim());
      if (obs)
        userObservations.push(obs);
    }
  }
  compartments.sort((a, b) => a.startMessage - b.startMessage);
  return { compartments, facts, unprocessedFrom, userObservations };
}
function unescapeXml(s) {
  return s.replace(/&amp;/g, "&").replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

// src/cli/opencode-helpers.ts
import { execSync } from "node:child_process";
function isOpenCodeInstalled() {
  try {
    execSync("opencode --version", { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}
function getOpenCodeVersion() {
  try {
    return execSync("opencode --version", { stdio: "pipe" }).toString().trim();
  } catch {
    return null;
  }
}
function getAvailableModels() {
  try {
    const output = execSync("opencode models", { stdio: "pipe" }).toString().trim();
    return output.split(`
`).map((l) => l.trim()).filter(Boolean);
  } catch {
    return [];
  }
}
function buildModelSelection(allModels, role) {
  const result = [];
  const added = new Set;
  const addIfAvailable = (pattern, hint) => {
    const matches = allModels.filter((m) => m === pattern || m.endsWith(`/${pattern}`));
    for (const m of matches) {
      if (!added.has(m)) {
        added.add(m);
        result.push({
          label: hint ? `${m} — ${hint}` : m,
          value: m,
          recommended: result.length === 0
        });
      }
    }
  };
  if (role === "historian") {
    addIfAvailable("github-copilot/claude-sonnet-4.6", "per-request billing");
    addIfAvailable("anthropic/claude-sonnet-4-6");
    addIfAvailable("github-copilot/gpt-5.4", "per-request billing");
    addIfAvailable("openai/gpt-5.4");
    addIfAvailable("github-copilot/gemini-3.1-pro-preview", "per-request billing");
    addIfAvailable("opencode-go/minimax-m2.7");
    addIfAvailable("opencode-go/glm-5");
  } else if (role === "dreamer") {
    for (const m of allModels.filter((m2) => m2.startsWith("ollama/"))) {
      if (!added.has(m)) {
        added.add(m);
        result.push({ label: `${m} — local`, value: m, recommended: result.length === 0 });
      }
    }
    addIfAvailable("github-copilot/claude-sonnet-4.6", "per-request billing");
    addIfAvailable("anthropic/claude-sonnet-4-6");
    addIfAvailable("github-copilot/gemini-3-flash-preview", "per-request billing");
    addIfAvailable("opencode-go/glm-5");
    addIfAvailable("opencode-go/minimax-m2.7");
  } else if (role === "sidekick") {
    for (const m of allModels.filter((m2) => m2.startsWith("cerebras/"))) {
      if (!added.has(m)) {
        added.add(m);
        result.push({ label: m, value: m, recommended: result.length === 0 });
      }
    }
    addIfAvailable("opencode/gpt-5-nano");
    addIfAvailable("github-copilot/gemini-3-flash-preview");
    addIfAvailable("github-copilot/gpt-5-mini");
  }
  return result;
}

// src/cli/diagnostics.ts
var PLUGIN_NAME2 = "@cortexkit/opencode-magic-context";
var PLUGIN_ENTRY_WITH_VERSION = `${PLUGIN_NAME2}@latest`;
function getSelfVersion() {
  const require2 = createRequire2(import.meta.url);
  for (const relPath of ["../../package.json", "../package.json"]) {
    try {
      const pkg = require2(relPath);
      if (typeof pkg.version === "string" && pkg.version.length > 0) {
        return pkg.version;
      }
    } catch {}
  }
  return "unknown";
}
function getOpenCodeCacheDir() {
  const xdgCache = process.env.XDG_CACHE_HOME;
  if (xdgCache)
    return join7(xdgCache, "opencode");
  if (process.platform === "win32") {
    const localAppData = process.env.LOCALAPPDATA ?? join7(homedir4(), "AppData", "Local");
    return join7(localAppData, "opencode");
  }
  return join7(homedir4(), ".cache", "opencode");
}
function getPluginCacheInfo() {
  const path2 = join7(getOpenCodeCacheDir(), "packages", PLUGIN_ENTRY_WITH_VERSION);
  let cached;
  try {
    const installedPkgPath = join7(path2, "node_modules", "@cortexkit", "opencode-magic-context", "package.json");
    if (existsSync6(installedPkgPath)) {
      const pkg = JSON.parse(readFileSync4(installedPkgPath, "utf-8"));
      cached = typeof pkg.version === "string" ? pkg.version : undefined;
    }
  } catch {
    cached = undefined;
  }
  return { path: path2, cached, latest: getSelfVersion() };
}
function getStorageDir() {
  const dataHome = process.env.XDG_DATA_HOME || join7(homedir4(), ".local", "share");
  return join7(dataHome, "opencode", "storage", "plugin", "magic-context");
}
function fileSize(path2) {
  try {
    return existsSync6(path2) ? statSync(path2).size : 0;
  } catch {
    return 0;
  }
}
function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function sanitizeString(value) {
  const home = homedir4();
  const username = userInfo().username;
  let sanitized = value;
  if (home) {
    sanitized = sanitized.replace(new RegExp(escapeRegex(home), "g"), "~");
  }
  sanitized = sanitized.replace(/\/Users\/[^/]+\//g, "/Users/<USER>/");
  sanitized = sanitized.replace(/\/home\/[^/]+\//g, "/home/<USER>/");
  sanitized = sanitized.replace(/C:\\Users\\[^\\]+\\/g, "C:\\Users\\<USER>\\");
  if (username) {
    sanitized = sanitized.replace(new RegExp(escapeRegex(username), "g"), "<USER>");
  }
  return sanitized;
}
function sanitizeValue(value) {
  if (typeof value === "string")
    return sanitizeString(value);
  if (Array.isArray(value))
    return value.map(sanitizeValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, sanitizeValue(entry)]));
  }
  return value;
}
function readConfig2(path2) {
  if (!existsSync6(path2))
    return { value: null };
  try {
    const raw = readFileSync4(path2, "utf-8");
    const value = import_comment_json2.parse(raw);
    return { value };
  } catch (error) {
    return { value: null, error: error instanceof Error ? error.message : String(error) };
  }
}
function configHasPluginEntry(config) {
  const plugins = Array.isArray(config?.plugin) ? config.plugin : [];
  return plugins.some((entry) => {
    if (typeof entry !== "string")
      return false;
    if (entry === PLUGIN_NAME2)
      return true;
    if (entry.startsWith(`${PLUGIN_NAME2}@`))
      return true;
    if (entry.includes("opencode-magic-context"))
      return true;
    return false;
  });
}
function parseHistorianDumpMeta(path2) {
  try {
    const xml = readFileSync4(path2, "utf-8");
    const parsed = parseCompartmentOutput(xml);
    const factCountByCategory = {};
    for (const fact of parsed.facts) {
      factCountByCategory[fact.category] = (factCountByCategory[fact.category] ?? 0) + 1;
    }
    const starts = parsed.compartments.map((c) => c.startMessage);
    const ends = parsed.compartments.map((c) => c.endMessage);
    let gaps = 0;
    let overlaps = 0;
    for (let i = 1;i < parsed.compartments.length; i++) {
      const prev = parsed.compartments[i - 1];
      const curr = parsed.compartments[i];
      if (curr.startMessage > prev.endMessage + 1)
        gaps += 1;
      else if (curr.startMessage <= prev.endMessage)
        overlaps += 1;
    }
    return {
      compartmentCount: parsed.compartments.length,
      minStart: starts.length > 0 ? Math.min(...starts) : null,
      maxEnd: ends.length > 0 ? Math.max(...ends) : null,
      unprocessedFrom: parsed.unprocessedFrom,
      factCountByCategory,
      userObservationCount: parsed.userObservations.length,
      ordinalGapCount: gaps,
      ordinalOverlapCount: overlaps
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}
function collectHistorianDumps() {
  const dir = join7(tmpdir2(), "magic-context-historian");
  if (!existsSync6(dir)) {
    return { dir, count: 0, recent: [] };
  }
  try {
    const entries = readdirSync(dir).filter((name) => name.endsWith(".xml")).map((name) => {
      const stat = statSync(join7(dir, name));
      return {
        name,
        mtime: stat.mtimeMs,
        sizeKb: Math.round(stat.size / 1024)
      };
    }).sort((a, b) => b.mtime - a.mtime);
    const now = Date.now();
    const recent = entries.slice(0, 5).map((entry) => {
      const meta = parseHistorianDumpMeta(join7(dir, entry.name));
      const summary = {
        name: entry.name,
        ageMinutes: Math.round((now - entry.mtime) / 60000),
        sizeKb: entry.sizeKb
      };
      if ("error" in meta) {
        summary.parseError = meta.error;
      } else {
        summary.meta = meta;
      }
      return summary;
    });
    return { dir, count: entries.length, recent };
  } catch {
    return { dir, count: 0, recent: [] };
  }
}
function collectHistorianFailures(storageDirPath) {
  const contextDbPath = join7(storageDirPath, "context.db");
  if (!existsSync6(contextDbPath))
    return [];
  let db = null;
  try {
    db = new Database(contextDbPath, { readonly: true });
    const rows = db.prepare("SELECT session_id, historian_failure_count, historian_last_error, historian_last_failure_at FROM session_meta WHERE historian_failure_count > 0 ORDER BY historian_last_failure_at DESC LIMIT 10").all();
    return rows.map((row) => {
      const sessionId = typeof row.session_id === "string" ? row.session_id : "<unknown>";
      const failureCount = typeof row.historian_failure_count === "number" ? row.historian_failure_count : 0;
      const rawError = typeof row.historian_last_error === "string" ? row.historian_last_error : "";
      const lastAt = typeof row.historian_last_failure_at === "number" ? new Date(row.historian_last_failure_at).toISOString() : "";
      const lastError = sanitizeString(rawError.replace(/\s+/g, " ").trim().slice(0, 400));
      return { sessionId, failureCount, lastError, lastFailureAt: lastAt };
    });
  } catch {
    return [];
  } finally {
    try {
      db?.close();
    } catch {}
  }
}
async function collectDiagnostics() {
  const pluginVersion = getSelfVersion();
  const configPaths = detectConfigPaths();
  const opencodeConfig = readConfig2(configPaths.opencodeConfig);
  const tuiConfig = readConfig2(configPaths.tuiConfig);
  const magicContextConfig = readConfig2(configPaths.magicContextConfig);
  const storageDirPath = getStorageDir();
  const contextDbPath = join7(storageDirPath, "context.db");
  const logPath = join7(tmpdir2(), "magic-context.log");
  const logFileSize = existsSync6(logPath) ? statSync(logPath).size : 0;
  const conflictResult = detectConflicts(process.cwd());
  return {
    timestamp: new Date().toISOString(),
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    pluginVersion,
    opencodeInstalled: isOpenCodeInstalled(),
    opencodeVersion: getOpenCodeVersion(),
    configPaths,
    opencodeConfigHasPlugin: configHasPluginEntry(opencodeConfig.value),
    tuiConfigHasPlugin: configHasPluginEntry(tuiConfig.value),
    magicContextConfig: {
      exists: existsSync6(configPaths.magicContextConfig),
      ...magicContextConfig.error ? { parseError: magicContextConfig.error } : {},
      flags: sanitizeValue(magicContextConfig.value ?? {}) ?? {}
    },
    pluginCache: getPluginCacheInfo(),
    storageDir: {
      path: storageDirPath,
      exists: existsSync6(storageDirPath),
      contextDbSizeBytes: fileSize(contextDbPath)
    },
    conflicts: {
      hasConflict: conflictResult.hasConflict,
      reasons: conflictResult.reasons
    },
    logFile: {
      path: logPath,
      exists: existsSync6(logPath),
      sizeKb: Math.round(logFileSize / 1024)
    },
    historianDumps: collectHistorianDumps(),
    historianFailures: collectHistorianFailures(storageDirPath)
  };
}
function formatBytes(bytes) {
  if (bytes < 1024)
    return `${bytes} B`;
  if (bytes < 1024 * 1024)
    return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
function renderDiagnosticsMarkdown(report) {
  const configPaths = {
    configDir: sanitizeString(report.configPaths.configDir),
    opencodeConfig: sanitizeString(report.configPaths.opencodeConfig),
    opencodeConfigFormat: report.configPaths.opencodeConfigFormat,
    magicContextConfig: sanitizeString(report.configPaths.magicContextConfig),
    tuiConfig: sanitizeString(report.configPaths.tuiConfig),
    tuiConfigFormat: report.configPaths.tuiConfigFormat,
    omoConfig: report.configPaths.omoConfig ? sanitizeString(report.configPaths.omoConfig) : null
  };
  const pluginCache = {
    path: sanitizeString(report.pluginCache.path),
    cached: report.pluginCache.cached ?? null,
    latest: report.pluginCache.latest ?? null
  };
  const storage = {
    path: sanitizeString(report.storageDir.path),
    exists: report.storageDir.exists,
    context_db_size: formatBytes(report.storageDir.contextDbSizeBytes)
  };
  const historianDumps = {
    dir: sanitizeString(report.historianDumps.dir),
    count: report.historianDumps.count,
    recent: report.historianDumps.recent
  };
  return [
    `- Timestamp: ${report.timestamp}`,
    `- Plugin: v${report.pluginVersion}`,
    `- OS: ${report.platform} ${report.arch}`,
    `- Node: ${report.nodeVersion}`,
    `- OpenCode installed: ${report.opencodeInstalled}${report.opencodeVersion ? ` (${report.opencodeVersion})` : ""}`,
    `- Plugin registered in opencode config: ${report.opencodeConfigHasPlugin}`,
    `- Plugin registered in tui config: ${report.tuiConfigHasPlugin}`,
    `- magic-context.jsonc parse error: ${report.magicContextConfig.parseError ?? "none"}`,
    `- Conflicts detected: ${report.conflicts.hasConflict ? report.conflicts.reasons.join("; ") : "none"}`,
    "",
    "### Config paths",
    "```json",
    JSON.stringify(configPaths, null, 2),
    "```",
    "",
    "### magic-context.jsonc flags",
    "```jsonc",
    JSON.stringify(report.magicContextConfig.flags, null, 2),
    "```",
    "",
    "### Plugin cache",
    "```json",
    JSON.stringify(pluginCache, null, 2),
    "```",
    "",
    "### Storage",
    "```json",
    JSON.stringify(storage, null, 2),
    "```",
    "",
    "### Historian dumps",
    "(Metadata only — XML content is not included in this report.)",
    "```json",
    JSON.stringify(historianDumps, null, 2),
    "```",
    "",
    "### Historian failures (session_meta)",
    report.historianFailures.length === 0 ? "_No sessions with historian failures._" : ["```json", JSON.stringify(report.historianFailures, null, 2), "```"].join(`
`),
    "",
    "### Log file",
    `- Path: ${sanitizeString(report.logFile.path)}`,
    `- Exists: ${report.logFile.exists}`,
    `- Size: ${report.logFile.sizeKb} KB`
  ].join(`
`);
}

// src/cli/logs.ts
import { readFileSync as readFileSync5, writeFileSync as writeFileSync3 } from "node:fs";
import { homedir as homedir5, userInfo as userInfo2 } from "node:os";
import { join as join8 } from "node:path";
function escapeRegex2(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function sanitizeLogContent(content) {
  const home = homedir5();
  const username = userInfo2().username;
  let sanitized = content;
  if (home) {
    sanitized = sanitized.replace(new RegExp(escapeRegex2(home), "g"), "~");
  }
  sanitized = sanitized.replace(/\/Users\/[^/]+\//g, "/Users/<USER>/");
  sanitized = sanitized.replace(/\/home\/[^/]+\//g, "/home/<USER>/");
  sanitized = sanitized.replace(/C:\\Users\\[^\\]+\\/g, "C:\\Users\\<USER>\\");
  if (username) {
    sanitized = sanitized.replace(new RegExp(escapeRegex2(username), "g"), "<USER>");
  }
  return sanitized;
}
function formatTimestamp(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return [
    String(date.getFullYear()),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    "-",
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds())
  ].join("");
}
var HISTORIAN_LOG_PATTERNS = [
  /historian failure:/,
  /historian failure recorded:/,
  /historian prompt failed:/,
  /## Historian alert/,
  /historian alert suppressed/,
  /EMERGENCY: aborting session/,
  /historian: prompt attempt \d+ failed:/
];
function isHistorianLogLine(line) {
  return HISTORIAN_LOG_PATTERNS.some((rx) => rx.test(line));
}
function extractHistorianFailureLines(sanitized, limit = 30) {
  const matches = [];
  const lines = sanitized.split(/\r?\n/);
  for (let i = lines.length - 1;i >= 0 && matches.length < limit; i -= 1) {
    if (isHistorianLogLine(lines[i])) {
      matches.push(lines[i]);
    }
  }
  return matches.reverse();
}
async function bundleIssueReport(report, description, _title) {
  const LOG_TAIL_LINES = 400;
  const logLines = report.logFile.exists ? readFileSync5(report.logFile.path, "utf-8").split(/\r?\n/) : [];
  const recentLog = sanitizeLogContent(logLines.slice(-LOG_TAIL_LINES).join(`
`)).trim();
  const historianScanWindow = sanitizeLogContent(logLines.slice(-4000).join(`
`));
  const historianFailureLines = extractHistorianFailureLines(historianScanWindow, 30);
  const configBody = JSON.stringify(report.magicContextConfig.flags, null, 2);
  const sanitizedConfigPath = report.configPaths.magicContextConfig.replace(homedir5(), "~");
  const bodyMarkdown = [
    "## Description",
    description,
    "",
    "## Environment",
    `- Plugin: v${report.pluginVersion}`,
    `- OS: ${report.platform} ${report.arch}`,
    `- Node: ${report.nodeVersion}`,
    `- OpenCode: ${report.opencodeVersion ?? "not installed"}`,
    "",
    "## Configuration",
    `Config from \`${sanitizedConfigPath}\`:`,
    "```jsonc",
    configBody,
    "```",
    "",
    "## Diagnostics",
    renderDiagnosticsMarkdown(report),
    "",
    "## Historian failure signals (log, sanitized)",
    historianFailureLines.length === 0 ? "_No historian failure log lines found in recent history._" : ["```", historianFailureLines.join(`
`), "```"].join(`
`),
    "",
    `## Log (last ${LOG_TAIL_LINES} lines, sanitized)`,
    "```",
    recentLog || "<no log output>",
    "```"
  ].join(`
`);
  const path2 = join8(process.cwd(), `magic-context-issue-${formatTimestamp(new Date)}.md`);
  writeFileSync3(path2, `${bodyMarkdown}
`);
  return { path: path2, bodyMarkdown };
}

// ../../node_modules/.bun/@clack+core@1.1.0/node_modules/@clack/core/dist/index.mjs
var import_sisteransi = __toESM(require_src3(), 1);
import { styleText as D } from "node:util";
import { stdout as R, stdin as q } from "node:process";
import * as k from "node:readline";
import ot from "node:readline";
import { ReadStream as J } from "node:tty";
function x(t, e, s) {
  if (!s.some((u) => !u.disabled))
    return t;
  const i = t + e, r = Math.max(s.length - 1, 0), n = i < 0 ? r : i > r ? 0 : i;
  return s[n].disabled ? x(n, e < 0 ? -1 : 1, s) : n;
}
var at = (t) => t === 161 || t === 164 || t === 167 || t === 168 || t === 170 || t === 173 || t === 174 || t >= 176 && t <= 180 || t >= 182 && t <= 186 || t >= 188 && t <= 191 || t === 198 || t === 208 || t === 215 || t === 216 || t >= 222 && t <= 225 || t === 230 || t >= 232 && t <= 234 || t === 236 || t === 237 || t === 240 || t === 242 || t === 243 || t >= 247 && t <= 250 || t === 252 || t === 254 || t === 257 || t === 273 || t === 275 || t === 283 || t === 294 || t === 295 || t === 299 || t >= 305 && t <= 307 || t === 312 || t >= 319 && t <= 322 || t === 324 || t >= 328 && t <= 331 || t === 333 || t === 338 || t === 339 || t === 358 || t === 359 || t === 363 || t === 462 || t === 464 || t === 466 || t === 468 || t === 470 || t === 472 || t === 474 || t === 476 || t === 593 || t === 609 || t === 708 || t === 711 || t >= 713 && t <= 715 || t === 717 || t === 720 || t >= 728 && t <= 731 || t === 733 || t === 735 || t >= 768 && t <= 879 || t >= 913 && t <= 929 || t >= 931 && t <= 937 || t >= 945 && t <= 961 || t >= 963 && t <= 969 || t === 1025 || t >= 1040 && t <= 1103 || t === 1105 || t === 8208 || t >= 8211 && t <= 8214 || t === 8216 || t === 8217 || t === 8220 || t === 8221 || t >= 8224 && t <= 8226 || t >= 8228 && t <= 8231 || t === 8240 || t === 8242 || t === 8243 || t === 8245 || t === 8251 || t === 8254 || t === 8308 || t === 8319 || t >= 8321 && t <= 8324 || t === 8364 || t === 8451 || t === 8453 || t === 8457 || t === 8467 || t === 8470 || t === 8481 || t === 8482 || t === 8486 || t === 8491 || t === 8531 || t === 8532 || t >= 8539 && t <= 8542 || t >= 8544 && t <= 8555 || t >= 8560 && t <= 8569 || t === 8585 || t >= 8592 && t <= 8601 || t === 8632 || t === 8633 || t === 8658 || t === 8660 || t === 8679 || t === 8704 || t === 8706 || t === 8707 || t === 8711 || t === 8712 || t === 8715 || t === 8719 || t === 8721 || t === 8725 || t === 8730 || t >= 8733 && t <= 8736 || t === 8739 || t === 8741 || t >= 8743 && t <= 8748 || t === 8750 || t >= 8756 && t <= 8759 || t === 8764 || t === 8765 || t === 8776 || t === 8780 || t === 8786 || t === 8800 || t === 8801 || t >= 8804 && t <= 8807 || t === 8810 || t === 8811 || t === 8814 || t === 8815 || t === 8834 || t === 8835 || t === 8838 || t === 8839 || t === 8853 || t === 8857 || t === 8869 || t === 8895 || t === 8978 || t >= 9312 && t <= 9449 || t >= 9451 && t <= 9547 || t >= 9552 && t <= 9587 || t >= 9600 && t <= 9615 || t >= 9618 && t <= 9621 || t === 9632 || t === 9633 || t >= 9635 && t <= 9641 || t === 9650 || t === 9651 || t === 9654 || t === 9655 || t === 9660 || t === 9661 || t === 9664 || t === 9665 || t >= 9670 && t <= 9672 || t === 9675 || t >= 9678 && t <= 9681 || t >= 9698 && t <= 9701 || t === 9711 || t === 9733 || t === 9734 || t === 9737 || t === 9742 || t === 9743 || t === 9756 || t === 9758 || t === 9792 || t === 9794 || t === 9824 || t === 9825 || t >= 9827 && t <= 9829 || t >= 9831 && t <= 9834 || t === 9836 || t === 9837 || t === 9839 || t === 9886 || t === 9887 || t === 9919 || t >= 9926 && t <= 9933 || t >= 9935 && t <= 9939 || t >= 9941 && t <= 9953 || t === 9955 || t === 9960 || t === 9961 || t >= 9963 && t <= 9969 || t === 9972 || t >= 9974 && t <= 9977 || t === 9979 || t === 9980 || t === 9982 || t === 9983 || t === 10045 || t >= 10102 && t <= 10111 || t >= 11094 && t <= 11097 || t >= 12872 && t <= 12879 || t >= 57344 && t <= 63743 || t >= 65024 && t <= 65039 || t === 65533 || t >= 127232 && t <= 127242 || t >= 127248 && t <= 127277 || t >= 127280 && t <= 127337 || t >= 127344 && t <= 127373 || t === 127375 || t === 127376 || t >= 127387 && t <= 127404 || t >= 917760 && t <= 917999 || t >= 983040 && t <= 1048573 || t >= 1048576 && t <= 1114109;
var lt = (t) => t === 12288 || t >= 65281 && t <= 65376 || t >= 65504 && t <= 65510;
var ht = (t) => t >= 4352 && t <= 4447 || t === 8986 || t === 8987 || t === 9001 || t === 9002 || t >= 9193 && t <= 9196 || t === 9200 || t === 9203 || t === 9725 || t === 9726 || t === 9748 || t === 9749 || t >= 9800 && t <= 9811 || t === 9855 || t === 9875 || t === 9889 || t === 9898 || t === 9899 || t === 9917 || t === 9918 || t === 9924 || t === 9925 || t === 9934 || t === 9940 || t === 9962 || t === 9970 || t === 9971 || t === 9973 || t === 9978 || t === 9981 || t === 9989 || t === 9994 || t === 9995 || t === 10024 || t === 10060 || t === 10062 || t >= 10067 && t <= 10069 || t === 10071 || t >= 10133 && t <= 10135 || t === 10160 || t === 10175 || t === 11035 || t === 11036 || t === 11088 || t === 11093 || t >= 11904 && t <= 11929 || t >= 11931 && t <= 12019 || t >= 12032 && t <= 12245 || t >= 12272 && t <= 12287 || t >= 12289 && t <= 12350 || t >= 12353 && t <= 12438 || t >= 12441 && t <= 12543 || t >= 12549 && t <= 12591 || t >= 12593 && t <= 12686 || t >= 12688 && t <= 12771 || t >= 12783 && t <= 12830 || t >= 12832 && t <= 12871 || t >= 12880 && t <= 19903 || t >= 19968 && t <= 42124 || t >= 42128 && t <= 42182 || t >= 43360 && t <= 43388 || t >= 44032 && t <= 55203 || t >= 63744 && t <= 64255 || t >= 65040 && t <= 65049 || t >= 65072 && t <= 65106 || t >= 65108 && t <= 65126 || t >= 65128 && t <= 65131 || t >= 94176 && t <= 94180 || t === 94192 || t === 94193 || t >= 94208 && t <= 100343 || t >= 100352 && t <= 101589 || t >= 101632 && t <= 101640 || t >= 110576 && t <= 110579 || t >= 110581 && t <= 110587 || t === 110589 || t === 110590 || t >= 110592 && t <= 110882 || t === 110898 || t >= 110928 && t <= 110930 || t === 110933 || t >= 110948 && t <= 110951 || t >= 110960 && t <= 111355 || t === 126980 || t === 127183 || t === 127374 || t >= 127377 && t <= 127386 || t >= 127488 && t <= 127490 || t >= 127504 && t <= 127547 || t >= 127552 && t <= 127560 || t === 127568 || t === 127569 || t >= 127584 && t <= 127589 || t >= 127744 && t <= 127776 || t >= 127789 && t <= 127797 || t >= 127799 && t <= 127868 || t >= 127870 && t <= 127891 || t >= 127904 && t <= 127946 || t >= 127951 && t <= 127955 || t >= 127968 && t <= 127984 || t === 127988 || t >= 127992 && t <= 128062 || t === 128064 || t >= 128066 && t <= 128252 || t >= 128255 && t <= 128317 || t >= 128331 && t <= 128334 || t >= 128336 && t <= 128359 || t === 128378 || t === 128405 || t === 128406 || t === 128420 || t >= 128507 && t <= 128591 || t >= 128640 && t <= 128709 || t === 128716 || t >= 128720 && t <= 128722 || t >= 128725 && t <= 128727 || t >= 128732 && t <= 128735 || t === 128747 || t === 128748 || t >= 128756 && t <= 128764 || t >= 128992 && t <= 129003 || t === 129008 || t >= 129292 && t <= 129338 || t >= 129340 && t <= 129349 || t >= 129351 && t <= 129535 || t >= 129648 && t <= 129660 || t >= 129664 && t <= 129672 || t >= 129680 && t <= 129725 || t >= 129727 && t <= 129733 || t >= 129742 && t <= 129755 || t >= 129760 && t <= 129768 || t >= 129776 && t <= 129784 || t >= 131072 && t <= 196605 || t >= 196608 && t <= 262141;
var O = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/y;
var y = /[\x00-\x08\x0A-\x1F\x7F-\x9F]{1,1000}/y;
var L = /\t{1,1000}/y;
var P = /[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]{2}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,3}\u{E007F}|(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation})(?:\u200D(?:\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F\u20E3?))*/yu;
var M = /(?:[\x20-\x7E\xA0-\xFF](?!\uFE0F)){1,1000}/y;
var ct = /\p{M}+/gu;
var ft = { limit: 1 / 0, ellipsis: "" };
var X = (t, e = {}, s = {}) => {
  const i = e.limit ?? 1 / 0, r = e.ellipsis ?? "", n = e?.ellipsisWidth ?? (r ? X(r, ft, s).width : 0), u = s.ansiWidth ?? 0, a = s.controlWidth ?? 0, l = s.tabWidth ?? 8, E = s.ambiguousWidth ?? 1, g = s.emojiWidth ?? 2, m = s.fullWidthWidth ?? 2, A = s.regularWidth ?? 1, V = s.wideWidth ?? 2;
  let h = 0, o = 0, p = t.length, v = 0, F = false, d = p, b = Math.max(0, i - n), C = 0, w = 0, c = 0, f = 0;
  t:
    for (;; ) {
      if (w > C || o >= p && o > h) {
        const ut = t.slice(C, w) || t.slice(h, o);
        v = 0;
        for (const Y of ut.replaceAll(ct, "")) {
          const $ = Y.codePointAt(0) || 0;
          if (lt($) ? f = m : ht($) ? f = V : E !== A && at($) ? f = E : f = A, c + f > b && (d = Math.min(d, Math.max(C, h) + v)), c + f > i) {
            F = true;
            break t;
          }
          v += Y.length, c += f;
        }
        C = w = 0;
      }
      if (o >= p)
        break;
      if (M.lastIndex = o, M.test(t)) {
        if (v = M.lastIndex - o, f = v * A, c + f > b && (d = Math.min(d, o + Math.floor((b - c) / A))), c + f > i) {
          F = true;
          break;
        }
        c += f, C = h, w = o, o = h = M.lastIndex;
        continue;
      }
      if (O.lastIndex = o, O.test(t)) {
        if (c + u > b && (d = Math.min(d, o)), c + u > i) {
          F = true;
          break;
        }
        c += u, C = h, w = o, o = h = O.lastIndex;
        continue;
      }
      if (y.lastIndex = o, y.test(t)) {
        if (v = y.lastIndex - o, f = v * a, c + f > b && (d = Math.min(d, o + Math.floor((b - c) / a))), c + f > i) {
          F = true;
          break;
        }
        c += f, C = h, w = o, o = h = y.lastIndex;
        continue;
      }
      if (L.lastIndex = o, L.test(t)) {
        if (v = L.lastIndex - o, f = v * l, c + f > b && (d = Math.min(d, o + Math.floor((b - c) / l))), c + f > i) {
          F = true;
          break;
        }
        c += f, C = h, w = o, o = h = L.lastIndex;
        continue;
      }
      if (P.lastIndex = o, P.test(t)) {
        if (c + g > b && (d = Math.min(d, o)), c + g > i) {
          F = true;
          break;
        }
        c += g, C = h, w = o, o = h = P.lastIndex;
        continue;
      }
      o += 1;
    }
  return { width: F ? b : c, index: F ? d : p, truncated: F, ellipsed: F && i >= n };
};
var pt = { limit: 1 / 0, ellipsis: "", ellipsisWidth: 0 };
var S = (t, e = {}) => X(t, pt, e).width;
var T = "\x1B";
var Z = "";
var Ft = 39;
var j = "\x07";
var Q = "[";
var dt = "]";
var tt = "m";
var U = `${dt}8;;`;
var et = new RegExp(`(?:\\${Q}(?<code>\\d+)m|\\${U}(?<uri>.*)${j})`, "y");
var mt = (t) => {
  if (t >= 30 && t <= 37 || t >= 90 && t <= 97)
    return 39;
  if (t >= 40 && t <= 47 || t >= 100 && t <= 107)
    return 49;
  if (t === 1 || t === 2)
    return 22;
  if (t === 3)
    return 23;
  if (t === 4)
    return 24;
  if (t === 7)
    return 27;
  if (t === 8)
    return 28;
  if (t === 9)
    return 29;
  if (t === 0)
    return 0;
};
var st = (t) => `${T}${Q}${t}${tt}`;
var it = (t) => `${T}${U}${t}${j}`;
var gt = (t) => t.map((e) => S(e));
var G = (t, e, s) => {
  const i = e[Symbol.iterator]();
  let r = false, n = false, u = t.at(-1), a = u === undefined ? 0 : S(u), l = i.next(), E = i.next(), g = 0;
  for (;!l.done; ) {
    const m = l.value, A = S(m);
    a + A <= s ? t[t.length - 1] += m : (t.push(m), a = 0), (m === T || m === Z) && (r = true, n = e.startsWith(U, g + 1)), r ? n ? m === j && (r = false, n = false) : m === tt && (r = false) : (a += A, a === s && !E.done && (t.push(""), a = 0)), l = E, E = i.next(), g += m.length;
  }
  u = t.at(-1), !a && u !== undefined && u.length > 0 && t.length > 1 && (t[t.length - 2] += t.pop());
};
var vt = (t) => {
  const e = t.split(" ");
  let s = e.length;
  for (;s > 0 && !(S(e[s - 1]) > 0); )
    s--;
  return s === e.length ? t : e.slice(0, s).join(" ") + e.slice(s).join("");
};
var Et = (t, e, s = {}) => {
  if (s.trim !== false && t.trim() === "")
    return "";
  let i = "", r, n;
  const u = t.split(" "), a = gt(u);
  let l = [""];
  for (const [h, o] of u.entries()) {
    s.trim !== false && (l[l.length - 1] = (l.at(-1) ?? "").trimStart());
    let p = S(l.at(-1) ?? "");
    if (h !== 0 && (p >= e && (s.wordWrap === false || s.trim === false) && (l.push(""), p = 0), (p > 0 || s.trim === false) && (l[l.length - 1] += " ", p++)), s.hard && a[h] > e) {
      const v = e - p, F = 1 + Math.floor((a[h] - v - 1) / e);
      Math.floor((a[h] - 1) / e) < F && l.push(""), G(l, o, e);
      continue;
    }
    if (p + a[h] > e && p > 0 && a[h] > 0) {
      if (s.wordWrap === false && p < e) {
        G(l, o, e);
        continue;
      }
      l.push("");
    }
    if (p + a[h] > e && s.wordWrap === false) {
      G(l, o, e);
      continue;
    }
    l[l.length - 1] += o;
  }
  s.trim !== false && (l = l.map((h) => vt(h)));
  const E = l.join(`
`), g = E[Symbol.iterator]();
  let m = g.next(), A = g.next(), V = 0;
  for (;!m.done; ) {
    const h = m.value, o = A.value;
    if (i += h, h === T || h === Z) {
      et.lastIndex = V + 1;
      const F = et.exec(E)?.groups;
      if (F?.code !== undefined) {
        const d = Number.parseFloat(F.code);
        r = d === Ft ? undefined : d;
      } else
        F?.uri !== undefined && (n = F.uri.length === 0 ? undefined : F.uri);
    }
    const p = r ? mt(r) : undefined;
    o === `
` ? (n && (i += it("")), r && p && (i += st(p))) : h === `
` && (r && p && (i += st(r)), n && (i += it(n))), V += h.length, m = A, A = g.next();
  }
  return i;
};
function K(t, e, s) {
  return String(t).normalize().replaceAll(`\r
`, `
`).split(`
`).map((i) => Et(i, e, s)).join(`
`);
}
var At = ["up", "down", "left", "right", "space", "enter", "cancel"];
var _ = { actions: new Set(At), aliases: new Map([["k", "up"], ["j", "down"], ["h", "left"], ["l", "right"], ["\x03", "cancel"], ["escape", "cancel"]]), messages: { cancel: "Canceled", error: "Something went wrong" }, withGuide: true };
function H(t, e) {
  if (typeof t == "string")
    return _.aliases.get(t) === e;
  for (const s of t)
    if (s !== undefined && H(s, e))
      return true;
  return false;
}
function _t(t, e) {
  if (t === e)
    return;
  const s = t.split(`
`), i = e.split(`
`), r = Math.max(s.length, i.length), n = [];
  for (let u = 0;u < r; u++)
    s[u] !== i[u] && n.push(u);
  return { lines: n, numLinesBefore: s.length, numLinesAfter: i.length, numLines: r };
}
var bt = globalThis.process.platform.startsWith("win");
var z = Symbol("clack:cancel");
function Ct(t) {
  return t === z;
}
function W(t, e) {
  const s = t;
  s.isTTY && s.setRawMode(e);
}
function xt({ input: t = q, output: e = R, overwrite: s = true, hideCursor: i = true } = {}) {
  const r = k.createInterface({ input: t, output: e, prompt: "", tabSize: 1 });
  k.emitKeypressEvents(t, r), t instanceof J && t.isTTY && t.setRawMode(true);
  const n = (u, { name: a, sequence: l }) => {
    const E = String(u);
    if (H([E, a, l], "cancel")) {
      i && e.write(import_sisteransi.cursor.show), process.exit(0);
      return;
    }
    if (!s)
      return;
    const g = a === "return" ? 0 : -1, m = a === "return" ? -1 : 0;
    k.moveCursor(e, g, m, () => {
      k.clearLine(e, 1, () => {
        t.once("keypress", n);
      });
    });
  };
  return i && e.write(import_sisteransi.cursor.hide), t.once("keypress", n), () => {
    t.off("keypress", n), i && e.write(import_sisteransi.cursor.show), t instanceof J && t.isTTY && !bt && t.setRawMode(false), r.terminal = false, r.close();
  };
}
var rt = (t) => ("columns" in t) && typeof t.columns == "number" ? t.columns : 80;
var nt = (t) => ("rows" in t) && typeof t.rows == "number" ? t.rows : 20;
function Bt(t, e, s, i = s) {
  const r = rt(t ?? R);
  return K(e, r - s.length, { hard: true, trim: false }).split(`
`).map((n, u) => `${u === 0 ? i : s}${n}`).join(`
`);
}

class B {
  input;
  output;
  _abortSignal;
  rl;
  opts;
  _render;
  _track = false;
  _prevFrame = "";
  _subscribers = new Map;
  _cursor = 0;
  state = "initial";
  error = "";
  value;
  userInput = "";
  constructor(e, s = true) {
    const { input: i = q, output: r = R, render: n, signal: u, ...a } = e;
    this.opts = a, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = n.bind(this), this._track = s, this._abortSignal = u, this.input = i, this.output = r;
  }
  unsubscribe() {
    this._subscribers.clear();
  }
  setSubscriber(e, s) {
    const i = this._subscribers.get(e) ?? [];
    i.push(s), this._subscribers.set(e, i);
  }
  on(e, s) {
    this.setSubscriber(e, { cb: s });
  }
  once(e, s) {
    this.setSubscriber(e, { cb: s, once: true });
  }
  emit(e, ...s) {
    const i = this._subscribers.get(e) ?? [], r = [];
    for (const n of i)
      n.cb(...s), n.once && r.push(() => i.splice(i.indexOf(n), 1));
    for (const n of r)
      n();
  }
  prompt() {
    return new Promise((e) => {
      if (this._abortSignal) {
        if (this._abortSignal.aborted)
          return this.state = "cancel", this.close(), e(z);
        this._abortSignal.addEventListener("abort", () => {
          this.state = "cancel", this.close();
        }, { once: true });
      }
      this.rl = ot.createInterface({ input: this.input, tabSize: 2, prompt: "", escapeCodeTimeout: 50, terminal: true }), this.rl.prompt(), this.opts.initialUserInput !== undefined && this._setUserInput(this.opts.initialUserInput, true), this.input.on("keypress", this.onKeypress), W(this.input, true), this.output.on("resize", this.render), this.render(), this.once("submit", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), W(this.input, false), e(this.value);
      }), this.once("cancel", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), W(this.input, false), e(z);
      });
    });
  }
  _isActionKey(e, s) {
    return e === "\t";
  }
  _setValue(e) {
    this.value = e, this.emit("value", this.value);
  }
  _setUserInput(e, s) {
    this.userInput = e ?? "", this.emit("userInput", this.userInput), s && this._track && this.rl && (this.rl.write(this.userInput), this._cursor = this.rl.cursor);
  }
  _clearUserInput() {
    this.rl?.write(null, { ctrl: true, name: "u" }), this._setUserInput("");
  }
  onKeypress(e, s) {
    if (this._track && s.name !== "return" && (s.name && this._isActionKey(e, s) && this.rl?.write(null, { ctrl: true, name: "h" }), this._cursor = this.rl?.cursor ?? 0, this._setUserInput(this.rl?.line)), this.state === "error" && (this.state = "active"), s?.name && (!this._track && _.aliases.has(s.name) && this.emit("cursor", _.aliases.get(s.name)), _.actions.has(s.name) && this.emit("cursor", s.name)), e && (e.toLowerCase() === "y" || e.toLowerCase() === "n") && this.emit("confirm", e.toLowerCase() === "y"), this.emit("key", e?.toLowerCase(), s), s?.name === "return") {
      if (this.opts.validate) {
        const i = this.opts.validate(this.value);
        i && (this.error = i instanceof Error ? i.message : i, this.state = "error", this.rl?.write(this.userInput));
      }
      this.state !== "error" && (this.state = "submit");
    }
    H([e, s?.name, s?.sequence], "cancel") && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
  }
  close() {
    this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), W(this.input, false), this.rl?.close(), this.rl = undefined, this.emit(`${this.state}`, this.value), this.unsubscribe();
  }
  restoreCursor() {
    const e = K(this._prevFrame, process.stdout.columns, { hard: true, trim: false }).split(`
`).length - 1;
    this.output.write(import_sisteransi.cursor.move(-999, e * -1));
  }
  render() {
    const e = K(this._render(this) ?? "", process.stdout.columns, { hard: true, trim: false });
    if (e !== this._prevFrame) {
      if (this.state === "initial")
        this.output.write(import_sisteransi.cursor.hide);
      else {
        const s = _t(this._prevFrame, e), i = nt(this.output);
        if (this.restoreCursor(), s) {
          const r = Math.max(0, s.numLinesAfter - i), n = Math.max(0, s.numLinesBefore - i);
          let u = s.lines.find((a) => a >= r);
          if (u === undefined) {
            this._prevFrame = e;
            return;
          }
          if (s.lines.length === 1) {
            this.output.write(import_sisteransi.cursor.move(0, u - n)), this.output.write(import_sisteransi.erase.lines(1));
            const a = e.split(`
`);
            this.output.write(a[u]), this._prevFrame = e, this.output.write(import_sisteransi.cursor.move(0, a.length - u - 1));
            return;
          } else if (s.lines.length > 1) {
            if (r < n)
              u = r;
            else {
              const l = u - n;
              l > 0 && this.output.write(import_sisteransi.cursor.move(0, l));
            }
            this.output.write(import_sisteransi.erase.down());
            const a = e.split(`
`).slice(u);
            this.output.write(a.join(`
`)), this._prevFrame = e;
            return;
          }
        }
        this.output.write(import_sisteransi.erase.down());
      }
      this.output.write(e), this.state === "initial" && (this.state = "active"), this._prevFrame = e;
    }
  }
}
function wt(t, e) {
  if (t === undefined || e.length === 0)
    return 0;
  const s = e.findIndex((i) => i.value === t);
  return s !== -1 ? s : 0;
}
function Dt(t, e) {
  return (e.label ?? String(e.value)).toLowerCase().includes(t.toLowerCase());
}
function St(t, e) {
  if (e)
    return t ? e : e[0];
}

class Vt extends B {
  filteredOptions;
  multiple;
  isNavigating = false;
  selectedValues = [];
  focusedValue;
  #t = 0;
  #s = "";
  #i;
  #e;
  get cursor() {
    return this.#t;
  }
  get userInputWithCursor() {
    if (!this.userInput)
      return D(["inverse", "hidden"], "_");
    if (this._cursor >= this.userInput.length)
      return `${this.userInput}█`;
    const e = this.userInput.slice(0, this._cursor), [s, ...i] = this.userInput.slice(this._cursor);
    return `${e}${D("inverse", s)}${i.join("")}`;
  }
  get options() {
    return typeof this.#e == "function" ? this.#e() : this.#e;
  }
  constructor(e) {
    super(e), this.#e = e.options;
    const s = this.options;
    this.filteredOptions = [...s], this.multiple = e.multiple === true, this.#i = e.filter ?? Dt;
    let i;
    if (e.initialValue && Array.isArray(e.initialValue) ? this.multiple ? i = e.initialValue : i = e.initialValue.slice(0, 1) : !this.multiple && this.options.length > 0 && (i = [this.options[0].value]), i)
      for (const r of i) {
        const n = s.findIndex((u) => u.value === r);
        n !== -1 && (this.toggleSelected(r), this.#t = n);
      }
    this.focusedValue = this.options[this.#t]?.value, this.on("key", (r, n) => this.#r(r, n)), this.on("userInput", (r) => this.#n(r));
  }
  _isActionKey(e, s) {
    return e === "\t" || this.multiple && this.isNavigating && s.name === "space" && e !== undefined && e !== "";
  }
  #r(e, s) {
    const i = s.name === "up", r = s.name === "down", n = s.name === "return";
    i || r ? (this.#t = x(this.#t, i ? -1 : 1, this.filteredOptions), this.focusedValue = this.filteredOptions[this.#t]?.value, this.multiple || (this.selectedValues = [this.focusedValue]), this.isNavigating = true) : n ? this.value = St(this.multiple, this.selectedValues) : this.multiple ? this.focusedValue !== undefined && (s.name === "tab" || this.isNavigating && s.name === "space") ? this.toggleSelected(this.focusedValue) : this.isNavigating = false : (this.focusedValue && (this.selectedValues = [this.focusedValue]), this.isNavigating = false);
  }
  deselectAll() {
    this.selectedValues = [];
  }
  toggleSelected(e) {
    this.filteredOptions.length !== 0 && (this.multiple ? this.selectedValues.includes(e) ? this.selectedValues = this.selectedValues.filter((s) => s !== e) : this.selectedValues = [...this.selectedValues, e] : this.selectedValues = [e]);
  }
  #n(e) {
    if (e !== this.#s) {
      this.#s = e;
      const s = this.options;
      e ? this.filteredOptions = s.filter((n) => this.#i(e, n)) : this.filteredOptions = [...s];
      const i = wt(this.focusedValue, this.filteredOptions);
      this.#t = x(i, 0, this.filteredOptions);
      const r = this.filteredOptions[this.#t];
      r && !r.disabled ? this.focusedValue = r.value : this.focusedValue = undefined, this.multiple || (this.focusedValue !== undefined ? this.toggleSelected(this.focusedValue) : this.deselectAll());
    }
  }
}

class kt extends B {
  get cursor() {
    return this.value ? 0 : 1;
  }
  get _value() {
    return this.cursor === 0;
  }
  constructor(e) {
    super(e, false), this.value = !!e.initialValue, this.on("userInput", () => {
      this.value = this._value;
    }), this.on("confirm", (s) => {
      this.output.write(import_sisteransi.cursor.move(0, -1)), this.value = s, this.state = "submit", this.close();
    }), this.on("cursor", () => {
      this.value = !this.value;
    });
  }
}

class yt extends B {
  options;
  cursor = 0;
  #t;
  getGroupItems(e) {
    return this.options.filter((s) => s.group === e);
  }
  isGroupSelected(e) {
    const s = this.getGroupItems(e), i = this.value;
    return i === undefined ? false : s.every((r) => i.includes(r.value));
  }
  toggleValue() {
    const e = this.options[this.cursor];
    if (this.value === undefined && (this.value = []), e.group === true) {
      const s = e.value, i = this.getGroupItems(s);
      this.isGroupSelected(s) ? this.value = this.value.filter((r) => i.findIndex((n) => n.value === r) === -1) : this.value = [...this.value, ...i.map((r) => r.value)], this.value = Array.from(new Set(this.value));
    } else {
      const s = this.value.includes(e.value);
      this.value = s ? this.value.filter((i) => i !== e.value) : [...this.value, e.value];
    }
  }
  constructor(e) {
    super(e, false);
    const { options: s } = e;
    this.#t = e.selectableGroups !== false, this.options = Object.entries(s).flatMap(([i, r]) => [{ value: i, group: true, label: i }, ...r.map((n) => ({ ...n, group: i }))]), this.value = [...e.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: i }) => i === e.cursorAt), this.#t ? 0 : 1), this.on("cursor", (i) => {
      switch (i) {
        case "left":
        case "up": {
          this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
          const r = this.options[this.cursor]?.group === true;
          !this.#t && r && (this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1);
          break;
        }
        case "down":
        case "right": {
          this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
          const r = this.options[this.cursor]?.group === true;
          !this.#t && r && (this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1);
          break;
        }
        case "space":
          this.toggleValue();
          break;
      }
    });
  }
}
class Tt extends B {
  options;
  cursor = 0;
  get _selectedValue() {
    return this.options[this.cursor];
  }
  changeValue() {
    this.value = this._selectedValue.value;
  }
  constructor(e) {
    super(e, false), this.options = e.options;
    const s = this.options.findIndex(({ value: r }) => r === e.initialValue), i = s === -1 ? 0 : s;
    this.cursor = this.options[i].disabled ? x(i, 1, this.options) : i, this.changeValue(), this.on("cursor", (r) => {
      switch (r) {
        case "left":
        case "up":
          this.cursor = x(this.cursor, -1, this.options);
          break;
        case "down":
        case "right":
          this.cursor = x(this.cursor, 1, this.options);
          break;
      }
      this.changeValue();
    });
  }
}
class $t extends B {
  get userInputWithCursor() {
    if (this.state === "submit")
      return this.userInput;
    const e = this.userInput;
    if (this.cursor >= e.length)
      return `${this.userInput}█`;
    const s = e.slice(0, this.cursor), [i, ...r] = e.slice(this.cursor);
    return `${s}${D("inverse", i)}${r.join("")}`;
  }
  get cursor() {
    return this._cursor;
  }
  constructor(e) {
    super({ ...e, initialUserInput: e.initialUserInput ?? e.initialValue }), this.on("userInput", (s) => {
      this._setValue(s);
    }), this.on("finalize", () => {
      this.value || (this.value = e.defaultValue), this.value === undefined && (this.value = "");
    });
  }
}

// ../../node_modules/.bun/@clack+prompts@1.1.0/node_modules/@clack/prompts/dist/index.mjs
import { styleText as t, stripVTControlCharacters as ue } from "node:util";
import N2 from "node:process";
var import_sisteransi2 = __toESM(require_src3(), 1);
function pt2() {
  return N2.platform !== "win32" ? N2.env.TERM !== "linux" : !!N2.env.CI || !!N2.env.WT_SESSION || !!N2.env.TERMINUS_SUBLIME || N2.env.ConEmuTask === "{cmd::Cmder}" || N2.env.TERM_PROGRAM === "Terminus-Sublime" || N2.env.TERM_PROGRAM === "vscode" || N2.env.TERM === "xterm-256color" || N2.env.TERM === "alacritty" || N2.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var ee = pt2();
var ce = () => process.env.CI === "true";
var I2 = (e, r) => ee ? e : r;
var Re = I2("◆", "*");
var $e = I2("■", "x");
var de = I2("▲", "x");
var V = I2("◇", "o");
var he = I2("┌", "T");
var h = I2("│", "|");
var x2 = I2("└", "—");
var Oe = I2("┐", "T");
var Pe = I2("┘", "—");
var z2 = I2("●", ">");
var H2 = I2("○", " ");
var te = I2("◻", "[•]");
var U2 = I2("◼", "[+]");
var q2 = I2("◻", "[ ]");
var Ne = I2("▪", "•");
var se = I2("─", "-");
var pe = I2("╮", "+");
var We = I2("├", "+");
var me = I2("╯", "+");
var ge = I2("╰", "+");
var Ge = I2("╭", "+");
var fe = I2("●", "•");
var Fe = I2("◆", "*");
var ye = I2("▲", "!");
var Ee = I2("■", "x");
var W2 = (e) => {
  switch (e) {
    case "initial":
    case "active":
      return t("cyan", Re);
    case "cancel":
      return t("red", $e);
    case "error":
      return t("yellow", de);
    case "submit":
      return t("green", V);
  }
};
var ve = (e) => {
  switch (e) {
    case "initial":
    case "active":
      return t("cyan", h);
    case "cancel":
      return t("red", h);
    case "error":
      return t("yellow", h);
    case "submit":
      return t("green", h);
  }
};
var mt2 = (e) => e === 161 || e === 164 || e === 167 || e === 168 || e === 170 || e === 173 || e === 174 || e >= 176 && e <= 180 || e >= 182 && e <= 186 || e >= 188 && e <= 191 || e === 198 || e === 208 || e === 215 || e === 216 || e >= 222 && e <= 225 || e === 230 || e >= 232 && e <= 234 || e === 236 || e === 237 || e === 240 || e === 242 || e === 243 || e >= 247 && e <= 250 || e === 252 || e === 254 || e === 257 || e === 273 || e === 275 || e === 283 || e === 294 || e === 295 || e === 299 || e >= 305 && e <= 307 || e === 312 || e >= 319 && e <= 322 || e === 324 || e >= 328 && e <= 331 || e === 333 || e === 338 || e === 339 || e === 358 || e === 359 || e === 363 || e === 462 || e === 464 || e === 466 || e === 468 || e === 470 || e === 472 || e === 474 || e === 476 || e === 593 || e === 609 || e === 708 || e === 711 || e >= 713 && e <= 715 || e === 717 || e === 720 || e >= 728 && e <= 731 || e === 733 || e === 735 || e >= 768 && e <= 879 || e >= 913 && e <= 929 || e >= 931 && e <= 937 || e >= 945 && e <= 961 || e >= 963 && e <= 969 || e === 1025 || e >= 1040 && e <= 1103 || e === 1105 || e === 8208 || e >= 8211 && e <= 8214 || e === 8216 || e === 8217 || e === 8220 || e === 8221 || e >= 8224 && e <= 8226 || e >= 8228 && e <= 8231 || e === 8240 || e === 8242 || e === 8243 || e === 8245 || e === 8251 || e === 8254 || e === 8308 || e === 8319 || e >= 8321 && e <= 8324 || e === 8364 || e === 8451 || e === 8453 || e === 8457 || e === 8467 || e === 8470 || e === 8481 || e === 8482 || e === 8486 || e === 8491 || e === 8531 || e === 8532 || e >= 8539 && e <= 8542 || e >= 8544 && e <= 8555 || e >= 8560 && e <= 8569 || e === 8585 || e >= 8592 && e <= 8601 || e === 8632 || e === 8633 || e === 8658 || e === 8660 || e === 8679 || e === 8704 || e === 8706 || e === 8707 || e === 8711 || e === 8712 || e === 8715 || e === 8719 || e === 8721 || e === 8725 || e === 8730 || e >= 8733 && e <= 8736 || e === 8739 || e === 8741 || e >= 8743 && e <= 8748 || e === 8750 || e >= 8756 && e <= 8759 || e === 8764 || e === 8765 || e === 8776 || e === 8780 || e === 8786 || e === 8800 || e === 8801 || e >= 8804 && e <= 8807 || e === 8810 || e === 8811 || e === 8814 || e === 8815 || e === 8834 || e === 8835 || e === 8838 || e === 8839 || e === 8853 || e === 8857 || e === 8869 || e === 8895 || e === 8978 || e >= 9312 && e <= 9449 || e >= 9451 && e <= 9547 || e >= 9552 && e <= 9587 || e >= 9600 && e <= 9615 || e >= 9618 && e <= 9621 || e === 9632 || e === 9633 || e >= 9635 && e <= 9641 || e === 9650 || e === 9651 || e === 9654 || e === 9655 || e === 9660 || e === 9661 || e === 9664 || e === 9665 || e >= 9670 && e <= 9672 || e === 9675 || e >= 9678 && e <= 9681 || e >= 9698 && e <= 9701 || e === 9711 || e === 9733 || e === 9734 || e === 9737 || e === 9742 || e === 9743 || e === 9756 || e === 9758 || e === 9792 || e === 9794 || e === 9824 || e === 9825 || e >= 9827 && e <= 9829 || e >= 9831 && e <= 9834 || e === 9836 || e === 9837 || e === 9839 || e === 9886 || e === 9887 || e === 9919 || e >= 9926 && e <= 9933 || e >= 9935 && e <= 9939 || e >= 9941 && e <= 9953 || e === 9955 || e === 9960 || e === 9961 || e >= 9963 && e <= 9969 || e === 9972 || e >= 9974 && e <= 9977 || e === 9979 || e === 9980 || e === 9982 || e === 9983 || e === 10045 || e >= 10102 && e <= 10111 || e >= 11094 && e <= 11097 || e >= 12872 && e <= 12879 || e >= 57344 && e <= 63743 || e >= 65024 && e <= 65039 || e === 65533 || e >= 127232 && e <= 127242 || e >= 127248 && e <= 127277 || e >= 127280 && e <= 127337 || e >= 127344 && e <= 127373 || e === 127375 || e === 127376 || e >= 127387 && e <= 127404 || e >= 917760 && e <= 917999 || e >= 983040 && e <= 1048573 || e >= 1048576 && e <= 1114109;
var gt2 = (e) => e === 12288 || e >= 65281 && e <= 65376 || e >= 65504 && e <= 65510;
var ft2 = (e) => e >= 4352 && e <= 4447 || e === 8986 || e === 8987 || e === 9001 || e === 9002 || e >= 9193 && e <= 9196 || e === 9200 || e === 9203 || e === 9725 || e === 9726 || e === 9748 || e === 9749 || e >= 9800 && e <= 9811 || e === 9855 || e === 9875 || e === 9889 || e === 9898 || e === 9899 || e === 9917 || e === 9918 || e === 9924 || e === 9925 || e === 9934 || e === 9940 || e === 9962 || e === 9970 || e === 9971 || e === 9973 || e === 9978 || e === 9981 || e === 9989 || e === 9994 || e === 9995 || e === 10024 || e === 10060 || e === 10062 || e >= 10067 && e <= 10069 || e === 10071 || e >= 10133 && e <= 10135 || e === 10160 || e === 10175 || e === 11035 || e === 11036 || e === 11088 || e === 11093 || e >= 11904 && e <= 11929 || e >= 11931 && e <= 12019 || e >= 12032 && e <= 12245 || e >= 12272 && e <= 12287 || e >= 12289 && e <= 12350 || e >= 12353 && e <= 12438 || e >= 12441 && e <= 12543 || e >= 12549 && e <= 12591 || e >= 12593 && e <= 12686 || e >= 12688 && e <= 12771 || e >= 12783 && e <= 12830 || e >= 12832 && e <= 12871 || e >= 12880 && e <= 19903 || e >= 19968 && e <= 42124 || e >= 42128 && e <= 42182 || e >= 43360 && e <= 43388 || e >= 44032 && e <= 55203 || e >= 63744 && e <= 64255 || e >= 65040 && e <= 65049 || e >= 65072 && e <= 65106 || e >= 65108 && e <= 65126 || e >= 65128 && e <= 65131 || e >= 94176 && e <= 94180 || e === 94192 || e === 94193 || e >= 94208 && e <= 100343 || e >= 100352 && e <= 101589 || e >= 101632 && e <= 101640 || e >= 110576 && e <= 110579 || e >= 110581 && e <= 110587 || e === 110589 || e === 110590 || e >= 110592 && e <= 110882 || e === 110898 || e >= 110928 && e <= 110930 || e === 110933 || e >= 110948 && e <= 110951 || e >= 110960 && e <= 111355 || e === 126980 || e === 127183 || e === 127374 || e >= 127377 && e <= 127386 || e >= 127488 && e <= 127490 || e >= 127504 && e <= 127547 || e >= 127552 && e <= 127560 || e === 127568 || e === 127569 || e >= 127584 && e <= 127589 || e >= 127744 && e <= 127776 || e >= 127789 && e <= 127797 || e >= 127799 && e <= 127868 || e >= 127870 && e <= 127891 || e >= 127904 && e <= 127946 || e >= 127951 && e <= 127955 || e >= 127968 && e <= 127984 || e === 127988 || e >= 127992 && e <= 128062 || e === 128064 || e >= 128066 && e <= 128252 || e >= 128255 && e <= 128317 || e >= 128331 && e <= 128334 || e >= 128336 && e <= 128359 || e === 128378 || e === 128405 || e === 128406 || e === 128420 || e >= 128507 && e <= 128591 || e >= 128640 && e <= 128709 || e === 128716 || e >= 128720 && e <= 128722 || e >= 128725 && e <= 128727 || e >= 128732 && e <= 128735 || e === 128747 || e === 128748 || e >= 128756 && e <= 128764 || e >= 128992 && e <= 129003 || e === 129008 || e >= 129292 && e <= 129338 || e >= 129340 && e <= 129349 || e >= 129351 && e <= 129535 || e >= 129648 && e <= 129660 || e >= 129664 && e <= 129672 || e >= 129680 && e <= 129725 || e >= 129727 && e <= 129733 || e >= 129742 && e <= 129755 || e >= 129760 && e <= 129768 || e >= 129776 && e <= 129784 || e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141;
var we = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/y;
var re = /[\x00-\x08\x0A-\x1F\x7F-\x9F]{1,1000}/y;
var ie = /\t{1,1000}/y;
var Ae = /[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]{2}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,3}\u{E007F}|(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation})(?:\u200D(?:\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F\u20E3?))*/yu;
var ne = /(?:[\x20-\x7E\xA0-\xFF](?!\uFE0F)){1,1000}/y;
var Ft2 = /\p{M}+/gu;
var yt2 = { limit: 1 / 0, ellipsis: "" };
var Le = (e, r = {}, s = {}) => {
  const i = r.limit ?? 1 / 0, a = r.ellipsis ?? "", o = r?.ellipsisWidth ?? (a ? Le(a, yt2, s).width : 0), u = s.ansiWidth ?? 0, l = s.controlWidth ?? 0, n = s.tabWidth ?? 8, c = s.ambiguousWidth ?? 1, p = s.emojiWidth ?? 2, f = s.fullWidthWidth ?? 2, g = s.regularWidth ?? 1, E = s.wideWidth ?? 2;
  let $ = 0, m = 0, d = e.length, F = 0, y2 = false, v = d, C = Math.max(0, i - o), A = 0, b = 0, w = 0, S2 = 0;
  e:
    for (;; ) {
      if (b > A || m >= d && m > $) {
        const T2 = e.slice(A, b) || e.slice($, m);
        F = 0;
        for (const M2 of T2.replaceAll(Ft2, "")) {
          const O2 = M2.codePointAt(0) || 0;
          if (gt2(O2) ? S2 = f : ft2(O2) ? S2 = E : c !== g && mt2(O2) ? S2 = c : S2 = g, w + S2 > C && (v = Math.min(v, Math.max(A, $) + F)), w + S2 > i) {
            y2 = true;
            break e;
          }
          F += M2.length, w += S2;
        }
        A = b = 0;
      }
      if (m >= d)
        break;
      if (ne.lastIndex = m, ne.test(e)) {
        if (F = ne.lastIndex - m, S2 = F * g, w + S2 > C && (v = Math.min(v, m + Math.floor((C - w) / g))), w + S2 > i) {
          y2 = true;
          break;
        }
        w += S2, A = $, b = m, m = $ = ne.lastIndex;
        continue;
      }
      if (we.lastIndex = m, we.test(e)) {
        if (w + u > C && (v = Math.min(v, m)), w + u > i) {
          y2 = true;
          break;
        }
        w += u, A = $, b = m, m = $ = we.lastIndex;
        continue;
      }
      if (re.lastIndex = m, re.test(e)) {
        if (F = re.lastIndex - m, S2 = F * l, w + S2 > C && (v = Math.min(v, m + Math.floor((C - w) / l))), w + S2 > i) {
          y2 = true;
          break;
        }
        w += S2, A = $, b = m, m = $ = re.lastIndex;
        continue;
      }
      if (ie.lastIndex = m, ie.test(e)) {
        if (F = ie.lastIndex - m, S2 = F * n, w + S2 > C && (v = Math.min(v, m + Math.floor((C - w) / n))), w + S2 > i) {
          y2 = true;
          break;
        }
        w += S2, A = $, b = m, m = $ = ie.lastIndex;
        continue;
      }
      if (Ae.lastIndex = m, Ae.test(e)) {
        if (w + p > C && (v = Math.min(v, m)), w + p > i) {
          y2 = true;
          break;
        }
        w += p, A = $, b = m, m = $ = Ae.lastIndex;
        continue;
      }
      m += 1;
    }
  return { width: y2 ? C : w, index: y2 ? v : d, truncated: y2, ellipsed: y2 && i >= o };
};
var Et2 = { limit: 1 / 0, ellipsis: "", ellipsisWidth: 0 };
var D2 = (e, r = {}) => Le(e, Et2, r).width;
var ae = "\x1B";
var je = "";
var vt2 = 39;
var Ce = "\x07";
var ke = "[";
var wt2 = "]";
var Ve = "m";
var Se = `${wt2}8;;`;
var He = new RegExp(`(?:\\${ke}(?<code>\\d+)m|\\${Se}(?<uri>.*)${Ce})`, "y");
var At2 = (e) => {
  if (e >= 30 && e <= 37 || e >= 90 && e <= 97)
    return 39;
  if (e >= 40 && e <= 47 || e >= 100 && e <= 107)
    return 49;
  if (e === 1 || e === 2)
    return 22;
  if (e === 3)
    return 23;
  if (e === 4)
    return 24;
  if (e === 7)
    return 27;
  if (e === 8)
    return 28;
  if (e === 9)
    return 29;
  if (e === 0)
    return 0;
};
var Ue = (e) => `${ae}${ke}${e}${Ve}`;
var Ke = (e) => `${ae}${Se}${e}${Ce}`;
var Ct2 = (e) => e.map((r) => D2(r));
var Ie = (e, r, s) => {
  const i = r[Symbol.iterator]();
  let a = false, o = false, u = e.at(-1), l = u === undefined ? 0 : D2(u), n = i.next(), c = i.next(), p = 0;
  for (;!n.done; ) {
    const f = n.value, g = D2(f);
    l + g <= s ? e[e.length - 1] += f : (e.push(f), l = 0), (f === ae || f === je) && (a = true, o = r.startsWith(Se, p + 1)), a ? o ? f === Ce && (a = false, o = false) : f === Ve && (a = false) : (l += g, l === s && !c.done && (e.push(""), l = 0)), n = c, c = i.next(), p += f.length;
  }
  u = e.at(-1), !l && u !== undefined && u.length > 0 && e.length > 1 && (e[e.length - 2] += e.pop());
};
var St2 = (e) => {
  const r = e.split(" ");
  let s = r.length;
  for (;s > 0 && !(D2(r[s - 1]) > 0); )
    s--;
  return s === r.length ? e : r.slice(0, s).join(" ") + r.slice(s).join("");
};
var It2 = (e, r, s = {}) => {
  if (s.trim !== false && e.trim() === "")
    return "";
  let i = "", a, o;
  const u = e.split(" "), l = Ct2(u);
  let n = [""];
  for (const [$, m] of u.entries()) {
    s.trim !== false && (n[n.length - 1] = (n.at(-1) ?? "").trimStart());
    let d = D2(n.at(-1) ?? "");
    if ($ !== 0 && (d >= r && (s.wordWrap === false || s.trim === false) && (n.push(""), d = 0), (d > 0 || s.trim === false) && (n[n.length - 1] += " ", d++)), s.hard && l[$] > r) {
      const F = r - d, y2 = 1 + Math.floor((l[$] - F - 1) / r);
      Math.floor((l[$] - 1) / r) < y2 && n.push(""), Ie(n, m, r);
      continue;
    }
    if (d + l[$] > r && d > 0 && l[$] > 0) {
      if (s.wordWrap === false && d < r) {
        Ie(n, m, r);
        continue;
      }
      n.push("");
    }
    if (d + l[$] > r && s.wordWrap === false) {
      Ie(n, m, r);
      continue;
    }
    n[n.length - 1] += m;
  }
  s.trim !== false && (n = n.map(($) => St2($)));
  const c = n.join(`
`), p = c[Symbol.iterator]();
  let f = p.next(), g = p.next(), E = 0;
  for (;!f.done; ) {
    const $ = f.value, m = g.value;
    if (i += $, $ === ae || $ === je) {
      He.lastIndex = E + 1;
      const y2 = He.exec(c)?.groups;
      if (y2?.code !== undefined) {
        const v = Number.parseFloat(y2.code);
        a = v === vt2 ? undefined : v;
      } else
        y2?.uri !== undefined && (o = y2.uri.length === 0 ? undefined : y2.uri);
    }
    const d = a ? At2(a) : undefined;
    m === `
` ? (o && (i += Ke("")), a && d && (i += Ue(d))) : $ === `
` && (a && d && (i += Ue(a)), o && (i += Ke(o))), E += $.length, f = g, g = p.next();
  }
  return i;
};
function J2(e, r, s) {
  return String(e).normalize().replaceAll(`\r
`, `
`).split(`
`).map((i) => It2(i, r, s)).join(`
`);
}
var bt2 = (e, r, s, i, a) => {
  let o = r, u = 0;
  for (let l = s;l < i; l++) {
    const n = e[l];
    if (o = o - n.length, u++, o <= a)
      break;
  }
  return { lineCount: o, removals: u };
};
var X2 = ({ cursor: e, options: r, style: s, output: i = process.stdout, maxItems: a = Number.POSITIVE_INFINITY, columnPadding: o = 0, rowPadding: u = 4 }) => {
  const l = rt(i) - o, n = nt(i), c = t("dim", "..."), p = Math.max(n - u, 0), f = Math.max(Math.min(a, p), 5);
  let g = 0;
  e >= f - 3 && (g = Math.max(Math.min(e - f + 3, r.length - f), 0));
  let E = f < r.length && g > 0, $ = f < r.length && g + f < r.length;
  const m = Math.min(g + f, r.length), d = [];
  let F = 0;
  E && F++, $ && F++;
  const y2 = g + (E ? 1 : 0), v = m - ($ ? 1 : 0);
  for (let A = y2;A < v; A++) {
    const b = J2(s(r[A], A === e), l, { hard: true, trim: false }).split(`
`);
    d.push(b), F += b.length;
  }
  if (F > p) {
    let A = 0, b = 0, w = F;
    const S2 = e - y2, T2 = (M2, O2) => bt2(d, w, M2, O2, p);
    E ? ({ lineCount: w, removals: A } = T2(0, S2), w > p && ({ lineCount: w, removals: b } = T2(S2 + 1, d.length))) : ({ lineCount: w, removals: b } = T2(S2 + 1, d.length), w > p && ({ lineCount: w, removals: A } = T2(0, S2))), A > 0 && (E = true, d.splice(0, A)), b > 0 && ($ = true, d.splice(d.length - b, b));
  }
  const C = [];
  E && C.push(c);
  for (const A of d)
    for (const b of A)
      C.push(b);
  return $ && C.push(c), C;
};
var Rt = (e) => {
  const r = e.active ?? "Yes", s = e.inactive ?? "No";
  return new kt({ active: r, inactive: s, signal: e.signal, input: e.input, output: e.output, initialValue: e.initialValue ?? true, render() {
    const i = e.withGuide ?? _.withGuide, a = `${i ? `${t("gray", h)}
` : ""}${W2(this.state)}  ${e.message}
`, o = this.value ? r : s;
    switch (this.state) {
      case "submit": {
        const u = i ? `${t("gray", h)}  ` : "";
        return `${a}${u}${t("dim", o)}`;
      }
      case "cancel": {
        const u = i ? `${t("gray", h)}  ` : "";
        return `${a}${u}${t(["strikethrough", "dim"], o)}${i ? `
${t("gray", h)}` : ""}`;
      }
      default: {
        const u = i ? `${t("cyan", h)}  ` : "", l = i ? t("cyan", x2) : "";
        return `${a}${u}${this.value ? `${t("green", z2)} ${r}` : `${t("dim", H2)} ${t("dim", r)}`}${e.vertical ? i ? `
${t("cyan", h)}  ` : `
` : ` ${t("dim", "/")} `}${this.value ? `${t("dim", H2)} ${t("dim", s)}` : `${t("green", z2)} ${s}`}
${l}
`;
      }
    }
  } }).prompt();
};
var R2 = { message: (e = [], { symbol: r = t("gray", h), secondarySymbol: s = t("gray", h), output: i = process.stdout, spacing: a = 1, withGuide: o } = {}) => {
  const u = [], l = o ?? _.withGuide, n = l ? s : "", c = l ? `${r}  ` : "", p = l ? `${s}  ` : "";
  for (let g = 0;g < a; g++)
    u.push(n);
  const f = Array.isArray(e) ? e : e.split(`
`);
  if (f.length > 0) {
    const [g, ...E] = f;
    g.length > 0 ? u.push(`${c}${g}`) : u.push(l ? r : "");
    for (const $ of E)
      $.length > 0 ? u.push(`${p}${$}`) : u.push(l ? s : "");
  }
  i.write(`${u.join(`
`)}
`);
}, info: (e, r) => {
  R2.message(e, { ...r, symbol: t("blue", fe) });
}, success: (e, r) => {
  R2.message(e, { ...r, symbol: t("green", Fe) });
}, step: (e, r) => {
  R2.message(e, { ...r, symbol: t("green", V) });
}, warn: (e, r) => {
  R2.message(e, { ...r, symbol: t("yellow", ye) });
}, warning: (e, r) => {
  R2.warn(e, r);
}, error: (e, r) => {
  R2.message(e, { ...r, symbol: t("red", Ee) });
} };
var Wt2 = (e = "", r) => {
  const s = r?.output ?? process.stdout, i = r?.withGuide ?? _.withGuide ? `${t("gray", he)}  ` : "";
  s.write(`${i}${e}
`);
};
var Gt = (e = "", r) => {
  const s = r?.output ?? process.stdout, i = r?.withGuide ?? _.withGuide ? `${t("gray", h)}
${t("gray", x2)}  ` : "";
  s.write(`${i}${e}

`);
};
var jt = (e) => t("dim", e);
var kt2 = (e, r, s) => {
  const i = { hard: true, trim: false }, a = J2(e, r, i).split(`
`), o = a.reduce((n, c) => Math.max(D2(c), n), 0), u = a.map(s).reduce((n, c) => Math.max(D2(c), n), 0), l = r - (u - o);
  return J2(e, l, i);
};
var Vt2 = (e = "", r = "", s) => {
  const i = s?.output ?? N2.stdout, a = s?.withGuide ?? _.withGuide, o = s?.format ?? jt, u = ["", ...kt2(e, rt(i) - 6, o).split(`
`).map(o), ""], l = D2(r), n = Math.max(u.reduce((g, E) => {
    const $ = D2(E);
    return $ > g ? $ : g;
  }, 0), l) + 2, c = u.map((g) => `${t("gray", h)}  ${g}${" ".repeat(n - D2(g))}${t("gray", h)}`).join(`
`), p = a ? `${t("gray", h)}
` : "", f = a ? We : ge;
  i.write(`${p}${t("green", V)}  ${t("reset", r)} ${t("gray", se.repeat(Math.max(n - l - 1, 1)) + pe)}
${c}
${t("gray", f + se.repeat(n + 2) + me)}
`);
};
var Kt = (e) => t("magenta", e);
var be = ({ indicator: e = "dots", onCancel: r, output: s = process.stdout, cancelMessage: i, errorMessage: a, frames: o = ee ? ["◒", "◐", "◓", "◑"] : ["•", "o", "O", "0"], delay: u = ee ? 80 : 120, signal: l, ...n } = {}) => {
  const c = ce();
  let p, f, g = false, E = false, $ = "", m, d = performance.now();
  const F = rt(s), y2 = n?.styleFrame ?? Kt, v = (B2) => {
    const P2 = B2 > 1 ? a ?? _.messages.error : i ?? _.messages.cancel;
    E = B2 === 1, g && (k2(P2, B2), E && typeof r == "function" && r());
  }, C = () => v(2), A = () => v(1), b = () => {
    process.on("uncaughtExceptionMonitor", C), process.on("unhandledRejection", C), process.on("SIGINT", A), process.on("SIGTERM", A), process.on("exit", v), l && l.addEventListener("abort", A);
  }, w = () => {
    process.removeListener("uncaughtExceptionMonitor", C), process.removeListener("unhandledRejection", C), process.removeListener("SIGINT", A), process.removeListener("SIGTERM", A), process.removeListener("exit", v), l && l.removeEventListener("abort", A);
  }, S2 = () => {
    if (m === undefined)
      return;
    c && s.write(`
`);
    const B2 = J2(m, F, { hard: true, trim: false }).split(`
`);
    B2.length > 1 && s.write(import_sisteransi2.cursor.up(B2.length - 1)), s.write(import_sisteransi2.cursor.to(0)), s.write(import_sisteransi2.erase.down());
  }, T2 = (B2) => B2.replace(/\.+$/, ""), M2 = (B2) => {
    const P2 = (performance.now() - B2) / 1000, G2 = Math.floor(P2 / 60), L2 = Math.floor(P2 % 60);
    return G2 > 0 ? `[${G2}m ${L2}s]` : `[${L2}s]`;
  }, O2 = n.withGuide ?? _.withGuide, le = (B2 = "") => {
    g = true, p = xt({ output: s }), $ = T2(B2), d = performance.now(), O2 && s.write(`${t("gray", h)}
`);
    let P2 = 0, G2 = 0;
    b(), f = setInterval(() => {
      if (c && $ === m)
        return;
      S2(), m = $;
      const L2 = y2(o[P2]);
      let Z2;
      if (c)
        Z2 = `${L2}  ${$}...`;
      else if (e === "timer")
        Z2 = `${L2}  ${$} ${M2(d)}`;
      else {
        const et2 = ".".repeat(Math.floor(G2)).slice(0, 3);
        Z2 = `${L2}  ${$}${et2}`;
      }
      const Ze = J2(Z2, F, { hard: true, trim: false });
      s.write(Ze), P2 = P2 + 1 < o.length ? P2 + 1 : 0, G2 = G2 < 4 ? G2 + 0.125 : 0;
    }, u);
  }, k2 = (B2 = "", P2 = 0, G2 = false) => {
    if (!g)
      return;
    g = false, clearInterval(f), S2();
    const L2 = P2 === 0 ? t("green", V) : P2 === 1 ? t("red", $e) : t("red", de);
    $ = B2 ?? $, G2 || (e === "timer" ? s.write(`${L2}  ${$} ${M2(d)}
`) : s.write(`${L2}  ${$}
`)), w(), p();
  };
  return { start: le, stop: (B2 = "") => k2(B2, 0), message: (B2 = "") => {
    $ = T2(B2 ?? $);
  }, cancel: (B2 = "") => k2(B2, 1), error: (B2 = "") => k2(B2, 2), clear: () => k2("", 0, true), get isCancelled() {
    return E;
  } };
};
var ze = { light: I2("─", "-"), heavy: I2("━", "="), block: I2("█", "#") };
var oe = (e, r) => e.includes(`
`) ? e.split(`
`).map((s) => r(s)).join(`
`) : r(e);
var Jt = (e) => {
  const r = (s, i) => {
    const a = s.label ?? String(s.value);
    switch (i) {
      case "disabled":
        return `${t("gray", H2)} ${oe(a, (o) => t("gray", o))}${s.hint ? ` ${t("dim", `(${s.hint ?? "disabled"})`)}` : ""}`;
      case "selected":
        return `${oe(a, (o) => t("dim", o))}`;
      case "active":
        return `${t("green", z2)} ${a}${s.hint ? ` ${t("dim", `(${s.hint})`)}` : ""}`;
      case "cancelled":
        return `${oe(a, (o) => t(["strikethrough", "dim"], o))}`;
      default:
        return `${t("dim", H2)} ${oe(a, (o) => t("dim", o))}`;
    }
  };
  return new Tt({ options: e.options, signal: e.signal, input: e.input, output: e.output, initialValue: e.initialValue, render() {
    const s = e.withGuide ?? _.withGuide, i = `${W2(this.state)}  `, a = `${ve(this.state)}  `, o = Bt(e.output, e.message, a, i), u = `${s ? `${t("gray", h)}
` : ""}${o}
`;
    switch (this.state) {
      case "submit": {
        const l = s ? `${t("gray", h)}  ` : "", n = Bt(e.output, r(this.options[this.cursor], "selected"), l);
        return `${u}${n}`;
      }
      case "cancel": {
        const l = s ? `${t("gray", h)}  ` : "", n = Bt(e.output, r(this.options[this.cursor], "cancelled"), l);
        return `${u}${n}${s ? `
${t("gray", h)}` : ""}`;
      }
      default: {
        const l = s ? `${t("cyan", h)}  ` : "", n = s ? t("cyan", x2) : "", c = u.split(`
`).length, p = s ? 2 : 1;
        return `${u}${l}${X2({ output: e.output, cursor: this.cursor, options: this.options, maxItems: e.maxItems, columnPadding: l.length, rowPadding: c + p, style: (f, g) => r(f, f.disabled ? "disabled" : g ? "active" : "inactive") }).join(`
${l}`)}
${n}
`;
      }
    }
  } }).prompt();
};
var Qe = `${t("gray", h)}  `;
var Zt = (e) => new $t({ validate: e.validate, placeholder: e.placeholder, defaultValue: e.defaultValue, initialValue: e.initialValue, output: e.output, signal: e.signal, input: e.input, render() {
  const r = e?.withGuide ?? _.withGuide, s = `${`${r ? `${t("gray", h)}
` : ""}${W2(this.state)}  `}${e.message}
`, i = e.placeholder ? t("inverse", e.placeholder[0]) + t("dim", e.placeholder.slice(1)) : t(["inverse", "hidden"], "_"), a = this.userInput ? this.userInputWithCursor : i, o = this.value ?? "";
  switch (this.state) {
    case "error": {
      const u = this.error ? `  ${t("yellow", this.error)}` : "", l = r ? `${t("yellow", h)}  ` : "", n = r ? t("yellow", x2) : "";
      return `${s.trim()}
${l}${a}
${n}${u}
`;
    }
    case "submit": {
      const u = o ? `  ${t("dim", o)}` : "", l = r ? t("gray", h) : "";
      return `${s}${l}${u}`;
    }
    case "cancel": {
      const u = o ? `  ${t(["strikethrough", "dim"], o)}` : "", l = r ? t("gray", h) : "";
      return `${s}${l}${u}${o.trim() ? `
${l}` : ""}`;
    }
    default: {
      const u = r ? `${t("cyan", h)}  ` : "", l = r ? t("cyan", x2) : "";
      return `${s}${u}${a}
${l}
`;
    }
  }
} }).prompt();

// src/cli/prompts.ts
function handleCancel(value) {
  if (Ct(value)) {
    R2.warn("Setup cancelled.");
    process.exit(0);
  }
}
async function confirm(message, defaultYes = true) {
  const result = await Rt({
    message,
    initialValue: defaultYes
  });
  handleCancel(result);
  return result;
}
async function text(message, options = {}) {
  const result = await Zt({
    message,
    placeholder: options.placeholder,
    initialValue: options.initialValue,
    validate: options.validate ? (value) => {
      const str = typeof value === "string" ? value : "";
      const error = options.validate?.(str);
      return error ?? undefined;
    } : undefined
  });
  handleCancel(result);
  return result;
}
async function selectOne(message, options) {
  const result = await Jt({
    message,
    options: options.map((opt) => ({
      label: opt.recommended ? `${opt.label} (recommended)` : opt.label,
      value: opt.value,
      hint: opt.recommended ? "recommended" : undefined
    }))
  });
  handleCancel(result);
  return result;
}

// src/cli/doctor.ts
var PLUGIN_NAME3 = "@cortexkit/opencode-magic-context";
var PLUGIN_ENTRY_WITH_VERSION2 = `${PLUGIN_NAME3}@latest`;
function getOpenCodeCacheDir2() {
  const xdgCache = process.env.XDG_CACHE_HOME;
  if (xdgCache)
    return join9(xdgCache, "opencode");
  const os2 = platform();
  if (os2 === "win32") {
    const localAppData = process.env.LOCALAPPDATA ?? join9(homedir6(), "AppData", "Local");
    return join9(localAppData, "opencode");
  }
  return join9(homedir6(), ".cache", "opencode");
}
async function clearPluginCache(force = false) {
  const cacheDir = getOpenCodeCacheDir2();
  const pluginCacheDir = join9(cacheDir, "packages", PLUGIN_ENTRY_WITH_VERSION2);
  if (!existsSync7(pluginCacheDir)) {
    return { action: "not_found", path: pluginCacheDir };
  }
  let cachedVersion;
  try {
    const installedPkgPath = join9(pluginCacheDir, "node_modules", "@cortexkit", "opencode-magic-context", "package.json");
    if (existsSync7(installedPkgPath)) {
      const pkg = JSON.parse(readFileSync6(installedPkgPath, "utf-8"));
      if (typeof pkg?.version === "string") {
        cachedVersion = pkg.version;
      }
    }
  } catch {}
  const require2 = createRequire3(import.meta.url);
  let selfVersion;
  for (const relPath of ["../../package.json", "../package.json"]) {
    try {
      selfVersion = require2(relPath).version;
      if (selfVersion)
        break;
    } catch {}
  }
  if (!force && cachedVersion && cachedVersion === selfVersion) {
    return {
      action: "up_to_date",
      path: pluginCacheDir,
      cached: cachedVersion,
      latest: selfVersion
    };
  }
  try {
    rmSync(pluginCacheDir, { recursive: true, force: true });
    return {
      action: "cleared",
      path: pluginCacheDir,
      cached: cachedVersion,
      latest: selfVersion
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { action: "error", path: pluginCacheDir, error: msg };
  }
}
function isGhInstalled() {
  try {
    execSync2("gh --version", { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}
function openBrowser(url) {
  try {
    if (process.platform === "darwin") {
      const child = spawnSync("open", [url], { stdio: "ignore" });
      if (child.status === 0)
        return;
    } else if (process.platform === "linux") {
      const child = spawnSync("xdg-open", [url], { stdio: "ignore" });
      if (child.status === 0)
        return;
    } else if (process.platform === "win32") {
      const child = spawnSync("cmd", ["/c", "start", "", url], { stdio: "ignore" });
      if (child.status === 0)
        return;
    }
  } catch {}
}
async function runIssueFlow() {
  Wt2("Magic Context Issue Report");
  const title = await text("Issue title", {
    placeholder: "Short summary of the problem",
    validate: (value) => value.trim() ? undefined : "Title is required"
  });
  const description = await text("Issue description", {
    placeholder: "Describe what happened, what you expected, and repro steps",
    validate: (value) => value.trim() ? undefined : "Description is required"
  });
  const s = be();
  s.start("Collecting diagnostics");
  try {
    const report = await collectDiagnostics();
    const bundled = await bundleIssueReport(report, description, title);
    s.stop(`Report written to ${bundled.path}`);
    const shouldSubmit = await confirm("Submit this issue on GitHub now?", true);
    if (shouldSubmit && isGhInstalled()) {
      const result = spawnSync("gh", [
        "issue",
        "create",
        "-R",
        "cortexkit/opencode-magic-context",
        "--title",
        title,
        "--body-file",
        bundled.path
      ], { encoding: "utf-8", stdio: ["ignore", "pipe", "pipe"] });
      if (result.status === 0) {
        R2.success(result.stdout.trim());
        Gt("Issue submitted — thanks for the report!");
        return 0;
      }
      R2.warn(result.stderr.trim() || "gh issue create failed");
    } else if (shouldSubmit && !isGhInstalled()) {
      R2.warn("gh CLI not found — falling back to browser");
    }
    const url = `https://github.com/cortexkit/opencode-magic-context/issues/new?title=${encodeURIComponent(title)}&template=bug_report.yml`;
    R2.info(`Open this URL and paste the contents of ${bundled.path} into the Diagnostics field:`);
    R2.info(url);
    openBrowser(url);
    Gt("Issue report ready");
    return 0;
  } catch (error) {
    s.stop("Diagnostic collection failed");
    R2.error(error instanceof Error ? error.message : String(error));
    Gt("Issue report failed");
    return 1;
  }
}
async function checkEmbeddingConfig(magicContextConfigPath) {
  if (!existsSync7(magicContextConfigPath)) {
    return { issues: 0 };
  }
  let rawText;
  try {
    rawText = readFileSync6(magicContextConfigPath, "utf-8");
  } catch {
    R2.warn("Could not read magic-context.jsonc for embedding check");
    return { issues: 1 };
  }
  const substituted = substituteConfigVariables({
    text: rawText,
    configPath: magicContextConfigPath
  });
  let parsedConfig;
  try {
    parsedConfig = import_comment_json3.parse(substituted.text);
  } catch (error) {
    R2.warn(`Embedding check skipped — could not parse magic-context.jsonc: ${error instanceof Error ? error.message : String(error)}`);
    return { issues: 1 };
  }
  const embedding = parsedConfig?.embedding;
  const provider = embedding?.provider;
  if (provider === "off") {
    R2.info("Embedding provider disabled — semantic memory search is off");
    return { issues: 0 };
  }
  if (provider === undefined || provider === "local") {
    R2.success("Embedding provider: local (Xenova/all-MiniLM-L6-v2 bundled)");
    return { issues: 0 };
  }
  if (provider !== "openai-compatible") {
    R2.warn(`Unknown embedding provider: ${String(provider)} (expected local | openai-compatible | off)`);
    return { issues: 1 };
  }
  const endpoint = typeof embedding?.endpoint === "string" ? embedding.endpoint.trim() : "";
  const model = typeof embedding?.model === "string" ? embedding.model.trim() : "";
  const apiKey = typeof embedding?.api_key === "string" ? embedding.api_key : undefined;
  let localIssues = 0;
  if (!endpoint) {
    R2.error("Embedding provider is openai-compatible but 'endpoint' is missing");
    return { issues: 1 };
  }
  if (!model) {
    R2.error("Embedding provider is openai-compatible but 'model' is missing");
    return { issues: 1 };
  }
  if (apiKey && /\{env:[^}]+\}/.test(apiKey)) {
    R2.warn("api_key still contains {env:...} after substitution — the referenced environment variable is not set in this shell");
    R2.info(`  Raw value: ${apiKey}`);
    R2.info("  Export the variable before launching OpenCode (e.g. in ~/.zshrc, ~/.bashrc, or a shell profile)");
    localIssues++;
  }
  if (substituted.warnings.length > 0) {
    for (const w of substituted.warnings.slice(0, 3)) {
      R2.info(`  ${w}`);
    }
    if (substituted.warnings.length > 3) {
      R2.info(`  ... and ${substituted.warnings.length - 3} more`);
    }
  }
  const probeSpinner = be();
  probeSpinner.start(`Testing embedding endpoint ${endpoint} (model: ${model})`);
  let outcome;
  try {
    outcome = await probeEmbeddingEndpoint({
      endpoint,
      model,
      apiKey,
      timeoutMs: 1e4
    });
  } catch (error) {
    probeSpinner.stop("Embedding probe failed unexpectedly");
    R2.error(`Probe threw: ${error instanceof Error ? error.message : String(error)}`);
    return { issues: localIssues + 1 };
  }
  probeSpinner.stop("Embedding endpoint probed");
  switch (outcome.kind) {
    case "ok":
      R2.success(`Embedding endpoint OK (${outcome.status}, ${outcome.dimensions ?? "?"}-dim vectors)`);
      return { issues: localIssues };
    case "auth_failed":
      R2.error(`Embedding endpoint rejected credentials (${outcome.status}) — check api_key / env var`);
      if (outcome.preview)
        R2.info(`  ${outcome.preview}`);
      return { issues: localIssues + 1 };
    case "endpoint_unsupported":
      R2.error(`Embedding endpoint does not support embeddings (${outcome.status})`);
      if (outcome.preview)
        R2.info(`  ${outcome.preview}`);
      R2.info("  Common causes: endpoint points at a chat-completion route (should be the provider base, e.g. '.../v1'), or the provider doesn't offer an embeddings API");
      R2.info("  Known non-embedding providers: OpenRouter (chat proxy), Anthropic (no embeddings endpoint). Use OpenAI, Voyage, Together, or a local provider instead.");
      return { issues: localIssues + 1 };
    case "http_error":
      R2.error(`Embedding endpoint returned ${outcome.status}`);
      if (outcome.preview)
        R2.info(`  ${outcome.preview}`);
      return { issues: localIssues + 1 };
    case "timeout":
      R2.warn(`Embedding endpoint did not respond within ${outcome.timeoutMs}ms — check endpoint URL and network`);
      return { issues: localIssues + 1 };
    case "network_error":
      R2.error(`Could not reach embedding endpoint: ${outcome.message}`);
      return { issues: localIssues + 1 };
    case "invalid_scheme":
      R2.error(`Embedding endpoint must start with http:// or https://: ${outcome.endpoint}`);
      return { issues: localIssues + 1 };
  }
}
async function runDoctor(options = {}) {
  if (options.issue) {
    return runIssueFlow();
  }
  Wt2("Magic Context Doctor");
  let issues = 0;
  let fixed = 0;
  if (!isOpenCodeInstalled()) {
    R2.error("OpenCode is not installed or not in PATH");
    Gt("Doctor failed — install OpenCode first");
    return 1;
  }
  R2.success("OpenCode installed");
  const paths = detectConfigPaths();
  if (paths.opencodeConfigFormat === "none") {
    R2.error(`No opencode.json found at ${paths.opencodeConfig}`);
    issues++;
  } else {
    R2.success(`OpenCode config: ${paths.opencodeConfig}`);
  }
  if (existsSync7(paths.magicContextConfig)) {
    R2.success(`Magic Context config: ${paths.magicContextConfig}`);
  } else {
    R2.warn(`No magic-context.jsonc found — using defaults`);
    R2.info("  Run 'setup' to create one with model recommendations");
  }
  if (existsSync7(paths.magicContextConfig)) {
    try {
      const mcRaw = readFileSync6(paths.magicContextConfig, "utf-8");
      const mcConfig = import_comment_json3.parse(mcRaw);
      let mcChanged = false;
      const experimental = mcConfig.experimental;
      if (experimental && "compaction_markers" in experimental) {
        if (!("compaction_markers" in mcConfig)) {
          mcConfig.compaction_markers = experimental.compaction_markers;
        }
        delete experimental.compaction_markers;
        mcChanged = true;
        R2.success("Migrated experimental.compaction_markers → compaction_markers (now default: true)");
        fixed++;
      }
      if (experimental && "user_memories" in experimental) {
        const dreamer = mcConfig.dreamer ?? {};
        const oldUM = experimental.user_memories;
        const existingUM = dreamer.user_memories;
        if (existingUM === undefined) {
          if (typeof oldUM === "boolean") {
            dreamer.user_memories = { enabled: oldUM };
          } else {
            dreamer.user_memories = oldUM;
          }
        } else if (typeof oldUM === "object" && oldUM !== null && typeof existingUM === "object" && existingUM !== null) {
          const merged = {
            ...oldUM,
            ...existingUM
          };
          dreamer.user_memories = merged;
        } else if (typeof oldUM === "object" && oldUM !== null) {
          const coerced = {
            ...oldUM,
            enabled: Boolean(existingUM)
          };
          dreamer.user_memories = coerced;
          R2.warn(`Coerced malformed dreamer.user_memories (${typeof existingUM}) to object form while merging sub-fields from experimental.user_memories`);
        }
        mcConfig.dreamer = dreamer;
        delete experimental.user_memories;
        mcChanged = true;
        R2.success("Migrated experimental.user_memories → dreamer.user_memories (now default: enabled)");
        fixed++;
      }
      if (experimental && "pin_key_files" in experimental) {
        const dreamer = mcConfig.dreamer ?? {};
        const oldPKF = experimental.pin_key_files;
        const existingPKF = dreamer.pin_key_files;
        if (existingPKF === undefined) {
          dreamer.pin_key_files = oldPKF;
        } else if (typeof oldPKF === "object" && oldPKF !== null && typeof existingPKF === "object" && existingPKF !== null) {
          const merged = {
            ...oldPKF,
            ...existingPKF
          };
          dreamer.pin_key_files = merged;
        } else if (typeof oldPKF === "object" && oldPKF !== null) {
          const coerced = {
            ...oldPKF,
            enabled: Boolean(existingPKF)
          };
          dreamer.pin_key_files = coerced;
          R2.warn(`Coerced malformed dreamer.pin_key_files (${typeof existingPKF}) to object form while merging sub-fields from experimental.pin_key_files`);
        }
        mcConfig.dreamer = dreamer;
        delete experimental.pin_key_files;
        mcChanged = true;
        R2.success("Migrated experimental.pin_key_files → dreamer.pin_key_files (preserved user enabled state)");
        fixed++;
      }
      if ("compartment_token_budget" in mcConfig) {
        delete mcConfig.compartment_token_budget;
        mcChanged = true;
        R2.success("Removed deprecated compartment_token_budget (auto-derived from model context now)");
        fixed++;
      }
      if (mcChanged) {
        writeFileSync4(paths.magicContextConfig, `${import_comment_json3.stringify(mcConfig, null, 2)}
`);
      }
    } catch {
      R2.warn("Could not migrate deprecated config keys in magic-context.jsonc");
    }
  }
  if (paths.opencodeConfigFormat !== "none") {
    try {
      const raw = readFileSync6(paths.opencodeConfig, "utf-8");
      const config = import_comment_json3.parse(raw);
      const plugins = Array.isArray(config?.plugin) ? config.plugin : [];
      const pluginList = plugins.filter((p) => typeof p === "string");
      const existingIdx = pluginList.findIndex((p) => p === PLUGIN_NAME3 || p.startsWith(`${PLUGIN_NAME3}@`) || p.includes("opencode-magic-context"));
      const configName = paths.opencodeConfigFormat === "jsonc" ? "opencode.jsonc" : "opencode.json";
      if (existingIdx >= 0 && pluginList[existingIdx] === PLUGIN_ENTRY_WITH_VERSION2) {
        R2.success(`Plugin registered in ${configName}`);
      } else if (existingIdx >= 0) {
        const oldEntry = pluginList[existingIdx];
        const isPinned = oldEntry !== PLUGIN_NAME3 && oldEntry !== PLUGIN_ENTRY_WITH_VERSION2 && /^@cortexkit\/opencode-magic-context@\d/.test(oldEntry);
        if (isPinned && !options.force) {
          R2.warn(`Plugin pinned to ${oldEntry} in ${configName} — use 'doctor --force' to upgrade`);
        } else {
          pluginList[existingIdx] = PLUGIN_ENTRY_WITH_VERSION2;
          config.plugin = pluginList;
          writeFileSync4(paths.opencodeConfig, `${import_comment_json3.stringify(config, null, 2)}
`);
          R2.success(`Upgraded plugin entry in ${configName}: ${oldEntry} → ${PLUGIN_ENTRY_WITH_VERSION2}`);
          fixed++;
        }
      } else {
        pluginList.push(PLUGIN_ENTRY_WITH_VERSION2);
        config.plugin = pluginList;
        writeFileSync4(paths.opencodeConfig, `${import_comment_json3.stringify(config, null, 2)}
`);
        R2.success(`Added plugin to ${configName}`);
        fixed++;
      }
    } catch {
      R2.warn("Could not parse opencode config to verify plugin entry");
    }
  }
  const cwd = process.cwd();
  const conflictResult = detectConflicts(cwd);
  if (conflictResult.hasConflict) {
    for (const reason of conflictResult.reasons) {
      R2.error(`Conflict: ${reason}`);
    }
    const actions = fixConflicts(cwd, conflictResult.conflicts);
    for (const action of actions) {
      R2.success(`Fixed: ${action}`);
      fixed++;
    }
    issues += conflictResult.reasons.length - actions.length;
    if (actions.length > 0) {
      R2.warn("Restart OpenCode for conflict fixes to take effect");
    }
  } else {
    R2.success("No conflicts detected (compaction, DCP, OMO hooks)");
  }
  const tuiAdded = ensureTuiPluginEntry();
  if (tuiAdded) {
    R2.success("Added TUI sidebar plugin to tui.json");
    R2.warn("Restart OpenCode to see the sidebar");
    fixed++;
  } else if (existsSync7(paths.tuiConfig)) {
    try {
      const tuiRaw = readFileSync6(paths.tuiConfig, "utf-8");
      const tuiConfig = import_comment_json3.parse(tuiRaw);
      const tuiPlugins = Array.isArray(tuiConfig?.plugin) ? tuiConfig.plugin.filter((p) => typeof p === "string") : [];
      const tuiIdx = tuiPlugins.findIndex((p) => p === PLUGIN_NAME3 || p.startsWith(`${PLUGIN_NAME3}@`));
      if (tuiIdx >= 0) {
        const tuiEntry = tuiPlugins[tuiIdx];
        const tuiPinned = tuiEntry !== PLUGIN_NAME3 && tuiEntry !== PLUGIN_ENTRY_WITH_VERSION2 && /^@cortexkit\/opencode-magic-context@\d/.test(tuiEntry);
        if (tuiPinned && !options.force) {
          R2.warn(`TUI plugin pinned to ${tuiEntry} — use 'doctor --force' to upgrade`);
        } else if (tuiPinned && options.force) {
          tuiPlugins[tuiIdx] = PLUGIN_ENTRY_WITH_VERSION2;
          tuiConfig.plugin = tuiPlugins;
          writeFileSync4(paths.tuiConfig, `${import_comment_json3.stringify(tuiConfig, null, 2)}
`);
          R2.success(`Upgraded TUI plugin: ${tuiEntry} → ${PLUGIN_ENTRY_WITH_VERSION2}`);
          fixed++;
        } else {
          R2.success("TUI sidebar plugin configured");
        }
      } else {
        R2.success("TUI sidebar plugin configured");
      }
    } catch {
      R2.success("TUI sidebar plugin configured");
    }
  } else {
    R2.success("TUI sidebar plugin configured (tui.json created)");
  }
  if (existsSync7(paths.magicContextConfig)) {
    try {
      const mcRaw = readFileSync6(paths.magicContextConfig, "utf-8");
      const mcConfig = import_comment_json3.parse(mcRaw);
      const dreamerObj = mcConfig?.dreamer;
      const dreamerEnabled = dreamerObj?.enabled === true;
      const userMemObj = dreamerObj?.user_memories;
      const userMemEnabled = userMemObj?.enabled !== false;
      if (userMemEnabled && !dreamerEnabled) {
        R2.warn("dreamer.user_memories is enabled (default) but dreamer itself is disabled — user memory candidates will be collected but never promoted to stable memories. Enable `dreamer.enabled: true` or set `dreamer.user_memories.enabled: false` to silence this.");
        issues++;
      }
    } catch {}
  }
  const embeddingCheck = await checkEmbeddingConfig(paths.magicContextConfig);
  issues += embeddingCheck.issues;
  const cacheResult = await clearPluginCache(options.force);
  if (cacheResult.action === "cleared") {
    const versionInfo = cacheResult.cached ? ` (cached: ${cacheResult.cached}${cacheResult.latest ? `, latest: ${cacheResult.latest}` : ""})` : "";
    R2.success(`Cleared outdated plugin cache${versionInfo} — latest will download on restart`);
    R2.info(`  ${cacheResult.path}`);
    fixed++;
  } else if (cacheResult.action === "up_to_date") {
    R2.success(`Plugin cache up to date (v${cacheResult.cached})`);
  } else if (cacheResult.action === "error") {
    R2.warn(`Could not clear plugin cache: ${cacheResult.error}`);
    R2.info(`  Manually delete: ${cacheResult.path}`);
    issues++;
  } else {
    R2.success("Plugin cache clean (no cached version found)");
  }
  {
    const ageWarnings = [];
    const npmrcPath = join9(homedir6(), ".npmrc");
    if (existsSync7(npmrcPath)) {
      try {
        const npmrc = readFileSync6(npmrcPath, "utf-8");
        for (const line of npmrc.split(`
`)) {
          const trimmed = line.trim();
          if (trimmed.startsWith("#") || trimmed.startsWith(";"))
            continue;
          const [key] = trimmed.split("=").map((s) => s.trim());
          if (key === "min-release-age" || key === "before") {
            ageWarnings.push(`~/.npmrc has '${trimmed}'`);
          }
        }
      } catch {}
    }
    const bunfigPath = join9(homedir6(), ".bunfig.toml");
    if (existsSync7(bunfigPath)) {
      try {
        const bunfig = readFileSync6(bunfigPath, "utf-8");
        for (const line of bunfig.split(`
`)) {
          const trimmed = line.trim();
          if (trimmed.startsWith("#"))
            continue;
          if (/minimumReleaseAge\s*=/.test(trimmed)) {
            ageWarnings.push(`~/.bunfig.toml has '${trimmed}'`);
          }
        }
      } catch {}
    }
    if (ageWarnings.length > 0) {
      R2.warn("Package manager min-release-age restriction detected — this can prevent OpenCode from installing the latest plugin version");
      for (const w of ageWarnings) {
        R2.info(`  ${w}`);
      }
      R2.info("  If the plugin stays on an old version after doctor --force, this is the likely cause.");
      R2.info("  Workaround: temporarily remove the restriction, restart OpenCode, then re-enable it.");
      issues++;
    }
  }
  const logPath = join9(tmpdir3(), "magic-context.log");
  if (existsSync7(logPath)) {
    const logStat = statSync2(logPath);
    const sizeKb = (logStat.size / 1024).toFixed(0);
    R2.info(`Log file: ${logPath} (${sizeKb} KB)`);
  } else {
    R2.info(`Log file: ${logPath} (not yet created)`);
  }
  const historianDumpDir = join9(tmpdir3(), "magic-context-historian");
  if (existsSync7(historianDumpDir)) {
    try {
      const dumps = readdirSync2(historianDumpDir).filter((f) => f.endsWith(".xml")).map((f) => ({
        name: f,
        mtime: statSync2(join9(historianDumpDir, f)).mtimeMs
      })).sort((a, b) => b.mtime - a.mtime);
      if (dumps.length > 0) {
        R2.warn(`Historian debug dumps: ${dumps.length} file(s) in ${historianDumpDir}`);
        for (const dump of dumps.slice(0, 3)) {
          const age = Math.round((Date.now() - dump.mtime) / 60000);
          const ageStr = age < 60 ? `${age}m ago` : `${Math.round(age / 60)}h ago`;
          R2.info(`  ${dump.name} (${ageStr})`);
        }
        if (dumps.length > 3) {
          R2.info(`  ... and ${dumps.length - 3} more`);
        }
      }
    } catch {}
  }
  if (paths.omoConfig) {
    R2.info(`OMO config found: ${paths.omoConfig}`);
  }
  console.log("");
  if (issues === 0 && fixed === 0) {
    Gt("Everything looks good! ✨");
  } else if (issues > 0 && fixed > 0) {
    Gt(`Found ${issues} issue(s), fixed ${fixed}. Restart OpenCode to apply.`);
  } else if (fixed > 0) {
    Gt(`Fixed ${fixed} issue(s). Restart OpenCode to apply.`);
  } else {
    Gt(`Found ${issues} issue(s) that need manual attention.`);
    return 1;
  }
  return 0;
}

// src/cli/setup.ts
var import_comment_json4 = __toESM(require_src2(), 1);
import { existsSync as existsSync8, mkdirSync as mkdirSync3, readFileSync as readFileSync7, writeFileSync as writeFileSync5 } from "node:fs";
import { dirname as dirname4 } from "node:path";
var PLUGIN_NAME4 = "@cortexkit/opencode-magic-context";
var PLUGIN_ENTRY2 = "@cortexkit/opencode-magic-context@latest";
function ensureDir(dir) {
  if (!existsSync8(dir)) {
    mkdirSync3(dir, { recursive: true });
  }
}
function readJsonc(path2) {
  const content = readFileSync7(path2, "utf-8");
  try {
    return import_comment_json4.parse(content);
  } catch (err) {
    console.error(`  ⚠ Failed to parse ${path2}: ${err instanceof Error ? err.message : err}`);
    return null;
  }
}
function addPluginToOpenCodeConfig(configPath, format) {
  ensureDir(dirname4(configPath));
  if (format === "none") {
    const config = {
      plugin: [PLUGIN_ENTRY2],
      compaction: { auto: false, prune: false }
    };
    writeFileSync5(configPath, `${import_comment_json4.stringify(config, null, 2)}
`);
    return;
  }
  const existing = readJsonc(configPath);
  if (!existing) {
    R2.warn(`Could not parse ${configPath} — skipping to avoid data loss`);
    return;
  }
  const plugins = existing.plugin ?? [];
  const hasPlugin = plugins.some((p) => p === PLUGIN_NAME4 || p.startsWith(`${PLUGIN_NAME4}@`));
  if (!hasPlugin) {
    plugins.push(PLUGIN_ENTRY2);
  }
  existing.plugin = plugins;
  const compaction = existing.compaction ?? {};
  compaction.auto = false;
  compaction.prune = false;
  existing.compaction = compaction;
  writeFileSync5(configPath, `${import_comment_json4.stringify(existing, null, 2)}
`);
}
function addPluginToTuiConfig(configPath, format) {
  ensureDir(dirname4(configPath));
  if (format === "none") {
    writeFileSync5(configPath, `${import_comment_json4.stringify({ plugin: [PLUGIN_ENTRY2] }, null, 2)}
`);
    return;
  }
  const existing = readJsonc(configPath);
  if (!existing) {
    R2.warn(`Could not parse ${configPath} — skipping to avoid data loss`);
    return;
  }
  const plugins = existing.plugin ?? [];
  const hasPlugin = plugins.some((p) => p === PLUGIN_NAME4 || p.startsWith(`${PLUGIN_NAME4}@`));
  if (!hasPlugin) {
    plugins.push(PLUGIN_ENTRY2);
  }
  existing.plugin = plugins;
  writeFileSync5(configPath, `${import_comment_json4.stringify(existing, null, 2)}
`);
}
function writeMagicContextConfig(configPath, options) {
  const config = (existsSync8(configPath) ? readJsonc(configPath) : null) ?? {};
  if (!config.$schema) {
    config.$schema = "https://raw.githubusercontent.com/cortexkit/opencode-magic-context/master/assets/magic-context.schema.json";
  }
  if (options.historianModel) {
    const historian = config.historian ?? {};
    historian.model = options.historianModel;
    config.historian = historian;
  }
  if (options.dreamerEnabled) {
    const dreamer = config.dreamer ?? {};
    dreamer.enabled = true;
    if (options.dreamerModel) {
      dreamer.model = options.dreamerModel;
    }
    config.dreamer = dreamer;
  } else {
    const dreamer = config.dreamer ?? {};
    dreamer.enabled = false;
    config.dreamer = dreamer;
  }
  if (options.sidekickEnabled) {
    const sidekick = config.sidekick ?? {};
    sidekick.enabled = true;
    if (options.sidekickModel) {
      sidekick.model = options.sidekickModel;
    }
    config.sidekick = sidekick;
  }
  if (options.claudeMax) {
    const cacheTtl = config.cache_ttl ?? {};
    if (!cacheTtl.default)
      cacheTtl.default = "5m";
    cacheTtl["anthropic/claude-sonnet-4-6"] = "59m";
    cacheTtl["anthropic/claude-opus-4-6"] = "59m";
    config.cache_ttl = cacheTtl;
  }
  writeFileSync5(configPath, `${import_comment_json4.stringify(config, null, 2)}
`);
}
async function runSetup() {
  Wt2("Magic Context — Setup");
  const s = be();
  s.start("Checking OpenCode installation");
  const installed = isOpenCodeInstalled();
  if (!installed) {
    s.stop("OpenCode not found");
    const shouldContinue = await confirm("OpenCode not found on PATH. Continue setup anyway?", false);
    if (!shouldContinue) {
      R2.info("Install OpenCode: https://opencode.ai");
      Gt("Setup cancelled");
      return 1;
    }
  } else {
    const version = getOpenCodeVersion();
    s.stop(`OpenCode ${version ?? ""} detected`);
  }
  s.start("Fetching available models");
  const allModels = installed ? getAvailableModels() : [];
  if (allModels.length > 0) {
    s.stop(`Found ${allModels.length} models`);
  } else {
    s.stop("No models found");
    R2.warn("You can configure models manually in magic-context.jsonc later");
  }
  const paths = detectConfigPaths();
  const hadExistingSetup = paths.opencodeConfigFormat !== "none" || existsSync8(paths.magicContextConfig) || paths.tuiConfigFormat !== "none";
  addPluginToOpenCodeConfig(paths.opencodeConfig, paths.opencodeConfigFormat);
  R2.success(`Plugin added to ${paths.opencodeConfig}`);
  R2.info("Disabled built-in compaction (auto=false, prune=false)");
  R2.message("Magic Context handles context management — built-in compaction would interfere");
  if (paths.opencodeConfigFormat !== "none") {
    const ocConfig = readJsonc(paths.opencodeConfig);
    if (ocConfig) {
      const plugins = ocConfig.plugin ?? [];
      const dcpIndex = plugins.findIndex((p) => p.startsWith("@tarquinen/opencode-dcp"));
      if (dcpIndex !== -1) {
        R2.warn(`Found conflicting plugin: ${plugins[dcpIndex]}`);
        R2.message(`opencode-dcp (Dynamic Context Pruning) and Magic Context both manage context.
` + "Running both simultaneously will cause unpredictable behavior.");
        const shouldRemove = await confirm("Remove opencode-dcp from your config?", true);
        if (shouldRemove) {
          plugins.splice(dcpIndex, 1);
          ocConfig.plugin = plugins;
          writeFileSync5(paths.opencodeConfig, `${import_comment_json4.stringify(ocConfig, null, 2)}
`);
          R2.success("Removed opencode-dcp from plugin list");
        } else {
          R2.warn("Skipped — you may experience context management conflicts");
        }
      }
    }
  }
  if (hadExistingSetup) {
    const conflicts = detectConflicts(process.cwd());
    if (conflicts.hasConflict) {
      R2.warn("Found conflicting configuration that can disable Magic Context:");
      for (const reason of conflicts.reasons) {
        R2.message(`  • ${reason}`);
      }
      const shouldFixConflicts = await confirm("Apply automatic conflict fixes to your OpenCode and OMO config files?", true);
      if (shouldFixConflicts) {
        const actions = fixConflicts(process.cwd(), conflicts.conflicts);
        if (actions.length > 0) {
          for (const action of actions) {
            R2.success(action);
          }
        } else {
          R2.info("No additional conflict changes were needed");
        }
      } else {
        R2.warn("Skipped automatic conflict fixes — Magic Context may remain disabled");
      }
    }
  }
  let historianModel = null;
  if (allModels.length > 0) {
    const historianOptions = buildModelSelection(allModels, "historian");
    if (historianOptions.length > 0) {
      historianModel = await selectOne("Select a model for historian (background context compressor)", historianOptions);
      R2.success(`Historian: ${historianModel}`);
    } else {
      R2.info("No suitable historian models found — using built-in fallback chain");
    }
  } else {
    R2.info("Skipping model selection — using built-in fallback chain");
  }
  R2.message("The dreamer runs overnight to consolidate and maintain project memories.");
  const dreamerEnabled = await confirm("Enable dreamer?", true);
  let dreamerModel = null;
  if (dreamerEnabled && allModels.length > 0) {
    const dreamerOptions = buildModelSelection(allModels, "dreamer");
    if (dreamerOptions.length > 0) {
      dreamerModel = await selectOne("Select a model for dreamer (runs in background, local LLMs ideal)", dreamerOptions);
      R2.success(`Dreamer: ${dreamerModel}`);
    } else {
      R2.info("No suitable dreamer models — using built-in fallback chain");
    }
  } else if (dreamerEnabled) {
    R2.info("Using built-in fallback chain for dreamer");
  }
  R2.message("Sidekick augments prompts with project context via /ctx-aug command.");
  const sidekickEnabled = await confirm("Enable sidekick?", false);
  let sidekickModel = null;
  if (sidekickEnabled && allModels.length > 0) {
    const sidekickOptions = buildModelSelection(allModels, "sidekick");
    if (sidekickOptions.length > 0) {
      sidekickModel = await selectOne("Select a model for sidekick (fast models preferred)", sidekickOptions);
      R2.success(`Sidekick: ${sidekickModel}`);
    } else {
      R2.info("No suitable sidekick models — using built-in fallback chain");
    }
  } else if (sidekickEnabled) {
    R2.info("Using built-in fallback chain for sidekick");
  }
  const hasAnthropic = allModels.some((m) => m.startsWith("anthropic/"));
  let claudeMax = false;
  if (hasAnthropic) {
    R2.message(`Claude Max/Pro subscribers get extended prompt caching (up to 1 hour).
` + "This lets Magic Context defer context operations much longer, saving money.");
    claudeMax = await confirm("Do you have a Claude Max or Pro subscription?", false);
    if (claudeMax) {
      R2.success("Cache TTL set to 59m for Anthropic models");
    }
  }
  writeMagicContextConfig(paths.magicContextConfig, {
    historianModel,
    dreamerEnabled,
    dreamerModel,
    sidekickEnabled,
    sidekickModel,
    claudeMax
  });
  R2.success(`Config written to ${paths.magicContextConfig}`);
  addPluginToTuiConfig(paths.tuiConfig, paths.tuiConfigFormat);
  R2.success("TUI sidebar plugin added to tui.json");
  if (paths.omoConfig && !hadExistingSetup) {
    R2.warn(`Found oh-my-opencode config: ${paths.omoConfig}`);
    R2.message(`These hooks may conflict:
` + `  • context-window-monitor
` + `  • preemptive-compaction
` + "  • anthropic-context-window-limit-recovery");
    const shouldDisable = await confirm("Disable these hooks in oh-my-opencode?", true);
    if (shouldDisable) {
      const actions = fixConflicts(process.cwd(), {
        compactionAuto: false,
        compactionPrune: false,
        dcpPlugin: false,
        omoPreemptiveCompaction: true,
        omoContextWindowMonitor: true,
        omoAnthropicRecovery: true
      });
      if (actions.includes("Disabled conflicting oh-my-opencode hooks")) {
        R2.success("Hooks disabled in oh-my-opencode config");
      }
    } else {
      R2.warn("Skipped — you may experience context management conflicts");
    }
  }
  const summary = [
    `Plugin: ${PLUGIN_NAME4}`,
    "Compaction: disabled",
    historianModel ? `Historian: ${historianModel}` : "Historian: fallback chain",
    dreamerEnabled ? `Dreamer: enabled${dreamerModel ? ` (${dreamerModel})` : ""}` : "Dreamer: disabled",
    sidekickEnabled ? `Sidekick: enabled${sidekickModel ? ` (${sidekickModel})` : ""}` : "Sidekick: disabled"
  ].join(`
`);
  Vt2(summary, "Configuration");
  const shouldStar = await confirm("★ Star the repo on GitHub?", true);
  if (shouldStar) {
    try {
      const { execSync: execSync3 } = await import("node:child_process");
      execSync3("gh api --silent --method PUT /user/starred/cortexkit/opencode-magic-context", { stdio: "ignore", timeout: 1e4 });
      R2.success("Thanks for starring! ★");
    } catch {
      R2.info(`Couldn't star automatically. You can star manually:
  https://github.com/cortexkit/opencode-magic-context`);
    }
  }
  Gt("Run 'opencode' to start!");
  return 0;
}

// src/cli/index.ts
var command = process.argv[2];
if (command === "setup") {
  runSetup().then((code) => process.exit(code));
} else if (command === "doctor") {
  const force = process.argv.includes("--force");
  const issue = process.argv.includes("--issue");
  runDoctor({ force, issue }).then((code) => process.exit(code));
} else {
  console.log("");
  console.log("  Magic Context CLI");
  console.log("  ─────────────────");
  console.log("");
  console.log("  Commands:");
  console.log("    setup            Interactive setup wizard (first-time install)");
  console.log("    doctor           Check and fix configuration issues");
  console.log("    doctor --force   Force clear plugin cache (fixes broken dependencies)");
  console.log("    doctor --issue   Collect diagnostics and open a GitHub issue");
  console.log("");
  console.log("  Usage:");
  console.log("    bunx --bun @cortexkit/opencode-magic-context@latest setup");
  console.log("    bunx --bun @cortexkit/opencode-magic-context@latest doctor");
  console.log("    bunx --bun @cortexkit/opencode-magic-context@latest doctor --issue");
  console.log("");
  process.exit(command ? 1 : 0);
}
