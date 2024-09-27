module.exports = {
    routes: [
      {
        method: "POST",
        path: "/test1/createData",
        handler: "test1.create",
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: "PUT",
        path: "/test1/updateData/:id",
        handler: "test1.update",
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: "GET",
        path: "/test1/getData/:id", // Use :id to fetch single data with ID as a path parameter
        handler: "test1.findOne",
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: "GET", // Use GET instead of POST to fetch all data
        path: "/test1/getAllData",
        handler: "test1.findAll",
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: "DELETE",
        path: "/test1/deleteData/:id",
        handler: "test1.delete",
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  