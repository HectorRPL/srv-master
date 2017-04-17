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


        this.datosFiscales = {
            razonSocial: 'demo s.a. de c.v.',
            rfc: 'sla630306cf7',
            email: 'demo@demo.com',
            estado: 'ciudad de mexico',
            estadoId: 'cmx',
            delMpio: 'xochimilco',
            codigoPostal: '16030',
            colonia: 'potrero de san bernardino',
            calle: 'roselina',
            numExt: '7',
            numInt: '2'
        };
        this.datos =  {
            nombre: 'demo',
            email: 'demo01@demo01.com',
            telefonos: [{telefono: '5556769502'}]
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
        console.log('Estos son los datos que vamos a enviar: ', datosFiscalesFinal);
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

    agregar() {
        // Inserta la tienda en la collection tiendas
        insertar.call(this.datos, this.$bindToContext((err, result)=> {
            if (err) {
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            } else {

                this.msj = 'El sistema está trabajando, tardará unos minutos';
                this.tipoMsj = 'warning';

                // Inserta los datos fiscales en la collection datosFiscalesProveedores
                let datosFiscalesFinal = angular.copy(this.datosFiscales);
                delete datosFiscalesFinal.colonias;

                datosFiscalesFinal.propietarioId = result;
                insertarDatosFiscales.call(datosFiscalesFinal, this.$bindToContext((err)=> {
                    if (err) {
                        this.msj = err.reason;
                        this.tipoMsj = 'danger';
                    } else {
                        this.msj = 'La tienda ha sido registrada con éxito';
                        this.tipoMsj = 'success';
                    }
                }));
                this.pasoActual = 4;
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
