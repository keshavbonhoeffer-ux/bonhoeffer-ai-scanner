"use client";

import { useState } from "react";
import Image from "next/image";
import ChatWindow from "../components/bon-ai/ChatWindow";

export default function BonAI() {

  const [chatOpen, setChatOpen] = useState(false);

  const features = [
    {
      icon: "📦",
      title: "Product Information",
      description: "Search products, specifications and machine details."
    },
    {
      icon: "👤",
      title: "Lead Assistant",
      description: "View, analyse and manage Salesforce Leads."
    },
    {
      icon: "💼",
      title: "Opportunity Assistant",
      description: "Check opportunity status and sales pipeline."
    },
    {
      icon: "📊",
      title: "Business Analytics",
      description: "Monthly business, sales and performance insights."
    },
    {
      icon: "🕘",
      title: "Customer History",
      description: "View previous meetings and customer activities."
    },
    {
      icon: "🤖",
      title: "AI Assistant",
      description: "Ask anything related to Salesforce instantly."
    }
  ];

  return (

<div
style={{
height:"100vh",
width:"100%",
display:"flex",
flexDirection:"column",
background:"#F4F6F9",
fontFamily:"Segoe UI, Arial, sans-serif"
}}
>

{/* ================= HEADER ================= */}

<div
style={{
height:"76px",
background:"#ffffff",
borderBottom:"1px solid #E5E7EB",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"0 28px"
}}
>

<div
style={{
display:"flex",
alignItems:"center",
gap:"16px"
}}
>

<Image
src="/images/bonhoeffer_logo.png"
alt="Bonhoeffer"
width={170}
height={55}
/>

<div>

<div
style={{
fontSize:"25px",
fontWeight:"700",
color:"#0B6E4F"
}}
>
Salesforce AI Assistant
</div>

<div
style={{
fontSize:"13px",
color:"#777"
}}
>
Bonhoeffer Machines Pvt. Ltd.
</div>

</div>

</div>

<button
onClick={() => setChatOpen(true)}
style={{
background:"#0B6E4F",
color:"#fff",
border:"none",
padding:"12px 24px",
borderRadius:"10px",
cursor:"pointer",
fontWeight:"600",
fontSize:"15px"
}}
>
Open AI Assistant
</button>

</div>
{/* ================= BODY ================= */}

<div
style={{
flex:1,
display:"flex",
justifyContent:"center",
alignItems:"center",
padding:"35px"
}}
>

<div
style={{
width:"100%",
maxWidth:"1050px"
}}
>

{/* Welcome */}

<div
style={{
textAlign:"center",
marginBottom:"35px"
}}
>

<h1
style={{
margin:"0",
fontSize:"42px",
fontWeight:"700",
color:"#0B6E4F"
}}
>
Welcome 👋
</h1>

<p
style={{
marginTop:"12px",
fontSize:"18px",
color:"#666"
}}
>
Your Enterprise Salesforce AI Assistant
</p>

<p
style={{
marginTop:"6px",
fontSize:"15px",
color:"#888"
}}
>
Access Products, Leads, Opportunities, Business Analytics and Customer History using AI.
</p>

</div>

{/* Feature Cards */}

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"22px"
}}
>

{features.map((feature,index)=>(

<div
key={index}

onClick={()=>setChatOpen(true)}

style={{

background:"#ffffff",

borderRadius:"18px",

padding:"28px",

cursor:"pointer",

transition:"all .25s",

boxShadow:"0 8px 24px rgba(0,0,0,.08)",

border:"1px solid #E8ECEF"

}}

>

<div
style={{
fontSize:"42px",
marginBottom:"18px"
}}
>
{feature.icon}
</div>

<div
style={{
fontSize:"20px",
fontWeight:"700",
color:"#0B6E4F",
marginBottom:"10px"
}}
>
{feature.title}
</div>

<div
style={{
fontSize:"15px",
color:"#666",
lineHeight:"26px"
}}
>
{feature.description}
</div>

</div>

))}

</div>

{/* Quick Questions */}

<div
style={{
marginTop:"40px"
}}
>

<h3
style={{
color:"#0B6E4F",
marginBottom:"18px",
fontSize:"22px"
}}
>
Try asking...
</h3>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(2,1fr)",
gap:"14px"
}}
>

{[
"📊 Show July business",
"👤 Show my leads",
"💼 Top Opportunities",
"📈 This month sales",
"📦 Product Information",
"🕘 Customer History"
].map((item,index)=>(

<div
key={index}
onClick={()=>setChatOpen(true)}
style={{
background:"#ffffff",
padding:"16px",
borderRadius:"14px",
cursor:"pointer",
border:"1px solid #E5E7EB",
fontWeight:"600",
transition:"0.25s",
boxShadow:"0 4px 12px rgba(0,0,0,.05)"
}}
>
{item}
</div>

))}

</div>

<div
style={{
marginTop:"30px",
textAlign:"center",
fontSize:"15px",
color:"#666"
}}
>
Click any card above or the <strong>Open AI Assistant</strong> button to begin chatting.
</div>

</div>

</div>

</div>

<ChatWindow
open={chatOpen}
onClose={()=>setChatOpen(false)}
/>

</div>
 );
}