this["Harpy"] = this["Harpy"] || {};
this["Harpy"]["Templates"] = this["Harpy"]["Templates"] || {};

this["Harpy"]["Templates"]["data"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\r\n    <tr data-id=\""
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.mimetype)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.cache)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.source)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.error)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n        <td>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n        <td data-field=\"method\" data-sort=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.request)),stack1 == null || stack1 === false ? stack1 : stack1.method)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.request)),stack1 == null || stack1 === false ? stack1 : stack1.method)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n        <td data-field=\"url\" data-sort=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"url\" title=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.trimmer || (depth0 && depth0.trimmer)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.url), 30, true, options) : helperMissing.call(depth0, "trimmer", ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.url), 30, true, options)))
    + "</td>\r\n        <td data-field=\"status\" data-sort=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.response)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" title=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.response)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.response)),stack1 == null || stack1 === false ? stack1 : stack1.statusText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.response)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n        <td data-field=\"type\" data-sort=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.mimetype)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" title=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.response)),stack1 == null || stack1 === false ? stack1 : stack1.content)),stack1 == null || stack1 === false ? stack1 : stack1.mimeType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.mimetype)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n        <td data-field=\"size\" data-sort=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.format || (depth0 && depth0.format)),stack1 ? stack1.call(depth0, ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.size), "size", options) : helperMissing.call(depth0, "format", ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.size), "size", options)))
    + "</td>\r\n        <td title=\"Blocked: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.blocked)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ms, DNS: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.dns)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ms, Connect: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.connect)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ms, Send: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.send)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ms, Wait: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.wait)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ms, Receive: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.receive)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ms\">";
  stack2 = self.invokePartial(partials.timeline, 'timeline', depth0, helpers, partials, data);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</td>\r\n    </tr>\r\n";
  return buffer;
  }

  buffer += "<thead>\r\n    <tr>\r\n        <th></th>\r\n        <th>Method</th>\r\n        <th>URL</th>\r\n        <th>Status</th>\r\n        <th>Type</th>\r\n        <th>Size</th>\r\n        <th class=\"timeline\">\r\n            <div class=\"loadMarker\" data-dom=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.log)),stack1 == null || stack1 === false ? stack1 : stack1.pages)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.time)),stack1 == null || stack1 === false ? stack1 : stack1.onContentLoad)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-page=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.log)),stack1 == null || stack1 === false ? stack1 : stack1.pages)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.time)),stack1 == null || stack1 === false ? stack1 : stack1.onLoad)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></div>\r\n        </th>\r\n    </tr>\r\n    <tr>\r\n        <td>&nbsp;</td>\r\n        <td><input data-field=\"method\" type=\"text\"/></td>\r\n        <td><input data-field=\"url\" type=\"text\"/></td>\r\n        <td><input data-field=\"status\" type=\"text\"/></td>\r\n        <td><input data-field=\"type\" type=\"text\"/></td>\r\n        <td><input data-field=\"size\" type=\"text\"/></td>\r\n        <td>&nbsp;</td>\r\n    </tr>\r\n</thead>\r\n<tbody>\r\n";
  stack2 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.log)),stack1 == null || stack1 === false ? stack1 : stack1.entries), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n</tbody>\r\n<tfoot>\r\n    <tr class=\"total\">\r\n        <td data-field=\"requests\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.log)),stack1 == null || stack1 === false ? stack1 : stack1.entries)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n        <td colspan=\"4\"></td>\r\n        <td data-field=\"size\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.format || (depth0 && depth0.format)),stack1 ? stack1.call(depth0, ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.log)),stack1 == null || stack1 === false ? stack1 : stack1.pages)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.size)),stack1 == null || stack1 === false ? stack1 : stack1.download), "size", options) : helperMissing.call(depth0, "format", ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.log)),stack1 == null || stack1 === false ? stack1 : stack1.pages)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.size)),stack1 == null || stack1 === false ? stack1 : stack1.download), "size", options)))
    + "</td>\r\n        <td>\r\n            (";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.format || (depth0 && depth0.format)),stack1 ? stack1.call(depth0, ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.log)),stack1 == null || stack1 === false ? stack1 : stack1.pages)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.size)),stack1 == null || stack1 === false ? stack1 : stack1.cache), "size", options) : helperMissing.call(depth0, "format", ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.log)),stack1 == null || stack1 === false ? stack1 : stack1.pages)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.size)),stack1 == null || stack1 === false ? stack1 : stack1.cache), "size", options)))
    + " from cache)\r\n            <span title=\"DOM: ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.format || (depth0 && depth0.format)),stack1 ? stack1.call(depth0, ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.log)),stack1 == null || stack1 === false ? stack1 : stack1.pages)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.time)),stack1 == null || stack1 === false ? stack1 : stack1.onContentLoad), "time", options) : helperMissing.call(depth0, "format", ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.log)),stack1 == null || stack1 === false ? stack1 : stack1.pages)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.time)),stack1 == null || stack1 === false ? stack1 : stack1.onContentLoad), "time", options)))
    + ", Page: ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.format || (depth0 && depth0.format)),stack1 ? stack1.call(depth0, ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.log)),stack1 == null || stack1 === false ? stack1 : stack1.pages)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.time)),stack1 == null || stack1 === false ? stack1 : stack1.onLoad), "time", options) : helperMissing.call(depth0, "format", ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.log)),stack1 == null || stack1 === false ? stack1 : stack1.pages)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.time)),stack1 == null || stack1 === false ? stack1 : stack1.onLoad), "time", options)))
    + "\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.format || (depth0 && depth0.format)),stack1 ? stack1.call(depth0, ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.log)),stack1 == null || stack1 === false ? stack1 : stack1.pages)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.time)),stack1 == null || stack1 === false ? stack1 : stack1.total), "time", options) : helperMissing.call(depth0, "format", ((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.log)),stack1 == null || stack1 === false ? stack1 : stack1.pages)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.time)),stack1 == null || stack1 === false ? stack1 : stack1.total), "time", options)))
    + "</span>\r\n        </td>\r\n    </tr>\r\n</tfoot>";
  return buffer;
  });

this["Harpy"]["Templates"]["info"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            <tr>\r\n                <td>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n                <td>";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.value); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n            </tr>\r\n        ";
  return buffer;
  }

  buffer += "<td></td>\r\n<td class=\"info\" colspan=\"6\">\r\n    <a href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.request)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\">\r\n        <strong>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.request)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong>\r\n    </a>\r\n    <br/>\r\n    "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.response)),stack1 == null || stack1 === false ? stack1 : stack1.content)),stack1 == null || stack1 === false ? stack1 : stack1.mimeType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n    <hr/>\r\n    <strong>Timings</strong>\r\n    <dl>\r\n        <dt>Blocked</dt>\r\n        <dd class=\"blocked\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.blocked)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ms</dd>\r\n        <dt>DNS</dt>\r\n        <dd class=\"dns\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.dns)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ms</dd>\r\n        <dt>Connect</dt>\r\n        <dd class=\"connect\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.connect)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ms</dd>\r\n        <dt>Send</dt>\r\n        <dd class=\"send\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.send)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ms</dd>\r\n        <dt>Wait</dt>\r\n        <dd class=\"wait\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.wait)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ms</dd>\r\n        <dt>Receive</dt>\r\n        <dd class=\"receive\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.receive)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ms</dd>\r\n    </dl>\r\n    <hr/>\r\n    <strong>Request headers</strong>\r\n    <table>\r\n        ";
  stack2 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.request)),stack1 == null || stack1 === false ? stack1 : stack1.headers), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n    </table>\r\n    <hr/>\r\n    <strong>Response headers</strong>\r\n    <table>\r\n        ";
  stack2 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.response)),stack1 == null || stack1 === false ? stack1 : stack1.headers), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\r\n    </table>\r\n    <hr/>\r\n</td>";
  return buffer;
  });

this["Harpy"]["Templates"]["timeline"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"blocked\" data-time=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.blocked)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-start=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.harpy_info)),stack1 == null || stack1 === false ? stack1 : stack1.startTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></div>\r\n<div class=\"dns\" data-time=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.dns)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></div>\r\n<div class=\"connect\" data-time=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.connect)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></div>\r\n<div class=\"send\" data-time=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.send)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></div>\r\n<div class=\"wait\" data-time=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.wait)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></div>\r\n<div class=\"receive\" data-time=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.timings)),stack1 == null || stack1 === false ? stack1 : stack1.receive)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></div>";
  return buffer;
  });