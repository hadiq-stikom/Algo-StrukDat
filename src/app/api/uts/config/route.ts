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

        // Use environment variable for security, fallback to "admin123"
        const adminPass = process.env.ADMIN_PASSWORD || "admin123";

        if (password !== adminPass) {
            return NextResponse.json({ error: "Password Admin Salah!" }, { status: 401 });
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

        try {
            fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
        } catch (fsError) {
            console.error("FS Error:", fsError);
            return NextResponse.json({ 
                error: "Gagal menyimpan konfigurasi ke filesystem (Vercel detect?). Gunakan Database/KV untuk persistensi di hosting.",
                details: String(fsError)
            }, { status: 500 });
        }

        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: "Gagal memproses request", details: String(error) }, { status: 500 });
    }
}
