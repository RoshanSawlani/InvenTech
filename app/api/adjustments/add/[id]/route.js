import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        // Fetch all stock adjustments, ordered by created date (desc)
        const adjustments = await db.addStockAdjustment.findMany({
            orderBy: {
                createdAt: 'desc',  // Fetch the latest ones first
            }
        });

        return NextResponse.json(adjustments);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error, message: "Failed to fetch stock adjustments" },
            { status: 500 }
        );
    }
}


export async function PUT(request) {
    try {
        const { id, addStockQty, receivingWarehouseId, notes, referenceNumber, itemId } = await request.json();

        // Validate inputs
        if (!id || !addStockQty || !receivingWarehouseId || !notes || !referenceNumber || !itemId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Find the adjustment by ID and update it
        const updatedAdjustment = await db.addStockAdjustment.update({
            where: { id: id }, // assuming 'id' is the unique identifier
            data: { 
                addStockQty: parseInt(addStockQty),
                itemId,
                receivingWarehouseId,
                notes,
                referenceNumber
            }
        });

        return NextResponse.json(updatedAdjustment);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to update stock adjustment" }, { status: 500 });
    }
}
