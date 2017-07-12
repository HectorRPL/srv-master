/**
 * Created by Héctor on 11/07/2017.
*/
import template from "./editarPersonalDireccion.html";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../../../../comun/formas/formaDireccion/formaDireccion";
import {cambiosDireccion} from "../../../../../../../api/direcciones/methods";
import {Direcciones} from "../../../../../../../api/direcciones/collection";

class EditarPersonalDireccion {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.personalId;

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

    actualizar(editarPersonalDireccionFrm) {
        if (this.datosFiscales) {
            this.actualizarDireccion(editarPersonalDireccionFrm);
        } else {
            this.guardarDatosFiscales(editarPersonalDireccionFrm);
        }
    }

    limpiarCampos(editarPersonalDireccionFrm) {
        this.datosFiscalesOriginal = {};
        editarPersonalDireccionFrm.$setPristine();
    }

}

const name = 'editarPersonalDireccion';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarPersonalDireccion
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.personal.editar.direccion', {
            url: '/:personalId/direccion',
            template: '<editar-personal-direccion></editar-personal-direccion>'
        });
}