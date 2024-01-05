import * as vscode from 'vscode';
import * as fs from 'fs';
// @ts-ignore
import { config } from "./settingsJson";

import { TaskTreeDataProvider } from './testView';
function timestamp(): string {
    return (new Date()).valueOf().toString();
}

function unique5(): string {
    return Math.random().toString(10).substring(6, 11);
}

export function activate(context: vscode.ExtensionContext) {

    // // Test View
    // new TaskTreeDataProvider(context);

    const taskTreeDataProvider = new TaskTreeDataProvider(context);
    vscode.window.registerTreeDataProvider('ntiDevHelperWindow', taskTreeDataProvider);

    vscode.debug.onDidChangeActiveDebugSession((e) => {
        if (e == undefined) {
            vscode.window.setStatusBarMessage(
                "$(debug-stop) Debugging is Stopped ...",
                2000)
        }
        else {
            vscode.window.setStatusBarMessage(
                "$(debug-start) Debugging is Started ...  $(debug-step-over)",
                6000)
        }
    })

    context.subscriptions.push(vscode.commands.registerCommand('nti.toggleIndentGuides', async () => {
        var currentState = await vscode.workspace.getConfiguration('editor')
        await vscode.workspace.getConfiguration().update('editor.renderIndentGuides', !currentState.renderIndentGuides, vscode.ConfigurationTarget.Global);
        vscode.commands.executeCommand("editor.action.toggleRenderWhitespace");
    }));

    context.subscriptions.push(vscode.commands.registerCommand('nti.toggleIndentToSpace', async () => {
        vscode.commands.executeCommand("editor.action.indentationToSpaces");
    }));

    context.subscriptions.push(vscode.commands.registerCommand('nti.toggleIndentToTab', async () => {
        vscode.commands.executeCommand("editor.action.indentationToTabs");
    }));

    context.subscriptions.push(vscode.commands.registerCommand('nti.toggleBreadcrumb', async () => {
        vscode.commands.executeCommand("breadcrumbs.toggle");
    }));

    context.subscriptions.push(vscode.commands.registerCommand('nti.toggleEditorTabs', async () => {
        vscode.commands.executeCommand("workbench.action.toggleTabsVisibility");
    }));

    context.subscriptions.push(vscode.commands.registerCommand('nti.openWorkspaceSettings', async () => {
        vscode.commands.executeCommand("workbench.action.openWorkspaceSettings");
    }));
    context.subscriptions.push(vscode.commands.registerCommand('nti.openSettingsJson', async () => {
        vscode.commands.executeCommand("workbench.action.openSettingsJson");
    }));
    context.subscriptions.push(vscode.commands.registerCommand('nti.openSettingsUi', async () => {
        vscode.commands.executeCommand("workbench.action.openSettings2");
    }));

    context.subscriptions.push(vscode.commands.registerCommand('nti.setup_vscode', async () => {
        const dialogOption = await vscode.window.showQuickPick(["Iya, biar lebih mudah", "Tidak"], {
            placeHolder: 'Anda ingin konfigurasi disesuaikan dengan Trainer ? (Compact Folder, Autosave, Emmet disable, Hide Breadcrumb dan lain2)',
            onDidSelectItem: (dialogOption) => {
                if (dialogOption == "Iya, biar lebih mudah") {
                    vscode.window.showInformationMessage(`Good Choice !!`)
                }
                else {
                    vscode.window.showInformationMessage(`Very Bad Choice !!`)
                }
            }
        });
        if (dialogOption == "Iya, biar lebih mudah") {
            vscode.commands.executeCommand("workbench.action.openSettingsJson");
            for (var key in config) {
                var value = config[key];
                await vscode.workspace.getConfiguration().update(key, value, vscode.ConfigurationTarget.Global);
            }
            vscode.window.showInformationMessage("Global Config pada setting.json sudah di-update secara otomatis")
            vscode.window.showInformationMessage("Arkademy Setup sukses")
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('nti.reload_window', async () => {
        const dialogOption = await vscode.window.showQuickPick(["Iya, memang mau Reload", "Tidak, ini hanya kepencet"], {
            placeHolder: 'Anda betul ingin reload ?',
            onDidSelectItem: (dialogOption) => {
                if (dialogOption == "Iya, memang mau Reload") {
                    vscode.window.showInformationMessage(`Semua Codingan yang belum ke save akan hilang !!`)
                }
                else {
                    vscode.window.showInformationMessage(`Siap !!`)
                }
            }
        });
        if (dialogOption == "Iya, memang mau Reload") {
            vscode.commands.executeCommand("workbench.action.reloadWindow");
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('nti.get_unique_date', () => {
        let editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
        if (editor === undefined) {
            return
        }
        else {
            editor.edit(editBuilder => {
                const unique = timestamp() + unique5()
                if (editor === undefined) {
                    return
                }
                editBuilder.replace(editor.selection, unique)
            }).then(success => {
                if (editor === undefined) {
                    return
                }
                var cursorEndPosition = editor.selection.end;
                editor.selection = new vscode.Selection(cursorEndPosition, cursorEndPosition);
            });
        }
    }));


    let disposable = vscode.commands.registerCommand('nti.createLaunchJson', async () => {
        const dialogOption = await vscode.window.showQuickPick(["Iya, biar lebih mudah", "Tidak"], {
            placeHolder: 'Anda ingin running Odoo dengan Tombol? (Debugging, No Connect Timeout)',
            onDidSelectItem: (dialogOption) => {
                if (dialogOption == "Iya, biar lebih mudah") {
                    vscode.window.showInformationMessage(`Good Choice !!`)
                }
                else {
                    vscode.window.showInformationMessage(`Very Bad Choice !!`)
                }
            }
        });
        if (dialogOption == "Iya, biar lebih mudah") {
            vscode.window.showInformationMessage('New Launch.json is created!');
            if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
                var filePath: string = vscode.workspace.rootPath || ''
                filePath += '/.vscode'
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                }
                let fileName: string = filePath + '/launch.json'

                if (!fs.existsSync(fileName)) {
                    fs.createWriteStream(fileName).close();
                    vscode.workspace.openTextDocument(fileName).then((a: vscode.TextDocument) => {
                        vscode.window.showTextDocument(a, 1, false).then(e => {
                            e.edit(edit => {
                                edit.insert(new vscode.Position(0, 0), "Odoo ");
                            }).then(success => {
                                console.log(success);
                                vscode.commands.executeCommand("editor.action.triggerSuggest");
                            })
                        });
                    }, (error: any) => {
                        console.error(error);
                        debugger;
                    });
                } else {
                    vscode.workspace.openTextDocument(fileName).then((a: vscode.TextDocument) => {
                        vscode.window.showTextDocument(a, 1, false).then(e => {
                        });
                    }, (error: any) => {
                        console.error(error);
                        debugger;
                    });
                }

            }
        }
    });

    context.subscriptions.push(disposable);
}