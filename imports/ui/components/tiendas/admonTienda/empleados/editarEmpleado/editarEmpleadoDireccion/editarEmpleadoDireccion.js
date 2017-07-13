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

        console.log('[19] this.propietarioId', this.propietarioId);

        this.tipoMsj = '';

    }

    editar() {
        this.ocultarBoton = true;
        if (this.datosFiscales === undefined) {
            this.muestrarDatosFiscales = true;
        } else {
            this.muestraSoloDireccion = true;
        }
    }

    actualizar(editarEmpleadoDireccionFrm) {
        if (this.datosFiscales) {
            this.actualizarDireccion(editarEmpleadoDireccionFrm);
        } else {
            this.guardarDatosFiscales(editarEmpleadoDireccionFrm);
        }
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