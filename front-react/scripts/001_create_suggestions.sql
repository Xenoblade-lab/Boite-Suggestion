-- Create suggestions table for PREFAC suggestion box
CREATE TABLE IF NOT EXISTS public.suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('suggestion', 'problem', 'idea')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  promotion TEXT CHECK (promotion IN ('L1', 'L2', 'L3', 'Master', 'Doctorat', 'Autre')),
  is_anonymous BOOLEAN DEFAULT true,
  author_name TEXT,
  author_email TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'in_progress', 'resolved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert suggestions (anonymous submissions allowed)
CREATE POLICY "Anyone can submit suggestions" 
  ON public.suggestions 
  FOR INSERT 
  WITH CHECK (true);

-- Allow anyone to read suggestions (for transparency)
CREATE POLICY "Anyone can view suggestions" 
  ON public.suggestions 
  FOR SELECT 
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_suggestions_type ON public.suggestions(type);
CREATE INDEX IF NOT EXISTS idx_suggestions_status ON public.suggestions(status);
CREATE INDEX IF NOT EXISTS idx_suggestions_created_at ON public.suggestions(created_at DESC);
