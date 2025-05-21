/*
  # Create products table and related security policies

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `price` (numeric, not null)
      - `code` (text, not null)
      - `sizes` (jsonb, not null) - Array of size objects with name and count
      - `age_range` (text, not null)
      - `description` (text, not null)
      - `images` (text[], not null) - Array of image URLs
      - `category` (text, not null)
      - `gender` (text, not null)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on products table
    - Add policies for:
      - Public read access
      - Authenticated users can manage products
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  code text NOT NULL,
  sizes jsonb NOT NULL DEFAULT '[]'::jsonb,
  age_range text NOT NULL,
  description text NOT NULL,
  images text[] NOT NULL DEFAULT '{}',
  category text NOT NULL,
  gender text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users full access"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();