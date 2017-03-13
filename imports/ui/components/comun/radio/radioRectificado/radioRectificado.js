/**
 * Created by Héctor on 13/03/2017.
 */
import "./radioRectificado.html";

class RadioRectificado{
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }
}

const name = 'radioRectificado';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/radio/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            rectificado: '='

        },
        controller: RadioRectificado
    });