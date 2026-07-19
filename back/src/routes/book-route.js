// ref: 37aa88161f 
const express = require("express");
const router = express.Router();
const bookController = require("../controller/book-controller");
const authenticate = require("../middleware/auth");

router.get("/", bookController.getBooksLanding);
router.post("/", authenticate, bookController.newBook);
router.delete("/:id", authenticate, bookController.deleteBook);

module.exports = router;