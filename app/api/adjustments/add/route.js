import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { addStockQty, receivingWarehouseId, notes, referenceNumber,itemId } = await request.json();
        const adjustment = await db.addStockAdjustment.create({data:{ addStockQty:parseInt(addStockQty),itemId, receivingWarehouseId, notes, referenceNumber }})
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