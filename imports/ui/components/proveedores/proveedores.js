/**
 * Created by jvltmtz on 8/03/17.
 */
import template from "./proveedores.html";
import {name as ListaProveedores} from "./listaProveedores/listaProveedores"
import {name as EditarProveedor} from "./editarProveedor/editarProveedor"

class Proveedores {
    constructor() {
        'ngInject';

    }

}

const name = 'proveedores';

export default angular
    .module(name, [
        ListaProveedores,
        EditarProveedor
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Proveedores
    })
    .config(config);


function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores', {
            url: '/proveedores',
            template: '<proveedores></proveedores>',
            abstract: true
        });
}
