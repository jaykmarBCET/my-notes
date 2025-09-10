import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/userModel";
import generateToken from "@/utils/generateToken";
import { dbConnect } from "@/utils/dbConnect";

interface UserInfo {
    name: string;
    email: string;
    password: string;
}

await dbConnect();

export const POST = async (req: NextRequest) => {
    try {
        const { name, email, password }: UserInfo = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        if (await User.exists({ email })) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        const token =  await generateToken(newUser._id);
        newUser.accessToken = token;
        await newUser.save({ validateBeforeSave: false });

        const res = NextResponse.json({ 
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            accessToken: token
        }, { status: 201 });

       res.cookies.set("token", token, { httpOnly: true, secure: true });

        return res;
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error",error }, { status: 500 });
    }
};
