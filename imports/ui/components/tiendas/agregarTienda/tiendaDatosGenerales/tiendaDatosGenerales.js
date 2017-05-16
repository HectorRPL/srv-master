/**
 * Created by jvltmtz on 9/05/17.
 */
import "./pasoUno.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {insertar} from "../../../../../api/catalogos/tiendas/methods";

class PasoUno {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tipoMsj = '';
        this.direccion = {};
        this.datos = {
            telefonos: [{telefono: ''}]
        };
    }

    agregarTelefono() {
        this.nuevoTelefono = {
            telefono: this.telefono,
            extension: this.extension,
        };
        this.datos.telefonos.push(this.nuevoTelefono);
    }

    guardarDatosGenerales() {
        insertar.call(this.datos, this.$bindToContext((err, result)=> {
            if (err) {
                this.msj = 'Error al crear una tienda, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.propietarioId = result;
                this.msj = 'Los datos de contacto se guardaron con éxito.';
                this.tipoMsj = 'success';
                this.pasoActual++;
            }
        }));
    }

    siguiente() {
        this.tipoMsj = '';
        this.pasoActual++;
    }

}

const name = 'pasoUno';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/agregarTienda/${name}/${name}.html`,
        controllerAs: name,
        controller: PasoUno
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.agregar.pasoUno', {
            url: '/pasouno',
            template: '<paso-uno></paso-uno>'
        });
}
