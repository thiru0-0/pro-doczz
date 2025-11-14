const qs=(s)=>document.querySelector(s)
const qsa=(s)=>Array.from(document.querySelectorAll(s))
const guard=()=>{if(localStorage.getItem('dg.auth')!=='1'){window.location.href='/login'}}
const docsKey='dg.docs'
const getDocs=()=>{try{const v=localStorage.getItem(docsKey);return v?JSON.parse(v):[]}catch{return[]}}
const saveDocs=(list)=>{localStorage.setItem(docsKey,JSON.stringify(list))}
const saveDoc=(doc)=>{const list=getDocs();const i=list.findIndex(d=>d.id===doc.id);if(i>-1)list[i]=doc;else list.unshift(doc);saveDocs(list)}
const newId=()=>crypto.randomUUID()
const now=()=>new Date().toISOString()
const createDoc=(t,c)=>{const id=newId();const doc={id,title:t,content:c,updatedAt:now()};saveDoc(doc);return doc}
const templates=[{id:'resume',title:'Resume',content:'Name\nRole\nSummary\nExperience\nEducation\nSkills'},{id:'proposal',title:'Proposal',content:'Introduction\nObjectives\nScope\nTimeline\nPricing\nNext Steps'},{id:'blank',title:'Untitled',content:''}]
const renderGallery=()=>{const el=qs('#gallery');el.innerHTML=templates.map(t=>`<button class="btn" data-tid="${t.id}">${t.title}</button>`).join(' ');qsa('#gallery .btn').forEach(b=>b.addEventListener('click',()=>{
  const t=templates.find(x=>x.id===b.dataset.tid)
  const doc=createDoc(t.title,t.content)
  window.location.href=`/app/editor/${doc.id}`
}))}
const renderRecent=()=>{const list=getDocs();const el=qs('#recent');el.innerHTML=list.slice(0,10).map(d=>`<div class="card"><div class="row"><div>${d.title}</div><div class="muted">${new Date(d.updatedAt).toLocaleString()}</div></div><div class="row"><a class="link" href="/app/editor/${d.id}">Open</a></div></div>`).join('')}
const exportTXT=(title,content)=>{const blob=new Blob([content],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${title}.txt`;a.click();URL.revokeObjectURL(a.href)}
const exportPDF=(title,content)=>{const { jsPDF } = window.jspdf||{};if(!jsPDF){alert('PDF export unavailable');return}const doc=new jsPDF();const lines=doc.splitTextToSize(content,180);doc.text(lines,10,10);doc.save(`${title}.pdf`)}
const exportDOCX=(title,content)=>{const d=window.docx;if(!d){alert('DOCX export unavailable');return}const paragraphs=content.split('\n').map(t=>new d.Paragraph(t));const doc=new d.Document({sections:[{properties:{},children:paragraphs}]});d.Packer.toBlob(doc).then(blob=>{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${title}.docx`;a.click();URL.revokeObjectURL(a.href)})}
const readEditorId=()=>{const parts=window.location.pathname.split('/');return parts[parts.length-1]}
const loadDoc=(id)=>{return getDocs().find(d=>d.id===id)}
const editorInit=()=>{guard();const id=readEditorId();let doc=loadDoc(id);if(!doc){doc=createDoc('Untitled','')}const titleEl=qs('#doc-title');const area=qs('#doc-area');const saveEl=qs('#save-state');titleEl.value=doc.title;area.value=doc.content;let timer=null;const persist=()=>{doc.title=titleEl.value;doc.content=area.value;doc.updatedAt=now();saveDoc(doc);saveEl.textContent='All changes saved'};const schedule=()=>{saveEl.textContent='Saving...';clearTimeout(timer);timer=setTimeout(persist,400)};titleEl.addEventListener('input',schedule);area.addEventListener('input',schedule);qs('#export-txt').addEventListener('click',()=>exportTXT(doc.title,doc.content));qs('#export-pdf').addEventListener('click',()=>exportPDF(doc.title,doc.content));qs('#export-docx').addEventListener('click',()=>exportDOCX(doc.title,doc.content));const ctx=qs('#ai-context');const gen=qs('#ai-generate');const sugg=qs('#ai-suggestions');gen.addEventListener('click',async()=>{const body={type:'document',context:ctx.value};try{const r=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const j=await r.json();area.value=j.content;schedule()}catch{}});area.addEventListener('select',()=>{const s=area.value.substring(area.selectionStart,area.selectionEnd);if(!s){sugg.textContent='Select text to get suggestions';return}let tips=[];if(s.length<60)tips.push('Add detail for clarity');if(/[.!?]$/.test(s)===false)tips.push('Finish sentences with punctuation');if(/\bI\b/.test(s))tips.push('Consider objective tone');sugg.textContent=tips.join(' • ')||'Looks good'})}
const dashboardInit=()=>{guard();renderGallery();renderRecent();qs('#new-doc').addEventListener('click',()=>{const doc=createDoc('Untitled','');window.location.href=`/app/editor/${doc.id}`})}
const accountInit=()=>{guard();const name=qs('#acc-name');const email=qs('#acc-email');name.value=localStorage.getItem('dg.name')||'';email.value=localStorage.getItem('dg.email')||'';qs('#acc-save').addEventListener('click',()=>{localStorage.setItem('dg.name',name.value);localStorage.setItem('dg.email',email.value)})}
window.dg={dashboardInit,editorInit,accountInit}