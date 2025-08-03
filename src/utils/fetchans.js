import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { llm } from "./retriever.js";
import { RunnableSequence } from "@langchain/core/runnables";

// --- Define Prompt Templates ---
// The templates remain the same as they are correct.
const Punctsentence = `Given a Sentence,
-> Fix the Punctuation Mistakes from given Sentence
Sentence : {sent}
Fixed Sentence : `;

const Gramsentence = `Given a Sentence,
-> Fix the Gramatical Mistakes from given Sentence
Sentence : {sent}
Fixed Sentence : `;

const Convrtsentence = `Given a Sentence,
-> Convert the Language of the Sentence
Sentence : {sent}
Language : {lang}
Converted Sentence : `;

// --- Create Runnable Prompt Instances ---
const PunctPromt = PromptTemplate.fromTemplate(Punctsentence);
const GramPrompt = PromptTemplate.fromTemplate(Gramsentence);
const CnvrtPrompt = PromptTemplate.fromTemplate(Convrtsentence);

// --- Create Sub-Chains ---
// These are now simple building blocks that take a specific input object.
const PunctChain = PunctPromt.pipe(llm).pipe(new StringOutputParser());
const GramChain = GramPrompt.pipe(llm).pipe(new StringOutputParser());
const CnvrtChain = CnvrtPrompt.pipe(llm).pipe(new StringOutputParser());

// --- The Fixed Pipeline using a single RunnableSequence ---
// Instead of chaining with `.pipe()`, we use a single RunnableSequence
// to define the entire workflow. Each step explicitly calls the next chain
// with the correct input, which is a key from the previous step.
const chain = RunnableSequence.from([
  // Step 1: Fix punctuation. The output is an object with 'punctuated_sent' key.
  {
    // The entire original input ({ sent: "...", lang: "..." }) is available here.
    punctuated_sent: (input) => PunctChain.invoke({ sent: input.sent }),
    // We also "pass through" the original language variable for later use.
    lang: (input) => input.lang,
  },

  // Step 2: Fix grammar. The input here is { punctuated_sent: "...", lang: "..." }.
  {
    // Run the GramChain on the output of the previous step.
    corrected_sent: (input) =>
      GramChain.invoke({ sent: input.punctuated_sent }),
    // Again, we pass the original 'lang' variable forward.
    lang: (input) => input.lang,
  },

  // Step 3: Convert the language. The input here is { corrected_sent: "...", lang: "..." }.
  // This final step returns the direct output of the CnvrtChain.
  (input) =>
    CnvrtChain.invoke({ sent: input.corrected_sent, lang: input.lang }),
]);

// --- Invoke the Corrected Chain ---
const result = await chain.invoke({
  sent: "Hi, How re u",
  lang: "French",
});
console.log(result);

// ---------------- Here from below ex's, using any one of them is getting fix all errors. can't understand this behaviour of LLM-------------------
// ---------------- I got it now, it all depends on your prompt how u give prompt to llm for example checkout the #"To change the langauge" last one-------------------

// To Fix the grammar :

// const GrammarTemplate = `Given a sentence correct the grammar.
//     sentence: {sentence}
//     sentence with correct grammar:
//     `
// const Grammarprompt = PromptTemplate.fromTemplate(GrammarTemplate);

// const Gchain = RunnableSequence.from([
//     Grammarprompt,
//     llm,
//     new StringOutputParser()
// ])

// const result = await Gchain.invoke({
//     sentence:"i dont like mondays"
// })

// console.log(result);

// ---------------------------------------------------------------------------------------------------------------------

//To Fix the Punctuations :

// const restrictivePunctuationTemplate = `Given a sentence, add punctuation where needed.
// Do not correct any spelling or grammar mistakes. Only add necessary punctuation.

// sentence: {sentence}
// sentence with punctuation:
// `

// const punctuationPrompt = PromptTemplate.fromTemplate(restrictivePunctuationTemplate);

// const Pchain = RunnableSequence.from([
//     punctuationPrompt,
//     llm,
//     new StringOutputParser()
// ])

// const result = await Pchain.invoke({
//     sentence: "i dont like mooondays",
// })

// console.log(result);

// -----------------------------------------------------------------------------------------------------------------------------------

//To change the language of Sentence :

// const langTemplate = `Given a sentence and a langauge name. Convert it to the mentioned language
// sentence: {sentence}
// langauge: {language}
// sentence with converted language:
// `

// const langPrompt = PromptTemplate.fromTemplate(langTemplate);

// const langChain = RunnableSequence.from([
//     langPrompt,
//     llm,
//     new StringOutputParser()
// ])

// const result = await langChain.invoke({
//     sentence: "i dont like mooondays",
//     language: "Urdu"
// })

// console.log(result);
