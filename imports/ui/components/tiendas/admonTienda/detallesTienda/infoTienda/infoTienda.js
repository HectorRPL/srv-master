/**
 * Created by Héctor on 17/07/2017.
 */
import {Tiendas} from "../../../../../../api/catalogos/tiendas/collection";
import {DatosFiscales} from "../../../../../../api/datosFiscales/collection";
import template from "./infoTienda.html";

class InfoTienda {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tiendaId = $stateParams.tiendaId;


        this.tienda = {};

        this.subscribe('tiendas.todas', () => [{_id: this.tiendaId}]);
        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this.tiendaId});
            }
        });

        this.subscribe('datosFiscales.proveedor', () => [{propietarioId: this.getReactively('resolve.tienda._id')}]);
        this.helpers({
            datosFiscales(){
                return DatosFiscales.findOne({});
            }
        });

    }


}

const name = 'infoTienda';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: InfoTienda
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.detalles.info', {
            url: '/info',
            template: '<info-tienda></info-tienda>'
        });
}
