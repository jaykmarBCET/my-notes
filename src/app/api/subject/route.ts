import { Auth } from "@/authentication/authUser";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { Subject } from "@/models/subjectModel";
import { Page } from "@/models/PageModel";

await dbConnect();

export const POST = async (req: NextRequest) => {
    try {
        const authUser = await Auth(req);
        if (authUser?.message) {
            return NextResponse.json(authUser, { status: 400 });
        }

        const { name } = await req.json();
        if (!name) {
            return NextResponse.json({ message: "Name is required" }, { status: 400 });
        }

        const newSubject = await Subject.create({ name, userId: authUser.user._id });
        if (!newSubject) {
            return NextResponse.json({ message: "Server issue while creating subject" }, { status: 500 });
        }

        const subject = await Subject.findById(newSubject._id);
        if (!subject) {
            return NextResponse.json({ message: "Please try again" }, { status: 500 });
        }

        return NextResponse.json(subject, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Server issue", error }, { status: 500 });
    }
};

export const GET = async (req: NextRequest) => {
    try {
        const authUser = await Auth(req);
        if (authUser?.message) {
            return NextResponse.json(authUser, { status: 400 });
        }

        const allSubjects = await Subject.find({ userId: authUser.user._id });
        if (!allSubjects.length) {
            return NextResponse.json({ message: "No subjects available" }, { status: 404 });
        }

        return NextResponse.json(allSubjects, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Server issue", error }, { status: 500 });
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        const authUser = await Auth(req);
        if (authUser?.message) {
            return NextResponse.json(authUser, { status: 400 });
        }

        const { searchParams } = new URL(req.url);
        const subjectId = searchParams.get("id");
        const { name } = await req.json();

        if (!subjectId) {
            return NextResponse.json({ message: "Subject ID is required" }, { status: 400 });
        }
        if (!name) {
            return NextResponse.json({ message: "Enter a new subject name" }, { status: 400 });
        }

        const updatedSubject = await Subject.findByIdAndUpdate(subjectId, { name }, { new: true });
        if (!updatedSubject) {
            return NextResponse.json({ message: "Subject not found" }, { status: 404 });
        }

        return NextResponse.json(updatedSubject, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Server issue", error }, { status: 500 });
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        const authUser = await Auth(req);
        if (authUser?.message) {
            return NextResponse.json(authUser, { status: 400 });
        }

        const { searchParams } = new URL(req.url);
        const subjectId = searchParams.get("id");

        if (!subjectId) {
            return NextResponse.json({ message: "Subject ID is required" }, { status: 400 });
        }

        const existSubject = await Subject.find({ _id: subjectId, userId: authUser.user._id });
        if (existSubject.length === 0) {
            return NextResponse.json({ message: "Subject not found" }, { status: 404 });
        }

        const deletedSubject = await Subject.findByIdAndDelete(subjectId);
        if (deletedSubject) {
            await Page.deleteMany({ subjectId });
        }

        return NextResponse.json({ message: "Subject deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Server issue", error }, { status: 500 });
    }
};
