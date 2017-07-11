/**
 * Created by Héctor on 19/04/2017.
 */
import {ProductosInventarios} from "../../../../../../api/inventarios/productosInventarios/collection";
import {cambiosExistenciaProducto} from "../../../../../../api/inventarios/productosInventarios/methods";
import {Marcas} from "../../../../../../api/catalogos/marcas/collection";
import {name as BuscarProducto} from "../../../../comun/busquedas/buscarProducto/buscarProducto";
import {name as DetallesProducto} from "./detallesProducto/detallesProducto";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import template from "./existenciaProductosTienda.html";

class ExistenciaProductosTienda {
    constructor($scope, $reactive, $state, $stateParams, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tiendaId = $stateParams.tiendaId;
        this.marcaId = $stateParams.marcaId;
        this.$uibModal = $uibModal;

        this.titulo = 'Inventario';

        this.datos = {};
        this.mensajeExitoso = '';


        this.subscribe('marcas.todas', () => [{_id: this.marcaId}]);
        this.helpers({
            marca(){
                return Marcas.findOne({_id: this.marcaId});
            }
        });


        this.perPage = 10;
        this.page = 1;

        this.subscribe('productosInventarios.tiendaMarca', () => [
            {
                tiendaId: this.tiendaId,
                marcaId: this.marcaId,
                productoId: this.getReactively('productoSelec._id')
            },
            {
                limit: parseInt(this.perPage),
                skip: parseInt((this.getReactively('page') - 1) * this.perPage)
            }
        ]);
        this.helpers({
            productos(){
                return ProductosInventarios.find();
            },
            productosCount(){
                return Counts.get('numProdsInventarios');
            }
        });

    }

    actualizar(nuevoValor, id, editarExistenciaFrm) {
        this.tipoMsj = '';
        this.datos.cantidad = nuevoValor;
        this.datos._id = id;
        cambiosExistenciaProducto.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(editarExistenciaFrm);
        })).catch(this.$bindToContext((err) => {
            console.log(err);
            this.tipoMsj = 'danger';
        }));
    }

    abreModalDealles(producto) {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'DetallesProducto',
            backdrop: 'static',
            size: 'xs',
            keyboard: true,
            resolve: {
                producto: function () {
                    return producto;
                }
            }
        });
    }

    limpiarCampos(editarExistenciaFrm) {
        editarExistenciaFrm.$setPristine();
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

}

const name = 'existenciaProductosTienda';

export default angular
    .module(name, [
        BuscarProducto,
        DetallesProducto,
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ExistenciaProductosTienda
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.inventario.productos', {
            url: '/marca/:marcaId',
            template: '<existencia-productos-tienda></existencia-productos-tienda>'
        });
}