import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: ""
});

const getSystemMessage = (dietaryRestrictions: string, calorieGoal: string, cuisinePreferences: string[], height: string, weight: string, age: string, goal: string): string => {
    return `You are a PCOS nutrition specialist. Create a detailed meal plan following these EXACT requirements:

    ### **USER PROFILE:**
- Height: ${height} in
- Weight: ${weight} lb
- Age: ${age}
- Goal: ${goal} (Gain Weight / Lose Weight)
- Daily Caloric Intake: ${calorieGoal} kcal
- Dietary Restrictions: ${dietaryRestrictions}
- Preferred Cuisines: ${cuisinePreferences.join(", ")}

1. Create a ${cuisinePreferences.join(", ")}-style meal plan specifically designed for someone with PCOS, focusing on:
   - Blood sugar balance
   - Anti-inflammatory foods
   - Hormone-supportive nutrients
   - Appropriate portion sizes

2. The plan MUST include:
   - 3 meals per day
   - EVERY meal MUST be authentic ${cuisinePreferences.join(", ")} cuisine
   - Total daily calories: ${calorieGoal}
   - Dietary restrictions: ${dietaryRestrictions}
   - The total meal plan should contain **9 meals (3 per selected cuisine)**.  
   - Meals must be authentic but **adapted for PCOS** to support **hormonal balance, insulin regulation, and anti-inflammatory benefits**.


3. MANDATORY FORMAT FOR RESPONSE:

   DETAILED ${cuisinePreferences.join(", ")} MEAL PLANS:
   [For each meal provide:
   - Name of traditional ${cuisinePreferences.join(", ")} dish
   - Total calories AT THE TOP NEXT TO THE MEAL NAME HEADER
   - Ingredients with exact quantities (adapted to be PCOS-friendly while maintaining authenticity)
   - Calories per serving
   - Macronutrient breakdown (protein, carbs, healthy fats)]

   All meals MUST be:
   - AUTHENTIC ${cuisinePreferences.join(", ")} CUISINE
   - Modified to be PCOS-friendly while maintaining cultural authenticity
   - Anti-inflammatory
   - Insulin conscious
   - Rich in fiber
   - Include adequate protein
   - Include healthy fats
   - Meals must include **high-fiber, low-glycemic carbohydrates, healthy fats, and lean proteins**.  
   - **Avoid inflammatory ingredients** such as refined sugars, trans fats, and processed foods.  
   - **Ensure portion control and balance macros** for each meal.  
   - INCLUDE A SMALL NOTE WHY THIS MEAL IS BETTER FOR PCOS INDIVIDUALS COMAPRED TO THE ORIGINAL RECIPE DO NOT USE "PCOS" IN YOUR RESPONSE

   Note: Each dish should be a genuine ${cuisinePreferences.join(", ")} recipe that has been thoughtfully adapted for PCOS management.`;
};

export async function POST(req: Request) {
    try {
        const { messages, dietaryRestrictions, calorieGoal, cuisinePreferences, height, weight, age, goal } = await req.json();        const systemMessage = {
            role: "system",
            content: getSystemMessage(dietaryRestrictions, calorieGoal, cuisinePreferences, height, weight, age, goal)        };

        const enhancedMessages = [systemMessage, ...messages];

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: enhancedMessages,
        });

        return NextResponse.json(completion.choices[0].message);
    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: 'Failed to process chat request' }, 
            { status: 500 }
        );
    }
}