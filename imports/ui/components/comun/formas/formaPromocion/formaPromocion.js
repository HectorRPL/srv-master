/**
 * Created by Héctor on 20/07/2017.
 */
import {name as EligeFechaInicioFin} from "../../selects/eligeFechaInicioFin/eligeFechaInicioFin";
import template from "./formaPromocion.html";

class FormaPromocion {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'formaPromocion';

export default angular
    .module(name, [
        EligeFechaInicioFin
    ])
    .component(name, {
        template,
        controllerAs: name,
        bindings: {
            promocion: '='
        },
        controller: FormaPromocion
    });