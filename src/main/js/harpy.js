var Harpy = (function() {

    var $harpy = {};

    function register(module) {
        $harpy[module] = (typeof Harpy[module] === "function" ? Harpy[module]($harpy) : Harpy[module]);
        return $harpy[module];
    }

    function privatise(module) {
        register(module);
        Harpy[module] = null;
        delete Harpy[module];
    }

    function publicise(module) {
        Harpy[module] = register(module);
    }

    function init() {
        privatise("util");
        privatise("render");
        privatise("harpify");
        publicise("Viewer");
        publicise("Comparator");
        Harpy.init = null;
        delete Harpy.init;
    }

    return {
        Viewer : null,
        Comparator : null,
        init : init
    };

}());
