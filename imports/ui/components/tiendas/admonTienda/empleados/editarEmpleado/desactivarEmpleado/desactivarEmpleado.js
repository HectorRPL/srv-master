/**
 * Created by Héctor on 12/07/2017.
 */
import template from "./desactivarEmpleado.html";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
// import {cambiosEmpleadosActivar} from "../../../../../../../api/empleados/methods";
// import {Empleados} from "../../../../../../../api/empleados/collection";

class DesactivarEmpleado {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.empleadoId;

        this.tipoMsj = '';

        /*
        this.subscribe('empleados.todos', () => [{_id: this.propietarioId}]);
        this.helpers({
            empleado(){
                return Empleados.findOne({_id: this.propietarioId});
            }
        });
         */
    }

    editar() {
        this.mostrarCampos = true;
    }

    limpiarCampos(desactivarEmpleadoForm) {
        this.datos = {};
        desactivarEmpleadoForm.$setPristine();
    }

    desactivar(desactivarEmpleadoForm) {
        this.datos._id = this.propietarioId;

        /*
        cambiosEmpleadosActivar.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(desactivarEmpleadoForm);
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
        */
    }

}

const name = 'desactivarEmpleado';

export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: DesactivarEmpleado
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.empleados.editar.desactivar', {
            url: '/:empleadoId/desactivar',
            template: '<desactivar-empleado></desactivar-empleado>'
        });
}
