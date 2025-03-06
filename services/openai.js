import { OpenAI } from "openai";
import Config from "../config";
import * as FileSystem from 'expo-file-system';

const openai = new OpenAI({
  apiKey: Config.OPENAI_API_KEY
});

export const getOpenAIResponse = async (imageUri) => {
  try {
    // Convert the local URI to base64
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image and identify the food item with its approximate weight in grams."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
                detail: "low"
              }
            }
          ]
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "food_item",
            description: "Extract food item and weight information from the image",
            parameters: {
              type: "object",
              properties: {
                food_name: {
                  type: "string",
                  description: "The name of the food item."
                },
                grams: {
                  type: "number",
                  description: "The weight of the food item in grams."
                }
              },
              required: ["food_name", "grams"],
              additionalProperties: false
            }
          }
        }
      ],
      tool_choice: { type: "function", function: { name: "food_item" } }
    });

    // Extract the tool call results
    const toolCalls = response.choices[0].message.tool_calls;
    if (toolCalls && toolCalls.length > 0 && toolCalls[0].function.name === "food_item") {
      return JSON.parse(toolCalls[0].function.arguments);
    }

    // Fallback
    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
};