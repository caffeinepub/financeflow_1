import { c as createLucideIcon, u as useCurrency, r as reactExports, j as jsxRuntimeExports, B as Button, A as ArrowLeftRight, W as Wallet, T as TrendingUp, C as CreditCard } from "./index-D3nWW5Ka.js";
import { C as Card, a as CardContent } from "./card-C_JZKCPn.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, I as Input, d as DialogFooter } from "./input-pupmGTHL.js";
import { L as Label } from "./label-ChJctfb6.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B2LIUCYV.js";
import { f as formatCurrencyWithCode } from "./format-sdpVhtgG.js";
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
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2", key: "76otgf" }],
  ["path", { d: "M9 22v-4h6v4", key: "r93iot" }],
  ["path", { d: "M8 6h.01", key: "1dz90k" }],
  ["path", { d: "M16 6h.01", key: "1x0f13" }],
  ["path", { d: "M12 6h.01", key: "1vi96p" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }]
];
const Building = createLucideIcon("building", __iconNode);
const accountTypeIcons = {
  bank: /* @__PURE__ */ jsxRuntimeExports.jsx(Building, { className: "w-5 h-5" }),
  cash: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5" }),
  credit_card: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5" }),
  investment: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5" })
};
const accountTypeColors = {
  bank: "bg-blue-500/10 text-blue-600",
  cash: "bg-green-500/10 text-green-600",
  credit_card: "bg-red-500/10 text-red-600",
  investment: "bg-purple-500/10 text-purple-600"
};
const emptyForm = { name: "", accountType: "bank", balance: "", notes: "" };
function Accounts({ actor }) {
  const { currency } = useCurrency();
  const [accounts, setAccounts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [slowLoad, setSlowLoad] = reactExports.useState(false);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [transferOpen, setTransferOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm);
  const [transfer, setTransfer] = reactExports.useState({
    fromId: "",
    toId: "",
    amount: ""
  });
  const [saving, setSaving] = reactExports.useState(false);
  const [totalBalance, setTotalBalance] = reactExports.useState(0);
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [accs, bal] = await Promise.all([
        actor.getAllAccounts(),
        actor.getTotalBalance()
      ]);
      setAccounts(accs);
      setTotalBalance(bal);
    } catch (e) {
      console.error(e);
      setError("Failed to load accounts. Please try again.");
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
  const openEdit = (a) => {
    setForm({
      name: a.name,
      accountType: a.accountType,
      balance: String(a.balance),
      notes: a.notes
    });
    setEditingId(a.id);
    setDialogOpen(true);
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      const bal = Number.parseFloat(form.balance) || 0;
      if (editingId !== null) {
        await actor.updateAccount(
          editingId,
          form.name,
          form.accountType,
          bal,
          form.notes
        );
      } else {
        await actor.createAccount(form.name, form.accountType, bal, form.notes);
      }
      setDialogOpen(false);
      load();
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this account?")) return;
    await actor.deleteAccount(id);
    load();
  };
  const handleTransfer = async () => {
    setSaving(true);
    try {
      await actor.transferBetweenAccounts(
        BigInt(transfer.fromId),
        BigInt(transfer.toId),
        Number.parseFloat(transfer.amount)
      );
      setTransferOpen(false);
      setTransfer({ fromId: "", toId: "", amount: "" });
      load();
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "accounts.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Accounts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
          "Total Balance:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-green-600", children: formatCurrencyWithCode(totalBalance, currency) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "accounts.transfer.button",
            variant: "outline",
            size: "sm",
            onClick: () => setTransferOpen(true),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftRight, { className: "w-4 h-4 mr-1" }),
              " Transfer"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "accounts.add_button", size: "sm", onClick: openAdd, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
          " Add Account"
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
          "data-ocid": "accounts.retry.button",
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
        "data-ocid": "accounts.loading_state",
        className: "flex flex-col items-center justify-center py-12 gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }),
          slowLoad && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-2", children: "Backend is waking up, this may take up to 30 seconds..." })
        ]
      }
    ) : accounts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "accounts.empty_state",
        className: "text-center py-16 text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No accounts yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Add your first account to get started" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: accounts.map((acc, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        "data-ocid": `accounts.item.${i + 1}`,
        className: "border",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `p-2 rounded-lg ${accountTypeColors[acc.accountType] ?? "bg-muted text-muted-foreground"}`,
                  children: accountTypeIcons[acc.accountType] ?? /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: acc.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground capitalize", children: acc.accountType.replace("_", " ") })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": `accounts.edit_button.${i + 1}`,
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8",
                  onClick: () => openEdit(acc),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": `accounts.delete_button.${i + 1}`,
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-destructive",
                  onClick: () => handleDelete(acc.id),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `text-2xl font-bold ${acc.balance >= 0 ? "text-green-600" : "text-red-500"}`,
                children: formatCurrencyWithCode(acc.balance, currency)
              }
            ),
            acc.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: acc.notes })
          ] })
        ] })
      },
      String(acc.id)
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "accounts.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingId ? "Edit Account" : "Add Account" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "accounts.name.input",
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              placeholder: "e.g. Main Checking"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.accountType,
              onValueChange: (v) => setForm((f) => ({ ...f, accountType: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "accounts.type.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bank", children: "Bank Account" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cash", children: "Cash Wallet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "credit_card", children: "Credit Card" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "investment", children: "Investment Account" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Balance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "accounts.balance.input",
              type: "number",
              value: form.balance,
              onChange: (e) => setForm((f) => ({ ...f, balance: e.target.value })),
              placeholder: "0.00"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "accounts.notes.input",
              value: form.notes,
              onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value })),
              placeholder: "Optional notes"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "accounts.cancel_button",
            variant: "outline",
            onClick: () => setDialogOpen(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "accounts.save_button",
            onClick: handleSave,
            disabled: saving || !form.name,
            children: saving ? "Saving..." : "Save"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: transferOpen, onOpenChange: setTransferOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "accounts.transfer.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Transfer Between Accounts" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "From Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: transfer.fromId,
              onValueChange: (v) => setTransfer((t) => ({ ...t, fromId: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "accounts.transfer.from.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select account" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: accounts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(a.id), children: a.name }, String(a.id))) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "To Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: transfer.toId,
              onValueChange: (v) => setTransfer((t) => ({ ...t, toId: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "accounts.transfer.to.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select account" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: accounts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(a.id), children: a.name }, String(a.id))) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "accounts.transfer.amount.input",
              type: "number",
              value: transfer.amount,
              onChange: (e) => setTransfer((t) => ({ ...t, amount: e.target.value })),
              placeholder: "0.00"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "accounts.transfer.cancel_button",
            variant: "outline",
            onClick: () => setTransferOpen(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "accounts.transfer.confirm_button",
            onClick: handleTransfer,
            disabled: saving || !transfer.fromId || !transfer.toId || !transfer.amount,
            children: "Transfer"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Accounts as default
};
