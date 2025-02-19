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
        const {title,location,warehouseType} = await request.json()
        const warehouse = await db.warehouse.update({
            where:{
                id
            },
            data:{
                title,location,warehouseType
            }
        })
        console.log(warehouse)
        return NextResponse.json(warehouse)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message:"Failed to Update the warehouse"
        },{status:500})
    }
}