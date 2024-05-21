import { NextRequest, NextResponse } from "next/server";
import db from "../database";

export async function GET(request: NextRequest) {
  db.all("SELECT * FROM notes", (err: Error | null, rows: any[]) => {
    if (err) {
      console.error(err.message);
      return NextResponse.error();
    }
    return NextResponse.json(rows);
  });
}