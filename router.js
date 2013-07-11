var Router = function (globals) {
  this.globals_ = globals;
  this.routes_ = {};
};

Router.prototype.init = function () {
  window.onhashchange = this.route.bind(this);
  this.route();
};

Router.prototype.addRoute = function (route, callback, defaultRoute) {
  this.routes_[route] = callback;
  if (defaultRoute) {
    this.routes_['_default'] = callback;
  }
};

Router.prototype.route = function () {
  var hash, routeCallback;

  hash = this.getLocationHash_();
  routeCallback = this.routes_[hash];
  if (routeCallback) {
    routeCallback.apply();
  } else {
    routeCallback = this.routes_['_default'];
    routeCallback.apply();
  }
};

Router.prototype.getLocationHash_ = function () {
  return this.globals_.location.hash.substr(this.globals_.location.hash.indexOf('#') + 1);
};

Router.prototype.globals_ = null;
Router.prototype.routes_ = null;
