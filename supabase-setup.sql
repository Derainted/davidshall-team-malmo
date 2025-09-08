-- Create members table for the form data
CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on the table
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to insert new members (for your form)
CREATE POLICY "Allow public insert on members" ON members
    FOR INSERT 
    WITH CHECK (true);

-- Create a policy to allow anyone to read members (for displaying)
CREATE POLICY "Allow public read on members" ON members
    FOR SELECT 
    USING (true);

-- Optional: Create an index on created_at for better performance
CREATE INDEX IF NOT EXISTS idx_members_created_at ON members(created_at DESC);
