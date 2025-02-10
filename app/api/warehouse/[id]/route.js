import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request,{params:{id}}){
    try {
        const warehouse = await db.warehouse.findUnique({
            where:{
                id
            }
        })
        return NextResponse.json(warehouse)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message:"Failed to fetch the warehouse"
        },{status:500})
    }
}

export async function PUT(request,{params:{id}}){
    try {
        const {title} = await request.json()
        const brand = await db.brand.update({
            where:{
                id
            },
            data:{
                title
            }
        })
        console.log(brand)
        return NextResponse.json(brand)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message:"Failed to Update the brand"
        },{status:500})
    }
}