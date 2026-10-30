import { useEffect, useMemo, useState, type FormEvent } from "react";
import { requireSupabase, supabase, supabaseReady } from "@/lib/supabase";
import type { Part, PartPhoto } from "@/lib/types";
import { conditionLabels, type PartCondition } from "@/lib/types";
import {
  Activity, AlertTriangle, ArrowDownToLine, ArrowLeftRight, ArrowUpFromLine, BarChart3,
  Bell, Boxes, Camera, Check, ChevronDown, CircleHelp, ClipboardList, Cog, FileBarChart,
  ImagePlus, LayoutDashboard, LogOut, Menu, Package, Plus, Search, Settings, ShieldCheck,
  ShoppingCart, SlidersHorizontal, Truck, Users, Warehouse, X, Wrench, ScanBarcode
} from "lucide-react";

type Section = "dashboard" | "parts" | "stock" | "purchases" | "sales" | "customers" | "suppliers" | "reports" | "settings";
const nav = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "parts", label: "Peças cadastradas", icon: Package },
  { id: "stock", label: "Estoque e movimentações", icon: Warehouse },
  { id: "purchases", label: "Compras e entradas", icon: ArrowDownToLine },
  { id: "sales", label: "Vendas e saídas", icon: ShoppingCart },
  { id: "customers", label: "Clientes", icon: Users },
  { id: "suppliers", label: "Fornecedores", icon: Truck },
  { id: "reports", label: "Relatórios", icon: FileBarChart },
  { id: "settings", label: "Configurações", icon: Settings },
] as const;

export function App() {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [authError, setAuthError] = useState("");
  const [section, setSection] = useState<Section>("dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showPartForm, setShowPartForm] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [toast, setToast] = useState("");
  const [movementPart, setMovementPart] = useState<Part | null>(null);

  useEffect(() => {
    if (!supabase) { setAuthLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setAuthLoading(false); });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => { if (session) void loadParts(); }, [session]);
  async function loadParts() {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from("parts").select("*, part_photos(*)").order("created_at", { ascending: false }).limit(500);
    if (error) notify(error.message);
    else setParts((data ?? []) as Part[]);
    setLoading(false);
  }
  function notify(message: string) { setToast(message); window.setTimeout(() => setToast(""), 4000); }

  async function submitAuth(e: FormEvent) {
    e.preventDefault(); setAuthError("");
    if (!supabase) return;
    const result = authMode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { data: { company_name: companyName || "Minha oficina" } } });
    if (result.error) setAuthError(result.error.message);
    else if (authMode === "signup" && !result.data.session) setAuthError("Conta criada. Confirme seu e-mail para entrar.");
  }
  async function signOut() { await requireSupabase().auth.signOut(); setParts([]); }

  const filtered = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("pt-BR");
    if (!q) return parts;
    return parts.filter(p => [p.name, p.internal_code, p.custom_code, p.oem_code, p.brand, p.barcode, p.location_text].some(v => v?.toLocaleLowerCase("pt-BR").includes(q)));
  }, [parts, search]);
  const stats = useMemo(() => ({
    pieces: parts.length,
    units: parts.reduce((n,p) => n + Number(p.quantity), 0),
    cost: parts.reduce((n,p) => n + Number(p.quantity) * Number(p.cost_unit), 0),
    sale: parts.reduce((n,p) => n + Number(p.quantity) * Number(p.sale_price), 0),
    low: parts.filter(p => p.quantity > 0 && p.quantity <= p.min_quantity).length,
    empty: parts.filter(p => p.quantity <= 0).length,
    reserved: parts.reduce((n,p) => n + Number(p.reserved_quantity), 0),
    noPhoto: parts.filter(p => !p.part_photos?.length).length,
  }), [parts]);

  if (authLoading) return <div className="loading-screen"><div className="spinner" /><span>Carregando seu ambiente…</span></div>;
  if (!supabaseReady) return <div className="setup-screen"><div className="setup-card"><div className="brand-mark"><Wrench /></div><p className="eyebrow">CONFIGURAÇÃO NECESSÁRIA</p><h1>Conecte seu banco de dados</h1><p>O sistema está preparado para Supabase, mas ainda não recebeu as variáveis de ambiente.</p><ol><li>Crie um projeto no Supabase.</li><li>Execute o arquivo <code>supabase/migrations/001_initial_schema.sql</code>.</li><li>Configure <code>VITE_SUPABASE_URL</code> e <code>VITE_SUPABASE_ANON_KEY</code>.</li></ol><p className="muted">Nenhum dado fictício será exibido como se fosse real.</p></div></div>;
  if (!session) return <div className="auth-screen"><div className="auth-aside"><div className="brand-lockup"><span className="brand-mark"><Wrench /></span><span>OFICINA<span className="brand-light">OS</span></span></div><div><p className="eyebrow">GESTÃO INTELIGENTE DE ESTOQUE</p><h1>Controle total das suas peças. <em>Em qualquer lugar.</em></h1><p>Estoque, fotos, movimentações e gestão em um só lugar, com seus dados sincronizados.</p></div><div className="auth-foot">GESTÃO AUTOMOTIVA • CONTROLE E PRECISÃO</div></div><div className="auth-main"><form className="auth-card" onSubmit={submitAuth}><span className="eyebrow">BEM-VINDO AO OFICINA OS</span><h2>{authMode === "login" ? "Acesse sua conta" : "Crie sua oficina"}</h2><p className="muted">{authMode === "login" ? "Entre para continuar gerenciando seu estoque." : "Cadastre o administrador e o espaço da sua empresa."}</p>{authMode === "signup" && <label>Nome da oficina<input value={companyName} onChange={e=>setCompanyName(e.target.value)} placeholder="Ex.: Auto Peças Central" required /></label>}<label>E-mail<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@oficina.com" required /></label><label>Senha<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mínimo de 8 caracteres" minLength={8} required /></label>{authError && <div className="form-error">{authError}</div>}<button className="btn-primary full" type="submit">{authMode === "login" ? "Entrar no sistema" : "Criar conta"}</button><p className="switch-auth">{authMode === "login" ? "Ainda não tem conta?" : "Já possui uma conta?"} <button type="button" onClick={()=>{setAuthMode(authMode==="login"?"signup":"login");setAuthError("");}}>{authMode==="login"?"Criar acesso":"Fazer login"}</button></p><p className="secure-note"><ShieldCheck size={15}/> Conexão protegida e dados isolados por empresa</p></form></div></div>;

  return <div className="app-shell">
    <aside className={`sidebar ${mobileMenu?"sidebar-open":""}`}>
      <div className="sidebar-brand"><span className="brand-mark"><Wrench /></span><div><b>OFICINA<span>OS</span></b><small>GESTÃO AUTOMOTIVA</small></div><button className="icon-btn mobile-close" onClick={()=>setMobileMenu(false)} aria-label="Fechar menu"><X/></button></div>
      <div className="workspace"><span className="workspace-avatar">OF</span><span><b>Minha oficina</b><small>Plano de gestão</small></span><ChevronDown size={15}/></div>
      <p className="nav-caption">MENU PRINCIPAL</p><nav>{nav.map(item=>{const Icon=item.icon;return <button key={item.id} className={`nav-item ${section===item.id?"active":""}`} onClick={()=>{setSection(item.id);setMobileMenu(false);}}><Icon size={18}/><span>{item.label}</span>{item.id==="stock"&&stats.low>0&&<i>{stats.low}</i>}</button>;})}</nav>
      <div className="sidebar-bottom"><div className="help-card"><CircleHelp size={18}/><b>Precisa de ajuda?</b><span>Consulte o suporte do sistema.</span></div><button className="profile-row" onClick={signOut}><span className="profile-avatar">{(session.user.email?.[0]??"U").toUpperCase()}</span><span><b>{session.user.email}</b><small>Administrador</small></span><LogOut size={17}/></button></div>
    </aside>
    {mobileMenu&&<button className="mobile-scrim" onClick={()=>setMobileMenu(false)} aria-label="Fechar navegação"/>}
    <main className="main-area">
      <header className="topbar"><div className="topbar-left"><button className="icon-btn menu-trigger" onClick={()=>setMobileMenu(true)} aria-label="Abrir menu"><Menu/></button><div className="breadcrumb">Oficina OS <span>/</span> <b>{nav.find(n=>n.id===section)?.label}</b></div></div><div className="topbar-actions"><div className="global-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar peças, códigos, veículos…"/><kbd>⌘ K</kbd></div><button className="icon-btn notification-btn" title="Notificações"><Bell size={18}/></button><span className="top-avatar">{(session.user.email?.[0]??"U").toUpperCase()}</span></div></header>
      <div className="page-content">
        {section==="dashboard"&&<><div className="page-heading"><div><p className="eyebrow">VISÃO GERAL DA OPERAÇÃO</p><h1>Dashboard</h1><p className="muted">Acompanhe os indicadores reais do seu estoque.</p></div><button className="btn-primary" onClick={()=>setShowPartForm(true)}><Plus size={17}/> Cadastrar peça</button></div>
          <div className="stats-grid">{[
            ["Peças cadastradas",stats.pieces,Package,"#eef2ff","#4f46e5"],["Unidades em estoque",stats.units,Boxes,"#ecfdf5","#059669"],["Valor de custo",money(stats.cost),BarChart3,"#eff6ff","#2563eb"],["Valor potencial de venda",money(stats.sale),ShoppingCart,"#fff7ed","#ea580c"],["Estoque baixo",stats.low,AlertTriangle,"#fff7ed","#d97706"],["Sem estoque",stats.empty,ArrowDownToLine,"#fef2f2","#dc2626"],["Unidades reservadas",stats.reserved,ClipboardList,"#f5f3ff","#7c3aed"],["Peças sem foto",stats.noPhoto,Camera,"#f1f5f9","#475569"]
          ].map(([label,value,Icon,bg,color])=>{const I=Icon as typeof Package;return <div className="stat-card" key={String(label)}><div className="stat-top"><span>{String(label)}</span><span className="stat-icon" style={{background:String(bg),color:String(color)}}><I size={18}/></span></div><strong>{value as string|number}</strong><small>Atualizado com dados do banco</small></div>;})}</div>
          <div className="content-grid"><section className="panel inventory-panel"><div className="panel-heading"><div><h3>Peças recentes</h3><p>Últimos itens cadastrados</p></div><button className="text-action" onClick={()=>setSection("parts")}>Ver estoque <span>→</span></button></div><PartsTable parts={parts.slice(0,6)} onOpen={setSelectedPart}/></section><section className="panel attention-panel"><div className="panel-heading"><div><h3>Atenção ao estoque</h3><p>Itens que precisam de acompanhamento</p></div><AlertTriangle size={18} className="warning-text"/></div>{parts.filter(p=>p.quantity<=p.min_quantity).slice(0,5).map(p=><div className="attention-row" key={p.id}><span className="attention-dot"/><span><b>{p.name}</b><small>{p.internal_code}</small></span><strong>{p.quantity} un.</strong></div>)}{stats.low+stats.empty===0&&<EmptyState title="Tudo em ordem" text="Nenhuma peça abaixo do estoque mínimo."/>}</section></div>
        </>}
        {section==="parts"&&<><div className="page-heading"><div><p className="eyebrow">CATÁLOGO E CADASTRO</p><h1>Peças cadastradas</h1><p className="muted">{filtered.length} resultado(s) encontrados</p></div><button className="btn-primary" onClick={()=>setShowPartForm(true)}><Plus size={17}/> Nova peça</button></div><section className="panel"><div className="panel-toolbar"><div className="toolbar-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Pesquisar por nome, código, marca…"/></div><button className="btn-outline" onClick={()=>void loadParts()}><Activity size={16}/> Atualizar</button></div><PartsTable parts={filtered} onOpen={setSelectedPart} loading={loading}/></section></>}
        {section==="stock"&&<><div className="page-heading"><div><p className="eyebrow">CONTROLE OPERACIONAL</p><h1>Estoque e movimentações</h1><p className="muted">Consulte saldos e registre entradas e saídas.</p></div></div><section className="panel"><PartsTable parts={filtered} onOpen={p=>setMovementPart(p)} loading={loading} showActions/></section></>}
        {section!=="dashboard"&&section!=="parts"&&section!=="stock"&&<ComingSoon title={nav.find(n=>n.id===section)?.label??"Módulo"} />}
      </div>
      <footer className="app-footer"><span>OFICINA OS</span><span>Gestão de peças automotivas</span><span>Dados sincronizados na nuvem</span></footer>
    </main>
    {showPartForm&&<PartForm onClose={()=>setShowPartForm(false)} onSaved={()=>{setShowPartForm(false);void loadParts();notify("Peça cadastrada com sucesso.");}} onError={notify}/>}
    {selectedPart&&<PartDetails part={selectedPart} onClose={()=>setSelectedPart(null)} onChanged={()=>{setSelectedPart(null);void loadParts();}} onError={notify}/>}
    {movementPart&&<MovementModal part={movementPart} onClose={()=>setMovementPart(null)} onSaved={()=>{setMovementPart(null);void loadParts();notify("Movimentação registrada.");}} onError={notify}/>}
    {toast&&<div className="toast"><Check size={17}/>{toast}</div>}
    <nav className="mobile-bottom">{nav.slice(0,4).map(n=>{const I=n.icon;return <button key={n.id} className={section===n.id?"active":""} onClick={()=>setSection(n.id)}><I size={19}/><span>{n.id==="dashboard"?"Início":n.id==="parts"?"Peças":n.id==="stock"?"Estoque":"Compras"}</span></button>;})}</nav>
  </div>;
}

function money(value:number) { return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:2}).format(value); }
function PartsTable({parts,onOpen,loading=false,showActions=false}:{parts:Part[];onOpen:(p:Part)=>void;loading?:boolean;showActions?:boolean}) {
  if(loading)return <div className="table-empty">Carregando peças…</div>;
  if(!parts.length)return <EmptyState title="Nenhuma peça cadastrada" text="Cadastre sua primeira peça para começar a controlar o estoque."/>;
  return <div className="table-wrap"><table><thead><tr><th>PEÇA</th><th>CÓDIGO</th><th>CATEGORIA</th><th>ESTOQUE</th><th>PREÇO DE VENDA</th><th>LOCALIZAÇÃO</th>{showActions&&<th>AÇÃO</th>}</tr></thead><tbody>{parts.map(p=>{const photo=p.part_photos?.find(x=>x.is_primary)??p.part_photos?.[0];return <tr key={p.id} onClick={()=>onOpen(p)}><td><div className="part-cell">{photo?<img src={photoUrl(photo.storage_path)} alt=""/>:<span className="part-placeholder"><Package size={18}/></span>}<span><b>{p.name}</b><small>{p.brand||"Marca não informada"}</small></span></div></td><td><code>{p.internal_code}</code></td><td>{p.category_id??"—"}</td><td><span className={`stock-pill ${p.quantity<=0?"danger":p.quantity<=p.min_quantity?"warning":"good"}`}>{p.quantity} {p.unit}</span></td><td>{money(Number(p.sale_price))}</td><td>{p.location_text||"Não definida"}</td>{showActions&&<td><span className="table-action">Movimentar →</span></td>}</tr>;})}</tbody></table></div>;
}
function photoUrl(path:string) { return requireSupabase().storage.from("part-photos").getPublicUrl(path).data.publicUrl; }
function EmptyState({title,text}:{title:string;text:string}) { return <div className="empty-state"><span><Package size={24}/></span><b>{title}</b><p>{text}</p></div>; }
function ComingSoon({title}:{title:string}) { return <div className="page-heading"><div><p className="eyebrow">MÓDULO DO SISTEMA</p><h1>{title}</h1><p className="muted">Este módulo será integrado às próximas etapas de implementação. Nenhum dado demonstrativo é exibido.</p></div></div>; }

function PartForm({onClose,onSaved,onError}:{onClose:()=>void;onSaved:()=>void;onError:(s:string)=>void}) {
  const [form,setForm]=useState({name:"",description:"",custom_code:"",brand:"",oem_code:"",condition:"used" as PartCondition,quantity:"0",min_quantity:"0",cost_unit:"0",sale_price:"0",unit:"un",location_text:"",notes:""});
  const [files,setFiles]=useState<File[]>([]); const [saving,setSaving]=useState(false);
  function set<K extends keyof typeof form>(key:K,value:string){setForm(v=>({...v,[key]:value}));}
  function addFiles(list:FileList|null){if(!list)return;setFiles(v=>[...v,...Array.from(list).filter(f=>f.type.startsWith("image/"))]);}
  async function submit(e:FormEvent){e.preventDefault();setSaving(true);try{const db=requireSupabase();const {data:auth}=await db.auth.getUser();if(!auth.user)throw new Error("Sessão expirada.");
    const {data:profile,error:pe}=await db.from("profiles").select("company_id").eq("id",auth.user.id).single();if(pe)throw pe;
    const payload={company_id:profile.company_id,name:form.name.trim(),description:form.description||null,custom_code:form.custom_code||null,brand:form.brand||null,oem_code:form.oem_code||null,condition:form.condition,quantity:Number(form.quantity),min_quantity:Number(form.min_quantity),cost_unit:Number(form.cost_unit),sale_price:Number(form.sale_price),unit:form.unit,location_text:form.location_text||null,notes:form.notes||null};
    const {data:part,error}=await db.from("parts").insert(payload).select().single();if(error)throw error;
    for(let i=0;i<files.length;i++){const file=files[i]!;const path=`${profile.company_id}/${part.id}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,"_")}`;const upload=await db.storage.from("part-photos").upload(path,file,{upsert:false,contentType:file.type});if(upload.error)throw upload.error;const record=await db.from("part_photos").insert({company_id:profile.company_id,part_id:part.id,storage_path:path,original_name:file.name,is_primary:i===0});if(record.error)throw record.error;}
    onSaved();
  }catch(err){onError(err instanceof Error?err.message:"Não foi possível salvar a peça.");}finally{setSaving(false);}}
  return <Modal title="Cadastrar nova peça" subtitle="Preencha os dados disponíveis. Você poderá completar o cadastro depois." onClose={onClose}><form className="form-grid" onSubmit={submit}><label className="span-2">Nome da peça *<input required value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Ex.: Alternador Bosch 90A"/></label><label>Código personalizado<input value={form.custom_code} onChange={e=>set("custom_code",e.target.value)} placeholder="Opcional"/></label><label>Marca<input value={form.brand} onChange={e=>set("brand",e.target.value)}/></label><label>Código original / OEM<input value={form.oem_code} onChange={e=>set("oem_code",e.target.value)}/></label><label>Condição<select value={form.condition} onChange={e=>set("condition",e.target.value)}>{Object.entries(conditionLabels).map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></label><label>Quantidade<input type="number" min="0" step="1" value={form.quantity} onChange={e=>set("quantity",e.target.value)}/></label><label>Estoque mínimo<input type="number" min="0" value={form.min_quantity} onChange={e=>set("min_quantity",e.target.value)}/></label><label>Custo unitário<input type="number" min="0" step=".01" value={form.cost_unit} onChange={e=>set("cost_unit",e.target.value)}/></label><label>Preço de venda<input type="number" min="0" step=".01" value={form.sale_price} onChange={e=>set("sale_price",e.target.value)}/></label><label>Unidade<select value={form.unit} onChange={e=>set("unit",e.target.value)}><option value="un">Unidade</option><option value="kit">Kit</option><option value="par">Par</option><option value="jogo">Jogo</option><option value="kg">Kg</option><option value="l">Litro</option></select></label><label className="span-2">Localização<input value={form.location_text} onChange={e=>set("location_text",e.target.value)} placeholder="Setor A · Estante 02 · Prateleira 04"/></label><label className="span-2">Descrição<textarea rows={2} value={form.description} onChange={e=>set("description",e.target.value)}/></label><label className="span-2">Observações internas<textarea rows={2} value={form.notes} onChange={e=>set("notes",e.target.value)}/></label><div className="span-2 photo-upload"><div><Camera size={18}/><span><b>Fotos da peça</b><small>Você pode adicionar fotos agora ou depois. A primeira será a principal.</small></span></div><label className="upload-button"><ImagePlus size={17}/> Adicionar fotos<input type="file" accept="image/*" capture="environment" multiple onChange={e=>addFiles(e.target.files)}/></label>{files.length>0&&<div className="file-list">{files.map((f,i)=><span key={i}>{f.name}<button type="button" onClick={()=>setFiles(v=>v.filter((_,j)=>i!==j))}><X size={13}/></button></span>)}</div>}</div><div className="modal-actions span-2"><button type="button" className="btn-outline" onClick={onClose}>Cancelar</button><button className="btn-primary" disabled={saving}>{saving?"Salvando…":"Salvar peça"}</button></div></form></Modal>;
}
function Modal({title,subtitle,onClose,children}:{title:string;subtitle:string;onClose:()=>void;children:React.ReactNode}){return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><section className="modal"><header className="modal-header"><div><h2>{title}</h2><p>{subtitle}</p></div><button className="icon-btn" onClick={onClose}><X/></button></header>{children}</section></div>;}
function PartDetails({part,onClose,onChanged,onError}:{part:Part;onClose:()=>void;onChanged:()=>void;onError:(s:string)=>void}) {
  const [photos,setPhotos]=useState<PartPhoto[]>(part.part_photos??[]);const [uploading,setUploading]=useState(false);
  async function upload(list:FileList|null){if(!list)return;setUploading(true);try{const db=requireSupabase();const {data:u}=await db.auth.getUser();const {data:p}=await db.from("profiles").select("company_id").eq("id",u.user!.id).single();for(const file of Array.from(list)){if(!file.type.startsWith("image/"))continue;const path=`${p!.company_id}/${part.id}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,"_")}`;const up=await db.storage.from("part-photos").upload(path,file,{contentType:file.type});if(up.error)throw up.error;const ins=await db.from("part_photos").insert({company_id:p!.company_id,part_id:part.id,storage_path:path,original_name:file.name,is_primary:photos.length===0});if(ins.error)throw ins.error;}const {data}=await db.from("part_photos").select("*").eq("part_id",part.id).order("created_at");setPhotos(data??[]);}catch(e){onError(e instanceof Error?e.message:"Falha no envio.");}finally{setUploading(false);}}
  async function remove(photo:PartPhoto){if(!confirm("Excluir somente esta fotografia?"))return;const db=requireSupabase();const {error}=await db.storage.from("part-photos").remove([photo.storage_path]);if(error){onError(error.message);return;}const del=await db.from("part_photos").delete().eq("id",photo.id);if(del.error){onError(del.error.message);return;}setPhotos(v=>v.filter(x=>x.id!==photo.id));}
  async function primary(photo:PartPhoto){const db=requireSupabase();const {error}=await db.rpc("set_primary_part_photo",{photo_id:photo.id});if(error){onError(error.message);return;}setPhotos(v=>v.map(x=>({...x,is_primary:x.id===photo.id})));}
  return <Modal title={part.name} subtitle={`Código ${part.internal_code} · ${part.brand??"Marca não informada"}`} onClose={onClose}><div className="detail-grid"><div className="detail-highlight"><span>Disponível</span><b>{part.quantity-part.reserved_quantity} {part.unit}</b></div><div className="detail-highlight"><span>Preço de venda</span><b>{money(Number(part.sale_price))}</b></div><div className="detail-highlight"><span>Custo unitário</span><b>{money(Number(part.cost_unit))}</b></div></div><div className="gallery-heading"><div><h3>Galeria de fotos</h3><p>{photos.length} fotografia(s)</p></div><label className="btn-primary upload-button"><ImagePlus size={16}/> {uploading?"Enviando…":"Adicionar fotos"}<input type="file" accept="image/*" capture="environment" multiple disabled={uploading} onChange={e=>upload(e.target.files)}/></label></div><div className="photo-grid">{photos.map(photo=><div className="photo-card" key={photo.id}><img src={photoUrl(photo.storage_path)} alt={photo.original_name}/>{photo.is_primary&&<span className="primary-tag">Principal</span>}<div><button onClick={()=>primary(photo)} title="Definir como principal"><Check size={15}/></button><button onClick={()=>remove(photo)} title="Excluir foto"><X size={15}/></button></div></div>)}</div><div className="detail-info"><p><b>Descrição:</b> {part.description||"—"}</p><p><b>Condição:</b> {conditionLabels[part.condition]}</p><p><b>Estoque:</b> {part.quantity} {part.unit} · mínimo {part.min_quantity}</p><p><b>Localização:</b> {part.location_text||"Não definida"}</p><p><b>Observações:</b> {part.notes||"—"}</p></div><div className="modal-actions"><button className="btn-outline" onClick={onClose}>Fechar</button><button className="btn-primary" onClick={onChanged}>Concluir</button></div></Modal>;
}
function MovementModal({part,onClose,onSaved,onError}:{part:Part;onClose:()=>void;onSaved:()=>void;onError:(s:string)=>void}){const [type,setType]=useState<"entry"|"exit">("entry");const [quantity,setQuantity]=useState("1");const [reason,setReason]=useState("");const [saving,setSaving]=useState(false);async function submit(e:FormEvent){e.preventDefault();setSaving(true);try{const {error}=await requireSupabase().rpc("register_stock_movement",{p_part_id:part.id,p_movement_type:type,p_quantity:Number(quantity),p_reason:reason||null});if(error)throw error;onSaved();}catch(e){onError(e instanceof Error?e.message:"Não foi possível registrar.");}finally{setSaving(false);}}return <Modal title="Movimentar estoque" subtitle={part.name} onClose={onClose}><form className="form-grid" onSubmit={submit}><label className="span-2">Tipo de movimentação<select value={type} onChange={e=>setType(e.target.value as "entry"|"exit")}><option value="entry">Entrada</option><option value="exit">Saída</option></select></label><label className="span-2">Quantidade<input type="number" min="1" step="1" required value={quantity} onChange={e=>setQuantity(e.target.value)}/></label><label className="span-2">Motivo / observação<input value={reason} onChange={e=>setReason(e.target.value)} placeholder="Ex.: compra, ajuste, uso interno…"/></label><div className="span-2 modal-actions"><button type="button" className="btn-outline" onClick={onClose}>Cancelar</button><button className="btn-primary" disabled={saving}>{saving?"Registrando…":"Confirmar movimentação"}</button></div></form></Modal>}
