import { NextResponse, NextRequest } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

interface RequestBody {
  prompt: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: body.prompt
        }
      ],
      model: "llama-3.2-11b-vision-preview",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });

    return NextResponse.json({
      content: chatCompletion.choices[0].message.content
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}