/**
 * Created by Héctor on 11/07/2017.
 */
import {Empleados} from "../../../../../../../api/empleados/collection";
import {actualizarEmpleado} from "../../../../../../../api/empleados/methods";
import {name as FormaDatosPersonales} from "../../../../../comun/formas/formaDatosPersonales/formaDatosPersonales";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
import template from "./editarEmpleadoGenerales.html";

class EditarEmpleadoGenerales {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this._id = $stateParams.empleadoId;

        this.tipoMsj = '';

        this.subscribe('empleados.porTienda', () => [{_id: this.empleadoId}]);
        this.helpers({
            empleado(){
                return Empleados.findOne({_id: this._id}) || {};
            }
        });
    }

    actualizarDatosGenerales() {
        delete this.empleado.fechaCreacion;
        delete this.empleado.activo;
        delete this.empleado.noEmpleado;
        delete this.empleado.propietarioId;
        delete this.empleado.tiendaId;
        delete this.empleado.nombreCompleto;
        delete this.empleado.departamentoId;

        console.log('[23] Esto es lo que vamos a enviar', this.empleado);

        actualizarEmpleado.callPromise(this.empleado).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            ;
        })).catch(this.$bindToContext((err) => {
            console.log(err);
            this.tipoMsj = 'danger';
        }));
    }

}

const name = 'editarEmpleadoGenerales';

export default angular
    .module(name, [
        FormaDatosPersonales,
        Alertas
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EditarEmpleadoGenerales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.empleados.editar.generales', {
            url: '/generales',
            template: '<editar-empleado-generales></editar-empleado-generales>'
        });
}