import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTQ3MTU2NDc0ZDU1Yjg1OWM5YTQxM2QiLCJpYXQiOjE3MDU1OTYxMTksImV4cCI6MTcwNjIwMjcxOSwidHlwZSI6ImFjY2VzcyJ9.RCBG30evSv4PQ8wSixc9qzAkOxrrSoKxnW1qnug8cJo';

        const res = await fetch('https://api.onmywaynow.ru/v1/tasks?sortBy=order%3Adesc&user=6547156474d55b859c9a413d', {
            next: {revalidate: 60},
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });

        const data = await res.json();
        return NextResponse.json(data.results);
    } catch (e) {
        console.error(e);
        return NextResponse.error();
    }
}
