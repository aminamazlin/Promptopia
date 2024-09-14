import prisma from "@lib/db";

export const GET = async (req) => {
  try {
    const prompts = await prisma.prompt.findMany({
      include: {
        creator: true,      
      },
    });
    console.log(prompts)
    return new Response(JSON.stringify(prompts), {status: 201});
  } catch (error) {
    return new Response("Failed to create a new prompt", {status: 500});
  }
};