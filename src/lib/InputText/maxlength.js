// Clock 时钟控件
var CountValue = function (clock, params) {
  var defaults = {
    maxLengthAttr: "data-maxlength",
    defaultMaxLength: 20
    /*
    Callbacks:
    onInput:function(CountValue)
    onInputOut:function(CountValue)//文字超过限制
    onInputIn:function(CountValue)//文字未超过限制
    */
  }
  params = params || {};
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def];
    }
  }
  var s = this;
  //Params
  s.params = params;
  //Field(Element)
  s.field = typeof field === "string" ? document.querySelector(field) : field;
  //Maxlength(Number)
  s.maxLength = s.field.getAttribute(s.params.maxLengthAttr) || s.params.defaultMaxLength;
  s.destroy = function () {
    s.detach();
  }
  s.events = function (detach) {
    var action = detach ? "removeEventListener" : "addEventListener";
    s.field[action]("input", s.onInput, false);
  }
  s.attach = function (event) {
    s.events();
  }
  s.detach = function (event) {
    s.events(true);
  }
  s.onInput = function (e) {
    s.target = e.target;
    //Callback
    if (s.params.onInput) s.params.onInput(s);
    if (s.maxLength < s.target.value.length && s.params.onInputOut) {
      if (s.params.onInputOut) s.params.onInputOut(s);
    } else {
      if (s.params.onInputIn) s.params.onInputIn(s);
    }
  }
  //Init
  s.init = function () {
    s.attach();
  }
  s.init();
}
var CountValues = function (params) {
  params = params || {}
  var clockAttr = 'data-clock'
  var s = this
  s.countvalues = []
  var elements = document.querySelectorAll('[' + clockAttr + ']')
  s.update = function () {
    for (var i = 0; i < elements.length; i++) {
      params.time = elements[i].getAttribute(clockAttr)
      s.countvalues[i] = new CountValue(elements[i], params)
    }
  }
  s.update()
}

export { CountValues, CountValue }