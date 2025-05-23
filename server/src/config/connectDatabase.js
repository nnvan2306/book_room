const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    "truongso_demo",
    "truongso_demo",
    "Nson091120@",
    {
        host: "103.200.23.126",
        dialect: "mysql",
        logging: false,
    }
);

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export default connectDatabase;
