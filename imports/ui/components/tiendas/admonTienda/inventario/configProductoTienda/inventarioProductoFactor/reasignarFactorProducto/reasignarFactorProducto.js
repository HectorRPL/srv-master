/**
 * Created by Héctor on 02/08/2017.
 */
import {aplicarFactPromoComiProd}   from "../../../../../../../../api/inventarios/productosInventarios/methods";
import {name as Alertas}            from "../../../../../../comun/alertas/alertas";
import {name as BuscarFactor}       from "../../../../../../comun/busquedas/buscarFactor/buscarFactor";
import template                     from "./reasignarFactorProducto.html";

class ReasignarFactorProducto {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.titulo = 'APLICAR FACTOR A PRODUCTO';
    }

    aplicarFactorProducto() {
        const datos = {
            nuevoValorId: this.factorSelec._id,
            productos: [{
                marca: this.resolve.productoInventario.marcaId,
                producto: this.resolve.productoInventario.nombreProducto,
                _id: this.resolve.productoInventario._id
            }],
            operacion: 'factorProducto'
        };
        console.log('Esto es lo que vamos a enviar', datos);
        aplicarFactPromoComiProd.callPromise(datos).then(this.$bindToContext(()=> {
            this.producto = [];
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=>{
            console.log('[27]', err);
            this.tipoMsj = 'danger';
        }));
    }

    cerrar() {
        this.dismiss();
    }

}

const name = 'reasignarFactorProducto';

export default angular
    .module(name, [
        Alertas,
        BuscarFactor
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ReasignarFactorProducto,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });
