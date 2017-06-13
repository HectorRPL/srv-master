/**
 * Created by Héctor on 13/06/2017.
 */
import {ProductosInventarios} from "../../../../api/inventarios/productosInventarios/collection";
import utilsPagination from "angular-utils-pagination";
import "./listaProductosXMarca.html";

class ListaProductosXMarca {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.perPage = 15;
        this.page = 1;

        this.subscribe('productosInventarios.tiendaMarca', () => [
                {
                    tiendaId: this.getReactively('tiendaid'),
                    marcaId: this.getReactively('marca._id'),
                    productoId: this.getReactively('prod._id')
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

}

const name = 'listaProductosXMarca';

export default angular
    .module(name, [
        utilsPagination
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/${name}/${name}.html`,
        controllerAs: name,
        controller: ListaProductosXMarca,
        bindings: {
            marca: '=',
            prod: '=',
            tiendaid: '=',
            count: '='
        },
    });
