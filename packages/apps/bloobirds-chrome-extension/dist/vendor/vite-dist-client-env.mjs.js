const context = (() => {
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    else if (typeof self !== 'undefined') {
        return self;
    }
    else if (typeof window !== 'undefined') {
        return window;
    }
    else {
        return Function('return this')();
    }
})();
// assign defines
const defines = {"process.env": {"MANPATH":"/Users/robertorf/.nvm/versions/node/v17.7.2/share/man:/opt/homebrew/share/man:/usr/share/man:/usr/local/share/man:/Users/robertorf/.nvm/versions/node/v17.7.2/share/man:/opt/homebrew/share/man::","TERM_PROGRAM":"vscode","NODE":"/Users/robertorf/.nvm/versions/node/v17.7.2/bin/node","TURBO_INVOCATION_DIR":"/Users/robertorf/Workspace/bloobirds","NVM_CD_FLAGS":"-q","INIT_CWD":"/Users/robertorf/Workspace/bloobirds/packages/apps/bloobirds-chrome-extension","BASE_URL":"https://gateway.dev-bloobirds.com","TERM":"xterm-256color","SHELL":"/bin/zsh","npm_config_metrics_registry":"https://registry.npmjs.org/","TMPDIR":"/var/folders/pj/r9pg0vsx0y128fgrjj_43jzm0000gn/T/","HOMEBREW_REPOSITORY":"/opt/homebrew","npm_config_global_prefix":"/Users/robertorf/.nvm/versions/node/v17.7.2","TERM_PROGRAM_VERSION":"1.90.0","NODE_OPTIONS":"--max-old-space-size=8192","ZDOTDIR":"/Users/robertorf","ORIGINAL_XDG_CURRENT_DESKTOP":"undefined","MallocNanoZone":"0","COLOR":"0","npm_config_noproxy":"","npm_config_local_prefix":"/Users/robertorf/Workspace/bloobirds/packages/apps/bloobirds-chrome-extension","USER":"robertorf","NVM_DIR":"/Users/robertorf/.nvm","COMMAND_MODE":"unix2003","npm_config_globalconfig":"/Users/robertorf/.nvm/versions/node/v17.7.2/etc/npmrc","ENV":"development","SSH_AUTH_SOCK":"/private/tmp/com.apple.launchd.5MW5wT7U4S/Listeners","__CF_USER_TEXT_ENCODING":"0x1F5:0x0:0x0","npm_execpath":"/Users/robertorf/Workspace/bloobirds/node_modules/npm/bin/npm-cli.js","PATH":"/Users/robertorf/Workspace/bloobirds/packages/apps/bloobirds-chrome-extension/node_modules/.bin:/Users/robertorf/Workspace/bloobirds/packages/apps/node_modules/.bin:/Users/robertorf/Workspace/bloobirds/packages/node_modules/.bin:/Users/robertorf/Workspace/bloobirds/node_modules/.bin:/Users/robertorf/Workspace/node_modules/.bin:/Users/robertorf/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/robertorf/Workspace/bloobirds/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/robertorf/Workspace/bloobirds/node_modules/.bin:/Users/robertorf/Workspace/node_modules/.bin:/Users/robertorf/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/robertorf/.nvm/versions/node/v17.7.2/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/robertorf/.console-ninja/.bin:/Users/robertorf/.nvm/versions/node/v17.7.2/bin:/Library/Frameworks/Python.framework/Versions/3.10/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Users/robertorf/.console-ninja/.bin:/Users/robertorf/.nvm/versions/node/v17.7.2/bin:/Library/Frameworks/Python.framework/Versions/3.10/bin:/opt/homebrew/bin:/opt/homebrew/sbin","npm_package_json":"/Users/robertorf/Workspace/bloobirds/packages/apps/bloobirds-chrome-extension/package.json","_":"/Users/robertorf/Workspace/bloobirds/packages/apps/bloobirds-chrome-extension/node_modules/.bin/vite","npm_config_userconfig":"/Users/robertorf/.npmrc","npm_config_init_module":"/Users/robertorf/.npm-init.js","__CFBundleIdentifier":"com.microsoft.VSCode","USER_ZDOTDIR":"/Users/robertorf","npm_command":"run-script","PWD":"/Users/robertorf/Workspace/bloobirds/packages/apps/bloobirds-chrome-extension","npm_lifecycle_event":"start","EDITOR":"vi","npm_package_name":"@bloobirds-it/bloobirds-chrome-extension","LANG":"en_US.UTF-8","XPC_FLAGS":"0x0","VSCODE_GIT_ASKPASS_EXTRA_ARGS":"","TURBO_HASH":"97cdd0a46281a132","NODE_ENV":"development","npm_config_node_gyp":"/Users/robertorf/Workspace/bloobirds/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js","npm_package_version":"3.0.8","XPC_SERVICE_NAME":"0","VSCODE_INJECTION":"1","SHLVL":"3","HOME":"/Users/robertorf","VSCODE_GIT_ASKPASS_MAIN":"/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass-main.js","HOMEBREW_PREFIX":"/opt/homebrew","npm_config_cache":"/Users/robertorf/.npm","LOGNAME":"robertorf","npm_lifecycle_script":"vite","VSCODE_GIT_IPC_HANDLE":"/var/folders/pj/r9pg0vsx0y128fgrjj_43jzm0000gn/T/vscode-git-aa9a0b3853.sock","NVM_BIN":"/Users/robertorf/.nvm/versions/node/v17.7.2/bin","npm_config_user_agent":"npm/8.5.2 node/v17.7.2 darwin arm64 workspaces/false","VSCODE_GIT_ASKPASS_NODE":"/Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper (Plugin).app/Contents/MacOS/Code Helper (Plugin)","INFOPATH":"/opt/homebrew/share/info:/opt/homebrew/share/info:","HOMEBREW_CELLAR":"/opt/homebrew/Cellar","GIT_ASKPASS":"/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass.sh","npm_node_execpath":"/Users/robertorf/.nvm/versions/node/v17.7.2/bin/node","npm_config_prefix":"/Users/robertorf/.nvm/versions/node/v17.7.2","COLORTERM":"truecolor"}, };
Object.keys(defines).forEach((key) => {
    const segments = key.split('.');
    let target = context;
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        if (i === segments.length - 1) {
            target[segment] = defines[key];
        }
        else {
            target = target[segment] || (target[segment] = {});
        }
    }
});
                                
