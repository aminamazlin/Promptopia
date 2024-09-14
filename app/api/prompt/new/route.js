import prisma from "@lib/db";

export const POST =  async (req) => {
  const {userID, prompt, tag} = await req.json();

  try {
    const newPrompt = await prisma.prompt.create({
      data: {
        creatorId: userID,
        tag,
        prompt
      }
    });

    return new Response(JSON.stringify(newPrompt), {status: 201});
  } catch (error) {
    return new Response("Failed to create a new prompt", {status: 500});
  }
}