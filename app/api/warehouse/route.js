import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, location, warehouseType, description} = await request.json();

        const warehouse = await db.warehouse.create({
            data: {
                title,
                location,
                description,
                warehouseType,
            },
        });

        console.log(warehouse);
        return NextResponse.json(warehouse);
    } catch (error) {
        console.error("Error creating warehouse:", error);
        return NextResponse.json(
            { message: "Failed to create a warehouse", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request){
    try {
        const warehouse = await db.warehouse.findMany({
            orderBy:{
                createdAt:'desc' //latest warehouse
            },
            select: {
                id: true,
                title: true,
                location: true,
                description: true,
                warehouseType: true,
                createdAt: true,
                updatedAt: true
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

export async function DELETE(request){
    try {
        const id = request.nextUrl.searchParams.get("id")
        const deleteWarehouse = await db.warehouse.delete({
            where:{
                id
            },
            include:{
                item:true
            }
        })
        return NextResponse.json(deleteWarehouse)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message:"Failed to Delete Warehouse"
        },{
            status:500
        })
    }
}