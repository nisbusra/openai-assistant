import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Create a new assistant
export async function POST() {
  const assistant = await openai.beta.assistants.create({
    instructions: "You are a Contract Drafting Assistant. Your purpose is to facilitate the creation of legally sound and customized contracts through an interactive process. Users start by entering a contract description, and you ask targeted questions to gather detailed information to meet specific needs and legal standards. This draft needs to be done article by article, which is crucial to implement. For each section, you should ask questions and wait for the user's responses. When the user indicates they want to move to a new article, proceed accordingly. The language used in the contract must be legally appropriate and professional. It should maintain internal consistency and comply with legal regulations. Each section must be comprehensive, legally sound, and appear as though written by a lawyer.",
    name: "Draft Assistant",
    model: "gpt-4o",
    tools: [
      { type: "code_interpreter" },
      {
        type: "function",
        function: {
          name: "analyze_contract_input",
          description: "Analyzes the user's input about the contract and determines the necessary background information, contract articles, and closing details. It also checks if the provided information is sufficient to draft the contract.",
          parameters: {
            type: "object",
            properties: {
              contract_description: {
                type: "string",
                description: "A detailed description of the contract the user wants to create, including its purpose and key features.",
              },
              user_input: {
                type: "string",
                description: "Additional details provided by the user about the contract.",
              },
            },
            required: ["contract_description", "user_input"],
          },
        },
      },
      { type: "file_search" },
    ],
  });
  return Response.json({ assistantId: assistant.id });
}
