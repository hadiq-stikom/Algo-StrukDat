import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "src/data/uts_config.json");

// Helper to ensure file exists and read it
function getConfig() {
    if (!fs.existsSync(CONFIG_PATH)) {
        const defaultConfig = {
            isActive: false,
            startTime: null,
            durationMinutes: 75,
            examId: Date.now().toString()
        };
        // Ensure directory exists
        const dir = path.dirname(CONFIG_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(defaultConfig, null, 2));
        return defaultConfig;
    }
    const data = fs.readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(data);
}

export async function GET() {
    try {
        const config = getConfig();
        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: "Failed to read config" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, password } = body;

        // Simple security: You can change this password
        if (password !== "admin123") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let config = getConfig();

        if (action === "START") {
            config.isActive = true;
            config.startTime = Date.now();
        } else if (action === "STOP") {
            config.isActive = false;
        } else if (action === "RESET") {
            config.isActive = false;
            config.startTime = null;
            config.examId = Date.now().toString(); // New ID for new session
        }

        fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update config" }, { status: 500 });
    }
}
