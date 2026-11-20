/* Python Path: interactive Python course. Runs real Python in the browser via Pyodide. */
(function () {
  'use strict';

  /* ============================================================
   * Python harness: runs learner code safely, explains errors in
   * plain English, and checks challenge solutions.
   * ============================================================ */
  const HARNESS = String.raw`
import sys, io, time, json, builtins, difflib
import js

class TimeLimit(BaseException):
    pass

class OutputLimit(BaseException):
    pass

class _Out(io.StringIO):
    def write(self, s):
        if self.tell() > 200000:
            raise OutputLimit()
        return super().write(s)

def _make_input(queue, out, interactive):
    def _input(prompt=''):
        prompt = str(prompt)
        out.write(prompt)
        if not interactive:
            if not queue:
                raise EOFError('no more input')
            return str(queue.pop(0))
        v = js.askInput(prompt, out.getvalue()[-800:])
        v = '' if v is None else str(v)
        out.write(v + '\n')
        return v
    return _input

_deadline = [0.0]
_count = [0]

def _tracer(frame, event, arg):
    if frame.f_code.co_filename != '<user>':
        return None
    _count[0] += 1
    if (_count[0] & 511) == 0 and time.time() > _deadline[0]:
        raise TimeLimit()
    return _tracer

def _close(name, ns):
    pool = list(ns.keys()) + dir(builtins)
    m = difflib.get_close_matches(name, pool, n=1, cutoff=0.75)
    return m[0] if m else None

def _friendly(e, ns, code_line):
    t = type(e).__name__
    msg = str(e)
    if isinstance(e, TimeLimit):
        return ("Your program ran for too long, so it was stopped. This usually means a loop never ends. "
                "Check that the condition of your <b>while</b> loop eventually becomes False, for example by changing a counter inside the loop.")
    if isinstance(e, OutputLimit):
        return "Your program printed a huge amount of text, so it was stopped. Is a loop printing forever?"
    if isinstance(e, IndentationError):
        if 'expected an indented block' in msg:
            return "Python expected the line(s) after a colon <b>:</b> to be indented (moved right by 4 spaces). Press Tab at the start of the line."
        if 'unexpected indent' in msg:
            return "This line is indented (pushed to the right) but it shouldn't be. Remove the spaces at the start of the line."
        if 'unindent' in msg:
            return "The indentation of this line doesn't line up with the lines above. Make sure lines in the same block start at exactly the same position."
        return "There's a problem with the spaces at the start of a line. Lines inside an <b>if</b>, loop or function must be indented by the same amount (4 spaces)."
    if isinstance(e, SyntaxError):
        m = msg.lower()
        if 'unterminated string' in m or 'eol while scanning' in m or 'unterminated triple' in m:
            return "A piece of text (a string) was started with a quote mark but never closed. Every opening <b>\"</b> needs a matching closing <b>\"</b>."
        if 'was never closed' in m:
            return "You opened a bracket but never closed it. Count your brackets: every <b>(</b> needs a <b>)</b>, every <b>[</b> needs a <b>]</b>."
        if 'unmatched' in m or 'does not match' in m:
            return "There's a closing bracket without a matching opening one, or the brackets are mixed up."
        if "expected ':'" in m:
            return "Lines that start with <b>if</b>, <b>elif</b>, <b>else</b>, <b>for</b>, <b>while</b>, <b>def</b>, <b>class</b>, <b>try</b>, <b>except</b> or <b>with</b> must end with a colon <b>:</b>"
        if 'forgot a comma' in m:
            return "Python found two things side by side with nothing joining them. Did you forget a comma <b>,</b> or a <b>+</b> between them?"
        if 'maybe you meant' in m and '==' in m:
            return "You used <b>=</b> (which stores a value) where you probably meant <b>==</b> (which compares two values)."
        if 'cannot assign' in m:
            return "The left side of <b>=</b> must be a variable name. Did you mean to compare with <b>==</b>?"
        if 'invalid character' in m:
            return "There's a character Python doesn't understand. Curly quotes like “ ” often sneak in when code is copied from documents; use straight quotes \" instead."
        if 'invalid decimal literal' in m:
            return "Variable names can't start with a number, and numbers can't have letters stuck to them."
        if 'missing parentheses' in m:
            return "In Python 3, <b>print</b> needs brackets: <b>print(\"hello\")</b>"
        return "Python couldn't understand how this line is written. Check for missing brackets, quotes, colons or commas, and look at the line just above too."
    if isinstance(e, UnboundLocalError):
        return "You used a variable inside a function before giving it a value there. If you want to change an outside variable, pass it in as a parameter and <b>return</b> the new value instead."
    if isinstance(e, NameError):
        name = getattr(e, 'name', None) or (msg.split("'")[1] if "'" in msg else '')
        hint = "Python doesn't know anything called <b>%s</b>. " % name
        close = _close(name, ns) if name else None
        if close and close != name:
            hint += "Did you mean <b>%s</b>? " % close
        hint += "Check the spelling (capital letters matter!), make sure you created the variable <i>before</i> this line, and if you meant it as text put it in quotes: <b>\"%s\"</b>." % name
        return hint
    if isinstance(e, TypeError):
        if 'can only concatenate str' in msg or 'must be str, not' in msg:
            return "You tried to join text and a number with <b>+</b>. Turn the number into text with <b>str()</b>, or use an f-string: <b>f\"Age: {age}\"</b>."
        if 'unsupported operand' in msg and 'str' in msg:
            return "You're doing maths with text. Remember <b>input()</b> always gives you text; convert it with <b>int()</b> or <b>float()</b> first."
        if 'not supported between' in msg:
            return "You're comparing two different kinds of value (like text and a number). Convert them to the same type first, e.g. <b>int(answer) &gt; 5</b>."
        if 'object is not callable' in msg:
            return "You put brackets <b>()</b> after something that isn't a function. Did you accidentally reuse a function name (like <b>print</b> or <b>input</b>) as a variable?"
        if 'required positional argument' in msg:
            return "You called a function without giving it all the values it needs. Check how many parameters it has in its <b>def</b> line."
        if 'positional argument' in msg and 'given' in msg:
            return "You gave a function more values than it accepts. Compare the call with the <b>def</b> line. (In a class method, don't forget <b>self</b>.)"
        if 'not subscriptable' in msg:
            return "You used square brackets <b>[ ]</b> on something that isn't a list, string or dictionary."
        if 'not iterable' in msg:
            return "You tried to loop over something that isn't a collection. To repeat a number of times use <b>range()</b>, e.g. <b>for i in range(5):</b>"
        if "object does not support item assignment" in msg:
            return "You can't change part of this value. Strings and tuples can't be changed once made; build a new one instead."
        return "A value of the wrong type was used here. Check what kind of value each variable holds (text, number, list...). <b>type(x)</b> can tell you."
    if isinstance(e, ValueError):
        if 'invalid literal for int' in msg:
            return "<b>int()</b> was given text that isn't a whole number. If the user typed a decimal like 2.5 use <b>float()</b>; to handle any typing mistakes use <b>try/except</b>."
        if 'could not convert string to float' in msg:
            return "<b>float()</b> was given text that isn't a number."
        if 'not in list' in msg:
            return "You tried to remove or find an item that isn't in the list. Check with <b>if item in my_list:</b> first."
        if 'too many values to unpack' in msg or 'not enough values to unpack' in msg:
            return "The number of variables on the left of <b>=</b> doesn't match the number of values on the right."
        return "A function got a value of the right type but it doesn't make sense (for example, <b>int(\"hello\")</b>)."
    if isinstance(e, ZeroDivisionError):
        return "You divided by zero, which is impossible in maths. Check the number on the right of <b>/</b> isn't 0 (for example, an empty list's length)."
    if isinstance(e, IndexError):
        return "You asked for a position that doesn't exist. Positions start at <b>0</b>, so a list of 3 items has positions 0, 1 and 2. Use <b>len()</b> to check the size."
    if isinstance(e, KeyError):
        return "That key isn't in the dictionary. Check its spelling and capitals, or use <b>.get(key)</b> which gives <b>None</b> instead of an error."
    if isinstance(e, AttributeError):
        return "This kind of value doesn't have that method or property. Check the spelling, and check the type of the value with <b>type()</b>. (Lists use <b>.append()</b>, not <b>.add()</b> or <b>.push()</b>.)"
    if isinstance(e, RecursionError):
        return "A function kept calling itself forever. Make sure it has a stopping case that doesn't call itself."
    if isinstance(e, EOFError):
        return "The program asked for more input than was available."
    if isinstance(e, FileNotFoundError):
        return "That file doesn't exist yet. Check the file name, or create it first by opening it with mode <b>\"w\"</b>."
    if isinstance(e, ModuleNotFoundError):
        return "Python can't find a module with that name. Check the spelling. Only built-in modules like <b>random</b>, <b>math</b> and <b>datetime</b> are available here."
    if isinstance(e, AssertionError):
        return "An <b>assert</b> check failed."
    return "Something went wrong while running this line."

def _explain(e, code, ns):
    lines = code.split('\n')
    line = None
    if isinstance(e, SyntaxError) and getattr(e, 'filename', None) == '<user>':
        line = e.lineno
    else:
        tb = e.__traceback__
        while tb is not None:
            if tb.tb_frame.f_code.co_filename == '<user>':
                line = tb.tb_lineno
            tb = tb.tb_next
    code_line = lines[line - 1] if line and 0 < line <= len(lines) else ''
    if isinstance(e, TimeLimit):
        etype, emsg = 'Timeout', 'Program took too long'
    elif isinstance(e, OutputLimit):
        etype, emsg = 'TooMuchOutput', 'Program printed too much'
    else:
        etype = type(e).__name__
        emsg = e.msg if isinstance(e, SyntaxError) else str(e)
    return {'type': etype, 'message': emsg, 'line': line, 'code': code_line,
            'friendly': _friendly(e, ns, code_line)}

def _run(code, inputs=None, interactive=False, timeout=5.0):
    out = _Out()
    ns = {'__name__': '__main__'}
    queue = list(inputs) if inputs is not None else []
    old = (sys.stdout, sys.stderr, builtins.input, sys.gettrace())
    sys.stdout = sys.stderr = out
    builtins.input = _make_input(queue, out, interactive)
    _deadline[0] = time.time() + timeout
    err = None
    try:
        compiled = compile(code, '<user>', 'exec')
        sys.settrace(_tracer)
        try:
            exec(compiled, ns)
        finally:
            sys.settrace(old[3])
    except SystemExit:
        pass
    except BaseException as e:
        err = _explain(e, code, ns)
    finally:
        sys.stdout, sys.stderr, builtins.input = old[0], old[1], old[2]
    return ns, out.getvalue(), err

def lp_run_json(code, inputs_json=None):
    inputs = json.loads(inputs_json) if inputs_json else None
    ns, output, err = _run(code, inputs, interactive=inputs is None)
    return json.dumps({'output': output, 'error': err})

def _capture(fn, *a, **k):
    buf = io.StringIO()
    old = sys.stdout
    sys.stdout = buf
    try:
        fn(*a, **k)
    finally:
        sys.stdout = old
    return buf.getvalue()

def _norm(s):
    return ' '.join(str(s).lower().split())

def _approx(a, b, tol=0.01):
    return abs(a - b) <= tol

def lp_check_json(code, tests_json, inputs_json=None):
    tests = json.loads(tests_json)
    inputs = json.loads(inputs_json) if inputs_json else []
    ns, output, err = _run(code, inputs, interactive=False)
    if err:
        return json.dumps({'output': output, 'error': err, 'results': []})
    tns = dict(ns)
    tns.update({
        'output': output, 'lines': [l.strip() for l in output.splitlines()], 'source': code,
        'run_with': lambda inp=None: _run(code, list(inp or []), interactive=False)[1],
        'capture': _capture, 'norm': _norm, 'approx': _approx,
    })
    results = []
    for desc, tcode in tests:
        old = (sys.stdout, builtins.input, sys.gettrace())
        sys.stdout = io.StringIO()
        builtins.input = _make_input([], io.StringIO(), False)
        _deadline[0] = time.time() + 5
        try:
            sys.settrace(_tracer)
            try:
                exec(tcode, tns)
            finally:
                sys.settrace(old[2])
            results.append({'desc': desc, 'ok': True, 'msg': ''})
        except AssertionError as a:
            results.append({'desc': desc, 'ok': False, 'msg': str(a)})
        except NameError as n:
            nm = getattr(n, 'name', '') or str(n)
            results.append({'desc': desc, 'ok': False, 'msg': "Couldn't find <b>%s</b> in your code. Check the name is spelled exactly as asked." % nm})
        except TimeLimit:
            results.append({'desc': desc, 'ok': False, 'msg': 'Your code took too long (is there a loop that never ends?).'})
        except BaseException as e:
            results.append({'desc': desc, 'ok': False, 'msg': '%s: %s' % (type(e).__name__, e)})
        finally:
            sys.stdout, builtins.input = old[0], old[1]
    return json.dumps({'output': output, 'error': None, 'results': results})
`;

  /* ============================================================
   * State (progress saved in this browser)
   * ============================================================ */
  const KEY = 'pp-progress-v1';
  const blank = () => ({ done: {}, quiz: {}, code: {}, xp: 0, last: null, streak: { day: null, count: 0 }, name: '' });
  let S;
  try { S = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = blank(); }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } };

  const ALL = [];
  COURSE.forEach((m, mi) => m.lessons.forEach((l, li) => { l.module = m; l.mi = mi; l.li = li; ALL.push(l); }));
  const byId = Object.fromEntries(ALL.map(l => [l.id, l]));

  function addXP(n, why) {
    S.xp += n; save(); updateXP();
    if (why) toast(`+${n} XP · ${why}`);
  }
  function touchStreak() {
    const today = new Date().toISOString().slice(0, 10);
    if (S.streak.day === today) return;
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    S.streak.count = S.streak.day === y ? S.streak.count + 1 : 1;
    S.streak.day = today; save();
  }
  const doneCount = () => ALL.filter(l => S.done[l.id]).length;

  /* ============================================================
   * Helpers
   * ============================================================ */
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const k in attrs || {}) {
      if (k === 'html') el.innerHTML = attrs[k];
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== false && attrs[k] != null) el.setAttribute(k, attrs[k]);
    }
    kids.flat().forEach(c => c != null && el.append(c.nodeType ? c : document.createTextNode(c)));
    return el;
  }
  let toastTimer;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }
  function confetti() {
    const colors = ['#3776ab', '#ffd43b', '#1f8a4c', '#e74c3c', '#9b59b6', '#4b8bbe'];
    for (let i = 0; i < 80; i++) {
      const c = h('div', { class: 'confetti' });
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[i % colors.length];
      c.style.animationDuration = 1.6 + Math.random() * 1.8 + 's';
      c.style.animationDelay = Math.random() * .4 + 's';
      document.body.append(c);
      setTimeout(() => c.remove(), 4200);
    }
  }

  /* ============================================================
   * Python engine
   * ============================================================ */
  let py = null;
  const status = $('#pyStatus');
  function setStatus(kind, label) { status.className = 'py-status ' + kind; $('.label', status).textContent = label; }
  window.askInput = function (prompt, recent) {
    const shown = recent.split('\n').slice(-8).join('\n');
    const v = window.prompt('🐍 Your program is asking for input:\n\n' + shown, '');
    return v === null ? '' : v;
  };
  const pyReady = (async () => {
    try {
      py = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/npm/pyodide@0.26.4/' });
      py.runPython(HARNESS);
      setStatus('ready', 'Python ready');
    } catch (e) {
      console.error(e);
      setStatus('error', 'Python failed to load');
      toast('Could not load Python. Check your internet connection and refresh.');
      throw e;
    }
  })();
  const nextPaint = () => new Promise(r => requestAnimationFrame(() => setTimeout(r, 0)));
  async function pyCall(name, ...args) {
    await pyReady;
    await nextPaint();
    const fn = py.globals.get(name);
    try { return JSON.parse(fn(...args)); } finally { fn.destroy(); }
  }
  const runCode = (code, inputs) => pyCall('lp_run_json', code, inputs ? JSON.stringify(inputs) : null);
  const checkCode = (code, tests, inputs) => pyCall('lp_check_json', code, JSON.stringify(tests), JSON.stringify(inputs || []));

  /* ============================================================
   * Editor + runner widgets
   * ============================================================ */
  function makeEditor(parent, code, opts = {}) {
    const cm = CodeMirror(parent, {
      value: code, mode: 'python', lineNumbers: true, indentUnit: 4, tabSize: 4,
      matchBrackets: true, autoCloseBrackets: true, viewportMargin: Infinity,
      readOnly: opts.readOnly || false, lineWrapping: false,
      extraKeys: {
        Tab: c => c.somethingSelected() ? c.indentSelection('add') : c.replaceSelection('    ', 'end'),
        'Shift-Tab': c => c.indentSelection('subtract'),
        'Ctrl-Enter': () => opts.onRun && opts.onRun(), 'Cmd-Enter': () => opts.onRun && opts.onRun(),
        'Ctrl-/': 'toggleComment',
      },
    });
    if (opts.onChange) cm.on('change', () => opts.onChange(cm.getValue()));
    return cm;
  }

  function renderOutput(el, res, label = 'Output') {
    el.innerHTML = '';
    el.classList.add('show');
    el.append(h('span', { class: 'lbl' }, label));
    if (res.output) el.append(document.createTextNode(res.output));
    else if (!res.error) el.append(h('span', { class: 'empty' }, '(Your program ran but printed nothing. Use print() to show something.)'));
    if (res.error) {
      const e = res.error;
      el.append(h('div', { class: 'err-box' },
        h('div', { class: 'et' }, '🐞 ' + (e.line ? `Problem on line ${e.line}: ` : '') + e.type),
        e.code ? h('div', { class: 'el' }, e.code.trim()) : null,
        h('div', { class: 'muted', style: 'color:#d8a8a2;font-size:13px' }, 'Python says: ' + e.message),
        h('div', { class: 'ef', html: '💡 ' + e.friendly }),
      ));
    }
    el.scrollTop = el.scrollHeight;
  }

  function runner(code, { title = 'Try it', onRun } = {}) {
    const box = h('div', { class: 'runner' });
    const out = h('pre', { class: 'output' });
    let cm;
    const run = async () => {
      runBtn.disabled = true; runBtn.textContent = py ? 'Running…' : 'Loading Python…';
      const res = await runCode(cm.getValue()).catch(() => ({ output: '', error: null }));
      runBtn.disabled = false; runBtn.textContent = '▶ Run';
      renderOutput(out, res);
      onRun && onRun(res);
    };
    const runBtn = h('button', { class: 'btn primary', onclick: run, title: 'Run (Ctrl+Enter)' }, '▶ Run');
    const bar = h('div', { class: 'runner-bar' },
      h('span', { class: 'title' }, '🐍 ' + title),
      h('button', { class: 'btn', onclick: () => { cm.setValue(code); out.classList.remove('show'); }, title: 'Put the original code back' }, '↺ Reset'),
      runBtn);
    box.append(bar);
    const ed = h('div'); box.append(ed, out);
    cm = makeEditor(ed, code, { onRun: run });
    box._cm = cm; box._run = run;
    return box;
  }

  /* ============================================================
   * Sidebar
   * ============================================================ */
  const sidebar = $('#sidebar');
  const openMods = new Set();
  function renderSidebar(currentId) {
    const pct = Math.round(doneCount() / ALL.length * 100);
    sidebar.innerHTML = '';
    sidebar.append(h('div', { class: 'side-progress' },
      h('div', { class: 'lbl' }, h('span', {}, 'Course progress'), h('b', {}, pct + '%')),
      h('div', { class: 'bar' }, h('span', { style: `width:${pct}%` })),
      h('div', { class: 'row', style: 'margin-top:12px' },
        h('a', { class: 'btn', href: '#/playground' }, '🧪 Playground'),
        h('a', { class: 'btn', href: '#/reference' }, '📖 Cheat Sheet'))));
    const cur = currentId && byId[currentId];
    if (cur) openMods.add(cur.module.id);
    COURSE.forEach(m => {
      const done = m.lessons.filter(l => S.done[l.id]).length;
      const wrap = h('div', { class: 'mod' + (openMods.has(m.id) ? ' open' : '') });
      wrap.append(h('button', {
        class: 'mod-head', 'aria-expanded': openMods.has(m.id) ? 'true' : 'false',
        onclick: () => { openMods.has(m.id) ? openMods.delete(m.id) : openMods.add(m.id); renderSidebar(currentId); },
      }, h('span', { class: 'ico' }, m.icon), h('span', {}, m.title), h('span', { class: 'count' }, `${done}/${m.lessons.length}`), h('span', { class: 'chev' }, '▶')));
      const ul = h('ul', { class: 'mod-lessons' });
      m.lessons.forEach(l => ul.append(h('li', {}, h('a', { href: '#/lesson/' + l.id, class: l.id === currentId ? 'current' : '' },
        h('span', { class: 'tick' + (S.done[l.id] ? ' done' : '') }, S.done[l.id] ? '✓' : ''), l.title))));
      wrap.append(ul);
      sidebar.append(wrap);
    });
  }
  const closeMenu = () => { sidebar.classList.remove('open'); $('#scrim').classList.remove('open'); };
  $('#menuBtn').onclick = () => { sidebar.classList.toggle('open'); $('#scrim').classList.toggle('open'); };
  $('#scrim').onclick = closeMenu;

  function updateXP() { $('#xpPill').textContent = `⭐ ${S.xp} XP`; }
  $('#themeBtn').onclick = () => {
    const cur = document.documentElement.getAttribute('data-theme')
      || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('pp-theme', next); } catch (e) { /* ignore */ }
  };

  /* ============================================================
   * Pages
   * ============================================================ */
  const main = $('#main');

  function pageHome() {
    const next = ALL.find(l => !S.done[l.id]);
    const resume = (S.last && byId[S.last] && !S.done[S.last]) ? byId[S.last] : next;
    const started = doneCount() > 0 || S.xp > 0;
    const c = h('div', { class: 'container' });
    c.append(h('section', { class: 'hero' },
      h('div', { class: 'snake' }, '🐍'),
      h('h1', {}, started ? 'Welcome back, coder! 👋' : 'Learn Python from zero'),
      h('p', {}, started
        ? 'Pick up right where you left off. Every bit of practice makes you a better programmer.'
        : 'No experience needed. Learn by doing: read a short explanation, run real code, then solve a challenge that checks your answer instantly.'),
      h('div', { class: 'row' },
        resume
          ? h('a', { class: 'btn big', href: '#/lesson/' + resume.id }, started ? `▶ Continue: ${resume.title}` : '▶ Start your first lesson')
          : h('a', { class: 'btn big', href: '#/certificate' }, '🏆 Get your certificate'),
        h('a', { class: 'btn big ghost', href: '#/playground' }, '🧪 Open the playground'))));

    c.append(h('div', { class: 'stats' },
      ...[[doneCount() + '/' + ALL.length, 'lessons complete'], [S.xp, 'XP earned'],
        [(S.streak.count || 0) + ' 🔥', 'day streak'], [COURSE.filter(m => m.lessons.every(l => S.done[l.id])).length + '/' + COURSE.length, 'modules finished']]
        .map(([b, s]) => h('div', { class: 'card stat' }, h('b', {}, String(b)), h('span', {}, s)))));

    if (!started) {
      c.append(h('h2', { class: 'section-title' }, 'How it works'));
      c.append(h('div', { class: 'steps' },
        ...[['📖', 'Read', 'Short, friendly explanations with everyday examples. No jargon without an explanation.'],
          ['▶️', 'Experiment', 'Every code example can be edited and run. Break things! That\'s how you learn.'],
          ['✅', 'Prove it', 'Answer a quick quiz and solve a coding challenge. Your code is checked instantly.']]
          .map(([n, t, d]) => h('div', { class: 'card' }, h('div', { class: 'num' }, n), h('h3', {}, t), h('p', {}, d)))));
    }

    c.append(h('h2', { class: 'section-title' }, 'Your learning path'));
    const grid = h('div', { class: 'mod-grid' });
    COURSE.forEach((m, i) => {
      const done = m.lessons.filter(l => S.done[l.id]).length;
      const first = m.lessons.find(l => !S.done[l.id]) || m.lessons[0];
      grid.append(h('a', { class: 'card mod-card' + (done === m.lessons.length ? ' complete' : ''), href: '#/lesson/' + first.id },
        h('div', { class: 'ico' }, m.icon),
        h('div', { class: 'muted', style: 'font-size:12px;font-weight:700;letter-spacing:.06em' }, 'MODULE ' + (i + 1)),
        h('h3', {}, m.title), h('p', {}, m.desc),
        h('div', { class: 'bar' }, h('span', { style: `width:${done / m.lessons.length * 100}%` })),
        h('div', { class: 'meta' }, h('span', {}, `${m.lessons.length} lessons`), h('span', {}, done === m.lessons.length ? '✓ Complete' : `${done} done`))));
    });
    c.append(grid);
    c.append(h('p', { class: 'muted', style: 'margin-top:40px;font-size:14px;text-align:center' },
      'Progress is saved in this browser on this device. ',
      h('button', { class: 'btn ghost', style: 'font-size:13px;padding:4px 10px', onclick: () => {
        if (confirm('Reset ALL progress, XP and saved code? This cannot be undone.')) { const n = S.name; S = blank(); S.name = n; save(); updateXP(); route(); }
      } }, 'Reset progress')));
    return c;
  }

  function renderBlock(b) {
    const [type, a, opt] = b;
    switch (type) {
      case 'p': return h('p', { html: a });
      case 'h': return h('h2', {}, a);
      case 'list': return h('ul', {}, a.map(i => h('li', { html: i })));
      case 'steps': return h('ol', {}, a.map(i => h('li', { html: i })));
      case 'code': return runner(a, opt || {});
      case 'tip': return h('div', { class: 'callout tip' }, h('span', { class: 'ci' }, '💡'), h('div', { html: a }));
      case 'warn': return h('div', { class: 'callout warn' }, h('span', { class: 'ci' }, '⚠️'), h('div', { html: a }));
      case 'key': return h('div', { class: 'callout key' }, h('span', { class: 'ci' }, '🔑'), h('div', { html: '<b>Key points</b><ul>' + a.map(i => `<li>${i}</li>`).join('') + '</ul>' }));
      case 'analogy': return h('div', { class: 'callout tip' }, h('span', { class: 'ci' }, '🧠'), h('div', { class: 'analogy', html: a }));
      default: return h('div', { html: a });
    }
  }

  function renderQuiz(lesson) {
    const wrap = h('div');
    wrap.append(h('div', { class: 'block-head' }, h('h2', {}, '🧩 Quick check'), h('span', { class: 'pill' }, '+10 XP each')));
    lesson.quiz.forEach((q, qi) => {
      const key = lesson.id + ':' + qi;
      const card = h('div', { class: 'card quiz-q' });
      card.append(h('p', { class: 'qtext', html: `${qi + 1}. ${q.q}` }));
      if (q.code) card.append(h('pre', { class: 'static' }, q.code));
      const opts = h('div', { class: 'opts' });
      const ex = h('div', { class: 'explain' });
      const reveal = (picked) => {
        [...opts.children].forEach((b, i) => {
          b.disabled = true;
          if (i === q.answer) b.classList.add('right');
          else if (i === picked) b.classList.add('wrong');
        });
        const ok = picked === q.answer;
        ex.className = 'explain show ' + (ok ? 'right' : 'wrong');
        ex.innerHTML = (ok ? '✅ <b>Correct!</b> ' : '❌ <b>Not quite.</b> ') + q.explain;
        if (!ok) ex.append(h('div', { style: 'margin-top:8px' }, h('button', { class: 'btn', onclick: reset }, '↺ Try again')));
      };
      const reset = () => { opts.innerHTML = ''; ex.className = 'explain'; build(); };
      const build = () => q.options.forEach((o, i) => opts.append(h('button', {
        class: 'opt', onclick: () => {
          const ok = i === q.answer;
          if (ok && !S.quiz[key]) { S.quiz[key] = true; addXP(10, 'Quiz question'); touchStreak(); }
          reveal(i);
        },
      }, h('span', { class: 'letter' }, 'ABCD'[i]), h('span', { html: o }))));
      build();
      if (S.quiz[key]) reveal(q.answer);
      card.append(opts, ex);
      wrap.append(card);
    });
    return wrap;
  }

  function renderChallenge(lesson) {
    const ch = lesson.challenge;
    const wrap = h('div');
    wrap.append(h('div', { class: 'block-head' }, h('h2', {}, '🏆 Your challenge'), h('span', { class: 'pill' }, '+50 XP')));
    const card = h('div', { class: 'card challenge-card' });
    card.append(h('div', { class: 'task', html: ch.task }));
    const saved = S.code[lesson.id];
    const box = h('div', { class: 'runner' });
    const out = h('pre', { class: 'output' });
    const results = h('div', { class: 'results' });
    let cm, hintsShown = 0, fails = 0;
    const hintsEl = h('div', { class: 'hints' });
    const solWrap = h('div', { class: 'solution-wrap' });

    const doRun = async () => {
      runBtn.disabled = true; runBtn.textContent = py ? 'Running…' : 'Loading Python…';
      const res = await runCode(cm.getValue()).catch(() => ({ output: '', error: null }));
      runBtn.disabled = false; runBtn.textContent = '▶ Run';
      renderOutput(out, res);
    };
    const doCheck = async () => {
      checkBtn.disabled = true; checkBtn.textContent = py ? 'Checking…' : 'Loading Python…';
      const res = await checkCode(cm.getValue(), ch.tests, ch.inputs).catch(() => null);
      checkBtn.disabled = false; checkBtn.textContent = '✓ Check my code';
      if (!res) return;
      renderOutput(out, res, ch.inputs && ch.inputs.length ? `Output (test run, typing: ${ch.inputs.slice(0, 6).join(', ')}${ch.inputs.length > 6 ? '…' : ''})` : 'Output');
      results.innerHTML = ''; results.classList.add('show');
      if (res.error) {
        fails++;
        results.append(h('div', { class: 'banner no' }, '🐞 Your code has an error, so it couldn\'t be checked yet. Read the message above, fix it and try again.'));
      } else {
        const allOk = res.results.every(r => r.ok);
        if (allOk) {
          results.append(h('div', { class: 'banner ok' }, '🎉 Brilliant! Challenge complete!'));
          if (!S.done[lesson.id]) {
            S.done[lesson.id] = true; save(); addXP(50, 'Challenge complete'); touchStreak(); confetti();
            renderSidebar(lesson.id);
          }
          const nxt = ALL[ALL.indexOf(lesson) + 1];
          results.append(h('div', { class: 'row', style: 'margin-bottom:10px' }, nxt
            ? h('a', { class: 'btn primary', href: '#/lesson/' + nxt.id }, 'Next lesson: ' + nxt.title + ' →')
            : h('a', { class: 'btn primary', href: '#/certificate' }, '🏆 Claim your certificate')));
        } else {
          fails++;
          const n = res.results.filter(r => r.ok).length;
          results.append(h('div', { class: 'banner no' }, `So close! ${n} of ${res.results.length} checks passed. Keep going 💪`));
          if (fails >= 2 && hintsShown < ch.hints.length) results.append(h('p', { class: 'muted' }, 'Stuck? Try the 💡 Hint button.'));
        }
        res.results.forEach(r => results.append(h('div', { class: 'result-item ' + (r.ok ? 'ok' : 'no') },
          h('span', {}, r.ok ? '✅' : '❌'),
          h('span', {}, r.desc, r.msg ? h('span', { class: 'why', html: r.msg }) : null))));
      }
    };
    const runBtn = h('button', { class: 'btn', onclick: doRun, title: 'Run your program (Ctrl+Enter)' }, '▶ Run');
    const checkBtn = h('button', { class: 'btn good', onclick: doCheck }, '✓ Check my code');
    box.append(h('div', { class: 'runner-bar' },
      h('span', { class: 'title' }, '✏️ Your code'),
      h('button', { class: 'btn', onclick: () => { if (confirm('Start again with the original code?')) cm.setValue(ch.starter); } }, '↺ Reset'),
      runBtn, checkBtn));
    const ed = h('div'); box.append(ed, out);
    cm = makeEditor(ed, saved != null ? saved : ch.starter, {
      onRun: doRun, onChange: v => { S.code[lesson.id] = v; save(); },
    });
    card.append(box, results);

    const hintBtn = h('button', { class: 'btn', onclick: () => {
      if (hintsShown < ch.hints.length) {
        hintsEl.append(h('div', { class: 'hint', html: `<b>Hint ${hintsShown + 1}:</b> ${ch.hints[hintsShown]}` }));
        hintsShown++;
      }
      if (hintsShown >= ch.hints.length) { hintBtn.disabled = true; hintBtn.textContent = 'No more hints'; }
    } }, '💡 Hint');
    const solBtn = h('button', { class: 'btn ghost', onclick: () => {
      if (solWrap.childElementCount) return;
      if (!S.done[lesson.id] && !confirm('Have a real go first: struggling a bit is how your brain learns!\n\nShow the example solution anyway?')) return;
      const r = runner(ch.solution, { title: 'Example solution' });
      solWrap.append(h('p', { class: 'muted' }, 'This is one way to solve it. There are often many correct answers! Read it line by line and make sure you understand it, then try writing it yourself.'), r);
      r._cm.refresh();
    } }, '👀 Show a solution');
    card.append(h('div', { class: 'row', style: 'margin-top:14px' }, hintBtn, solBtn,
      h('span', { class: 'kbd', style: 'margin-left:auto' }, 'Tip: Ctrl+Enter runs your code')));
    card.append(hintsEl, solWrap);
    wrap.append(card);
    return wrap;
  }

  function pageLesson(id) {
    const l = byId[id];
    if (!l) return pageHome();
    S.last = id; save();
    const c = h('div', { class: 'container' });
    c.append(h('div', { class: 'crumb' }, `${l.module.icon} Module ${l.mi + 1}: ${l.module.title} · Lesson ${l.li + 1} of ${l.module.lessons.length}`));
    c.append(h('h1', { class: 'lesson-title' }, l.title));
    c.append(h('div', { class: 'lesson-meta' },
      h('span', {}, `⏱ About ${l.minutes || 10} minutes`),
      S.done[l.id] ? h('span', { class: 'done-badge' }, '✓ Completed') : h('span', {}, '🎯 Complete the challenge to finish')));
    const content = h('div', { class: 'content' });
    l.blocks.forEach(b => content.append(renderBlock(b)));
    c.append(content);
    if (l.quiz && l.quiz.length) c.append(renderQuiz(l));
    if (l.challenge) c.append(renderChallenge(l));
    const i = ALL.indexOf(l), prev = ALL[i - 1], nxt = ALL[i + 1];
    c.append(h('div', { class: 'lesson-nav' },
      prev ? h('a', { class: 'btn', href: '#/lesson/' + prev.id }, '← ', h('span', { class: 't' }, prev.title)) : h('span'),
      nxt ? h('a', { class: 'btn primary', href: '#/lesson/' + nxt.id }, h('span', { class: 't' }, nxt.title), ' →')
        : h('a', { class: 'btn primary', href: '#/certificate' }, '🏆 Certificate')));
    return c;
  }

  const PG_EXAMPLES = {
    'Hello': 'print("Hello, World!")\nname = input("What is your name? ")\nprint(f"Nice to meet you, {name}!")',
    'Times table': 'number = 7\nfor i in range(1, 13):\n    print(f"{number} x {i} = {number * i}")',
    'Dice': 'import random\n\nrolls = [random.randint(1, 6) for _ in range(10)]\nprint("Rolls:", rolls)\nprint("Total:", sum(rolls))\nprint("Highest:", max(rolls))',
    'Guessing game': 'import random\n\nsecret = random.randint(1, 20)\nguesses = 0\nprint("I\'m thinking of a number from 1 to 20...")\n\nwhile True:\n    guess = int(input("Your guess: "))\n    guesses += 1\n    if guess < secret:\n        print("Too low!")\n    elif guess > secret:\n        print("Too high!")\n    else:\n        print(f"Correct! You got it in {guesses} guesses.")\n        break',
    'Shapes': 'def draw_box(width, height):\n    for row in range(height):\n        print("#" * width)\n\ndef draw_triangle(size):\n    for i in range(1, size + 1):\n        print(" " * (size - i) + "*" * (2 * i - 1))\n\ndraw_box(6, 3)\nprint()\ndraw_triangle(5)',
    'FizzBuzz': 'for n in range(1, 31):\n    if n % 15 == 0:\n        print("FizzBuzz")\n    elif n % 3 == 0:\n        print("Fizz")\n    elif n % 5 == 0:\n        print("Buzz")\n    else:\n        print(n)',
  };
  function pagePlayground() {
    const c = h('div', { class: 'container pg' });
    c.append(h('h1', { class: 'lesson-title' }, '🧪 Playground'));
    c.append(h('p', { class: 'muted' }, 'A free space to write any Python you like. Your code is saved automatically. Load an example to explore, or start from scratch.'));
    const ex = h('div', { class: 'pg-examples' });
    const box = runner(S.code.__pg || PG_EXAMPLES.Hello, { title: 'playground.py' });
    box._cm.on('change', () => { S.code.__pg = box._cm.getValue(); save(); });
    Object.keys(PG_EXAMPLES).forEach(k => ex.append(h('button', { class: 'btn', onclick: () => box._cm.setValue(PG_EXAMPLES[k]) }, k)));
    ex.append(h('button', { class: 'btn ghost', onclick: () => box._cm.setValue('') }, '🗑 Clear'));
    c.append(ex, box);
    c.append(h('div', { class: 'callout tip' }, h('span', { class: 'ci' }, '💡'), h('div', { html: 'When your program calls <code>input()</code>, a box will pop up asking you to type your answer. Press <b>Ctrl+Enter</b> to run, <b>Ctrl+/</b> to comment a line in or out.' })));
    setTimeout(() => box._cm.refresh(), 0);
    return c;
  }

  function pageReference() {
    const c = h('div', { class: 'container', style: 'max-width:1100px' });
    c.append(h('h1', { class: 'lesson-title' }, '📖 Python Cheat Sheet'));
    c.append(h('p', { class: 'muted' }, 'Everything from the course on one page. Come back whenever you forget how something works.'));
    const grid = h('div', { class: 'ref-grid' });
    REFERENCE.forEach(([t, code]) => grid.append(h('div', { class: 'card ref-card' }, h('h3', {}, t), h('pre', {}, code))));
    c.append(grid);
    c.append(h('h2', { class: 'section-title' }, '📚 Glossary'));
    const dl = h('dl', { class: 'card gloss' });
    GLOSSARY.forEach(([t, d]) => dl.append(h('dt', {}, t), h('dd', { html: d })));
    c.append(dl);
    return c;
  }

  function pageCertificate() {
    const c = h('div', { class: 'container' });
    const n = doneCount();
    if (n < ALL.length) {
      c.append(h('div', { class: 'card', style: 'text-align:center;padding:40px' },
        h('div', { style: 'font-size:60px' }, '🏆'),
        h('h1', {}, 'Your certificate is waiting'),
        h('p', { class: 'muted' }, `Complete every lesson's challenge to unlock it. You've finished ${n} of ${ALL.length}.`),
        h('div', { class: 'bar', style: 'max-width:400px;margin:16px auto' }, h('span', { style: `width:${n / ALL.length * 100}%` })),
        h('a', { class: 'btn primary big', href: '#/lesson/' + (ALL.find(l => !S.done[l.id]) || ALL[0]).id }, 'Keep learning →')));
      return c;
    }
    const nameIn = h('input', { value: S.name || '', placeholder: 'Type your name', style: 'padding:10px 14px;border-radius:10px;border:1px solid var(--border);font:inherit;background:var(--surface);color:var(--text);min-width:240px' });
    const nameEl = h('div', { class: 'name' }, S.name || 'Your Name');
    nameIn.oninput = () => { S.name = nameIn.value; save(); nameEl.textContent = S.name || 'Your Name'; };
    c.append(h('div', { class: 'row no-print', style: 'justify-content:center' }, nameIn, h('button', { class: 'btn primary', onclick: () => print() }, '🖨 Print / Save as PDF')));
    c.append(h('div', { class: 'cert' },
      h('div', { class: 'seal' }, '🐍'),
      h('p', { style: 'letter-spacing:.2em;font-weight:700;margin:0' }, 'CERTIFICATE OF COMPLETION'),
      h('h1', {}, 'Python Path'),
      h('p', {}, 'This certifies that'),
      nameEl,
      h('p', {}, `has completed all ${COURSE.length} modules and ${ALL.length} lessons of the Python Path beginner course, covering variables, decisions, loops, lists, functions, dictionaries, error handling, modules, files, classes and real projects. ${S.xp} XP earned.`),
      h('p', { style: 'margin-top:24px' }, new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }))));
    return c;
  }

  /* ============================================================
   * Router
   * ============================================================ */
  function route() {
    const hash = location.hash.replace(/^#\/?/, '');
    const [page, arg] = hash.split('/');
    let view, nav = page || 'home';
    if (page === 'lesson') view = pageLesson(arg);
    else if (page === 'playground') view = pagePlayground();
    else if (page === 'reference') view = pageReference();
    else if (page === 'certificate') view = pageCertificate();
    else { view = pageHome(); nav = 'home'; }
    main.innerHTML = '';
    main.append(view);
    document.querySelectorAll('.topnav a').forEach(a => a.classList.toggle('active', a.dataset.nav === nav));
    renderSidebar(page === 'lesson' ? arg : null);
    closeMenu();
    window.scrollTo(0, 0);
    main.querySelectorAll('.CodeMirror').forEach(e => e.CodeMirror && e.CodeMirror.refresh());
    const l = page === 'lesson' && byId[arg];
    document.title = l ? `${l.title} · Python Path` : 'Python Path: Learn to Code';
  }
  window.addEventListener('hashchange', route);
  updateXP();
  route();

  /* Developer self-test: checks every example solution passes its challenge. Run __selfTest() in the console. */
  window.__check = (id, code) => { const ch = byId[id].challenge; return checkCode(code, ch.tests, ch.inputs); };
  window.__selfTest = async function () {
    const fails = [];
    for (const l of ALL) {
      const ch = l.challenge;
      const r = await checkCode(ch.solution, ch.tests, ch.inputs);
      if (r.error || r.results.some(x => !x.ok)) fails.push({ id: l.id, kind: 'solution', r });
      const s = await checkCode(ch.starter, ch.tests, ch.inputs);
      if (!s.error && s.results.every(x => x.ok)) fails.push({ id: l.id, kind: 'starter passes' });
      for (const b of l.blocks) {
        if (b[0] !== 'code' || (b[2] && b[2].error)) continue;
        const e = await runCode(b[1], (b[2] && b[2].inputs) || ['5', '3', '7', '2', '9']);
        if (e.error) fails.push({ id: l.id, kind: 'example error', code: b[1].slice(0, 60), err: e.error });
      }
    }
    return { lessons: ALL.length, fails };
  };
})();
