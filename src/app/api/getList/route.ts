import { NextResponse } from "next/server"

const list = [{
    id: 1,
    name: "张三",
    age: 18,
}, {
    id: 2,
    name: "李四",
    age: 19,
}, {
    id: 3,
    name: "王五",
    age: 20,
}];

export async function GET() {
    try {
        // 模拟从服务器获取数据
        return NextResponse.json({ message: "请求成功", data: list }, { status: 200 })
    } catch (error) {
        console.error("退出登录错误:", error)
        return NextResponse.json({ message: "服务器错误" }, { status: 500 })
    }
}

