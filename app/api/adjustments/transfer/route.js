import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { transferStockQty, itemId, givingWarehouseId, receivingWarehouseId, notes, referenceNumber  } = await request.json();

        // the giving warehouse

        const givingWarehouse = await db.warehouse.findUnique({
            where:{
                id:givingWarehouseId
            }
        })

        // get current stock
        const currentGivingWarehouseStock = givingWarehouse.stockQty;

        if(parseInt(currentGivingWarehouseStock) > parseInt(transferStockQty)){
            const newStockForGivingWarehouse = parseInt(currentGivingWarehouseStock) - parseInt(transferStockQty);

        // update the stock
        const updatedGivingWarehouse = await db.warehouse.update({
            where:{
                id:givingWarehouseId
            },
            data:{
                stockQty:newStockForGivingWarehouse
            }
        })

        // get the recieving warehouse
        const recievingWarehouse = await db.warehouse.findUnique({
            where:{
                id:receivingWarehouseId
            }
        })

        // get current stock
        const currentRecievingWarehouseStock = recievingWarehouse.stockQty;

        // adjust stock
        const newStockForRecievingWarehouse = parseInt(currentRecievingWarehouseStock) + parseInt(transferStockQty);

        // update the stock
        const updatedRecievingWarehouse = await db.warehouse.update({
            where:{
                id:receivingWarehouseId
            },
            data:{
                stockQty:newStockForRecievingWarehouse
            }
        })

        const adjustment = await db.transferStockAdjustment.create({data:{ transferStockQty:parseInt(transferStockQty),itemId, givingWarehouseId, receivingWarehouseId, notes, referenceNumber }})

        console.log(adjustment)
        return NextResponse.json(adjustment);
        }else{
            return NextResponse.json({
                data:null,
                message:"Giving warehouse has not enough stock"
            },{status:409})
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message:"Failed to create a adjustment"
        },{status:500})
    }
}

export async function GET(request){
    try {
        const adjustments = await db.transferStockAdjustment.findMany({
            orderBy:{
                createdAt:'desc' //latest category
            }
        })
    return NextResponse.json(adjustments);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message:"Failed to fetch adjustments"
        },{status:500})
    }
}

export async function DELETE(request){
    try {
        const id = request.nextUrl.searchParams.get("id")
        const deleteAdjustment = await db.transferStockAdjustment.delete({
            where:{
                id
            },
        })
        return NextResponse.json(deleteAdjustment)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message:"Failed to Delete the Adjustment"
        },{
            status:500
        })
    }
}