/**
 * Created by Héctor on 02/08/2017.
 */
import {actlzrProdInvFacPromCom}   from "../../../../../../../../api/inventarios/productosInventarios/methods";
import {name as Alertas}            from "../../../../../../comun/alertas/alertas";
import {name as BuscarComision}     from "../../../../../../comun/busquedas/buscarComision/buscarComision";
import template                     from "./reasignarComisionProducto.html";

class ReasignarComisionProducto {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.titulo = 'APLICAR COMISIÓN A PRODUCTO';
    }

    aplicarFactorProducto() {
        const datos = {
            nuevoValorId: this.comisionSelec._id,
            productos: [{
                marca: this.resolve.productoInventario.marcaId,
                producto: this.resolve.productoInventario.nombreProducto,
                _id: this.resolve.productoInventario._id
            }],
            operacion: 'comisionProducto'
        };
        actlzrProdInvFacPromCom.callPromise(datos).then(this.$bindToContext(() => {
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

const name = 'reasignarComisionProducto';

export default angular
    .module(name, [
        Alertas,
        BuscarComision
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ReasignarComisionProducto,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });
