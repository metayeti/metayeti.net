# About me

<img class="me desktop" src="/content/static/images/me.jpg" alt="me">

Ahoy there! I'm Danijel. I'm a programmer with a passion for videogames. I combine my [skills](#skills) to create games, software, websites and other kinds of interactive digital content.

<img class="me mobile" src="/content/static/images/me.jpg" alt="me">

My main interests in life are programming, mathematics, science, philosophy, music and art.

# About this website

This website is a little digital garden of my own within the cyberspace. It also serves as my personal portfolio and blog. The website is based on my own custom codebase and works on markdown-driven content.

This website uses no cookies, stores exactly 1 bit of data*, and has 0 (zero) ads.

The full source for this website is available on [GitHub](https://github.com/metayeti/metayeti.net).

While you're here, you can check out my [blog](/blog) or take a look at the [projects](/projects) page to see what I've been working on.

<p class="footnote">* Whether or not light mode is turned on.</p>

# Random factoids

<div class="factoids pl-5 border-l-2 border-flavor">
	<ul class="flex flex-col gap-3">
		<li>
			<span class="factoid">Home planet</span>
			<span class="value">Earth</span>
		</li>
		<li>
			<span class="factoid">Home country</span>
			<span class="value">Slovenia</span>
		</li>
		<li>
			<span class="factoid">Current age</span>
			<span class="value current-age"></span>
		</li>
		<li>
			<span class="factoid">Favorite videogames<img class="pixelated blooguard" src="/content/static/images/blooguard.gif" alt="Blooguard"></span>
			<span class="value"><span class="text-flavor">Commander Keen</span>, Quake, Command & Conquer, WoW Classic</span>
		</li>
		<li>
			<span class="factoid">Favorite music</span>
			<span class="value">I love all <a class="link music" href="#" target="_blank">good music</a> and I have a special place in my heart for <a class="link music" href="#" target="_blank">videogame music</a></span>
		</li>
		<li>
			<span class="factoid">Favorite colors</span>
			<span class="value"><span class="color-box bg-[#77776b]"></span>, <span class="color-box bg-[#47d6ab]"></span> and <span class="color-box bg-[#645892]"></span></span>
		</li>
		<li>
			<span class="factoid">Favorite programming languages</span>
			<span class="value">C++, JavaScript</span>
		</li>
		<li>
			<span class="factoid">Favorite editor</span>
			<span class="value"><a class="link" href="https://www.vim.org/" target="_blank">Vim</a></span>
		</li>
		<li>
			<span class="factoid">Favorite operating systems</span>
			<span class="value"><a class="link" href="https://winworldpc.com/product/ms-dos/622" target="_blank">MS-DOS 6.22</a>, <a class="link" href="https://winworldpc.com/product/windows-98/98-second-edition" target="_blank">Windows 98</a> (with <a class="link" href="https://winworldpc.com/product/plus/1998" target="_blank">Plus!</a>), most flavors of <a class="link" href="https://www.linux.org/" target="_blank"><span>Linux</span><img class="inline-block size-8" alt="Linux" src="/content/static/images/linux.png"></a></span>
		</li>
		<li>
			<span class="factoid">Personal idols</span>
			<span class="value">John Romero, John Carmack, Chris Sawyer, that guy from Spiderweb Software</span>
		</li>
		<li>
			<span class="factoid">Favorite composers</span>
			<span class="value">Frank Klepacki, Glenn Stafford</span>
		</li>
		<li>
			<span class="factoid">Personal heroes</span>
			<span class="value">Bugs Bunny, Asterix</span>
		</li>
		<li>
			<span class="factoid">Favorite authors</span>
			<span class="value">Roald Dahl, Frank Herbert</span>
		</li>
		<li>
			<span class="factoid">Favorite scientists</span>
			<span class="value">Freeman Dyson, Albert Einstein, Richard Feynman</span>
		</li>
		<li>
			<span class="factoid">Favorite philosophers</span>
			<span class="value">Alan Watts, Bernardo Kastrup</span>
		</li>
	</ul>
</div>

# Skills

# Contact

For business inquiries, please contact me at <metayetidev@gmail.com>.

# Hello, world

Hello from markdown! This is a **sample** markdown file.

- Item 1
- Item 2
- Item 3
- Item 4

[Learn more](https://example.com)

# Main Heading (H1)
## Subheading (H2)
### Tertiary Heading (H3)
#### Quaternary Heading (H4)
##### Quinary Heading (H5)
###### Senary Heading (H6)

## Paragraphs
This is a paragraph with **bold text**, *italic text*, and ***bold italic text***. You can also have `inline code` for small snippets. Here's a [link](https://example.com) and an email link: <contact@example.com>.

Another paragraph with a line break  
using two spaces at the end of the line.

## Lists
### Unordered List
- Item 1
- Item 2
  - Nested Item 2.1
  - Nested Item 2.2
- Item 3 with *emphasis*

### Ordered List
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

## Blockquotes
> This is a blockquote.
> It can span multiple lines.
>> Nested blockquote for emphasis.

## Code Blocks
Inline code: `const example = true;`

Fenced code block with syntax highlighting:
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet('World'));
```

## Horizontal Rule
---

## Images
![some image](https://placehold.co/400x200 "some image")

## Tables
| Header 1 | Header 2 | Header 3 |
|----------|:--------:|---------:|
| Row 1    | Centered | Right   |
| Row 2    | Content  | Aligned |

## Task Lists
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

## Footnotes
This is a sentence with a footnote[^1].

[^1]: This is the footnote content.

## Definition Lists
Term 1
: Definition for Term 1.

Term 2
: Definition for Term 2, with **bold** text.

## Strikethrough
This text has ~~strikethrough~~ applied.

## Highlight
This text is ==highlighted== for emphasis.

## Emoji
Support for emoji: 😊🚀

## Code

```JavaScript
// -- rewrite some markdown renderer rules --

// override heading_open and heading_close to shift heading levels
// (h1 -> h2, h2 -> h3, etc.)
md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	const level = Math.min(parseInt(token.tag.slice(1), 10) + 1, 6);
	return `<h${level}>`;
};
md.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	const level = Math.min(parseInt(token.tag.slice(1), 10) + 1, 6);
	return `</h${level}>`;
};

// add link class to links
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	// add class="link" to the list of attributes
	token.attrPush(['class', 'link']);
	// ... and proceed with the default renderer for link_open
	return self.renderToken(tokens, idx, options);
};
```

<br>

## Inline HTML
<div style="color: orange;">This is inline HTML content.</div>