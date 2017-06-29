/**
 * Created by jvltmtz on 8/03/17.
 */
import {name as ProveedorDatosGenerales} from "./proveedorDatosGenerales/proveedorDatosGenerales";
import {name as ProveedorDatosFiscales} from "./proveedorDatosFiscales/proveedorDatosFiscales";
import template from "./agregarProveedor.html";

class AgregarProveedor {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Agregar Proveedores';

        this.tabs = [
            {titulo: "Datos Generales", estado: ".datos", icono: 'fa fa-user'},
            {titulo: "Datos Fiscales", estado: ".fiscales", icono: 'fa fa-cubes'}
        ];
    }
}

const name = 'agregarProveedor';

export default angular
    .module(name, [
        ProveedorDatosGenerales,
        ProveedorDatosFiscales
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AgregarProveedor
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.agregar', {
            url: '/agregar',
            template: '<agregar-proveedor></agregar-proveedor>',
            abstract: true,
            component: 'agregarProveedor'
        });
};
