import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { LeaderboardEntry } from '../types/game';

export const useLeaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .limit(10);

      if (error) throw error;

      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveScore = useCallback(async (playerName: string, score: number) => {
    try {
      const { error } = await supabase
        .from('leaderboard')
        .insert([{ player_name: playerName, score }]);

      if (error) throw error;

      await fetchLeaderboard();
    } catch (error) {
      console.error('Error saving score:', error);
    }
  }, [fetchLeaderboard]);

  useEffect(() => {
    fetchLeaderboard();

    const channel = supabase
      .channel('leaderboard-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leaderboard' },
        () => {
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLeaderboard]);

  return { entries, loading, saveScore };
};
