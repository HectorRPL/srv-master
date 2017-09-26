/**
 * Created by Héctor on 19/07/2017.
 */
import {actualizarFactor} from "../../../../../../../api/factores/methods";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
import {name as FormaFactores} from "../../../../../comun/formas/formaFactores/formaFactores";
import template from "./editarFactor.html";

class EditarFactor {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.titulo = 'Editar Factor';
        this.datos = {};
    }

    editarFactor() {
        this.datos._id     = this.resolve.factor._id
        this.datos.nombre  = this.resolve.factor.nombre
        this.datos.factor1 = this.resolve.factor.factores.factor1;
        this.datos.factor2 = this.resolve.factor.factores.factor2;
        this.datos.factor3 = this.resolve.factor.factores.factor3;
        this.datos.factor4 = this.resolve.factor.factores.factor4;
        this.datos.factor5 = this.resolve.factor.factores.factor5;
        this.datos.factor6 = this.resolve.factor.factores.factor6;
        this.datos.factor7 = this.resolve.factor.factores.factor7;
        this.datos.factor8 = this.resolve.factor.factores.factor8;

        // /*
        actualizarFactor.call(this.datos, this.$bindToContext((err)=> {
            if (err) {
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'El factor se ha creado con éxito y está listo para su uso.';
                this.tipoMsj = 'success';
            }
        }));
        // */
    }

    cerrar() {
        this.dismiss();
    }

}

const name = 'editarFactor';

export default angular
    .module(name, [
        Alertas,
        FormaFactores
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EditarFactor,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });
