/**
 * Created by Héctor on 14/06/2017.
 */
import {obtenerMarcas} from "../../../../api/catalogos/marcas/methods"
import "./buscarMarca.html";

class BuscarMarca {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

    }

    buscarMarca(valor) {
        return obtenerMarcas.callPromise({marca: valor}).then(function (result) {
            return result;
        });
    }

}

const name = 'buscarMarca';

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/${name}/${name}.html`,
        controllerAs: name,
        controller: BuscarMarca,
        bindings: {
            marca: '='
        },
    });

