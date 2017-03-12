/**
 * Created by Héctor on 11/03/2017.
 */
import "./colorProducto.html";

class ColorProducto {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'colorProducto';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/inputs/text/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            color: '='
        },
        controller: ColorProducto
    });