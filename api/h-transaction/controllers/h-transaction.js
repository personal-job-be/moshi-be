'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async salary(ctx) {

    const {id} = ctx.params
    const {start} = ctx.params
    const {end} = ctx.params

    const therapist = await strapi.services["therapist"].findOne({ id });

    const comission = therapist.comission

    const htransaction = await strapi.services["h-transaction"].find({ date_gte:start, date_lte:end });
    const result = []
    for (let index = 0; index < htransaction.length; index++) {
      const idHtrans = htransaction[index].id;
      const singleTrans = {}
      singleTrans.htrans = htransaction[index]
      const dtransaction = await strapi.services["d-transaction"].find({ 
        h_transaction : idHtrans, 
        therapist:id 
      });
      singleTrans.detail = dtransaction
      result.push(singleTrans)
    }

    for (let index = 0; index < result.length; index++) {
      const transaction = result[index];
      const omset = transaction.detail.map(detail => detail.type.base_price).reduce((prev, curr) => prev + curr)
      const commission =transaction.detail.map(detail => detail.type.base_price * comission / 100
      ).reduce((prev, curr) => prev + curr)
      result[index] = {...result[index],...{commission}}
      result[index] = {...result[index],...{omset}}
    }

    // entity = await strapi.services["bank-statement"].create(ctx.request.body);

    return result
  },
};
