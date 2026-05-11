frappe.ui.form.on('Purchase Receipt Item', {

    custom_rate_without_tax: function(frm, cdt, cdn) {
        calculate_tax_and_rate(frm, cdt, cdn);
    },

    custom_tax_percent: function(frm, cdt, cdn) {
        calculate_tax_and_rate(frm, cdt, cdn);
    },

    received_qty: function(frm, cdt, cdn) {
        calculate_tax_and_rate(frm, cdt, cdn);
    }

});


function calculate_tax_and_rate(frm, cdt, cdn) {

    let row = locals[cdt][cdn];

    let base_rate = flt(row.custom_rate_without_tax || 0);
    let tax_percent = flt(row.custom_tax_percent || 0);

    // Correct qty field
    let qty = flt(row.received_qty || 0);

    // Per item tax
    let tax_amount = (base_rate * tax_percent) / 100;

    // Final rate
    let final_rate = base_rate + tax_amount;

    // Total tax
    let total_tax = tax_amount * qty;

    frappe.model.set_value(cdt, cdn, 'custom_tax_amount', tax_amount);

    frappe.model.set_value(cdt, cdn, 'custom_total_tax_amount', total_tax);

    // Main ERPNext Rate
    frappe.model.set_value(cdt, cdn, 'rate', final_rate);

    // Force recalculation
    refresh_field("items");
}








// frappe.ui.form.on('Purchase Receipt Item', {

//     custom_rate_without_tax: function(frm, cdt, cdn) {
//         calculate_tax_and_rate(frm, cdt, cdn);
//     },

//     custom_tax_percent: function(frm, cdt, cdn) {
//         calculate_tax_and_rate(frm, cdt, cdn);
//     },

//     received_qty: function(frm, cdt, cdn) {   // ✅ IMPORTANT CHANGE
//         calculate_tax_and_rate(frm, cdt, cdn);
//     }

// });


// function calculate_tax_and_rate(frm, cdt, cdn) {

//     let row = locals[cdt][cdn];

//     let base_rate = flt(row.custom_rate_without_tax);
//     let tax_percent = flt(row.custom_tax_percent);

//     // 🔥 correct qty field
//     let qty = flt(row.received_qty);

//     // Per item tax
//     let tax_amount = (base_rate * tax_percent) / 100;

//     // Final rate
//     let final_rate = base_rate + tax_amount;

//     // Total tax
//     let total_tax = tax_amount * qty;

//     frappe.model.set_value(cdt, cdn, 'custom_tax_amount', tax_amount);
//     frappe.model.set_value(cdt, cdn, 'custom_total_tax_amount', total_tax);
//     frappe.model.set_value(cdt, cdn, 'rate', final_rate);
// }