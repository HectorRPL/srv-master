/**
 * Created by Héctor on 11/07/2017.
 */
import template from "./detallesPersonal.html";
import {Direcciones} from "../../../../../../../api/direcciones/collection";

class DetallesPersonal {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        // /*
        this.subscribe('direcciones.todas', () => [{propietarioId: this.getReactively('resolve.personal._id')}]);
        this.helpers({
            direccion() {
                console.log('[19] deberías traer la direccion', Direcciones.findOne({}));
                return Direcciones.findOne({});
            }
        });
         // */
    }

    cerrar(){
        this.dismiss();
    }
}

const name = 'detallesPersonal';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: DetallesPersonal,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });