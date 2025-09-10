import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/userModel";
import { dbConnect } from "@/utils/dbConnect";
import generateToken from "@/utils/generateToken";

await dbConnect();

export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();
       
        if (!email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const user = await User.findOne({ email }).select("+password"); // Ensure password field is retrieved
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const isCorrect = await user.isPasswordCorrect(password);
        if (!isCorrect) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const token =  await generateToken(user._id);
        if (!token) {
            return NextResponse.json({ message: "Server issue while creating access token" }, { status: 500 });
        }

        await User.findByIdAndUpdate(user._id, { accessToken: token }, { new: true });

        const userResponse = user.toObject();
        delete userResponse.password; // Remove password field from response

        const res = NextResponse.json(userResponse, { status: 200 });
        res.cookies.set("token", token, { httpOnly: true, secure: true, sameSite: "strict" });

        return res;
    } catch (error) {
        return NextResponse.json({ message: "Server issue", error }, { status: 500 });
    }
};
