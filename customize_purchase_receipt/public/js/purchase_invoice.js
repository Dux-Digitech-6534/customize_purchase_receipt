frappe.ui.form.on("Purchase Invoice", {

    refresh(frm) {

        let grid = frm.fields_dict.items.grid;

        let fields = [
            "item_code",
            "qty",
            "custom_rate_without_tax",
            "custom_tax_percent",
            "custom_tax_amount",
            "rate",
            "amount"
        ];

        fields.forEach(field => {

            grid.update_docfield_property(
                field,
                "in_list_view",
                1
            );

            grid.set_column_disp(
                field,
                true
            );

        });

        frm.refresh_field("items");
    }
});


frappe.ui.form.on("Purchase Invoice Item", {

    custom_rate_without_tax(frm, cdt, cdn) {
        calculate_pi(frm, cdt, cdn);
    },

    custom_tax_percent(frm, cdt, cdn) {
        calculate_pi(frm, cdt, cdn);
    },

    qty(frm, cdt, cdn) {

        setTimeout(() => {
            calculate_pi(frm, cdt, cdn);
        }, 100);

    }

});


function calculate_pi(frm, cdt, cdn) {

    let row = locals[cdt][cdn];

    let base = flt(
        row.custom_rate_without_tax || 0,
        3
    );

    let tax = flt(
        row.custom_tax_percent || 0,
        3
    );

    let qty = flt(
        row.qty || 0,
        3
    );

    let tax_amount = flt(
        (base * tax) / 100,
        3
    );

    let final_rate = flt(
        base + tax_amount,
        3
    );

    let total_tax = flt(
        tax_amount * qty,
        3
    );

    let total_amount = flt(
        final_rate * qty,
        3
    );

    frappe.model.set_value(
        cdt,
        cdn,
        "custom_tax_amount",
        tax_amount
    );

    frappe.model.set_value(
        cdt,
        cdn,
        "custom_total_tax_amount",
        total_tax
    );

    frappe.model.set_value(
        cdt,
        cdn,
        "rate",
        final_rate
    );

    frappe.model.set_value(
        cdt,
        cdn,
        "amount",
        total_amount
    );

    frm.refresh_field("items");
}













// frappe.ui.form.on("Purchase Invoice", {
//     refresh(frm) {

//         let fields = [
//             "item_code",
//             "qty",
//             "custom_rate_without_tax",
//             "custom_tax_percent",
//             "custom_tax_amount",
//             "rate",
//             "amount"
//         ];

//         let grid = frm.fields_dict.items.grid;

//         // Clear previous user settings
//         grid.user_settings = {
//             fields: fields
//         };

//         // Force visible columns
//         fields.forEach(field => {
//             grid.update_docfield_property(
//                 field,
//                 "in_list_view",
//                 1
//             );
//         });

//         frm.refresh_field("items");
//     }
// });


// frappe.ui.form.on("Purchase Invoice Item", {

//     custom_rate_without_tax(frm, cdt, cdn) {
//         calculate_pi(frm, cdt, cdn);
//     },

//     custom_tax_percent(frm, cdt, cdn) {
//         calculate_pi(frm, cdt, cdn);
//     },

//     qty(frm, cdt, cdn) {
//         setTimeout(() => {
//             calculate_pi(frm, cdt, cdn);
//         },100);
//     }

// });


// function calculate_pi(frm, cdt, cdn) {

//     let row = locals[cdt][cdn];

//     if (!row.custom_rate_without_tax)
//         return;

//     let base = flt(row.custom_rate_without_tax || 0,3);
//     let tax = flt(row.custom_tax_percent || 0,3);
//     let qty = flt(row.qty || 0,3);

//     let tax_amount = flt(
//         (base * tax)/100,
//         3
//     );

//     let final_rate = flt(
//         base + tax_amount,
//         3
//     );

//     let total_tax = flt(
//         tax_amount * qty,
//         3
//     );

//     frappe.model.set_value(
//         cdt,
//         cdn,
//         "custom_tax_amount",
//         tax_amount
//     );

//     frappe.model.set_value(
//         cdt,
//         cdn,
//         "custom_total_tax_amount",
//         total_tax
//     );

//     frappe.model.set_value(
//         cdt,
//         cdn,
//         "rate",
//         final_rate
//     );

//     frm.refresh_field("items");
// }