/**
 * Created by jvltmtz on 7/07/17.
 */
import {crearPromocion} from "../../../../../../api/promociones/methods";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import {name as FormaPromocion} from "../../../../comun/formas/formaPromocion/formaPromocion";
import template from "./agregarPromocion.html";

class AgregarPromocion {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Crear un Promoción';
    }

    agregar() {
        console.log(this.promocion);

        crearPromocion.callPromise(this.promocion).then(this.$bindToContext(()=> {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }

    cerrar() {
        this.dismiss();
    }

}

const name = 'agregarPromocion';

export default angular
    .module(name, [
        Alertas,
        FormaPromocion
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: AgregarPromocion,
        bindings: {
            close: '&',
            dismiss: '&'
        }
    });
