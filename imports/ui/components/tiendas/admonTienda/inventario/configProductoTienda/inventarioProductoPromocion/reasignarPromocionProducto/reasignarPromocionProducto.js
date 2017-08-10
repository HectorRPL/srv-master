/**
 * Created by Héctor on 02/08/2017.
 */
import {aplicarFactPromoComiProd}   from "../../../../../../../../api/inventarios/productosInventarios/methods";
import {name as Alertas}            from "../../../../../../comun/alertas/alertas";
import {name as BuscarPromocion}    from "../../../../../../comun/busquedas/buscarPromocion/buscarPromocion";
import template                     from "./reasignarPromocionProducto.html";

class ReasignarPromocionProducto {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.titulo = 'APLICAR PROMOCIÓN A PRODUCTO';
    }

    aplicarPromocionProducto() {
        const datos = {
            nuevoValorId: this.promocionSelec._id,
            productos: [{
                marca: this.resolve.productoInventario.marcaId,
                producto: this.resolve.productoInventario.nombreProducto,
                _id: this.resolve.productoInventario._id
            }],
            operacion: 'promocionProducto'
        };
        aplicarFactPromoComiProd.callPromise(datos).then(this.$bindToContext(() => {
            this.producto = [];
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
    }

    cerrar() {
        this.dismiss();
    }

}

const name = 'reasignarPromocionProducto';

export default angular
    .module(name, [
        Alertas,
        BuscarPromocion
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ReasignarPromocionProducto,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });