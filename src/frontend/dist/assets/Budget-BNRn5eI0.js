import { c as createLucideIcon, u as useCurrency, r as reactExports, j as jsxRuntimeExports, B as Button, o as TriangleAlert } from "./index-D3nWW5Ka.js";
import { B as Badge } from "./badge-YmrGwnIq.js";
import { C as Card, a as CardContent } from "./card-C_JZKCPn.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, I as Input, d as DialogFooter } from "./input-pupmGTHL.js";
import { L as Label } from "./label-ChJctfb6.js";
import { P as Progress } from "./progress-BzHIXvg6.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B2LIUCYV.js";
import { a as getCurrentMonth, m as monthLabel, f as formatCurrencyWithCode } from "./format-sdpVhtgG.js";
import { P as Plus } from "./plus-CTgU_Sdn.js";
import { R as RefreshCw } from "./refresh-cw-y8omMc07.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function Budget({ actor }) {
  const { currency } = useCurrency();
  const [month, setMonth] = reactExports.useState(getCurrentMonth());
  const [budgets, setBudgets] = reactExports.useState([]);
  const [categories, setCategories] = reactExports.useState([]);
  const [spending, setSpending] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [slowLoad, setSlowLoad] = reactExports.useState(false);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({ categoryId: "", limitAmount: "" });
  const [saving, setSaving] = reactExports.useState(false);
  const changeMonth = (delta) => {
    const [y, m] = month.split("-").map(Number);
    const d = new Date(y, m - 1 + delta, 1);
    setMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  };
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [allBudgets, cats, spendData] = await Promise.all([
        actor.getAllBudgets(),
        actor.getAllCategories(),
        actor.getCategorySpending(month)
      ]);
      setBudgets(allBudgets.filter((b) => b.month === month));
      setCategories(cats);
      setSpending(spendData);
    } catch (e) {
      console.error(e);
      setError("Failed to load budget data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    load();
  }, [actor, month]);
  reactExports.useEffect(() => {
    if (!loading) {
      setSlowLoad(false);
      return;
    }
    const t = setTimeout(() => setSlowLoad(true), 5e3);
    return () => clearTimeout(t);
  }, [loading]);
  const openAdd = () => {
    setForm({ categoryId: "", limitAmount: "" });
    setEditingId(null);
    setDialogOpen(true);
  };
  const openEdit = (b) => {
    setForm({
      categoryId: String(b.categoryId),
      limitAmount: String(b.limitAmount)
    });
    setEditingId(b.id);
    setDialogOpen(true);
  };
  const handleSave = async () => {
    var _a;
    setSaving(true);
    try {
      const spent = ((_a = spending.find((s) => s.categoryId === BigInt(form.categoryId))) == null ? void 0 : _a.totalSpent) ?? 0;
      if (editingId !== null) {
        await actor.updateBudget(
          editingId,
          BigInt(form.categoryId),
          month,
          Number.parseFloat(form.limitAmount),
          spent
        );
      } else {
        await actor.createBudget(
          BigInt(form.categoryId),
          month,
          Number.parseFloat(form.limitAmount),
          spent
        );
      }
      setDialogOpen(false);
      load();
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this budget?")) return;
    await actor.deleteBudget(id);
    load();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "budget.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Budget" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "budget.prev.button",
            variant: "outline",
            size: "icon",
            onClick: () => changeMonth(-1),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium w-32 text-center", children: monthLabel(month) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "budget.next.button",
            variant: "outline",
            size: "icon",
            onClick: () => changeMonth(1),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "budget.add_button", size: "sm", onClick: openAdd, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
          "Set Budget"
        ] })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 gap-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-medium", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: load,
          "data-ocid": "budget.retry.button",
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
        "data-ocid": "budget.loading_state",
        className: "flex flex-col items-center justify-center py-12 gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }),
          slowLoad && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-2", children: "Backend is waking up, this may take up to 30 seconds..." })
        ]
      }
    ) : budgets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "budget.empty_state",
        className: "text-center py-16 text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
            "No budgets set for ",
            monthLabel(month)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Set spending limits per category" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: budgets.map((b, i) => {
      var _a;
      const cat = categories.find((c) => c.id === b.categoryId);
      const spent = ((_a = spending.find((s) => s.categoryId === b.categoryId)) == null ? void 0 : _a.totalSpent) ?? 0;
      const pct = Math.min(
        100,
        Math.round(spent / b.limitAmount * 100)
      );
      const isOver = spent > b.limitAmount;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          "data-ocid": `budget.item.${i + 1}`,
          className: `border ${isOver ? "border-red-400" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                cat && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-3 h-3 rounded-full",
                    style: { background: cat.color }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: (cat == null ? void 0 : cat.name) ?? "Unknown" }),
                isOver && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 mr-1" }),
                  "Over Budget"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": `budget.edit_button.${i + 1}`,
                    variant: "ghost",
                    size: "sm",
                    className: "h-7 text-xs",
                    onClick: () => openEdit(b),
                    children: "Edit"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": `budget.delete_button.${i + 1}`,
                    variant: "ghost",
                    size: "sm",
                    className: "h-7 text-xs text-destructive",
                    onClick: () => handleDelete(b.id),
                    children: "Delete"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: isOver ? "text-red-500 font-medium" : "text-muted-foreground",
                    children: [
                      formatCurrencyWithCode(spent, currency),
                      " spent"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  "of ",
                  formatCurrencyWithCode(b.limitAmount, currency)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Progress,
                {
                  value: pct,
                  className: `h-2 ${isOver ? "[&>div]:bg-red-500" : ""}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: isOver ? `${formatCurrencyWithCode(spent - b.limitAmount, currency)} over budget` : `${formatCurrencyWithCode(b.limitAmount - spent, currency)} remaining` })
            ] })
          ] })
        },
        String(b.id)
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "budget.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        editingId ? "Edit" : "Set",
        " Budget"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.categoryId,
              onValueChange: (v) => setForm((f) => ({ ...f, categoryId: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "budget.category.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(c.id), children: c.name }, String(c.id))) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Monthly Limit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "budget.limit.input",
              type: "number",
              value: form.limitAmount,
              onChange: (e) => setForm((f) => ({ ...f, limitAmount: e.target.value })),
              placeholder: "0.00"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "budget.cancel_button",
            variant: "outline",
            onClick: () => setDialogOpen(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "budget.save_button",
            onClick: handleSave,
            disabled: saving || !form.categoryId || !form.limitAmount,
            children: saving ? "Saving..." : "Save"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Budget as default
};
