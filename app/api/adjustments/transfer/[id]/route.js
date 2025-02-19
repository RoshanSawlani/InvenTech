import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // Fetch all transfer stock adjustments, ordered by created date (desc)
        const adjustments = await db.transferStockAdjustment.findMany({
            orderBy: {
                createdAt: 'desc', // Fetch the latest ones first
            }
        });

        return NextResponse.json(adjustments);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error, message: "Failed to fetch transfer adjustments" },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const { id, transferStockQty, itemId, givingWarehouseId, receivingWarehouseId, notes, referenceNumber } = await request.json();

        // Validate inputs
        if (!id || !transferStockQty || !itemId || !givingWarehouseId || !receivingWarehouseId || !notes || !referenceNumber) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Find the adjustment by ID and update it
        const updatedAdjustment = await db.transferStockAdjustment.update({
            where: { id: id }, // assuming 'id' is the unique identifier
            data: { 
                transferStockQty: parseInt(transferStockQty),
                itemId,
                givingWarehouseId,
                receivingWarehouseId,
                notes,
                referenceNumber
            }
        });

        return NextResponse.json(updatedAdjustment);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to update transfer adjustment" }, { status: 500 });
    }
}