/**
 * Created by Héctor on 20/07/2017.
 */
import {cambiosPromociones} from "../../../../../../../api/promociones/methods";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
import {name as FormaPromocion} from "../../../../../comun/formas/formaPromocion/formaPromocion";
import template from "./editarPromocion.html";

class EditarPromocion {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.titulo = 'Editar Promoción';
        this.datos = {};
    }

    editarPromocion() {
        this.datos = angular.copy(this.resolve.promocion);
        delete this.datos.fechaCreacion;

        cambiosPromociones.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }

    cerrar() {
        this.dismiss();
    }

}

const name = 'editarPromocion';

export default angular
    .module(name, [
        Alertas,
        FormaPromocion
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarPromocion,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });