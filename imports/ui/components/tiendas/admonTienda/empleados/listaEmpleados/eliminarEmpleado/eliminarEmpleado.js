/**
 * Created by Héctor on 14/07/2017.
 */
import {cambiosEmpleadoActivar} from "../../../../../../../api/empleados/methods";
import {Tiendas} from "../../../../../../../api/empleados/collection";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
import {name as RadioDesactivar} from "../../../../../comun/radio/radioDesactivar/radioDesactivar";
import template from "./eliminarEmpleado.html";

class EliminarEmpleado {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

    }

    desactivar() {
        this.datos._id = this.getReactively('resolve.empleado._id');
        cambiosEmpleadoActivar.callPromise(this.datos).then(this.$bindToContext(() => {
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

const name = 'eliminarEmpleado';

export default angular
    .module(name, [
        RadioDesactivar,
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EliminarEmpleado,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });