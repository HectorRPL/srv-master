/**
 * Created by Héctor on 25/07/2017.
 */
import {cambiosDatosFiscales} from "../../../../../../api/datosFiscales/methods";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../../../comun/formas/formaDireccion/formaDireccion";
import template from "./cambiosDatosFiscales.html";

class CambiosDatosFiscales {
    constructor($scope, $reactive) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.datosFiscales = {};

        this.tipoMsj = '';

    }

    cambiosDatosFiscales(cambiosDatosFiscalesFrm) {
        delete this.datosFiscales.colonias;
        delete this.datosFiscales._id;
        delete this.datosFiscales.tipoPersona;
        delete this.datosFiscales.razonSocial;
        delete this.datosFiscales.tipoSociedad;
        delete this.datosFiscales.apellidoMaterno;
        delete this.datosFiscales.apellidoPaterno;
        delete this.datosFiscales.segundoNombre;
        delete this.datosFiscales.nombre;
        delete this.datosFiscales.email;
        delete this.datosFiscales.fechaCreacion;

        cambiosDatosFiscales.callPromise(this.datosFiscales).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(cambiosDatosFiscalesFrm);
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));

    }

    limpiarCampos(cambiosDatosFiscalesFrm) {
        this.datosFiscales = {};
        cambiosDatosFiscalesFrm.$setPristine();
    }


}

const name = 'cambiosDatosFiscales';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: CambiosDatosFiscales,
        bindings: {
            datosFiscales: '<'
        }
    });
