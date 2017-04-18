/**
 * Created by jvltmtz on 8/03/17.
 */
import {insertar} from "../../../../api/catalogos/proveedores/methods";
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

    siguiente() {
        this.pasoActual++;
    }

    agregar() {
        this.pasoActual++;
        this.tipoMsj = '';
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
