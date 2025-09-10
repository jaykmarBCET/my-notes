import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/utils/dbConnect";
import { Auth } from "@/authentication/authUser";
import { User } from "@/models/userModel";

export const GET = async (req: NextRequest) => {
    try {
        await dbConnect();
        const user = await Auth(req);

        if (user?.message) {
            return NextResponse.json(user, { status: 400 });
        }

        const currentUser = await User.findById(user.user._id);
        if (!currentUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        
        await User.findByIdAndUpdate(currentUser._id, { accessToken: "" }, { new: true });

        
        const response = NextResponse.json({ message: "Successfully logged out" }, { status: 200 });
        response.cookies.set("token", "", { httpOnly: true, sameSite:"strict", secure: true });

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Server issue while logging you out", error }, { status: 500 });
    }
};
