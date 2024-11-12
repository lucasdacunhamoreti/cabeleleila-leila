const mongoose = require("mongoose");
const URI =
  "mongodb+srv://cabeleleila-leila-user:YeEhI0uQ8z05XTNa@cabeleleila-leila-clust.gdxxq.mongodb.net/?retryWrites=true&w=majority&appName=cabeleleila-leila-cluster";

mongoose
  .connect(URI)
  .then(() => console.log("DB is Up!"))
  .catch((err) => console.log(err));
