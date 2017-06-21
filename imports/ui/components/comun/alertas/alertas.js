/**
 * Created by jvltmtz on 8/12/16.
 */
import angular from 'angular';
import './alertas.html';

class Alertas {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.dangerMsj = 'Error al realizar la operación.';
        this.successMsj = 'Éxito al realizar la operación.'
    }
}

const name = 'alertas';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            mensaje: '<',
            tipo: '='
        },
        controller: Alertas
    });
