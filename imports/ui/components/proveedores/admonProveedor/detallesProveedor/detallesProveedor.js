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
                return DatosFiscales.findOne({});
            }
        });
    }

    cerrar(){
        this.dismiss();
    }

}

const name = 'detallesProveedor';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: DetallesProveedor
    }).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.preoveedores.admon.detalles.', {
            url: '/detalles',
            template: '<detalles-preoveedor></detalles-preoveedor>',
            abstract: true
        });
}