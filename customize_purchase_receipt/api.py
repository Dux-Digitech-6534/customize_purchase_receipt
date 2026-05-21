import frappe
from erpnext.buying.doctype.purchase_order.purchase_order import make_purchase_receipt


@frappe.whitelist()
def custom_make_purchase_receipt(source_name, target_doc=None, args=None):  # ✅ args add kiya

    doc = make_purchase_receipt(source_name, target_doc)

    # 🔥 Custom Field Mapping
    for item in doc.items:
        if item.purchase_order_item:

            po_item = frappe.get_doc("Purchase Order Item", item.purchase_order_item)

            item.custom_rate_without_tax = po_item.custom_rate_without_tax
            item.custom_tax_percent = po_item.custom_tax_percent
            item.custom_tax_amount = po_item.custom_tax_amount
            item.custom_total_tax_amount = po_item.custom_total_tax_amount

    return doc


#Poojashree Code for material indent puchase request create once
import frappe
from frappe.model.document import Document


class MaterialIndent(Document):
    pass


# ✅ BLOCK DUPLICATE MATERIAL REQUEST
def check_duplicate_material_request(doc, method):
    if not doc.custom_material_indent:
        return

    existing = frappe.db.exists("Material Request", {
        "custom_material_indent": doc.custom_material_indent,
        "docstatus": ["!=", 2]  # not cancelled
    })

    if existing:
        frappe.throw(
            f"⚠️ Material Request <b>{existing}</b> already created for Material Indent <b>{doc.custom_material_indent}</b>. Cannot create again.",
            title="Already Created"
        )


# ✅ CLOSE MATERIAL INDENT AFTER MATERIAL REQUEST CREATED
def close_material_indent(doc, method):
    if not doc.custom_material_indent:
        return

    frappe.db.set_value(
        "Material Indent",
        doc.custom_material_indent,
        "custom_status",
        "Purchase Request Raised"
    )
    frappe.db.commit()



# ✅ VALIDATE MATERIAL REQUEST (existing)
def validate_material_request(doc, method):
    for item in doc.items:
        if not (item.custom_material_indent and item.custom_material_indent_item):
            continue

        indent = frappe.get_doc("Material Indent", item.custom_material_indent)

        for row in indent.table_feob:
            if row.name == item.custom_material_indent_item:
                purchase_qty = item.qty or 0
                remaining = (row.qty or 0) - (row.custom_issue_qty or 0)


# ✅ UPDATE PURCHASE QTY IN INDENT (existing)
def update_purchase(doc, method):
    for item in doc.items:
        if not (item.custom_material_indent and item.custom_material_indent_item):
            continue

        indent = frappe.get_doc("Material Indent", item.custom_material_indent)

        for row in indent.table_feob:
            if row.name == item.custom_material_indent_item:
                purchase_qty = item.qty or 0
                row.custom_purchase_qty = (row.custom_purchase_qty or 0) + purchase_qty
                row.custom_qty_balanced = (row.qty or 0) - (row.custom_issue_qty or 0)

        indent.save(ignore_permissions=True)


# ✅ VALIDATE STOCK ENTRY (existing)
def validate_stock_entry(doc, method):
    for item in doc.items:
        if not (item.custom_material_indent and item.custom_material_indent_item):
            continue

        indent = frappe.get_doc("Material Indent", item.custom_material_indent)

        for row in indent.table_feob:
            if row.name == item.custom_material_indent_item:
                issue_qty = item.qty or 0
                remaining = (row.qty or 0) - (row.custom_issue_qty or 0)

                if issue_qty > remaining:
                    frappe.throw(
                        f"❌ Issue qty cannot be greater than required qty for {row.item_code}"
                    )


# ✅ UPDATE ISSUE QTY IN INDENT (existing)
def update_issue(doc, method):
    for item in doc.items:
        if not (item.custom_material_indent and item.custom_material_indent_item):
            continue

        indent = frappe.get_doc("Material Indent", item.custom_material_indent)

        for row in indent.table_feob:
            if row.name == item.custom_material_indent_item:
                issue_qty = item.qty or 0
                row.custom_issue_qty = (row.custom_issue_qty or 0) + issue_qty
                row.custom_qty_balanced = (row.qty or 0) - row.custom_issue_qty

        indent.save(ignore_permissions=True)
#-------------------------------------------------------------------------------------------------
