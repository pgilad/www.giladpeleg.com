---
date: "2019-02-18T20:32:30.333Z"
title: "Code Retreat - Game of Life Notes"
tags:
    - coding
    - tdd
    - pairing
    - development
    - game-of-life
---

Today we had a [code retreat](https://www.coderetreat.org/) day at the office. I had a really good learning experience,
and wanted to share my thoughts.

In general, a developer's most important skill (and perhaps everyone's) is the ability to constantly
learn. This relies on many factors, some internal (Like whether the developer is interested in learning
or is perhaps worn out), and some external (The company he currently works in, the amount of time he
has to dedicate to learning). The developer's curiosity and hunger will fuel his learning tank,
but this too can be worn out or tainted, by a bad environment, a bad situation in life whether temporary
or permanent, or perhaps just reaching a really comfortable place and no longer questioning things.

It seems that the learning appetite is usually negatively correlated with seniority. The junior
developers are on a constant race to learn new technologies, new methodologies and new practices.
The senior ones, usually having seen a technology or two (or a framework or two), have adopted
practices, some helpful and some not, but I find that they usually:

- Got tired of learning, perhaps generally tired (or worn out).
- Got really comfortable in one or all of their coding practices, their job, their development setup,
their favorite language, technology or framework.
- Never really loved coding or design of systems, thus never really invested in more than
intermediate learning.

There are probably more concrete reasons senior developers stop (or really slow down) learning, but
these are the main ones I observed. Out of the three, by far the most common reason is the
"got comfortable". This might be true to any other area in life, but as a developer, with a constantly
changing environment, it's very risky. It is indeed, most likely, their primary income method.

That said, today was an opportunity to be a routine breaker, especially for those who have fallen
deep into one (a routine). We had an external facilitator from a consulting company named 
[Agile Spark](https://www.agilesparks.com/). He presented the itinerary for the day,
and explained a bit about our day's challenge - [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

I think it's an excellent drill, not too difficult, yet hard enough not to finish in the allowed
time-slots. Because it's very popular some people know it, and worse off, have solved it before.
This disrupts the point of the exercise of being receptive to learning.
During the day we had 5 - 45 minute sessions of pairing with a "seemingly random buddy"
(more on that later), with various constraints and/or instructions to practice.

The constraints on the game are ways to make it more challenging (especially near end sessions),
but the instructions were:

- Write regular code
- Write [TDD](https://en.wikipedia.org/wiki/Test-driven_development), mostly using [Emerging Design](https://en.wikipedia.org/wiki/Emergent_Design)
- Switch between who writes code and who writes tests
- Practice the now popular [test && commit || revert](https://medium.com/@kentbeck_7670/test-commit-revert-870bbd756864)
- 3-way pair

My overall thoughts - great way to structure the drills, lots to learn and people to pair with.
However, I noticed some interesting elements, some completely unrelated to the setup:

## Seemingly random buddy

People were initially sitting down adjacent to their work friends. Some people were sitting down
in their original seats, thus very comfortable in their position (already a bad start), some people
came in from another open-space part of the office, sitting at random, but next to people they like.
The initial session seemed to create random pair matches, but of people who were already comfortable
with each other. The next sessions people choose their next buddies, mostly by proximity or worse,
familiarity.

I even heard some pair couples wanting to continue together to next rounds, as if missing the whole
"uncomfortable" and new point of the day.

It would have been much better to completely randomize the pairs for each round. Moreover, add a rule
that you cannot sit in your original position. We want to get you as uncomfortable as possible.

## Dev setup - the bad part

In between each session we were instructed to delete all of our code. At first it was easy, but
after getting better design and tests, and more code written pairs were falling in love with their code,
almost refusing to delete it, but also wanting to at least keep the bootstrap part. This was logical.
Bootstrapping the project was very expensive time wise.
 
It was by far the biggest "to improve" of the day.
Pairs usually took at least 5-15 minutes setting up their
dev environment. Obviously this includes choosing your coding language
(everyone chose Python or JavaScript), but also:

1. Opening a new project
2. Initializing git
3. Initializing IntelliJ with your language
4. Creating initial files
5. Running tests (some running in watch mode, some manually running them)
6. Writing code
7. Running the code

It was not at all uncommon that pairs wasted half their time on dev setups. This is perhaps expected,
since developers usually don't spend any time bootstrapping projects (or switching their coding language),
but again, this is something I would rather keep for another coding day (bootstrapping day anyone?).

It would have been preferred to have Python and JavaScript bootstrap projects to git clone and have
everything (or almost everything) setup for the pair to start working in 2-3 minutes.

Dev setup is a crucial (and never-ending) skill of any serious developer, and is super important, but
with such short time, I would rather focus on other areas in this day.

## Dev setup - the ugly part

This is a side observation, inline with what I already know, that most developers don't spend time
or awareness creating their perfect work setup. Heck, they don't even use the available resources.

For example, several pairs were working only on a laptop screen (and keyboard), while there were
plenty of open seats next to 2 monitors, an external mouse + keyboard. But somehow they found it
more productive to work on a 13" screen and internal keyboard.

Another example is that most pairs didn't bother having their unit-tests running in watch mode.
They would write code and manually run their tests. All the time.

Another example is not taking advantage of the powerful refactoring tools in [Jetbrains IntelliJ](https://www.jetbrains.com/idea/).
It has numerous refactoring tools, test creation tools, snippets and whatnot meant to speed your development
but a lot of developers simply prefer mouse pointing and typing.

It seems that most developers either don't know or don't care too much about those things. Luckily
for me though, I do :) so I spend a lot of time honing my development environment, dotfiles, IntelliJ
plugins and shortcuts and whatever else can make me go faster. With all that, I still feel slow, as if
I cannot get my thoughts manifested on the screen as fast as I would like. There is always room for
improvement. That said, a lot of the developer's time is spent on thinking, designing or interruptions,
so perhaps writing fast, or having great feedback loop is easy to forget. Especially if you haven't
seen it first hand and not aware of the potential.

## Deleting code

Pairs were highly reluctant to deleting their code. Why should we delete it when we can just improve
it? Good question. Do developers throw away code in real life?
Only when they consider it [legacy](https://en.wikipedia.org/wiki/Legacy_code) and refactor it away,
or product decides to deprecate a feature (when would they do that??) with the relevant code.

Deleting code is very common, just not deleting changes or code that you believe is needed. During the
day, keeping the code would mean making the pairs more comfortable, not something we want.

A more serious take on deleting code comes with `test && commit || revert`. In this session the pairs
worked so that on each 4 minute interval only 1 of the developer's would write code/tests, and the rule
was that you had to commit your code, but only if your tests were green (passing). Otherwise, you had
to `git reset --hard`. Ouch. You watch the countdown timer as it approaches the 0 mark,
thinking to yourself, why oh why did I try to do too much in those 4 minutes.

This was especially hard (but productive) if you got a leap forward in the 4 minute interval. Let's say
you managed to solve a tricky unit-test or production code, but something didn't click right,
and you tried to solve it but ran out of time. `git reset --hard`. But this is a great thing,
you have learnt how to solve the problem, or nearly how to solve it. You can now either re-implement
the previous attempted design (just faster/better), or attempt another way, but with better knowledge.
This kind of throw-away code is great. Falling in-love with your code is a problem, and writing
disposable code should prevent you from overly investing in your code, before you even know if it's
going to last. I loved this session, and thought that effectively, this could have been the best
session of the day.

I didn't get a chance to observe the other pairs during this session because I was heavily into it.
Got carried away I guess :)

Micro-commits are a huge leap forward in a developer's skills. Too many developers I see spending
hours, or even days without a single commit. Just hacking and slashing, they try to make everything
works. Their pull-request would also be very hard to review later, gathering several hours or days (or weeks)
of work. Then comes the all famous [Looks good](https://medium.freecodecamp.org/what-do-cryptic-github-comments-mean-9c1912bcc0a4).

With micro-commits, comes micro deploys and micro releases,
and the path is much shorter to [continuous delivery](https://en.wikipedia.org/wiki/Continuous_delivery).

## The goal

The competition part of the day is crucial. It makes pairs (and individuals) want to work faster,
get better design and overall achieve more. This is also a disadvantage. I saw several pairs
working too hard on the assignment, missing out on what was supposed to be the real goal:

> Get uncomfortable, learn new skills, try new things and meet new people

I understand not everyone is into that much meta-thinking, but my thoughts as a manager, and fellow
developer, were on how to make people understand they are here to learn, not complete a puzzle.
The puzzle is only the framework, it's not interesting by itself. Perhaps correct incentives
could focus the developers on the right goals, or perhaps it's just inherit to people to focus
on completing the race, than real-time reflection on the path there.

## The pairs

This was the hardest to observe, but my experience matched my previous experiences on pairing. 
*It depends*. It depends on the skill levels of each developer, their skill gap, their familiarity
with each other. Their confidence in general, and in their design and understanding of the game.
Their seniority and assertiveness level. It depends.

Pairing with a junior developer is more like a teaching exercise. You barely get any value from 
writing code yourself, but the most value (indirectly) from being the co-pilot but mostly from
teaching them. This is a bit mundane, and resembles coding sessions with junior developers on 
everyday work, but nonetheless an important part of both the teacher and the student.
If the skill gap is too big, the teacher barely learns, and frustration can arise. With similar
skill sets, the teacher can definitely learn, and the student learns a lot.

This is in sync with [Dreyfus model of skill acquisition](https://en.wikipedia.org/wiki/Dreyfus_model_of_skill_acquisition),
and also see https://www.bumc.bu.edu/facdev-medicine/files/2012/03/Dreyfus-skill-level.pdf and
https://www.pagantuna.com/posts/the-dreyfus-model-of-skill-acquisition.html

At the end of the day we discussed the pairing experience. In our company we barely do any real
pairing, it's mostly a senior (or tech lead/manager) sitting with a fellow developer and either
telling him what to do, or suggesting it to him. Socrates style of discovery isn't practiced much,
and observing pairs (when the co-pilot is just an observer taking notes) are rare to non-existent.
Thus most pairing is limited in learning experience for both parties.

The instructor asked about how it was to switch partners. Most reactions were that people preferred
working for a long time with the same buddy (getting comfortable again). Partner familiarity is
very important, especially for velocity, but learning new things and getting new insights is rare
if you've been pairing since forever (Unique exceptions apply). People were very surprised to hear
that effective pairing is very short-term. To them, it seems that pairing is an extension, or 
improvement to the steady-state path they have been walking. I haven't seen enough pairing
to tell whether it's true or not, but my gut tells me that being pair-agile correlates with being
agile in general, and probably correlates with openness to learn and get real/honest feedback.

## Improvement and takeaways

Before we ask how can we make a better code retreat, we need to ask what do people actually take
from it, in this (above) recipe. At the very least, it's a fun and refreshing day, but my guess is that
people do understand the limitations of their current knowledge, of programming, solving problems,
design patterns, testing, pairing and general practices. It may at least tingle a bit, maybe even
strongly resonate, and maybe even change some of their practices and styles.

To follow-up, developers can be asked to pair on actual assignments, practice honest TDD, or 
even go to the extreme and practice Kent Beck's `test && commit || revert`. At least some of the
time. Either by their choice, or (evil grin) by a random choice.

Another code retreat **should** be scheduled. This one should focus on harder challenges, and new
and exciting constraints and development methodologies. In this case, I think it should be not
too far away from the initial code retreat. People have a tendency to forget quickly, even important
lessons, and this is one lesson that can very positively affect their skills. 1-2 months ahead max.

Perhaps instead of attempting to crack Conway's game for the entire day, it's possible to swap
puzzles on each session. Something in the sort of [Advent of Code](https://adventofcode.com/).
These are all new, exciting, sometimes easy, sometimes hard puzzles. And most people don't even
know them. This way, there is no reason to keep or want code between sessions (except the bootstrapping
code).

More improvements, can be to focus on contract or interface tests, mutual to all pairs. I do want
pairs to think on what is a good design and how to test it. How to correctly test it is also super
critical, but this puts more focus on the architecture side on things.

Code golf can also be exciting, forcing you to hone your skills and language idioms.

The challenge of this kind of day, is always to balance between having your juniors feel they have
achieved a lot (and boost their confidence), and your seniors understanding they still
have much to learn. Not an easy goal at all.

Randomness is key. Randomize the pair. Randomly pick where they sit. Randomly pick their coding language
(Has to be something they know though). Randomly pick how they work. Randomly pick their framework.
Randomly pick how much time they have for the exercise. Make everything random, make them uncomfortable.

The day's retrospective is important. In our retro, only the managers and senior people talked. I would
have loved to hear everyone's take on things. What they liked, what they disliked, what they learnt.
What they would keep and want to apply to their day-to-day. What most surprised them. Open forums
can be tough for introvert people, so perhaps a short questionnaire, or round table turns can help.
Don't set and forget, some people only understand the experience after a day or two (or a week).
Setup a follow-up retrospective and discussion 2 days after the event, and get even more information
on what worked and what didn't.

And above all, make sure everyone is having fun. If someone is sitting on a keyboard typing what others
are dictating, or not understanding at all what is going on, or on the other spectrum, bored as hell,
make sure you have methods and tricks in your bag in order to improve their day. It has to be a fun
day for them to be receptive to learning.
