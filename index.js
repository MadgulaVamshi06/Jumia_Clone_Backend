const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const categoryRoute = require('./routes/categoryRoutes');
const productRoute = require("./routes/productRoute");
const cors = require("cors");

// configure env
dotenv.config();

// database config
connectDB();

// rest object
const app = express();

const corsOptions = {
  origin: "https://jumia-clone-0.vercel.app/",
  methods: ["POST", "GET", "DELETE", "PUT"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// middleware
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api', authRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);

// rest api
app.get("/", (req, res) => {
  res.send({ message: "Welcome to Jumia" });
});

// Port
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
});