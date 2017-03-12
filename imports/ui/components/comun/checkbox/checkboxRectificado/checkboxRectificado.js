/**
 * Created by Héctor on 11/03/2017.
 */
import "./checkboxRectificado.html";

class CheckboxRectificado{
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }
}

const name = 'checkboxRectificado';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/checkbox/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            rectificado: '='

        },
        controller: CheckboxRectificado
    });