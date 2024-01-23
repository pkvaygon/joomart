
import { NextResponse } from 'next/server';
export async function GET(request, { params }) {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTQ3MTU2NDc0ZDU1Yjg1OWM5YTQxM2QiLCJpYXQiOjE3MDU1OTYxMTksImV4cCI6MTcwNjIwMjcxOSwidHlwZSI6ImFjY2VzcyJ9.RCBG30evSv4PQ8wSixc9qzAkOxrrSoKxnW1qnug8cJo';
    try {
        if (!params || !params.id) {
            throw new Error('ID is not defined');
        }
        const { id } = params;
        const res = await fetch(`https://api.onmywaynow.ru/v1/tasks/${id}`, {
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
            }
        })
        const data = await res.json();
        console.log(data)
        return NextResponse.json(data);
    } catch (e) {
        console.error(e);
        return NextResponse.error(e);
    }
}
