-- Oficina OS: esquema inicial multiempresa. Execute no SQL Editor do Supabase.
create extension if not exists pgcrypto;

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company_id uuid not null references public.companies(id),
  full_name text,
  role text not null default 'admin' check (role in ('admin','manager','employee')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  parent_id uuid references public.categories(id),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(company_id,name,parent_id)
);
create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null, document text, phone text, whatsapp text, email text, address text, contact_name text, notes text,
  created_at timestamptz not null default now(), deleted_at timestamptz
);
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null, document text, phone text, whatsapp text, email text, address text, notes text,
  created_at timestamptz not null default now(), deleted_at timestamptz
);
create table if not exists public.parts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  internal_code text not null default ('PEC-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,10))),
  custom_code text, name text not null, description text,
  category_id uuid references public.categories(id), brand text, manufacturer text, oem_code text, parallel_code text, barcode text, serial_number text,
  condition text not null default 'used' check (condition in ('new','used','reconditioned','for_recovery')),
  origin text, status text not null default 'active' check(status in ('active','inactive','unavailable')),
  quantity integer not null default 0 check(quantity >= 0), min_quantity integer not null default 0 check(min_quantity >= 0), max_quantity integer,
  reserved_quantity integer not null default 0 check(reserved_quantity >= 0 and reserved_quantity <= quantity),
  unit text not null default 'un', cost_unit numeric(14,2) not null default 0 check(cost_unit >= 0), freight_unit numeric(14,2) not null default 0,
  other_costs_unit numeric(14,2) not null default 0, sale_price numeric(14,2) not null default 0 check(sale_price >= 0), min_sale_price numeric(14,2),
  supplier_id uuid references public.suppliers(id), location_text text, invoice_number text, lot text, warranty_until date, expires_at date,
  condition_notes text, defects text, notes text, created_by uuid references auth.users(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now(), deleted_at timestamptz,
  unique(company_id,internal_code)
);
create index if not exists parts_company_name_idx on public.parts(company_id,name);
create index if not exists parts_company_barcode_idx on public.parts(company_id,barcode);
create index if not exists parts_company_oem_idx on public.parts(company_id,oem_code);
create table if not exists public.part_applications (
  id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id) on delete cascade,
  part_id uuid not null references public.parts(id) on delete cascade, vehicle_make text, vehicle_model text, version text,
  year_from integer, year_to integer, engine text, fuel text, transmission text, side text, position text, notes text, created_at timestamptz not null default now()
);
create table if not exists public.part_photos (
  id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id) on delete cascade,
  part_id uuid not null references public.parts(id) on delete cascade, storage_path text not null unique, original_name text not null,
  is_primary boolean not null default false, created_by uuid references auth.users(id), created_at timestamptz not null default now()
);
create unique index if not exists one_primary_photo_per_part on public.part_photos(part_id) where is_primary;
create table if not exists public.stock_movements (
  id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id) on delete cascade,
  part_id uuid not null references public.parts(id), movement_type text not null check(movement_type in ('entry','exit','adjustment','reservation','reservation_cancel','return','transfer')),
  quantity integer not null check(quantity > 0), previous_quantity integer not null, new_quantity integer not null,
  reason text, notes text, created_by uuid references auth.users(id), created_at timestamptz not null default now()
);
create index if not exists stock_movements_part_idx on public.stock_movements(company_id,part_id,created_at desc);
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id) on delete cascade,
  supplier_id uuid references public.suppliers(id), invoice_number text, purchase_date date not null default current_date,
  payment_method text, due_date date, freight numeric(14,2) not null default 0, discount numeric(14,2) not null default 0,
  additional_costs numeric(14,2) not null default 0, total numeric(14,2) not null default 0, status text not null default 'draft',
  notes text, created_by uuid references auth.users(id), created_at timestamptz not null default now()
);
create table if not exists public.purchase_items (
  id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id) on delete cascade,
  purchase_id uuid not null references public.purchases(id), part_id uuid not null references public.parts(id),
  quantity integer not null check(quantity > 0), unit_cost numeric(14,2) not null check(unit_cost >= 0), total_cost numeric(14,2) not null
);
create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id) on delete cascade,
  customer_id uuid references public.customers(id), sale_date timestamptz not null default now(), subtotal numeric(14,2) not null default 0,
  discount numeric(14,2) not null default 0, total numeric(14,2) not null default 0, cost_total numeric(14,2) not null default 0,
  gross_profit numeric(14,2) not null default 0, payment_method text, status text not null default 'draft' check(status in ('draft','confirmed','cancelled')),
  idempotency_key text, notes text, created_by uuid references auth.users(id), created_at timestamptz not null default now(),
  unique(company_id,idempotency_key)
);
create table if not exists public.sale_items (
  id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id) on delete cascade,
  sale_id uuid not null references public.sales(id), part_id uuid not null references public.parts(id),
  quantity integer not null check(quantity > 0), unit_price numeric(14,2) not null, unit_cost numeric(14,2) not null,
  discount numeric(14,2) not null default 0, total numeric(14,2) not null
);
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid references auth.users(id), action text not null, entity_type text not null, entity_id uuid,
  old_data jsonb, new_data jsonb, created_at timestamptz not null default now()
);
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id) on delete cascade,
  type text not null, title text not null, message text not null, entity_id uuid, read_at timestamptz, created_at timestamptz not null default now()
);

create or replace function public.current_company_id() returns uuid language sql stable security definer set search_path=public as $$
  select company_id from public.profiles where id=auth.uid() and active=true limit 1;
$$;
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
declare new_company uuid;
begin
  insert into public.companies(name) values (coalesce(new.raw_user_meta_data->>'company_name','Minha oficina')) returning id into new_company;
  insert into public.profiles(id,company_id,full_name,role) values(new.id,new_company,new.raw_user_meta_data->>'full_name','admin');
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.register_stock_movement(p_part_id uuid,p_movement_type text,p_quantity integer,p_reason text default null)
returns public.stock_movements language plpgsql security definer set search_path=public as $$
declare p public.parts; delta integer; result public.stock_movements;
begin
  if auth.uid() is null then raise exception 'Autenticação necessária'; end if;
  if p_quantity is null or p_quantity <= 0 then raise exception 'Quantidade deve ser maior que zero'; end if;
  if p_movement_type not in ('entry','exit') then raise exception 'Tipo de movimentação inválido'; end if;
  select * into p from public.parts where id=p_part_id and company_id=public.current_company_id() and deleted_at is null for update;
  if not found then raise exception 'Peça não encontrada'; end if;
  delta := case when p_movement_type='entry' then p_quantity else -p_quantity end;
  if p.quantity + delta < 0 then raise exception 'Estoque insuficiente. Saldo atual: %',p.quantity; end if;
  update public.parts set quantity=quantity+delta,updated_at=now() where id=p.id returning * into p;
  insert into public.stock_movements(company_id,part_id,movement_type,quantity,previous_quantity,new_quantity,reason,created_by)
  values(p.company_id,p.id,p_movement_type,p_quantity,p.quantity-delta,p.quantity,p_reason,auth.uid()) returning * into result;
  insert into public.audit_logs(company_id,user_id,action,entity_type,entity_id,new_data)
  values(p.company_id,auth.uid(),'stock.'||p_movement_type,'part',p.id,jsonb_build_object('quantity',p_quantity,'new_quantity',p.quantity));
  return result;
end; $$;

create or replace function public.set_primary_part_photo(photo_id uuid) returns void language plpgsql security definer set search_path=public as $$
declare target public.part_photos;
begin
  select * into target from public.part_photos where id=photo_id and company_id=public.current_company_id();
  if not found then raise exception 'Foto não encontrada'; end if;
  update public.part_photos set is_primary=false where part_id=target.part_id and company_id=target.company_id;
  update public.part_photos set is_primary=true where id=photo_id;
end; $$;

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.suppliers enable row level security;
alter table public.customers enable row level security;
alter table public.parts enable row level security;
alter table public.part_applications enable row level security;
alter table public.part_photos enable row level security;
alter table public.stock_movements enable row level security;
alter table public.purchases enable row level security;
alter table public.purchase_items enable row level security;
alter table public.sales enable row level security;
alter table public.sale_items enable row level security;
alter table public.audit_logs enable row level security;
alter table public.notifications enable row level security;

create policy "company members read own company" on public.companies for select using(id=public.current_company_id());
create policy "members read own profile" on public.profiles for select using(id=auth.uid() or company_id=public.current_company_id());
create policy "members update own profile" on public.profiles for update using(id=auth.uid()) with check(id=auth.uid());
do $$
declare t text;
begin
 foreach t in array array['categories','suppliers','customers','parts','part_applications','part_photos','stock_movements','purchases','purchase_items','sales','sale_items','audit_logs','notifications'] loop
   execute format('create policy "tenant select %1$s" on public.%1$I for select using(company_id=public.current_company_id())',t);
   execute format('create policy "tenant insert %1$s" on public.%1$I for insert with check(company_id=public.current_company_id())',t);
   execute format('create policy "tenant update %1$s" on public.%1$I for update using(company_id=public.current_company_id()) with check(company_id=public.current_company_id())',t);
   if t not in ('stock_movements','audit_logs') then
     execute format('create policy "tenant delete %1$s" on public.%1$I for delete using(company_id=public.current_company_id())',t);
   end if;
 end loop;
end $$;
grant execute on function public.register_stock_movement(uuid,text,integer,text) to authenticated;
grant execute on function public.set_primary_part_photo(uuid) to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('part-photos','part-photos',false,10485760,array['image/jpeg','image/png','image/webp','image/heic'])
on conflict(id) do update set public=false,file_size_limit=10485760,allowed_mime_types=array['image/jpeg','image/png','image/webp','image/heic'];
create policy "tenant can view part photos" on storage.objects for select to authenticated using(bucket_id='part-photos' and (storage.foldername(name))[1]=public.current_company_id()::text);
create policy "tenant can upload part photos" on storage.objects for insert to authenticated with check(bucket_id='part-photos' and (storage.foldername(name))[1]=public.current_company_id()::text);
create policy "tenant can delete part photos" on storage.objects for delete to authenticated using(bucket_id='part-photos' and (storage.foldername(name))[1]=public.current_company_id()::text);
