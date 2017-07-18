/**
 * Created by Héctor on 17/07/2017.
 */
import {Proveedores} from "../../../../../../api/catalogos/proveedores/collection";
import {DatosFiscales} from "../../../../../../api/datosFiscales/collection";
import template from "./infoProveedor.html";

class InfoProveedor {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.proveedorId = $stateParams.proveedorId;


        this.proveedor = {};

        this.subscribe('proveedores.todos', () => [{_id: this.proveedorId}]);
        this.helpers({
            proveedor(){
                return Proveedores.findOne({_id: this.proveedorId});
            }
        });

        this.subscribe('datosFiscales.proveedor', () => [{propietarioId: this.getReactively('proveedor._id')}]);
        this.helpers({
            datosFiscales(){
                return DatosFiscales.findOne({});
            }
        });

    }


}

const name = 'infoProveedor';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: InfoProveedor
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.admon.detalles.info', {
            url: '/info',
            template: '<info-proveedor></info-proveedor>'
        });
}
