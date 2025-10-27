const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection URL
const mongoURL = "mongodb+srv://Akhila:Akhila123@cluster0.cnhvaal.mongodb.net/myproject?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoURL)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Define a simple route to test
app.get("/", (req, res) => {
    res.send("Server is running on port 5000 and MongoDB is connected!");
});

// Start server on port 5000
const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
