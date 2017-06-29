/**
 * Created by jvltmtz on 22/06/17.
 */
import template from "./listaProveedores.html";
import {Proveedores} from "../../../../api/catalogos/proveedores/collection";
import {name as AgregarProveedor} from '../agregarProveedor/agregarProveedor';
import {name as EditarProveedor} from '../editarProveedor/editarProveedor';
import {name as BuscarProveedor} from '../../comun/busquedas/buscarProveedor/buscarProveedor';

class ListaProveedores {
    constructor($scope, $reactive, $state, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Todos los Proveedores';
        this.$uibModal = $uibModal;
        this.proveedorSelec = '';
        this.perPage = 10;
        this.page = 1;
        this.subscribe('proveedores.todos', ()=>
            [
                {
                    _id: this.getReactively('proveedorSelec._id')
                },
                {
                    limit: parseInt(this.perPage),
                    skip: parseInt((this.getReactively('page') - 1) * this.perPage)
                }
            ]
        );

        this.helpers({
            proveedores(){
                return Proveedores.find();
            },
            proveedoresCount(){
                return Counts.get('numProveedores');
            }
        });
    }

    pageChanged(newPage) {
        this.page = newPage;
    }


    modalAgregar() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AgregarProveedor',
            backdrop: 'static',
            size: 'md',
            keyboard: true,
        });
    }


}

const name = 'listaProveedores';

// create a module
export default angular
    .module(name, [
        AgregarProveedor,
        EditarProveedor,
        BuscarProveedor
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaProveedores
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.lista', {
            url: '/lista',
            template: '<lista-proveedores></lista-proveedores>'
        });
}