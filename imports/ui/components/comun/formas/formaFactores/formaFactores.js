/**
 * Created by Héctor on 19/07/2017.
 */
import template from "./formaFactores.html";

class FormaFactores {
    constructor($scope) {
        'ngInject';
        this.factor = {};
    }
}

const name = 'formaFactores';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: FormaFactores,
        bindings: {
            factor: '='
        }
    });
