import { NextResponse } from "next/server";
import ogs from 'open-graph-scraper';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const link = searchParams.get('link')
    if (!link) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }
    try {
        const { result } = await ogs({ url: link })
        return NextResponse.json(result)
    } catch {
        return NextResponse.redirect(decodeURI(link))

    }
}