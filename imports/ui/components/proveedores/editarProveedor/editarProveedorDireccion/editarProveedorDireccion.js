/**
 * Created by Héctor on 25/07/2017.
 */
import {Direcciones} from "../../../../../api/direcciones/collection";
import {crearDireccion, actualizarDireccion} from "../../../../../api/direcciones/methods";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../../comun/formas/formaDireccion/formaDireccion";
import template from "./editarProveedorDireccion.html";

class EditarProveedorDireccion {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.proveedorId;

        this.subscribe('direcciones.todas', () => [{propietarioId: this.propietarioId}]);
        this.helpers({
            direccion(){
                return Direcciones.findOne({propietarioId: this.propietarioId}) || {};
            }
        });
    }

    guardarDireccion() {
        let direccionFinal = angular.copy(this.direccion);
        delete direccionFinal.colonias;
        direccionFinal.propietarioId = this.propietarioId;

        crearDireccion.callPromise(direccionFinal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }

    actualizarDireccion() {
        this.tipoMsj = '';
        let direccionFinal = angular.copy(this.direccion);
        delete direccionFinal.colonias;
        delete direccionFinal.fechaCreacion;

        actualizarDireccion.callPromise(direccionFinal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }
}
const name = 'editarProveedorDireccion';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion
    ])
    .component(name, {
        template: template.default,
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