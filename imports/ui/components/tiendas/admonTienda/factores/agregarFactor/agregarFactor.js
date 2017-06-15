/**
 * Created by Héctor on 12/04/2017.
 */
import {altaFactor} from "../../../../../../api/factores/methods";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import "./agregarFactor.html";

class AgregarFactor {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Crear un Factor';

        this.factores = [
            {nombre: 1},
            {nombre: 2},
            {nombre: 3},
            {nombre: 4},
            {nombre: 5},
            {nombre: 6},
            {nombre: 7},
            {nombre: 8}
        ];
    }

    agregar() {
        altaFactor.call(this.datos, this.$bindToContext((err)=> {
            if (err) {
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'El factor se ha creado con éxito y está listo para su uso.';
                this.tipoMsj = 'success';
            }
        }));
    }

    cerrar() {
        this.dismiss();
    }

}

const name = 'agregarFactor';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/admonTienda/factores/${name}/${name}.html`,
        controllerAs: name,
        controller: AgregarFactor,
        bindings: {
            close: '&',
            dismiss: '&'
        }
    });
