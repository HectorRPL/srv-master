/**
 * Created by Héctor on 11/03/2017.
 */
import {Marcas} from "../../../../../api/catalogos/marcas/collection";
import "./elegirMarca.html";

class ElegirMarca {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('marcas.todas');

        // this.marca = '';

        this.helpers({
            marcas() {
                return Marcas.find();
            }
        });

    }
}

const name = 'elegirMarca';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/selects/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            marca: '='
        },
        controller: ElegirMarca
    });
