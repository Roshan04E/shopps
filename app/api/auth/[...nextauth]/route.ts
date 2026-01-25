import { handlers } from "@/auth"

// This is the standard way to export in Auth.js v5
export const { GET, POST } = handlers

// Keep this if you need to force Node.js runtime
export const runtime = "nodejs"