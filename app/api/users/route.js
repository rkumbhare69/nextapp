import { NextResponse } from "next/server";


export async function GET(request){
    const users = await fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());
    return NextResponse.json({users}, {status: 200});
}

export async function POST(request, params) {
    const {userId} = await params;
    const {name} = await request.json();;
    console.log("request params : " + userId);

    return NextResponse.json({'success': 'true', id: userId, name: name}, {status: 200});
}

export async function PUT(request){
   const {id} =  await request.json();
   console.log('PUT request params : ' + id);
   
   return NextResponse.json({
        success: true,
        id: id
   });
}

export async function DELETE(request) {
    const {id} = await request.json()
}