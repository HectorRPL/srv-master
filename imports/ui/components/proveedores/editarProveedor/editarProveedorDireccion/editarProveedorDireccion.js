/**
 * Created by Héctor on 18/07/2017.
 */
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../../comun/formas/formaDireccion/formaDireccion";
import {cambiosDireccion} from "../../../../../api/direcciones/methods";
import {Direcciones} from "../../../../../api/direcciones/collection";
import template from "./editarProveedorDireccion.html";

class EditarProveedorDireccion {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.proveedorId;

        this.direccion = {};

        this.tipoMsj = '';

        /* TODO: Los códigos postales cada que no existe dirección, funciona cuando se captura algo en un input */
        this.subscribe('direcciones.todas', () => [{propietarioId: this.propietarioId}]);
        this.nuevaDireccion= {};
        this.helpers({
            direccion(){
                this.nuevaDireccion = Direcciones.findOne({propietarioId: this.propietarioId});
                return angular.copy(this.nuevaDireccion);
            }
        });
    }

    editar() {
        this.mostrarCampos = true;
    }

    actualizar() {
        this.tipoMsj = '';
        let direccionFinal = angular.copy(this.nuevaDireccion);
        delete direccionFinal.colonias;
        delete direccionFinal.fechaCreacion;

        cambiosDireccion.callPromise(direccionFinal).then(this.$bindToContext(()=> {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
    }

    limpiarCampos(editarProveedorDireccionFrm) {
        this.datosFiscalesOriginal = {};
        editarProveedorDireccionFrm.$setPristine();
    }
}

const name = 'editarProveedorDireccion';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion
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