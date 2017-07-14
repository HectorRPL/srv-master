/**
 * Created by Héctor on 10/07/2017.
 */
import template from "./detallesTienda.html";
import {DatosFiscales} from "../../../../../api/datosFiscales/collection";

class DetallesTienda {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.subscribe('datosFiscales.proveedor', () => [{propietarioId: this.getReactively('resolve.tienda._id')}]);
        this.helpers({
            datosFiscales(){
                return DatosFiscales.findOne({});
            }
        });
    }

    cerrar(){
        this.dismiss();
    }

}

const name = 'detallesTienda';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: DetallesTienda,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });