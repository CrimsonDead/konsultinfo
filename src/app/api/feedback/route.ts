import { NextRequest, NextResponse } from 'next/server';
import { IContactsForm } from '@/features/MainPage/types';
import { isUndefined } from 'lodash';

export async function POST(req: NextRequest) {
  try {
    const { fullName, phoneNumber, email, comment }: IContactsForm =
      await req.json();
    if (
      isUndefined(fullName) ||
      isUndefined(phoneNumber) ||
      isUndefined(email) ||
      isUndefined(comment)
    ) {
      return new NextResponse(
        JSON.stringify({ detail: 'Недостаточно информации для регистрации' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
        }
      );
    }
    return NextResponse.json({ details: 'ok' });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ detail: 'Ошибка при работе с токеном' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      }
    );
  }
}
