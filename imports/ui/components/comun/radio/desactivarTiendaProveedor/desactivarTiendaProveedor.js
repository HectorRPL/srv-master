/**
 * Created by Héctor on 10/07/2017.
 */
import template from "./desactivarTiendaProveedor.html";

class desactivarTiendaProveedor {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }
}

const name = 'desactivarTiendaProveedor';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        bindings: {
            dato: '='
        },
        controller: desactivarTiendaProveedor
    });