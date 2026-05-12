frappe.ui.form.on('Purchase Order Item', {

    custom_rate_without_tax: function(frm, cdt, cdn) {
        calculate_po(frm, cdt, cdn);
    },

    custom_tax_percent: function(frm, cdt, cdn) {
        calculate_po(frm, cdt, cdn);
    },

    qty: function(frm, cdt, cdn) {

        setTimeout(() => {
            calculate_po(frm, cdt, cdn);
        }, 100);

    }
});

function calculate_po(frm, cdt, cdn) {

    let row = locals[cdt][cdn];

    if (!row.custom_rate_without_tax) {
        return;
    }

    let base = flt(row.custom_rate_without_tax || 0);
    let tax = flt(row.custom_tax_percent || 0);
    let qty = flt(row.qty || 0);

    // Tax Amount
    let tax_amount = (base * tax) / 100;

    // Final Rate
    let final_rate = base + tax_amount;

    // Total Tax
    let total_tax = tax_amount * qty;

    // Custom Fields
    frappe.model.set_value(cdt, cdn, 'custom_tax_amount', tax_amount);

    frappe.model.set_value(cdt, cdn, 'custom_total_tax_amount', total_tax);

    // Main ERPNext Rate
    frappe.model.set_value(cdt, cdn, 'rate', final_rate);

    refresh_field("items");
}





















// frappe.ui.form.on('Purchase Order Item', {

//     custom_rate_without_tax: function(frm, cdt, cdn) {
//         calculate_po(frm, cdt, cdn);
//     },

//     custom_tax_percent: function(frm, cdt, cdn) {
//         calculate_po(frm, cdt, cdn);
//     },

//     qty: function(frm, cdt, cdn) {
//         calculate_po(frm, cdt, cdn);
//     }
// });

// function calculate_po(frm, cdt, cdn) {

//     let row = locals[cdt][cdn];

//     let base = flt(row.custom_rate_without_tax || 0);
//     let tax = flt(row.custom_tax_percent || 0);
//     let qty = flt(row.qty || 0);

//     // Tax Amount
//     let tax_amount = (base * tax) / 100;

//     // Final Rate
//     let final_rate = base + tax_amount;

//     // Total Tax
//     let total_tax = tax_amount * qty;

//     // Custom Fields
//     frappe.model.set_value(cdt, cdn, 'custom_tax_amount', tax_amount);

//     frappe.model.set_value(cdt, cdn, 'custom_total_tax_amount', total_tax);

//     // Main ERPNext Rate
//     frappe.model.set_value(cdt, cdn, 'rate', final_rate);

//     // Force ERP recalculation
//     refresh_field("items");
// }















// frappe.ui.form.on('Purchase Order Item', {

//     custom_rate_without_tax: function(frm, cdt, cdn) {
//         calculate_po(frm, cdt, cdn);
//     },

//     custom_tax_percent: function(frm, cdt, cdn) {
//         calculate_po(frm, cdt, cdn);
//     },

//     qty: function(frm, cdt, cdn) {
//         calculate_po(frm, cdt, cdn);
//     },

//     rate: function(frm, cdt, cdn) {   // 🔥 important add
//         calculate_po(frm, cdt, cdn);
//     }

// });

// function calculate_po(frm, cdt, cdn) {

//     let row = locals[cdt][cdn];

//     let base = flt(row.custom_rate_without_tax);
//     let tax = flt(row.custom_tax_percent);
//     let qty = flt(row.qty);

//     if (!base || !tax) return;  // safety

//     // Per item tax
//     let tax_amount = (base * tax) / 100;

//     // Final rate
//     let final_rate = base + tax_amount;

//     // Total tax
//     let total_tax = tax_amount * qty;

//     // Set values
//     frappe.model.set_value(cdt, cdn, 'custom_tax_amount', tax_amount);
//     frappe.model.set_value(cdt, cdn, 'custom_total_tax_amount', total_tax);
//     frappe.model.set_value(cdt, cdn, 'rate', final_rate);
// }