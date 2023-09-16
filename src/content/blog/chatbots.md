---
title: "Chatbots? My first machine learning experience"
description: ''
pubDate: 'June 28 2020'
---


During my final year at university, I decided to take a leap of faith and dive straight into the world of ML (Machine Learning) and data science. Without any prior knowledge, I thought, what better way to learn a new topic than to base my final year dissertation on it...Now at first, this might seem like a stupid idea, especially when considering the weight it has on my overall grade. But after the 5-6 years I’ve spent working in the software development industry, I’ve found that I learn best when I’m under pressure. 

Now onto the good stuff. I decided to go ahead and set myself the challenge of making my computer talk, which is to develop a chatbot purely using the techniques of ML. Of course, I first needed to actually find something substantial to base my thesis on, I went ahead and decided to “Solve the problem with modern chatbots”.
## The problem with chatbots
Chatbots are usually described as either “open domain”, or “closed domain”. The former being a chatbot that has no specific focus and usually seen as a general discussion bot. The latter being aimed at a specific domain, you’ll likely see this in the form of support bots on SaaS websites. I decided that this split down the middle needs to go, why not have a chatbot that can cross over the two worlds, say I want to have a chat with my friendly neighborhood bot, and also occasionally ask it for fitness tips and tutorials? I can’t do that with the current standards set in place, this kind of chatbot doesn’t fit into either category. 

I know this issue doesn’t seem overly important but it was a challenge nevertheless and I was determined to find a solution!
## My “solution”
Of course, I wanted to dip my toes into the wonderful world of ML so I went right ahead and did just that, after tons and tons of late nights researching I found an interesting approach to translation that I hadn’t seen before. The NTM (Neural Translation Machine), this a common technique used for multi-language translation, e.g. English to Spanish. Of course me being a bit naive at the time, decided that if translating one language to another using this technique is so easy, then translating one language back to itself couldn’t be much harder, right? Oh, was I wrong...the problem with this approach is that there is a countless number of acceptable replies when attempting to translate something like “hello, how are you?” back to the same language. Whereas this works perfectly fine when translating to another language as there will only ever be a small set of suitable translations.

One of the main benefits to using a NTM in my attempt was that I could control exactly how it is trained, to do so I decided to use a variety of sources, anything from top comments and replies from some of the popular fitness subreddits to famous movie scripts. I wanted to give my chatbot a range of data allowing it to hold a general conversation whilst also having fitness-specific knowledge.

Before getting into my implementation, it’s important to understand the basic concepts of the NTM. There are two core parts of the NTM, the encoder and decoder. The encoder takes in the input text and encodes it into a large matrix that can be read by the machine. The decoder then takes in this large matrix and attempts to decode it back to text. This is an extreme simplification of the NTM and it becomes far more complicated when looking into the real details of this model. However, that's not the purpose of this article and there are plenty of white papers explaining this concept much better than I ever could.

After some more research, I went right ahead and started to implement my own NTM using Keras and Tensorflow. After developing the core parts of the NTM I found myself in a pretty awkward situation. I had more data to train the model than my hardware would allow. Luckily I managed to stumble across a wonderful feature in Keras that allows you to create your own “data generator”. This provided me with a way to drip feed my NTM the huge data set I had on disk without surpassing my hardware limitations.

After developing and training my data, the next step was to provide a way for users to interact with the chatbot. Of course, coming from my web dev experience, I decided to create a web API that utilised my trained model. I also created a simple chatbot UI and baked it into another web project used as part of my dissertation to demonstrate my work.
## What needs to be improved
The chatbot itself isn’t exactly “intelligent”, it can reply to most sentences but most of the replies end up being a jumble of words that are pure nonsense. This was purely my fault and due to the poor datasets I provided during the training phase. I found that the hardest part of this project wasn’t even to create the model and get it working, but was just about finding the right data to train my model with. If I was to go back and re-do this project, I’d make sure I spent more time researching the training data, as that seemed to be the key to success.

Aside from everything else, this project made me realise that even though some areas of computer science might seem daunting when you have no experience in them, there is no harm in setting yourself a challenge, you might surprise yourself like i did.
## Try it yourself!
I still have it hosted in azure alongside the web project I prototyped, if you’re interested the following links will be helpful:
-  https://github.com/AtLeastITry/seq2seq-keras-chatBot (the source code)
-  https://ce601-chatbot.azurewebsites.net (the web API)
-  https://ce601-ui.azurewebsites.net (the web app)