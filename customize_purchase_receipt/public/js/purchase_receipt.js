// ✅ Child Table Calculation
frappe.ui.form.on('Purchase Receipt Item', {

    custom_rate_without_tax: function(frm, cdt, cdn) {
        calculate_tax_and_rate(frm, cdt, cdn);
    },

    custom_tax_percent: function(frm, cdt, cdn) {
        calculate_tax_and_rate(frm, cdt, cdn);
    }

});


// ✅ Main Function
function calculate_tax_and_rate(frm, cdt, cdn) {

    let row = locals[cdt][cdn];

    // Safe values
    let base_rate = flt(row.custom_rate_without_tax);
    let tax_percent = flt(row.custom_tax_percent);

    // 🔹 Tax Amount
    let tax_amount = (base_rate * tax_percent) / 100;

    // 🔹 Final Rate
    let final_rate = base_rate + tax_amount;

    // 🔹 Set values
    frappe.model.set_value(cdt, cdn, 'custom_tax_amount', tax_amount);
    frappe.model.set_value(cdt, cdn, 'rate', final_rate);
}