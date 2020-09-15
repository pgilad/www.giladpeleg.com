---
date: "2020-09-15T16:05:34.599Z"
title: "A Better Code Review"
tags:
    - code-review
    - development
draft: false
---

> "Everyone gets the experience. Some get the lesson." T.S. Eliot

Contributing to a project is not an easy task, especially if you're new to the project, new to coding in general, or
just not an active contributor.

I have been on both sides, the contributing side and the reviewing side. I've made mistakes on both. The mistakes I
regret the most are the ones I've made on the reviewing side. Some are obvious, some are not. All of them could have
made the contributor's life, whether a developer on the team, or a contributor in an open source project, much easier.

A critical point to make, and something that I personally do not accept as a manager or as a developer, are actions
taken on either side which are made with bad intent. So while innocent mistakes are fine, we all make them, knowingly or
not, doing bad by intent is not acceptable behavior at all. Following up on the previous point,
by making intentional mistakes, I mean following imperfect guidelines, or having a
false perception of what's important or how to convey it, in contrast with having malicious intentions with your
actions.

## Insignificant factors

There is a big waste of time and energy in trivial, non-significant feedback. This complies perfectly with
[Parkinson's Law of Triviality](https://en.wikipedia.org/wiki/Law_of_triviality). People spend a disproportional amount
of time bothering with trivial details that have almost nothing to do with code semantics. From arguing about style,
function names, property names, names in general, spaces (or tabs), indentation (or lack of), braces, splitting code to
modules (or joining separate modules), extracting constants (almost religiously).

People also love premature optimizations (Which are known to be the
[root of all evil](https://wiki.c2.com/?PrematureOptimization)). They do or suggest using LRU, sets instead of lists and
so many other factors, without any proven significant performance benefits, or that those are even needed. In general,
the program complexity seems to matter less than program correctness (or assumed correctness).

Why do we bother with such things?

1. We underwent similar scrutiny when we were less experienced, and think it's great, or the correct path to becoming
   better. Maybe it's simply something new trainees have to do.
2. People tend to spend less time thinking about the global effects of a change, and spend more time on the micro level.
   This means reading and writing comments on a review as they process it. This prevents the reader from "Seeing the big
   picture". Instead, we focus on tiny improvements, as if they were the important factor. "Improve this function's
   name", "Extract this number as a constant.", all things we write that have almost no significant semantic code
   impact. Why do we do them? They're easier to come up with, and they're also sometimes more obvious.
3. We didn't take the time removing any manual decisions about style from the review. Both the contributor and the
   reviewer need to spend effort on reviewing style and this both wears them down, and simultaneously prevents them from
   focusing on what matters. This is a key point I'll discuss later in [Removing obstacles](#removing-obstacles).
4. We find it hard to believe that
   [code reviews rarely catch bugs](https://docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/code-reviews-not-primarily-finding-bugs#code-reviews-rarely-find-functional-bugs).
   Yes, it's kind of shocking, we were all taught that code reviews are an effective tool for this kind of things.
   They're not. They are effective for other things, discussed later in [The important stuff](#the-important-stuff). The
   overall theme of thinking too highly about code reviews is basically science fiction. We should be spending our
   energy elsewhere.
5. It's a form of control. This is a bit sad to say, and I've been there myself. Teams tend to be overly defensive about
   their code and apply harsh review to external (to the team) contributors. They also sometimes apply this to more
   junior developers, partly as a training tool and partly a control tool. Software code control is mostly a virtual
   dance around a code repository. The alleged last defense (besides code quality tooling and deployment) is the code
   review. Teams really believe it is their job to "protect the code", whatever that means, and their belief is
   reinforced when they have to wake up at night due to changes done by external team members. One can say they should
   have built better protective measures, or that they also wake up at night to their own changes, but it's very easy to
   fall into this "guardian" trap after the n-th time they get a pager from an external person's change.
6. A form of control, but the bad kind. A person or persons are either taking care of their job security, or making sure
   you know who is the owner (boss). This is a form of territorial battle, where someone who has the last word wins and
   thus receives virtual fame and confidence, at least on paper. This happens a lot more than one would think it
   happens, but in the end, code is written (at least in present day) by humans, who are a talking animal, but still an
   animal, with a social ladder and animal-like behavior. I've been there, it's ugly. If you're in a company that has
   this kind of stuff going on a lot, I suggest you run away.

## The important stuff

What should we use code-reviews for? To be perfectly honest, I'm not a big believer in pre-merge code-reviews (To be
explained later in [The road less traveled](#the-road-less-traveled)). I've seen them weigh down development speed so
much, the added benefits might not be worth it. That said a code-review can be important when:

1. The developer is new. Either entirely to the code-base or to coding. That developer is going to need feedback on both
   how to code, how "we" code, and what's important to the team. In these regards, the code-review is being used as a
   training class, and less than a device to add features. In a way, this is the asynchronous alternative to pair
   programming or coding together.
2. Someone wanting to familiarize themselves with the code-base or changes made to it. That someone can be another
   developer that you want to be aware of your new feature or changes, your tech lead or a senior engineer in the team.
   A code-review helps them learn the inner-details of your new feature, that specific part of code that they don't
   know, or just get better acquainted with the code-base. This means the code review is meant as an FYI to them, and in
   most cases it shouldn't be blocking.
3. Reviewing system critical changes. Sometimes you do need or want an extra eye-ball on system critical changes.
   Anything that can have a drastic effect on the system, from changing the way you run tests, to changing service
   infrastructure, to super-hot code which is very performance oriented, to sensitive billing code. Those areas might be
   worth the added blocking review, but I also assume those areas are less frequently edited.

As a side, a lesser known point is that sometimes code-review are required as part of regulation policy the company is
complying with, such as SOC2. This makes code-reviewing changes required, though it doesn't make the insignificant
factors significant all of a sudden, so don't let that get in the way.

## Removing obstacles

As obvious as it may sound, you should be investing as much as you can in automating anything that can be automated in
code-reviews. This includes:

1. Code formatting should be done automatically when developing and checked automatically on code-reviews. Not by a
   human.
2. Automatic code linting (and any static analysis applied) should represent most of your style guide. In fact, I would
   go further and say that if you can't build an automatic rule to at least warn about a style violation, you shouldn't
   bring it up in code-reviews, ever. It's just not worth it. (This lesson I learned from a very smart friend who
   enlightened me on this).
3. Testing, and quality assurance should both ease the pains for contributors, and increase confidence for maintainers.
   If they don't - you should either delete or fix them. I've worked on code-bases where the tests would just slow down
   the developer, never actually giving valid input. What are they useful besides wasting our time (or making it harder
   to contribute)? Adding useful tests improves development speed and confidence, not slow it down. It also lowers the
   blast radius, making errors less deadly in production (By allowing less brutal errors to pass through,
   unintentionally).
4. Extending the previous points, I would go further and argue that any non-semantic review comments should be kept to a
   minimum, preferably non-existent. Contributors should feel safe contributing, and know that even if they poorly named
   their variable, everything is going to be ok, assuming their code still works. This can also be fixed in retrospect
   (supporting post-merge workflows), as it has no semantic difference.

Despite all the above, it is in my experience that developers find it very hard to let go of old practices. I know I
did. Once you understand the enormous negative side-benefits of focusing on the trivial stuff, you understand they are
waste of time and energy. To all sides.

A question I get asked sometimes is why should you allow bad code practices to slip through to your code, especially if
you're the owner of it, and a contributor is just passing through. My answer is simple.
You want the code review to be effective and focus **only on what's important**. Critical stuff you
might have missed. Everything else is a distraction meant to make the code prettier, but probably not better.

If you have concerns about code style add a linter. Add static rules that prevent adding this bad change. Better yet,
prefer automatic fixing of code style (when possible). Style should be a solved problem,
and I don't care what style it is - as long as I don't have to actively think about it
when contributing (or reviewing).

A thought that I always try to propagate is to treat others (contributors) as a reviewer the same as you would like to
be treated when contributing.

## Harmful stuff

Review comments have a style of their own. A lot has been written on reviewer hostility, and I'd like to assume you
understand how comments should be styled.

See [Unlearning toxic behaviors in a code review culture](https://medium.com/@sandya.sankarram/unlearning-toxic-behaviors-in-a-code-review-culture-b7c295452a3c) for example.

## The road less traveled

Just so you know, there are alternatives to blocking code-reviews. I've discussed this earlier when separating between
pre and post-merge reviews.

A pre-merge review is a blocking review which prevents the contribution from being merged to the main-stream branch
before the review (or approval). This is in contrast to a post-merge review, whereas the code is merged (automatically
or manually) and the review is not blocking, but done after the merge at some point in the future.

If none of the critical factors for conducting a pre-commit review hold, why should we force a review before merge?
There might be still valid cases (Regulation for one), but in general a hybrid model could work very well.

That said, I personally have no experience working in a post-commit review culture, although it's a dream of mine. For
that I really recommend you read
[Post-Commit Reviews](https://medium.com/@copyconstruct/post-commit-reviews-b4cc2163ac7a) for a fantastic in-depth
overview of post-commit reviews, and the differentiation with post-deployment reviews.

Not all commits should receive a review. Some are trivial, in some you have a lot of confidence that make the review
redundant, and in some the review would simply not be the best spend of your time and energy. You should spend it on
automatic quality assurance, and in automation tools to reduce the overhead of required reviews (As much as possible).

## Gates and their surprising effects

Before a change can be delivered to production, it usually passes through several "gates" which validate the change's
correctness (Assuming we know what's correct and how to measure it).

The gates can be a QA engineer testing the code on a development or QA environment, a staging environment, a continuous
integration (CI) environment with multiple test suites running (unit tests, integration and end-to-end tests). There are
numerous other gates as well.

Code review is also a gate that is supposed to "catch" incorrect code, or at least we assume they do so efficiently.

The positive side of those gates are obvious - with each gate we increase the confidence we have in the change. Gates
are supposed to be increasing confidence in a change as we get closer to the production environment. Some might say that
having multiple gates increases the probability we'll find the bug, since multiple gates are usually monitored and
reviewed by different people at different times. There is also the irony of incomplete designs, which are bugs we
discover only after we finish coding, and we wish to fix them before they are released to production. Sort of like
finding an error within an email we wrote, and the mail provider gives us a few seconds to revert. It's an irony because
we could have absolutely found those obvious bugs before we finished and pushed our change, but sometimes it takes a new
state of mind to discover them.

Gates also lower the blast radius, as each gate should more closely resemble the production environment, meaning an
increased probability of bug discovery which is mainly reproduced in production-like environments.

The negative side of gates are less discussed. The obvious is that they slow down the release of a change to production.
From another engineer (QA) reviewing the feature, to code-reviews, CI, staging, and whatnot, those gates are a barrier
between code finished to code released, and they necessarily lower your
[development lead time](https://en.wikipedia.org/wiki/Lead_time). You have to think hard whether this cost is worth it,
given proven research on the correlation of extremely fast lead time with successful companies (See
[Accelerate](https://www.amazon.com/gp/product/1942788339/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=giladpeleg-20&creative=9325&linkCode=as2&creativeASIN=1942788339&linkId=ed9f3c97f9758b90ac7a28dd0549c38e)).

The intended effect of gates, of increasing confidence in a change, might have another, unintended effect (Not
surprising, given the law of [Unintended consequences](https://en.wikipedia.org/wiki/Unintended_consequences)). This
effect is the decrease in the amount of confidence a developer must have in his change while developing it. It's
obvious, he has future gates that will prevent his possible future "bad" change from propagating to the production
systems. This might cause the developer to invest less time in quality assurance of his change, and thinking about
edge-cases. Edge cases are seldomly accurately tested in gates. They are very hard to predict in advance. Given the
above, I would say it's dangerous to neglect the negative effect an added gate will have on code correctness.

The above is especially true if we consider adding a gate that's not very useful for code correctness, or even worse, we
think it adds to code correctness whereas in reality it doesn't, at least not that much.

This is why I think having code reviews, while thinking it increases confidence in finding bugs can overall reduce code
quality because the engineer might spend less time thinking about edge cases or code quality in general. You also share
responsibility with another human who does the review, making it easier for you to be less pedantic than you could. This
isn't an absolute rule (As everything else in life), but you should give it some thought.

## Parting words

If you take a single thing from reading this, is that you can't be dogmatic about code reviews. I know I was, but only
because I didn't know better. In this article I tried to list contradicting effects, both positive and negative of code
reviews. There are always exceptions, and everyone's experience may vary. All-in-all, invest time in thinking about
this critical gate. Is it useful enough, does it provide value overall or is it mostly a distraction or means of
control?
