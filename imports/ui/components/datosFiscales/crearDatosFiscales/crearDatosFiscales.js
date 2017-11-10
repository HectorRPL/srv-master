/**
 * Created by Héctor on 09/11/2017.
 */
import {crearDatoFiscal}            from "../../../../api/datosFiscales/methods";
import {name as Alertas}            from "../../comun/alertas/alertas";
import {name as FormaDatosFiscales} from "../../comun/formas/formaDatosFiscales/formaDatosFiscales";
import template                     from "./crearDatosFiscales.html";

class CrearDatosFiscales {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.datos = {};
    }
    guardarDatosFiscales() {
        let datosFinales = angular.copy(this.datos);
        delete datosFinales.colonias

        crearDatoFiscal.callPromise(datosFinales).then(this.$bindToContext((result) => {
            this.tipoMsj = 'success';
            const datoFiscalId = {
                event: result,
                item: result,
                label: result,
                model: result
            };
            this.respuesta(datoFiscalId);
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'crearDatosFiscales';

export default angular
    .module(name, [
        Alertas,
        FormaDatosFiscales
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: CrearDatosFiscales,
        bindings: {
            respuesta: '&'
        }
    });