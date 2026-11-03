import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const ALLOWED_HOSTS = new Set([
  "boomevents.co.ke",
  "www.boomevents.co.ke",
  "accordmedical.co.ke",
  "www.accordmedical.co.ke",
  "raimerchants.co.ke",
  "www.raimerchants.co.ke",
  "havenlivingfurniture.co.ke",
  "www.havenlivingfurniture.co.ke",
  "amanicentercbo.org",
  "www.amanicentercbo.org",
])

function absolutize(html: string, origin: string) {
  return html
    .replace(/(\s(?:src|href|poster|action)=["'])\/(?!\/)/gi, `$1${origin}/`)
    .replace(/url\(\s*(["']?)\/(?!\/)/gi, `url($1${origin}/`)
    .replace(/(\ssrcset=["'])([^"']+)(["'])/gi, (_, start, value, end) => {
      const next = value.replace(/(^|,\s*)\/(?!\/)/g, `$1${origin}/`)
      return `${start}${next}${end}`
    })
}

function bridge(origin: string) {
  return `(function(){
  var ORIGIN=${JSON.stringify(origin)};
  var log=console.error;
  console.error=function(){
    try{
      var parts=[];
      for(var i=0;i<arguments.length;i++){
        var a=arguments[i];
        parts.push(a&&a.stack?a.stack:String(a));
      }
      document.documentElement.setAttribute("data-preview-error",parts.join("\\n").slice(0,2000));
    }catch(err){}
    return log.apply(console,arguments);
  };
  var ofetch=window.fetch;
  if(ofetch){
    window.fetch=function(input,init){
      var url="";
      try{
        url=typeof input==="string"?input:(input&&input.url)||"";
        if(typeof input==="string"&&input.charAt(0)==="/")input=ORIGIN+input;
      }catch(e){}
      return ofetch.call(this,input,init).then(function(res){return res;},function(err){
        document.documentElement.setAttribute("data-fetch-fail","fetch fail "+url+" => "+String(err));
        throw err;
      });
    };
  }
  var mem={};
  var storage={
    getItem:function(k){return Object.prototype.hasOwnProperty.call(mem,k)?mem[k]:null},
    setItem:function(k,v){mem[k]=String(v)},
    removeItem:function(k){delete mem[k]},
    clear:function(){Object.keys(mem).forEach(function(k){delete mem[k]})},
    key:function(i){return Object.keys(mem)[i]||null},
    get length(){return Object.keys(mem).length}
  };
  try{void window.localStorage.length}catch(e){
    try{
      Object.defineProperty(window,"localStorage",{configurable:true,get:function(){return storage}});
      Object.defineProperty(window,"sessionStorage",{configurable:true,get:function(){return storage}});
    }catch(err){}
  }
  function report(){
    var root=document.scrollingElement||document.documentElement;
    var height=Math.max(root.scrollHeight||0,document.body?document.body.scrollHeight:0);
    parent.postMessage({source:"seth-preview",type:"metrics",height:height,view:window.innerHeight},"*");
  }
  window.addEventListener("message",function(event){
    var data=event.data;
    if(!data||data.source!=="seth-preview"||data.type!=="scroll")return;
    var y=Number(data.y)||0;
    try{window.scrollTo(0,y)}catch(e){}
    document.documentElement.scrollTop=y;
    if(document.body)document.body.scrollTop=y;
  });
  if(document.readyState==="complete")report();
  else window.addEventListener("load",report);
  setTimeout(report,700);
  setTimeout(report,2000);
})();`
}

function allowed(url: URL) {
  return url.protocol === "https:" && ALLOWED_HOSTS.has(url.hostname)
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url")
  if (!raw) return new NextResponse("Missing url", { status: 400 })

  let target: URL
  try {
    target = new URL(raw)
  } catch {
    return new NextResponse("Bad url", { status: 400 })
  }
  if (!allowed(target)) return new NextResponse("Not allowed", { status: 400 })

  const upstream = await fetch(target.toString(), {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
    cache: "no-store",
  })

  if (!upstream.ok) return new NextResponse("Upstream failed", { status: 502 })

  const finalUrl = new URL(upstream.url)
  if (!allowed(finalUrl)) return new NextResponse("Redirect not allowed", { status: 400 })

  const html = await upstream.text()
  if (html.length > 1_800_000) return new NextResponse("Page too large", { status: 502 })

  const origin = `${finalUrl.protocol}//${finalUrl.host}`
  const headInject = `<base href="${origin}/"><script>${bridge(origin)}</script>`
  let page = absolutize(
    html
      .replace(/<meta[^>]+http-equiv=["']content-security-policy["'][^>]*>/gi, "")
      .replace(/<base\b[^>]*>/gi, ""),
    origin,
  )

  if (/<head[^>]*>/i.test(page)) {
    page = page.replace(/<head[^>]*>/i, (match) => `${match}${headInject}`)
  } else {
    page = `<!doctype html><html><head>${headInject}</head><body>${page}</body></html>`
  }

  return new NextResponse(page, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": "frame-ancestors 'self'",
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
    },
  })
}
