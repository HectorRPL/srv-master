/**
 * Created by Héctor on 14/07/2017.
 */
import {cambiosProveedorActivar} from "../../../../../api/catalogos/proveedores/methods";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as RadioDesactivar} from "../../../comun/radio/radioDesactivar/radioDesactivar";
import template from "./eliminarProveedor.html";

class EliminarProveedor {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

    }

    eliminar() {
        this.datos._id = this.getReactively('resolve.proveedor._id');
        cambiosProveedorActivar.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=>{
            console.log(err);
            this.tipoMsj = 'danger';
        }));
    }

    cerrar(){
        this.dismiss();
    }

}

const name = 'eliminarProveedor';

export default angular
    .module(name, [
        RadioDesactivar,
        Alertas
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EliminarProveedor,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });