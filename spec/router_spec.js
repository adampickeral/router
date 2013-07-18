describe('Router', function () {
  var router, location, globals, defaultRoute, otherRoute;

  beforeEach(function () {
    location = {};
    globals = {
      location: {
        hash: ''
      }
    };
    defaultRoute = jasmine.createSpy('defaultRoute');
    
    otherRoute = jasmine.createSpy('otherRoute');
    
    router = new Router(globals);
    router.addRoute('routeDefault', defaultRoute, true);
    router.addRoute('otherRoute', otherRoute);
  });

  describe('route', function () {
    it('invokes the callback for the specified route', function () {
      globals.location.hash = '#routeDefault';

      router.route();

      expect(defaultRoute).toHaveBeenCalled();
    });

    it('invokes the default route if a route for the hash cannot be found', function () {
      globals.location.hash = '#sldjf';

      router.route();

      expect(defaultRoute).toHaveBeenCalled();
    });

    it('invokes the default route if the hash is empty', function () {
      globals.location.hash = '';

      router.route();

      expect(defaultRoute).toHaveBeenCalled();
    });

    it('invokes the callback for the specified route that is not the default route', function () {
      globals.location.hash = '#otherRoute';

      router.route();

      expect(otherRoute).toHaveBeenCalled();
    });

    it('invokes the callback with the scope of the callback if no scope is specified', function () {
      globals.location.hash = '#otherRoute';

      spyOn(otherRoute, 'apply');

      router.route();

      expect(otherRoute.apply).toHaveBeenCalledWith(otherRoute);
    });

    it('invokes the callback with the provided scope if one is given', function () {
      var otherScope;

      otherScope = { scope: 'other scope' };
      router.addRoute('otherRoute', otherRoute, false, otherScope);
      spyOn(otherRoute, 'apply');

      globals.location.hash = '#otherRoute';

      router.route();

      expect(otherRoute.apply).toHaveBeenCalledWith(otherScope);
    });
  });

  describe('init', function () {
    it('routes to the default route when initialized', function () {
      router.init();

      expect(defaultRoute).toHaveBeenCalled();
    });

    it('routes when the location hash changes', function () {
      router.init();

      globals.location.hash = '#otherRoute';
      $(window).trigger('hashchange');

      expect(otherRoute).toHaveBeenCalled();
    });
  });
});
