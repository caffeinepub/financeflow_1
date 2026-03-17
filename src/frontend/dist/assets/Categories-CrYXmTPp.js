import { r as reactExports, j as jsxRuntimeExports, B as Button, n as Tag } from "./index-D3nWW5Ka.js";
import { B as Badge } from "./badge-YmrGwnIq.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, I as Input, d as DialogFooter } from "./input-pupmGTHL.js";
import { L as Label } from "./label-ChJctfb6.js";
import { P as Plus } from "./plus-CTgU_Sdn.js";
import { R as RefreshCw } from "./refresh-cw-y8omMc07.js";
import { P as Pencil, T as Trash2 } from "./trash-2-L933QZ2B.js";
const emptyForm = { name: "", color: "#6366f1" };
function Categories({ actor }) {
  const [categories, setCategories] = reactExports.useState([]);
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
      setCategories(await actor.getAllCategories());
    } catch (e) {
      console.error(e);
      setError("Failed to load categories. Please try again.");
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
  const openEdit = (c) => {
    setForm({ name: c.name, color: c.color });
    setEditingId(c.id);
    setDialogOpen(true);
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId !== null) {
        await actor.updateCategory(editingId, form.name, form.color, false);
      } else {
        await actor.createCategory(form.name, form.color, false);
      }
      setDialogOpen(false);
      load();
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    await actor.deleteCategory(id);
    load();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "categories.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Categories" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "categories.add_button", size: "sm", onClick: openAdd, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
        "Add Category"
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 gap-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-medium", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: load,
          "data-ocid": "categories.retry.button",
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
        "data-ocid": "categories.loading_state",
        className: "flex flex-col items-center justify-center py-12 gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }),
          slowLoad && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-2", children: "Backend is waking up, this may take up to 30 seconds..." })
        ]
      }
    ) : categories.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "categories.empty_state",
        className: "text-center py-16 text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No categories yet" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: categories.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `categories.item.${i + 1}`,
        className: "p-4 rounded-xl border bg-card flex items-center gap-3 group hover:shadow-md transition-shadow",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
              style: {
                background: `${c.color}22`,
                border: `2px solid ${c.color}`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-4 h-4 rounded-full",
                  style: { background: c.color }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm truncate", children: c.name }),
            c.isDefault && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Default" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": `categories.edit_button.${i + 1}`,
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7",
                onClick: () => openEdit(c),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" })
              }
            ),
            !c.isDefault && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": `categories.delete_button.${i + 1}`,
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-destructive",
                onClick: () => handleDelete(c.id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
              }
            )
          ] })
        ]
      },
      String(c.id)
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "categories.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        editingId ? "Edit" : "Add",
        " Category"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "categories.name.input",
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              placeholder: "Category name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Color" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "color",
                value: form.color,
                onChange: (e) => setForm((f) => ({ ...f, color: e.target.value })),
                className: "w-10 h-10 rounded cursor-pointer border"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "categories.color.input",
                value: form.color,
                onChange: (e) => setForm((f) => ({ ...f, color: e.target.value })),
                className: "flex-1"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "categories.cancel_button",
            variant: "outline",
            onClick: () => setDialogOpen(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "categories.save_button",
            onClick: handleSave,
            disabled: saving || !form.name,
            children: saving ? "Saving..." : "Save"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  Categories as default
};
