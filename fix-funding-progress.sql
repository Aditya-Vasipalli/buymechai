-- Manual fix: Calculate and update current funding progress
-- This will update all funding goals with their actual current amounts

UPDATE funding_goals 
SET current_amount = (
  SELECT COALESCE(SUM(t.amount), 0)
  FROM transactions t 
  WHERE t.funding_goal_id = funding_goals.id 
    AND t.status = 'verified'
),
updated_at = NOW()
WHERE is_active = true;

-- Verify the results
SELECT 
  id,
  title,
  current_amount,
  target_amount,
  (current_amount::FLOAT / target_amount * 100)::DECIMAL(5,2) as progress_percentage
FROM funding_goals 
WHERE is_active = true;