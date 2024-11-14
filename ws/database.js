const mongoose = require("mongoose");
const URI =
  "mongodb+srv://cabeleleila-leila-user:1hPfb6F68eZU3dq8@cabeleleila-leila-clust.gdxxq.mongodb.net/?retryWrites=true&w=majority&appName=cabeleleila-leila-cluster";

mongoose
  .connect(URI)
  .then(() => console.log("DB is Up!"))
  .catch((err) => console.log(err));
