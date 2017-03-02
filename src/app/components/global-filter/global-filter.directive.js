/*
    this is simply an example of a directive that
    conforms to the eslint style guide
    and not necessarily a baseline to follow
*/
(function () {

    "use strict";

    angular
        .module("va.challenge.frontend")
        .directive("globalFilterDirective", GlobalFilterDirective);

    /** @ngInject */
    function GlobalFilterDirective(nv, d3) {

        /*
            nv and d3 are defined in index.constants.js as
            injectible dependencies instead as window global
        */

        var config = {
            restrict: "E",
            templateUrl: "app/components/global-filter/global-filter.html",
            controller: GlobalFilterController,
            controllerAs: "vm",
            bindToController: true,
            scope: true,
            link: postLink
        };

        return config;

        function postLink(scope, iEl, iAttrs, vm) {

            var dataWatcher = scope.$watch("vm.apiParams.browser", doSomething);

            scope.$on("$destroy", destroyWatchers);

            function doSomething(newValue) {

                console.log("hi");

            }

            function destroyWatchers() {

                dataWatcher();

            }

        }

    }

    /** @ngInject */
    function GlobalFilterController(MockAPI) {

        var vm = this;
        vm.apiParams = {
            browser: {}
        };

        // stubbed function to retrieve data
        function getData() {
            MockAPI.get({
                browser: Object.keys(vm.apiParams.browser)
            })
            .then(function (data) {

                vm.data = data;

            });
        };

        getData();

        vm.toggleBrowser = function (toggledBrowser) {

            if (toggledBrowser in this.apiParams.browser) {

                delete this.apiParams.browser[toggledBrowser];
                getData();

            } else {

                vm.browser = toggledBrowser;
                this.apiParams.browser[toggledBrowser] = toggledBrowser;
                getData();

            }

        };

    }

})();
