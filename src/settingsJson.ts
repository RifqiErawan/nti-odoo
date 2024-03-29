interface Foo {
    [key: string]: any;
 }
export var config : Foo = {
    "editor.rulers": [80],
    "editor.minimap.enabled": false,
    "emmet.showExpandedAbbreviation": "never",
    "emmet.showAbbreviationSuggestions": false,
    "debug.toolBarLocation": "docked",
	"debug.openDebug": "neverOpen",
    "workbench.tree.indent": 15,
    "files.autoSave": "afterDelay",
    "files.autoSaveDelay": 500,
	"breadcrumbs.filePath": "off",
	"breadcrumbs.showModules": false,
	"breadcrumbs.showPackages": false,
    "python.linting.enabled": false,
	"editor.quickSuggestions": true,
	"editor.quickSuggestionsDelay": 0,
	"workbench.iconTheme": "material-icon-theme",
	"workbench.editor.tabSizing": "shrink",
	"workbench.editor.enablePreview": false,
    "python.linting.pylintArgs": [
        "--disable=E1003",
        "--disable=E1101",
        "--disable=E0110",
        "--disable=E1121",
        "--disable=E0401",
        "--disable=E0203",
        "--disable=W0105",
        "--disable=W0125",
        "--disable=W0201",
        "--disable=W0212",
        "--disable=W0611",
        "--disable=W0612",
        "--disable=W0613",
        "--disable=W0622",
        "--disable=W0631",
        "--disable=W0640",
        "--disable=W0703",
        "--disable=C0103",
        "--disable=C0111",
        "--disable=C0301",
        "--disable=C0321",
        "--disable=C0326",
        "--disable=C0330",
        "--disable=C0411",
        "--disable=R1703",
        "--disable=R1705",
        "--disable=R1706",
        "--disable=R0201",
        "--disable=R0913",
        "--disable=R0916",
        "--disable=R0915",
        "--disable=R0902",
        "--disable=R0903",
        "--disable=R0914",
        "--disable=R0916",
        "--disable=W0104",
        "--disable=W0511",
        "--disable=W0621"
    ],
    "files.exclude": {
        "**/__pycache__": true,
        "**/*.pyc": true
    },
    "explorer.compactFolders": false,
    "update.enableWindowsBackgroundUpdates": false,
    "extensions.autoUpdate": false,
    "update.mode": "manual",
}