import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  // Création du middleware de limitation de débit
  windowMs: 15 * 60 * 1000, //
  max: 100,
  message: "Too many requests, please try again later.",
});

app.use(limiter);
