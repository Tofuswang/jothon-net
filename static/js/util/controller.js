// Generated by LiveScript 1.3.1
var controller;
controller = {
  modelWrap: function(node, data, dom){
    var name;
    name = node.getAttribute('data-model');
    dom.model[name] = node;
    data[name] = null;
    switch (node.nodeName.toLowerCase()) {
    case 'input':
      switch (node.getAttribute("type")) {
      case 'checkbox':
        return node.addEventListener('change', function(){
          return data[name] = this.checked;
        });
      default:
        return node.addEventListener('input', function(){
          return data[name] = this.value;
        });
      }
      break;
    case 'textarea':
      return node.addEventListener('input', function(){
        return data[name] = this.value;
      });
    }
  },
  rootWrap: function(cls, root, parent){
    var ref$, dom, data, nodes, i$, len$, it, node;
    ref$ = [
      {
        root: root,
        model: {},
        text: {}
      }, {}
    ], dom = ref$[0], data = ref$[1];
    nodes = root.querySelectorAll('*[data-dom]');
    for (i$ = 0, len$ = nodes.length; i$ < len$; ++i$) {
      it = nodes[i$];
      dom[it.getAttribute('data-dom')] = it;
    }
    nodes = root.querySelectorAll('*[data-model]');
    for (i$ = 0, len$ = nodes.length; i$ < len$; ++i$) {
      it = nodes[i$];
      this.modelWrap(it, data, dom);
    }
    nodes = root.querySelectorAll('*[data-text]');
    for (i$ = 0, len$ = nodes.length; i$ < len$; ++i$) {
      it = nodes[i$];
      dom.text[it.getAttribute('data-text')] = it;
    }
    node = new cls(dom, data, parent);
    return node.dom = dom, node.data = data, node;
  },
  register: function(cls, parent){
    var roots, root;
    roots = document.querySelectorAll("*[data-controller=" + cls.controller + "]");
    import$(cls.prototype, {
      fire: function(name, value){
        var i$, ref$, ref1$, len$, cb, results$ = [];
        for (i$ = 0, len$ = (ref$ = (ref1$ = this._handlers || (this._handlers = {}))[name] || (ref1$[name] = [])).length; i$ < len$; ++i$) {
          cb = ref$[i$];
          results$.push(cb(value));
        }
        return results$;
      },
      listen: function(name, cb){
        var ref$;
        return ((ref$ = this._handlers || (this._handlers = {}))[name] || (ref$[name] = [])).push(cb);
      },
      setText: function(name, value){
        return this.dom.text[name].innerText = value;
      },
      set: function(name, value){
        var node;
        this.data[name] = value;
        node = this.dom.model[name];
        switch (node.getAttribute("type")) {
        case 'checkbox':
          node.checked = !!value;
          break;
        default:
          node.value = value;
        }
        return this.fire(name, value);
      },
      get: function(name){
        return this.data[name];
      }
    });
    return (function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = roots).length; i$ < len$; ++i$) {
        root = ref$[i$];
        results$.push(this.rootWrap(cls, root, parent));
      }
      return results$;
    }.call(this));
  }
};
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}