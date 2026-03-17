import { u as useCurrency, r as reactExports, j as jsxRuntimeExports, B as Button, o as TriangleAlert } from "./index-D3nWW5Ka.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-C_JZKCPn.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, I as Input, d as DialogFooter } from "./input-pupmGTHL.js";
import { L as Label } from "./label-ChJctfb6.js";
import { P as Progress } from "./progress-BzHIXvg6.js";
import { T as Textarea } from "./textarea-CTPw2aF6.js";
import { f as formatCurrencyWithCode, b as formatDate } from "./format-sdpVhtgG.js";
import { P as Plus } from "./plus-CTgU_Sdn.js";
import { R as RefreshCw } from "./refresh-cw-y8omMc07.js";
import { D as DollarSign } from "./dollar-sign-dKVdmCrY.js";
import { P as Pencil, T as Trash2 } from "./trash-2-L933QZ2B.js";
const emptyForm = {
  name: "",
  lender: "",
  totalAmount: "",
  interestRate: "",
  emiAmount: "",
  dueDate: "",
  remainingBalance: "",
  startDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  notes: ""
};
function Debts({ actor }) {
  const { currency } = useCurrency();
  const [debts, setDebts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [slowLoad, setSlowLoad] = reactExports.useState(false);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [paymentOpen, setPaymentOpen] = reactExports.useState(null);
  const [paymentAmount, setPaymentAmount] = reactExports.useState("");
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm);
  const [saving, setSaving] = reactExports.useState(false);
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setDebts(await actor.getAllDebts());
    } catch (e) {
      console.error(e);
      setError("Failed to load debts. Please try again.");
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
  const openEdit = (d) => {
    setForm({
      name: d.name,
      lender: d.lender,
      totalAmount: String(d.totalAmount),
      interestRate: String(d.interestRate),
      emiAmount: String(d.emiAmount),
      dueDate: new Date(Number(d.dueDate)).toISOString().slice(0, 10),
      remainingBalance: String(d.remainingBalance),
      startDate: new Date(Number(d.startDate)).toISOString().slice(0, 10),
      notes: d.notes
    });
    setEditingId(d.id);
    setDialogOpen(true);
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      const totalAmount = Number.parseFloat(form.totalAmount);
      const remaining = Number.parseFloat(form.remainingBalance) || totalAmount;
      const dueDate = BigInt(new Date(form.dueDate || Date.now()).getTime());
      const startDate = BigInt(new Date(form.startDate).getTime());
      if (editingId !== null) {
        await actor.updateDebt(
          editingId,
          form.name,
          form.lender,
          totalAmount,
          Number.parseFloat(form.interestRate) || 0,
          Number.parseFloat(form.emiAmount) || 0,
          dueDate,
          remaining,
          startDate,
          form.notes
        );
      } else {
        await actor.createDebt(
          form.name,
          form.lender,
          totalAmount,
          Number.parseFloat(form.interestRate) || 0,
          Number.parseFloat(form.emiAmount) || 0,
          dueDate,
          remaining,
          startDate,
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
    if (!confirm("Delete this debt?")) return;
    await actor.deleteDebt(id);
    load();
  };
  const handlePayment = async (debtId) => {
    const amount = Number.parseFloat(paymentAmount);
    if (!amount) return;
    setSaving(true);
    try {
      await actor.recordDebtPayment(debtId, amount);
      setPaymentOpen(null);
      setPaymentAmount("");
      load();
    } finally {
      setSaving(false);
    }
  };
  const totalDebt = debts.reduce((sum, d) => sum + d.remainingBalance, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "debts.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Debts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
          "Total remaining:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-red-500", children: formatCurrencyWithCode(totalDebt, currency) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "debts.add_button", size: "sm", onClick: openAdd, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
        "Add Debt"
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 gap-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-medium", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: load,
          "data-ocid": "debts.retry.button",
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
        "data-ocid": "debts.loading_state",
        className: "flex flex-col items-center justify-center py-12 gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }),
          slowLoad && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-2", children: "Backend is waking up, this may take up to 30 seconds..." })
        ]
      }
    ) : debts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "debts.empty_state",
        className: "text-center py-16 text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No debts tracked" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: debts.map((d, i) => {
      const paidPct = Math.round(
        (d.totalAmount - d.remainingBalance) / d.totalAmount * 100
      );
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          "data-ocid": `debts.item.${i + 1}`,
          className: "border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: d.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: d.lender })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": `debts.pay_button.${i + 1}`,
                    variant: "outline",
                    size: "sm",
                    onClick: () => {
                      setPaymentOpen(d.id);
                      setPaymentAmount(String(d.emiAmount));
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-3 h-3 mr-1" }),
                      "Pay"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": `debts.edit_button.${i + 1}`,
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8",
                    onClick: () => openEdit(d),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": `debts.delete_button.${i + 1}`,
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-destructive",
                    onClick: () => handleDelete(d.id),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    formatCurrencyWithCode(d.remainingBalance, currency),
                    " ",
                    "remaining"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-green-600", children: [
                    paidPct,
                    "% paid"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: paidPct, className: "h-2" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: formatCurrencyWithCode(d.totalAmount, currency) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "EMI" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: formatCurrencyWithCode(d.emiAmount, currency) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Rate" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
                    d.interestRate,
                    "%"
                  ] })
                ] })
              ] }),
              d.dueDate > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Due: ",
                formatDate(d.dueDate)
              ] })
            ] })
          ]
        },
        String(d.id)
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        "data-ocid": "debts.dialog",
        className: "max-h-[90vh] overflow-y-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
            editingId ? "Edit" : "Add",
            " Debt"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Debt Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "debts.name.input",
                    value: form.name,
                    onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                    placeholder: "e.g. Home Loan"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Lender" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "debts.lender.input",
                    value: form.lender,
                    onChange: (e) => setForm((f) => ({ ...f, lender: e.target.value })),
                    placeholder: "Bank name"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Total Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "debts.total.input",
                    type: "number",
                    value: form.totalAmount,
                    onChange: (e) => setForm((f) => ({ ...f, totalAmount: e.target.value }))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Remaining Balance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "debts.remaining.input",
                    type: "number",
                    value: form.remainingBalance,
                    onChange: (e) => setForm((f) => ({ ...f, remainingBalance: e.target.value }))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Interest Rate (%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "debts.rate.input",
                    type: "number",
                    value: form.interestRate,
                    onChange: (e) => setForm((f) => ({ ...f, interestRate: e.target.value }))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "EMI Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "debts.emi.input",
                    type: "number",
                    value: form.emiAmount,
                    onChange: (e) => setForm((f) => ({ ...f, emiAmount: e.target.value }))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Start Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "debts.startdate.input",
                    type: "date",
                    value: form.startDate,
                    onChange: (e) => setForm((f) => ({ ...f, startDate: e.target.value }))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Due Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "debts.duedate.input",
                    type: "date",
                    value: form.dueDate,
                    onChange: (e) => setForm((f) => ({ ...f, dueDate: e.target.value }))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  "data-ocid": "debts.notes.textarea",
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
                "data-ocid": "debts.cancel_button",
                variant: "outline",
                onClick: () => setDialogOpen(false),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "debts.save_button",
                onClick: handleSave,
                disabled: saving || !form.name || !form.totalAmount,
                children: saving ? "Saving..." : "Save"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: paymentOpen !== null,
        onOpenChange: () => setPaymentOpen(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "debts.payment.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Record Payment" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Payment Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "debts.payment.amount.input",
                type: "number",
                value: paymentAmount,
                onChange: (e) => setPaymentAmount(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "debts.payment.cancel_button",
                variant: "outline",
                onClick: () => setPaymentOpen(null),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "debts.payment.confirm_button",
                onClick: () => paymentOpen !== null && handlePayment(paymentOpen),
                disabled: saving,
                children: "Confirm Payment"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Debts as default
};
