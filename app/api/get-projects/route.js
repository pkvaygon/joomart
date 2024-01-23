import {NextResponse} from 'next/server';
export async function GET() {
    try {
        const res = await fetch('https://api.onmywaynow.ru/v1/projects')
        const data = await res.json()
        return NextResponse.json(data.results)
    } catch (e) {
    return console.log(e)
    }
}