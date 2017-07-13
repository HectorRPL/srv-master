/**
 * Created by Héctor on 11/07/2017.
 */
import template from "./editarEmpleadoGenerales.html";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
import {name as FormaDatosGenerales} from "../../../../../comun/formas/formaDatosGenerales/formaDatosGenerales";
// import {cambiosEmpleados} from "../../../../../../../api/empleados/methods";
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
            empleados(){
                this.datosEmpleadoNuevo = Empleados.findOne({_id: this._id});
                return angular.copy(this.datosEmpleadoNuevo);
            }
        });
    }

    editar() {
        this.ocultarBoton = true;
    }

    limpiarCampos(editarEmpleadoGeneralesForm) {
        this.datosEmpleadoNuevo = {};
        editarEmpleadoGeneralesForm.$setPristine();
    }

    actualizarDatosGenerales(editarEmpleadoGeneralesForm) {
        delete this.datosEmpleadoNuevo.cuentaContable;
        delete this.datosEmpleadoNuevo.fechaCreacion;
        delete this.datosEmpleadoNuevo._id;
        delete this.datosEmpleadoNuevo.activo;
        delete this.datosEmpleadoNuevo.dias;
        delete this.datosEmpleadoNuevo.tiendaMatrizId;

        this.datosEmpleadoNuevo._id = this._id;

        /*
        cambiosEmpleados.callPromise(this.datosEmpleadoNuevo).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(editarEmpleadoGeneralesForm);
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
        */
    }
}

const name = 'editarEmpleadoGenerales';

export default angular
    .module(name, [
        Alertas,
        FormaDatosGenerales
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