/**
 * Created by Héctor on 18/07/2017.
 */
import {name as AltaDireccion} from "../../../comun/altasCambios/direccion/altaDireccion/altaDireccion";
import {name as CambiosDireccion} from "../../../comun/altasCambios/direccion/cambiosDireccion/cambiosDireccion";
import {Direcciones} from "../../../../../api/direcciones/collection";
import template from "./editarTiendaDireccion.html";

class EditarTiendaDireccion {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;

        $reactive(this).attach($scope);

        this.direccion = {};

        this.propietarioId = $stateParams.tiendaId;

        this.subscribe('direcciones.todas', () => [{propietarioId: this.propietarioId}]);
        this.helpers({
            direccionActual(){
                return Direcciones.findOne({propietarioId: this.propietarioId});
            }
        });

    }

    editar() {
        this.mostrarCampos = true;
        this.direccion = angular.copy(this.direccionActual);
    }
}

const name = 'editarTiendaDireccion';

export default angular
    .module(name, [
        AltaDireccion,
        CambiosDireccion
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarTiendaDireccion
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.editar.direccion', {
            url: '/direccion',
            template: '<editar-tienda-direccion></editar-tienda-direccion>'
        });
}