/* Optional practice exercises for each lesson.
 * P = predict the output (multiple choice; checked against real Python by __selfTest)
 * O = put jumbled lines in order (any order that prints the same output is accepted)
 * F = fix or write code (auto-checked like a challenge)
 * Predict answers are the index into options. Options are the exact printed output. */
const PRACTICE_ERROR = '💥 An error';
(function () {
  const E = PRACTICE_ERROR;
  const P = (code, options, answer, explain, inputs) => ({ type: 'predict', code, options, answer, explain, inputs });
  const O = (code, task, explain) => ({ type: 'order', code, task, explain });
  const F = (task, starter, solution, tests, extra) => Object.assign({ type: 'code', task, starter, solution, tests }, extra || {});
  const G = { game: true };

  window.PRACTICE = {
  /* ---------------- Getting Started ---------------- */
  hello: [
    P(c`print("Hi")
print("there")`, ['Hi\nthere', 'Hi there', 'Hithere', 'there\nHi'], 0, 'Each print() starts on a new line, and lines run from top to bottom.'),
    O(c`print("Ready")
print("Steady")
print("Go!")`, 'Put the lines in order so the program prints <b>Ready</b>, <b>Steady</b>, <b>Go!</b>'),
    F('This line has one mistake. Fix it so it prints <code>I can code!</code>', c`Print("I can code!")`, c`print("I can code!")`,
      [['Prints I can code!', c`assert 'I can code!' in output`]]),
  ],
  'print-more': [
    P(c`print("2 + 3")
print(2 + 3)`, ['2 + 3\n5', '5\n5', '2 + 3\n2 + 3', '5\n2 + 3'], 0, 'With quotes it\'s text, printed exactly. Without quotes Python does the sum.'),
    P(c`print("Score:", 10 * 3)`, ['Score: 30', 'Score:30', 'Score: 10 * 3', 'Score 30'], 0, 'The sum is worked out, and the comma adds a space.'),
    F('Add one line so there is a <b>blank line</b> between Top and Bottom.', c`print("Top")
print("Bottom")`, c`print("Top")
print()
print("Bottom")`, [['Top, blank line, Bottom', c`assert lines == ['Top', '', 'Bottom'], 'You printed %r' % lines`]]),
  ],
  errors: [
    P(c`print("Hello"`, ['Hello', '"Hello"', E, 'Hello)'], 2, 'The closing bracket is missing, so Python can\'t understand the line: a SyntaxError.'),
    F('Fix the error. (Hint: what\'s wrong with putting an apostrophe inside single quotes?)', c`print('It's sunny')`, c`print("It's sunny")`,
      [['Prints It\'s sunny', c`assert "It's sunny" in output`]]),
    F('Fix the error so it prints <code>Ten: 10</code>.', c`print("Ten:" 10)`, c`print("Ten:", 10)`,
      [['Prints Ten: 10', c`assert 'Ten: 10' in output`]]),
  ],

  /* ---------------- Variables & Data ---------------- */
  variables: [
    P(c`a = 3
b = a
a = 7
print(b)`, ['3', '7', 'a', '10'], 0, 'b got a copy of the value 3. Changing a afterwards doesn\'t change b.'),
    P(c`x = 5
x = x + 2
x = x * 2
print(x)`, ['14', '12', '10', '9'], 0, '5 + 2 = 7, then 7 × 2 = 14.'),
    O(c`name = "Kai"
greeting = "Hello, " + name
print(greeting)`, 'Order the lines so the program prints <b>Hello, Kai</b>. (A variable must be created before it\'s used!)'),
    F('Fix the bug so the score is printed.', c`score = 10
print(Score)`, c`score = 10
print(score)`, [['Prints 10', c`assert '10' in lines`]]),
  ],
  numbers: [
    P(c`print(17 // 5, 17 % 5)`, ['3 2', '3.4 2', '2 3', '3 3'], 0, '5 fits into 17 three whole times (15) with 2 left over.'),
    P(c`print(2 ** 4)`, ['16', '8', '6', '24'], 0, '2 × 2 × 2 × 2 = 16.'),
    P(c`print(10 / 4)`, ['2.5', '2', '2.0', '3'], 0, 'A single / always gives a float (decimal).'),
    F('<code>total_seconds</code> is 125. Using <code>//</code> and <code>%</code>, set <code>minutes</code> and <code>seconds</code> (should be 2 and 5).', c`total_seconds = 125
`, c`total_seconds = 125
minutes = total_seconds // 60
seconds = total_seconds % 60
print(minutes, seconds)`, [
      ['minutes is 2', c`assert minutes == 2`], ['seconds is 5', c`assert seconds == 5`],
      ['Uses // and %', c`assert '//' in source and '%' in source`]]),
  ],
  strings: [
    P(c`w = "banana"
print(w[1:4])`, ['ana', 'ban', 'anan', 'nan'], 0, 'Positions 1, 2 and 3 (stopping before 4): a, n, a.'),
    P(c`print("ab" * 3)`, ['ababab', 'ab3', 'ab ab ab', 'aaabbb'], 0, '* repeats the whole string.'),
    P(c`print(len("cat") + len("dog"))`, ['6', 'catdog', '3', '33'], 0, 'Each len() gives 3, and 3 + 3 = 6.'),
    F('Make a variable <code>initials</code> holding the first letter of <code>first</code> and the first letter of <code>last</code> (it should be <code>"AL"</code>). Use indexing!', c`first = "Ada"
last = "Lovelace"
`, c`first = "Ada"
last = "Lovelace"
initials = first[0] + last[0]
print(initials)`, [['initials is AL', c`assert initials == "AL"`], ['Uses indexing', c`assert 'first[0]' in source and 'last[0]' in source`]]),
  ],
  types: [
    P(c`print("7" * 2)`, ['77', '14', '7 7', E], 0, '"7" is text, so * 2 repeats it.'),
    P(c`print(int("4") + 1)`, ['5', '41', '4 1', E], 0, 'int("4") is the number 4.'),
    P(c`print("Age: " + 15)`, ['Age: 15', 'Age:15', E, '15'], 2, 'You can\'t + text and a number. Use str(15) or an f-string.'),
    F('This should print 12, but it prints 3333. Fix it.', c`price = "3"
total = price * 4
print(total)`, c`price = "3"
total = int(price) * 4
print(total)`, [['total is the number 12', c`assert total == 12`]]),
  ],

  /* ---------------- Talking to the User ---------------- */
  input: [
    P(c`x = input()
print(x + x)`, ['77', '14', '7 7', E], 0, 'If the user types 7, x is the text "7", so + joins: "77".', ['7']),
    F('Ask <code>What is your favourite colour? </code> and then print <code>Your favourite colour is ...</code> with their answer.', c`
`, c`colour = input("What is your favourite colour? ")
print("Your favourite colour is " + colour)`, [
      ['Uses the answer (tested with blue)', c`assert 'Your favourite colour is blue' in output`],
      ['Works with other answers', c`assert 'Your favourite colour is green' in run_with(['green'])`]], { inputs: ['blue'] }),
  ],
  fstrings: [
    P(c`n = 4
print(f"{n} squared is {n * n}")`, ['4 squared is 16', 'n squared is n * n', '4 squared is n * n', '{n} squared is {n * n}'], 0, 'Everything inside { } is worked out.'),
    P(c`p = 2.5
print(f"£{p:.2f}")`, ['£2.50', '£2.5', '£2.500', '£3'], 0, ':.2f always shows two decimal places.'),
    F('Rewrite the print line using an <b>f-string</b> (no <code>+</code> or <code>str()</code>). It must print exactly the same thing.', c`name = "Zara"
age = 13
print("Meet " + name + ", age " + str(age))`, c`name = "Zara"
age = 13
print(f"Meet {name}, age {age}")`, [
      ['Same output', c`assert 'Meet Zara, age 13' in output`], ['Uses an f-string', c`assert 'f"' in source or "f'" in source`],
      ['No + or str()', c`assert 'str(' not in source and '+' not in source`]]),
  ],
  'string-methods': [
    P(c`print("  Hi  ".strip() + "!")`, ['Hi!', '  Hi  !', 'Hi !', ' Hi!'], 0, 'strip() removes the spaces at both ends.'),
    P(c`print("hello world".title())`, ['Hello World', 'Hello world', 'HELLO WORLD', 'hello World'], 0, 'title() capitalises the first letter of every word.'),
    P(c`print("a-b-c".replace("-", ""))`, ['abc', 'a b c', 'a-b-c', '-'], 0, 'Every "-" is replaced with nothing.'),
    F('Make <code>clean</code> hold <code>answer</code> with no spaces round it and all in lower case, so it equals <code>"yes"</code>.', c`answer = "  YES "
`, c`answer = "  YES "
clean = answer.strip().lower()
print(clean)`, [['clean is "yes"', c`assert clean == "yes", 'clean is %r' % clean`], ['Uses methods', c`assert 'answer.' in source`]]),
  ],
  'input-numbers': [
    P(c`a = input()
b = input()
print(int(a) + int(b))`, ['5', '23', '2 3', E], 0, 'The user typed 2 then 3. Converting both with int() makes + add them.', ['2', '3']),
    F('Ask <code>Number: </code> and print double the number.', c`
`, c`n = int(input("Number: "))
print(n * 2)`, [['21 gives 42', c`assert '42' in output`], ['5 gives 10', c`assert '10' in run_with(['5'])`]], { inputs: ['21'] }),
  ],

  /* ---------------- Making Decisions ---------------- */
  booleans: [
    P(c`x = 10
print(x > 5, x < 5)`, ['True False', 'False True', 'True True', '10 5'], 0, '10 > 5 is True; 10 < 5 is False.'),
    P(c`print("Apple" == "apple")`, ['False', 'True'], 0, 'Capital letters make them different.'),
    P(c`print(7 != 7)`, ['False', 'True', '7', E], 0, '!= means "not equal". 7 is equal to 7, so it\'s False.'),
    F('A ride needs riders at least 120 cm tall. Set <code>can_ride</code> using a comparison (it should be True for 130).', c`height = 130
`, c`height = 130
can_ride = height >= 120
print(can_ride)`, [['can_ride is True', c`assert can_ride is True`], ['Uses a comparison', c`assert '>=' in source or '>' in source`]]),
  ],
  'if-else': [
    P(c`n = 4
if n % 2 == 0:
    print("even")
else:
    print("odd")`, ['even', 'odd', 'even\nodd', '4'], 0, '4 % 2 is 0, so the if part runs.'),
    O(c`temp = 30
if temp > 25:
    print("Hot!")
else:
    print("Not hot")
print("Done")`, 'Order the lines so the program prints <b>Hot!</b> then <b>Done</b>. Watch the indentation!'),
    F('Fix the two mistakes so it prints <code>Pass</code>.', c`score = 75
if score >= 50
print("Pass")`, c`score = 75
if score >= 50:
    print("Pass")`, [['Prints Pass', c`assert 'Pass' in output`]]),
  ],
  elif: [
    P(c`n = 0
if n > 0:
    print("positive")
elif n < 0:
    print("negative")
else:
    print("zero")`, ['zero', 'positive', 'negative', 'positive\nzero'], 0, 'Neither condition is True, so else runs.'),
    P(c`age = 70
if age > 12:
    print("teen")
elif age > 64:
    print("senior")`, ['teen', 'senior', 'teen\nsenior', '(nothing)'], 0, '70 > 12 is True, so it stops at the first branch. The order of conditions matters!'),
    F('This grader gives everyone over 50 a C, even 85. Fix the <b>order</b> of the conditions.', c`score = int(input())
if score >= 50:
    print("Grade C")
elif score >= 70:
    print("Grade A")
else:
    print("Grade U")`, c`score = int(input())
if score >= 70:
    print("Grade A")
elif score >= 50:
    print("Grade C")
else:
    print("Grade U")`, [['85 is A', c`o = run_with(['85']); assert 'Grade A' in o and 'Grade C' not in o`], ['60 is C', c`assert 'Grade C' in run_with(['60'])`], ['20 is U', c`assert 'Grade U' in run_with(['20'])`]], { inputs: ['85'] }),
  ],
  'and-or-not': [
    P(c`print(True and not False)`, ['True', 'False'], 0, 'not False is True, and True and True is True.'),
    P(c`x = 5
print(x > 1 and x < 4)`, ['False', 'True'], 0, '5 < 4 is False, so the whole and is False.'),
    P(c`print(not (3 > 2 or 1 > 2))`, ['False', 'True'], 0, '3 > 2 is True, so the or is True, and not True is False.'),
    F('It\'s Monday, but this prints Weekend! Fix the condition.', c`day = "Monday"
if day == "Saturday" or "Sunday":
    print("Weekend!")
else:
    print("School day")`, c`day = "Monday"
if day == "Saturday" or day == "Sunday":
    print("Weekend!")
else:
    print("School day")`, [['Monday is a school day', c`assert 'School day' in output and 'Weekend' not in output`]]),
  ],

  /* ---------------- Loops ---------------- */
  while: [
    P(c`n = 1
while n < 20:
    n = n * 2
print(n)`, ['32', '16', '20', '64'], 0, 'n goes 1, 2, 4, 8, 16, 32. At 32 the condition is False.'),
    P(c`i = 0
while i < 3:
    print(i)
    i += 1`, ['0\n1\n2', '1\n2\n3', '0\n1\n2\n3', '3'], 0, 'It prints before adding 1, and stops when i reaches 3.'),
    F('This loop never ends! Fix it so it counts 5, 4, 3, 2, 1 and then prints Done.', c`count = 5
while count > 0:
    print(count)
print("Done")`, c`count = 5
while count > 0:
    print(count)
    count -= 1
print("Done")`, [['Counts down then Done', c`assert lines == ['5', '4', '3', '2', '1', 'Done'], 'You printed %r' % lines[:8]`]]),
  ],
  'for-range': [
    P(c`for i in range(2, 10, 3):
    print(i)`, ['2\n5\n8', '2\n5\n8\n11', '2\n4\n6\n8', '3\n6\n9'], 0, 'Start at 2, add 3 each time, stop before 10.'),
    P(c`for ch in "hey":
    print(ch * 2)`, ['hh\nee\nyy', 'heyhey', 'h\ne\ny', 'hey\nhey'], 0, 'Each letter is repeated twice on its own line.'),
    O(c`for i in range(1, 4):
    print(i, "x 5 =", i * 5)
print("Finished")`, 'Order the lines to print the 5 times table from 1 to 3, then <b>Finished</b>.'),
    F('Use a for loop with <code>range</code> to print the even numbers from 2 to 20, one per line.', c`
`, c`for n in range(2, 21, 2):
    print(n)`, [['Prints 2 to 20 in twos', c`assert lines == [str(n) for n in range(2, 21, 2)], 'You printed %r' % lines`], ['Uses range', c`assert 'range(' in source`]]),
  ],
  accumulate: [
    P(c`total = 0
for n in [4, 6, 10]:
    total += n
print(total / 3)`, ['6.666666666666667', '20', '6', '20.0'], 0, '4 + 6 + 10 = 20, and 20 / 3 is about 6.67.'),
    O(c`word = "mississippi"
count = 0
for letter in word:
    if letter == "s":
        count += 1
print(count)`, 'Order the lines to count the s\'s in mississippi (the answer is 4).'),
    F('Multiply all the numbers from 1 to 5 together with a loop, storing the answer in <code>product</code> (it should be 120). Hint: start at 1, not 0!', c`product = 1
`, c`product = 1
for n in range(1, 6):
    product *= n
print(product)`, [['product is 120', c`assert product == 120, 'product is %r' % product`], ['Uses a loop', c`assert 'for ' in source or 'while ' in source`]]),
  ],
  'break-continue': [
    P(c`for n in range(10):
    if n == 3:
        continue
    if n == 6:
        break
    print(n)`, ['0\n1\n2\n4\n5', '0\n1\n2\n3\n4\n5', '0\n1\n2', '0\n1\n2\n4\n5\n6'], 0, '3 is skipped by continue, and the loop stops at 6 before printing it.'),
    F('Use a loop and <code>break</code> to find the first number <b>above 50</b> that divides exactly by 7. Store it in <code>found</code>.', c`n = 51
`, c`n = 51
while True:
    if n % 7 == 0:
        found = n
        break
    n += 1
print(found)`, [['found is 56', c`assert found == 56`], ['Uses break', c`assert 'break' in source`]]),
  ],
  'nested-loops': [
    P(c`for a in range(2):
    for b in range(3):
        print(a, b)`, ['0 0\n0 1\n0 2\n1 0\n1 1\n1 2', '0 0\n1 1', '0 0\n1 0\n0 1\n1 1\n0 2\n1 2', '0 1 2\n0 1 2'], 0, 'b goes all the way through 0, 1, 2 for each value of a.'),
    F('Use nested loops to print a rectangle of stars 3 rows tall and 5 stars wide. (Tip: <code>print("*", end="")</code> doesn\'t start a new line.)', c`
`, c`for row in range(3):
    for col in range(5):
        print("*", end="")
    print()`, [['Prints the rectangle', c`assert [l for l in lines if l] == ['*****'] * 3, 'You printed %r' % lines`], ['Uses nested loops', c`assert source.count('for ') >= 2`]]),
  ],

  /* ---------------- Lists ---------------- */
  lists: [
    P(c`nums = [5, 10, 15]
nums[1] = 99
print(nums)`, ['[5, 99, 15]', '[99, 10, 15]', '[5, 10, 99]', '[5, 10, 15]'], 0, 'Index 1 is the second item.'),
    P(c`a = ["x", "y", "z"]
print(a[-2])`, ['y', 'z', 'x', E], 0, '-1 is the last item, -2 the one before it.'),
    P(c`a = [1, 2]
print(a[2])`, ['2', '1', E, 'None'], 2, 'A 2-item list only has positions 0 and 1: IndexError.'),
    F('Set <code>has_pear</code> to True or False depending on whether <code>"pear"</code> is in the list, using <code>in</code>.', c`fruit = ["apple", "pear", "plum"]
`, c`fruit = ["apple", "pear", "plum"]
has_pear = "pear" in fruit
print(has_pear)`, [['has_pear is True', c`assert has_pear is True`], ['Uses in', c`assert ' in fruit' in source`]]),
  ],
  'list-methods': [
    P(c`x = [3, 1, 2]
x.append(0)
x.sort()
print(x)`, ['[0, 1, 2, 3]', '[3, 1, 2, 0]', '[1, 2, 3, 0]', '[0, 3, 1, 2]'], 0, 'append adds 0 at the end, then sort puts everything in order.'),
    P(c`x = [1, 2, 3]
y = x.pop()
print(y, x)`, ['3 [1, 2]', '1 [2, 3]', '3 [1, 2, 3]', '[1, 2] 3'], 0, 'pop() removes the last item and gives it back.'),
    P(c`x = [3, 1, 2]
print(x.sort())`, ['None', '[1, 2, 3]', '[3, 1, 2]', E], 0, 'sort() changes the list but returns None! Sort first, then print the list (or use sorted()).'),
    O(c`pets = []
pets.append("cat")
pets.append("dog")
pets.insert(0, "fish")
print(pets)`, "Order the lines so the program prints <b>['fish', 'cat', 'dog']</b>."),
  ],
  'list-loops': [
    P(c`t = [2, 8, 5]
print(max(t) - min(t))`, ['6', '3', '15', '8'], 0, '8 - 2 = 6.'),
    P(c`for i, c in enumerate(["a", "b"], start=1):
    print(i, c)`, ['1 a\n2 b', '0 a\n1 b', 'a 1\nb 2', '1 2'], 0, 'enumerate gives the position (starting at 1 here) and the item.'),
    F('Count how many temperatures are <b>above 20</b> and store it in <code>hot_days</code>.', c`temps = [18, 22, 25, 19, 30, 21]
`, c`temps = [18, 22, 25, 19, 30, 21]
hot_days = 0
for t in temps:
    if t > 20:
        hot_days += 1
print(hot_days)`, [['hot_days is 4', c`assert hot_days == 4, 'hot_days is %r' % hot_days`]]),
  ],
  'list-tricks': [
    P(c`print("-".join(["a", "b", "c"]))`, ['a-b-c', 'abc', '-a-b-c-', 'a b c'], 0, 'join puts the "-" between each item.'),
    P(c`print([n * n for n in range(4)])`, ['[0, 1, 4, 9]', '[1, 4, 9, 16]', '[0, 1, 2, 3]', '[0, 2, 4, 6]'], 0, 'range(4) is 0 to 3, each squared.'),
    P(c`x = [10, 20, 30, 40, 50]
print(x[1:3])`, ['[20, 30]', '[20, 30, 40]', '[10, 20, 30]', '[30, 40]'], 0, 'From position 1 up to (not including) 3.'),
    F('Use a list comprehension to make <code>loud</code>: every word in <code>words</code> in CAPITALS.', c`words = ["go", "team", "go"]
`, c`words = ["go", "team", "go"]
loud = [w.upper() for w in words]
print(loud)`, [['loud is correct', c`assert loud == ['GO', 'TEAM', 'GO']`], ['Uses a comprehension', c`import re
assert re.search(r'\[.*for .* in ', source)`]]),
  ],
  grids: [
    P(c`g = [[1, 2, 3], [4, 5, 6]]
print(g[1][0] + g[0][2])`, ['7', '6', '5', '9'], 0, 'g[1][0] is 4 and g[0][2] is 3.'),
    P(c`g = [[0] * 2 for r in range(2)]
g[0][1] = 5
print(g)`, ['[[0, 5], [0, 0]]', '[[0, 5], [0, 5]]', '[[5, 0], [0, 0]]', '[[0, 0], [0, 5]]'], 0, 'Each row is its own list, so only row 0 changes.'),
    P(c`g = [[0] * 2] * 2
g[0][1] = 5
print(g)`, ['[[0, 5], [0, 0]]', '[[0, 5], [0, 5]]', '[[5, 0], [0, 0]]', E], 1, 'The trap! * 2 copies the same row twice, so changing one changes both. Build rows with a loop.'),
    F('Count the walls (<code>#</code>) in the level and store the number in <code>walls</code>.', c`level = ["#####",
         "#..##",
         "#####"]
`, c`level = ["#####",
         "#..##",
         "#####"]
walls = 0
for row in level:
    for ch in row:
        if ch == "#":
            walls += 1
print(walls)`, [['walls is 13', c`assert walls == 13, 'walls is %r' % walls`]]),
  ],

  /* ---------------- Functions ---------------- */
  def: [
    P(c`def hi():
    print("hi")

print("start")
hi()
hi()`, ['start\nhi\nhi', 'hi\nstart\nhi', 'hi\nhi\nstart', 'start\nhi'], 0, 'Defining hi() prints nothing; it runs when it\'s called.'),
    O(c`def banner():
    print("**********")
    print("*  SALE  *")
    print("**********")
banner()`, 'Order the lines to define <code>banner()</code> and then call it.'),
    F('Fix the error. (Hint: a function must be defined before it\'s called.)', c`greet()

def greet():
    print("Hello!")`, c`def greet():
    print("Hello!")

greet()`, [['Prints Hello!', c`assert 'Hello!' in output`]]),
  ],
  params: [
    P(c`def f(a, b=2):
    print(a * b)

f(3)
f(3, 3)`, ['6\n9', '3\n9', '6\n6', E], 0, 'The first call uses the default b=2; the second gives b=3.'),
    P(c`def show(x, y):
    print(x, y)

show(y=1, x=2)`, ['2 1', '1 2', E, 'x y'], 0, 'Keyword arguments match by name, not position.'),
    F('Write <code>repeat(word, times)</code> that prints <code>word</code> on <code>times</code> separate lines.', c`def repeat(word, times):
    pass
`, c`def repeat(word, times):
    for i in range(times):
        print(word)

repeat("hi", 3)`, [['repeat("hi", 3)', c`assert capture(repeat, 'hi', 3).split() == ['hi'] * 3`], ['repeat("yo", 1)', c`assert capture(repeat, 'yo', 1).split() == ['yo']`]]),
  ],
  return: [
    P(c`def f(x):
    return x + 1
    print("hi")

print(f(f(1)))`, ['3', '2', 'hi\n3', '3\nhi'], 0, 'f(1) is 2, f(2) is 3. The print after return never runs.'),
    P(c`def g():
    print("A")
    return "B"

x = g()
print(x)`, ['A\nB', 'B\nA', 'A', 'B'], 0, 'Calling g prints A; the returned "B" is stored in x and printed.'),
    F('Write <code>largest(a, b)</code> that <b>returns</b> the bigger number, using if (not max()).', c`def largest(a, b):
    pass
`, c`def largest(a, b):
    if a > b:
        return a
    return b

print(largest(3, 9))`, [['largest(3, 9) is 9', c`assert largest(3, 9) == 9`], ['largest(10, 2) is 10', c`assert largest(10, 2) == 10`], ['No max()', c`assert 'max(' not in source`]]),
  ],
  scope: [
    P(c`x = 1

def f():
    x = 2
    print(x)

f()
print(x)`, ['2\n1', '2\n2', '1\n1', '1\n2'], 0, 'The x inside f is a separate, local variable.'),
    F('Write <code>add_vat(price)</code> with a docstring that <b>returns</b> the price with 20% added (price × 1.2).', c`
`, c`def add_vat(price):
    """Return the price with 20% VAT added."""
    return price * 1.2

print(add_vat(10))`, [['add_vat(10) is 12', c`assert approx(add_vat(10), 12)`], ['Has a docstring', c`assert add_vat.__doc__`]]),
  ],

  /* ---------------- Dictionaries & More ---------------- */
  dicts: [
    P(c`d = {"a": 1, "b": 2}
d["a"] = 5
print(d)`, ["{'a': 5, 'b': 2}", "{'a': 1, 'b': 2}", "{'a': 1, 'b': 2, 'a': 5}", "{'b': 2, 'a': 5}"], 0, 'Setting an existing key replaces its value.'),
    P(c`d = {"x": 1}
print(d.get("y", 0) + d["x"])`, ['1', '0', E, 'None'], 0, '.get gives the default 0 for the missing key.'),
    P(c`d = {"x": 1}
print(d["y"])`, ['None', '0', E, 'y'], 2, 'Square brackets with a missing key cause a KeyError.'),
    F('Add Ben\'s number (<code>"07700 900123"</code>) to <code>phone</code>, then print Ann\'s number by looking it up.', c`phone = {"Ann": "07700 900456"}
`, c`phone = {"Ann": "07700 900456"}
phone["Ben"] = "07700 900123"
print(phone["Ann"])`, [['Ben added', c`assert phone.get('Ben') == '07700 900123'`], ['Prints Ann\'s number', c`assert '07700 900456' in output`]]),
  ],
  'dict-loops': [
    P(c`d = {"a": 1, "b": 2}
for k, v in d.items():
    print(k * v)`, ['a\nbb', '1\n2', 'a1\nb2', 'ab'], 0, 'A string times a number repeats it: "a" * 1 and "b" * 2.'),
    P(c`d = {"cat": 3, "dog": 5}
print(sum(d.values()))`, ['8', 'catdog', '2', E], 0, 'values() gives 3 and 5.'),
    F('Count how many times each word appears in <code>sentence</code>, in a dictionary called <code>counts</code>.', c`sentence = "the cat and the hat"
counts = {}
`, c`sentence = "the cat and the hat"
counts = {}
for w in sentence.split():
    counts[w] = counts.get(w, 0) + 1
print(counts)`, [['counts is correct', c`assert counts == {'the': 2, 'cat': 1, 'and': 1, 'hat': 1}, 'counts is %r' % counts`]]),
  ],
  'tuples-sets': [
    P(c`a, b = 1, 2
a, b = b, a
print(a, b)`, ['2 1', '1 2', '2 2', '1 1'], 0, 'A neat Python trick to swap two variables.'),
    P(c`print(len({1, 2, 2, 3, 3, 3}))`, ['3', '6', '1', '2'], 0, 'A set keeps only unique values.'),
    P(c`t = (1, 2)
t[0] = 5
print(t)`, ['(5, 2)', '(1, 2)', E, '[5, 2]'], 2, 'Tuples can\'t be changed: TypeError.'),
    F('Using sets, make <code>both</code>: a sorted list of friends Amy and Raj have in common.', c`amy = ["Ben", "Cat", "Dev", "Eli"]
raj = ["Cat", "Fay", "Eli", "Gus"]
`, c`amy = ["Ben", "Cat", "Dev", "Eli"]
raj = ["Cat", "Fay", "Eli", "Gus"]
both = sorted(set(amy) & set(raj))
print(both)`, [['both is correct', c`assert both == ['Cat', 'Eli'], 'both is %r' % (both,)`], ['Uses sets', c`assert 'set(' in source`]]),
  ],
  'list-of-dicts': [
    P(c`ps = [{"n": "A", "s": 3}, {"n": "B", "s": 9}]
print(ps[1]["s"] - ps[0]["s"])`, ['6', '3', '9', E], 0, '9 - 3 = 6.'),
    F('Add up the <code>"price"</code> of every item in the basket into <code>total</code>.', c`basket = [{"item": "pen", "price": 1.5}, {"item": "pad", "price": 3.0}, {"item": "bag", "price": 12.0}]
`, c`basket = [{"item": "pen", "price": 1.5}, {"item": "pad", "price": 3.0}, {"item": "bag", "price": 12.0}]
total = 0
for thing in basket:
    total += thing["price"]
print(total)`, [['total is 16.5', c`assert approx(total, 16.5)`]]),
  ],

  /* ---------------- Errors & Debugging ---------------- */
  'try-except': [
    P(c`try:
    print(10 / 0)
except ZeroDivisionError:
    print("oops")
print("end")`, ['oops\nend', 'end', E, 'oops'], 0, 'The error is caught, then the program carries on.'),
    P(c`try:
    n = int("5")
    print(n * 2)
except ValueError:
    print("bad")`, ['10', 'bad', '55', '10\nbad'], 0, 'No error happens, so except is skipped.'),
    F('Write <code>safe_int(text)</code> that returns the whole number, or <code>None</code> if the text isn\'t a number.', c`def safe_int(text):
    pass
`, c`def safe_int(text):
    try:
        return int(text)
    except ValueError:
        return None

print(safe_int("42"), safe_int("cat"))`, [['safe_int("42") is 42', c`assert safe_int("42") == 42`], ['safe_int("cat") is None', c`assert safe_int("cat") is None`], ['Uses try/except', c`assert 'try:' in source`]]),
  ],
  debugging: [
    P(c`total = 0
for i in range(1, 5):
    total += i
print(total)`, ['10', '15', '4', '5'], 0, 'range(1, 5) stops at 4: 1 + 2 + 3 + 4 = 10. A classic off-by-one if you wanted 15!'),
    F('<code>count_vowels("banana")</code> should be 3 but isn\'t. Find the bug.', c`def count_vowels(word):
    for letter in word:
        count = 0
        if letter in "aeiou":
            count += 1
    return count`, c`def count_vowels(word):
    count = 0
    for letter in word:
        if letter in "aeiou":
            count += 1
    return count`, [['banana has 3', c`assert count_vowels("banana") == 3`], ['sky has 0', c`assert count_vowels("sky") == 0`]]),
    F('People aged exactly 18 are adults, but this says they aren\'t. Fix it.', c`def is_adult(age):
    if age > 18:
        return True
    return False`, c`def is_adult(age):
    if age >= 18:
        return True
    return False`, [['18 is an adult', c`assert is_adult(18) is True`], ['17 is not', c`assert is_adult(17) is False`]]),
  ],

  /* ---------------- Modules & Files ---------------- */
  modules: [
    P(c`import math
print(math.floor(3.9) + math.ceil(3.1))`, ['7', '6', '8', '7.0'], 0, 'floor(3.9) is 3 and ceil(3.1) is 4.'),
    P(c`from math import sqrt
print(sqrt(49))`, ['7.0', '7', E, '49'], 0, 'sqrt always gives a float.'),
    F('Write <code>coin_flip()</code> that returns <code>"heads"</code> or <code>"tails"</code> at random.', c`import random
`, c`import random

def coin_flip():
    return random.choice(["heads", "tails"])

print(coin_flip())`, [['Returns heads or tails', c`assert set(coin_flip() for _ in range(200)) == {'heads', 'tails'}`]]),
  ],
  files: [
    P(c`with open("t.txt", "w") as f:
    f.write("a")
    f.write("b")
print(open("t.txt").read())`, ['ab', 'a\nb', 'b', E], 0, 'write doesn\'t add new lines for you.'),
    P(c`with open("t.txt", "w") as f:
    f.write("1\n")
with open("t.txt", "a") as f:
    f.write("2\n")
print(open("t.txt").read().strip())`, ['1\n2', '2', '1', '12'], 0, '"a" (append) adds to the end instead of replacing.'),
    F('Save <code>score</code> to <code>best.txt</code>, then read it back into <code>saved</code> as a number.', c`score = 4200
`, c`score = 4200
with open("best.txt", "w") as f:
    f.write(str(score))
with open("best.txt") as f:
    saved = int(f.read())
print(saved)`, [['saved is 4200', c`assert saved == 4200 and isinstance(saved, int)`], ['Reads the file', c`assert source.count('open(') >= 2`]]),
  ],
  'proj-todo': [
    P(c`tasks = ["a", "b", "c"]
tasks.remove("b")
for i, t in enumerate(tasks, start=1):
    print(f"{i}. {t}")`, ['1. a\n2. c', '1. a\n3. c', '0. a\n1. c', '1. a\n2. b'], 0, 'After removing "b", the list is ["a", "c"] and is renumbered.'),
  ],

  /* ---------------- Classes & Objects ---------------- */
  classes: [
    P(c`class Box:
    def __init__(self, size):
        self.size = size

    def double(self):
        return self.size * 2

b = Box(4)
print(b.double(), b.size)`, ['8 4', '8 8', '4 8', E], 0, 'double() returns 8 but doesn\'t change size.'),
    P(c`class A:
    def hi():
        return 1

print(A().hi())`, ['1', 'None', E, 'hi'], 2, 'Methods need self as their first parameter: TypeError.'),
    F('Write a class <code>Rectangle(width, height)</code> with methods <code>area()</code> and <code>perimeter()</code>.', c`class Rectangle:
    pass
`, c`class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

r = Rectangle(3, 4)
print(r.area(), r.perimeter())`, [['area', c`assert Rectangle(3, 4).area() == 12`], ['perimeter', c`assert Rectangle(3, 4).perimeter() == 14`]]),
  ],
  'objects-state': [
    P(c`class C:
    def __init__(self):
        self.n = 0

    def add(self):
        self.n += 1

a = C()
b = C()
a.add()
a.add()
b.add()
print(a.n, b.n)`, ['2 1', '3 3', '1 2', '2 2'], 0, 'Each object keeps its own n.'),
    F('Write a <code>Counter</code> class: starts at 0, <code>click()</code> adds 1, <code>reset()</code> goes back to 0. Store the number in <code>self.count</code>.', c`class Counter:
    pass
`, c`class Counter:
    def __init__(self):
        self.count = 0

    def click(self):
        self.count += 1

    def reset(self):
        self.count = 0`, [['Starts at 0 and clicks', c`k = Counter(); k.click(); k.click(); assert k.count == 2`], ['reset works', c`k = Counter(); k.click(); k.reset(); assert k.count == 0`]]),
  ],
  inheritance: [
    P(c`class Animal:
    def speak(self):
        return "..."

    def intro(self):
        return "I say " + self.speak()

class Cat(Animal):
    def speak(self):
        return "meow"

print(Cat().intro())`, ['I say meow', 'I say ...', E, 'meow'], 0, 'intro is inherited, but self.speak() uses the Cat\'s own version.'),
    F('Write <code>Shape</code> with <code>area()</code> returning 0, and <code>Square(Shape)</code> that stores <code>side</code> and overrides <code>area()</code>.', c`class Shape:
    pass
`, c`class Shape:
    def area(self):
        return 0

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side * self.side`, [['Shape().area() is 0', c`assert Shape().area() == 0`], ['Square(5).area() is 25', c`assert Square(5).area() == 25`], ['Square is a Shape', c`assert isinstance(Square(1), Shape)`]]),
  ],

  /* ---------------- Text Games ---------------- */
  'proj-guess': [
    P(c`def check(guess, secret):
    if guess < secret:
        return "Too low"
    if guess > secret:
        return "Too high"
    return "Correct!"

print(check(5, 5), check(9, 5))`, ['Correct! Too high', 'Correct! Too low', 'Too high Correct!', 'Correct!'], 0, '5 equals 5; 9 is bigger than 5.'),
  ],
  'proj-rps': [
    P(c`beats = {"rock": "scissors", "scissors": "paper", "paper": "rock"}
print(beats[beats["rock"]])`, ['paper', 'rock', 'scissors', E], 0, 'beats["rock"] is "scissors", and beats["scissors"] is "paper".'),
  ],
  'proj-hangman': [
    P(c`word = "banana"
guessed = {"a"}
print(" ".join(ch if ch in guessed else "_" for ch in word))`, ['_ a _ a _ a', 'b a n a n a', '_a_a_a', 'a a a'], 0, 'Only the a\'s have been guessed.'),
  ],
  'proj-adventure': [
    P(c`rooms = {"hall": {"north": "attic"}, "attic": {"south": "hall"}}
here = "hall"
here = rooms[here]["north"]
here = rooms[here]["south"]
print(here)`, ['hall', 'attic', 'north', E], 0, 'North to the attic, then south back to the hall.'),
  ],
  'proj-tictactoe': [
    P(c`pos = 8
print((pos - 1) // 3, (pos - 1) % 3)`, ['2 1', '2 2', '1 2', '3 2'], 0, '7 // 3 = 2 and 7 % 3 = 1: bottom row, middle column.'),
  ],
  'proj-battle': [
    P(c`print(max(0, 5 - 12), min(100, 90 + 15))`, ['0 100', '-7 105', '0 105', '5 100'], 0, 'max(0, ...) stops health going negative; min(100, ...) caps healing.'),
  ],

  /* ---------------- Drawing with Code ---------------- */
  canvas: [
    F('Draw a flag with three <b>vertical</b> stripes of different colours, filling the screen (each stripe 200 wide and 400 tall).', c`def draw():
    pass
`, c`def draw():
    screen.rect(0, 0, 200, 400, "green")
    screen.rect(200, 0, 200, 400, "white")
    screen.rect(400, 0, 200, 400, "orange")`, [
      ['Three stripes', c`assert len(shapes('rect')) >= 3`],
      ['Different colours', c`assert len(set(r[5] for r in shapes('rect'))) >= 3`],
      ['Side by side', c`xs = sorted(r[1] for r in shapes('rect'))[:3]
assert xs == [0, 200, 400], 'Start the stripes at x = 0, 200 and 400.'`]], G),
  ],
  'shapes-colours': [
    P(c`r, g, b = 255, 128, 0
print((r, g // 2, b))`, ['(255, 64, 0)', '(255, 128, 0)', '(255, 64.0, 0)', E], 0, '// gives a whole number: 128 // 2 = 64.'),
    F('Draw an arrow pointing right using <code>screen.polygon</code> with <b>at least 5 points</b>.', c`def draw():
    screen.fill("white")
`, c`def draw():
    screen.fill("white")
    screen.polygon([(100, 170), (350, 170), (350, 120), (500, 200), (350, 280), (350, 230), (100, 230)], "royalblue")`, [['A polygon with 5+ points', c`assert any(len(p[1]) >= 5 for p in shapes('polygon'))`]], G),
  ],
  'drawing-loops': [
    P(c`for i in range(4):
    print(20 + i * 50)`, ['20\n70\n120\n170', '20\n50\n100\n150', '0\n50\n100\n150', '20\n70\n120'], 0, 'i is 0, 1, 2, 3, so the positions go up in 50s from 20.'),
    F('Draw an 8 × 8 <b>chessboard</b> of 40-pixel squares using nested loops. Hint: a square is dark when <code>(row + col) % 2 == 1</code>.', c`def draw():
    screen.fill("white")
`, c`def draw():
    screen.fill("white")
    for row in range(8):
        for col in range(8):
            colour = "saddlebrown" if (row + col) % 2 == 1 else "wheat"
            screen.rect(col * 40, row * 40, 40, 40, colour)`, [['64 squares', c`assert len(shapes('rect')) >= 64`], ['Two colours', c`assert len(set(r[5] for r in shapes('rect'))) >= 2`], ['Nested loops', c`assert source.count('for ') >= 2`]], G),
  ],
  'emoji-text': [
    P(c`lives = 3
print("❤" * lives)`, ['❤❤❤', '❤3', '3❤', E], 0, 'Repeating a string works with emoji too. Handy for showing lives!'),
    F('Show <code>GAME OVER</code> exactly in the middle of the screen.', c`def draw():
    screen.fill("black")
`, c`def draw():
    screen.fill("black")
    screen.text("GAME OVER", WIDTH / 2, HEIGHT / 2, 60, "red", center=True)`, [['Centred GAME OVER', c`t = [k for k in shapes('text') if 'game over' in k[1].lower()]
assert t, 'Write GAME OVER with screen.text.'
assert t[0][6] is True and approx(t[0][2], g['WIDTH'] / 2, 1) and approx(t[0][3], g['HEIGHT'] / 2, 1), 'Use WIDTH / 2, HEIGHT / 2 and center=True.'`]], G),
  ],

  /* ---------------- Animation ---------------- */
  'game-loop': [
    P(c`x = 10
for frame in range(60):
    x += 2
print(x)`, ['130', '120', '70', '62'], 0, '60 frames × 2 pixels = 120, plus the starting 10.'),
    F('Make a sun rise: <code>sun_y</code> starts at 400. Each frame, move it up 1 pixel, but stop when it reaches 80.', c`sun_y = 400


def update():
    pass


def draw():
    screen.fill("lightskyblue")
    screen.circle(300, sun_y, 50, "gold")
`, c`sun_y = 400


def update():
    global sun_y
    if sun_y > 80:
        sun_y -= 1


def draw():
    screen.fill("lightskyblue")
    screen.circle(300, sun_y, 50, "gold")`, [['Rises 1 pixel a frame', c`g['sun_y'] = 300; frames(1); assert g['sun_y'] == 299`], ['Stops at 80', c`g['sun_y'] = 81; frames(5); assert g['sun_y'] == 80, 'sun_y is %r' % g['sun_y']`]], G),
  ],
  bounce: [
    P(c`speed = 4
for wall_hit in range(3):
    speed = -speed
print(speed)`, ['-4', '4', '12', '-12'], 0, 'Flipping three times: -4, 4, -4.'),
    F('Make a 50 × 50 square slide left and right: <code>x</code> moves by <code>speed</code> each frame, and <code>speed</code> flips when the square reaches either side (x &gt; WIDTH - 50 or x &lt; 0).', c`x = 0
speed = 5


def update():
    pass


def draw():
    screen.fill("black")
    screen.rect(x, 175, 50, 50, "lime")
`, c`x = 0
speed = 5


def update():
    global x, speed
    x += speed
    if x > WIDTH - 50 or x < 0:
        speed = -speed


def draw():
    screen.fill("black")
    screen.rect(x, 175, 50, 50, "lime")`, [['Moves', c`g.update(x=100, speed=5); frames(1); assert g['x'] == 105`], ['Bounces off the right', c`g.update(x=g['WIDTH'] - 52, speed=5); frames(1); assert g['speed'] < 0`], ['Bounces off the left', c`g.update(x=2, speed=-5); frames(1); assert g['speed'] > 0`]], G),
  ],
  'many-things': [
    P(c`drops = [{"y": 5}, {"y": 9}]
for d in drops:
    d["y"] += 10
print([d["y"] for d in drops])`, ['[15, 19]', '[5, 9]', '[10, 10]', E], 0, 'Changing a dictionary inside the loop changes it in the list too.'),
    F('Make <code>dots</code>: a list of 30 dictionaries with random <code>"x"</code> and <code>"y"</code>. In update, move every dot right by 1, and back to x = 0 when it passes WIDTH.', c`import random

dots = []


def update():
    pass


def draw():
    screen.fill("black")
    for d in dots:
        screen.circle(d["x"], d["y"], 4, "hotpink")
`, c`import random

dots = []
for i in range(30):
    dots.append({"x": random.randint(0, WIDTH), "y": random.randint(0, HEIGHT)})


def update():
    for d in dots:
        d["x"] += 1
        if d["x"] > WIDTH:
            d["x"] = 0


def draw():
    screen.fill("black")
    for d in dots:
        screen.circle(d["x"], d["y"], 4, "hotpink")`, [['30 dots', c`assert len(g['dots']) >= 30`], ['Dots move right', c`g['dots'] = [{'x': 5, 'y': 5}]; frames(1); assert g['dots'][0]['x'] == 6`], ['Dots wrap round', c`g['dots'] = [{'x': g['WIDTH'], 'y': 5}]; frames(1); assert g['dots'][0]['x'] == 0`]], G),
  ],

  /* ---------------- Player Controls ---------------- */
  keyboard: [
    P(c`x = 590
x = max(0, min(x + 10, 560))
print(x)`, ['560', '600', '590', '0'], 0, 'x + 10 is 600, but min caps it at 560.'),
    F('Many games use <b>W A S D</b> instead of arrows. Move the player 3 pixels with those keys (<code>keyboard.w</code> is up, <code>a</code> left, <code>s</code> down, <code>d</code> right).', c`player_x = 300
player_y = 200


def update():
    pass


def draw():
    screen.fill("navy")
    screen.emoji("🛸", player_x, player_y, 50)
`, c`player_x = 300
player_y = 200


def update():
    global player_x, player_y
    if keyboard.w:
        player_y -= 3
    if keyboard.s:
        player_y += 3
    if keyboard.a:
        player_x -= 3
    if keyboard.d:
        player_x += 3


def draw():
    screen.fill("navy")
    screen.emoji("🛸", player_x, player_y, 50)`, [['D moves right', c`g.update(player_x=300, player_y=200); hold('d'); frames(1); assert g['player_x'] == 303`], ['A, W and S work', c`g.update(player_x=300, player_y=200); hold('a', 'w'); frames(1); assert (g['player_x'], g['player_y']) == (297, 197)
hold('s'); frames(1); assert g['player_y'] == 200`]], G),
  ],
  events: [
    P(c`import math
print(math.hypot(6, 8))`, ['10.0', '14', '10', '48'], 0, 'Pythagoras: √(36 + 64) = 10, as a float.'),
    F('Count how many times <b>space</b> is pressed in a variable <code>presses</code> using <code>on_key_down</code>, and show it on screen.', c`presses = 0


def draw():
    screen.fill("black")
`, c`presses = 0


def on_key_down(key):
    global presses
    if key == "space":
        presses += 1


def draw():
    screen.fill("black")
    screen.text(f"Presses: {presses}", WIDTH / 2, HEIGHT / 2, 48, "white", center=True)`, [['Counts space', c`g['presses'] = 0; press('space'); press('space'); assert g['presses'] == 2`], ['Ignores other keys', c`g['presses'] = 0; press('a'); assert g['presses'] == 0`], ['Shown on screen', c`g['presses'] = 7; assert '7' in texts()`]], G),
  ],

  /* ---------------- Collisions & Game Objects ---------------- */
  'rect-collision': [
    P(c`hit = False
print("red" if hit else "grey")`, ['grey', 'red', 'False', E], 0, 'hit is False, so the value after else is chosen.'),
    F('Write <code>point_in_rect(px, py, x, y, w, h)</code>: True if the point is inside the rectangle (edges count as inside).', c`def point_in_rect(px, py, x, y, w, h):
    pass
`, c`def point_in_rect(px, py, x, y, w, h):
    return x <= px <= x + w and y <= py <= y + h`, [['Inside', c`assert point_in_rect(50, 50, 0, 0, 100, 100) is True`], ['Outside', c`assert point_in_rect(150, 50, 0, 0, 100, 100) is False and point_in_rect(50, -1, 0, 0, 100, 100) is False`], ['On the edge', c`assert point_in_rect(100, 100, 0, 0, 100, 100) is True`]]),
  ],
  collect: [
    P(c`import math
print(math.hypot(3, 4) < 5)`, ['False', 'True'], 0, 'The distance is exactly 5, and 5 < 5 is False. Just touching doesn\'t count!'),
    F('Write <code>touching(x1, y1, r1, x2, y2, r2)</code> that returns True when two circles overlap.', c`import math


def touching(x1, y1, r1, x2, y2, r2):
    pass
`, c`import math


def touching(x1, y1, r1, x2, y2, r2):
    return math.hypot(x1 - x2, y1 - y2) < r1 + r2`, [['Overlapping', c`assert touching(0, 0, 10, 15, 0, 10) is True`], ['Apart', c`assert touching(0, 0, 10, 50, 0, 10) is False`], ['Diagonal', c`assert touching(0, 0, 5, 3, 4, 1) is True and touching(0, 0, 2, 3, 4, 2) is False`]]),
  ],
  'sprite-classes': [
    P(c`class Mover:
    def __init__(self):
        self.x = 0

    def update(self):
        self.x += 3

movers = [Mover(), Mover()]
for m in movers:
    m.update()
movers[0].update()
print(movers[0].x, movers[1].x)`, ['6 3', '3 3', '6 6', '3 6'], 0, 'Every mover updates once, then the first one updates again.'),
    F('Write a class <code>Firefly(x, y)</code> with <code>self.glow = 0</code>. <code>update()</code> adds 1 to glow and wraps back to 0 at 60. <code>is_bright()</code> returns True while glow is under 30.', c`class Firefly:
    pass
`, c`class Firefly:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.glow = 0

    def update(self):
        self.glow += 1
        if self.glow >= 60:
            self.glow = 0

    def is_bright(self):
        return self.glow < 30`, [['Starts at 0', c`f = Firefly(1, 2); assert (f.x, f.y, f.glow) == (1, 2, 0)`], ['Glows and wraps', c`f = Firefly(0, 0)
for i in range(59): f.update()
assert f.glow == 59; f.update(); assert f.glow == 0`], ['is_bright', c`f = Firefly(0, 0); assert f.is_bright(); f.glow = 45; assert not f.is_bright()`]]),
  ],
  enemies: [
    P(c`nums = [1, 2, 2, 3]
for n in nums:
    if n == 2:
        nums.remove(n)
print(nums)`, ['[1, 2, 3]', '[1, 3]', '[1, 2, 2, 3]', E], 0, 'The trap! Removing while looping makes Python skip the next item, so one 2 survives. Build a new list instead.'),
    P(c`ys = [50, 450, 120, 600]
print([y for y in ys if y < 400])`, ['[50, 120]', '[450, 600]', '[50, 450, 120]', '[]'], 0, 'Only values below 400 are kept.'),
    F('Write <code>remove_dead(enemies)</code> that <b>returns a new list</b> without any enemy whose <code>"hp"</code> is 0 or less.', c`def remove_dead(enemies):
    pass
`, c`def remove_dead(enemies):
    return [e for e in enemies if e["hp"] > 0]`, [['Removes the dead', c`r = remove_dead([{'hp': 3}, {'hp': 0}, {'hp': -2}, {'hp': 1}])
assert r == [{'hp': 3}, {'hp': 1}], 'got %r' % (r,)`], ['Handles neighbours', c`assert remove_dead([{'hp': 0}, {'hp': 0}, {'hp': 5}]) == [{'hp': 5}]`]]),
  ],

  /* ---------------- Game Mechanics ---------------- */
  'game-states': [
    P(c`state = "title"
for key in ["a", "space", "space"]:
    if key == "space" and state == "title":
        state = "playing"
    elif key == "space" and state == "playing":
        state = "paused"
print(state)`, ['paused', 'playing', 'title', E], 0, '"a" does nothing; the first space starts the game, the second pauses it.'),
    F('Add a pause button: pressing <code>p</code> switches <code>state</code> between <code>"playing"</code> and <code>"paused"</code>. The score should only go up while playing.', c`state = "playing"
score = 0


def on_key_down(key):
    pass


def update():
    global score
    score += 1


def draw():
    screen.fill("black")
    screen.text(f"Score: {score}", 10, 10, 30, "white")
    if state == "paused":
        screen.text("PAUSED", WIDTH / 2, HEIGHT / 2, 60, "yellow", center=True)
`, c`state = "playing"
score = 0


def on_key_down(key):
    global state
    if key == "p":
        state = "paused" if state == "playing" else "playing"


def update():
    global score
    if state == "playing":
        score += 1


def draw():
    screen.fill("black")
    screen.text(f"Score: {score}", 10, 10, 30, "white")
    if state == "paused":
        screen.text("PAUSED", WIDTH / 2, HEIGHT / 2, 60, "yellow", center=True)`, [['P pauses and unpauses', c`g['state'] = 'playing'; press('p'); assert g['state'] == 'paused'; press('p'); assert g['state'] == 'playing'`], ['No points while paused', c`g.update(state='paused', score=5); frames(10); assert g['score'] == 5`], ['Points while playing', c`g.update(state='playing', score=5); frames(10); assert g['score'] == 15`]], G),
  ],
  timers: [
    P(c`frames = 150
print(frames // 60, frames % 60)`, ['2 30', '2.5 0', '3 30', '2 50'], 0, '150 frames is 2 whole seconds and 30 frames left over.'),
    F('Make text blink: count frames in <code>frame_count</code>, and flip <code>visible</code> between True and False every 30 frames. Only draw the text when visible.', c`frame_count = 0
visible = True


def update():
    pass


def draw():
    screen.fill("black")
`, c`frame_count = 0
visible = True


def update():
    global frame_count, visible
    frame_count += 1
    if frame_count % 30 == 0:
        visible = not visible


def draw():
    screen.fill("black")
    if visible:
        screen.text("PRESS START", WIDTH / 2, HEIGHT / 2, 48, "white", center=True)`, [['Flips every 30 frames', c`g.update(frame_count=0, visible=True); frames(29); assert g['visible'] is True
frames(1); assert g['visible'] is False; frames(30); assert g['visible'] is True`], ['Only drawn when visible', c`g['visible'] = True; a = len(shapes('text')); g['visible'] = False; b = len(shapes('text')); assert a > b`]], G),
  ],
  gravity: [
    P(c`y, vy = 100, -6
for frame in range(4):
    vy += 2
    y += vy
print(y, vy)`, ['96 2', '100 0', '92 2', '94 0'], 0, 'vy goes -4, -2, 0, 2 and y goes 96, 94, 94, 96: up, a pause at the top, then down.'),
    F('Allow a <b>double jump</b>: <code>jumps_left</code> resets to 2 on the ground, and space jumps (velocity_y = -9) only while jumps_left is above 0, using one up each time.', c`GRAVITY = 0.5
GROUND_Y = 300
player_y = GROUND_Y
velocity_y = 0
jumps_left = 2


def on_key_down(key):
    pass


def update():
    global player_y, velocity_y
    velocity_y += GRAVITY
    player_y += velocity_y
    if player_y >= GROUND_Y:
        player_y = GROUND_Y
        velocity_y = 0


def draw():
    screen.fill("lightskyblue")
    screen.emoji("🐇", 150, player_y, 50)
`, c`GRAVITY = 0.5
GROUND_Y = 300
player_y = GROUND_Y
velocity_y = 0
jumps_left = 2


def on_key_down(key):
    global velocity_y, jumps_left
    if key == "space" and jumps_left > 0:
        velocity_y = -9
        jumps_left -= 1


def update():
    global player_y, velocity_y, jumps_left
    velocity_y += GRAVITY
    player_y += velocity_y
    if player_y >= GROUND_Y:
        player_y = GROUND_Y
        velocity_y = 0
        jumps_left = 2


def draw():
    screen.fill("lightskyblue")
    screen.emoji("🐇", 150, player_y, 50)`, [['Two jumps, then no more', c`g.update(player_y=g['GROUND_Y'], velocity_y=0, jumps_left=2)
press('space'); assert g['velocity_y'] == -9 and g['jumps_left'] == 1
frames(3); press('space'); assert g['velocity_y'] == -9 and g['jumps_left'] == 0
frames(3); v = g['velocity_y']; press('space'); assert g['velocity_y'] == v, 'A third jump should not work.'`], ['Landing resets jumps', c`g.update(player_y=g['GROUND_Y'] - 1, velocity_y=3, jumps_left=0); frames(1); assert g['jumps_left'] == 2`]], G),
  ],

  /* ---------------- Arcade Projects ---------------- */
  'proj-catch': [
    P(c`print(abs(250 - 310) < 60, abs(250 - 300) < 60)`, ['False True', 'True True', 'True False', 'False False'], 0, '60 < 60 is False (exactly 60 apart), but 50 < 60 is True.'),
  ],
  'proj-dodge': [
    P(c`for score in [0, 10, 25, 40]:
    print(max(10, 40 - score))`, ['40\n30\n15\n10', '40\n30\n15\n0', '10\n10\n10\n10', '40\n30\n25\n10'], 0, 'The gap between rocks shrinks as the score grows, but never below 10.'),
  ],
  'proj-paddle': [
    P(c`speed = -5
speed = -speed * 1.05
print(speed)`, ['5.25', '-5.25', '5.05', '4.75'], 0, 'Flipped to 5, then 5% faster.'),
  ],
  'proj-snake': [
    P(c`snake = [(3, 1), (2, 1), (1, 1)]
snake.insert(0, (4, 1))
snake.pop()
print(snake)`, ['[(4, 1), (3, 1), (2, 1)]', '[(3, 1), (2, 1), (1, 1), (4, 1)]', '[(4, 1), (3, 1), (2, 1), (1, 1)]', '[(3, 1), (2, 1)]'], 0, 'A new head goes on the front and the tail comes off the end: the snake has moved one square.'),
  ],
  'proj-shooter': [
    P(c`aliens = [{"x": 1}, {"x": 2, "dead": True}, {"x": 3}]
print([a["x"] for a in aliens if not a.get("dead")])`, ['[1, 3]', '[2]', '[1, 2, 3]', E], 0, 'Only the alien marked dead is left out.'),
  ],
  'proj-platformer': [
    P(c`py, vy, top, size = 268, 4.6, 300, 30
py += vy
print(py + size >= top, py + size - vy <= top)`, ['True True', 'True False', 'False True', 'False False'], 0, 'The feet are now past the platform top, and were above it last frame, so the player lands.'),
  ],
  };
})();
