/* Game-making modules: drawing, animation, controls, collisions, mechanics,
 * arcade projects and the final "make your own game" module.
 * On this site, a program with a draw() and/or update() function becomes a game.
 * Ready to use: screen, keyboard, mouse, WIDTH (600), HEIGHT (400). */
(function () {
  const pre = t => `<pre class="static" style="background:var(--surface-2);padding:10px 14px;border-radius:8px">${t}</pre>`;
  const G = { game: true };

  /* =========================================================== */
  const m13 = {
    id: 'm13', title: 'Drawing with Code', icon: '🎨',
    desc: 'Leave text behind: draw shapes, colours, text and emoji on a game screen using coordinates.',
    lessons: [
    {
      id: 'canvas', title: 'The Game Screen & Coordinates', minutes: 15,
      blocks: [
        ['p', `Welcome to graphics! 🎨 From now on your programs can draw pictures and become real games. On this website, any program that has a function called <code>draw()</code> opens a <b>game screen</b>, and a ready-made object called <code>screen</code> lets you draw on it.`],
        ['code', c`def draw():
    screen.fill("skyblue")                         # background
    screen.rect(0, 300, 600, 100, "forestgreen")   # grass
    screen.circle(500, 80, 50, "gold")             # sun
    screen.rect(100, 190, 140, 110, "firebrick")   # a house`, G],
        ['tip', `Press <b>▶ Run</b>. The picture appears under the code. Change some of the numbers and run it again to see what each one does.`],
        ['h', 'Coordinates: finding your way around the screen'],
        ['p', `The screen is a grid of tiny dots called <b>pixels</b>. It's <b>600 pixels wide and 400 tall</b>. Every point has two numbers, <code>(x, y)</code>:`],
        ['list', [`<b>x</b> is how far <b>across</b> from the left edge.`, `<b>y</b> is how far <b>down</b> from the top edge.`, `So <code>(0, 0)</code> is the <b>top-left corner</b>, and <code>(600, 400)</code> is the bottom-right.`]],
        ['warn', `In maths class y usually goes <i>up</i>. On computer screens y goes <b>down</b>, so a bigger y means lower on the screen. This catches everyone out at first!`],
        ['p', `This program draws a labelled grid so you can see the coordinates:`],
        ['code', c`def draw():
    screen.fill("navy")
    for x in range(0, 600, 100):
        screen.line(x, 0, x, 400, "slateblue", 1)
        screen.text(str(x), x + 4, 4, 16, "white")
    for y in range(100, 400, 100):
        screen.line(0, y, 600, y, "slateblue", 1)
        screen.text(str(y), 4, y + 4, 16, "white")
    screen.circle(300, 200, 8, "yellow")
    screen.text("(300, 200)", 312, 190, 20, "yellow")`, G],
        ['h', 'Your first drawing commands'],
        ['list', [`<code>screen.fill(colour)</code> paints the whole screen one colour.`, `<code>screen.rect(x, y, width, height, colour)</code> draws a rectangle. <b>(x, y) is its top-left corner.</b>`, `<code>screen.circle(x, y, radius, colour)</code> draws a circle. <b>(x, y) is its centre.</b>`]],
        ['p', `Colours can be written as names in quotes: <code>"red"</code>, <code>"skyblue"</code>, <code>"gold"</code>, <code>"forestgreen"</code>, <code>"hotpink"</code> and about 140 more. They're the standard web colour names, so you can search online for "CSS colour names" to see them all.`],
        ['h', 'Order matters'],
        ['p', `Shapes are drawn in order, like a painter adding layers. Things drawn later appear <b>on top</b>. That's why <code>screen.fill()</code> always comes first: if you filled the screen last, it would cover everything!`],
        ['tip', `You never call <code>draw()</code> yourself. The website calls it for you about 60 times every second. That will matter a lot when things start moving in the next module. Press <b>⏹ Stop</b> to close the game screen.`],
        ['key', [`A program with a <code>draw()</code> function opens a game screen.`, `x goes across from the left; y goes <b>down</b> from the top. (0, 0) is the top-left.`, `<code>rect</code> uses the top-left corner; <code>circle</code> uses the centre.`, `Later drawings go on top of earlier ones.`]],
      ],
      quiz: [
        { q: 'Where is the point (0, 0) on the game screen?', options: ['The centre', 'The top-left corner', 'The bottom-left corner', 'The top-right corner'], answer: 1, explain: 'Coordinates start at the top-left: x goes right, y goes down.' },
        { q: 'A ball is at (100, 50). It moves to (100, 80). Which way did it move?', options: ['Up', 'Down', 'Left', 'Right'], answer: 1, explain: 'Bigger y means further down the screen.' },
        { q: 'In <code>screen.rect(10, 20, 50, 30, "red")</code>, what is (10, 20)?', options: ['The centre', 'The top-left corner', 'The width and height', 'The bottom-right corner'], answer: 1, explain: 'Rectangles are positioned by their top-left corner; then 50 wide and 30 tall.' },
        { q: 'What happens if <code>screen.fill("black")</code> is the LAST line of draw()?', options: ['Nothing different', 'The screen is all black, because it covers everything drawn before', 'It causes an error', 'Only the background changes'], answer: 1, explain: 'Each drawing goes on top of earlier ones, so a fill at the end hides everything.' },
      ],
      challenge: {
        game: true,
        task: `<p>Draw a <b>traffic light</b>:</p><ul><li>a dark rectangle for the box (try <code>"dimgray"</code>)</li><li>three circles stacked from top to bottom: <b>red</b> at the top, <b>orange</b> (or yellow) in the middle, and <b>green</b> at the bottom</li></ul><p>Press <b>▶ Run</b> to see it, then <b>✓ Check my code</b>.</p>`,
        starter: c`def draw():
    screen.fill("skyblue")
    # draw the box, then three circles
`,
        solution: c`def draw():
    screen.fill("skyblue")
    screen.rect(250, 50, 100, 280, "dimgray")
    screen.circle(300, 110, 35, "red")
    screen.circle(300, 190, 35, "orange")
    screen.circle(300, 270, 35, "green")`,
        hints: ['The box: <code>screen.rect(250, 50, 100, 280, "dimgray")</code>', 'Circles are placed by their centre. Keep x the same (300) and make y bigger for each one: 110, 190, 270.'],
        tests: [
          ['Draws a rectangle', c`assert shapes('rect'), 'Use screen.rect() for the box.'`],
          ['Has red, orange/yellow and green circles', c`cols = [c[4] for c in shapes('circle')]
assert 'red' in cols, 'No red circle found (use the colour "red").'
assert 'green' in cols, 'No green circle found (use the colour "green").'
assert any(x in cols for x in ['orange', 'yellow', 'gold', 'darkorange', 'amber']), 'No orange or yellow circle found.'`],
          ['Red is on top, green at the bottom', c`cs = shapes('circle')
y = {}
for c in cs:
    y.setdefault(c[4], c[2])
mid = next(y[k] for k in ['orange', 'yellow', 'gold', 'darkorange', 'amber'] if k in y)
assert y['red'] < mid < y['green'], 'Remember: smaller y is higher up. Red needs the smallest y, green the biggest.'`],
        ],
      },
    },
    {
      id: 'shapes-colours', title: 'Shapes, Lines & Colours', minutes: 15,
      blocks: [
        ['p', `Let's add more to your toolbox: lines, outlines, triangles (and any other shape), text and colours you mix yourself.`],
        ['code', c`def draw():
    screen.fill((30, 30, 60))                                   # an RGB colour
    screen.line(50, 350, 550, 350, "white", 4)                  # x1, y1, x2, y2, colour, thickness
    screen.polygon([(300, 60), (200, 220), (400, 220)], "orange")  # a triangle
    screen.rect(220, 230, 160, 110, "lightblue", 4)             # outline=4: just the edge
    screen.circle(300, 150, 30, (255, 0, 120), 6)               # an outlined circle
    screen.text("Shapes!", 20, 20, 36, "white")                 # text, x, y, size, colour`, G],
        ['h', 'Every drawing command'],
        ['list', [
          `<code>screen.line(x1, y1, x2, y2, colour, width)</code> draws a straight line from one point to another.`,
          `<code>screen.polygon(points, colour)</code> draws a shape through a <b>list of (x, y) points</b>. Three points make a triangle, four a quadrilateral, and so on.`,
          `<code>screen.text(words, x, y, size, colour)</code> writes text with its top-left at (x, y).`,
          `Add a number at the end of <code>rect</code>, <code>circle</code> or <code>polygon</code> to draw just an <b>outline</b> that many pixels thick.`]],
        ['h', 'Mixing your own colours with RGB'],
        ['p', `Screens make every colour by mixing <b>red</b>, <b>green</b> and <b>blue</b> light. You can give a colour as three numbers from 0 to 255 inside brackets, a <b>tuple</b> <code>(red, green, blue)</code>:`],
        ['list', [`<code>(255, 0, 0)</code> is pure red, <code>(0, 255, 0)</code> green, <code>(0, 0, 255)</code> blue`, `<code>(255, 255, 0)</code> is yellow (red + green light make yellow!)`, `<code>(0, 0, 0)</code> is black (no light), <code>(255, 255, 255)</code> is white (all the light)`]],
        ['code', c`def draw():
    for i in range(60):
        screen.rect(i * 10, 0, 10, 400, (i * 4, 100, 255 - i * 4))
    screen.text("A colour gradient made by a loop", 20, 180, 28, "white")`, G],
        ['p', `That loop draws 60 thin strips, each a little more red and a little less blue than the last. Being able to calculate colours like this is a big advantage of RGB.`],
        ['key', [`<code>line</code>, <code>polygon</code> and <code>text</code> join <code>rect</code> and <code>circle</code>.`, `A polygon takes a list of (x, y) points.`, `A final number draws an outline instead of a filled shape.`, `RGB colours are (red, green, blue) from 0 to 255.`]],
      ],
      quiz: [
        { q: 'What colour is <code>(0, 0, 0)</code>?', options: ['White', 'Black', 'Grey', 'Red'], answer: 1, explain: 'No red, no green, no blue light at all is black.' },
        { q: 'How many points does a triangle need in <code>screen.polygon()</code>?', options: ['2', '3', '4', '6'], answer: 1, explain: 'Three corners, three (x, y) points.' },
        { q: 'What does <code>screen.circle(100, 100, 40, "red", 5)</code> draw?', options: ['A filled red circle', 'A red ring 5 pixels thick', '5 red circles', 'A circle of radius 5'], answer: 1, explain: 'The last number is the outline thickness, so only the edge is drawn.' },
      ],
      challenge: {
        game: true,
        task: `<p>Draw a <b>house</b> with:</p><ul><li>a rectangle for the walls and another for the door</li><li>a <b>triangle</b> roof made with <code>screen.polygon()</code></li><li>a window that has an <b>outline</b></li><li>a <b>text</b> label (like "Home")</li><li>at least one colour written as an <b>RGB tuple</b>, e.g. <code>(200, 120, 80)</code></li></ul>`,
        starter: c`def draw():
    screen.fill("skyblue")
    screen.rect(0, 320, 600, 80, "forestgreen")
`,
        solution: c`def draw():
    screen.fill("skyblue")
    screen.rect(0, 320, 600, 80, "forestgreen")
    screen.rect(200, 180, 200, 140, (200, 120, 80))                 # walls
    screen.polygon([(180, 180), (300, 90), (420, 180)], "darkred")  # roof
    screen.rect(280, 240, 40, 80, "saddlebrown")                    # door
    screen.rect(220, 200, 45, 40, "lightyellow")                    # window
    screen.rect(220, 200, 45, 40, "white", 3)                       # window frame
    screen.text("Home", 20, 20, 32, "white")`,
        hints: ['Roof: <code>screen.polygon([(180, 180), (300, 90), (420, 180)], "darkred")</code>. That\'s left corner, top point, right corner.', 'An outlined window: <code>screen.rect(220, 200, 45, 40, "white", 3)</code>. An RGB colour looks like <code>(200, 120, 80)</code> with no quotes.'],
        tests: [
          ['Has at least 3 rectangles (ground or walls, door, window)', c`assert len(shapes('rect')) >= 3, 'Found %d rectangle(s).' % len(shapes('rect'))`],
          ['Has a triangle roof', c`assert any(len(p[1]) == 3 for p in shapes('polygon')), 'Draw a polygon with exactly 3 points.'`],
          ['Something has an outline', c`d = drawn()
assert any((k[0] == 'rect' and k[6] > 0) or (k[0] == 'circle' and k[5] > 0) or (k[0] == 'poly' and k[3] > 0) for k in d), 'Add an outline thickness as the last number, e.g. screen.rect(220, 200, 45, 40, "white", 3).'`],
          ['Has a text label', c`assert shapes('text'), 'Use screen.text().'`],
          ['Uses an RGB colour', c`assert any('rgb(' in str(k) for k in drawn()), 'Use a colour like (200, 120, 80).'`],
        ],
      },
    },
    {
      id: 'drawing-loops', title: 'Drawing with Loops & Functions', minutes: 15,
      blocks: [
        ['p', `Drawing every object by hand gets repetitive. Good news: everything you've learned about loops and functions works for drawing too.`],
        ['h', 'Loops draw lots of things'],
        ['code', c`def draw():
    screen.fill("black")
    for i in range(10):
        screen.circle(40 + i * 58, 200, 20, "orange")
    for row in range(5):
        for col in range(12):
            screen.rect(20 + col * 48, 260 + row * 24, 40, 18, "royalblue")`, G],
        ['p', `The first loop draws 10 circles, each 58 pixels further right. The nested loops draw a wall of 60 bricks. Imagine typing all those out by hand!`],
        ['h', 'Functions are like stamps'],
        ['p', `Write a function that draws one object <b>at whatever position you give it</b>, then use it as many times as you like:`],
        ['code', c`def draw_cloud(x, y):
    screen.circle(x, y, 30, "white")
    screen.circle(x + 35, y - 15, 35, "white")
    screen.circle(x + 70, y, 30, "white")


def draw():
    screen.fill("skyblue")
    draw_cloud(60, 100)
    draw_cloud(300, 60)
    draw_cloud(420, 160)`, G],
        ['p', `Every shape inside <code>draw_cloud</code> is positioned <i>relative to</i> x and y. Change x and y, and the whole cloud moves together.`],
        ['h', 'Random positions: choose them once'],
        ['code', c`import random

stars = []
for i in range(120):
    stars.append((random.randint(0, 600), random.randint(0, 400)))


def draw():
    screen.fill("black")
    for x, y in stars:
        screen.circle(x, y, 2, "white")`, G],
        ['warn', `Pick random positions <b>once</b>, at the top of the program, and store them in a list. If you called <code>random.randint</code> inside <code>draw()</code>, the stars would jump to new places 60 times a second and flicker like mad. (Try it and see!)`],
        ['key', [`Loops can draw rows, columns and grids of shapes.`, `A drawing function with x and y parameters works like a stamp.`, `Position shapes relative to the x and y parameters.`, `Choose random positions once and store them in a list.`]],
      ],
      quiz: [
        { q: 'Why store random star positions in a list at the top instead of choosing them inside draw()?', options: ['Lists are faster to type', 'draw() runs 60 times a second, so the stars would jump around and flicker', 'random doesn\'t work inside functions', 'It uses less colour'], answer: 1, explain: 'Each call to draw() would pick new random places, so the picture would change constantly.' },
        { q: 'With <code>screen.circle(40 + i * 58, 200, 20, "orange")</code> in <code>for i in range(10)</code>, what is the x of the last circle?', options: ['580', '562', '598', '522'], answer: 1, explain: 'The last i is 9: 40 + 9 × 58 = 562.' },
      ],
      challenge: {
        game: true,
        task: `<ol><li>Write a function <code>draw_tree(x, y)</code> that draws a tree at (x, y): a brown rectangle trunk and a green circle of leaves. Position both shapes using x and y.</li><li>In <code>draw()</code>, use a <b>for loop</b> to draw at least <b>5 trees</b> in a row across the screen.</li></ol>`,
        starter: c`def draw_tree(x, y):
    pass


def draw():
    screen.fill("skyblue")
    screen.rect(0, 300, 600, 100, "green")
`,
        solution: c`def draw_tree(x, y):
    screen.rect(x - 10, y, 20, 60, "saddlebrown")   # trunk
    screen.circle(x, y, 40, "forestgreen")          # leaves


def draw():
    screen.fill("skyblue")
    screen.rect(0, 300, 600, 100, "green")
    for i in range(5):
        draw_tree(80 + i * 110, 240)`,
        hints: ['Inside draw_tree: <code>screen.rect(x - 10, y, 20, 60, "saddlebrown")</code> and <code>screen.circle(x, y, 40, "forestgreen")</code>.', 'In draw(): <code>for i in range(5):</code> then <code>draw_tree(80 + i * 110, 240)</code>.'],
        tests: [
          ['draw_tree draws a rectangle and a circle', c`k = [s[0] for s in draws_of(draw_tree, 100, 200)]
assert 'rect' in k and 'circle' in k, 'draw_tree should draw a rect (trunk) and a circle (leaves). It drew: %s' % k`],
          ['draw_tree uses x and y', c`a = draws_of(draw_tree, 100, 200); b = draws_of(draw_tree, 300, 250)
assert a != b, 'The tree should be drawn in a different place when x and y change.'`],
          ['draw() draws at least 5 trees', c`assert len(shapes('circle')) >= 5, 'Found %d circle(s).' % len(shapes('circle'))`],
          ['Uses a for loop', c`assert 'for ' in source`],
        ],
      },
    },
    {
      id: 'emoji-text', title: 'Emoji Sprites & Text', minutes: 12,
      blocks: [
        ['p', `In games, a picture of a character or object is called a <b>sprite</b>. Drawing detailed sprites with circles and rectangles takes ages, so this website gives you a shortcut: <b>emoji</b>! There are thousands of ready-made pictures, from 🐱 and 🚀 to 🍕 and 👾.`],
        ['code', c`def draw():
    screen.fill("lightgreen")
    screen.emoji("🌳", 100, 150, 140)
    screen.emoji("🐶", 300, 300, 80)
    screen.emoji("⚽", 400, 330, 40)
    screen.text("Park Life", WIDTH / 2, 40, 40, "darkgreen", center=True)`, G],
        ['list', [`<code>screen.emoji(symbol, x, y, size)</code> draws an emoji <b>centred</b> on (x, y), <code>size</code> pixels tall.`, `<code>WIDTH</code> and <code>HEIGHT</code> are ready-made variables holding the screen size, so <code>WIDTH / 2</code> is the middle.`, `<code>center=True</code> centres text on (x, y) instead of using its top-left corner. (That's a keyword argument!)`]],
        ['tip', `On Windows press <b>Windows key + .</b> and on a Mac press <b>Ctrl + Cmd + Space</b> to open an emoji picker. Emoji look slightly different on different devices, but they always work.`],
        ['h', 'Showing numbers with f-strings'],
        ['p', `Games show changing information: score, lives, time. Use an f-string inside <code>screen.text</code>:`],
        ['code', c`score = 1250
lives = 3


def draw():
    screen.fill("black")
    screen.text(f"Score: {score}", 10, 10, 28, "white")
    screen.text("❤️" * lives, WIDTH - 120, 10, 28, "red")
    screen.text("GAME ON!", WIDTH / 2, HEIGHT / 2, 64, "gold", center=True)`, G],
        ['h', 'Changing the screen size'],
        ['p', `Want a bigger or differently shaped screen? Set <code>WIDTH</code> and <code>HEIGHT</code> at the top of your program:`],
        ['code', c`WIDTH = 400
HEIGHT = 500


def draw():
    screen.fill("purple")
    screen.text(f"{WIDTH} x {HEIGHT}", WIDTH / 2, HEIGHT / 2, 40, "white", center=True)`, G],
        ['key', [`<code>screen.emoji(symbol, x, y, size)</code> draws an emoji centred on (x, y).`, `<code>WIDTH</code> and <code>HEIGHT</code> hold the screen size; set them to change it.`, `<code>center=True</code> centres text.`, `Use f-strings to show scores and other numbers.`]],
      ],
      quiz: [
        { q: 'Which point does <code>screen.emoji("🐱", 200, 100, 50)</code> put the cat\'s centre on?', options: ['(0, 0)', '(200, 100)', '(225, 125)', '(50, 50)'], answer: 1, explain: 'Emoji are centred on the x and y you give.' },
        { q: 'How do you put text exactly in the middle of the screen?', options: ['<code>screen.text("Hi", 300, 200)</code>', '<code>screen.text("Hi", WIDTH / 2, HEIGHT / 2, center=True)</code>', '<code>screen.text("Hi", center)</code>', '<code>screen.center("Hi")</code>'], answer: 1, explain: 'WIDTH / 2, HEIGHT / 2 is the middle, and center=True centres the text on that point.' },
      ],
      challenge: {
        game: true,
        task: `<p>Make a <b>title screen</b> for a space game:</p><ul><li>a dark background</li><li>the title <code>SPACE ADVENTURE</code>, centred horizontally (use <code>WIDTH / 2</code> and <code>center=True</code>)</li><li>a rocket (or any) emoji</li><li>a second line of text saying <code>Press SPACE to start</code></li></ul>`,
        starter: c`def draw():
    screen.fill("midnightblue")
`,
        solution: c`def draw():
    screen.fill("midnightblue")
    screen.text("SPACE ADVENTURE", WIDTH / 2, 80, 48, "gold", center=True)
    screen.emoji("🚀", WIDTH / 2, 210, 100)
    screen.text("Press SPACE to start", WIDTH / 2, 330, 24, "white", center=True)`,
        hints: ['<code>screen.text("SPACE ADVENTURE", WIDTH / 2, 80, 48, "gold", center=True)</code>', '<code>screen.emoji("🚀", WIDTH / 2, 210, 100)</code> and another screen.text for the instructions.'],
        tests: [
          ['Shows the title', c`assert 'space adventure' in texts().lower(), 'Write the title SPACE ADVENTURE with screen.text().'`],
          ['The title is centred', c`t = [k for k in shapes('text') if 'space adventure' in k[1].lower()][0]
assert t[6] is True, 'Add center=True to the title.'
assert approx(t[2], g['WIDTH'] / 2, 1), 'Use WIDTH / 2 for the title\'s x.'`],
          ['Has an emoji', c`assert shapes('emoji'), 'Use screen.emoji().'`],
          ['Tells the player how to start', c`assert 'press space' in texts().lower(), 'Add the text "Press SPACE to start".'`],
        ],
      },
    },
    ],
  };

  /* =========================================================== */
  const m14 = {
    id: 'm14', title: 'Animation', icon: '🎬',
    desc: 'Make things move with the game loop: update() and draw(), speed, bouncing, and animating lots of objects.',
    lessons: [
    {
      id: 'game-loop', title: 'The Game Loop: update() & draw()', minutes: 15,
      blocks: [
        ['p', `Every video game, from tiny phone games to huge console games, runs a <b>game loop</b>. Many times every second it does three jobs:`],
        ['steps', [`<b>Check input:</b> what keys are pressed? Where did the player click?`, `<b>Update:</b> move things, check for collisions, change the score.`, `<b>Draw:</b> clear the screen and draw everything in its new position.`]],
        ['p', `Each trip around the loop is called a <b>frame</b>. Here the loop runs about <b>60 frames per second</b>. That's fast enough that small changes each frame look like smooth movement, exactly like a flip-book.`],
        ['p', `You write two functions, and the website calls them for you every frame:`],
        ['list', [`<code>update()</code> changes the game's variables.`, `<code>draw()</code> draws everything using those variables.`]],
        ['code', c`x = 0


def update():
    global x
    x += 2
    if x > WIDTH:
        x = 0


def draw():
    screen.fill("black")
    screen.circle(x, 200, 30, "orange")`, G],
        ['p', `Every frame, <code>update()</code> adds 2 to x, then <code>draw()</code> draws the circle at the new x. 2 pixels × 60 frames = 120 pixels every second. When it goes off the right edge, we put it back at 0.`],
        ['h', 'The global keyword'],
        ['p', `<code>x</code> is created at the top of the program, outside any function. Normally, if a function <b>assigns</b> to a variable, Python makes a brand new <i>local</i> variable just for that function. The line <code>global x</code> tells Python: "when I change x in here, I mean the x from the top of the program."`],
        ['code', c`score = 0

def add_point():
    score += 1      # error! Python thinks score is a new local variable

add_point()`, { error: true, title: 'Without global' }],
        ['code', c`score = 0

def add_point():
    global score    # use the score from outside
    score += 1

add_point()
add_point()
print(score)`, { title: 'With global' }],
        ['tip', `You only need <code>global</code> when a function <b>changes</b> a variable with <code>=</code>, <code>+=</code> and so on. Just <i>reading</i> it (like <code>draw()</code> does) works without it. List one or several names: <code>global x, y, score</code>.`],
        ['warn', `In bigger programs, professional programmers avoid lots of global variables (classes are the usual alternative, and you'll use them for game objects soon). For small games, a few globals keep things simple and easy to read.`],
        ['key', [`A game loop runs update() then draw() about 60 times a second.`, `Each run is one frame. Small changes per frame look like smooth motion.`, `Keep the game's state in variables at the top of the program.`, `Use <code>global name</code> in a function that changes a top-level variable.`]],
      ],
      quiz: [
        { q: 'About how many times a second are update() and draw() called here?', options: ['1', '10', '60', '1000'], answer: 2, explain: 'Around 60 frames per second, which is the same as most screens refresh.' },
        { q: 'If a car moves 3 pixels every frame, how far does it move in 2 seconds?', options: ['6 pixels', '60 pixels', '180 pixels', '360 pixels'], answer: 3, explain: '3 pixels × 60 frames × 2 seconds = 360 pixels.' },
        { q: 'Why does update() need <code>global x</code>?', options: ['To make x faster', 'Because update changes x, and x was created outside the function', 'To print x', 'Every function needs it'], answer: 1, explain: 'Assigning to a variable inside a function makes a new local one unless you say global.' },
      ],
      challenge: {
        game: true,
        task: `<p>Make a car drive across the screen:</p><ol><li>Create a variable <code>car_x</code> starting at 0.</li><li>In <code>update()</code>, add <b>3</b> to <code>car_x</code> every frame. When <code>car_x</code> goes past <code>WIDTH</code>, put it back to <code>-50</code> (just off the left side) so it drives round again.</li><li>In <code>draw()</code>, draw the car (an emoji like 🚗, or shapes) at <code>car_x</code>.</li></ol>`,
        starter: c`car_x = 0


def update():
    pass


def draw():
    screen.fill("gray")
    screen.rect(0, 250, WIDTH, 60, "dimgray")
`,
        solution: c`car_x = 0


def update():
    global car_x
    car_x += 3
    if car_x > WIDTH:
        car_x = -50


def draw():
    screen.fill("gray")
    screen.rect(0, 250, WIDTH, 60, "dimgray")
    screen.emoji("🚗", car_x, 270, 60)`,
        hints: ['Start update() with <code>global car_x</code>, then <code>car_x += 3</code>.', 'Then <code>if car_x > WIDTH:</code> set <code>car_x = -50</code>. In draw: <code>screen.emoji("🚗", car_x, 270, 60)</code>.'],
        tests: [
          ['update() moves the car 3 pixels', c`g['car_x'] = 100; frames(1)
assert g['car_x'] == 103, 'After one update car_x went from 100 to %r' % g['car_x']`],
          ['The car wraps back round', c`g['car_x'] = g['WIDTH'] + 10; frames(1)
assert g['car_x'] <= 0, 'When car_x passes WIDTH it should go back to -50. It is %r' % g['car_x']`],
          ['draw() uses car_x', c`g['car_x'] = 200; a = drawn(); g['car_x'] = 350; b = drawn()
assert a != b, 'Draw the car at car_x so it moves.'`],
        ],
      },
    },
    {
      id: 'bounce', title: 'Speed & Bouncing', minutes: 15,
      blocks: [
        ['p', `Rather than writing <code>x += 3</code>, games usually store the speed in a variable. A speed with a direction is called a <b>velocity</b>. With separate speeds for x and y, an object can move in any direction.`],
        ['code', c`ball_x = 100
ball_y = 100
speed_x = 4      # 4 pixels right each frame
speed_y = 2      # 2 pixels down each frame


def update():
    global ball_x, ball_y
    ball_x += speed_x
    ball_y += speed_y


def draw():
    screen.fill("black")
    screen.circle(ball_x, ball_y, 20, "tomato")`, G],
        ['p', `It flies off the screen! To bounce, check whether the ball has reached an edge, and if so <b>flip the speed</b>: a positive speed becomes negative and the ball heads back.`],
        ['code', c`RADIUS = 20
ball_x = 100
ball_y = 100
speed_x = 4
speed_y = 3
colour = "tomato"


def update():
    global ball_x, ball_y, speed_x, speed_y, colour
    ball_x += speed_x
    ball_y += speed_y
    if ball_x > WIDTH - RADIUS or ball_x < RADIUS:
        speed_x = -speed_x
        colour = "gold"
    if ball_y > HEIGHT - RADIUS or ball_y < RADIUS:
        speed_y = -speed_y
        colour = "deepskyblue"


def draw():
    screen.fill("black")
    screen.circle(ball_x, ball_y, RADIUS, colour)`, G],
        ['p', `Why <code>WIDTH - RADIUS</code>? The ball's x is its <b>centre</b>. Its right edge touches the wall when the centre is one radius away from it.`],
        ['tip', `<code>RADIUS</code> is in capitals because it never changes. Python programmers write <b>constants</b> in CAPITALS so everyone can tell they're settings rather than things that change during the game.`],
        ['key', [`Store speed in variables (velocity) like <code>speed_x</code> and <code>speed_y</code>.`, `Each frame: <code>x += speed_x</code>.`, `Bounce by flipping the sign: <code>speed_x = -speed_x</code>.`, `Remember the object's size when checking the edges.`]],
      ],
      quiz: [
        { q: 'A ball has <code>speed_x = -5</code>. Which way is it moving?', options: ['Right', 'Left', 'Up', 'Down'], answer: 1, explain: 'Negative x speed makes x smaller every frame, so it moves left.' },
        { q: 'What does <code>speed_y = -speed_y</code> do when speed_y is 3?', options: ['Makes it 0', 'Makes it -3, so the ball reverses', 'Makes it 6', 'Nothing'], answer: 1, explain: 'It flips the direction while keeping the same speed.' },
      ],
      challenge: {
        game: true,
        task: `<p>Make a ball bounce around all four walls. Use these exact variable names:</p><ul><li><code>ball_x</code>, <code>ball_y</code> (the centre) and <code>speed_x</code>, <code>speed_y</code></li><li><code>RADIUS = 20</code></li></ul><p>In <code>update()</code>, move the ball by its speeds, and reverse <code>speed_x</code> when it hits the left or right wall, and <code>speed_y</code> when it hits the top or bottom. Draw it as a circle.</p>`,
        starter: c`RADIUS = 20
ball_x = 300
ball_y = 200
speed_x = 4
speed_y = 3


def update():
    pass


def draw():
    screen.fill("black")
`,
        solution: c`RADIUS = 20
ball_x = 300
ball_y = 200
speed_x = 4
speed_y = 3


def update():
    global ball_x, ball_y, speed_x, speed_y
    ball_x += speed_x
    ball_y += speed_y
    if ball_x > WIDTH - RADIUS or ball_x < RADIUS:
        speed_x = -speed_x
    if ball_y > HEIGHT - RADIUS or ball_y < RADIUS:
        speed_y = -speed_y


def draw():
    screen.fill("black")
    screen.circle(ball_x, ball_y, RADIUS, "tomato")`,
        hints: ['update() needs <code>global ball_x, ball_y, speed_x, speed_y</code>, then <code>ball_x += speed_x</code> and <code>ball_y += speed_y</code>.', 'Bounce: <code>if ball_x > WIDTH - RADIUS or ball_x &lt; RADIUS: speed_x = -speed_x</code>, and the same idea for y with HEIGHT.'],
        tests: [
          ['The ball moves by its speed', c`g.update(ball_x=300, ball_y=200, speed_x=4, speed_y=3); frames(1)
assert (g['ball_x'], g['ball_y']) == (304, 203), 'Ball moved to (%r, %r)' % (g['ball_x'], g['ball_y'])`],
          ['Bounces off the right wall', c`g.update(ball_x=g['WIDTH'] - 5, ball_y=200, speed_x=4, speed_y=3); frames(1)
assert g['speed_x'] < 0, 'speed_x should become negative at the right wall.'`],
          ['Bounces off the left wall', c`g.update(ball_x=5, ball_y=200, speed_x=-4, speed_y=3); frames(1)
assert g['speed_x'] > 0, 'speed_x should become positive at the left wall.'`],
          ['Bounces off the bottom', c`g.update(ball_x=300, ball_y=g['HEIGHT'] - 5, speed_x=4, speed_y=3); frames(1)
assert g['speed_y'] < 0, 'speed_y should become negative at the bottom.'`],
          ['Bounces off the top', c`g.update(ball_x=300, ball_y=5, speed_x=4, speed_y=-3); frames(1)
assert g['speed_y'] > 0, 'speed_y should become positive at the top.'`],
          ['Draws the ball', c`assert shapes('circle'), 'Draw the ball with screen.circle(ball_x, ball_y, RADIUS, ...).'`],
        ],
      },
    },
    {
      id: 'many-things', title: 'Animating Lots of Things', minutes: 15,
      blocks: [
        ['p', `One moving ball is fun. Fifty is a snowstorm! ❄️ To animate many objects, store each one as a <b>dictionary</b> in a <b>list</b>, then loop through the list in both <code>update()</code> and <code>draw()</code>.`],
        ['code', c`import random

flakes = []
for i in range(80):
    flakes.append({
        "x": random.randint(0, WIDTH),
        "y": random.randint(0, HEIGHT),
        "speed": random.randint(1, 3),
        "size": random.randint(2, 5),
    })


def update():
    for f in flakes:
        f["y"] += f["speed"]
        if f["y"] > HEIGHT:
            f["y"] = 0
            f["x"] = random.randint(0, WIDTH)


def draw():
    screen.fill("midnightblue")
    for f in flakes:
        screen.circle(f["x"], f["y"], f["size"], "white")`, G],
        ['p', `Each flake remembers its own position, speed and size. Flakes with different speeds make the scene look deep and natural.`],
        ['tip', `Why no <code>global</code> here? <code>update()</code> never <b>replaces</b> the <code>flakes</code> list. It only changes things <i>inside</i> it. You need global only when you assign a new value to the variable itself (like <code>flakes = []</code>).`],
        ['h', 'Recycling objects'],
        ['p', `When a flake falls off the bottom, we move it back to the top instead of making a new one. Recycling like this means the list never grows, so the game stays fast no matter how long it runs.`],
        ['key', [`Store many game objects as dictionaries in a list.`, `Loop through the list in update() to move them and in draw() to draw them.`, `Changing items inside a list doesn't need global; replacing the list does.`, `Recycle objects that leave the screen.`]],
      ],
      quiz: [
        { q: 'Does this update() need <code>global flakes</code>?', code: c`def update():
    for f in flakes:
        f["y"] += 2`, options: ['Yes, always', 'No, because it only changes things inside the list, not the variable itself', 'Only if there are more than 10 flakes', 'Only in draw()'], answer: 1, explain: 'global is needed only when you assign to the variable itself, like flakes = [].' },
      ],
      challenge: {
        game: true,
        task: `<p>Make it snow!</p><ol><li>Create a list called <code>flakes</code> containing at least <b>50</b> dictionaries, each with keys <code>"x"</code>, <code>"y"</code> and <code>"speed"</code>.</li><li>In <code>update()</code>, move every flake down by its speed. When a flake's y goes past <code>HEIGHT</code>, put it back at the top (<code>y = 0</code>) with a new random x.</li><li>In <code>draw()</code>, draw every flake as a small white circle.</li></ol>`,
        starter: c`import random

flakes = []


def update():
    pass


def draw():
    screen.fill("midnightblue")
`,
        solution: c`import random

flakes = []
for i in range(60):
    flakes.append({"x": random.randint(0, WIDTH), "y": random.randint(0, HEIGHT), "speed": random.randint(1, 3)})


def update():
    for f in flakes:
        f["y"] += f["speed"]
        if f["y"] > HEIGHT:
            f["y"] = 0
            f["x"] = random.randint(0, WIDTH)


def draw():
    screen.fill("midnightblue")
    for f in flakes:
        screen.circle(f["x"], f["y"], 3, "white")`,
        hints: ['Fill the list with a loop: <code>for i in range(60): flakes.append({"x": random.randint(0, WIDTH), "y": random.randint(0, HEIGHT), "speed": random.randint(1, 3)})</code>', 'In update: <code>for f in flakes:</code>, then <code>f["y"] += f["speed"]</code>, then check <code>if f["y"] > HEIGHT:</code>'],
        tests: [
          ['flakes has 50+ dictionaries', c`fl = g['flakes']
assert isinstance(fl, list) and len(fl) >= 50, 'flakes has %d items.' % len(fl)
assert all(isinstance(f, dict) and {'x', 'y', 'speed'} <= set(f) for f in fl), 'Each flake needs "x", "y" and "speed".'`],
          ['Flakes fall by their speed', c`g['flakes'] = [{'x': 10, 'y': 100, 'speed': 2}]; frames(1)
assert g['flakes'][0]['y'] == 102, 'y went from 100 to %r' % g['flakes'][0]['y']`],
          ['Flakes go back to the top', c`g['flakes'] = [{'x': 10, 'y': g['HEIGHT'] + 5, 'speed': 2}]; frames(1)
assert g['flakes'][0]['y'] <= 0, 'A flake below the screen should move back to y = 0.'`],
          ['Every flake is drawn', c`g['flakes'] = [{'x': 10, 'y': 50, 'speed': 1}, {'x': 20, 'y': 60, 'speed': 1}, {'x': 30, 'y': 70, 'speed': 1}]
assert len(shapes('circle')) >= 3, 'Loop over flakes in draw() and draw a circle for each.'`],
        ],
      },
    },
    ],
  };

  /* =========================================================== */
  const m15 = {
    id: 'm15', title: 'Player Controls', icon: '🕹️',
    desc: 'Let the player take control with the keyboard and mouse.',
    lessons: [
    {
      id: 'keyboard', title: 'Keyboard Controls', minutes: 15,
      blocks: [
        ['p', `A game isn't a game until the player can control something! The ready-made <code>keyboard</code> object tells you which keys are <b>being held down right now</b>:`],
        ['code', c`x = 300
y = 200


def update():
    global x, y
    if keyboard.left:
        x -= 4
    if keyboard.right:
        x += 4
    if keyboard.up:
        y -= 4
    if keyboard.down:
        y += 4


def draw():
    screen.fill("darkslategray")
    screen.emoji("🐢", x, y, 60)
    screen.text("Click the game, then use the arrow keys", 10, 10, 20, "white")`, G],
        ['tip', `<b>Click the game screen first</b> so it receives your key presses (a yellow border shows it's listening). On a phone or tablet, use the on-screen arrow buttons.`],
        ['p', `Key names you can use: <code>keyboard.left</code>, <code>.right</code>, <code>.up</code>, <code>.down</code>, <code>.space</code>, <code>.enter</code>, and any letter or number like <code>keyboard.w</code> or <code>keyboard.a</code>. For digits use square brackets: <code>keyboard["1"]</code>.`],
        ['p', `We use separate <code>if</code>s (not <code>elif</code>) so the player can hold two keys at once and move diagonally.`],
        ['h', 'Staying on the screen'],
        ['p', `Without limits the turtle can wander off the screen forever. A neat trick is to <b>clamp</b> the position between a lowest and highest value with <code>max</code> and <code>min</code>:`],
        ['code', c`x = 650                          # too far right!
x = max(0, min(x, WIDTH - 40))
print(x)

x = -30                          # too far left!
x = max(0, min(x, WIDTH - 40))
print(x)`],
        ['p', `Read it from the inside out: <code>min(x, WIDTH - 40)</code> stops x going above <code>WIDTH - 40</code>, then <code>max(0, ...)</code> stops it going below 0. (We take 40 off because a 40-pixel-wide player at <code>WIDTH - 40</code> exactly touches the right edge.)`],
        ['key', [`<code>keyboard.left</code> etc. are True while a key is held.`, `Use separate ifs so several keys can work together.`, `Clamp positions with <code>max(low, min(value, high))</code>.`]],
      ],
      quiz: [
        { q: 'Why use separate <code>if</code>s rather than <code>elif</code> for the arrow keys?', options: ['elif is slower', 'So the player can hold two keys at once (e.g. up and right) and move diagonally', 'elif doesn\'t work with keyboard', 'It doesn\'t matter'], answer: 1, explain: 'With elif, only the first matching key would ever be handled.' },
        { q: 'What is <code>max(0, min(650, 560))</code>?', options: ['0', '560', '650', '90'], answer: 1, explain: 'min(650, 560) is 560, and max(0, 560) is 560. The value was clamped to the maximum.' },
      ],
      challenge: {
        game: true,
        task: `<p>Make a player square you can move with the <b>arrow keys</b>:</p><ul><li>Use <code>player_x</code>, <code>player_y</code> (the top-left of a 40 × 40 square) and <code>SPEED = 5</code>.</li><li>Each arrow key moves the player 5 pixels in its direction.</li><li>The square must always stay <b>completely</b> on the screen.</li></ul>`,
        starter: c`SIZE = 40
SPEED = 5
player_x = 280
player_y = 180


def update():
    pass


def draw():
    screen.fill("darkslategray")
    screen.rect(player_x, player_y, SIZE, SIZE, "gold")
`,
        solution: c`SIZE = 40
SPEED = 5
player_x = 280
player_y = 180


def update():
    global player_x, player_y
    if keyboard.left:
        player_x -= SPEED
    if keyboard.right:
        player_x += SPEED
    if keyboard.up:
        player_y -= SPEED
    if keyboard.down:
        player_y += SPEED
    player_x = max(0, min(player_x, WIDTH - SIZE))
    player_y = max(0, min(player_y, HEIGHT - SIZE))


def draw():
    screen.fill("darkslategray")
    screen.rect(player_x, player_y, SIZE, SIZE, "gold")`,
        hints: ['Start with <code>global player_x, player_y</code>, then four ifs: <code>if keyboard.left: player_x -= SPEED</code> and so on.', 'At the end of update: <code>player_x = max(0, min(player_x, WIDTH - SIZE))</code> and the same for y with HEIGHT.'],
        tests: [
          ['Right arrow moves right', c`g.update(player_x=200, player_y=200); hold('right'); frames(1)
assert (g['player_x'], g['player_y']) == (205, 200), 'Holding right moved the player to (%r, %r)' % (g['player_x'], g['player_y'])`],
          ['Left, up and down work', c`g.update(player_x=200, player_y=200); hold('left'); frames(1); assert g['player_x'] == 195, 'left'
g.update(player_x=200, player_y=200); hold('up'); frames(1); assert g['player_y'] == 195, 'up'
g.update(player_x=200, player_y=200); hold('down'); frames(1); assert g['player_y'] == 205, 'down'`],
          ['No keys, no movement', c`g.update(player_x=200, player_y=200); hold(); frames(1)
assert (g['player_x'], g['player_y']) == (200, 200)`],
          ['Stays inside the left and right edges', c`g.update(player_x=g['WIDTH'] - 40, player_y=200); hold('right'); frames(1)
assert g['player_x'] <= g['WIDTH'] - 40, 'The square went off the right edge (x = %r).' % g['player_x']
g.update(player_x=0); hold('left'); frames(1)
assert g['player_x'] >= 0, 'The square went off the left edge.'`],
          ['Stays inside the top and bottom edges', c`g.update(player_x=200, player_y=g['HEIGHT'] - 40); hold('down'); frames(1)
assert g['player_y'] <= g['HEIGHT'] - 40, 'The square went off the bottom.'
g.update(player_y=0); hold('up'); frames(1)
assert g['player_y'] >= 0, 'The square went off the top.'`],
        ],
      },
    },
    {
      id: 'events', title: 'Key Presses & Mouse Clicks', minutes: 15,
      blocks: [
        ['p', `<code>keyboard.space</code> is True for <i>every frame</i> the key is held. That's perfect for movement, but not for things that should happen <b>once per press</b>, like jumping, firing or starting the game. For those, write an <b>event handler</b>: a function the website calls at the moment something happens.`],
        ['list', [`<code>def on_key_down(key):</code> is called once each time a key is pressed. <code>key</code> is its name: <code>"space"</code>, <code>"left"</code>, <code>"a"</code>, <code>"enter"</code>...`, `<code>def on_mouse_down(x, y):</code> is called when the player clicks or taps, with the position.`, `<code>mouse.x</code> and <code>mouse.y</code> always hold the mouse's current position.`]],
        ['code', c`flowers = []
symbol = "🌷"


def on_mouse_down(x, y):
    flowers.append((x, y, symbol))


def on_key_down(key):
    global symbol, flowers
    if key == "space":
        symbol = "🌻" if symbol == "🌷" else "🌷"
    if key == "c":
        flowers = []


def draw():
    screen.fill("lightgreen")
    for x, y, s in flowers:
        screen.emoji(s, x, y, 40)
    screen.emoji("🐝", mouse.x, mouse.y, 30)
    screen.text("Click to plant · SPACE to switch · C to clear", 10, 10, 18, "darkgreen")`, G],
        ['h', 'How far apart are two points?'],
        ['p', `To know if a click hit a circle, we need the distance between two points. Pythagoras to the rescue! Python's <code>math.hypot</code> works it out for you:`],
        ['code', c`import math

# distance from (100, 100) to (130, 140)
print(math.hypot(130 - 100, 140 - 100))   # same as (30**2 + 40**2) ** 0.5`],
        ['p', `If the distance from the click to a circle's centre is less than (or equal to) the radius, the click was inside the circle.`],
        ['key', [`Use <code>keyboard.x</code> for things that happen while a key is held.`, `Use <code>on_key_down(key)</code> for things that happen once per press.`, `<code>on_mouse_down(x, y)</code> runs on each click or tap.`, `<code>math.hypot(dx, dy)</code> gives the distance between two points.`]],
      ],
      quiz: [
        { q: 'For a "jump" that should happen once each time space is pressed, which is best?', options: ['<code>if keyboard.space:</code> in update()', '<code>def on_key_down(key):</code> checking <code>key == "space"</code>', '<code>while keyboard.space:</code>', '<code>input()</code>'], answer: 1, explain: 'keyboard.space stays True every frame it\'s held, so you\'d jump again and again. on_key_down fires once per press.' },
        { q: 'A circle has centre (200, 200) and radius 30. Is a click at (220, 220) inside it?', options: ['Yes: the distance is about 28', 'No: the distance is 40', 'Yes: it\'s within 30 in both directions, so it must be inside', 'No: the distance is about 35'], answer: 0, explain: 'math.hypot(20, 20) is about 28.3, which is less than 30. (A click at (225, 225) would be outside, at about 35.)' },
      ],
      challenge: {
        game: true,
        task: `<p>Make a <b>target practice</b> game:</p><ul><li>A target circle at <code>target_x</code>, <code>target_y</code> with radius <code>TARGET_RADIUS = 30</code>, and a <code>score</code> starting at 0.</li><li>Write <code>on_mouse_down(x, y)</code>: if the click is within 30 pixels of the target's centre (use the real distance!), add 1 to <code>score</code> and move the target to a new random position on the screen.</li><li>Show the score on the screen.</li></ul>`,
        starter: c`import random
import math

TARGET_RADIUS = 30
target_x = 300
target_y = 200
score = 0


def draw():
    screen.fill("darkgreen")
    screen.circle(target_x, target_y, TARGET_RADIUS, "red")
    screen.circle(target_x, target_y, 20, "white")
    screen.circle(target_x, target_y, 10, "red")
`,
        solution: c`import random
import math

TARGET_RADIUS = 30
target_x = 300
target_y = 200
score = 0


def on_mouse_down(x, y):
    global target_x, target_y, score
    distance = math.hypot(x - target_x, y - target_y)
    if distance <= TARGET_RADIUS:
        score += 1
        target_x = random.randint(TARGET_RADIUS, WIDTH - TARGET_RADIUS)
        target_y = random.randint(TARGET_RADIUS, HEIGHT - TARGET_RADIUS)


def draw():
    screen.fill("darkgreen")
    screen.circle(target_x, target_y, TARGET_RADIUS, "red")
    screen.circle(target_x, target_y, 20, "white")
    screen.circle(target_x, target_y, 10, "red")
    screen.text(f"Score: {score}", 10, 10, 28, "white")`,
        hints: ['Inside on_mouse_down you need <code>global target_x, target_y, score</code>. Work out <code>distance = math.hypot(x - target_x, y - target_y)</code>.', 'If <code>distance &lt;= TARGET_RADIUS</code>, add to score and use <code>random.randint(TARGET_RADIUS, WIDTH - TARGET_RADIUS)</code> for the new x (and similar for y).'],
        tests: [
          ['A hit scores a point', c`g.update(target_x=100, target_y=100, score=0); click(105, 100)
assert g['score'] == 1, 'Clicking near the centre should add 1 to score.'`],
          ['A hit moves the target', c`moved = False
for i in range(3):
    g.update(target_x=100, target_y=100); click(100, 100)
    moved = moved or (g['target_x'], g['target_y']) != (100, 100)
assert moved, 'After a hit, move the target to a random new position.'`],
          ['A miss does nothing', c`g.update(target_x=100, target_y=100, score=5); click(300, 300)
assert g['score'] == 5 and (g['target_x'], g['target_y']) == (100, 100)`],
          ['Uses the real distance', c`g.update(target_x=100, target_y=100, score=0); click(120, 120)
assert g['score'] == 1, 'A click at (120, 120) is about 28 pixels away, so it should hit.'
g.update(target_x=100, target_y=100, score=0); click(125, 125)
assert g['score'] == 0, 'A click at (125, 125) is about 35 pixels away, so it should miss. Use math.hypot rather than checking x and y separately.'`],
          ['Shows the score', c`g['score'] = 7; assert '7' in texts(), 'Show the score with screen.text(f"Score: {score}", ...).'`],
        ],
      },
    },
    ],
  };

  /* =========================================================== */
  const m16 = {
    id: 'm16', title: 'Collisions & Game Objects', icon: '💥',
    desc: 'Detect when things touch, collect items, and organise game objects with classes and lists.',
    lessons: [
    {
      id: 'rect-collision', title: 'Rectangle Collisions', minutes: 15,
      blocks: [
        ['p', `Almost every game needs to know when two things touch: a player and a wall, a bullet and an alien, a ball and a paddle. This is called <b>collision detection</b>.`],
        ['p', `The simplest method uses rectangles (often called <b>hitboxes</b>). Two rectangles overlap only if <b>all four</b> of these are true:`],
        ['list', [`A's left edge is left of B's right edge: <code>ax &lt; bx + bw</code>`, `A's right edge is right of B's left edge: <code>ax + aw &gt; bx</code>`, `A's top is above B's bottom: <code>ay &lt; by + bh</code>`, `A's bottom is below B's top: <code>ay + ah &gt; by</code>`]],
        ['p', `If any one of them is False, there's a gap between the boxes somewhere. Move the blue box with the arrow keys and watch:`],
        ['code', c`def overlaps(ax, ay, aw, ah, bx, by, bw, bh):
    return ax < bx + bw and ax + aw > bx and ay < by + bh and ay + ah > by


px, py = 100, 100
WALL = (250, 120, 100, 160)


def update():
    global px, py
    if keyboard.left: px -= 4
    if keyboard.right: px += 4
    if keyboard.up: py -= 4
    if keyboard.down: py += 4


def draw():
    screen.fill("black")
    wx, wy, ww, wh = WALL
    hit = overlaps(px, py, 50, 50, wx, wy, ww, wh)
    screen.rect(wx, wy, ww, wh, "red" if hit else "gray")
    screen.rect(px, py, 50, 50, "dodgerblue")
    screen.text("TOUCHING!" if hit else "Not touching", 10, 10, 24, "white")`, G],
        ['tip', `Did you spot <code>if keyboard.left: px -= 4</code> on one line? When an if has just one short action, Python lets you put it on the same line after the colon. Use it sparingly; it's only neater for very short lines.`],
        ['p', `<code>"red" if hit else "gray"</code> is a <b>conditional expression</b>: a mini if/else that gives one value or the other. Handy for choosing colours and messages.`],
        ['key', [`Collision detection checks whether objects touch.`, `Rectangles overlap when all four edge checks are True.`, `Using <code>&lt;</code> and <code>&gt;</code> means boxes that only touch edges don't count.`, `<code>a if condition else b</code> chooses between two values.`]],
      ],
      quiz: [
        { q: 'Box A is at x 0 with width 50. Box B starts at x 50. Do they overlap (with the rule <code>ax &lt; bx + bw and ax + aw &gt; bx</code>)?', options: ['Yes', 'No, because they only touch edges, since 0 + 50 > 50 is False'], answer: 1, explain: 'ax + aw is 50, and 50 > 50 is False, so they just touch without overlapping.' },
        { q: 'What does <code>"yes" if 5 > 3 else "no"</code> give?', options: ['"yes"', '"no"', 'True', 'An error'], answer: 0, explain: 'The condition is True, so the value before "if" is chosen.' },
      ],
      challenge: {
        game: true,
        task: `<p>Write the function <code>overlaps(ax, ay, aw, ah, bx, by, bw, bh)</code> that returns <code>True</code> if rectangle A (top-left ax, ay, size aw × ah) overlaps rectangle B, otherwise <code>False</code>. Boxes that only touch edges <b>don't</b> count as overlapping.</p><p>The demo underneath uses your function. Run it and move the blue box to test it!</p>`,
        starter: c`def overlaps(ax, ay, aw, ah, bx, by, bw, bh):
    pass


# ----- demo: move with the arrow keys -----
px, py = 100, 100


def update():
    global px, py
    if keyboard.left: px -= 4
    if keyboard.right: px += 4
    if keyboard.up: py -= 4
    if keyboard.down: py += 4


def draw():
    screen.fill("black")
    hit = overlaps(px, py, 50, 50, 250, 120, 100, 160)
    screen.rect(250, 120, 100, 160, "red" if hit else "gray")
    screen.rect(px, py, 50, 50, "dodgerblue")
`,
        solution: c`def overlaps(ax, ay, aw, ah, bx, by, bw, bh):
    return ax < bx + bw and ax + aw > bx and ay < by + bh and ay + ah > by


# ----- demo: move with the arrow keys -----
px, py = 100, 100


def update():
    global px, py
    if keyboard.left: px -= 4
    if keyboard.right: px += 4
    if keyboard.up: py -= 4
    if keyboard.down: py += 4


def draw():
    screen.fill("black")
    hit = overlaps(px, py, 50, 50, 250, 120, 100, 160)
    screen.rect(250, 120, 100, 160, "red" if hit else "gray")
    screen.rect(px, py, 50, 50, "dodgerblue")`,
        hints: ['You need all four checks joined with <code>and</code>.', '<code>return ax &lt; bx + bw and ax + aw &gt; bx and ay &lt; by + bh and ay + ah &gt; by</code>'],
        tests: [
          ['Overlapping boxes', c`assert overlaps(0, 0, 50, 50, 25, 25, 50, 50) is True`],
          ['Far apart boxes', c`assert overlaps(0, 0, 50, 50, 100, 100, 50, 50) is False`],
          ['Touching edges don\'t count', c`assert overlaps(0, 0, 50, 50, 50, 0, 50, 50) is False, 'Side by side, just touching.'
assert overlaps(0, 0, 50, 50, 0, 50, 50, 50) is False, 'One on top of the other, just touching.'`],
          ['One box inside another', c`assert overlaps(0, 0, 100, 100, 25, 25, 10, 10) is True and overlaps(25, 25, 10, 10, 0, 0, 100, 100) is True`],
          ['Lined up but apart', c`assert overlaps(0, 0, 50, 50, 0, 60, 50, 50) is False, 'below'
assert overlaps(60, 0, 50, 50, 0, 0, 50, 50) is False, 'to the right'`],
          ['Crossing shapes', c`assert overlaps(10, 10, 10, 100, 0, 50, 100, 10) is True, 'A tall thin box crossing a wide flat one.'`],
        ],
      },
    },
    {
      id: 'collect', title: 'Collecting Things & Keeping Score', minutes: 15,
      blocks: [
        ['p', `For round-ish things like coins, balls and emoji characters, a <b>distance check</b> is easier than rectangles: if the centres are closer than the two radii added together, they're touching.`],
        ['code', c`import math


def touching(x1, y1, r1, x2, y2, r2):
    return math.hypot(x1 - x2, y1 - y2) < r1 + r2


print(touching(0, 0, 10, 15, 0, 10))   # centres 15 apart, radii add to 20
print(touching(0, 0, 10, 50, 0, 10))`],
        ['h', 'A collecting game'],
        ['p', `Here's the pattern used in thousands of games: move the player, check if it touches the thing to collect, and if it does, add to the score and move the thing somewhere new.`],
        ['code', c`import random
import math

player_x, player_y = 300, 200
gem_x, gem_y = 100, 100
score = 0


def update():
    global player_x, player_y, gem_x, gem_y, score
    if keyboard.left: player_x -= 4
    if keyboard.right: player_x += 4
    if keyboard.up: player_y -= 4
    if keyboard.down: player_y += 4

    if math.hypot(player_x - gem_x, player_y - gem_y) < 40:
        score += 1
        gem_x = random.randint(20, WIDTH - 20)
        gem_y = random.randint(20, HEIGHT - 20)


def draw():
    screen.fill("indigo")
    screen.emoji("💎", gem_x, gem_y, 36)
    screen.emoji("🐱", player_x, player_y, 50)
    screen.text(f"Gems: {score}", 10, 10, 26, "white")`, G],
        ['tip', `Emoji are drawn centred on their x and y, which makes distance checks easy: just compare the two centres.`],
        ['key', [`Two circles touch when the distance between centres is less than their radii added together.`, `Collect pattern: check touching → add to score → move the item.`, `Show the score with an f-string in draw().`]],
      ],
      quiz: [
        { q: 'Two circles of radius 20 have centres 35 pixels apart. Are they touching?', options: ['Yes, because 35 < 20 + 20', 'No, because 35 > 20', 'No, because they need to be 0 apart', 'It depends on the colour'], answer: 0, explain: 'The radii add to 40, and 35 is less than 40, so they overlap.' },
      ],
      challenge: {
        game: true,
        task: `<p>The movement is done. Add the collecting:</p><ul><li>In <code>update()</code>, if the player is less than <b>40</b> pixels from the coin (centre to centre), add 1 to <code>score</code> and move the coin to a new random position on the screen.</li><li>In <code>draw()</code>, show the score.</li></ul>`,
        starter: c`import random
import math

SPEED = 4
player_x = 300
player_y = 200
coin_x = 100
coin_y = 100
score = 0


def update():
    global player_x, player_y, coin_x, coin_y, score
    if keyboard.left:
        player_x -= SPEED
    if keyboard.right:
        player_x += SPEED
    if keyboard.up:
        player_y -= SPEED
    if keyboard.down:
        player_y += SPEED
    # check for collecting the coin here


def draw():
    screen.fill("darkolivegreen")
    screen.emoji("🪙", coin_x, coin_y, 36)
    screen.emoji("🐸", player_x, player_y, 50)
`,
        solution: c`import random
import math

SPEED = 4
player_x = 300
player_y = 200
coin_x = 100
coin_y = 100
score = 0


def update():
    global player_x, player_y, coin_x, coin_y, score
    if keyboard.left:
        player_x -= SPEED
    if keyboard.right:
        player_x += SPEED
    if keyboard.up:
        player_y -= SPEED
    if keyboard.down:
        player_y += SPEED

    if math.hypot(player_x - coin_x, player_y - coin_y) < 40:
        score += 1
        coin_x = random.randint(20, WIDTH - 20)
        coin_y = random.randint(20, HEIGHT - 20)


def draw():
    screen.fill("darkolivegreen")
    screen.emoji("🪙", coin_x, coin_y, 36)
    screen.emoji("🐸", player_x, player_y, 50)
    screen.text(f"Score: {score}", 10, 10, 28, "white")`,
        hints: ['<code>if math.hypot(player_x - coin_x, player_y - coin_y) &lt; 40:</code>', 'Inside: <code>score += 1</code>, <code>coin_x = random.randint(20, WIDTH - 20)</code>, <code>coin_y = random.randint(20, HEIGHT - 20)</code>. Then add a screen.text for the score in draw().'],
        tests: [
          ['Touching the coin scores', c`hold(); g.update(player_x=200, player_y=200, coin_x=210, coin_y=200, score=0); frames(1)
assert g['score'] == 1, 'The player is 10 pixels from the coin, so score should go up.'`],
          ['The coin moves after collecting', c`hold(); g.update(player_x=200, player_y=200, coin_x=210, coin_y=200); frames(1)
assert (g['coin_x'], g['coin_y']) != (210, 200), 'Move the coin to a random place.'`],
          ['Far away does nothing', c`hold(); g.update(player_x=200, player_y=200, coin_x=400, coin_y=300, score=0); frames(1)
assert g['score'] == 0 and (g['coin_x'], g['coin_y']) == (400, 300)`],
          ['Shows the score', c`g['score'] = 12; assert '12' in texts(), 'Show the score with screen.text().'`],
        ],
      },
    },
    {
      id: 'sprite-classes', title: 'Game Objects with Classes', minutes: 18,
      blocks: [
        ['p', `As games grow, keeping every object's data in separate variables gets messy. <b>Classes</b> are the tidy answer: each kind of game object becomes a class that knows its own data <i>and</i> how to update and draw itself.`],
        ['code', c`import random


class Ball:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.speed_x = random.choice([-3, -2, 2, 3])
        self.speed_y = random.choice([-3, -2, 2, 3])
        self.colour = random.choice(["tomato", "gold", "violet", "aqua"])

    def update(self):
        self.x += self.speed_x
        self.y += self.speed_y
        if self.x < 15 or self.x > WIDTH - 15:
            self.speed_x = -self.speed_x
        if self.y < 15 or self.y > HEIGHT - 15:
            self.speed_y = -self.speed_y

    def draw(self):
        screen.circle(self.x, self.y, 15, self.colour)


balls = [Ball(300, 200)]


def on_mouse_down(x, y):
    balls.append(Ball(x, y))


def update():
    for b in balls:
        b.update()


def draw():
    screen.fill("black")
    for b in balls:
        b.draw()
    screen.text(f"{len(balls)} balls. Click to add more!", 10, 10, 22, "white")`, G],
        ['p', `Look how short the main <code>update()</code> and <code>draw()</code> are: they just ask every ball to update and draw <i>itself</i>. Each ball is an independent object with its own position, speed and colour. No <code>global</code> needed either, because each object stores its own data on <code>self</code>.`],
        ['tip', `Method names like <code>update</code> and <code>draw</code> inside a class don't clash with your main <code>update()</code> and <code>draw()</code> functions: <code>b.update()</code> calls the ball's method, while <code>update()</code> on its own calls the game function.`],
        ['key', [`Make a class for each kind of game object.`, `Give it <code>update(self)</code> and <code>draw(self)</code> methods.`, `Keep the objects in a list and loop over them.`, `Objects store their own data, so you need far fewer globals.`]],
      ],
      quiz: [
        { q: 'Inside the Ball class, why is it <code>self.x</code> rather than just <code>x</code>?', options: ['It\'s quicker to type', 'self.x is stored on that particular ball object, so each ball has its own x', 'x is reserved by Python', 'It makes it global'], answer: 1, explain: 'Every Ball object has its own self.x, which is how 50 balls can be in 50 places.' },
      ],
      challenge: {
        game: true,
        task: `<p>Make rising bubbles with a class:</p><ol><li>Class <code>Bubble</code> with <code>__init__(self, x, y, speed, radius)</code> that stores all four.</li><li><code>update(self)</code> moves the bubble <b>up</b> by its speed.</li><li><code>is_off_screen(self)</code> returns True when the bubble has gone completely off the top (<code>self.y + self.radius &lt; 0</code>).</li><li><code>draw(self)</code> draws a circle at its position with its radius.</li><li>Make a list <code>bubbles</code> of at least 10 bubbles. In <code>update()</code>, update every bubble and <b>replace</b> any that are off the screen with a new bubble starting below the bottom.</li></ol>`,
        starter: c`import random


class Bubble:
    def __init__(self, x, y, speed, radius):
        pass


bubbles = []


def update():
    pass


def draw():
    screen.fill("steelblue")
`,
        solution: c`import random


class Bubble:
    def __init__(self, x, y, speed, radius):
        self.x = x
        self.y = y
        self.speed = speed
        self.radius = radius

    def update(self):
        self.y -= self.speed

    def is_off_screen(self):
        return self.y + self.radius < 0

    def draw(self):
        screen.circle(self.x, self.y, self.radius, "lightblue", 3)


def new_bubble():
    return Bubble(random.randint(20, WIDTH - 20), HEIGHT + 30, random.randint(1, 4), random.randint(10, 30))


bubbles = []
for i in range(12):
    b = new_bubble()
    b.y = random.randint(0, HEIGHT)
    bubbles.append(b)


def update():
    for i in range(len(bubbles)):
        bubbles[i].update()
        if bubbles[i].is_off_screen():
            bubbles[i] = new_bubble()


def draw():
    screen.fill("steelblue")
    for b in bubbles:
        b.draw()`,
        hints: ['In the class: <code>self.y -= self.speed</code> for update, and <code>return self.y + self.radius &lt; 0</code> for is_off_screen.', 'To replace an item while looping, loop over positions: <code>for i in range(len(bubbles)):</code> then <code>bubbles[i] = Bubble(...)</code> when it\'s off the screen.'],
        tests: [
          ['Bubble stores its data', c`b = Bubble(100, 200, 3, 20)
assert (b.x, b.y, b.speed, b.radius) == (100, 200, 3, 20)`],
          ['update() moves it up', c`b = Bubble(100, 200, 3, 20); b.update(); assert b.y == 197, 'y should go from 200 to 197, got %r' % b.y`],
          ['is_off_screen() works', c`assert Bubble(100, -25, 1, 20).is_off_screen() is True, 'y=-25 with radius 20 is completely off the top.'
assert Bubble(100, 0, 1, 20).is_off_screen() is False, 'y=0 is still half on the screen.'`],
          ['draw() draws a circle at its position', c`k = draws_of(Bubble(50, 60, 1, 15).draw)
assert any(s[0] == 'circle' and s[1] == 50 and s[2] == 60 and s[3] == 15 for s in k), 'Draw screen.circle(self.x, self.y, self.radius, ...).'`],
          ['bubbles has 10+ Bubble objects', c`assert len(g['bubbles']) >= 10 and all(isinstance(b, Bubble) for b in g['bubbles'])`],
          ['Off-screen bubbles are replaced', c`g['bubbles'] = [Bubble(100, -100, 1, 20)]; frames(1)
assert g['bubbles'] and g['bubbles'][0].y > 0, 'Replace bubbles that float off the top with new ones starting at the bottom.'`],
        ],
      },
    },
    {
      id: 'enemies', title: 'Spawning & Removing Enemies', minutes: 15,
      blocks: [
        ['p', `Many games keep sending new enemies, and get rid of the ones that are destroyed or leave the screen. Two skills make this work: <b>spawning</b> on a timer, and <b>removing</b> safely.`],
        ['h', 'Spawning with a timer'],
        ['p', `Count frames in a variable. When it reaches a number, spawn something and reset the counter. At 60 frames per second, a count of 60 is one second.`],
        ['h', 'Removing safely'],
        ['warn', `Never remove items from a list while you're looping over that same list with <code>for</code>. Python moves along by position, so when an item is removed the next one slides into its place and gets <b>skipped</b>.`],
        ['p', `The safe way is to build a <b>new list</b> containing only the items you want to keep. A list comprehension does it in one line:`],
        ['code', c`import random

meteors = []
timer = 0


def update():
    global timer, meteors
    timer += 1
    if timer >= 30:                      # every half a second
        timer = 0
        meteors.append({"x": random.randint(0, WIDTH), "y": -30, "speed": random.uniform(2, 5)})
    for m in meteors:
        m["y"] += m["speed"]
    meteors = [m for m in meteors if m["y"] < HEIGHT + 30]   # keep only those still on screen


def draw():
    screen.fill("black")
    for m in meteors:
        screen.emoji("☄️", m["x"], m["y"], 40)
    screen.text(f"Meteors in the list: {len(meteors)}", 10, 10, 20, "white")`, G],
        ['p', `Watch the counter: meteors are added and removed constantly, but the list never gets huge. <code>random.uniform(2, 5)</code> gives a random <i>decimal</i> between 2 and 5.`],
        ['key', [`Spawn on a timer: count frames, spawn and reset at a target number.`, `Don't remove from a list while looping over it.`, `Keep what you need with a comprehension: <code>items = [x for x in items if keep_condition]</code>.`, `Replacing the list needs <code>global</code>.`]],
      ],
      quiz: [
        { q: 'At 60 frames per second, how often does something spawn if the timer resets at 120?', options: ['Every frame', 'Every second', 'Every 2 seconds', 'Every 120 seconds'], answer: 2, explain: '120 frames ÷ 60 frames per second = 2 seconds.' },
        { q: 'Which line removes every enemy with y over 400, safely?', options: ['<code>for e in enemies: enemies.remove(e)</code>', '<code>enemies = [e for e in enemies if e["y"] &lt;= 400]</code>', '<code>del enemies</code>', '<code>enemies.pop(400)</code>'], answer: 1, explain: 'It builds a new list keeping only enemies with y up to 400.' },
      ],
      challenge: {
        game: true,
        task: `<p>Make an alien invasion:</p><ul><li><code>enemies</code> is a list of dictionaries with keys <code>"x"</code> and <code>"y"</code>, and <code>spawn_timer</code> counts frames.</li><li>Every <b>60 frames</b>, add a new enemy at a random x, with y = -20.</li><li>Every frame, move every enemy <b>down 3</b> pixels.</li><li>Remove enemies whose y is greater than <code>HEIGHT</code>.</li><li>Draw every enemy.</li></ul>`,
        starter: c`import random

enemies = []
spawn_timer = 0


def update():
    pass


def draw():
    screen.fill("black")
`,
        solution: c`import random

enemies = []
spawn_timer = 0


def update():
    global spawn_timer, enemies
    spawn_timer += 1
    if spawn_timer >= 60:
        spawn_timer = 0
        enemies.append({"x": random.randint(20, WIDTH - 20), "y": -20})
    for e in enemies:
        e["y"] += 3
    enemies = [e for e in enemies if e["y"] <= HEIGHT]


def draw():
    screen.fill("black")
    for e in enemies:
        screen.emoji("👾", e["x"], e["y"], 40)`,
        hints: ['Start update with <code>global spawn_timer, enemies</code>. Add 1 to spawn_timer; when it reaches 60, reset it and append <code>{"x": random.randint(20, WIDTH - 20), "y": -20}</code>.', 'Move: <code>for e in enemies: e["y"] += 3</code>. Remove: <code>enemies = [e for e in enemies if e["y"] &lt;= HEIGHT]</code>.'],
        tests: [
          ['Spawns an enemy every 60 frames', c`g.update(enemies=[], spawn_timer=0); hold(); frames(60)
assert 1 <= len(g['enemies']) <= 2, 'After 60 frames there should be 1 enemy, found %d.' % len(g['enemies'])
frames(60)
assert 2 <= len(g['enemies']) <= 3, 'After 120 frames there should be 2 enemies, found %d.' % len(g['enemies'])`],
          ['New enemies are dictionaries with x and y', c`g.update(enemies=[], spawn_timer=0); frames(60)
assert g['enemies'] and all(isinstance(e, dict) and 'x' in e and 'y' in e for e in g['enemies'])`],
          ['Enemies move down 3', c`g.update(enemies=[{'x': 50, 'y': 100}], spawn_timer=1); frames(1)
e = [e for e in g['enemies'] if e['x'] == 50]
assert e and e[0]['y'] == 103, 'The enemy should move from y=100 to y=103.'`],
          ['Enemies below the screen are removed', c`g.update(enemies=[{'x': 50, 'y': g['HEIGHT'] + 10}], spawn_timer=1); frames(1)
assert not any(e['y'] > g['HEIGHT'] for e in g['enemies']), 'Remove enemies once their y is greater than HEIGHT.'`],
          ['Enemies are drawn', c`g['enemies'] = [{'x': 50, 'y': 60}, {'x': 150, 'y': 80}]
assert len([k for k in drawn() if k[0] in ('emoji', 'rect', 'circle', 'poly')]) >= 2`],
        ],
      },
    },
    ],
  };

  /* =========================================================== */
  const m17 = {
    id: 'm17', title: 'Game Mechanics', icon: '⚙️',
    desc: 'Title screens, game over and restarting, timers and lives, gravity and jumping.',
    lessons: [
    {
      id: 'game-states', title: 'Title Screens, Game Over & Restart', minutes: 18,
      blocks: [
        ['p', `Real games have different <b>screens</b>: a title screen, the game itself, a game-over screen. A neat way to organise this is a <b>state</b> variable that holds a word saying which part of the game we're in. update() and draw() then do different things depending on the state.`],
        ['code', c`import random

state = "title"
score = 0
time_left = 0
star_x, star_y = 300, 200


def reset_game():
    global score, time_left
    score = 0
    time_left = 10 * 60          # 10 seconds of frames


def on_key_down(key):
    global state
    if key == "space" and state != "playing":
        reset_game()
        state = "playing"


def on_mouse_down(x, y):
    global score, star_x, star_y
    if state == "playing" and abs(x - star_x) < 30 and abs(y - star_y) < 30:
        score += 1
        star_x, star_y = random.randint(30, WIDTH - 30), random.randint(60, HEIGHT - 30)


def update():
    global time_left, state
    if state == "playing":
        time_left -= 1
        if time_left <= 0:
            state = "gameover"


def draw():
    screen.fill("black")
    if state == "title":
        screen.text("STAR CLICKER", WIDTH / 2, 140, 56, "gold", center=True)
        screen.text("Click as many stars as you can in 10 seconds", WIDTH / 2, 210, 20, "white", center=True)
        screen.text("Press SPACE to start", WIDTH / 2, 260, 26, "white", center=True)
    elif state == "playing":
        screen.emoji("⭐", star_x, star_y, 50)
        screen.text(f"Score: {score}   Time: {time_left // 60 + 1}", 10, 10, 24, "white")
    elif state == "gameover":
        screen.text("TIME'S UP!", WIDTH / 2, 150, 56, "red", center=True)
        screen.text(f"You clicked {score} stars", WIDTH / 2, 220, 28, "white", center=True)
        screen.text("Press SPACE to play again", WIDTH / 2, 280, 22, "white", center=True)`, G],
        ['h', 'The parts of a restartable game'],
        ['list', [`A <code>state</code> variable: <code>"title"</code>, <code>"playing"</code> or <code>"gameover"</code>.`, `A <code>reset_game()</code> function that puts every variable back to its starting value. Calling it at the start of each game means restarting always works properly.`, `<code>update()</code> only runs the game when the state is <code>"playing"</code>.`, `<code>draw()</code> draws a different screen for each state.`]],
        ['p', `This pattern is called a <b>state machine</b>. Professional games use exactly the same idea for menus, pause screens, cutscenes and levels.`],
        ['key', [`Use a state variable for the different screens of a game.`, `Check the state in update(), draw() and event handlers.`, `A reset_game() function makes restarting reliable.`]],
      ],
      quiz: [
        { q: 'Why have a reset_game() function?', options: ['It makes the game faster', 'It puts every variable back to the start, so a new game starts cleanly', 'It\'s required by Python', 'It deletes the game'], answer: 1, explain: 'Without it, a second game would start with the old score, timer and so on.' },
        { q: 'In the example, what happens to update() while state is "title"?', options: ['It counts down the timer', 'Nothing: the if only runs while playing', 'It crashes', 'It draws the title'], answer: 1, explain: 'The code inside is wrapped in if state == "playing":.' },
      ],
      challenge: {
        game: true,
        task: `<p>Add states to this game skeleton:</p><ul><li><code>state</code> starts as <code>"title"</code>.</li><li><code>reset_game()</code> sets <code>score</code> to 0 and <code>lives</code> to 3.</li><li><code>on_key_down(key)</code>: pressing <code>space</code> on the title or game-over screen calls <code>reset_game()</code> and sets the state to <code>"playing"</code>. Pressing <code>x</code> while playing loses a life (so you can test it).</li><li><code>update()</code>: only while playing, add 1 to score every frame, and when lives reach 0 change the state to <code>"gameover"</code>.</li><li>The game-over screen must show the text <code>GAME OVER</code>.</li></ul>`,
        starter: c`state = "title"
score = 0
lives = 3


def reset_game():
    pass


def on_key_down(key):
    pass


def update():
    pass


def draw():
    screen.fill("black")
    if state == "title":
        screen.text("MY GAME", WIDTH / 2, 150, 60, "gold", center=True)
        screen.text("Press SPACE to play", WIDTH / 2, 250, 26, "white", center=True)
    elif state == "playing":
        screen.text(f"Score: {score}", 10, 10, 26, "white")
        screen.text(f"Lives: {lives}", 10, 40, 26, "white")
        screen.text("Press X to lose a life", WIDTH / 2, 200, 24, "gray", center=True)
    # add the game over screen here
`,
        solution: c`state = "title"
score = 0
lives = 3


def reset_game():
    global score, lives
    score = 0
    lives = 3


def on_key_down(key):
    global state, lives
    if key == "space" and state in ("title", "gameover"):
        reset_game()
        state = "playing"
    elif key == "x" and state == "playing":
        lives -= 1


def update():
    global score, state
    if state == "playing":
        score += 1
        if lives <= 0:
            state = "gameover"


def draw():
    screen.fill("black")
    if state == "title":
        screen.text("MY GAME", WIDTH / 2, 150, 60, "gold", center=True)
        screen.text("Press SPACE to play", WIDTH / 2, 250, 26, "white", center=True)
    elif state == "playing":
        screen.text(f"Score: {score}", 10, 10, 26, "white")
        screen.text(f"Lives: {lives}", 10, 40, 26, "white")
        screen.text("Press X to lose a life", WIDTH / 2, 200, 24, "gray", center=True)
    else:
        screen.text("GAME OVER", WIDTH / 2, 150, 60, "red", center=True)
        screen.text(f"Final score: {score}", WIDTH / 2, 230, 28, "white", center=True)
        screen.text("Press SPACE to play again", WIDTH / 2, 290, 22, "white", center=True)`,
        hints: ['reset_game needs <code>global score, lives</code>. on_key_down needs <code>global state, lives</code>, then <code>if key == "space" and state in ("title", "gameover"):</code>', 'In update: <code>if state == "playing":</code> add to score, then <code>if lives &lt;= 0: state = "gameover"</code>. In draw add an <code>else:</code> that shows "GAME OVER".'],
        tests: [
          ['Starts on the title screen', c`assert g['state'] == 'title'`],
          ['Other keys don\'t start the game', c`g['state'] = 'title'; press('a'); assert g['state'] == 'title'`],
          ['Space starts a fresh game', c`g.update(state='title', score=99, lives=0); press('space')
assert g['state'] == 'playing' and g['score'] == 0 and g['lives'] == 3, 'state=%r score=%r lives=%r' % (g['state'], g['score'], g['lives'])`],
          ['Score goes up while playing', c`g.update(state='playing', score=0, lives=3); frames(10); assert g['score'] == 10, 'score is %r after 10 frames' % g['score']`],
          ['X loses a life', c`g.update(state='playing', lives=3); press('x'); assert g['lives'] == 2`],
          ['No lives means game over', c`g.update(state='playing', lives=0); frames(1); assert g['state'] == 'gameover'
s = g['score']; frames(5); assert g['score'] == s, 'The score should stop going up once the game is over.'`],
          ['Shows GAME OVER', c`g['state'] = 'gameover'; assert 'game over' in texts().lower()`],
          ['Space restarts after game over', c`g.update(state='gameover', score=50, lives=0); press('space')
assert g['state'] == 'playing' and g['lives'] == 3 and g['score'] == 0`],
        ],
      },
    },
    {
      id: 'timers', title: 'Timers, Lives & Difficulty', minutes: 15,
      blocks: [
        ['p', `Games are full of things that depend on <b>time</b>: countdowns, power-ups that wear off, enemies that speed up. Since update() runs about 60 times a second, counting frames is an easy clock:`],
        ['list', [`<code>frame_count += 1</code> every frame`, `<code>frame_count // 60</code> is the number of whole seconds`, `<code>frame_count % 60 == 0</code> is True once every second`]],
        ['h', 'Invincibility after getting hit'],
        ['p', `If a player loses a life every frame they touch an enemy, they'd lose all their lives in a split second! Games give a moment of safety after a hit, often shown by flashing:`],
        ['code', c`import math

player_x = 100
enemy_x = 300
lives = 5
safe_timer = 0


def update():
    global player_x, enemy_x, lives, safe_timer
    if keyboard.left: player_x -= 4
    if keyboard.right: player_x += 4
    enemy_x = 300 + math.sin(safe_timer / 20 + player_x / 100) * 150   # wobbles about
    if safe_timer > 0:
        safe_timer -= 1
    elif abs(player_x - enemy_x) < 40 and lives > 0:
        lives -= 1
        safe_timer = 90           # 1.5 seconds of safety


def draw():
    screen.fill("black")
    flashing = safe_timer > 0 and safe_timer % 10 < 5
    if not flashing:
        screen.emoji("🧑‍🚀", player_x, 200, 50)
    screen.emoji("👻", enemy_x, 200, 50)
    screen.text(f"Lives: {lives}", 10, 10, 24, "white")`, G],
        ['h', 'Getting harder over time'],
        ['p', `A good game starts easy and gets harder. Base the speed of enemies, or how often they appear, on the score or the time, usually with a limit so it never becomes impossible:`],
        ['code', c`for score in [0, 10, 50, 100, 500]:
    speed = min(2 + score / 20, 10)       # faster as score grows, but never more than 10
    gap = max(60 - score // 5, 15)        # frames between enemies, never fewer than 15
    print(f"score {score:>3}: speed {speed:.1f}, new enemy every {gap} frames")`],
        ['key', [`Count frames for timing: 60 frames ≈ 1 second.`, `<code>frame_count % 60 == 0</code> happens once a second.`, `Use a timer for invincibility after a hit.`, `Increase difficulty with the score or time, and use min/max to set limits.`]],
      ],
      quiz: [
        { q: 'After how many seconds is <code>frame_count</code> equal to 300?', options: ['3', '5', '30', '300'], answer: 1, explain: '300 frames ÷ 60 frames per second = 5 seconds.' },
        { q: 'What is <code>min(2 + 400 / 20, 10)</code>?', options: ['22', '10', '2', '20'], answer: 1, explain: '2 + 20 = 22, but min caps it at 10.' },
      ],
      challenge: {
        game: true,
        task: `<p>Make a 30-second countdown:</p><ul><li>Variables: <code>frame_count = 0</code>, <code>time_left = 30</code>, <code>state = "playing"</code>.</li><li>In <code>update()</code>, while playing: add 1 to <code>frame_count</code>, and every 60 frames take 1 off <code>time_left</code>.</li><li>When <code>time_left</code> reaches 0, change the state to <code>"gameover"</code>. It must never go below 0.</li><li>Show the time left on the screen.</li></ul>`,
        starter: c`frame_count = 0
time_left = 30
state = "playing"


def update():
    pass


def draw():
    screen.fill("black")
`,
        solution: c`frame_count = 0
time_left = 30
state = "playing"


def update():
    global frame_count, time_left, state
    if state != "playing":
        return
    frame_count += 1
    if frame_count % 60 == 0:
        time_left -= 1
        if time_left <= 0:
            time_left = 0
            state = "gameover"


def draw():
    screen.fill("black")
    screen.text(f"Time: {time_left}", WIDTH / 2, 150, 48, "white", center=True)
    if state == "gameover":
        screen.text("TIME'S UP!", WIDTH / 2, 250, 48, "red", center=True)`,
        hints: ['If the state isn\'t "playing", leave update straight away with <code>return</code>. Then <code>frame_count += 1</code>.', '<code>if frame_count % 60 == 0:</code> take 1 off time_left, and if it\'s now 0 change the state.'],
        tests: [
          ['One second takes 60 frames', c`g.update(frame_count=0, time_left=30, state='playing'); frames(59)
assert g['time_left'] == 30, 'Too early: after 59 frames time_left should still be 30.'
frames(1); assert g['time_left'] == 29, 'After 60 frames time_left should be 29, got %r' % g['time_left']`],
          ['Reaching 0 ends the game', c`g.update(frame_count=0, time_left=1, state='playing'); frames(60)
assert g['time_left'] == 0 and g['state'] == 'gameover', 'time_left=%r state=%r' % (g['time_left'], g['state'])`],
          ['Never goes below 0', c`g.update(frame_count=0, time_left=1, state='playing'); frames(300)
assert g['time_left'] == 0, 'time_left went to %r' % g['time_left']`],
          ['Shows the time', c`g['time_left'] = 17; assert '17' in texts()`],
        ],
      },
    },
    {
      id: 'gravity', title: 'Gravity & Jumping', minutes: 18,
      blocks: [
        ['p', `To make a character jump and fall naturally, games copy real physics in a simple way. The player has a <b>vertical speed</b> (velocity). Every frame:`],
        ['steps', [`<b>Gravity</b> adds a little to the downward speed: <code>velocity_y += GRAVITY</code>`, `The player moves by that speed: <code>player_y += velocity_y</code>`, `If the player reaches the ground, stop them there.`]],
        ['p', `Because the speed keeps growing, the player falls faster and faster, just like a real falling object. To <b>jump</b>, set the speed to a big <i>negative</i> number (upwards). Gravity gradually slows the rise, the player hangs in the air for a moment, then falls back down. That smooth curve comes for free!`],
        ['code', c`GRAVITY = 0.5
JUMP_SPEED = -11
GROUND_Y = 300

player_y = GROUND_Y
velocity_y = 0
on_ground = True


def on_key_down(key):
    global velocity_y, on_ground
    if key == "space" and on_ground:
        velocity_y = JUMP_SPEED
        on_ground = False


def update():
    global player_y, velocity_y, on_ground
    velocity_y += GRAVITY
    player_y += velocity_y
    if player_y >= GROUND_Y:
        player_y = GROUND_Y
        velocity_y = 0
        on_ground = True


def draw():
    screen.fill("lightskyblue")
    screen.rect(0, GROUND_Y + 25, WIDTH, HEIGHT, "sienna")
    screen.emoji("🐸", 150, player_y, 50)
    screen.text(f"velocity_y = {velocity_y:.1f}", 10, 10, 22, "navy")
    screen.text("Press SPACE to jump", 10, 40, 22, "navy")`, G],
        ['p', `Watch <code>velocity_y</code> as you jump: it starts at -11, climbs through 0 at the top of the jump, then grows positive as the frog falls.`],
        ['tip', `The <code>on_ground</code> check stops "double jumping" in mid-air. Try removing <code>and on_ground</code> and pressing space quickly. Some games allow a double jump on purpose: you could count jumps instead.`],
        ['key', [`Each frame: add gravity to the velocity, then add the velocity to the position.`, `A jump is a big negative (upward) velocity.`, `Stop at the ground and reset the velocity to 0.`, `Only allow jumping when on the ground.`]],
      ],
      quiz: [
        { q: 'With GRAVITY = 0.5, a jump starts at velocity -10. What is the velocity after 4 frames?', options: ['-10', '-8', '-6', '-2'], answer: 1, explain: 'Each frame adds 0.5: -10 + 4 × 0.5 = -8. Still moving up, but slower.' },
        { q: 'At the very top of a jump, what is velocity_y?', options: ['The jump speed', 'About 0', 'GRAVITY', 'The biggest positive value'], answer: 1, explain: 'The character stops rising and is about to fall, so the vertical speed passes through 0.' },
      ],
      challenge: {
        game: true,
        task: `<p>Make a jumping character. Use <code>GRAVITY = 0.5</code>, <code>JUMP_SPEED = -10</code> and <code>GROUND_Y = 300</code> (the player's y when standing).</p><ul><li><code>update()</code>: add GRAVITY to <code>velocity_y</code>, add <code>velocity_y</code> to <code>player_y</code>. If <code>player_y</code> reaches <code>GROUND_Y</code>, put it exactly on <code>GROUND_Y</code>, set <code>velocity_y</code> to 0 and <code>on_ground</code> to True.</li><li><code>on_key_down(key)</code>: on <code>space</code>, jump only if <code>on_ground</code> is True: set <code>velocity_y</code> to JUMP_SPEED and <code>on_ground</code> to False.</li></ul>`,
        starter: c`GRAVITY = 0.5
JUMP_SPEED = -10
GROUND_Y = 300
player_x = 150
player_y = GROUND_Y
velocity_y = 0
on_ground = True


def on_key_down(key):
    pass


def update():
    pass


def draw():
    screen.fill("lightskyblue")
    screen.rect(0, GROUND_Y + 40, WIDTH, HEIGHT - GROUND_Y - 40, "sienna")
    screen.rect(player_x, player_y, 40, 40, "crimson")
`,
        solution: c`GRAVITY = 0.5
JUMP_SPEED = -10
GROUND_Y = 300
player_x = 150
player_y = GROUND_Y
velocity_y = 0
on_ground = True


def on_key_down(key):
    global velocity_y, on_ground
    if key == "space" and on_ground:
        velocity_y = JUMP_SPEED
        on_ground = False


def update():
    global player_y, velocity_y, on_ground
    velocity_y += GRAVITY
    player_y += velocity_y
    if player_y >= GROUND_Y:
        player_y = GROUND_Y
        velocity_y = 0
        on_ground = True


def draw():
    screen.fill("lightskyblue")
    screen.rect(0, GROUND_Y + 40, WIDTH, HEIGHT - GROUND_Y - 40, "sienna")
    screen.rect(player_x, player_y, 40, 40, "crimson")`,
        hints: ['update needs <code>global player_y, velocity_y, on_ground</code>. Then <code>velocity_y += GRAVITY</code> and <code>player_y += velocity_y</code>.', '<code>if player_y >= GROUND_Y:</code> set player_y to GROUND_Y, velocity_y to 0 and on_ground to True. In on_key_down: <code>if key == "space" and on_ground:</code>'],
        tests: [
          ['Gravity speeds up the fall', c`g.update(player_y=100, velocity_y=0, on_ground=False); frames(1)
assert approx(g['velocity_y'], 0.5), 'velocity_y should be 0.5 after one frame, got %r' % g['velocity_y']
assert approx(g['player_y'], 100.5) or approx(g['player_y'], 100), 'player_y is %r' % g['player_y']
frames(1); assert approx(g['velocity_y'], 1.0)`],
          ['Lands on the ground', c`g.update(player_y=299, velocity_y=5, on_ground=False); frames(1)
assert g['player_y'] == g['GROUND_Y'] and g['velocity_y'] == 0 and g['on_ground'] is True, 'player_y=%r velocity_y=%r on_ground=%r' % (g['player_y'], g['velocity_y'], g['on_ground'])`],
          ['Space jumps from the ground', c`g.update(player_y=g['GROUND_Y'], velocity_y=0, on_ground=True); press('space')
assert g['velocity_y'] == -10 and g['on_ground'] is False
frames(1); assert g['player_y'] < g['GROUND_Y'], 'After jumping the player should rise.'`],
          ['No jumping in mid-air', c`g.update(player_y=150, velocity_y=-3, on_ground=False); press('space')
assert g['velocity_y'] == -3, 'You shouldn\'t be able to jump while in the air.'`],
          ['Other keys don\'t jump', c`g.update(player_y=g['GROUND_Y'], velocity_y=0, on_ground=True); press('a')
assert g['velocity_y'] == 0`],
        ],
      },
    },
    ],
  };

  /* =========================================================== */
  const PROJECT_INTRO = `<p>Projects are bigger. Read the lesson, run the finished example to play it, then build your own in the challenge. The starter code gives you the drawing and setup, so you can focus on the game logic.</p>`;

  const CATCH = c`import random

BASKET_Y = HEIGHT - 50
BASKET_SPEED = 7
FRUITS = ["🍎", "🍌", "🍇", "🍓", "🍊"]

basket_x = WIDTH / 2
fruit_x = 0
fruit_y = 0
fruit = "🍎"
fruit_speed = 3
score = 0
lives = 3
state = "playing"


def reset_fruit():
    global fruit_x, fruit_y, fruit
    fruit_x = random.randint(30, WIDTH - 30)
    fruit_y = -30
    fruit = random.choice(FRUITS)


def reset_game():
    global score, lives, fruit_speed, state
    score = 0
    lives = 3
    fruit_speed = 3
    state = "playing"
    reset_fruit()


def on_key_down(key):
    if key == "space" and state == "gameover":
        reset_game()


def update():
    global basket_x, fruit_y, fruit_speed, score, lives, state
    if state != "playing":
        return
    if keyboard.left:
        basket_x -= BASKET_SPEED
    if keyboard.right:
        basket_x += BASKET_SPEED
    basket_x = max(50, min(basket_x, WIDTH - 50))

    fruit_y += fruit_speed
    if fruit_y >= BASKET_Y - 20 and abs(fruit_x - basket_x) < 60:
        score += 1
        fruit_speed += 0.25
        reset_fruit()
    elif fruit_y > HEIGHT:
        lives -= 1
        reset_fruit()
        if lives <= 0:
            state = "gameover"


def draw():
    screen.fill("lightskyblue")
    screen.rect(0, HEIGHT - 20, WIDTH, 20, "forestgreen")
    screen.emoji(fruit, fruit_x, fruit_y, 44)
    screen.emoji("🧺", basket_x, BASKET_Y, 70)
    screen.text(f"Score: {score}", 10, 10, 26, "navy")
    screen.text("❤️" * lives, WIDTH - 110, 10, 26, "red")
    if state == "gameover":
        screen.text("GAME OVER", WIDTH / 2, 160, 60, "darkred", center=True)
        screen.text("Press SPACE to play again", WIDTH / 2, 230, 24, "navy", center=True)


reset_fruit()`;

  const DODGE = c`import random
import math

SHIP_Y = HEIGHT - 50
SHIP_RADIUS = 20
SHIP_SPEED = 6

ship_x = WIDTH / 2
rocks = []
spawn_timer = 0
frame_count = 0
score = 0
best = 0
state = "playing"


def hits(rock):
    distance = math.hypot(rock["x"] - ship_x, rock["y"] - SHIP_Y)
    return distance < rock["size"] / 2 + SHIP_RADIUS


def reset_game():
    global rocks, spawn_timer, frame_count, score, state, ship_x
    rocks = []
    spawn_timer = 0
    frame_count = 0
    score = 0
    ship_x = WIDTH / 2
    state = "playing"


def on_key_down(key):
    if key == "space" and state == "gameover":
        reset_game()


def update():
    global ship_x, spawn_timer, frame_count, score, best, state, rocks
    if state != "playing":
        return
    if keyboard.left:
        ship_x -= SHIP_SPEED
    if keyboard.right:
        ship_x += SHIP_SPEED
    ship_x = max(SHIP_RADIUS, min(ship_x, WIDTH - SHIP_RADIUS))

    frame_count += 1
    score = frame_count // 60

    spawn_timer += 1
    if spawn_timer >= max(10, 40 - score):       # rocks come faster as time goes on
        spawn_timer = 0
        size = random.randint(20, 60)
        rocks.append({"x": random.randint(0, WIDTH), "y": -size, "speed": random.uniform(2, 4) + score / 10, "size": size})

    for rock in rocks:
        rock["y"] += rock["speed"]
        if hits(rock):
            state = "gameover"
            best = max(best, score)
    rocks = [r for r in rocks if r["y"] < HEIGHT + r["size"]]


def draw():
    screen.fill("black")
    for rock in rocks:
        screen.emoji("🪨", rock["x"], rock["y"], rock["size"])
    screen.emoji("🚀", ship_x, SHIP_Y, 44)
    screen.text(f"Time: {score}s   Best: {best}s", 10, 10, 24, "white")
    if state == "gameover":
        screen.text("CRASH!", WIDTH / 2, 150, 64, "orangered", center=True)
        screen.text("Press SPACE to try again", WIDTH / 2, 230, 24, "white", center=True)`;

  const PADDLE = c`PADDLE_W = 12
PADDLE_H = 80
PADDLE_SPEED = 6
BALL_SIZE = 14
LEFT_X = 20
RIGHT_X = WIDTH - 20 - PADDLE_W
WIN_SCORE = 5

left_y = HEIGHT / 2 - PADDLE_H / 2
right_y = HEIGHT / 2 - PADDLE_H / 2
ball_x = WIDTH / 2
ball_y = HEIGHT / 2
speed_x = 5
speed_y = 3
left_score = 0
right_score = 0
state = "playing"


def overlaps(ax, ay, aw, ah, bx, by, bw, bh):
    return ax < bx + bw and ax + aw > bx and ay < by + bh and ay + ah > by


def reset_ball(direction):
    global ball_x, ball_y, speed_x, speed_y
    ball_x = WIDTH / 2
    ball_y = HEIGHT / 2
    speed_x = 5 * direction
    speed_y = 3


def on_key_down(key):
    global left_score, right_score, state
    if key == "space" and state == "gameover":
        left_score = 0
        right_score = 0
        state = "playing"
        reset_ball(1)


def update():
    global left_y, right_y, ball_x, ball_y, speed_x, speed_y, left_score, right_score, state
    if state != "playing":
        return
    if keyboard.w:
        left_y -= PADDLE_SPEED
    if keyboard.s:
        left_y += PADDLE_SPEED
    if keyboard.up:
        right_y -= PADDLE_SPEED
    if keyboard.down:
        right_y += PADDLE_SPEED
    left_y = max(0, min(left_y, HEIGHT - PADDLE_H))
    right_y = max(0, min(right_y, HEIGHT - PADDLE_H))

    ball_x += speed_x
    ball_y += speed_y
    if ball_y < 0 or ball_y > HEIGHT - BALL_SIZE:
        speed_y = -speed_y

    if speed_x < 0 and overlaps(ball_x, ball_y, BALL_SIZE, BALL_SIZE, LEFT_X, left_y, PADDLE_W, PADDLE_H):
        speed_x = -speed_x * 1.05          # bounce back, a little faster
    if speed_x > 0 and overlaps(ball_x, ball_y, BALL_SIZE, BALL_SIZE, RIGHT_X, right_y, PADDLE_W, PADDLE_H):
        speed_x = -speed_x * 1.05

    if ball_x + BALL_SIZE < 0:
        right_score += 1
        reset_ball(1)
    elif ball_x > WIDTH:
        left_score += 1
        reset_ball(-1)

    if left_score >= WIN_SCORE or right_score >= WIN_SCORE:
        state = "gameover"


def draw():
    screen.fill("black")
    for y in range(0, HEIGHT, 30):
        screen.rect(WIDTH / 2 - 2, y, 4, 15, "gray")
    screen.rect(LEFT_X, left_y, PADDLE_W, PADDLE_H, "white")
    screen.rect(RIGHT_X, right_y, PADDLE_W, PADDLE_H, "white")
    screen.rect(ball_x, ball_y, BALL_SIZE, BALL_SIZE, "yellow")
    screen.text(str(left_score), WIDTH / 2 - 60, 30, 48, "white", center=True)
    screen.text(str(right_score), WIDTH / 2 + 60, 30, 48, "white", center=True)
    if state == "gameover":
        winner = "Left" if left_score > right_score else "Right"
        screen.text(f"{winner} player wins!", WIDTH / 2, 180, 44, "gold", center=True)
        screen.text("Press SPACE for a rematch", WIDTH / 2, 240, 22, "white", center=True)`;

  const SNAKE = c`import random

CELL = 20
COLS = WIDTH // CELL
ROWS = HEIGHT // CELL
MOVE_EVERY = 6          # frames between moves: smaller is faster

snake = [(5, 10), (4, 10), (3, 10)]
direction = (1, 0)
food = (15, 10)
score = 0
state = "playing"
timer = 0


def next_head(snake, direction):
    head_x, head_y = snake[0]
    dx, dy = direction
    return (head_x + dx, head_y + dy)


def place_food():
    global food
    while True:
        spot = (random.randint(0, COLS - 1), random.randint(0, ROWS - 1))
        if spot not in snake:
            food = spot
            return


def step():
    global state, score
    head = next_head(snake, direction)
    x, y = head
    if x < 0 or x >= COLS or y < 0 or y >= ROWS or head in snake:
        state = "gameover"
        return
    snake.insert(0, head)
    if head == food:
        score += 1
        place_food()
    else:
        snake.pop()


def on_key_down(key):
    global direction, snake, score, state
    turns = {"up": (0, -1), "down": (0, 1), "left": (-1, 0), "right": (1, 0)}
    if key in turns:
        new = turns[key]
        if (new[0] + direction[0], new[1] + direction[1]) != (0, 0):   # no reversing
            direction = new
    if key == "space" and state == "gameover":
        snake = [(5, 10), (4, 10), (3, 10)]
        direction = (1, 0)
        score = 0
        state = "playing"
        place_food()


def update():
    global timer
    if state != "playing":
        return
    timer += 1
    if timer >= MOVE_EVERY:
        timer = 0
        step()


def draw():
    screen.fill("darkgreen")
    fx, fy = food
    screen.emoji("🍎", fx * CELL + CELL / 2, fy * CELL + CELL / 2, CELL)
    for i, (x, y) in enumerate(snake):
        colour = "yellow" if i == 0 else "limegreen"
        screen.rect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2, colour)
    screen.text(f"Score: {score}", 10, 10, 22, "white")
    if state == "gameover":
        screen.text("GAME OVER", WIDTH / 2, 170, 56, "white", center=True)
        screen.text("Press SPACE to play again", WIDTH / 2, 230, 22, "white", center=True)`;

  const SHOOTER = c`import random
import math

SHIP_Y = HEIGHT - 40
ship_x = WIDTH / 2
bullets = []
aliens = []
spawn_timer = 0
score = 0
lives = 3
state = "playing"


def hit(bullet, alien):
    return math.hypot(bullet["x"] - alien["x"], bullet["y"] - alien["y"]) < 25


def on_key_down(key):
    global state, score, lives, bullets, aliens
    if key == "space":
        if state == "playing":
            if len(bullets) < 5:
                bullets.append({"x": ship_x, "y": SHIP_Y - 20})
        else:
            bullets, aliens = [], []
            score, lives = 0, 3
            state = "playing"


def update():
    global ship_x, spawn_timer, score, lives, state, bullets, aliens
    if state != "playing":
        return
    if keyboard.left:
        ship_x = max(20, ship_x - 6)
    if keyboard.right:
        ship_x = min(WIDTH - 20, ship_x + 6)

    spawn_timer += 1
    if spawn_timer >= max(20, 60 - score // 50):
        spawn_timer = 0
        aliens.append({"x": random.randint(20, WIDTH - 20), "y": -20, "speed": random.uniform(1, 2.5)})

    for b in bullets:
        b["y"] -= 8
    for a in aliens:
        a["y"] += a.get("speed", 1)

    for b in bullets:
        for a in aliens:
            if not a.get("dead") and not b.get("dead") and hit(b, a):
                a["dead"] = True
                b["dead"] = True
                score += 10

    bullets = [b for b in bullets if not b.get("dead") and b["y"] > -10]
    survivors = []
    for a in aliens:
        if a.get("dead"):
            continue
        if a["y"] > HEIGHT:
            lives -= 1
        else:
            survivors.append(a)
    aliens = survivors
    if lives <= 0:
        state = "gameover"


def draw():
    screen.fill("black")
    for b in bullets:
        screen.rect(b["x"] - 2, b["y"] - 8, 4, 12, "yellow")
    for a in aliens:
        screen.emoji("👾", a["x"], a["y"], 36)
    screen.emoji("🚀", ship_x, SHIP_Y, 40)
    screen.text(f"Score: {score}", 10, 10, 24, "white")
    screen.text(f"Lives: {lives}", WIDTH - 110, 10, 24, "white")
    if state == "gameover":
        screen.text("GAME OVER", WIDTH / 2, 170, 60, "red", center=True)
        screen.text("Press SPACE to play again", WIDTH / 2, 240, 24, "white", center=True)`;

  const PLATFORMER = c`import math

GRAVITY = 0.6
JUMP_SPEED = -12
MOVE_SPEED = 4
SIZE = 30

platforms = [
    (0, 370, 220, 30),
    (280, 370, 320, 30),
    (120, 290, 100, 15),
    (260, 220, 100, 15),
    (420, 160, 120, 15),
]
coins = [(170, 260), (310, 190), (480, 130), (520, 340)]
goal = (520, 130)

px = 30
py = 300
vy = 0
on_ground = False
score = 0
state = "playing"


def reset_player():
    global px, py, vy
    px, py, vy = 30, 300, 0


def on_key_down(key):
    global vy, on_ground
    if key in ("space", "up") and on_ground and state == "playing":
        vy = JUMP_SPEED
        on_ground = False


def update():
    global px, py, vy, on_ground, score, state, coins
    if state != "playing":
        return
    if keyboard.left:
        px -= MOVE_SPEED
    if keyboard.right:
        px += MOVE_SPEED
    px = max(0, min(px, WIDTH - SIZE))

    vy += GRAVITY
    py += vy
    on_ground = False
    for (x, y, w, h) in platforms:
        was_above = py + SIZE - vy <= y          # feet were above the platform last frame
        if vy >= 0 and was_above and py + SIZE >= y and px + SIZE > x and px < x + w:
            py = y - SIZE                        # stand on top of it
            vy = 0
            on_ground = True

    if py > HEIGHT:                              # fell down a gap
        reset_player()

    centre_x, centre_y = px + SIZE / 2, py + SIZE / 2
    remaining = []
    for (cx, cy) in coins:
        if math.hypot(cx - centre_x, cy - centre_y) < 25:
            score += 1
        else:
            remaining.append((cx, cy))
    coins = remaining

    if math.hypot(goal[0] - centre_x, goal[1] - centre_y) < 35:
        state = "won"


def draw():
    screen.fill("lightskyblue")
    for (x, y, w, h) in platforms:
        screen.rect(x, y, w, h, "sienna")
        screen.rect(x, y, w, 5, "forestgreen")
    for (cx, cy) in coins:
        screen.emoji("⭐", cx, cy, 24)
    screen.emoji("🏁", goal[0], goal[1], 40)
    screen.emoji("🦊", px + SIZE / 2, py + SIZE / 2, 36)
    screen.text(f"Stars: {score}", 10, 10, 24, "navy")
    if state == "won":
        screen.text("YOU WIN!", WIDTH / 2, 180, 64, "gold", center=True)`;

  // Starters: keep the setup and drawing, blank out the logic the learner writes.
  const blankFns = (code, names) => {
    let out = code;
    for (const n of names) {
      const re = new RegExp(`(def ${n}\\([^)]*\\):\\n)((?:    .*\\n|\\n)*?)(?=\\S|$)`);
      out = out.replace(re, (m, head) => `${head}    pass  # TODO: write this\n\n\n`);
    }
    return out.replace(/\n{4,}/g, '\n\n\n');
  };

  const m18 = {
    id: 'm18', title: 'Arcade Projects', icon: '👾',
    desc: 'Build six complete arcade games, from catching fruit to a platformer, each a little more advanced.',
    lessons: [
    {
      id: 'proj-catch', title: 'Project: Catch the Fruit', minutes: 25,
      blocks: [
        ['p', `🧺 Fruit falls from the sky and you move a basket to catch it. Each catch scores a point and makes the fruit fall a little faster. Miss three and it's game over.`],
        ['p', PROJECT_INTRO],
        ['h', 'Play the finished game'],
        ['code', CATCH, { game: true, title: 'catch.py' }],
        ['h', 'How it works'],
        ['list', [`<b>Constants</b> at the top (<code>BASKET_Y</code>, <code>BASKET_SPEED</code>) make the game easy to tweak.`, `<code>reset_fruit()</code> drops a new random fruit from just above the screen. It's used after every catch <i>and</i> every miss.`, `A catch is when the fruit has fallen to the basket's height <b>and</b> is horizontally close: <code>abs(fruit_x - basket_x) &lt; 60</code>. (<code>abs</code> removes the minus sign, so it works on either side.)`, `Each catch adds 0.25 to <code>fruit_speed</code>, so the game gets steadily harder.`]],
        ['tip', `Try changing the constants: a faster basket, a different starting speed, more lives. Tweaking numbers until a game "feels right" is a huge part of game design. It's called <b>balancing</b>.`],
      ],
      quiz: [
        { q: 'What does <code>abs(fruit_x - basket_x) &lt; 60</code> check?', options: ['The fruit is above the basket', 'The fruit and basket are less than 60 pixels apart horizontally, on either side', 'The fruit is moving faster than 60', 'The basket is on the left'], answer: 1, explain: 'abs gives the distance without a sign, so -40 and 40 both count as 40.' },
      ],
      challenge: {
        game: true,
        task: `<p>Write the game logic. The drawing and <code>reset_fruit()</code> are done for you.</p><ol><li><code>update()</code> (only while playing): move the basket with the left/right arrows (keep its centre between 50 and <code>WIDTH - 50</code>), move the fruit down by <code>fruit_speed</code>, then:<ul><li>if <code>fruit_y >= BASKET_Y - 20</code> and the fruit is within 60 pixels of the basket horizontally: add 1 to score, add 0.25 to fruit_speed, and call reset_fruit()</li><li>otherwise, if the fruit falls below <code>HEIGHT</code>: lose a life and call reset_fruit(). When lives reach 0, set state to "gameover".</li></ul></li><li><code>reset_game()</code> sets score 0, lives 3, fruit_speed 3, state "playing", and drops a new fruit.</li><li><code>on_key_down</code>: space restarts after game over.</li></ol>`,
        starter: blankFns(CATCH, ['reset_game', 'on_key_down', 'update']),
        solution: CATCH,
        hints: ['update starts with <code>if state != "playing": return</code>, then moves the basket and clamps it with <code>max(50, min(basket_x, WIDTH - 50))</code>.', 'Then <code>fruit_y += fruit_speed</code> and an <code>if ... elif fruit_y > HEIGHT:</code> for catching and missing. Compare with the finished game above if you get stuck.'],
        tests: [
          ['The basket moves and stays on screen', c`g.update(state='playing', basket_x=300, fruit_x=100, fruit_y=0, fruit_speed=0)
hold('right'); frames(1); assert g['basket_x'] > 300, 'Holding right should move the basket right.'
g['basket_x'] = g['WIDTH']; frames(1); assert g['basket_x'] <= g['WIDTH'] - 50`],
          ['Catching scores and speeds up', c`hold(); g.update(state='playing', basket_x=300, fruit_x=310, fruit_y=g['BASKET_Y'] - 25, fruit_speed=5, score=0, lives=3)
frames(1)
assert g['score'] == 1, 'The fruit landed in the basket, so score should be 1.'
assert approx(g['fruit_speed'], 5.25), 'fruit_speed should go up by 0.25.'
assert g['fruit_y'] <= 0, 'A new fruit should start at the top.'`],
          ['Missing loses a life', c`hold(); g.update(state='playing', basket_x=300, fruit_x=50, fruit_y=g['HEIGHT'] - 1, fruit_speed=5, score=0, lives=3)
frames(1); assert g['lives'] == 2 and g['score'] == 0 and g['fruit_y'] <= 0`],
          ['No lives left means game over', c`hold(); g.update(state='playing', basket_x=300, fruit_x=50, fruit_y=g['HEIGHT'] - 1, fruit_speed=5, lives=1)
frames(1); assert g['state'] == 'gameover'`],
          ['Space restarts', c`g.update(state='gameover', score=9, lives=0, fruit_speed=8); press('space')
assert g['state'] == 'playing' and g['score'] == 0 and g['lives'] == 3 and g['fruit_speed'] == 3`],
        ],
      },
    },
    {
      id: 'proj-dodge', title: 'Project: Asteroid Dodge', minutes: 25,
      blocks: [
        ['p', `🚀 Steer a spaceship left and right to dodge falling asteroids. The longer you survive, the faster and more often they come. How many seconds can you last?`],
        ['p', PROJECT_INTRO],
        ['code', DODGE, { game: true, title: 'dodge.py' }],
        ['h', 'How it works'],
        ['list', [`Asteroids are dictionaries in a list, each with its own position, speed and size.`, `<code>hits(rock)</code> uses a distance check: a crash happens when the centres are closer than the rock's radius plus the ship's.`, `The score is the survival time: <code>frame_count // 60</code> seconds.`, `Difficulty grows: <code>max(10, 40 - score)</code> spawns rocks more often as time passes, but never more than every 10 frames, and the rock speed adds <code>score / 10</code>.`, `<code>best</code> keeps the best time across games, because <code>reset_game()</code> doesn't reset it.`]],
      ],
      quiz: [
        { q: 'Why is <code>best</code> not reset in reset_game()?', options: ['It was forgotten', 'So the best score is remembered from one game to the next', 'best is a constant', 'It can\'t be changed'], answer: 1, explain: 'Everything else starts fresh, but the best time should survive between games.' },
      ],
      challenge: {
        game: true,
        task: `<p>Write <code>hits(rock)</code> and <code>update()</code>:</p><ol><li><code>hits(rock)</code> returns True if the distance from the rock's centre to the ship (at <code>ship_x</code>, <code>SHIP_Y</code>) is less than <code>rock["size"] / 2 + SHIP_RADIUS</code>.</li><li><code>update()</code> (only while playing): move the ship with the arrows (clamped), add 1 to frame_count and set <code>score = frame_count // 60</code>, spawn a rock when the spawn timer reaches <code>max(10, 40 - score)</code>, move every rock down by its speed, set state to "gameover" (and update best) if any rock hits the ship, and remove rocks that have fallen off the bottom.</li></ol>`,
        starter: blankFns(DODGE, ['hits', 'update']),
        solution: DODGE,
        hints: ['hits: <code>distance = math.hypot(rock["x"] - ship_x, rock["y"] - SHIP_Y)</code> then <code>return distance &lt; rock["size"] / 2 + SHIP_RADIUS</code>.', 'Remember <code>global</code> for everything update changes, including <code>rocks</code> because you replace it with a filtered list.'],
        tests: [
          ['hits() detects a crash', c`g['ship_x'] = 300
assert hits({'x': 300, 'y': g['SHIP_Y'], 'speed': 1, 'size': 40}) is True
assert hits({'x': 330, 'y': g['SHIP_Y'], 'speed': 1, 'size': 40}) is True, '30 pixels apart, with 20 + 20 = 40 to touch.'
assert hits({'x': 100, 'y': 50, 'speed': 1, 'size': 40}) is False`],
          ['Rocks fall', c`hold(); g.update(state='playing', ship_x=500, spawn_timer=0, rocks=[{'x': 50, 'y': 100, 'speed': 4, 'size': 30}])
frames(1); r = [r for r in g['rocks'] if r['x'] == 50]
assert r and r[0]['y'] == 104, 'The rock should move from y=100 to y=104.'`],
          ['Rocks off the bottom are removed', c`hold(); g.update(state='playing', ship_x=500, spawn_timer=0, rocks=[{'x': 50, 'y': g['HEIGHT'] + 100, 'speed': 4, 'size': 30}])
frames(1); assert not [r for r in g['rocks'] if r['x'] == 50]`],
          ['New rocks appear', c`hold(); g.update(state='playing', ship_x=500, spawn_timer=0, frame_count=0, rocks=[]); frames(60)
assert len(g['rocks']) >= 1, 'Rocks should spawn when spawn_timer reaches max(10, 40 - score).'`],
          ['Being hit ends the game', c`hold(); g.update(state='playing', ship_x=300, spawn_timer=0, rocks=[{'x': 300, 'y': g['SHIP_Y'] - 3, 'speed': 2, 'size': 40}])
frames(1); assert g['state'] == 'gameover'`],
          ['Score is the time survived', c`hold(); g.update(state='playing', ship_x=300, spawn_timer=-9999, frame_count=0, rocks=[]); frames(120)
assert g['score'] == 2, 'After 120 frames score should be 2 seconds, got %r' % g['score']`],
        ],
      },
    },
    {
      id: 'proj-paddle', title: 'Project: Paddle Ball (2 players)', minutes: 25,
      blocks: [
        ['p', `🏓 A two-player game in the style of the very first arcade video games. Each player moves a paddle up and down to hit the ball back. Miss it and your opponent scores. First to 5 wins!`],
        ['p', `Left player: <b>W</b> and <b>S</b>. Right player: <b>↑</b> and <b>↓</b>.`],
        ['code', PADDLE, { game: true, title: 'paddle.py' }],
        ['h', 'How it works'],
        ['list', [`The ball is a small square, so the <code>overlaps()</code> function from the collisions module checks it against each paddle.`, `It only bounces off a paddle if it's moving <i>towards</i> it (<code>speed_x &lt; 0</code> for the left one). Without that check, the ball can get stuck "inside" a paddle, bouncing back and forth every frame.`, `Each bounce multiplies the speed by 1.05, so long rallies get faster and more exciting.`, `<code>reset_ball(direction)</code> serves the ball towards the player who just lost the point.`]],
      ],
      quiz: [
        { q: 'Why check <code>speed_x &lt; 0</code> before bouncing off the LEFT paddle?', options: ['To save time', 'So the ball only bounces when moving towards that paddle, and can\'t get stuck', 'Because speed_x is always negative', 'To make it slower'], answer: 1, explain: 'If the ball overlaps the paddle for two frames, it would flip direction twice and get stuck.' },
      ],
      challenge: {
        game: true,
        task: `<p>Write <code>update()</code> (only while playing):</p><ol><li>Move the left paddle with <code>w</code>/<code>s</code> and the right one with <code>up</code>/<code>down</code> by <code>PADDLE_SPEED</code>, keeping both on screen.</li><li>Move the ball; bounce it off the top and bottom.</li><li>Bounce off a paddle (reverse speed_x) when the ball overlaps it <b>and</b> is moving towards it.</li><li>If the ball goes off the left edge, the right player scores and the ball is reset with <code>reset_ball(1)</code>. Off the right edge: the left player scores, <code>reset_ball(-1)</code>.</li><li>When a player reaches <code>WIN_SCORE</code>, set state to "gameover".</li></ol>`,
        starter: blankFns(PADDLE, ['update']),
        solution: PADDLE,
        hints: ['Paddles: <code>if keyboard.w: left_y -= PADDLE_SPEED</code> and so on, then clamp with <code>max(0, min(left_y, HEIGHT - PADDLE_H))</code>.', 'Left paddle bounce: <code>if speed_x &lt; 0 and overlaps(ball_x, ball_y, BALL_SIZE, BALL_SIZE, LEFT_X, left_y, PADDLE_W, PADDLE_H): speed_x = -speed_x</code>'],
        tests: [
          ['Paddles move', c`g.update(state='playing', left_y=150, right_y=150, ball_x=300, ball_y=200, speed_x=0, speed_y=0)
hold('w'); frames(1); assert g['left_y'] == 150 - g['PADDLE_SPEED'], 'W should move the left paddle up.'
hold('down'); frames(1); assert g['right_y'] == 150 + g['PADDLE_SPEED'], 'Down should move the right paddle down.'`],
          ['Paddles stay on screen', c`g.update(state='playing', left_y=0, right_y=g['HEIGHT'] - g['PADDLE_H'], ball_x=300, ball_y=200, speed_x=0, speed_y=0)
hold('w', 'down'); frames(1)
assert g['left_y'] >= 0 and g['right_y'] <= g['HEIGHT'] - g['PADDLE_H']`],
          ['Ball bounces off the left paddle', c`hold(); g.update(state='playing', left_y=160, ball_x=g['LEFT_X'] + g['PADDLE_W'] - 2, ball_y=190, speed_x=-5, speed_y=0)
frames(1); assert g['speed_x'] > 0, 'The ball hit the left paddle and should now move right.'`],
          ['Ball bounces off the top and bottom', c`hold(); g.update(state='playing', ball_x=300, ball_y=1, speed_x=2, speed_y=-3); frames(1)
assert g['speed_y'] > 0
g.update(ball_x=300, ball_y=g['HEIGHT'] - g['BALL_SIZE'] - 1, speed_x=2, speed_y=3); frames(1)
assert g['speed_y'] < 0`],
          ['Missing gives the other player a point', c`hold(); g.update(state='playing', left_y=0, right_score=0, ball_x=-10, ball_y=300, speed_x=-5, speed_y=0)
frames(1); assert g['right_score'] == 1, 'The ball went off the left edge, so the right player scores.'
assert approx(g['ball_x'], g['WIDTH'] / 2, 20), 'The ball should be reset to the middle.'`],
          ['First to 5 wins', c`hold(); g.update(state='playing', left_score=4, right_score=0, right_y=0, ball_x=g['WIDTH'] - 2, ball_y=300, speed_x=5, speed_y=0)
frames(1); assert g['left_score'] == 5 and g['state'] == 'gameover'`],
        ],
      },
    },
    {
      id: 'proj-snake', title: 'Project: Snake', minutes: 30,
      blocks: [
        ['p', `🐍 Fittingly for a Python course! Guide a growing snake around a grid to eat apples. Every apple makes it longer, and you lose if you hit a wall or your own tail.`],
        ['code', SNAKE, { game: true, title: 'snake.py' }],
        ['h', 'A grid game'],
        ['p', `Unlike our other games, the snake moves on a <b>grid</b> of 20-pixel cells, using grid coordinates <code>(col, row)</code>. Drawing converts them to pixels by multiplying by <code>CELL</code>.`],
        ['h', 'The clever bit: how the snake moves'],
        ['p', `The snake is a list of cells with the head first. To move, we don't shift every piece. We just <b>add a new head</b> in front and <b>remove the last piece of the tail</b>. If it ate an apple, we skip removing the tail, and that's how it grows!`],
        ['code', c`snake = [(5, 5), (4, 5), (3, 5)]      # head is first
snake.insert(0, (6, 5))                # new head
snake.pop()                            # remove the tail
print(snake)`],
        ['list', [`<code>direction</code> is a tuple like <code>(1, 0)</code> (right) or <code>(0, -1)</code> (up). Adding it to the head gives the next cell.`, `The snake only moves every <code>MOVE_EVERY</code> frames, otherwise it would be far too fast at 60 moves per second.`, `It can't reverse straight back into itself: if the new direction added to the current one gives <code>(0, 0)</code>, they're opposites.`]],
      ],
      quiz: [
        { q: 'The head is at (8, 3) and direction is (0, -1). Where does the head go next?', options: ['(8, 2)', '(8, 4)', '(7, 3)', '(9, 3)'], answer: 0, explain: 'Add the direction: (8 + 0, 3 - 1) = (8, 2). That\'s one row up.' },
        { q: 'How does the snake grow when it eats?', options: ['A piece is added to the tail', 'The new head is added but the tail isn\'t removed that move', 'The snake list is doubled', 'CELL gets bigger'], answer: 1, explain: 'Normally a head is added and the tail removed; skipping the removal makes it one piece longer.' },
      ],
      challenge: {
        game: true,
        task: `<p>Write the snake's brain:</p><ol><li><code>next_head(snake, direction)</code> returns the cell in front of the head.</li><li><code>step()</code> moves the snake one cell: if the new head is off the grid or on the snake, set state to "gameover". Otherwise insert it at the front; if it's on the food, add 1 to score and <code>place_food()</code>, otherwise remove the tail.</li><li><code>on_key_down(key)</code>: arrow keys change <code>direction</code> (but never to the exact opposite), and space restarts after game over.</li></ol>`,
        starter: blankFns(SNAKE, ['next_head', 'step', 'on_key_down']),
        solution: SNAKE,
        hints: ['next_head: unpack <code>head_x, head_y = snake[0]</code> and <code>dx, dy = direction</code>, then return <code>(head_x + dx, head_y + dy)</code>.', 'For turning, use a dictionary: <code>turns = {"up": (0, -1), "down": (0, 1), "left": (-1, 0), "right": (1, 0)}</code>.'],
        tests: [
          ['next_head works', c`assert next_head([(5, 5), (4, 5)], (1, 0)) == (6, 5) and next_head([(5, 5)], (0, -1)) == (5, 4)`],
          ['step() moves the snake', c`g.update(snake=[(5, 5), (4, 5), (3, 5)], direction=(1, 0), food=(20, 15), state='playing', score=0); step()
assert g['snake'] == [(6, 5), (5, 5), (4, 5)], 'snake is %s' % g['snake']`],
          ['Eating grows the snake', c`g.update(snake=[(6, 5), (5, 5), (4, 5)], direction=(1, 0), food=(7, 5), state='playing', score=0); step()
assert len(g['snake']) == 4 and g['score'] == 1 and g['food'] != (7, 5), 'Length %d, score %r, food %r' % (len(g['snake']), g['score'], g['food'])`],
          ['Hitting a wall ends the game', c`g.update(snake=[(g['COLS'] - 1, 5), (g['COLS'] - 2, 5)], direction=(1, 0), state='playing'); step()
assert g['state'] == 'gameover'`],
          ['Hitting yourself ends the game', c`g.update(snake=[(5, 5), (6, 5), (6, 6), (5, 6), (4, 6)], direction=(0, 1), state='playing'); step()
assert g['state'] == 'gameover'`],
          ['Turning, but no reversing', c`g.update(direction=(1, 0), state='playing'); press('up'); assert g['direction'] == (0, -1), 'up should turn the snake'
press('down'); assert g['direction'] == (0, -1), 'The snake must not reverse straight back.'`],
        ],
      },
    },
    {
      id: 'proj-shooter', title: 'Project: Space Shooter', minutes: 30,
      blocks: [
        ['p', `👾 Defend Earth! Move your ship and press space to fire at waves of aliens. Each alien you hit is worth 10 points, but every alien that gets past costs a life.`],
        ['code', SHOOTER, { game: true, title: 'shooter.py' }],
        ['h', 'Checking every bullet against every alien'],
        ['p', `With several bullets and several aliens, we must check <b>every pair</b>, which is a job for nested loops. When a pair collides, we don't remove them straight away (remember: never remove from a list while looping over it!). Instead we <b>mark</b> them with <code>"dead": True</code>, then build new lists afterwards that leave out the dead ones.`],
        ['list', [`<code>a.get("dead")</code> is None (which counts as False) until an alien is marked.`, `Bullets are limited to 5 at once, so the player has to aim rather than hold down the trigger.`, `Aliens appear a little more often as the score rises.`]],
      ],
      quiz: [
        { q: 'With 4 bullets and 6 aliens on screen, how many bullet/alien pairs are checked each frame?', options: ['10', '24', '6', '4'], answer: 1, explain: 'Each of the 4 bullets is checked against each of the 6 aliens: 4 × 6 = 24.' },
      ],
      challenge: {
        game: true,
        task: `<p>Write <code>hit(bullet, alien)</code>, <code>on_key_down(key)</code> and <code>update()</code>:</p><ol><li><code>hit</code>: True if the centres are less than 25 pixels apart.</li><li><code>on_key_down</code>: space fires a bullet <code>{"x": ship_x, "y": SHIP_Y - 20}</code> (max 5 at once) while playing, or restarts after game over.</li><li><code>update</code>: move the ship, spawn aliens on a timer, move bullets up 8 and aliens down by their speed, mark and remove bullet/alien pairs that hit (+10 score each), remove bullets off the top, take a life for each alien that falls below the screen, and set state to "gameover" when lives reach 0.</li></ol>`,
        starter: blankFns(SHOOTER, ['hit', 'on_key_down', 'update']),
        solution: SHOOTER,
        hints: ['Firing: <code>if len(bullets) &lt; 5: bullets.append({"x": ship_x, "y": SHIP_Y - 20})</code>', 'For collisions, loop <code>for b in bullets: for a in aliens:</code>; when they hit, set <code>a["dead"] = True</code> and <code>b["dead"] = True</code>, then rebuild both lists without the dead ones.'],
        tests: [
          ['hit() works', c`assert hit({'x': 100, 'y': 100}, {'x': 110, 'y': 110}) is True and hit({'x': 100, 'y': 100}, {'x': 100, 'y': 140}) is False`],
          ['Space fires a bullet', c`g.update(state='playing', bullets=[], ship_x=200); press('space')
assert len(g['bullets']) == 1 and approx(g['bullets'][0]['x'], 200, 1)`],
          ['Bullets fly up and leave', c`hold(); g.update(state='playing', bullets=[{'x': 100, 'y': 300}], aliens=[], spawn_timer=0); frames(1)
assert g['bullets'][0]['y'] < 300, 'Bullets should move up.'
g.update(bullets=[{'x': 100, 'y': -5}]); frames(1); assert g['bullets'] == [], 'Remove bullets that leave the top.'`],
          ['Shooting an alien scores 10', c`hold(); g.update(state='playing', bullets=[{'x': 100, 'y': 205}], aliens=[{'x': 100, 'y': 200, 'speed': 0}], score=0, spawn_timer=0)
frames(1)
assert g['score'] == 10, 'score is %r' % g['score']
assert not [a for a in g['aliens'] if a['x'] == 100] and g['bullets'] == [], 'The alien and bullet should both be removed.'`],
          ['Aliens that escape cost a life', c`hold(); g.update(state='playing', aliens=[{'x': 300, 'y': g['HEIGHT'] - 1, 'speed': 2}], bullets=[], lives=3, spawn_timer=0)
frames(1); assert g['lives'] == 2`],
          ['Game over at 0 lives', c`hold(); g.update(state='playing', aliens=[{'x': 300, 'y': g['HEIGHT'] - 1, 'speed': 2}], bullets=[], lives=1, spawn_timer=0)
frames(1); assert g['state'] == 'gameover'`],
        ],
      },
    },
    {
      id: 'proj-platformer', title: 'Project: Platformer', minutes: 35,
      blocks: [
        ['p', `🦊 The most advanced project: a platform game! Run and jump across platforms, collect stars and reach the flag. It combines gravity, keyboard control, collisions and lists.`],
        ['p', `Controls: <b>← →</b> to run, <b>space</b> or <b>↑</b> to jump.`],
        ['code', PLATFORMER, { game: true, title: 'platformer.py' }],
        ['h', 'Landing on platforms'],
        ['p', `The tricky part of every platformer is landing. The player should land on a platform when falling onto it from <b>above</b>, but be able to jump up through it from below. We check four things for each platform:`],
        ['list', [`The player is falling or still: <code>vy >= 0</code>`, `Last frame, their feet were above the platform: <code>py + SIZE - vy &lt;= y</code>`, `Now their feet are at or below its top: <code>py + SIZE >= y</code>`, `They're horizontally over it: <code>px + SIZE > x and px &lt; x + w</code>`]],
        ['p', `If all are true, we snap the player onto the platform's top. Because the level is just a <b>list of tuples</b>, you can design a whole new level by editing the numbers, without changing any code.`],
        ['tip', `Design your own level: add platforms and stars to the lists, move the flag, and make sure every jump is possible. With these settings a jump reaches about 120 pixels high.`],
      ],
      quiz: [
        { q: 'Why check that the player\'s feet were above the platform LAST frame?', options: ['To make it faster', 'So the player lands when falling from above, but can jump up through platforms from below', 'It isn\'t needed', 'To count frames'], answer: 1, explain: 'Without it, a player jumping up into a platform would teleport onto its top.' },
      ],
      challenge: {
        game: true,
        task: `<p>Write <code>update()</code> for the platformer (only while playing):</p><ol><li>Move left/right by <code>MOVE_SPEED</code>, keeping the player on screen.</li><li>Apply gravity: <code>vy += GRAVITY</code>, <code>py += vy</code>.</li><li>Set <code>on_ground</code> to False, then land on any platform using the four checks from the lesson (snap <code>py</code> to the platform's top minus SIZE, <code>vy = 0</code>, <code>on_ground = True</code>).</li><li>If the player falls below the screen, call <code>reset_player()</code>.</li><li>Collect stars within 25 pixels of the player's centre (score +1, remove from <code>coins</code>).</li><li>Set state to "won" when the player's centre is within 35 pixels of the goal.</li></ol>`,
        starter: blankFns(PLATFORMER, ['update']),
        solution: PLATFORMER,
        hints: ['The player\'s centre is <code>(px + SIZE / 2, py + SIZE / 2)</code>.', 'Rebuild <code>coins</code> as a new list of the ones not collected (remember <code>global coins</code>).'],
        tests: [
          ['Running left and right', c`hold('right'); g.update(state='playing', px=100, py=270, vy=0, platforms=[(0, 300, 600, 20)], coins=[]); frames(1)
assert g['px'] == 100 + g['MOVE_SPEED']`],
          ['Landing on a platform', c`hold(); g.update(state='playing', platforms=[(0, 300, 600, 20)], coins=[], px=100, py=268, vy=4, on_ground=False); frames(1)
assert g['py'] == 300 - g['SIZE'] and g['vy'] == 0 and g['on_ground'] is True, 'py=%r vy=%r on_ground=%r' % (g['py'], g['vy'], g['on_ground'])`],
          ['Falling through a gap', c`hold(); g.update(state='playing', platforms=[(0, 300, 50, 20)], coins=[], px=200, py=268, vy=4, on_ground=False); frames(1)
assert g['on_ground'] is False and g['py'] > 268`],
          ['Jumping up through a platform from below', c`hold(); g.update(state='playing', platforms=[(0, 200, 600, 15)], coins=[], px=100, py=215, vy=-8, on_ground=False); frames(1)
assert g['vy'] < 0 and g['on_ground'] is False, 'Moving upwards, the player should pass through.'`],
          ['Collecting a star', c`hold(); g.update(state='playing', px=100, py=270, vy=0, platforms=[(0, 300, 600, 20)], coins=[(115, 285), (500, 100)], score=0); frames(1)
assert g['score'] == 1 and g['coins'] == [(500, 100)], 'score=%r coins=%r' % (g['score'], g['coins'])`],
          ['Falling off resets the player', c`hold(); g.update(state='playing', px=100, py=g['HEIGHT'] + 10, vy=5, platforms=[], coins=[]); frames(1)
assert g['py'] < g['HEIGHT']`],
          ['Reaching the flag wins', c`hold(); g.update(state='playing', px=100, py=270, vy=0, platforms=[(0, 300, 600, 20)], coins=[], goal=(115, 285)); frames(1)
assert g['state'] == 'won'`],
        ],
      },
    },
    ],
  };

  /* =========================================================== */
  const BLANK = c`# ============================================
#  MY GAME
#  Controls: arrow keys to move, SPACE to start
#  Goal:
# ============================================
import random
import math

# ---------- settings (constants) ----------
WIDTH = 600
HEIGHT = 400

# ---------- game state ----------
state = "title"
score = 0
player_x = WIDTH / 2
player_y = HEIGHT / 2


def reset_game():
    global score, player_x, player_y
    score = 0
    player_x = WIDTH / 2
    player_y = HEIGHT / 2


def on_key_down(key):
    global state
    if key == "space" and state != "playing":
        reset_game()
        state = "playing"


def update():
    global player_x, player_y
    if state != "playing":
        return
    if keyboard.left:
        player_x -= 4
    if keyboard.right:
        player_x += 4
    if keyboard.up:
        player_y -= 4
    if keyboard.down:
        player_y += 4


def draw():
    screen.fill("black")
    if state == "title":
        screen.text("MY GAME", WIDTH / 2, 150, 56, "white", center=True)
        screen.text("Press SPACE to start", WIDTH / 2, 230, 24, "white", center=True)
    elif state == "playing":
        screen.emoji("🙂", player_x, player_y, 40)
        screen.text(f"Score: {score}", 10, 10, 24, "white")
    else:
        screen.text("GAME OVER", WIDTH / 2, 170, 56, "red", center=True)
        screen.text("Press SPACE to play again", WIDTH / 2, 240, 22, "white", center=True)`;

  const BEE = c`# ============================================
#  BUZZ: a bee collects flowers and avoids wasps
#  Controls: arrow keys to fly, SPACE to start
#  Goal: collect as many flowers as you can
# ============================================
import random
import math

WIDTH = 640
HEIGHT = 420
BEE_SPEED = 5

state = "title"
score = 0
best = 0
bee_x = WIDTH / 2
bee_y = HEIGHT / 2
flowers = []
wasps = []


def new_flower():
    return {"x": random.randint(30, WIDTH - 30), "y": random.randint(60, HEIGHT - 30)}


def new_wasp():
    return {"x": random.choice([0, WIDTH]), "y": random.randint(0, HEIGHT), "speed": random.uniform(1, 1.8)}


def close(ax, ay, bx, by, distance):
    return math.hypot(ax - bx, ay - by) < distance


def reset_game():
    global score, bee_x, bee_y, flowers, wasps
    score = 0
    bee_x, bee_y = WIDTH / 2, HEIGHT / 2
    flowers = [new_flower() for i in range(3)]
    wasps = [new_wasp()]


def on_key_down(key):
    global state
    if key == "space" and state != "playing":
        reset_game()
        state = "playing"


def update():
    global bee_x, bee_y, score, best, state
    if state != "playing":
        return
    if keyboard.left:
        bee_x -= BEE_SPEED
    if keyboard.right:
        bee_x += BEE_SPEED
    if keyboard.up:
        bee_y -= BEE_SPEED
    if keyboard.down:
        bee_y += BEE_SPEED
    bee_x = max(20, min(bee_x, WIDTH - 20))
    bee_y = max(20, min(bee_y, HEIGHT - 20))

    for i in range(len(flowers)):
        f = flowers[i]
        if close(bee_x, bee_y, f["x"], f["y"], 35):
            score += 1
            flowers[i] = new_flower()
            if score % 5 == 0:
                wasps.append(new_wasp())        # one more wasp every 5 flowers

    for w in wasps:
        if w["x"] < bee_x:
            w["x"] += w["speed"]
        else:
            w["x"] -= w["speed"]
        if w["y"] < bee_y:
            w["y"] += w["speed"]
        else:
            w["y"] -= w["speed"]
        if close(bee_x, bee_y, w["x"], w["y"], 30):
            state = "gameover"
            best = max(best, score)


def draw():
    screen.fill("yellowgreen")
    if state == "title":
        screen.text("BUZZ", WIDTH / 2, 140, 72, "gold", center=True)
        screen.emoji("🐝", WIDTH / 2, 220, 70)
        screen.text("Collect flowers, avoid the wasps. Press SPACE!", WIDTH / 2, 300, 22, "darkgreen", center=True)
        return
    for f in flowers:
        screen.emoji("🌸", f["x"], f["y"], 36)
    for w in wasps:
        screen.emoji("🦟", w["x"], w["y"], 34)
    screen.emoji("🐝", bee_x, bee_y, 44)
    screen.text(f"Flowers: {score}   Best: {best}", 10, 10, 24, "darkgreen")
    if state == "gameover":
        screen.text("STUNG!", WIDTH / 2, 170, 64, "darkred", center=True)
        screen.text("Press SPACE to fly again", WIDTH / 2, 240, 24, "darkgreen", center=True)`;

  const m19 = {
    id: 'm19', title: 'Your Own Game', icon: '🏆',
    desc: 'Plan, build and polish a game of your own design, then take your skills further.',
    lessons: [
    {
      id: 'game-design', title: 'Designing Your Game', minutes: 20,
      blocks: [
        ['p', `You now know everything you need to make your own game. 🎉 Before writing code, game designers <b>plan</b>. A little planning saves a lot of time and stops you getting lost halfway through.`],
        ['h', '1. Start with a core idea'],
        ['p', `Describe your game in one sentence: <i>"A bee collects flowers while avoiding wasps."</i> <i>"A penguin slides down a mountain dodging trees."</i> The best first games are <b>small</b>. You can always add more later, but an unfinished huge game is no fun for anyone.`],
        ['h', '2. Answer the big questions'],
        ['list', [`<b>Goal:</b> what is the player trying to do?`, `<b>Controls:</b> which keys or clicks? (Keep it to just a few.)`, `<b>Challenge:</b> what makes it hard? Enemies, a time limit, obstacles, increasing speed?`, `<b>Win or lose:</b> how does a game end?`, `<b>Feedback:</b> how does the player know how they're doing? Score, lives, a timer?`]],
        ['h', '3. Pick the techniques you need'],
        ['p', `Match your idea to the skills from this course:`],
        ['list', [
          `Moving a player → <a href="#/lesson/keyboard">Keyboard Controls</a>`,
          `Things that move on their own → <a href="#/lesson/bounce">Speed & Bouncing</a>, <a href="#/lesson/many-things">Animating Lots of Things</a>`,
          `Touching and collecting → <a href="#/lesson/rect-collision">Rectangle Collisions</a>, <a href="#/lesson/collect">Collecting Things</a>`,
          `Lots of enemies → <a href="#/lesson/enemies">Spawning & Removing</a>, <a href="#/lesson/sprite-classes">Game Objects with Classes</a>`,
          `Title and game-over screens → <a href="#/lesson/game-states">Game States</a>`,
          `Countdowns, getting harder → <a href="#/lesson/timers">Timers & Difficulty</a>`,
          `Jumping → <a href="#/lesson/gravity">Gravity & Jumping</a>, <a href="#/lesson/proj-platformer">Platformer</a>`,
          `Grid or board games → <a href="#/lesson/grids">Grids</a>, <a href="#/lesson/proj-snake">Snake</a>`]],
        ['h', '4. Plan the build order'],
        ['p', `Build your game in small steps and <b>run it after every step</b>. Get the most basic playable version working first (this is sometimes called a <b>prototype</b>), then add features one at a time. For example:`],
        ['steps', [`Draw the player and move it with the keys.`, `Add one thing to collect, and a score.`, `Add one enemy, and losing.`, `Add title and game-over screens with restart.`, `Add more enemies and make it get harder.`, `Polish: colours, messages, a best score.`]],
        ['h', '5. Playtest'],
        ['p', `Play your game a lot, and ask someone else to play it <b>without</b> you explaining anything. Watch where they get confused or stuck. Is it too easy? Too hard? Adjust your constants (speeds, timers, sizes) until it feels right.`],
        ['key', [`Start small: a one-sentence idea.`, `Decide goal, controls, challenge, win/lose and feedback.`, `Build a basic playable version first, then add features one by one.`, `Run your game after every change, and playtest with others.`]],
      ],
      quiz: [
        { q: 'What\'s the best way to build a game?', options: ['Write all the code, then run it at the end', 'Get a simple playable version working, then add features one at a time, running it after each', 'Start with the title screen and music', 'Copy a big game exactly'], answer: 1, explain: 'Small steps mean you always have a working game, and when something breaks you know it was the last change.' },
        { q: 'Why should someone else playtest your game?', options: ['To find spelling mistakes', 'They see it fresh and show you what\'s confusing, too hard or too easy', 'It\'s required by Python', 'So they can fix the code'], answer: 1, explain: 'As the designer you already know how everything works. A new player shows you what really happens.' },
      ],
      challenge: {
        task: `<p>Write your game plan as a Python <b>dictionary</b> called <code>my_game</code> with these keys:</p><ul><li><code>"title"</code>, <code>"idea"</code> (one sentence), <code>"controls"</code>, <code>"goal"</code>, <code>"lose"</code> (how the player loses): all strings</li><li><code>"features"</code>: a list of at least 3 features</li><li><code>"build_order"</code>: a list of at least 4 steps, in the order you'll build them</li></ul><p>You'll build this game in the next lesson, so make it something you'd like to play!</p>`,
        starter: c`my_game = {
    "title": "",
    "idea": "",
    "controls": "",
    "goal": "",
    "lose": "",
    "features": [],
    "build_order": [],
}

print(my_game["title"])
`,
        solution: c`my_game = {
    "title": "Buzz",
    "idea": "A bee flies around a garden collecting flowers while avoiding wasps.",
    "controls": "Arrow keys to fly, space to start",
    "goal": "Collect as many flowers as possible",
    "lose": "A wasp catches the bee",
    "features": ["wasps that chase the bee", "a new wasp every 5 flowers", "title and game over screens", "best score"],
    "build_order": [
        "draw the bee and fly it with the arrow keys",
        "add flowers to collect and a score",
        "add one wasp that chases the bee, and game over",
        "add title screen and restart",
        "add more wasps as the score goes up, and a best score",
    ],
}

print(my_game["title"])`,
        hints: ['Fill in each string between the quotes, e.g. <code>"title": "Penguin Slide",</code>', 'Lists go in square brackets with commas: <code>"features": ["trees to dodge", "fish to collect", "speed up over time"]</code>'],
        tests: [
          ['my_game is a dictionary', c`assert isinstance(my_game, dict)`],
          ['Title, idea, controls, goal and lose are filled in', c`for k in ['title', 'idea', 'controls', 'goal', 'lose']:
    assert isinstance(my_game.get(k), str) and my_game[k].strip(), 'Fill in "%s".' % k`],
          ['At least 3 features', c`f = my_game.get('features')
assert isinstance(f, list) and len([x for x in f if str(x).strip()]) >= 3, 'Add at least 3 features to the list.'`],
          ['A build order with at least 4 steps', c`b = my_game.get('build_order')
assert isinstance(b, list) and len([x for x in b if str(x).strip()]) >= 4, 'Plan at least 4 steps.'`],
        ],
      },
    },
    {
      id: 'final-game', title: 'Final Project: Build Your Own Game', minutes: 60,
      blocks: [
        ['p', `This is it: the final project. 🏆 You're going to build <b>your own game</b>, the one you planned in the last lesson, using everything you've learned since your very first <code>print("Hello, World!")</code>.`],
        ['h', 'A good structure for any game'],
        ['p', `Organise your program in this order and it will stay easy to read however big it gets:`],
        ['steps', [`A comment at the top: the game's name, controls and goal.`, `<code>import</code> lines.`, `<b>Settings</b>: constants in CAPITALS (sizes, speeds, colours).`, `<b>Game state</b>: variables like <code>state</code>, <code>score</code>, positions, and lists of objects.`, `<b>Classes and helper functions</b>, each doing one job (e.g. <code>new_enemy()</code>, <code>touching()</code>).`, `<code>reset_game()</code>, then the event handlers (<code>on_key_down</code>, <code>on_mouse_down</code>).`, `<code>update()</code>: the rules of the game.`, `<code>draw()</code>: everything the player sees.`]],
        ['h', 'An example to learn from'],
        ['p', `Here's a complete original game built that way: a bee collecting flowers while wasps chase it. Play it, read it, and notice how every part uses something from the course.`],
        ['code', BEE, { game: true, title: 'buzz.py' }],
        ['h', 'Debugging games'],
        ['list', [`<b>Show values on the screen</b> while you test: <code>screen.text(f"x={player_x:.0f} vy={vy:.1f}", 10, 380, 16, "white")</code>.`, `<b>Draw hitboxes</b>: an outlined rectangle where your collision box is, so you can see what's really touching.`, `<code>print()</code> still works: the messages appear under the game.`, `If the screen freezes or the game stops, read the error message under it. It shows the exact line.`, `Change <b>one thing at a time</b> and run the game after each change.`]],
        ['h', 'Polish: make it feel great'],
        ['list', [`A title screen that explains the controls.`, `A best score that survives restarts.`, `Difficulty that slowly increases.`, `Flashing when the player is hit, or messages like "+10" that float up and fade.`, `A good colour scheme, and emoji that fit your theme.`]],
        ['h', 'Taking it further: Python games on your own computer'],
        ['p', `Everything you've learned is real Python and works anywhere. To make games on your own computer, install Python from <b>python.org</b> and a friendly editor such as <b>Thonny</b> or <b>VS Code</b>. Then try one of these libraries:`],
        ['list', [
          `<b>Pygame Zero</b> works almost exactly like this course! It's built for learners, and has <code>draw()</code>, <code>update()</code>, <code>on_key_down()</code>, <code>WIDTH</code>, <code>HEIGHT</code> and <code>keyboard.left</code> just like here. The main difference is how you draw: <code>screen.draw.filled_rect(Rect((x, y), (w, h)), "red")</code>, <code>screen.draw.filled_circle((x, y), radius, "gold")</code> and <code>screen.draw.text("Hi", (x, y), fontsize=30)</code>. Instead of emoji you use <b>Actor</b> objects with your own image files, and key names are written like <code>keys.SPACE</code>.`,
          `<b>Pygame</b> is the library Pygame Zero is built on. It gives you full control, but you write the game loop yourself with a <code>while</code> loop, handle events, and call <code>clock.tick(60)</code> to run at 60 frames per second. Many famous indie games began as Pygame projects.`,
          `<b>Arcade</b> is another modern Python game library, which uses classes heavily. That's a great next step after the classes lessons.`]],
        ['tip', `Use <b>⬇ Download .py</b> in the <a href="#/studio">Game Studio</a> to keep a copy of your code. When you move to Pygame Zero, the logic in your <code>update()</code> (movement, collisions, scores and states) carries over almost unchanged; mainly the drawing lines need rewriting.`],
      ],
      quiz: [
        { q: 'Where should constants like <code>PLAYER_SPEED = 5</code> go?', options: ['Inside draw()', 'Near the top of the program, in a settings section', 'At the very bottom', 'Inside every function that uses them'], answer: 1, explain: 'Keeping settings together at the top makes the game easy to tweak and balance.' },
        { q: 'Which skills from this course carry over to Pygame Zero almost unchanged?', options: ['None of them', 'Game logic: variables, update(), collisions, lists, classes and game states', 'Only print()', 'Only emoji'], answer: 1, explain: 'It\'s all real Python. Mostly just the drawing commands look a little different.' },
      ],
      challenge: {
        game: true,
        task: `<p><b>Build your own game!</b> Use your plan from the last lesson, or any idea you like. To complete the course, your game must:</p><ol><li>have <code>draw()</code> and <code>update()</code> functions</li><li>respond to the player (keyboard and/or mouse)</li><li>have a <code>score</code> variable that is shown on screen with <code>screen.text</code></li><li>have a <code>state</code> variable and a way to win or lose (e.g. a game-over screen)</li><li>use a list or a class for game objects</li><li>define at least 5 functions</li><li>be at least 60 lines of real code (not counting blank lines and comments)</li><li>run for 10 seconds of random play without any errors</li></ol><p>The starter is a basic skeleton to build on. Make it <i>yours</i>, then save it in the <a href="#/studio">Game Studio</a> to keep improving it. 🎮</p>`,
        starter: BLANK,
        solution: BEE,
        hints: ['Follow your build order one step at a time, running the game after each step. Look back at the projects for code you can reuse, like the collecting or enemy-spawning patterns.', 'Stuck on the requirements? A list of enemies with <code>.append()</code>, a <code>new_enemy()</code> function and a game-over check when the player touches one will cover most of them.'],
        tests: [
          ['Has draw() and update()', c`assert callable(g.get('draw')) and callable(g.get('update')), 'Define both draw() and update().'`],
          ['Responds to the player', c`assert any(k in source for k in ('keyboard.', 'keyboard[', 'on_key_down', 'on_mouse_down', 'mouse.')), 'Use keyboard, on_key_down or on_mouse_down so the player can control the game.'`],
          ['Has a score shown on screen', c`import re
assert 'score' in g, 'Create a variable called score.'
assert re.search(r'screen\.text\([^\n]*score', source), 'Show the score with screen.text(f"Score: {score}", ...).'`],
          ['Has a game state and a way to win or lose', c`assert 'state' in g, 'Create a variable called state (e.g. "title", "playing", "gameover").'
low = source.lower()
assert any(w in low for w in ('game over', 'gameover', 'win', 'won', 'lose', 'lost', 'crash', 'stung', "time's up")), 'Add a way for the game to end, e.g. a "gameover" state.'`],
          ['Uses a list or class for game objects', c`assert 'class ' in source or '.append(' in source or any(isinstance(v, list) and v for k, v in g.items() if not k.startswith('_')), 'Store game objects in a list (or use a class).'`],
          ['Defines at least 5 functions', c`n = source.count('def ')
assert n >= 5, 'You have %d function(s). Split your game into more functions (like new_enemy() or touching()).' % n`],
          ['At least 60 lines of real code', c`n = len([l for l in source.splitlines() if l.strip() and not l.strip().startswith('#')])
assert n >= 60, 'Your game has %d lines of code. Keep building: add more features!' % n`],
          ['Runs 10 seconds of play without errors', c`simulate(600)`],
        ],
      },
    },
    ],
  };

  COURSE.push(m13, m14, m15, m16, m17, m18, m19);

  /* ---------- Game Studio templates ---------- */
  window.GAME_TEMPLATES = {
    'Blank game': BLANK,
    'Buzz (example)': BEE,
    'Catch the Fruit': CATCH,
    'Asteroid Dodge': DODGE,
    'Paddle Ball': PADDLE,
    'Snake': SNAKE,
    'Space Shooter': SHOOTER,
    'Platformer': PLATFORMER,
  };

  /* ---------- Cheat sheet + glossary ---------- */
  REFERENCE.push(
    ['Games: drawing', c`def draw():                       # called ~60 times a second
    screen.fill("skyblue")         # or (r, g, b)
    screen.rect(x, y, w, h, "red")        # x, y = top-left
    screen.circle(x, y, radius, "gold")   # x, y = centre
    screen.line(x1, y1, x2, y2, "white", 3)
    screen.polygon([(x1, y1), (x2, y2), (x3, y3)], "green")
    screen.text("Hi", x, y, 24, "white", center=True)
    screen.emoji("🐱", x, y, 40)          # centred
    screen.rect(x, y, w, h, "red", 3)     # outline only

WIDTH = 600   HEIGHT = 400   # set to resize
# (0, 0) is top-left; y goes DOWN`],
    ['Games: loop & controls', c`x = 0

def update():               # ~60 times a second
    global x                # to change top-level vars
    if keyboard.left:       # held down right now
        x -= 4
    # keyboard.right .up .down .space .a .w ...

def on_key_down(key):       # once per press
    if key == "space":
        jump()

def on_mouse_down(x, y):    # click or tap
    ...
# mouse.x, mouse.y = current mouse position`],
    ['Games: collisions & motion', c`import math
# circles / emoji: distance between centres
math.hypot(x1 - x2, y1 - y2) < r1 + r2

# rectangles
ax < bx + bw and ax + aw > bx and \
ay < by + bh and ay + ah > by

x += speed_x            # velocity
speed_x = -speed_x      # bounce
vy += GRAVITY; y += vy  # gravity
x = max(0, min(x, WIDTH - size))   # clamp
items = [i for i in items if i["y"] < HEIGHT]`],
  );
  GLOSSARY.push(
    ['Clamp', 'Keep a value between a minimum and maximum, e.g. <code>max(0, min(x, 560))</code>.'],
    ['Collision detection', 'Checking whether two game objects are touching.'],
    ['Constant', 'A value that never changes while the program runs, written in CAPITALS, e.g. <code>SPEED = 5</code>.'],
    ['Event handler', 'A function called when something happens, like <code>on_key_down(key)</code>.'],
    ['Frame', 'One run of the game loop: update, then draw. About 60 per second.'],
    ['Game loop', 'The repeating cycle of input → update → draw that runs every game.'],
    ['Game state', 'Which part of the game is active, e.g. "title", "playing" or "gameover".'],
    ['global', 'A keyword that lets a function change a variable created outside it.'],
    ['Hitbox', 'The invisible shape used to check collisions for a game object.'],
    ['Inheritance', 'Making a new class based on an existing one: <code>class Dragon(Enemy):</code>.'],
    ['Pixel', 'One tiny dot on the screen. Positions and sizes are measured in pixels.'],
    ['Sprite', 'A picture of a character or object in a game.'],
    ['Velocity', 'Speed in a particular direction, e.g. <code>speed_x = -3</code> means 3 pixels left per frame.'],
  );
  GLOSSARY.sort((a, b) => a[0].localeCompare(b[0], undefined, { sensitivity: 'base' }));
})();
