/**
 * Created by jvltmtz on 8/03/17.
 */
import template from "./tituloPrincipal.html";

class TituloPrincipal {
    constructor($scope, $reactive, $state) {
        'ngInject';
    }

}

const name = 'tituloPrincipal';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: TituloPrincipal,
        bindings: {
            titulo: '@'
        }
    });
