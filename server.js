import "dotenv/config"
import app from "./src/app.js"
import connectDB from "./src/common/config/db.js"

const PORT = process.env.PORT || 5000

const start = async () => {

    await connectDB()

    app.use((err, req, res, next) => {
        console.error(err);

        res.status(err.status || 500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    });
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT} in ${process.env.NODE_ENV} mode`);
    })
}

start().catch((error) => {
    console.log("Failed to start server", error);
    process.exit(1)
})