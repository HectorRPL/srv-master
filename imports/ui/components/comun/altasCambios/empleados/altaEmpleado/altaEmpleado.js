/**
 * Created by Héctor on 01/08/2017.
 */
import {name as Alertas} from "../../../alertas/alertas";
import {name as FormaDatosPersonales} from "../../../formas/formaDatosPersonales/formaDatosPersonales";
import {altaEmpleado} from "../../../../../../api/direcciones/methods";
import template from "./altaEmpleado.html";

class AltaEmpleado {
    constructor($scope, $reactive) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.direccion = {};

        this.tipoMsj = '';

    }

    insertar() {
        let direccionFinal = angular.copy(this.direccion);
        delete direccionFinal.colonias;
        direccionFinal.propietarioId = this.propietarioId;

        altaEmpleado.callPromise(direccionFinal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            console.log('[29]', err);
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'altaEmpleado';

export default angular
    .module(name, [
        Alertas,
        FormaDatosPersonales
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AltaEmpleado,
        bindings: {
            propietarioId: '<',
            respuestaId: '@'
        }
    });