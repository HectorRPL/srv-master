/**
 * Created by Héctor on 17/07/2017.
 */
import template from "./admonProveedor.html";
import {Proveedores} from "../../../../api/catalogos/proveedores/collection";
import {name as TituloPrincipal} from '../../comun/tituloPrincipal/tituloPrincipal';
import {name as EditarProveedor} from './editarProveedor/editarProveedor';
import {name as DetallesProveedor} from './detallesProveedor/detallesProveedor';

class AdmonProveedor {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.proveedorId = $stateParams.proveedorId;
        this.subscribe('proveedores.todos',()=>
            [
                {
                    _id: this.proveedorId
                }
            ]);

        this.helpers({
            proveedor(){
                return Proveedores.findOne({_id: this.proveedorId});
            }
        });

        this.tabs = [
            {titulo: "Editar", estado: ".editar.generales", icono: 'fa fa-pencil'},
            {titulo: "Info", estado: ".detalles.info", icono: 'fa fa-info'},
        ];

        this.tab = 0;
    }

}

const name = 'admonProveedor';

export default angular
    .module(name, [
        TituloPrincipal,
        EditarProveedor,
        DetallesProveedor
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AdmonProveedor
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.admon', {
            url: '/:proveedorId',
            template: '<admon-proveedor></admon-proveedor>',
            abstract: true
        });
}