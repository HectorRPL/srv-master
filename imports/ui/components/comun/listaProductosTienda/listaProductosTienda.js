/**
 * Created by Héctor on 13/06/2017.
 */
import {ProductosInventarios} from "../../../../api/inventarios/productosInventarios/collection";
import utilsPagination from "angular-utils-pagination";
import template from "./listaProductosTienda.html";

class ListaProductosTienda {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.perPage = 10;
        this.page = 1;

        this.subscribe('productosInventarios.tiendaMarca', () => [
                {
                    tiendaId: this.getReactively('tiendaId'),
                    marcaId: this.getReactively('marca._id'),
                    productoId: this.getReactively('producto._id')
                },
                {
                    limit: parseInt(this.perPage),
                    skip: parseInt((this.getReactively('page') - 1) * this.perPage)
                }
            ]
        );
        this.helpers({
            productos(){
                return ProductosInventarios.find();
            },
            productosCount(){
                return Counts.get('numProdsInventarios');
            }
        });

    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    agregarLista(producto) {
        this.agregarProd({
            _id: producto._id,
            factorId: producto.factorId,
            marca: producto.marca().nombre,
            producto: producto.producto().campoBusqueda
        });
    }

}

const name = 'listaProductosTienda';

export default angular
    .module(name, [
        utilsPagination
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaProductosTienda,
        bindings: {
            marca: '<',
            producto: '<',
            tiendaId: '<',
            agregarProd: '&'
        },
    });
