/* Extra core lessons (nested loops, grids, lists of dictionaries, inheritance)
 * and the Text Games module. Loaded after lessons.js; slots lessons into COURSE. */
(function () {
  const mod = id => COURSE.find(m => m.id === id);
  const take = (modId, lessonId) => { const m = mod(modId); const i = m.lessons.findIndex(l => l.id === lessonId); return m.lessons.splice(i, 1)[0]; };
  const pre = t => `<pre class="static" style="background:var(--surface-2);padding:10px 14px;border-radius:8px">${t}</pre>`;

  /* ---------- Loops: nested loops ---------- */
  mod('m5').lessons.push({
    id: 'nested-loops', title: 'Loops Inside Loops', minutes: 12,
    blocks: [
      ['p', `You can put a loop <b>inside</b> another loop. For every single turn of the outer loop, the inner loop runs all the way through. This is called a <b>nested loop</b>.`],
      ['code', c`for row in range(3):
    for col in range(4):
        print(f"row {row}, col {col}")
    print("--- end of row", row)`],
      ['p', `The outer loop runs 3 times, and each time the inner loop runs 4 times, so the inner <code>print</code> happens 3 × 4 = <b>12</b> times.`],
      ['analogy', `Think of a clock: the minute hand goes all the way round (the inner loop) for every single step of the hour hand (the outer loop).`],
      ['h', 'Building patterns'],
      ['p', `Nested loops are perfect for anything with rows and columns. Here the inner loop builds up one row of text, then the outer loop prints it:`],
      ['code', c`for row in range(4):
    line = ""
    for col in range(6):
        line += "#"
    print(line)`],
      ['p', `<code>print</code> normally ends with a new line. You can change that with <code>end=""</code>, which lets several prints share one line:`],
      ['code', c`for row in range(1, 4):
    for col in range(1, 4):
        print(row * col, end="\t")   # \t is a tab, which lines things up
    print()                          # finish the row`],
      ['tip', `Games use nested loops all the time: to draw a grid of tiles, check every square on a board, or test every bullet against every enemy.`],
      ['key', [`A loop inside a loop is a nested loop.`, `The inner loop runs completely for each turn of the outer loop.`, `Total repeats = outer count × inner count.`, `<code>print(x, end="")</code> stops print starting a new line.`]],
    ],
    quiz: [
      { q: 'How many times is "Hi" printed?', code: c`for a in range(2):
    for b in range(5):
        print("Hi")`, options: ['2', '5', '7', '10'], answer: 3, explain: 'The inner loop runs 5 times for each of the 2 outer turns: 2 × 5 = 10.' },
      { q: 'What does this print?', code: c`for i in range(1, 3):
    for j in range(1, 3):
        print(i, j)`, options: ['1 1, 1 2, 2 1, 2 2', '1 1, 2 2', '1 2, 2 1', '1 1, 2 1, 1 2, 2 2'], answer: 0, explain: 'i stays at 1 while j goes 1 then 2; then i becomes 2 and j goes 1, 2 again.' },
    ],
    challenge: {
      task: `<p>Use <b>nested loops</b> to print this triangle of stars (5 rows). The outer loop should choose the row, and an inner loop should add the stars for that row one at a time.</p>${pre('*\n**\n***\n****\n*****')}`,
      starter: c`for row in range(1, 6):
    line = ""
    # add an inner loop here

    print(line)
`,
      solution: c`for row in range(1, 6):
    line = ""
    for star in range(row):
        line += "*"
    print(line)`,
      hints: ['Row 1 needs 1 star, row 2 needs 2 stars... so the inner loop should repeat <code>row</code> times: <code>for star in range(row):</code>', 'Inside the inner loop, add one star: <code>line += "*"</code>'],
      tests: [
        ['Prints the triangle', c`assert [l for l in lines if l] == ['*', '**', '***', '****', '*****'], 'You printed: %s' % lines`],
        ['Uses nested loops', c`assert source.count('for ') >= 2, 'Use a for loop inside another for loop.'`],
      ],
    },
  });

  /* ---------- Lists: grids ---------- */
  mod('m6').lessons.push({
    id: 'grids', title: 'Grids: Lists of Lists', minutes: 14,
    blocks: [
      ['p', `A list can hold other lists! A <b>list of lists</b> makes a <b>grid</b> with rows and columns, which is exactly what board games, maps and puzzles need.`],
      ['code', c`board = [
    ["X", "O", "X"],
    [".", "X", "O"],
    ["O", ".", "X"],
]
print(board[0])       # the first row
print(board[1][2])    # row 1, column 2
print(board[2][0])    # row 2, column 0`],
      ['p', `<code>board[row][col]</code>: the first index picks the <b>row</b> (a list), the second picks the item inside that row. Both start at 0.`],
      ['h', 'Changing a square'],
      ['code', c`board = [[".", ".", "."],
         [".", ".", "."],
         [".", ".", "."]]
board[1][1] = "X"     # the middle
board[0][2] = "O"     # top right
for row in board:
    print(" ".join(row))`],
      ['h', 'Making a big grid with a loop'],
      ['p', `Typing out a 10 × 10 grid would be painful. Build it with a loop instead:`],
      ['code', c`grid = []
for r in range(5):
    grid.append(["~"] * 8)     # a row of 8 water tiles
grid[2][3] = "🏝"
for row in grid:
    print("".join(row))`],
      ['warn', `Don't write <code>[["~"] * 8] * 5</code>. That makes 5 references to the <i>same</i> row, so changing one square changes a whole column! Build each row separately with a loop (or a list comprehension: <code>[["~"] * 8 for r in range(5)]</code>).`],
      ['h', 'Visiting every square'],
      ['code', c`level = [
    "#########",
    "#P..#..$#",
    "#.#...#.#",
    "#########",
]
coins = 0
for r in range(len(level)):
    for c in range(len(level[r])):
        if level[r][c] == "$":
            coins += 1
            print("Coin at row", r, "column", c)
print("Coins:", coins)`],
      ['tip', `That last example stores a game level as a list of strings. Each string is a row, and strings can be indexed just like lists. Many games store their maps exactly like this.`],
      ['key', [`A grid is a list of lists: <code>grid[row][col]</code>.`, `Change a square with <code>grid[r][c] = value</code>.`, `Build big grids with a loop, one new row at a time.`, `Use nested loops to visit every square.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`g = [[1, 2], [3, 4], [5, 6]]
print(g[2][1])`, options: ['2', '3', '5', '6'], answer: 3, explain: 'Row 2 is [5, 6], and position 1 in that row is 6.' },
      { q: 'How many rows does <code>[[0] * 4 for r in range(3)]</code> have?', options: ['3', '4', '7', '12'], answer: 0, explain: 'The comprehension makes one row for each r in range(3), so 3 rows of 4.' },
    ],
    challenge: {
      task: `<ol><li>Create a 3 × 3 grid called <code>board</code> where every square is <code>"."</code>.</li><li>Put an <code>"X"</code> in the centre and an <code>"O"</code> in the top-right corner.</li><li>Write a function <code>print_board(board)</code> that prints each row with spaces between the squares, like:</li></ol>${pre('. . O\n. X .\n. . .')}<p>Then call <code>print_board(board)</code>.</p>`,
      starter: c`
`,
      solution: c`board = [["."] * 3 for r in range(3)]
board[1][1] = "X"
board[0][2] = "O"


def print_board(board):
    for row in board:
        print(" ".join(row))


print_board(board)`,
      hints: ['Make the grid: <code>board = [["."] * 3 for r in range(3)]</code> (or type out the three rows).', 'The centre is <code>board[1][1]</code> and top-right is <code>board[0][2]</code>. In print_board, loop over the rows and print <code>" ".join(row)</code>.'],
      tests: [
        ['board is correct', c`assert board == [['.', '.', 'O'], ['.', 'X', '.'], ['.', '.', '.']], 'board is %s' % board`],
        ['print_board prints the rows', c`o = capture(print_board, board).splitlines()
assert [l.strip() for l in o] == ['. . O', '. X .', '. . .'], 'print_board printed %s' % o`],
        ['print_board works for any board', c`o = capture(print_board, [['a', 'b'], ['c', 'd']]).split()
assert o == ['a', 'b', 'c', 'd'], 'Use the board parameter inside the function.'`],
      ],
    },
  });

  /* ---------- Dictionaries: lists of dictionaries ---------- */
  mod('m8').lessons.push({
    id: 'list-of-dicts', title: 'Lists of Dictionaries', minutes: 14,
    blocks: [
      ['p', `Real programs combine collections. A <b>list of dictionaries</b> is one of the most useful shapes of data: each dictionary describes one thing, and the list holds lots of them.`],
      ['code', c`players = [
    {"name": "Ava", "score": 120, "level": 3},
    {"name": "Ben", "score": 340, "level": 5},
    {"name": "Cal", "score": 90, "level": 2},
]
for p in players:
    print(f"{p['name']} is on level {p['level']} with {p['score']} points")`],
      ['tip', `Inside an f-string that uses double quotes, use single quotes for the dictionary keys: <code>f"{p['name']}"</code>.`],
      ['h', 'Finding things'],
      ['code', c`players = [{"name": "Ava", "score": 120}, {"name": "Ben", "score": 340}, {"name": "Cal", "score": 90}]

best = players[0]
for p in players:
    if p["score"] > best["score"]:
        best = p
print("Top player:", best["name"])

total = 0
for p in players:
    total += p["score"]
print("Average score:", total / len(players))`],
      ['h', 'Sorting by a key'],
      ['p', `<code>sorted()</code> can't sort dictionaries on its own, because it doesn't know which value to compare. You give it a <b>key function</b> that picks the value to sort by:`],
      ['code', c`players = [{"name": "Ava", "score": 120}, {"name": "Ben", "score": 340}, {"name": "Cal", "score": 90}]

def get_score(player):
    return player["score"]

leaderboard = sorted(players, key=get_score, reverse=True)
for rank, p in enumerate(leaderboard, start=1):
    print(rank, p["name"], p["score"])`],
      ['p', `Notice we pass <code>get_score</code> <b>without brackets</b>. We're handing the function itself to <code>sorted</code>, which calls it on each item.`],
      ['key', [`A list of dictionaries stores many records, each with named fields.`, `Loop with <code>for item in records:</code> and read fields with <code>item["key"]</code>.`, `<code>sorted(records, key=function)</code> sorts by whatever the function returns.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`pets = [{"name": "Rex", "legs": 4}, {"name": "Polly", "legs": 2}]
print(pets[1]["name"])`, options: ['Rex', 'Polly', '2', 'legs'], answer: 1, explain: 'pets[1] is the second dictionary, and its "name" is Polly.' },
      { q: 'In <code>sorted(items, key=get_size)</code>, why no brackets after get_size?', options: ['It\'s a typo', 'We pass the function itself so sorted can call it on each item', 'Brackets are optional', 'get_size is a variable, not a function'], answer: 1, explain: 'With brackets it would be called once, right now. Without them, sorted gets the function and calls it for every item.' },
    ],
    challenge: {
      task: `<p>Build a high-score table:</p><ol><li><code>add_score(table, name, score)</code> appends a dictionary <code>{"name": name, "score": score}</code> to the list.</li><li><code>top_player(table)</code> returns the <b>name</b> of the player with the highest score.</li><li><code>leaderboard(table)</code> returns a new list of the dictionaries sorted from <b>highest to lowest</b> score.</li></ol>`,
      starter: c`def add_score(table, name, score):
    pass


def top_player(table):
    pass


def leaderboard(table):
    pass


scores = []
add_score(scores, "Ava", 120)
add_score(scores, "Ben", 340)
add_score(scores, "Cal", 90)
print(top_player(scores))
`,
      solution: c`def add_score(table, name, score):
    table.append({"name": name, "score": score})


def top_player(table):
    best = table[0]
    for entry in table:
        if entry["score"] > best["score"]:
            best = entry
    return best["name"]


def get_score(entry):
    return entry["score"]


def leaderboard(table):
    return sorted(table, key=get_score, reverse=True)


scores = []
add_score(scores, "Ava", 120)
add_score(scores, "Ben", 340)
add_score(scores, "Cal", 90)
print(top_player(scores))
for e in leaderboard(scores):
    print(e["name"], e["score"])`,
      hints: ['add_score: <code>table.append({"name": name, "score": score})</code>', 'For leaderboard, write a small <code>get_score(entry)</code> function that returns <code>entry["score"]</code>, then <code>return sorted(table, key=get_score, reverse=True)</code>.'],
      tests: [
        ['add_score adds a dictionary', c`t = []; add_score(t, "Zed", 5)
assert t == [{"name": "Zed", "score": 5}], 'got %s' % t`],
        ['top_player finds the best', c`t = [{"name": "A", "score": 3}, {"name": "B", "score": 9}, {"name": "C", "score": 1}]
assert top_player(t) == "B", 'top_player returned %r' % top_player(t)`],
        ['leaderboard sorts highest first', c`t = [{"name": "A", "score": 3}, {"name": "B", "score": 9}, {"name": "C", "score": 5}]
assert [e["name"] for e in leaderboard(t)] == ["B", "C", "A"], 'leaderboard order was %s' % [e["name"] for e in (leaderboard(t) or [])]`],
      ],
    },
  });

  /* ---------- Modules & Files: to-do app moves here ---------- */
  mod('m10').lessons.push(take('m12', 'proj-todo'));

  /* ---------- Classes: inheritance ---------- */
  mod('m11').lessons.push({
    id: 'inheritance', title: 'Inheritance: Families of Classes', minutes: 15,
    blocks: [
      ['p', `Games are full of things that are <i>similar but not the same</i>: a goblin, a dragon and a slime are all enemies with health, but each attacks differently. <b>Inheritance</b> lets one class build on another so you don't repeat yourself.`],
      ['code', c`class Enemy:
    def __init__(self, name, health):
        self.name = name
        self.health = health

    def take_damage(self, amount):
        self.health -= amount
        print(f"{self.name} takes {amount} damage! Health: {self.health}")

    def attack(self):
        return f"{self.name} attacks!"


class Dragon(Enemy):                 # Dragon inherits from Enemy
    def attack(self):                # ...but has its own attack
        return f"{self.name} breathes fire! 🔥"


goblin = Enemy("Goblin", 30)
smaug = Dragon("Dragon", 200)
goblin.take_damage(10)
smaug.take_damage(50)                # inherited from Enemy
print(goblin.attack())
print(smaug.attack())                # Dragon's own version`],
      ['list', [`<code>class Dragon(Enemy):</code> means "a Dragon is a kind of Enemy". Enemy is the <b>parent</b> (or base) class, Dragon is the <b>child</b> (or subclass).`, `The child gets <b>all</b> the parent's methods for free (Dragon can <code>take_damage</code>).`, `If the child defines a method with the same name, its version is used instead. This is called <b>overriding</b>.`]],
      ['h', 'Adding extra data with super()'],
      ['p', `If a child needs extra attributes, write its own <code>__init__</code> and call the parent's with <code>super().__init__(...)</code> so the shared setup still happens:`],
      ['code', c`class Character:
    def __init__(self, name, health):
        self.name = name
        self.health = health


class Archer(Character):
    def __init__(self, name, health, arrows):
        super().__init__(name, health)   # let Character set name and health
        self.arrows = arrows

    def shoot(self):
        if self.arrows > 0:
            self.arrows -= 1
            return "Twang! 🏹"
        return "Out of arrows!"


robin = Archer("Robin", 80, 2)
print(robin.name, robin.health, robin.arrows)
print(robin.shoot())
print(robin.shoot())
print(robin.shoot())`],
      ['p', `<code>isinstance(robin, Character)</code> is <code>True</code>: an Archer <i>is a</i> Character. A list of different enemy types can all be treated the same way, and each one still behaves in its own style.`],
      ['key', [`<code>class Child(Parent):</code> inherits everything from Parent.`, `Override a method by defining it again in the child.`, `Use <code>super().__init__(...)</code> to run the parent's setup.`, `Use inheritance for an "is a kind of" relationship.`]],
    ],
    quiz: [
      { q: 'What does this print?', code: c`class A:
    def hi(self):
        return "A"

class B(A):
    pass

print(B().hi())`, options: ['A', 'B', 'Nothing', 'An error'], answer: 0, explain: 'B has no hi method of its own, so it uses the one inherited from A.' },
      { q: 'What does <code>super().__init__(name)</code> do?', options: ['Creates a new parent object', 'Runs the parent class\'s __init__ for this object', 'Deletes the parent', 'Makes the class faster'], answer: 1, explain: 'It runs the parent\'s setup code on the current object, so shared attributes are set.' },
    ],
    challenge: {
      task: `<ol><li>Write a class <code>Character</code> with <code>__init__(self, name, health)</code>, a method <code>take_damage(self, amount)</code> that lowers health but <b>never below 0</b>, and <code>is_alive(self)</code> that returns True if health is above 0.</li><li>Write a class <code>Wizard(Character)</code> whose <code>__init__(self, name, health, mana)</code> uses <code>super()</code> and also stores <code>mana</code>.</li><li>Give Wizard a method <code>cast_spell(self, target)</code>: if the wizard has at least 10 mana, spend 10 mana, deal 25 damage to the target and return <code>True</code>. Otherwise return <code>False</code>.</li></ol>`,
      starter: c`class Character:
    def __init__(self, name, health):
        pass


class Wizard(Character):
    pass
`,
      solution: c`class Character:
    def __init__(self, name, health):
        self.name = name
        self.health = health

    def take_damage(self, amount):
        self.health = max(0, self.health - amount)

    def is_alive(self):
        return self.health > 0


class Wizard(Character):
    def __init__(self, name, health, mana):
        super().__init__(name, health)
        self.mana = mana

    def cast_spell(self, target):
        if self.mana < 10:
            return False
        self.mana -= 10
        target.take_damage(25)
        return True


merlin = Wizard("Merlin", 60, 20)
troll = Character("Troll", 40)
print(merlin.cast_spell(troll), troll.health)
print(merlin.cast_spell(troll), troll.health, troll.is_alive())
print(merlin.cast_spell(troll))`,
      hints: ['take_damage: <code>self.health = max(0, self.health - amount)</code>. is_alive: <code>return self.health > 0</code>.', 'Wizard.__init__: <code>super().__init__(name, health)</code> then <code>self.mana = mana</code>. In cast_spell, check <code>if self.mana &lt; 10: return False</code> first.'],
      tests: [
        ['Character stores name and health', c`ch = Character("Bob", 50); assert ch.name == "Bob" and ch.health == 50`],
        ['take_damage never goes below 0', c`ch = Character("Bob", 50); ch.take_damage(20)
assert ch.health == 30, 'health should be 30, got %r' % ch.health
ch.take_damage(100); assert ch.health == 0, 'health should stop at 0, got %r' % ch.health`],
        ['is_alive works', c`ch = Character("Bob", 5); assert ch.is_alive() is True; ch.take_damage(5); assert ch.is_alive() is False`],
        ['Wizard is a Character with mana', c`w = Wizard("Mo", 40, 30)
assert isinstance(w, Character), 'Wizard should inherit from Character.'
assert w.name == "Mo" and w.health == 40 and w.mana == 30`],
        ['cast_spell works and costs mana', c`w = Wizard("Mo", 40, 15); t = Character("T", 100)
assert w.cast_spell(t) is True and t.health == 75 and w.mana == 5, 'After one spell: target health %r, mana %r' % (t.health, w.mana)
assert w.cast_spell(t) is False and t.health == 75, 'With only 5 mana the spell should fail and do no damage.'`],
      ],
    },
  });

  /* ---------- Text Games module ---------- */
  const m12 = mod('m12');
  m12.title = 'Text Games';
  m12.icon = '🎲';
  m12.desc = 'Your first real games: guessing, Rock Paper Scissors, Hangman, a text adventure, noughts and crosses, and a monster battle.';
  const rps = m12.lessons.find(l => l.id === 'proj-rps');
  rps.blocks = rps.blocks.filter(b => !(b[0] === 'h' && b[1].startsWith('You did it')) && !(b[0] === 'list' && String(b[1][0]).includes('Install Python')) && !(b[0] === 'p' && String(b[1]).includes('Where next')));
  rps.blocks.push(['tip', `Coming up: Hangman, a text adventure, noughts and crosses and a monster battle. After that you'll move on to games with <b>graphics</b> that you control with the keyboard and mouse!`]);

  m12.lessons.push(
  {
    id: 'proj-hangman', title: 'Project: Hangman', minutes: 25,
    blocks: [
      ['p', `Let's build the classic word-guessing game. The computer picks a secret word and shows a blank for each letter. The player guesses one letter at a time, with a limited number of wrong guesses allowed.`],
      ['h', 'The plan'],
      ['steps', [`Pick a random word from a list.`, `Keep the guessed letters in a <b>set</b> (so each letter is stored once).`, `A function <code>masked(word, guessed)</code> shows the word with <code>_</code> for letters not found yet.`, `A function <code>is_won(word, guessed)</code> checks whether every letter has been found.`, `Loop: ask for a letter, update lives, and stop on a win or a loss.`]],
      ['h', 'Showing the word'],
      ['code', c`def masked(word, guessed):
    shown = []
    for letter in word:
        if letter in guessed:
            shown.append(letter)
        else:
            shown.append("_")
    return " ".join(shown)

print(masked("python", {"p", "o"}))
print(masked("python", set()))`],
      ['tip', `<code>set()</code> makes an empty set. (Empty curly brackets <code>{}</code> make an empty <i>dictionary</i>, not a set.)`],
      ['h', 'Checking for a win'],
      ['p', `The player has won when every letter of the word is in the guessed set. <code>all()</code> is a handy built-in: it returns True if everything inside it is True.`],
      ['code', c`def is_won(word, guessed):
    return all(letter in guessed for letter in word)

print(is_won("cat", {"c", "a", "t", "z"}))
print(is_won("cat", {"c", "a"}))`],
      ['h', 'Ideas to extend it'],
      ['list', [`Draw the hangman with ASCII art that grows with each mistake.`, `Read the word list from a file.`, `Add difficulty levels with longer words and fewer lives.`]],
    ],
    quiz: [
      { q: 'Why store guessed letters in a set rather than a list?', options: ['Sets are sorted', 'A set keeps each letter only once, and checking "in" is quick', 'Lists can\'t hold letters', 'Sets can be printed'], answer: 1, explain: 'Guessing "e" twice shouldn\'t store it twice, and a set takes care of that automatically.' },
    ],
    challenge: {
      task: `<ol><li>Write <code>masked(word, guessed)</code> returning the word with letters separated by spaces and <code>_</code> for unguessed letters, e.g. <code>masked("cat", {"a"})</code> → <code>"_ a _"</code>.</li><li>Write <code>is_won(word, guessed)</code>.</li><li>Write the game: pick a random <code>word</code> from <code>WORDS</code>, give the player <code>6</code> lives, and loop: show the masked word, ask <code>Guess a letter: </code>, lose a life for a wrong letter. Print <code>You win!</code> when the word is complete, or <code>You lose! The word was ...</code> when lives run out.</li></ol><p>The tester types every letter of the alphabet in order.</p>`,
      starter: c`import random

WORDS = ["python", "games", "coding", "pixel", "dragon"]


def masked(word, guessed):
    pass


def is_won(word, guessed):
    pass


# game here
`,
      solution: c`import random

WORDS = ["python", "games", "coding", "pixel", "dragon"]


def masked(word, guessed):
    return " ".join(letter if letter in guessed else "_" for letter in word)


def is_won(word, guessed):
    return all(letter in guessed for letter in word)


word = random.choice(WORDS)
guessed = set()
lives = 6

while True:
    print(masked(word, guessed), f"   Lives: {lives}")
    guess = input("Guess a letter: ").strip().lower()
    if len(guess) != 1 or not guess.isalpha():
        print("Please type a single letter.")
        continue
    if guess in guessed:
        print("You already tried that one.")
        continue
    guessed.add(guess)
    if guess in word:
        print("Yes!")
        if is_won(word, guessed):
            print(f"You win! The word was {word}.")
            break
    else:
        lives -= 1
        print("Nope.")
        if lives == 0:
            print(f"You lose! The word was {word}.")
            break`,
      inputs: 'abcdefghijklmnopqrstuvwxyz'.split(''),
      hints: ['masked: build a list, adding <code>letter</code> if it is in guessed and <code>"_"</code> otherwise, then <code>return " ".join(...)</code>.', 'Game loop: <code>while True:</code> → ask → <code>guessed.add(guess)</code> → if it\'s in the word check <code>is_won</code>, otherwise <code>lives -= 1</code> and check for 0. Use <code>break</code> to finish.'],
      tests: [
        ['masked hides letters', c`assert masked("cat", {"a"}) == "_ a _", 'masked("cat", {"a"}) returned %r' % masked("cat", {"a"})`],
        ['masked shows found letters', c`assert masked("noon", {"n", "o"}) == "n o o n" and masked("hi", set()) == "_ _"`],
        ['is_won works', c`assert is_won("dog", {"d", "o", "g", "x"}) is True and is_won("dog", {"d", "o"}) is False`],
        ['word comes from WORDS', c`assert word in WORDS, 'Pick the word with random.choice(WORDS).'`],
        ['The game ends with a win or a loss', c`assert 'You win' in output or 'You lose' in output, 'After guessing the alphabet the game should say "You win!" or "You lose!".'`],
        ['Uses 6 lives', c`o = run_with(list('zqjvkw'))
assert 'You lose' in o or 'You win' in o, 'Six wrong guesses should end the game.'`],
      ],
    },
  },
  {
    id: 'proj-adventure', title: 'Project: Text Adventure', minutes: 25,
    blocks: [
      ['p', `Text adventures were some of the very first computer games: you explore a world by typing commands like <code>go north</code>. They're a brilliant way to practise dictionaries, because the whole map can be stored as data.`],
      ['h', 'The map is a dictionary of dictionaries'],
      ['code', c`rooms = {
    "hall": {
        "description": "A dusty hall. Doors lead north and east.",
        "exits": {"north": "library", "east": "kitchen"},
    },
    "library": {
        "description": "Towering shelves of books. The hall is south.",
        "exits": {"south": "hall"},
    },
    "kitchen": {
        "description": "Something smells delicious. The hall is west.",
        "exits": {"west": "hall"},
    },
}

current = "hall"
print(rooms[current]["description"])
print("Exits:", ", ".join(rooms[current]["exits"]))
current = rooms[current]["exits"]["north"]
print(rooms[current]["description"])`],
      ['p', `Each room has a <b>description</b> and a dictionary of <b>exits</b> that maps a direction to the name of another room. Moving is just looking up the direction!`],
      ['h', 'Separating data and code'],
      ['p', `Notice that the map is pure <b>data</b>. To add a new room you don't write any new code: you just add another entry to the dictionary. Professional games work the same way, storing levels and items in data files.`],
      ['h', 'Ideas to extend it'],
      ['list', [`Put items in rooms and let the player <code>take</code> them into an inventory list.`, `Lock a door unless the player has the key.`, `Add a monster in one room, using your battle code from the next lessons.`]],
    ],
    quiz: [
      { q: 'With the map above, what is <code>rooms["kitchen"]["exits"]["west"]</code>?', options: ['"kitchen"', '"hall"', '"library"', 'A KeyError'], answer: 1, explain: 'The kitchen\'s west exit leads to the hall.' },
    ],
    challenge: {
      task: `<ol><li>Design your own <code>rooms</code> dictionary with <b>at least 4 rooms</b>. Each room needs a <code>"description"</code> and an <code>"exits"</code> dictionary. Every exit must lead to a room that exists!</li><li>Write <code>move(current, direction)</code> that returns the new room name, or the same room if there's no exit that way.</li><li>Write the game loop: show the description and exits, ask <code>What now? </code>, handle <code>go &lt;direction&gt;</code>, and stop when the player types <code>quit</code>.</li></ol>`,
      starter: c`rooms = {
    "start": {
        "description": "You are standing at the entrance of a cave.",
        "exits": {},
    },
}


def move(current, direction):
    pass


current = "start"
# game loop here
`,
      solution: c`rooms = {
    "start": {
        "description": "You are standing at the entrance of a cave.",
        "exits": {"north": "tunnel"},
    },
    "tunnel": {
        "description": "A dark, dripping tunnel. Light glows to the east.",
        "exits": {"south": "start", "east": "cavern"},
    },
    "cavern": {
        "description": "A huge cavern full of glowing crystals.",
        "exits": {"west": "tunnel", "down": "treasure"},
    },
    "treasure": {
        "description": "A chest of gold! You found the treasure room.",
        "exits": {"up": "cavern"},
    },
}


def move(current, direction):
    exits = rooms[current]["exits"]
    if direction in exits:
        return exits[direction]
    print("You can't go that way.")
    return current


current = "start"
while True:
    print()
    print(rooms[current]["description"])
    print("Exits:", ", ".join(rooms[current]["exits"]))
    command = input("What now? ").strip().lower()
    if command == "quit":
        print("Thanks for playing!")
        break
    if command.startswith("go "):
        current = move(current, command[3:])
    else:
        print("Try 'go north' or 'quit'.")`,
      inputs: ['go north', 'go nowhere', 'look', 'quit'],
      hints: ['move: look up <code>rooms[current]["exits"]</code>. If <code>direction in exits</code>, return <code>exits[direction]</code>, otherwise return current.', 'In the loop, <code>if command.startswith("go "):</code> then the direction is <code>command[3:]</code> (everything after "go ").'],
      tests: [
        ['At least 4 rooms', c`assert isinstance(rooms, dict) and len(rooms) >= 4, 'You have %d room(s).' % len(rooms)`],
        ['Every room has a description and exits', c`for name, room in rooms.items():
    assert isinstance(room.get('description'), str) and room['description'], 'Room "%s" needs a description.' % name
    assert isinstance(room.get('exits'), dict), 'Room "%s" needs an "exits" dictionary.' % name`],
        ['Every exit leads somewhere real', c`for name, room in rooms.items():
    for d, target in room['exits'].items():
        assert target in rooms, 'The %s exit from "%s" goes to "%s", which doesn\'t exist.' % (d, name, target)`],
        ['move follows exits', c`name = next(n for n in rooms if rooms[n]['exits'])
d, target = next(iter(rooms[name]['exits'].items()))
assert move(name, d) == target, 'move(%r, %r) should return %r' % (name, d, target)`],
        ['move stays put for a bad direction', c`n = next(iter(rooms)); assert move(n, 'sideways') == n`],
        ['quit ends the game', c`assert 'quit' in source and 'break' in source, 'Typing quit should break out of the game loop.'
assert 'Exits' in run_with(['quit']) or len(run_with(['quit'])) > 0`],
      ],
    },
  },
  {
    id: 'proj-tictactoe', title: 'Project: Noughts & Crosses', minutes: 25,
    blocks: [
      ['p', `Two players take turns placing X and O on a 3 × 3 grid. The first to get three in a row (across, down or diagonally) wins. This project uses everything you learned about grids.`],
      ['h', 'Numbering the squares'],
      ['p', `Asking players for a row and a column is fiddly. Instead we'll number the squares 1 to 9 like a phone keypad, and convert a number into a row and column with <code>//</code> and <code>%</code>:`],
      ['code', c`for pos in range(1, 10):
    row = (pos - 1) // 3
    col = (pos - 1) % 3
    print(pos, "-> row", row, "col", col)`],
      ['p', `That's the clever trick: whole-number division by 3 gives the row, and the remainder gives the column.`],
      ['h', 'Checking for a winner'],
      ['p', `There are 8 ways to win: 3 rows, 3 columns and 2 diagonals. A neat way to check them all is to list every line as three (row, col) positions, then loop over them:`],
      ['code', c`LINES = []
for i in range(3):
    LINES.append([(i, 0), (i, 1), (i, 2)])      # row i
    LINES.append([(0, i), (1, i), (2, i)])      # column i
LINES.append([(0, 0), (1, 1), (2, 2)])          # diagonal
LINES.append([(0, 2), (1, 1), (2, 0)])          # other diagonal
print(len(LINES), "ways to win")`],
      ['h', 'Ideas to extend it'],
      ['list', [`Keep a running score over several games.`, `Write a computer player that picks a random empty square.`, `Make the computer smarter: win if it can, block if it must.`]],
    ],
    quiz: [
      { q: 'With <code>row = (pos - 1) // 3</code> and <code>col = (pos - 1) % 3</code>, where is square 6?', options: ['row 1, col 2', 'row 2, col 0', 'row 2, col 1', 'row 1, col 1'], answer: 0, explain: '(6 - 1) // 3 = 1 and (6 - 1) % 3 = 2.' },
    ],
    challenge: {
      task: `<ol><li><code>place(board, pos, mark)</code>: put mark ("X" or "O") at square <code>pos</code> (1 to 9) and return <code>True</code>, but only if the square is empty (<code>" "</code>). Otherwise return <code>False</code> and change nothing.</li><li><code>winner(board)</code>: return <code>"X"</code> or <code>"O"</code> if that player has three in a row, otherwise <code>None</code>.</li><li><code>is_full(board)</code>: True if no empty squares are left.</li><li>The game: players take turns typing a square number at <code>Square (1-9): </code>. Print the board after each move and announce <code>X wins!</code>, <code>O wins!</code> or <code>It's a draw!</code>.</li></ol>`,
      starter: c`board = [[" "] * 3 for r in range(3)]


def show(board):
    for r in range(3):
        print(" " + " | ".join(board[r]))
        if r < 2:
            print("---+---+---")


def place(board, pos, mark):
    pass


def winner(board):
    pass


def is_full(board):
    pass


# game loop here
`,
      solution: c`board = [[" "] * 3 for r in range(3)]


def show(board):
    for r in range(3):
        print(" " + " | ".join(board[r]))
        if r < 2:
            print("---+---+---")


def place(board, pos, mark):
    row, col = (pos - 1) // 3, (pos - 1) % 3
    if board[row][col] != " ":
        return False
    board[row][col] = mark
    return True


LINES = []
for i in range(3):
    LINES.append([(i, 0), (i, 1), (i, 2)])
    LINES.append([(0, i), (1, i), (2, i)])
LINES.append([(0, 0), (1, 1), (2, 2)])
LINES.append([(0, 2), (1, 1), (2, 0)])


def winner(board):
    for line in LINES:
        a, b, c = [board[r][col] for r, col in line]
        if a != " " and a == b == c:
            return a
    return None


def is_full(board):
    return all(cell != " " for row in board for cell in row)


turn = "X"
while True:
    show(board)
    try:
        pos = int(input(f"{turn}'s turn. Square (1-9): "))
    except ValueError:
        print("Type a number from 1 to 9.")
        continue
    if not 1 <= pos <= 9 or not place(board, pos, turn):
        print("You can't go there.")
        continue
    if winner(board):
        show(board)
        print(f"{turn} wins!")
        break
    if is_full(board):
        show(board)
        print("It's a draw!")
        break
    turn = "O" if turn == "X" else "X"`,
      inputs: ['1', '4', '2', '5', '3'],
      hints: ['place: work out <code>row, col = (pos - 1) // 3, (pos - 1) % 3</code>, check the square is <code>" "</code>, then set it.', 'winner: loop through every winning line (see LINES in the lesson). If all three squares are the same and not empty, return that mark.'],
      tests: [
        ['place puts a mark', c`b = [[" "] * 3 for r in range(3)]
assert place(b, 5, "X") is True and b[1][1] == "X", 'place(b, 5, "X") should fill the centre.'
assert place(b, 9, "O") is True and b[2][2] == "O"`],
        ['place refuses a taken square', c`b = [[" "] * 3 for r in range(3)]; place(b, 1, "X")
assert place(b, 1, "O") is False and b[0][0] == "X"`],
        ['winner finds rows, columns and diagonals', c`def B(s): return [list(s[0:3]), list(s[3:6]), list(s[6:9])]
assert winner(B("XXX      ")) == "X", 'row'
assert winner(B(" O  O  O ")) == "O", 'column'
assert winner(B("X   X   X")) == "X", 'diagonal'
assert winner(B("  O O O  ")) == "O", 'other diagonal'`],
        ['winner returns None when nobody has won', c`def B(s): return [list(s[0:3]), list(s[3:6]), list(s[6:9])]
assert winner(B("XOXXOOOXX")) is None and winner(B("         ")) is None`],
        ['is_full works', c`assert is_full([["X"] * 3] * 3) is True and is_full([[" "] * 3] * 3) is False`],
        ['The game announces the winner', c`assert 'X wins!' in output, 'With moves 1, 4, 2, 5, 3 X should win.'`],
      ],
    },
  },
  {
    id: 'proj-battle', title: 'Project: Monster Battle', minutes: 25,
    blocks: [
      ['p', `Time for a turn-based battle, like in a role-playing game. You and a monster take turns. Each turn you choose to <b>attack</b> or <b>heal</b>. This project brings classes, randomness and game loops together.`],
      ['h', 'A Fighter class'],
      ['code', c`import random


class Fighter:
    def __init__(self, name, health, power):
        self.name = name
        self.health = health
        self.max_health = health
        self.power = power

    def attack(self, other):
        damage = random.randint(1, self.power)
        other.health = max(0, other.health - damage)
        print(f"{self.name} hits {other.name} for {damage}!")
        return damage

    def is_alive(self):
        return self.health > 0


hero = Fighter("Hero", 50, 10)
orc = Fighter("Orc", 40, 8)
hero.attack(orc)
orc.attack(hero)
print(hero.health, orc.health)`],
      ['p', `Because both the hero and the monster are <code>Fighter</code> objects, the same <code>attack</code> code works in both directions. Write it once, use it everywhere.`],
      ['tip', `Randomness keeps games exciting, but it makes testing harder. That's why the challenge checks that damage is <i>within a range</i> rather than an exact number.`],
      ['h', 'Ideas to extend it'],
      ['list', [`Use inheritance: a <code>Mage(Fighter)</code> with spells, a <code>Knight(Fighter)</code> with a shield.`, `Fight a series of monsters that get stronger each time.`, `Add critical hits: a 1 in 10 chance of double damage.`]],
    ],
    quiz: [
      { q: 'What range of damage can <code>random.randint(1, self.power)</code> give when power is 6?', options: ['0 to 6', '1 to 5', '1 to 6', '0 to 5'], answer: 2, explain: 'randint includes both ends: 1, 2, 3, 4, 5 or 6.' },
    ],
    challenge: {
      task: `<ol><li>Complete <code>Fighter</code>: <code>attack(self, other)</code> deals random damage from 1 to <code>self.power</code> (health never below 0) and returns the damage. <code>heal(self)</code> adds 15 health but never above <code>max_health</code>, and only if <code>self.potions</code> is above 0 (using one up). It returns True if it healed, otherwise False. <code>is_alive(self)</code> returns True while health is above 0.</li><li>Write the battle loop: each turn ask <code>attack or heal? </code>, do it, then (if the monster is still alive) the monster attacks you. Print both health values each turn. End with <code>You win!</code> or <code>You were defeated...</code></li></ol>`,
      starter: c`import random


class Fighter:
    def __init__(self, name, health, power, potions=0):
        self.name = name
        self.health = health
        self.max_health = health
        self.power = power
        self.potions = potions

    def attack(self, other):
        pass

    def heal(self):
        pass

    def is_alive(self):
        pass


hero = Fighter("Hero", 60, 12, potions=3)
monster = Fighter("Troll", 50, 9)
# battle loop here
`,
      solution: c`import random


class Fighter:
    def __init__(self, name, health, power, potions=0):
        self.name = name
        self.health = health
        self.max_health = health
        self.power = power
        self.potions = potions

    def attack(self, other):
        damage = random.randint(1, self.power)
        other.health = max(0, other.health - damage)
        print(f"{self.name} hits {other.name} for {damage}!")
        return damage

    def heal(self):
        if self.potions <= 0:
            print("No potions left!")
            return False
        self.potions -= 1
        self.health = min(self.max_health, self.health + 15)
        print(f"{self.name} drinks a potion. Health: {self.health}")
        return True

    def is_alive(self):
        return self.health > 0


hero = Fighter("Hero", 60, 12, potions=3)
monster = Fighter("Troll", 50, 9)

while hero.is_alive() and monster.is_alive():
    print(f"\n{hero.name}: {hero.health} HP   {monster.name}: {monster.health} HP")
    choice = input("attack or heal? ").strip().lower()
    if choice == "heal":
        hero.heal()
    else:
        hero.attack(monster)
    if monster.is_alive():
        monster.attack(hero)

if hero.is_alive():
    print("You win!")
else:
    print("You were defeated...")`,
      inputs: Array(40).fill('attack'),
      hints: ['attack: <code>damage = random.randint(1, self.power)</code>, then <code>other.health = max(0, other.health - damage)</code> and return damage.', 'heal: return False if there are no potions. Otherwise use one and set <code>self.health = min(self.max_health, self.health + 15)</code>.'],
      tests: [
        ['attack deals 1 to power damage', c`for _ in range(100):
    a = Fighter("A", 10, 6); b = Fighter("B", 100, 1)
    d = a.attack(b)
    assert 1 <= d <= 6 and b.health == 100 - d, 'Damage %r, health left %r' % (d, b.health)`],
        ['Health never goes below 0', c`a = Fighter("A", 10, 50); b = Fighter("B", 1, 1)
for _ in range(5): a.attack(b)
assert b.health == 0, 'health is %r' % b.health`],
        ['heal adds 15 up to the maximum', c`f = Fighter("F", 50, 5, potions=2); f.health = 20
assert f.heal() is True and f.health == 35 and f.potions == 1
f.health = 45; f.heal(); assert f.health == 50, 'Healing should stop at max_health (50), got %r' % f.health`],
        ['heal fails with no potions', c`f = Fighter("F", 50, 5, potions=0); f.health = 10
assert f.heal() is False and f.health == 10`],
        ['is_alive works', c`f = Fighter("F", 5, 1); assert f.is_alive(); f.health = 0; assert not f.is_alive()`],
        ['The battle finishes', c`assert 'You win!' in output or 'You were defeated' in output, 'The battle should end with "You win!" or "You were defeated...".'`],
      ],
    },
  });
})();
