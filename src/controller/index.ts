import contact from "./contact";

const mountRoutes = (app) => {
  app.use("/contact/v3", contact);
  // app.use('/photos', photos)
  // etc..
};

export default mountRoutes;
