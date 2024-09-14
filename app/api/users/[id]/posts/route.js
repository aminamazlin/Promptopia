import prisma from "@lib/db";

export const GET = async (request, {params}) => {
  try {
    const promptsUser = await prisma.prompt.findMany({
      where: {
        creatorId: params.id,
      },
      include: {
        creator: true,
      },
    });
    console.log(promptsUser)
    
    return new Response(JSON.stringify(promptsUser), {status: 200});
  } catch (error) {
    return new Response("Failed to find user's prompts", {status: 500});
  }
};