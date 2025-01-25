import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const genAi = new GoogleGenerativeAI(process.env.GOOGLE);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const model = genAi.getGenerativeModel({
    model: "gemini-1.5-flash-002",
    safetySettings,
  });

  if (!file) {
    return NextResponse.json(
      { error: "No file uploaded" },
      { status: 400 }
    );
  }

  const content = await model.generateContent([
    "what is the handwriting inside this photo \noutput just the handwritten medicine (which refrences medicine that will be in one word at most with the concentration) in the photo with no additional text in this format (medicine name) (concentration) (mg, gm), if the handwritten isn't clear try to combine the characters you generated with the most similar medicine in characters",
    {
      inlineData: {
        data: Buffer.from(await file.arrayBuffer()).toString("base64"),
        mimeType: file.type,
      },
    },
  ]);

  const text = content.response.text();

  return NextResponse.json(
    { status: "success", medicine: text },
    { status: 200 }
  );
}
