import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { addStockQty, warehouseId, notes, referenceNumber  } = await request.json();
        const adjustment = { addStockQty, receivingWarehouseId, notes, referenceNumber };
        console.log(adjustment)
        return NextResponse.json(adjustment);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message:"Failed to create a adjustment"
        },{status:500})
    }
}