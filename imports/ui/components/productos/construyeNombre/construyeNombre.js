/**
 * Created by Héctor on 11/03/2017.
 */
import "./construyeNombre.html";

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
        templateUrl: `imports/ui/components/productos/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            producto: '<'

        },
        controller: ConstruyeNombre
    });