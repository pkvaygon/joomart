import { NextResponse } from 'next/server';

export async function PATCH(request) {
  try {
    const { id } = request.query;
    const url = `https://api.onmywaynow.ru/v1/projects/${id}`;

    // Предположим, что request.body содержит данные, которые вы хотите отправить в PATCH-запросе
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.body),
    });

    const data = await res.json();

    return NextResponse.json(data.results);
  } catch (error) {
    console.error(error);
    return NextResponse.error('Failed to process PATCH request', { status: 500 });
  }
}
