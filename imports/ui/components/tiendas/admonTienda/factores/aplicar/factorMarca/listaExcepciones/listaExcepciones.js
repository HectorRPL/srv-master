/**
 * Created by jvltmtz on 30/06/17.
 */
import template from "./listaExcepciones.html";

class ListaExcepciones {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
    }

    eliminar(index) {
        this.productos.splice(index, 1);
    }

}

const name = 'listaExcepciones';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaExcepciones,
        bindings: {
            productos: '='
        },
    });