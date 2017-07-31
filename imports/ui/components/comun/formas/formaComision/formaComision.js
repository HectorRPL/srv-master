/**
 * Created by Héctor on 24/07/2017.
 */
import template from "./formaComision.html";

class FormaComision {
    constructor($scope) {
        'ngInject';
        this.comision = {};
    }
}

const name = 'formaComision';

export default angular
    .module(name, [])
    .component(name, {
        template ,
        controllerAs: name,
        controller: FormaComision,
        bindings: {
            comision: '='
        }
    });