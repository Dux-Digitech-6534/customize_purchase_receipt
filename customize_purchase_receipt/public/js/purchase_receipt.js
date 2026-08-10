frappe.ui.form.on('Purchase Receipt Item', {

    custom_rate_without_tax: function(frm, cdt, cdn) {
        calculate_tax_and_rate(frm, cdt, cdn);
    },

    custom_tax_percent: function(frm, cdt, cdn) {
        calculate_tax_and_rate(frm, cdt, cdn);
    },

    qty: function(frm, cdt, cdn) {
        calculate_tax_and_rate(frm, cdt, cdn);
    }

});


function calculate_tax_and_rate(frm, cdt, cdn) {

    const row = locals[cdt][cdn];

    // Stop if base rate is blank
    if (
        row.custom_rate_without_tax === undefined ||
        row.custom_rate_without_tax === null ||
        row.custom_rate_without_tax === ''
    ) {
        return;
    }

    // Get values safely
    const base_rate = flt(row.custom_rate_without_tax || 0);
    const tax_percent = flt(row.custom_tax_percent || 0);
    const qty = flt(row.qty || 0);

    // ---------------------------------
    // 1. TAX PER ITEM
    // ---------------------------------
    const tax_amount = (base_rate * tax_percent) / 100;

    // ---------------------------------
    // 2. FINAL RATE INCLUDING TAX
    // ---------------------------------
    const final_rate = base_rate + tax_amount;

    // ---------------------------------
    // 3. TOTAL TAX
    // ---------------------------------
    const total_tax = tax_amount * qty;

    // ---------------------------------
    // 4. SET VALUES
    // ---------------------------------

    // Tax per unit
    frappe.model.set_value(
        cdt,
        cdn,
        'custom_tax_amount',
        flt(tax_amount, 4)
    );

    // Total tax for complete quantity
    frappe.model.set_value(
        cdt,
        cdn,
        'custom_total_tax_amount',
        flt(total_tax, 2)
    );

    // Final rate including tax
    frappe.model.set_value(
        cdt,
        cdn,
        'rate',
        flt(final_rate, 4)
    );

    // Refresh child table
    frm.refresh_field('items');
}























// frappe.ui.form.on('Purchase Receipt Item', {

//     custom_rate_without_tax: function(frm, cdt, cdn) {
//         calculate_tax_and_rate(frm, cdt, cdn);
//     },

//     custom_tax_percent: function(frm, cdt, cdn) {
//         calculate_tax_and_rate(frm, cdt, cdn);
//     },

//     qty: function(frm, cdt, cdn) {

//         setTimeout(() => {
//             calculate_tax_and_rate(frm, cdt, cdn);
//         }, 100);

//     }

// });


// function calculate_tax_and_rate(frm, cdt, cdn) {

//     let row = locals[cdt][cdn];

//     if (!row.custom_rate_without_tax) {
//         return;
//     }

//     let base_rate = parseFloat(row.custom_rate_without_tax || 0);
//     let tax_percent = parseFloat(row.custom_tax_percent || 0);
//     let qty = parseFloat(row.qty || 0);

//     // Per item tax
//     let tax_amount = (base_rate * tax_percent) / 100;

//     // Final rate
//     let final_rate = base_rate + tax_amount;

//     // Total tax
//     let total_tax = tax_amount * qty;

//     frappe.model.set_value(cdt, cdn, 'custom_tax_amount', tax_amount.toFixed(3));

//     frappe.model.set_value(cdt, cdn, 'custom_total_tax_amount', total_tax.toFixed(3));

//     // Only set rate
//     frappe.model.set_value(cdt, cdn, 'rate', final_rate.toFixed(3));

//     refresh_field("items");
// }

























// frappe.ui.form.on('Purchase Receipt Item', {

//     custom_rate_without_tax: function(frm, cdt, cdn) {
//         calculate_tax_and_rate(frm, cdt, cdn);
//     },

//     custom_tax_percent: function(frm, cdt, cdn) {
//         calculate_tax_and_rate(frm, cdt, cdn);
//     },

//     qty: function(frm, cdt, cdn) {

//         setTimeout(() => {
//             calculate_tax_and_rate(frm, cdt, cdn);
//         }, 100);

//     }

// });


// function calculate_tax_and_rate(frm, cdt, cdn) {

//     let row = locals[cdt][cdn];

//     if (!row.custom_rate_without_tax) {
//         return;
//     }

//     let base_rate = flt(row.custom_rate_without_tax || 0);
//     let tax_percent = flt(row.custom_tax_percent || 0);

//     let qty = flt(row.qty || 0);

//     // Per item tax
//     let tax_amount = (base_rate * tax_percent) / 100;

//     // Final rate
//     let final_rate = base_rate + tax_amount;

//     // Total tax
//     let total_tax = tax_amount * qty;

//     frappe.model.set_value(cdt, cdn, 'custom_tax_amount', tax_amount);

//     frappe.model.set_value(cdt, cdn, 'custom_total_tax_amount', total_tax);

//     // Only set rate
//     frappe.model.set_value(cdt, cdn, 'rate', final_rate);

//     refresh_field("items");
// }




















// frappe.ui.form.on('Purchase Receipt Item', {

//     custom_rate_without_tax: function(frm, cdt, cdn) {
//         calculate_tax_and_rate(frm, cdt, cdn);
//     },

//     custom_tax_percent: function(frm, cdt, cdn) {
//         calculate_tax_and_rate(frm, cdt, cdn);
//     },

//     received_qty: function(frm, cdt, cdn) {
//         calculate_tax_and_rate(frm, cdt, cdn);
//     }

// });


// function calculate_tax_and_rate(frm, cdt, cdn) {

//     let row = locals[cdt][cdn];

//     let base_rate = flt(row.custom_rate_without_tax || 0);
//     let tax_percent = flt(row.custom_tax_percent || 0);

//     // Correct qty field
//     let qty = flt(row.received_qty || 0);

//     // Per item tax
//     let tax_amount = (base_rate * tax_percent) / 100;

//     // Final rate
//     let final_rate = base_rate + tax_amount;

//     // Total tax
//     let total_tax = tax_amount * qty;

//     frappe.model.set_value(cdt, cdn, 'custom_tax_amount', tax_amount);

//     frappe.model.set_value(cdt, cdn, 'custom_total_tax_amount', total_tax);

//     // Main ERPNext Rate
//     frappe.model.set_value(cdt, cdn, 'rate', final_rate);

//     // Force recalculation
//     refresh_field("items");
// }








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