import "server-only";
import type { LessonBody } from "./types";

/** Original sample readings. Unavailable paid lessons deliberately have no body here. */
export const additionalLessonBodies: Readonly<Record<string, LessonBody>> = {
  "systems-inventory": {
    introduction: "A design system starts with decisions you make more than once. Collect the differences before deciding which should become rules.",
    sections: [{ title: "Collect a small set", body: "Choose three screens from one product. List repeated controls, text roles and spacing relationships. Record where the same action looks different, and where different actions look identical. Keep the screenshots beside your notes so you can revisit the context." }, { title: "Separate variants from accidents", body: "A compact button in a dense toolbar might be a useful variant; a different shade of the same primary action might be accidental. Write a reason for each variation. Start with one repeated component and define its purpose, states and allowed differences before naming a whole system." }],
    exercise: "Create a one-page inventory with three repeated components. For one, explain a useful variant and one inconsistency you would remove.",
  },
  "color-roles": {
    introduction: "Choose what a color means before choosing its value. A palette becomes easier to use when its colors have different, understandable jobs.",
    sections: [{ title: "Start with roles", body: "Write five roles on paper: background, primary text, supporting text, action and feedback. Choose a neutral foundation first. Assign a single accent to the main action rather than making every element compete for attention." }, { title: "Use a real screen", body: "Apply the palette to a small form or course card. Include the ordinary, selected and error states. A swatch that looks attractive in isolation may not communicate clearly next to a price or a warning. Keep labels and icons available so color is not the only explanation." }],
    exercise: "Annotate one screen with the role of each color. Remove one color that has no distinct purpose.",
  },
  "color-cues": {
    introduction: "A difference in color can reinforce meaning, but it should not be the only way someone knows what happened.",
    sections: [{ title: "Remove the color mentally", body: "Imagine your screen in shades of gray. Can you identify the selected filter, the field with an error and the action that succeeded? Add specific labels, a check mark or a change in shape where the meaning disappears." }, { title: "Put feedback next to its cause", body: "Place an error explanation beside the responsible input, not only at the top of the page. Describe what needs to change. Compare the normal and error versions without moving unrelated controls, so someone can recover without searching again." }],
    exercise: "Sketch a selected filter and an invalid field that remain understandable without color. Write the exact feedback each needs.",
  },
  "color-review": {
    introduction: "A palette is a working decision, not a finished presentation. Review it where people read, choose and recover.",
    sections: [{ title: "Compare several states", body: "Keep the same screen visible in its default, focused, selected and error states. Check whether the hierarchy remains clear and whether small text is comfortable to read. Do not judge legibility from a large color swatch." }, { title: "Record what you changed", body: "Write the role you adjusted, why it needed changing and which screens depend on it. A shared token is useful only when its consumers are checked. Keep the previous version so a later change can be compared with the same task and content." }],
    exercise: "Make a four-state review sheet and note one improvement plus one question that still needs testing.",
  },
  "typescript-model": {
    introduction: "A useful model describes what is true at a particular moment. Start with the states of a feature rather than a long collection of optional fields.",
    sections: [{ title: "List valid combinations", body: "Consider a course request with loading, success and failure states. Success needs a course; failure needs an explanation; loading needs neither. Write one example object for each state. Mark combinations that should never appear, such as successful data with an active error." }, { title: "Name the discriminator", body: "Give each example a status field with a distinct value. Then describe the fields that belong to that value. Use this exercise to identify which checks a renderer must make before accessing the data. Types describe the model, but outside input still needs validation before you trust it." }],
    exercise: "Model a three-state course request on paper. Write a valid example of each state and two combinations your design should reject.",
  },
  "accessible-keyboard": {
    introduction: "Review the path through a screen using only the keyboard. Your goal is to understand the order, purpose and visibility of its controls.",
    sections: [{ title: "Follow one task", body: "Choose a task such as finding a course and opening its sample. Put the pointer aside. Move between controls and record the order, the visible focus indicator and any place where you lose your location. Do not fix problems while reviewing; keep an observable list first." }, { title: "Include an overlay", body: "Open a preview or filter dialog. Check whether you can reach its controls, close it without a pointer and return to the control that opened it. Record any unexplained focus jump. A successful keyboard pass is valuable evidence, not a complete accessibility assessment." }],
    exercise: "Record the keyboard path for a five-step task. Describe one confusing transition and the behavior you expected instead.",
  },
  "story-moment": {
    introduction: "A concrete moment gives a reader something to picture. Begin with an observable detail before explaining what the experience meant.",
    sections: [{ title: "Choose a bounded scene", body: "Pick an experience that fits within a few minutes. Write where you were, what you wanted and one detail you remember. Avoid adding a background paragraph before you have described something happening." }, { title: "Find a change", body: "What was different by the end of the scene? It can be small: a question answered, an assumption challenged or a decision made. Connect the detail you chose to that change. Remove details that are vivid but lead the reader away from the point." }],
    exercise: "Write a 120-word scene using one specific detail and one change. Underline the sentence where the direction turns.",
  },
  "microcopy-actions": {
    introduction: "A button label is a promise about what happens next. Write it from the person's task, not from the implementation behind it.",
    sections: [{ title: "Name the result", body: "Compare Continue with Read free sample. The second label explains more when a person is choosing whether to open a course. Use a verb and a useful object, then check whether the actual action fulfills that promise." }, { title: "Distinguish nearby actions", body: "Saving, enrolling and starting are different actions. Give them different names and feedback. Write labels for a course card, a preview and a lesson, then read them together. Consistency should preserve meaning rather than force every button to use the same word." }],
    exercise: "Rewrite three ambiguous controls from a product. Beside each label, describe the state change it promises.",
  },
  "light-window": {
    introduction: "One window and one object are enough for a deliberate light study. Keep the subject fixed while changing its relationship to the light.",
    sections: [{ title: "Observe before shooting", body: "Place a small object on a stable surface near a window. Look at the bright side, the shadow and the transition between them. Move yourself around the object and note where its shape becomes easiest to understand." }, { title: "Change one relationship", body: "Make three photographs with the window in front, to the side and behind the object. Avoid looking directly at the sun. Compare the pictures at the same size. Describe what each direction reveals rather than choosing a winner only because it looks more dramatic." }],
    exercise: "Keep a three-image study and write one sentence about the shape or texture revealed in each frame.",
  },
  "editing-intent": {
    introduction: "Before adjusting a photograph, describe what it should communicate. That sentence gives each edit a reason and helps you know when to stop.",
    sections: [{ title: "Read the unedited frame", body: "Look at the image at a small size. Name the subject and the first distracting element. Write whether you want the picture to feel quiet, direct or energetic, using the actual scene rather than a preset name." }, { title: "Make a limited plan", body: "Choose at most three adjustments that could support the intention: a crop, a tonal change or a local correction. Keep an untouched version. After each adjustment, compare both images at the same size and ask whether the subject is clearer, not merely whether the effect is noticeable." }],
    exercise: "Write a one-sentence intention and a three-step edit plan for one photograph. Explain an edit you deliberately chose not to make.",
  },
  "interviews-past": {
    introduction: "A conversation about a real example gives you something more specific than a prediction about future behavior.",
    sections: [{ title: "Ask for a recent occasion", body: "Instead of asking whether someone would use your idea, ask about the last time they faced the problem. Invite them to walk through what happened, what they tried and what was difficult. Ask permission before recording or sharing anything." }, { title: "Avoid supplying the answer", body: "Questions such as Was that frustrating? suggest a conclusion. Try What happened next? or How did you decide? Keep your own product pitch out of the first part of the conversation. A detail that challenges your idea can be more useful than polite agreement." }],
    exercise: "Replace three leading questions with questions about a recent example. Practice the conversation without mentioning your solution.",
  },
  "interviews-followup": {
    introduction: "Useful follow-up questions help the other person explain a detail in their own terms. They are not a way to steer the conversation toward agreement.",
    sections: [{ title: "Follow an action", body: "When someone says they checked something, ask what they checked and how. When they say a process took a long time, ask them to describe the steps rather than guessing a duration. Leave room for them not to remember." }, { title: "Reflect without concluding", body: "Summarize what you heard and ask whether you understood it. Separate their words from your interpretation in your notes. Avoid turning one example into a claim about everyone who might use the product." }],
    exercise: "Take five notes from a practice conversation. Mark each as a quotation, observed action or your interpretation, then write one follow-up question.",
  },
  "interviews-synthesis": {
    introduction: "Your notes contain both evidence and interpretation. Keeping them separate makes a product decision easier to explain and revise.",
    sections: [{ title: "Group without exaggerating", body: "Put observations about the same step together. Note how many conversations each observation came from and where the examples differ. A repeated complaint is a question to investigate, not automatic proof that a particular solution is right." }, { title: "Choose the next uncertainty", body: "Write one decision the notes might inform and one thing you still do not know. Plan a small next test that could change your mind. Remove identifying details before sharing the summary with people who were not part of the conversation." }],
    exercise: "Produce a short summary with observations, interpretations and open questions in separate columns. End with one next test.",
  },
  "offer-scope": {
    introduction: "An offer becomes easier to evaluate when someone can understand who it is for, what it includes and what it does not promise.",
    sections: [{ title: "Describe a useful result", body: "Name the person, their immediate problem and the smallest result you could deliver reliably. Replace claims such as transform your business with a concrete description of the work. Avoid guarantees that depend on factors you do not control." }, { title: "Set the boundary", body: "List what is included, what the person must bring and what happens next. Make exclusions visible rather than hiding them in a vague phrase. Before testing demand, ask someone to retell the offer in their own words; a misunderstanding is a reason to revise the description." }],
    exercise: "Draft an offer in four sentences: audience, result, scope and limitation. Ask a reader what they expect to receive.",
  },
};
