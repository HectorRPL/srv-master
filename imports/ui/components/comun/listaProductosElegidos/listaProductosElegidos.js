/**
 * Created by jvltmtz on 28/06/17.
 */
import template from "./listaProductosElegidos.html";

class ListaProductosElegidos {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
    }

    eliminar(index) {
        this.productos.splice(index, 1);
    }

}

const name = 'listaProductosElegidos';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ListaProductosElegidos,
        bindings: {
            productos: '='
        },
    });
