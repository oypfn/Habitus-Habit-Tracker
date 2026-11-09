import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Flame, LayoutDashboard, ListChecks, MoreHorizontal, Plus, Search, Settings2, Target, TrendingUp, X } from 'lucide-react';
import './App.css';
import { getCurrentStreak, getWeekDates, getWeeklyCompletion, toDateKey } from './lib/dateUtils';

const seedHabits = [];
const initialNotes = [];

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function normalizeHabits(items) {
  if (!Array.isArray(items)) return seedHabits;
  return items.filter(h => h && (typeof h.id === 'string' || typeof h.id === 'number') && typeof h.name === 'string' && h.name.trim()).map(h => ({
    id: h.id, name: h.name.trim().slice(0, 48),
    category: typeof h.category === 'string' ? h.category : 'Personal',
    icon: typeof h.icon === 'string' ? h.icon : '🌱',
    color: typeof h.color === 'string' ? h.color : '#d8e8d9',
    goal: typeof h.goal === 'string' ? h.goal : 'Daily',
    createdAt: typeof h.createdAt === 'string' && /^\\d{4}-\\d{2}-\\d{2}$/.test(h.createdAt) ? h.createdAt : toDateKey(),
    completions: [...new Set(Array.isArray(h.completions) ? h.completions.filter(value => typeof value === 'string' && /^\\d{4}-\\d{2}-\\d{2}$/.test(value)) : [])].sort()
  }));
}
function normalizeNotes(items) {
  if (!Array.isArray(items)) return initialNotes;
  return items.filter(note => note && (typeof note.id === 'string' || typeof note.id === 'number') && typeof note.title === 'string').map(note => ({ id: note.id, title: note.title.slice(0, 140), time: typeof note.time === 'string' ? note.time : '', body: typeof note.body === 'string' ? note.body : '' }));
}

function readSaved() {
  try { const value = localStorage.getItem('habitus-data'); return value ? JSON.parse(value) : null; } catch { return null; }
}

export default function App() {
  const saved = useMemo(() => readSaved(), []);
  const [habits, setHabits] = useState(() => normalizeHabits(saved?.habits));
  const [notes, setNotes] = useState(() => normalizeNotes(saved?.notes));
  const [active, setActive] = useState('Today');
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Personal');
  const [query, setQuery] = useState('');
  const [noteText, setNoteText] = useState('');
  const [showNote, setShowNote] = useState(false);

  const [storageWarning, setStorageWarning] = useState(false);
  useEffect(() => {
    try { localStorage.setItem('habitus-data', JSON.stringify({ habits, notes })); setStorageWarning(false); }
    catch { setStorageWarning(true); }
  }, [habits, notes]);

  const today = new Date();
  const todayKey = toDateKey(today);
  const weekDates = getWeekDates(today);
  const weekStats = getWeeklyCompletion(habits, weekDates);
  const completed = habits.filter(h => h.completions.includes(todayKey)).length;
  const percent = habits.length ? Math.round(completed / habits.length * 100) : 0;
  const fullCompletionDays = [...new Set(habits.flatMap(h => h.completions))].filter(key => habits.length > 0 && habits.every(h => h.createdAt > key || h.completions.includes(key)));
  const streak = getCurrentStreak(fullCompletionDays, today);
  const visibleHabits = habits.filter(h => h.name.toLowerCase().includes(query.toLowerCase()));

  function toggleHabit(id) {
    setHabits(items => items.map(h => h.id === id ? { ...h, completions: h.completions.includes(todayKey) ? h.completions.filter(key => key !== todayKey) : [...h.completions, todayKey] } : h));
  }
  function addHabit(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setHabits(items => [...items, { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, name: newName.trim(), category: newCategory, icon: '🌱', color: '#d8e8d9', goal: 'Daily', createdAt: todayKey, completions: [] }]);
    setNewName(''); setShowAdd(false);
  }
  function deleteHabit(id) { setHabits(items => items.filter(habit => habit.id !== id)); }
  function addNote(e) {
    e.preventDefault();
    if (!noteText.trim()) return;
    setNotes(items => [{ id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, title: noteText.trim(), time: new Date().toLocaleString(), body: '' }, ...items]);
    setNoteText(''); setShowNote(false);
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#" onClick={e => e.preventDefault()}><span className="brand-mark">h</span><span>habitus<span className="brand-dot">.</span></span></a>
      <div className="workspace-label">WORKSPACE <ChevronDown size={13}/></div>
      <div className="profile-card"><div className="avatar">RA</div><div><strong>Your workspace</strong><small>Personal workspace</small></div><MoreHorizontal size={17}/></div>
      <div className="nav-label">MENU</div>
      <nav className="main-nav">
        {[['Today',LayoutDashboard],['Habits',ListChecks],['Insights',TrendingUp],['Journal',CalendarDays]].map(([label,Icon]) => <button key={label} className={active===label?'nav-item selected':'nav-item'} onClick={()=>setActive(label)}><Icon size={17}/><span>{label}</span>{label==='Today'&&<span className="nav-count">{completed}/{habits.length}</span>}</button>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="streak-card"><div className="streak-icon"><Flame size={19}/></div><div><strong>{streak} day streak</strong><small>You're building momentum</small></div></div>
        <button className={active==='Settings'?'nav-item selected':'nav-item'} onClick={()=>setActive('Settings')}><Settings2 size={17}/><span>Settings</span></button>
        <button className={active==='Help'?'nav-item selected':'nav-item'} onClick={()=>setActive('Help')}><CircleHelp size={17}/><span>Help & feedback</span></button>
        <div className="sidebar-user"><div className="avatar avatar-small">RA</div><div><strong>Your profile</strong><small>Free plan</small></div><MoreHorizontal size={17}/></div>
      </div>
    </aside>

    <main className="main-area">
      <header className="topbar"><div className="breadcrumb">Workspace <ChevronRight size={14}/> <strong>{active}</strong></div><div className="top-actions"><span className="date-chip"><CalendarDays size={15}/> {today.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</span><div className="avatar avatar-small">RA</div></div></header>
      <div className="content-wrap">{storageWarning&&<div className="storage-warning" role="alert">Your browser could not save changes. Export your data and check available browser storage.</div>}
        {active==='Today' && <>
          <section className="welcome-row"><div><div className="eyebrow">{today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}</div><h1>A good day to begin,<br/><em>one step at a time.</em></h1><p className="intro">Small steps, repeated daily, become remarkable things.</p></div><div className="welcome-art"><div className="sun-disc"/><span className="art-leaf leaf-one">✳</span><span className="art-leaf leaf-two">✳</span><span className="art-caption">MAKE ROOM<br/>FOR GROWTH</span></div></section>
          <section className="summary-grid">
            <div className="summary-card progress-card"><div className="card-kicker">TODAY'S PROGRESS <span className="muted-dot">●</span></div><div className="progress-flex"><div className="ring" style={{'--progress':percent+'%'}}><div><strong>{percent}%</strong><small>complete</small></div></div><div className="progress-copy"><strong>{completed} of {habits.length} habits</strong><p>{percent===100?'Everything done. Well played.':"You're making good progress. Keep it steady."}</p><span className="positive"><ArrowUpRight size={14}/> A little better every day</span></div></div></div>
            <div className="summary-card"><div className="card-kicker">CURRENT STREAK <Flame size={15}/></div><div className="stat-number">{streak}<span> days</span></div><p className="stat-foot">Calculated from your recorded check-ins.</p><div className="mini-week">{days.map((d,i)=><div key={i} className={weekStats[i].percent===100 && weekStats[i].total>0?'mini-day active':'mini-day'}><span>{d}</span><b>{weekStats[i].total>0 && weekStats[i].percent===100?'✓':'·'}</b></div>)}</div></div>
            <div className="summary-card quote-card"><div className="quote-mark">“</div><p>We are what we repeatedly do. Excellence, then, is not an act, but a habit.</p><span>— WILL DURANT</span></div>
          </section>
          <section className="section-heading"><div><div className="eyebrow">YOUR ROUTINE</div><h2>Today's habits <span className="heading-count">{completed}/{habits.length}</span></h2></div><button className="primary-button" onClick={()=>setShowAdd(true)}><Plus size={16}/> Add a habit</button></section>
          <section className="habit-panel">
            <div className="habit-toolbar"><div className="week-switch"><strong>This week</strong><span className="today-tag">TODAY</span></div><label className="search-box"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a habit"/></label></div>
            <div className="habit-head"><span>HABIT</span><span>WEEKLY RHYTHM</span><span>TODAY</span></div>
            {visibleHabits.map(h=><div className="habit-row" key={h.id}><div className="habit-name"><div className="habit-emoji" style={{background:h.color}}>{h.icon}</div><div><strong>{h.name}</strong><small>{h.category} <span>·</span> {h.goal}</small></div></div><div className="week-cells">{weekDates.map(date=>{const done=h.completions.includes(toDateKey(date));return <div key={toDateKey(date)} className={'week-cell '+(done?'filled':'')+(toDateKey(date)===todayKey?' current':'')} title={date.toLocaleDateString()}>{done?<Check size={12}/>:<span/>}</div>})}</div><button className={h.completions.includes(todayKey)?'check-button checked':'check-button'} onClick={()=>toggleHabit(h.id)} aria-label={h.completions.includes(todayKey)?'Mark incomplete':'Mark complete'}>{h.completions.includes(todayKey)?<Check size={17}/>:<span/>}</button></div>)}
            {visibleHabits.length===0&&<div className="empty-state">{query ? 'No habits match that search.' : 'You have not added any habits yet. Start with one small routine.'}</div>}
            <div className="panel-footer"><span><span className="legend-dot done-dot"/> Completed <span className="legend-dot empty-dot"/> Still to do</span><button className="text-button" onClick={()=>setActive('Habits')}>View all habits <ChevronRight size={14}/></button></div>
          </section>
          <section className="bottom-grid"><div className="bottom-card"><div className="bottom-title"><div><div className="eyebrow">A MOMENT TO REFLECT</div><h3>Make it count.</h3></div><button className="round-plus" onClick={()=>setShowNote(true)}><Plus size={17}/></button></div><p>Take a minute to notice what went well today. Progress is worth recognising.</p><button className="text-button" onClick={()=>setActive('Journal')}>Open your journal <ChevronRight size={14}/></button></div><div className="bottom-card focus-card"><div className="focus-symbol"><Target size={21}/></div><div><div className="eyebrow">TODAY'S REMINDER</div><h3>Focus on the process.</h3><p>You don't need a perfect day. Just show up for the next small thing.</p></div></div></section>
        </>}
        {active==='Habits'&&<section className="subpage"><div className="eyebrow">YOUR ROUTINE</div><h1>All habits</h1><p className="intro">The little things that make up your days.</p><button className="primary-button page-add" onClick={()=>setShowAdd(true)}><Plus size={16}/> Add a habit</button><div className="habit-panel">{habits.map(h=><div className="habit-row" key={h.id}><div className="habit-name"><div className="habit-emoji" style={{background:h.color}}>{h.icon}</div><div><strong>{h.name}</strong><small>{h.category} · {h.goal}</small></div></div><span className="habit-status">{h.completions.includes(todayKey)?'Completed today':'Not completed yet'}</span><button className={h.completions.includes(todayKey)?'check-button checked':'check-button'} onClick={()=>toggleHabit(h.id)} aria-label={h.completions.includes(todayKey)?'Mark incomplete':'Mark complete'}>{h.completions.includes(todayKey)?<Check size={17}/>:null}</button><button className="text-button" onClick={()=>{if(window.confirm("Delete this habit and its check-in history?"))deleteHabit(h.id);}}>Delete</button></div>)}</div></section>}
        {active==='Insights'&&<section className="subpage"><div className="eyebrow">THE BIGGER PICTURE</div><h1>Your progress, <em>in perspective.</em></h1><p className="intro">A few numbers to help you see how far you've come.</p><div className="insight-grid"><div className="summary-card"><div className="card-kicker">COMPLETION RATE</div><div className="stat-number">{percent}<span>%</span></div><p className="stat-foot">Today's completion across all habits.</p></div><div className="summary-card"><div className="card-kicker">ACTIVE HABITS</div><div className="stat-number">{habits.length}</div><p className="stat-foot">Routines you're currently working on.</p></div><div className="summary-card"><div className="card-kicker">CURRENT STREAK</div><div className="stat-number">{streak}<span> days</span></div><p className="stat-foot">Keep showing up for yourself.</p></div></div><div className="habit-panel insight-bars"><h3>Weekly consistency</h3>{weekStats.map((day,i)=><div className="bar-line" key={day.date}><span>{weekDates[i].toLocaleDateString(undefined,{weekday:'short'})}</span><div><i style={{width:day.percent+'%'}}/></div><b>{day.total ? day.percent+'%' : '—'}</b></div>)}</div></section>}
        {active==='Journal'&&<section className="subpage"><div className="eyebrow">YOUR THOUGHTS, YOUR SPACE</div><h1>The journal.</h1><p className="intro">A place to pause, reflect, and notice the little things.</p><button className="primary-button page-add" onClick={()=>setShowNote(true)}><Plus size={16}/> Add a reflection</button><div className="journal-list">{notes.map(n=><article className="journal-entry" key={n.id}><span className="journal-date">{n.time}</span><h3>{n.title}</h3>{n.body&&<p>{n.body}</p>}<button className="text-button" onClick={()=>{if(window.confirm("Delete this journal entry?"))setNotes(items=>items.filter(item=>item.id!==n.id));}}>Delete entry</button></article>)}{notes.length===0&&<div className="empty-state">No reflections yet. Add your first note when you are ready.</div>}</div></section>}
        {active==='Settings'&&<section className="subpage"><div className="eyebrow">PREFERENCES & DATA</div><h1>Settings.</h1><p className="intro">Manage the data stored in this browser.</p><div className="habit-panel" style={{padding:24,marginTop:24}}><h3>Data & privacy</h3><p className="intro">Your habits and journal entries are stored locally in this browser. They are not synced to an account or another device.</p><div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:20}}><button className="primary-button" onClick={()=>{const blob=new Blob([JSON.stringify({habits,notes,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='habitus-data.json';link.click();URL.revokeObjectURL(url);}}>Export my data</button><button className="text-button" onClick={()=>{if(window.confirm('Delete all habits and journal entries stored in this browser? This cannot be undone.')){setHabits([]);setNotes([]);}}}>Clear all data</button></div></div></section>}
        {active==='Help'&&<section className="subpage"><div className="eyebrow">SUPPORT</div><h1>Help & feedback.</h1><p className="intro">A quick guide to using Habitus.</p><div className="habit-panel" style={{padding:24,marginTop:24}}><h3>How does tracking work?</h3><p className="intro">Add a habit, then use its check button each day to record completion. Your streak and weekly consistency are calculated from those check-ins.</p><h3 style={{marginTop:24}}>Where is my data stored?</h3><p className="intro">This prototype stores data in your browser only. Clearing browser storage or switching devices can remove or hide your records. Export a backup from Settings.</p><h3 style={{marginTop:24}}>Is account sync available?</h3><p className="intro">Not in this version. There is no live account system or cloud backup yet.</p></div></section>}
      </div>
    </main>
    {showAdd&&<div className="modal-backdrop" onClick={()=>setShowAdd(false)}><form className="modal" onSubmit={addHabit} onClick={e=>e.stopPropagation()}><button type="button" className="modal-close" onClick={()=>setShowAdd(false)}><X size={18}/></button><div className="eyebrow">MAKE IT A ROUTINE</div><h2>Add a habit</h2><p>Start small. You can always build from here.</p><label>Habit name<input autoFocus value={newName} onChange={e=>setNewName(e.target.value)} placeholder="e.g. Go for a walk" maxLength={48}/></label><label>Category<select value={newCategory} onChange={e=>setNewCategory(e.target.value)}><option>Personal</option><option>Health</option><option>Learning</option><option>Mindfulness</option><option>Work</option></select></label><button className="primary-button modal-submit" type="submit"><Plus size={16}/> Create habit</button></form></div>}
    {showNote&&<div className="modal-backdrop" onClick={()=>setShowNote(false)}><form className="modal" onSubmit={addNote} onClick={e=>e.stopPropagation()}><button type="button" className="modal-close" onClick={()=>setShowNote(false)}><X size={18}/></button><div className="eyebrow">A MOMENT TO REFLECT</div><h2>Write a thought</h2><p>It doesn't have to be profound. Just honest.</p><label>Your reflection<input autoFocus value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Today, I am proud that..." maxLength={140}/></label><button className="primary-button modal-submit" type="submit">Save reflection</button></form></div>}
  </div>;
}
