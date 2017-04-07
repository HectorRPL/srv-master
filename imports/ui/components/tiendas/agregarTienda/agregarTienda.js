/**
 * Created by jvltmtz on 9/03/17.
 */
import "./agregarTienda.html";
import {name as Alertas} from "../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../direccion/formaDireccion/formaDireccion";
import {insertar} from "../../../../api/catalogos/tiendas/methods";
import {insertarDatosFiscales} from "../../../../api/catalogos/proveedores/datosFiscales/methods";

class AgregarTienda {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Agregar Tienda';
        this.pasoActual = 1;
        this.pasoAnterior = 0;
        this.datosFiscales = {};
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


    siguiente() {
        this.pasoAnterior = this.pasoActual;
        this.pasoActual ++;
    }

    atras() {
        this.pasoActual --;
        this.pasoAnterior = this.pasoActual - 1;
    }

   agregar() {
        this.tipoMsj = '';
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

                datosFiscalesFinal.proveedorId =  result;
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

    cerrar(){
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
