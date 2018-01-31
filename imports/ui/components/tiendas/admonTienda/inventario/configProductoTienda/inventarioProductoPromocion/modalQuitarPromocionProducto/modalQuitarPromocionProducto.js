/**
 * Created by Héctor on 30/01/2018.
 */
import {actlzrProdctInvntrPromcnComsnProdct} from "../../../../../../../../api/inventarios/productosInventarios/methods";
import {name as Alertas} from "../../../../../../comun/alertas/alertas";
import template from "./modalQuitarPromocionProducto.html";

class ModalQuitarPromocionProducto {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

    }

    quitarPromocion() {
        const datos = {
            nuevoValorId: this.resolve.productoInventario.promocionId,
            productos: [{
                marca: this.resolve.nombreMarca,
                producto: this.resolve.productoInventario.nombreProducto,
                _id: this.resolve.productoInventario._id
            }],
            operacion: 'quitarPromocion'
        };

        console.log('Los datos que vamos a enviar', datos);
        actlzrProdctInvntrPromcnComsnProdct
            .callPromise(datos)
            .then(this.$bindToContext(()=> {
                this.tipoMsj = 'success';
            })).catch(this.$bindToContext((err)=> {
            this.tipoMsj = 'danger';
        }));
    }

    cerrar() {
        this.dismiss();
    }

}

const name = 'modalQuitarPromocionProducto';

export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ModalQuitarPromocionProducto,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });