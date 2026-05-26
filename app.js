const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api/api-error"); // Sửa lại đúng đường dẫn thư mục /api/

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

// Sửa lại tên biến thành contactsRouter cho đúng với dòng số 3
app.use("/api/contacts", contactsRouter);

// Middleware xử lý lỗi 404 khi không tìm thấy route phù hợp
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// Middleware tập trung xử lý lỗi và trả về phản hồi cho client
app.use((err, req, res, next) => {
    // Sửa chữ error thành err theo đúng tham số nhận vào ở trên
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    return res.status(statusCode).json({
        message: message,
    });
});

module.exports = app;