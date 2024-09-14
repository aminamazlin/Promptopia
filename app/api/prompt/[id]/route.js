import prisma from "@lib/db";

export const GET = async(request, {params}) => {
  try {
    const prompt = await prisma.prompt.findUnique({
      where: {
        id: params.id,
      },
      include: {
        creator: true,
      },
    });
    if (!prompt) return new Response("Prompt not found", {status: 404});

    return new Response(JSON.stringify(prompt), {status: 200});
  } catch (error) {
    return new Response("Internal server error", {status: 500});
  }
};

export const PATCH = async(request, {params}) => {
  const { prompt, tag } = await request.json();
  try {
    const existingPrompt = await prisma.prompt.update({
    where: {
      id: params.id,
    },
    data: {
      prompt: prompt,
      tag: tag,
    },
    });
    if (!exisitingPrompt) return new Response("Prompt not found", {status:404})

    return new Response(JSON.stringify(existingPrompt), {status: 200});
  } catch (error) {
    return new Response({status: 500});
  }
};

export const DELETE = async(request, {params}) => {
  try {
     await prisma.prompt.delete({
      where: {
        id: params.id
      }
    });

    return new Response("Prompt deleted successfully", {status: 200});
  } catch (error) {
    return new Response("Error deleting prompt", {status: 500});
  }
};