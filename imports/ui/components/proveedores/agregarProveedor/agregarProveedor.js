/**
 * Created by jvltmtz on 8/03/17.
 */
import {altaProveedor} from "../../../../api/catalogos/proveedores/methods";
import {insertarDatosFiscales} from "../../../../api/datosFiscales/methods";
import {name as Alertas} from "../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../direccion/formaDireccion/formaDireccion"; // No es necesario importarlo, no sé por qué
import {name as FormaDatosFiscales} from "../../datosFiscales/formaDatosFiscales/formaDatosFiscales";
import "./agregarProveedor.html";

class AgregarProveedor {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Agregar Proveedores';
        this.pasoActual = 1;
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
        altaProveedor.call(this.datos, this.$bindToContext((err, result)=> {
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
        console.log('Estos son los datos que vamos a enviar: ', datosFiscalesFinal);
        insertarDatosFiscales.call(datosFiscalesFinal, this.$bindToContext((err)=> {
            if (err) {
                this.msj = err + 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Los datos fiscales se guardaron exitosamente.';
                this.tipoMsj = 'success';
                this.pasoActual++;
            }
        }));
    }

    cerrar() {
        this.dismiss();
    }

}

const name = 'agregarProveedor';

// create a module
export default angular
    .module(name, [
        Alertas,
        FormaDireccion,
        FormaDatosFiscales
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
