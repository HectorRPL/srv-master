/**
 * Created by Héctor on 26/08/2017.
 */
/**
 * Created by Héctor on 25/07/2017.
 */
import {altaDatosFiscales} from "../../../../../../api/datosFiscales/methods";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../../../comun/formas/formaDireccion/formaDireccion";
import {name as FormaDatosFiscales} from "../../../../comun/formas/formaDatosFiscales/formaDatosFiscales";
import template from "./altaDatosFiscales.html";

class AltaDatosFiscales {
    constructor($scope, $reactive) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.datosFiscales = {};

        this.tipoMsj = '';

    }

    altaDatosFiscales() {
        console.log('[23]', this.datosFiscales);
        let datosFiscalesFinal = angular.copy(this.datosFiscales);
        delete datosFiscalesFinal.colonias;
        datosFiscalesFinal.propietarioId = this.propietarioId;

        altaDatosFiscales.callPromise(datosFiscalesFinal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            console.log('[31]', err);
            this.tipoMsj = 'danger';
        }));
    }

}

const name = 'altaDatosFiscales';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion,
        FormaDatosFiscales
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AltaDatosFiscales,
        bindings: {
            propietarioId: '<'
        }
    });
