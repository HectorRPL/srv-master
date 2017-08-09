/**
 * Created by Héctor on 13/07/2017.
 */
import template from "./editarEmpleadoContrasenia.html";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
import {name as Contrasenia} from "../../../../../comun/inputs/contrasenia/contrasenia";
// import {cambiosEmpleadoContrasenia} from "../../../../../../../api/catalogos/productos/methods";
import {Empleados} from "../../../../../../../api/empleados/collection";

class EditarEmpleadoContrasenia {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this._id = $stateParams.empleadoId;

        this.tipoMsj = '';

        this.empleado = {};

        this.subscribe('empleados.todos', () => [{_id: $stateParams.empleadoId}]);

        this.helpers({
            empleado(){
                return Empleados.findOne();
            }
        });
    }

    editar() {
        this.ocultarBoton = true;
    }

    limpiarCampos(editarEmpleadoContraseniaForm) {
        this.datos = {};
        editarEmpleadoContraseniaForm.$setPristine();
    }

    actualizarDatosGenerales(editarEmpleadoContraseniaForm) {
        this.datos._id = this.propietarioId;

        /*
        cambiosCuentaContable.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(editarEmpleadoContraseniaForm);
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
         */
    }
}

const name = 'editarEmpleadoContrasenia';

export default angular
    .module(name, [
        Alertas,
        Contrasenia
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarEmpleadoContrasenia
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.empleados.editar.contrasenia', {
            url: '/contrasenia',
            template: '<editar-empleado-contrasenia></editar-empleado-contrasenia>'
        });
}
