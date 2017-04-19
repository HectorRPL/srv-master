/**
 * Created by jvltmtz on 9/03/17.
 */
import "./agregarTienda.html";
import {name as Alertas} from "../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../direccion/formaDireccion/formaDireccion";
import {insertar} from "../../../../api/catalogos/tiendas/methods";
import {insertarDatosFiscales} from "../../../../api/datosFiscales/methods";

class AgregarTienda {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Agregar Tienda';
        this.pasoActual = 1;
        this.tipoMsj = '';
        this.datosFiscales = {};
        this.datos =  {
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
                this.msj = 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
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

    guardarDatosFiscales() {

        let datosFiscalesFinal = angular.copy(this.datosFiscales);
        delete datosFiscalesFinal.colonias;

        datosFiscalesFinal.propietarioId = this.propietarioId;
        insertarDatosFiscales.call(datosFiscalesFinal, this.$bindToContext((err)=> {
            if (err) {
                this.msj = 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Los datos fiscales se guardaron exitosamente, el sistema tardará unos minutos para configurar la base de datos, espere.';
                this.tipoMsj = 'warning';
                this.pasoActual++;
            }
        }));
    }

    cerrar() {
        this.dismiss();
    }

}

const name = 'agregarTienda';

// create a module
export default angular
    .module(name, [
        Alertas,
        FormaDireccion
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
