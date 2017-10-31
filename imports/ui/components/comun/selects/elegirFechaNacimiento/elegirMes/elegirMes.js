import {Meses} from "../../../../../../api/catalogos/fechaNacimiento/meses/collection";
import template from "./elegirMes.html";

class ElegirMes {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('meses');

        this.helpers({
            meses() {
                return Meses.find();
            }
        });
    }

}

const name = 'elegirMes';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        bindings: {
            mesId: '='
        },
        controller: ElegirMes
    });
