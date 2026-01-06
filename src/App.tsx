import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Cpu, 
  Sparkles, 
  ArrowUpRight, 
  Github, 
  Instagram, 
  ArrowRight,
  Plus,
  Moon,
  Hash,
  Menu,
  X,
  Eye,
  Clock,
  Zap,
  Heart,
  Globe,
  Monitor,
  Facebook,
  Linkedin,
  Share2,
  Check,
  Link as LinkIcon
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import authorImg from "figma:asset/e49c2be4b4e14ec6f531dcbc4c0597d433a4e3a0.png";
import malihaImg from "figma:asset/6937127384982e68024e8b72f1ec8ffe7ba56941.png";
import hishmaImg from "figma:asset/f8359c7fd185f247f9a1af9d743f0d1c14169999.png";
import zaheerImg from "figma:asset/17ae9aa8e6912325495d9e638f070842dfb18d40.png";
import logoImg from "figma:asset/790fda8b73180702a5d6c6df849968a58b4e30c0.png";

// --- Types ---
interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
  content?: string;
  author?: string;
}

// --- Mock Data ---
const POSTS: Post[] = [
  {
    id: 1,
    title: "New Year Goals: A Two-Year Journey of Hope",
    excerpt: "The journey from a simple idea in 2022 to launching Tech & Wisdom. Discover the lessons of persistence, patience, and the power of a support system.",
    category: "Philosophy",
    date: "Jan 1, 2024",
    image: "https://images.unsplash.com/photo-1613069805192-da69f511510a",
    readTime: "3 min",
    content: `## Welcome to the Journey

Hey there, friends and fellow dreamers! Welcome to my new blog, <strong>Tech & Wisdom</strong>. Grab a cup of your favorite brew, get comfy, and allow me to take you on a journey,...my journey. In this space, we’ll learn about cool tech stuff, talk about life lessons, and explore how people live and thrive all around the world. I'm so glad you're here.

<img src="https://images.unsplash.com/photo-1690695922835-5704b13fa509" alt="cozy coffee" width="600"/>

## The Spark of an Idea

The idea for this blog first struck me on a chilly evening back in January 2022. It sounds simple enough, but launching it was a big challenge that took two full years. The delay wasn't just about setting up a website; it was about becoming ready to share a part of <em>Me</em> with the world. This wasn't just a project; it was a journey of personal growth, and I'm thrilled to finally say: here we are!

## Cheers to My Guiding Stars

No one achieves their dreams alone, and I had some incredible cheerleaders along the way. First, a massive thanks to my mentor, <strong>Moustakim Kifia</strong>. His wisdom has been like a lighthouse in a storm, and he has been a guiding star from day one, always believing in me.

<img src="https://images.unsplash.com/photo-1658920530635-9c849683c20a" alt="lighthouse in a storm" width="600"/>

Then there’s my friend, <strong>Kelvin Adantchede</strong>, my pal from Benin. We met as strangers on a flight to China back in 2017, just two people with big dreams. He was on his way to work on a robotics project, while I was a high school student full of nerves, heading to the <em>Chinese Bridge Competition</em>. Kelvin has been a rock ever since, always pushing me forward.

## Overcoming Technical Roadblocks

Setting up the blog itself was a technical maze. When I discussed buying a domain in China with one of my professors, he advised it would be difficult without a registered company. Thankfully, one of my Chinese classmates came to the rescue, suggesting I use GitHub for hosting and Alibaba Cloud for the domain.

It sounds like an easy fix, but the path was anything but smooth. I fumbled through the domain template verification and called support what felt like a gazillion times. It was a true test of patience, but it taught me a valuable lesson: <strong>persistence pays off!</strong>

## What This Journey Taught Me

Navigating that technical maze and leaning on my support system wasn't just about getting a website online; it was a crash course in personal growth. Every hurdle, from a tricky domain verification to a simple word of encouragement, taught me something valuable. As we step into a new year, I want to share the simple but powerful lessons this journey gave me.

- <strong>Take Small Steps</strong>: Big dreams are built one small step at a time. Breaking your goal down into manageable actions is the key to making real progress.
- <strong>Be Patient</strong>: Meaningful achievements take time. Don't rush the process and remember to be patient and compassionate with yourself along the way.
- <strong>Stay Positive</strong>: A positive mindset is your greatest tool for problem-solving. Even when things get tough, staying optimistic helps you find a way forward.
- <strong>Ask for Help</strong>: It’s not just okay to ask for help,it’s a sign of strength. We all need a helping hand sometimes, and collaboration makes the journey better.
- <strong>Enjoy the Journey</strong>: Don't get so focused on the destination that you forget to appreciate the path. The learning, the growth, and the experience itself are the real rewards.

<img src="https://images.unsplash.com/photo-1615591626573-37baca6c2287" alt="mountain peak success" width="600"/>

## Let's Make This Year Great Together

And that’s the message I want to share with all of you as we begin this new chapter: stay hopeful, stay positive. Dream big, work hard, and laugh often.

This year, let’s hold onto these ideas. Let's work on our dreams, have fun doing it, and help each other along the way. We can make this year a great one together.

# Happy 2024 to everyone!`
  },
  {
    id: 2,
    title: "Juggling Life: A Practical Guide to Mastering Your Time",
    excerpt: "Transform chaos into clarity. Learn the secrets of morning routines, the power of 'no', and micro-scheduling to reclaim your life.",
    category: "Productivity",
    date: "Jan 15, 2024",
    image: "https://images.unsplash.com/photo-1764933173563-9f2e62b3828e",
    readTime: "5 min",
    content: `Have you ever felt like time is slipping away from you? Like you have so much to do, but not enough hours in the day? If you’re constantly feeling overwhelmed, you are not alone.

My life used to be a mess of chaos, stress, and frustration. I was dominated by an endless to-do list and felt like I had no control over my time or my life. But then, I discovered the secrets that transformed everything. In this post, I’ll share the proven methods I used to plan, prioritize, and execute my tasks efficiently, say no to distractions, and finally say yes to my own goals. You can learn these secrets, too.

## 1. The Foundation: Building a Powerful Morning Routine

The journey began with a gift from a good friend: the book <em>The Miracle Morning</em> by Hal Elrod. This guide teaches you how to create a powerful morning routine by dedicating the first hour of your day to six key activities that boost energy, focus, and motivation.

<img src="https://images.unsplash.com/photo-1737458473627-6817940519d0" alt="morning routine sun" width="600"/>

- <strong>Silence</strong>: Begin your day with quiet meditation, prayer, or reflection.
- <strong>Affirmations</strong>: Repeat positive statements that reinforce your confidence and self-worth.
- <strong>Visualization</strong>: Imagine yourself achieving your goals and living your ideal life.
- <strong>Exercise</strong>: Do some physical activity that gets your blood flowing and your body moving.
- <strong>Reading</strong>: Read something that educates, inspires, or entertains you.
- <strong>Scribing</strong>: Write down your thoughts, feelings, and insights in a journal.

At first, I was skeptical. I thought, “How can waking up early and doing these things make such a big difference?” But I decided to give it a try. The results were amazing. Following this routine, I was able to start each day with a clear mind, a positive attitude, and a sense of purpose. It taught me a fundamental lesson that the book summarizes perfectly:

<blockquote>"How you start your day determines how you live your day, and how you live your day determines how you live your life."</blockquote>

## 2. The Essential Skill: Mastering the Art of "No"

A crucial lesson in time management is learning the art of saying <strong>"no."</strong> As a natural people-pleaser, this was difficult. I realized that by saying yes to everyone and everything, I was effectively saying no to myself, sacrificing my own goals, dreams, and happiness for the sake of others.

Saying "no" is not selfish or rude; it is necessary and respectful. It’s necessary because you have limited time and energy, and it's respectful because you’re being honest and realistic with your commitments.

Here are a few tips to help you say "no" effectively:

- <strong>Be honest but kind</strong>: If you can’t do something, just say so. You don’t need to make up excuses. People appreciate honesty and will respect you for it.
- <strong>Offer a rain check</strong>: If you’re interested but can’t commit now, suggest another time that works for you. This postpones the request without rejecting the person.
- <strong>Keep it short and sweet</strong>: Often, a simple and polite "No, thanks" is all that is needed. You don't always have to justify your decision.

## 3. The Daily Strategy: Executing with Micro-Scheduling

One of the most effective tools I use is <strong>micro-scheduling</strong>,the practice of breaking down your day into small time blocks and assigning specific, granular tasks to each one. For example, instead of writing ‘work on project’ in your calendar, you write ‘work on project: research, outline, draft, edit, proofread’ and allocate a certain amount of time for each subtask.

This technique offers several key benefits:

1. <strong>Enhanced Focus</strong>: A clear plan for each hour minimizes distractions and decision fatigue. You know exactly what to do and when to do it.
2. <strong>Sustained Motivation</strong>: Breaking large projects into smaller subtasks makes them less overwhelming. Completing each small task creates a sense of accomplishment that keeps you going.
3. <strong>Improved Performance</strong>: By estimating and then tracking the actual time a task takes, you can identify areas for improvement and optimize your schedule over time.

<img src="https://images.unsplash.com/photo-1753729213561-0fd9e4669d15" alt="focused workspace" width="600"/>

For this detailed planning, I stick to the basics: a notebook, a pen, and an alarm. The notebook and pen are for creating the micro-schedule and tracking progress. The alarm is my other essential tool; I use it to remind me of tasks, set time limits to stay on track, and signal when it’s time to take a scheduled break.

## 4. The Guiding Philosophy: Simplify and Focus

My guiding principle for all time management decisions is a simple mantra: <strong>"simplify and focus."</strong>

<strong>Simplify</strong> means eliminating the non-essential to make room for what truly matters. It involves decluttering your physical space, your mind, and your schedule by saying no to commitments and tasks that don't align with your priorities.

<strong>Focus</strong> means concentrating on one thing at a time and doing it well. It is the discipline of single-tasking giving your full attention and effort to the task at hand to avoid distractions and produce high-quality work.

## Conclusion: Your Turn to Take Control

Effective time management isn't just about being busy or crossing items off a to-do list; it's about creating a lifestyle that aligns with your personal values and goals. My journey has been an adventure, and now it's your turn to start yours.

For more inspiration on this topic, I highly recommend reading <em>Focus on What Matters</em> by Darius Foroux. It’s a gem that reinforces the importance of staying focused amidst the chaos of daily life.

My transformation has been quite the adventure. Now, it’s your turn. How do you handle the ticking clock? Let’s start a conversation! Thank you so much for reading. If you found this article helpful, please share it, and follow me on Instagram for more stories and tips. Can’t wait to hear your thoughts!`
  },
  {
    id: 3,
    title: "Oracle Bones: A Personal Journey into the Heart of Ancient Chinese History",
    excerpt: "Stand in awe before 3,000-year-old messages. A personal journey to Anyang that transformed a study of characters into a passion for history.",
    category: "Culture",
    date: "Jan 22, 2024",
    image: "https://images.unsplash.com/photo-1704265587155-284d028eaf02",
    readTime: "10 min",
    content: `Have you ever seen something that changed your perspective on life? For me, it was standing in a museum in Anyang, China, looking at a 3,000-year-old turtle shell covered in scratches. That artifact, an <strong>oracle bone</strong>, didn't just feel like a piece of history; it felt like a direct line to the ancient world.

In this post, I want to share that personal story. I'll not only explain the historical role of oracle bones but also try to capture the spine-tingling moment of reading a 3,000-year-old question about the future, a moment that closed the gap between their world and mine. This journey made me fall in love with Chinese history, and I'm excited to share it with you.

## What Are Oracle Bones? A Glimpse into the Shang Dynasty

Oracle bones are pieces of animal bone or turtle shell that were used for divination during ancient China’s <strong>Shang dynasty</strong>, which ruled the Yellow River valley in the second millennium BCE. They are far more than simple fortune-telling tools; they represent the earliest known form of Chinese writing and offer a direct window into the highest levels of power in a fascinating and brutal era.

<img src="https://raw.githubusercontent.com/Mfaouzia/Mfaouzia.github.io/master/src/img/january/13.jpg" alt="ancient oracle bones script" width="600"/>
During the Shang dynasty, China was a slave society where the king held supreme power. The two most important state affairs were war and sacrifice, and the king relied on divination to make every critical decision. Oracle bones were the medium for this communication with gods and ancestors, making them instruments of state power.

The divination process was a sacred ritual. First, a diviner would meticulously carve questions onto the bone. Then, they would press a heated bronze rod into the bone, causing it to crack under the intense pressure. These cracks were interpreted as the divine answers. Finally, both the answers and, sometimes, the actual outcome of the event were carved onto the bone, creating a permanent record for the royal archives.

## From 'Dragon Bones' to National Treasure: An Accidental Discovery

The story of how oracle bones were rediscovered is as fascinating as the artifacts themselves. In the late 19th century, farmers in Anyang found these inscribed bones while digging for fertilizer. Unaware of their historical significance, they sold them as <strong>"dragon bones"</strong> to traditional medicine dealers, who would grind them into powder for medicinal use.

The pivotal moment came in <strong>1899</strong> when a scholar named <strong>Wang Yirong</strong> fell ill and was prescribed this "dragon bone" medicine. Before it could be ground up, he noticed the strange carvings on the bone fragments. As a scholar of ancient scripts, he recognized them as a form of writing more ancient than any he had ever seen. This accidental discovery revealed their true value, transforming them from a folk remedy into a national treasure.

## A Personal Encounter: My Visit to the Anyang Museum

My own journey with oracle bones began during my trip to the <strong>Chinese Character Museum in Anyang</strong>, which was part of the <em>2023 China (Anyang) International Conference of Chinese Characters</em>. The anticipation I felt walking into the museum was immense. I was about to see, with my own eyes, the very origin of the characters I was working so hard to learn.

Standing in front of the display, I saw it for the first time: a turtle plastron,the flat underside of the shell,covered in ancient script. The sense of connection to the deep past was immediate and profound.

## Decoding a 3,000-Year-Old Message

The museum guide explained that this particular oracle bone dated to the reign of <strong>King Wu Ding</strong>, a powerful Shang ruler who reigned for about 59 years, from 1250 to 1192 BCE. The inscriptions documented a divination ceremony concerning the future millet harvest, a staple food for the Shang people. The questions were carved in neat vertical columns:

- Will there be a good harvest of millet this year?
- Will there be a good harvest of millet next year?
- Will there be a good harvest of millet in three years?

Beside the heat-induced cracks were the answers the diviners had interpreted:

- There will be a good harvest of millet this year.
- There will be a good harvest of millet next year.
- <em>There will not be a good harvest of millet in three years.</em>

I was stunned. This wasn't just an abstract historical object; it was a record of real hopes and fears. In that moment, the true revelation hit me: I could recognize some of the characters and see how they evolved from the pictographic symbols on the bone into the characters I use today. It was a tangible link connecting the present day directly to the ancient world.

## How Ancient Script Rekindled My Passion

This experience was a turning point for me, both personally and academically. It reshaped my interests and gave me a new sense of purpose in my studies.

- <strong>As a Sinophile</strong>: My general interest in Chinese culture had always been strong, but seeing the oracle bone transformed it into a deep passion for Chinese history. I suddenly needed to know everything about the Shang dynasty and the fascinating evolution of characters.
- <strong>As an International Student</strong>: Learning Chinese characters had often felt like a daunting task. This experience changed that completely. It inspired me to improve my skills because I now see it not as an obstacle but as a logical, beautiful system rooted in history.

## Echoes of History: A Shared Sense of Awe

I wasn't the only one moved by this experience. My friends on the trip felt the same powerful connection to the past.

My friend <strong>Maia</strong> from Hebi City shared this poem:

<img width="250" height="300" src="https://raw.githubusercontent.com/Mfaouzia/Mfaouzia.github.io/master/src/img/january/14.jpg" alt="Maia's poem artifact" class="my-6 rounded-lg"/>

<blockquote>
"If there were no oracle bones, Chinese civilization would lose its origin. The long river of history is silent, who can speak of the mystery of writing?
The remnants of the Yin-Shang dynasty are passed down through the ages, turtle shells and animal bones preserve the fragments. Pictographs and ideographs convey profound meanings, cultural treasures are forever transmitted."
</blockquote>

<strong>Ratana Kim</strong> from Cambodia reflected:

<img width="300" height="300" src="https://raw.githubusercontent.com/Mfaouzia/Mfaouzia.github.io/master/src/img/january/18.jpg" alt="Ratana Kim's experience" class="my-6 rounded-lg"/>

<blockquote>
"The Anyang Museum was the first place where I saw Chinese oracle bone inscriptions. I felt like I had traveled back to the ancient times of the Shang and Zhou dynasties... Through oracle bones, I can discover a new way of communication."
</blockquote>

## Conclusion: The Enduring Legacy of the Oracle Bones

My encounter with the oracle bones was more than just a museum visit; it was a journey back in time. These remarkable artifacts are a bridge that connects us to the minds and spirits of ancient China. They remind us that behind the grand sweep of history are real people with real concerns.

I hope you enjoyed reading my China story. If you have any questions or comments, please feel free to reach out. I would love to hear from you.

### Dive Deeper into Chinese History

- <a href="https://en.wikipedia.org/wiki/Oracle_bone" target="_blank" class="text-amber-500 hover:underline">Oracle bone - Wikipedia</a>
- <a href="https://www.worldhistory.org/Oracle_Bones/" target="_blank" class="text-amber-500 hover:underline">Oracle Bones - World History Encyclopedia</a>
- <a href="https://www.nms.ac.uk/explore-our-collections/stories/world-cultures/oracle-bones/" target="_blank" class="text-amber-500 hover:underline">Oracle Bones - National Museums Scotland</a>
- <a href="https://www.thoughtco.com/oracle-bones-predicting-the-future-169424" target="_blank" class="text-amber-500 hover:underline">Oracle Bones: Predicting the Future - ThoughtCo</a>
`
  },
  {
    id: 4,
    title: "Learn to Code: The Ultimate Beginner's Guide to Programming",
    excerpt: "Behind every digital interaction you have lies the elegant logic of code. A comprehensive roadmap for anyone with a curious mind and a desire to create.",
    category: "Technology",
    date: "Jan 15, 2024",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
    readTime: "12 min",
    content: `Behind every digital interaction you have from the app that wakes you up to the platform you're reading this on lies the elegant logic of code. It is the creative language that allows us to communicate with computers and build the technology that shapes our world. Far from being a skill reserved for a select few, coding is accessible to anyone with a curious mind and a desire to create. This guide is your starting point, designed to walk you through everything you need to know, from the absolute basics of what coding is and why it matters, to how you can choose your first language and begin your learning journey.

<img src="https://images.unsplash.com/photo-1754342536501-93ba6323efd3" width="600" alt="abstract digital code lines bokeh"/>

## 1.0 What is Coding and Why Does It Matter?

### 1.1 Understanding the Language of Computers

At its core, coding is the process of writing instructions for a computer to follow. These instructions, called code, are written in specialized programming languages. While the field is vast, it is built on a few fundamental concepts that appear in nearly every language.

- <strong>Code</strong>: The specific instructions written for a computer to execute.
- <strong>Variables</strong>: Placeholders in your code that store information you can use and change, like a score in a game or a username.
- <strong>Loops</strong>: Cycles that repeat a block of code until a certain condition is met.
- <strong>Functions</strong>: Reusable blocks of code designed to perform a specific task.

Coding has a rich history that began in the 1940s alongside the first electronic computers and early languages like FORTRAN. Since then, it has evolved dramatically, leading to modern, powerful languages such as Python. Today, coding is the engine behind websites, mobile apps, video games, artificial intelligence, robotics, and countless other innovations that solve real-world problems.

## 2.0 Why Learning to Code is a Game-Changer

Mastering code is an investment that pays dividends across every facet of your life, from professional advancement to personal cognitive growth.

- <strong>2.1 Career Opportunities</strong>: Coding is one of the most in-demand and high-paying skills in the modern job market. It opens doors to roles like developer, designer, tester, and data analyst across diverse industries including tech, healthcare, and entertainment.
- <strong>2.2 Improved Cognitive Skills</strong>: The practice of coding sharpens your logical thinking, problem-solving abilities, creativity, and attention to detail. These enhanced cognitive skills are valuable in all areas of life, from work to personal communication.
- <strong>2.3 Empowerment as a Learner</strong>: Coding empowers you to build your own projects, experiment with ideas, and express your creativity through technology. It also gives you access to a world of online courses, platforms, and communities dedicated to continuous learning.

<img src="https://images.unsplash.com/photo-1620815023653-f65690227267" width="400" alt="minimalist server hardware lights"/>

## 3.0 Common Myths About Coding, Debunked

Don't Let These Myths Hold You Back. The idea of learning to code can seem intimidating, often due to persistent myths and misconceptions. Here are the realities behind some of the most common myths.

- <strong>Myth</strong>: Coding is only for geniuses.
  <strong>Reality</strong>: Coding is for anyone willing to learn and practice. You don't need to be a math expert; you just need a curious mind and a positive attitude.
- <strong>Myth</strong>: Coding is only for men.
  <strong>Reality</strong>: Coding is for everyone, regardless of gender, age, or background. Many women, such as Ada Lovelace, Grace Hopper, and Katherine Johnson, have made historic contributions to the field.
- <strong>Myth</strong>: Coding is boring and tedious.
  <strong>Reality</strong>: Coding is fun, engaging, and creative. You can use it to build anything you can imagine, from games and animations to functional websites and apps.

## 4.0 How to Choose Your First Programming Language

### 4.1 Finding the Right Language for Your Goals

With hundreds of programming languages available, choosing your first one depends largely on what you want to create. Below are some of the most popular languages for beginners.

- <strong>Python</strong>: A general-purpose, high-level, and easy-to-learn language used for web development, data analysis, and machine learning.
- <strong>Java</strong>: A powerful, object-oriented, and cross-platform language used for web, mobile, and desktop applications.
- <strong>C#</strong>: A modern, versatile, and object-oriented language used for web development, mobile development, and game development.
- <strong>JavaScript</strong>: A dynamic, web-based language essential for creating interactive websites and web applications.
- <strong>HTML/CSS</strong>: Not technically programming languages, but the essential blocks of the web. HTML provides structure, while CSS handles styling.

### 4.2 Key Questions to Ask Yourself:

1. <strong>The Purpose of Your Coding</strong>: What do you want to build? Your goal will guide your choice.
2. <strong>The Popularity of the Language</strong>: How widely is the language used? A popular language will have more community support.
3. <strong>The Difficulty of the Language</strong>: How much time and effort are you willing to invest? Some languages are more beginner-friendly.

## 5.0 Top Tools and Resources for Aspiring Coders

- <strong>FreeCodeCamp</strong>: A free, interactive platform that teaches web development, data analysis, and machine learning.
- <strong>Codecademy</strong>: A free and interactive platform that teaches you various programming languages and skills.
- <strong>Stack Overflow</strong>: A large, free community of coders where you can ask questions and find solutions.
- <strong>Code.org</strong>: A fun, free platform that teaches the fundamentals of coding and computer science through games.
- <strong>CodinGame</strong>: A free and fun platform that teaches coding by having you solve challenges and build games.

## 6.0 Practical Tips for a Successful Coding Journey

1. <strong>Set Realistic and Specific Goals</strong>: Define what you want to achieve with coding and establish clear metrics to track your progress.
2. <strong>Build a Portfolio</strong>: Create projects that you can showcase to others. A portfolio is a tangible demonstration of your skills.
3. <strong>Network with the Coding Community</strong>: Connect with other learners and developers who share your interests.
4. <strong>Balance Coding with Other Life Responsibilities</strong>: Learning to code is a marathon, not a sprint.
5. <strong>Maintain a Sustainable and Rewarding Coding Practice</strong>: Keep yourself inspired by working on projects you enjoy.

## 7.0 A Glimpse into the Future of Coding

Coding is not a static skill; it is constantly evolving with technology. As a skill for the future, it is at the heart of many emerging trends that will shape our world.

- <strong>Artificial Intelligence and Machine Learning</strong>: Creating intelligent systems that can learn and reason.
- <strong>Blockchain and Cryptocurrency</strong>: Developing decentralized and secure systems for transferring data and value.
- <strong>Internet of Things and Wearable Devices</strong>: Building networks of connected smart devices.

<img src="https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f" width="600" alt="artificial intelligence neural network abstract"/>

## 8.0 Conclusion: 

It's Your Time to Create Coding is a transformative skill that unlocks new ways to solve problems, express creativity, and build a rewarding career. This guide has provided a roadmap to this exciting world, covering its history, benefits, and future possibilities. The journey of a thousand lines of code begins with a single one. Start yours today.`
  },
  {
    id: 5,
    title: "A Student's Guide to University in China: 5 Essential Tips I Wish I Knew",
    excerpt: "Practical advice and personal experiences from five years of medical study in China, from navigating dorms to mastering Mandarin.",
    category: "Tips",
    date: "May 6, 2024",
    image: "https://images.unsplash.com/photo-1758471576777-f8c87bb3c067",
    readTime: "15 min",
    author: "Hishma",
    content: `My name is <strong>Hishma</strong>, and I’ve been a medical student in China for nearly five years. When I first arrived, I had just turned eighteen, moving thousands of kilometers away from the comfort of my parents' home to pursue my education. The journey has been a constant process of learning and adapting. It can be scary, but I was well-guided, and my tendency to follow the rules,think <strong>Hermione Granger</strong>, definitely helped. This is a challenge you can absolutely meet.

<img src="https://github.com/Mfaouzia/Mfaouzia.github.io/assets/98577810/154f0acd-da6a-4781-984d-31ce6fe96221" width="600" alt="Hishma's arrival journey"/>

This article is for anyone considering studying in China. Here are five essential tips I've gathered over the years, covering everything from accommodation to culture, to help make your transition smoother.

## 1.0 Navigating Your Living Situation: Dorms, Apartments, and Finances

Your living situation is one of the first things you'll need to sort out. Here’s a breakdown of what to expect regarding accommodation and money.

### 1.1 University Accommodation Rules

Each university has its own regulations, but it is common for international students to be required to live in a campus dormitory for at least the first year. Accommodation options vary, with rooms available for one, two, three, or more people.

A key rule to be aware of is that most universities <strong>do not allow cooking</strong> in dorm rooms. Some, however, provide a common kitchen for residents. It's best to inquire about your specific school’s policies during the application process.

### 1.2 Renting Off-Campus

Fortunately, many universities permit students to rent apartments off-campus. If you choose this option, I strongly advise you to <strong>seek guidance from a friend</strong> who has experience living off-campus. They can help you find a suitable apartment and, more importantly, help you avoid potential scams.

### 1.3 Money Matters and Legal Work Restrictions

When managing your finances, always be aware of the current exchange rate and make sure to <strong>save money for emergencies</strong>. How much you spend will depend entirely on your lifestyle.

It's also crucial to understand the <strong>legal restrictions on employment</strong>. By law, a foreigner on a study visa is not permitted to work. If you are caught working without the proper authorization, you risk having your residence permit canceled and being expelled from the country.

<img src="https://images.unsplash.com/photo-1763924812928-54b2d721cd5c" width="600" alt="Chinese university campus architecture"/>

## 2.0 Essential Apps for Your Smartphone

Your phone will be your lifeline, but you need the right apps to make it truly useful in China.

### 2.1 Getting Connected: VPNs and Communication

Many common applications like Instagram, WhatsApp, TikTok, and Google Maps do not function normally in China without a <strong>VPN (Virtual Private Network)</strong>. Even then, some VPNs may not work reliably. Before you travel, make sure to download <strong>WeChat</strong>. In my opinion, it is the single most useful application for anyone planning a long-term stay.

### 2.2 Must-Have Tools: Payments and Translation

A good translator app that works without a VPN is essential. I personally use <strong>Baidu Translate</strong> and find it very convenient. For payments, <strong>Alipay</strong> is another indispensable app, similar to <strong>WeChat Pay</strong>. To use these, you will need a local Chinese phone number and a Chinese bank account.

### 2.3 For the Savvy Shopper

Once you're settled, consider installing <strong>TaoBao</strong>, a massive online shopping platform where you can find almost anything at a cheap price. Be warned: the app is entirely in Chinese, and scams can be fairly common.

<img src="https://github.com/Mfaouzia/Mfaouzia.github.io/assets/98577810/9c8826aa-b3b7-41cd-a701-17d09a494680" width="600" alt="Student life apps and tools"/>

## 3.0 Why Learning Mandarin is Non-Negotiable

If you’re coming to China to study, learning Mandarin is not just a suggestion, it's essential for a successful and enriching experience.

### 3.1 Breaking the Language Barrier

Try to learn some basic Mandarin before you arrive. The first few weeks will be tough, but you will manage. The key is to <strong>practice whenever you can</strong>, whether with locals or other international students. Don't be shy about making mistakes; it's part of the process.

### 3.2 Common Conversations to Expect

Locals are often curious and friendly. Be prepared for a few common questions:
- “你是哪里的?” (Where are you from?)
- “你多大呀?” (How old are you?)
- “哇！你中文说得这么好!” (Wow! Your Chinese is so good!)

### 3.3 Recommended Dictionary Apps

I recommend two free Chinese-English dictionary apps: <strong>Hanping</strong> and <strong>Pleco</strong>. They are excellent tools for basic learning and quick lookups.

## 4.0 Embracing the Culture: People and Perspectives

China is a vast country with over 1.4 billion people, so it's impossible to generalize experiences. Your interactions will be varied.

### 4.1 A Spectrum of Encounters

During your stay, you will meet a wide range of people. Some will be incredibly open-minded, while others might be more reserved. In my experience, most people fall somewhere in the middle.

### 4.2 The Power of Speaking the Language

Believe me when I say that your <strong>ability to speak Chinese can transform your interactions</strong>. As soon as people realize you can communicate, they often open up, ask questions, and want to engage in conversation.

<img src="https://images.unsplash.com/photo-1660128355371-527b6c5f8b2f" width="600" alt="Medical student studying in library"/>

## 5.0 A Word of Caution: Navigating Local Sensitivities

While embracing the culture, it's also important to be mindful of local norms and regulations.

### 5.1 Mindful Communication

I can only urge you to be <strong>careful about what you say</strong> and what you send in messages, as you could be held accountable. As a foreign guest, it is wise to avoid discussing taboo topics or the country's political system. This advice isn't about "living on eggshells," but rather about being mindful and respectful.

<img src="https://github.com/Mfaouzia/Mfaouzia.github.io/assets/98577810/87a0903a-0b64-40e6-9afe-1679ffd5a07d" width="600" alt="Hishma's cultural exploration"/>

## 6.0 Conclusion: Your Path to a Successful Stay

Ultimately, a successful stay in China comes down to a few key principles: <strong>show respect for everyone</strong>, learn the basic local etiquette, be mindful of your actions, and, as a student, <strong>work hard</strong>. The journey from an uncertain eighteen-year-old to a confident student was built on these principles.
`
  },
  {
    id: 6,
    title: "8 Essential Cybersecurity Tips to Keep Your Online Life Safe",
    excerpt: "Protect your digital life from common cyber threats like identity theft and malware. Our guide provides simple, actionable cybersecurity tips for everyone.",
    category: "Security",
    date: "Feb 12, 2024",
    image: "https://images.unsplash.com/photo-1758983308742-f4ba1f8c8cb4",
    readTime: "12 min",
    content: `## 1.0 Why Your Digital Safety Matters More Than Ever

In today's digital age, we rely on the internet for nearly everything from work and education to communication and entertainment. This constant connection, however, exposes us to significant risks like cyberattacks, identity theft, data breaches, and malware infections. Protecting your online data and devices is crucial for your security and privacy. This article provides simple, effective tips you can use to enhance your online security and protect your personal data from common cyber threats.

<img src="https://images.unsplash.com/photo-1639503547276-90230c4a4198" width="600" alt="digital security shield and data protection concept"/>

## 2.0 Strengthen Your First Line of Defense: Password Management

Passwords are the keys to your online accounts, and using weak or reused ones leaves you vulnerable. Hackers can exploit them to access your personal and financial information or use your accounts for malicious purposes. To keep your accounts secure, follow these best practices:

- <strong>Use Unique Passwords</strong>: Use a different password for every online account. This ensures that if one password is compromised in a data breach, your other accounts will remain secure.
- <strong>Create Complexity</strong>: A strong password should be long and random, incorporating a combination of uppercase and lowercase letters, numbers, and symbols. Avoid using personal or easily guessable information like your name, birthday, or even your favorite movie.
- <strong>Use a Password Manager</strong>: A password manager is a tool that generates, securely stores, and automatically fills in complex passwords for you. Popular options include LastPass, Dashlane, and 1Password.

## 3.0 Add a Second Lock: The Power of Two-Factor Authentication (2FA)

Two-Factor Authentication (2FA) is an essential second layer of security that goes beyond just a password. When you log in, 2FA requires you to provide a second factor of verification, such as a code sent to your phone, a fingerprint scan, or a physical key. This means that even if a hacker steals your password, they cannot access your account without the second factor. It is highly recommended to enable 2FA on all sensitive accounts, including email, banking, and social media.

## 4.0 Keep Your Digital Doors Locked: The Importance of Software Updates

Software updates are critical for your security. These updates often contain "patches" that fix security vulnerabilities that hackers can exploit to gain unauthorized access to your devices and data. By regularly updating your software, you protect your devices from the latest cyber threats. It is important to update the software on all your devices, including your computer, smartphone, tablet, or smartwatch as well as your antivirus and firewall software. Enable automatic updates where possible.

<img src="https://images.unsplash.com/photo-1752069005653-d6ffdf06a0ae" width="600" alt="cybersecurity phishing and hacker concept"/>

## 5.0 Navigate the Web Wisely: Safe Browsing Habits

Safe browsing practices are crucial habits for avoiding online threats. These threats include phishing, malware, and ransomware. To practice safe browsing, follow these tips:

- <strong>Look for the Lock</strong>: Only use websites with HTTPS enabled, which you can identify by the lock icon. HTTPS sites encrypt your traffic, preventing hackers from intercepting it.
- <strong>Enhance Your Browser</strong>: Install reputable browser extensions to enhance your security and privacy. Extensions like HTTPS Everywhere, Privacy Badger, or uBlock Origin can encrypt your traffic and block trackers.
- <strong>Think Before You Click</strong>: Avoid clicking on unknown or suspicious links and attachments. You can hover your mouse over a link to see its true destination before clicking.

## 6.0 Don't Get Hooked: Recognizing Phishing Scams

Phishing is a common tactic where attackers impersonate trustworthy entities through fake emails or websites to steal your information. To avoid falling victim, watch out for these warning signs:

- Spelling or grammar errors
- An urgent or threatening tone
- Requests for personal or financial information
- Mismatched sender addresses

If you suspect a phishing attempt, do not respond. Delete or report the message, and if you need to verify the sender's authenticity, contact them through a different, trusted channel.

## 7.0 Be Cautious on Public Wi-Fi

Public Wi-Fi networks, while convenient, are often unsecured. This means hackers on the same network can intercept your online traffic. To stay safe on public Wi-Fi:

- Avoid accessing sensitive information.
- Log out of all accounts when you are finished.
- <strong>Use a Virtual Private Network (VPN)</strong>: A VPN creates a secure and encrypted connection, protecting your data from prying eyes.

## 8.0 Create a Safety Net: Why You Need to Back Up Your Data

Data backup is the process of creating copies of your data to protect it from loss due to events like a ransomware attack or hardware failure.

- <strong>Local Backups</strong>: Store your data on physical devices like external hard drives or USB flash drives.
- <strong>Cloud Backups</strong>: Store your data on remote servers using services like Google Drive, Dropbox, or iCloud.

## 9.0 Manage Your Digital Footprint: Social Media Privacy

Cybercriminals can exploit personal information shared on social media for identity theft or social engineering attacks. To protect your privacy:

- <strong>Review Your Privacy Settings</strong>: Adjust your settings to control who can see your profile and posts.
- <strong>Limit Personal Information</strong>: Avoid sharing sensitive details publicly, such as your full name, date of birth, address, or phone number.
- <strong>Be Wary of Strangers</strong>: Be cautious about accepting friend requests or clicking on links from people you don't know.

## 10.0 Conclusion: Making Cybersecurity a Lifelong Habit

Cybersecurity is an ongoing process, not a one-time fix. By consistently applying these simple yet effective tips, you can significantly enhance your security and privacy. Stay informed about the latest threats, adjust your practices as needed, and share what you learn. Cybersecurity is a collective responsibility, and every one of us has a role to play.`
  },
  {
    id: 7,
    title: "The Power of Small Changes: How to Build Good Habits for a Happier Life",
    excerpt: "The most effective path to lasting personal growth isn't about giant leaps; it's about taking small, consistent steps forward every single day.",
    category: "Personal Development",
    date: "Jan 29, 2024",
    image: "https://images.unsplash.com/photo-1544654187-454deb2b423e",
    readTime: "8 min",
    author: "Maliha",
    content: `## 1.0 Introduction: The Journey of a Thousand Miles

If you've ever set an ambitious New Year's resolution only to see it fade by February, you're not alone. We often approach self-improvement with a desire for massive, immediate change, but this is rarely a sustainable path. The truth is found in timeless wisdom: <strong>“Rome wasn’t built in a day,”</strong> and as we learn throughout life, <strong>“small achievements create big differences.”</strong> The most effective path to lasting personal growth, happiness, and success isn't about giant leaps; it's about taking small, consistent steps forward every single day. This article will explore how cultivating these small habits can become the foundation for a more fulfilled and successful life.

<img src="https://images.unsplash.com/photo-1763401927515-2c6f52137069" width="600" alt="journaling and morning reflections"/>

## 2.0 Redefining "Good Habits": The Building Blocks of a Better You

At its core, a good habit is any consistent action that generates positivity, improves your well-being, and contributes to your long-term goals. Think of them as small, daily investments that bring happiness and success into your life by helping your brain release dopamine, the "feel-good" neurotransmitter. Here are some simple yet powerful habits you can start cultivating today:

- <strong>Gratitude</strong>: Take a moment to appreciate the small positive things in your surroundings. Expressing thanks to others, even for minor things, can completely transform your day. This practice makes you more attuned to positive interactions; you'll find that even a simple smile from a stranger can energize your entire day.
- <strong>Organization</strong>: A cluttered space often leads to a cluttered mind. But organization is about more than just your desk; it's about investing your time and energy wisely. By taking the time to organize your workspace and schedule, you ensure your most valuable resources are dedicated to what truly matters, boosting your efficiency and significantly reducing stress.
- <strong>Consistency</strong>: Consistency is the greatest weapon for success. No matter what positive actions or attitudes you adopt, taking a few moments each day to reflect on them reinforces your commitment and keeps you on the right path.
- <strong>Health</strong>: Your health is your power and the essential foundation for success. This includes regular exercise, staying hydrated (a water-reminder app can be a great tool!), getting adequate sleep, and eating a balanced diet. A simple switch, like replacing processed carbs with fruits and nuts, can make a huge difference.
- <strong>Spreading Happiness</strong>: You have the power to make a positive impact on others. Simple acts of kindness, like complimenting the bus driver or the cashier at the supermarket, can brighten their day and, in return, infuse you with positive energy. This extends to being open-hearted and genuinely celebrating the successes of those around you, creating a virtuous cycle of shared joy.
- <strong>Resilience</strong>: Life will inevitably present challenges. Resilience is the habit of adapting to your environment and preparing for obstacles rather than complaining about circumstances. By embracing challenges as learning opportunities, you cultivate contentment and the inner strength to thrive in any situation.

<img src="https://raw.githubusercontent.com/Mfaouzia/Mfaouzia.github.io/master/src/img/january/20.png" width="300" alt="Healthy snack alternatives like fruit and nuts"/>

## 3.0 The Science of Small Wins: How Tiny Steps Lead to Giant Leaps

Building good habits is not about willpower alone; it's about understanding the psychology of gradual progress. Tiny, consistent actions create momentum and compound over time, leading to remarkable transformations.

### 3.1 The Power of Gradual Progress
Setting a massive, year-long goal can be intimidating and often leads to procrastination. A more effective approach is to aim for gradual transformation by setting small, short-term goals. Targeting a change over a 15 or 30-day period is far more manageable and helps maintain focus, making it easier to achieve the desired transformation.

### 3.2 The Domino Effect of a Keystone Habit
Often, just one good habit can act as a catalyst for many others. A morning walk is a perfect example. What starts as a simple form of physical exercise can lead to a cascade of other positive outcomes: better sleep patterns, increased energy, improved stress management, mindfulness, and a strengthened connection with nature.

<img src="https://raw.githubusercontent.com/Mfaouzia/Mfaouzia.github.io/master/src/img/january/22.png" width="300" alt="Morning walk habit for mental clarity and energy"/>

### 3.3 Achieving Mind-Body Balance
The ultimate goal of building good habits is to enhance your overall well-being. These practices contribute not only to your physical health but also to your mental and emotional balance. This holistic strength is the true foundation upon which you can achieve your biggest goals in life.

## 4.0 Your Toolkit for Building Habits That Stick

Successfully forming and maintaining new habits requires a practical approach. Here are a few simple techniques you can use to integrate positive changes into your daily routine.

### 4.1 Find Your Motivation
Motivate yourself by recognizing your past accomplishments. Reflect on what you did to achieve those successes and identify the positive habits that contributed to them. By consciously embedding these habits into your daily routine, you create a powerful cycle of motivation and continuous improvement.

### 4.2 Use Visual Reminders
Our brains respond well to visual cues. Use simple tools like sticky notes to remind yourself of scheduled tasks or new habits you're trying to build. A friendly note to yourself or an expression of appreciation placed where you'll see it often can serve as both a reminder and a source of motivation.

<img src="https://raw.githubusercontent.com/Mfaouzia/Mfaouzia.github.io/master/src/img/january/23.png" width="300" alt="Sticky notes and visual reminders for daily habits"/>

### 4.3 Learn from Your Challenges
Challenges are not failures; they are opportunities to learn and grow stronger. Embracing obstacles and seeing them as preparation for future hurdles is an integral part of the path to success. Acknowledging the lessons within these challenges empowers you to navigate your journey with greater resilience.

## 5.0 Overcoming the Common Roadblocks

Even with the best intentions, you may face obstacles. Understanding these common roadblocks is the first step to overcoming them.

### 5.1 Winning the Battle Against Procrastination
Procrastination is simply the act of delaying scheduled work. This habit can severely hinder personal and professional growth by disrupting your routine and stalling your journey. To build good habits, you must first commit to winning the battle against procrastination.

### 5.2 Avoiding the "Too Big, Too Soon" Trap
One of the biggest mistakes is setting goals that are too ambitious from the very beginning. If you want to start exercising, don't aim for 10,000 steps on your first day. Start small and build momentum. Failing to establish the basics is often the primary obstacle to success. Remember, <strong>“Rome wasn’t built in a day.”</strong>

<img src="https://images.unsplash.com/photo-1763561028942-56670d9de59b" width="600" alt="a path through nature representing gradual progress"/>

## 6.0 A Simple Framework for Success: The Atomic Habits Method

For a deeper dive into the science of habit formation, James Clear’s book, <strong>“Atomic Habits,”</strong> is an excellent resource. It explores how making small, incremental changes can lead to remarkable results. The book is structured around a simple but powerful four-step model for building better habits:

1. <strong>Cue</strong>: The trigger that initiates the habit.
2. <strong>Craving</strong>: The desire for the reward associated with the habit.
3. <strong>Response</strong>: The action or habit itself.
4. <strong>Reward</strong>: The positive reinforcement that makes the brain want to repeat the loop.

The book delves into how these tiny habits compound over time to create significant personal and professional transformations. If you ever feel low or frustrated on your journey, it is a highly recommended read that can change your way of thinking.

## 7.0 Final Thoughts: Embrace Your Journey

Building good habits is a beautiful journey of self-improvement, not a final destination. There will be ups and downs, but every step forward is a victory. Celebrate the process, be patient with yourself, and enjoy the positive transformations that come with cultivating a life of purpose, one small habit at a time.

---

## 8.0 About the Author

<strong>Author: Maliha</strong>

I am Syeda Maliha Marium, a graduate student at Tianjin University, specializing in network security. As an individual, I embrace optimism and strive to maintain confidence in the face of challenges. Beyond my academic pursuits, I find joy in writing, observing life and people, and holding a steadfast belief in miracles. Additionally, my passions extend to the realms of traveling and cooking.`
  },
  {
    id: 8,
    title: "Living Abroad: 11 Practical Tips to Adapt to a New Culture with Confidence",
    excerpt: "Moving abroad can feel overwhelming at first. These 11 practical tips will help you handle culture shock, build friendships, and feel at home in a new country.",
    category: "Life",
    date: "Feb 5, 2024",
    image: "https://res.cloudinary.com/dvjxri3cd/image/upload/v1707054238/Mfaouzia/hoi-an-6564496_w8bcnz.jpg",
    readTime: "10 min",
    author: "Mfaouzia",
    content: `## 1.0 Moving to a New World: The Two Faces of Adventure

Moving to a new country can feel like two emotions at once: excitement and fear. Everything is fresh,new streets, new habits, new faces. But the same “newness” can also be tiring. Language barriers, unfamiliar social rules, and homesickness are real challenges, especially in the first months.

The good news is that cultural adjustment is a skill. You can learn it, practice it, and get better over time. Below are <strong>11 practical tips for living abroad</strong>, based on experience, observation, and the small lessons that helped me feel at home in a different culture.

<img src="https://images.unsplash.com/photo-1763141437626-57697f56e9c2" width="600" alt="Authentic local food market representing cultural immersion"/>

## 2.0 Essential Strategies for Cultural Fluency

### 2.1 Learn the Language (Even a Little Helps)

If you want to adapt to a new culture, start with the language. You do not need to speak perfectly. What matters is effort. Learn simple phrases you will use every day: greetings, gratitude, directions, food orders, and polite questions. These basics show locals that you respect their culture.

### 2.2 Stay Open-Minded and Curious

Culture can feel “strange” before it feels normal. Try not to judge quickly. Instead, stay curious. Read about local history and social norms. Observe how people greet, eat, communicate, and solve problems. Curiosity reduces culture shock.

### 2.3 Balance Your Home and New Culture

Adapting does not mean erasing who you are. It means learning how to live well between two worlds. Keep some of your own routines,foods you love, faith practices, family traditions, while adopting new customs that make life easier.

## 3.0 The Power of Connection

### 3.1 Build Friendships with Locals

Local friendships help you understand social rules and discover places that tourists miss.

<strong>Personal story:</strong>  
I have made many friends with the locals since I moved to China. The first time I visitedn China was in 2017 when I was in high school. I was amazed by the country’s diversity and beauty and wanted to learn more about it. The second time was in March 2019 when I came to study at Dalian University. During that time, I would often go to the university park or library and try to make friends with Chinese students. I understand that making the first move can be challenging as we tend to overthink what others will think of us. But for me, making friends comes naturally because I can talk to anyone.

So, how do I do it? First, I analyze the person in front of me. For instance, if I’m at the university park and see a young person, I assume that they are a student. I say hello and ask something like, “Do you know any market on campus? I’m new here.” Usually, the person ends up helping me because I’m new, and they are local. Along the way, I ask them questions about their major, or which province they are from. As I have knowledge about China’s culture, we can engage in a conversation. To give an example, I once met a girl from Sichuan and asked her if she liked spicy food. She answered yes and invited me to try some hot pot with her. We had a fantastic time, and we became good friends. It’s the same approach if I meet people outside of campus.

Let me provide another example. When I moved to Tianjin, I lived outside the campus and met many people who became like family to me. In January 2022, when the COVID-19 outbreak started near my neighborhood, I went to my community office and offered help. It was there that I met a kind-hearted sister. After a few days, she invited me to her home and introduced me to her husband and child, saying,’You are like a sister to me, and I want you to meet my family.’ Touched by her kindness, I gladly accepted the invitation. And last year, she took me to her village, where I met her entire family, including siblings, nieces, nephews, neighbors, and friends. They welcomed me with open arms and treated me as one of their own. They showed me their farm, cooked delicious food for me, and taught me local songs and dances. Over time, we’ve grown close. I’ve learned so much about Chinese culture, language, and lifestyle from them, and they’ve had the opportunity to learn about my culture, religion, and values. Our relationship is built on mutual respect and appreciation.

<img src="https://raw.githubusercontent.com/Mfaouzia/Mfaouzia.github.io/master/src/img/February/4.jpg" alt="A warm moment with local friends in China" height="400" width="300"/>

### 3.2 Stay Connected with Family and Old Friends

Regular contact gives emotional stability. 

<strong>Personal story:</strong>  
 I want to emphasize this point, because I have some regrets that I wish I could avoid. I do not usually like to share my feelings, but in this case, I have no choice. This article is meant to provide tips, so I believe it is important to be honest with you. Let me start by saying that the love of my life was and is my Dad (may his soul rest in peace). He was the person I could share anything without fear. He was my first teacher in life, teaching me how to read, write, and speak. He also taught me the values of kindness, respect, and bravery. He was always there for me, supporting, encouraging, and loving me. However, when I left the country, it became difficult to communicate with him. He had WhatsApp but struggled to use it. He didn’t know how to send messages, photos, or voice notes. He only knew how to answer normal calls. So, I would call him once a month, recharging credit and calling him normally. He was always happy to hear from me, asking about my life, studies and health. While, also sharing about his own life and health. He always ended the call with “Take care of yourself.” When he passed away in July 2022, I felt the most regret. Why didn’t I try to find a way to call him every week? Why didn’t I try to teach him how to use WhatsApp better? Why didn’t I express how much I loved and missed him? To be honest, I miss him every single day. I wish I could hear his voice, see his face, and hug him once again. Since that day, I make it a point to call my mom at least twice a day and my brother once a week, knowing that he is focused on his studies and only opens social media on weekends.

My phone broke and I purchased a new one, changing my SIM card. I decided to add my friends later, as I wanted to prioritize my family. However, due to being occupied I forgot and got accustomed to only calling my family. Then in December 2023, one day as I opened my Facebook, I discovered a message informing me that one of my good friends had passed away. She was my childhood friend, and we grew up together, playing, studying, and dreaming together. She was like a sister to me, and I cared deeply for her. I was left speechless. I felt remorseful because it had been a year since we last spoke. I didn’t know what had happened to her or how she had died. I felt guilty and sad, because I had not kept in touch with her or inquired about her well-being. However, this incident has taught me the importance of taking care of the few friends I have left. They are dear to me, and I value their presence in my life. I may not be able to call them every day, due to everyone’s busy schedules, but I should make it a point to send a text at least once a week. I should ask them how they are, what they are doing, and if they need any support.

## 4.0 Navigating Your New Environment

### 4.1 Explore Your New City Slowly

Confidence comes from familiarity. Start small: one neighborhood, one café, one market. 

<strong>Personal story:</strong>  
In Dalian, I explored alone many times. I got lost often, but after a couple of months, I understood the city much better. In Tianjin, I did the same: exploring step by step. Local tips open doors.

### 4.2 Practice Self-Care

Culture shock can affect your body and mind. Self-care doesn't need to be expensive: sleep well, eat balanced meals, walk daily, and journal your thoughts.

### 4.3 Use Gratitude to Stay Emotionally Strong

Gratitude teaches your mind to notice what is good. A simple method is a short gratitude journal: write the date, a small quote, and a few things you appreciate.

<img src="https://images.unsplash.com/photo-1650728376811-ef969ec0a73b" width="600" alt="Traveler journaling in a quiet cafe setting"/>

## 5.0 Mastering the Art of Flexibility

### 5.1 Be Flexible and Adaptable

Living abroad means uncertainty. Flexibility is a life skill. You do not have to love every difference, but you can accept it without suffering.

### 5.2 Make Time for Fun

Fun reduces stress and keeps your mind open. Join an event, start a hobby, or simply laugh at your mistakes, your “funny moments” become your best stories later.

### 5.3 Set Healthy Boundaries

For me, as a Muslim and a student, I communicate my limits politely, such as my choice not to drink alcohol. Clear boundaries protect relationships because they reduce confusion and pressure.

## 6.0 Final Thoughts: Step by Step

Living abroad can challenge you, shape you, and teach you new ways to understand the world. The adjustment is rarely instant, but it becomes easier when you take it step by step. Celebrate the process, be patient with yourself, and enjoy the positive transformations that come with cultivating a life in a new land.`
  },
  {
    id: 9,
    title: "Fear of Failure: How to Learn from Mistakes and Build Real Resilience",
    excerpt: "Failure feels uncomfortable, but it can also be useful. Learn practical ways to overcome fear of failure, adopt a growth mindset, and turn setbacks into progress.",
    category: "Philosophy",
    date: "Apr 22, 2024",
    image: "https://res.cloudinary.com/dvjxri3cd/image/upload/v1713792118/Mfaouzia/pexels-vlada-karpovich-4050302_nl90k4.jpg",
    readTime: "9 min",
    author: "Mfaouzia",
    content: `Welcome back! Today we’re talking about something almost everyone experiences: <strong>the fear of failure</strong>.

Many people assume successful results come from “natural talent” or perfect planning. Real life is messier. Thomas Edison’s lab tested thousands of ideas while improving the incandescent lamp proof that progress often comes through repeated attempts, not instant success.

<img src="https://images.unsplash.com/photo-1641754873605-c02bfa8335bc" alt="Thomas Edison's vintage lightbulb" width="600"/>

If we understand failure better, we can stop treating it like a personal verdict. Instead, we can treat it as information sometimes painful, but often valuable.

## Why We Fear Failure (and Why It Feels So Personal)

Fear of failure is rarely just about the task. It often comes from what failure <em>seems</em> to say about us.

Common reasons include:

- <strong>Social pressure:</strong> We worry about judgment, embarrassment, or “losing face.”
- <strong>Self-esteem:</strong> A setback can feel like proof that we are not smart enough or capable enough.
- <strong>High expectations:</strong> When we aim for perfection, any mistake feels unacceptable.

This fear can become a quiet barrier. It stops people from applying for opportunities, learning new skills, speaking up in class, or taking creative risks.

<img src="https://images.unsplash.com/photo-1675992251305-c785fff58257" alt="abstract visualization of resilience and growth" width="600"/>

## A Growth Mindset Changes the Meaning of Mistakes

Psychologist <strong>Carol Dweck</strong> popularized the idea of the <em>growth mindset</em>: the belief that abilities can improve through effort, strategy, and learning.

A growth mindset does not mean “everything is easy” or “failure is fun.” It means:

- You separate your identity from the outcome.
- You ask, “What can this teach me?”
- You stay focused on improvement, not perfection.

When you start thinking this way, mistakes become part of training not a reason to quit.

## What You Gain When You Stop Avoiding Mistakes

Avoiding failure can feel safe in the short term, but it limits growth over time. When you allow yourself to try (and sometimes fail), you build qualities that matter in both life and career.

### 1) You learn faster

Mistakes highlight what you don’t understand yet. They make learning more precise.

### 2) You become more resilient

Resilience is not a personality trait you either have or don’t have. It is built through experience especially the experience of recovering after a setback.

### 3) You become more creative

Innovation requires experimentation. Experimentation includes results that don’t work.

## Real Stories: Failure That Became a Turning Point

### J.K. Rowling: Rejection before breakthrough

Rowling’s early <em>Harry Potter</em> manuscript faced multiple publisher rejections before it was accepted. Her story is a reminder that “not now” is not the same as “never.”

### Steve Jobs: A career setback that became preparation

Steve Jobs left Apple in 1985 after internal conflict. Later, he returned in 1997 after Apple acquired Next. In between, he built new experience through Next and Pixar. His path shows how setbacks can become training if you keep learning and building.

## Learning from Mistakes in Everyday Life

Most growth happens in ordinary situations: exams, projects, interviews, relationships, and daily decisions.

### Set small, achievable goals

Big goals are useful, but small goals create momentum. If you feel stuck, shrink the task:

- Write one paragraph, not the whole report.
- Practice 10 minutes, not two hours.
- Apply to one opportunity, not ten.

### Ask for feedback and use it well

Feedback can be uncomfortable, but it’s one of the fastest ways to improve. Ask someone you trust:

- What worked well?
- What is unclear?
- What should I try next time?

Try to treat feedback as data, not an attack.

<img src="https://images.unsplash.com/photo-1745970347652-8f22f5d7d3ba" alt="minimalist office space for focused work and feedback" width="600"/>

### Do a simple failure review (without self-blame)

After a setback, ask:

1) What exactly happened?
2) What part was under my control?
3) What will I do differently next time?

## Failure and Professional Growth: What It Looks Like at Work

In professional life, fear of failure can show up as:

- avoiding responsibility,
- staying silent in meetings,
- refusing to experiment,
- overworking to “prevent mistakes.”

A healthier approach is to build a career that can handle ups and downs.

### Skills that protect your career over time

- <strong>Keep learning:</strong> the market changes, so your skills should evolve too.
- <strong>Stay adaptable:</strong> adjust your plan when reality changes.
- <strong>Take smart risks:</strong> experiment, but prepare a backup plan.

## How Healthy Organizations Treat Failure

A team’s culture strongly shapes how people behave. If people feel punished for honest mistakes, they will hide problems and the organization becomes slower and less innovative.

Some innovation groups intentionally create systems where teams can share problems early. For example, leaders at Alphabet’s X (the “moonshot factory”) have talked publicly about building environments where teams can stop projects early when evidence shows they won’t work so learning happens faster and resources are not wasted.

The point is not to “love failure.” The point is to <strong>reward learning, transparency, and good judgment</strong>.

## Practical Tools to Turn Setbacks into Progress

### Mindfulness + reflection (short and realistic)

Take 5–10 minutes to write:
- What went wrong?
- What did I feel?
- What is the lesson?

### Build a feedback loop

Create a system that gives you regular signals:

- peer review
- mentor check-ins,
- user/customer feedback,
- performance metrics.

### Learn with mentors

A mentor helps you see options you might miss. They can:

- challenge your assumptions,
- share how they recovered from setbacks,
- help you plan a smarter next step.

### Proactive problem solving

Instead of waiting for failure:

- Identify the most fragile part of your plan.
- Test it early.
- Improve through iteration.

## Conclusion: Choose One Step, Not a Perfect Plan

Failure is not the opposite of success. In most real journeys, failure is part of the path.

If fear of failure has been holding you back, try one small action this week:

- ask for feedback,
- start a reflection journal,
- attempt a task you’ve been avoiding,
- reframe one setback as a lesson.

You don’t need to become fearless. You just need to become willing.`
  },
  {
    id: 10,
    title: "The Power of Positive Thinking",
    excerpt: "Discover how the power of positive thinking transformed my life. Learn practical tips and insights to embrace positivity in your own journey.",
    category: "Philosophy",
    date: "May 27, 2024",
    image: "https://images.unsplash.com/photo-1600738980154-ed57c58234b9",
    readTime: "6 min",
    content: `Have you ever noticed how some people stay hopeful even when life becomes heavy? They are not ignoring reality. Most of the time, they have trained a skill: <strong>positive thinking</strong>, the habit of focusing on what you <em>can</em> do, what you <em>can</em> learn, and what still remains possible.

In this post, I’ll share my journey from <strong>Comoros to China</strong>, the moments when optimism truly helped me, and practical ways you can build a positive mindset without pretending everything is perfect.

## Growing Up in Comoros: Where Positivity Was a Daily Practice

I grew up in Comoros, an island country known for its natural beauty and strong community life. The pace was simpler, and people relied on each other. Like many places, we had challenges but what stayed with me was the attitude I saw around me: when problems came, people looked for solutions, support, and meaning.

<img src="https://images.unsplash.com/photo-1715817608781-ce49c774e306" alt="serene minimalist beach in Comoros" width="600"/>

That environment taught me an important lesson early: <strong>positivity is not luck. It is a choice you repeat.</strong> Over time, that choice becomes a habit.

## Moving to China to Study IT: Excitement, Pressure, and Culture Shock

When I received the opportunity to study IT in China, I felt proud and nervous. Moving from a close-knit island community to a fast-paced city environment was a major shift.

<img src="https://images.unsplash.com/photo-1723899957933-2c2e01b859ce" alt="modern architecture of a university campus in China at night" width="600"/>

I faced common challenges many international students know well:

- a language barrier,
- unfamiliar routines,
- loneliness and homesickness,
- and the pressure to adapt quickly.

In those moments, my mindset mattered as much as my planning. The question became: <em>Will I see this move as a threat or as a chance to grow?</em>

## Embracing Change Without Romanticizing It

Change can be uncomfortable. I don’t believe in pretending it is always easy. But I learned to reframe the experience in a useful way:
Instead of thinking, <strong>“This is too hard,”</strong> I practiced thinking, <strong>“This is new, and I will learn it step by step.”</strong>

That small mental shift did not erase my challenges but it helped me stay calm enough to face them.

## Building a Support System Abroad

One of the fastest ways to stay positive abroad is to avoid isolation. I made friends who understood the reality of living far from home. Some were international students like me, and others were local friends who helped me understand daily life in China.

<img src="https://images.unsplash.com/photo-1630331513451-829c6ba030c3" alt="diverse group of students studying in a modern cafe" width="600"/>

A supportive circle matters because positivity grows through connection:

- people remind you that you are not alone,
- they share practical advice,
- and they celebrate small wins with you.

## How Positive Thinking Supported My Life Abroad

Positive thinking helped me in real, practical ways not only emotionally, but also in how I performed and related to others.

### 1) Better Mental Health Under Stress

Homesickness, pressure, and uncertainty can slowly drain your energy. When I felt overwhelmed, I tried to focus on what was still going well: progress in my classes, new friendships, and the fact that I was learning to live independently.

This mindset reduced anxiety and helped me keep moving forward.

### 2) Stronger Physical Habits

Stress affects the body. When I chose a calmer mindset, I was more likely to protect my routine: eating properly, sleeping enough, and exercising regularly.

It sounds simple, but these habits make positivity easier. When you feel healthier, your mind becomes more stable.

### 3) Healthier Relationships

Optimism changes how you speak, listen, and respond. A positive attitude makes you more approachable. It also helps you avoid constant complaining, which can push people away.

Living in China, I met people from many countries and backgrounds. Those relationships shaped my worldview and became one of the best parts of my journey.

### 4) More Confidence to Pursue Goals

When you believe progress is possible, you take action more easily. Positive thinking helped me study with confidence, try new experiences, and speak up even when I was afraid of making mistakes.

It did not guarantee success every time but it gave me the courage to try.

## Practical Ways to Train Positive Thinking (Without Being Unrealistic)

A positive mindset is built through practice. These are the habits that helped me most.

### Practice Gratitude Daily

Every night, write <strong>three things you appreciate</strong>, small is fine. Gratitude does not deny struggle. It simply prevents struggle from becoming your only focus.

<img src="https://images.unsplash.com/photo-1589221475596-7133b597dc21" alt="minimalist journal and coffee on a clean desk" width="600"/>

### Choose Your Environment Wisely

Spend time with people who encourage growth. Positivity is contagious, but so is negativity. If your circle is always pessimistic, it becomes harder to stay hopeful.

### Reframe Negative Self-Talk

When a negative thought appears, pause and adjust it into something realistic and constructive.

- “I will fail this presentation.” → “I prepared, and I will improve with practice.”
- “I’m not good enough.” → “I’m learning, and learning takes time.”

### Protect Your Body to Protect Your Mind

Exercise, nutrition, and sleep are not “extra.” They are your foundation. When you take care of your body, you think more clearly and react more calmly.

### Set Realistic Goals You Can Actually Maintain

Goals should stretch you but not crush you. Break a big goal into small weekly steps. Each small win strengthens your confidence.

## Simple Daily Routines That Support a Positive Mindset

### Morning Affirmations (Short and Believable)

I prefer affirmations that feel realistic, not magical. For example:
- “Today, I will do my best with what I have.”
- “I can handle problems step by step.”

### Mindfulness and Meditation

Mindfulness helps you respond instead of react. Even five minutes of breathing or silent reflection can reduce stress and improve focus.

<img src="https://images.unsplash.com/photo-1762876244984-f9d493cf4aa1" alt="zen stone garden for meditation" width="600"/>

### Positive Journaling

Write a few lines about:

- one good moment,
- one lesson you learned,
- and one thing you want to do better tomorrow.

### Small Acts of Kindness

Kindness creates a powerful feedback loop. When you help someone, you feel more connected and connection supports positivity.

## How Positive Thinking Helps You Handle Hard Times

Positivity matters most when life is not smooth. Here are the strategies that helped me during difficult periods.

### Acceptance: Reality First, Then Action

Acceptance does not mean giving up. It means admitting what is true, so you can plan your next step.

### Problem-Solving: Focus on What You Can Control

A positive mindset helps you ask better questions:

- What can I change today?
- Who can I ask for help?
- What is one step forward?

### Support System: Don’t Carry Everything Alone

Talk to family, trusted friends, or a mentor. Even one supportive conversation can change your mood and direction.

### Self-Compassion: Be Kind to Yourself

Some days will be heavy. That is normal. Speak to yourself the way you would speak to a friend firm, but gentle.

## Conclusion: Positivity Is a Skill You Can Learn

Positive thinking changed my life, not because it made problems disappear, but because it helped me face them with clarity and hope.

If you want to build a more positive mindset, start small:

- write a gratitude list tonight,
- reframe one negative thought,
- or take one step toward a goal you’ve been avoiding.

Small changes repeated daily can reshape your life.

## Call to Action

If this post helped you, share it with someone who may need encouragement. And if you want to tell me about your own experience living abroad or how you stay positive,send me a message. Let’s spread positivity together.

## FAQs

<strong>What is positive thinking?</strong><br/>
Positive thinking is a realistic, hopeful mindset that focuses on solutions, learning, and what is still possible even in difficult moments.

<strong>How can I start practicing positive thinking?</strong><br/>
Start with gratitude, reframing negative thoughts, spending time with supportive people, and maintaining healthy routines.

<strong>Does positive thinking improve mental health?</strong><br/>
Research suggests optimism and positive reframing can support stress management and well-being, especially when combined with healthy habits.

<strong>How does positive thinking enhance relationships?</strong><br/>
It improves communication, reduces negativity, and helps you build trust and warmth with others.

<strong>Can someone be “too positive”?</strong><br/>
Yes. Healthy positivity still acknowledges pain and problems. The goal is balance: accept reality, then choose a helpful response.`
  },
  {
    id: 11,
    title: "Women in Computer Science: Pioneers, Modern Leaders, and the Future of Tech",
    excerpt: "From Ada Lovelace to today’s AI and product leaders, these stories show how women shaped computing and how we can support the next generation in tech.",
    category: "Technology",
    date: "Mar 4, 2024",
    image: "https://res.cloudinary.com/dvjxri3cd/image/upload/v1709563178/Mfaouzia/student-849828_upllzp.jpg",
    readTime: "8 min",
    author: "Mfaouzia",
    content: `March is <strong>Women’s History Month</strong>, which makes it a meaningful time to talk about women in computer science not as a side note, but as a core part of computing history.

For decades, tech has often been seen as a male-dominated space. Many women had to fight for access to education, fair recognition, and leadership opportunities. And still, women have shaped the field in powerful ways: writing early programs, building programming languages, advancing space exploration, and leading modern platforms used by billions.

In this post, I’m highlighting success stories across three groups: <strong>early pioneers</strong>, <strong>modern trailblazers</strong>, and <strong>rising stars</strong>. I’ll also share practical ways we can support and empower more women in tech.

<img src="https://images.unsplash.com/photo-1731902417599-d08dbbd0daa0" alt="vintage mathematical manuscript representing early pioneers" width="600"/>

## Why Women’s Stories in Computing Matter

When we tell these stories, we do more than celebrate. We correct the record. We also give students and early-career professionals something equally important: <strong>proof</strong>. Proof that you can belong in this field, even if you do not fit the stereotype of what a “computer scientist” looks like.

## Early Pioneers Who Helped Invent the Future

Long before laptops and smartphones, women were already asking deep questions about what machines could do and writing the logic that made computing possible.

### Ada Lovelace: The first computer program (before computers existed)

Ada Lovelace worked with Charles Babbage’s concept of the Analytical Engine. In 1843, she wrote notes describing a method to compute Bernoulli numbers often described as the first published computer program. What makes her work even more impressive is her imagination: she predicted that computing could go beyond math into symbols, music, and creativity.

### Grace Hopper: Making code easier for humans

Grace Hopper changed computing by making programming more accessible. She helped develop early compiler work and pushed the idea that programmers should write in language closer to human thinking not only machine instructions.

### Katherine Johnson: The math behind historic space missions

Katherine Johnson’s calculations supported major NASA milestones, including trajectories and mission-critical math for early U.S. human spaceflight and Apollo-era missions.

## Modern Trailblazers Who Shaped Today’s Tech

As computing became part of everyday life, many women rose into influential roles across engineering, product, research, and leadership.

<img src="https://images.unsplash.com/photo-1565688103955-d38e06888776" alt="professional women in a technology leadership boardroom" width="600"/>

### Susan Wojcicki: Leadership in the internet era

Susan Wojcicki served as CEO of YouTube from 2014 to 2023, guiding the platform through global scale and creator economies.

### Sheryl Sandberg: Scaling operations in a high-growth tech company

Sheryl Sandberg served as COO of Meta (Facebook) from 2008 to 2022, shaping operational leadership at scale.

### Marissa Mayer: Product thinking and leadership in major tech companies

Marissa Mayer is known for her early work at Google and for leading Yahoo as CEO. Her career is a useful example of product leadership.

## Rising Stars and Changemakers in Computing

Today, the field is evolving fast AI, online safety, education, and ethics matter as much as classic engineering. Many women are leading these shifts.

<img src="https://images.unsplash.com/photo-1617719787785-d37cd7986cdc" alt="futuristic AI and technology research by women" width="600"/>

### Fei-Fei Li: Human-centered AI and the ImageNet era

Fei-Fei Li is widely recognized for work that helped accelerate computer vision research, especially through ImageNet.

### Reshma Saujani: Expanding access through Girls Who Code

Reshma Saujani founded Girls Who Code in 2012 to reduce the gender gap in computing education.

<img src="https://images.unsplash.com/photo-1662686439618-12cfd337c067" alt="girls learning to code in a supportive classroom environment" width="600"/>

### Tracy Chou: Building safer online spaces

Tracy Chou is known for both engineering and advocacy, focused on making online communication safer and more humane.

## The Challenges Women Still Face in Computing

Even with progress, many women continue to face barriers such as:

- <strong>gender bias</strong> in hiring, promotion, and credibility,
- <strong>stereotypes</strong> that discourage girls early,
- <strong>lack of representation</strong> in leadership and technical decision-making.

## How We Can Support and Empower Women in Tech

Support does not require a big speech. Small actions create culture.

### 1) Mentor and sponsor, not only advise

Mentorship helps with guidance. Sponsorship helps with opportunity.

### 2) Make learning accessible early

Coding clubs and scholarships change who enters the field.

### 3) Promote fair visibility

Credit women publicly for their work. Representation becomes reality when it is visible.

## Conclusion

Women have helped build computer science from the beginning through programming ideas, compilers, spaceflight mathematics, AI research, education initiatives, and global tech leadership.

The future of computing is stronger when it includes everyone.

## References (reputable sources)

- <a href="https://www.britannica.com/story/ada-lovelace-the-first-computer-programmer" target="_blank" rel="noopener noreferrer">Britannica on Ada Lovelace</a>
- <a href="https://www.nasa.gov/centers-and-facilities/langley/katherine-johnson-biography/" target="_blank" rel="noopener noreferrer">NASA biography on Katherine Johnson</a>
- <a href="https://profiles.stanford.edu/fei-fei-li" target="_blank" rel="noopener noreferrer">Stanford profile on Fei-Fei Li</a>
- <a href="https://girls-who-code.medium.com/girls-who-code-turns-five-what-ive-learned-since-our-founding-4c70861e6769" target="_blank" rel="noopener noreferrer">Girls Who Code story</a>
`
  },
  {
    id: 12,
    title: "Is Google Really Listening to Us? The Truth Behind Predictive Algorithms",
    excerpt: "This article examines the popular belief that Google listens to our conversations to customize ads, explaining how data processing creates the illusion of surveillance.",
    category: "Technology",
    date: "Apr 29, 2024",
    image: "https://res.cloudinary.com/dvjxri3cd/image/upload/v1714399364/Mfaouzia/internet-search-engine-1433323_1280_er3bzv.jpg",
    readTime: "7 min",
    author: "Zaheer",
    content: `In the age of digital connectivity, concerns about privacy and data usage have become increasingly prevalent. Among the various technological giants, Google stands out as a ubiquitous presence in our daily lives. From search queries to email exchanges, Google seemingly knows more about us than we might realize. One of the most persistent rumors surrounding Google is the idea that it listens to our conversations, using the information to customize ads and predict our thoughts. But how much truth is there to this claim?

<img src="https://images.unsplash.com/photo-1736410223296-4537159eefe4" alt="smartphone with abstract audio waves representing eavesdropping concerns" width="600"/>

## Can Your Phone Be Eavesdropping?

The notion that Google is eavesdropping on our conversations gained traction as users noticed remarkably accurate ad recommendations appearing shortly after discussing certain topics in real life. For example, chatting about travel plans with friends might suddenly result in an influx of ads for flights and hotels on your browser. It's easy to assume that Google must be listening in on those conversations.

## So Does Google Personalize Your Experience?

However, the reality is more intricate. Google does collect vast amounts of data about its users, including search history, browsing habits, location data, and even voice commands given to Google Assistant. This data is then processed by sophisticated algorithms that analyze patterns and make predictions about user behavior and preferences. 

<img src="https://images.unsplash.com/photo-1664526937033-fe2c11f1be25" alt="complex digital network representing data processing algorithms" width="600"/>

So while Google may not actively listen to individual conversations, it is constantly processing the information we willingly provide to deliver personalized experiences.

## So How Does Google Personalize Your Experience?

The concept of predictive algorithms is at the core of Google's business model. By understanding user intent and interests, Google can provide relevant content and advertisements, maximizing engagement and revenue. This predictive capability extends beyond just ads; it influences search results, recommendations on YouTube and Google Maps, and even suggestions in Gmail.

How does Google seem to know our thoughts before we even type a query? The answer lies in the vast amount of data it collects and the advanced machine learning algorithms it uses. These algorithms analyze our explicit actions, such as searches and clicks, as well as implicit signals like how long we stay on certain pages or the types of videos we watch. 

By processing this data, Google can make educated guesses about our interests and preferences, often with remarkable accuracy. But what about those moments when it feels like Google is reading our minds? The truth is that these apparent mind-reading instances are actually the result of clever algorithms, not nefarious surveillance.

<img src="https://images.unsplash.com/photo-1592791770401-7a0cb5ee279b" alt="abstract security and privacy icons representing data protection" width="600"/>

For example, if you have been researching a specific topic or visiting certain websites, Google's algorithms can infer your interests and customize recommendations accordingly. Similarly, if many people with similar browsing habits are searching for the same thing, Google might predict that you will also be interested in it.

## Is there a concern about privacy?

It is important to note that Google is not the only company utilizing predictive algorithms. Social media platforms like Facebook and Twitter employ similar techniques to curate our news feeds and suggest content. These algorithms are designed to keep us engaged by showing us what we are most likely to interact with, whether it is a friend's post or an advertisement for a product we have been interested in.

So, while it may be disconcerting to think that Google is always one step ahead, it is essential to remember that these predictions are based on data we have willingly shared. In many ways, it is a trade-off: we sacrifice some privacy in exchange for personalized experiences and convenience.

That being said, concerns about data privacy and the ethical implications of predictive algorithms are valid and deserving of scrutiny. As technology continues to advance, it is crucial to have transparent policies in place to govern how our data is collected, used, and protected. Ultimately, the key lies in finding the right balance between personalization and privacy in the digital age.

`
  }
];

// --- Components ---

const MetaChip = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-bold uppercase tracking-widest text-stone-500 ${className}`}>
    {children}
  </span>
);

const CopyLinkButton = ({ postId }: { postId: number }) => {
  const [copied, setCopied] = useState(false);

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const handleCopy = () => {
    const url = `${window.location.origin}/#post-${postId}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-3 px-5 py-2 rounded-full bg-stone-950 border border-white/10 text-stone-400 hover:text-amber-500 hover:border-amber-500/30 transition-all duration-500"
    >
      {copied ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
      <span className="text-[9px] font-bold uppercase tracking-widest">{copied ? 'Copied' : 'Copy Link'}</span>
    </button>
  );
};

const TableOfContents = ({ content }: { content: string }) => {
  const headers = content.split('\n\n')
    .filter(block => block.startsWith('## ') || block.startsWith('### '))
    .map(block => {
      const level = block.startsWith('## ') ? 2 : 3;
      const text = block.replace(/^###?\s/, '');
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return { level, text, id };
    });

  if (headers.length < 3) return null;

  return (
    <div className="hidden xl:block sticky top-32 h-fit w-64 space-y-8 pointer-events-auto shrink-0">
      <div className="space-y-6">
        <span className="text-amber-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 block">Navigation Map</span>
        <div className="space-y-5 border-l border-white/5 pl-6">
          {headers.map((header, i) => (
            <a
              key={i}
              href={`#${header.id}`}
              className={`block text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-500 hover:text-amber-500 ${
                header.level === 3 ? 'pl-4 text-stone-700 hover:pl-6' : 'text-stone-500'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(header.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {header.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const AuthorCard = ({ name }: { name?: string }) => {
  const authorKey = name?.toLowerCase().trim();
  const isMaliha = authorKey === 'maliha';
  const isHishma = authorKey === 'hishma';
  const isZaheer = authorKey === 'zaheer';
  
  const authorData = isMaliha ? {
    name: "Syeda Maliha Marium",
    role: "Network Security Researcher",
    image: malihaImg,
    location: "Tianjin",
    title: "Journalist & Researcher",
    bio: "I am Syeda Maliha Marium, a graduate student at Tianjin University, specializing in network security. As an individual, I embrace optimism and strive to maintain confidence in the face of challenges. Beyond my academic pursuits, I find joy in writing, observing life and people, and holding a steadfast belief in miracles. Additionally, my passions extend to the realms of traveling and cooking."
  } : isHishma ? {
    name: "Bourhani Hishma Vola-Justine",
    role: "Medical Student",
    image: hishmaImg,
    location: "Haikou",
    title: "Medical Scholar",
    bio: "Ms. Bourhani Hishma Vola-Justine, a medical student in Haikou, China, is full of curiosity and does not shy away from learning new skills. Her personal experiences, combined with her years of study in medicine, have allowed her to develop more empathy and have deepened her desire to help people and find balance in life."
  } : isZaheer ? {
    name: "Zaheer Anwar",
    role: "HCI Researcher",
    image: zaheerImg,
    location: "Tianjin",
    title: "Researcher",
    bio: "Mr. Zaheer Anwar, a researcher in the field of human-computer interaction (HCI), brings over 4 years of experience to his work. His passion for designing technology that seamlessly integrates with human needs. This blend of academic expertise and real-world experience positions his perfectly to lead this exciting new project exploring the potential of virtual reality for language learning."
  } : {
    name: "Mroivili Faouzia",
    role: "The Creator",
    image: authorImg,
    location: "Tianjin",
    title: "Digital Artisan",
    bio: "Hi there, I’m Mroivili Faouzia, the creator of Tech & Wisdom. I’m passionate about technology and endlessly curious about life. I also have a special interest in Chinese culture. On this blog, I share honest insights on topics ranging from coding to personal growth."
  };

  return (
    <div className="mt-20 p-8 md:p-10 rounded-[2.5rem] bg-stone-950/40 border border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[80px] rounded-full -mr-16 -mt-16" />
      
      <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
        <div className="shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border border-white/10 p-1 bg-stone-900 group-hover:border-amber-500/30 transition-colors duration-700">
            <ImageWithFallback 
              src={authorData.image} 
              alt={authorData.name} 
              className="w-full h-full object-cover rounded-2xl grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
            />
          </div>
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <span className="text-amber-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-1 block">{authorData.role}</span>
            <h4 className="text-2xl font-serif text-white">{authorData.name}</h4>
          </div>
          
          <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">
            {authorData.bio}
          </p>

          <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-500">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              {authorData.title}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-500">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-700" />
              {authorData.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoiseOverlay = () => (
  <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const BackgroundDecoration = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, -300]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 400]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-stone-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1917_1px,transparent_1px),linear-gradient(to_bottom,#1c1917_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-amber-900/10 blur-[200px] rounded-full mix-blend-screen" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-stone-800/20 blur-[200px] rounded-full mix-blend-screen" 
      />
    </div>
  );
};

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      const magneticElement = target.closest('[data-magnetic]');
      setIsHovering(!!target.closest('a, button, .cursor-pointer'));
      setCursorText(magneticElement?.getAttribute('data-magnetic') || '');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-amber-500 rounded-full pointer-events-none z-[100] hidden lg:block"
        animate={{ x: mousePos.x - 6, y: mousePos.y - 6, scale: isHovering ? 0 : 1 }}
        transition={{ type: "spring", damping: 35, stiffness: 350, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-14 h-14 border border-amber-500/40 rounded-full pointer-events-none z-[100] hidden lg:block flex items-center justify-center backdrop-blur-[2px]"
        animate={{ 
          x: mousePos.x - 28, 
          y: mousePos.y - 28,
          scale: isHovering ? 1.4 : 0.8,
          opacity: isHovering ? 1 : 0.2
        }}
        transition={{ type: "spring", damping: 45, stiffness: 200, mass: 0.8 }}
      >
        {cursorText && (
          <span className="text-[9px] font-bold uppercase text-amber-500 tracking-widest whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mood, setMood] = useState('Focus');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Vision', 'Archives', 'Essence', 'Connect'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled || isMobileMenuOpen ? 'py-4 bg-stone-950/80 backdrop-blur-3xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-amber-500 transition-all duration-500 group-hover:scale-110 group-hover:border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)] overflow-hidden">
              <img src={logoImg} alt="Digital Artisan Logo" className="w-6 h-6 object-contain brightness-110" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-tight text-white leading-none font-bold">M.Faouzia.</span>
              <span className="text-[8px] font-bold text-stone-500 uppercase tracking-[0.4em] mt-1">Tech & Wisdom Chronicles</span>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-3 bg-white/[0.03] border border-white/5 px-4 py-2 rounded-full backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400">
              Tianjin: <span className="text-white">{mood}</span>
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <a 
              key={item} 
              href={item === 'Essence' ? '#experience' : `#${item.toLowerCase()}`}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-amber-500 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex w-10 h-10 rounded-full border border-white/10 items-center justify-center text-stone-400 hover:bg-white/5 transition-all">
            <Moon size={18} />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all z-50"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 right-0 bg-stone-950/95 backdrop-blur-3xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-12 flex flex-col gap-8">
              {navLinks.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item}
                  href={item === 'Essence' ? '#experience' : `#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif text-white hover:text-amber-500 transition-colors flex items-center justify-between group"
                >
                  <span>{item}</span>
                  <ArrowRight size={20} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.a>
              ))}
              
              <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Github size={18} className="text-stone-500" />
                  <Instagram size={18} className="text-stone-500" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500">Live in Tianjin</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.05]);

  return (
    <section id="vision" className="min-h-screen flex flex-col items-center justify-center px-6 relative pt-20 overflow-hidden bg-stone-950">
      {/* Cinematic Lens Flare & Depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_0%,transparent_70%)] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      
      {/* Coordinate Lines with Narrative markers */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 flex justify-between px-12 pointer-events-none z-0 text-stone-700">
        <div className="flex flex-col gap-1 -translate-y-full py-4">
          <span className="text-[7px] font-mono uppercase tracking-[0.4em]">39°08′N 117°11′E</span>
          <span className="text-[6px] text-amber-500/40 font-mono uppercase tracking-[0.2em]">Origin: Tianjin</span>
        </div>
        <div className="flex flex-col items-end gap-1 -translate-y-full py-4">
          <span className="text-[7px] font-mono uppercase tracking-[0.4em]">Ref. ARTISAN-01</span>
          <span className="text-[6px] text-amber-500/40 font-mono uppercase tracking-[0.2em]">Status: Stealth</span>
        </div>
      </div>

      <motion.div style={{ y: yText, opacity, scale }} className="max-w-7xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="mb-16 inline-block relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
              className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mb-6"
            />
            <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-amber-500/60 block">
              Digital Artisan · Narrative Repository
            </span>
          </div>
          
          <h1 className="text-7xl md:text-[10rem] lg:text-[14rem] font-serif text-white tracking-tighter leading-[0.75] mb-20 select-none relative group">
            <span className="block overflow-hidden pb-4">
              <motion.span 
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                className="block hover:text-stone-300 transition-colors cursor-default"
              >
                Silent
              </motion.span>
            </span>
            <span className="block overflow-hidden italic font-light text-stone-900 relative">
              <motion.span 
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="block group-hover:text-stone-800 transition-colors cursor-default"
              >
                Move.
              </motion.span>
              <div className="absolute -right-12 top-1/2 w-48 h-px bg-gradient-to-r from-amber-500/20 to-transparent hidden lg:block" />
              <div className="absolute -left-12 top-1/2 w-48 h-px bg-gradient-to-l from-amber-500/20 to-transparent hidden lg:block" />
            </span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-32 border-t border-white/5 pt-16">
            {[
              { 
                label: "Architectural Stealth", 
                desc: "Mapping the invisible logic of AI and Knowledge Graphs.",
                icon: <Monitor size={14} className="text-amber-500/40" />
              },
              { 
                label: "The China Odyssey", 
                desc: "Traversing 20 cities where culture meets the digital edge.",
                icon: <Globe size={14} className="text-amber-500/40" />
              },
              { 
                label: "Deliberate Motion", 
                desc: "A personal manifesto on privacy, discipline, and deep work.",
                icon: <Zap size={14} className="text-amber-500/40" />
              }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (i * 0.2) }}
                className="text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  {pillar.icon}
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-amber-500 transition-colors">{pillar.label}</span>
                </div>
                <p className="text-xs text-stone-500 font-light leading-relaxed group-hover:text-stone-400 transition-colors">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 flex flex-col items-center gap-12">
            <p className="text-sm text-stone-400 font-light max-w-xl italic leading-relaxed">
              "Excellence isn't a headline. It's a guarantee written in the invisible layers of engineering and the deliberate choices of a private life."
            </p>
            
            <button 
              onClick={() => document.getElementById('archives')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-14 py-6 bg-transparent text-white border border-white/10 rounded-full font-bold text-[10px] uppercase tracking-[0.4em] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
              <span className="relative z-10 group-hover:text-stone-950 transition-colors duration-500 flex items-center gap-4">
                Enter the Archive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Atmospheric Visuals */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(120,53,15,0.05)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-stone-950 to-transparent" />
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1728289306599-399d47b9cb43" 
          alt="Cinematic Foggy Architecture"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover opacity-[0.15] mix-blend-lighten pointer-events-none grayscale"
        />
      </div>
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute bottom-12 left-6 md:left-12 flex flex-col gap-10 opacity-30"
      >
        <div className="flex flex-col gap-6 text-stone-500">
          <Github size={14} className="hover:text-amber-500 cursor-pointer transition-colors" />
          <Instagram size={14} className="hover:text-amber-500 cursor-pointer transition-colors" />
        </div>
        <div className="h-32 w-px bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
      
      <div className="absolute bottom-12 right-6 md:right-12 flex flex-col items-end gap-2 opacity-20">
        <span className="text-[7px] font-mono uppercase tracking-[0.4em] text-stone-500 rotate-90 origin-right translate-y-20">Scroll to explore narrative</span>
      </div>
    </section>
  );
};

const TechStackMarquee = () => {
  const tech = [
    "React.js", "TypeScript", "Tailwind CSS", "Node.js", "Python", 
    "Mandarin HSK", "Cybersecurity", "Next.js", "Supabase", "Motion", 
    "UI/UX Design", "PostgreSQL", "Git", "Figma"
  ];

  return (
    <div className="py-24 border-y border-white/5 bg-stone-950/80 backdrop-blur-md overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-stone-950 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-stone-950 to-transparent z-10" />
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex gap-24 items-center pr-24"
        >
          {tech.map((item, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.5em] text-stone-600 hover:text-amber-500 transition-colors cursor-default">
                {item}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/20" />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {tech.map((item, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-6">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.5em] text-stone-600 hover:text-amber-500 transition-colors cursor-default">
                {item}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/20" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const NarrativeTimeline = () => {
  const milestones = [
    { year: "2017", title: "The Bridge", desc: "Crossing borders for the Chinese Bridge Competition. A flight to China that turned two strangers into lifelong dreamers." },
    { year: "2022", title: "The Silent Seed", desc: "A chilly January evening where the vision for 'Tech & Wisdom' first took shape a commitment to share the self with the world." },
    { year: "2024", title: "Chronicles Launch", desc: "January 1st: The digital space is born. Overcoming the hurdles of domain and code to launch the initial blog." },
    { year: "2025", title: "Present Synthesis", desc: "Refining the 'Digital Artisan' philosophy in Tianjin, blending architectural logic with the spirit of the 'Silent Move'." }
  ];

  return (
    <section className="py-40 px-6 bg-stone-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">The Creed</span>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
            Core <br />
            <span className="italic text-stone-600 font-light">Principles.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {[
            { id: "01", title: "Silence & Action", desc: "Let the results do the talking. Real progress happens in the quiet moments of deep focus and hard work." },
            { id: "02", title: "Built to Last", desc: "Quality is never an accident. Everything should be built with a strong foundation and clear, solid logic." },
            { id: "03", title: "Heart in Tech", desc: "Tools are made for people. Good technology should feel warm, helpful, and keep the human spirit at the center." },
            { id: "04", title: "Open Worlds", desc: "Wisdom has no borders. Connecting different cultures and ideas is the best way to find unique solutions." }
          ].map((pillar, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="relative group"
            >
              <div className="text-7xl font-serif text-stone-900 group-hover:text-amber-500/30 transition-all duration-700 mb-10 leading-none tracking-tighter scale-95 group-hover:scale-100 origin-left">
                {pillar.id}
              </div>
              <div className="h-px w-full bg-white/5 mb-10 relative">
                <div className="absolute top-0 left-0 h-full w-0 bg-amber-500 group-hover:w-full transition-all duration-1000 ease-out" />
                <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-all delay-500" />
              </div>
              <h4 className="text-2xl font-serif text-white mb-6 tracking-wide group-hover:text-amber-500 transition-colors">{pillar.title}</h4>
              <p className="text-stone-500 text-sm leading-relaxed font-light group-hover:text-stone-400 transition-colors">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogSection = () => {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Life', 'Technology', 'Security', 'Philosophy', 'Culture', 'Personal Development', 'Productivity', 'Tips'];

  const filteredPosts = [...POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).filter(post => {
    const matchesCategory = activeCategory === 'All' || 
      post.category.toLowerCase() === activeCategory.toLowerCase() ||
      (activeCategory === 'Personal Development' && post.category === 'Philosophy') ||
      (activeCategory === 'Culture' && (post.category === 'China' || post.category === 'Travel'));
    
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const renderContent = (content: string) => {
    const slugify = (text: string) => text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    
    return content.split('\n\n').map((block, idx) => {
      const cleanBlock = block.trim();
      if (!cleanBlock) return null;

      if (cleanBlock.startsWith('# ')) {
        const text = cleanBlock.replace('# ', '');
        return <h1 id={slugify(text)} key={idx} className="text-4xl md:text-5xl font-serif text-white mt-16 mb-8 border-l-4 border-amber-500 pl-6 leading-tight">{text}</h1>;
      }
      if (cleanBlock.startsWith('## ')) {
        const text = cleanBlock.replace('## ', '');
        return <h2 id={slugify(text)} key={idx} className="text-3xl md:text-4xl font-serif text-white mt-14 mb-6 leading-snug">{text}</h2>;
      }
      if (cleanBlock.startsWith('### ')) {
        const text = cleanBlock.replace('### ', '');
        return <h3 id={slugify(text)} key={idx} className="text-xl md:text-2xl font-serif text-white mt-10 mb-4">{text}</h3>;
      }
      if (cleanBlock.startsWith('- ') || cleanBlock.startsWith('* ')) {
        const items = cleanBlock.split('\n');
        return (
          <ul key={idx} className="space-y-4 mb-10 ml-6">
            {items.map((item, i) => (
              <li key={i} className="text-stone-400 font-light flex gap-4 leading-relaxed text-lg">
                <span className="text-amber-500 mt-2 shrink-0">•</span>
                <span dangerouslySetInnerHTML={{ 
                  __html: item.replace(/^[-*]\s/, '')
                }} />
              </li>
            ))}
          </ul>
        );
      }
      if (cleanBlock.match(/^\d\.\s/)) {
        const items = cleanBlock.split('\n');
        return (
          <ol key={idx} className="space-y-4 mb-10 ml-6">
            {items.map((item, i) => (
              <li key={i} className="text-stone-400 font-light flex gap-4 leading-relaxed text-lg">
                <span className="text-amber-500 font-bold font-mono text-xs mt-1.5 shrink-0">{i + 1}.</span>
                <span dangerouslySetInnerHTML={{ 
                  __html: item.replace(/^\d\.\s/, '')
                }} />
              </li>
            ))}
          </ol>
        );
      }
      if (cleanBlock.includes('<img')) {
        const srcMatch = cleanBlock.match(/src="([^"]+)"/);
        const altMatch = cleanBlock.match(/alt="([^"]+)"/);
        const widthMatch = cleanBlock.match(/width="([^"]+)"/);
        
        return srcMatch ? (
          <div key={idx} className="my-16 flex justify-center group">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-stone-900/40 p-2 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <img 
                src={srcMatch[1]} 
                alt={altMatch?.[1] || ""} 
                style={{ 
                  maxWidth: '100%',
                  height: 'auto',
                  width: widthMatch ? `${widthMatch[1]}px` : 'auto'
                }}
                className="rounded-[2rem] object-contain mx-auto transition-all duration-700 grayscale-[0.2] group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 to-transparent pointer-events-none" />
            </div>
          </div>
        ) : null;
      }
      
      return (
        <p 
          key={idx} 
          className="text-stone-400 leading-[1.9] text-lg font-light mb-10 tracking-wide"
          dangerouslySetInnerHTML={{ __html: cleanBlock }}
        />
      );
    });
  };

  const categoryData = {
    'All': {
      title: 'The Full Archives',
      description: 'The complete narrative of my digital and physical odyssey.',
      image: 'https://images.unsplash.com/photo-1651342490124-c2042b78d41c?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Total Entries', value: POSTS.length },
        { label: 'Eras Covered', value: '4' },
        { label: 'Words Written', value: '18.6k' }
      ]
    },
    'Life': {
      title: 'Living Better',
      description: 'Navigating the complexities of existence, travel, and cultural adaptation.',
      image: 'https://images.unsplash.com/photo-1728289306599-399d47b9cb43?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Guides', value: '1' },
        { label: 'Focus', value: 'Living' },
        { label: 'Impact', value: 'High' }
      ]
    },
    'Technology': {
      title: 'Digital Craft',
      description: 'Exploring the elegant logic of code and the future of engineering.',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Systems', value: 'Distributed' },
        { label: 'Focus', value: 'Architecture' },
        { label: 'Logic', value: 'Pure' }
      ]
    },
    'Security': {
      title: 'Digital Fortitude',
      description: 'Protecting your online identity and navigating the digital landscape safely.',
      image: 'https://images.unsplash.com/photo-1639503547276-90230c4a4198?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Safety', value: 'Essential' },
        { label: 'Focus', value: 'Defense' },
        { label: 'Tools', value: '2FA' }
      ]
    },
    'Philosophy': {
      title: 'Silent Wisdom',
      description: 'Reflections on failure, mindset, and the quiet pursuit of excellence.',
      image: 'https://images.unsplash.com/photo-1760608456358-5cfc6fd39232?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Mindset', value: 'Growth' },
        { label: 'Focus', value: 'Perspective' },
        { label: 'Depth', value: 'Deep' }
      ]
    },
    'Culture': {
      title: 'Ancient Echoes',
      description: 'Discovering history and tradition through a modern lens.',
      image: 'https://images.unsplash.com/photo-1704265587155-284d028eaf02?auto=format&fit=crop&q=80',
      stats: [
        { label: 'History', value: 'Ancient' },
        { label: 'Focus', value: 'Heritage' },
        { label: 'Era', value: 'Shang' }
      ]
    },
    'Personal Development': {
      title: 'Internal Growth',
      description: 'The science of building habits and evolving into your best self.',
      image: 'https://images.unsplash.com/photo-1544654187-454deb2b423e?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Habits', value: 'Atomic' },
        { label: 'Focus', value: 'Consistency' },
        { label: 'Steps', value: 'Small' }
      ]
    },
    'Productivity': {
      title: 'System Mastery',
      description: 'Transforming chaos into clarity through disciplined time management.',
      image: 'https://images.unsplash.com/photo-1764933173563-9f2e62b3828e?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Efficiency', value: 'Max' },
        { label: 'Focus', value: 'Systems' },
        { label: 'Method', value: 'Micro' }
      ]
    },
    'Tips': {
      title: 'Practical Guidance',
      description: 'Essential advice for students and travelers navigating new environments.',
      image: 'https://images.unsplash.com/photo-1758471576777-f8c87bb3c067?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Category', value: 'Education' },
        { label: 'Focus', value: 'Success' },
        { label: 'Author', value: 'Hishma' }
      ]
    }
  };

  const relatedPosts = activePost 
    ? [...POSTS]
        .filter(p => p.id !== activePost.id && (p.category === activePost.category || p.author === activePost.author))
        .slice(0, 2)
    : [];

  return (
    <section id="archives" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Search & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Archive Explorer</span>
            <h2 className="text-5xl font-serif text-white">Search the <span className="italic text-stone-500 font-light">Narrative</span></h2>
          </div>
          <div className="relative w-full md:w-96">
            <input 
              type="text"
              placeholder="SEARCH ENTRIES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900/50 border border-white/5 rounded-full px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-white placeholder:text-stone-700 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-700 pointer-events-none">
              <Compass size={16} />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between mb-32 gap-20">
          <div className="max-w-2xl relative">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">
                {activeCategory === 'All' ? 'Archives' : activeCategory}
              </span>
              <h2 className="text-6xl md:text-8xl font-serif text-white leading-[0.9] mb-10">
                {categoryData[activeCategory]?.title.split(' ')[0]} <br />
                <span className="italic text-stone-600 font-light">{categoryData[activeCategory]?.title.split(' ').slice(1).join(' ')}</span>
              </h2>
              <p className="text-stone-400 text-xl font-light leading-relaxed max-w-lg mb-12">
                {categoryData[activeCategory]?.description || 'Exploring the nuances of digital craft and ancient wisdom.'}
              </p>

              <div className="flex gap-12 border-t border-white/5 pt-10">
                {(() => {
                  const filteredStatsPosts = activeCategory === 'All' 
                    ? POSTS 
                    : POSTS.filter(p => p.category === activeCategory);
                  
                  const totalEntriesCount = filteredStatsPosts.length;
                  const erasCoveredCount = new Set(filteredStatsPosts.map(p => {
                    const parts = p.date.split(',');
                    return parts.length > 1 ? parts[parts.length - 1].trim() : p.date;
                  })).size;
                  
                  const totalWordsCount = filteredStatsPosts.reduce((acc, p) => {
                    const words = (p.content || '').replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w.length > 0).length;
                    return acc + words;
                  }, 0);
                  
                  const wordsWrittenDisplay = totalWordsCount >= 1000 
                    ? `${(totalWordsCount / 1000).toFixed(1)}k` 
                    : totalWordsCount;

                  const displayStats = activeCategory === 'All' ? [
                    { label: 'Total Entries', value: totalEntriesCount },
                    { label: 'Eras Covered', value: erasCoveredCount },
                    { label: 'Words Written', value: wordsWrittenDisplay }
                  ] : (categoryData[activeCategory]?.stats || []);

                  return displayStats.map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-stone-600 block">{stat.label}</span>
                      <span className="text-xl font-serif text-white">{stat.value}</span>
                    </div>
                  ));
                })()}
              </div>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/3 space-y-12">
            <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-white/10 relative group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={categoryData[activeCategory]?.image || categoryData['All'].image}
                    alt={activeCategory}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
              {categories.map((cat) => {
                const count = cat === 'All' ? POSTS.length : POSTS.filter(p => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border transition-all duration-500 ${
                      activeCategory === cat 
                        ? 'bg-amber-500 border-amber-500 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
                        : 'bg-transparent border-white/10 text-stone-500 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {cat} <span className={`ml-2 ${activeCategory === cat ? 'opacity-50' : 'text-stone-700'}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Journal Table / Grid Hybrid */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-700">Entries for {activeCategory}</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {filteredPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.08, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
              className="group h-full"
            >
              <button
                onClick={() => setActivePost(post)}
                className="w-full h-full text-left rounded-[2.5rem] border border-white/5 bg-stone-900/20 hover:bg-stone-900/30 transition-colors overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[16/11] overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-[2200ms] group-hover:scale-110 grayscale-[0.35] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />

                  {/* Top right mini action */}
                  <div className="absolute top-5 right-5 flex items-center gap-2">
                    <span className="w-10 h-10 rounded-full border border-white/10 bg-stone-950/50 backdrop-blur-md flex items-center justify-center text-stone-300 group-hover:text-amber-500 transition-colors">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>

                  {/* Bottom meta over image */}
                  <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                    <MetaChip>
                      <Hash size={12} className="text-amber-500" />
                      {post.category}
                    </MetaChip>
                    <MetaChip>
                      <Clock size={12} className="text-amber-500" />
                      {post.readTime}
                    </MetaChip>
                    <MetaChip>{post.date}</MetaChip>
                  </div>
                </div>

                {/* Body */}
                <div className="p-8 md:p-10 flex-1 flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight tracking-tight group-hover:text-amber-500 transition-colors">
                    {post.title}
                  </h3>

                  <p className="mt-4 text-stone-400 leading-relaxed text-sm md:text-[15px] font-light line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Footer row */}
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-600">
                      <span className="inline-flex items-center gap-2">
                        <Eye size={14} className="text-amber-500/70" />
                        <span>Read</span>
                      </span>
                      <span className="text-stone-800">•</span>
                      <span className="inline-flex items-center gap-2">
                        <Zap size={14} className="text-amber-500/70" />
                        <span>Journal</span>
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500">
                      Open
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
          </div>
        </div>
      </div>

      {/* Reading Overlay */}
      {activePost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-stone-950/85 backdrop-blur-2xl p-4 md:p-6"
          onClick={() => setActivePost(null)}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 220, mass: 0.9 }}
            className="mx-auto w-full max-w-5xl h-[92vh] bg-stone-900 border border-white/5 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-20 bg-stone-900/70 backdrop-blur-xl border-b border-white/5">
              <div className="flex items-center justify-between px-6 md:px-10 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-950 border border-white/10 flex items-center justify-center text-amber-500">
                    <Sparkles size={16} />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">
                      {activePost.category}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
                      {activePost.date} • {activePost.readTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <CopyLinkButton postId={activePost.id} />
                  <button
                    onClick={() => setActivePost(null)}
                    className="w-11 h-11 rounded-full bg-stone-950 border border-white/10 flex items-center justify-center text-stone-400 hover:text-white hover:border-amber-500/50 transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="h-full overflow-y-auto custom-scrollbar">
              {/* Hero image */}
              <div className="relative aspect-[21/9] w-full">
                <ImageWithFallback
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover grayscale-[0.45]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
              </div>

              {/* Article */}
              <div className="px-6 md:px-12 lg:px-20 py-10 md:py-16">
                <div className="flex flex-col xl:flex-row gap-20 items-start">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight tracking-tight">
                      {activePost.title}
                    </h2>

                    {/* author row */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <MetaChip>
                        <Heart size={12} className="text-amber-500" />
                        {`WRITTEN BY ${
                          activePost.author?.toLowerCase().trim() === 'maliha' ? 'SYEDA MALIHA MARIUM' : 
                          activePost.author?.toLowerCase().trim() === 'hishma' ? 'HISHMA' : 
                          activePost.author?.toLowerCase().trim() === 'zaheer' ? 'ZAHEER ANWAR' : 
                          'M. FAOUZIA'
                        }`}
                      </MetaChip>
                      <MetaChip>
                        <Globe size={12} className="text-amber-500" />
                        {
                          activePost.author?.toLowerCase().trim() === 'maliha' || activePost.author?.toLowerCase().trim() === 'zaheer' ? 'TIANJIN UNIVERSITY' : 
                          activePost.author?.toLowerCase().trim() === 'hishma' ? 'HAIKOU' :
                          'TIANJIN'
                        }
                      </MetaChip>
                      <MetaChip>
                        <Monitor size={12} className="text-amber-500" />
                        {
                          activePost.author?.toLowerCase().trim() === 'maliha' ? 'JOURNALIST & RESEARCHER' : 
                          activePost.author?.toLowerCase().trim() === 'hishma' ? 'MEDICAL SCHOLAR' : 
                          activePost.author?.toLowerCase().trim() === 'zaheer' ? 'HCI RESEARCHER' : 
                          'DIGITAL ARTISAN'
                        }
                      </MetaChip>
                    </div>

                    {/* body */}
                    <div className="mt-12 max-w-3xl">
                      <div className="custom-post-body">{renderContent(activePost.content || '')}</div>

                      <AuthorCard name={activePost.author} />

                      {/* Related Articles Section */}
                      {relatedPosts.length > 0 && (
                        <div className="mt-20 pt-16 border-t border-white/5">
                          <div className="flex items-center justify-between mb-10">
                            <div>
                              <span className="text-amber-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-3 block">Related Content</span>
                              <h3 className="text-3xl font-serif text-white">Continue the <span className="italic text-stone-500 font-light">Odyssey</span></h3>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {relatedPosts.map((related) => (
                              <button
                                key={related.id}
                                onClick={() => setActivePost(related)}
                                className="text-left group bg-stone-950/50 border border-white/5 rounded-[2.5rem] p-8 hover:bg-stone-900/50 transition-all duration-500"
                              >
                                <div className="flex items-center gap-4 mb-6">
                                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500/60">{related.category}</span>
                                  <div className="h-px flex-1 bg-white/5" />
                                </div>
                                <h4 className="text-xl font-serif text-white mb-4 group-hover:text-amber-500 transition-colors">{related.title}</h4>
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-600">{related.date}</span>
                                  <ArrowRight size={14} className="text-stone-700 group-hover:text-amber-500 transition-all group-hover:translate-x-1" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-16 pt-10 border-t border-white/5 flex items-center justify-between">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-600">
                          End of Journal Entry
                        </div>
                        <button
                          onClick={() => setActivePost(null)}
                          className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500 group"
                        >
                          Close Journal
                          <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <TableOfContents content={activePost.content || ''} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

const ExperienceSection = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const manifestos = {
    stealth: {
      title: "Architectural Stealth",
      subtitle: "AI · Knowledge Graphs",
      icon: <Monitor size={22} />,
      image: "https://images.unsplash.com/photo-1664854953181-b12e6dda8b7c",
      content: (
        <div className="space-y-12">
          <p className="text-2xl font-serif text-white leading-relaxed">I don’t build systems. I build understanding, quietly, precisely, and with the kind of discipline that only shows itself when things refuse to break.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-400 font-light leading-relaxed">
            <div className="space-y-6">
              <p>My work lives in the invisible layer of intelligence: knowledge graphs, ontologies, entity relationships, and the logic that lets information behave like it has a spine. I like problems that look simple to the user and terrifyingly complex behind the curtain, questions with ambiguous language, messy data, conflicting truths, and edge cases that don’t announce themselves until production is on fire.</p>
              <p>So I design for calm. I map meaning into structure. I turn scattered facts into navigable worlds where every connection has a reason to exist, and every query has to earn its answer.</p>
            </div>
            <div className="space-y-6 border-l border-white/5 pl-12">
              <p>I build logical paths that don’t depend on luck, constraints that hold, inference that stays honest, and query patterns that stay fast even when the world gets big. Most of it is invisible. That’s the point. Because in real AI work, excellence isn’t a headline. It’s a guarantee.</p>
              <p>The stealth is intentional: not secrecy, but restraint. I don’t want intelligence that performs. I want intelligence that serves, that makes the experience feel effortless without ever exposing the complexity that made it so. The finest engineering doesn’t scream to be noticed. It simply keeps its promises.</p>
            </div>
          </div>
          <p className="text-amber-500 font-serif italic text-xl">If it feels inevitable, it’s because the hard work stayed unseen.</p>
        </div>
      )
    },
    odyssey: {
      title: "The China Odyssey",
      subtitle: "Travel & Culture",
      icon: <Globe size={22} />,
      image: "https://images.unsplash.com/photo-1677071816328-edc04e7e059a",
      content: (
        <div className="space-y-12">
          <p className="text-2xl font-serif text-white leading-relaxed">China wasn’t a trip. It was a narrative I walked through, twenty cities, each one a different chapter, each one leaving a line inside me I still reread.</p>
          <div className="columns-1 md:columns-2 gap-12 space-y-8 text-stone-400 font-light leading-relaxed">
            <p>It began in Beijing, where history doesn’t sit behind glass. It stands in the air. The city feels like memory with modern muscle: ancient weight, present speed, and a quiet reminder that time can be both patient and strategic. From there the story kept unfolding, not as a straight line, but as a constellation.</p>
            <p>Guangzhou carried warmth and momentum, human energy moving fast, markets alive with purpose. Nantong felt like breath between scenes, a place where life doesn’t try to impress you, it simply continues. Dalian gave me the sea, an edge to the country where the horizon softens everything, even ambition.</p>
            <p>Jinan and Jining had their own texture, less spectacle, more reality. Xuzhou was grounded, sturdy, the kind of place that teaches you how endurance looks when it’s not romanticized. Tianjin felt like a conversation between eras, old corners whispering beside clean new geometry.</p>
            <p>Xi’an didn’t feel ancient in a museum way. It felt ancient in a confident way, like it knows who it is and doesn’t need to rush. Ya’an felt like nature speaking in lowercase, green, damp, quiet, a city that lowers your voice without asking. Anyang and Huaxian held a different kind of truth: daily life, raw culture, history without a spotlight.</p>
            <p>Lingzhou and Shijiazhuang gave me something more valuable than novelty: perspective. The kind that humbles you. The kind that reminds you that scale isn’t only skyscrapers. Sometimes it’s how many lives can fit into an ordinary morning.</p>
            <p>Then the cities that felt like forces of nature: Chongqing, vertical and endless, like the earth decided to build upward. Chengdu, balanced and fluent, spice and softness, speed and stillness, a place that teaches you the art of not rushing what deserves time. Yiwu was commerce as choreography, movement, exchange, supply and demand like a living machine. Shanghai felt like a future with perfect posture, sharp, ambitious, and almost too polished to be accidental. And Kunming felt like an exhale at the end of a long sentence, lighter air, softer edges, a closing chapter written in green.</p>
            <p>Across all of it, the contrast never stopped moving: ancient tradition living beside digital futures. In megacities, I watched friction disappear, routines flowing as if the city itself was an interface. In quieter places, I watched tradition function as infrastructure, rituals that still organize life, values that still shape behavior, a continuity technology can’t replace.</p>
            <p>That duality changed how I think about digital craftsmanship. It taught me that technology isn’t just innovation. It’s culture made interactive. And culture, if you listen closely, teaches something engineers often forget: Not everything should be optimized. Some things should be preserved.</p>
          </div>
          <p className="text-amber-500 font-serif italic text-xl">The most advanced future is the one that remembers what to keep.</p>
        </div>
      )
    },
    motion: {
      title: "Deliberate Motion",
      subtitle: "Philosophy",
      icon: <Zap size={22} />,
      image: "https://images.unsplash.com/photo-1595413717318-d7397fbdb69c",
      content: (
        <div className="space-y-12">
          <p className="text-2xl font-serif text-white leading-relaxed">I’m not hard to find. I’m friendly. I’m social. I laugh easily, and I can be very open. But I’m also private, with intention.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-400 font-light leading-relaxed">
            <div className="space-y-6">
              <p>There’s a difference between private and secret. A secret is hidden because it’s dangerous to be known. Privacy is protected because it’s valuable enough to remain untouched. I don’t live behind locked doors. I just curate the rooms people get to enter. And I learned that early, watching what envy can do inside a home.</p>
              <p>I grew up in an environment where siblings could destroy each other without ever raising their voices. Not because they were evil, because envy is quiet like that. It makes love feel like competition. It makes closeness feel like a scoreboard. It turns small comparisons into lifelong fractures.</p>
            </div>
            <div className="space-y-6 border-l border-white/5 pl-12">
              <p>That experience left me with a simple truth: people can’t destroy what they don’t know. And not everyone deserves full access to you. So I move differently. The Silent Move isn’t disappearance. It’s discipline. It’s deep work over loud announcements. It’s choosing progress that is real, even if it’s unseen. It’s building a life where attention is not the currency, and validation is not the fuel.</p>
              <p>I don’t perform growth. I practice it. I refine in private, then release when it’s ready, when it’s honest, when it’s strong. Projects and results speak for me because they are the only kind of noise I respect. This is deliberate motion: calm, focused, intentional living.</p>
            </div>
          </div>
          <p className="text-amber-500 font-serif italic text-xl">Privacy isn’t distance. It’s the space where mastery survives.</p>
        </div>
      )
    },
    alchemy: {
      title: "Inner Alchemy",
      subtitle: "Personal Development",
      icon: <Sparkles size={22} />,
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
      content: (
        <div className="space-y-12">
          <p className="text-2xl font-serif text-white leading-relaxed">I believe the most important piece of software we ever develop is ourselves. It’s the only code we never stop writing.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-400 font-light leading-relaxed">
            <div className="space-y-6">
              <p>My development is not one dimension. It’s emotional, spiritual, disciplined, and tied to identity, all at once. Not because I want to “cover everything,” but because I’ve learned that a human being can’t be edited into one category. Some people look peaceful while their inner world is a storm. Some carry calm inside and wear chaos on the outside. Balance is not a personality trait, it’s a practice. And I’m still practicing.</p>
              <p>Personal development, to me, isn’t a checklist or a set of productivity tricks. It’s alchemy: the slow, deliberate process of turning raw experiences into something valuable. I see curiosity as the base metal, plentiful but unrefined. Wisdom is the gold. And the heat that transforms one into the other is discipline.</p>
              <p>In my view, we are architectural projects. We need strong foundations, principles that don’t collapse under pressure. We need clear structures, routines that stabilize us without turning life into a prison. And we need beautiful interfaces, the way we treat others, the way we speak, the way we hold space without losing ourselves.</p>
            </div>
            <div className="space-y-6 border-l border-white/5 pl-12">
              <p className="text-amber-500/80 italic font-serif text-lg mb-8">“That’s why I spend as much time debugging my own reactions as I do debugging code.”</p>
              <p>For a long time, the hardest part wasn’t feeling things. It was naming them. Finding the right word, then deciding what to do after the word exists. Because once you name an emotion, it stops being fog. It becomes a shape. And a shape can be handled, held, redirected, sometimes even softened. I’m not an expert. I’m a student of my own inner weather, learning how to stay honest without being ruled by whatever passes through me.</p>
              <p>The spiritual layer is what keeps me steady when the emotional layer gets loud. There’s a sentence I carry like a compass, from Imam Shafi’i:</p>
              <blockquote className="pl-6 border-l-2 border-amber-500/30 py-2 my-6">
                <p className="text-white font-serif italic text-xl leading-relaxed">"My heart is at ease knowing that what was meant for me will never miss me, and that what misses me was never meant for me."</p>
              </blockquote>
              <p>That line teaches me a quiet kind of strength. I do my part, fully, then I let God, or the universe, decide what lands. If something doesn’t find me, I don’t call it a failure. I call it a lesson, a redirection, a message I wasn’t ready to understand before.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-400 font-light leading-relaxed pt-12 border-t border-white/5">
            <div className="space-y-6">
              <p>Discipline, for me, is also personal. It’s not always loud, and it’s not always labeled. Some people are disciplined without strict schedules, and that’s valid. For me, structure feels like safety. I like to plan. I like to program my days. Surprise can overwhelm me, especially when it’s urgent. So I build routines not as control, but as a stabilizer, a way to keep my mind clear enough to respond rather than spiral.</p>
              <p>My rituals are simple, and they repeat: journaling, prayer, reading, training, solitude, long walks, study. Not all at once, not perfectly, not as a performance. Just consistently enough to keep me aligned with myself.</p>
            </div>
            <div className="space-y-6 pl-0 md:pl-12">
              <p>The personal view of growth means accepting that mastery is a moving target. I don’t aim for perfection, I aim for honesty. Am I better than I was yesterday? Am I more patient? Have I learned to see a different angle on a hard truth? These are the real metrics of success that don’t show up on a resume.</p>
              <p>This is the inner layer of the Silent Move. While the world sees results, I focus on the internal shifts that made those results possible. Growth happens in the quiet moments between the big events, in the decisions we make when no one is watching.</p>
            </div>
          </div>

          <div className="relative p-12 bg-stone-950/40 rounded-[3rem] border border-white/5 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full" />
            <div className="relative z-10 space-y-8">
              <p className="text-xl font-serif text-white/90 leading-relaxed max-w-2xl">
                And if I had to choose one image for this pillar, it would be the night sky. Because it never explains itself. Some nights are clear, some are heavy with cloud, but the sky remains what it is. It teaches perspective, patience, and depth. It reminds me that not everything needs to be seen to be real, and not every process needs an audience to be true.
              </p>
              <div className="space-y-2">
                <p className="text-amber-500 font-serif italic text-2xl">Build the person, and the work will build itself.</p>
                <p className="text-stone-500 text-sm italic mt-4">Some transformations don’t announce themselves. They show up later, like constellations, when you finally learn how to look.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <section id="experience" className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto bg-stone-900/40 border border-white/5 rounded-[4rem] p-12 md:p-24 backdrop-blur-xl relative overflow-hidden min-h-[600px] transition-all duration-700">
        {/* Subtle decorative ring */}
        <div className="absolute -top-40 -right-40 w-80 h-80 border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 border border-white/5 rounded-full pointer-events-none" />
        
        {selectedTopic ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10"
          >
            <button 
              onClick={() => setSelectedTopic(null)}
              className="flex items-center gap-4 text-stone-500 hover:text-white transition-colors mb-16 group"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                <ArrowRight className="rotate-180" size={18} />
              </div>
              <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Return to Manifesto</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24 items-center">
              <div>
                <span className="text-amber-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">{manifestos[selectedTopic].subtitle}</span>
                <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
                  {manifestos[selectedTopic].title.split(' ')[0]} <br />
                  <span className="italic text-stone-600 font-light">{manifestos[selectedTopic].title.split(' ').slice(1).join(' ')}</span>
                </h2>
              </div>
              <div className="aspect-[16/9] lg:aspect-square rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl relative">
                <ImageWithFallback 
                  src={manifestos[selectedTopic].image} 
                  alt={manifestos[selectedTopic].title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
              </div>
            </div>

            <div className="max-w-5xl">
              {manifestos[selectedTopic].content}
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
            <div>
              <h2 className="text-5xl md:text-7xl font-serif text-white mb-16 leading-tight">
                The Silent <br />
                <span className="italic text-stone-600 font-light">Manifesto.</span>
              </h2>
              <div className="space-y-16">
                {[
                  { 
                    id: 'stealth',
                    icon: <Monitor size={22} />, 
                    title: "Architectural Stealth", 
                    text: "Developing high-integrity systems where complexity is hidden beneath a veneer of absolute simplicity." 
                  },
                  { 
                    id: 'odyssey',
                    icon: <Globe size={22} />, 
                    title: "The China Odyssey", 
                    text: "A silent traversal across 20 cities, capturing the spirit of a nation where history meets the digital future." 
                  },
                  { 
                    id: 'motion',
                    icon: <Zap size={22} />, 
                    title: "Deliberate Motion", 
                    text: "A commitment to the 'Silent Move'prioritizing deep work and meaningful progress over public noise." 
                  },
                  { 
                    id: 'alchemy',
                    icon: <Sparkles size={22} />, 
                    title: "Inner Alchemy", 
                    text: "Crafting the self through constant refinement, turning curiosity into character and knowledge into lived wisdom." 
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    onClick={() => setSelectedTopic(item.id)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-8 group cursor-pointer"
                  >
                    <div className="w-16 h-16 shrink-0 rounded-[2rem] bg-stone-950 border border-white/10 flex items-center justify-center text-stone-500 group-hover:text-amber-500 group-hover:border-amber-500/30 transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-serif text-white mb-3 tracking-wide flex items-center gap-3">
                        {item.title}
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all text-amber-500 -translate-y-1" />
                      </h4>
                      <p className="text-stone-500 leading-relaxed text-sm max-w-sm font-light">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-white/5 relative z-10 shadow-2xl bg-stone-950 ring-1 ring-white/10 group-hover:ring-amber-500/30 transition-all duration-1000">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1710405152558-f13f4cecbf20" 
                  alt="Digital Artisan Workspace"
                  className="w-full h-full object-cover grayscale transition-all duration-[3000ms] group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-amber-500 text-stone-950 px-12 py-10 rounded-[3rem] z-20 shadow-[0_20px_50px_rgba(245,158,11,0.3)] transition-transform duration-700 group-hover:-translate-y-4 group-hover:-translate-x-4">
                <span className="text-6xl font-serif font-light block leading-none mb-4 tracking-tighter">01.</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] block italic">Deliberate <br />Execution</span>
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const ContactCTA = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section id="connect" className="py-40 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-12 block">Stay Connected</span>
        <h2 className="text-6xl md:text-[10rem] font-serif text-white mb-16 leading-[0.8] tracking-tighter">
          Join the <br />
          <span className="italic text-stone-700 font-light">convo.</span>
        </h2>
        <p className="text-xl text-stone-500 mb-20 max-w-2xl mx-auto font-light leading-relaxed">
          Grab a virtual coffee and join the discussion on tech, life, and the journey of learning.
        </p>
        
        <div className="flex flex-col items-center gap-16">
          {!isFormOpen ? (
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="px-10 py-5 bg-amber-500 text-stone-950 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(245,158,11,0.3)]"
              >
                Message Me
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xl mx-auto bg-stone-900/40 p-10 rounded-[3rem] border border-white/5 backdrop-blur-xl mb-12"
            >
              <form
                action="https://formspree.io/f/mleykgke"
                method="POST"
                className="flex flex-col gap-8 text-left"
              >
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-4">Your Identity</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="email@example.com"
                    required
                    className="bg-stone-950/50 border border-white/10 rounded-full px-8 py-5 text-white focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-stone-800"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-4">The Conversation</label>
                  <textarea 
                    name="message" 
                    placeholder="What's on your mind?"
                    required
                    rows={4}
                    className="bg-stone-950/50 border border-white/10 rounded-[2rem] px-8 py-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-stone-800 resize-none"
                  ></textarea>
                </div>
                <div className="flex gap-4">
                  <button 
                    type="submit"
                    className="flex-1 px-10 py-5 bg-amber-500 text-stone-950 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-amber-400 transition-colors"
                  >
                    Send Message
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-10 py-5 border border-white/10 text-white rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="flex gap-12">
            {[
              { icon: <Facebook size={20} />, label: "Facebook", href: "https://www.facebook.com/mroivili.faouzia.2" },
              { icon: <Github size={20} />, label: "Github", href: "https://github.com/Mfaouzia" },
              { icon: <Instagram size={20} />, label: "Instagram", href: "https://www.instagram.com/tech_and_wisdom" },
              { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/mroivili-faouzia-43ab56164" }
            ].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                <div className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center text-stone-600 group-hover:bg-white group-hover:text-stone-950 group-hover:border-white transition-all duration-500">
                  {social.icon}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-600 group-hover:text-stone-400 transition-colors">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-stone-950">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-amber-500 overflow-hidden">
              <img src={logoImg} alt="Logo" className="w-5 h-5 object-contain brightness-110" />
            </div>
            <span className="text-lg font-serif tracking-tight text-white font-bold">M. Faouzia</span>
          </div>
          <p className="text-[9px] text-stone-600 font-bold uppercase tracking-widest">A space for digital artisans & thoughtful explorers.</p>
        </div>
        
        <div className="flex gap-12">
          {['Vision', 'Archives', 'Essence', 'Connect'].map((link) => (
            <a 
              key={link} 
              href={link === 'Essence' ? '#experience' : `#${link.toLowerCase()}`} 
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
        
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-600 text-center md:text-right">
          © {new Date().getFullYear()} M. Faouzia. <br /> Crafted in Tianjin.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  useEffect(() => {
    document.title = "Digital Artisan | M. Faouzia | Tech & Wisdom Chronicles";
    
    // Add meta description dynamically
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'A cinematic exploration of technology and philosophy by M. Faouzia. Chronicles of a digital artisan bridging the gap between systems engineering and silent move philosophy.');
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-amber-500 selection:text-stone-950">
      <NoiseOverlay />
      <BackgroundDecoration />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <TechStackMarquee />
        <NarrativeTimeline />
        <BlogSection />
        <ExperienceSection />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}