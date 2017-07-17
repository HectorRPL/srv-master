/**
 * Created by Héctor on 14/07/2017.
 */
import {cambiosTiendaActivar} from "../../../../../api/catalogos/tiendas/methods";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as RadioDesactivar} from "../../../comun/radio/radioDesactivar/radioDesactivar";
import template from "./eliminarTienda.html";

class EliminarTienda {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

    }

    eliminar() {
        this.datos._id = this.getReactively('resolve.tienda._id');
        cambiosTiendaActivar.callPromise(this.datos).then(this.$bindToContext(() => {
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

const name = 'eliminarTienda';

export default angular
    .module(name, [
        RadioDesactivar,
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EliminarTienda,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });