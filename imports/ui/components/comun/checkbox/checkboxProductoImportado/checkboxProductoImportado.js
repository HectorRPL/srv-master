/**
 * Created by Héctor on 11/03/2017.
 */
import "./checkboxProductoImportado.html";

class CheckboxProductoImportado{
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }
}

const name = 'checkboxProductoImportado';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/checkbox/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            importado: '='

        },
        controller: CheckboxProductoImportado
    });