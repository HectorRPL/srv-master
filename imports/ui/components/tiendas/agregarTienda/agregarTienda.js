/**
 * Created by jvltmtz on 9/03/17.
 */
import "./agregarTienda.html";
import {name as Alertas} from "../../comun/alertas/alertas";
import {insertar} from "../../../../api/catalogos/tiendas/methods";

class AgregarTienda {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Agregar Tienda';
        this.datos = {};

    }

    agregar() {
        this.tipoMsj = '';
        insertar.call(this.datos, this.$bindToContext((err)=> {
            if (err) {
                console.log();
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'La tienda ha sido registrada con exito.';
                this.tipoMsj = 'success';
            }
        }));
    }

    cerrar(){
        this.dismiss();
    }

}

const name = 'agregarTienda';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/${name}/${name}.html`,
        controllerAs: name,
        controller: AgregarTienda,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });
