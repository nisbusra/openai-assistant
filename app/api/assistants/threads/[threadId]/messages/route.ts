// import { assistantId } from "@/app/assistant-config";
// import { openai } from "@/app/openai";

// export const runtime = "nodejs";

// // Send a new message to a thread
// export async function POST(request, { params: { threadId } }) {
//   const { content } = await request.json();

//   await openai.beta.threads.messages.create(threadId, {
//     role: "user",
//     content: content,
//   });

//   const stream = openai.beta.threads.runs.stream(threadId, {
//     assistant_id: assistantId,
//   });

//   return new Response(stream.toReadableStream());
// }


import { assistantId } from "@/app/assistant-config";
import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Send a new message to a thread
export async function POST(request, { params: { threadId } }) {
  try {
    const { content } = await request.json();
    console.log("Received content:", content);
    console.log("Thread ID:", threadId);

    const messageResponse = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: content,
    });
    console.log("Message response:", messageResponse);

    const stream = openai.beta.threads.runs.stream(threadId, {
      assistant_id: assistantId,
    });
    console.log("Stream created:", stream);

    return new Response(stream.toReadableStream());
  } catch (error) {
    console.error("Error in POST function:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
