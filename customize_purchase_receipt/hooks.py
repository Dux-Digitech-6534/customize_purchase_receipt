app_name = "customize_purchase_receipt"
app_title = "Customize Purchase Receipt"
app_publisher = "Nandkishor"
app_description = "Customize Purchase Receipt Features"
app_email = "duxnandkishorkochkar@gmail.com"
app_license = "mit"


doc_events = {
    "Material Request": {
        "before_insert": "customize_purchase_receipt.api.check_duplicate_material_request",
        "validate": "customize_purchase_receipt.api.validate_material_request",
        "after_insert": "customize_purchase_receipt.api.close_material_indent",
        "on_submit": "customize_purchase_receipt.api.update_purchase",
    },
     "Stock Entry": {
        "validate": "customize_purchase_receipt.api.validate_stock_entry",
        "on_submit": "customize_purchase_receipt.api.update_issue"
    }
}




doctype_js = {
    "Purchase Receipt": "public/js/purchase_receipt.js",
    "Purchase Order": "public/js/purchase_order.js",
    "Purchase Invoice": "public/js/purchase_invoice.js",
    "Material Indent": "public/js/material_indent.js"
}


override_whitelisted_methods = {

    # PO → Purchase Receipt
    "erpnext.buying.doctype.purchase_order.purchase_order.make_purchase_receipt":
    "ghr_custom.api.custom_make_purchase_receipt",

    # PO → Purchase Invoice
    "erpnext.buying.doctype.purchase_order.purchase_order.make_purchase_invoice":
    "ghr_custom.api.custom_make_purchase_invoice",

    # Purchase Receipt → Purchase Invoice
    "erpnext.stock.doctype.purchase_receipt.purchase_receipt.make_purchase_invoice":
    "ghr_custom.api.custom_make_pr_invoice"

}


fixtures = [
    {
        "dt": "Custom Field",
        "filters": [
            ["name", "in", [

                # ==========================
                # Purchase Receipt Fields
                # ==========================

                "Purchase Receipt Item-custom_rate_without_tax",
                "Purchase Receipt Item-custom_tax_percent",
                "Purchase Receipt Item-custom_tax_amount",
                "Purchase Receipt Item-custom_total_tax_amount",

                # ==========================
                # Purchase Order Fields
                # ==========================

                "Purchase Order Item-custom_rate_without_tax",
                "Purchase Order Item-custom_tax_percent",
                "Purchase Order Item-custom_tax_amount",
                "Purchase Order Item-custom_total_tax_amount",

                # ==========================
                # Purchase Invoice Fields
                # ==========================

                "Purchase Invoice Item-custom_rate_without_tax",
                "Purchase Invoice Item-custom_tax_percent",
                "Purchase Invoice Item-custom_tax_amount",
                "Purchase Invoice Item-custom_total_tax_amount"

            ]]
        ]
    }
]



# doctype_js = {
#     "Purchase Receipt": "public/js/purchase_receipt.js",
#     "Purchase Order": "public/js/purchase_order.js"
# }

# fixtures = [
#     {
#         "dt": "Custom Field",
#         "filters": [
#             ["name", "in", [
#                 # Purchase Receipt Fields
#                 "Purchase Receipt Item-custom_rate_without_tax",
#                 "Purchase Receipt Item-custom_tax_percent",
#                 "Purchase Receipt Item-custom_tax_amount",
#                 "Purchase Receipt Item-custom_total_tax_amount",

#                 # Purchase Order Fields
#                 "Purchase Order Item-custom_rate_without_tax",
#                 "Purchase Order Item-custom_tax_percent",
#                 "Purchase Order Item-custom_tax_amount",
#                 "Purchase Order Item-custom_total_tax_amount"
#             ]]
#         ]
#     }
# ]

# fixtures = [
#     {
#         "dt": "Custom Field",
#         "filters": [
#             ["name", "in", [
#                 "Purchase Receipt Item-custom_rate_without_tax",
#                 "Purchase Receipt Item-custom_tax_percent",
#                 "Purchase Receipt Item-custom_tax_amount"
#             ]]
#         ]
#     }
# ]


override_whitelisted_methods = {
    "erpnext.buying.doctype.purchase_order.purchase_order.make_purchase_receipt":
        "customize_purchase_receipt.api.custom_make_purchase_receipt"
}

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "customize_purchase_receipt",
# 		"logo": "/assets/customize_purchase_receipt/logo.png",
# 		"title": "Customize Purchase Receipt",
# 		"route": "/customize_purchase_receipt",
# 		"has_permission": "customize_purchase_receipt.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/customize_purchase_receipt/css/customize_purchase_receipt.css"
# app_include_js = "/assets/customize_purchase_receipt/js/customize_purchase_receipt.js"

# include js, css files in header of web template
# web_include_css = "/assets/customize_purchase_receipt/css/customize_purchase_receipt.css"
# web_include_js = "/assets/customize_purchase_receipt/js/customize_purchase_receipt.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "customize_purchase_receipt/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "customize_purchase_receipt/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "customize_purchase_receipt.utils.jinja_methods",
# 	"filters": "customize_purchase_receipt.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "customize_purchase_receipt.install.before_install"
# after_install = "customize_purchase_receipt.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "customize_purchase_receipt.uninstall.before_uninstall"
# after_uninstall = "customize_purchase_receipt.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "customize_purchase_receipt.utils.before_app_install"
# after_app_install = "customize_purchase_receipt.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "customize_purchase_receipt.utils.before_app_uninstall"
# after_app_uninstall = "customize_purchase_receipt.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "customize_purchase_receipt.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"customize_purchase_receipt.tasks.all"
# 	],
# 	"daily": [
# 		"customize_purchase_receipt.tasks.daily"
# 	],
# 	"hourly": [
# 		"customize_purchase_receipt.tasks.hourly"
# 	],
# 	"weekly": [
# 		"customize_purchase_receipt.tasks.weekly"
# 	],
# 	"monthly": [
# 		"customize_purchase_receipt.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "customize_purchase_receipt.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "customize_purchase_receipt.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "customize_purchase_receipt.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["customize_purchase_receipt.utils.before_request"]
# after_request = ["customize_purchase_receipt.utils.after_request"]

# Job Events
# ----------
# before_job = ["customize_purchase_receipt.utils.before_job"]
# after_job = ["customize_purchase_receipt.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"customize_purchase_receipt.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

# Translation
# ------------
# List of apps whose translatable strings should be excluded from this app's translations.
# ignore_translatable_strings_from = []

