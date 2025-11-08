import { NextResponse } from "next/server";


export async function GET(request, {params}){
    const {id} = await params;
    console.log(id);
    const user = await fetch('https://jsonplaceholder.typicode.com/users/'+id).then(response => response.json());
    return NextResponse.json({user}, {status: 200});
}

export async function POST(request, {params}) {
    const {id} = await params;
    const data = await request.json();

    return NextResponse.json({id: id, data: data, success: true}, {status: 200});
}