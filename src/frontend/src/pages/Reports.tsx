import {
  AlertTriangle,
  Calculator,
  Download,
  FileDown,
  FileSpreadsheet,
  Landmark,
  Receipt,
  Tag,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import type { backendInterface } from "../backend";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useCurrency } from "../context/CurrencyContext";
import { formatDate } from "../lib/format";

interface Props {
  actor: backendInterface;
}

function downloadCSV(filename: string, rows: string[][]) {
  const csv = rows
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Reports({ actor }: Props) {
  const { currency } = useCurrency();
  const [loading, setLoading] = useState<string | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(n);

  const handleTransactions = async () => {
    setLoading("transactions");
    try {
      const [txs, accounts, categories] = await Promise.all([
        actor.getAllTransactions(),
        actor.getAllAccounts(),
        actor.getAllCategories(),
      ]);
      const rows = [
        ["Type", "Amount", "Date", "Category", "Source", "Account", "Notes"],
      ];
      for (const t of txs.sort((a, b) => Number(b.date) - Number(a.date))) {
        const cat = categories.find((c) => c.id === t.categoryId)?.name ?? "";
        const acc = accounts.find((a) => a.id === t.accountId)?.name ?? "";
        rows.push([
          t.transactionType,
          fmt(t.amount),
          formatDate(t.date),
          cat,
          t.source,
          acc,
          t.notes,
        ]);
      }
      downloadCSV("transactions_report.csv", rows);
    } finally {
      setLoading(null);
    }
  };

  const handleAccounts = async () => {
    setLoading("accounts");
    try {
      const accounts = await actor.getAllAccounts();
      const rows = [["Name", "Type", "Balance", "Notes"]];
      for (const a of accounts) {
        rows.push([a.name, a.accountType, fmt(a.balance), a.notes]);
      }
      downloadCSV("accounts_report.csv", rows);
    } finally {
      setLoading(null);
    }
  };

  const handleDebts = async () => {
    setLoading("debts");
    try {
      const debts = await actor.getAllDebts();
      const rows = [
        [
          "Name",
          "Lender",
          "Total Amount",
          "Remaining Balance",
          "EMI Amount",
          "Interest Rate (%)",
          "Due Date",
          "Start Date",
          "Notes",
        ],
      ];
      for (const d of debts) {
        rows.push([
          d.name,
          d.lender,
          fmt(d.totalAmount),
          fmt(d.remainingBalance),
          fmt(d.emiAmount),
          String(d.interestRate),
          formatDate(d.dueDate),
          formatDate(d.startDate),
          d.notes,
        ]);
      }
      downloadCSV("debts_report.csv", rows);
    } finally {
      setLoading(null);
    }
  };

  const handleInvestments = async () => {
    setLoading("investments");
    try {
      const investments = await actor.getAllInvestments();
      const rows = [
        [
          "Name",
          "Type",
          "Amount Invested",
          "Current Value",
          "Profit / Loss",
          "Date",
          "Notes",
        ],
      ];
      for (const inv of investments) {
        const pl = inv.currentValue - inv.amountInvested;
        rows.push([
          inv.name,
          inv.investmentType,
          fmt(inv.amountInvested),
          fmt(inv.currentValue),
          fmt(pl),
          formatDate(inv.date),
          inv.notes,
        ]);
      }
      downloadCSV("investments_report.csv", rows);
    } finally {
      setLoading(null);
    }
  };

  const handleGoals = async () => {
    setLoading("goals");
    try {
      const goals = await actor.getAllGoals();
      const rows = [
        [
          "Name",
          "Target Amount",
          "Current Amount",
          "Progress (%)",
          "Monthly Contribution",
          "Deadline",
          "Notes",
        ],
      ];
      for (const g of goals) {
        const progress =
          g.targetAmount > 0
            ? ((g.currentAmount / g.targetAmount) * 100).toFixed(1)
            : "0.0";
        rows.push([
          g.name,
          fmt(g.targetAmount),
          fmt(g.currentAmount),
          progress,
          fmt(g.monthlyContribution),
          formatDate(g.deadline),
          g.notes,
        ]);
      }
      downloadCSV("goals_report.csv", rows);
    } finally {
      setLoading(null);
    }
  };

  const handleBudget = async () => {
    setLoading("budget");
    try {
      const [budgets, categories] = await Promise.all([
        actor.getAllBudgets(),
        actor.getAllCategories(),
      ]);
      const rows = [
        ["Month", "Category", "Limit", "Spent", "Remaining", "Status"],
      ];
      for (const b of budgets) {
        const cat = categories.find((c) => c.id === b.categoryId)?.name ?? "";
        const remaining = b.limitAmount - b.spentAmount;
        const status =
          b.spentAmount > b.limitAmount ? "Over Budget" : "Within Budget";
        rows.push([
          b.month,
          cat,
          fmt(b.limitAmount),
          fmt(b.spentAmount),
          fmt(remaining),
          status,
        ]);
      }
      downloadCSV("budget_report.csv", rows);
    } finally {
      setLoading(null);
    }
  };

  const handleCompleteReport = async () => {
    setLoading("complete");
    try {
      const [txs, accounts, categories, debts, investments, goals, budgets] =
        await Promise.all([
          actor.getAllTransactions(),
          actor.getAllAccounts(),
          actor.getAllCategories(),
          actor.getAllDebts(),
          actor.getAllInvestments(),
          actor.getAllGoals(),
          actor.getAllBudgets(),
        ]);

      const rows: string[][] = [];

      rows.push(["===== FINANCEFLOW COMPLETE FINANCIAL REPORT ====="]);
      rows.push([`Generated on: ${new Date().toLocaleDateString("en-IN")}`]);
      rows.push([]);

      // Accounts
      rows.push(["--- ACCOUNTS ---"]);
      rows.push(["Name", "Type", "Balance", "Notes"]);
      for (const a of accounts)
        rows.push([a.name, a.accountType, fmt(a.balance), a.notes]);
      const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
      rows.push(["Total Balance", "", fmt(totalBalance), ""]);
      rows.push([]);

      // Transactions
      rows.push(["--- TRANSACTIONS ---"]);
      rows.push([
        "Type",
        "Amount",
        "Date",
        "Category",
        "Source",
        "Account",
        "Notes",
      ]);
      for (const t of txs.sort((a, b) => Number(b.date) - Number(a.date))) {
        const cat = categories.find((c) => c.id === t.categoryId)?.name ?? "";
        const acc = accounts.find((a) => a.id === t.accountId)?.name ?? "";
        rows.push([
          t.transactionType,
          fmt(t.amount),
          formatDate(t.date),
          cat,
          t.source,
          acc,
          t.notes,
        ]);
      }
      rows.push([]);

      // Debts
      rows.push(["--- DEBTS ---"]);
      rows.push([
        "Name",
        "Lender",
        "Total Amount",
        "Remaining Balance",
        "EMI",
        "Interest Rate (%)",
        "Due Date",
        "Notes",
      ]);
      for (const d of debts) {
        rows.push([
          d.name,
          d.lender,
          fmt(d.totalAmount),
          fmt(d.remainingBalance),
          fmt(d.emiAmount),
          String(d.interestRate),
          formatDate(d.dueDate),
          d.notes,
        ]);
      }
      const totalDebt = debts.reduce((s, d) => s + d.remainingBalance, 0);
      rows.push([
        "Total Remaining Debt",
        "",
        fmt(totalDebt),
        "",
        "",
        "",
        "",
        "",
      ]);
      rows.push([]);

      // Investments
      rows.push(["--- INVESTMENTS ---"]);
      rows.push([
        "Name",
        "Type",
        "Amount Invested",
        "Current Value",
        "Profit / Loss",
        "Date",
        "Notes",
      ]);
      for (const inv of investments) {
        rows.push([
          inv.name,
          inv.investmentType,
          fmt(inv.amountInvested),
          fmt(inv.currentValue),
          fmt(inv.currentValue - inv.amountInvested),
          formatDate(inv.date),
          inv.notes,
        ]);
      }
      const totalInvested = investments.reduce(
        (s, i) => s + i.amountInvested,
        0,
      );
      const totalCurrentValue = investments.reduce(
        (s, i) => s + i.currentValue,
        0,
      );
      rows.push([
        "Total Invested",
        "",
        fmt(totalInvested),
        fmt(totalCurrentValue),
        fmt(totalCurrentValue - totalInvested),
        "",
        "",
      ]);
      rows.push([]);

      // Goals
      rows.push(["--- GOALS ---"]);
      rows.push([
        "Name",
        "Target Amount",
        "Current Amount",
        "Progress (%)",
        "Monthly Contribution",
        "Deadline",
        "Notes",
      ]);
      for (const g of goals) {
        const progress =
          g.targetAmount > 0
            ? ((g.currentAmount / g.targetAmount) * 100).toFixed(1)
            : "0.0";
        rows.push([
          g.name,
          fmt(g.targetAmount),
          fmt(g.currentAmount),
          progress,
          fmt(g.monthlyContribution),
          formatDate(g.deadline),
          g.notes,
        ]);
      }
      rows.push([]);

      // Budget
      rows.push(["--- BUDGET ---"]);
      rows.push(["Month", "Category", "Limit", "Spent", "Remaining", "Status"]);
      for (const b of budgets) {
        const cat = categories.find((c) => c.id === b.categoryId)?.name ?? "";
        const remaining = b.limitAmount - b.spentAmount;
        rows.push([
          b.month,
          cat,
          fmt(b.limitAmount),
          fmt(b.spentAmount),
          fmt(remaining),
          b.spentAmount > b.limitAmount ? "Over Budget" : "Within Budget",
        ]);
      }
      rows.push([]);

      // Net Worth summary
      const netWorth = totalBalance + totalCurrentValue - totalDebt;
      rows.push(["--- NET WORTH SUMMARY ---"]);
      rows.push(["Total Account Balance", fmt(totalBalance)]);
      rows.push(["Total Investments (Current Value)", fmt(totalCurrentValue)]);
      rows.push(["Total Debts (Remaining)", fmt(totalDebt)]);
      rows.push(["Net Worth", fmt(netWorth)]);

      downloadCSV("financeflow_complete_report.csv", rows);
    } finally {
      setLoading(null);
    }
  };

  const reports = [
    {
      key: "transactions",
      title: "Transactions",
      description:
        "All income and expense transactions with categories and accounts.",
      icon: <Receipt className="w-5 h-5 text-blue-500" />,
      onDownload: handleTransactions,
    },
    {
      key: "accounts",
      title: "Accounts",
      description:
        "Account balances and types (bank, cash, credit card, etc.).",
      icon: <Landmark className="w-5 h-5 text-green-500" />,
      onDownload: handleAccounts,
    },
    {
      key: "debts",
      title: "Debts",
      description:
        "All loans and EMIs with remaining balances and interest rates.",
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      onDownload: handleDebts,
    },
    {
      key: "investments",
      title: "Investments",
      description:
        "Portfolio with invested amounts, current values, and profit/loss.",
      icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
      onDownload: handleInvestments,
    },
    {
      key: "goals",
      title: "Goals",
      description: "Financial goals with progress and monthly contributions.",
      icon: <Target className="w-5 h-5 text-orange-500" />,
      onDownload: handleGoals,
    },
    {
      key: "budget",
      title: "Budget",
      description: "Monthly budget limits vs. actual spending by category.",
      icon: <Calculator className="w-5 h-5 text-teal-500" />,
      onDownload: handleBudget,
    },
  ];

  return (
    <div data-ocid="reports.page" className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Financial Reports</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Download your financial data as CSV files, compatible with Excel,
          Google Sheets, and any spreadsheet app.
        </p>
      </div>

      {/* Complete Report */}
      <Card className="border-primary/40 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileDown className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">
                Complete Financial Report
              </CardTitle>
              <CardDescription className="text-sm">
                Download all sections — accounts, transactions, debts,
                investments, goals, budget, and net worth — in a single file.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            data-ocid="reports.complete.button"
            className="w-full sm:w-auto"
            onClick={handleCompleteReport}
            disabled={loading === "complete"}
          >
            <Download className="w-4 h-4 mr-2" />
            {loading === "complete"
              ? "Preparing..."
              : "Download Complete Report"}
          </Button>
        </CardContent>
      </Card>

      {/* Individual Reports */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Individual Reports
        </h2>
        <div className="grid gap-3">
          {reports.map((r) => (
            <Card key={r.key} data-ocid={`reports.${r.key}.card`}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">{r.icon}</div>
                  <div>
                    <p className="font-medium text-sm">{r.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.description}
                    </p>
                  </div>
                </div>
                <Button
                  data-ocid={`reports.${r.key}.button`}
                  variant="outline"
                  size="sm"
                  onClick={r.onDownload}
                  disabled={loading === r.key}
                >
                  <FileSpreadsheet className="w-4 h-4 mr-1" />
                  {loading === r.key ? "..." : "CSV"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
