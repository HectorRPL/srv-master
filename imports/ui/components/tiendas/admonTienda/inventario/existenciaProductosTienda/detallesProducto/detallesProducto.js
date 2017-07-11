/**
 * Created by Héctor on 10/07/2017.
 */
import template from "./detallesProducto.html";
import {ProductosInventarios} from "../../../../../../../api/inventarios/productosInventarios/collection";

class DetallesProducto {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.subscribe('productosInventarios.detallesTiendaProducto', () => [
            {
                _id: this.getReactively('resolve.producto._id')
            }
        ]);
        this.helpers({
            productos() {
                return ProductosInventarios.findOne();
            }
        });
    }

    cerrar(){
        console.log(this.resolve);
        this.dismiss();
    }
}

const name = 'detallesProducto';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: DetallesProducto,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });