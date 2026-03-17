import { c as createLucideIcon, u as useCurrency, r as reactExports, j as jsxRuntimeExports, B as Button, p as Target } from "./index-D3nWW5Ka.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-C_JZKCPn.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, I as Input, d as DialogFooter } from "./input-pupmGTHL.js";
import { L as Label } from "./label-ChJctfb6.js";
import { P as Progress } from "./progress-BzHIXvg6.js";
import { T as Textarea } from "./textarea-CTPw2aF6.js";
import { f as formatCurrencyWithCode, b as formatDate } from "./format-sdpVhtgG.js";
import { P as Plus } from "./plus-CTgU_Sdn.js";
import { R as RefreshCw } from "./refresh-cw-y8omMc07.js";
import { P as Pencil, T as Trash2 } from "./trash-2-L933QZ2B.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode);
const emptyForm = {
  name: "",
  targetAmount: "",
  currentAmount: "",
  deadline: "",
  monthlyContribution: "",
  notes: ""
};
function Goals({ actor }) {
  const { currency } = useCurrency();
  const [goals, setGoals] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [slowLoad, setSlowLoad] = reactExports.useState(false);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [contributeOpen, setContributeOpen] = reactExports.useState(null);
  const [contributeAmount, setContributeAmount] = reactExports.useState("");
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm);
  const [saving, setSaving] = reactExports.useState(false);
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setGoals(await actor.getAllGoals());
    } catch (e) {
      console.error(e);
      setError("Failed to load goals. Please try again.");
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
  const openEdit = (g) => {
    setForm({
      name: g.name,
      targetAmount: String(g.targetAmount),
      currentAmount: String(g.currentAmount),
      deadline: new Date(Number(g.deadline)).toISOString().slice(0, 10),
      monthlyContribution: String(g.monthlyContribution),
      notes: g.notes
    });
    setEditingId(g.id);
    setDialogOpen(true);
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      const deadline = BigInt(new Date(form.deadline || Date.now()).getTime());
      if (editingId !== null) {
        await actor.updateGoal(
          editingId,
          form.name,
          Number.parseFloat(form.targetAmount),
          Number.parseFloat(form.currentAmount) || 0,
          deadline,
          Number.parseFloat(form.monthlyContribution) || 0,
          form.notes
        );
      } else {
        await actor.createGoal(
          form.name,
          Number.parseFloat(form.targetAmount),
          Number.parseFloat(form.currentAmount) || 0,
          deadline,
          Number.parseFloat(form.monthlyContribution) || 0,
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
    if (!confirm("Delete this goal?")) return;
    await actor.deleteGoal(id);
    load();
  };
  const handleContribute = async (goalId) => {
    const amount = Number.parseFloat(contributeAmount);
    if (!amount) return;
    setSaving(true);
    try {
      await actor.contributeToGoal(goalId, amount);
      setContributeOpen(null);
      setContributeAmount("");
      load();
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "goals.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Financial Goals" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "goals.add_button", size: "sm", onClick: openAdd, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
        "Add Goal"
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 gap-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-medium", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: load,
          "data-ocid": "goals.retry.button",
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
        "data-ocid": "goals.loading_state",
        className: "flex flex-col items-center justify-center py-12 gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }),
          slowLoad && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-2", children: "Backend is waking up, this may take up to 30 seconds..." })
        ]
      }
    ) : goals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "goals.empty_state",
        className: "text-center py-16 text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No goals yet" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: goals.map((g, i) => {
      const pct = Math.min(
        100,
        Math.round(g.currentAmount / g.targetAmount * 100)
      );
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          "data-ocid": `goals.item.${i + 1}`,
          className: "border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: g.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": `goals.contribute_button.${i + 1}`,
                    variant: "outline",
                    size: "sm",
                    onClick: () => {
                      setContributeOpen(g.id);
                      setContributeAmount(String(g.monthlyContribution));
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-3 h-3 mr-1" }),
                      "Add"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": `goals.edit_button.${i + 1}`,
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8",
                    onClick: () => openEdit(g),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": `goals.delete_button.${i + 1}`,
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-destructive",
                    onClick: () => handleDelete(g.id),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-blue-600", children: formatCurrencyWithCode(g.currentAmount, currency) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm", children: [
                  "of ",
                  formatCurrencyWithCode(g.targetAmount, currency)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    pct,
                    "% complete"
                  ] }),
                  g.deadline > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "By ",
                    formatDate(g.deadline)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "h-3" })
              ] }),
              g.monthlyContribution > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Monthly contribution:",
                " ",
                formatCurrencyWithCode(g.monthlyContribution, currency)
              ] })
            ] })
          ]
        },
        String(g.id)
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "goals.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        editingId ? "Edit" : "Add",
        " Goal"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Goal Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "goals.name.input",
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              placeholder: "e.g. Emergency Fund"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Target Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "goals.target.input",
                type: "number",
                value: form.targetAmount,
                onChange: (e) => setForm((f) => ({ ...f, targetAmount: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Current Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "goals.current.input",
                type: "number",
                value: form.currentAmount,
                onChange: (e) => setForm((f) => ({ ...f, currentAmount: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Deadline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "goals.deadline.input",
                type: "date",
                value: form.deadline,
                onChange: (e) => setForm((f) => ({ ...f, deadline: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Monthly Contribution" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "goals.contribution.input",
                type: "number",
                value: form.monthlyContribution,
                onChange: (e) => setForm((f) => ({
                  ...f,
                  monthlyContribution: e.target.value
                }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              "data-ocid": "goals.notes.textarea",
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
            "data-ocid": "goals.cancel_button",
            variant: "outline",
            onClick: () => setDialogOpen(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "goals.save_button",
            onClick: handleSave,
            disabled: saving || !form.name || !form.targetAmount,
            children: saving ? "Saving..." : "Save"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: contributeOpen !== null,
        onOpenChange: () => setContributeOpen(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "goals.contribute.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Contribution" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "goals.contribute.amount.input",
                type: "number",
                value: contributeAmount,
                onChange: (e) => setContributeAmount(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "goals.contribute.cancel_button",
                variant: "outline",
                onClick: () => setContributeOpen(null),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "goals.contribute.confirm_button",
                onClick: () => contributeOpen !== null && handleContribute(contributeOpen),
                disabled: saving,
                children: "Contribute"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Goals as default
};
