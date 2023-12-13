require("dotenv").config();
const express = require("express");
const app = express();
const { pool } = require("./src/functions/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.static("public"));

// Test SQL connection
pool.query("SELECT 1 + 1 AS solution").then((res) => {
	console.log('Banco ok!');
}).catch((err) => {
	console.log("Houve um erro na conexao com o banco. ", err);
});

//Swagger
if (process.env.ENABLE_SWAGGER == "true") {
	require("./swagger-setup")(app);
}

// cors
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true,
}));
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
	next();
});

//cookie
app.use(cookieParser());

//body parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import All Routes
app.use("/", require("./src/api-routes"));

app.use((error, req, res, next) => {
	res.status(error.status).json({ msg: "Requisição inválida" });
});

//Start server
app.listen(process.env.PORT, () => {
	console.log(`Server was started on port ${process.env.PORT}`);
});
