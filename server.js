require("dotenv").config();
const express = require("express");
const db = require("./db"); // ใช้ db.js ที่สร้างไว้

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      "SELECT * FROM User WHERE User.user_id = ?",
      [id]
    );
    console.log(result);
    if (result.length == 0) {
      res.json({ message: "User doest not exits" });
    } else {
      await db.query(
        "UPDATE User SET name=?, email=?, password=? WHERE user_id=?",
        [name, email, password, id]
      );
      res.json({ message: "User updated completely" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      "SELECT * FROM Product WHERE Product.product_id = ?",
      [id]
    );
    console.log(result);
    if (result.length == 0) {
      res.json({ message: "Product does not exits" });
    } else {
      await db.query("UPDATE Product SET name=?, price=? WHERE product_id=?", [
        name,
        price,
        id,
      ]);
      res.json({ message: "Product updated completely" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟢 ทดสอบการดึงข้อมูลจากตาราง User
app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM User");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  try {
    const [rows] = await db.query(
      "SELECT * FROM Orders WHERE Orders.user_id=?",
      [id]
    );
    if (rows.length == 0) {
      res.json({ message: "User does not exits" });
    } else {
      res.json(rows);
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Product");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  try {
    const [rows] = await db.query(
      "SELECT * FROM Product WHERE Product.product_id=?",
      [id]
    );
    if (rows.length == 0) {
      res.json({ message: "Product does not exits" });
    } else {
      res.json(rows);
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/order", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Orders");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/order/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  try {
    const [rows] = await db.query(
      "SELECT * FROM Orders WHERE Orders.order_id = ?",
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/order/user/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  try {
    const [rows] = await db.query(
      "SELECT * FROM Orders WHERE Orders.user_id = ?",
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
});




app.get("/orderdt", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM OrderDetail ",);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/orderdt/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  try {
    const [rows] = await db.query(
      "SELECT * FROM OrderDetail WHERE OrderDetail.order_id = ?",
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/orderdt/user/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  try {
    const [rows] = await db.query(
      "SELECT * FROM OrderDetail WHERE OrderDetail.user_id = ?",
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 🟢 ทดสอบการเพิ่ม User
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const [result] = await db.query(
      "INSERT INTO User (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    res.json({ message: "User created", userID: result.insertId });
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/products", async (req, res) => {
  const { name, price } = req.body;
  console.log(req.body);
  try {
    const [result] = await db.query(
      "INSERT INTO Product (name, price) VALUES (?, ?)",
      [name, price]
    );
    console.log(result);
    res.json({ message: "Product created", productID: result.insertId });
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/order/:id", async (req, res) => {
  const id = req.params.id;
  const { date } = req.body;
  console.log(req.body);
  try {
    const [result] = await db.query(
      "INSERT INTO Orders (user_id, order_date) VALUES (?, ?)",
      [id,date]
    );
    console.log(result);
    res.json({ message: "Order created", orderID: result.insertId });
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/orderdt/:id", async (req, res) => {
  const id = req.params.id;
  const { quantity } = req.body;
  console.log(req.body);
  try {
    const [result] = await db.query(
      "INSERT INTO OrderDetail (product_id, quantity) VALUES (?, ?)",
      [id,quantity]
    );
    console.log(result);
    res.json({ message: "OrderDetail created", orderID: result.insertId });
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query(
      "SELECT * FROM Product WHERE Product.product_id =?",
      [id]
    );
    console.log(result);
    if (result.length == 0) {
      res.json({ message: `Product ID:${id} does not exits` });
    } else {
      await db.query("DELETE FROM Product WHERE Product.product_id = ?", [id]);
      res.json({ message: `Product ID:${id} deleted ` });
    }
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query(
      "SELECT * FROM User WHERE User.user_id =?",
      [id]
    );
    console.log(result);
    if (result.length == 0) {
      res.json({ message: `User ID:${id} does not exits` });
    } else {
      await db.query("DELETE FROM User WHERE User.user_id = ?", [id]);
      res.json({ message: `User ID:${id} deleted ` });
    }
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Database error" });
  }
});


app.delete("/order/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query(
      "SELECT * FROM Orders WHERE Orders.order_id =?",
      [id]
    );
    console.log(result);
    if (result.length == 0) {
      res.json({ message: `Order ID:${id} does not exits` });
    } else {
      await db.query("DELETE FROM Orders WHERE Orders.order_id = ?", [id]);
      res.json({ message: `Order ID:${id} deleted ` });
    }
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/orderdt/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query(
      "SELECT * FROM OrderDetail WHERE OrderDetail.order_id =?",
      [id]
    );
    console.log(result);
    if (result.length == 0) {
      res.json({ message: `OrderDetail ID:${id} does not exits` });
    } else {
      await db.query("DELETE FROM OrderDetail WHERE OrderDetail.order_id = ?", [id]);
      res.json({ message: `OrderDetail ID:${id} deleted ` });
    }
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
