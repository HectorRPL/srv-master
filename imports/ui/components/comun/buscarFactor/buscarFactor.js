/**
 * Created by Héctor on 14/06/2017.
 */
import {obtenerFactores} from "../../../../api/factores/methods"
import "./buscarFactor.html";

class BuscarFactor {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

    }

    buscarFactor(valor) {
        return obtenerFactores.callPromise({factor: valor}).then(function (result) {
            return result;
        });
    }

}

const name = 'buscarFactor';

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/${name}/${name}.html`,
        controllerAs: name,
        controller: BuscarFactor,
        bindings: {
            factor: '='
        },
    });


