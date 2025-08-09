export const dynamic = 'force-dynamic'
export const viewport = {}
export default function NotFound() {
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'64px',marginBottom:'16px'}}>🛸</div>
        <h1 style={{fontSize:'2.25rem',fontWeight:800,marginBottom:'8px'}}>404</h1>
        <h2 style={{fontSize:'1.25rem',fontWeight:600,marginBottom:'16px'}}>Lost in Space</h2>
        <p style={{maxWidth:480,margin:'0 auto 24px',opacity:0.8}}>
          Looks like this page drifted off into the digital cosmos. Let's get you back on course.
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center'}}>
          <a href="/" style={{padding:'10px 16px',borderRadius:8,background:'#00FF94',color:'#000',fontWeight:600}}>Return Home</a>
          <a href="/contact" style={{padding:'10px 16px',borderRadius:8,border:'1px solid #444',color:'#fff',fontWeight:600}}>Contact Support</a>
        </div>
        <div style={{marginTop:24,opacity:0.6,fontSize:12}}>Error Code: 404 | Page Not Found</div>
      </div>
    </div>
  );
}
