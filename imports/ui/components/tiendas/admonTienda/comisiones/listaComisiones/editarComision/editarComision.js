/**
 * Created by Héctor on 24/07/2017.
 */
import {actualizarComision} from "../../../../../../../api/comisiones/methods";
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
        actualizarComision.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
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
        template: template.default,
        controllerAs: name,
        controller: EditarComision,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });