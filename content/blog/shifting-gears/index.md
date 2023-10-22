---
date: '2020-06-13T06:15:16.850Z'
title: 'Shifting Gears'
tags:
    - leadership
    - managerial
draft: true
---

Shifting gears is about how you spend your time with code, as a manager, but probably also as a senior developer.
As I'll try to explain later on, it's not about the code, but more about tasks, and your familiarly with both the
company's domain and architecture. I use the manual gear metaphor, which I find the most fitting here, because
when you drive, you don't always drive on 1st or 5th gear. You have to know what gear is most fitting per your
driving situation. More interestingly, you could be driving the same road, with the same car, and under different
driving conditions will use a different gear. You could be using 2nd gear on two entirely different situations,
different road conditions, different car. The dissonance between these two entirely different contextual situations
is clear, but applies to real world situations as we'll soon see.

## Driving gears

Let's try to interpret our gears metaphor to handling code and tasks, and also try to generalize enough as interpretation
isn't solely bound to programming. People learn differently. There are different types of learning, some even apply
to different situations. Particularly I find the following options as a manager when needing to complete a task:

1. **I do** - code it all myself. This means you get very familiar with the code, but you have to work hard to complete
the task in most cases. There is also no continuation, the next time this particular task comes on, no one has practiced on it. As long
as you keep doing it yourself, no one else learns (Though perhaps you have a code review process to pass on some knowledge).
A hidden gem often overlooked is that you get to apply your best standards to the task. Finish it fast and get it over, or invest
time writing tests, documentation, alerts as you please. This gear should be used sparingly, as you would usually find you
drive on 1st gear for a very small percentage of the drive.

2. **I do, you watch** - A different flavor of 1st gear, you still work on the code and task, but now someone is watching. This greatly
improves the ability of the task to be delegated in the future, and also works on your teaching (training) abilities. Having to explain
what you do forces you also to think about what you do. You get to be extra critical because someone else is watching and learning,
from your mistakes as well. The downside to this technique, is that you will probably work slower than 1st gear. Having to work
and explain your steps makes you both extra aware of your actions, but also having to explain them takes a time and mental toll. This
driving gear can be used in a substantial part of your drive, if your drive in low speeds situations, such as in the city.
If you're driving long distance, it could be used a small portion of the drive. The situational differences matter.

3. **I do, you do** - Some might call this pair programming. You could however split work altogether, where you work on an orthogonal
part of the task, and your partner works on the rest. You could be working on test code and your partner works on the source. Or vice-versa.
You could be sitting on one computer programming as an individual with people minds working on the task. The variations are endless, but
they do posses an excellent learning experience, both for your and for your coding partner. Note I call the person a partner, while they
can totally be a team member if you're a senior engineer, or a subordinate if you're a team lead. This match can work with wildly
differing skill levels, a senior and a junior, two people on the same intermediate level. Someone with great code familiarly,
and someone not knowing the code at all. Although this driving gear is usually prevalent with any drive, it's not the most common
coding practice in the industry.

4. **You do, I watch** - A step towards delegation, but not disconnected from training and pair programming, this method lets the developer
implement a task while you can add comments, remarks, design considerations and tips from the side. This also allows you to steer
the task implementation with your best believes, sometimes very hard to achieve in other gears. Being a more advanced gear, I feel
it is harder to use with more advanced developers. They might not appreciate being watched and critiqued, and will find working together
more liberating. Contrary to their believes, this is golden opportunity for those who want to improve their thoughts and training ability.
Ability to explain design, code and implementation considerations to someone reviewing them on the spot can greatly increase your skill
and awareness. This is great training wheels before switching roles to **I do, you watch** but reversed - with the developer previously
explaining their actions to you, sitting on the instructor sit with a more junior developer.

5. **You do** - A classic set and forget. Review and check-pointing included, this gear is well adjusted for the long and far runs.
It does require a deep belief in the performer of the task, a naive mindset, or a lack of ability to do otherwise. If you're
new to the job, unfamiliar with the domain or architecture, you won't have much choice for the bigger, more complicated task but to
delegate them to a senior developer. On the other end of skill, if you have very strong developers in your team who you trust can
perform the task at least as well as you, delegating is a great option. This gear can be a bit dangerous to more junior developers
without guidance. Giving a complex task to a junior developer without any assistance can get them frustrated, stuck, implementing bad
design and a feeling of swimming in too deep waters. This can sometimes shake the over confidence some of them have, but doing it
repeatedly is risky.

## Gear considerations

Now that we've seen the different gears, the obvious question is which one should you be driving? As always the considerate answer
is that **it depends**. The context matters a lot. Let's review some (but obviously not all) considerations on driving gears:

### Learning style

How do people familiar themselves with new code bases, or new domains? Different people have different learning styles.
Yourself included. Some people learn by watching, some by doing,
some by a mixture. Some people can learn from watching YouTube videos, some people have to get their hands
dirty to learn.

Everyone has a different style and that style often changes as they progress or shift into different roles.
Gear has to be adjusted to fit the different learning styles of people. The progression of gears also varies -
this means that some people will need to transition from 1st gear to 5th in a progressive succession. You start
by doing, then showing them, and then later gradually transitioning to them doing. Some people quickly get the
hang of it and can skip gears entirely (Like skipping 4th gear and going straight to 5th).

### Task urgency

Urgent task tend to have their own gear considerations. If production is down, it makes less sense to fix a problem
together. If a customer is at the final stages of a competitive POC (Proof of concept) and is pressing hard
for a feature, you probably won't spend time instructing another member how to tweak this feature.

On the other hand, for low urgency task, there is no time pressure to practice pair programming. This is
what people may call "Important and not urgent" tasks, where you can usually take your time to perform them
at a steady pace, which includes shifting the various gears in accordance with your training partner.

Task urgency can dictate which gears are possible (or recommended), but also posses danger - if you're
in the sort of organization or team which is consistently fire-fighting, you may find yourself always
driving the same gear - doing yourself or not doing at all. This is a limiting place to be and you should
be very wary with your developers morale in regards to this mentality.

### Team seniority

Different developer and team seniority can affect which gear is recommended. Perhaps more junior developers
benefit a lot from a 2nd gear style of driving - I do and show you how it's done. Senior developers can benefit
more from shared gear driving (Like pair programming) or at least from demonstrating the task (You do I watch)
and getting valuable critique from their partner. The fit here should be both to a specific developer seniority
but also to the team seniority. A senior oriented team will naturally drive in higher gears such as performing
tasks mostly alone. This is fine, as long as gears are occasionally shifted (As we'll talk about more in the Risks section)

### Team style

Teams have different work styles. A remote contract team will naturally perform tasks alone, while a co-located team
can prefer to work more together on tasks.

## Risks

Driving with the wrong gear in the wrong situation may danger the car (and passengers). It could also restrict the driver from
actually being able to drive at relevant speed at all. Let's examine how the analogy for coding applies:
