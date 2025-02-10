import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request,{params:{id}}){
    try {
        const supplier = await db.supplier.findUnique({
            where:{
                id
            }
        })
        return NextResponse.json(supplier)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message:"Failed to fetch the supplier"
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