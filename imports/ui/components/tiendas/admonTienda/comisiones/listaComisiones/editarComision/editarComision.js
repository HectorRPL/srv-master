/**
 * Created by Héctor on 24/07/2017.
 */
import {cambiosComisiones} from "../../../../../../../api/comisiones/methods";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
import {name as FormaComision} from "../../../../../comun/formas/formaComision/formaComision";
import template from "./editarComision.html";

class EditarComision {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.titulo = 'Editar Comisión';
        this.datos = {};
    }

    editarComision() {
        this.datos = angular.copy(this.resolve.editarComision);
        delete this.datos.fechaCreacion;

        console.log(this.datos);
        cambiosComisiones.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            console.log(err);
            this.tipoMsj = 'danger';
        }));
    }

    cerrar() {
        this.dismiss();
    }

}

const name = 'editarComision';

export default angular
    .module(name, [
        Alertas,
        FormaComision
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarComision,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });