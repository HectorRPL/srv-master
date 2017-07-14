/**
 * Created by Héctor on 11/07/2017.
 */
import template from "./editarEmpleadoGenerales.html";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
import {cambiosEmpleados} from "../../../../../../../api/empleados/methods";
import {name as FormaDatosPersonales} from "../../../../../comun/formas/formaDatosPersonales/formaDatosPersonales";
import {Empleados} from "../../../../../../../api/empleados/collection";

class EditarEmpleadoGenerales {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this._id = $stateParams.empleadoId;

        this.tipoMsj = '';

        this.tienda = {};

        this.subscribe('empleados.porTienda', () => [{_id: this.empleadoId}]);
        this.datosEmpleadoNuevo = {};
        this.helpers({
            empleado(){
                this.datosEmpleadoNuevo = Empleados.findOne({_id: this._id});
                return angular.copy(this.datosEmpleadoNuevo);
            }
        });
    }

    editar() {
        this.mostrarCampos = true;
    }

    limpiarCampos(editarEmpleadoGeneralesForm) {
        this.datosEmpleadoNuevo = {};
        editarEmpleadoGeneralesForm.$setPristine();
    }

    actualizar(editarEmpleadoGeneralesForm) {
        delete this.datosEmpleadoNuevo.fechaCreacion;
        delete this.datosEmpleadoNuevo._id;
        delete this.datosEmpleadoNuevo.activo;
        delete this.datosEmpleadoNuevo.noEmpleado;
        delete this.datosEmpleadoNuevo.propietarioId;
        delete this.datosEmpleadoNuevo.tiendaId;
        delete this.datosEmpleadoNuevo.nombreCompleto;

        this.datosEmpleadoNuevo._id = this._id;

        cambiosEmpleados.callPromise(this.datosEmpleadoNuevo).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(editarEmpleadoGeneralesForm);
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'editarEmpleadoGenerales';

export default angular
    .module(name, [
        Alertas,
        FormaDatosPersonales
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarEmpleadoGenerales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.empleados.editar.generales', {
            url: '/:empleadoId/generales',
            template: '<editar-empleado-generales></editar-empleado-generales>'
        });
}