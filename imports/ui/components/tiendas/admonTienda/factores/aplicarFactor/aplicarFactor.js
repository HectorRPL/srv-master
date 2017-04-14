/**
 * Created by Héctor on 13/04/2017.
 */
import {obtenerMarcas} from "../../../../../../api/catalogos/marcas/methods"
import {aplicarFactor} from "../../../../../../api/factores/methods";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import "./aplicarFactor.html";

class AplicarFactor {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Aplicar Factor';

        this.pasoActual = 1;
        this.pasoAnterior = 0;

        this.marcaSelec = '';
        this.marcas = [];
        this.nombre = '';

        this.pasoActual = 1;

    }

    aplicar() {
        aplicarFactor.call(this.datos, this.$bindToContext((err)=> {
            if (err) {
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'El precio de los artículos ha cambiado con éxito';
                this.tipoMsj = 'success';
            }
        }));
    }

    buscarMarca(valor) {
        console.log('entró a la funcion buscar marca');
        return obtenerMarcas.callPromise({
            marca: valor
        }).then(function (result) {
            console.log(result);
            return result;
        });
    }

    cerrar() {
        this.dismiss();
    }

}

const name = 'aplicarFactor';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/administrarTienda/tabFactores/${name}/${name}.html`,
        controllerAs: name,
        controller: AplicarFactor,
        bindings: {
            close: '&',
            dismiss: '&'
        }
    });

