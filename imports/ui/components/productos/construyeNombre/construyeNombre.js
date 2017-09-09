/**
 * Created by Héctor on 11/03/2017.
 */
import template from "./construyeNombre.html";

class ConstruyeNombre {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }
}

const name = 'construyeNombre';

// módulo
export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        bindings: {
            producto: '<',
            nombremarca: '<'

        },
        controller: ConstruyeNombre
    });