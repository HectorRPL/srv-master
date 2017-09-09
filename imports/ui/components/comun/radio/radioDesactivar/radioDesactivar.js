/**
 * Created by Héctor on 10/07/2017.
 */
import template from "./radioDesactivar.html";

class radioDesactivar {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }
}

const name = 'radioDesactivar';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        bindings: {
            dato: '='
        },
        controller: radioDesactivar
    });