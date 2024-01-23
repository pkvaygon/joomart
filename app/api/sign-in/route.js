import {NextResponse} from 'next/server';
export async function POST(emailOrLogin, password) {
    const res = await fetch('https://api.onmywaynow.ru/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailOrLogin: String('joomart.online@gmail.com'),
        password: String('zhomart1234'),
      }),
    });
  const data = await res.json()
    return NextResponse.json(data.user);
  }
  