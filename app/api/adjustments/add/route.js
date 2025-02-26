import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { addStockQty, receivingWarehouseId, notes, referenceNumber, itemId,supplierId } = await request.json();

        // get the item
        const itemToUpdate = await db.item.findUnique({
            where: {
                id: itemId
            }
        })

        // current item quantity
        const currentItemQty = itemToUpdate.quantity
        const newQty = parseInt(currentItemQty) + parseInt(addStockQty)

        // modify the item to the new qty
        const updatedItem = await db.item.update({
            where: {
                id: itemId,
            },
            data: {
                quantity: newQty,
            }
        })
        // get the warehouse 
        const warehouse = await db.warehouse.findUnique({
            where: {
                id: receivingWarehouseId
            }
        })
        // current stock of the warehouse
        const currentWarehouseStock = warehouse.stockQty
        const newStockQty = parseInt(currentWarehouseStock) + parseInt(addStockQty)

        // update the stock on the warehouse
        const updateWarehouse = await db.warehouse.update({
            where: {
                id: receivingWarehouseId
            },
            data: {
                stockQty: newStockQty
            }
        })
        const adjustment = await db.addStockAdjustment.create({ data: { addStockQty: parseInt(addStockQty), itemId, receivingWarehouseId, notes, referenceNumber,supplierId } })

        // affect the warehouse
        console.log(adjustment)
        return NextResponse.json(adjustment);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create a adjustment"
        }, { status: 500 })
    }
}

export async function GET(request) {
    try {
        const adjustments = await db.addStockAdjustment.findMany({
            orderBy: {
                createdAt: 'desc' //latest category
            }
        })
        return NextResponse.json(adjustments);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to fetch adjustments"
        }, { status: 500 })
    }
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id")
        const deleteAdjustment = await db.addStockAdjustment.delete({
            where: {
                id
            },
        })
        return NextResponse.json(deleteAdjustment)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Delete the Adjustment"
        }, {
            status: 500
        })
    }
}