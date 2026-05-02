frappe.ui.form.on('Purchase Order Item', {

    custom_rate_without_tax: function(frm, cdt, cdn) {
        calculate_po(frm, cdt, cdn);
    },

    custom_tax_percent: function(frm, cdt, cdn) {
        calculate_po(frm, cdt, cdn);
    }

});

function calculate_po(frm, cdt, cdn) {
    let row = locals[cdt][cdn];

    let base = flt(row.custom_rate_without_tax);
    let tax = flt(row.custom_tax_percent);

    let tax_amount = (base * tax) / 100;
    let final_rate = base + tax_amount;

    frappe.model.set_value(cdt, cdn, 'custom_tax_amount', tax_amount);
    frappe.model.set_value(cdt, cdn, 'rate', final_rate);
}