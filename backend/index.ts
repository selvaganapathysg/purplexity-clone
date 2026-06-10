import { Output, streamText } from 'ai';
import z from 'zod'
import {tavily} from  '@tavily/core';
import express from "express"
import { PROMPT_TEMPLATE, SYSTEM_PROMPT } from './prompt';
import { prisma } from './db';

const client = tavily({ apiKey: process.env.TAVILY_API_KEY });

const app = express()


app.use(express.json())


app.get("/conversations", async(req,res) => {

})

app.post("/conversation/:conversationId", async(req,res) => {

})



app.post("/purplexity_ask", async(req,res) => {
    const query = req.body.query

    const webSearchResponse = await client.search(query, {
        searchDepth: "advanced"
    })
    
    const webSearchResult = webSearchResponse.results 

    const prompt = PROMPT_TEMPLATE
    .replace("{{WEB_SEARCH_RESULTS}}", JSON.stringify(webSearchResult))
    .replace("{{USER_QUERY}}", query)

    const result = streamText({
        model: 'openai/gpt-5.4',
        prompt: prompt,
        system: SYSTEM_PROMPT, 
      });

    res.header('Cache-Control', 'no-cache');
    res.header('Content-Type', 'text/event-stream')

    for await (const textPart of result.textStream) {
        res.write(textPart)
    }

    res.write("--------------SOURCE---------------\n")


    res.write(JSON.stringify(webSearchResult.map(result => ({url: result.url}))))
    
    res.end();

})

app.post("/purplexity_ask/follow_up", async(req,res) => {

})

app.listen(3000);
