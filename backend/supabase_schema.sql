-- Fasmala Travels - Complete Supabase Schema
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard/project/xryoqvkqfrjwrjmyibfs/sql)

-- 0. Hotels Table (New)
create table if not exists hotels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text default 'Resort',
  contact_email text,
  phone text,
  website text,
  logo_url text,
  created_at timestamptz default now()
);

-- 0.5 Expenses Table (New)
create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid references hotels(id),
  description text not null,
  amount numeric not null,
  date date not null,
  category text,
  attachment_url text, -- Receipt/Invoice (New)
  created_at timestamptz default now()
);

-- 1. Bookings Table
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid references hotels(id),
  user_id text default 'guest',
  
  -- Guest Details
  first_name text not null,
  last_name text,
  title text,
  country text default 'MV',
  phone text,
  email text,
  vip_status text,
  member_no text,
  member_level text,
  
  -- Stay Details
  place text default 'Fasmala Resort',
  arrival_date date not null,
  nights int default 1,
  departure_date date,
  adults int default 1,
  children int default 0,
  room_no text,
  room_type text,
  res_type text,
  market_segment text,
  source text,
  origin text,
  
  -- Financials
  rate_code text,
  -- Financials
  rate_code text,
  rate_amount numeric default 0,
  cost_amount numeric default 0, -- COGS (New)
  payment_method text,
  credit_card_no text,
  card_exp text,
  balance numeric default 0,
  supplier_invoice text, -- URL or Ref (New)
  
  -- System
  status text default 'CONFIRMED',
  created_at timestamptz default now()
);

-- 2. Rates Table
create table if not exists rates (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid references hotels(id),
  name text not null,
  place text default 'Fasmala Resort',
  valid_from date not null,
  valid_to date not null,
  room_type text not null,
  meal_plan text not null,
  single_rate numeric not null,
  double_rate numeric not null,
  triple_rate numeric not null,
  meal_supplement numeric default 0,
  transfer_price numeric default 0,
  created_at timestamptz default now()
);

-- 3. Invoices Table
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  hotel_id uuid references hotels(id), -- Added hotel_id
  booking_id uuid references bookings(id) on delete cascade,
  invoice_no text unique,
  amount numeric not null,
  currency text default 'USD',
  paid boolean default false,
  created_at timestamptz default now()
);

-- 4. Payments Table
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references invoices(id) on delete cascade,
  amount numeric not null,
  payment_date date not null,
  method text not null, -- CASH, CC, BT
  reference text,
  created_at timestamptz default now()
);

-- 5. Notifications Table
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id) on delete cascade,
  type text, -- arrival_today, arrival_tomorrow, etc.
  payload jsonb,
  sent boolean default false,
  sent_at timestamptz,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS) - Note: For MVP we often use service_role, 
-- but you should configure specific policies in production.
alter table bookings enable row level security;
alter table rates enable row level security;
alter table invoices enable row level security;
alter table payments enable row level security;
alter table notifications enable row level security;

-- Create simple "Allow all for authenticated" policy (example)
-- create policy "Allow all for authenticated" on bookings for all using (auth.role() = 'authenticated');
