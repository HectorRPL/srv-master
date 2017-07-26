/**
 * Created by Héctor on 25/07/2017.
 */
import {DatosFiscales} from "../../../../../api/datosFiscales/collection";
import {name as AltaDatosFiscales} from "../../../comun/altasCambios/datosFiscales/altaDatosFiscales/altaDatosFiscales";
import {name as CambiosDatosFiscales} from "../../../comun/altasCambios/datosFiscales/cambiosDatosFiscales/cambiosDatosFiscales";
import template from "./tiendaDatosFiscales.html";

class TiendaDatosFiscales {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.tiendaId;

        this.tipoMsj = '';

        this.muestrarDatosFiscales = false;
        this.mostrarCampos = false;

        this.subscribe('datosFiscales.proveedor', () => [{propietarioId: this.propietarioId}]);
        this.helpers({
            datosFiscalesActuales(){
                return DatosFiscales.findOne({propietarioId: this.propietarioId});
            }
        });

    }

    editar() {
        this.datosFiscales = angular.copy(this.datosFiscalesActuales);
        this.mostrarCampos = true;
    }

}

const name = 'tiendaDatosFiscales';

export default angular
    .module(name, [
        AltaDatosFiscales,
        CambiosDatosFiscales
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: TiendaDatosFiscales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.editar.fiscales', {
            url: '/datosFiscales',
            template: '<tienda-datos-fiscales></tienda-datos-fiscales>'
        });
}