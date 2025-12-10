import { authenticate } from "./authMiddleware.js";

export const protectRoute = authenticate;