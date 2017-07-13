/**
 * Created by jvltmtz on 28/06/17.
 */
import {_} from "meteor/underscore";
import {check} from "meteor/check";
import {ProductosInventarios} from "./collection";
import {BitaFactPromoComi} from "../../bitacoras/factoresPromo/collection";

const opProductosInvetarios = {
    _updateBitaFactoresPromo(id, operacion, nuevoValorId) {

        BitaFactPromoComi.insert(
            {
                usuarioId: Meteor.userId(),
                nuevoValorId: nuevoValorId,
                operacion: operacion,
                productoId: id
            }
        );
    },
    afterUpdateProductoInventario(selector, modifier) {
        check(modifier, {$set: Object});

        if (_.has(modifier.$set, 'factorId')) {
            ProductosInventarios.find(selector).forEach(prod => {
                this._updateBitaFactoresPromo(prod._id, 'factorProducto', prod.factorId);
            });
        } else if (_.has(modifier.$set, 'promocionId')) {
            ProductosInventarios.find(selector).forEach(prod => {
                this._updateBitaFactoresPromo(prod._id, 'promocionProducto',  prod.promocionId);
            });
        } else if (_.has(modifier.$set, 'comisionId')) {
            ProductosInventarios.find(selector).forEach(prod => {
                this._updateBitaFactoresPromo(prod._id, 'comisionProducto', prod.comisionId);
            });
        }
    },
};

export default opProductosInvetarios;