
frappe.ui.form.on('Material Indent', {
    refresh: function(frm) {

        // ❌ REMOVE THIS (ye issue ka main reason hai)
        // frm.page.clear_actions_menu();

        // ==============================
        // 🔥 MATERIAL ISSUE (POPUP)
        // ==============================
        frm.page.add_action_item(__('Material Issue'), function() {

            let rows = frm.doc.table_feob || [];

            if (!rows.length) {
                frappe.msgprint("❌ Please add items first");
                return;
            }

            let d = new frappe.ui.Dialog({
                title: 'Enter Issue Qty',
                size: 'large',
                fields: rows.map(row => ({
                    fieldtype: 'Float',
                    label: `${row.item_code} (Bal: ${row.custom_qty_balanced || 0})`,
                    fieldname: row.name,
                    default: 0
                })),
                primary_action_label: 'Create Stock Entry',
                primary_action(values) {

                    let items = [];
                    let promises = [];

                    rows.forEach(row => {

                        let qty = values[row.name] || 0;
                        if (qty <= 0) return;

                        let p =
                         frappe.db.get_value("Bin", {
                            item_code: row.item_code,
                            warehouse: row.from_warehouse
                        }, "actual_qty").then(r => {

                            let stock = r.message?.actual_qty || 0;

                            if (qty > stock) {
                                frappe.throw(`❌ Stock not available for ${row.item_code} (Available: ${stock})`);
                            }

                            if (qty > (row.custom_qty_balanced || 0)) {
                                frappe.throw(`❌ Issue qty exceeds balance for ${row.item_code}`);
                            }

                            items.push({
                                item_code: row.item_code,
                                qty: qty,
                                s_warehouse: row.from_warehouse,

                                custom_material_indent: frm.doc.name,
                                custom_material_indent_item: row.name ,
                                   custom_specification:row.custom_specification
                            });

                        });

                        promises.push(p);
                    });

                    Promise.all(promises).then(() => {

                        if (!items.length) {
                            frappe.msgprint("❌ Enter qty first");
                            return;
                        }

                        frappe.call({
                            method: "frappe.client.insert",
                            args: {
                                doc: {
                                    doctype: "Stock Entry",
                                    stock_entry_type: "Material Issue",
                                    company: frm.doc.company,
                                    items: items,
                                     // ✅ ADD THESE
            custom_username: frm.doc.custom_username,
            custom_remark: frm.doc.custom_remark,
            custom_attachment: frm.doc.custome_attachment,
             custom_design: frm.doc.custom_design,
                                }
                            },
                            callback: function(r) {
                                if (r.message) {
                                    frappe.show_alert("✅ Stock Entry Created");
                                    frappe.set_route("Form", "Stock Entry", r.message.name);
                                }
                            }
                        });

                        d.hide();
                    });
                }
            });

            d.show();
        });


        // ==============================
        // 🔥 MATERIAL PURCHASE (POPUP)
        // ==============================
        // frm.page.add_action_item(__('Material Purchase'), function() {

        //     let rows = frm.doc.table_feob || [];

        //     let d = new frappe.ui.Dialog({
        //         title: 'Enter Purchase Qty',
        //         size: 'large',
        //         fields: rows.map(row => ({
        //             fieldtype: 'Float',
        //             label: `${row.item_code} (Bal: ${row.custom_qty_balanced || 0})`,
        //             fieldname: row.name,
        //             default: 0
        //         })),
        //         primary_action_label: 'Create Purchase Request',
        //         primary_action(values) {

        //             let items = [];

        //             rows.forEach(row => {

        //                 let qty = values[row.name] || 0;
        //                 if (qty <= 0) return;

        //                 items.push({
        //                     item_code: row.item_code,
        //                     qty: qty,
        //                     schedule_date: frm.doc.required_by,
        //                     uom: row.uom,

        //                     custom_material_indent: frm.doc.name,
        //                     custom_material_indent_item: row.name,
        //                      custom_specification:row.custom_specification
        //                 });
        //             });

        //             if (!items.length) {
        //                 frappe.msgprint("❌ Enter qty first");
        //                 return;
        //             }

        //             frappe.call({
        //                 method: "frappe.client.insert",
        //                 args: {
        //                     doc: {
        //                         doctype: "Material Request",
        //                         material_request_type: "Purchase",
        //                         company: frm.doc.company,
        //                         items: items,
        //                            // ✅ ADD THESE
        //     custom_username: frm.doc.custom_username,
        //     custom_remark: frm.doc.custom_remark,
        //     custom_attachment: frm.doc.custome_attachment,
        //      custom_design: frm.doc.custom_design,
        //                     }
        //                 },
        //                 callback: function(r) {
        //                     if (r.message) {
        //                         frappe.show_alert("✅ Purchase Request Created");
        //                         frappe.set_route("Form", "Material Request", r.message.name);
        //                     }
        //                 }
        //             });

        //             d.hide();
        //         }
        //     });

        //     d.show();
        // });
        // ==============================
        // 🔥 MATERIAL PURCHASE (POPUP)
        //Poojashree write code

        // ==============================
        frm.page.add_action_item(__('Material Purchase'), function() {

            // ✅ BLOCK IF ALREADY RAISED (instant check)
            if (frm.doc.custom_status === "Closed") {
                frappe.msgprint({
                    // title: '⚠️ Already Created',
                    message: `Material Request already created for this indent. Cannot create again.`,
                    indicator: 'red'
                });
                
                return;
            }

            let rows = frm.doc.table_feob || [];

            if (!rows.length) {
                frappe.msgprint("❌ Please add items first");
                return;
            }

            let d = new frappe.ui.Dialog({
                title: 'Enter Purchase Qty',
                size: 'large',
                fields: rows.map(row => ({
                    fieldtype: 'Float',
                    label: `${row.item_code} (Bal: ${row.custom_qty_balanced || 0})`,
                    fieldname: row.name,
                    default: 0
                })),
                primary_action_label: 'Create Purchase Request',
                primary_action(values) {

                    let items = [];

                    rows.forEach(row => {
                        let qty = values[row.name] || 0;
                        if (qty <= 0) return;

                        items.push({
                            item_code: row.item_code,
                            qty: qty,
                            schedule_date: frm.doc.required_by,
                            uom: row.uom,
                            custom_material_indent: frm.doc.name,
                            custom_material_indent_item: row.name,
                            custom_specification: row.custom_specification
                        });
                    });

                    if (!items.length) {
                        frappe.msgprint("❌ Enter qty first");
                        return;
                    }

                    frappe.call({
                        method: "frappe.client.insert",
                        args: {
                            doc: {
                                doctype: "Material Request",
                                material_request_type: "Purchase",
                                company: frm.doc.company,
                                items: items,
                                custom_material_indent: frm.doc.name,
                                custom_username: frm.doc.custom_username,
                                custom_remark: frm.doc.custom_remark,
                                custom_attachment: frm.doc.custome_attachment,
                                custom_design: frm.doc.custom_design,
                            }
                        },
                        callback: function(r) {
                            if (r.message) {

                                // ✅ SET custom_status = Purchase Request Raised
                                frappe.call({
                                    method: "frappe.client.set_value",
                                    args: {
                                        doctype: "Material Indent",
                                        name: frm.doc.name,
                                        fieldname: "custom_status",
                                        value: "Closed"
                                        // value: "Purchase Request Raised"
                                    },
                                    callback: function() {
                                        frm.reload_doc();
                                        frappe.show_alert("✅ Purchase Request Created");
                                        frappe.set_route("Form", "Material Request", r.message.name);
                                    }
                                });
                            }
                        }
                    });

                    d.hide();
                }
            });

            d.show();
        });

    }
});

