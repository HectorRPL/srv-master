/**
 * Created by Héctor on 11/03/2017.
 */
import "./metrosCuadrados.html";

class MetrosCuadrados {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }
}

const name = 'metrosCuadrados';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/inputs/number/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            metros: '='
        },
        controller: MetrosCuadrados
    });