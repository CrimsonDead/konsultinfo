
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { IMassage } from '@/features/MainPage/types';
import { isUndefined } from 'lodash';
import fsPromises from 'fs/promises';
import path from 'path';

type TTokenPayload = {
  user_id: number;
  role: string;
};

interface IDefaultData {
  issue: string;
  category: string;
  fullName: string;
  phoneNumber: string;
}

const secret = 'awdadadwa';

const massageFilePath = path.join(
  process.cwd(),
  "public/mock/mockMassages.json"
);

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return new NextResponse(
        JSON.stringify({ detail: "Токен доступа отсутствует" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json;charset=utf-8" },
        }
      );
    }
    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      return new NextResponse(
        JSON.stringify({ detail: "В доступе отказано" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json;charset=utf-8" },
        }
      );
    }
    const massages: string = await fsPromises.readFile(
      massageFilePath,
      "utf-8"
    );
    const json: IMassage[] = await JSON.parse(massages);
    return NextResponse.json(json);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ detail: "Error reading or parsing the JSON file!" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json;charset=utf-8" },
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return new NextResponse(
        JSON.stringify({ detail: "Токен доступа отсутствует" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json;charset=utf-8" },
        }
      );
    }
    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      return new NextResponse(
        JSON.stringify({ detail: "В доступе отказано" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json;charset=utf-8" },
        }
      );
    }
    const { issue, category, fullName, phoneNumber }: IDefaultData =
      await req.json();
    if (
      isUndefined(issue) ||
      isUndefined(category) ||
      isUndefined(fullName) ||
      isUndefined(phoneNumber)
    ) {
      return new NextResponse(
        JSON.stringify({ detail: "Недостаточно информации для регистрации" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json;charset=utf-8" },
        }
      );
    }
    return NextResponse.json({ details: 'ok' });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ detail: "Error reading or parsing the JSON file!" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json;charset=utf-8" },
      }
    );
  }
}
