CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
