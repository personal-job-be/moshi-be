'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findDetail(ctx) {

    const {id} = ctx.params

    const entity = await strapi.services["d-transaction"].findOne({ id });

    console.log(entity);
    // entity = await strapi.services["bank-statement"].create(ctx.request.body);

    // return entity
  },
};
