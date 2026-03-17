# FinanceFlow

## Current State
All data pages (Accounts, Transactions, Debts, Goals, Investments, Budget, Categories, Dashboard) load data via `useEffect` calling backend actor methods. Most pages (Accounts, Transactions, Debts, Goals, Investments, Budget, Categories) do NOT have try/catch/finally in their load functions — if the backend is slow or the first call fails/times out, `setLoading(false)` is never called and the page is stuck in an infinite spinner with no way to recover.

## Requested Changes (Diff)

### Add
- Error state (`error: string | null`) to all data pages
- Auto-retry logic: retry up to 3 times with 2s delay before showing error
- "Retry" button displayed when load fails, allowing user to manually re-trigger load
- Informational message during first load: "Waking up backend, please wait..."

### Modify
- All page load functions: wrap in try/catch/finally so `setLoading(false)` always runs
- Dashboard: already has try/catch/finally, add retry button on error
- Accounts, Transactions, Debts, Goals, Investments, Budget, Categories: add proper error handling

### Remove
- Nothing removed

## Implementation Plan
1. Add error state + retry button pattern to every data page
2. Wrap all load functions in try/catch/finally
3. Show a helpful slow-backend message after 5s of loading
4. Dashboard: add error state display with retry button
