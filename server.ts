import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Proxy and Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mock Yii2 API for development if YII2_API_URL is not set or for demonstration
  app.post("/api/login", (req, res) => {
    // In a real app, this would proxy to the actual Yii2 backend
    const { username, password } = req.body;
    if (username && password) {
      res.json({
        success: true,
        user: {
          username: username,
          fName: "John",
          mName: "Doe",
          lName: "Smith",
          fullName: "John Doe Smith",
          staffUnit: "Engineering",
          email: "john.doe@example.com",
          lnm_email: "manager@example.com",
          gender: "Male",
          balance: {
            total: 30,
            taken: 5,
            remaining: 25
          }
        }
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  // Leave approval endpoint (the email link points here)
  app.get("/api/leave/approve", (req, res) => {
    const { id, token } = req.query;
    // Real logic would verify the JWT/HMAC token
    console.log(`Approving leave ${id} with token ${token}`);
    res.send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1 style="color: #003366;">Leave Approved</h1>
        <p>Leave request #${id} has been successfully approved.</p>
        <p>The employee has been notified via email.</p>
      </div>
    `);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
