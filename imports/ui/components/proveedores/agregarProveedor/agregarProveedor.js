/**
 * Created by jvltmtz on 8/03/17.
 */
import "./agregarProveedor.html";
import {name as Alertas} from "../../comun/alertas/alertas";
import {insertar} from "../../../../api/catalogos/proveedores/methods";

class AgregarProveedor {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Agregar Proveedores';
        this.datos = {};

    }

    agregar() {
        this.tipoMsj = '';
        console.log(this.datos);
        insertar.call(this.datos, this.$bindToContext((err)=> {
            if (err) {
                console.log();
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'La vacante ha sido eliminada con exito.';
                this.tipoMsj = 'success';
            }
        }));
    }

    cerrar(){
        this.dismiss();
    }

}

const name = 'agregarProveedor';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/proveedores/${name}/${name}.html`,
        controllerAs: name,
        controller: AgregarProveedor,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });
