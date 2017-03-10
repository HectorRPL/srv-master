/**
 * Created by Héctor on 09/03/2017.
 */
import { Meteor } from 'meteor/meteor';
import { TiposProductos } from '../../api/catalogos/tiposProductos/collection';

Meteor.startup(function () {

    if (TiposProductos.find().count() === 0) {
        const tiposProductos= [
            {nombre: 'Coladera',                        color: '', tipoMaterial: ['Plástico', 'Latón']},
            {nombre: 'Regadera',                        color: '', tipoMaterial: ['Plástico', 'Latón'], ahorroAgua: false}, // ¿qué tipo de materiales? ¿se coloca en la descripción de la nota? checar base de datos
            {nombre: 'Mezcladora para lavabo',          color: '', tipoMaterial: ['Plástico', 'Latón']}, // ¿qué tipo de materiales? ¿se coloca en la descripción de la nota? checar base de datos
            {nombre: 'Mezcladora para cocina',          color: '', tipoMaterial: ['Plástico', 'Latón']}, // ¿qué tipo de materiales? ¿se coloca en la descripción de la nota? checar base de datos
            {nombre: 'Tarja',                           color: '', tipoMaterial: ['Acero Inoxidable', 'Aluminio'], centimetrosLargo: 1, centimetrosAncho: 1, numeroCanastas: 1}, // El color a veces es blanco o aluminio/metal
            {nombre: 'WC',                              color: '', tipoMaterial: ['Cerámica', 'Plástico'], dualFlush: false}, // puede ser cerámico o plástico si es chino
            {nombre: 'Lavabo',                          color: '', tipoMaterial: ['Cerámica', 'Vidrio Templado', 'Plástico']}, // tipoMaterial pueden ser: cerámico, vidrio, plástico
            {nombre: 'Accesorio para baño',             color: '', tipoMaterial: ['Cerámica']}, // tipoMaterial pueden ser: cerámico, metal, plástico (¿que tipo de metal?)
            {nombre: 'Bagueta',                         color: '', tipoMaterial: ['Plástico', 'Aluminio'], centimetrosLargo: 1},
            {nombre: 'Mueble para baño',                color: '', tipoMaterial: ['MFD', 'Madera'], numeroPuertas: 1, numeroCajones: 1, centimetrosLargo: 1, centimetrosAncho: 1, centimetrosAlto: 1},
            {nombre: 'Mueble para baño personalizado',  color: '', tipoMaterial: ['MFD', 'Madera']}, // Checar como mybusinesspos maneja este tipo de productos personalizados
            {nombre: 'Placa',                           color: '', tipoMaterial: ['Mármol'], centimetrosLargo: 1, centimetrosAncho: 1}, // estos muebles en muchas ocasiones son a la medida
            {nombre: 'Cenefa',                          color: '', centimetrosLargo: 1, centimetrosAncho: 1}, // No siempre viene con color
            {nombre: 'Ovalín',                          color: '', centimetrosLargo: 1, centimetrosAncho: 1},
            {nombre: 'Loseta',                          color: '', centimetrosLargo: 1, centimetrosAncho: 1, metrosCuadrados: 1, tono: 1},
            {nombre: 'Azulejo',                         color: '', centimetrosLargo: 1, centimetrosAncho: 1, metrosCuadrados: 1, tono: 1},
            {nombre: 'Asiento',                         color: '', centimetrosLargo: 1, centimetrosAncho: 1, tipo: ['Corto', 'Alargado']},
            {nombre: 'Junta',                           color: '', kilosCantidad: 10},
            {nombre: 'Decorado cerámico',               centimetrosLargo: 1, centimetrosAncho: 1},
            {nombre: 'Espejo',                          centimetrosLargo: 1, centimetrosAncho: 1, conLuz: false, encendidoTouch: false},
            {nombre: 'Botiquín',                        centimetrosLargo: 1, centimetrosAncho: 1, conLuz: false, encendidoTouch: false},
            {nombre: 'Campana extractora',              centimetrosLargo: 1, centimetrosAncho: 1},
            {nombre: 'Cisterna',                        litrosCapacidad: 1, servicios: 1, centimetrosLargo: 1, centimetrosAncho: 1, metrosDiametro: 1, tricapa: false}, // Lo de tricapa no estoy seguro, preguntar
            {nombre: 'Tinaco',                          litrosCapacidad: 1, servicios: 1, centimetrosLargo: 1, centimetrosAncho: 1, metrosDiametro: 1, tricapa: false}, // Lo de tricapa no estoy seguro, preguntar. Esto no lo ponen, pero en la venta se menciona
            {nombre: 'Calentador para baño',            litrosCapacidad: 1, servicios: 1, centimetrosLargo: 1, centimetrosAncho: 1, metrosDiametro: 1},
            {nombre: 'Tina',                            centimetrosLargo: 1, centimetrosAncho: 1, centimetrosAlto: 1, metrosProfundidad: 1, servicios: 1, hidromasaje: false, aromaterapia: false, cromoterapia: false},
            {nombre: 'Cabina para baño',                centimetrosLargo: 1, centimetrosAncho: 1, centimetrosAlto: 1},
            {nombre: 'Pegazulejo',                      kilosCantidad: 10}, // en lugar de tipo podría manejarse como otro producto por el nombre
            {nombre: 'Cruceta',                         tipoMaterial: ['Plástico'], centimetrosMedida: 1}, // Usualmente siempre son de plástico
            {nombre: 'Accesorios de WC',                tipoMaterial: ['Plástico']}, // tipoMaterial pueden ser: plástico o metal (¿que tipo de metal?)
            {nombre: 'Parrilla cocina'},                // nunca vendí una de éstas, checar la descripción de una venta hecha con este producto
            {nombre: 'Hornos de cocina'},               // nunca vendí una de éstas, checar la descripción de una venta hecha con este producto
        ];

        tiposProductos.forEach((producto) => {
            TiposProductos.insert(producto);
        });
    }

});
