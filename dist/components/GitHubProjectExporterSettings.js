"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubExporterSettings = exports.settingsPath = exports.EXPORTER_COLUMN_FILTER_TEXT_KEY = exports.EXPORTER_COLUMN_FILTER_ENABLED_KEY = exports.EXPORTER_KNOWN_COLUMNS_DEFAULT = exports.EXPORTER_KNOWN_COLUMNS_KEY = exports.EXPORTER_REMOVE_TITLE_EMOJIS_KEY = exports.EXPORTER_REMOVE_STATUS_EMOJIS_KEY = exports.EXPORTER_INCLUDE_CLOSED_ISSUES_KEY = exports.EXPORTER_ORGANIZATION_KEY = exports.EXPORTER_ACCESS_TOKEN_KEY = void 0;
require("bootstrap/dist/css/bootstrap.css");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const GitHubProjectExporter_1 = require("./GitHubProjectExporter");
const useLocalStorageState_1 = require("./useLocalStorageState");
const KEY_PREFIX = `github-projectv2-csv-exporter`;
exports.EXPORTER_ACCESS_TOKEN_KEY = `${KEY_PREFIX}.token`;
exports.EXPORTER_ORGANIZATION_KEY = `${KEY_PREFIX}.organization`;
exports.EXPORTER_INCLUDE_CLOSED_ISSUES_KEY = `${KEY_PREFIX}.include-closed-issues`;
exports.EXPORTER_REMOVE_STATUS_EMOJIS_KEY = `${KEY_PREFIX}.remove-status-emojis`;
exports.EXPORTER_REMOVE_TITLE_EMOJIS_KEY = `${KEY_PREFIX}.remove-title-emojis`;
exports.EXPORTER_KNOWN_COLUMNS_KEY = `${KEY_PREFIX}.known-columns`;
exports.EXPORTER_KNOWN_COLUMNS_DEFAULT = `To Do,In Progress,Done`;
exports.EXPORTER_COLUMN_FILTER_ENABLED_KEY = `${KEY_PREFIX}.column-filter-enabled`;
exports.EXPORTER_COLUMN_FILTER_TEXT_KEY = `${KEY_PREFIX}.column-filter-text`;
exports.settingsPath = '/github-projectv2-csv-exporter/?path=/story/tools-github-project-exporter--settings';
/**
 * Settings for the GitHub project exporter.
 */
const GitHubExporterSettings = (_a) => {
    var props = __rest(_a, []);
    const [accessToken, setAccessToken] = (0, useLocalStorageState_1.useLocalStorageState)('', exports.EXPORTER_ACCESS_TOKEN_KEY);
    const [organization, setOrganization] = (0, useLocalStorageState_1.useLocalStorageState)('', exports.EXPORTER_ORGANIZATION_KEY);
    const [includeClosedIssues, setIncludeClosedIssues] = (0, useLocalStorageState_1.useLocalStorageState)('false', exports.EXPORTER_INCLUDE_CLOSED_ISSUES_KEY);
    const [removeStatusEmojis, setRemoveStatusEmojis] = (0, useLocalStorageState_1.useLocalStorageState)('true', exports.EXPORTER_REMOVE_STATUS_EMOJIS_KEY);
    const [removeTitleEmojis, setRemoveTitleEmojis] = (0, useLocalStorageState_1.useLocalStorageState)('false', exports.EXPORTER_REMOVE_TITLE_EMOJIS_KEY);
    const [knownColumnsText, setKnownColumnsText] = (0, useLocalStorageState_1.useLocalStorageState)(exports.EXPORTER_KNOWN_COLUMNS_DEFAULT, exports.EXPORTER_KNOWN_COLUMNS_KEY);
    const [columnFilterEnabled, setColumnFilterEnabled] = (0, useLocalStorageState_1.useLocalStorageState)('false', exports.EXPORTER_COLUMN_FILTER_ENABLED_KEY);
    const [columnFilterText, setColumnFilterText] = (0, useLocalStorageState_1.useLocalStorageState)('', exports.EXPORTER_COLUMN_FILTER_TEXT_KEY);
    const [enteredKnownColumn, setEnteredKnownColumn] = react_1.default.useState('');
    const knownColumnRef = react_1.default.useRef(null);
    const selectedColumnNames = (columnFilterText !== null && columnFilterText !== void 0 ? columnFilterText : '').split(',').filter((c) => !!c);
    const knownColumns = (knownColumnsText !== null && knownColumnsText !== void 0 ? knownColumnsText : '').split(',').filter((c) => !!c);
    const addKnownColumn = (col) => {
        setKnownColumnsText([...new Set([...knownColumns, col.trim()])].join(','));
    };
    const deleteKnownColumn = (col) => {
        const colsCopy = [...knownColumns];
        colsCopy.splice(colsCopy.indexOf(col), 1);
        setKnownColumnsText(colsCopy.join(','));
    };
    const columnNameBadgeElements = knownColumns.map((colName, index) => {
        const selected = selectedColumnNames.includes(colName);
        return (react_1.default.createElement(react_bootstrap_1.Badge, { key: `col-${index}`, bg: selected ? 'primary' : 'light', className: `user-select-none ${selected ? '' : 'text-black'}`, onClick: () => {
                if (!selected) {
                    setColumnFilterText([...new Set([...selectedColumnNames, colName])].join(','));
                    setColumnFilterEnabled('true');
                }
                else {
                    const newNames = [...selectedColumnNames];
                    newNames.splice(newNames.indexOf(colName), 1);
                    setColumnFilterText(newNames.join(','));
                    setColumnFilterEnabled(`${newNames.length > 0}`);
                }
            }, style: { cursor: 'pointer' } }, colName));
    });
    const knownColumnsElements = knownColumns.map((column, index) => (react_1.default.createElement(react_bootstrap_1.Badge, { key: `known-col-${index}`, bg: "primary" },
        react_1.default.createElement("div", { className: "d-flex gap-2 align-items-center" },
            column,
            react_1.default.createElement("span", { className: "fw-bold", style: { cursor: 'pointer', fontSize: '120%' }, onClick: () => deleteKnownColumn(column) }, "\u00D7")))));
    return (react_1.default.createElement("div", Object.assign({}, props, { className: (0, classnames_1.default)(props.className), style: Object.assign({}, props.style) }),
        react_1.default.createElement(react_bootstrap_1.Container, null,
            react_1.default.createElement(react_bootstrap_1.Row, null,
                react_1.default.createElement(react_bootstrap_1.Col, null,
                    react_1.default.createElement("h3", { className: "mt-4" }, "GitHub Project Exporter"),
                    react_1.default.createElement(react_bootstrap_1.Card, null,
                        react_1.default.createElement(react_bootstrap_1.Card.Header, null, "GitHub Exporter Settings"),
                        react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                            react_1.default.createElement("p", { className: "text-muted" }, "These changes will be saved to your browser's local storage."),
                            react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: "fg-token", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "fs-6 mb-0" }, "GitHub Access Token"),
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", value: accessToken || '', placeholder: "Paste your GitHub token here", onChange: (e) => setAccessToken(e.target.value) }),
                                react_1.default.createElement(react_bootstrap_1.Form.Text, { className: "text-muted" },
                                    react_1.default.createElement("p", { className: "mb-1" },
                                        "Create an access token by",
                                        ' ',
                                        react_1.default.createElement("a", { href: "https://github.com/settings/tokens", target: "_blank", rel: "noopener noreferrer" }, "clicking here"),
                                        ". Name it",
                                        ' ',
                                        react_1.default.createElement(react_bootstrap_1.Badge, { bg: "primary", className: "font-monospace" }, "GITHUB_EXPORTER_TOKEN"),
                                        ' ',
                                        "and set the Expiration to ",
                                        react_1.default.createElement(react_bootstrap_1.Badge, { bg: "primary" }, "No expiration"),
                                        ". Your access token must include the following scopes: ",
                                        react_1.default.createElement(react_bootstrap_1.Badge, { bg: "success" }, "repo"),
                                        ' ',
                                        react_1.default.createElement(react_bootstrap_1.Badge, { bg: "success" }, "read:org"),
                                        " ",
                                        react_1.default.createElement(react_bootstrap_1.Badge, { bg: "success" }, "read:user"),
                                        ' ',
                                        react_1.default.createElement(react_bootstrap_1.Badge, { bg: "success" }, "read:project")))),
                            react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: "fg-org", className: "mb-4" },
                                react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "fs-6 mb-0" }, "Organization"),
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", value: organization || '', placeholder: "Enter the organization login name", onChange: (e) => setOrganization(e.target.value) })),
                            react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: "fg-closed-issues", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Form.Check, { label: "Include closed issues", id: "closed-issues-checkbox", checked: includeClosedIssues === 'true', onChange: (e) => setIncludeClosedIssues(`${e.target.checked}`), className: "user-select-none" })),
                            react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: "fg-filter-emojis", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Form.Check, { label: "\uD83E\uDDEA\uD83D\uDEE0\uFE0F Remove emojis from Status", id: "filter-status-emojis-checkbox", checked: removeStatusEmojis === 'true', onChange: (e) => setRemoveStatusEmojis(`${e.target.checked}`), className: "user-select-none" })),
                            react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: "fg-filter-emojis", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Form.Check, { label: "\uD83D\uDC1E\uD83D\uDCA1 Remove emojis from Title", id: "filter-title-emojis-checkbox", checked: removeTitleEmojis === 'true', onChange: (e) => setRemoveTitleEmojis(`${e.target.checked}`), className: "user-select-none" })),
                            react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: "fg-column-filter", className: "mb-3" },
                                react_1.default.createElement("div", { className: "d-flex flex-wrap align-items-center gap-2 mb-2" },
                                    react_1.default.createElement(react_bootstrap_1.Form.Check, { label: "Only include issues in the following columns:", id: "column-filter-checkbox", checked: columnFilterEnabled === 'true', onChange: (e) => setColumnFilterEnabled(`${e.target.checked}`), className: "user-select-none" }),
                                    react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", value: columnFilterText !== null && columnFilterText !== void 0 ? columnFilterText : '', placeholder: "Enter column name", onChange: (e) => setColumnFilterText(e.target.value), style: { width: 220 }, disabled: columnFilterEnabled !== 'true' })),
                                react_1.default.createElement("div", { className: "d-flex flex-wrap gap-2 ms-4" }, columnNameBadgeElements)),
                            react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: "known-columns-groups", className: "mb-3" },
                                react_1.default.createElement(react_bootstrap_1.Accordion, null,
                                    react_1.default.createElement(react_bootstrap_1.Accordion.Item, { eventKey: "0" },
                                        react_1.default.createElement(react_bootstrap_1.Accordion.Header, null,
                                            react_1.default.createElement("div", { className: "d-flex gap-2" },
                                                "Known Columns",
                                                react_1.default.createElement(react_bootstrap_1.Badge, { pill: true, bg: knownColumns.length > 0 ? 'primary' : 'secondary' }, knownColumns.length))),
                                        react_1.default.createElement(react_bootstrap_1.Accordion.Body, null,
                                            react_1.default.createElement("div", { className: "d-flex flex-wrap gap-2 mb-2" },
                                                react_1.default.createElement(react_bootstrap_1.Form.Control, { ref: knownColumnRef, type: "text", value: enteredKnownColumn, placeholder: "Enter column name", onChange: (e) => setEnteredKnownColumn(e.target.value), autoComplete: "off", style: { width: 200 } }),
                                                react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", onClick: () => {
                                                        var _a;
                                                        addKnownColumn(enteredKnownColumn);
                                                        setEnteredKnownColumn('');
                                                        (_a = knownColumnRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                                                    } }, "Add Column")),
                                            react_1.default.createElement("div", { className: "d-flex flex-wrap gap-2" }, knownColumnsElements))))),
                            react_1.default.createElement("div", { className: "d-flex justify-content-end mt-4" },
                                react_1.default.createElement("a", { href: GitHubProjectExporter_1.exporterPath },
                                    react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary" }, "Open Exporter"))))))))));
};
exports.GitHubExporterSettings = GitHubExporterSettings;
