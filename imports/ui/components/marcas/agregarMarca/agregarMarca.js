/**
 * Created by jvltmtz on 9/03/17.
 */
import template from "./agregarMarca.html";
import {name as Alertas} from "../../comun/alertas/alertas";
import {altaMarca} from "../../../../api/catalogos/marcas/methods";

class AgregarMarca {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Agregar Marca';
        this.datos = {};

    }

    agregar() {
        this.tipoMsj = '';
        altaMarca.call(this.datos, this.$bindToContext((err)=> {
            if (err) {
                console.log();
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'La vacante ha sido eliminada con exito.';
                this.tipoMsj = 'success';
            }
        }));
    }

    cerrar(){
        this.dismiss();
    }

}

const name = 'agregarMarca';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AgregarMarca,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });
