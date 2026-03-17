import { u as useCurrency, r as reactExports, j as jsxRuntimeExports, B as Button, T as TrendingUp } from "./index-D3nWW5Ka.js";
import { B as Badge } from "./badge-YmrGwnIq.js";
import { C as Card, a as CardContent } from "./card-C_JZKCPn.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, I as Input, d as DialogFooter } from "./input-pupmGTHL.js";
import { L as Label } from "./label-ChJctfb6.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B2LIUCYV.js";
import { T as Textarea } from "./textarea-CTPw2aF6.js";
import { f as formatCurrencyWithCode, b as formatDate } from "./format-sdpVhtgG.js";
import { P as Plus } from "./plus-CTgU_Sdn.js";
import { R as RefreshCw } from "./refresh-cw-y8omMc07.js";
import { T as TrendingDown } from "./trending-down-CGcL5qTM.js";
import { P as Pencil, T as Trash2 } from "./trash-2-L933QZ2B.js";
const emptyForm = {
  name: "",
  investmentType: "stock",
  amountInvested: "",
  currentValue: "",
  date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  notes: ""
};
function Investments({ actor }) {
  const { currency } = useCurrency();
  const [investments, setInvestments] = reactExports.useState([]);
  const [portfolio, setPortfolio] = reactExports.useState({
    totalInvested: 0,
    totalCurrentValue: 0,
    totalProfitLoss: 0
  });
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [slowLoad, setSlowLoad] = reactExports.useState(false);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm);
  const [saving, setSaving] = reactExports.useState(false);
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [invs, pf] = await Promise.all([
        actor.getAllInvestments(),
        actor.getPortfolioSummary()
      ]);
      setInvestments(invs);
      setPortfolio(pf);
    } catch (e) {
      console.error(e);
      setError("Failed to load investments. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    load();
  }, [actor]);
  reactExports.useEffect(() => {
    if (!loading) {
      setSlowLoad(false);
      return;
    }
    const t = setTimeout(() => setSlowLoad(true), 5e3);
    return () => clearTimeout(t);
  }, [loading]);
  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setDialogOpen(true);
  };
  const openEdit = (inv) => {
    setForm({
      name: inv.name,
      investmentType: inv.investmentType,
      amountInvested: String(inv.amountInvested),
      currentValue: String(inv.currentValue),
      date: new Date(Number(inv.date)).toISOString().slice(0, 10),
      notes: inv.notes
    });
    setEditingId(inv.id);
    setDialogOpen(true);
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      const dateTs = BigInt(new Date(form.date).getTime());
      if (editingId !== null) {
        await actor.updateInvestment(
          editingId,
          form.name,
          form.investmentType,
          Number.parseFloat(form.amountInvested),
          Number.parseFloat(form.currentValue),
          dateTs,
          form.notes
        );
      } else {
        await actor.createInvestment(
          form.name,
          form.investmentType,
          Number.parseFloat(form.amountInvested),
          Number.parseFloat(form.currentValue),
          dateTs,
          form.notes
        );
      }
      setDialogOpen(false);
      load();
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this investment?")) return;
    await actor.deleteInvestment(id);
    load();
  };
  const typeColors = {
    stock: "bg-blue-500/10 text-blue-600",
    mutual_fund: "bg-purple-500/10 text-purple-600",
    etf: "bg-indigo-500/10 text-indigo-600",
    gold: "bg-yellow-500/10 text-yellow-600",
    crypto: "bg-orange-500/10 text-orange-600"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "investments.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Investments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "investments.add_button", size: "sm", onClick: openAdd, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
        "Add Investment"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Invested" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-blue-600", children: formatCurrencyWithCode(portfolio.totalInvested, currency) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Current Value" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", children: formatCurrencyWithCode(portfolio.totalCurrentValue, currency) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Profit / Loss" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: `text-lg font-bold ${portfolio.totalProfitLoss >= 0 ? "text-green-600" : "text-red-500"}`,
            children: [
              portfolio.totalProfitLoss >= 0 ? "+" : "",
              formatCurrencyWithCode(portfolio.totalProfitLoss, currency)
            ]
          }
        )
      ] }) })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 gap-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-medium", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: load,
          "data-ocid": "investments.retry.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
            " Retry"
          ]
        }
      )
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "investments.loading_state",
        className: "flex flex-col items-center justify-center py-12 gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }),
          slowLoad && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-2", children: "Backend is waking up, this may take up to 30 seconds..." })
        ]
      }
    ) : investments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "investments.empty_state",
        className: "text-center py-16 text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No investments tracked" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: investments.map((inv, i) => {
      const pl = inv.currentValue - inv.amountInvested;
      const plPct = inv.amountInvested > 0 ? pl / inv.amountInvested * 100 : 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `investments.item.${i + 1}`,
          className: "flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/30 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: typeColors[inv.investmentType] ?? "",
                  variant: "secondary",
                  children: inv.investmentType.replace("_", " ").toUpperCase()
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: inv.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  formatDate(inv.date),
                  inv.notes ? ` · ${inv.notes}` : ""
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right hidden md:block", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Invested:",
                  " ",
                  formatCurrencyWithCode(inv.amountInvested, currency)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
                  "Value:",
                  " ",
                  formatCurrencyWithCode(inv.currentValue, currency)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `text-right ${pl >= 0 ? "text-green-600" : "text-red-500"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                      pl >= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: formatCurrencyWithCode(Math.abs(pl), currency) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", children: [
                      plPct >= 0 ? "+" : "",
                      plPct.toFixed(1),
                      "%"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": `investments.edit_button.${i + 1}`,
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8",
                    onClick: () => openEdit(inv),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": `investments.delete_button.${i + 1}`,
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-destructive",
                    onClick: () => handleDelete(inv.id),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] })
          ]
        },
        String(inv.id)
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "investments.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        editingId ? "Edit" : "Add",
        " Investment"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "investments.name.input",
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              placeholder: "e.g. Apple Stock"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.investmentType,
              onValueChange: (v) => setForm((f) => ({ ...f, investmentType: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "investments.type.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "stock", children: "Stock" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "mutual_fund", children: "Mutual Fund" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "etf", children: "ETF" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "gold", children: "Gold" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "crypto", children: "Crypto" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount Invested" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "investments.invested.input",
                type: "number",
                value: form.amountInvested,
                onChange: (e) => setForm((f) => ({ ...f, amountInvested: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Current Value" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "investments.value.input",
                type: "number",
                value: form.currentValue,
                onChange: (e) => setForm((f) => ({ ...f, currentValue: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "investments.date.input",
              type: "date",
              value: form.date,
              onChange: (e) => setForm((f) => ({ ...f, date: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              "data-ocid": "investments.notes.textarea",
              value: form.notes,
              onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value })),
              rows: 2
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "investments.cancel_button",
            variant: "outline",
            onClick: () => setDialogOpen(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "investments.save_button",
            onClick: handleSave,
            disabled: saving || !form.name || !form.amountInvested,
            children: saving ? "Saving..." : "Save"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Investments as default
};
