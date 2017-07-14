/**
 * Created by Héctor on 11/07/2017.
 */
import template from "./detallesEmpleados.html";
import {Direcciones} from "../../../../../../../api/direcciones/collection";

class DetallesEmpleados {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.subscribe('direcciones.todas', () => [{propietarioId: this.getReactively('resolve.empleado._id')}]);
        this.helpers({
            direccion() {
                return Direcciones.findOne({});
            }
        });
    }

    cerrar(){
        this.dismiss();
    }
}

const name = 'detallesEmpleados';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: DetallesEmpleados,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });