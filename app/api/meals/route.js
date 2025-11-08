import { NextResponse } from "next/server";

export async function GET(request) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // 5 seconds delay

    const response = await fetch('http://localhost:8888/meals');
    if (!response.ok) {
        return NextResponse.json({error: 'Failed to fetch meals data, please review the GET api..'}, {status: response.status});
    }

    const meals = await response.json();
    return NextResponse.json(meals, {status: 200});
}