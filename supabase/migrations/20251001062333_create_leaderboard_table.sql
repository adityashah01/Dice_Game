/*
  # Create Leaderboard Table

  1. New Tables
    - `leaderboard`
      - `id` (uuid, primary key) - Unique identifier for each score entry
      - `player_name` (text) - Name of the player
      - `score` (integer) - Player's score
      - `created_at` (timestamptz) - Timestamp when the score was recorded

  2. Indexes
    - Index on `score` column for efficient leaderboard queries (descending order)

  3. Security
    - Enable RLS on `leaderboard` table
    - Add policy for anyone to read leaderboard entries
    - Add policy for anyone to insert their own scores

  4. Notes
    - Scores are sorted by highest first
    - No authentication required for basic gameplay
    - Player names are limited to 20 characters on the frontend
*/

CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard (score DESC);

ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert scores"
  ON leaderboard
  FOR INSERT
  WITH CHECK (true);
