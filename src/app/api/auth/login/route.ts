import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import jwt from "jsonwebtoken";
export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()
        const cookieStore = await cookies();
        const locale = cookieStore.get("NEXT_LOCALE")

        const token = jwt.sign(
            { email, password },
            process.env.NEXT_PUBLIC_JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );
        return NextResponse.json({ message: "登录成功", data: { token, locale: locale?.value } }, { status: 200 })
    } catch (error) {
        console.error("注册错误:", error)
        return NextResponse.json({ message: "服务器错误", error }, { status: 500 })
    }

}