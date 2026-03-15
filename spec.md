# FinanceFlow

## Current State
FinanceFlow is a full personal finance tracking app with Dashboard, Accounts, Transactions, Categories, Debts, Goals, Investments, Budget, and Settings pages. Transactions page has a basic CSV export for transactions only.

## Requested Changes (Diff)

### Add
- A new "Reports" page accessible from the sidebar.
- On the Reports page, users can download individual CSV reports for each data type:
  - Transactions report (all transactions with category, account, date, type, amount, notes)
  - Accounts summary (name, type, balance, notes)
  - Debts report (name, lender, total amount, remaining balance, EMI, interest rate, due date, notes)
  - Investments report (name, type, amount invested, current value, profit/loss, date, notes)
  - Goals report (name, target amount, current amount, monthly contribution, deadline, notes)
  - Budget report (category, month, limit, spent, status)
  - Complete financial report (all sections combined into one CSV with section headers)

### Modify
- App.tsx: Add "reports" to the Page type and add Reports page rendering.
- Layout.tsx: Add "Reports" nav item with a FileDown icon.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/pages/Reports.tsx` with all download buttons and logic.
2. Update `App.tsx` to include reports page type and routing.
3. Update `Layout.tsx` to add Reports to nav items.
