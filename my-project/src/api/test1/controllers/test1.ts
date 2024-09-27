import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::test1.test1",
  ({ strapi }) => ({
    async create(ctx) {
      const { data } = ctx.request.body;

      try {
        const response = await strapi
          .service("api::test1.test1")
          .createWithTotalPrice(data);
        return ctx.send(response, 201);
      } catch (error) {
        return ctx.send({ error: error.message }, 400);
      }
    },

    async update(ctx) {
      const { id } = ctx.params;
      const { data } = ctx.request.body;

      try {
        const response = await strapi
          .service("api::test1.test1")
          .updateWithTotalPrice(id, data);
        return ctx.send(response, 200);
      } catch (error) {
        return ctx.send({ error: error.message }, 400);
      }
    },

    async findOne(ctx) {
      const { id } = ctx.request.query;

      try {
        const response = await strapi
          .service("api::test1.test1")
          .findOneWithTotalPrice(id);

        return ctx.send(response, 200);
      } catch (error) {
        return ctx.send({ error: error.message }, 400);
      }
    },

    async findAll(ctx) {
      const {
        sortKey = "createdAt",
        sortOrder = "desc",
        pageSize,
        pageNumber,
        search = "",
      } = ctx.request.body;

      try {
        const totalRecordsCount =
          await strapi.entityService.count("api::test1.test1");

        const effectivePageSize = pageSize
          ? Math.max(parseInt(pageSize), 1)
          : totalRecordsCount; 
        const effectivePageNumber = pageNumber
          ? Math.max(parseInt(pageNumber), 1)
          : 1; 

        const response = await strapi
          .service("api::test1.test1")
          .findWithTotalPrice(
            sortKey,
            sortOrder,
            effectivePageSize,
            effectivePageNumber,
            search
          );

        return ctx.send(response, 200);
      } catch (error) {
        return ctx.send({ error: error.message }, 400);
      }
    },

    async delete(ctx) {
      const { id } = ctx.params;

      try {
        const response = await strapi.service("api::test1.test1").delete(id);
        return ctx.send(response, 200);
      } catch (error) {
        return ctx.send({ error: error.message }, 400);
      }
    },
  })
);
