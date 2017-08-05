/**
 * Created by Héctor on 04/08/2017.
 */
import {Empleados} from "../../../../../../../api/empleados/collection";
import {cambiosEmpleadosPuesto} from "../../../../../../../api/empleados/methods";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
import {name as ElegirDepartamento} from "../../../../../comun/selects/elegirDepartamento/elegirDepartamento";
import template from "./editarEmpleadoPuesto.html";

class EditarEmpleadoPuesto {
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

    editarEmpleadoPuesto() {
        let empleadoDatosFinales = {
            _id: this.empleado._id,
            departamentoId: this.empleado.departamentoId
        };
        cambiosEmpleadosPuesto.callPromise(empleadoDatosFinales).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            console.log(err);
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'editarEmpleadoPuesto';

export default angular
    .module(name, [
        Alertas,
        ElegirDepartamento
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarEmpleadoPuesto
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.empleados.editar.puesto', {
            url: '/:empleadoId/puesto',
            template: '<editar-empleado-puesto></editar-empleado-puesto>'
        });
}