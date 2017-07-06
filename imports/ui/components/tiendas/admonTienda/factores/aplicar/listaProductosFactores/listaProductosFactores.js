/**
 * Created by jvltmtz on 28/06/17.
 */
import template from "./listaProductosFactores.html";

class ListaProductosFactores {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
    }

    eliminar(index) {
        this.productos.splice(index, 1);
    }

}

const name = 'listaProductosFactores';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaProductosFactores,
        bindings: {
            productos: '='
        },
    });
