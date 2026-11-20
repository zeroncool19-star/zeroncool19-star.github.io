/* Python Path course content.
 * Lesson blocks: ['p', html] ['h', text] ['list', [html]] ['steps', [html]] ['code', python, {title, error}]
 *                ['tip', html] ['warn', html] ['key', [html]] ['analogy', html]
 * Challenge tests: [description, python] run after the learner's code, with access to their variables plus:
 *   output (everything printed), lines (printed lines, stripped), source (their code),
 *   run_with(list_of_inputs) -> output, capture(fn, *args) -> printed text, norm(text), approx(a, b)
 */
const c = String.raw;

const COURSE = [
/* =========================================================== */
{
  id: 'm1', title: 'Getting Started', icon: '🚀',
  desc: 'What programming is, your very first program, and how to read error messages without panicking.',
  lessons: [
  {
    id: 'hello', title: 'Hello, World!', minutes: 8,
    blocks: [
      ['p', `Welcome! 🎉 You're about to write your first computer program. You don't need to know anything yet. We'll go one small step at a time.`],
      ['h', 'What is programming?'],
      ['p', `A <b>program</b> is a list of instructions that a computer follows, one after another. <b>Programming</b> (or <b>coding</b>) is writing those instructions.`],
      ['analogy', `Think of a recipe. A recipe is a list of steps: "crack two eggs", "whisk them", "pour into a hot pan". The cook follows the steps in order. A program is a recipe for a computer. The computer is a very fast cook, but it does <b>exactly</b> what you write, nothing more and nothing less.`],
      ['p', `Computers don't understand English, so we write instructions in a <b>programming language</b>. We'll use <b>Python</b>. It's one of the most popular languages in the world (used at NASA, Netflix, Spotify, in science labs and to build games) and it's famous for being easy to read.`],
      ['h', 'Your first instruction: print()'],
      ['p', `The <code>print()</code> instruction tells Python to <b>show something on the screen</b>. You put what you want to show inside the round brackets. Text goes inside quotation marks.`],
      ['code', c`print("Hello, World!")`, { title: 'Your first program' }],
      ['tip', `Click the blue <b>▶ Run</b> button above. The result appears underneath the code. (The very first run can take a few seconds while Python loads.)`],
      ['p', `Now <b>change the message</b>: click inside the code box, replace <code>Hello, World!</code> with your own message, and run it again. You can edit and run <i>every</i> code box on this site, so experiment as much as you like. You can't break anything, and <b>↺ Reset</b> puts the original code back.`],
      ['h', 'More than one line'],
      ['p', `A program can have many instructions. Python runs them <b>from top to bottom</b>, one line at a time.`],
      ['code', c`print("Hi there!")
print("I am a computer program.")
print('Single quotes work too.')`],
      ['p', `Text inside quotes is called a <b>string</b>. It doesn't matter whether you use double quotes <code>"like this"</code> or single quotes <code>'like this'</code>, as long as the start and end match.`],
      ['key', [`A program is a list of instructions run from top to bottom.`, `<code>print()</code> shows things on the screen.`, `Text (a <b>string</b>) must go inside quotes.`, `Python is <b>case-sensitive</b>: <code>print</code> works but <code>Print</code> does not.`]],
    ],
    quiz: [
      { q: 'Which line correctly shows the word Hello on the screen?', options: ['<code>print(Hello)</code>', '<code>print("Hello")</code>', '<code>Print("Hello")</code>', '<code>print["Hello"]</code>'], answer: 1,
        explain: 'Text needs quotes, <code>print</code> must be lower case, and it uses round brackets <code>( )</code>.' },
      { q: 'In what order does Python run the lines in a program?', options: ['From top to bottom', 'From bottom to top', 'In a random order', 'Shortest line first'], answer: 0,
        explain: 'Python starts at the first line and works its way down, one line at a time.' },
    ],
    challenge: {
      task: `<p>Write a program that prints these <b>two lines</b>:</p><pre class="static" style="background:var(--surface-2);padding:10px 14px;border-radius:8px">Hello, World!\nI am learning Python!</pre><p>Then press <b>✓ Check my code</b> to see if you got it right.</p>`,
      starter: c`# Write your code below this line. (Lines starting with # are notes for humans. Python ignores them.)
`,
      solution: c`print("Hello, World!")
print("I am learning Python!")`,
      hints: ['You need two separate <code>print()</code> lines.', 'The first one is <code>print("Hello, World!")</code>. Now write the second one the same way.'],
      tests: [
        ['Prints "Hello, World!"', c`assert 'Hello, World!' in output, 'Check your spelling, capital letters and punctuation: Hello, World!'`],
        ['Prints "I am learning Python!"', c`assert 'I am learning Python!' in output, 'Check the second line exactly: I am learning Python!'`],
        ['Uses two lines', c`assert len([l for l in lines if l]) >= 2, 'Use two print() instructions so the messages appear on separate lines.'`],
      ],
    },
  },
  {
    id: 'print-more', title: 'Printing, Numbers & Comments', minutes: 10,
    blocks: [
      ['p', `<code>print()</code> can do more than show a single piece of text. Let's explore.`],
      ['h', 'Printing numbers'],
      ['p', `Numbers don't need quotes. Python can even do maths for you:`],
      ['code', c`print(42)
print(3 + 4)
print(10 * 5)
print("3 + 4")`],
      ['p', `See the difference? <code>print(3 + 4)</code> works out the answer, <b>7</b>. But <code>print("3 + 4")</code> is in quotes, so it's just text and Python prints it exactly as written.`],
      ['h', 'Printing several things at once'],
      ['p', `Separate items with commas and <code>print</code> puts a space between each one:`],
      ['code', c`print("I am", 14, "years old")
print("2 + 2 =", 2 + 2)`],
      ['h', 'Blank lines'],
      ['p', `An empty <code>print()</code> prints a blank line, which is handy for spacing out your output:`],
      ['code', c`print("Line one")
print()
print("Line three, after a gap")`],
      ['h', 'Comments: notes for humans'],
      ['p', `Anything after a <code>#</code> symbol is a <b>comment</b>. Python completely ignores it. Programmers use comments to explain what their code does, for other people and for their future selves!`],
      ['code', c`# This program introduces me
print("My name is Sam")   # comments can go at the end of a line too
# print("This line won't run because it starts with #")`],
      ['tip', `Comments are also a great way to switch a line off temporarily without deleting it. This is called "commenting out" code. Shortcut: <b>Ctrl + /</b>.`],
      ['key', [`Numbers don't need quotes; Python can calculate with them.`, `Commas in <code>print()</code> join items with spaces.`, `<code>print()</code> on its own prints a blank line.`, `<code>#</code> starts a comment that Python ignores.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`print("5 + 5")`, options: ['10', '5 + 5', '"5 + 5"', 'An error'], answer: 1,
        explain: 'Because it is inside quotes it is a string (text), so it is printed exactly as written.' },
      { q: 'What does this print?', code: c`print("Total:", 6 * 2)`, options: ['Total: 6 * 2', 'Total:12', 'Total: 12', 'Total: 6 2'], answer: 2,
        explain: '<code>6 * 2</code> is worked out to 12, and the comma adds a space between the items.' },
      { q: 'What does Python do with a line that starts with <code>#</code>?', options: ['Prints it', 'Ignores it', 'Crashes', 'Runs it twice'], answer: 1,
        explain: 'It is a comment, a note for humans, and Python skips it completely.' },
    ],
    challenge: {
      task: `<p>Make a little <b>ID card</b> program. It must:</p><ol><li>Start with a <b>comment</b> explaining what the program does.</li><li>Print at least <b>3 lines</b>: for example your name, your favourite hobby, and a line that uses Python to calculate something (like <code>print("Days in 3 weeks:", 3 * 7)</code>).</li></ol>`,
      starter: c`
`,
      solution: c`# This program prints my ID card
print("Name: Sam")
print("Hobby: Football")
print("Days in 3 weeks:", 3 * 7)`,
      hints: ['A comment starts with <code>#</code>, e.g. <code># My ID card</code>.', 'Write three <code>print()</code> lines. In the last one, put a calculation like <code>3 * 7</code> outside the quotes.'],
      tests: [
        ['Has a comment', c`assert any(l.strip().startswith('#') for l in source.splitlines()), 'Add a line that starts with # to explain the program.'`],
        ['Prints at least 3 lines', c`assert len([l for l in lines if l]) >= 3, 'You printed %d line(s). You need at least 3.' % len([l for l in lines if l])`],
        ['Uses Python to calculate something', c`
import re
assert re.search(r'print\(.*\d\s*[\+\-\*/]\s*\d', source), 'Include a calculation (like 3 * 7) inside a print(), outside the quotes.'`],
      ],
    },
  },
  {
    id: 'errors', title: "Bugs & Errors Aren't Scary", minutes: 10,
    blocks: [
      ['p', `Here's a secret: <b>every programmer makes mistakes all the time</b>, even experts with 20 years of experience. Mistakes in code are called <b>bugs</b>, and fixing them is called <b>debugging</b>. It's a normal, everyday part of coding.`],
      ['p', `When Python finds a problem it stops and shows an <b>error message</b>. The error message is not telling you off. It's a clue that helps you find the problem. On this site we also add a 💡 plain-English explanation.`],
      ['h', 'Meet some common errors'],
      ['p', `Run each of these to see what an error looks like. Each one has a bug on purpose:`],
      ['code', c`print("Hello)`, { title: 'Missing quote', error: true }],
      ['code', c`prnt("Hello")`, { title: 'Typo', error: true }],
      ['code', c`print("Hello"`, { title: 'Missing bracket', error: true }],
      ['h', 'How to read an error'],
      ['steps', [`Look at the <b>line number</b>. That's where Python noticed the problem. (Sometimes the real mistake is on the line just above.)`, `Read the <b>type</b> of error, e.g. <code>SyntaxError</code> means "this isn't written correctly" and <code>NameError</code> means "I don't know that word".`, `Read the explanation, fix one thing, then run again.`]],
      ['tip', `Now fix each of the three examples above and run them until they work. That's debugging, and you just did it! 🐞➡️🦋`],
      ['key', [`Bugs are normal. Every programmer gets errors.`, `Error messages tell you the line and the type of problem.`, `<code>SyntaxError</code>: something is written wrongly (missing quote, bracket, colon...).`, `<code>NameError</code>: Python doesn't recognise a name. Often a typo.`]],
    ],
    quiz: [
      { q: 'What does <code>NameError: name \'prnt\' is not defined</code> most likely mean?', options: ['Your computer is broken', 'You misspelled a word', 'You need more brackets', 'Python is not installed'], answer: 1,
        explain: 'Python doesn\'t know a word called <code>prnt</code>. It\'s a typo for <code>print</code>.' },
      { q: 'You get an error. What\'s the best first thing to do?', options: ['Delete everything and start again', 'Read the error message and look at the line number', 'Give up', 'Add more print statements everywhere at random'], answer: 1,
        explain: 'The error message tells you where and what kind of problem it is. It\'s your best clue.' },
    ],
    challenge: {
      task: `<p>This program has <b>three bugs</b>. Fix them all so it prints three lines without any errors.</p><p>Use <b>▶ Run</b> to see each error, fix it, and run again. Then press <b>✓ Check my code</b>.</p>`,
      starter: c`print("Fix me!)
prnt("I love Python")
print("Almost there"`,
      solution: c`print("Fix me!")
print("I love Python")
print("Almost there")`,
      hints: ['Line 1 is missing a closing quote mark before the bracket.', 'Line 2: <code>prnt</code> should be <code>print</code>. Line 3 is missing a closing bracket <code>)</code>.'],
      tests: [
        ['Prints "Fix me!"', c`assert 'Fix me!' in output`],
        ['Prints "I love Python"', c`assert 'I love Python' in output`],
        ['Prints "Almost there"', c`assert 'Almost there' in output`],
      ],
    },
  },
  ],
},
/* =========================================================== */
{
  id: 'm2', title: 'Variables & Data', icon: '📦',
  desc: 'Store information in variables, work with numbers and text, and convert between types.',
  lessons: [
  {
    id: 'variables', title: 'Variables: Storing Information', minutes: 10,
    blocks: [
      ['p', `Programs need to remember things: a player's score, a username, the price of something. We store information in <b>variables</b>.`],
      ['analogy', `Imagine a box with a label on it. You put something inside the box, and later you can find it again using the label. A variable is a labelled box in the computer's memory.`],
      ['p', `You create a variable with a <b>name</b>, an equals sign <code>=</code>, and a <b>value</b>:`],
      ['code', c`name = "Alex"
age = 15
print(name)
print(age)
print(name, "is", age)`],
      ['p', `Notice that <code>print(name)</code> has <b>no quotes</b>. That tells Python "show what's in the box called name". With quotes, <code>print("name")</code> would just print the word <i>name</i>.`],
      ['warn', `In Python, <code>=</code> doesn't mean "equals" like in maths. It means <b>"store this value in this variable"</b>. Read <code>age = 15</code> as "age becomes 15".`],
      ['h', 'Variables can change'],
      ['p', `That's why they're called <i>vari</i>ables! A new value replaces the old one:`],
      ['code', c`score = 0
print("Score:", score)
score = 10
print("Score:", score)
score = score + 5     # take the current score, add 5, store it back
print("Score:", score)`],
      ['p', `That last line is very common. Python works out the right side first (<code>10 + 5</code>), then stores the result in <code>score</code>.`],
      ['h', 'Naming rules'],
      ['list', [`Use letters, numbers and underscores <code>_</code>, but <b>no spaces</b>, and don't start with a number.`, `Names are case-sensitive: <code>Score</code> and <code>score</code> are different boxes.`, `Pick descriptive names: <code>player_score</code> is much clearer than <code>ps</code> or <code>x</code>.`, `Python style is lowercase with underscores: <code>high_score</code>, <code>first_name</code>.`]],
      ['key', [`A variable is a named box that stores a value.`, `<code>=</code> means "store", not "is equal to".`, `Use the name without quotes to get the value out.`, `Variables can be updated, e.g. <code>score = score + 1</code>.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`x = 5
x = 8
print(x)`, options: ['5', '8', '13', '5 8'], answer: 1, explain: 'The second line replaces the 5 with 8. A variable holds one value at a time.' },
      { q: 'What does this print?', code: c`colour = "blue"
print("colour")`, options: ['blue', 'colour', '"colour"', 'An error'], answer: 1, explain: 'Because <code>"colour"</code> is in quotes, it\'s text, not the variable. To print the value use <code>print(colour)</code>.' },
      { q: 'Which is a valid variable name?', options: ['<code>my score</code>', '<code>2nd_place</code>', '<code>high_score</code>', '<code>high-score</code>'], answer: 2, explain: 'No spaces, can\'t start with a number, and <code>-</code> means minus. Use underscores.' },
    ],
    challenge: {
      task: `<p>Create three variables:</p><ul><li><code>name</code>, holding your name (text)</li><li><code>age</code>, holding an age (a whole number, <b>no quotes</b>)</li><li><code>city</code>, holding a town or city (text)</li></ul><p>Then <b>print all three</b> using the variables (not by typing the values again).</p>`,
      starter: c`# Create your variables here


# Print them here
`,
      solution: c`name = "Sam"
age = 15
city = "Cardiff"
print(name)
print(age)
print(city)`,
      hints: ['Text needs quotes: <code>name = "Sam"</code>. Numbers don\'t: <code>age = 15</code>.', 'Print a variable by writing its name with no quotes: <code>print(name)</code>.'],
      tests: [
        ['name is text', c`assert isinstance(name, str) and name.strip(), 'name should hold some text in quotes.'`],
        ['age is a whole number', c`assert isinstance(age, int) and not isinstance(age, bool), 'age should be a number without quotes, like 15.'`],
        ['city is text', c`assert isinstance(city, str) and city.strip(), 'city should hold some text in quotes.'`],
        ['All three are printed', c`assert name in output and str(age) in output and city in output, 'Print each variable, e.g. print(name).'`],
        ['Uses the variables in print', c`
import re
assert all(re.search(r'print\(.*\b%s\b' % v, source) for v in ['name', 'age', 'city']), 'Print each variable by name, e.g. print(name), instead of typing the value again.'`],
      ],
    },
  },
  {
    id: 'numbers', title: 'Numbers & Maths', minutes: 12,
    blocks: [
      ['p', `Computers are amazing calculators. Python has two main kinds of number:`],
      ['list', [`<b>int</b> (integer): whole numbers like <code>7</code>, <code>-3</code>, <code>1000</code>`, `<b>float</b>: numbers with a decimal point like <code>3.14</code>, <code>-0.5</code>, <code>2.0</code>`]],
      ['h', 'Maths operators'],
      ['code', c`print(7 + 3)    # add       -> 10
print(7 - 3)    # subtract  -> 4
print(7 * 3)    # multiply  -> 21
print(7 / 2)    # divide    -> 3.5
print(7 // 2)   # floor division: divide, then round DOWN -> 3
print(7 % 2)    # remainder (modulo)  -> 1
print(2 ** 3)   # power: 2 x 2 x 2   -> 8`],
      ['p', `<code>//</code> and <code>%</code> look strange but they're really useful. (<code>//</code> always rounds <i>down</i>, which matters for negative numbers: <code>-7 // 2</code> is <code>-4</code>.) <code>17 // 5</code> asks "how many whole 5s fit in 17?" (3), and <code>17 % 5</code> asks "what's left over?" (2).`],
      ['tip', `<code>%</code> is great for checking if a number is even: if <code>number % 2</code> is <code>0</code>, there's no remainder when you divide by 2, so it's even.`],
      ['h', 'Order of operations'],
      ['p', `Python follows the same rules as maths class (BIDMAS/BODMAS): brackets first, then powers, then <code>* /</code>, then <code>+ -</code>.`],
      ['code', c`print(2 + 3 * 4)     # 14, because * happens first
print((2 + 3) * 4)   # 20, because brackets go first`],
      ['h', 'Maths with variables'],
      ['code', c`price = 4.50
quantity = 3
total = price * quantity
print("Total cost:", total)

seconds = 200
minutes = seconds // 60
leftover = seconds % 60
print(seconds, "seconds is", minutes, "minutes and", leftover, "seconds")`],
      ['h', 'Decimals are approximate'],
      ['p', `Computers store decimals in binary, so some of them can't be stored exactly. This surprises everyone the first time:`],
      ['code', c`print(0.1 + 0.2)
print(round(0.1 + 0.2, 2))`],
      ['p', `The tiny error isn't a bug in your code. It happens in almost every programming language. Use <code>round(number, places)</code> or f-string formatting (coming soon) when you display decimals.`],
      ['p', `There's also a handy shortcut for updating a variable: <code>score += 5</code> means the same as <code>score = score + 5</code>. You can use <code>-=</code>, <code>*=</code> and <code>/=</code> too.`],
      ['key', [`<code>+ - * /</code> work like normal maths. <code>/</code> always gives a float.`, `<code>//</code> = division rounded down, <code>%</code> = remainder, <code>**</code> = power.`, `Decimals (floats) can be very slightly inaccurate, so round them for display.`, `Brackets control the order of operations.`, `<code>x += 1</code> is short for <code>x = x + 1</code>.`]],
    ],
    quiz: [
      { q: 'What is <code>10 % 3</code>?', options: ['3', '1', '3.33', '0'], answer: 1, explain: '3 goes into 10 three times (9), with <b>1</b> left over.' },
      { q: 'What is <code>2 + 3 * 2</code>?', options: ['10', '8', '12', '7'], answer: 1, explain: 'Multiplication first: 3 * 2 = 6, then 2 + 6 = 8.' },
      { q: 'After this code, what is <code>lives</code>?', code: c`lives = 3
lives -= 1
lives += 5`, options: ['3', '7', '8', '9'], answer: 1, explain: '3 - 1 = 2, then 2 + 5 = 7.' },
    ],
    challenge: {
      task: `<p>Use Python as your calculator:</p><ol><li>Create <code>width = 7</code> and <code>height = 3</code>. Calculate the area of the rectangle into a variable called <code>area</code> (use the variables, not the number 21!) and print it.</li><li>Create a variable <code>minutes_in_week</code> that calculates how many minutes there are in a week (<i>minutes in an hour × hours in a day × days in a week</i>) and print it.</li></ol>`,
      starter: c`width = 7
height = 3
`,
      solution: c`width = 7
height = 3
area = width * height
print(area)

minutes_in_week = 60 * 24 * 7
print(minutes_in_week)`,
      hints: ['Area of a rectangle is width × height. In Python: <code>area = width * height</code>', 'There are 60 minutes in an hour, 24 hours in a day and 7 days in a week.'],
      tests: [
        ['area is 21', c`assert area == 21, 'area should be width * height.'`],
        ['area is calculated from the variables', c`assert 'width*height' in source.replace(' ', '') or 'height*width' in source.replace(' ', ''), 'Calculate area using width * height.'`],
        ['minutes_in_week is correct', c`assert minutes_in_week == 10080, 'Expected 10080. You have %s' % minutes_in_week`],
        ['Both answers are printed', c`assert '21' in output and '10080' in output, 'Print both area and minutes_in_week.'`],
      ],
    },
  },
  {
    id: 'strings', title: 'Strings: Working with Text', minutes: 12,
    blocks: [
      ['p', `A <b>string</b> is a piece of text, a "string" of characters (letters, digits, spaces, symbols) in a row.`],
      ['h', 'Joining strings'],
      ['p', `You can glue strings together with <code>+</code> (this is called <b>concatenation</b>) and repeat them with <code>*</code>:`],
      ['code', c`first = "Ada"
last = "Lovelace"
full = first + " " + last
print(full)
print("Ha" * 3)
print("-" * 20)`],
      ['tip', `<code>+</code> doesn't add spaces for you, which is why we put <code>" "</code> in the middle.`],
      ['h', 'How long is it?'],
      ['p', `<code>len()</code> tells you how many characters are in a string (spaces count too!):`],
      ['code', c`word = "Python"
print(len(word))
print(len("Hello there"))`],
      ['h', 'Picking out characters (indexing)'],
      ['p', `Every character in a string has a position number, called its <b>index</b>. Python starts counting from <b>0</b>, not 1!`],
      ['p', `<pre class="static" style="background:var(--surface-2);padding:10px 14px;border-radius:8px;font-size:15px"> P   y   t   h   o   n\n 0   1   2   3   4   5\n-6  -5  -4  -3  -2  -1</pre>`],
      ['code', c`word = "Python"
print(word[0])    # first character
print(word[1])    # second character
print(word[-1])   # last character (negative counts from the end)`],
      ['h', 'Slicing: taking a chunk'],
      ['p', `<code>word[start:end]</code> gives you the characters from <code>start</code> up to, <b>but not including</b>, <code>end</code>:`],
      ['code', c`word = "Python"
print(word[0:3])   # Pyt
print(word[2:])    # thon (from 2 to the end)
print(word[:2])    # Py   (from the start up to 2)`],
      ['key', [`Strings are text in quotes. <code>+</code> joins, <code>*</code> repeats.`, `<code>len(text)</code> gives the number of characters.`, `Indexes start at <b>0</b>. <code>text[-1]</code> is the last character.`, `<code>text[a:b]</code> slices from a up to (not including) b.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`animal = "zebra"
print(animal[1])`, options: ['z', 'e', 'b', 'a'], answer: 1, explain: 'Counting starts at 0: z is 0, <b>e</b> is 1.' },
      { q: 'What is <code>len("hi there")</code>?', options: ['7', '8', '2', '6'], answer: 1, explain: 'h-i-space-t-h-e-r-e = 8 characters. The space counts!' },
      { q: 'What does <code>"cat" + "dog"</code> give?', options: ['cat dog', 'catdog', 'cat+dog', 'An error'], answer: 1, explain: '<code>+</code> glues strings together exactly, with no space added.' },
    ],
    challenge: {
      task: `<p>The variable <code>word</code> holds <code>"Python"</code>. Using indexing, slicing and <code>len()</code>, print these four things, <b>each on its own line</b>:</p><ol><li>The first letter</li><li>The last letter</li><li>The length of the word</li><li>The first three letters</li></ol><p>Don't type the letters yourself; get them from <code>word</code>!</p>`,
      starter: c`word = "Python"
`,
      solution: c`word = "Python"
print(word[0])
print(word[-1])
print(len(word))
print(word[0:3])`,
      hints: ['First letter: <code>word[0]</code>. Last letter: <code>word[-1]</code>.', 'Length: <code>len(word)</code>. First three: <code>word[0:3]</code> or <code>word[:3]</code>.'],
      tests: [
        ['Prints the first letter', c`assert 'P' in lines, 'Print word[0].'`],
        ['Prints the last letter', c`assert 'n' in lines, 'Print word[-1].'`],
        ['Prints the length', c`assert '6' in lines, 'Print len(word).'`],
        ['Prints the first three letters', c`assert 'Pyt' in lines, 'Print word[0:3].'`],
        ['Uses len() and indexing', c`assert 'len(' in source and 'word[' in source, 'Get the answers from word using len() and [ ].'`],
      ],
    },
  },
  {
    id: 'types', title: 'Data Types & Converting', minutes: 10,
    blocks: [
      ['p', `Every value in Python has a <b>type</b>, which tells Python what kind of thing it is and what you can do with it. You've met three already:`],
      ['list', [`<code>str</code>: text, like <code>"hello"</code>`, `<code>int</code>: whole numbers, like <code>42</code>`, `<code>float</code>: decimals, like <code>3.5</code>`]],
      ['p', `You can ask Python for the type of anything with <code>type()</code>:`],
      ['code', c`print(type("hello"))
print(type(42))
print(type(3.5))
print(type("42"))   # in quotes, so it's a string!`],
      ['h', 'Why types matter'],
      ['p', `Look at what happens here:`],
      ['code', c`print(5 + 5)
print("5" + "5")`],
      ['p', `<code>5 + 5</code> is maths (10), but <code>"5" + "5"</code> is joining text ("55"). And mixing them causes an error:`],
      ['code', c`age = 15
print("I am " + age + " years old")`, { title: 'This one has a bug', error: true }],
      ['h', 'Converting between types'],
      ['p', `You can convert values with <code>int()</code>, <code>float()</code> and <code>str()</code>:`],
      ['code', c`age = 15
print("I am " + str(age) + " years old")   # number -> text

text = "20"
number = int(text)        # text -> whole number
print(number + 5)

print(float("2.5") * 2)   # text -> decimal
print(int(7.9))           # float -> int chops off the decimal`],
      ['warn', `<code>int("hello")</code> causes an error, because Python can only convert text that actually looks like a number.`],
      ['key', [`<code>type(x)</code> tells you what kind of value <code>x</code> is.`, `<code>"5"</code> (text) and <code>5</code> (number) are different!`, `Convert with <code>int()</code>, <code>float()</code> and <code>str()</code>.`, `You can't <code>+</code> a string and a number without converting first.`]],
    ],
    quiz: [
      { q: 'What does <code>print("3" + "4")</code> show?', options: ['7', '34', '3 4', 'An error'], answer: 1, explain: 'They\'re strings, so <code>+</code> joins them into "34".' },
      { q: 'What type is <code>"12.5"</code>?', options: ['int', 'float', 'str', 'number'], answer: 2, explain: 'It\'s in quotes, so it\'s a string, even though it looks like a number.' },
      { q: 'What does <code>int("8") * 2</code> give?', options: ['88', '16', '"16"', 'An error'], answer: 1, explain: '<code>int("8")</code> converts the text to the number 8, and 8 × 2 = 16.' },
    ],
    challenge: {
      task: `<p>The variable <code>age_text</code> holds the age <code>"15"</code> as text.</p><ol><li>Convert it to a number and add 10, storing the answer in a variable called <code>future_age</code>.</li><li>Print the message: <code>In 10 years you will be 25</code>, using the <code>future_age</code> variable (not typing 25 yourself).</li></ol>`,
      starter: c`age_text = "15"
`,
      solution: c`age_text = "15"
future_age = int(age_text) + 10
print("In 10 years you will be " + str(future_age))`,
      hints: ['<code>int(age_text)</code> turns "15" into the number 15.', 'To join it into a sentence, either use commas in print, or convert back with <code>str(future_age)</code>.'],
      tests: [
        ['future_age is the number 25', c`assert future_age == 25 and isinstance(future_age, int), 'future_age should be the number 25 (not the text "25"). Did you use int()?'`],
        ['Prints the sentence', c`assert 'In 10 years you will be 25' in output, 'Print exactly: In 10 years you will be 25'`],
        ['Calculates from age_text', c`assert 'int(age_text)' in source.replace(' ', ''), 'Convert age_text with int(age_text).'`],
      ],
    },
  },
  ],
},
/* =========================================================== */
{
  id: 'm3', title: 'Talking to the User', icon: '💬',
  desc: 'Ask questions with input(), build sentences with f-strings and clean up text with string methods.',
  lessons: [
  {
    id: 'input', title: 'Asking Questions with input()', minutes: 10,
    blocks: [
      ['p', `So far our programs always do the same thing. Let's make them <b>interactive</b>! <code>input()</code> asks the user to type something, waits for them to press Enter, and gives back what they typed.`],
      ['code', c`name = input("What is your name? ")
print("Hello,", name)
print("Nice to meet you!")`],
      ['tip', `When you run this, a box pops up asking for your answer. Type something and press OK. In a normal Python program (not in a web browser) there's no pop-up: the user types their answer straight after the question, on the same line.`],
      ['p', `The text inside the brackets is the <b>prompt</b>, the question shown to the user. Leave a space at the end of the prompt so their answer doesn't get squashed against the question.`],
      ['h', 'Storing several answers'],
      ['code', c`animal = input("Favourite animal? ")
colour = input("Favourite colour? ")
print("Imagine a", colour, animal + "!")`],
      ['warn', `<code>input()</code> <b>always</b> gives you back a <b>string</b>, even if the user types a number. We'll deal with that in a later lesson.`],
      ['key', [`<code>input("question ")</code> shows a question and waits for the user to type.`, `Store the answer in a variable to use it later.`, `The answer is always a string.`]],
    ],
    quiz: [
      { q: 'What type of value does <code>input()</code> give back?', options: ['Always an int', 'Always a string', 'Whatever the user types', 'A float'], answer: 1, explain: 'Even if the user types 42, you get the string "42".' },
      { q: 'In <code>food = input("Snack? ")</code>, what is <code>"Snack? "</code>?', options: ['The answer', 'The prompt shown to the user', 'A comment', 'The variable name'], answer: 1, explain: 'It\'s the prompt, the question displayed before the user types.' },
    ],
    challenge: {
      task: `<p>Write a program that:</p><ol><li>Asks the user for their <b>name</b>.</li><li>Asks for their <b>favourite food</b>.</li><li>Prints a message that includes both, like <code>Hi Sam! I like pizza too.</code></li></ol><p>When you press Check, we'll test your program by typing different names and foods automatically.</p>`,
      starter: c`
`,
      solution: c`name = input("What is your name? ")
food = input("What is your favourite food? ")
print("Hi " + name + "! I like " + food + " too.")`,
      inputs: ['Sam', 'pizza'],
      hints: ['You need two <code>input()</code> lines, each stored in its own variable.', 'Then print a message using both variables, e.g. <code>print("Hi", name, "I like", food)</code>.'],
      tests: [
        ['Asks two questions', c`assert source.count('input(') >= 2, 'Use input() twice.'`],
        ['Uses the name and food (test: Sam, pizza)', c`assert 'Sam' in output and 'pizza' in output, 'Your message should include what the user typed.'`],
        ['Works with other answers (test: Priya, sushi)', c`o = run_with(['Priya', 'sushi'])
assert 'Priya' in o and 'sushi' in o, 'Make sure you print the variables, not fixed text.'`],
      ],
    },
  },
  {
    id: 'fstrings', title: 'f-strings: Easy Sentences', minutes: 10,
    blocks: [
      ['p', `Building sentences with <code>+</code> and <code>str()</code> gets messy fast. Python has a much nicer way: <b>f-strings</b>.`],
      ['p', `Put the letter <code>f</code> just before the opening quote, then put any variable inside <b>curly brackets</b> <code>{ }</code>:`],
      ['code', c`name = "Mia"
age = 14
print(f"My name is {name} and I am {age} years old.")`],
      ['p', `No need for <code>str()</code> and no fiddling with spaces. Python drops the values straight in.`],
      ['h', 'You can calculate inside the brackets'],
      ['code', c`apples = 5
price = 0.4
print(f"{apples} apples cost £{apples * price}")
print(f"Half of 9 is {9 / 2}")`],
      ['h', 'Formatting numbers'],
      ['p', `Money usually needs exactly 2 decimal places. Add <code>:.2f</code> after the value inside the brackets:`],
      ['code', c`total = 7.5
print(f"Total: £{total}")
print(f"Total: £{total:.2f}")

pi = 3.14159265
print(f"Pi is roughly {pi:.2f}")`],
      ['tip', `<code>:.2f</code> means "show as a decimal (<b>f</b>loat) with <b>2</b> places". Try changing it to <code>:.0f</code> or <code>:.4f</code>.`],
      ['key', [`Put <code>f</code> before the quotes: <code>f"..."</code>`, `Put variables or calculations inside <code>{ }</code>.`, `<code>{value:.2f}</code> shows 2 decimal places, perfect for money.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`x = 3
print(f"x times 2 is {x * 2}")`, options: ['x times 2 is {x * 2}', 'x times 2 is 6', 'x times 2 is x * 2', '3 times 2 is 6'], answer: 1, explain: 'The calculation inside the curly brackets is worked out and dropped in.' },
      { q: 'What does <code>print(f"{5:.2f}")</code> show?', options: ['5', '5.2', '5.00', '05'], answer: 2, explain: '<code>:.2f</code> always shows two decimal places.' },
      { q: 'What happens if you forget the <code>f</code>?', code: c`name = "Leo"
print("Hi {name}")`, options: ['Hi Leo', 'Hi {name}', 'An error', 'Hi'], answer: 1, explain: 'Without the f, the curly brackets are just ordinary characters.' },
    ],
    challenge: {
      task: `<p>A shop sells cakes. Using the variables provided, calculate the cost and print exactly:</p><pre class="static" style="background:var(--surface-2);padding:10px 14px;border-radius:8px">3 x cake costs £7.50</pre><p>Use an <b>f-string</b>, and make the price show <b>2 decimal places</b>.</p>`,
      starter: c`item = "cake"
price = 2.5
quantity = 3
`,
      solution: c`item = "cake"
price = 2.5
quantity = 3
total = price * quantity
print(f"{quantity} x {item} costs £{total:.2f}")`,
      hints: ['Calculate the total first: <code>total = price * quantity</code>.', 'Then: <code>print(f"{quantity} x {item} costs £{total:.2f}")</code>'],
      tests: [
        ['Prints the right message', c`assert '3 x cake costs £7.50' in output, 'Expected: 3 x cake costs £7.50'`],
        ['Uses an f-string', c`assert 'f"' in source or "f'" in source, 'Put f before the opening quote.'`],
        ['Uses 2 decimal places formatting', c`assert ':.2f' in source, 'Use :.2f inside the curly brackets.'`],
      ],
    },
  },
  {
    id: 'string-methods', title: 'String Methods', minutes: 12,
    blocks: [
      ['p', `Strings come with built-in tools called <b>methods</b>. You use a method by putting a dot after the string, then the method name and brackets:`],
      ['code', c`text = "Hello World"
print(text.upper())     # HELLO WORLD
print(text.lower())     # hello world
print("ada lovelace".title())   # Ada Lovelace`],
      ['h', 'Cleaning up text'],
      ['p', `Users often type extra spaces by accident. <code>.strip()</code> removes spaces from the start and end:`],
      ['code', c`messy = "    pizza   "
print("[" + messy + "]")
print("[" + messy.strip() + "]")`],
      ['h', 'Finding and replacing'],
      ['code', c`sentence = "I like cats. Cats are great."
print(sentence.replace("cats", "dogs"))
print(sentence.count("a"))          # how many times "a" appears
print(sentence.lower().count("cats"))
print("like" in sentence)           # True or False: is it inside?
print(sentence.startswith("I"))`],
      ['warn', `Methods don't change the original string. They give back a <b>new</b> string. To keep the result, store it: <code>name = name.strip()</code>.`],
      ['code', c`answer = "  YES  "
answer.strip().lower()
print(answer)             # unchanged!
answer = answer.strip().lower()
print(answer)             # now it's "yes"`],
      ['tip', `You can chain methods one after another: <code>text.strip().lower()</code> first strips, then lowercases. This is perfect for checking user answers whatever capitals they used.`],
      ['key', [`<code>.upper()</code>, <code>.lower()</code>, <code>.title()</code> change capitals.`, `<code>.strip()</code> removes surrounding spaces.`, `<code>.replace(old, new)</code>, <code>.count(x)</code>, <code>x in text</code>.`, `Methods return a new string; store it to keep it.`]],
    ],
    quiz: [
      { q: 'What does <code>"Hello".upper()</code> give?', options: ['hello', 'HELLO', 'Hello', 'H'], answer: 1, explain: '<code>.upper()</code> makes every letter a capital.' },
      { q: 'What does this print?', code: c`word = "banana"
print(word.count("a"))`, options: ['1', '2', '3', '6'], answer: 2, explain: 'b-<b>a</b>-n-<b>a</b>-n-<b>a</b>: three a\'s.' },
      { q: 'What is <code>"  hi  ".strip()</code>?', options: ['"  hi  "', '"hi"', '"hi  "', '"  hi"'], answer: 1, explain: 'strip removes spaces from both ends.' },
    ],
    challenge: {
      task: `<p>The variable <code>messy</code> holds badly typed text. Create a variable <code>clean</code> that holds exactly <code>"Hello World"</code> by using string methods on <code>messy</code>, then print it.</p><p>Then create a variable <code>l_count</code> that holds how many times the letter <code>"l"</code> appears in <code>clean</code>, and print that too.</p>`,
      starter: c`messy = "   hELLo wORLD   "
`,
      solution: c`messy = "   hELLo wORLD   "
clean = messy.strip().title()
print(clean)
l_count = clean.count("l")
print(l_count)`,
      hints: ['First remove the spaces with <code>.strip()</code>, then fix the capitals. Which method makes the first letter of each word a capital?', '<code>clean = messy.strip().title()</code>. Then use <code>clean.count("l")</code>.'],
      tests: [
        ['clean is "Hello World"', c`assert clean == "Hello World", 'clean is %r, expected "Hello World"' % clean`],
        ['Uses methods (not typed by hand)', c`assert 'messy.' in source, 'Create clean from messy using methods like .strip() and .title().'`],
        ['l_count is 3', c`assert l_count == 3, 'Count the "l" letters in clean with clean.count("l").'`],
        ['Prints both', c`assert 'Hello World' in output and '3' in lines, 'Print clean and l_count.'`],
      ],
    },
  },
  {
    id: 'input-numbers', title: 'Numbers from the User', minutes: 8,
    blocks: [
      ['p', `Remember, <code>input()</code> always gives back <b>text</b>. Watch what happens when we try to do maths with it:`],
      ['code', c`a = input("First number: ")
b = input("Second number: ")
print("Total:", a + b)`, { title: 'Spot the problem' }],
      ['p', `If you type 5 and 3, you get <b>53</b>, not 8! The two pieces of text were glued together. We need to convert the input into a number first, using <code>int()</code> or <code>float()</code>:`],
      ['code', c`a = int(input("First number: "))
b = int(input("Second number: "))
print("Total:", a + b)`],
      ['p', `<code>int(input("..."))</code> is a very common pattern. Python runs the inside first (asks the question), then converts the answer to an int.`],
      ['tip', `Use <code>int()</code> for whole numbers (ages, quantities) and <code>float()</code> when there could be decimals (prices, heights, temperatures).`],
      ['code', c`height = float(input("Height in metres: "))
weight = float(input("Weight in kg: "))
bmi = weight / height ** 2
print(f"Your BMI is {bmi:.1f}")`],
      ['key', [`Convert typed numbers: <code>int(input(...))</code> or <code>float(input(...))</code>.`, `Without converting, <code>+</code> joins text instead of adding.`]],
    ],
    quiz: [
      { q: 'The user types 4 and 4. What does this print?', code: c`x = input()
y = input()
print(x + y)`, options: ['8', '44', 'x + y', 'An error'], answer: 1, explain: 'Without int(), both answers are strings, so + joins them: "44".' },
      { q: 'Best way to ask for a price like 2.99?', options: ['<code>int(input("Price: "))</code>', '<code>float(input("Price: "))</code>', '<code>input(float("Price: "))</code>', '<code>str(input("Price: "))</code>'], answer: 1, explain: 'Prices have decimals, so use float(). The conversion goes around input().' },
    ],
    challenge: {
      task: `<p>Write a program that asks the user for <b>two whole numbers</b> and prints their total in the form:</p><pre class="static" style="background:var(--surface-2);padding:10px 14px;border-radius:8px">The total is 12</pre><p>(We'll test it by typing <code>5</code> and <code>7</code>, and some other numbers.)</p>`,
      starter: c`
`,
      solution: c`first = int(input("First number: "))
second = int(input("Second number: "))
print(f"The total is {first + second}")`,
      inputs: ['5', '7'],
      hints: ['Wrap each input in <code>int()</code>: <code>first = int(input("First number: "))</code>', 'Then <code>print(f"The total is {first + second}")</code>'],
      tests: [
        ['5 + 7 gives 12', c`assert 'The total is 12' in output, 'With 5 and 7 we expected "The total is 12".'`],
        ['10 + -3 gives 7', c`assert 'The total is 7' in run_with(['10', '-3']), 'Check your program adds numbers (did you convert with int()?).'`],
        ['100 + 250 gives 350', c`assert 'The total is 350' in run_with(['100', '250'])`],
      ],
    },
  },
  ],
},
/* =========================================================== */
{
  id: 'm4', title: 'Making Decisions', icon: '🔀',
  desc: 'True and False, comparisons, and if / elif / else so your programs can choose what to do.',
  lessons: [
  {
    id: 'booleans', title: 'True, False & Comparisons', minutes: 10,
    blocks: [
      ['p', `Programs constantly ask yes/no questions: <i>Is the password correct? Has the player run out of lives? Is the user old enough?</i> In Python the answer to a yes/no question is a <b>boolean</b>: either <code>True</code> or <code>False</code>.`],
      ['h', 'Comparison operators'],
      ['code', c`print(5 > 3)     # greater than
print(5 < 3)     # less than
print(5 >= 5)    # greater than or equal to
print(4 <= 3)    # less than or equal to
print(5 == 5)    # equal to
print(5 != 3)    # NOT equal to`],
      ['warn', `<code>=</code> and <code>==</code> are different! One equals sign <b>stores</b> a value (<code>x = 5</code>). Two equals signs <b>compares</b> values (<code>x == 5</code> asks "is x equal to 5?").`],
      ['h', 'Comparing strings'],
      ['code', c`password = "dragon"
print(password == "dragon")
print(password == "Dragon")   # capitals matter!
print("apple" < "banana")    # compares in alphabetical order`],
      ['p', `Watch out: Python compares letters by their character code, and <b>all capital letters come before all lowercase letters</b>. So <code>"Zebra" &lt; "apple"</code> is <code>True</code>! Use <code>.lower()</code> on both sides if you want a fair alphabetical comparison.`],
      ['h', 'Storing the result'],
      ['p', `Because <code>True</code> and <code>False</code> are values, you can store them in variables:`],
      ['code', c`age = 16
can_drive = age >= 17
is_adult = age >= 18
print("Can drive?", can_drive)
print("Adult?", is_adult)`],
      ['key', [`A boolean is <code>True</code> or <code>False</code> (capital first letter, no quotes).`, `Compare with <code>== != &lt; &gt; &lt;= &gt;=</code>.`, `<code>=</code> stores, <code>==</code> compares.`]],
    ],
    quiz: [
      { q: 'What does <code>print(10 != 10)</code> show?', options: ['True', 'False', '10', 'An error'], answer: 1, explain: '<code>!=</code> means "not equal". 10 IS equal to 10, so it\'s False.' },
      { q: 'Which line checks whether <code>score</code> equals 100?', options: ['<code>score = 100</code>', '<code>score == 100</code>', '<code>score := 100</code>', '<code>score === 100</code>'], answer: 1, explain: 'Two equals signs compare. One equals sign would change score to 100!' },
      { q: 'What is <code>"cat" == "Cat"</code>?', options: ['True', 'False'], answer: 1, explain: 'Capital letters matter in Python, so they\'re different strings.' },
    ],
    challenge: {
      task: `<p>A student scored <code>72</code> in a test.</p><ol><li>Create a variable <code>passed</code> that is <code>True</code> if <code>score</code> is <b>50 or more</b>, using a comparison (don't just type True!).</li><li>Create a variable <code>full_marks</code> that is <code>True</code> only if <code>score</code> equals <code>100</code>.</li><li>Print both.</li></ol>`,
      starter: c`score = 72
`,
      solution: c`score = 72
passed = score >= 50
full_marks = score == 100
print(passed)
print(full_marks)`,
      hints: ['<code>passed = score >= 50</code>', '<code>full_marks = score == 100</code> (two equals signs!)'],
      tests: [
        ['passed is True', c`assert passed is True, 'passed should be True for a score of 72.'`],
        ['full_marks is False', c`assert full_marks is False, 'full_marks should be False for a score of 72.'`],
        ['Uses comparisons', c`assert '>=' in source and '==' in source, 'Use >= and == to work out the answers.'`],
        ['Prints both', c`assert 'True' in lines and 'False' in lines`],
      ],
    },
  },
  {
    id: 'if-else', title: 'if and else', minutes: 12,
    blocks: [
      ['p', `Now we can make our programs <b>choose</b>. An <code>if</code> statement runs some code <b>only if</b> a condition is True:`],
      ['code', c`temperature = 30
if temperature > 25:
    print("It's hot! Wear sun cream.")
print("Have a nice day.")`],
      ['p', `Try changing the temperature to 10 and running again. The first message disappears, but "Have a nice day" always prints.`],
      ['h', 'The two golden rules'],
      ['list', [`The <code>if</code> line ends with a <b>colon</b> <code>:</code>`, `The code that belongs to the <code>if</code> is <b>indented</b> (pushed right by 4 spaces). Press <b>Tab</b> to indent.`]],
      ['p', `Indentation is how Python knows which lines are "inside" the if. In many languages it's just for neatness, but in Python it really matters!`],
      ['h', 'else: otherwise...'],
      ['p', `<code>else</code> gives Python something to do when the condition is False:`],
      ['code', c`age = int(input("How old are you? "))
if age >= 13:
    print("You can join the club!")
    print("Welcome aboard.")
else:
    print("Sorry, you need to be 13 or older.")
print("Thanks for visiting.")`],
      ['analogy', `Think of a fork in the road. Python checks the sign (the condition), then goes down <b>exactly one</b> of the two paths, never both. Afterwards the paths join back together.`],
      ['key', [`<code>if condition:</code> runs the indented block only when the condition is True.`, `<code>else:</code> runs when it's False.`, `Don't forget the colon and the indentation!`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`x = 3
if x > 5:
    print("big")
else:
    print("small")`, options: ['big', 'small', 'big small', 'Nothing'], answer: 1, explain: '3 > 5 is False, so the else block runs.' },
      { q: 'What does this print?', code: c`x = 10
if x > 5:
    print("A")
print("B")`, options: ['A', 'B', 'A then B', 'Nothing'], answer: 2, explain: 'The condition is True so A prints, and B is not indented so it always prints.' },
      { q: 'What\'s wrong with <code>if score > 10</code> followed by an indented line?', options: ['Nothing', 'Missing colon at the end', 'Should be ==', 'if needs a capital I'], answer: 1, explain: 'Every if line must end with a colon <code>:</code>' },
    ],
    challenge: {
      task: `<p>Write a voting checker. Ask the user for their age (as a number). Then:</p><ul><li>If they are <b>18 or older</b>, print <code>You can vote!</code></li><li>Otherwise print <code>Not yet - X years to go</code> where X is how many years until they turn 18.</li></ul>`,
      starter: c`age = int(input("How old are you? "))
`,
      solution: c`age = int(input("How old are you? "))
if age >= 18:
    print("You can vote!")
else:
    print(f"Not yet - {18 - age} years to go")`,
      inputs: ['20'],
      hints: ['Start with <code>if age >= 18:</code> and an indented print on the next line.', 'In the <code>else:</code> block, calculate <code>18 - age</code> and put it in an f-string.'],
      tests: [
        ['Age 20 can vote', c`assert 'You can vote!' in output`],
        ['Age 18 can vote', c`assert 'You can vote!' in run_with(['18']), 'Exactly 18 should be allowed. Use >= not >.'`],
        ['Age 15 has 3 years to go', c`o = run_with(['15'])
assert 'You can vote' not in o, 'Someone aged 15 should not be able to vote.'
assert '3 years to go' in o, 'Expected "Not yet - 3 years to go".'`],
        ['Age 10 has 8 years to go', c`assert '8 years to go' in run_with(['10'])`],
      ],
    },
  },
  {
    id: 'elif', title: 'elif: More Than Two Choices', minutes: 10,
    blocks: [
      ['p', `What if there are more than two possibilities? <code>elif</code> (short for "else if") lets you check several conditions in order:`],
      ['code', c`hour = 14
if hour < 12:
    print("Good morning!")
elif hour < 18:
    print("Good afternoon!")
else:
    print("Good evening!")`],
      ['p', `Python checks each condition <b>from top to bottom</b> and runs the <b>first</b> one that is True, then skips the rest. If none are True, the <code>else</code> runs.`],
      ['warn', `Order matters! Python stops at the first True condition. If you checked <code>hour &lt; 18</code> first, it would say "Good afternoon" at 8am too.`],
      ['code', c`score = int(input("Enter your score: "))
if score >= 90:
    print("Outstanding! 🌟")
elif score >= 70:
    print("Great work!")
elif score >= 50:
    print("You passed.")
else:
    print("Keep practising, you'll get there!")`],
      ['tip', `You can have as many <code>elif</code>s as you need. The <code>else</code> at the end is optional.`],
      ['key', [`<code>if</code> / <code>elif</code> / <code>else</code> picks one path out of many.`, `Conditions are checked top to bottom and the first True one wins.`, `Put the most specific conditions first.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`n = 75
if n > 50:
    print("A")
elif n > 70:
    print("B")
else:
    print("C")`, options: ['A', 'B', 'A and B', 'C'], answer: 0, explain: '75 > 50 is True, so it prints A and skips everything else, even though 75 > 70 is also True.' },
      { q: 'How many blocks can run in one if/elif/else chain?', options: ['Exactly one', 'All the True ones', 'Two', 'None'], answer: 0, explain: 'Exactly one block runs: the first True condition, or else.' },
    ],
    challenge: {
      task: `<p>Write a grade calculator. Ask for a score (a whole number) and print the grade:</p><ul><li><b>70 or more</b>: <code>Grade A</code></li><li><b>60 to 69</b>: <code>Grade B</code></li><li><b>50 to 59</b>: <code>Grade C</code></li><li><b>below 50</b>: <code>Grade U</code></li></ul>`,
      starter: c`score = int(input("Score: "))
`,
      solution: c`score = int(input("Score: "))
if score >= 70:
    print("Grade A")
elif score >= 60:
    print("Grade B")
elif score >= 50:
    print("Grade C")
else:
    print("Grade U")`,
      inputs: ['85'],
      hints: ['Start with the highest grade: <code>if score >= 70:</code>', 'Then <code>elif score >= 60:</code>, <code>elif score >= 50:</code> and finally <code>else:</code>'],
      tests: [
        ['85 is A', c`assert 'Grade A' in output`],
        ['70 is A', c`assert 'Grade A' in run_with(['70'])`],
        ['65 is B', c`o = run_with(['65']); assert 'Grade B' in o and 'Grade A' not in o`],
        ['50 is C', c`o = run_with(['50']); assert 'Grade C' in o, 'Exactly 50 should be a C.'`],
        ['49 is U', c`o = run_with(['49']); assert 'Grade U' in o and 'Grade C' not in o`],
        ['Uses elif', c`assert 'elif' in source, 'Use elif for the middle grades.'`],
      ],
    },
  },
  {
    id: 'and-or-not', title: 'and, or & not', minutes: 10,
    blocks: [
      ['p', `Sometimes one condition isn't enough. You can combine conditions with <code>and</code>, <code>or</code> and <code>not</code>:`],
      ['list', [`<code>A and B</code>: True only if <b>both</b> are True`, `<code>A or B</code>: True if <b>at least one</b> is True`, `<code>not A</code>: flips True to False and False to True`]],
      ['code', c`age = 15
has_ticket = True

if age >= 12 and has_ticket:
    print("Enjoy the film!")

day = "Saturday"
if day == "Saturday" or day == "Sunday":
    print("It's the weekend! 🎉")

raining = False
if not raining:
    print("Let's go outside.")`],
      ['warn', `A common mistake: <code>if day == "Saturday" or "Sunday":</code> doesn't work how you'd expect. Python reads it as <code>(day == "Saturday") or ("Sunday")</code>, and any non-empty string counts as True, so the condition is <b>always</b> True, even on a Monday! Write the full comparison on both sides: <code>day == "Saturday" or day == "Sunday"</code>. (Or use <code>day in ["Saturday", "Sunday"]</code>.)`],
      ['h', 'Checking a range'],
      ['code', c`temp = 22
if temp >= 18 and temp <= 25:
    print("Perfect weather")
# Python also allows this neat shortcut:
if 18 <= temp <= 25:
    print("Still perfect")`],
      ['key', [`<code>and</code>: both must be True.`, `<code>or</code>: at least one must be True.`, `<code>not</code>: reverses True/False.`, `Write each comparison in full on both sides of and/or.`]],
    ],
    quiz: [
      { q: 'What is <code>True and False</code>?', options: ['True', 'False'], answer: 1, explain: '<code>and</code> needs both sides to be True.' },
      { q: 'What is <code>False or True</code>?', options: ['True', 'False'], answer: 0, explain: '<code>or</code> only needs one side to be True.' },
      { q: 'What does this print?', code: c`x = 7
print(x > 5 and x < 10)`, options: ['True', 'False', '7', 'An error'], answer: 0, explain: '7 > 5 is True and 7 < 10 is True, so the result is True.' },
    ],
    challenge: {
      task: `<p>A theme park ride has two rules: riders must be <b>at least 120 cm tall</b> <i>and</i> <b>at least 8 years old</b>.</p><p>Ask for the rider's height (cm) and then their age (both whole numbers). If they meet <b>both</b> rules print <code>Enjoy the ride!</code>, otherwise print <code>Sorry, you can't ride yet.</code></p>`,
      starter: c`height = int(input("Height in cm: "))
age = int(input("Age: "))
`,
      solution: c`height = int(input("Height in cm: "))
age = int(input("Age: "))
if height >= 120 and age >= 8:
    print("Enjoy the ride!")
else:
    print("Sorry, you can't ride yet.")`,
      inputs: ['130', '10'],
      hints: ['You need one <code>if</code> that checks two things joined with <code>and</code>.', '<code>if height >= 120 and age >= 8:</code>'],
      tests: [
        ['130 cm, age 10 can ride', c`assert 'Enjoy the ride!' in output`],
        ['120 cm, age 8 can ride', c`assert 'Enjoy the ride!' in run_with(['120', '8']), 'Exactly 120cm and 8 years should be allowed.'`],
        ['Too short (110 cm, age 10)', c`o = run_with(['110', '10']); assert 'Sorry' in o and 'Enjoy' not in o`],
        ['Too young (140 cm, age 7)', c`o = run_with(['140', '7']); assert 'Sorry' in o and 'Enjoy' not in o`],
        ['Uses and', c`assert ' and ' in source`],
      ],
    },
  },
  ],
},
/* =========================================================== */
{
  id: 'm5', title: 'Loops', icon: '🔁',
  desc: 'Make the computer repeat things with while and for loops, and control them with break and continue.',
  lessons: [
  {
    id: 'while', title: 'while Loops', minutes: 12,
    blocks: [
      ['p', `Computers never get bored. A <b>loop</b> repeats a block of code many times. A <code>while</code> loop keeps repeating <b>as long as</b> its condition is True:`],
      ['code', c`count = 1
while count <= 5:
    print("This is repeat number", count)
    count = count + 1
print("Done!")`],
      ['p', `Let's trace it: count starts at 1. Is 1 ≤ 5? Yes, so print and add 1. Is 2 ≤ 5? Yes... When count becomes 6, the condition is False and the loop stops.`],
      ['analogy', `"<b>While</b> the bath isn't full, keep the tap running." You check the condition, do the action, then check again.`],
      ['warn', `If the condition <b>never</b> becomes False, the loop runs forever. This is an <b>infinite loop</b>. The most common cause is forgetting to change the counter (e.g. forgetting <code>count = count + 1</code>). Don't worry: this site stops programs that run too long.`],
      ['h', 'Loops with input'],
      ['p', `<code>while</code> loops are great when you don't know in advance how many times to repeat:`],
      ['code', c`answer = ""
while answer != "yes":
    answer = input("Are we there yet? ").lower()
print("Hooray, we've arrived!")`, { inputs: ['no', 'yes'] }],
      ['key', [`<code>while condition:</code> repeats the indented block while the condition is True.`, `Something inside the loop must eventually make the condition False.`, `Great when you don't know how many repeats you'll need.`]],
    ],
    quiz: [
      { q: 'How many times does this print "Hi"?', code: c`n = 0
while n < 3:
    print("Hi")
    n += 1`, options: ['2', '3', '4', 'Forever'], answer: 1, explain: 'n goes 0, 1, 2 (three prints). When n is 3, 3 < 3 is False so it stops.' },
      { q: 'What\'s wrong with this loop?', code: c`x = 1
while x < 10:
    print(x)`, options: ['Nothing', 'x never changes, so it loops forever', 'It should use for', 'print needs quotes'], answer: 1, explain: 'x is always 1, so x < 10 is always True. Add <code>x += 1</code> inside the loop.' },
    ],
    challenge: {
      task: `<p>Use a <code>while</code> loop to print a rocket countdown from <b>10 down to 1</b>, each number on its own line, followed by <code>Lift off!</code></p>`,
      starter: c`count = 10
`,
      solution: c`count = 10
while count >= 1:
    print(count)
    count -= 1
print("Lift off!")`,
      hints: ['The loop should keep going <code>while count >= 1:</code> (or <code>count > 0</code>).', 'Inside the loop: print the count, then make it smaller with <code>count -= 1</code>. Print "Lift off!" after the loop (not indented).'],
      tests: [
        ['Counts from 10 down to 1', c`nums = [l for l in lines if l.isdigit()]
assert nums == [str(i) for i in range(10, 0, -1)], 'Expected 10, 9, 8 ... 1. You printed: %s' % ', '.join(nums)`],
        ['Ends with Lift off!', c`assert lines and lines[-1] == 'Lift off!', 'The last line should be "Lift off!" (printed once, after the loop).'`],
        ['Uses a while loop', c`assert 'while ' in source`],
      ],
    },
  },
  {
    id: 'for-range', title: 'for Loops & range()', minutes: 12,
    blocks: [
      ['p', `When you know how many times to repeat, a <code>for</code> loop is simpler. Combined with <code>range()</code> it counts for you:`],
      ['code', c`for i in range(5):
    print("Hello number", i)`],
      ['p', `Notice <code>range(5)</code> gives <b>0, 1, 2, 3, 4</b>. That's 5 numbers, starting from 0 and stopping <b>before</b> 5. Each time round, the variable <code>i</code> holds the next number.`],
      ['h', 'Choosing where to start and stop'],
      ['code', c`for n in range(1, 6):        # start at 1, stop before 6
    print(n)

print("Even numbers:")
for n in range(2, 11, 2):    # start, stop, step
    print(n)

print("Countdown:")
for n in range(3, 0, -1):    # a negative step counts down
    print(n)`],
      ['h', 'Looping over a string'],
      ['p', `A <code>for</code> loop can also walk through each character of a string:`],
      ['code', c`for letter in "Python":
    print(letter)`],
      ['tip', `The loop variable name is your choice. <code>i</code> is traditional for counting, but use something meaningful like <code>letter</code> or <code>day</code> when it helps.`],
      ['key', [`<code>for i in range(n):</code> repeats n times (i = 0 to n-1).`, `<code>range(start, stop, step)</code> and stop is <b>not</b> included.`, `<code>for ch in text:</code> loops over each character.`]],
    ],
    quiz: [
      { q: 'What numbers does <code>range(3)</code> give?', options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '3'], answer: 1, explain: 'range starts at 0 and stops before the number given.' },
      { q: 'What numbers does <code>range(2, 8, 2)</code> give?', options: ['2, 4, 6, 8', '2, 4, 6', '2, 8', '4, 6, 8'], answer: 1, explain: 'Start at 2, step by 2, stop before 8: 2, 4, 6.' },
      { q: 'How many times does this loop run?', code: c`for x in range(1, 11):
    print(x)`, options: ['9', '10', '11', '12'], answer: 1, explain: '1 up to 10 (11 isn\'t included): 10 times.' },
    ],
    challenge: {
      task: `<p>Use a <code>for</code> loop to print the <b>7 times table</b> from 1 to 12 in exactly this format:</p><pre class="static" style="background:var(--surface-2);padding:10px 14px;border-radius:8px">7 x 1 = 7\n7 x 2 = 14\n...\n7 x 12 = 84</pre>`,
      starter: c`number = 7
`,
      solution: c`number = 7
for i in range(1, 13):
    print(f"{number} x {i} = {number * i}")`,
      hints: ['You want i to go from 1 to 12, so use <code>range(1, 13)</code>.', 'Inside the loop: <code>print(f"{number} x {i} = {number * i}")</code>'],
      tests: [
        ['Starts with 7 x 1 = 7', c`assert '7 x 1 = 7' in lines`],
        ['Ends with 7 x 12 = 84', c`assert '7 x 12 = 84' in lines, 'Make sure your range goes up to 12 (remember the stop number is not included).'`],
        ['Prints all 12 lines', c`assert len([l for l in lines if ' = ' in l]) == 12, 'Expected exactly 12 lines.'`],
        ['Uses a for loop', c`assert 'for ' in source and 'range(' in source`],
      ],
    },
  },
  {
    id: 'accumulate', title: 'Totals & Counters', minutes: 10,
    blocks: [
      ['p', `One of the most useful loop patterns is <b>building up a result</b> as you go. Start a variable at 0 <i>before</i> the loop, then add to it <i>inside</i> the loop:`],
      ['code', c`total = 0
for n in range(1, 6):
    total = total + n
    print("Added", n, "so total is now", total)
print("Final total:", total)`],
      ['h', 'Counting things'],
      ['p', `A <b>counter</b> works the same way, but adds 1 each time something happens:`],
      ['code', c`sentence = "the quick brown fox jumps over the lazy dog"
vowels = 0
for letter in sentence:
    if letter in "aeiou":
        vowels += 1
print("Number of vowels:", vowels)`],
      ['p', `Notice we combined a loop with an <code>if</code>. The <code>if</code> is indented inside the loop, and the <code>vowels += 1</code> is indented again inside the <code>if</code>.`],
      ['warn', `Create the total/counter <b>before</b> the loop. If you put <code>total = 0</code> inside the loop, it gets reset to 0 every time round!`],
      ['key', [`Accumulator pattern: <code>total = 0</code> before the loop, <code>total += x</code> inside.`, `Counter pattern: <code>count = 0</code>, then <code>count += 1</code> when something matches.`, `Loops and ifs can be nested; watch the indentation.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`total = 0
for n in range(4):
    total += n
print(total)`, options: ['4', '6', '10', '3'], answer: 1, explain: 'range(4) is 0, 1, 2, 3, and 0+1+2+3 = 6.' },
      { q: 'Why is this wrong?', code: c`for n in range(5):
    total = 0
    total += n
print(total)`, options: ['It isn\'t', 'total is reset to 0 every time round the loop', 'range should start at 1', 'print should be indented'], answer: 1, explain: 'Move <code>total = 0</code> above the loop so it only happens once.' },
    ],
    challenge: {
      task: `<p>Using loops:</p><ol><li>Add up all the numbers from <b>1 to 100</b> and store the answer in <code>total</code>.</li><li>Count how many <b>even</b> numbers there are from <b>1 to 50</b> and store the answer in <code>evens</code>. (Hint: a number is even if <code>n % 2 == 0</code>.)</li></ol><p>Print both answers.</p>`,
      starter: c`total = 0

evens = 0
`,
      solution: c`total = 0
for n in range(1, 101):
    total += n

evens = 0
for n in range(1, 51):
    if n % 2 == 0:
        evens += 1

print(total)
print(evens)`,
      hints: ['For the total: <code>for n in range(1, 101):</code> then <code>total += n</code> inside.', 'For evens: loop over <code>range(1, 51)</code>, and inside, <code>if n % 2 == 0:</code> add 1 to evens.'],
      tests: [
        ['total is 5050', c`assert total == 5050, 'total is %s, expected 5050. Check your range includes 100.' % total`],
        ['evens is 25', c`assert evens == 25, 'evens is %s, expected 25.' % evens`],
        ['Uses loops', c`assert source.count('for ') + source.count('while ') >= 2, 'Use a loop for each part.'`],
        ['Prints both', c`assert '5050' in lines and '25' in lines`],
      ],
    },
  },
  {
    id: 'break-continue', title: 'break, continue & Game Loops', minutes: 12,
    blocks: [
      ['p', `Sometimes you want to leave a loop early, or skip one turn. Python gives you two keywords:`],
      ['list', [`<code>break</code>: <b>stop the loop immediately</b> and carry on after it.`, `<code>continue</code>: <b>skip the rest of this turn</b> and jump to the next one.`]],
      ['code', c`for n in range(1, 11):
    if n == 6:
        break
    print(n)
print("Stopped at 6")`],
      ['code', c`for n in range(1, 11):
    if n % 3 == 0:
        continue     # skip multiples of 3
    print(n)`],
      ['h', 'The "while True" game loop'],
      ['p', `<code>while True:</code> loops forever on purpose, and you use <code>break</code> to get out when you're done. This is how most games and menus work:`],
      ['code', c`while True:
    command = input("Type a command (or 'quit'): ").lower()
    if command == "quit":
        print("Goodbye!")
        break
    elif command == "hello":
        print("Hi there!")
    else:
        print("I don't know that command.")`, { inputs: ['hello', 'quit'] }],
      ['tip', `When you run that example, type <b>hello</b> a couple of times, then <b>quit</b>.`],
      ['key', [`<code>break</code> exits the loop completely.`, `<code>continue</code> skips to the next turn.`, `<code>while True:</code> + <code>break</code> is the classic game/menu loop.`]],
    ],
    quiz: [
      { q: 'What is the last number printed?', code: c`for n in range(10):
    if n == 4:
        break
    print(n)`, options: ['3', '4', '9', '10'], answer: 0, explain: 'When n is 4 the loop breaks before printing, so 3 was the last.' },
      { q: 'What does <code>continue</code> do?', options: ['Ends the program', 'Exits the loop', 'Skips to the next turn of the loop', 'Repeats the current turn'], answer: 2, explain: 'The rest of the current turn is skipped; the loop carries on.' },
    ],
    challenge: {
      task: `<p>Build a password checker. Keep asking the user to <code>Enter password: </code> until they type <code>python123</code>.</p><ul><li>For each wrong guess print <code>Wrong password, try again.</code></li><li>When they get it right, print <code>Access granted after N attempts</code> where N is how many tries it took (including the correct one).</li></ul>`,
      starter: c`attempts = 0
`,
      solution: c`attempts = 0
while True:
    guess = input("Enter password: ")
    attempts += 1
    if guess == "python123":
        print(f"Access granted after {attempts} attempts")
        break
    print("Wrong password, try again.")`,
      inputs: ['abc', 'hello', 'python123'],
      hints: ['Use <code>while True:</code>, ask for input inside it, and add 1 to attempts each time.', 'If the guess is correct, print the message and <code>break</code>. Otherwise print the wrong message.'],
      tests: [
        ['Grants access on the 3rd try', c`assert 'Access granted after 3 attempts' in output, 'With abc, hello, python123 we expected "Access granted after 3 attempts".'`],
        ['Says wrong password twice', c`assert output.count('Wrong password') == 2, 'There were 2 wrong guesses.'`],
        ['Works first time', c`o = run_with(['python123']); assert 'Access granted after 1 attempts' in o and 'Wrong' not in o`],
      ],
    },
  },
  ],
},
/* =========================================================== */
{
  id: 'm6', title: 'Lists', icon: '📋',
  desc: 'Store many values in one variable, change them, loop through them and use handy list tricks.',
  lessons: [
  {
    id: 'lists', title: 'Making Lists', minutes: 10,
    blocks: [
      ['p', `What if you need to store 30 test scores, or everything on a shopping list? Creating 30 variables would be painful. A <b>list</b> stores many values in one variable, in order.`],
      ['code', c`fruits = ["apple", "banana", "cherry"]
scores = [85, 92, 78, 64]
print(fruits)
print(scores)
print("Number of fruits:", len(fruits))`],
      ['p', `Lists use square brackets <code>[ ]</code> with commas between items. They can hold any type of value.`],
      ['h', 'Getting items'],
      ['p', `Just like strings, list items have <b>index</b> numbers starting at <b>0</b>:`],
      ['code', c`fruits = ["apple", "banana", "cherry"]
print(fruits[0])     # apple
print(fruits[2])     # cherry
print(fruits[-1])    # the last item`],
      ['h', 'Changing items'],
      ['p', `Unlike strings, you <b>can</b> change items in a list:`],
      ['code', c`fruits = ["apple", "banana", "cherry"]
fruits[1] = "blueberry"
print(fruits)`],
      ['h', 'Is it in the list?'],
      ['code', c`fruits = ["apple", "banana", "cherry"]
print("banana" in fruits)
print("kiwi" in fruits)
if "apple" in fruits:
    print("We have apples!")`],
      ['key', [`A list holds many values: <code>[a, b, c]</code>`, `<code>my_list[0]</code> is the first item; <code>my_list[-1]</code> is the last.`, `<code>my_list[i] = value</code> changes an item.`, `<code>len()</code> and <code>in</code> work on lists too.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`colours = ["red", "green", "blue"]
print(colours[1])`, options: ['red', 'green', 'blue', 'An error'], answer: 1, explain: 'Index 1 is the second item, green.' },
      { q: 'What is <code>len([4, 8, 15, 16])</code>?', options: ['3', '4', '16', '43'], answer: 1, explain: 'There are 4 items in the list.' },
      { q: 'What happens with <code>colours[3]</code> on a 3-item list?', options: ['Gives the last item', 'IndexError', 'Gives None', 'Adds an item'], answer: 1, explain: 'Valid indexes are 0, 1 and 2, so 3 is "out of range".' },
    ],
    challenge: {
      task: `<ol><li>Create a list called <code>fruits</code> containing exactly <b>4</b> fruits of your choice.</li><li>Print the <b>first</b> and the <b>last</b> fruit using indexing.</li><li>Then change the <b>second</b> item to <code>"mango"</code> and print the whole list.</li></ol>`,
      starter: c`
`,
      solution: c`fruits = ["apple", "banana", "cherry", "grape"]
print(fruits[0])
print(fruits[-1])
fruits[1] = "mango"
print(fruits)`,
      hints: ['<code>fruits = ["apple", "banana", "cherry", "grape"]</code>', 'The second item has index 1: <code>fruits[1] = "mango"</code>'],
      tests: [
        ['fruits is a list of 4', c`assert isinstance(fruits, list) and len(fruits) == 4, 'fruits should be a list of exactly 4 items.'`],
        ['Second item is mango', c`assert fruits[1] == 'mango', 'Set fruits[1] = "mango" (index 1 is the second item).'`],
        ['Prints first and last', c`assert 'fruits[0]' in source and ('fruits[-1]' in source or 'fruits[3]' in source), 'Print fruits[0] and fruits[-1].'`],
        ['Prints the list', c`assert str(fruits) in output, 'Print the whole list at the end with print(fruits).'`],
      ],
    },
  },
  {
    id: 'list-methods', title: 'Adding & Removing Items', minutes: 12,
    blocks: [
      ['p', `Lists can grow and shrink. Here are the most useful list methods:`],
      ['code', c`shopping = []                 # an empty list
shopping.append("milk")       # add to the end
shopping.append("bread")
shopping.append("eggs")
print(shopping)

shopping.insert(0, "apples")  # insert at position 0
print(shopping)

shopping.remove("bread")      # remove by value
print(shopping)

last = shopping.pop()         # remove and return the last item
print("Removed:", last)
print(shopping)`],
      ['h', 'Sorting'],
      ['code', c`numbers = [42, 7, 19, 3, 88]
numbers.sort()               # sorts the list itself
print(numbers)
numbers.sort(reverse=True)   # biggest first (reverse=True is a named option)
print(numbers)

names = ["Zara", "adam", "Mo"]
print(sorted(names))         # sorted() gives a NEW sorted list
print(names)                 # original unchanged`],
      ['p', `Notice <code>"adam"</code> came <b>last</b>. When sorting text, capital letters come before lowercase ones. To ignore capitals, use <code>sorted(names, key=str.lower)</code>.`],
      ['tip', `<code>append</code> is the one you'll use most. A great pattern is starting with an empty list and appending inside a loop.`],
      ['code', c`squares = []
for n in range(1, 6):
    squares.append(n * n)
print(squares)`],
      ['key', [`<code>.append(x)</code> adds to the end; <code>.insert(i, x)</code> adds at a position.`, `<code>.remove(x)</code> removes by value; <code>.pop()</code> removes the last item.`, `<code>.sort()</code> sorts in place; <code>sorted(list)</code> makes a sorted copy.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`pets = ["cat"]
pets.append("dog")
pets.insert(0, "fish")
print(pets)`, options: ["['cat', 'dog', 'fish']", "['fish', 'cat', 'dog']", "['fish', 'dog', 'cat']", "['cat', 'fish', 'dog']"], answer: 1, explain: 'append adds dog at the end; insert(0, ...) puts fish at the front.' },
      { q: 'Which method adds an item to the end of a list?', options: ['<code>.add()</code>', '<code>.push()</code>', '<code>.append()</code>', '<code>.insert()</code>'], answer: 2, explain: 'Python lists use <code>.append()</code>.' },
    ],
    challenge: {
      task: `<p>Starting from the empty list <code>shopping</code>, use list methods to:</p><ol><li>Append <code>"milk"</code>, <code>"bread"</code> and <code>"eggs"</code>.</li><li>Remove <code>"bread"</code>.</li><li>Insert <code>"apples"</code> at the very start.</li><li>Sort the list alphabetically and print it.</li></ol><p>The final list should be <code>['apples', 'eggs', 'milk']</code>.</p>`,
      starter: c`shopping = []
`,
      solution: c`shopping = []
shopping.append("milk")
shopping.append("bread")
shopping.append("eggs")
shopping.remove("bread")
shopping.insert(0, "apples")
shopping.sort()
print(shopping)`,
      hints: ['<code>shopping.append("milk")</code> and so on for each item.', 'Then <code>shopping.remove("bread")</code>, <code>shopping.insert(0, "apples")</code>, <code>shopping.sort()</code>.'],
      tests: [
        ['Final list is correct', c`assert shopping == ['apples', 'eggs', 'milk'], 'shopping is %s' % shopping`],
        ['Uses append, remove, insert and sort', c`for m in ['.append(', '.remove(', '.insert(', '.sort(']:
    assert m in source, 'Use the %s) method.' % m[:-1]`],
        ['Prints the list', c`assert "['apples', 'eggs', 'milk']" in output`],
      ],
    },
  },
  {
    id: 'list-loops', title: 'Looping Through Lists', minutes: 12,
    blocks: [
      ['p', `A <code>for</code> loop can visit every item in a list, one at a time. This is one of the most common things you'll do in Python:`],
      ['code', c`friends = ["Ali", "Beth", "Carlos"]
for friend in friends:
    print(f"Hi {friend}!")`],
      ['h', 'Getting the position too'],
      ['p', `<code>enumerate()</code> gives you both the position and the item:`],
      ['code', c`podium = ["Gold", "Silver", "Bronze"]
for position, medal in enumerate(podium, start=1):
    print(f"{position}. {medal}")`],
      ['h', 'Built-in helpers'],
      ['code', c`scores = [56, 89, 72, 94, 61]
print("Total:", sum(scores))
print("Highest:", max(scores))
print("Lowest:", min(scores))
print("Average:", sum(scores) / len(scores))`],
      ['h', 'Filtering with a loop'],
      ['code', c`scores = [56, 89, 72, 94, 61]
high = []
for s in scores:
    if s >= 70:
        high.append(s)
print("Scores of 70+:", high)`],
      ['key', [`<code>for item in my_list:</code> visits every item.`, `<code>enumerate(list, start=1)</code> gives position + item.`, `<code>sum()</code>, <code>max()</code>, <code>min()</code>, <code>len()</code> are built in.`, `Build new lists by appending inside a loop.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`nums = [3, 5, 2]
total = 0
for n in nums:
    total += n
print(total)`, options: ['3', '10', '[3, 5, 2]', '352'], answer: 1, explain: '3 + 5 + 2 = 10.' },
      { q: 'What is <code>max([4, 19, 7])</code>?', options: ['4', '7', '19', '3'], answer: 2, explain: 'max gives the biggest value.' },
    ],
    challenge: {
      task: `<p>You have a list of test <code>scores</code>. Write code that:</p><ol><li>Prints every score with its position, like <code>1. 45</code>, <code>2. 78</code>, ...</li><li>Stores the <b>average</b> score in a variable called <code>average</code> and prints it.</li><li>Creates a list called <code>passed</code> containing only the scores that are <b>50 or more</b>.</li></ol>`,
      starter: c`scores = [45, 78, 92, 33, 67, 50]
`,
      solution: c`scores = [45, 78, 92, 33, 67, 50]
for i, s in enumerate(scores, start=1):
    print(f"{i}. {s}")

average = sum(scores) / len(scores)
print("Average:", average)

passed = []
for s in scores:
    if s >= 50:
        passed.append(s)
print(passed)`,
      hints: ['Use <code>for i, s in enumerate(scores, start=1):</code> and print <code>f"{i}. {s}"</code>.', 'Average is <code>sum(scores) / len(scores)</code>. For passed, start with an empty list and append scores that are <code>>= 50</code>.'],
      tests: [
        ['Prints numbered scores', c`assert '1. 45' in lines and '6. 50' in lines, 'Expected lines like "1. 45" up to "6. 50".'`],
        ['average is correct', c`assert approx(average, sum(scores) / len(scores)), 'average should be sum(scores) / len(scores).'`],
        ['passed has scores of 50+', c`assert passed == [78, 92, 67, 50], 'passed is %s, expected [78, 92, 67, 50]. Is 50 included?' % passed`],
      ],
    },
  },
  {
    id: 'list-tricks', title: 'Slicing, split() & join()', minutes: 12,
    blocks: [
      ['h', 'Slicing lists'],
      ['p', `Slicing works on lists just like strings:`],
      ['code', c`letters = ["a", "b", "c", "d", "e"]
print(letters[1:4])   # ['b', 'c', 'd']
print(letters[:2])    # first two
print(letters[-2:])   # last two`],
      ['h', 'Turning text into a list: split()'],
      ['p', `<code>.split()</code> breaks a string into a list of words. Give it a character to split on something else:`],
      ['code', c`sentence = "I love learning Python"
words = sentence.split()
print(words)
print("Word count:", len(words))

data = "red,green,blue"
print(data.split(","))`],
      ['h', 'Turning a list into text: join()'],
      ['code', c`words = ["Python", "is", "fun"]
print(" ".join(words))
print("-".join(words))`],
      ['h', 'List comprehensions (a powerful shortcut)'],
      ['p', `A <b>list comprehension</b> builds a new list in one line. It reads almost like English: <i>"n times 2, for each n in numbers"</i>:`],
      ['code', c`numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print(doubled)

evens = [n for n in numbers if n % 2 == 0]
print(evens)

shout = [w.upper() for w in ["hi", "there"]]
print(shout)`],
      ['tip', `Comprehensions are optional. A normal loop with <code>append</code> does the same job. Use whichever you find clearer.`],
      ['key', [`<code>list[a:b]</code> slices lists.`, `<code>text.split()</code> → list of words; <code>" ".join(list)</code> → text.`, `<code>[expr for x in list if condition]</code> builds a new list.`]],
    ],
    quiz: [
      { q: 'What does <code>"a-b-c".split("-")</code> give?', options: ['"abc"', "['a', 'b', 'c']", "['a-b-c']", "['-']"], answer: 1, explain: 'It splits the string at every "-", giving a list of three strings.' },
      { q: 'What does this give?', code: c`[x * 10 for x in [1, 2, 3]]`, options: ['[1, 2, 3]', '[10, 20, 30]', '60', '[11, 12, 13]'], answer: 1, explain: 'Each x is multiplied by 10.' },
    ],
    challenge: {
      task: `<p>Given the <code>sentence</code> below:</p><ol><li>Split it into a list called <code>words</code>.</li><li>Print how many words there are.</li><li>Make a list called <code>long_words</code> containing only the words with <b>more than 3 letters</b>.</li><li>Join <code>long_words</code> together with <code>" "</code> between them and print the result.</li></ol>`,
      starter: c`sentence = "the quick brown fox jumps over a lazy dog"
`,
      solution: c`sentence = "the quick brown fox jumps over a lazy dog"
words = sentence.split()
print(len(words))
long_words = [w for w in words if len(w) > 3]
print(" ".join(long_words))`,
      hints: ['<code>words = sentence.split()</code>, then <code>print(len(words))</code>.', '<code>long_words = [w for w in words if len(w) > 3]</code>, then <code>print(" ".join(long_words))</code>.'],
      tests: [
        ['words is the list of words', c`assert words == sentence.split()`],
        ['Prints the word count', c`assert '9' in lines`],
        ['long_words is correct', c`assert long_words == ['quick', 'brown', 'jumps', 'over', 'lazy'], 'long_words is %s' % long_words`],
        ['Prints the joined words', c`assert 'quick brown jumps over lazy' in output, 'Use " ".join(long_words).'`],
      ],
    },
  },
  ],
},
/* =========================================================== */
{
  id: 'm7', title: 'Functions', icon: '🧩',
  desc: 'Package code into reusable functions with parameters and return values.',
  lessons: [
  {
    id: 'def', title: 'Making Your Own Functions', minutes: 10,
    blocks: [
      ['p', `You've been using functions all along: <code>print()</code>, <code>input()</code>, <code>len()</code>. Now you'll make your own!`],
      ['p', `A <b>function</b> is a named block of code that you can run whenever you want, just by using its name. It means you don't have to write the same code again and again.`],
      ['analogy', `A function is like a recipe card with a title. Writing the card (<b>defining</b> the function) doesn't cook anything. You cook when you decide to use the card (<b>calling</b> the function), and you can use it as many times as you like.`],
      ['code', c`def say_hello():
    print("Hello!")
    print("Welcome to Python.")

say_hello()
say_hello()`],
      ['list', [`<code>def</code> means "define a function".`, `Then the name, round brackets <code>()</code> and a colon <code>:</code>`, `The function's code is indented underneath.`, `To <b>call</b> (run) it, write its name with brackets: <code>say_hello()</code>`]],
      ['warn', `Defining a function doesn't run it! If you forget to call it, nothing happens. Also, you must define a function <b>before</b> you call it.`],
      ['code', c`def draw_line():
    print("=" * 30)

draw_line()
print("   MY AWESOME REPORT")
draw_line()
print("Everything is going great.")
draw_line()`],
      ['key', [`<code>def name():</code> defines a function; the indented code is its body.`, `<code>name()</code> calls it and runs the body.`, `Functions stop you repeating yourself.`]],
    ],
    quiz: [
      { q: 'How many times is "Hi" printed?', code: c`def greet():
    print("Hi")

greet()
greet()
greet()`, options: ['0', '1', '3', '4'], answer: 2, explain: 'Defining prints nothing; each of the 3 calls prints "Hi".' },
      { q: 'What does this print?', code: c`def shout():
    print("HEY")`, options: ['HEY', 'Nothing', 'shout', 'An error'], answer: 1, explain: 'The function is defined but never called.' },
    ],
    challenge: {
      task: `<p>Define a function called <code>greet</code> that prints <code>Hello there!</code></p><p>Then <b>call it three times</b>.</p>`,
      starter: c`
`,
      solution: c`def greet():
    print("Hello there!")

greet()
greet()
greet()`,
      hints: ['<code>def greet():</code> then an indented <code>print("Hello there!")</code>.', 'Call it with <code>greet()</code> on three separate, non-indented lines.'],
      tests: [
        ['greet is a function', c`assert callable(greet), 'Define it with def greet():'`],
        ['greet prints Hello there!', c`assert 'Hello there!' in capture(greet)`],
        ['Called three times', c`assert output.count('Hello there!') == 3, 'Expected "Hello there!" 3 times, got %d.' % output.count('Hello there!')`],
        ['Uses def', c`assert 'def greet' in source`],
      ],
    },
  },
  {
    id: 'params', title: 'Parameters: Giving Functions Information', minutes: 12,
    blocks: [
      ['p', `Functions get much more useful when you can give them information to work with. The names inside the brackets are called <b>parameters</b>:`],
      ['code', c`def greet(name):
    print(f"Hello, {name}! 👋")

greet("Ava")
greet("Ben")
greet("Chloe")`],
      ['p', `When you call <code>greet("Ava")</code>, the value <code>"Ava"</code> (called an <b>argument</b>) is put into the parameter <code>name</code> while the function runs.`],
      ['h', 'Several parameters'],
      ['code', c`def introduce(name, age, hobby):
    print(f"{name} is {age} and loves {hobby}.")

introduce("Ravi", 14, "chess")
introduce("Lily", 16, "drawing")`],
      ['p', `Arguments are matched to parameters <b>in order</b>: first to first, second to second.`],
      ['h', 'Default values'],
      ['p', `You can give a parameter a default value, used when no argument is given:`],
      ['code', c`def order(food, drink="water"):
    print(f"One {food} with {drink}, coming up!")

order("burger", "lemonade")
order("salad")          # drink uses the default`],
      ['h', 'Naming your arguments'],
      ['p', `You can also pass arguments by <b>name</b>. Then the order doesn't matter, and the call is easier to read. These are called <b>keyword arguments</b>:`],
      ['code', c`def order(food, drink="water"):
    print(f"One {food} with {drink}, coming up!")

order(drink="tea", food="toast")`],
      ['p', `You've already seen keyword arguments in built-in functions: <code>enumerate(items, start=1)</code> and <code>numbers.sort(reverse=True)</code>.`],
      ['key', [`Parameters are variables in the <code>def</code> line: <code>def f(a, b):</code>`, `Arguments are the values you pass in: <code>f(1, 2)</code>.`, `They match up in order.`, `<code>param=value</code> in the <code>def</code> line gives a default.`, `<code>f(name=value)</code> in a call passes a keyword argument.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`def double(n):
    print(n * 2)

double(7)`, options: ['7', '14', 'n * 2', '72'], answer: 1, explain: 'n becomes 7, and 7 × 2 = 14.' },
      { q: 'What does this print?', code: c`def info(a, b="X"):
    print(a, b)

info("Y")`, options: ['Y X', 'X Y', 'Y', 'An error'], answer: 0, explain: 'a is "Y" and b uses its default "X".' },
    ],
    challenge: {
      task: `<p>Define a function <code>describe_pet(name, animal="dog")</code> that prints a sentence like:</p><pre class="static" style="background:var(--surface-2);padding:10px 14px;border-radius:8px">Rex is a dog.</pre><p>Then call it twice: once with just a name, and once with a name and a different animal (e.g. <code>describe_pet("Tom", "cat")</code>).</p>`,
      starter: c`
`,
      solution: c`def describe_pet(name, animal="dog"):
    print(f"{name} is a {animal}.")

describe_pet("Rex")
describe_pet("Tom", "cat")`,
      hints: ['<code>def describe_pet(name, animal="dog"):</code>', 'Inside: <code>print(f"{name} is a {animal}.")</code>'],
      tests: [
        ['Default animal is dog', c`assert 'Rex is a dog.' in capture(describe_pet, 'Rex'), 'describe_pet("Rex") should print "Rex is a dog."'`],
        ['Uses the animal given', c`assert 'Tom is a cat.' in capture(describe_pet, 'Tom', 'cat')`],
        ['Works with other values', c`assert 'Nemo is a fish.' in capture(describe_pet, 'Nemo', 'fish')`],
        ['Called at least twice', c`assert output.count(' is a ') >= 2, 'Call your function twice.'`],
      ],
    },
  },
  {
    id: 'return', title: 'return: Getting Answers Back', minutes: 12,
    blocks: [
      ['p', `So far our functions <i>print</i> things. But often you want a function to <b>work something out and give the answer back</b> so you can use it. That's what <code>return</code> does:`],
      ['code', c`def add(a, b):
    return a + b

result = add(3, 4)
print(result)
print(add(10, 20) * 2)`],
      ['analogy', `<code>print</code> is like shouting the answer across the room: everyone hears it, but nobody can write it down and use it. <code>return</code> is like handing the answer over on a piece of paper so the code that called the function can store it and use it.`],
      ['code', c`def area(width, height):
    return width * height

room1 = area(4, 5)
room2 = area(3, 3)
print("Total floor space:", room1 + room2)`],
      ['h', 'return ends the function'],
      ['p', `As soon as Python hits <code>return</code>, it leaves the function. You can use this with <code>if</code>:`],
      ['code', c`def grade(score):
    if score >= 70:
        return "A"
    if score >= 50:
        return "C"
    return "U"

print(grade(85), grade(55), grade(20))`],
      ['h', 'Functions that return True/False'],
      ['code', c`def is_even(n):
    return n % 2 == 0

print(is_even(4))
print(is_even(7))
if is_even(10):
    print("10 is even!")`],
      ['key', [`<code>return value</code> sends a value back to whoever called the function.`, `Store it: <code>x = my_function()</code>, or use it directly.`, `<code>return</code> immediately ends the function.`, `A function with no return gives back <code>None</code>.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`def triple(x):
    return x * 3

print(triple(4) + 1)`, options: ['12', '13', '15', 'None'], answer: 1, explain: 'triple(4) returns 12, then 12 + 1 = 13.' },
      { q: 'What does this print?', code: c`def f():
    print("A")

x = f()
print(x)`, options: ['A then A', 'A then None', 'None', 'An error'], answer: 1, explain: 'f prints A but returns nothing, so x is None.' },
    ],
    challenge: {
      task: `<p>Write two functions that <b>return</b> (not print) their answers:</p><ol><li><code>area(width, height)</code> returns the area of a rectangle.</li><li><code>is_even(n)</code> returns <code>True</code> if n is even, otherwise <code>False</code>.</li></ol><p>Test them by printing a few results, e.g. <code>print(area(3, 4))</code>.</p>`,
      starter: c`def area(width, height):
    # replace this line with your code
    pass


def is_even(n):
    pass


print(area(3, 4))
print(is_even(7))
`,
      solution: c`def area(width, height):
    return width * height


def is_even(n):
    return n % 2 == 0


print(area(3, 4))
print(is_even(7))`,
      hints: ['<code>return width * height</code>', 'A number is even if <code>n % 2 == 0</code>. You can return that comparison directly.'],
      tests: [
        ['area(3, 4) returns 12', c`assert area(3, 4) == 12, 'area(3, 4) returned %r. Did you use return (not print)?' % area(3, 4)`],
        ['area(10, 2.5) returns 25', c`assert approx(area(10, 2.5), 25)`],
        ['is_even(4) returns True', c`assert is_even(4) is True, 'is_even(4) returned %r' % is_even(4)`],
        ['is_even(7) returns False', c`assert is_even(7) is False, 'is_even(7) returned %r' % is_even(7)`],
        ['is_even(0) returns True', c`assert is_even(0) is True`],
      ],
    },
  },
  {
    id: 'scope', title: 'Scope & Writing Good Functions', minutes: 10,
    blocks: [
      ['h', 'Local variables'],
      ['p', `Variables created <i>inside</i> a function are <b>local</b>. They only exist while the function runs, and the rest of the program can't see them:`],
      ['code', c`def make_secret():
    secret = 42
    print("Inside:", secret)

make_secret()
print("Outside:", secret)   # error!`, { error: true }],
      ['p', `This is actually helpful: each function is a self-contained machine. Information goes <b>in</b> through parameters and comes <b>out</b> through <code>return</code>.`],
      ['h', 'Docstrings'],
      ['p', `A <b>docstring</b> is a description in triple quotes on the first line of a function. It explains what the function does:`],
      ['code', c`def km_to_miles(km):
    """Convert a distance in kilometres to miles."""
    return km * 0.621371

print(km_to_miles(10))
help(km_to_miles)`],
      ['h', 'Tips for good functions'],
      ['list', [`<b>Do one job</b> and do it well. Small functions are easier to test and fix.`, `<b>Name them with a verb</b> describing what they do: <code>calculate_total</code>, <code>is_valid</code>, <code>draw_board</code>.`, `<b>Return</b> results rather than printing them, so they can be reused.`, `Use functions to break a big problem into small steps.`]],
      ['code', c`def get_total(prices):
    return sum(prices)

def apply_discount(total, percent):
    return total * (100 - percent) / 100

basket = [4.99, 12.50, 3.25]
total = get_total(basket)
final = apply_discount(total, 10)
print(f"Total £{total:.2f}, after 10% off £{final:.2f}")`],
      ['key', [`Variables made in a function are local to it.`, `Pass data in with parameters; get it out with return.`, `Add a docstring to explain what a function does.`, `Small, well-named functions make programs easy to read.`]],
    ],
    quiz: [
      { q: 'What happens here?', code: c`def f():
    y = 5

f()
print(y)`, options: ['Prints 5', 'NameError: y is local to f', 'Prints None', 'Prints 0'], answer: 1, explain: 'y only exists inside f. To use it outside, return it.' },
      { q: 'Which is the best function name?', options: ['<code>stuff()</code>', '<code>f2()</code>', '<code>calculate_average()</code>', '<code>doIt()</code>'], answer: 2, explain: 'It clearly describes what the function does.' },
    ],
    challenge: {
      task: `<p>Write two temperature converter functions, each with a docstring, that <b>return</b> the answer:</p><ul><li><code>celsius_to_fahrenheit(c)</code>: the formula is <code>c * 9 / 5 + 32</code></li><li><code>fahrenheit_to_celsius(f)</code>: the formula is <code>(f - 32) * 5 / 9</code></li></ul><p>Print <code>celsius_to_fahrenheit(100)</code> to test (it should be 212).</p>`,
      starter: c`
`,
      solution: c`def celsius_to_fahrenheit(c):
    """Convert Celsius to Fahrenheit."""
    return c * 9 / 5 + 32


def fahrenheit_to_celsius(f):
    """Convert Fahrenheit to Celsius."""
    return (f - 32) * 5 / 9


print(celsius_to_fahrenheit(100))`,
      hints: ['<code>def celsius_to_fahrenheit(c):</code> followed by an indented docstring and <code>return c * 9 / 5 + 32</code>.', 'Don\'t forget the brackets in <code>(f - 32) * 5 / 9</code>, because order of operations matters!'],
      tests: [
        ['100°C is 212°F', c`assert approx(celsius_to_fahrenheit(100), 212), 'Got %r' % celsius_to_fahrenheit(100)`],
        ['0°C is 32°F', c`assert approx(celsius_to_fahrenheit(0), 32)`],
        ['212°F is 100°C', c`assert approx(fahrenheit_to_celsius(212), 100), 'Got %r. Check your brackets.' % fahrenheit_to_celsius(212)`],
        ['-40 is the same in both', c`assert approx(fahrenheit_to_celsius(-40), -40)`],
        ['Functions have docstrings', c`assert celsius_to_fahrenheit.__doc__ and fahrenheit_to_celsius.__doc__, 'Add a """docstring""" as the first line of each function.'`],
      ],
    },
  },
  ],
},
/* =========================================================== */
{
  id: 'm8', title: 'Dictionaries & More', icon: '🗂️',
  desc: 'Store data with labels in dictionaries, count things, and meet tuples and sets.',
  lessons: [
  {
    id: 'dicts', title: 'Dictionaries', minutes: 12,
    blocks: [
      ['p', `A list stores items by <b>position</b> (0, 1, 2...). A <b>dictionary</b> stores items by <b>name</b>. Each value has a label called a <b>key</b>.`],
      ['analogy', `A real dictionary links a word (the key) to its meaning (the value). You look things up by the word, not by page number. Phone contacts work the same way: you look up a name to find a number.`],
      ['code', c`person = {
    "name": "Zoe",
    "age": 15,
    "city": "Swansea",
}
print(person)
print(person["name"])
print(person["age"])`],
      ['p', `Dictionaries use curly brackets <code>{ }</code>, with <code>key: value</code> pairs separated by commas.`],
      ['h', 'Adding and changing'],
      ['code', c`person = {"name": "Zoe", "age": 15}
person["age"] = 16            # change a value
person["hobby"] = "climbing"  # add a new key
print(person)
del person["hobby"]           # remove a key
print(person)`],
      ['h', 'Safe lookups'],
      ['p', `Asking for a key that doesn't exist causes a <code>KeyError</code>. Check with <code>in</code>, or use <code>.get()</code> which returns <code>None</code> (or a default) instead:`],
      ['code', c`stock = {"apples": 5, "pears": 0}
print("bananas" in stock)
print(stock.get("bananas"))
print(stock.get("bananas", 0))`],
      ['key', [`A dictionary maps <b>keys</b> to <b>values</b>: <code>{"key": value}</code>.`, `Look up with <code>d[key]</code>; add or change with <code>d[key] = value</code>.`, `<code>key in d</code> checks if it exists; <code>d.get(key, default)</code> is a safe lookup.`, `Values can be anything, even lists or other dictionaries.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`ages = {"Ana": 12, "Ben": 14}
print(ages["Ben"])`, options: ['Ben', '14', '12', '1'], answer: 1, explain: 'The key "Ben" maps to the value 14.' },
      { q: 'How do you add a new key "Cy" with value 13?', options: ['<code>ages.append("Cy", 13)</code>', '<code>ages["Cy"] = 13</code>', '<code>ages + {"Cy": 13}</code>', '<code>ages.add("Cy": 13)</code>'], answer: 1, explain: 'Assigning to a new key adds it.' },
    ],
    challenge: {
      task: `<p>Create a dictionary called <code>student</code> with these keys:</p><ul><li><code>"name"</code>: a name (text)</li><li><code>"age"</code>: a number</li><li><code>"subjects"</code>: a <b>list</b> of at least 2 subjects</li></ul><p>Then <b>add</b> a new key <code>"year"</code> with the value <code>10</code>, and print the student's name using the dictionary.</p>`,
      starter: c`
`,
      solution: c`student = {
    "name": "Sam",
    "age": 15,
    "subjects": ["Maths", "Computing"],
}
student["year"] = 10
print(student["name"])`,
      hints: ['<code>student = {"name": "Sam", "age": 15, "subjects": ["Maths", "Art"]}</code>', 'Add the year with <code>student["year"] = 10</code>, then <code>print(student["name"])</code>.'],
      tests: [
        ['student is a dictionary', c`assert isinstance(student, dict)`],
        ['Has name, age and subjects', c`for k in ['name', 'age', 'subjects']:
    assert k in student, 'Missing the key "%s".' % k
assert isinstance(student['subjects'], list) and len(student['subjects']) >= 2, 'subjects should be a list with at least 2 items.'`],
        ['year is 10', c`assert student.get('year') == 10, 'Add student["year"] = 10.'`],
        ['Prints the name', c`assert str(student['name']) in output and 'student[' in source.replace('student["year"]', '').replace("student['year']", ''), 'Print it from the dictionary with print(student["name"]).'`],
      ],
    },
  },
  {
    id: 'dict-loops', title: 'Looping & Counting with Dictionaries', minutes: 12,
    blocks: [
      ['p', `You can loop through a dictionary's keys, its values, or both together:`],
      ['code', c`prices = {"apple": 0.5, "bread": 1.2, "milk": 0.9}

for item in prices:              # keys
    print(item)

for item, price in prices.items():   # keys AND values
    print(f"{item}: £{price:.2f}")

print("Total:", sum(prices.values()))`],
      ['h', 'Counting with a dictionary'],
      ['p', `A classic use of dictionaries is counting how often things appear. If the key is new, start it at 1; otherwise add 1:`],
      ['code', c`votes = ["cat", "dog", "cat", "fish", "cat", "dog"]
counts = {}
for v in votes:
    if v in counts:
        counts[v] += 1
    else:
        counts[v] = 1
print(counts)

# Find the key with the biggest count: key=counts.get tells max()
# to compare the counts, not the names themselves
winner = max(counts, key=counts.get)
print("Winner:", winner)`],
      ['tip', `A shorter way to count: <code>counts[v] = counts.get(v, 0) + 1</code>. If the key doesn't exist yet, <code>.get</code> gives 0.`],
      ['key', [`<code>for k in d:</code> loops over keys.`, `<code>for k, v in d.items():</code> loops over key/value pairs.`, `<code>d.keys()</code>, <code>d.values()</code>, <code>d.items()</code>.`, `Count with <code>d[x] = d.get(x, 0) + 1</code>.`]],
    ],
    quiz: [
      { q: 'What does <code>for k, v in d.items():</code> give you each time?', options: ['Just the keys', 'Just the values', 'A key and its value', 'The index and the key'], answer: 2, explain: '.items() gives (key, value) pairs.' },
      { q: 'After this code, what is <code>c["a"]</code>?', code: c`c = {}
for ch in "banana":
    c[ch] = c.get(ch, 0) + 1`, options: ['1', '2', '3', '6'], answer: 2, explain: '"banana" has three a\'s.' },
    ],
    challenge: {
      task: `<p>Count how many times each letter appears in the word <code>"mississippi"</code>. Store the result in a dictionary called <code>counts</code> (e.g. <code>counts["s"]</code> should be 4). Then loop through <code>counts</code> and print each letter and its count like <code>m: 1</code>.</p>`,
      starter: c`word = "mississippi"
counts = {}
`,
      solution: c`word = "mississippi"
counts = {}
for letter in word:
    counts[letter] = counts.get(letter, 0) + 1

for letter, n in counts.items():
    print(f"{letter}: {n}")`,
      hints: ['Loop with <code>for letter in word:</code>, then inside: <code>counts[letter] = counts.get(letter, 0) + 1</code>', 'To print: <code>for letter, n in counts.items():</code> then <code>print(f"{letter}: {n}")</code>'],
      tests: [
        ['counts is correct', c`assert counts == {'m': 1, 'i': 4, 's': 4, 'p': 2}, 'counts is %s' % counts`],
        ['Uses a loop', c`assert 'for ' in source`],
        ['Prints each count', c`for t in ['m: 1', 'i: 4', 's: 4', 'p: 2']:
    assert t in lines, 'Expected a line "%s".' % t`],
      ],
    },
  },
  {
    id: 'tuples-sets', title: 'Tuples & Sets', minutes: 10,
    blocks: [
      ['h', 'Tuples: lists that can\'t change'],
      ['p', `A <b>tuple</b> is like a list, but once created it can't be changed. Use round brackets:`],
      ['code', c`point = (3, 7)
print(point[0], point[1])

# Unpacking: put each value into its own variable
x, y = point
print(f"x is {x}, y is {y}")

rgb = (255, 128, 0)
red, green, blue = rgb
print(red)`],
      ['p', `Tuples are good for things that belong together and shouldn't change: coordinates, a date, an RGB colour. Functions can also return several values as a tuple:`],
      ['code', c`def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([4, 9, 1, 7])
print(low, high)`],
      ['h', 'Sets: no duplicates allowed'],
      ['p', `A <b>set</b> is an unordered collection where every item is unique. It's perfect for removing duplicates:`],
      ['code', c`names = ["Ali", "Bo", "Ali", "Cat", "Bo", "Ali"]
unique = set(names)
print(unique)                  # sets have no fixed order, so this may print in any order
print(len(unique), "different names")
print(sorted(unique))

a = {1, 2, 3, 4}
b = {3, 4, 5}
print(a & b)   # in both
print(a | b)   # in either`],
      ['key', [`Tuples <code>(a, b)</code> are like lists that can't be changed.`, `Unpack with <code>x, y = point</code>.`, `Sets <code>{a, b}</code> hold unique items; <code>set(list)</code> removes duplicates.`]],
    ],
    quiz: [
      { q: 'What is <code>len(set([1, 1, 2, 2, 2, 3]))</code>?', options: ['6', '3', '2', '1'], answer: 1, explain: 'A set keeps only unique values: {1, 2, 3}.' },
      { q: 'After <code>a, b = (5, 9)</code>, what is b?', options: ['5', '9', '(5, 9)', 'An error'], answer: 1, explain: 'Unpacking puts the first value in a and the second in b.' },
    ],
    challenge: {
      task: `<ol><li>The list <code>visitors</code> has duplicate names. Create <code>unique_visitors</code>: a <b>sorted list</b> with each name only once.</li><li>Unpack the tuple <code>location</code> into two variables called <code>lat</code> and <code>lon</code>.</li></ol>`,
      starter: c`visitors = ["Tom", "Ann", "Tom", "Raj", "Ann", "Tom", "Eve"]
location = (52.41, -3.56)
`,
      solution: c`visitors = ["Tom", "Ann", "Tom", "Raj", "Ann", "Tom", "Eve"]
location = (52.41, -3.56)
unique_visitors = sorted(set(visitors))
print(unique_visitors)
lat, lon = location
print(lat, lon)`,
      hints: ['<code>set(visitors)</code> removes duplicates, and <code>sorted(...)</code> turns it into a sorted list.', 'Unpack with <code>lat, lon = location</code>.'],
      tests: [
        ['unique_visitors is correct', c`assert unique_visitors == ['Ann', 'Eve', 'Raj', 'Tom'], 'unique_visitors is %s' % (unique_visitors,)`],
        ['lat and lon are unpacked', c`assert lat == 52.41 and lon == -3.56`],
        ['Uses a set', c`assert 'set(' in source`],
      ],
    },
  },
  ],
},
/* =========================================================== */
{
  id: 'm9', title: 'Errors & Debugging', icon: '🐞',
  desc: 'Handle problems gracefully with try/except and learn proper debugging skills.',
  lessons: [
  {
    id: 'try-except', title: 'try & except', minutes: 12,
    blocks: [
      ['p', `What happens if your program asks for a number and the user types <i>"banana"</i>? It crashes! Real programs need to cope with unexpected input. That's what <code>try</code> and <code>except</code> are for.`],
      ['code', c`age = int(input("Enter your age: "))
print("Next year you'll be", age + 1)`, { title: 'Try typing a word instead of a number' }],
      ['p', `Now with error handling:`],
      ['code', c`try:
    age = int(input("Enter your age: "))
    print("Next year you'll be", age + 1)
except ValueError:
    print("That wasn't a whole number!")`],
      ['p', `Python <b>tries</b> the code in the <code>try</code> block. If a <code>ValueError</code> happens, instead of crashing it jumps to the <code>except</code> block.`],
      ['h', 'Keep asking until it works'],
      ['p', `Combine <code>try/except</code> with a loop to keep asking until the user gets it right:`],
      ['code', c`while True:
    try:
        number = int(input("Pick a number from 1 to 10: "))
        if 1 <= number <= 10:
            break
        print("That's not between 1 and 10.")
    except ValueError:
        print("Please type digits, like 7.")
print("You picked", number)`],
      ['h', 'Catching different errors'],
      ['code', c`def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("You can't divide by zero!")
        return None

print(safe_divide(10, 2))
print(safe_divide(5, 0))`],
      ['warn', `Avoid a bare <code>except:</code> that catches everything. It can hide real bugs. Name the error you expect, like <code>except ValueError:</code>.`],
      ['key', [`<code>try:</code> runs code that might fail.`, `<code>except ErrorType:</code> runs only if that error happens.`, `Use a loop + try/except to validate user input.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`try:
    x = int("hello")
    print("A")
except ValueError:
    print("B")`, options: ['A', 'B', 'A then B', 'It crashes'], answer: 1, explain: 'int("hello") fails, so Python jumps straight to except. "A" never prints.' },
      { q: 'Which error does <code>10 / 0</code> cause?', options: ['ValueError', 'TypeError', 'ZeroDivisionError', 'NameError'], answer: 2, explain: 'Dividing by zero raises ZeroDivisionError.' },
    ],
    challenge: {
      task: `<p>Write a program that asks the user to <code>Enter a number: </code>.</p><ul><li>If they type a valid whole number, print <code>Double is X</code> (where X is the number × 2).</li><li>If they type something that isn't a number, print <code>That's not a number!</code> instead of crashing.</li></ul>`,
      starter: c`
`,
      solution: c`try:
    n = int(input("Enter a number: "))
    print(f"Double is {n * 2}")
except ValueError:
    print("That's not a number!")`,
      inputs: ['21'],
      hints: ['Put the <code>int(input(...))</code> and the print inside a <code>try:</code> block.', 'Add <code>except ValueError:</code> with the friendly message.'],
      tests: [
        ['21 doubles to 42', c`assert 'Double is 42' in output`],
        ['"abc" does not crash', c`o = run_with(['abc']); assert "That's not a number!" in o, 'Typing abc should print: That\'s not a number!'`],
        ['"-5" doubles to -10', c`assert 'Double is -10' in run_with(['-5'])`],
        ['Uses try/except', c`assert 'try:' in source and 'except' in source`],
      ],
    },
  },
  {
    id: 'debugging', title: 'Debugging Like a Pro', minutes: 12,
    blocks: [
      ['p', `Some bugs don't cause an error at all. The program runs, but gives the <b>wrong answer</b>. These are called <b>logic errors</b>, and finding them takes detective work.`],
      ['h', 'Technique 1: print debugging'],
      ['p', `Add <code>print()</code> lines to see what your variables hold as the program runs. It's the simplest and most-used debugging tool in the world.`],
      ['code', c`# This should add up 1 to 5 (=15), but it gives the wrong answer
total = 0
for n in range(1, 5):
    print("DEBUG: n =", n, "total =", total)
    total += n
print("Total:", total)`],
      ['p', `The debug lines show <code>n</code> never reaches 5, because <code>range(1, 5)</code> stops before 5. That's an <b>off-by-one error</b>, one of the most common bugs. Fix it to <code>range(1, 6)</code>.`],
      ['h', 'Technique 2: rubber duck debugging'],
      ['p', `Explain your code, line by line, out loud to someone, or to a rubber duck 🦆. It sounds silly, but explaining forces you to slow down and you'll often spot the problem yourself.`],
      ['h', 'Technique 3: test small pieces'],
      ['p', `Don't write 50 lines and then run it. Write a few lines, run, check, then add more. If something breaks, you know it was the last bit you added.`],
      ['h', 'Common bug checklist'],
      ['list', [`Off-by-one: does your <code>range</code> include the last number?`, `Forgot to convert <code>input()</code> with <code>int()</code>?`, `Used <code>=</code> instead of <code>==</code>?`, `Wrong indentation (a line inside a loop that should be after it, or vice versa)?`, `Reset a total inside the loop instead of before it?`, `Spelled a variable slightly differently in two places?`]],
      ['key', [`Logic errors give wrong answers without crashing.`, `Use <code>print()</code> to look inside your program.`, `Explain your code to a duck. 🦆`, `Build and test in small steps.`]],
    ],
    quiz: [
      { q: 'This should print 1 to 10. What\'s the bug?', code: c`for i in range(1, 10):
    print(i)`, options: ['Should use while', 'Off-by-one: range should be (1, 11)', 'print needs quotes', 'Nothing'], answer: 1, explain: 'range stops before the end number, so 10 is never printed.' },
      { q: 'What is the most common simple debugging technique?', options: ['Rewrite everything', 'Add print() to see variable values', 'Restart the computer', 'Add more comments'], answer: 1, explain: 'Printing values lets you see what your program is really doing.' },
    ],
    challenge: {
      task: `<p>This <code>average</code> function is supposed to return the average of a list of numbers, but it has <b>two bugs</b>. Find and fix them!</p><p>Tip: run it first and read the error, then use print debugging to check the total.</p>`,
      starter: c`def average(numbers):
    total = 0
    for n in numbers:
        total = n
    return total / len(number)


print(average([1, 2, 3]))      # should print 2.0
print(average([10, 20]))       # should print 15.0`,
      solution: c`def average(numbers):
    total = 0
    for n in numbers:
        total += n
    return total / len(numbers)


print(average([1, 2, 3]))
print(average([10, 20]))`,
      hints: ['One bug causes a NameError. Look closely at the spelling of the variable on the return line.', 'The other bug: <code>total = n</code> replaces the total each time. It should <i>add</i> to it.'],
      tests: [
        ['average([1, 2, 3]) is 2', c`assert approx(average([1, 2, 3]), 2), 'Got %r' % average([1, 2, 3])`],
        ['average([10, 20]) is 15', c`assert approx(average([10, 20]), 15)`],
        ['average([7]) is 7', c`assert approx(average([7]), 7)`],
        ['average([2, 4, 6, 8]) is 5', c`assert approx(average([2, 4, 6, 8]), 5)`],
      ],
    },
  },
  ],
},
/* =========================================================== */
{
  id: 'm10', title: 'Modules & Files', icon: '🧰',
  desc: 'Use Python\'s built-in toolboxes like random and math, and save data to files.',
  lessons: [
  {
    id: 'modules', title: 'Importing Modules', minutes: 12,
    blocks: [
      ['p', `Python comes with hundreds of ready-made toolboxes called <b>modules</b>. Instead of writing everything yourself, you can <code>import</code> them.`],
      ['h', 'random: for games and surprises'],
      ['code', c`import random

print(random.randint(1, 6))            # a random whole number from 1 to 6
print(random.choice(["rock", "paper", "scissors"]))
print(random.random())                 # random decimal from 0 up to (not including) 1

cards = ["A", "K", "Q", "J", "10"]
random.shuffle(cards)
print(cards)`],
      ['tip', `Run that a few times. You'll get different results each time!`],
      ['h', 'math: for maths functions'],
      ['code', c`import math

print(math.sqrt(16))      # square root
print(math.pi)
print(math.ceil(4.2))     # round up
print(math.floor(4.8))    # round down
print(round(3.14159, 2))  # round() is built in, no import needed`],
      ['h', 'Other ways to import'],
      ['code', c`from random import randint, choice
print(randint(1, 100))      # no "random." needed

import datetime
print(datetime.date.today())`],
      ['p', `Other useful built-in modules include <code>datetime</code> (dates and times), <code>time</code>, <code>statistics</code> and <code>string</code>. Beyond these, the Python community has made thousands more that you can install on your own computer, for websites, games, data science, AI and more.`],
      ['key', [`<code>import module</code> then use <code>module.function()</code>.`, `<code>from module import thing</code> lets you use <code>thing()</code> directly.`, `<code>random.randint(a, b)</code> includes both a and b.`, `Put imports at the top of your program.`]],
    ],
    quiz: [
      { q: 'Which numbers can <code>random.randint(1, 3)</code> give?', options: ['1 or 2', '1, 2 or 3', '0, 1, 2 or 3', 'Any decimal from 1 to 3'], answer: 1, explain: 'randint includes both ends.' },
      { q: 'After <code>import math</code>, how do you get the square root of 25?', options: ['<code>sqrt(25)</code>', '<code>math.sqrt(25)</code>', '<code>math(25).sqrt</code>', '<code>25.sqrt()</code>'], answer: 1, explain: 'Use the module name, a dot, then the function.' },
    ],
    challenge: {
      task: `<ol><li>Write a function <code>roll_dice()</code> that <b>returns</b> a random whole number from 1 to 6.</li><li>Write a function <code>hypotenuse(a, b)</code> that returns the length of the longest side of a right-angled triangle using <code>math.sqrt(a**2 + b**2)</code>.</li></ol><p>Print a dice roll and <code>hypotenuse(3, 4)</code> (which should be 5.0).</p>`,
      starter: c`import random
import math

`,
      solution: c`import random
import math


def roll_dice():
    return random.randint(1, 6)


def hypotenuse(a, b):
    return math.sqrt(a ** 2 + b ** 2)


print(roll_dice())
print(hypotenuse(3, 4))`,
      hints: ['<code>return random.randint(1, 6)</code>', '<code>return math.sqrt(a ** 2 + b ** 2)</code>'],
      tests: [
        ['roll_dice() gives 1 to 6', c`rolls = [roll_dice() for _ in range(300)]
assert all(isinstance(r, int) and 1 <= r <= 6 for r in rolls), 'Every roll should be a whole number from 1 to 6.'`],
        ['roll_dice() can roll every number', c`rolls = set(roll_dice() for _ in range(300))
assert rolls == {1, 2, 3, 4, 5, 6}, 'Over 300 rolls we only saw %s. Is it random from 1 to 6?' % sorted(rolls)`],
        ['hypotenuse(3, 4) is 5', c`assert approx(hypotenuse(3, 4), 5)`],
        ['hypotenuse(5, 12) is 13', c`assert approx(hypotenuse(5, 12), 13)`],
      ],
    },
  },
  {
    id: 'files', title: 'Reading & Writing Files', minutes: 12,
    blocks: [
      ['p', `When a program ends, its variables disappear. To keep data, like high scores or saved notes, you write it to a <b>file</b>.`],
      ['h', 'Writing a file'],
      ['code', c`with open("notes.txt", "w") as file:
    file.write("Buy milk\n")
    file.write("Finish homework\n")
print("Saved!")`],
      ['list', [`<code>open(name, "w")</code> opens a file for <b>w</b>riting (it creates it, or <b>replaces</b> it if it exists).`, `<code>with</code> automatically closes the file when the block finishes.`, `<code>\\n</code> means "new line". <code>write</code> doesn't add one for you.`]],
      ['h', 'Reading a file'],
      ['code', c`with open("notes.txt", "w") as f:
    f.write("Buy milk\nFinish homework\nCall Gran\n")

with open("notes.txt", "r") as f:
    content = f.read()
print(content)

with open("notes.txt") as f:      # "r" is the default
    for line in f:
        print("-", line.strip())`],
      ['h', 'Adding to a file'],
      ['p', `Mode <code>"a"</code> (<b>a</b>ppend) adds to the end instead of replacing:`],
      ['code', c`with open("log.txt", "w") as f:
    f.write("Started\n")
with open("log.txt", "a") as f:
    f.write("Level 1 complete\n")
    f.write("Level 2 complete\n")
print(open("log.txt").read())`],
      ['tip', `On this website, files are stored in a pretend file system inside your browser and are cleared when you refresh. On your own computer, they're saved to your disk for real.`],
      ['key', [`<code>with open(name, mode) as f:</code> opens a file safely.`, `Modes: <code>"r"</code> read, <code>"w"</code> write (replace), <code>"a"</code> append.`, `<code>f.write(text)</code>, <code>f.read()</code>, <code>for line in f:</code>`, `Use <code>.strip()</code> to remove the <code>\\n</code> at the end of each line.`]],
    ],
    quiz: [
      { q: 'Which mode adds to the end of an existing file?', options: ['"r"', '"w"', '"a"', '"x"'], answer: 2, explain: '"a" is for append. "w" would wipe the file first!' },
      { q: 'Why use <code>with open(...) as f:</code>?', options: ['It\'s faster', 'It closes the file automatically', 'It\'s required for reading', 'It encrypts the file'], answer: 1, explain: 'The with block makes sure the file is closed properly, even if an error happens.' },
    ],
    challenge: {
      task: `<ol><li>Write the list of <code>tasks</code> to a file called <code>tasks.txt</code>, <b>one task per line</b>.</li><li>Then open the file again, read it back, and store the number of lines in a variable called <code>line_count</code>.</li><li>Print <code>line_count</code>.</li></ol>`,
      starter: c`tasks = ["Walk the dog", "Practise Python", "Read a book"]
`,
      solution: c`tasks = ["Walk the dog", "Practise Python", "Read a book"]

with open("tasks.txt", "w") as f:
    for task in tasks:
        f.write(task + "\n")

with open("tasks.txt") as f:
    lines = f.readlines()

line_count = len(lines)
print(line_count)`,
      hints: ['Open with <code>"w"</code> and loop over tasks, writing <code>task + "\\n"</code> each time.', 'Read back with <code>f.readlines()</code> (gives a list of lines) and use <code>len()</code>.'],
      tests: [
        ['tasks.txt has the right lines', c`import os
assert os.path.exists('tasks.txt'), 'tasks.txt was not created.'
got = [l.strip() for l in open('tasks.txt').read().strip().splitlines()]
assert got == tasks, 'The file contains %s' % got`],
        ['line_count is 3', c`assert line_count == 3, 'line_count is %r' % line_count`],
        ['Reads the file back', c`assert source.count('open(') >= 2, 'Open the file a second time to read it.'`],
      ],
    },
  },
  ],
},
/* =========================================================== */
{
  id: 'm11', title: 'Classes & Objects', icon: '🏗️',
  desc: 'Create your own types of object with classes: the basis of object-oriented programming.',
  lessons: [
  {
    id: 'classes', title: 'Classes & Objects', minutes: 15,
    blocks: [
      ['p', `As programs grow, it helps to bundle related data and functions together. A <b>class</b> is a blueprint for making <b>objects</b>.`],
      ['analogy', `A class is like a cookie cutter, and objects are the cookies. One <code>Dog</code> class can make many dog objects, each with its own name and age, but all able to do the same things (like bark).`],
      ['code', c`class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        print(f"{self.name} says Woof!")

rex = Dog("Rex", 3)
bella = Dog("Bella", 5)

print(rex.name, rex.age)
rex.bark()
bella.bark()`],
      ['h', 'Breaking it down'],
      ['list', [`<code>class Dog:</code> starts the blueprint. By convention class names start with a capital letter and join words together, e.g. <code>BankAccount</code>.`, `<code>__init__</code> is a special method that runs when you create a new object. It sets up the object's data.`, `<code>self</code> means "this particular object". <code>self.name = name</code> stores the name <i>on the object</i>.`, `<code>bark</code> is a <b>method</b>, a function that belongs to the class. Methods always take <code>self</code> first.`, `<code>Dog("Rex", 3)</code> creates an object; <code>rex.bark()</code> calls a method on it.`]],
      ['p', `Things stored on <code>self</code> (like <code>self.name</code>) are called <b>attributes</b>. Methods can use and return them:`],
      ['code', c`class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def describe(self):
        return f"A {self.width} x {self.height} rectangle"

r = Rectangle(4, 6)
print(r.describe())
print("Area:", r.area())`],
      ['key', [`A class is a blueprint; objects are made from it.`, `<code>__init__(self, ...)</code> sets up each new object.`, `<code>self.x</code> is an attribute stored on the object.`, `Methods are functions inside a class; they take <code>self</code> first.`]],
    ],
    quiz: [
      { q: 'What does <code>__init__</code> do?', options: ['Deletes an object', 'Sets up a new object when it is created', 'Prints the object', 'Imports the class'], answer: 1, explain: '__init__ runs automatically when you create an object, e.g. Dog("Rex", 3).' },
      { q: 'What does this print?', code: c`class Cat:
    def __init__(self, name):
        self.name = name

c = Cat("Tom")
print(c.name)`, options: ['Cat', 'name', 'Tom', 'self'], answer: 2, explain: 'The name "Tom" was stored as self.name on the object.' },
    ],
    challenge: {
      task: `<p>Create a class called <code>Dog</code>:</p><ul><li><code>__init__(self, name, age)</code> stores <code>name</code> and <code>age</code> as attributes.</li><li>A method <code>bark(self)</code> that <b>returns</b> the text <code>"Rex says woof!"</code> (using the dog's own name).</li><li>A method <code>human_years(self)</code> that <b>returns</b> the dog's age × 7.</li></ul><p>Create a dog and print the results of both methods.</p>`,
      starter: c`class Dog:
    def __init__(self, name, age):
        pass
`,
      solution: c`class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        return f"{self.name} says woof!"

    def human_years(self):
        return self.age * 7


rex = Dog("Rex", 3)
print(rex.bark())
print(rex.human_years())`,
      hints: ['In <code>__init__</code>: <code>self.name = name</code> and <code>self.age = age</code>.', 'Methods need <code>self</code>: <code>def bark(self):</code> then <code>return f"{self.name} says woof!"</code>'],
      tests: [
        ['Dog stores name and age', c`d = Dog("Fido", 2)
assert d.name == "Fido" and d.age == 2, 'Store them with self.name = name and self.age = age.'`],
        ['bark() returns the right text', c`assert Dog("Rex", 3).bark() == "Rex says woof!", 'Dog("Rex", 3).bark() returned %r' % Dog("Rex", 3).bark()`],
        ['bark() uses the dog\'s own name', c`assert Dog("Luna", 1).bark() == "Luna says woof!"`],
        ['human_years() is age x 7', c`assert Dog("Rex", 3).human_years() == 21 and Dog("Old", 10).human_years() == 70`],
      ],
    },
  },
  {
    id: 'objects-state', title: 'Objects That Change', minutes: 15,
    blocks: [
      ['p', `Objects really shine when methods <b>change</b> their attributes. The object remembers its state between method calls:`],
      ['code', c`class Player:
    def __init__(self, name):
        self.name = name
        self.score = 0
        self.lives = 3

    def add_points(self, points):
        self.score += points

    def lose_life(self):
        self.lives -= 1
        if self.lives == 0:
            print(f"Game over for {self.name}!")

    def status(self):
        return f"{self.name}: {self.score} points, {self.lives} lives"

p = Player("Ash")
p.add_points(50)
p.add_points(25)
p.lose_life()
print(p.status())`],
      ['p', `Notice <code>self.score = 0</code> in <code>__init__</code>: attributes don't have to come from parameters. They can start with a default value.`],
      ['h', 'Many independent objects'],
      ['code', c`class Counter:
    def __init__(self):
        self.count = 0

    def click(self):
        self.count += 1

a = Counter()
b = Counter()
a.click()
a.click()
a.click()
b.click()
print(a.count, b.count)   # each object has its own count`],
      ['tip', `There's a special method <code>__str__</code> that controls what <code>print(object)</code> shows. Try adding <code>def __str__(self): return self.status()</code> to the Player class.`],
      ['key', [`Methods can change attributes, e.g. <code>self.score += 10</code>.`, `Each object keeps its own separate data.`, `Set starting values for attributes in <code>__init__</code>.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`class Box:
    def __init__(self):
        self.items = 0
    def add(self):
        self.items += 1

b = Box()
b.add()
b.add()
print(b.items)`, options: ['0', '1', '2', 'An error'], answer: 2, explain: 'items starts at 0 and each add() increases it by 1.' },
    ],
    challenge: {
      task: `<p>Create a <code>BankAccount</code> class:</p><ul><li><code>__init__(self, owner)</code> stores the owner and sets <code>self.balance = 0</code>.</li><li><code>deposit(self, amount)</code> adds the amount to the balance.</li><li><code>withdraw(self, amount)</code>: if there is enough money, subtract it and return <code>True</code>. If not, leave the balance alone and return <code>False</code>.</li></ul>`,
      starter: c`class BankAccount:
    def __init__(self, owner):
        pass
`,
      solution: c`class BankAccount:
    def __init__(self, owner):
        self.owner = owner
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            return False
        self.balance -= amount
        return True


acc = BankAccount("Sam")
acc.deposit(100)
print(acc.withdraw(30), acc.balance)
print(acc.withdraw(500), acc.balance)`,
      hints: ['In <code>__init__</code>: <code>self.owner = owner</code> and <code>self.balance = 0</code>. deposit is <code>self.balance += amount</code>.', 'In withdraw: <code>if amount > self.balance: return False</code>. Otherwise subtract and <code>return True</code>.'],
      tests: [
        ['New account has balance 0', c`a = BankAccount("T"); assert a.balance == 0 and a.owner == "T"`],
        ['deposit adds money', c`a = BankAccount("T"); a.deposit(50); a.deposit(25); assert a.balance == 75, 'balance is %r' % a.balance`],
        ['withdraw works when there is enough', c`a = BankAccount("T"); a.deposit(100)
assert a.withdraw(40) is True, 'withdraw should return True when it succeeds.'
assert a.balance == 60`],
        ['withdraw refuses when there is not enough', c`a = BankAccount("T"); a.deposit(20)
assert a.withdraw(50) is False, 'withdraw should return False when there is not enough money.'
assert a.balance == 20, 'The balance should not change when a withdrawal fails.'`],
      ],
    },
  },
  ],
},
/* =========================================================== */
{
  id: 'm12', title: 'Projects', icon: '🎮',
  desc: 'Put everything together to build real programs: a guessing game, a to-do app and Rock, Paper, Scissors.',
  lessons: [
  {
    id: 'proj-guess', title: 'Project: Number Guessing Game', minutes: 20,
    blocks: [
      ['p', `Time to build a complete game! 🎯 The computer picks a secret number from 1 to 100, and the player keeps guessing. After each guess, the game says "Too low", "Too high" or "Correct!".`],
      ['h', 'Plan before you code'],
      ['p', `Programmers break big problems into small steps. Here's our plan:`],
      ['steps', [`Pick a random secret number (<code>random.randint</code>).`, `Write a function <code>check_guess(guess, secret)</code> that returns the right message.`, `Loop forever: ask for a guess, count it, check it.`, `If it's correct, congratulate the player and <code>break</code>.`]],
      ['p', `Writing <code>check_guess</code> as a separate function makes it easy to test on its own:`],
      ['code', c`def check_guess(guess, secret):
    if guess < secret:
        return "Too low"
    elif guess > secret:
        return "Too high"
    else:
        return "Correct!"

print(check_guess(30, 50))
print(check_guess(70, 50))
print(check_guess(50, 50))`],
      ['tip', `This project uses: variables, input, int(), functions, return, if/elif/else, while loops, break and modules. You've learned all of these! 💪`],
      ['h', 'Ideas to extend it'],
      ['list', [`Limit the player to 7 guesses.`, `Ask "Play again?" at the end.`, `Keep track of the best (lowest) score.`, `Use try/except so typing a word doesn't crash the game.`]],
    ],
    quiz: [],
    challenge: {
      task: `<p>Build the full game:</p><ol><li>Write <code>check_guess(guess, secret)</code> that returns <code>"Too low"</code>, <code>"Too high"</code> or <code>"Correct!"</code>.</li><li>Pick a random <code>secret</code> from 1 to 100.</li><li>Use a loop to keep asking <code>Your guess: </code>, print the result of <code>check_guess</code> each time, and count the guesses.</li><li>When the guess is correct, print <code>You got it in N guesses!</code> and stop.</li></ol><p>When you press Check, the tester will guess 1, 2, 3... until it finds your number.</p>`,
      starter: c`import random


def check_guess(guess, secret):
    pass


secret = random.randint(1, 100)
guesses = 0

# your game loop here
`,
      solution: c`import random


def check_guess(guess, secret):
    if guess < secret:
        return "Too low"
    elif guess > secret:
        return "Too high"
    else:
        return "Correct!"


secret = random.randint(1, 100)
guesses = 0
print("I'm thinking of a number between 1 and 100.")

while True:
    guess = int(input("Your guess: "))
    guesses += 1
    result = check_guess(guess, secret)
    print(result)
    if result == "Correct!":
        print(f"You got it in {guesses} guesses!")
        break`,
      inputs: Array.from({ length: 100 }, (_, i) => String(i + 1)),
      hints: ['check_guess is three cases: <code>if guess &lt; secret:</code> / <code>elif guess &gt; secret:</code> / <code>else:</code>, each with a return.', 'Loop: <code>while True:</code>, then <code>guess = int(input("Your guess: "))</code>, <code>guesses += 1</code>, print <code>check_guess(guess, secret)</code>. If it\'s "Correct!", print the message and <code>break</code>.'],
      tests: [
        ['check_guess says "Too low"', c`assert check_guess(10, 50) == "Too low", 'check_guess(10, 50) returned %r' % check_guess(10, 50)`],
        ['check_guess says "Too high"', c`assert check_guess(90, 50) == "Too high"`],
        ['check_guess says "Correct!"', c`assert check_guess(50, 50) == "Correct!"`],
        ['secret is from 1 to 100', c`assert isinstance(secret, int) and 1 <= secret <= 100`],
        ['The game finds the number and counts guesses', c`assert 'You got it in %d guesses!' % secret in output, 'The tester guessed 1, 2, 3... so it should take %d guesses to reach %d.' % (secret, secret)`],
      ],
    },
  },
  {
    id: 'proj-todo', title: 'Project: To-Do List App', minutes: 20,
    blocks: [
      ['p', `Let's build a real app 📝: a to-do list manager that runs in a loop and responds to commands. This is how lots of real command-line tools work.`],
      ['h', 'The design'],
      ['p', `We'll store tasks in a <b>list</b>, and write a small <b>function</b> for each action. A <code>while True</code> loop reads commands until the user types <code>quit</code>:`],
      ['code', c`def show_tasks(tasks):
    if not tasks:
        print("Nothing to do! 🎉")
    for i, task in enumerate(tasks, start=1):
        print(f"{i}. {task}")

tasks = ["Feed the cat", "Learn Python"]
show_tasks(tasks)
show_tasks([])`],
      ['p', `<code>if not tasks:</code> is a neat trick: an empty list counts as False, so this means "if the list is empty".`],
      ['tip', `Keeping each action in its own function means the main loop stays short and readable, and each function can be tested separately.`],
      ['h', 'Ideas to extend it'],
      ['list', [`Save tasks to a file so they're remembered next time.`, `Let the user mark tasks as done instead of removing them.`, `Add priorities using a dictionary.`]],
    ],
    quiz: [],
    challenge: {
      task: `<p>Build the to-do app:</p><ol><li><code>add_task(tasks, task)</code>: adds the task to the list.</li><li><code>remove_task(tasks, task)</code>: removes it and returns <code>True</code>, or returns <code>False</code> if it wasn't in the list.</li><li><code>show_tasks(tasks)</code>: prints each task numbered, like <code>1. Buy milk</code>.</li><li>A main loop that asks <code>Command: </code> and handles <code>add</code> (then asks <code>Task: </code>), <code>remove</code> (asks <code>Task: </code>), <code>show</code> and <code>quit</code>.</li></ol>`,
      starter: c`def add_task(tasks, task):
    pass


def remove_task(tasks, task):
    pass


def show_tasks(tasks):
    pass


tasks = []
# main loop here
`,
      solution: c`def add_task(tasks, task):
    tasks.append(task)


def remove_task(tasks, task):
    if task in tasks:
        tasks.remove(task)
        return True
    return False


def show_tasks(tasks):
    if not tasks:
        print("Nothing to do!")
    for i, task in enumerate(tasks, start=1):
        print(f"{i}. {task}")


tasks = []
while True:
    command = input("Command: ").strip().lower()
    if command == "add":
        add_task(tasks, input("Task: "))
    elif command == "remove":
        if not remove_task(tasks, input("Task: ")):
            print("That task isn't on the list.")
    elif command == "show":
        show_tasks(tasks)
    elif command == "quit":
        print("Bye!")
        break
    else:
        print("Commands: add, remove, show, quit")`,
      inputs: ['add', 'Buy milk', 'add', 'Walk dog', 'show', 'remove', 'Buy milk', 'show', 'quit'],
      hints: ['add_task is one line: <code>tasks.append(task)</code>. remove_task: check <code>if task in tasks:</code> before removing.', 'In the loop, read <code>command = input("Command: ")</code> and use if/elif for each command. Remember <code>break</code> for quit!'],
      tests: [
        ['add_task adds to the list', c`t = []; add_task(t, 'A'); add_task(t, 'B'); assert t == ['A', 'B'], 'got %s' % t`],
        ['remove_task removes and returns True', c`t = ['A', 'B']; assert remove_task(t, 'A') is True and t == ['B']`],
        ['remove_task returns False if missing', c`t = ['A']; assert remove_task(t, 'Z') is False and t == ['A']`],
        ['show_tasks numbers the tasks', c`o = capture(show_tasks, ['Eat', 'Sleep']); assert '1. Eat' in o and '2. Sleep' in o, 'show_tasks printed: %r' % o`],
        ['The app works end to end', c`assert '1. Buy milk' in output and '2. Walk dog' in output, 'After adding two tasks, show should list them.'
assert '1. Walk dog' in output, 'After removing "Buy milk", show should list "1. Walk dog".'`],
      ],
    },
  },
  {
    id: 'proj-rps', title: 'Project: Rock, Paper, Scissors', minutes: 20,
    blocks: [
      ['p', `Your final project: a classic game against the computer ✊✋✌️. This brings together random choices, functions, dictionaries, loops and score-keeping.`],
      ['h', 'Using a dictionary for the rules'],
      ['p', `Instead of lots of <code>if</code> statements, we can store "what beats what" in a dictionary:`],
      ['code', c`beats = {"rock": "scissors", "scissors": "paper", "paper": "rock"}

print("rock beats", beats["rock"])

me, them = "paper", "rock"
if beats[me] == them:
    print("I win!")`],
      ['p', `That's the elegant part: <code>beats[player] == computer</code> means the player wins. If they're the same, it's a draw. Otherwise the computer wins.`],
      ['h', 'You did it! 🎓'],
      ['p', `After this project you've covered the core of Python. Where next? Some ideas:`],
      ['list', [`<b>Install Python</b> on a computer (python.org) and use an editor like Thonny or VS Code.`, `<b>Make games</b> with the <code>pygame</code> library.`, `<b>Draw</b> with the <code>turtle</code> module.`, `<b>Build websites</b> with Flask, or explore <b>data</b> with pandas.`, `Keep practising in the 🧪 Playground. Try rebuilding these projects from memory!`]],
    ],
    quiz: [],
    challenge: {
      task: `<ol><li>Write <code>winner(player, computer)</code> that returns <code>"draw"</code>, <code>"player"</code> or <code>"computer"</code>.</li><li>Write a game loop: ask <code>rock, paper or scissors? </code>. If the user types <code>quit</code>, print the final score and stop. Otherwise pick a random computer move, print both moves and who won, and keep score in <code>player_score</code> and <code>computer_score</code>.</li></ol>`,
      starter: c`import random

beats = {"rock": "scissors", "scissors": "paper", "paper": "rock"}


def winner(player, computer):
    pass


player_score = 0
computer_score = 0
# game loop here
`,
      solution: c`import random

beats = {"rock": "scissors", "scissors": "paper", "paper": "rock"}


def winner(player, computer):
    if player == computer:
        return "draw"
    if beats[player] == computer:
        return "player"
    return "computer"


player_score = 0
computer_score = 0

while True:
    move = input("rock, paper or scissors? ").strip().lower()
    if move == "quit":
        print(f"Final score - You: {player_score}  Computer: {computer_score}")
        break
    if move not in beats:
        print("Please type rock, paper or scissors.")
        continue
    computer = random.choice(list(beats))
    print(f"You chose {move}, computer chose {computer}.")
    result = winner(move, computer)
    if result == "player":
        player_score += 1
        print("You win this round!")
    elif result == "computer":
        computer_score += 1
        print("Computer wins this round!")
    else:
        print("It's a draw!")`,
      inputs: ['rock', 'paper', 'scissors', 'rock', 'quit'],
      hints: ['In winner: first check <code>if player == computer: return "draw"</code>. Then <code>if beats[player] == computer: return "player"</code>. Otherwise return "computer".', 'Use <code>while True:</code>, read the move, <code>break</code> on "quit", pick <code>random.choice(list(beats))</code>, then update the scores.'],
      tests: [
        ['Draws are detected', c`assert winner('rock', 'rock') == 'draw' and winner('paper', 'paper') == 'draw'`],
        ['Player wins correctly', c`assert winner('rock', 'scissors') == 'player' and winner('paper', 'rock') == 'player' and winner('scissors', 'paper') == 'player'`],
        ['Computer wins correctly', c`assert winner('scissors', 'rock') == 'computer' and winner('rock', 'paper') == 'computer' and winner('paper', 'scissors') == 'computer'`],
        ['The game loop runs and stops on quit', c`assert isinstance(player_score, int) and isinstance(computer_score, int)
assert 0 <= player_score + computer_score <= 4, 'There were 4 rounds, so the scores should add up to at most 4.'
assert str(player_score) in output and str(computer_score) in output, 'Print the final score when the user types quit.'`],
      ],
    },
  },
  ],
},
];

const REFERENCE = [
  ['Output & comments', c`print("Hello")          # show text
print("Age:", 15)       # several items
print()                 # blank line
# this is a comment`],
  ['Variables & types', c`name = "Ada"        # str (text)
age = 15            # int (whole number)
height = 1.62       # float (decimal)
happy = True        # bool (True/False)
type(age)           # <class 'int'>
int("5")  float("2.5")  str(10)`],
  ['Maths', c`+  -  *  /       # add, subtract, multiply, divide
//               # whole-number divide  7 // 2 -> 3
%                # remainder           7 % 2  -> 1
**               # power               2 ** 3 -> 8
x += 1           # same as x = x + 1
round(3.14159, 2)   abs(-5)`],
  ['Input', c`name = input("Name? ")          # always a string
age = int(input("Age? "))       # whole number
price = float(input("Price? ")) # decimal`],
  ['Strings', c`s = "Python"
len(s)        # 6
s[0]  s[-1]   # 'P'  'n'
s[0:3]        # 'Pyt'
s.upper()  s.lower()  s.title()  s.strip()
s.replace("P", "J")   s.count("o")
"th" in s     # True
f"{name} is {age}"   f"{price:.2f}"`],
  ['Decisions', c`if score >= 70:
    print("A")
elif score >= 50:
    print("Pass")
else:
    print("Fail")

==  !=  <  >  <=  >=
and   or   not`],
  ['Loops', c`for i in range(5):          # 0,1,2,3,4
    print(i)
# range(1, 11)  -> 1..10
# range(0, 10, 2) -> 0,2,4,6,8

for letter in "hello":
    print(letter)

count = 0
while count < 10:
    count += 1

break       # leave the loop now
continue    # skip to the next turn`],
  ['Lists', c`nums = [3, 1, 2]
nums[0]          nums[-1]
nums.append(4)   nums.insert(0, 9)
nums.remove(1)   nums.pop()
nums.sort()      sorted(nums)
len(nums)  sum(nums)  max(nums)  min(nums)
for i, n in enumerate(nums):
[n * 2 for n in nums if n > 1]
"a b c".split()     " ".join(words)`],
  ['Functions', c`def area(w, h=1):
    """Return the area."""
    return w * h

area(3, 4)     # 12
area(5)        # 5 (h uses default)`],
  ['Dictionaries', c`d = {"name": "Zoe", "age": 15}
d["name"]           d.get("x", 0)
d["city"] = "Rhyl"  del d["age"]
"name" in d
for k, v in d.items():
d.keys()  d.values()`],
  ['Tuples & sets', c`point = (3, 4)
x, y = point          # unpacking
s = {1, 2, 3}
set([1, 1, 2])        # {1, 2}
a & b    a | b        # both / either`],
  ['Errors', c`try:
    n = int(input("Number: "))
except ValueError:
    print("Not a number!")

# Common: SyntaxError, NameError, TypeError,
# ValueError, IndexError, KeyError,
# ZeroDivisionError, IndentationError`],
  ['Modules', c`import random
random.randint(1, 6)
random.choice(["a", "b"])
random.shuffle(my_list)

import math
math.sqrt(16)   math.pi   math.floor(2.7)`],
  ['Files', c`with open("f.txt", "w") as f:   # write
    f.write("hello\n")

with open("f.txt", "a") as f:   # append
    f.write("more\n")

with open("f.txt") as f:        # read
    for line in f:
        print(line.strip())`],
  ['Classes', c`class Dog:
    def __init__(self, name):
        self.name = name
        self.tricks = []

    def learn(self, trick):
        self.tricks.append(trick)

rex = Dog("Rex")
rex.learn("sit")
print(rex.name, rex.tricks)`],
];

const GLOSSARY = [
  ['Algorithm', 'A step-by-step set of instructions to solve a problem.'],
  ['Argument', 'A value you pass into a function when you call it, e.g. the <code>5</code> in <code>double(5)</code>.'],
  ['Attribute', 'A variable that belongs to an object, e.g. <code>self.name</code>.'],
  ['Boolean', 'A value that is either <code>True</code> or <code>False</code>.'],
  ['Bug', 'A mistake in a program. Fixing bugs is called debugging.'],
  ['Class', 'A blueprint for creating objects.'],
  ['Comment', 'A note in code starting with <code>#</code> that Python ignores.'],
  ['Concatenation', 'Joining strings together with <code>+</code>.'],
  ['Condition', 'An expression that is True or False, used by <code>if</code> and <code>while</code>.'],
  ['Dictionary', 'A collection of key → value pairs, e.g. <code>{"name": "Zoe"}</code>.'],
  ['Float', 'A number with a decimal point, e.g. <code>3.5</code>.'],
  ['Function', 'A named, reusable block of code. Defined with <code>def</code>.'],
  ['Index', 'The position of an item in a string or list. Starts at 0.'],
  ['Indentation', 'Spaces at the start of a line. Python uses it to group code into blocks.'],
  ['Integer (int)', 'A whole number, e.g. <code>42</code>.'],
  ['Iteration', 'Repeating code with a loop. Each single repeat is also called an iteration.'],
  ['List', 'An ordered, changeable collection, e.g. <code>[1, 2, 3]</code>.'],
  ['Loop', 'Code that repeats: <code>for</code> or <code>while</code>.'],
  ['Method', 'A function that belongs to an object, called with a dot: <code>text.upper()</code>.'],
  ['Module', 'A file of ready-made Python code you can <code>import</code>.'],
  ['Object', 'A thing made from a class, with its own attributes and methods.'],
  ['Parameter', 'A variable in a function\'s definition that receives an argument.'],
  ['Return value', 'The value a function sends back with <code>return</code>.'],
  ['String (str)', 'A piece of text in quotes, e.g. <code>"hello"</code>.'],
  ['Syntax', 'The rules for how code must be written. Breaking them gives a SyntaxError.'],
  ['Tuple', 'An ordered collection that can\'t be changed, e.g. <code>(3, 4)</code>.'],
  ['Variable', 'A named storage box for a value.'],
];
