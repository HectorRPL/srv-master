/**
 * Created by Héctor on 25/07/2017.
 */
import {Tiendas} from "../../../../../api/catalogos/tiendas/collection";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaEditarDatosFiscales} from "../../../comun/formas/formaEditarDatosFiscales/formaEditarDatosFiscales";
import {name as FormaDatosFiscales} from "../../../comun/formas/formaDatosFiscales/formaDatosFiscales";
import template from "./editarTiendaDatosFiscales.html";

class EditarTiendaDatosFiscales {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.direccion = {};

        this.tiendaId = $stateParams.tiendaId;

        this.tipoMsj = '';

        this.subscribe('tiendas.todas', () => [{_id: this.tiendaId}]);
        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this.tiendaId});
            }
        });
    }
}

const name = 'editarTiendaDatosFiscales';

export default angular
    .module(name, [
        Alertas,
        FormaEditarDatosFiscales,
        FormaDatosFiscales
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EditarTiendaDatosFiscales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.editar.fiscales', {
            url: '/datosFiscales',
            template: '<editar-tienda-datos-fiscales></editar-tienda-datos-fiscales>'
        });
}