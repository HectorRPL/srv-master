/**
 * Created by Héctor on 24/07/2017.
 */
import {crearComision} from "../../../../../../api/comisiones/methods";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import {name as FormaComision} from "../../../../comun/formas/formaComision/formaComision";
import template from "./agregarComision.html";

class AgregarComision {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Crear una Comisión';

        this.comision = {};
    }

    agregar() {
        console.log(this.comision);

        // /*
        crearComision.callPromise(this.comision).then(this.$bindToContext(()=> {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            console.log(err);
            this.tipoMsj = 'danger';
        }));
         // */
    }

    cerrar() {
        this.dismiss();
    }

}

const name = 'agregarComision';

export default angular
    .module(name, [
        Alertas,
        FormaComision
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: AgregarComision,
        bindings: {
            close: '&',
            dismiss: '&'
        }
    });
