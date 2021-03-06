/**
 * Created by Héctor on 19/07/2017.
 */
import {ProductosInventarios}       from "../../../../../../../api/inventarios/productosInventarios/collection";
import {Marcas}                     from "../../../../../../../api/catalogos/marcas/collection";
import {crearInventarioMarca     }  from "../../../../../../../api/inventarios/methods";
import {actlzrProdctInvntrExstncProdct}  from "../../../../../../../api/inventarios/productosInventarios/methods";
import {name as BuscarProducto}     from "../../../../../comun/busquedas/buscarProducto/buscarProducto";
import {name as Alertas}            from "../../../../../comun/alertas/alertas";
import template                     from "./listaProdsMarcaTienda.html";

class ListaProdsMarcaTienda {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tiendaId = $stateParams.tiendaId;
        this.marcaId = $stateParams.marcaId;

        this.titulo = 'Inventario';

        this.datos = {};
        this.mensajeExitoso = '';

        this.perPage = 10;
        this.page = 1;

        this.subscribe('marcas.todas', () => [{_id: this.marcaId}]);
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
            marca(){
                return Marcas.findOne({_id: this.marcaId});
            },
            productos(){
                return ProductosInventarios.find();
            },
            productosCount(){
                return Counts.get('numProdsInventarios');
            }
        });
    }
    crearInventarioInicial() {
        let datos = {
            tiendaId: this.tiendaId,
            marcaId: this.marcaId
        };

        crearInventarioMarca.callPromise(datos).then(this.$bindToContext(()=> {
            this.prodsExcepciones = [];
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=> {
            this.tipoMsj = 'danger';
        }));
    }
    actualizar(nuevoValor, id, editarExistenciaFrm) {
        this.tipoMsj = '';
        this.datos.cantidad = nuevoValor;
        this.datos._id = id;
        actlzrProdctInvntrExstncProdct.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(editarExistenciaFrm);
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }
    limpiarCampos(editarExistenciaFrm) {
        editarExistenciaFrm.$setPristine();
    }
    pageChanged(newPage) {
        this.page = newPage;
    }
}

const name = 'listaProdsMarcaTienda';

export default angular
    .module(name, [
        BuscarProducto,
        Alertas
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ListaProdsMarcaTienda
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.inventario.productos', {
            url: '/marca/:marcaId',
            template: '<lista-prods-marca-tienda></lista-prods-marca-tienda>'
        });
}