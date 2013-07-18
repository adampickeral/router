var Router = function (globals) {
  this.globals_ = globals;
  this.routes_ = {};
};

Router.prototype.init = function () {
  window.onhashchange = this.route.bind(this);
  this.route();
};

Router.prototype.addRoute = function (route, callback, defaultRoute, optionalScope) {
  var scope;

  scope = optionalScope || callback;
  this.routes_[route] = { cback: callback, context: scope };
  if (defaultRoute) {
    this.routes_['_default'] = { cback: callback, context: scope };
  }
};

Router.prototype.route = function () {
  var hash, routeCallback, scope;

  hash = this.getLocationHash_();
  route = this.routes_[hash];

  if (!route) {
    route = this.routes_['_default'];
  }

  routeCallback = route.cback;
  scope = route.context;
  routeCallback.apply(scope);
};

Router.prototype.getLocationHash_ = function () {
  return this.globals_.location.hash.substr(this.globals_.location.hash.indexOf('#') + 1);
};

Router.prototype.globals_ = null;
Router.prototype.routes_ = null;
