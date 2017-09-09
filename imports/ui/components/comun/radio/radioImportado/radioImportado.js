/**
 * Created by Héctor on 13/03/2017.
 */
import template from "./radioImportado.html";

class RadioImportado{
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }
}

const name = 'radioImportado';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        bindings: {
            importado: '='

        },
        controller: RadioImportado
    });