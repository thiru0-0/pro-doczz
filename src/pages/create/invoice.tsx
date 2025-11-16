import React, { useState } from 'react';
import WizardShell from '@/components/WizardShell';
import EditableListItem from '@/components/wizard/EditableListItem';
import StyleSelector from '@/components/wizard/StyleSelector';
import GenerateBlock from '@/components/wizard/GenerateBlock';

export default function InvoiceWizard(){
  const [step,setStep]=useState(1);
  const [data,setData]=useState<any>({ yourDetails:{}, clientDetails:{}, invoiceInfo:{}, lineItems:[], paymentDetails:'', style:{ id:'style-classic' } });
  const next=()=> setStep(s=> s+1); const back=()=> setStep(s=> s-1);

  const subtotal = data.lineItems.reduce((sum:any,it:any)=> sum + (Number(it.quantity||0) * Number(it.unitPrice||0)), 0);
  const tax = subtotal * 0.1; const total = subtotal + tax;

  return (
    <WizardShell step={step} onNext={next} onBack={back} totalSteps={6}>
      {step===1 && <div><label>Your Name<input value={data.yourDetails.name||''} onChange={e=> setData((p:any)=> ({ ...p, yourDetails:{ ...p.yourDetails, name: e.target.value }}))} /></label></div>}
      {step===2 && <div><label>Client Name<input value={data.clientDetails.name||''} onChange={e=> setData((p:any)=> ({ ...p, clientDetails:{ ...p.clientDetails, name: e.target.value }}))} /></label></div>}
      {step===3 && <div><label>Invoice Number<input value={data.invoiceInfo.invoiceNumber||''} onChange={e=> setData((p:any)=> ({ ...p, invoiceInfo:{ ...p.invoiceInfo, invoiceNumber: e.target.value }}))} /></label></div>}
      {step===4 && <EditableListItem list={data.lineItems} onChange={(l:any)=> setData((p:any)=> ({ ...p, lineItems:l }))} itemShape={[ 'description','quantity','unitPrice' ]} />}
      {step===5 && <div><label>Payment Details<textarea value={data.paymentDetails} onChange={e=> setData((p:any)=> ({ ...p, paymentDetails: e.target.value }))} /></label><div className="mt-4">Subtotal: {subtotal.toFixed(2)} Tax: {tax.toFixed(2)} Total: {total.toFixed(2)}</div></div>}
  {step===6 && <div><StyleSelector currentStyle={data.style} onSelect={(s:any)=> setData((p:any)=> ({ ...p, style:s }))} /><div className="mt-4"><GenerateBlock payload={{ type: 'invoice', ...data }} /></div></div>}
    </WizardShell>
  )
}
