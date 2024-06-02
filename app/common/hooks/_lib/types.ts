import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export interface cookieOptions extends Omit<ResponseCookie, "name" | "value"> {}
