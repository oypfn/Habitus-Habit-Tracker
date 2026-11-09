import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Bell, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Flame, LayoutDashboard, ListChecks, MoreHorizontal, Plus, Search, Settings2, Target, TrendingUp, X } from 'lucide-react';
import './App.css';

const seedHabits = [
  { id: 1, name: 'Morning pages', category: 'Mindfulness', icon: '✍️', color: '#d9c9f5', goal: '10 min', done: true, week: [1,1,1,0,1,0,0] },
  { id: 2, name: 'Read 20 pages', category: 'Learning', icon: '📚', color: '#f4d9a8', goal: '20 pages', done: true, week: [1,1,0,1,1,0,0] },
  { id: 3, name: 'Move your body', category: 'Health', icon: '🏃', color: '#b9dfd1', goal: '30 min', done: false, week: [1,0,1,1,0,0,0] },
  { id: 4, name: 'Drink 2L water', category: 'Health', icon: '💧', color: '#c6dff4', goal: '2 litres', done: false, week: [1,1,1,1,0,0,0] },
  { id: 5, name: 'Study Spanish', category: 'Learning', icon: '🇪🇸', color: '#f2c7c2', goal: '25 min', done: true, week: [1,1,0,1,1,0,0] },
];

const initialNotes = [
  { id: 1, title: 'A slower start is still a start.', time: 'Today · 8:15 AM', body: 'Kept the phone away for the first 20 minutes. It made the morning feel less rushed.' },
  { id: 2, title: 'Consistency over intensity.', time: 'Yesterday · 9:40 PM', body: 'A short walk counts. No need to turn every day into a personal record.' },
];

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function readSaved() {
  try { const value = localStorage.getItem('habitus-data'); return value ? JSON.parse(value) : null; } catch { return null; }
}

export default function App() {
  const saved = useMemo(readSaved, []);
  const [habits, setHabits] = useState(saved?.habits || seedHabits);
  const [notes, setNotes] = useState(saved?.notes || initialNotes);
  const [active, setActive] = useState('Today');
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Personal');
  const [query, setQuery] = useState('');
  const [noteText, setNoteText] = useState('');
  const [showNote, setShowNote] = useState(false);

  useEffect(() => { localStorage.setItem('habitus-data', JSON.stringify({ habits, notes })); }, [habits, notes]);

  const completed = habits.filter(h => h.done).length;
  const percent = habits.length ? Math.round(completed / habits.length * 100) : 0;
  const streak = 12;
  const visibleHabits = habits.filter(h => h.name.toLowerCase().includes(query.toLowerCase()));

  function toggleHabit(id) {
    setHabits(items => items.map(h => h.id === id ? { ...h, done: !h.done, week: h.week.map((v, i) => i === 6 ? (h.done ? 0 : 1) : v) } : h));
  }
  function addHabit(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setHabits(items => [...items, { id: Date.now(), name: newName.trim(), category: newCategory, icon: '🌱', color: '#d8e8d9', goal: 'Daily', done: false, week: [0,0,0,0,0,0,0] }]);
    setNewName(''); setShowAdd(false);
  }
  function addNote(e) {
    e.preventDefault();
    if (!noteText.trim()) return;
    setNotes(items => [{ id: Date.now(), title: noteText.trim(), time: 'Just now', body: 'A small reflection from today.' }, ...items]);
    setNoteText(''); setShowNote(false);
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#" onClick={e => e.preventDefault()}><span className="brand-mark">h</span><span>habitus<span className="brand-dot">.</span></span></a>
      <div className="workspace-label">WORKSPACE <ChevronDown size={13}/></div>
      <div className="profile-card"><div className="avatar">RA</div><div><strong>Rayane's space</strong><small>Personal workspace</small></div><MoreHorizontal size={17}/></div>
      <div className="nav-label">MENU</div>
      <nav className="main-nav">
        {[['Today',LayoutDashboard],['Habits',ListChecks],['Insights',TrendingUp],['Journal',CalendarDays]].map(([label,Icon]) => <button key={label} className={active===label?'nav-item selected':'nav-item'} onClick={()=>setActive(label)}><Icon size={17}/><span>{label}</span>{label==='Today'&&<span className="nav-count">{completed}/{habits.length}</span>}</button>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="streak-card"><div className="streak-icon"><Flame size={19}/></div><div><strong>{streak} day streak</strong><small>You're building momentum</small></div></div>
        <button className="nav-item"><Settings2 size={17}/><span>Settings</span></button>
        <button className="nav-item"><CircleHelp size={17}/><span>Help & feedback</span></button>
        <div className="sidebar-user"><div className="avatar avatar-small">RA</div><div><strong>Rayane Achou</strong><small>Free plan</small></div><MoreHorizontal size={17}/></div>
      </div>
    </aside>

    <main className="main-area">
      <header className="topbar"><div className="breadcrumb">Workspace <ChevronRight size={14}/> <strong>{active}</strong></div><div className="top-actions"><span className="date-chip"><CalendarDays size={15}/> Monday, 9 November</span><button className="icon-button" aria-label="Notifications"><Bell size={18}/><i/></button><div className="avatar avatar-small">RA</div></div></header>
      <div className="content-wrap">
        {active==='Today' && <>
          <section className="welcome-row"><div><div className="eyebrow">MONDAY, NOVEMBER 9, 2026</div><h1>A good day to begin,<br/><em>Rayane.</em></h1><p className="intro">Small steps, repeated daily, become remarkable things.</p></div><div className="welcome-art"><div className="sun-disc"/><span className="art-leaf leaf-one">✳</span><span className="art-leaf leaf-two">✳</span><span className="art-caption">MAKE ROOM<br/>FOR GROWTH</span></div></section>
          <section className="summary-grid">
            <div className="summary-card progress-card"><div className="card-kicker">TODAY'S PROGRESS <span className="muted-dot">●</span></div><div className="progress-flex"><div className="ring" style={{'--progress':percent+'%'}}><div><strong>{percent}%</strong><small>complete</small></div></div><div className="progress-copy"><strong>{completed} of {habits.length} habits</strong><p>{percent===100?'Everything done. Well played.':'You're making good progress. Keep it steady.'}</p><span className="positive"><ArrowUpRight size={14}/> A little better every day</span></div></div></div>
            <div className="summary-card"><div className="card-kicker">CURRENT STREAK <Flame size={15}/></div><div className="stat-number">{streak}<span> days</span></div><p className="stat-foot">Your longest streak is 18 days.</p><div className="mini-week">{days.map((d,i)=><div key={i} className={i<5?'mini-day active':'mini-day'}><span>{d}</span><b>{i<5?'✓':'·'}</b></div>)}</div></div>
            <div className="summary-card quote-card"><div className="quote-mark">“</div><p>We are what we repeatedly do. Excellence, then, is not an act, but a habit.</p><span>— WILL DURANT</span></div>
          </section>
          <section className="section-heading"><div><div className="eyebrow">YOUR ROUTINE</div><h2>Today's habits <span className="heading-count">{completed}/{habits.length}</span></h2></div><button className="primary-button" onClick={()=>setShowAdd(true)}><Plus size={16}/> Add a habit</button></section>
          <section className="habit-panel">
            <div className="habit-toolbar"><div className="week-switch"><button className="icon-button tiny"><ChevronLeft size={16}/></button><strong>This week</strong><button className="icon-button tiny"><ChevronRight size={16}/></button><span className="today-tag">TODAY</span></div><label className="search-box"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a habit"/></label></div>
            <div className="habit-head"><span>HABIT</span><span>WEEKLY RHYTHM</span><span>TODAY</span></div>
            {visibleHabits.map(h=><div className="habit-row" key={h.id}><div className="habit-name"><div className="habit-emoji" style={{background:h.color}}>{h.icon}</div><div><strong>{h.name}</strong><small>{h.category} <span>·</span> {h.goal}</small></div></div><div className="week-cells">{h.week.map((v,i)=><div key={i} className={'week-cell '+(v?'filled':'')+(i===6?' current':'')} title={days[i]}>{v?<Check size={12}/>:<span/>}</div>)}</div><button className={h.done?'check-button checked':'check-button'} onClick={()=>toggleHabit(h.id)} aria-label={h.done?'Mark incomplete':'Mark complete'}>{h.done?<Check size={17}/>:<span/>}</button></div>)}
            {visibleHabits.length===0&&<div className="empty-state">No habits match that search.</div>}
            <div className="panel-footer"><span><span className="legend-dot done-dot"/> Completed <span className="legend-dot empty-dot"/> Still to do</span><button className="text-button" onClick={()=>setActive('Habits')}>View all habits <ChevronRight size={14}/></button></div>
          </section>
          <section className="bottom-grid"><div className="bottom-card"><div className="bottom-title"><div><div className="eyebrow">A MOMENT TO REFLECT</div><h3>Make it count.</h3></div><button className="round-plus" onClick={()=>setShowNote(true)}><Plus size={17}/></button></div><p>Take a minute to notice what went well today. Progress is worth recognising.</p><button className="text-button" onClick={()=>setActive('Journal')}>Open your journal <ChevronRight size={14}/></button></div><div className="bottom-card focus-card"><div className="focus-symbol"><Target size={21}/></div><div><div className="eyebrow">TODAY'S REMINDER</div><h3>Focus on the process.</h3><p>You don't need a perfect day. Just show up for the next small thing.</p></div></div></section>
        </>}
        {active==='Habits'&&<section className="subpage"><div className="eyebrow">YOUR ROUTINE</div><h1>All habits</h1><p className="intro">The little things that make up your days.</p><button className="primary-button page-add" onClick={()=>setShowAdd(true)}><Plus size={16}/> Add a habit</button><div className="habit-panel">{habits.map(h=><div className="habit-row" key={h.id}><div className="habit-name"><div className="habit-emoji" style={{background:h.color}}>{h.icon}</div><div><strong>{h.name}</strong><small>{h.category} · {h.goal}</small></div></div><span className="habit-status">{h.done?'Completed today':'Not completed yet'}</span><button className={h.done?'check-button checked':'check-button'} onClick={()=>toggleHabit(h.id)}>{h.done?<Check size={17}/>:null}</button></div>)}</div></section>}
        {active==='Insights'&&<section className="subpage"><div className="eyebrow">THE BIGGER PICTURE</div><h1>Your progress, <em>in perspective.</em></h1><p className="intro">A few numbers to help you see how far you've come.</p><div className="insight-grid"><div className="summary-card"><div className="card-kicker">COMPLETION RATE</div><div className="stat-number">{percent}<span>%</span></div><p className="stat-foot">Today's completion across all habits.</p></div><div className="summary-card"><div className="card-kicker">ACTIVE HABITS</div><div className="stat-number">{habits.length}</div><p className="stat-foot">Routines you're currently working on.</p></div><div className="summary-card"><div className="card-kicker">CURRENT STREAK</div><div className="stat-number">{streak}<span> days</span></div><p className="stat-foot">Keep showing up for yourself.</p></div></div><div className="habit-panel insight-bars"><h3>Weekly consistency</h3>{days.map((d,i)=><div className="bar-line" key={i}><span>{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span><div><i style={{width:(i<5?[78,90,62,85,70][i]:0)+'%'}}/></div><b>{i<5?[78,90,62,85,70][i]+'%':'—'}</b></div>)}</div></section>}
        {active==='Journal'&&<section className="subpage"><div className="eyebrow">YOUR THOUGHTS, YOUR SPACE</div><h1>The journal.</h1><p className="intro">A place to pause, reflect, and notice the little things.</p><button className="primary-button page-add" onClick={()=>setShowNote(true)}><Plus size={16}/> Add a reflection</button><div className="journal-list">{notes.map(n=><article className="journal-entry" key={n.id}><span className="journal-date">{n.time}</span><h3>{n.title}</h3><p>{n.body}</p></article>)}</div></section>}
      </div>
    </main>
    {showAdd&&<div className="modal-backdrop" onClick={()=>setShowAdd(false)}><form className="modal" onSubmit={addHabit} onClick={e=>e.stopPropagation()}><button type="button" className="modal-close" onClick={()=>setShowAdd(false)}><X size={18}/></button><div className="eyebrow">MAKE IT A ROUTINE</div><h2>Add a habit</h2><p>Start small. You can always build from here.</p><label>Habit name<input autoFocus value={newName} onChange={e=>setNewName(e.target.value)} placeholder="e.g. Go for a walk" maxLength={48}/></label><label>Category<select value={newCategory} onChange={e=>setNewCategory(e.target.value)}><option>Personal</option><option>Health</option><option>Learning</option><option>Mindfulness</option><option>Work</option></select></label><button className="primary-button modal-submit" type="submit"><Plus size={16}/> Create habit</button></form></div>}
    {showNote&&<div className="modal-backdrop" onClick={()=>setShowNote(false)}><form className="modal" onSubmit={addNote} onClick={e=>e.stopPropagation()}><button type="button" className="modal-close" onClick={()=>setShowNote(false)}><X size={18}/></button><div className="eyebrow">A MOMENT TO REFLECT</div><h2>Write a thought</h2><p>It doesn't have to be profound. Just honest.</p><label>Your reflection<input autoFocus value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Today, I am proud that..." maxLength={140}/></label><button className="primary-button modal-submit" type="submit">Save reflection</button></form></div>}
  </div>;
}
