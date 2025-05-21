/*
  # Add supplies table and related schema updates
  
  1. New Tables
    - `supplies` table for managing store supplies
      - `id` (uuid, primary key)
      - `name` (text)
      - `quantity` (integer)
      - `min_quantity` (integer)
      - `unit` (text)
      - `category` (text)
      - `description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on supplies table
    - Add policies for authenticated users
*/

-- Create supplies table
CREATE TABLE IF NOT EXISTS supplies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  quantity integer NOT NULL DEFAULT 0,
  min_quantity integer NOT NULL DEFAULT 0,
  unit text NOT NULL,
  category text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE supplies ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users full access to supplies"
  ON supplies
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE TRIGGER update_supplies_updated_at
  BEFORE UPDATE ON supplies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();