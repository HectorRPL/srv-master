/**
 * Created by Héctor on 11/07/2017.
*/
import template from "./editarEmpleadoDireccion.html";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../../../../comun/formas/formaDireccion/formaDireccion";
import {cambiosDireccion} from "../../../../../../../api/direcciones/methods";
import {Direcciones} from "../../../../../../../api/direcciones/collection";

class EditarEmpleadoDireccion {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.empleadoId;

        this.direccion = {};

        this.tipoMsj = '';

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

        console.log('[45] Esta es la nueva dirección>>>', direccionFinal);

        cambiosDireccion.callPromise(direccionFinal).then(this.$bindToContext(()=> {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=>{
            console.log(err);
            this.tipoMsj = 'danger';
        }));
    }

    limpiarCampos(editarEmpleadoDireccionFrm) {
        this.datosFiscalesOriginal = {};
        editarEmpleadoDireccionFrm.$setPristine();
    }

}

const name = 'editarEmpleadoDireccion';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarEmpleadoDireccion
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.empleados.editar.direccion', {
            url: '/:empleadoId/direccion',
            template: '<editar-empleado-direccion></editar-empleado-direccion>'
        });
}