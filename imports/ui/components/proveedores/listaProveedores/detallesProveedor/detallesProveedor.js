/**
 * Created by Héctor on 03/07/2017.
 */
import template from "./detallesProveedor.html";
import {DatosFiscales} from "../../../../../api/datosFiscales/collection";

class DetallesProveedor {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.subscribe('datosFiscales.proveedor', () => [{propietarioId: this.getReactively('resolve.proveedor._id')}]);
        this.helpers({
            datosFiscales(){
                console.log('TRÁEME ALGO WEEEEEEE', DatosFiscales.findOne({}));
                return DatosFiscales.findOne({});
            }
        });
    }

    cerrar(){
        console.log(this.resolve);
        this.dismiss();
    }

}

const name = 'detallesProveedor';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: DetallesProveedor,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });