/**
 * Created by Héctor on 25/07/2017.
 */
import {name as AltaDireccion} from "../../../comun/altasCambios/direccion/altaDireccion/altaDireccion";
import {name as CambiosDireccion} from "../../../comun/altasCambios/direccion/cambiosDireccion/cambiosDireccion";
import {Direcciones} from "../../../../../api/direcciones/collection";
import template from "./editarProveedorDireccion.html";

class EditarProveedorDireccion {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;

        $reactive(this).attach($scope);

        this.direccion = {};

        this.propietarioId = $stateParams.proveedorId;

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

const name = 'editarProveedorDireccion';

export default angular
    .module(name, [
        AltaDireccion,
        CambiosDireccion
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarProveedorDireccion
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.editar.direccion', {
            url: '/direccion',
            template: '<editar-proveedor-direccion></editar-proveedor-direccion>'
        });
}