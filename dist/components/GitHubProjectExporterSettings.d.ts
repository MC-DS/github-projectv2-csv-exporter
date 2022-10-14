/// <reference types="react" />
import 'bootstrap/dist/css/bootstrap.css';
import { DivProps } from 'react-html-props';
export declare const EXPORTER_ACCESS_TOKEN_KEY: string;
export declare const EXPORTER_ORGANIZATION_KEY: string;
export declare const EXPORTER_INCLUDE_CLOSED_ISSUES_KEY: string;
export declare const EXPORTER_REMOVE_STATUS_EMOJIS_KEY: string;
export declare const EXPORTER_REMOVE_TITLE_EMOJIS_KEY: string;
export declare const EXPORTER_KNOWN_COLUMNS_KEY: string;
export declare const EXPORTER_KNOWN_COLUMNS_DEFAULT = "To Do,In Progress,Done";
export declare const EXPORTER_COLUMN_FILTER_ENABLED_KEY: string;
export declare const EXPORTER_COLUMN_FILTER_TEXT_KEY: string;
export declare const settingsPath = "/github-projectv2-csv-exporter/?path=/story/tools-github-project-exporter--settings";
export interface GitHubExporterSettingsProps extends DivProps {
}
/**
 * Settings for the GitHub project exporter.
 */
export declare const GitHubExporterSettings: ({ ...props }: GitHubExporterSettingsProps) => JSX.Element;
