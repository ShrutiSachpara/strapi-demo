import { factories } from "@strapi/strapi";
import { calculateTotalPrice } from "../../../utills/calculateTotalPrice";
import { StatusCodes } from "http-status-codes";
import { HandleResponse, ResponseStatus } from "../../../utills/handleResponse";

export default factories.createCoreService(
  "api::test1.test1",
  ({ strapi }) => ({
    async createWithTotalPrice(data) {
      if (data.price && data.qty) {
        data.total_price = calculateTotalPrice(
          parseFloat(data.price),
          data.qty
        );
      }

      // Use strapi.entityService.create to create the entry
      const response = await strapi.entityService.create("api::test1.test1", {
        data,
      });

      return HandleResponse({
        statusCode: StatusCodes.CREATED,
        status: ResponseStatus.SUCCESS,
        message: "data created successfully",
        data: response.id,
      });
    },

    async updateWithTotalPrice(id, data) {
      // Calculate total price using the utility function
      if (data.price && data.qty) {
        data.total_price = calculateTotalPrice(
          parseFloat(data.price),
          data.qty
        );
      }

      // Use strapi.entityService.update to update the entry
      const response = await strapi.entityService.update(
        "api::test1.test1",
        id,
        {
          data,
        }
      );

      return HandleResponse({
        statusCode: StatusCodes.ACCEPTED,
        status: ResponseStatus.SUCCESS,
        message: "Entry updated successfully",
        data: response.id,
      });
    },

    async findOneWithTotalPrice(id) {
      // Fetch a single entry by ID
      const response = await strapi.entityService.findOne(
        "api::test1.test1",
        id
      );

      if (response) {
        return HandleResponse({
          statusCode: StatusCodes.OK,
          status: ResponseStatus.SUCCESS,
          data: response,
        });
      } else {
        return HandleResponse({
          statusCode: StatusCodes.NOT_FOUND,
          status: ResponseStatus.ERROR,
          message: "data not found",
        });
      }
    },

    async findWithTotalPrice(
      sortKey: any,
      sortOrder: any,
      pageSize: number,
      pageNumber: number,
      search: string
    ) {
      try {
        const sort = sortKey && sortOrder ? { [sortKey]: sortOrder } : {};

        const start = (pageNumber - 1) * pageSize;

        const filters = {
          is_deleted: false, // Ensures that only non-deleted records are fetched
          ...(search
            ? {
                $or: [
                  {
                    test1_name: {
                      $contains: search,
                    },
                  },
                  {
                    price: {
                      $contains: search,
                    },
                  },
                  {
                    qty: {
                      $contains: search,
                    },
                  },
                  {
                    total_price: {
                      $contains: search,
                    },
                  },
                ],
              }
            : {}),
        };

        // Fetch the paginated records with search filter
        const response = await strapi.entityService.findMany(
          "api::test1.test1",
          {
            sort,
            start,
            limit: pageSize,
            filters, // Add the filters to the query
          }
        );

        // Get the total count of records for pagination, applying the same filter
        const totalRecordsCount = await strapi.entityService.count(
          "api::test1.test1",
          { filters }
        );

        // Calculate total pages
        const totalPages = Math.ceil(totalRecordsCount / pageSize);

        return HandleResponse({
          statusCode: StatusCodes.OK,
          status: ResponseStatus.SUCCESS,
          message: "Entry get successfully",
          data: {
            totalPages,
            totalRecordsCount,
            currentPage: pageNumber,
            numberOfRows: response.length,
            limit: pageSize,
            data: response,
          },
        });
      } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
      }
    },

    async delete(id) {
      // Delete an entry by ID and return the deletedEntries count
      const response = await strapi.entityService.delete(
        "api::test1.test1",
        id
      );

      // Ensure the response includes the deletedEntries property
      return { deletedEntries: response ? 1 : 0 };
    },
  })
);
