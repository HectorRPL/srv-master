/**
 * Created by Héctor on 12/07/2017.
 */
import {Empleados} from "../../../../../../../api/empleados/collection";
import {actualizarEmpldActiv} from "../../../../../../../api/empleados/methods";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
import template from "./desactivarEmpleado.html";

class DesactivarEmpleado {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.empleadoId = $stateParams.empleadoId;

        this.tipoMsj = '';

        this.subscribe('empleados.todos', () => [{_id: this.empleadoId}]);
        this.helpers({
            empleado(){
                return Empleados.findOne({_id: this.empleadoId});
            }
        });
    }

    editar() {
        this.mostrarCampos = true;
    }

    desactivar() {
        this.datos._id = this.empleadoId;

        actualizarEmpldActiv.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=> {
            console.log(err);
            this.tipoMsj = 'danger';
        }));
    }

}

const name = 'desactivarEmpleado';

export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: DesactivarEmpleado
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.empleados.editar.desactivar', {
            url: '/desactivar',
            template: '<desactivar-empleado></desactivar-empleado>'
        });
}
