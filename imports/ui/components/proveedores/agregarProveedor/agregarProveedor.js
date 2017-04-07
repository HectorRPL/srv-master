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
        this.exito = false;
        this.pasoActual = 1;
        this.pasoAnterior = 0;
        this.datosFiscales = {
            razonSocial: 'DEMO S.A. DE C.V.',
            rfc: 'SLA630306CF7',
            email: 'demo@demo.com',
            estado: 'CIUDAD DE MEXICO',
            estadoId: 'CMX',
            delMpio: 'XOCHIMILCO',
            codigoPostal: '16030',
            colonia: 'POTRERO DE SAN BERNARDINO',
            calle: 'ROSELINA',
            numExt: '7',
            numInt: '2'
        };
        this.datos =  {
            nombre: 'DEMO',
            email: 'DEMO01@DEMO01.COM',
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


    siguiente() {
        this.pasoAnterior = this.pasoActual;
        this.pasoActual++;
    }

    atras() {
        this.pasoActual--;
        this.pasoAnterior = this.pasoActual - 1;
    }


    agregar() {
        console.log('Estos son los datos', this.datos);
        // console.log('Estos son los datosFiscales', this.datosFiscales);
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
