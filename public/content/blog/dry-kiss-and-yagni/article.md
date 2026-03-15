This is an overview of arguably the most fundamental trinity of programming principles.

These principles hardly need an introduction, let alone a description, but perhaps briefly ruminating on them here will attune the mind of the reader to their usefulness as general principles to be kept in the back of the mind when writing code at any given level. A set of prime directives, if you will.

I must strongly warn against taking these principles as absolutes. They are for guidance and suggestion - they are advisory.

<img src="/content/blog/dry-kiss-and-yagni/images/obiwan.webp" alt="obi-wan">
<p class="caption">Obi-Wan Kenobi keeping it real.</p>

# DRY - Don't Repeat Yourself

You should never write or have to write the same code twice.

This principle primarily speaks of generalization. Generally speaking, you want to break down code into smaller and simpler units until you're juggling with the syntax of your APIs rather than implementations themselves. This makes it less likely that you will find yourself writing the same thing twice. If you see the same code twice, wrap it in a function, class, or another construct of choice. Basically reuse, reuse, reuse. Or let's say, `reuse(3)`.

This principle is about laziness - a good programmer is a lazy programmer. You don't *want* to write things twice because it's boring and wastes time.

It's also about maintainability. Not repeating yourself makes your program easier to work with long-term because it naturally gets split into reusable, easy to work with units.

Finally, this principle is about safety. Implementing the same thing twice makes it more likely that one of the two implementations contains a bug. By not writing the same code twice, you make sure that ~~if~~ when you have a bug or a misbehavior, you only have it in one place. This makes it easier to debug and resolve, and avoids a lot of confusion down the line.


# KISS - Keep It Simple, Stupid!

> Simplicity is the ultimate sophistication.  
> -Leonardo da Vinci

This one is simple - pun intended. Simply do the simplest thing that works and don't invite complexity when you don't need it.

One of the darkest places in all of programming is the code that has been overcomplicated beyond everything that is reasonable. It usually happens because someone didn't take a step back and look at the full picture. And they were probably in a rush. This codebase archetype is that of a disorienting maze, an underground dungeon full of ancient and dusty tomes most of which invoke a spell that hurts the caster, full of dirt, spiderwebs, and roaming gangs of goblins. It is a place of dread that you will probably want to avoid.

How to avoid it? Make things simple. It's that simple.

Even when you have complex code, often the right solution is the simplest one. Embrace this paradox and also acknowledge that it's usually simple to make things simple - if you don't overcomplicate it.

# YAGNI - You Ain't Gonna Need It

Honestly, you're not.

To follow this principle, all you have to do is this: only ever write what you need right *now* (right *this* instant). Doing so, you will avoid a vast collection of traps, one less appealing than the next. Do your best to stop yourself *before* you start implementing imaginary APIs for imaginary features which may or may not exist in some (far away) point in the future.

Because the truth is, you will never guess it all right. Your future requirements will change and your APIs with them. All you're doing by implementing imaginary APIs is building up to the point where you're cursing yourself for guessing it all wrong. Because of course you got it wrong - you didn't need it.

Simply do what needs to be done now. Do a lot of small things that you need right now, in the order in which you need them, and then the things you will need down the line will become things you do right now.

---

The beauty of these principles is that they are omni-contextual. It doesn't matter if you're writing an Excel script, a Tetris clone or the latest graphics driver, they apply just the same.

Following these principles, good fortune will find you. If not, six years in refactor hell. Uh-oh.