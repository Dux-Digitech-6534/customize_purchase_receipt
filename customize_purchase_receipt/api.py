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

    return doc