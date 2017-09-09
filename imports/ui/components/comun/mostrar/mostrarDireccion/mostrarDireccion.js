/**
 * Created by Héctor on 18/07/2017.
 */
import template from "./mostrarDireccion.html";
import {Direcciones} from "../../../../../api/direcciones/collection";

class MostrarDireccion {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);


        this.subscribe('direcciones.todas', () => [{propietarioId: this.getReactively('propietarioId')}]);
        this.helpers({
            direccion(){
                return Direcciones.findOne({propietarioId: this.getReactively('propietarioId')});
            }
        });
    }
}

const name = 'mostrarDireccion';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: MostrarDireccion,
        bindings: {
            propietarioId: '<',
        }
    });