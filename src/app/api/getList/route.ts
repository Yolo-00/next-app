import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // 模拟从服务器获取数据
        const list = await prisma.user.findMany({
            include: {
                posts: true,
            },
        });
        return NextResponse.json({ message: "请求成功", data: list }, { status: 200 })
    } catch (error) {
        console.error("退出登录错误:", error)
        return NextResponse.json({ message: "服务器错误" }, { status: 500 })
    }
}

