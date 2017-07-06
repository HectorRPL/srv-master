/**
 * Created by jvltmtz on 19/04/17.
 */
import {Meteor} from "meteor/meteor";
import {ProductosInventarios} from "../collection";
import {Productos} from "../../../catalogos/productos/collection";
import {Marcas} from "../../../catalogos/marcas/collection";

if (Meteor.isServer) {
    // Trae t.o.d.o. el inventario
    Meteor.publishComposite('productosInventarios.tiendaMarca', function (filter, options) {
        if ((Object.keys(filter).length === 0 && filter.constructor === Object)
            || !filter.marcaId) {
            this.ready();
        } else {
            const selector = {$and: [filter]};
            options.fields = {inventarioId: 0, fechaCreacion: 0};
            Counts.publish(this, 'numProdsInventarios', ProductosInventarios.find(selector), {
                noReady: true
            });
            return {
                find: function () {
                    return ProductosInventarios.find(selector, options);
                },
                children: [
                    {
                        find: function (prodInv) {
                            return Marcas.find({_id: prodInv.marcaId}, {fields: {nombre: 1}});
                        }
                    },
                    {
                        find: function (prodInv) {
                            return Productos.find({_id: prodInv.productoId}, {fields: {campoBusqueda: 1}});
                        }
                    }
                ]
            }

        }
    });

}




