const el=(s)=>document.querySelector(s)
const route=()=>window.location.pathname
const setHTML=(h)=>{el('#page-root').innerHTML=h}
const go=(p)=>{window.location.href=p}

const hero=()=>`
  <section class="hero">
    <div>
      <h1>Stop Guessing. Start Generating. Your AI Document Assistant is Here.</h1>
      <p>Create professional-grade resumes, proposals, and policies in minutes, not days.</p>
      <div class="row">
        <a class="btn" href="/signup">Get Started for Free</a>
        <a class="btn secondary" href="/features">Explore Features</a>
      </div>
    </div>
    <div class="hero-art"></div>
  </section>
  <section class="section">
    <h2>How It Works</h2>
    <div class="grid">
      <div class="card"><h3>Provide Context</h3><div class="muted">I need a resume for a Data Analyst role.</div></div>
      <div class="card"><h3>Generate Draft</h3><div class="muted">AI generates a complete, formatted document.</div></div>
      <div class="card"><h3>Refine & Export</h3><div class="muted">Edit with AI suggestions, export to PDF/DOCX.</div></div>
    </div>
  </section>
  <section class="section">
    <h2>Use Cases</h2>
    <div class="split">
      <div class="card"><h3>Professionals & Freelancers</h3><div class="muted">Proposals, client reports, internal policies, marketing copy.</div></div>
      <div class="card"><h3>Students & Job Seekers</h3><div class="muted">ATS-friendly resumes, cover letters, academic reports.</div></div>
    </div>
  </section>
  <section class="section">
    <h2>Top Features</h2>
    <div class="grid">
      <div class="card"><h3>AI Document Generation</h3><div class="muted">Resumes, proposals, policies, reports.</div></div>
      <div class="card"><h3>Interactive AI Editor</h3><div class="muted">Real-time suggestions for style, clarity, tone.</div></div>
      <div class="card"><h3>Smart Templates</h3><div class="muted">Adaptive templates based on your context.</div></div>
      <div class="card"><h3>Multiple Export Formats</h3><div class="muted">PDF, DOCX, TXT.</div></div>
    </div>
  </section>
  <section class="section">
    <div class="full-cta">
      <div>
        <h2>Start Your Design Journey Today</h2>
        <div class="muted">Join free and generate your first document.</div>
      </div>
      <a class="btn" href="/signup">Get Started for Free</a>
    </div>
  </section>
`

const features=()=>`
  <section class="section">
    <h2>AI Document Generation</h2>
    <div class="card">Resumes, proposals, policies, reports with context-aware content.</div>
  </section>
  <section class="section">
    <h2>Interactive AI Editor</h2>
    <div class="card">Suggestions for style, clarity, and tone with inline guidance.</div>
  </section>
  <section class="section">
    <h2>Smart Templates</h2>
    <div class="card">Templates adapt to role, industry, and tone.</div>
  </section>
  <section class="section">
    <h2>Multiple Export Formats</h2>
    <div class="card">Export to PDF, DOCX, and TXT.</div>
  </section>
`

const solutions=()=>`
  <section class="section">
    <h2>Solutions</h2>
    <div class="grid">
      <div class="card"><h3>For Professionals</h3><div class="muted">Win more clients</div><a class="link" href="/solutions/for-professionals">View</a></div>
      <div class="card"><h3>For Students</h3><div class="muted">Land the job</div><a class="link" href="/solutions/for-students">View</a></div>
    </div>
  </section>
`

const pro=()=>`
  <section class="section">
    <h2>Win More Clients. Streamline Your Business.</h2>
    <div class="stack">
      <div class="card">Proposals that align to scope and pricing.</div>
      <div class="card">Client reports with consistent formatting.</div>
      <div class="card">Internal policies for compliance.</div>
      <div class="card">Marketing copy tailored to audience.</div>
    </div>
  </section>
`

const students=()=>`
  <section class="section">
    <h2>Land the Job. Ace the Class.</h2>
    <div class="stack">
      <div class="card">ATS-friendly resumes built to pass filters.</div>
      <div class="card">Compelling cover letters with proper tone.</div>
      <div class="card">Summarize lecture notes into clear reports.</div>
    </div>
  </section>
`

const pricing=()=>`
  <section class="section">
    <h2>Pricing</h2>
    <div class="price">
      <div class="card">
        <h3>Free</h3>
        <div class="muted">$0/mo</div>
        <div>5 Document Generations per month</div>
        <div>Basic Templates</div>
        <div>Standard AI Suggestions</div>
        <a class="btn" href="/signup">Choose Free</a>
      </div>
      <div class="card">
        <div class="badge popular">Most Popular</div>
        <h3>Pro</h3>
        <div class="muted">$14.99/mo</div>
        <div>Unlimited Document Generations</div>
        <div>Advanced/Premium Templates</div>
        <div>Advanced AI suggestions</div>
        <div>Priority Support</div>
        <a class="btn" href="/signup">Choose Pro</a>
      </div>
    </div>
    <div class="section"><div class="card">FAQ: Billing is monthly, cancel anytime.</div></div>
  </section>
`

const login=()=>`
  <section class="auth">
    <h2>Login</h2>
    <div class="stack">
      <input id="login-email" class="input" placeholder="Email" />
      <input id="login-pass" type="password" class="input" placeholder="Password" />
      <button class="btn" onclick="doLogin()">Login</button>
    </div>
  </section>
`

const signup=()=>`
  <section class="auth">
    <h2>Sign Up</h2>
    <div class="stack">
      <input id="signup-name" class="input" placeholder="Name" />
      <input id="signup-email" class="input" placeholder="Email" />
      <input id="signup-pass" type="password" class="input" placeholder="Password" />
      <button class="btn" onclick="doSignup()">Create Account</button>
    </div>
  </section>
`

const render=()=>{
  const r=route()
  if(r==="/") return setHTML(hero())
  if(r==="/features") return setHTML(features())
  if(r==="/solutions") return setHTML(solutions())
  if(r==="/solutions/for-professionals") return setHTML(pro())
  if(r==="/solutions/for-students") return setHTML(students())
  if(r==="/pricing") return setHTML(pricing())
  if(r==="/login") return setHTML(login())
  if(r==="/signup") return setHTML(signup())
  setHTML(hero())
}

const isLoggedIn=()=>localStorage.getItem('dg.auth')==='1'
const doLogin=()=>{localStorage.setItem('dg.auth','1');go('/app/dashboard')}
const doSignup=()=>{localStorage.setItem('dg.auth','1');go('/app/dashboard')}

document.addEventListener('DOMContentLoaded',render)